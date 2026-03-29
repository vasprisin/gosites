# WEBFLOW-PLATFORM-MAP.md
# Complete Webflow Platform Taxonomy → Code Equivalent
# Every element, panel, feature, and site-level concept with its code ID

> **WEBFLOW-DESIGN-VOCABULARY.md** covers *how to style things* (properties, tokens, layout).
> **This file** covers *what things are called* (every element, panel, feature, and structural concept in Webflow).
> Together they form the complete Webflow → Code translation layer.

---

## TABLE OF CONTENTS

1. Page Hierarchy (Body → Page Wrapper → Content)
2. Add Elements Panel — Layout Elements
3. Add Elements Panel — Basic Elements
4. Add Elements Panel — Typography Elements
5. Add Elements Panel — CMS / Dynamic Content Elements
6. Add Elements Panel — Media Elements
7. Add Elements Panel — Form Elements
8. Add Elements Panel — Advanced Elements
9. Components (Symbols)
10. Navigator Panel
11. Style Panel
12. Element Settings Panel
13. Interactions Panel
14. Pages Panel & Page Settings
15. CMS Panel (Collections)
16. Assets Panel
17. Variables Panel
18. Global Styles (Tags)
19. Site Settings
20. Publishing & Hosting
21. Editor Mode
22. Logic (Webflow Logic)
23. Memberships
24. Localization (i18n)
25. Ecommerce
26. Audit Panel
27. Breadcrumb Bar
28. Canvas & Viewport
29. Quick Find
30. Code Export

---

## 1. PAGE HIERARCHY

Every Webflow page has this implicit structure. Claude Code must replicate it.

### Body
| Webflow | Code Equivalent | Notes |
|---|---|---|
| **Body** | `<body>` in `app/layout.tsx` | The outermost element. Cannot be deleted. Cannot set width or position. Styles here inherit to ALL children on ALL pages. |
| **Body (All pages)** tag | `app/layout.tsx` body styles + `globals.css` | Global typography defaults (font-family, color, line-height) set on Body cascade everywhere. |

```tsx
// app/layout.tsx — this IS the Body
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="bg-[var(--surface-primary)] text-[var(--text-primary)] font-body antialiased">
        <Header />
        <main>{children}</main>  {/* ← Page Wrapper equivalent */}
        <Footer />
      </body>
    </html>
  )
}
```

### Page Wrapper
| Webflow | Code Equivalent | Notes |
|---|---|---|
| **Page Wrapper** | `<main>` in `app/layout.tsx` | Optional wrapper div inside Body that wraps all page content. In Webflow, often a div with class `page-wrapper` that enables smooth scroll, sets min-height, or contains the page between Header and Footer. |

```tsx
// Explicit Page Wrapper pattern (Client-First convention)
<body>
  <Header />
  <main className="min-h-screen">  {/* page-wrapper */}
    {children}  {/* ← page content injected here */}
  </main>
  <Footer />
</body>
```

### Main Wrapper
| Webflow | Code Equivalent | Notes |
|---|---|---|
| **Main Wrapper** | `<main>` or a wrapper `<div>` | In Client-First, `main-wrapper` sits inside `page-wrapper` and contains everything except Header/Footer. In code, `<main>` serves this role. |

### Global Wrapper
| Webflow | Code Equivalent | Notes |
|---|---|---|
| **Global Wrapper** | `app/layout.tsx` root layout | Wraps the entire site across all pages. In Webflow, a div wrapping everything for page transitions or global scroll behavior. |

### Full Page Structure
```
Webflow:                          Code:
─────────────────────────────     ──────────────────────────
Body                              <html><body>
  └── Page Wrapper                  <main>
       ├── Header (Navbar)            <Header />
       ├── Main Wrapper               {children} ← page.tsx
       │    ├── Section                 <section>
       │    │    └── Container            <div className="mx-auto max-w-7xl">
       │    │         └── Content            {/* content */}
       │    ├── Section
       │    └── Section
       └── Footer                     <Footer />
                                    </main>
                                  </body></html>
```

---

## 2. ADD ELEMENTS PANEL — LAYOUT

These are Webflow's structural/container elements:

| Webflow Element | HTML Tag | Tailwind/Code | Purpose | ID |
|---|---|---|---|---|
| **Section** | `<section>` | `<section className="w-full py-20 lg:py-32">` | Full-width page section. Background color/image goes here. | `layout-section` |
| **Container** | `<div>` | `<div className="mx-auto max-w-7xl px-6 lg:px-8">` | Max-width centered wrapper. Constrains content. Default 940px in Webflow. | `layout-container` |
| **Quick Stack** | `<div>` | `<div className="flex flex-wrap gap-4">` | Pre-configured flex container with responsive stacking. | `layout-quick-stack` |
| **Div Block** | `<div>` | `<div>` | Generic wrapper. No semantic meaning. Use for grouping, flex/grid parents, spacing. | `layout-div-block` |
| **V Flex** | `<div>` | `<div className="flex flex-col">` | Vertical flex container (shortcut). | `layout-v-flex` |
| **H Flex** | `<div>` | `<div className="flex flex-row">` | Horizontal flex container (shortcut). | `layout-h-flex` |
| **Grid** | `<div>` | `<div className="grid grid-cols-3 gap-6">` | CSS Grid container. | `layout-grid` |
| **Columns** | `<div>` | `<div className="grid grid-cols-2 gap-8">` | Legacy two/three column layout. Use Grid instead. | `layout-columns` |
| **Column** | `<div>` | Grid child `<div>` | Individual column inside Columns element. | `layout-column` |

---

## 3. ADD ELEMENTS PANEL — BASIC

