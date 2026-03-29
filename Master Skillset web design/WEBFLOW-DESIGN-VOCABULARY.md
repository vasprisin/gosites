# WEBFLOW-DESIGN-VOCABULARY.md
# Complete Webflow Design Language, SOPs & Best Practices
# For use as a Claude Code directive when speaking in Webflow's design terms

---

## Purpose

This document maps Webflow's exact design terminology, mental models, and SOPs to code-based web development. When you use these terms in your prompts, Claude Code should interpret them using Webflow's definitions and produce code that matches how a Webflow designer would build the same layout.

---

## 1. THE BOX MODEL — Webflow's Foundation

Everything in Webflow (and the web) is a box. Every HTML element is expressed as a rectangular box with four layers:

**Content** → The innermost area. Text, images, or child elements live here. Width and height refer to this box by default.

**Padding** → Space INSIDE the box, between the content and the border. Pushes content inward. In Webflow: "spacing inside elements."

**Border** → The visible edge of the box. Can be styled with width, style, color, and radius.

**Margin** → Space OUTSIDE the box. Pushes OTHER elements away. In Webflow: "spacing between elements."

**Key rule:** The height of any element is determined by its children unless a fixed height is explicitly set. Don't set heights — let content determine height.

### Box Model in Code
```css
/* Webflow's default box-sizing is border-box */
*, *::before, *::after {
  box-sizing: border-box; /* padding + border included in width/height */
}
```

---

## 2. ELEMENT HIERARCHY — Parent, Child, Sibling

Webflow's element hierarchy is the DOM tree. Learn these terms:

**Parent** — An element that contains other elements. A section containing a heading and paragraph is the parent.

**Child / Children** — Elements nested directly inside a parent. The heading and paragraph are children of the section.

**Sibling** — Elements that share the same parent. The heading and paragraph are siblings.

**Grandchild** — An element nested inside a child element. If a div is inside a section and a paragraph is inside that div, the paragraph is a grandchild of the section.

**Nesting** — Putting boxes inside boxes. Moving the parent moves all its children.

**Style Inheritance** — Children inherit certain styles (typography, color) from parents. You can override inherited styles on any child. In CSS: the cascade.

### Hierarchy in Code
```tsx
{/* Section (Parent) */}
<section>
  {/* Container (Child of Section, Parent of Div) */}
  <div className="container">
    {/* Heading (Grandchild of Section, Child of Container) */}
    <h2>Title</h2>
    {/* Paragraph (Sibling of Heading) */}
    <p>Description</p>
  </div>
</section>
```

---

## 3. STRUCTURE ELEMENTS — Section, Container, Div Block

These are the three core structural building blocks in Webflow.

### Section
- A full-width structural division of a page
- 100% width by default (stretches to fill the entire browser window)
- HTML tag: `<section>`
- Height automatically adjusts to content
- Used to divide pages into major content areas
- Background colors, images, and gradients apply to the full width
- **You cannot nest a section inside another section**

```tsx
// Section = full-width wrapper
<section className="w-full bg-stone-950 py-20 lg:py-32">
  {/* Content goes inside a Container, not directly in Section */}
</section>
```

### Container
- A div block with predefined max-width and auto centering
- Webflow default: max-width 940px on desktop, 728px on tablet, full-width on mobile
- Left and right margins set to `auto` (centers it)
- Sits INSIDE a section to constrain content
- **Do not change the display property of a container** (Webflow warns against setting flex/grid directly on containers — add a child div and set display on that instead)

```tsx
// Container = centered, max-width content wrapper
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  {/* All content inside container */}
</div>
```

### Div Block
- The most basic and versatile element
- A generic container (HTML `<div>`)
- No predefined styles — completely blank
- Used to group elements, create wrappers, divide content
- Can be anything: a card, a wrapper, a spacer, a layout container
- Buttons, containers, and sections are all div blocks with extra properties

```tsx
// Div Block = generic wrapper, style as needed
<div className="flex flex-col gap-6 rounded-xl border border-stone-800 bg-stone-900 p-8">
  <h3>Card Title</h3>
  <p>Card description</p>
</div>
```

### The Standard Page Structure Pattern
```
Body
└── Page Wrapper (div, min-height: 100vh)
    ├── Header (nav)
    ├── Main
    │   ├── Section (full-width, background color/image)
    │   │   └── Container (centered, max-width)
    │   │       └── Div Block (layout: flex/grid)
    │   │           ├── Content elements...
    │   │           └── Content elements...
    │   ├── Section
    │   │   └── Container
    │   │       └── ...
    │   └── Section
    │       └── Container
    │           └── ...
    └── Footer
```

---

## 4. DISPLAY SETTINGS

Display controls how an element behaves in the layout flow.

### Block (default for divs, sections, headings, paragraphs)
- Takes up the full width available
- Starts on a new line
- Stacks vertically

### Inline
- Only takes up as much width as its content
- Sits on the same line as surrounding text/elements
- Cannot have width/height set
- Example: `<span>`, `<a>`, `<strong>`

### Inline-Block
- Sits on the same line like inline
- BUT allows width/height to be set
- Useful for buttons, tags, badges sitting next to each other

### Flex (Flexbox)
- One-dimensional layout (row OR column)
- Applied to a PARENT element (makes it a "flex parent" / "flex container")
- Direct children become "flex children"
- Controls: direction, alignment, wrapping, gap, grow/shrink

### Grid (CSS Grid)
- Two-dimensional layout (rows AND columns simultaneously)
- Applied to a PARENT element
- Children placed into grid cells
- Can overlap elements, span multiple rows/columns
- More powerful than flexbox for complex layouts

### None
- Element is completely removed from the layout
- Not visible, not interactive, takes no space

```tsx
// Display equivalents in Tailwind
<div className="block">Block</div>
<span className="inline">Inline</span>
<span className="inline-block">Inline-Block</span>
<div className="flex">Flex Parent</div>
<div className="grid">Grid Parent</div>
<div className="hidden">Display None</div>
```

---

## 5. FLEXBOX — Webflow's Primary Layout Tool

When Webflow designers say "make it flex" or "set to flex," they mean:

### Flex Parent (Flex Container)
Set `display: flex` on a parent element. All direct children become flex children.

### Direction
- **Horizontal** (default) → `flex-row` — children lay out left to right
- **Vertical** → `flex-col` — children stack top to bottom
- **Reverse** → `flex-row-reverse` or `flex-col-reverse`

### Alignment (The Align Box)
Webflow uses a 3×3 grid UI to set alignment. This maps to two CSS properties:

**Main Axis (direction of flow):**
- `justify-start` / `justify-center` / `justify-end`
- `justify-between` — equal space between children
- `justify-around` — equal space around children

**Cross Axis (perpendicular to flow):**
- `items-start` / `items-center` / `items-end`
- `items-stretch` — children stretch to fill parent height (default)
- `items-baseline` — children align by text baseline

### Wrapping
- **No Wrap** (default) → all children stay on one line, may overflow
- **Wrap** → `flex-wrap` — children push to next line when they run out of space

### Gap
Space between flex children without using margin:
- `gap-4` → 16px between all children
- `gap-x-4 gap-y-8` → different horizontal/vertical gaps

### Flex Child Properties
Applied to CHILDREN of a flex parent:

