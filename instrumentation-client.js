import posthog from 'posthog-js'

try {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      ui_host: 'https://us.posthog.com',
      defaults: '2026-01-30',
      autocapture: true,
      capture_dead_clicks: true,
      capture_pageleave: true,
      capture_pageview: 'history_change',
    })
  }
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('PostHog init failed', error)
  }
}
