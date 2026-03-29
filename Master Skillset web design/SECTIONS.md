# SECTIONS.md — Page Section Blueprints

> Every page is composed of sections. This file defines what sections exist, their anatomy, and their composition rules.
> When building a page, pick sections from this menu and compose them in order.

---

## Section Assembly Rules

1. **Every section uses `<Container>`** for its inner content — NO EXCEPTIONS.
2. **Alternate section backgrounds** to create visual rhythm. Don't use the same background for consecutive sections. Patterns: `surface-primary` → `surface-secondary` → `surface-primary`, or use subtle border separators.
3. **Every section starts with `<SectionHeader>`** (except Hero, Header, Footer).
4. **Vertical padding:** `py-16 md:py-20 lg:py-24 xl:py-32` — consistent everywhere.
5. **Content gap from header:** `mt-12 lg:mt-16` between `<SectionHeader>` and section content.
6. **No orphan sections.** Every section should connect logically to the next. Use transition elements or complementary messaging.

---

## Homepage Section Order (Recommended)

```
1. Header (sticky, global)
2. Hero
3. Logo Cloud / Social Proof
4. Problem / Pain Points
5. Solution / How It Works
6. Features / Services Grid
7. Case Studies / Results
8. Testimonials
9. Pricing (optional on homepage)
10. FAQ
11. Final CTA
12. Footer (global)
```

This order follows the narrative: **Hook → Credibility → Problem → Solution → Proof → Action**

---

## Section Blueprints

### 1. Hero Section

The most important 5 seconds. Make or break.

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              [OVERLINE — small badge/label]             │
│                                                        │
│          [HEADLINE — 5-10 words, one sentence]         │
│                                                        │
│      [SUBHEADLINE — 1-2 sentences, max-w-2xl]         │
│                                                        │
│         [PRIMARY CTA]    [SECONDARY CTA]               │
│                                                        │
│        [SOCIAL PROOF — logos or stat strip]             │
│                                                        │
│     [OPTIONAL: Hero image/screenshot/visual]           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Headline: `text-display font-heading font-bold text-balance` — MAX 10 words, no jargon
- Subheadline: `text-body-lg text-secondary max-w-2xl mx-auto text-pretty` — clarifies the headline
- Two CTAs: primary (filled) + secondary (outline/ghost)
- Social proof strip directly below CTAs — logos or "Trusted by 500+ companies"
- Padding: `pt-24 lg:pt-32 pb-16 lg:pb-24` (extra top padding to account for fixed header)
- Content: centered (`text-center`) by default
- OPTIONAL: background pattern, gradient, or subtle animated element (NOT a generic particle effect)

**Anti-patterns (BLOCKED):**
- More than 2 CTAs
- Headline longer than 12 words
- No social proof
- Generic stock illustration
- Full-width background image that makes text unreadable
- Headline that could describe any company ("Transform your business with AI")

---

### 2. Logo Cloud

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│          Trusted by industry leaders                   │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]     │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Sits directly below Hero (little to no gap, or overlapping)
- Logos: grayscale, uniform height (`h-8`), `opacity-40 hover:opacity-100 hover:grayscale-0`
- Grid or horizontal scroll (for many logos)
- Text above: short, subtle — "Trusted by" or "Powering growth for"
- This section can be compact — `py-8 lg:py-12`

---

### 3. Problem / Pain Points Section

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader — "The Problem" or provocative hook]   │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Pain #1  │  │ Pain #2  │  │ Pain #3  │            │
│  │ Icon     │  │ Icon     │  │ Icon     │            │
│  │ Title    │  │ Title    │  │ Title    │            │
│  │ Desc     │  │ Desc     │  │ Desc     │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- 3 pain points (max 4)
- Heading: empathize with the buyer's frustration
- Cards have red/warning-adjacent color accents (not full red — more like muted warm tones)
- This section sets up the solution — ending should transition: "There's a better way"

---

### 4. Solution / How It Works

**Anatomy — Option A: Steps (numbered process):**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader — "How It Works"]                      │
│                                                        │
│  ① Discovery Call ──→ ② Campaign Setup ──→ ③ Results  │
│     Description          Description         Desc      │
└────────────────────────────────────────────────────────┘
```

**Anatomy — Option B: Split content (text + visual):**
```
┌────────────────────────────────────────────────────────┐
│  [Text block — left]         [Image/Screenshot — right]│
│  Heading                                               │
│  Description                                           │
│  Bullet benefits                                       │
│  CTA button                                            │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Steps: 3–4 steps maximum, numbered or with connecting line/arrow
- Each step has: number/icon, title (short), description (1–2 sentences)
- Steps can be horizontal on desktop, vertical on mobile
- If using split layout: image on right (desktop), stacked on mobile
- Timeline variant: vertical line with alternating content