| Webflow Element | HTML Tag | Code | Purpose | ID |
|---|---|---|---|---|
| **Link Block** | `<a>` | `<Link href="/" className="block">` | Entire block is a clickable link. Cannot nest other links inside. | `basic-link-block` |
| **Button** | `<a>` | `<Button>` or `<Link className="btn">` | Styled link that looks like a button. NOT a `<button>` by default in Webflow. | `basic-button` |
| **List** | `<ul>` | `<ul className="space-y-2">` | Unordered list. | `basic-list` |
| **List Item** | `<li>` | `<li>` | Item inside a list. | `basic-list-item` |

---

## 4. ADD ELEMENTS PANEL — TYPOGRAPHY

| Webflow Element | HTML Tag | Code | Purpose | ID |
|---|---|---|---|---|
| **Heading** | `<h1>`–`<h6>` | `<h1 className="text-4xl font-bold">` | Heading element. Webflow lets you choose H1–H6 level. | `type-heading` |
| **Paragraph** | `<p>` | `<p className="text-base text-[var(--text-secondary)]">` | Body text paragraph. | `type-paragraph` |
| **Text Link** | `<a>` | `<Link href="/">` | Inline text link within a paragraph or heading. | `type-text-link` |
| **Text Block** | `<div>` | `<span>` or `<div>` | Generic text container. Unlike Paragraph, doesn't add vertical margin. | `type-text-block` |
| **Block Quote** | `<blockquote>` | `<blockquote className="border-l-4 pl-4 italic">` | Styled quotation block. | `type-block-quote` |
| **Rich Text** | `<div>` with nested HTML | `<article className="prose prose-invert">` | WYSIWYG content block. Contains mixed H2, H3, P, UL, OL, IMG, etc. Used for CMS content. | `type-rich-text` |
| **Superscript** | `<sup>` | `<sup>` | Raised text (footnotes, ordinals). | `type-superscript` |
| **Subscript** | `<sub>` | `<sub>` | Lowered text (chemical formulas). | `type-subscript` |
| **Strong** | `<strong>` | `<strong className="font-semibold">` | Bold emphasis (semantic). | `type-strong` |
| **Emphasis** | `<em>` | `<em>` | Italic emphasis (semantic). | `type-emphasis` |
| **Line Break** | `<br>` | `<br />` | Manual line break inside text. | `type-line-break` |

---

## 5. ADD ELEMENTS PANEL — CMS / DYNAMIC CONTENT

| Webflow Element | Code Equivalent | Purpose | ID |
|---|---|---|---|
| **Collection List Wrapper** | Server Component with data fetch | Outermost wrapper containing the list + empty state + pagination. | `cms-collection-list-wrapper` |
| **Collection List** | `.map()` loop | The repeating container. Maps over CMS items. | `cms-collection-list` |
| **Collection Item** | Individual item in `.map()` | Single card/row template. All children repeat per item. | `cms-collection-item` |
| **Empty State** | Conditional `{items.length === 0 && ...}` | Shown when no CMS items match filters. | `cms-empty-state` |
| **Pagination** | `<Pagination>` component | Page numbers / prev-next for Collection Lists. | `cms-pagination` |
| **Dynamic Wrapper** | Server Component page | The template page for a single CMS item (e.g., blog post page). | `cms-dynamic-wrapper` |

```tsx
// Collection List → Code
const posts = getAllPosts()  // data fetch

// Collection List Wrapper
<div>
  {posts.length > 0 ? (
    // Collection List
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        // Collection Item
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  ) : (
    // Empty State
    <p className="text-center text-[var(--text-secondary)]">No posts found.</p>
  )}
</div>
```

---

## 6. ADD ELEMENTS PANEL — MEDIA

| Webflow Element | HTML/Code | Purpose | ID |
|---|---|---|---|
| **Image** | `<Image>` from `next/image` | Optimized image. Requires `width`, `height`, `alt`. | `media-image` |
| **Video** | `<video>` or `<ReactPlayer>` | Self-hosted or embedded video. | `media-video` |
| **YouTube** | `<iframe>` or `<ReactPlayer url="">` | YouTube embed. | `media-youtube` |
| **Vimeo** | `<iframe>` or `<ReactPlayer url="">` | Vimeo embed. | `media-vimeo` |
| **Lottie Animation** | `<Lottie animationData={}>` | After Effects JSON animation. | `media-lottie` |
| **Spline Scene** | `<Spline scene="">` | 3D Spline embed. | `media-spline` |
| **Background Video** | CSS `object-fit: cover` `<video>` | Full-width background video behind content. | `media-background-video` |
| **Lightbox** | Modal with media | Click image → opens fullscreen overlay. | `media-lightbox` |
| **Lightbox Link** | Trigger element | The clickable element that opens the lightbox. | `media-lightbox-link` |

### Background Video Pattern
```tsx
<section className="relative overflow-hidden">
  <video
    autoPlay muted loop playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/60" /> {/* overlay */}
  <div className="relative z-10">
    <Container>{/* content on top of video */}</Container>
  </div>
</section>
```

---

## 7. ADD ELEMENTS PANEL — FORMS

