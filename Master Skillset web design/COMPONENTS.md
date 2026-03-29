# COMPONENTS.md — Component Specification & Patterns

> Every reusable component is defined here. When building a component, follow its spec exactly.
> Components are the building blocks. Sections (see SECTIONS.md) compose components.

---

## Component Architecture Rules

1. **Server by default.** Only add `"use client"` if the component uses `useState`, `useEffect`, `useRef`, event handlers, or browser APIs.
2. **Props over configuration.** Components accept props — they don't read global state or fetch data.
3. **TypeScript interface for every component.** Export the interface.
4. **Render safely with no props.** Every prop either has a default value or the component handles `undefined`.
5. **Composition over complexity.** Prefer many small components composed together over one mega-component with 20 props.

---

## Layout Components

### Container
The most important component. Wraps ALL section content.

```tsx
// components/layout/Container.tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** Use 'narrow' for text-heavy content, 'default' for standard, 'wide' for full sections */
  size?: 'narrow' | 'default' | 'wide'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const maxWidth = {
    narrow: 'max-w-3xl',    // 768px — blog posts, long text
    default: 'max-w-7xl',   // 1280px — standard sections
    wide: 'max-w-[1400px]', // 1400px — wide galleries, dashboards
  }

  return (
    <div className={cn('mx-auto px-6 lg:px-8', maxWidth[size], className)}>
      {children}
    </div>
  )
}
```

**RULE:** NEVER write `mx-auto max-w-7xl px-6 lg:px-8` inline. Always use `<Container>`.

---

### Header
```tsx
// components/layout/Header.tsx — Server Component
// components/layout/MobileNav.tsx — "use client" (only this one)

// Header structure:
// ┌─────────────────────────────────────────────────────────────┐
// │ [Logo]                    [Nav Links]          [CTA Button] │
// │                                                [Hamburger]  │ (mobile)
// └─────────────────────────────────────────────────────────────┘
```

**Header Rules:**
- Fixed/sticky at top with `backdrop-blur-xl` and `bg-surface-primary/80`
- `z-50` to stay above all content
- Height: `h-16` mobile, `h-20` desktop
- Logo on left, nav links center or right, CTA button far right
- Mobile: hamburger icon replaces nav links at `lg:` breakpoint
- On scroll: optionally add `border-b border-border-default` with a subtle transition
- Active link has distinct style (underline, color change, or weight change)
- MUST add `scroll-padding-top` to `<html>` equal to header height for anchor links

**MobileNav Rules (the ONLY client component in header):**
- Full-screen overlay or slide-in drawer
- Close on route change (use `usePathname()`)
- Close on escape key
- Trap focus inside when open
- Animate open/close (slide + fade)
- Body scroll locked when open

---

### Footer
```tsx
// Footer structure:
// ┌─────────────────────────────────────────────────────────────┐
// │ [Logo + Tagline]                                            │
// │                                                             │
// │ [Col 1: Product]  [Col 2: Company]  [Col 3: Resources]     │
// │  - Link            - Link            - Link                 │
// │  - Link            - Link            - Link                 │
// │                                                             │
// │ ─────────────────────────────────────────────────────────── │
// │ © 2025 Company   [Social Icons]    [Legal Links]            │
// └─────────────────────────────────────────────────────────────┘
```

**Footer Rules:**
- Background: `surface-primary` or slightly darker
- Top border to separate from page content
- 3–4 columns of links on desktop, stacked on mobile
- Social icons in a horizontal row
- Legal links (Privacy, Terms) as small text at bottom
- Company registration info if required
- NEVER use a different container width than the rest of the site

---

## UI Primitives

### Button
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean  // For wrapping Next.js <Link>
}
```

**Button Specs:**

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `--button-primary-bg` | `--button-primary-text` | none | `--button-primary-hover` |
| `secondary` | transparent | `--button-secondary-text` | `--button-secondary-border` | `surface-tertiary` |
| `ghost` | transparent | `text-secondary` | none | `surface-tertiary` |
| `link` | transparent | `text-accent` | none | underline |

| Size | Height | Padding | Font Size | Radius |
|------|--------|---------|-----------|--------|
| `sm` | `h-9` | `px-3` | `text-sm` | `rounded-md` |
| `md` | `h-11` | `px-5` | `text-sm` | `rounded-lg` |
| `lg` | `h-12` | `px-6` | `text-base` | `rounded-lg` |

**Rules:**
- Always `font-medium`
- Transition: `transition-all duration-150`
- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary`
- Disabled: `opacity-50 cursor-not-allowed`
- Icons in buttons: `gap-2 inline-flex items-center`

---

### Badge / Tag
```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'outline'
}
```

- Small pill shape: `rounded-full px-3 py-1 text-xs font-medium`
- Used for: service tags, status indicators, category labels

---

### Section Header
This is used at the top of EVERY section. Centralizes heading + description pattern.

```tsx
interface SectionHeaderProps {
  overline?: string          // Small uppercase label above heading
  title: string              // The main heading (h2)
  description?: string       // Supporting paragraph
  alignment?: 'center' | 'left'
}

// Example output:
// OVERLINE LABEL
// The Main Section Heading
// A paragraph of supporting text that explains what this section is about.
```

**Rules:**
- Overline: `text-overline uppercase tracking-widest font-medium text-accent`
- Title: `text-h2 font-heading font-bold text-primary text-balance`
- Description: `text-body-lg text-secondary max-w-2xl text-pretty`
- If `alignment="center"`: wrapper has `mx-auto text-center`, description gets `mx-auto`
- Gap: `mt-2` between overline→title, `mt-4` between title→description
- Gap: `mt-12 lg:mt-16` between SectionHeader and the section's content

