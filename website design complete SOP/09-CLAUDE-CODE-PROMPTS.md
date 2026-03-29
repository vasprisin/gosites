# 09 — Claude Code Master Prompt Library
> Copy-paste prompts for every stage of the build.

---

## Session Start (Use Every Single Time)

```
Read CLAUDE.md and tasks/lessons.md before doing anything.
Confirm you've read them by listing:
1. The 5 most important rules from CLAUDE.md
2. Any lessons from tasks/lessons.md that apply to today's work
3. What the current task is in tasks/todo.md
```

---

## Phase 1 — Design System

```
Read CLAUDE.md and .claude/skills/DESIGN-SYSTEM.md.

Set up app/globals.css with the complete design system:
- All CSS custom properties: surfaces, borders, text, accent, semantic colors
- @theme inline block for Tailwind v4 (literal values only, no var() references)
- Keyframes: float, glow-pulse, shimmer, spotlight, gradient-shift
- Base styles: html scroll behavior, body background + font
- Custom scrollbar
- ::selection
- Reduced motion media query
- @source exclusions for .claude, docs, tasks, node_modules

Background: [HEX]. Accent: [HEX].
No hardcoded hex values outside globals.css.
```

---

## Phase 2 — Layout Foundation

```
We are building Phase 2: Layout Foundation.
Read CLAUDE.md first.

Build in this exact order. Verify each file before moving on.
Do not start the next file until the previous one is confirmed working.

1. lib/utils.ts
   - cn() function using clsx + tailwind-merge

2. lib/constants.ts  
   - SITE_CONFIG: name, url, description, tagline
   - NAV_LINKS: array of {label, href}
   - SOCIAL_LINKS: telegram, email, twitter

3. app/layout.tsx
   - Cal Sans via localFont from public/fonts/
   - Inter via next/font/google
   - CSS variables: --font-cal-sans, --font-inter
   - <html lang="en" className="dark" suppressHydrationWarning>
   - ThemeProvider from next-themes (forcedTheme="dark")
   - Base metadata object
   - PostHog + Vercel Analytics

4. components/layout/Container.tsx
   - <div className="max-w-7xl mx-auto px-6 lg:px-8">
   - Server Component

5. components/layout/MobileNav.tsx
   - "use client"
   - useState for open/close
   - Hamburger icon (lucide Menu/X)
   - Slide-down nav overlay
   - Close on route change

6. components/layout/Header.tsx
   - Logo (next/image) + site name
   - Desktop nav links
   - CTA button → [URL]
   - MobileNav for mobile
   - Sticky with backdrop blur
   - Server Component

7. components/layout/Footer.tsx
   - Logo + tagline
   - Nav link columns
   - Social links
   - Copyright
   - Server Component
```

---

## Phase 3 — Hero Section

```
Build components/sections/Hero.tsx

Requirements:
- Dark background with CSS dot grid pattern (background-image: radial-gradient)
- Headline: "[HEADLINE]" — large, bold, Cal Sans font
- Subheadline: "[SUBHEADLINE]" — max-w-2xl, text-secondary
- Primary CTA: "[TEXT]" → [URL] — accent background
- Secondary CTA: "[TEXT]" → [URL] — ghost/outline style
- Stats chip floating: "[STAT]" — subtle pulse animation
- Hero graphic on right: HeroGraphic component (create separately if needed)

framer-motion entrance animation:
- Headline: y: 20 → 0, opacity: 0 → 1, duration 0.6s
- Subheadline: same, delay 0.1s
- CTAs: same, delay 0.2s  
- Graphic: same, delay 0.3s

All inside <Container>.
Server Component — no "use client" on this file.
All colors via CSS variables.
Mobile: single column. Desktop: two column split.
```

---

## Phase 3 — Stats Bar

```
Build components/sections/Stats.tsx and components/shared/AnimatedCounter.tsx

Stats to show:
- [NUMBER]+ [LABEL]
- [NUMBER]+ [LABEL]
- [NUMBER]% [LABEL]
- [NUMBER] days [LABEL]

AnimatedCounter.tsx:
- "use client"
- react-intersection-observer to trigger on scroll into view
- Count up from 0 to target number over 2 seconds
- Easing: ease-out

Stats.tsx:
- 4-column grid on desktop, 2x2 on mobile
- Each stat: large number (Cal Sans), label below
- Dividers between stats on desktop
- Server Component (AnimatedCounter is the client island)
```

---

## Phase 3 — Integrations Marquee

