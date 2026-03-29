# World-Class Next.js Site — Master SOP
> Repeatable system for building any $1M-quality website using Claude Code + GitHub + Hostinger

---

## The Stack (Non-Negotiable)

| Layer | Tool |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript strict |
| Styling | Tailwind v4 + CSS variables |
| Components | shadcn/ui (Nova preset) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Content | MDX (next-mdx-remote) |
| Fonts | next/font only |
| Deployment | Hostinger (Node.js Cloud) or Vercel |
| Dev Tool | Claude Code (CLI) |
| Version Control | GitHub |
| IDE | Cursor AI |

---

## The 8 Phases (Always In This Order)

| Phase | What | Time Estimate |
|---|---|---|
| 0 | Infrastructure & Repo Setup | 30 min |
| 1 | Dependencies & Environment | 20 min |
| 2 | Directory Structure | 10 min |
| 3 | Design System (globals.css) | 30 min |
| 4 | Layout (header, footer, container) | 1 hr |
| 5 | Homepage Sections | 3-5 hrs |
| 6 | SEO & Metadata | 1 hr |
| 7 | Programmatic Pages | 2-3 hrs |
| 8 | Pre-Launch Checklist | 1 hr |

---

## Documents In This SOP

1. `00-MASTER-SOP.md` — This file. Overview and sequence.
2. `01-REPO-SETUP.md` — GitHub + Cursor + Claude Code setup
3. `02-DEPENDENCIES.md` — Full dependency install commands
4. `03-CLAUDE-MD-TEMPLATE.md` — CLAUDE.md template for any project
5. `04-CURSORRULES-TEMPLATE.md` — .cursorrules for Cursor AI
6. `05-DESIGN-SYSTEM.md` — globals.css template with full token system
7. `06-DIRECTORY-STRUCTURE.md` — Full file/folder blueprint
8. `07-BUILD-PLAN.md` — Phase-by-phase build instructions
9. `08-HOSTINGER-DEPLOY.md` — Deployment to Hostinger Node.js
10. `09-CLAUDE-CODE-PROMPTS.md` — Master prompt library
11. `10-PRELAUNCH-CHECKLIST.md` — Launch readiness checklist

---

## Golden Rules

1. **One phase at a time.** Never start Phase 4 until Phase 3 is verified.
2. **Verify on localhost before committing.** Never push broken code.
3. **CLAUDE.md is law.** Every project rule lives there.
4. **CSS variables only.** No hardcoded hex colors anywhere.
5. **Server Components by default.** "use client" only when unavoidable.
6. **Real content only.** No placeholder copy, fake stats, lorem ipsum.
7. **Mobile first.** Base styles → sm → md → lg → xl.
8. **Commit after every phase.** Git is your safety net.
