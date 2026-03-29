# BUILD-ORCHESTRATOR.md
# Complete Website Build Process — From Zero to Production
# For use with Claude Code alongside CLAUDE.md and /docs/ files

---

## HOW THIS FILE WORKS

This is the **build orchestration layer** that sits on top of the existing directive files. It defines:
1. The intake & discovery process (what to ask for before writing any code)
2. Complete dependency/package list with install commands
3. SEO toolkit (technical + content + schema + analytics)
4. Copywriting framework (headlines, CTAs, page copy patterns)
5. Blog/content management system
6. Git & GitHub workflow
7. Hosting & performance planning
8. Full build sequence from skeleton to production

**Read order:**
1. This file (BUILD-ORCHESTRATOR.md) — understand the process
2. CLAUDE.md — understand the rules
3. docs/DESIGN-SYSTEM.md — understand the tokens
4. docs/COMPONENTS.md — understand the components
5. docs/SECTIONS.md — understand the page layouts
6. docs/WEBFLOW-DESIGN-VOCABULARY.md — understand the design language

---

# PHASE 0: INTAKE & DISCOVERY (Before Writing ANY Code)

## Step 1: Gather Business Context

Before touching code, collect ALL of the following:

### Required Materials
- [ ] **What the business does** — elevator pitch, services, target audience, differentiators
- [ ] **Existing brand assets** — logo (SVG preferred), brand colors, fonts, brand guidelines PDF
- [ ] **Competitor/inspiration sites** — URLs of 3-5 sites they like (note what specifically they like about each)
- [ ] **Existing content** — current website URL, pitch decks, proposals, case studies, testimonials, team bios
- [ ] **Photography** — team headshots, product screenshots, office photos, client logos
- [ ] **Business goals for the site** — lead gen, booking calls, brand credibility, recruiting, investor relations

### Questions to Ask
```
SITE STRUCTURE
- Single-page or multi-page?
- If multi-page, which pages do you need?
  Standard options: Home, About, Services/Solutions, Case Studies, Blog, Pricing, Contact, Team, Privacy/Terms
- Do you need a blog/content section?
- Do you need gated content or lead magnets?
- How many service lines / products to feature?

BRAND & DESIGN
- Dark mode, light mode, or both?
- Preferred aesthetic? (Minimal, Bold, Corporate, Startup, Premium, Technical)
- Any colors that are non-negotiable?
- Preferred fonts? (or let us choose)
- Illustration style preference? (None, Abstract shapes, Icons, Custom illustration, 3D)

TECHNICAL
- Domain name confirmed?
- Where will it be hosted? (Vercel recommended, Netlify, other)
- Any existing analytics (GA4, GTM)?
- Any third-party integrations? (CRM, Calendly, Hubspot, Intercom, etc.)
- Contact form — where should submissions go? (Email, CRM, Slack)
- Do you need a CMS for non-developers to edit content?

CONTENT
- Who writes the copy? (Us, them, collaborative)
- How many blog posts at launch? (0 is fine)
- How many case studies at launch?
- Do you have testimonials ready?
```

## Step 2: Review Materials

After receiving materials, review and produce:

1. **Site Map** — visual hierarchy of all pages and their relationships
2. **Content Inventory** — what content exists vs what needs to be created
3. **Technical Plan** — hosting, domain, integrations, CMS choice
4. **Design Direction** — color scheme, font pairing, aesthetic reference
5. **Page Priority** — which pages to build first (Homepage always first)

## Step 3: Get Approval on Plan

Present the plan. Get sign-off before writing code. Changes in planning cost minutes. Changes in code cost hours.

---

# PHASE 1: TECHNICAL SETUP & SKELETON

## Complete Dependencies Toolkit

### Core Framework
```bash
# Initialize project
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd project-name
```

