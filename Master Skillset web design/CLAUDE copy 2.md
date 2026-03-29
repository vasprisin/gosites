# CLAUDE.md — Website Build Directives

> **READ THIS ENTIRE FILE BEFORE WRITING ANY CODE.**
> **READ `docs/BUILD-ORCHESTRATOR.md` FIRST — IT DEFINES THE FULL BUILD PROCESS.**
> **READ `docs/DESIGN-SYSTEM.md` BEFORE WRITING ANY CODE.**
> **READ `docs/COMPONENTS.md` BEFORE BUILDING ANY COMPONENT.**
> **READ `docs/SECTIONS.md` BEFORE BUILDING ANY PAGE.**
> **READ `docs/EXTENDED-TOOLKIT.md` FOR ALL AVAILABLE LIBRARIES & RESOURCES.**
> **READ `docs/WEBFLOW-DESIGN-VOCABULARY.md` FOR DESIGN LANGUAGE REFERENCE.**
> **READ `docs/PROMPTING-GUIDE.md` FOR EFFECTIVE PROMPTING PATTERNS.**
> These are NON-NEGOTIABLE permanent directives.

---

## Build Process (MANDATORY — Follow This Before Coding)

**PHASE 0: INTAKE** — Before writing ANY code, follow the intake process in `docs/BUILD-ORCHESTRATOR.md`:
1. Ask what the business does, who it serves, and what the site needs to accomplish
2. Ask for materials: logo, brand assets, competitor sites, existing content, photography
3. Ask: single-page or multi-page? Which pages? Blog? CMS? Integrations?
4. Produce a plan: site map, technical stack, hosting, color scheme, font pairing
5. Get approval on the plan BEFORE writing code

**PHASE 1: SKELETON** — Initialize project, install ALL dependencies, create directory structure, Git init
**PHASE 2: DESIGN** — Color scheme, fonts, design tokens in globals.css
**PHASE 3: LAYOUT** — Container, Header, MobileNav, Footer → wire into root layout
**PHASE 4: PRIMITIVES** — Button, Badge, SectionHeader, Card
**PHASE 5: PAGES** — Homepage first, then inner pages one at a time
**PHASE 6: BLOG** — Content library, list page, post page, MDX rendering
**PHASE 7: SEO** — Per-page metadata, JSON-LD schema, sitemap, analytics
**PHASE 8: POLISH** — Animations, hover states, 404 page, dark mode
**PHASE 9: QA** — Lighthouse, responsive testing, link checking, launch

---

## Tech Stack (Enforced)

- **Framework:** Next.js 15+ with App Router
- **Rendering:** SSR by default. Every page is a Server Component unless it REQUIRES client interactivity. Mark only interactive leaf components with `"use client"`. NEVER mark pages or layouts as client components.
- **Styling:** Tailwind CSS v4+ with CSS variables for design tokens
- **Language:** TypeScript strict mode, no `any` types
- **CMS:** Markdown/MDX files in `/content/` directory with frontmatter (for blog, case studies, team) OR headless CMS integration (Sanity/Contentful) if specified
- **Fonts:** Next.js `next/font` for self-hosted fonts (NEVER use CDN font links)
- **Images:** Next.js `<Image>` component exclusively — NEVER use `<img>` tags
- **Icons:** Lucide React or a single icon library — NEVER mix icon sets
- **Deployment:** Vercel-optimized by default

---

## Project Structure (Enforced)

```
├── app/
│   ├── layout.tsx            # Root layout — ONE source of truth for <html>, <body>, fonts
│   ├── page.tsx              # Homepage
│   ├── (pages)/              # Route group for all pages
│   │   ├── about/page.tsx
│   │   ├── solutions/page.tsx
│   │   ├── use-cases/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── team/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   └── globals.css           # Tailwind imports + CSS custom properties (design tokens)
├── components/
│   ├── layout/               # Header, Footer, Navigation, MobileNav
│   ├── sections/             # Full-width page sections (Hero, Features, CTA, etc.)
│   ├── ui/                   # Small reusable primitives (Button, Badge, Card shell)
│   └── content/              # Content-display components (BlogCard, TeamMember, etc.)
├── content/                  # Markdown/MDX content files
│   ├── blog/
│   ├── case-studies/
│   └── team/
├── lib/
│   ├── utils.ts              # cn() helper, formatDate, etc.
│   ├── content.ts            # Content fetching/parsing functions
│   └── constants.ts          # Site metadata, nav links, social links
├── public/
│   ├── images/
│   └── fonts/                # Only if not using next/font
├── docs/                     # Design system documentation (THIS folder)
│   ├── DESIGN-SYSTEM.md
│   ├── COMPONENTS.md
│   └── SECTIONS.md
└── CLAUDE.md                 # This file
```

---