**Sizing:**
- **Shrink** → child can shrink below its natural size (`flex-shrink`)
- **Grow** → child expands to fill available space (`flex-grow`)
- **Don't Shrink/Grow** → child stays at its set size (`flex-none`)
- **Expand** (Webflow term) → equivalent to `flex: 1 1 0%` — children share space equally

**Self-Alignment:**
- Override parent's alignment on a single child: `self-start`, `self-center`, `self-end`, `self-stretch`

**Order:**
- Move a child to first, last, or custom position without changing DOM order

```tsx
// Webflow "Horizontal flex, center-center, wrap, 24px gap"
<div className="flex flex-wrap items-center justify-center gap-6">
  <div className="flex-1">Expanding child</div>
  <div className="flex-none w-64">Fixed child</div>
  <div className="flex-1">Expanding child</div>
</div>
```

---

## 6. CSS GRID — Two-Dimensional Layouts

### Grid Parent
Set `display: grid` on a parent. Define rows and columns.

### Columns & Rows
- `grid-cols-3` → 3 equal columns
- `grid-rows-2` → 2 equal rows
- Custom: `grid-template-columns: 1fr 2fr 1fr` (fractional units)

### FR Unit (Fractional)
The `fr` unit divides available space proportionally.
- `1fr 1fr 1fr` = 3 equal columns
- `1fr 2fr` = first column gets 1/3, second gets 2/3
- `200px 1fr` = first column fixed at 200px, second takes remaining space

### Grid Gap
- Same as flex gap: `gap-6`, `gap-x-4 gap-y-8`

### Grid Child Properties
- **Span** — a child can span multiple columns/rows: `col-span-2`, `row-span-3`
- **Start/End** — position a child in a specific cell: `col-start-2 col-end-4`
- **Grid Area** — name regions and place children into named areas

### Auto-Placement
Grid automatically places children into the next available cell. Useful for CMS-driven content where the number of items varies.

```tsx
// Webflow "3 column grid, 32px gap, second item spans 2 columns"
<div className="grid grid-cols-3 gap-8">
  <div>Item 1</div>
  <div className="col-span-2">Item 2 (spans 2 cols)</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</div>
```

---

## 7. QUICK STACK (Webflow Element)

Quick Stack is a pre-built Webflow element with flex/grid already applied. It's a convenience shortcut. In code, it's just a flex or grid container with common defaults:

```tsx
// Quick Stack equivalent: responsive flex that stacks on mobile
<div className="flex flex-col md:flex-row gap-6">
  <div className="flex-1">{/* Cell 1 */}</div>
  <div className="flex-1">{/* Cell 2 */}</div>
</div>
```

---

## 8. SPACING — Margin & Padding

### Margin (Outside the box)
Pushes OTHER elements away from this element.
- `margin-top`, `margin-bottom`, `margin-left`, `margin-right`
- Webflow convention: use margin for spacing BETWEEN sibling elements
- **Auto margins** center an element: `mx-auto`
- **Margin collapse** — vertical margins between siblings collapse to the larger value (flex/grid parents prevent this)

### Padding (Inside the box)
Creates space between the box's border and its content.
- `padding-top`, `padding-bottom`, `padding-left`, `padding-right`
- Webflow convention: use padding for spacing WITHIN elements (inside sections, cards, containers)

### Webflow's Spacing Strategy (Client-First)
- **Page horizontal padding** → applied to an outer wrapper, controls left/right site margins globally
- **Section padding** → vertical padding on sections (`py-20 lg:py-32`)
- **Component gap** → use `gap` on flex/grid parents, not margin on children
- **Custom spacing** → direct margin/padding on specific elements via classes

### Spacing Blocks & Wrappers (Webflow Pattern)
- **Spacing Block** — an empty div with a set height to create vertical space between siblings
- **Spacing Wrapper** — a div that wraps a child and adds margin to create space from a sibling
- In code: prefer `gap` on flex/grid parents instead of spacing blocks

```tsx
// Webflow spacing translated to code:
// Section padding (padding-section-large)
<section className="py-20 lg:py-32">
  {/* Container with horizontal padding (padding-global) */}
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Flex parent with gap (replaces margin-bottom on children) */}
    <div className="flex flex-col gap-8">
      <div>Item 1</div>
      <div>Item 2</div>
    </div>
  </div>
</section>
```

---

## 9. SIZE — Width, Height, Min, Max

### Width
- **Auto** (default for block elements) — fills parent's width
- **Percentage** — relative to parent: `w-1/2`, `w-full`
- **Fixed** — pixel value: `w-64` (256px)
- **Viewport** — relative to browser window: `w-screen` (100vw)

### Height
- **Auto** (default) — determined by content height. **DO NOT set fixed heights unless absolutely necessary.**
- **Min-Height** — `min-h-screen` (100vh) — useful for hero sections
- **Max-Height** — limits growth, adds scroll if content overflows

### Max-Width
The most important size property for web design:
- **Container max-width** — `max-w-7xl` (1280px) — prevents content from stretching too wide
- **Text max-width** — `max-w-prose` (65ch) or `max-w-2xl` — prevents long unreadable lines
- Webflow default container: 940px max-width on desktop

### Overflow
What happens when content exceeds its parent's boundaries:
- **Visible** (default) — content spills outside the box
- **Hidden** — `overflow-hidden` — content is clipped at the box edge
- **Scroll** — `overflow-scroll` — adds scrollbars
- **Auto** — `overflow-auto` — adds scrollbars only when needed

**Critical rule:** `position: sticky` will NOT work if any parent has `overflow: hidden`.

---

## 10. POSITION

### Static (default)
Normal document flow. Elements stack vertically (block) or sit inline.

### Relative
- `relative` — stays in normal flow
- Can be offset with `top`, `right`, `bottom`, `left` WITHOUT removing it from flow
- Creates a positioning context for absolute children

### Absolute
- `absolute` — removed from normal flow
- Positioned relative to the NEAREST positioned ancestor (parent with `relative`, `absolute`, `fixed`, or `sticky`)
- If no positioned ancestor exists, positions relative to the viewport
- Other elements act as if it doesn't exist

### Fixed
- `fixed` — removed from flow
- Positioned relative to the viewport (browser window)
- Stays in place during scroll
- Use for: sticky headers, floating buttons, modals

### Sticky
- `sticky` — hybrid of relative and fixed
- Behaves like `relative` until a scroll threshold is reached, then becomes `fixed`
- Must have a `top` value set: `sticky top-0`
- **Will NOT work if any parent has `overflow: hidden`**
- Sticks within its parent container

```tsx
// Webflow "Sticky header"
<header className="sticky top-0 z-50 backdrop-blur-xl bg-stone-950/80">
  <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-20 flex items-center">
    {/* Nav content */}
  </nav>
</header>
```

### Z-Index
Controls stacking order when elements overlap:
- Higher z-index = on top
- Only works on positioned elements (relative, absolute, fixed, sticky)
- `z-10`, `z-20`, `z-30`, `z-40`, `z-50`

---

## 11. CLASSES & NAMING — The Client-First System

Webflow's most popular class naming convention is **Client-First** by Finsweet. Its principles translate directly to CSS class organization.

### Class Types