| Webflow Element | HTML/Code | Purpose | ID |
|---|---|---|---|
| **Form Block** | `<form>` | Form wrapper containing all fields + submit button + success/error messages. | `form-block` |
| **Form** | Inner `<form>` | The actual form element inside Form Block. | `form-form` |
| **Label** | `<label>` | Text label for an input. Associates with input via `htmlFor`. | `form-label` |
| **Input** | `<input>` | Single-line text input. Types: text, email, password, number, tel, url. | `form-input` |
| **Textarea** | `<textarea>` | Multi-line text input. | `form-textarea` |
| **File Upload** | `<input type="file">` | File upload field. | `form-file-upload` |
| **Checkbox** | `<input type="checkbox">` | Boolean toggle. | `form-checkbox` |
| **Checkbox Field** | `<div>` wrapper | Container: checkbox input + label. | `form-checkbox-field` |
| **Radio Button** | `<input type="radio">` | Single select from group. | `form-radio` |
| **Radio Button Field** | `<div>` wrapper | Container: radio input + label. | `form-radio-field` |
| **Select** | `<select>` | Dropdown select menu. | `form-select` |
| **Submit Button** | `<button type="submit">` | Form submission trigger. In Webflow this is an `<input type="submit">` but in code use `<button>`. | `form-submit` |
| **Success Message** | Conditional `<div>` | Shown after successful submission. | `form-success` |
| **Error Message** | Conditional `<div>` | Shown on submission failure. | `form-error` |
| **reCAPTCHA** | Script embed | Google reCAPTCHA spam protection. | `form-recaptcha` |
| **Hidden Field** | `<input type="hidden">` | Hidden data sent with form (UTM params, page URL). | `form-hidden` |

---

## 8. ADD ELEMENTS PANEL — ADVANCED

| Webflow Element | Code | Purpose | ID |
|---|---|---|---|
| **Embed** | `<Script>` / `dangerouslySetInnerHTML` | Custom HTML/CSS/JS code block. Third-party widget embeds. | `advanced-embed` |
| **Dropdown** | Custom component | Click trigger → reveal content panel. Used in navbars and FAQs. | `advanced-dropdown` |
| **Dropdown Toggle** | Button/trigger | The clickable element that opens/closes the dropdown. | `advanced-dropdown-toggle` |
| **Dropdown List** | Content panel | The revealed content area. | `advanced-dropdown-list` |
| **Tabs** | Tab component | Tabbed content switcher. | `advanced-tabs` |
| **Tabs Menu** | Tab button row | Row of tab trigger buttons. | `advanced-tabs-menu` |
| **Tab Link** | Individual tab button | Single tab trigger. | `advanced-tab-link` |
| **Tabs Content** | Tab panels wrapper | Container for all tab panels. | `advanced-tabs-content` |
| **Tab Pane** | Individual panel | Content shown when its tab is active. | `advanced-tab-pane` |
| **Slider** | Carousel component | Sliding content carousel. | `advanced-slider` |
| **Slide** | Carousel item | Individual slide inside the slider. | `advanced-slide` |
| **Slider Arrow** | Prev/Next buttons | Navigation arrows. | `advanced-slider-arrow` |
| **Slide Nav** | Dot indicators | Pagination dots below the slider. | `advanced-slide-nav` |
| **Navbar** | `<Header>` + `<nav>` | Site navigation bar. Contains Brand, Nav Menu, Menu Button. | `advanced-navbar` |
| **Brand** | Logo `<Link>` | Logo/home link inside navbar. | `advanced-brand` |
| **Nav Menu** | `<nav>` | Container for navigation links. | `advanced-nav-menu` |
| **Nav Link** | `<Link>` | Individual navigation link. | `advanced-nav-link` |
| **Nav Dropdown** | Dropdown in nav | Dropdown menu inside navigation (mega menu). | `advanced-nav-dropdown` |
| **Menu Button** | Hamburger toggle | Mobile menu open/close button. The "hamburger icon." | `advanced-menu-button` |
| **Search** | Search component | Site search input + results. | `advanced-search` |
| **Map** | Map embed | Google Maps embed. | `advanced-map` |
| **Facebook / Twitter** | Social embed | Social media widget embeds. | `advanced-social-embed` |

---

## 9. COMPONENTS (formerly Symbols)

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Component** | React Component (`.tsx` file) | Reusable element with its own file. Edit once, updates everywhere. | `component-main` |
| **Component Instance** | `<ComponentName />` | Usage of a component on a page. | `component-instance` |
| **Main Component** | The `.tsx` source file | The single source of truth. Edit here to change all instances. | `component-source` |
| **Component Property** | React `props` | Variable data passed to each instance (text, image, link, visibility, variant). | `component-prop` |
| **Text Property** | `string` prop | Editable text per instance. `<Component title="Custom Title" />` | `component-prop-text` |
| **Image Property** | `string` prop (src) | Editable image per instance. | `component-prop-image` |
| **Link Property** | `string` prop (href) | Editable URL per instance. | `component-prop-link` |
| **Visibility Property** | `boolean` prop | Show/hide element per instance. `{showBadge && <Badge>}` | `component-prop-visibility` |
| **Style Variant** | Variant prop + `cn()` | Visual variation. `variant="primary" | "secondary"` | `component-prop-variant` |
| **Slot** | `children` or named slot prop | Placeholder where each instance can insert different content. | `component-slot` |
| **Property Group** | Related props grouped | Group related props for organization. In code: destructured prop groups or compound types. | `component-prop-group` |
| **Component Group** | Folder in `/components/` | Organizational folder grouping related components. | `component-group` |
| **Unlink Component** | Copy component code, modify independently | Break an instance away from the main component. In code: duplicate file and rename. | `component-unlink` |
| **Symbol** (legacy) | Same as Component | Old Webflow term. Renamed to "Component" in 2023. | `component-symbol-legacy` |

---