### Essential Packages (Install ALL of these)
```bash
# Styling
npm install tailwindcss @tailwindcss/typography @tailwindcss/forms
npm install clsx tailwind-merge
# → clsx: conditional class joining
# → tailwind-merge: deduplicates conflicting Tailwind classes
# → @tailwindcss/typography: prose classes for rich text / blog content
# → @tailwindcss/forms: reset/normalize form element styling

# UI Components (choose ONE)
npm install lucide-react
# → Icon library. Do NOT mix with other icon libraries.

# Optional: shadcn/ui (component primitives)
npx shadcn@latest init
# Then add individual components:
npx shadcn@latest add button card badge dialog dropdown-menu sheet separator
# → Only add what you need. Each component is copied into your codebase.

# MDX / Blog
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter          # Parse frontmatter from markdown files
npm install reading-time          # "5 min read" estimates
npm install rehype-pretty-code shiki  # Syntax highlighting for code blocks
npm install rehype-slug rehype-autolink-headings  # Auto-link heading anchors
npm install remark-gfm            # GitHub Flavored Markdown (tables, strikethrough, etc.)
# → gray-matter: extracts YAML frontmatter from .md/.mdx files
# → reading-time: calculates estimated reading time from word count
# → rehype-pretty-code + shiki: beautiful code syntax highlighting
# → rehype-slug + rehype-autolink-headings: adds IDs and links to headings
# → remark-gfm: enables tables, task lists, strikethrough in markdown

# SEO
# No package needed — Next.js 15 has built-in Metadata API, sitemap.ts, robots.ts
# Optional if you need more control:
npm install next-sitemap           # Advanced sitemap generation with config file

# Analytics
npm install @vercel/analytics      # Vercel Analytics (zero-config)
npm install @vercel/speed-insights # Core Web Vitals monitoring
# OR for Google Analytics:
npm install @next/third-parties    # Official Next.js GA4 integration

# Forms & Email
npm install resend                 # Transactional email (form submissions)
npm install zod                    # Form validation (server + client)
npm install react-hook-form        # Client-side form state management
npm install @hookform/resolvers    # Connects react-hook-form to zod

# Animation (optional — only if needed)
npm install framer-motion          # Complex animations, page transitions
# OR for lightweight scroll reveals:
# Use CSS animations + Intersection Observer (no package needed)

# Date Formatting
npm install date-fns               # Lightweight date formatting ("Jan 15, 2025")

# Development
npm install -D prettier prettier-plugin-tailwindcss  # Auto-sort Tailwind classes
npm install -D @types/mdx          # TypeScript types for MDX
```

### Package Purpose Reference

| Package | Purpose | Required? |
|---|---|---|
| `tailwindcss` | Utility-first CSS framework | Yes |
| `@tailwindcss/typography` | Prose styling for blog/rich text | Yes (if blog) |
| `@tailwindcss/forms` | Form element reset | Yes (if forms) |
| `clsx` | Conditional class names | Yes |
| `tailwind-merge` | Deduplicate Tailwind classes | Yes |
| `lucide-react` | Icon library | Yes |
| `@next/mdx` | MDX support in Next.js | Yes (if blog) |
| `gray-matter` | Parse markdown frontmatter | Yes (if blog) |
| `reading-time` | Estimated read time | Optional |
| `rehype-pretty-code` + `shiki` | Code syntax highlighting | Optional |
| `rehype-slug` | Heading anchor IDs | Yes (if blog) |
| `remark-gfm` | Tables/strikethrough in markdown | Yes (if blog) |
| `next-sitemap` | Advanced sitemap generation | Optional |
| `@vercel/analytics` | Privacy-friendly analytics | Recommended |
| `@vercel/speed-insights` | Core Web Vitals monitoring | Recommended |
| `resend` | Transactional email API | Yes (if contact form) |
| `zod` | Schema validation | Yes (if forms) |
| `react-hook-form` | Form state management | Yes (if complex forms) |
| `framer-motion` | Animation library | Optional |
| `date-fns` | Date formatting | Yes |
| `prettier` | Code formatting | Yes (dev) |
| `prettier-plugin-tailwindcss` | Auto-sort Tailwind classes | Yes (dev) |

### Links & Resources