**Global Class** — A reusable class applied across the entire site. One change updates every instance.
- Examples: `text-color-primary`, `padding-large`, `container-default`
- In Tailwind: these are your utility classes and design tokens

**Custom Class** — A class created for a specific component or element.
- Uses underscore `_` separator: `hero_heading`, `pricing_card`, `faq_item`
- In code: these are your component class names

**Combo Class** — A modifier added ON TOP of a base class to create a variant. Inherits base styles, overrides specific properties.
- Uses `is-` prefix: `button is-secondary`, `card is-featured`, `section_header is-home`
- In Tailwind: achieved with conditional classes or variant props

**Utility Class** — A single-purpose class for one CSS property.
- No underscore: `text-color-primary`, `margin-bottom-large`, `hide-mobile`
- In Tailwind: this is the entire framework

### Naming Conventions
- **Descriptive, not clever** — `card-product_title` not `cPt`
- **Semantic by purpose** — `bg-accent` not `blue-500`
- **No abbreviations** — `margin-bottom` not `mb`
- **Component prefix** — `hero_`, `pricing_`, `testimonial_`

### Deep Stacking (ANTI-PATTERN)
Adding too many classes to one element. Client-First explicitly warns against this. If you need 5+ utility classes, create a custom class instead.

---

## 12. VARIABLES & DESIGN TOKENS

Webflow Variables are reusable values for colors, spacing, typography, and sizing. They are the equivalent of CSS custom properties.

### Color Variables
Defined once, referenced everywhere:
- `--color-primary`, `--color-secondary`, `--color-neutral-900`
- Semantic naming: `--bg-accent`, `--text-primary` (by purpose, not appearance)
- Organized in groups: Brand, Neutral, Semantic (success, warning, error)

### Spacing Variables
- `--space-xs: 4px`, `--space-sm: 8px`, `--space-md: 16px`, `--space-lg: 24px`, `--space-xl: 32px`, `--space-2xl: 48px`, `--space-3xl: 64px`
- Applied consistently across margins, padding, and gaps
- Change a variable, entire site updates

### Typography Variables
- Font family, size, weight, line height, letter spacing
- Semantic names: `Heading Large`, `Heading Medium`, `Body`, `Caption`
- Not by appearance: `48px Bold` is wrong; `heading-display` is right

### In Code (CSS Custom Properties)
```css
:root {
  --color-primary: #f59e0b;
  --color-surface: #0c0a09;
  --space-lg: 24px;
  --space-xl: 32px;
  --font-heading: 'Cal Sans', serif;
  --radius-card: 12px;
}
```

---

## 13. COMPONENTS (Webflow Components)

A Component is a reusable block you build once and use everywhere. Editing the main component updates ALL instances.

### Key Concepts

**Component** — Master element. Change it → all instances update.

**Instance** — A placed copy of the component on a page.

**Slot** — A placeholder inside a component where you can drop in different content per instance. The structure stays the same, but slot content can vary.

**Style Variant** — Alternate visual versions of the same component. Same structure, different appearance. Example: Button with Primary, Secondary, Ghost variants.

**Component Properties** — Configurable settings per instance (text content, visibility toggles, variant selection).

### Atomic Design in Webflow
- **Atoms** — smallest elements: Button, Badge, Input, Icon
- **Molecules** — groups of atoms: Search Field (input + button + icon)
- **Organisms** — groups of molecules: Navigation Bar, Card Grid, Hero Section
- **Templates** — page-level layouts composed of organisms
- **Pages** — templates filled with real content

### In Code
```tsx
// Component = React component with props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'  // Style Variant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode  // Slot
}

// Instance = usage of the component
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="ghost">Learn More</Button>
```

---

## 14. TYPOGRAPHY

### Webflow Typography Properties
- **Font Family** — the typeface: `font-heading`, `font-body`
- **Font Weight** — boldness: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- **Font Size** — use a defined scale, not arbitrary values
- **Line Height (Leading)** — vertical space between lines: `leading-tight` (1.25), `leading-relaxed` (1.625)
- **Letter Spacing (Tracking)** — horizontal space between characters: `tracking-tight` (-0.025em), `tracking-wide` (0.025em), `tracking-widest` (0.1em)
- **Text Transform** — `uppercase`, `lowercase`, `capitalize`
- **Text Decoration** — `underline`, `line-through`, `no-underline`

### Typography Hierarchy (Webflow Convention)
Style HTML tags globally first, then override with classes:

| HTML Tag | Default Webflow Use | Class Name Convention |
|----------|--------------------|-----------------------|
| H1 | Page title (one per page) | `heading-style-h1` |
| H2 | Section headings | `heading-style-h2` |
| H3 | Card titles, subsections | `heading-style-h3` |
| H4 | Labels, small headings | `heading-style-h4` |
| Paragraph | Body text | `text-size-medium` |
| Small | Captions, metadata | `text-size-small` |

**Style class vs HTML tag separation:** You can have an H1 tag styled like an H2 using `heading-style-h2` class. This maintains SEO hierarchy while allowing visual flexibility.

### In Code
```tsx
// H1 tag, styled as display size
<h1 className="font-heading text-display font-bold tracking-tight text-balance">
  Headline
</h1>

// H2 tag styled one size down for a specific page
<h2 className="font-heading text-h3 font-semibold">
  Smaller Section Heading
</h2>
```

---

## 15. INTERACTIONS & ANIMATIONS

### Triggers (What starts the animation)

**Element Triggers:**
- **Mouse Hover** → animation plays on hover, reverses on hover-out
- **Mouse Click** → animation plays on click (can toggle)
- **Scroll Into View** → animation plays when element enters viewport
- **While Scrolling In View** → animation progress tied to scroll position (parallax)
- **Mouse Move Over Element** → tracks cursor position within an element

**Page Triggers:**
- **Page Load** → animation on page load (entry animation)
- **Page Scrolled** → animation tied to total page scroll progress
- **Mouse Move In Viewport** → tracks cursor across entire page

### Animation Actions
- **Move (Transform: Translate)** — shift position on X/Y/Z axis
- **Scale** — enlarge or shrink
- **Rotate** — spin on X/Y/Z axis
- **Opacity** — fade in/out (0 to 1)
- **Size** — animate width/height (use transform instead when possible)
- **Background Color** — transition between colors
- **Filter** — blur, brightness, contrast, grayscale

### Timing & Easing
- **Duration** — how long the animation takes
- **Delay** — how long before the animation starts (use for staggering)
- **Easing** — acceleration curve: Ease, Ease-In, Ease-Out, Ease-In-Out, Spring, Bounce
- **Smoothing** — how quickly scroll-linked animations respond to scroll input

### Scope
- **Only this element** — affects only the trigger element
- **All elements with this class** — affects every element with the same class
- **Only children with this class** — scoped to children of the trigger
- **Only siblings with this class** — scoped to siblings of the trigger

### In Code
```tsx
// Scroll Into View → Fade + Slide Up
<div className="animate-fade-in opacity-0 translate-y-5 transition-all duration-700 ease-out">
  Content
</div>

// Mouse Hover → Scale + Color Change
<div className="transition-all duration-200 hover:scale-105 hover:border-amber-500">
  Card
</div>

// Page Load → Staggered reveal (animation-delay)
<div className="animate-slide-up" style={{ animationDelay: '0ms' }}>Item 1</div>
<div className="animate-slide-up" style={{ animationDelay: '100ms' }}>Item 2</div>
<div className="animate-slide-up" style={{ animationDelay: '200ms' }}>Item 3</div>
```