## The 12 Commandments (NEVER VIOLATE)

### 1. CONTAINER DISCIPLINE
Every section's content MUST live inside a max-width container. The container is sacred.
```tsx
// CORRECT — content constrained, background can bleed
<section className="w-full bg-stone-950">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
    {/* All content here */}
  </div>
</section>

// WRONG — content touching edges
<section className="px-4">
  {/* Content can stretch to viewport edge */}
</section>
```
- Use `max-w-7xl` (1280px) as the default container
- Use `px-6 lg:px-8` for horizontal padding (24px mobile, 32px desktop)
- NEVER let text or cards touch the viewport edge
- Background colors/images can go full-width; content NEVER does

### 2. SSR BY DEFAULT
```tsx
// CORRECT — Server Component (default, no directive needed)
export default function PricingPage() {
  return <PricingSection />
}

// CORRECT — Only the interactive part is client
"use client"
export function MobileNavToggle() {
  const [open, setOpen] = useState(false)
  // ...
}

// WRONG — Entire page marked as client
"use client"  // ← NEVER DO THIS ON A PAGE
export default function PricingPage() { ... }
```

### 3. TEXT MUST NEVER ORPHAN
An orphan is a single word alone on the last line. A widow is a very short last line relative to the paragraph.
- Headings: Use `text-balance` CSS or `text-wrap: balance`
- Subheadings: Use `max-w-` constraints to control line breaks
- Feature descriptions: Set explicit `max-w-` on the text container AND use `text-pretty`
- If specifying "2 lines" or "3 lines": use `line-clamp-2` / `line-clamp-3` AND size the container so the text fills evenly
- NEVER rely on the text to wrap "naturally" — always constrain it

```tsx
// CORRECT
<h2 className="text-4xl font-bold tracking-tight text-balance">
  Turn LinkedIn into your top revenue channel
</h2>
<p className="mt-4 max-w-2xl text-lg text-pretty text-stone-400">
  Our AI-powered outbound engine books qualified meetings while you focus on closing.
</p>

// WRONG — no width constraint, text will orphan on large screens
<p className="text-lg text-stone-400">
  Our AI-powered outbound engine books qualified meetings while you focus on closing.
</p>
```

### 4. GRID ALIGNMENT IS LAW
When items are in a grid, EVERY property must match across siblings:
- Same height (use `h-full` on cards inside grid)
- Same padding
- Same text sizes
- Same number of visual elements
- If one card has an icon, ALL cards have icons
- If one card has 2 lines of description, ALL cards should have ~2 lines

```tsx
// CORRECT — uniform grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map(f => (
    <div key={f.id} className="flex flex-col h-full rounded-2xl border border-stone-800 bg-stone-900 p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
        <f.icon className="h-6 w-6 text-amber-500" />
      </div>
      <h3 className="text-lg font-semibold text-white">{f.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-400 line-clamp-3">
        {f.description}
      </p>
    </div>
  ))}
</div>
```

### 5. MOBILE-FIRST, ALWAYS
- Write mobile styles first, then layer `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Navigation: hamburger on mobile, full nav on `lg:` and up
- Grids: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`
- Font sizes: start smaller, scale up (`text-3xl lg:text-5xl xl:text-6xl`)
- Padding: less on mobile, more on desktop (`py-16 lg:py-24 xl:py-32`)
- NEVER hide critical content on mobile — reflow it, don't remove it
- Test: content must NEVER overflow horizontally on 320px width
- Text must NEVER be pushed left on mobile — always centered or properly padded

### 6. ONE HEADER, ONE FOOTER, ONE SOURCE OF TRUTH
- `Header` and `Footer` components are defined ONCE in `components/layout/`
- They are placed in `app/layout.tsx` and NEVER duplicated in pages
- Header is sticky/fixed with `backdrop-blur`
- Mobile nav is a separate `"use client"` component composed inside Header
- The header MUST look identical on every page

### 7. FONT LOADING IS SACRED
```tsx
// app/layout.tsx — THE ONLY PLACE fonts are loaded
import { Inter, Space_Grotesk } from 'next/font/google'
// OR for local fonts:
import localFont from 'next/font/local'

const heading = localFont({
  src: './fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```
- NEVER import fonts in any other file
- NEVER use `<link>` tags for Google Fonts
- ALWAYS use CSS variables for font families

### 8. DESIGN TOKENS LIVE IN CSS
All design decisions (colors, spacing scale, radii, shadows) are defined as CSS custom properties in `globals.css` and consumed via Tailwind. See `docs/DESIGN-SYSTEM.md` for the full token spec.

### 9. COMPONENT COMPOSITION OVER DUPLICATION
- If a pattern appears twice, extract it into a component
- Every component has a SINGLE responsibility
- Props have TypeScript interfaces with JSDoc comments
- Default props for optional values — components must render without required configuration