| Resource | URL |
|---|---|
| Next.js Docs | https://nextjs.org/docs |
| Next.js App Router | https://nextjs.org/docs/app |
| Next.js Metadata API | https://nextjs.org/docs/app/api-reference/functions/generate-metadata |
| Next.js Image Optimization | https://nextjs.org/docs/app/api-reference/components/image |
| Next.js Font Optimization | https://nextjs.org/docs/app/api-reference/components/font |
| Next.js MDX Guide | https://nextjs.org/docs/app/guides/mdx |
| Next.js Sitemap/Robots | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap |
| Next.js Production Checklist | https://nextjs.org/docs/app/guides/production-checklist |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| Tailwind Typography Plugin | https://tailwindcss.com/docs/typography-plugin |
| shadcn/ui Components | https://ui.shadcn.com |
| Lucide Icons | https://lucide.dev/icons |
| Resend Email API | https://resend.com/docs |
| Zod Validation | https://zod.dev |
| Framer Motion | https://motion.dev |
| Vercel Deployment | https://vercel.com/docs |
| Vercel Analytics | https://vercel.com/docs/analytics |
| Google Search Console | https://search.google.com/search-console |
| Schema.org Reference | https://schema.org |
| Rich Results Test | https://search.google.com/test/rich-results |
| PageSpeed Insights | https://pagespeed.web.dev |
| WAVE Accessibility Test | https://wave.webaim.org |
| Contrast Checker | https://webaim.org/resources/contrastchecker |
| Font Pairing Resources | https://fontpair.co / https://fonts.google.com |
| Unsplash (free photos) | https://unsplash.com |
| Pexels (free photos) | https://pexels.com |
| Remove.bg (background removal) | https://remove.bg |
| Squoosh (image compression) | https://squoosh.app |
| SVGOMG (SVG optimizer) | https://svgomg.net |
| Realtime Colors (palette tool) | https://realtimecolors.com |
| Coolors (palette generator) | https://coolors.co |
| Type Scale Calculator | https://typescale.com |

---

## Project Skeleton

After installing dependencies, create this file structure:

```bash
# Create directory structure
mkdir -p src/app/(pages)/{about,solutions,case-studies,blog,blog/\[slug\],pricing,contact,team,privacy}
mkdir -p src/components/{layout,sections,ui,content}
mkdir -p src/content/{blog,case-studies,team}
mkdir -p src/lib
mkdir -p public/images/{blog,team,clients,og}
mkdir -p public/fonts
```

### Files to Create Immediately (Before Any Design Work)

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, Header/Footer
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + design tokens (CSS custom properties)
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt configuration
│   ├── not-found.tsx           # Custom 404 page
│   └── (pages)/                # All other pages
├── components/
│   └── layout/
│       ├── Header.tsx          # Site header/nav (Server Component)
│       ├── MobileNav.tsx       # Mobile menu ("use client")
│       ├── Footer.tsx          # Site footer (Server Component)
│       └── Container.tsx       # Max-width wrapper
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── constants.ts            # Site metadata, nav links, social links
│   ├── content.ts              # Blog/case study fetching functions
│   └── schemas.ts              # Zod schemas for forms
├── mdx-components.tsx          # Global MDX component overrides
├── next.config.mjs             # Next.js + MDX configuration
├── tailwind.config.ts          # Tailwind theme extensions
├── .prettierrc                 # Prettier config
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

### Starter Files

**`src/lib/utils.ts`**
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${path}`
}
```

**`src/lib/constants.ts`**
```typescript
export const siteConfig = {
  name: 'Company Name',
  description: 'One-line description of the business',
  url: 'https://example.com',
  ogImage: 'https://example.com/images/og/default.jpg',
  creator: 'Founder Name',
  email: 'hello@example.com',
  phone: '+44 XXX XXX XXXX',
  address: 'London, UK',
  social: {
    linkedin: 'https://linkedin.com/company/example',
    twitter: 'https://twitter.com/example',
  },
}

export const navLinks = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const

export const footerLinks = {
  services: [
    { label: 'Service 1', href: '/solutions#service-1' },
    { label: 'Service 2', href: '/solutions#service-2' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const
```

**`.prettierrc`**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**`.gitignore`** (additions to Next.js default)
```
# dependencies
node_modules/
.pnp
.pnp.js

# build
.next/
out/
build/

# env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# misc
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
```

---

