'use client'

import posthog from 'posthog-js'

function getPageProperties() {
  if (typeof window === 'undefined') {
    return {}
  }

  return {
    page_hash: window.location.hash || '',
    page_hostname: window.location.hostname,
    page_path: window.location.pathname,
    page_url: window.location.href,
  }
}

export function capturePostHogEvent(event, properties = {}) {
  if (typeof window === 'undefined' || !event) {
    return
  }

  posthog.capture(event, {
    ...getPageProperties(),
    ...properties,
  })
}