---

## 16. CMS (Collections & Dynamic Content)

### Collection
A structured content type with defined fields. Like a database table.
- Examples: Blog Posts, Team Members, Case Studies, Services, Testimonials
- Each collection has a set of Fields

### Collection Fields (Field Types)
- **Plain Text** — short text (titles, names)
- **Rich Text** — formatted content with headings, lists, images
- **Image** — uploaded image file
- **Number** — numerical value
- **Date** — date picker
- **Switch** — boolean on/off (e.g., "Featured")
- **Option** — dropdown select (e.g., "Category")
- **Reference** — link to another collection item (e.g., Author)
- **Multi-Reference** — link to multiple collection items (e.g., Tags)
- **Link** — URL
- **Color** — hex color value
- **File** — downloadable file

### Collection List
An element that loops through collection items and displays them. Like a `map()` in React.

### Collection Page
A template page that generates unique pages for each collection item. Like dynamic routes: `/blog/[slug]`.

### In Code (MDX/Markdown CMS)
```md
<!-- content/blog/event-registrations.mdx -->
---
title: "How We Generated 26,000 Event Registrations"
slug: "26000-event-registrations"
date: "2025-01-15"
author: "priyanshu"          # Reference field
excerpt: "A deep dive into..."
image: "/images/blog/events.webp"
tags: ["linkedin-events"]    # Multi-reference field
featured: true               # Switch field
published: true
---

Content here...
```

```tsx
// Collection List = map over content
{posts.map(post => (
  <BlogCard key={post.slug} {...post} />
))}

// Collection Page = dynamic route
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug)
  return <Article post={post} />
}
```

---

## 17. RESPONSIVE DESIGN — Breakpoints

### Webflow's Breakpoint Model
Webflow designs DESKTOP-FIRST by default (styles cascade DOWN to smaller breakpoints). **However**, best practice in code is MOBILE-FIRST (styles cascade UP).

| Webflow Breakpoint | Viewport Width | Tailwind Prefix |
|---------------------|---------------|-----------------|
| Desktop (Base) | 992px+ | Default (no prefix) |
| Tablet | 768px – 991px | `md:` |
| Mobile Landscape | 480px – 767px | `sm:` |
| Mobile Portrait | < 480px | Default in mobile-first |
| Large Desktop | 1280px+ | `lg:` / `xl:` |

### Responsive Design Rules
1. **Mobile-first in code**: write base styles for mobile, layer up with `sm:`, `md:`, `lg:`, `xl:` prefixes
2. **Grids collapse**: `grid-cols-1` (mobile) → `md:grid-cols-2` (tablet) → `lg:grid-cols-3` (desktop)
3. **Font sizes scale**: `text-3xl` (mobile) → `lg:text-5xl` (desktop)
4. **Spacing increases**: `py-16` (mobile) → `lg:py-24` → `xl:py-32` (desktop)
5. **Navigation switches**: hamburger on mobile, full nav on `lg:`
6. **Hide/Show**: `hidden lg:block` (visible only on desktop), `lg:hidden` (visible only on mobile)
7. **Test at 320px**: no horizontal overflow, no content pushed left

---

## 18. BACKGROUND STYLES

### Background Image
- **Cover** — `bg-cover` — image covers entire area, may crop
- **Contain** — `bg-contain` — entire image visible, may have gaps
- **Position** — `bg-center`, `bg-top`, `bg-bottom`
- **Repeat** — `bg-no-repeat` (default for most use cases)
- **Fixed** — `bg-fixed` — parallax-like effect (background stays while content scrolls)

### Background Color
- Solid: `bg-stone-950`
- With opacity: `bg-stone-950/80`

### Gradient
- `bg-gradient-to-b from-stone-950 to-stone-900`
- Radial: custom CSS `radial-gradient(ellipse at center, ...)`

### Background Overlay
In Webflow, you can stack a color overlay on top of a background image. In code:
```tsx
<div className="relative">
  <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
  <Image src="..." fill className="object-cover" /> {/* Background image */}
  <div className="relative z-10">{/* Content on top */}</div>
</div>
```

---

## 19. KEY WEBFLOW TERMS → CODE TRANSLATION TABLE

| Webflow Term | CSS / Tailwind Equivalent |
|---|---|
| Section | `<section className="w-full">` |
| Container | `<div className="mx-auto max-w-7xl px-6 lg:px-8">` |
| Div Block | `<div>` |
| Flex Parent | `<div className="flex">` |
| Flex Child | Direct child of a flex parent |
| Flex: Expand | `flex: 1 1 0%` / `flex-1` |
| Flex: Shrink | `flex-shrink` |
| Direction: Horizontal | `flex-row` (default) |
| Direction: Vertical | `flex-col` |
| Wrap | `flex-wrap` |
| Align Box (center, center) | `items-center justify-center` |
| Gap | `gap-6` |
| Grid | `<div className="grid grid-cols-3">` |
| FR unit | `grid-template-columns: 1fr 2fr 1fr` |
| Span 2 columns | `col-span-2` |
| Display: None | `hidden` |
| Display: Inline-Block | `inline-block` |
| Position: Relative | `relative` |
| Position: Absolute | `absolute` |
| Position: Fixed | `fixed` |
| Position: Sticky | `sticky top-0` |
| Overflow: Hidden | `overflow-hidden` |
| Z-Index | `z-10`, `z-20`, `z-50` |
| Margin | `m-4`, `mt-8`, `mx-auto` |
| Padding | `p-6`, `py-20`, `px-8` |
| Max Width | `max-w-7xl`, `max-w-prose` |
| Min Height | `min-h-screen` |
| Width: 100% | `w-full` |
| Width: Auto | `w-auto` |
| Background: Cover | `bg-cover bg-center bg-no-repeat` |
| Opacity | `opacity-50` |
| Border Radius | `rounded-xl`, `rounded-full` |
| Box Shadow | `shadow-lg` |
| Transition | `transition-all duration-200` |
| Hover State | `hover:bg-stone-800` |
| Focus State | `focus-visible:ring-2` |
| Combo Class | Variant prop or conditional class |
| Global Class | Utility class or design token |
| Custom Class | Component-specific class name |
| Collection List | `array.map()` |
| Collection Page | Dynamic route `[slug]/page.tsx` |
| Rich Text | MDX content with `<article>` prose styling |
| Symbol / Component | React component |
| Slot | `children` prop |
| Style Variant | `variant` prop |
| Interaction: Scroll Into View | Intersection Observer or CSS `@keyframes` |
| Interaction: Mouse Hover | `hover:` pseudo-class |
| Interaction: Page Load | CSS animation with `animation-fill-mode: forwards` |
| Interaction: While Scrolling | Scroll-linked animation (JS or CSS `animation-timeline`) |
| Smooth Scroll | `html { scroll-behavior: smooth }` |
| Lottie Animation | Lottie React player or `<dotlottie-player>` |

---

## 20. HOW TO USE THIS IN PROMPTS