---

### Card (Shell)
A generic container for feature cards, pricing cards, team cards, etc.

```tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean       // Adds hover effect
  padding?: 'sm' | 'md' | 'lg'
}
```

**Card Specs:**
- Background: `card-bg`
- Border: `1px solid card-border`
- Radius: `rounded-xl` (pick ONE and use everywhere)
- Padding: `sm` = `p-4`, `md` = `p-6`, `lg` = `p-8`
- If `hover`: `transition-all duration-200 hover:border-border-strong hover:bg-card-hover`
- Inside a grid: always `h-full flex flex-col` to equalize heights
- Content flex structure: icon → title → description (`flex-1` on description to push footer down)

---

## Content Components

### Feature Card
Used in feature grids. The #1 offender for looking "AI-generated" — get this right.

```tsx
interface FeatureCardProps {
  icon: React.ElementType  // Lucide icon component
  title: string
  description: string
}
```

**CRITICAL RULES for Feature Cards:**
- All cards in a grid MUST have identical visual structure
- Icon container: fixed size (`h-12 w-12`), `rounded-xl`, accent background with low opacity
- Title: exactly one line, `text-lg font-semibold`, `text-primary`
- Description: constrained to 2–3 lines with `line-clamp-3`, `text-sm text-secondary leading-relaxed`
- If descriptions vary wildly in length, use `flex-1` to absorb the difference and keep card bottoms aligned
- Card padding: `p-6` minimum
- NEVER make the icon too big (max `h-6 w-6` inside its container)
- NEVER make cards too narrow — minimum `min-w-[280px]` in grid context

**Anti-pattern (BLOCKED):**
```tsx
// WRONG — inconsistent, no height control
<div className="p-4 border rounded">
  <Icon size={48} />  {/* Too big */}
  <h3 className="font-bold">{title}</h3>
  <p>{description}</p>  {/* No constraints, will orphan */}
</div>
```

---

### Testimonial Card
```tsx
interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}
```

**Rules:**
- Quote text: `text-body-lg italic text-primary leading-relaxed`
- Attribution: name in `font-semibold text-primary`, role+company in `text-sm text-secondary`
- If image: `h-12 w-12 rounded-full object-cover`
- Consider large decorative quotation mark (`text-4xl text-accent/20`) as visual anchor
- In a grid: all testimonial cards SAME height

---

### Stat Card / Metric
```tsx
interface StatProps {
  value: string    // "26,092" or "$100K" or "150+"
  label: string    // "Event Registrations"
  prefix?: string  // "$" or "+"
  suffix?: string
}
```

**Rules:**
- Value: `text-4xl lg:text-5xl font-heading font-bold text-primary`
- Label: `text-sm text-secondary mt-1`
- Arrange in a 2×2 or 4-column grid
- Consider accent color on the value or a gradient text treatment

---

### Team Member Card
```tsx
interface TeamMemberProps {
  name: string
  role: string
  image: string
  linkedin?: string
  bio?: string
}
```

**Rules:**
- Image: aspect-square, `rounded-xl` or `rounded-full`, `object-cover`
- Name: `font-semibold text-primary`
- Role: `text-sm text-secondary`
- LinkedIn icon: subtle, appears on hover or always visible
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

---

### Blog Post Card
```tsx
interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  image?: string
  slug: string
  tags?: string[]
  author?: string
}
```

**Rules:**
- Image: `aspect-video rounded-xl object-cover` at top of card
- Title: `text-h3 font-heading font-semibold text-primary` — `line-clamp-2`
- Excerpt: `text-body-sm text-secondary` — `line-clamp-2` or `line-clamp-3`
- Date: `text-caption text-tertiary`
- Tags: small `<Badge>` components
- Entire card is a clickable `<Link>`
- Hover: image slight scale-up, title color change

---

### Logo Cloud / Client Logos
```tsx
interface LogoCloudProps {
  logos: Array<{ name: string; src: string }>
  variant?: 'grid' | 'scroll'
}
```

**Rules:**
- Logos: grayscale by default (`grayscale opacity-50`), full color on hover
- Grid: `grid-cols-3 md:grid-cols-5 lg:grid-cols-6`
- Scroll: CSS marquee animation (no JS), duplicated content for seamless loop
- All logos same max-height (`h-8` or `h-10`)
- "Trusted by" overline above

---

### CTA Banner
```tsx
interface CTABannerProps {
  title: string
  description?: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
}
```

**Rules:**
- Stands out from surrounding sections — use accent background or gradient
- Text centered
- Two buttons side by side (primary + secondary)
- Generous padding (`py-16 lg:py-20`)
- Can include subtle pattern/texture in background

---

## Utility: `cn()` Helper

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install: `npm install clsx tailwind-merge`

---

## Component Checklist

Before considering ANY component done:

- [ ] TypeScript interface exported
- [ ] Server Component unless interactivity required
- [ ] Uses design tokens (no hardcoded colors/spacing)
- [ ] Uses `<Container>` when rendering a section
- [ ] Text has `text-balance` / `text-pretty` / `max-w-` constraints
- [ ] Renders correctly at 320px, 768px, 1280px, 1536px
- [ ] Keyboard navigable (if interactive)
- [ ] Has focus-visible styles (if interactive)
- [ ] Grid children have equal heights
- [ ] No orphaned words in headings
- [ ] Images use `<Image>` with `alt`, `width`, `height`