## Git & GitHub Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "feat: initial project skeleton with dependencies"
git branch -M main
git remote add origin git@github.com:username/project-name.git
git push -u origin main
```

### Branch Strategy
```
main          — production (auto-deploys to Vercel)
├── develop   — staging (preview deploys)
│   ├── feat/homepage       — feature branches
│   ├── feat/blog-system
│   ├── feat/contact-form
│   └── fix/mobile-nav
```

### Commit Convention
```
feat: add homepage hero section
fix: mobile nav not closing on route change
style: update button hover states
content: add 3 new blog posts
seo: add JSON-LD schema to all pages
perf: optimize hero image loading
refactor: extract Container component
chore: update dependencies
docs: add README setup instructions
```

### GitHub Compatibility Checklist
- [ ] `.gitignore` includes `node_modules/`, `.next/`, `.env.local`
- [ ] `package.json` has correct `name`, `version`, `scripts`
- [ ] `README.md` includes setup instructions, tech stack, deploy instructions
- [ ] No secrets/API keys committed (use `.env.local` + Vercel env vars)
- [ ] Repository is private (for client projects)

---

# PHASE 2: DESIGN SYSTEM & COLOR SCHEME

## Color Scheme Creation Process

1. Start with the brand's primary color (from logo or brand guidelines)
2. Generate a full palette using https://realtimecolors.com or https://coolors.co
3. Define semantic tokens (surface, text, accent, border)
4. Test contrast ratios: https://webaim.org/resources/contrastchecker
5. Apply tokens to `globals.css` as CSS custom properties

### Color Token Structure
```css
/* globals.css — CUSTOMIZE THESE VALUES */
:root {
  /* Primitive palette */
  --neutral-50: #fafaf9;
  --neutral-100: #f5f5f4;
  --neutral-200: #e7e5e4;
  --neutral-300: #d6d3d1;
  --neutral-400: #a8a29e;
  --neutral-500: #78716c;
  --neutral-600: #57534e;
  --neutral-700: #44403c;
  --neutral-800: #292524;
  --neutral-900: #1c1917;
  --neutral-950: #0c0a09;

  --primary-400: #fbbf24;
  --primary-500: #f59e0b;
  --primary-600: #d97706;

  /* Semantic tokens (dark theme default) */
  --surface-primary: var(--neutral-950);
  --surface-secondary: var(--neutral-900);
  --surface-tertiary: var(--neutral-800);
  --text-primary: #ffffff;
  --text-secondary: var(--neutral-400);
  --text-tertiary: var(--neutral-500);
  --accent: var(--primary-500);
  --accent-hover: var(--primary-400);
  --border-default: var(--neutral-800);
  --border-strong: var(--neutral-700);
}
```

### Font Selection
Choose a heading + body pair. Recommended professional pairings:
- **Inter** (body) + **Cal Sans** or **Instrument Serif** (headings) — Modern startup
- **DM Sans** (both) — Clean SaaS
- **Plus Jakarta Sans** (both) — Friendly professional
- **Geist** (both) — Technical/developer
- **Satoshi** (body) + **Clash Display** (headings) — Bold agency

Load via `next/font`:
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const heading = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})
```

---

# PHASE 3: COMPLETE SEO TOOLKIT

## Technical SEO (Built into the skeleton)

### 1. Metadata API (Per-Page SEO)
```tsx
// app/layout.tsx — Global defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Company Name — Tagline',
    template: '%s | Company Name',  // Pages get: "About | Company Name"
  },
  description: 'Default site description (150-160 chars).',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Company Name',
    images: [{ url: '/images/og/default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

// app/(pages)/about/page.tsx — Per-page override
export const metadata: Metadata = {
  title: 'About Us',  // Becomes: "About Us | Company Name"
  description: 'Learn about our team, mission, and 7+ years of B2B lead generation expertise.',
  alternates: { canonical: '/about' },
}
```

### 2. Sitemap (Auto-Generated)
```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.6 },
  ]

  const posts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...posts]
}
```

### 3. Robots.txt
```tsx
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

### 4. JSON-LD Schema (Structured Data)
```tsx
// components/JsonLd.tsx
export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Company Name',
      url: 'https://example.com',
      logo: 'https://example.com/images/logo.svg',
      sameAs: ['https://linkedin.com/company/example'],
      contactPoint: { '@type': 'ContactPoint', email: 'hello@example.com', contactType: 'sales' },
    })}} />
  )
}

export function ArticleSchema({ title, description, date, author, url, image }: ArticleSchemaProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      datePublished: date,
      author: { '@type': 'Person', name: author },
      url,
      image,
    })}} />
  )
}

