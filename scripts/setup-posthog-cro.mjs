const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://us.posthog.com'
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID || '362572'
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY

const DASHBOARD_NAME = 'GoSites CRO Dashboard'
const DASHBOARDS_TO_DELETE = ['My App Dashboard', 'Codex Temp Dashboard']
const TEMP_INSIGHT_NAMES_TO_DELETE = ['Codex Temp Insight']

const PROJECT_PATCH = {
  app_urls: ['https://gosites.uk', 'https://gosites.up.railway.app'],
  recording_domains: ['gosites.uk', 'gosites.up.railway.app'],
  heatmaps_opt_in: true,
  autocapture_web_vitals_opt_in: true,
  session_recording_opt_in: true,
}

const INSIGHT_DEFINITIONS = [
  {
    name: 'Landing Views (30d)',
    description: 'Unique visitors landing on the site over the last 30 days.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'landing_view',
          name: 'Landing views',
          math: 'unique_session',
        },
      ],
      interval: 'day',
      dateRange: { date_from: '-30d' },
    },
  },
  {
    name: 'CTA Clicks By Location (30d)',
    description: 'CTA clicks grouped by placement over the last 30 days.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'cta_click',
          name: 'CTA clicks',
          math: 'total',
        },
      ],
      interval: 'day',
      dateRange: { date_from: '-30d' },
      breakdownFilter: {
        breakdown: 'cta_location',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'Section Views By Section (30d)',
    description: 'Section visibility grouped by section name.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'section_view',
          name: 'Section views',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'section_name',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'Scroll Depth Reached (30d)',
    description: 'Scroll milestones reached by visitors.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'scroll_depth_reached',
          name: 'Scroll depth',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'scroll_percentage',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'Primary Lead Funnel (30d)',
    description: 'Visitor to service-request conversion funnel.',
    query: {
      kind: 'FunnelsQuery',
      series: [
        { kind: 'EventsNode', event: 'landing_view', name: 'Landing view' },
        { kind: 'EventsNode', event: 'cta_click', name: 'CTA click' },
        {
          kind: 'EventsNode',
          event: 'service_request_started',
          name: 'Service request started',
        },
        {
          kind: 'EventsNode',
          event: 'service_request_submitted',
          name: 'Service request submitted',
        },
      ],
      funnelsFilter: {
        layout: 'horizontal',
      },
      dateRange: { date_from: '-30d' },
    },
  },
  {
    name: 'Contact Form Funnel (30d)',
    description: 'Visitor to general-enquiry conversion funnel.',
    query: {
      kind: 'FunnelsQuery',
      series: [
        { kind: 'EventsNode', event: 'landing_view', name: 'Landing view' },
        {
          kind: 'EventsNode',
          event: 'contact_form_started',
          name: 'Contact form started',
        },
        {
          kind: 'EventsNode',
          event: 'contact_form_submitted',
          name: 'Contact form submitted',
        },
      ],
      funnelsFilter: {
        layout: 'horizontal',
      },
      dateRange: { date_from: '-30d' },
    },
  },
  {
    name: 'Service Request Step Progression (30d)',
    description: 'Progression through the service-request form steps.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'service_request_step_completed',
          name: 'Step completed',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'completed_step',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'Submitted Leads By Start Timeline (30d)',
    description: 'Service request submissions grouped by requested start timeline.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'service_request_submitted',
          name: 'Submitted service requests',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'start_timeline',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'FAQ Opens By Question (30d)',
    description: 'FAQ expansions grouped by question.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'faq_expand',
          name: 'FAQ opens',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'faq_question',
        breakdown_type: 'event',
      },
    },
  },
  {
    name: 'WhatsApp Clicks By Location (30d)',
    description: 'WhatsApp CTA clicks grouped by source location.',
    query: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          event: 'whatsapp_click',
          name: 'WhatsApp clicks',
          math: 'total',
        },
      ],
      dateRange: { date_from: '-30d' },
      interval: 'day',
      breakdownFilter: {
        breakdown: 'location',
        breakdown_type: 'event',
      },
    },
  },
]

function ensureEnv() {
  if (!API_KEY) {
    throw new Error('POSTHOG_PERSONAL_API_KEY is required.')
  }
}

