# Railway Login SOP For This Workspace

Last updated: 2026-03-30 UTC

## Purpose

This documents the exact process used in this workspace to connect Railway access from the terminal session.

It covers:

- Railway CLI authentication
- the invalid `RAILWAY_API_TOKEN` issue encountered here
- the exact browserless login flow that worked
- how to verify access afterward
- why Railway MCP was still not available automatically

## What Was Present In This Runtime

- `railway` CLI was already installed at:
  - `/home/runner/workspace/.config/npm/node_global/bin/railway`
- A runtime secret named `RAILWAY_API_TOKEN` was present.
- That token was not usable for CLI access in this session.

## Symptom

Running either of the following failed because the existing `RAILWAY_API_TOKEN` secret overrode normal login:

```bash
railway whoami
railway login --browserless
```

Observed error:

```text
Invalid RAILWAY_API_TOKEN. Please check that it is valid and has access to the resource you're trying to use.
```

## Current Status On Resume

On the resumed 2026-03-30 runtime, Railway CLI was still installed, but the prior authenticated state was no longer available.

Running:

```bash
env -u RAILWAY_API_TOKEN railway whoami
```

returned:

```text
Unauthorized. Please login with `railway login`
```

That means the SSL investigation remains blocked until browserless login is completed again in the current runtime.

## Exact Fix Used Here

Temporarily ignore the bad `RAILWAY_API_TOKEN` env var for the login command:

```bash
env -u RAILWAY_API_TOKEN railway login --browserless
```

That starts a browserless auth flow and prints:

- an activation URL:
  - `https://railway.com/activate`
- a one-time authentication code

In this session, Railway generated:

```text
Your authentication code is: ZPCH-LHGP
Please visit:
  https://railway.com/activate
```

## Exact SOP

1. Open a terminal in `/home/runner/workspace`.
2. Confirm the CLI exists:

```bash
which railway
```

3. If `RAILWAY_API_TOKEN` is set and login commands fail, do not use it directly. Start browserless login with the env var unset for that command only:

```bash
env -u RAILWAY_API_TOKEN railway login --browserless
```

4. Keep that terminal open. Railway will display a one-time code and wait.
5. Open:

```text
https://railway.com/activate
```

6. Paste the one-time code shown by the CLI.
7. Complete the Railway approval in the browser.
8. Return to the terminal and wait for the login command to finish.
9. Verify access:

```bash
env -u RAILWAY_API_TOKEN railway whoami
```

10. If needed, link or inspect a project after login:

```bash
env -u RAILWAY_API_TOKEN railway list
env -u RAILWAY_API_TOKEN railway link
env -u RAILWAY_API_TOKEN railway status
```

## Why `env -u RAILWAY_API_TOKEN` Was Necessary

In this environment, the saved `RAILWAY_API_TOKEN` secret was invalid or lacked the required access for the CLI session. Because Railway CLI reads that variable automatically, it blocked normal auth until it was removed from the command environment.

Using:

```bash
env -u RAILWAY_API_TOKEN ...
```

does not delete the secret globally. It only prevents that one command from reading it.

## Verification Commands Used

These are the checks run during investigation:

```bash
which railway
railway whoami
railway login --browserless
env -u RAILWAY_API_TOKEN railway login --browserless
```

The first successful login path was the last command above.

## Railway MCP Note

Logging into Railway CLI is not the same as having Railway MCP available inside this Codex session.

In this session:

- Railway CLI was installed
- Railway CLI login could be started
- no Railway MCP server was exposed to the agent tool layer yet

Railway's docs state that the MCP server requires the Railway CLI to already be installed and authenticated:

- https://docs.railway.com/ai/mcp-server

So the order is:

1. Install Railway CLI
2. Authenticate Railway CLI
3. Configure the host application's MCP server entry for Railway
4. Restart or reload the host if needed

## If You Need To Repeat This Later

Use this exact command first:

```bash
env -u RAILWAY_API_TOKEN railway login --browserless
```

If that succeeds, then verify with:

```bash
env -u RAILWAY_API_TOKEN railway whoami
```

If you want persistent token-based auth afterward, replace the bad `RAILWAY_API_TOKEN` secret with a valid Railway token instead of keeping the broken one in runtime secrets.