export function FAQSchema({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })}} />
  )
}
```

### 5. 301 Redirects
```js
// next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      { source: '/old-page', destination: '/new-page', permanent: true },
      // Add more as needed
    ]
  },
}
```

### 6. Analytics
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### SEO Checklist Per Page
- [ ] Unique `<title>` (50-60 chars, primary keyword near front)
- [ ] Unique `meta description` (150-160 chars, includes CTA)
- [ ] `canonical` URL set
- [ ] OG image (1200x630px), OG title, OG description
- [ ] H1 tag (one per page, includes primary keyword)
- [ ] Heading hierarchy (H1 → H2 → H3, no skipped levels)
- [ ] Alt text on all content images
- [ ] Internal links to related pages
- [ ] JSON-LD schema where applicable (Organization, Article, FAQ, Service)
- [ ] Clean URL slug (lowercase, hyphens, keyword-rich, no dates)

---

# PHASE 4: COPYWRITING FRAMEWORK

## Headline Formulas

### Hero Headlines (5-10 words max)
```
[Outcome] + [For Whom]
"Qualified Meetings for B2B Sales Teams"

[Verb] + [Object] + [Differentiator]
"Book More Meetings Without Cold Calling"

[Number] + [Outcome] + [Timeframe]
"10,000+ Leads Generated in 60 Days"

[Question that implies the answer]
"What If Every LinkedIn Message Got a Reply?"
```

### Section Headlines
```
Problem section:    "Tired of [pain point]?"
Solution section:   "How [Company] Works"
Features section:   "Everything You Need to [Outcome]"
Results section:    "Real Results, Real Numbers"
Testimonials:       "What Our Clients Say"
CTA section:        "Ready to [Desired Outcome]?"
```

### Button/CTA Copy (Action-oriented, specific)
```
Primary:   "Book a Discovery Call" / "Get Your Free Audit" / "Start Generating Leads"
Secondary: "See How It Works" / "View Case Studies" / "See Pricing"
AVOID:     "Learn More" / "Click Here" / "Submit" / "Get Started" (too generic)
```

## Page Copy Patterns

### Homepage Flow
1. **Hero:** One bold promise + one supporting sentence + primary CTA + social proof
2. **Logo cloud:** "Trusted by" — 6-10 client logos
3. **Problem:** 3 pain points your audience feels
4. **Solution:** How your service solves those problems (3-4 steps)
5. **Features/Services:** What you offer (card grid)
6. **Results:** Hard numbers — meetings booked, leads generated, revenue driven
7. **Testimonials:** 2-3 client quotes with names, roles, companies
8. **Final CTA:** Restate the promise + booking link

### About Page Flow
1. **Hero:** Who you are + what you stand for (not "About Us" — something with energy)
2. **Story:** Founded when, why, the problem you saw in the market
3. **Mission/Values:** 3-4 core values (not generic — specific to your differentiators)
4. **Team:** Photo grid with names, roles, one-liner bios
5. **CTA:** "Want to work with us?"

### Service/Solutions Page Flow
1. **Hero:** Service name + one-line value prop
2. **Problem-Solution split:** Left: the problem, Right: your approach
3. **How It Works:** 3-4 numbered steps
4. **Feature details:** Deep dive on capabilities (alternating text/image sections)
5. **Case Study snippet:** One relevant result
6. **FAQ:** 5-8 questions
7. **CTA:** Book a call

### Copy Rules
- Write at an 8th-grade reading level. Short sentences. No jargon.
- Every sentence should earn its place. If it doesn't inform or persuade, cut it.
- Use "you" more than "we." The page is about the visitor, not the company.
- Numbers > adjectives. "26,000 registrations" > "amazing results."
- Break text into scannable chunks: no paragraph longer than 3-4 lines.
- First sentence of any section should make sense on its own (people scan).

---

# PHASE 5: BLOG / CONTENT MANAGEMENT

## Blog Architecture

### Content File Structure
```
src/content/blog/
├── how-we-generated-26000-registrations.mdx
├── linkedin-outreach-benchmarks-2025.mdx
├── pay-per-meeting-vs-retainer.mdx
└── cold-email-vs-linkedin-outbound.mdx
```

### Frontmatter Schema
```yaml
---
title: "How We Generated 26,000 Event Registrations Without Paid Ads"
description: "A deep dive into the LinkedIn Events strategy that produced 26,000+ registrations for IBC Group with a 20% show-up rate."
date: "2025-01-15"
author: "Priyanshu Singh"
image: "/images/blog/event-registrations.webp"
tags: ["linkedin-events", "case-study", "lead-generation"]
featured: true
published: true
---
```

### Content Fetching Library
```tsx
// src/lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
  featured: boolean
  published: boolean
  readingTime: string
  content: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      return {
        slug,
        content,
        readingTime: stats.text,
        ...data,
      } as Post
    })
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(post => post.slug === slug)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.tags.includes(tag))
}