async function posthogRequest(path, options = {}) {
  const response = await fetch(`${POSTHOG_HOST}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && data.detail
        ? data.detail
        : text || `${response.status} ${response.statusText}`
    throw new Error(`PostHog request failed for ${path}: ${message}`)
  }

  return data
}

async function listDashboards() {
  const results = []
  let offset = 0
  const limit = 100

  for (;;) {
    const data = await posthogRequest(
      `/api/projects/${PROJECT_ID}/dashboards/?limit=${limit}&offset=${offset}`
    )
    const batch = Array.isArray(data?.results) ? data.results : []
    results.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit
  }

  return results
}

async function listInsights() {
  const results = []
  let offset = 0
  const limit = 100

  for (;;) {
    const data = await posthogRequest(
      `/api/projects/${PROJECT_ID}/insights/?limit=${limit}&offset=${offset}`
    )
    const batch = Array.isArray(data?.results) ? data.results : []
    results.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit
  }

  return results
}

async function updateProjectSettings() {
  const currentProject = await posthogRequest(`/api/projects/${PROJECT_ID}/`)
  const patch = {}

  for (const [key, value] of Object.entries(PROJECT_PATCH)) {
    const currentValue = currentProject[key]
    const sameValue = Array.isArray(value)
      ? Array.isArray(currentValue) &&
        value.length === currentValue.length &&
        value.every((item, index) => item === currentValue[index])
      : currentValue === value

    if (!sameValue) {
      patch[key] = value
    }
  }

  if (Object.keys(patch).length === 0) {
    return { updated: false, project: currentProject }
  }

  const project = await posthogRequest(`/api/projects/${PROJECT_ID}/`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })

  return { updated: true, project }
}

async function ensureDashboard() {
  const dashboards = await listDashboards()
  const existing = dashboards.find((dashboard) => dashboard.name === DASHBOARD_NAME)

  if (existing) {
    return existing
  }

  return posthogRequest(`/api/projects/${PROJECT_ID}/dashboards/`, {
    method: 'POST',
    body: JSON.stringify({
      name: DASHBOARD_NAME,
      pinned: true,
    }),
  })
}

async function ensureInsight(definition, dashboardId, existingInsights) {
  const existing = existingInsights.find((insight) => insight.name === definition.name)
  const payload = {
    name: definition.name,
    description: definition.description,
    dashboards: [dashboardId],
    query: definition.query,
    tags: ['codex', 'cro', 'gosites'],
  }

  if (existing) {
    return posthogRequest(`/api/projects/${PROJECT_ID}/insights/${existing.id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
  }

  return posthogRequest(`/api/projects/${PROJECT_ID}/insights/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

async function deleteDashboardByName(name, dashboards) {
  const dashboard = dashboards.find((item) => item.name === name)

  if (!dashboard || dashboard.name === DASHBOARD_NAME) {
    return false
  }

  await posthogRequest(`/api/projects/${PROJECT_ID}/dashboards/${dashboard.id}/`, {
    method: 'PATCH',
    body: JSON.stringify({ deleted: true }),
  })

  return true
}

async function deleteInsightByName(name, insights) {
  const insight = insights.find((item) => item.name === name)

  if (!insight) {
    return false
  }

  await posthogRequest(`/api/projects/${PROJECT_ID}/insights/${insight.id}/`, {
    method: 'PATCH',
    body: JSON.stringify({ deleted: true }),
  })

  return true
}

async function main() {
  ensureEnv()

  const projectResult = await updateProjectSettings()
  const dashboard = await ensureDashboard()
  const existingInsights = await listInsights()

  const ensuredInsights = []
  for (const definition of INSIGHT_DEFINITIONS) {
    const insight = await ensureInsight(definition, dashboard.id, existingInsights)
    ensuredInsights.push({ id: insight.id, name: insight.name })
  }

  const dashboards = await listDashboards()
  const insights = await listInsights()
  const deletedDashboards = []
  const deletedInsights = []

  for (const name of DASHBOARDS_TO_DELETE) {
    if (await deleteDashboardByName(name, dashboards)) {
      deletedDashboards.push(name)
    }
  }

  for (const name of TEMP_INSIGHT_NAMES_TO_DELETE) {
    if (await deleteInsightByName(name, insights)) {
      deletedInsights.push(name)
    }
  }

  console.log(
    JSON.stringify(
      {
        dashboard: {
          id: dashboard.id,
          name: dashboard.name,
        },
        project: {
          id: projectResult.project.id,
          updated: projectResult.updated,
          app_urls: projectResult.project.app_urls,
          recording_domains: projectResult.project.recording_domains,
          heatmaps_opt_in: projectResult.project.heatmaps_opt_in,
          autocapture_web_vitals_opt_in:
            projectResult.project.autocapture_web_vitals_opt_in,
          session_recording_opt_in: projectResult.project.session_recording_opt_in,
        },
        insights: ensuredInsights,
        deletedDashboards,
        deletedInsights,
      },
      null,
      2
    )
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