When telling Claude Code to build something, you can now speak in Webflow terms:

> "Create a section with a container inside. Inside the container, add a flex parent set to vertical direction, center-aligned. Add a heading, paragraph, and two buttons side by side (horizontal flex, gap 16px). The section should have large section padding and a dark surface background."

Claude Code should interpret this as:
```tsx
<section className="w-full bg-surface-primary py-20 lg:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="flex flex-col items-center text-center">
      <h2 className="font-heading text-h2 font-bold text-balance">Heading</h2>
      <p className="mt-4 max-w-2xl text-body-lg text-secondary text-pretty">
        Paragraph text
      </p>
      <div className="mt-8 flex flex-row gap-4">
        <Button variant="primary">Primary CTA</Button>
        <Button variant="secondary">Secondary CTA</Button>
      </div>
    </div>
  </div>
</section>
```

---

## 21. RICH TEXT — Styling CMS Content

Rich Text is Webflow's WYSIWYG content block for CMS-driven content (blog posts, case studies). It renders headings, paragraphs, lists, images, blockquotes, and code blocks from CMS fields.

### How Rich Text Works
- Nested elements inherit styling from their HTML tags (H1-H6, p, blockquote, ul/ol, figure, etc.)
- You style Rich Text by styling the **nested HTML tags within a class**
- A class on the Rich Text wrapper (e.g., `text-rich-text`) scopes those styles

### In Code (Prose Styling)
```tsx
// Tailwind Typography plugin gives you "prose" — the Rich Text equivalent
<article className="prose prose-invert prose-lg max-w-none
  prose-headings:font-heading prose-headings:tracking-tight
  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
  prose-p:text-stone-300 prose-p:leading-relaxed
  prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
  prose-strong:text-white
  prose-blockquote:border-amber-500 prose-blockquote:text-stone-300
  prose-img:rounded-xl
  prose-code:bg-stone-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
  prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-800
  prose-li:text-stone-300
  prose-hr:border-stone-800">
  {/* MDX content renders here */}
</article>
```

Install: `npm install @tailwindcss/typography`

### Style Guide Page
Webflow best practice is to create a dedicated Style Guide page containing all Rich Text styles, typography, buttons, form elements, and color swatches. In code: create a `/style-guide` page that renders every component and text style for visual QA.

---

## 22. FORMS

### Webflow Form Structure
```
Form Block (parent)
├── Form (actual <form> element)
│   ├── Label + Input
│   ├── Label + Textarea
│   ├── Label + Select
│   ├── Checkbox / Radio
│   └── Submit Button
├── Success Message (shown after submit)
└── Error Message (shown on failure)
```

### In Code
```tsx
// Server Action for form handling (Next.js)
<form action={handleSubmit} className="flex flex-col gap-6">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">
      Name
    </label>
    <input
      id="name"
      name="name"
      type="text"
      required
      className="w-full rounded-lg border border-stone-700 bg-stone-900 px-4 py-3
        text-white placeholder:text-stone-500
        focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      placeholder="Your name"
    />
  </div>
  {/* More fields... */}
  <button type="submit" className="...">Submit</button>
</form>
```

### Form Best Practices
- Every input has a `<label>` with matching `htmlFor`/`id`
- Use `required`, `type="email"`, `type="tel"` for validation
- Success/Error states handled with React state or server responses
- Honeypot field or reCAPTCHA for spam protection
- Form submissions go to: email service (Resend, SendGrid), CRM, or database

---

## 23. LINK BLOCK

A Link Block in Webflow is a div that functions as a link. The entire block is clickable.

### In Code
```tsx
import Link from 'next/link'

// Link Block = Next.js Link wrapping a div
<Link href="/case-studies/ibc-group"
  className="group block rounded-xl border border-stone-800 bg-stone-900 p-6
    transition-all duration-200 hover:border-stone-600 hover:bg-stone-800">
  <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
    IBC Group Case Study
  </h3>
  <p className="mt-2 text-sm text-stone-400">26,092 event registrations...</p>
</Link>
```

**Key rule:** A Link Block CANNOT contain other links (no `<a>` inside `<a>`). If you need a clickable card with a separate button link, use a relative-positioned wrapper with an absolutely-positioned stretch link:

```tsx
<div className="relative">
  <Link href="/case-study" className="absolute inset-0 z-10">
    <span className="sr-only">Read case study</span>
  </Link>
  <h3>Title</h3>
  <p>Description</p>
  {/* This button is above the stretch link */}
  <a href="/contact" className="relative z-20">Contact Us</a>
</div>
```

---

## 24. NAVBAR (Navigation)

### Webflow Navbar Structure
```
Navbar (fixed/sticky at top)
├── Brand (logo + link to home)
├── Nav Menu
│   ├── Nav Link
│   ├── Nav Link
│   ├── Dropdown
│   │   ├── Dropdown Toggle
│   │   └── Dropdown List
│   │       ├── Dropdown Link
│   │       └── Dropdown Link
│   └── Nav Link
├── Nav Button(s) (CTA)
└── Menu Button (hamburger, visible on mobile)
```

### In Code
- Header is a SERVER component
- MobileNav (hamburger toggle) is the ONLY `"use client"` part
- Dropdown menus: use `<details>`/`<summary>` for SSR, or a client component
- Close mobile nav on route change: use `usePathname()` in a `useEffect`
- Sticky: `sticky top-0 z-50 backdrop-blur-xl bg-surface-primary/80`

---

## 25. CONDITIONAL VISIBILITY

In Webflow, you can show/hide elements based on CMS field values (e.g., show a badge only if "featured" is true).

### In Code
```tsx
// Conditional rendering based on data
{post.featured && <Badge>Featured</Badge>}
{post.tags?.length > 0 && (
  <div className="flex gap-2">
    {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
  </div>
)}
{!post.image && <div className="bg-stone-800 aspect-video rounded-xl" />} {/* Fallback */}
```

---

## 26. CUSTOM ATTRIBUTES & EMBED

### Custom Attributes
Webflow lets you add custom `data-*` attributes to any element. Used for:
- Animation libraries (GSAP, Lottie): `data-scroll`, `data-speed`
- Analytics tracking: `data-event`, `data-section`
- Accessibility: `aria-label`, `role`

### Code Embed
Webflow's embed element inserts raw HTML/CSS/JS. In code, this is any third-party script or inline code.

```tsx
// Calendly embed example
<div className="calendly-inline-widget"
  data-url="https://calendly.com/dolta/discovery"
  style={{ minWidth: '320px', height: '700px' }}
/>
<Script src="https://assets.calendly.com/assets/external/widget.js" />
```

---

## 27. SEO CONFIGURATION

### Per-Page SEO (Webflow Page Settings → Code Equivalent)

| Webflow Setting | Next.js Equivalent |
|---|---|
| SEO Title | `metadata.title` |
| Meta Description | `metadata.description` |
| Open Graph Title | `metadata.openGraph.title` |
| OG Description | `metadata.openGraph.description` |
| OG Image | `metadata.openGraph.images` |
| Slug (URL) | File path or `generateStaticParams()` |
| Sitemap Indexing toggle | `robots` meta or `next-sitemap` config |
| Canonical URL | `metadata.alternates.canonical` |
| Custom `<head>` code | `metadata` object or `<Script>` component |