export function getFeaturedPosts(count = 3): Post[] {
  return getAllPosts().filter(post => post.featured).slice(0, count)
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap(post => post.tags)
  return [...new Set(tags)].sort()
}
```

### Blog Page
```tsx
// app/(pages)/blog/page.tsx
import { getAllPosts } from '@/lib/content'

export const metadata = { title: 'Blog', description: '...' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <SectionHeader title="Blog" description="Insights on B2B lead generation..." />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => <BlogCard key={post.slug} post={post} />)}
        </div>
      </Container>
    </section>
  )
}
```

### Blog Post Page
```tsx
// app/(pages)/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: [{ url: post.image }] },
    alternates: { canonical: `/blog/${post.slug}` },
  }
}
```

### Blog Content Types to Plan
- **Thought leadership:** Industry insights, trends, predictions
- **How-to guides:** Tactical content your audience can apply
- **Case studies:** Client results with specific metrics
- **Comparisons:** Your approach vs alternatives
- **Data/benchmarks:** Industry data compilations (link magnets)

---

# PHASE 6: HOSTING & PERFORMANCE PLAN

## Hosting Decision Tree

```
Vercel (RECOMMENDED for Next.js)
├── Free tier: 100GB bandwidth, serverless functions, preview deploys
├── Pro tier ($20/mo): analytics, more bandwidth, team features
├── Auto-deploys from GitHub on push to main
├── Preview deploys for every PR (staging built-in)
├── Edge network (CDN) — global, automatic
├── Built-in analytics + speed insights
└── Zero config for Next.js (they made Next.js)

Netlify (Alternative)
├── Similar to Vercel but Next.js support is secondary
└── Better for static-only sites

