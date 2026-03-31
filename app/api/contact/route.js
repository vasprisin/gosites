import {
  assertNotSkipped,
  createAirtableSubmission,
  isValidEmail,
  isValidUrl,
  logOptionalStepResult,
  normalizeBoolean,
  normalizeValue,
  sendAutoReplyEmail,
  upsertBrevoContact,
} from '@/lib/form-submissions'

function json(data, init) {
  return Response.json(data, init)
}

export async function POST(request) {
  try {
    const body = await request.json()

    const firstName = normalizeValue(body.firstName)
    const email = normalizeValue(body.email).toLowerCase()
    const phone = normalizeValue(body.phone)
    const linkedinUrl = normalizeValue(body.linkedinUrl)
    const websiteUrl = normalizeValue(body.websiteUrl)
    const messageTitle = normalizeValue(body.messageTitle)
    const messageBody = normalizeValue(body.messageBody)
    const subscribe = normalizeBoolean(body.subscribe)

    if (!firstName || !email || !phone || !messageTitle || !messageBody) {
      return json(
        { ok: false, message: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!isValidUrl(linkedinUrl)) {
      return json(
        { ok: false, message: 'Please enter a valid LinkedIn URL.' },
        { status: 400 }
      )
    }

    if (!isValidUrl(websiteUrl)) {
      return json(
        { ok: false, message: 'Please enter a valid website URL.' },
        { status: 400 }
      )
    }

    const airtableFields = {
      Name: firstName,
      Email: email,
      Phone: phone,
      'Message Title': messageTitle,
      'Message Body': messageBody,
      Status: 'New',
      'Submission Source': 'Website enquiry form',
      form_name: 'enquiry',
    }

    if (linkedinUrl) {
      airtableFields['LinkedIn URL'] = linkedinUrl
    }

    if (websiteUrl) {
      airtableFields['Website URL'] = websiteUrl
    }

    const airtableRecord = await createAirtableSubmission(airtableFields)

    const autoReplyResult = await sendAutoReplyEmail({
      email,
      firstName,
      formName: 'enquiry',
    })
    assertNotSkipped(autoReplyResult, 'General enquiry auto-reply')

    try {
      const brevoContactResult = await upsertBrevoContact({
        email,
        firstName,
        phone,
        subscribe,
      })
      logOptionalStepResult('General enquiry newsletter sync', brevoContactResult)
    } catch (error) {
      console.error('General enquiry newsletter sync failed', error)
    }

    console.info('General enquiry received', {
      firstName,
      email,
      phone,
      linkedinUrl,
      websiteUrl,
      messageTitle,
      subscribe,
      airtableRecordId: airtableRecord?.id ?? null,
    })

    return json({
      ok: true,
      message:
        'We have received your message and will get back to you within 24 hours.',
      airtableRecordId: airtableRecord?.id ?? null,
    })
  } catch (error) {
    console.error('Contact submission failed', error)

    return json(
      { ok: false, message: 'Unable to submit message right now.' },
      { status: 500 }
    )
  }
}