## 10. NAVIGATOR PANEL

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Navigator** | File tree / JSX nesting | Visual outline of the page's element hierarchy. Shows parent → child nesting. | `panel-navigator` |
| **Element Label** | JSX tag + className | Name shown in Navigator. Displays element type + class name. | `navigator-label` |
| **Element Nesting** | JSX indentation | Parent → child relationship shown by indentation. | `navigator-nesting` |
| **Drag to Reorder** | Move JSX code | Reorder elements by dragging in Navigator. In code: cut/paste JSX. | `navigator-reorder` |
| **Hidden Element** | `className="hidden"` or conditional render | Eye icon toggle. Element exists but is not visible. | `navigator-hidden` |
| **Locked Element** | N/A | Prevents accidental edits. No direct code equivalent (use `// DO NOT EDIT` comments). | `navigator-locked` |
| **Purple Icon (Dynamic)** | CMS-bound element | Element connected to a Collection field. Shows data binding. | `navigator-dynamic` |
| **Green Outline** | Component instance | Component instances are outlined green in Navigator. | `navigator-component` |

---

## 11. STYLE PANEL (Right Panel)

| Webflow Panel Section | Code Equivalent | Properties Controlled | ID |
|---|---|---|---|
| **Selector Field** | `className="..."` | Where you type the class name. This IS the Tailwind class string. | `style-selector` |
| **Inheritance Menu** | CSS cascade / parent classes | Shows which parent/ancestor classes are affecting the element. | `style-inheritance` |
| **States Menu** | Pseudo-class prefixes (`hover:`, `focus:`, `active:`) | Switch between None, Hover, Pressed, Focused, etc. | `style-states` |
| **Affected Elements Count** | N/A (mental model) | How many elements share this class. In code: grep for the class name. | `style-affected-count` |
| **Layout Section** | `display`, `flex`, `grid`, `position`, `overflow`, `z-index` | Display, flex/grid parent, position, overflow, z-index. | `style-layout` |
| **Spacing Section** | `margin`, `padding`, `gap` | All margin, padding, and gap values. | `style-spacing` |
| **Size Section** | `width`, `height`, `min/max-width`, `min/max-height`, `object-fit`, `aspect-ratio` | Dimensions and fitting. | `style-size` |
| **Typography Section** | `font-*`, `text-*`, `leading-*`, `tracking-*` | Font, size, weight, height, spacing, color, alignment, decoration, transform. | `style-typography` |
| **Backgrounds Section** | `bg-*`, `gradient`, `background-image`, `background-size` | Colors, images, gradients, position, repeat, clip. | `style-backgrounds` |
| **Borders Section** | `border-*`, `rounded-*`, `ring-*`, `outline-*` | Width, style, color, radius. | `style-borders` |
| **Effects Section** | `opacity`, `shadow-*`, `transform`, `transition-*`, `filter`, `backdrop-filter`, `mix-blend-*`, `cursor-*` | Opacity, shadows, transforms, transitions, filters, blend modes, cursor. | `style-effects` |

---

## 12. ELEMENT SETTINGS PANEL

| Webflow Setting | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Element Settings** (gear icon) | React props / HTML attributes | Per-element configuration (not styling). | `settings-panel` |
| **ID** | `id="..."` | HTML ID attribute. Unique per page. Used for anchor links. | `settings-id` |
| **Tag** | HTML element tag | Change the rendered HTML tag (div → section → article → aside, etc.). | `settings-tag` |
| **Custom Attributes** | `data-*` attributes | Add custom data attributes (for animations, analytics, testing). | `settings-custom-attributes` |
| **Visibility** | Conditional render / `className="hidden md:block"` | Show/hide on breakpoints or based on conditions. | `settings-visibility` |
| **Conditional Visibility** | `{condition && <Element>}` | CMS-driven: show element only if a field has a value. | `settings-conditional-visibility` |
| **Link Settings** | `href`, `target`, `rel` | URL, open in new tab, nofollow/noopener. | `settings-link` |
| **Image Settings** | `src`, `alt`, `width`, `height`, `loading` | Source, alt text, dimensions, lazy loading. | `settings-image` |
| **Video Settings** | `url`, `autoPlay`, `muted`, `loop`, `controls` | Video source and playback options. | `settings-video` |
| **Form Settings** | `action`, `method`, redirect URL | Form submission configuration. | `settings-form` |
| **Collection List Settings** | Data fetch + filter/sort | Source collection, filter rules, sort order, limit. | `settings-collection-list` |
| **SEO Settings** (page) | `metadata` export | Title tag, meta description, OG image, slug. See Pages Panel. | `settings-seo` |

---

## 13. INTERACTIONS PANEL

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Interactions Panel** | Framer Motion / GSAP / CSS animations | Left panel (lightning bolt icon) for creating animations. | `panel-interactions` |
| **Element Trigger** | Event handler or CSS pseudo-class | What starts the animation (hover, click, scroll, page load). | `interaction-trigger` |
| **Page Trigger** | `useEffect` / page load event | Animations on page load, scroll, mouse move. | `interaction-page-trigger` |
| **Animation** | `animate()`, `variants`, `@keyframes` | The sequence of visual changes. | `interaction-animation` |
| **Action** | Individual property change | Single change within an animation (move, scale, opacity, etc.). | `interaction-action` |
| **Timed Animation** | `duration`, `delay`, `easing` | Animation with defined timing. | `interaction-timed` |
| **Continuous Animation** | Scroll-linked / mouse-linked | Animation that responds continuously to scroll position or mouse. | `interaction-continuous` |
| **Scroll Into View** | Intersection Observer / `whileInView` (Framer) | Trigger when element enters viewport. | `interaction-scroll-into-view` |
| **While Scrolling** | `useScroll` (Framer) / `ScrollTrigger` (GSAP) | Animation progress tied to scroll position. | `interaction-while-scrolling` |
| **Mouse Over / Out** | `whileHover` (Framer) / CSS `hover:` | Hover-triggered animation. | `interaction-hover` |
| **Click** | `whileTap` (Framer) / `onClick` state | Click-triggered animation or toggle. | `interaction-click` |
| **After Scrolling** | Scroll event listener with threshold | Trigger after user scrolls past a point (e.g., show sticky header). | `interaction-after-scroll` |
| **Lottie Trigger** | Lottie `play()` / `pause()` | Control Lottie playback via interaction trigger. | `interaction-lottie` |

