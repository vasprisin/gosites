import {
  assertNotSkipped,
  createAirtableSubmission,
  isValidEmail,
  isValidUrl,
  logOptionalStepResult,
  normalizeBoolean,
  normalizeValue,
  sendAutoReplyEmail,
  serviceSituationLabelMap,
  serviceTimelineLabelMap,
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
    const situation = normalizeValue(body.situation)
    const websiteUrl = normalizeValue(body.websiteUrl)
    const startTimeline = normalizeValue(body.startTimeline)
    const subscribe = normalizeBoolean(body.subscribe)

    if (!firstName || !email || !situation || !startTimeline) {
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

    if (!Object.hasOwn(serviceSituationLabelMap, situation)) {
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

    if (!Object.hasOwn(serviceTimelineLabelMap, startTimeline)) {
      return json(
        { ok: false, message: 'Please choose a valid start timeline.' },
        { status: 400 }
      )
    }

    const airtableFields = {
      Name: firstName,
      Email: email,
      'Website Situation': serviceSituationLabelMap[situation],
      'Start Timeline': serviceTimelineLabelMap[startTimeline],
      Status: 'New',
      'Submission Source': 'Website service request form',
      form_name: 'service',
    }

    if (phone) {
      airtableFields.Phone = phone
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
      formName: 'service',
    })
    assertNotSkipped(autoReplyResult, 'Service request auto-reply')

    try {
      const brevoContactResult = await upsertBrevoContact({
        email,
        firstName,
        phone,
        subscribe,
      })
      logOptionalStepResult('Service request newsletter sync', brevoContactResult)
    } catch (error) {
      console.error('Service request newsletter sync failed', error)
    }

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
        subscribe,
      },
      airtableRecordId: airtableRecord?.id ?? null,
    })
  } catch (error) {
    console.error('Service request submission failed', error)

    return json(
      { ok: false, message: 'Unable to submit service request right now.' },
      { status: 500 }
    )
  }
}
