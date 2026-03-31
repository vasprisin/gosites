# Current State

Last updated: 2026-03-31 UTC

## What Was Recoverable

No prior chat transcript or saved agent handoff was present in the workspace, so this summary is inferred from the current files on disk.

## Project Snapshot

- Next.js 16 App Router site for `GoSites`
- Landing page content is driven from `lib/content.js`
- Main entrypoints are `app/page.js`, `app/layout.js`, `app/api/contact/route.js`, and `app/api/enquiry/route.js`
- UI sections live under `components/sections`
- Airtable submissions and Brevo auto-reply emails are wired through `lib/form-submissions.js`
- Airtable schema reference is documented in `handoff/AIRTABLE_SETUP.md`
- Railway CLI login recovery is documented in `handoff/RAILWAY_LOGIN_SOP.md`
- `POSTHOG_PERSONAL_API_KEY` is present in the runtime env and `/home/runner/.codex/config.toml` now contains a `posthog` MCP entry, but this running Codex session still has not reloaded MCP servers

## Latest Completed Work

- Wired both form routes to create Airtable records in the current Airtable base/table
- Confirmed Airtable has a single-select `form_name` field with options `enquiry` and `service`
- Kept `form_name` as the canonical field used to distinguish enquiry vs service submissions
- Wired Brevo transactional auto-reply emails for both forms with different copy for enquiry vs service request
- Aligned the service request frontend values with the Airtable single-select options accepted by the backend
- Documented the Airtable setup in `handoff/AIRTABLE_SETUP.md`
- Preserved the earlier PostHog MCP project reference (`362572`) in handoff notes, even though the current config no longer exposes a `posthog` MCP server
- Verified the app still builds successfully with `npm run build`
- Resumed from the saved handoff, re-ran `npm run build`, and confirmed the current tree still compiles cleanly
- Confirmed Railway CLI is installed, but this runtime is not currently authenticated because `env -u RAILWAY_API_TOKEN railway whoami` returns `Unauthorized`
- Verified the built app serves locally with `npm run start -- --hostname 127.0.0.1 --port 3001`
- Verified `/` returns HTTP 200, both API routes reject GET with HTTP 405, and the negative POST validation paths return the expected 400 responses
- Re-added the PostHog MCP server entry via `codex mcp add posthog --url 'https://mcp.posthog.com/mcp?project_id=362572' --bearer-token-env-var POSTHOG_PERSONAL_API_KEY`
- Verified `codex mcp list` and `codex mcp get posthog` show the pinned PostHog MCP server in `/home/runner/.codex/config.toml`
- Confirmed the current Codex tool session still cannot access `posthog` until Codex is restarted and reloads MCP servers
- Wired an explicit optional newsletter opt-in from both frontend forms through the API routes to the existing `upsertBrevoContact` Brevo list-sync helper
- Verified the newsletter opt-in copy renders in the live page HTML
- Re-ran `npm run build` after the opt-in changes and confirmed the app still compiles cleanly
- Confirmed `BREVO_NEWSLETTER_LIST_ID` is currently unset in this runtime, so Brevo contact upserts still skip until that secret is added
- Started a fresh Railway browserless login flow and captured a new activation code for this runtime: `DVFK-DPTT`

## Current Recovery Checklist

- [x] Confirm no previous handoff or chat transcript was saved in the workspace
- [x] Add a disk-based handoff system that future sessions can read
- [x] Add scripts to save and restore session context from the workspace
- [x] Update this file whenever major work is completed
- [x] Re-run `npm run session:save` after meaningful changes so `handoff/session-state.json` stays current

## Open Tasks

- [ ] Add the `BREVO_NEWSLETTER_LIST_ID` runtime secret so the now-wired newsletter opt-in can actually sync contacts into Brevo
- [ ] Restart Codex so the newly added `posthog` MCP server is available to the tool layer if PostHog access is still needed
- [ ] Complete the active Railway browserless login at `https://railway.com/activate` with code `DVFK-DPTT`, then investigate Railway custom-domain SSL from the re-authenticated session

## How To Resume Later

1. Read `handoff/CURRENT_STATE.md`
2. Run `npm run session:restore`
3. Review `handoff/AIRTABLE_SETUP.md` for field mapping before changing forms or Airtable
4. Review `handoff/RAILWAY_LOGIN_SOP.md` before touching Railway auth
5. Inspect the listed recent files before making new changes

## Notes For Future Sessions

If a user says "continue where you left off", start here first. Do not assume chat history exists unless it was explicitly saved into the workspace.

Verification note:

- `npm run build` passed on 2026-03-30 after resuming from handoff
- `npm run build` passed again on 2026-03-31 after wiring the newsletter opt-in flow
- `npm run start -- --hostname 127.0.0.1 --port 3001` served the built app successfully
- `curl -I http://127.0.0.1:3001/` returned HTTP 200
- `GET /api/contact` and `GET /api/enquiry` both returned HTTP 405
- invalid POST payloads for both routes returned the expected HTTP 400 validation errors without hitting external services
- `curl -s http://127.0.0.1:3000 | rg "Email me occasional website and growth updates"` confirmed the new opt-in copy is present in the rendered page

PostHog MCP note:

- `POSTHOG_PERSONAL_API_KEY` is present in the runtime env
- `/home/runner/.codex/config.toml` now contains `[mcp_servers.posthog]`
- the saved URL is `https://mcp.posthog.com/mcp?project_id=362572`
- the saved bearer token env var is `POSTHOG_PERSONAL_API_KEY`
- `codex mcp list` shows `posthog` as enabled
- `list_mcp_resources` with `server=posthog` still fails with `unknown MCP server 'posthog'` in this already-running Codex session, so a restart is still required before MCP tools can use it

Forms note:

- general enquiry route: `app/api/contact/route.js`
- service request route: `app/api/enquiry/route.js`
- shared Airtable/Brevo helper: `lib/form-submissions.js`
- both forms write Airtable rows first, then send Brevo auto-replies
- both forms now also send an optional `subscribe` boolean to the backend
- `upsertBrevoContact` is already wired, but it currently skips because `BREVO_NEWSLETTER_LIST_ID` is unset in this runtime

Railway auth note:

- `railway` exists at `/home/runner/workspace/.config/npm/node_global/bin/railway`
- `env -u RAILWAY_API_TOKEN railway whoami` currently returns `Unauthorized. Please login with railway login`
- `env -u RAILWAY_API_TOKEN railway login --browserless` is currently waiting for activation at `https://railway.com/activate`
- the active one-time Railway code in this runtime is `DVFK-DPTT`
- the Railway SSL investigation is still blocked until browserless login is completed again in this runtime