---

## 14. PAGES PANEL & PAGE SETTINGS

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Pages Panel** | `app/` directory file tree | Left panel showing all site pages. Each page = a route file. | `panel-pages` |
| **Static Page** | `app/(pages)/about/page.tsx` | Manually created page. Not CMS-generated. | `page-static` |
| **CMS Collection Page** (Template) | `app/(pages)/blog/[slug]/page.tsx` | Dynamic template for CMS items. One template generates N pages. | `page-cms-template` |
| **Utility Page — 404** | `app/not-found.tsx` | Custom 404 page. | `page-404` |
| **Utility Page — 401** | Custom error page | Unauthorized access page. | `page-401` |
| **Utility Page — Password** | Middleware + auth | Password-protected page. | `page-password` |
| **Folder** | Route group `(folder)` | Organizational grouping in Pages panel. In Next.js: route groups with parentheses. | `page-folder` |
| **Draft Page** | Page with `published: false` | Page exists but is not live/indexed. | `page-draft` |

### Per-Page Settings (Page Gear Icon)

| Setting | Code Equivalent | ID |
|---|---|---|
| **Title Tag** | `metadata.title` | `page-seo-title` |
| **Meta Description** | `metadata.description` | `page-seo-description` |
| **Open Graph Title** | `metadata.openGraph.title` | `page-og-title` |
| **Open Graph Description** | `metadata.openGraph.description` | `page-og-description` |
| **Open Graph Image** | `metadata.openGraph.images` | `page-og-image` |
| **Slug** | File path / route | `page-slug` |
| **Canonical URL** | `metadata.alternates.canonical` | `page-canonical` |
| **Exclude from sitemap** | Omit from `sitemap.ts` | `page-exclude-sitemap` |
| **Exclude from search (noindex)** | `metadata.robots.index: false` | `page-noindex` |
| **Custom Code — Head** | `<Script strategy="beforeInteractive">` | `page-custom-head` |
| **Custom Code — Body** | `<Script strategy="afterInteractive">` | `page-custom-body` |

---

## 15. CMS PANEL (Collections)

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **CMS Panel** | `/content/` directory | Left panel for managing CMS Collections and items. | `panel-cms` |
| **Collection** | Content directory (e.g., `/content/blog/`) | A content type definition (Blog Posts, Case Studies, Team Members). | `cms-collection` |
| **Collection Item** | Individual `.mdx` file | A single entry in a Collection (one blog post, one case study). | `cms-item` |
| **Collection Fields** | Frontmatter schema | The data schema for a Collection (title, date, image, tags, etc.). | `cms-fields` |
| **Plain Text Field** | `string` in frontmatter | Single-line text. | `cms-field-plain-text` |
| **Rich Text Field** | MDX body content | Multi-line formatted content with headings, lists, images, etc. | `cms-field-rich-text` |
| **Image Field** | `string` (image path) in frontmatter | Image reference. | `cms-field-image` |
| **Multi-Image Field** | `string[]` in frontmatter | Multiple images (gallery). | `cms-field-multi-image` |
| **Number Field** | `number` in frontmatter | Numeric value. | `cms-field-number` |
| **Date/Time Field** | `string` (ISO date) in frontmatter | Date value. Formatted with `date-fns`. | `cms-field-date` |
| **Switch (Boolean) Field** | `boolean` in frontmatter | True/false toggle (e.g., `featured: true`). | `cms-field-switch` |
| **Option Field** | `string` (enum) in frontmatter | Single select from predefined options. | `cms-field-option` |
| **Link Field** | `string` (URL) in frontmatter | External URL. | `cms-field-link` |
| **Email Field** | `string` in frontmatter | Email address. | `cms-field-email` |
| **Phone Field** | `string` in frontmatter | Phone number. | `cms-field-phone` |
| **Color Field** | `string` (hex) in frontmatter | Color value. | `cms-field-color` |
| **File Field** | `string` (file path) in frontmatter | Downloadable file reference. | `cms-field-file` |
| **Reference Field** | `string` (slug of related item) | Links to another Collection item (e.g., Author → Team Member). | `cms-field-reference` |
| **Multi-Reference Field** | `string[]` (slugs) | Links to multiple items in another Collection (e.g., Tags, Categories). | `cms-field-multi-reference` |

---

## 16. ASSETS PANEL

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Assets Panel** | `public/` directory | Manages uploaded files (images, videos, documents, fonts). | `panel-assets` |
| **Image Asset** | `public/images/` | Uploaded image. Referenced via `/images/filename.webp`. | `asset-image` |
| **Video Asset** | `public/videos/` | Uploaded video file. | `asset-video` |
| **Document Asset** | `public/docs/` | PDF or other downloadable file. | `asset-document` |
| **Font Asset** | `public/fonts/` | Custom font file (.woff2, .woff). Loaded via `next/font/local`. | `asset-font` |
| **Lottie Asset** | `public/animations/` | Lottie JSON file. | `asset-lottie` |
| **SVG Asset** | `public/images/` or inline in component | SVG image or icon. Can be inline for dynamic coloring. | `asset-svg` |
| **Asset Alt Text** | `alt` prop on `<Image>` | Descriptive text for accessibility and SEO. | `asset-alt-text` |

---