### 10. IMAGES ARE OPTIMIZED OR REJECTED
```tsx
// CORRECT
import Image from 'next/image'
<Image
  src="/images/hero.webp"
  alt="Descriptive alt text that aids accessibility"
  width={1200}
  height={800}
  priority  // Only for above-the-fold images
  className="rounded-2xl object-cover"
/>

// WRONG
<img src="/images/hero.png" />
```

### 11. ACCESSIBILITY IS NOT OPTIONAL
- Every interactive element is keyboard-navigable
- Color contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for large text
- All images have descriptive `alt` text
- Form inputs have associated `<label>` elements
- Focus rings are visible (`focus-visible:ring-2 focus-visible:ring-offset-2`)
- Skip-to-content link at the top of the page
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`

### 12. PERFORMANCE BUDGET
- Lighthouse score ≥ 90 on all four categories
- No layout shift (CLS < 0.1) — always set `width` and `height` on images
- LCP < 2.5s — prioritize above-fold images, minimize JS
- No unused CSS/JS in production bundle
- Lazy load below-fold images and heavy components with `next/dynamic`

---

## Anti-Patterns (INSTANT REJECTION)

If Claude Code produces ANY of these, the output is rejected:

| Anti-Pattern | Why It's Bad |
|---|---|
| `"use client"` on a page or layout file | Kills SSR, destroys SEO, bloats bundle |
| No `max-w-` container on section content | Content bleeds to edges, looks amateur |
| `<img>` tag instead of `<Image>` | No optimization, layout shift, slow |
| Inline font `<link>` tag | Blocks rendering, not cacheable |
| Text with no width constraint on desktop | Orphans, widows, 200-char lines |
| Feature cards with unequal heights/content | Visually broken grid |
| Mobile nav that doesn't close on route change | UX failure |
| Hardcoded colors instead of CSS variables | Impossible to theme, inconsistent |
| Mixing icon libraries | Visual inconsistency |
| `px` values for spacing instead of Tailwind scale | Breaks design system |
| Purple/blue gradient on white background | Generic AI slop |
| `onClick` handlers on server components | Will crash at runtime |
| No `alt` text on images | Accessibility violation |
| Horizontal scroll on mobile | Broken layout |

---

## Build Sequence (Follow This Order)

When building a site from scratch, ALWAYS follow this order:

1. **Initialize project** — `npx create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` disabled
2. **Set up design tokens** — `globals.css` with all CSS custom properties per `docs/DESIGN-SYSTEM.md`
3. **Configure fonts** — Load in `app/layout.tsx` only
4. **Build layout components** — Header, Footer, MobileNav, Container
5. **Build UI primitives** — Button, Badge, Card, SectionHeader
6. **Build page sections** — Hero, Features, Testimonials, CTA, etc. per `docs/SECTIONS.md`
7. **Compose pages** — Import sections, assemble pages
8. **Add content layer** — Blog/CMS setup if needed
9. **Polish** — Animations, transitions, dark mode, final responsive pass
10. **Audit** — Lighthouse, accessibility check, mobile screenshot review

---

## Content Architecture (CMS)

### Blog Posts (Markdown/MDX)
```md
---
title: "How We Generated 26,000 Event Registrations"
slug: "26000-event-registrations"
date: "2025-01-15"
author: "priyanshu"
excerpt: "A deep dive into our LinkedIn Events strategy..."
image: "/images/blog/events-case-study.webp"
tags: ["linkedin-events", "case-study", "lead-generation"]
published: true
---
```

### Team Members (Markdown or JSON)
```json
{
  "name": "Priyanshu Singh",
  "role": "Founder & CEO",
  "image": "/images/team/priyanshu.webp",
  "linkedin": "https://linkedin.com/in/...",
  "bio": "7+ years in B2B lead generation..."
}
```

### Case Studies (Markdown/MDX)
```md
---
title: "IBC Group"
client: "Mario Nawfal"
result: "26,092 event registrations"
service: "LinkedIn Events"
logo: "/images/clients/ibc.svg"
featured: true
---
```

Adding new content = adding a new `.md` file. No code changes required.

---

## When In Doubt

1. Is content inside a `max-w-7xl` container? → If no, fix it.
2. Is the component a Server Component? → If it has state/effects, make ONLY that part client.
3. Does text have `text-balance`, `text-pretty`, or `max-w-` constraints? → If no, add them.
4. Do grid children have uniform height/padding/content? → If no, normalize them.
5. Does it look good at 320px wide? → If no, fix mobile first.
6. Are colors using CSS variables? → If no, use tokens.
7. Does it look like every other AI-generated site? → If yes, start over.

---

@docs/DESIGN-SYSTEM.md
@docs/COMPONENTS.md
@docs/SECTIONS.md
