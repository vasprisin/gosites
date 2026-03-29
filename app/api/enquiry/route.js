const BREVO_API_BASE = 'https://api.brevo.com/v3'

function json(data, init) {
  return Response.json(data, init)
}

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

async function brevoRequest(path, body) {
  const apiKey = process.env.BREVO_API_KEY

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

async function sendConfirmationEmail({ email, firstName, startTimeline }) {
  const templateId = Number(process.env.BREVO_CONFIRM_TEMPLATE_ID)
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME ?? 'GoSites'

  if (!templateId || !senderEmail) {
    return { skipped: true, reason: 'missing_template_or_sender' }
  }

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
    templateId,
    params: {
      firstName,
      startTimeline,
    },
  })
}

async function upsertBrevoContact({ email, firstName, phone, subscribe }) {
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

export async function POST(request) {
  try {
    const body = await request.json()
    const firstName = normalizeValue(body.firstName)
    const email = normalizeValue(body.email).toLowerCase()
    const phone = normalizeValue(body.phone)
    const linkedinUrl = normalizeValue(body.linkedinUrl)
    const situation = normalizeValue(body.situation)
    const websiteUrl = normalizeValue(body.websiteUrl)
    const startTimeline = normalizeValue(body.startTimeline)

    if (!firstName || !email || !phone || !situation || !startTimeline) {
      return json(
        { ok: false, message: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (
      !['existing-website', 'brand-new-website'].includes(situation)
    ) {
      return json(
        { ok: false, message: 'Please choose a valid website situation.' },
        { status: 400 }
      )
    }

    if (situation === 'existing-website' && !websiteUrl) {
      return json(
        { ok: false, message: 'Please add your current website address.' },
        { status: 400 }
      )
    }

    if (
      ![
        'right-away',
        'within-a-week',
        'within-this-month',
        'next-month',
      ].includes(startTimeline)
    ) {
      return json(
        { ok: false, message: 'Please choose a valid start timeline.' },
        { status: 400 }
      )
    }

    await Promise.all([
      sendConfirmationEmail({ email, firstName, startTimeline }),
      upsertBrevoContact({
        email,
        firstName,
        phone,
        subscribe: false,
      }),
    ])

    return json({
      ok: true,
      submitted: {
        firstName,
        email,
        phone,
        linkedinUrl,
        situation,
        websiteUrl,
        startTimeline,
      },
    })
  } catch (error) {
    console.error('Enquiry submission failed', error)

    return json(
      { ok: false, message: 'Unable to submit enquiry right now.' },
      { status: 500 }
    )
  }
}