## 17. VARIABLES PANEL

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Variables Panel** | `globals.css` `:root` block | Central place to define design tokens (colors, sizes, fonts). | `panel-variables` |
| **Color Variable** | `--color-name: #hex` | Reusable color token. | `variable-color` |
| **Size Variable** | `--spacing-name: Xrem` | Reusable spacing/size token. | `variable-size` |
| **Font Family Variable** | `--font-name: 'Font'` | Reusable font stack token. | `variable-font-family` |
| **Font Size Variable** | `--text-name: Xrem` | Reusable font size token. | `variable-font-size` |
| **Variable Group** | Comment blocks or nested CSS | Organizational grouping of related variables. | `variable-group` |

---

## 18. GLOBAL STYLES (Tags)

Webflow lets you style HTML tags globally. These are the tag-level defaults that cascade to all instances.

| Webflow Global Tag | Code Equivalent | What It Controls | ID |
|---|---|---|---|
| **Body (All pages)** | `body` in `globals.css` or `layout.tsx` | Default font-family, color, line-height, background for the entire site. | `tag-body` |
| **All H1 Headings** | `.prose h1` or H1 base styles in `globals.css` | Default styles for all `<h1>` elements. | `tag-h1` |
| **All H2 Headings** | `.prose h2` or H2 base styles | Default styles for all `<h2>` elements. | `tag-h2` |
| **All H3 Headings** | `.prose h3` or H3 base styles | Default styles for all `<h3>` elements. | `tag-h3` |
| **All H4–H6** | Same pattern | Less commonly styled globally. | `tag-h4` through `tag-h6` |
| **All Paragraphs** | `p` base styles in `globals.css` | Default paragraph styling. | `tag-p` |
| **All Links** | `a` base styles in `globals.css` | Default link color, underline, hover state. | `tag-a` |
| **All Images** | `img` base styles (Next.js `<Image>` handles most) | Default image behavior. | `tag-img` |
| **All Lists** | `ul`, `ol` base styles | Default list styling (bullets, numbers, indent). | `tag-list` |
| **All Blockquotes** | `blockquote` base styles | Default quote styling. | `tag-blockquote` |
| **All Figures** | `figure` / `figcaption` base styles | Default figure/caption styling. | `tag-figure` |
| **All Labels** | `label` base styles | Default form label styling. | `tag-label` |
| **All Inputs** | `input`, `textarea`, `select` base styles | Default form field styling. Tailwind `@tailwindcss/forms` plugin normalizes these. | `tag-input` |
| **All Buttons** | `button` base styles | Default button styling. | `tag-button` |
| **Strong** | `strong` / `b` | Default bold text styling. | `tag-strong` |
| **Emphasis** | `em` / `i` | Default italic text styling. | `tag-em` |

### Global Tag Styling in Code
```css
/* globals.css — Global tag defaults (equivalent to Webflow's Global Styles) */
@layer base {
  body {
    font-family: var(--font-body);
    color: var(--text-primary);
    background-color: var(--surface-primary);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.15;
    color: var(--text-primary);
  }

  h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
  h2 { font-size: clamp(2rem, 4vw, 3rem); }
  h3 { font-size: clamp(1.5rem, 3vw, 2rem); }

  a {
    color: var(--accent);
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover { color: var(--accent-hover); }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
  }
}
```

---

## 19. SITE SETTINGS

| Webflow Setting | Code Equivalent | Where | ID |
|---|---|---|---|
| **Site Name** | `siteConfig.name` in `lib/constants.ts` | Used in metadata, footer, etc. | `site-name` |
| **Favicon** | `app/icon.tsx` or `public/favicon.ico` | Browser tab icon. | `site-favicon` |
| **Webclip (Touch Icon)** | `apple-touch-icon` in `app/layout.tsx` metadata | iOS home screen icon. | `site-webclip` |
| **Global Custom Code — Head** | `app/layout.tsx` `<head>` | Analytics scripts, meta tags, preconnects. | `site-custom-head` |
| **Global Custom Code — Body** | `app/layout.tsx` before `</body>` | Chat widgets, tracking pixels, deferred scripts. | `site-custom-body` |
| **Timezone** | Server config / `date-fns-tz` | Affects date display. | `site-timezone` |
| **Default Domain** | `siteConfig.url` + Vercel domain settings | The primary URL. | `site-domain` |
| **SSL Certificate** | Automatic on Vercel | HTTPS. Handled by hosting provider. | `site-ssl` |
| **301 Redirects** | `next.config.mjs` `redirects()` | Old URL → new URL permanent redirects. | `site-redirects` |
| **Global Sitemap** | `app/sitemap.ts` | Auto-generated XML sitemap. | `site-sitemap` |
| **Global Robots.txt** | `app/robots.ts` | Crawler instructions. | `site-robots` |
| **Global 404 Page** | `app/not-found.tsx` | Custom "page not found" page. | `site-404` |
| **Form Notifications** | Server action → email (Resend) | Where form submissions are sent. | `site-form-notifications` |
| **Integrations** | Third-party scripts + API keys in `.env.local` | Google Analytics, Hotjar, Intercom, etc. | `site-integrations` |

---

## 20. PUBLISHING & HOSTING

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Publish** | `git push` → Vercel auto-deploy | Push to `main` branch triggers production deploy. | `publish-production` |
| **Staging** | Push to `develop` → Vercel preview deploy | Preview URL for testing before production. | `publish-staging` |
| **Custom Domain** | Vercel Dashboard → Domains | Connect custom domain + automatic SSL. | `publish-domain` |
| **webflow.io subdomain** | `project-name.vercel.app` | Free hosting subdomain. | `publish-subdomain` |
| **Publish to Selected Domains** | Branch-based deploys | `main` → production, `develop` → staging. | `publish-selective` |
| **Scheduled Publishing** | CI/CD cron or ISR | Revalidate at intervals for CMS content. | `publish-scheduled` |