```tsx
// app/(pages)/solutions/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B Lead Generation Solutions | Dolta',
  description: 'AI-powered LinkedIn outbound, appointment setting, and event marketing. Pay per meeting.',
  openGraph: {
    title: 'B2B Lead Generation Solutions | Dolta',
    description: 'AI-powered LinkedIn outbound that books qualified meetings.',
    images: [{ url: '/images/og/solutions.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: { canonical: 'https://dolta.io/solutions' },
}
```

### Site-Level SEO
- **Sitemap:** Use `next-sitemap` package → auto-generates `sitemap.xml`
- **Robots.txt:** Use `next-sitemap` or a `robots.ts` file in `app/`
- **301 Redirects:** Configure in `next.config.js` under `redirects()`
- **Schema Markup (JSON-LD):** Add via `<script type="application/ld+json">` in layout or per page
- **Canonical Tags:** Set in metadata per page
- **Noindex pages:** Add `robots: { index: false }` to metadata

```ts
// next.config.js — 301 Redirects
async redirects() {
  return [
    { source: '/old-page', destination: '/new-page', permanent: true },
    { source: '/services', destination: '/solutions', permanent: true },
  ]
}
```

```tsx
// JSON-LD Schema (in layout or page)
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dolta",
  "url": "https://dolta.io",
  "logo": "https://dolta.io/images/logo.svg",
  "sameAs": ["https://linkedin.com/company/dolta"]
}) }} />
```

---

## 28. COLLECTION FILTERS & SORTING

### Webflow CMS Filters
Filter collection lists to show only items matching criteria (e.g., "show only published posts" or "show only posts tagged 'linkedin-events'").

### In Code
```tsx
// Filter and sort at the data layer
const featuredPosts = allPosts
  .filter(post => post.published && post.featured)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

// Client-side filtering (requires "use client")
const [activeTag, setActiveTag] = useState('all')
const filtered = activeTag === 'all'
  ? posts
  : posts.filter(p => p.tags.includes(activeTag))
```

---

## 29. FIGMA → WEBFLOW → CODE WORKFLOW

Professional agencies design in Figma first, then build in Webflow. The design system should mirror the code system:

| Figma Concept | Webflow Concept | Code Concept |
|---|---|---|
| Auto Layout | Flexbox | `flex` |
| Frames | Div Blocks / Sections | `<div>` / `<section>` |
| Components | Components/Symbols | React Components |
| Variants | Style Variants / Combo Classes | `variant` prop |
| Styles (color, text) | Variables / Global Classes | CSS custom properties / Tailwind |
| Constraints | Max-width / responsive | `max-w-` / breakpoints |
| Design Tokens | Variables | `--color-primary`, etc. |
| Prototype interactions | Webflow Interactions | CSS transitions / Framer Motion |

### Token Naming Alignment
Keep naming identical across Figma, CLAUDE.md, and code:
- Figma: `color/primary/500` → CSS: `--color-primary-500` → Tailwind: `text-primary-500`
- Figma: `space/lg` → CSS: `--space-lg` → Tailwind: `gap-6` (24px)
- Figma: `font/heading` → CSS: `--font-heading` → Tailwind: `font-heading`

---

## 30. PERFORMANCE & OPTIMIZATION

| Webflow Feature | Code Equivalent |
|---|---|
| Lazy Load images | `loading="lazy"` on `<Image>` (default for below-fold) |
| Responsive images | Next.js `<Image>` with `sizes` prop |
| Minified CSS/JS | Next.js production build (automatic) |
| Global CDN | Vercel Edge Network (automatic) |
| Preload fonts | `next/font` with `display: 'swap'` |
| WebP/AVIF images | Next.js `<Image>` auto-converts formats |
| Reduce animations on mobile | `prefers-reduced-motion` media query |
| Minimize third-party scripts | `next/script` with `strategy="lazyOnload"` |

---

## 31. STATES (Pseudo-Classes)

Webflow's States dropdown maps directly to CSS pseudo-classes. This is how you style elements in different interaction states.

| Webflow State | CSS Pseudo-Class | Tailwind Prefix | Inherits From |
|---|---|---|---|
| None (default) | — | — (base styles) | — |
| Hover | `:hover` | `hover:` | None |
| Pressed / Active | `:active` | `active:` | Hover → None |
| Focused | `:focus` | `focus:` | None |
| Focused (keyboard) | `:focus-visible` | `focus-visible:` | None |
| Visited | `:visited` | `visited:` | None |
| Disabled | `:disabled` | `disabled:` | None |
| Placeholder | `::placeholder` | `placeholder:` | None |
| Current (nav link) | `.w--current` / `aria-current="page"` | Conditional class | None |
| Empty | `:empty` | `empty:` | None |

### Inheritance Chain
States cascade: `None → Hover → Pressed`. If you set a blue background on Hover, Pressed inherits it unless overridden.

### In Code
```tsx
// Button with all states styled
<button className="
  bg-amber-500 text-stone-950 font-semibold px-6 py-3 rounded-lg
  transition-all duration-200
  hover:bg-amber-400
  active:bg-amber-600 active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Get Started
</button>

// Current nav link (active page indicator)
<Link
  href="/solutions"
  className={cn(
    "text-sm font-medium transition-colors",
    pathname === '/solutions'
      ? "text-white"              // Current state
      : "text-stone-400 hover:text-white"  // Default + Hover
  )}
>
  Solutions
</Link>

// Input with placeholder state
<input
  placeholder="Your email"
  className="bg-stone-900 border border-stone-700 text-white
    placeholder:text-stone-500
    focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
/>
```

---

## 32. EFFECTS — Shadows, Transforms, Filters, Blend Modes

### Box Shadows
```tsx
// Webflow: Effects > Box Shadow
<div className="shadow-lg" />                         // Standard shadow
<div className="shadow-[0_0_30px_rgba(245,158,11,0.15)]" /> // Custom glow
// Inset shadow (Webflow "inner shadow")
<div className="shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
```

### 2D & 3D Transforms
Webflow's Transform section includes Move, Rotate, Scale, and Skew on X/Y/Z axes.

```tsx
// Move (Translate)
<div className="translate-x-4 translate-y-2" />
<div className="-translate-y-1/2" />  // Center vertically trick

// Scale
<div className="scale-105" />
<div className="hover:scale-[1.02]" />

// Rotate
<div className="rotate-3" />
<div className="-rotate-6" />

// Skew
<div className="skew-x-3" />

// 3D Perspective (parent sets perspective, children transform in 3D)
<div style={{ perspective: '1000px' }}>
  <div className="rotate-y-12 transform-gpu" />
</div>

// Transform Origin (where the transform pivots from)
<div className="origin-top-left rotate-3" />
```

### CSS Filters
Applied to the element AND its children:
```tsx
<div className="blur-sm" />           // Blur
<div className="brightness-75" />     // Darken
<div className="contrast-125" />      // Increase contrast
<div className="grayscale" />         // Black & white
<div className="saturate-150" />      // Boost color
<div className="sepia" />             // Sepia tone
<div className="hue-rotate-90" />     // Shift colors
<div className="drop-shadow-lg" />    // Drop shadow on irregular shapes
<div className="invert" />            // Invert colors
```

