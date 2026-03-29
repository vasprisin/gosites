# 07 — Build Plan
> Phase-by-phase instructions. Always complete and verify before moving to next phase.

---

## Phase 0 — Infrastructure (Before Any Code)

**Checklist:**
- [ ] GitHub repo created
- [ ] Next.js project scaffolded locally
- [ ] GitHub remote connected
- [ ] Claude Code installed globally
- [ ] GitHub MCP connected
- [ ] CLAUDE.md written with project-specific rules
- [ ] .cursorrules created
- [ ] Skills copied to .claude/skills/
- [ ] .env.local created with all variable names (empty values ok)
- [ ] shadcn/ui initialized (Nova preset)
- [ ] All dependencies installed
- [ ] Initial commit pushed
- [ ] localhost:3000 shows default Next.js page with no errors

---

## Phase 1 — Design System

**Goal:** `app/globals.css` is complete. All colors, fonts, spacing tokens defined.

**Claude Code prompt:**
```
Read CLAUDE.md. Read .claude/skills/DESIGN-SYSTEM.md.

Set up app/globals.css with:
1. All CSS custom properties for colors, typography, spacing, radius
2. @theme inline block for Tailwind v4 token registration
3. All keyframe animations (float, glow-pulse, shimmer, spotlight, gradient-shift)
4. Base body/html styles
5. Custom scrollbar
6. Reduced motion media query
7. ::selection styling

Background: [HEX]. Accent: [HEX]. 
Do not use any hardcoded Tailwind color classes anywhere.
```

**Verify:**
- [ ] `npm run dev` — no build errors
- [ ] globals.css has all CSS variables
- [ ] No hardcoded hex colors in any component file

---

## Phase 2 — Layout Foundation

**Goal:** Root layout, fonts, header, footer, container component all working.

**Build order (strict):**
1. `lib/utils.ts` — cn() helper
2. `lib/constants.ts` — nav links, social links, site metadata
3. `app/layout.tsx` — next/font, metadata, dark class on html
4. `components/layout/Container.tsx`
5. `components/layout/MobileNav.tsx` ("use client")
6. `components/layout/Header.tsx`
7. `components/layout/Footer.tsx`

**Claude Code prompt:**
```
Read CLAUDE.md. We are on Phase 2 — Layout Foundation.

Build in this exact order, verify each before moving on:
1. lib/utils.ts — cn() with clsx + tailwind-merge
2. lib/constants.ts — NAV_LINKS array, SOCIAL_LINKS, SITE_CONFIG object
3. app/layout.tsx — Cal Sans + Inter via next/font, dark class on <html>, 
   ThemeProvider (next-themes, forcedTheme="dark"), base metadata object
4. components/layout/Container.tsx — max-w-7xl mx-auto px-6 lg:px-8
5. components/layout/MobileNav.tsx — "use client", hamburger, slide-down menu
6. components/layout/Header.tsx — logo, nav links, CTA button, MobileNav
7. components/layout/Footer.tsx — links, copyright, social icons

All colors via CSS variables only.
Server Components by default. Only MobileNav gets "use client".
```

**Verify:**
- [ ] Header renders on localhost:3000
- [ ] Footer renders
- [ ] Mobile nav opens/closes
- [ ] No console errors

---

## Phase 3 — Homepage Sections

**Build order:**
1. Hero (most important — spend the most time here)
2. Stats bar (animated counters)
3. Pain Points / Problem section
4. How It Works (3 steps)
5. Features / Product section
6. Integrations (logo marquee)
7. Founder / Social proof section
8. Pricing (always on page — never hide pricing)
9. FAQ (details/summary or accordion)
10. Final CTA

**Claude Code prompt (one section at a time):**
```
Build components/sections/Hero.tsx.

Dark background. Dot grid pattern in CSS.
Headline: "[HEADLINE]"
Subheadline: "[SUBHEADLINE]"
Two CTAs: Primary "[CTA TEXT]" → [URL], Secondary "[CTA TEXT]" → [URL]
Stats chip: "[STAT]" with subtle pulse animation.
Hero graphic on the right: [DESCRIBE GRAPHIC OR USE HeroGraphic.tsx component]

framer-motion entrance: headline fades+slides up, 
subheadline 0.1s delay, CTAs 0.2s delay, graphic 0.3s delay.
All colors via CSS variables.
Inside <Container>.
Server Component — no "use client".
```

**Verify each section:**
- [ ] Renders correctly on desktop
- [ ] Renders correctly on mobile (375px)
- [ ] No layout overflow
- [ ] Animations work
- [ ] No console errors

---

## Phase 4 — Programmatic Pages

**Pages to generate:**
- `/compare/[competitor]` — generateStaticParams with competitor list
- `/use-case/[usecase]` — generateStaticParams with use case list
- `/blog/[slug]` — ISR from MDX files

**Claude Code prompt:**
```
Build app/(marketing)/compare/[competitor]/page.tsx.

generateStaticParams returns array of all competitor slugs:
[LIST COMPETITORS]

Each page shows:
- Comparison table (us vs them)
- Why switch section  
- Pricing comparison
- CTA

Unique metadata per competitor via generateMetadata.
JSON-LD BreadcrumbList structured data.
All colors via CSS variables.
```

---

## Phase 5 — SEO & Metadata

**Claude Code prompt:**
```
Build lib/seo.ts — metadata factory function.

createMetadata(options: {
  title: string
  description: string
  path: string
  ogImage?: string
}) returns Next.js Metadata object with:
- title (template: "[PAGE] | [SITE NAME]")
- description
- openGraph (title, description, url, image, siteName)
- twitter (card, title, description, image)
- canonical URL
- robots

Then update every page to use createMetadata.

Also create app/sitemap.ts — dynamic sitemap with priority values:
/ = 1.0, /pricing = 0.95, /compare/* = 0.90, /blog/* = 0.80

Also add JSON-LD to:
- layout.tsx: Organization + WebSite schema
- blog/[slug]: Article schema
- compare/[competitor]: FAQPage schema
```

---

## Phase 6 — Pre-Launch

Run through `10-PRELAUNCH-CHECKLIST.md` in full before deploying.

---

## Phase 7 — Deploy to Hostinger

Follow `08-HOSTINGER-DEPLOY.md` step by step.