---

## 21. EDITOR MODE

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Editor** | Headless CMS dashboard (Sanity Studio, Contentful, or Markdown editing) | Non-developer content editing interface. | `editor-mode` |
| **Editable Field** | CMS field mapped to UI | Content that can be changed without touching code. | `editor-field` |
| **Editor Collaborator** | CMS user with editor role | Person who edits content but doesn't touch code. | `editor-collaborator` |

---

## 22. LOGIC (Webflow Logic)

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Logic** | Server Actions / API Routes | Visual automation (form → email, form → Zapier, etc.). | `logic-flow` |
| **Trigger** | Form submit / webhook / cron | What starts the logic flow. | `logic-trigger` |
| **Action** | Server-side function | What happens (send email, write to DB, call API). | `logic-action` |
| **Condition** | `if/else` in server action | Branch logic based on form data. | `logic-condition` |

```tsx
// Webflow Logic equivalent: Server Action
'use server'
export async function handleContactForm(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string

  // Condition
  if (!email) throw new Error('Email required')

  // Action: send email
  await resend.emails.send({
    from: 'noreply@example.com',
    to: 'team@example.com',
    subject: `New inquiry from ${name}`,
    html: `<p>${name} (${email}) submitted the contact form.</p>`,
  })

  // Action: add to CRM (optional)
  await fetch('https://api.hubspot.com/...', { ... })
}
```

---

## 23. MEMBERSHIPS

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Memberships** | Auth system (NextAuth / Clerk) | Gated content requiring login. | `memberships` |
| **Sign Up** | Registration page / auth flow | User account creation. | `memberships-signup` |
| **Log In** | Login page / auth flow | User authentication. | `memberships-login` |
| **Access Groups** | Roles / permissions | Define who can see what content. | `memberships-access-groups` |
| **Gated Content** | Middleware + auth check | Pages/sections only visible to logged-in users. | `memberships-gated` |
| **User Account Page** | Profile / dashboard page | User's account management page. | `memberships-account` |

---

## 24. LOCALIZATION (i18n)

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Localization** | `next-intl` or Next.js `i18n` routing | Multi-language site support. | `localization` |
| **Locale** | URL prefix (`/en/`, `/fr/`, `/de/`) | Language/region variant. | `localization-locale` |
| **Primary Locale** | Default locale in config | The main language (no URL prefix). | `localization-primary` |
| **Secondary Locale** | Additional locale routes | Translated versions of pages. | `localization-secondary` |
| **Translated Content** | JSON translation files or per-locale MDX | Different content per language. | `localization-content` |
| **Language Switcher** | `<LocaleSwitcher>` component | UI to change language. | `localization-switcher` |
| **hreflang Tags** | `metadata.alternates.languages` | SEO: tells search engines about language variants. | `localization-hreflang` |

---

## 25. ECOMMERCE

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Products** | Product CMS Collection | Product listings with name, price, images, description. | `ecommerce-products` |
| **Categories** | Category Collection with references | Product groupings. | `ecommerce-categories` |
| **Cart** | Cart state (context/store) | Shopping cart. | `ecommerce-cart` |
| **Checkout** | Stripe Checkout | Payment processing page. | `ecommerce-checkout` |
| **Order Confirmation** | Success page + webhook | Post-purchase confirmation. | `ecommerce-order-confirmation` |

---

## 26. AUDIT PANEL

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Audit Panel** | Lighthouse / ESLint / axe-core | Checks for accessibility, performance, and SEO issues. | `panel-audit` |
| **Accessibility Audit** | WAVE / axe DevTools | Check alt text, contrast, ARIA, heading hierarchy. | `audit-accessibility` |
| **Performance Audit** | Lighthouse / PageSpeed Insights | Check LCP, CLS, INP, bundle size. | `audit-performance` |
| **SEO Audit** | Screaming Frog / Rich Results Test | Check metadata, sitemap, schema, broken links. | `audit-seo` |

---

## 27. BREADCRUMB BAR (Bottom Bar)

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Breadcrumb Bar** | JSX nesting / React DevTools component tree | Shows the element hierarchy path: Body > Section > Container > Div > Heading. | `ui-breadcrumb-bar` |
| **Breadcrumb Navigation** | Click to select parent | Click any ancestor in the bar to select it. In code: navigate up the JSX tree. | `ui-breadcrumb-navigate` |

---

## 28. CANVAS & VIEWPORT

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Canvas** | Browser viewport / localhost | The visual area where you see the page. | `ui-canvas` |
| **Desktop View** | `lg:` breakpoint (1024px+) | Default canvas size. | `viewport-desktop` |
| **Tablet View** | `md:` breakpoint (768px) | Tablet responsive preview. | `viewport-tablet` |
| **Mobile Landscape** | `sm:` breakpoint (640px) | Landscape phone preview. | `viewport-mobile-landscape` |
| **Mobile Portrait** | Base styles (<640px) | Portrait phone preview. | `viewport-mobile-portrait` |
| **Responsive Preview** | Chrome DevTools responsive mode | Toggle between breakpoints to test. | `viewport-responsive-preview` |
| **Zoom** | Browser zoom (Cmd+/Cmd-) | Canvas zoom level. | `viewport-zoom` |

---

## 29. QUICK FIND

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Quick Find** (Cmd+E) | VS Code Command Palette (Cmd+Shift+P) or file search (Cmd+P) | Search for elements, pages, classes, settings. | `ui-quick-find` |

---

## 30. CODE EXPORT