### Backdrop Filters
Applied to what's BEHIND the element (the element must be partially transparent):
```tsx
// Webflow: Effects > Backdrop Filters
// Classic frosted glass navbar
<header className="backdrop-blur-xl bg-stone-950/80 border-b border-stone-800/50">
  {/* Navbar content */}
</header>

// Card with backdrop blur
<div className="backdrop-blur-md backdrop-brightness-75 bg-white/5 border border-white/10 rounded-xl p-6">
  Content over a busy background
</div>
```

### Blend Modes
How an element blends visually with elements behind it:
```tsx
<div className="mix-blend-multiply" />    // Darken blend
<div className="mix-blend-screen" />      // Lighten blend
<div className="mix-blend-overlay" />     // Contrast blend
<div className="mix-blend-difference" />  // Invert blend
```

### Opacity
```tsx
<div className="opacity-100" />  // Fully visible (default)
<div className="opacity-50" />   // 50% transparent
<div className="opacity-0" />    // Fully invisible (still takes space)
```

### Cursor
```tsx
<div className="cursor-pointer" />       // Hand icon (clickable)
<div className="cursor-default" />       // Arrow
<div className="cursor-not-allowed" />   // Disabled indicator
<div className="cursor-grab" />          // Draggable
<div className="cursor-text" />          // Text input
<div className="pointer-events-none" />  // Clicks pass through element
<div className="pointer-events-auto" />  // Re-enable clicks on a child
```

---

## 33. TRANSITIONS — Smooth State Changes

Webflow's Transitions panel adds smooth animation between states. Set on the **None (default) state**, not on the hover state.

### Properties You Can Transition
- All properties: `transition-all`
- Specific: `transition-colors`, `transition-opacity`, `transition-transform`, `transition-shadow`

### Transition Configuration
```tsx
// Duration + Easing
<div className="transition-all duration-200 ease-out" />       // Fast, snappy
<div className="transition-all duration-300 ease-in-out" />    // Smooth
<div className="transition-colors duration-150" />              // Only color changes

// Full button example with transition
<button className="
  bg-amber-500 text-stone-950
  transition-all duration-200 ease-out
  hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20
  active:scale-[0.98] active:bg-amber-600
">
  CTA Button
</button>
```

### Webflow Easing → CSS
| Webflow Easing | CSS `timing-function` | Tailwind |
|---|---|---|
| Ease | `ease` | `ease-in-out` |
| Ease In | `ease-in` | `ease-in` |
| Ease Out | `ease-out` | `ease-out` |
| Ease In-Out | `ease-in-out` | `ease-in-out` |
| Linear | `linear` | `duration-*` (no easing) |
| Custom (Cubic Bezier) | `cubic-bezier(x1,y1,x2,y2)` | Custom in config |

### Delay
```tsx
<div className="transition-all duration-300 delay-100" /> // 100ms delay before animation starts
```

---

## 34. IMAGE & MEDIA HANDLING

### Object Fit (Webflow: Image "Fill" settings)
How an image fills its container:
```tsx
// Cover — fills container, crops if needed (most common)
<Image src="..." fill className="object-cover" />

// Contain — fits inside container, may letterbox
<Image src="..." fill className="object-contain" />

// Fill — stretches to fill (distorts image)
<Image src="..." fill className="object-fill" />
```

### Object Position
Where the image anchors when cropped:
```tsx
<Image src="..." fill className="object-cover object-center" />  // Center (default)
<Image src="..." fill className="object-cover object-top" />     // Face at top
<Image src="..." fill className="object-cover object-left" />    // Subject on left
```

### Aspect Ratio
Lock an element to a specific ratio:
```tsx
<div className="aspect-video" />     // 16:9
<div className="aspect-square" />    // 1:1
<div className="aspect-[4/3]" />     // Custom 4:3
<div className="aspect-[3/2]" />     // Custom 3:2
```

### Background Image vs HTML Image
| Use Case | Element | Why |
|---|---|---|
| Decorative (ambient, texture) | Background Image (`bg-[url(...)]`) | Not content, no alt text needed |
| Content (product, team, case study) | `<Image>` component | SEO, accessibility, lazy loading |

### Responsive Images
```tsx
// Next.js <Image> handles srcset automatically
<Image
  src="/images/hero.webp"
  alt="Dolta lead generation dashboard"
  width={1200}
  height={675}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  priority  // Only for above-the-fold images (hero, header logo)
/>
```

### Clip Path & Masks
```tsx
// Circle mask
<div className="[clip-path:circle(50%)]">
  <Image src="..." />
</div>

// Custom polygon
<div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
  {/* Angled bottom edge */}
</div>
```

---

## 35. ACCESSIBILITY (Webflow Accessibility Checklist)

### Semantic HTML
| Webflow Element | HTML Tag | Purpose |
|---|---|---|
| Section | `<section>` | Thematic grouping |
| Navbar | `<nav>` | Navigation |
| Header (page) | `<header>` | Page or section header |
| Footer | `<footer>` | Page footer |
| Heading (H1-H6) | `<h1>`-`<h6>` | Content hierarchy |
| Paragraph | `<p>` | Text block |
| Link | `<a>` | Navigation/action |
| Button | `<button>` | Action trigger |
| List | `<ul>`, `<ol>`, `<li>` | Sequential/grouped items |
| Article | `<article>` | Self-contained content |
| Aside | `<aside>` | Sidebar/supplementary |
| Main | `<main>` | Primary page content |

### Required Accessibility Practices
- **Alt text on every image**: descriptive, not "image of..."
- **Heading hierarchy**: H1 → H2 → H3, never skip levels
- **Color contrast**: 4.5:1 minimum for normal text, 3:1 for large text
- **Focus visible**: every interactive element needs a visible focus ring
- **Keyboard navigation**: tab order follows visual order, no keyboard traps
- **ARIA labels**: for icon-only buttons (`aria-label="Open menu"`), landmarks
- **Skip to content link**: hidden link for keyboard users to skip nav
- **Language attribute**: `<html lang="en">`
- **Reduced motion**: respect `prefers-reduced-motion` media query

```tsx
// Skip to content link
<a href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
    focus:z-[100] focus:bg-amber-500 focus:text-stone-950 focus:px-4 focus:py-2 focus:rounded">
  Skip to content
</a>

// Reduced motion
<div className="motion-safe:animate-fade-in motion-reduce:animate-none">
  Content
</div>
```

---

## 36. PAGINATION & LOAD MORE

### Webflow CMS Pagination
Webflow limits Collection Lists to 100 items and offers built-in pagination for lists.

### In Code
```tsx
// Static pagination (server-rendered)
// app/blog/page.tsx?page=2
const POSTS_PER_PAGE = 12
const page = Number(searchParams.page) || 1
const paginatedPosts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

// Pagination UI
<nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-12">
  {page > 1 && <Link href={`/blog?page=${page - 1}`}>Previous</Link>}
  {Array.from({ length: totalPages }, (_, i) => (
    <Link key={i} href={`/blog?page=${i + 1}`}
      className={cn("px-3 py-1 rounded", page === i + 1 ? "bg-amber-500 text-stone-950" : "text-stone-400")}>
      {i + 1}
    </Link>
  ))}
  {page < totalPages && <Link href={`/blog?page=${page + 1}`}>Next</Link>}
</nav>
```

