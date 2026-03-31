const BREVO_API_BASE = 'https://api.brevo.com/v3'
const AIRTABLE_API_BASE = 'https://api.airtable.com/v0'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? 'appuAvzh91hfclBCM'
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID ?? 'tblhCLHHqAfSGwJv1'

export const serviceSituationLabelMap = {
  'existing-website': 'Existing website',
  'brand-new-website': 'Brand new website',
}

export const serviceTimelineLabelMap = {
  'right-away': 'Right away',
  'within-a-week': 'Within a week',
  'within-this-month': 'Within this month',
  'next-month': 'Next month',
}

export function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidUrl(value) {
  if (!value) {
    return true
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function normalizeBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1'
}

function describeSkippedStep(reason) {
  switch (reason) {
    case 'missing_api_key':
      return 'Brevo API key is missing'
    case 'missing_email':
      return 'recipient email is missing'
    case 'not_subscribed_or_missing_list':
      return 'contact sync was skipped because the contact did not opt in or the Brevo list ID is missing'
    default:
      return reason || 'step was skipped'
  }
}

function resolveBrevoApiKey() {
  const value =
    process.env.BREVO_API_KEY?.trim() || process.env.BREVO_TOKEN?.trim()

  if (!value) {
    return ''
  }

  if (value.startsWith('xkeysib-')) {
    return value
  }

  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8')
    const parsed = JSON.parse(decoded)

    if (typeof parsed.api_key === 'string' && parsed.api_key.startsWith('xkeysib-')) {
      return parsed.api_key
    }
  } catch {
    return value
  }

  return value
}

async function brevoRequest(path, body) {
  const apiKey = resolveBrevoApiKey()

  if (!apiKey) {
    return { skipped: true, reason: 'missing_api_key' }
  }

  const response = await fetch(`${BREVO_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`${path} failed: ${response.status} ${errorText}`)
  }

  if (response.status === 204) {
    return { ok: true }
  }

  return response.json()
}

export async function sendAutoReplyEmail({ email, firstName, formName }) {
  if (!email) {
    return { skipped: true, reason: 'missing_email' }
  }

  const senderEmail =
    process.env.BREVO_SENDER_EMAIL?.trim() ||
    process.env.BREVO_SENDER?.trim() ||
    'noreply@gosites.uk'
  const senderName = process.env.BREVO_SENDER_NAME ?? 'GoSites'
  const isService = formName === 'service'
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'
  const subject = isService
    ? 'We received your service request'
    : 'We received your enquiry'
  const message = isService
    ? "We've received your service request. We'll review your situation, scope, and timing and reply within 24 hours with the next step."
    : "We've received your enquiry and will get back to you within 24 hours."

  return brevoRequest('/smtp/email', {
    sender: {
      email: senderEmail,
      name: senderName,
    },
    to: [
      {
        email,
        name: firstName || email,
      },
    ],
    subject,
    textContent: `${greeting}\n\n${message}\n\nThanks,\n${senderName}`,
    htmlContent: `<p>${greeting}</p><p>${message}</p><p>Thanks,<br />${senderName}</p>`,
  })
}

export function assertNotSkipped(result, label) {
  if (result?.skipped) {
    throw new Error(`${label} skipped: ${describeSkippedStep(result.reason)}`)
  }

  return result
}

export function logOptionalStepResult(context, result) {
  if (result?.skipped) {
    console.warn(`${context} skipped`, {
      reason: result.reason,
      detail: describeSkippedStep(result.reason),
    })
  }
}

export async function upsertBrevoContact({
  email,
  firstName,
  phone,
  subscribe,
}) {
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID)

  if (!subscribe || !listId) {
    return { skipped: true, reason: 'not_subscribed_or_missing_list' }
  }

  const attributes = {
    FIRSTNAME: firstName,
  }

  if (phone) {
    attributes.SMS = phone
  }

  return brevoRequest('/contacts', {
    email,
    attributes,
    listIds: [listId],
    updateEnabled: true,
  })
}

export async function createAirtableSubmission(fields) {
  const apiKey = process.env.AIRTABLE_PAT

  if (!apiKey) {
    throw new Error('AIRTABLE_PAT is not configured')
  }

  const response = await fetch(
    `${AIRTABLE_API_BASE}/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Airtable submission failed: ${response.status} ${errorText}`
    )
  }

  const data = await response.json()

  return data.records?.[0] ?? null
}

export function logSettledResults(context, results) {
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error(`${context} failed`, result.reason)
    }
  }
}