```
Build components/sections/Integrations.tsx

CSS marquee (no npm package needed):
- Two rows of logos
- Row 1 scrolls left infinitely
- Row 2 scrolls right infinitely  
- Pause on hover
- Fade edges with mask-image gradient

Tools to show: [LIST YOUR INTEGRATION LOGOS]
Logo files are in public/images/integrations/
Use next/image for each logo.

Server Component. Pure CSS animation — no JS.
```

---

## Phase 3 — Pricing Section

```
Build components/sections/Pricing.tsx

Requirements:
- Section id="pricing" (anchor link target)
- 3 tiers: [TIER 1], [TIER 2], [TIER 3]
- Each tier: name, price, billing period, feature list, CTA button
- Middle tier: "Most Popular" badge, accent border, slightly elevated
- Annual/monthly toggle: "use client" island component only
- Feature list: lucide Check icons, consistent formatting
- All prices visible — never hide behind "contact us"

Server Component with client island for toggle only.
```

---

## Phase 3 — FAQ Section

```
Build components/sections/FAQ.tsx

8 questions covering:
1. [QUESTION]
2. [QUESTION]
...

Use shadcn/ui Accordion component.
JSON-LD FAQPage structured data embedded in the component.
Server Component.
```

---

## Phase 4 — Comparison Page Template

```
Build app/(marketing)/compare/[competitor]/page.tsx

generateStaticParams returns:
[{ competitor: 'competitor-1' }, { competitor: 'competitor-2' }, ...]

generateMetadata creates unique title/description per competitor.

Page sections:
1. Hero: "[SITE] vs [COMPETITOR]" headline
2. Quick verdict: 1-2 sentence summary
3. Comparison table: feature-by-feature, us vs them
4. Why switch: 3 reasons with icons
5. Pricing comparison
6. CTA

JSON-LD: BreadcrumbList + FAQPage
All colors via CSS variables.
```

---

## Phase 5 — SEO Setup

```
Build lib/seo.ts — metadata factory.

createMetadata({
  title: string
  description: string  
  path: string
  ogImage?: string
  noIndex?: boolean
}): Metadata

Returns full Metadata object with:
- title template: "[title] | [SITE NAME]"
- openGraph: url, title, description, images, siteName, type
- twitter: card="summary_large_image", title, description, images
- robots: noindex if noIndex=true
- alternates.canonical: full URL

Then update ALL page files to use createMetadata.

Also build app/sitemap.ts:
- / priority 1.0, changeFrequency monthly
- /pricing priority 0.95
- /compare/* priority 0.90
- /blog/* priority 0.80, changeFrequency weekly
- /use-case/* priority 0.85
```

---

## Hero Graphic Prompt

```
Build components/graphics/HeroGraphic.tsx

Two-panel dark UI mockup. Transparent background.
Accent: var(--color-accent). Surfaces: var(--color-bg-secondary).
Dot grid background via CSS radial-gradient.
1px borders: var(--color-border).

LEFT PANEL — Account list:
- 6 rows, each: gradient avatar circle, fake name, location emoji, 
  connection count, status badge (green "Available" / purple "Active")
- Every 3 seconds a random row pulses with accent glow
- "use client" — needs useEffect for pulse interval

RIGHT PANEL — Selected account card:
- Larger avatar, name, headline
- Stats row: connections, SSI score, account age
- "✓ ID Verified" badge in green
- Geo: [emoji + city]
- Accent CTA button at bottom
- Subtle float animation: translateY loop

TOP CHIP — Floating above panels:
- Avatar stack (6 gradient circles overlapping)
- "[NUMBER]+ accounts available" text
- Soft accent glow pulse

Entrance: framer-motion, panels slide up + fade in, staggered 0.15s.
```

---

## Bug Fix Prompt

```
There is a bug: [DESCRIBE BUG]

It appears at: [FILE/COMPONENT]
Steps to reproduce: [STEPS]
Expected: [WHAT SHOULD HAPPEN]
Actual: [WHAT IS HAPPENING]

Read the relevant file first. Identify root cause. Fix it.
Do not patch symptoms — fix the actual cause.
After fixing, tell me what was wrong and what you changed.
Update tasks/lessons.md if this is a pattern to avoid.
```

---

## Commit & Push Prompt

```
All current work is verified and working on localhost.
Stage all changes, create a descriptive commit message, and push to main.
Commit message format: "[Phase/Feature]: [what was built]"
```

---

## Context Reset Prompt (Use When Claude Seems Confused)

```
/clear

Start fresh. Read CLAUDE.md and tasks/todo.md.
We are currently working on: [CURRENT TASK]
The last thing completed was: [LAST COMPLETED THING]
Resume from where we left off.
```
