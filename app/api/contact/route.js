function json(data, init) {
  return Response.json(data, init)
}

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidUrl(value) {
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

    console.info('General enquiry received', {
      firstName,
      email,
      phone,
      linkedinUrl,
      websiteUrl,
      messageTitle,
    })

    return json({
      ok: true,
      message: 'We have received your message and will get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('Contact submission failed', error)

    return json(
      { ok: false, message: 'Unable to submit message right now.' },
      { status: 500 }
    )
  }
}