Self-hosted (AWS/VPS)
├── Only if specific compliance/data residency requirements
└── Much more ops overhead
```

## Performance Budget

| Metric | Target | How |
|---|---|---|
| Lighthouse Performance | ≥ 90 | SSR, image optimization, font loading |
| Lighthouse Accessibility | ≥ 95 | Semantic HTML, contrast, alt text, focus |
| Lighthouse Best Practices | ≥ 95 | HTTPS, no console errors, secure headers |
| Lighthouse SEO | 100 | Metadata, sitemap, robots, structured data |
| LCP (Largest Contentful Paint) | < 2.5s | Optimize hero image, preload fonts |
| CLS (Cumulative Layout Shift) | < 0.1 | Set image dimensions, `next/font` |
| FID/INP (Input Delay) | < 200ms | Minimize client JS, avoid heavy hydration |
| Total page weight | < 500KB | Compress images, tree-shake JS |

## Performance Checklist
- [ ] Images: WebP/AVIF format, responsive `sizes`, lazy loading
- [ ] Fonts: `next/font` (self-hosted, no layout shift)
- [ ] CSS: Tailwind purges unused styles automatically
- [ ] JS: Server Components by default, `"use client"` only on interactive leaves
- [ ] Third-party scripts: `next/script` with `strategy="lazyOnload"`
- [ ] Preload: hero image with `priority`, key fonts
- [ ] Reduce motion: `prefers-reduced-motion` respected

---

# PHASE 7: BUILD SEQUENCE (The Actual Build Order)

Follow this order. Do NOT skip steps.

### Step 1: Skeleton & Config
- [ ] Initialize Next.js project
- [ ] Install all dependencies
- [ ] Create directory structure
- [ ] Configure `next.config.mjs` (MDX, redirects)
- [ ] Configure `tailwind.config.ts` (design tokens, fonts, colors)
- [ ] Create `globals.css` with CSS custom properties
- [ ] Set up `lib/utils.ts`, `lib/constants.ts`
- [ ] Git init, first commit, push to GitHub

### Step 2: Design Tokens & Globals
- [ ] Define color palette in `globals.css`
- [ ] Configure fonts in `app/layout.tsx`
- [ ] Set global metadata defaults
- [ ] Add `<Analytics>` and `<SpeedInsights>`
- [ ] Create `sitemap.ts` and `robots.ts`

### Step 3: Layout Components
- [ ] Build `Container` component
- [ ] Build `Header` (server) + `MobileNav` (client)
- [ ] Build `Footer`
- [ ] Wire Header/Footer into `app/layout.tsx`
- [ ] Test: navigation works, mobile menu toggles, responsive

### Step 4: UI Primitives
- [ ] Build `Button` (variants: primary, secondary, ghost, link)
- [ ] Build `Badge` / `Tag`
- [ ] Build `SectionHeader` (overline + title + description)
- [ ] Build `Card` (shell — used by Feature, Testimonial, Blog cards)
- [ ] Verify all primitives render correctly at all breakpoints

### Step 5: Homepage
- [ ] Hero section
- [ ] Logo cloud / social proof
- [ ] Problem section (3 pain points)
- [ ] Solution / How It Works
- [ ] Features / Services grid
- [ ] Results / Stats
- [ ] Testimonials
- [ ] Final CTA
- [ ] Test entire page mobile → desktop

### Step 6: Inner Pages (One at a Time)
- [ ] About
- [ ] Solutions / Services
- [ ] Case Studies (list + detail)
- [ ] Pricing
- [ ] Contact (with working form)
- [ ] Team
- [ ] Privacy / Terms

### Step 7: Blog System
- [ ] Content fetching library (`lib/content.ts`)
- [ ] Blog list page with card grid
- [ ] Blog post page with MDX rendering + prose styling
- [ ] Tag filtering (optional)
- [ ] Related posts (optional)
- [ ] RSS feed (optional: `app/feed.xml/route.ts`)

### Step 8: SEO & Schema
- [ ] Per-page metadata on all pages
- [ ] JSON-LD Organization schema (layout level)
- [ ] JSON-LD Article schema (blog posts)
- [ ] JSON-LD FAQ schema (where applicable)
- [ ] OG images for all pages (default + per-page)
- [ ] Test in Rich Results Test: https://search.google.com/test/rich-results

### Step 9: Polish
- [ ] Scroll animations (fade-in on scroll, stagger)
- [ ] Hover states on all interactive elements
- [ ] Focus-visible rings on all interactive elements
- [ ] 404 page design
- [ ] Loading states (if any async content)
- [ ] Dark mode toggle (if applicable)
- [ ] Favicon + app icons (`app/icon.tsx` or `public/favicon.ico`)

### Step 10: QA & Launch
- [ ] Lighthouse audit all pages (target: ≥90 all categories)
- [ ] Test at 320px, 375px, 768px, 1024px, 1280px, 1536px
- [ ] Test in Chrome, Safari, Firefox
- [ ] Test all forms (submit, success, error states)
- [ ] Test all links (no broken links)
- [ ] Test sitemap.xml and robots.txt in browser
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Vercel deployment, custom domain, SSL
- [ ] Performance test: https://pagespeed.web.dev
- [ ] Accessibility test: https://wave.webaim.org
- [ ] Social sharing preview: https://www.opengraph.xyz

---

# APPENDIX: COMPATIBILITY NOTES

### Browser Support
- Chrome 90+ (auto-update)
- Safari 15+ (iOS 15+)
- Firefox 90+ (auto-update)
- Edge 90+ (Chromium-based)
- No IE11 support (dead browser)

### Node.js Version
- Node.js 18.17+ required for Next.js 15
- Recommended: Node.js 20 LTS
- Specify in `.nvmrc`: `20`
- Specify in `package.json`: `"engines": { "node": ">=18.17" }`

### Tailwind CSS v4 Notes
- v4 uses CSS-first configuration (no `tailwind.config.js` required for basics)
- PostCSS plugin: `@tailwindcss/postcss`
- Typography plugin: `@tailwindcss/typography`
- Forms plugin: `@tailwindcss/forms`
- Custom config still supported via `tailwind.config.ts` for theme extensions

### Vercel-Specific
- `vercel.json` not needed for standard Next.js projects
- Environment variables set in Vercel dashboard (not committed to Git)
- Preview deployments auto-created for every PR
- Production deploys trigger on push to `main`
- Custom domain configured in Vercel dashboard > Domains