---

### 5. Features / Services Grid

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader]                                       │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Feature  │  │ Feature  │  │ Feature  │            │
│  │  Card    │  │  Card    │  │  Card    │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Feature  │  │ Feature  │  │ Feature  │            │
│  │  Card    │  │  Card    │  │  Card    │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (for 6 features)
- Grid: `grid-cols-1 md:grid-cols-2` (for 4 features)
- ALL CARDS MUST BE IDENTICAL IN STRUCTURE (see COMPONENTS.md → Feature Card)
- Icons: all from same icon library, same size, same container style
- If you have 5 features: use 3+2 grid layout, NOT a 5-column grid
- Consider: one "featured" card that spans 2 columns for the primary service
- NEVER use more than 9 cards — if you have more, group into tabs or sub-categories

**Variation — Bento Grid:**
For a more premium look, use asymmetric card sizes:
```
┌───────────────────┐  ┌────────┐
│   Large Feature   │  │ Small  │
│   (spans 2 cols)  │  │ Feature│
└───────────────────┘  └────────┘
┌────────┐  ┌────────┐  ┌────────┐
│ Feature│  │ Feature│  │ Feature│
└────────┘  └────────┘  └────────┘
```

---

### 6. Case Studies / Results

**Anatomy — Option A: Stats bar:**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader]                                       │
│                                                        │
│   26,092          6,000+         $100K         150+    │
│   Event Regs      Investor       Direct         Events │
│                   Leads          Sales                  │
└────────────────────────────────────────────────────────┘
```

**Anatomy — Option B: Case study cards:**
```
┌────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────┐           │
│  │ [Client Logo]  [Client Name]            │           │
│  │ "Result quote or headline"              │           │
│  │ Key metrics: 26K regs, 20% show-up      │           │
│  │ [Read Case Study →]                     │           │
│  └─────────────────────────────────────────┘           │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Lead with numbers — they're the most compelling content
- Stats: `text-4xl lg:text-5xl font-heading font-bold`
- Use accent color on numbers
- Case study cards link to full case study pages
- Include client name, industry, and service used

---

### 7. Testimonials

**Anatomy — Option A: Carousel (for 4+ testimonials):**
```
Single testimonial visible at a time, with navigation dots/arrows.
```

**Anatomy — Option B: Grid (for 3 testimonials):**
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ "Quote"  │  │ "Quote"  │  │ "Quote"  │
│ — Name   │  │ — Name   │  │ — Name   │
│   Role   │  │   Role   │  │   Role   │
└──────────┘  └──────────┘  └──────────┘
```

**Anatomy — Option C: Featured testimonial (for 1 killer quote):**
```
Large centered quote with big quotation marks, name, photo, and company below.
```

**Rules:**
- Carousel: `"use client"` component — include touch swipe support
- Grid: all cards same height
- Large quotation mark (`"`) as decorative element
- Photo: `rounded-full h-12 w-12`
- NEVER fake testimonials — use real quotes or placeholders marked as such

---

### 8. Pricing Section

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader]                                       │
│                                                        │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐        │
│  │ Tier 1   │  │ Tier 2       │  │ Tier 3   │        │
│  │          │  │ (POPULAR)    │  │          │        │
│  │ Price    │  │ Price        │  │ Price    │        │
│  │ Features │  │ Features     │  │ Features │        │
│  │ [CTA]    │  │ [CTA]        │  │ [CTA]    │        │
│  └──────────┘  └──────────────┘  └──────────┘        │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Popular tier: `ring-2 ring-primary-500` or `scale-105` to stand out
- "Popular" badge on the highlighted tier
- Feature lists: checkmarks for included, dashes for excluded
- Price: `text-4xl font-bold` with period (e.g., `/mo`)
- All tiers same height
- CTA button in every tier
- "All plans include..." section below tiers for shared features
- FAQ link or section nearby

---

