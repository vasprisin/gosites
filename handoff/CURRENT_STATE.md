# Current State

Last updated: 2026-03-31 UTC

## Project Snapshot

- Next.js 16.2.1 App Router site for `GoSites`
- Relevant Next.js docs already reviewed from `node_modules/next/dist/docs/`:
  - `01-app/index.md`
  - `01-app/04-glossary.md`
  - `01-app/02-guides/analytics.md`
  - `01-app/03-api-reference/03-file-conventions/instrumentation-client.md`
- Main landing page entrypoints:
  - `app/page.js`
  - `app/layout.js`
  - `components/sections/*`
- Backend form routes:
  - `app/api/contact/route.js`
  - `app/api/enquiry/route.js`
- Shared form helper:
  - `lib/form-submissions.js`

## Production State That Was Already Completed

- Railway production is linked and deployable from this workspace.
- The live backend was already deployed from the local workspace, not just repo HEAD.
- Railway production service/project details:
  - project: `gosites.uk`
  - project ID: `a28f325c-13c8-4ad0-8aaa-1a39460d698c`
  - environment: `production`
  - environment ID: `0d1376de-eac6-4d50-a377-2496fd383e09`
  - service: `gosites.uk`
  - service ID: `57677bca-a9bc-48db-a15e-c991a0a18502`
- Current live deployment that was verified earlier:
  - deployment ID: `5cd672f7-a76d-43c4-86b1-8b9edef0148f`
- Railway production vars already pushed earlier:
  - `AIRTABLE_PAT`
  - `AIRTABLE_BASE_ID=appuAvzh91hfclBCM`
  - `AIRTABLE_TABLE_ID=tblhCLHHqAfSGwJv1`
  - `BREVO_TOKEN`
  - `BREVO_SENDER`
  - `BREVO_SENDER_EMAIL`
  - `BREVO_SENDER_NAME=GoSites`
- `BREVO_NEWSLETTER_LIST_ID` is still intentionally missing.

## Backend Integration State

- Airtable writes are working in production.
- Brevo auto-reply emails are working in production.
- Newsletter sync to Brevo is wired in code but currently skips because `BREVO_NEWSLETTER_LIST_ID` is unset.
- Backend was hardened so a 200 response now means:
  - Airtable write succeeded
  - required Brevo auto-reply succeeded
- Optional newsletter sync remains non-blocking.

### Files already changed for that backend work

- `app/api/contact/route.js`
- `app/api/enquiry/route.js`
- `lib/form-submissions.js`
- `components/sections/ContactSection.jsx`
- `components/sections/EnquiryForm.jsx`

### Live backend smoke tests already completed successfully

- `https://gosites.up.railway.app/api/contact`
  - returned 200
  - `airtableRecordId: recAfSfodvP7j1Xpu`
- `https://gosites.up.railway.app/api/enquiry`
  - returned 200
  - `airtableRecordId: recuLOAlDmApjpXua`
- `https://gosites.uk/api/contact`
  - returned 200 when tested directly against origin
  - `airtableRecordId: recp0UoFzCSIYS3gM`

## Separate Production Issue Still Open

- `https://gosites.uk` still serves a `*.up.railway.app` certificate instead of a cert for `gosites.uk`.
- This does not block the backend integration itself.
- It does block browser trust on the branded domain.
- Railway API state already investigated earlier:
  - domain verified: `true`
  - DNS status propagated
  - `_railway-verify.gosites.uk` TXT exists
  - cert state stuck at `CERTIFICATE_STATUS_TYPE_VALIDATING_OWNERSHIP`
- This appears to be a Railway cert issuance issue, not an app code issue.

## PostHog Access State

- `POSTHOG_PERSONAL_API_KEY` exists in the runtime env.
- PostHog MCP config was added previously to `/home/runner/.codex/config.toml`.
- Project pinned there:
  - PostHog project ID: `362572`
  - project name: `gosites.uk`
- Important caveat:
  - the current Codex tool session still does not expose `posthog` directly via `list_mcp_resources`
  - a fresh Codex process was previously able to reach the configured PostHog MCP server
- Even without direct MCP in this exact session, the PostHog private API is reachable with the personal API key.

### PostHog private API checks already verified

- `GET https://us.posthog.com/api/users/@me/` works for the personal API key
- `GET https://us.posthog.com/api/projects/362572/` works
- `GET https://us.posthog.com/api/dashboard/?limit=10` works
- `GET https://us.posthog.com/api/projects/362572/insights/?limit=2` works
- `POST https://us.posthog.com/api/dashboard/` works
- `POST https://us.posthog.com/api/projects/362572/insights/` works
- `PATCH https://us.posthog.com/api/projects/362572/insights/:id/` works

### PostHog project state after implementation

- host: `https://us.posthog.com`
- project ID: `362572`
- project name: `gosites.uk`
- `app_urls` now set to:
  - `https://gosites.uk`
  - `https://gosites.up.railway.app`
- `recording_domains` now set to:
  - `gosites.uk`
  - `gosites.up.railway.app`
- `heatmaps_opt_in` is now `true`
- `autocapture_web_vitals_opt_in` is now `true`
- `capture_performance_opt_in` remains `true`
- `session_recording_opt_in` is now `true`
- the project public token exists on the project object and can be used for `NEXT_PUBLIC_POSTHOG_KEY`
  - do not store the token in this file

### PostHog dashboard state now

- custom dashboard created:
  - `GoSites CRO Dashboard`
  - dashboard ID `1418248`
- saved insights attached to that dashboard:
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
- archived old objects via `PATCH { deleted: true }`:
  - `My App Dashboard` `1412738`
  - `Codex Temp Dashboard` `1417265`
  - `Codex Temp Insight` `7662780`