| Webflow Concept | Code Equivalent | Notes | ID |
|---|---|---|---|
| **Code Export** | The entire Next.js project IS the code | Webflow can export static HTML/CSS/JS. In code-first workflow, you already have the source. | `export-code` |
| **Export HTML/CSS/JS** | `next build` → `out/` directory (static export) | `output: 'export'` in `next.config.mjs` for static HTML. | `export-static` |
| **Clean Code Export** | Production build | `next build` produces optimized, minified output. | `export-production` |

---

## APPENDIX: COMPLETE ELEMENT ID QUICK REFERENCE

Every Webflow item with its ID for use in code comments, component naming, or documentation:

```
LAYOUT
  layout-section, layout-container, layout-quick-stack, layout-div-block,
  layout-v-flex, layout-h-flex, layout-grid, layout-columns, layout-column

BASIC
  basic-link-block, basic-button, basic-list, basic-list-item

TYPOGRAPHY
  type-heading, type-paragraph, type-text-link, type-text-block,
  type-block-quote, type-rich-text, type-superscript, type-subscript,
  type-strong, type-emphasis, type-line-break

CMS
  cms-collection-list-wrapper, cms-collection-list, cms-collection-item,
  cms-empty-state, cms-pagination, cms-dynamic-wrapper, cms-collection,
  cms-item, cms-fields, cms-field-plain-text, cms-field-rich-text,
  cms-field-image, cms-field-multi-image, cms-field-number, cms-field-date,
  cms-field-switch, cms-field-option, cms-field-link, cms-field-email,
  cms-field-phone, cms-field-color, cms-field-file, cms-field-reference,
  cms-field-multi-reference

MEDIA
  media-image, media-video, media-youtube, media-vimeo, media-lottie,
  media-spline, media-background-video, media-lightbox, media-lightbox-link

FORMS
  form-block, form-form, form-label, form-input, form-textarea,
  form-file-upload, form-checkbox, form-checkbox-field, form-radio,
  form-radio-field, form-select, form-submit, form-success, form-error,
  form-recaptcha, form-hidden

ADVANCED
  advanced-embed, advanced-dropdown, advanced-dropdown-toggle,
  advanced-dropdown-list, advanced-tabs, advanced-tabs-menu,
  advanced-tab-link, advanced-tabs-content, advanced-tab-pane,
  advanced-slider, advanced-slide, advanced-slider-arrow, advanced-slide-nav,
  advanced-navbar, advanced-brand, advanced-nav-menu, advanced-nav-link,
  advanced-nav-dropdown, advanced-menu-button, advanced-search, advanced-map,
  advanced-social-embed

COMPONENTS
  component-main, component-instance, component-source, component-prop,
  component-prop-text, component-prop-image, component-prop-link,
  component-prop-visibility, component-prop-variant, component-slot,
  component-prop-group, component-group, component-unlink, component-symbol-legacy

PANELS
  panel-navigator, panel-pages, panel-cms, panel-assets, panel-variables,
  panel-interactions, panel-audit

STYLE PANEL
  style-selector, style-inheritance, style-states, style-affected-count,
  style-layout, style-spacing, style-size, style-typography,
  style-backgrounds, style-borders, style-effects

SETTINGS
  settings-panel, settings-id, settings-tag, settings-custom-attributes,
  settings-visibility, settings-conditional-visibility, settings-link,
  settings-image, settings-video, settings-form, settings-collection-list,
  settings-seo

GLOBAL TAGS
  tag-body, tag-h1, tag-h2, tag-h3, tag-h4, tag-h5, tag-h6,
  tag-p, tag-a, tag-img, tag-list, tag-blockquote, tag-figure,
  tag-label, tag-input, tag-button, tag-strong, tag-em

PAGE SETTINGS
  page-static, page-cms-template, page-404, page-401, page-password,
  page-folder, page-draft, page-seo-title, page-seo-description,
  page-og-title, page-og-description, page-og-image, page-slug,
  page-canonical, page-exclude-sitemap, page-noindex,
  page-custom-head, page-custom-body

SITE SETTINGS
  site-name, site-favicon, site-webclip, site-custom-head, site-custom-body,
  site-timezone, site-domain, site-ssl, site-redirects, site-sitemap,
  site-robots, site-404, site-form-notifications, site-integrations

PUBLISHING
  publish-production, publish-staging, publish-domain, publish-subdomain,
  publish-selective, publish-scheduled

FEATURES
  memberships, memberships-signup, memberships-login, memberships-access-groups,
  memberships-gated, memberships-account, localization, localization-locale,
  localization-primary, localization-secondary, localization-content,
  localization-switcher, localization-hreflang, ecommerce-products,
  ecommerce-categories, ecommerce-cart, ecommerce-checkout,
  ecommerce-order-confirmation, logic-flow, logic-trigger, logic-action,
  logic-condition, editor-mode, editor-field, editor-collaborator

INTERACTIONS
  interaction-trigger, interaction-page-trigger, interaction-animation,
  interaction-action, interaction-timed, interaction-continuous,
  interaction-scroll-into-view, interaction-while-scrolling,
  interaction-hover, interaction-click, interaction-after-scroll,
  interaction-lottie

UI / VIEWPORT
  ui-canvas, ui-breadcrumb-bar, ui-breadcrumb-navigate, ui-quick-find,
  viewport-desktop, viewport-tablet, viewport-mobile-landscape,
  viewport-mobile-portrait, viewport-responsive-preview, viewport-zoom

EXPORT
  export-code, export-static, export-production

NAVIGATOR
  navigator-label, navigator-nesting, navigator-reorder, navigator-hidden,
  navigator-locked, navigator-dynamic, navigator-component

AUDIT
  audit-accessibility, audit-performance, audit-seo
```