### 9. FAQ Section

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│  [SectionHeader]                                       │
│                                                        │
│  ┌─────────────────────────────────────────┐           │
│  │ ▸ Question 1                            │           │
│  │   Answer text (collapsible)             │           │
│  ├─────────────────────────────────────────┤           │
│  │ ▸ Question 2                            │           │
│  ├─────────────────────────────────────────┤           │
│  │ ▸ Question 3                            │           │
│  └─────────────────────────────────────────┘           │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Use native `<details>` / `<summary>` elements OR a `"use client"` accordion
- `<details>` is better for SSR — no JS required
- Max-width: `max-w-3xl mx-auto`
- Single-column layout (NOT a 2-column grid of FAQs)
- Smooth open/close animation with `grid-rows-[0fr]` → `grid-rows-[1fr]` trick
- Group by category if you have 10+ questions

---

### 10. Final CTA Section

**Anatomy:**
```
┌────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────┐           │
│  │                                         │           │
│  │  Ready to 10x your pipeline?            │           │
│  │  Book a free strategy call today.       │           │
│  │                                         │           │
│  │  [Book a Call]     [See Pricing]        │           │
│  │                                         │           │
│  └─────────────────────────────────────────┘           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Rules:**
- Visually distinct — use accent background, gradient, or card-on-card elevation
- Short headline (action-oriented)
- Optional: short supporting sentence
- Two CTAs max
- This is the LAST thing before the footer — make it count
- Consider subtle background animation or pattern

---

## Additional Page Sections

### About Page
1. Hero (company story headline + mission statement)
2. Story / Timeline (company milestones)
3. Values / Principles (3–4 cards)
4. Team Grid
5. CTA

### Solutions / Services Page
1. Hero (what you solve)
2. Service Overview Cards (link to detail sections)
3. Service Detail Sections (alternating split layouts: text-left/image-right → text-right/image-left)
4. Process / How It Works
5. Results / Case Studies
6. CTA

### Use Cases Page
1. Hero
2. Industry/Use Case Grid (cards with industry icons)
3. Featured Use Case (detailed breakdown)
4. Results from that vertical
5. CTA

### Blog / Resources
1. Featured Post (large card at top)
2. Post Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
3. Category Filters (optional, `"use client"`)
4. Pagination or Load More
5. Newsletter CTA

### Contact Page
1. Split layout: Form (left) + Contact Info (right)
2. Form fields: Name, Email, Company, Message, Budget/Service dropdown
3. Direct contact: email, phone, Calendly embed/link
4. Office location with map (optional)
5. Social links

---

## Page Composition Template

When composing a new page, follow this template:

```tsx
// app/(pages)/example/page.tsx
import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
// Import section components...

export const metadata: Metadata = {
  title: 'Page Title | Company Name',
  description: 'Page description for SEO (150-160 chars)',
  openGraph: {
    title: 'Page Title | Company Name',
    description: 'Page description for social sharing',
    images: ['/images/og/page-name.jpg'],
  },
}

export default function ExamplePage() {
  return (
    <>
      {/* Section 1 */}
      <section className="py-20 lg:py-32">
        <Container>
          {/* content */}
        </Container>
      </section>

      {/* Section 2 — alternate background */}
      <section className="bg-surface-secondary py-20 lg:py-32">
        <Container>
          {/* content */}
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <Container>
          <CTABanner
            title="Ready to get started?"
            primaryAction={{ label: "Book a Call", href: "/contact" }}
          />
        </Container>
      </section>
    </>
  )
}
```

**Rules:**
- EVERY page exports `metadata` for SEO
- EVERY page has a clear heading hierarchy (one `h1`, then `h2`s for sections)
- EVERY page ends with a CTA section
- Sections alternate backgrounds
- No page should be a single massive component — compose from sections

---

## Section Checklist

Before a section is complete:

- [ ] Content inside `<Container>`
- [ ] Starts with `<SectionHeader>` (except Hero)
- [ ] Correct vertical padding (`py-16 md:py-20 lg:py-24 xl:py-32`)
- [ ] Background contrasts with adjacent sections
- [ ] Looks correct at 320px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Text has proper constraints (`text-balance`, `max-w-`, `line-clamp-`)
- [ ] Grid items are uniform height
- [ ] No horizontal overflow on any viewport
- [ ] Content does NOT push left on mobile — properly centered or padded
- [ ] Semantic HTML used (`<section>`, `<article>`, proper heading levels)
- [ ] Accessible (contrast, alt text, keyboard nav for interactive elements)