- important API quirk:
  - PostHog cloud returned `405` for `DELETE` on dashboards/insights even though `OPTIONS` advertised `DELETE`
  - `scripts/setup-posthog-cro.mjs` now uses `PATCH { deleted: true }` for cleanup and re-runs cleanly

## PostHog Implementation Status

The requested PostHog code work is now finished locally and the PostHog project objects have been created.

### What is edited locally now

Installed package:

- `posthog-js@1.364.4`

New files:

- `instrumentation-client.js`
- `lib/posthog.js`
- `components/analytics/LandingAnalytics.jsx`
- `scripts/setup-posthog-cro.mjs`

Modified files:

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

### What the PostHog code now does

- `instrumentation-client.js`
  - initializes PostHog before hydration using the Next.js-supported root client instrumentation file
  - expects:
    - `NEXT_PUBLIC_POSTHOG_KEY`
    - `NEXT_PUBLIC_POSTHOG_HOST`
  - current client config:
    - `defaults: '2026-01-30'`
    - `autocapture: true`
    - `capture_dead_clicks: true`
    - `capture_pageleave: true`
    - `capture_pageview: 'history_change'`
- `lib/posthog.js`
  - exposes a small client-safe `capturePostHogEvent` helper
- `components/analytics/LandingAnalytics.jsx`
  - captures:
    - `landing_view`
    - `section_view`
    - `scroll_depth_reached`
  - captures delegated clicks from elements with `data-ph-event`
- CTA and nav tracking is now wired on the landing page:
  - hero
  - top banner
  - header nav/logo/start buttons
  - get-started buttons
  - pricing buttons
  - social-proof CTA
  - VSL CTA
  - FAQ CTA
  - contact success CTA
  - contact service-request note link
  - final CTA banner
  - floating WhatsApp widget
- `components/sections/FAQ.jsx`
  - captures `faq_expand`
- `components/sections/ContactSection.jsx`
  - captures:
    - `contact_form_started`
    - `contact_form_submit_attempt`
    - `contact_form_submitted`
    - `contact_form_submit_failed`
- `components/sections/EnquiryForm.jsx`
  - captures:
    - `service_request_started`
    - `service_request_step_completed`
    - `service_request_validation_error`
    - `service_request_submit_attempt`
    - `service_request_submitted`
    - `service_request_submit_failed`
    - `calendly_prompt_shown`
- `scripts/setup-posthog-cro.mjs`
  - patches project settings
  - creates or updates the CRO dashboard
  - creates or updates all saved insights
  - archives old sample/temp dashboard objects

### What remains blocked or unfinished

- Railway production still needs:
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`
- Railway still needs a redeploy after those vars are set
- live browser verification on the deployed site is still pending
- current blocker in this runtime:
  - `env -u RAILWAY_API_TOKEN railway whoami` returns `Unauthorized`
  - the only Railway env var present here is the broken `RAILWAY_API_TOKEN`
  - browserless Railway login must be completed again before this runtime can push vars or redeploy

## Current Git Working Tree

At the moment of this update, `git status --short` includes the PostHog worktree changes plus the handoff updates.

## Important Verification Status

- `npm install posthog-js` completed successfully
- `npm run build` completed successfully on `2026-03-31`
- `node scripts/setup-posthog-cro.mjs` completed successfully and now re-runs idempotently
- synthetic smoke events were sent directly to PostHog capture using the project public token
- event ingestion was verified with `POST /api/projects/362572/query/` using HogQL
  - counts observed within the last 30 minutes:
    - `landing_view = 2`
    - `cta_click = 1`
    - `section_view = 1`
    - `scroll_depth_reached = 1`
    - `service_request_started = 1`
    - `service_request_step_completed = 3`
    - `service_request_submitted = 1`
    - `contact_form_started = 1`
    - `contact_form_submitted = 1`
    - `faq_expand = 1`
    - `whatsapp_click = 1`
    - `calendly_prompt_shown = 1`
- no Railway redeploy has happened yet for the frontend PostHog env vars
- no live-site browser verification has been run after deployment because deployment is blocked on Railway auth

## Recovery Checklist

- [x] Save an updated disk handoff with the real latest production and PostHog state
- [x] Keep the older recovery scripts in place
- [x] Preserve the exact partial PostHog file set already edited
- [x] Finish `FAQ.jsx`, `ContactSection.jsx`, and `EnquiryForm.jsx`
- [x] Add `scripts/setup-posthog-cro.mjs`
- [x] Run `npm run build`
- [ ] Push `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to Railway production
- [ ] Redeploy Railway
- [x] Run the PostHog setup script
- [x] Delete/archive the temporary PostHog dashboard and temp insight
- [x] Verify events land in PostHog and confirm the CRO dashboard exists
- [ ] Verify the live deployed site after Railway redeploy

## How To Resume

1. Read this file first.
2. Run `npm run session:restore`.
3. Re-auth Railway CLI in this runtime:
   - `env -u RAILWAY_API_TOKEN railway login --browserless`
4. Set Railway production vars:
   - `NEXT_PUBLIC_POSTHOG_KEY` = PostHog project `362572` public token
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com`
5. Redeploy Railway.
6. Open the deployed site and verify:
   - PostHog page/session events from the real frontend
   - session replay / heatmap behavior
   - dashboard charts updating with live frontend traffic
7. If needed, re-run `node scripts/setup-posthog-cro.mjs`
   - it is safe to re-run

## Notes For Future Sessions

- Do not assume the old interrupted-state PostHog notes are still current; this file supersedes them.
- The remaining work is deployment/auth, not code implementation.
- If the next session needs the focused PostHog-only summary, read `handoff/POSTHOG_HANDOFF.md`.
