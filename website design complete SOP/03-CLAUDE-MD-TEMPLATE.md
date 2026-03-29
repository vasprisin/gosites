# CLAUDE.md
> Default Agent Instructions — [PROJECT NAME] Marketing Site
> Replace all [BRACKETED] values with project-specific content.

---

## HARDCODED RULES — NEVER VIOLATE

### Secrets
- **NEVER hardcode secrets, API keys, tokens, or service URLs** in any file.
- Always use environment variables: `process.env.VAR_NAME`.
- Before writing any file: verify it contains zero hardcoded credentials.

### Assets & Media
- Never delete or overwrite original source assets without explicit instruction.
- Always preserve originals — write to a new file or path if transformation needed.

---

## MCP AWARENESS

Before starting any task, ask: **"Is there an MCP that handles this better?"**

Always look for MCPs when:
- Reading/writing files or repos → GitHub MCP
- Fetching live content → web fetch MCP
- Any third-party API with a known MCP

---

## TASK EXECUTION PROTOCOL

### 1. Plan First
- Any task with 3+ steps: write plan to `tasks/todo.md` before touching any file.
- If scope is ambiguous: check in before starting.
- If something breaks mid-task: **STOP. Re-plan. Don't push forward blindly.**

### 2. One Sub-Task at a Time
- Never parallelize dependent work.
- Complete and verify each sub-task before moving to next.
- Mark items complete in `tasks/todo.md` as you go.

### 3. Verify After Every Task
- Check output renders correctly — no broken layout, missing assets, console errors.
- Check for side effects — did any other component break?
- If you can't verify visually: state clearly what needs manual review.

### 4. Final Sanity Check
- Review full page end-to-end before marking done.
- Check desktop, mobile, interactive states.
- Ask: "Would a senior designer and senior engineer both approve this?"

### 5. Self-Improvement Loop
- After any correction: update `tasks/lessons.md` with the pattern.
- Review `tasks/lessons.md` at the start of each new session.

---

## CODE & DESIGN CHANGE SAFETY

1. **Read before changing.** Understand existing markup and styles first.
2. **Don't break what works.** Navigation and responsive layouts are fragile.
3. **Revert if broken.** Undo immediately before attempting a fix.
4. **One change at a time.** No bulk rewrites.
5. **Minimal impact.** Touch only what's necessary.
6. **Root causes only.** No temporary patches.

---

## WEBSITE-SPECIFIC STANDARDS

### Performance
- Lazy-load all images below the fold.
- Use `next/image` for all images — never raw `<img>`.
- Flag any dependency that significantly increases bundle size.

### Accessibility
- All images: descriptive `alt` text. Decorative: `alt=""`.
- Interactive elements: keyboard-navigable, visible focus states.
- WCAG AA contrast minimum.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

### SEO
- Every page: unique `<title>` + `<meta name="description">`.
- One `<h1>` per page. Logical heading hierarchy.
- Lowercase, hyphenated, human-readable URLs.
- JSON-LD structured data on all key pages.

### Responsive
- Mobile-first CSS. Base → sm → md → lg → xl.
- Test at 375px, 768px, 1280px.
- No horizontal scroll at any breakpoint.
- Touch targets minimum 44×44px.

---

## SUBAGENTS

- Use subagents to keep main context clean.
- One focused task per subagent.
- For complex work (multi-page redesigns, SEO audits): use subagents.

---

## TASK FILES

```
tasks/
  todo.md      ← current task plan
  lessons.md   ← running log of mistakes and rules
```

---

## PROJECT-SPECIFIC: [PROJECT NAME]

### Stack
Next.js 15 App Router, TypeScript strict, Tailwind v4, framer-motion, lucide-react, MDX

### Rendering
- SSR/SSG by default — every page is a Server Component.
- Never add `"use client"` to pages, layouts, or any component without state/events.
- Programmatic pages use `generateStaticParams()` for SSG.
- Blog posts use ISR: `revalidate: 3600`.

### Design System
- [DARK/LIGHT] theme only.
- Background: [HEX]. Never change this.
- All colors in `app/globals.css` as CSS custom properties.
- Never use hardcoded Tailwind color classes — always CSS variable classes.
- Accent: [HEX] via `var(--color-accent)`.
- Fonts: [HEADING FONT] + [BODY FONT] via `next/font` in `app/layout.tsx` only.

### The 10 Commandments
1. Server Components by default. `"use client"` only for useState/useEffect/events.
2. Every section MUST be inside `<Container>` (max-w-7xl mx-auto px-6 lg:px-8).
3. Never `<img>` — always `next/image` with width, height, alt.
4. Never fonts via `<link>` — only `next/font` in layout.tsx.
5. All colors via CSS variables — no hardcoded hex.
6. Mobile-first — base styles first, then breakpoints.
7. Text must have text-balance, text-pretty, or max-w- constraints.
8. Grid children must be uniform height — h-full flex flex-col on cards.
9. Never fake testimonials, fake stats, or placeholder copy.
10. [PROJECT-SPECIFIC RULE — e.g. "Never mention competitor brand X"]

### Reference Docs
- `docs/[PROJECT]-Build-Plan.md` — full build plan
- `.claude/skills/DESIGN-SYSTEM.md` — CSS tokens
- `.claude/skills/COMPONENTS.md` — component specs
- `.claude/skills/SECTIONS.md` — section blueprints
- `.claude/skills/BUILD-ORCHESTRATOR.md` — phases

### Site Structure
- `/` — Homepage (SSG)
- `/pricing` — Pricing (SSG)
- `/blog` — Blog index (ISR)
- `/blog/[slug]` — Posts (ISR revalidate 3600)
- `/compare/[competitor]` — Comparison pages (SSG)
- `/use-case/[usecase]` — Use case pages (SSG)
- `/contact` — Contact (SSG)

### Audience
[DESCRIBE TARGET AUDIENCE IN 2-3 SENTENCES]
[DESCRIBE TONE — e.g. "Direct, no corporate polish, respects intelligence"]

### Do Not Add
- Prisma, NextAuth, Axios
- Any package without checking current stack handles it
- [PROJECT-SPECIFIC PROHIBITIONS]

### Anti-Patterns (Instant Rejection)
- `"use client"` on any page or layout
- Hardcoded colors instead of CSS variables
- `<img>` instead of `next/image`
- Font via `<link>` tag
- Generic AI copy ("scale your workflow seamlessly")
- Fake social proof of any kind
- Purple gradient on white background