---

## 37. THE FULL WEBFLOW STYLE PANEL MAP

The Webflow Style Panel has 7 sections. Every CSS property lives in one of these:

| Style Panel Section | What It Controls | Key Tailwind Categories |
|---|---|---|
| **Layout** | Display, Flex/Grid, Position, Float, Clear, Overflow, Z-index | `flex`, `grid`, `relative`, `absolute`, `sticky`, `overflow-hidden`, `z-50` |
| **Spacing** | Margin, Padding (visualized as a box model diagram) | `m-`, `p-`, `mx-`, `py-`, `gap-` |
| **Size** | Width, Height, Min-W, Min-H, Max-W, Max-H, Object-fit, Aspect-ratio | `w-`, `h-`, `max-w-`, `min-h-`, `object-cover`, `aspect-video` |
| **Typography** | Font family, weight, size, line-height, letter-spacing, color, alignment, decoration, transform, text-indent, columns, word-break | `font-`, `text-`, `leading-`, `tracking-`, `uppercase`, `text-balance` |
| **Backgrounds** | Background color, image, gradient, position, size, repeat, clip, blend | `bg-`, `bg-cover`, `bg-gradient-to-b`, `bg-clip-text` |
| **Borders** | Border width, style, color, radius (per-side control) | `border-`, `rounded-`, `ring-`, `outline-` |
| **Effects** | Opacity, Box Shadow, 2D/3D Transforms, Transitions, Filters, Backdrop Filters, Blend Mode, Cursor | `opacity-`, `shadow-`, `transform`, `transition-`, `blur-`, `backdrop-blur-`, `mix-blend-`, `cursor-` |

### Custom Properties Section
Webflow also has a "Custom Properties" section at the bottom of the Style Panel for CSS properties not natively supported in the UI. In Tailwind, this is the arbitrary value syntax: `[property:value]`.

```tsx
// Arbitrary CSS in Tailwind (for properties not in Webflow's UI)
<div className="[text-wrap:balance]" />
<div className="[animation-timeline:scroll()]" />
<div className="[-webkit-text-stroke:1px_white]" />
```

---

## APPENDIX A: CHECKLIST BEFORE EVERY BUILD

### Structure
- [ ] Every section has a container inside it
- [ ] Container has max-width and horizontal padding
- [ ] Flex/grid set on a child div inside container, not on container itself
- [ ] No fixed heights — content determines height
- [ ] Page wrapper with `min-h-screen` and flex-col for sticky footer
- [ ] Single Header component, single Footer component, placed in root layout

### Spacing
- [ ] Spacing uses `gap` on flex/grid parents (not margin on children)
- [ ] Section padding is consistent: `py-16 md:py-20 lg:py-24 xl:py-32`
- [ ] Container horizontal padding: `px-6 lg:px-8`
- [ ] No spacing blocks/empty divs — use gap instead

### Typography
- [ ] Typography uses defined scale, not arbitrary values
- [ ] All headings use `text-balance` and `max-w-` constraints
- [ ] Body text uses `text-pretty` and `max-w-prose` or `max-w-2xl`
- [ ] Heading hierarchy correct: H1 → H2 → H3, no skipped levels
- [ ] Font loaded via `next/font`, not `<link>` tags

### Design Tokens
- [ ] Variables/tokens used for all colors, spacing, fonts, radii
- [ ] No hardcoded hex colors or pixel values in components
- [ ] Single border radius used consistently for all cards

### Classes & Components
- [ ] Classes are semantic and descriptive (no `div-block-47`)
- [ ] Components are reusable with variant props
- [ ] No deep stacking — max 2-3 classes per element

### Images
- [ ] All images use Next.js `<Image>` component with `alt`, `width`, `height`
- [ ] No `<img>` tags anywhere
- [ ] Above-fold images have `priority` prop
- [ ] Below-fold images lazy load automatically
- [ ] `sizes` prop set for responsive images

### States & Interactions
- [ ] Every button/link has hover, active, and focus-visible states
- [ ] Transitions set on the **default** state (not on hover)
- [ ] Transition duration: 150-200ms for hover, 300-600ms for page entrance
- [ ] Nav links have "current" state styled
- [ ] Form inputs have focus and placeholder states

### Responsive
- [ ] Mobile-first: base styles are for mobile, layer up with `sm:`, `md:`, `lg:`, `xl:`
- [ ] Tested at 320px, 768px, 1024px, 1280px, 1536px
- [ ] No horizontal overflow on any viewport
- [ ] Navigation: hamburger on mobile, full nav on `lg:`
- [ ] Font sizes, spacing, and grid columns all scale with breakpoints

### Accessibility
- [ ] Alt text on every content image
- [ ] 4.5:1 contrast ratio on all text
- [ ] Focus-visible rings on all interactive elements
- [ ] Keyboard navigable — tab order follows visual order
- [ ] Skip-to-content link present
- [ ] `<html lang="en">` set
- [ ] `prefers-reduced-motion` respected
- [ ] No `outline: none` without a replacement focus style

### SEO
- [ ] Unique `<title>` and `meta description` per page
- [ ] Open Graph image, title, description set
- [ ] JSON-LD schema on key pages (Organization, Article, FAQ)
- [ ] Sitemap generated
- [ ] Canonical URLs set
- [ ] 301 redirects configured for any changed URLs
- [ ] Clean, keyword-friendly slugs

### Performance
- [ ] Lighthouse ≥ 90 all categories
- [ ] LCP < 2.5s, CLS < 0.1
- [ ] No layout shift from unoptimized images
- [ ] Third-party scripts use `next/script` with `strategy="lazyOnload"`
- [ ] No unnecessary `"use client"` components

### Effects
- [ ] Overflow hidden not set on any parent of a sticky element
- [ ] Backdrop blur has partially transparent background
- [ ] Transforms use `transform-gpu` for hardware acceleration
- [ ] No width/height animations — use transform and opacity only
- [ ] Pointer events disabled on decorative overlays

---

## APPENDIX B: QUICK REFERENCE — WEBFLOW TERM → ONE-LINE CODE

```
Section          → <section className="w-full">
Container        → <div className="mx-auto max-w-7xl px-6 lg:px-8">
Div Block        → <div>
Flex Horizontal  → <div className="flex flex-row">
Flex Vertical    → <div className="flex flex-col">
Center Center    → items-center justify-center
Gap              → gap-6
Wrap             → flex-wrap
Expand           → flex-1
Grid 3 Col       → <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
Span 2           → col-span-2
Sticky           → sticky top-0 z-50
Absolute         → absolute top-0 left-0
Hidden           → hidden lg:block
Hover            → hover:bg-stone-800
Pressed          → active:scale-[0.98]
Focus            → focus-visible:ring-2
Transition       → transition-all duration-200
Shadow           → shadow-lg
Backdrop Blur    → backdrop-blur-xl bg-stone-950/80
Opacity 50%      → opacity-50
Grayscale        → grayscale hover:grayscale-0
Scale            → hover:scale-105
Rotate           → rotate-3
Object Cover     → object-cover
Aspect 16:9      → aspect-video
Pointer          → cursor-pointer
No Click         → pointer-events-none
```
