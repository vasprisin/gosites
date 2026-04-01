# PostHog Handoff

Saved on: 2026-04-01 UTC

## Status

The PostHog implementation is complete in code, committed in repo, configured in Railway, and deployed on the live site.

Completed:

- landing-page analytics code added
- form analytics code added
- `instrumentation-client.js` wired for PostHog init
- `scripts/setup-posthog-cro.mjs` added
- `npm run build` passed
- PostHog project settings patched
- real CRO dashboard created
- saved insights created and attached
- old sample/temp dashboard objects archived
- synthetic smoke events captured and verified with HogQL
- Railway production env vars pushed:
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`
- Railway redeploy completed successfully
- live bundle verification confirmed PostHog host config and tracked event names are present on `https://gosites.uk`

Still pending:

- full browser-session verification from this Codex runtime is still limited by missing Chromium system libraries

## Exact PostHog State

Project:

- host: `https://us.posthog.com`
- project ID: `362572`
- project name: `gosites.uk`
- `app_urls`:
  - `https://gosites.uk`
  - `https://gosites.up.railway.app`
- `recording_domains`:
  - `gosites.uk`
  - `gosites.up.railway.app`
- `heatmaps_opt_in: true`
- `autocapture_web_vitals_opt_in: true`
- `session_recording_opt_in: true`

Dashboard:

- `GoSites CRO Dashboard`
- dashboard ID `1418248`

Insights:

- `Landing Views (30d)` `7668131`
- `CTA Clicks By Location (30d)` `7668132`
- `Section Views By Section (30d)` `7668133`
- `Scroll Depth Reached (30d)` `7668134`
- `Primary Lead Funnel (30d)` `7668135`
- `Contact Form Funnel (30d)` `7668136`
- `Service Request Step Progression (30d)` `7668137`
- `Submitted Leads By Start Timeline (30d)` `7668138`
- `FAQ Opens By Question (30d)` `7668139`
- `WhatsApp Clicks By Location (30d)` `7668140`

Archived old objects:

- `My App Dashboard` `1412738`
- `Codex Temp Dashboard` `1417265`
- `Codex Temp Insight` `7662780`

## Important API Note

PostHog cloud returned `405` on `DELETE` for dashboards and insights in this session even though `OPTIONS` advertised `DELETE`.

What worked:

- `PATCH /api/projects/362572/dashboards/:id/` with `{ "deleted": true }`
- `PATCH /api/projects/362572/insights/:id/` with `{ "deleted": true }`

`scripts/setup-posthog-cro.mjs` now uses that cleanup approach and re-runs successfully.

## Local Files

Current commit:

- `4a54950 feat: add PostHog landing analytics and CRO dashboard setup`

Added in repo:

- `instrumentation-client.js`
- `lib/posthog.js`
- `components/analytics/LandingAnalytics.jsx`
- `scripts/setup-posthog-cro.mjs`

Modified in repo:

- `.env.example`
- `app/page.js`
- `components/ui/Section.jsx`
- `components/sections/Hero.jsx`
- `components/sections/TopBanner.jsx`
- `components/sections/Header.jsx`
- `components/sections/GetStarted.jsx`
- `components/sections/Pricing.jsx`
- `components/sections/SocialProof.jsx`
- `components/sections/VSL.jsx`
- `components/sections/CTABanner.jsx`
- `components/sections/FAQ.jsx`
- `components/sections/ContactSection.jsx`
- `components/sections/EnquiryForm.jsx`
- `components/ui/WhatsappWidget.jsx`
- `package.json`
- `package-lock.json`

## Event Model Now Present In Code

- `landing_view`
- `section_view`
- `scroll_depth_reached`
- `cta_click`
- `nav_click`
- `whatsapp_click`
- `faq_expand`
- `contact_form_started`
- `contact_form_submit_attempt`
- `contact_form_submitted`
- `contact_form_submit_failed`
- `service_request_started`
- `service_request_step_completed`
- `service_request_validation_error`
- `service_request_submit_attempt`
- `service_request_submitted`
- `service_request_submit_failed`
- `calendly_prompt_shown`

## Verification Already Completed

- `npm run build` passed
- `node scripts/setup-posthog-cro.mjs` passed
- direct capture calls to `https://us.i.posthog.com/capture/` returned `200`
- HogQL query verification confirmed recent counts for the custom events, including:
  - `landing_view`
  - `cta_click`
  - `section_view`
  - `scroll_depth_reached`
  - `service_request_started`
  - `service_request_step_completed`
  - `service_request_submitted`
  - `contact_form_started`
  - `contact_form_submitted`
  - `faq_expand`
  - `whatsapp_click`
  - `calendly_prompt_shown`

These were synthetic smoke events, not live deployed frontend traffic.

## Current Live Deploy Notes

- Railway production has PostHog env vars set.
- The live site bundle on `https://gosites.uk` includes the PostHog host config and event names.
- A successful Railway deployment was verified after the env push.

## Resume Order

1. Read `handoff/CURRENT_STATE.md`.
2. Run `npm run session:restore`.
3. If you want final browser-event confirmation, open the live site in a real browser and verify events appear in PostHog live events.
4. Re-run `node scripts/setup-posthog-cro.mjs` only if you want to refresh the dashboard or confirm idempotency.
