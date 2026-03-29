# EXTENDED-TOOLKIT.md
# Every Library, Resource, Asset Source, Data Set & Pattern Available

> This is the "reach for" reference. When you need a toast notification, a country selector,
> a Lottie animation, a stock photo, a VSL embed, or an accordion — look here first.

---

## TABLE OF CONTENTS

1. Animation & Motion Libraries
2. Animated UI Component Libraries (Copy-Paste)
3. Lottie Animations — Libraries & Free Sources
4. Video Players & VSL Embeds
5. Form Libraries & Input Components
6. Country / Phone / Currency Data
7. Toast / Notification / Alert Systems
8. Modal / Dialog / Lightbox
9. Carousel / Slider
10. Accordion / Tabs / Collapsible
11. Date & Time Pickers
12. Rich Text / WYSIWYG Editors
13. Table / Data Grid
14. Charts & Data Visualization
15. Maps
16. Authentication
17. Email & Transactional
18. Payment / Checkout
19. Stock Photography & Images
20. Stock Illustrations & SVGs
21. 3D Assets & Graphics
22. Icon Libraries
23. Font Resources
24. Background Patterns & Textures
25. Color Tools
26. Favicon & OG Image Generators
27. Accessibility Tools
28. Testing & QA
29. CTA Patterns & Conversion Elements
30. VSL / Video Sales Letter Patterns
31. Lead Magnet / Gated Content Patterns
32. Social Proof Patterns
33. Cookie Consent / GDPR
34. Chatbot / Live Chat
35. Scheduling / Booking Embeds
36. Country & Industry Data Sets
37. Miscellaneous Utilities

---

## 1. ANIMATION & MOTION LIBRARIES

### Primary (Choose ONE as default)

| Library | Install | Best For | Size |
|---|---|---|---|
| **Framer Motion / Motion** | `npm install framer-motion` | General-purpose React animations, gestures, layout animations | ~30KB |
| **GSAP** | `npm install gsap @gsap/react` | Timeline-based, cinematic, scroll-driven, high-fidelity | ~25KB |

### Secondary (Add if needed)

| Library | Install | Best For |
|---|---|---|
| **Lottie React** | `npm install lottie-react` | After Effects JSON animations (decorative, loaders, illustrations) |
| **React Spring** | `npm install @react-spring/web` | Physics-based, spring animations (natural feel) |
| **AutoAnimate** | `npm install @formkit/auto-animate` | Zero-config list add/remove/reorder transitions |
| **AOS (Animate On Scroll)** | `npm install aos` | Simple scroll-triggered reveal animations (lightweight) |
| **Rive** | `npm install @rive-app/react-canvas` | Interactive state-machine animations (buttons, characters) |

### CSS-Only (No Package Needed)
- **Scroll-triggered reveals** → Intersection Observer + CSS `@keyframes` + `animation-fill-mode: both`
- **Hover/focus transitions** → Tailwind `transition-all duration-200`
- **Reduced motion** → `@media (prefers-reduced-motion: reduce)`
- **Staggered children** → CSS `animation-delay` with `:nth-child()` or Tailwind `[&>*:nth-child(n)]:delay-[calc(n*100ms)]`

### GSAP Plugins (Free with GSAP)
- `ScrollTrigger` — scroll-driven animations (parallax, pin, scrub)
- `TextPlugin` — typewriter / text replacement effects
- `Flip` — FLIP animation technique (layout changes)
- `Observer` — scroll/touch/pointer event normalization

### Rules
- NEVER use more than 2 animation libraries in one project
- Framer Motion is default for most projects
- GSAP only for marketing-heavy sites needing cinematic scroll sequences
- Always respect `prefers-reduced-motion`

---

## 2. ANIMATED UI COMPONENT LIBRARIES (Copy-Paste)

Pre-built, animated, Tailwind-compatible components you can copy-paste:

| Library | URL | Stack | Best For |
|---|---|---|---|
| **Magic UI** | https://magicui.design | React + Tailwind + Framer Motion | SaaS landing page components (number tickers, shimmer borders, animated beams) |
| **Aceternity UI** | https://ui.aceternity.com | Next.js + Tailwind + Framer Motion | High-impact hero sections (spotlight, parallax, 3D cards, meteors) |
| **shadcn/ui** | https://ui.shadcn.com | React + Tailwind + Radix | Base component primitives (dialog, dropdown, sheet, tabs, etc.) |
| **Cult UI** | https://www.cult-ui.com | React + Tailwind + shadcn-compatible | Spicy animated extras for shadcn projects |
| **Eldora UI** | https://eldoraui.site | React + Tailwind + Framer Motion | Clean animated component pack |
| **UI Layout** | https://ui-layout.com | React + Tailwind + Framer Motion + GSAP | Motion-focused layout animations |
| **Animata** | https://animata.design | React + Tailwind | Simple animated components (hover cards, buttons, text) |

### Usage Pattern
```tsx
// Don't install these as npm packages — copy the source code into your project
// 1. Visit the component page
// 2. Copy the code
// 3. Paste into src/components/ui/ or src/components/sections/
// 4. Adapt styling to your design tokens
```

---

## 3. LOTTIE ANIMATIONS — Libraries & Free Sources

### React Integration
```bash
npm install lottie-react
```

```tsx
import Lottie from 'lottie-react'
import animationData from '@/public/animations/loading.json'

export function LoadingAnimation() {
  return <Lottie animationData={animationData} loop className="h-48 w-48" />
}
```

### Free Lottie Animation Sources

| Source | URL | License | Notes |
|---|---|---|---|
| **LottieFiles** | https://lottiefiles.com | Lottie Simple License (commercial OK, no attribution) | Largest library. 100K+ free animations. Has browser editor. |
| **Creattie** | https://creattie.com | Free tier (no account needed for free animations) | Curated, high quality. Editor for color/speed customization. |
| **IconScout** | https://iconscout.com/lottie-animations | Free with attribution / Premium | 3D illustrations, icons, Lottie all in one. |
| **Lordicon** | https://lordicon.com | Free tier (animated icons only) | Best for animated icon sets (checkmarks, arrows, UI elements). |
| **LottieFlow (Finsweet)** | https://lottieflow.com | Free (Webflow-focused but JSON is universal) | UI/UX elements: arrows, buttons, checkboxes, scroll icons. |
| **Icons8 Animated** | https://icons8.com/animated-icons | Free with link attribution / Premium | Large animated icon collection. |
| **Flaticon Animated** | https://www.flaticon.com/animated-icons | Free with attribution / Premium | 55,000+ animated icons. JSON, GIF, MP4, SVG formats. |
| **Storyset** | https://storyset.com | Free with attribution | Animated illustrations (people, scenes). Customizable colors. |
| **Rive Community** | https://rive.app/community | Varies per asset | Interactive state-machine animations (next-gen Lottie alternative). |

### Common Use Cases for Lottie
- Page loading spinners
- Success/error state animations (checkmark, X mark)
- Empty state illustrations ("No results found")
- 404 page animations
- Hero section decorative motion
- Feature section animated icons
- Onboarding step illustrations
- Scroll-triggered decorative elements

---

## 4. VIDEO PLAYERS & VSL EMBEDS

### Universal Video Player
```bash
npm install react-player
```

```tsx
import ReactPlayer from 'react-player'

// Supports: YouTube, Vimeo, Wistia, Mux, Dailymotion, mp4, HLS, DASH
<ReactPlayer
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  width="100%"
  height="auto"
  style={{ aspectRatio: '16/9' }}
  controls
  light  // Shows thumbnail, lazy-loads player on click
/>
```

### Platform-Specific
| Platform | Package | Notes |
|---|---|---|
| **YouTube** | `react-player` or native `<iframe>` | Use `lite-youtube-embed` for fastest load |
| **Vimeo** | `react-player` or `@vimeo/player` | Good for premium/branded video |
| **Wistia** | `@wistia/wistia-player-react` | Best for VSLs — has analytics, CTAs, turnstile (email gate), chaptering |
| **Mux** | `@mux/mux-player-react` | Developer-friendly video API. Adaptive streaming. Analytics. |
| **Loom** | Native embed `<iframe>` | Good for testimonials, product demos |
| **Bunny Stream** | Native embed `<iframe>` | Budget video hosting alternative |

### VSL (Video Sales Letter) Pattern
```tsx
// VSL Section — video above the fold with CTA below
<section className="bg-neutral-950 py-16 lg:py-24">
  <Container>
    <div className="mx-auto max-w-4xl text-center">
      <Badge>Watch How It Works</Badge>
      <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
        See How We Book 20+ Qualified Meetings Per Month
      </h2>
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-800">
        <ReactPlayer
          url="https://fast.wistia.com/medias/abc123"
          width="100%"
          height="auto"
          style={{ aspectRatio: '16/9' }}
          controls
          light="/images/vsl-thumbnail.webp"
        />
      </div>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button size="lg">Book a Discovery Call</Button>
        <Button variant="ghost" size="lg">Download the Playbook</Button>
      </div>
    </div>
  </Container>
</section>
```

### Video Embed Performance Tips
- Always use `light` prop (thumbnail) to lazy-load the player
- For YouTube: consider `lite-youtube-embed` (npm package) — renders 100x faster than native embed
- Set explicit `aspect-ratio: 16/9` to prevent layout shift
- Use Wistia or Mux for VSLs (they have email gates, chapters, CTAs built in)

---

## 5. FORM LIBRARIES & INPUT COMPONENTS

### Core Form Stack
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Specialized Form Inputs

| Component | Package | Install |
|---|---|---|
| **Phone input (international)** | `react-phone-number-input` | `npm install react-phone-number-input` |
| **Phone input (alt)** | `react-international-phone` | `npm install react-international-phone` |
| **Country selector** | `react-select-country-list` | `npm install react-select-country-list` |
| **Combobox / Multi-select** | `cmdk` | `npm install cmdk` |
| **File upload / drag-drop** | `react-dropzone` | `npm install react-dropzone` |
| **Signature pad** | `react-signature-canvas` | `npm install react-signature-canvas` |
| **Star rating** | `@smastrom/react-rating` | `npm install @smastrom/react-rating` |
| **Range slider** | `@radix-ui/react-slider` | via shadcn: `npx shadcn@latest add slider` |
| **Toggle / Switch** | `@radix-ui/react-switch` | via shadcn: `npx shadcn@latest add switch` |
| **OTP / Verification code** | `input-otp` | `npm install input-otp` |
| **Credit card input** | `react-credit-cards-2` | `npm install react-credit-cards-2` |
| **Autocomplete / Address** | Google Places API | `@react-google-maps/api` or `use-places-autocomplete` |
| **Rich text editor** | `tiptap` | `npm install @tiptap/react @tiptap/starter-kit` |
| **Markdown editor** | `@uiw/react-md-editor` | `npm install @uiw/react-md-editor` |

### Multi-Step Form Pattern
```tsx
// Use react-hook-form with a step state
const [step, setStep] = useState(1)
const totalSteps = 3

// Progress indicator
<div className="flex gap-2">
  {Array.from({ length: totalSteps }).map((_, i) => (
    <div key={i} className={cn(
      "h-2 flex-1 rounded-full",
      i < step ? "bg-amber-500" : "bg-neutral-800"
    )} />
  ))}
</div>
```

---

## 6. COUNTRY / PHONE / CURRENCY DATA

### Country Lists
| Package | Data Provided |
|---|---|
| `country-list` | ISO 3166-1 country names + codes (`npm install country-list`) |
| `i18n-iso-countries` | Country names in 40+ languages (`npm install i18n-iso-countries`) |
| `country-flag-icons` | SVG flag icons for every country (`npm install country-flag-icons`) |
| `world-countries` | JSON: names, codes, currencies, languages, lat/lng, area (`npm install world-countries`) |

### Phone / Calling Codes
| Package | Data Provided |
|---|---|
| `libphonenumber-js` | Parse, format, validate phone numbers globally (`npm install libphonenumber-js`) |
| `react-phone-number-input` | Full phone input with country selector + validation |

### Currency
| Package | Data Provided |
|---|---|
| `currency-codes` | ISO 4217 currency list (`npm install currency-codes`) |
| `dinero.js` | Money math (avoid floating point errors) (`npm install dinero.js`) |

### Timezone
| Package | Data Provided |
|---|---|
| `date-fns-tz` | Timezone-aware date formatting (`npm install date-fns-tz`) |

### Static Country Data (No Package Needed)
```typescript
// lib/countries.ts — hardcode for simple dropdowns
export const countries = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  // ... 195 countries
] as const
```

---

## 7. TOAST / NOTIFICATION / ALERT

| Library | Install | Style |
|---|---|---|
| **Sonner** (recommended) | `npm install sonner` | Beautiful, minimal. Works with shadcn. |
| **React Hot Toast** | `npm install react-hot-toast` | Lightweight, customizable |
| **shadcn Toast** | `npx shadcn@latest add toast` | Uses Radix, built into shadcn ecosystem |

```tsx
// Sonner — simplest setup
import { Toaster, toast } from 'sonner'

// In layout:
<Toaster position="top-right" richColors />

// Usage:
toast.success('Meeting booked!')
toast.error('Something went wrong')
toast.loading('Sending...')
```

---

## 8. MODAL / DIALOG / LIGHTBOX

| Library | Install | Best For |
|---|---|---|
| **shadcn Dialog** | `npx shadcn@latest add dialog` | Standard modals |
| **shadcn Sheet** | `npx shadcn@latest add sheet` | Slide-out panels (mobile nav, filters) |
| **shadcn Alert Dialog** | `npx shadcn@latest add alert-dialog` | Confirmation dialogs |
| **React Modal Video** | `npm install react-modal-video` | Video lightbox (click thumbnail → modal video) |
| **Yet Another React Lightbox** | `npm install yet-another-react-lightbox` | Image gallery lightbox |

---

## 9. CAROUSEL / SLIDER

| Library | Install | Notes |
|---|---|---|
| **Embla Carousel** (recommended) | `npm install embla-carousel-react` | Lightweight, accessible, extensible. shadcn uses this. |
| **Swiper** | `npm install swiper` | Full-featured, touch-friendly, many modes |
| **shadcn Carousel** | `npx shadcn@latest add carousel` | Embla-based, pre-styled |

---

## 10. ACCORDION / TABS / COLLAPSIBLE

All available via shadcn (recommended):
```bash
npx shadcn@latest add accordion tabs collapsible
```

---

## 11. DATE & TIME PICKERS

| Library | Install | Notes |
|---|---|---|
| **shadcn Calendar** | `npx shadcn@latest add calendar` | Uses `react-day-picker` under the hood |
| **shadcn Date Picker** | `npx shadcn@latest add date-picker` | Calendar + popover |
| **react-day-picker** | `npm install react-day-picker` | Standalone date picker |
| **date-fns** | `npm install date-fns` | Date formatting/manipulation (always install this) |

---

## 12. RICH TEXT / WYSIWYG EDITORS

| Library | Install | Best For |
|---|---|---|
| **Tiptap** | `npm install @tiptap/react @tiptap/starter-kit` | Modern, headless, extensible |
| **Plate** | `npm install @udecode/plate` | shadcn-compatible rich text editor |
| **Novel** | `npm install novel` | Notion-like editor (AI-powered) |

---

## 13. TABLE / DATA GRID

| Library | Install | Best For |
|---|---|---|
| **TanStack Table** | `npm install @tanstack/react-table` | Headless table logic (sorting, filtering, pagination) |
| **shadcn Table** | `npx shadcn@latest add table` | Pre-styled table with TanStack integration |

---

## 14. CHARTS & DATA VISUALIZATION

| Library | Install | Notes |
|---|---|---|
| **Recharts** (recommended) | `npm install recharts` | Simple, declarative, React-native. Available in artifacts. |
| **Chart.js + react-chartjs-2** | `npm install chart.js react-chartjs-2` | Canvas-based, performant |
| **Tremor** | `npm install @tremor/react` | Pre-built dashboard chart components (Tailwind) |
| **Nivo** | `npm install @nivo/core @nivo/bar` | D3-based, rich chart types |

---

## 15. MAPS

| Library | Install | Notes |
|---|---|---|
| **@react-google-maps/api** | `npm install @react-google-maps/api` | Google Maps (requires API key) |
| **react-map-gl** | `npm install react-map-gl` | Mapbox GL (beautiful, free tier) |
| **Leaflet + react-leaflet** | `npm install leaflet react-leaflet` | Open-source, no API key needed |

---

## 16. AUTHENTICATION

| Library | Install | Notes |
|---|---|---|
| **NextAuth.js / Auth.js** | `npm install next-auth` | Open-source, provider-agnostic (Google, GitHub, email) |
| **Clerk** | `npm install @clerk/nextjs` | Managed auth with pre-built UI (fastest to implement) |
| **Supabase Auth** | `npm install @supabase/supabase-js` | Auth + database combo |

---

## 17. EMAIL & TRANSACTIONAL

| Service | Package | Notes |
|---|---|---|
| **Resend** (recommended) | `npm install resend` | Developer-first email API. Free 100 emails/day. |
| **React Email** | `npm install @react-email/components` | Build email templates in React/TSX |
| **Nodemailer** | `npm install nodemailer` | Self-hosted SMTP (more setup, no SaaS dependency) |
| **Plunk** | API only | Open-source transactional + marketing email |

---

## 18. PAYMENT / CHECKOUT

| Service | Package | Notes |
|---|---|---|
| **Stripe** | `npm install @stripe/stripe-js @stripe/react-stripe-js` | Standard for SaaS. Checkout, subscriptions, invoicing. |
| **LemonSqueezy** | `npm install @lemonsqueezy/lemonsqueezy.js` | Merchant of record (handles tax/VAT) |
| **Paddle** | Script embed | Merchant of record alternative |

---

## 19. STOCK PHOTOGRAPHY & IMAGES

### Free (Commercial Use)
| Source | URL | License |
|---|---|---|
| **Unsplash** | https://unsplash.com | Unsplash License (free commercial, no attribution required) |
| **Pexels** | https://pexels.com | Pexels License (same as Unsplash) |
| **Pixabay** | https://pixabay.com | Pixabay License (free commercial) |
| **Burst (Shopify)** | https://burst.shopify.com | Free commercial |
| **Kaboompics** | https://kaboompics.com | Free commercial, curated aesthetic |
| **Reshot** | https://reshot.com | Free commercial, icons + illustrations too |
| **Life of Pix** | https://lifeofpix.com | Free high-res photos |

### AI-Generated Images
| Source | URL | Notes |
|---|---|---|
| **Midjourney** | https://midjourney.com | Best quality, requires Discord or web app |
| **DALL·E (OpenAI)** | https://labs.openai.com | API-accessible |
| **Ideogram** | https://ideogram.ai | Good with text in images |
| **Flux (Replicate)** | https://replicate.com | Open-source, API-accessible |

### Image Optimization Tools
| Tool | URL | Purpose |
|---|---|---|
| **Squoosh** | https://squoosh.app | Browser-based image compression (WebP, AVIF) |
| **TinyPNG** | https://tinypng.com | Bulk compress PNG/WebP |
| **Remove.bg** | https://remove.bg | Background removal |
| **Clipping Magic** | https://clippingmagic.com | Advanced background removal |
| **Upscayl** | https://upscayl.org | Free AI image upscaler (desktop app) |

---

## 20. STOCK ILLUSTRATIONS & SVGs

| Source | URL | Style |
|---|---|---|
| **unDraw** | https://undraw.co | Flat, customizable color. SVG. |
| **Storyset** | https://storyset.com | Animated + static illustrations. Customizable. |
| **Humaaans** | https://humaaans.com | Mix-and-match people illustrations |
| **Open Peeps** | https://openpeeps.com | Hand-drawn people illustrations |
| **Blush** | https://blush.design | Multiple illustration styles. Figma plugin. |
| **DrawKit** | https://drawkit.com | Illustrations + icons. Free tier. |
| **Illustrations.co** | https://illlustrations.co | 100 free open-source illustrations |
| **Stubborn** | https://stubborn.fun | Mix-and-match character generator |
| **Scale by Flexiple** | https://2.flexiple.com/scale | Free customizable illustrations |

---

## 21. 3D ASSETS & GRAPHICS

| Source | URL | Notes |
|---|---|---|
| **Spline** | https://spline.design | 3D design tool. Export for web (embed or React). Free tier. |
| **Three.js** | `npm install three @react-three/fiber @react-three/drei` | Programmatic 3D in React |
| **Poly.pizza** | https://poly.pizza | Free 3D models (CC0/CC-BY) |
| **Sketchfab** | https://sketchfab.com | 3D model marketplace (many free) |
| **IconScout 3D** | https://iconscout.com/3d-illustrations | 3D illustrations + animated |

---

## 22. ICON LIBRARIES

| Library | Install | Icons | Style |
|---|---|---|---|
| **Lucide** (recommended) | `npm install lucide-react` | 1,400+ | Clean line icons |
| **Heroicons** | `npm install @heroicons/react` | 300+ | By Tailwind team. Outline + solid. |
| **Phosphor** | `npm install @phosphor-icons/react` | 7,000+ | 6 weights (thin → fill) |
| **Tabler Icons** | `npm install @tabler/icons-react` | 5,000+ | Clean, consistent |
| **Simple Icons** | `npm install simple-icons` | 2,800+ | Brand/company logos as SVGs |
| **React Icons** | `npm install react-icons` | 40,000+ | Aggregator (includes all of the above — but LARGE bundle) |
| **Lordicon** | https://lordicon.com | 1,000+ free | Animated icons (Lottie-based) |
| **Flagpack** | `npm install flagpack-core` | All country flags | SVG flag icons |

### Rules
- Pick ONE icon library and stick with it. Do NOT mix Lucide with Heroicons.
- `react-icons` is convenient but imports ALL libraries — use tree-shaking or avoid.
- For brand logos (Twitter, LinkedIn, etc.), use `simple-icons` or inline SVGs.

---

## 23. FONT RESOURCES

| Source | URL | Notes |
|---|---|---|
| **Google Fonts** | https://fonts.google.com | Largest free library. Use via `next/font/google`. |
| **Fontshare** | https://fontshare.com | Free high-quality fonts from Indian Type Foundry |
| **Font Squirrel** | https://fontsquirrel.com | Free, self-hosted fonts |
| **Atipo Foundry** | https://atipofoundry.com | Premium quality free fonts |
| **Fontpair** | https://fontpair.co | Font pairing suggestions |
| **Typescale** | https://typescale.com | Generate type scale ratios |

### Recommended Pairings for B2B / Agency Sites
- **Inter** (body) + **Cal Sans** (headings) — Modern startup
- **DM Sans** (both) — Clean SaaS
- **Plus Jakarta Sans** (both) — Friendly professional
- **Geist** (both) — Technical/developer
- **Satoshi** (body) + **Clash Display** (headings) — Bold agency
- **General Sans** (body) + **Cabinet Grotesk** (headings) — Premium

---

## 24. BACKGROUND PATTERNS & TEXTURES

| Source | URL | Type |
|---|---|---|
| **Heropatterns** | https://heropatterns.com | SVG background patterns (Tailwind-ready) |
| **SVG Backgrounds** | https://svgbackgrounds.com | Customizable SVG backgrounds |
| **Pattern Monster** | https://pattern.monster | CSS/SVG pattern generator |
| **Haikei** | https://haikei.app | Blob, wave, gradient SVG generators |
| **Mesh Gradient** | https://meshgradient.in | Mesh gradient generator |
| **Grainy Gradients** | CSS: `filter: url(#noise)` | Film grain texture overlay |

### Common Background Patterns (CSS)
```css
/* Dot grid */
.bg-dots {
  background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Grid lines */
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* Gradient fade to transparent at bottom */
.bg-fade-bottom {
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
```

---

## 25. COLOR TOOLS

| Tool | URL | Purpose |
|---|---|---|
| **Realtime Colors** | https://realtimecolors.com | Preview color palette on a real layout |
| **Coolors** | https://coolors.co | Palette generator |
| **Huemint** | https://huemint.com | AI color palette for brands |
| **Color Hunt** | https://colorhunt.co | Curated palettes |
| **Contrast Checker** | https://webaim.org/resources/contrastchecker | WCAG contrast validation |
| **Radix Colors** | https://www.radix-ui.com/colors | Accessible color scales (12 steps) |
| **Tailwind Color Shades** | https://uicolors.app | Generate Tailwind shade scale from a single hex |

---

## 26. FAVICON & OG IMAGE

| Tool | URL | Purpose |
|---|---|---|
| **RealFaviconGenerator** | https://realfavicongenerator.net | Generate all favicon formats |
| **Favicon.io** | https://favicon.io | Text/image/emoji → favicon |
| **OG Image Generator** | Next.js `ImageResponse` API | Dynamic OG images from code |
| **Vercel OG** | `npm install @vercel/og` | Generate OG images at the edge |
| **OpenGraph.xyz** | https://opengraph.xyz | Preview how your URL looks on social |

---

## 27. ACCESSIBILITY TOOLS

| Tool | URL | Purpose |
|---|---|---|
| **WAVE** | https://wave.webaim.org | Full page accessibility audit |
| **axe DevTools** | Chrome extension | In-browser a11y testing |
| **Contrast Checker** | https://webaim.org/resources/contrastchecker | Color contrast validation |
| **Screen Reader** | VoiceOver (Mac) / NVDA (Windows) | Manual testing |
| **Headings Map** | Chrome extension | Verify heading hierarchy |

---

## 28. TESTING & QA

| Tool | Purpose |
|---|---|
| **Lighthouse** (Chrome DevTools) | Performance, accessibility, SEO, best practices |
| **PageSpeed Insights** (https://pagespeed.web.dev) | Real-world Core Web Vitals data |
| **GTmetrix** (https://gtmetrix.com) | Detailed waterfall performance analysis |
| **Screaming Frog** (https://screamingfrog.co.uk) | SEO spider / broken link checker |
| **Dead Link Checker** (https://deadlinkchecker.com) | Check for 404s across entire site |
| **BrowserStack** (https://browserstack.com) | Cross-browser testing |
| **Rich Results Test** (https://search.google.com/test/rich-results) | Validate JSON-LD schema |
| **OpenGraph.xyz** (https://opengraph.xyz) | Social sharing preview |
| **WhereGoes** (https://wheregoes.com) | Trace redirect chains |

---

## 29. CTA PATTERNS & CONVERSION ELEMENTS

### Button CTAs (Hierarchy)
```
Primary:   "Book a Discovery Call"  /  "Get Started Today"  /  "See Pricing"
Secondary: "View Case Studies"  /  "Download the Playbook"  /  "Watch Demo"
Tertiary:  "Learn More →"  /  "Read the Full Story →"
```

### CTA Section Patterns
- **Simple CTA bar** — Dark background, headline, one button
- **Split CTA** — Left: headline + description, Right: form or button
- **CTA with social proof** — "Join 500+ companies" + logos + button
- **Sticky bottom bar** — Fixed bottom bar on mobile with CTA button
- **Exit-intent popup** — Modal that triggers when cursor leaves viewport (desktop)
- **Scroll-triggered CTA** — Slide-in CTA after user scrolls 50%+

### Inline CTAs (Within Content)
- **Banner CTA** — Colored box within blog post with CTA
- **Content upgrade** — "Download the full checklist" within a guide
- **Floating sidebar CTA** — Sticky sidebar with booking link
- **Related resources** — "Liked this? Read: [related post]"

### Pricing Page CTAs
- **Recommended plan highlight** — "Most Popular" badge on middle tier
- **Annual vs Monthly toggle** — Show savings
- **Money-back guarantee badge** — "30-day refund" near CTA button
- **FAQ below pricing** — Address objections right there

---

## 30. VSL / VIDEO SALES LETTER PATTERNS

### VSL Page Structure
1. Curiosity headline (NOT the product name)
2. Video embed (auto-thumbnail, click to play)
3. Below-video CTA (appears after video plays or after delay)
4. 3-5 bullet points restating value
5. Testimonial / social proof
6. FAQ (handle objections)
7. Final CTA

### VSL Best Practices
- Thumbnail should show a human face (increases play rate 30%+)
- Video length: 3-8 minutes for cold traffic, 15-45 for warm
- Use Wistia for turnstile (email gate at X% of video)
- Add chaptering for longer videos
- Show "Book a Call" CTA in the video itself (Wistia annotation)
- Never autoplay with sound

---

## 31. LEAD MAGNET / GATED CONTENT PATTERNS

### Types
- PDF guide / playbook / checklist
- ROI calculator (interactive)
- Free audit / assessment tool
- Template / swipe file
- Industry benchmark report
- Video training series
- Tool / software trial

### Gating Pattern
```tsx
<section>
  <div className="grid lg:grid-cols-2 gap-12">
    {/* Left: Value description */}
    <div>
      <Badge>Free Resource</Badge>
      <h2>The B2B Lead Gen Playbook</h2>
      <p>47-page guide covering...</p>
      <ul>
        <li>✓ LinkedIn outreach templates</li>
        <li>✓ Cold email sequences</li>
        <li>✓ ICP definition framework</li>
      </ul>
    </div>
    {/* Right: Capture form */}
    <div className="rounded-2xl border bg-neutral-900 p-8">
      <form>
        <Input label="Work Email" type="email" required />
        <Input label="Company" />
        <Button type="submit" className="w-full">Download Free Playbook</Button>
        <p className="text-xs text-neutral-500 mt-2">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  </div>
</section>
```

---

## 32. SOCIAL PROOF PATTERNS

### Logo Cloud
```
"Trusted by 500+ B2B companies" + 6-10 greyscale client logos in a row
```

### Stats Bar
```
"10,000+ leads generated"  |  "26,000 event registrations"  |  "7+ years operating"
```

### Testimonials
- **Quote card** — Photo + quote + name + role + company
- **Video testimonial** — Thumbnail → modal video
- **Case study snippet** — Metric + one-line result + "Read full story" link
- **G2/Clutch badge** — Third-party review platform badges
- **"As featured in"** — Media logos (Forbes, TechCrunch, etc.)

### Trust Signals (Near CTAs)
- "100% money-back guarantee"
- "No credit card required"
- "Free 15-minute consultation"
- "Minimum 2 leads or full refund"
- "Setup in 1 week"
- Security badges (SSL, SOC2, GDPR)
- Client count ("Joined by 500+ companies")

---

## 33. COOKIE CONSENT / GDPR

| Library | Install | Notes |
|---|---|---|
| **Cookie Consent (Orest Wu)** | `npm install vanilla-cookieconsent` | Lightweight, GDPR/CCPA compliant, customizable |
| **Cookiebot** | Script embed | Managed consent service (SaaS) |
| **Osano** | Script embed | Enterprise consent management |

### Minimal Pattern
```tsx
// Only load analytics/tracking AFTER consent
const [consent, setConsent] = useState(false)

useEffect(() => {
  if (consent) {
    // Load GA4, Hotjar, etc.
  }
}, [consent])
```

---

## 34. CHATBOT / LIVE CHAT

| Service | Integration | Notes |
|---|---|---|
| **Intercom** | Script embed | Full support suite (expensive) |
| **Crisp** | Script embed | Free tier, lightweight |
| **Tawk.to** | Script embed | Completely free |
| **Drift** | Script embed | Sales-focused chat |
| **Chatwoot** | Self-hosted or cloud | Open-source alternative |

---

## 35. SCHEDULING / BOOKING EMBEDS

| Service | Integration | Notes |
|---|---|---|
| **Calendly** | `<iframe>` or popup embed | Most common. Free tier. |
| **Cal.com** | `npm install @calcom/embed-react` | Open-source Calendly alternative |
| **SavvyCal** | Script embed | Overlay-based scheduling |
| **TidyCal** | `<iframe>` embed | Budget option (AppSumo lifetime deal) |

### Embed Pattern
```tsx
// Calendly inline embed
<div className="calendly-inline-widget"
  data-url="https://calendly.com/company/discovery"
  style={{ minWidth: 320, height: 700 }}
/>
<script src="https://assets.calendly.com/assets/external/widget.js" async />

// Or Calendly popup
<Button onClick={() => Calendly.initPopupWidget({ url: '...' })}>
  Book a Discovery Call
</Button>
```

---

## 36. COUNTRY & INDUSTRY DATA SETS

### Country Data (ISO 3166)
- **Full list:** 195 countries (UN member states) + territories
- **Package:** `world-countries` — includes: name, ISO alpha-2, alpha-3, UN numeric code, native name, currency, languages, capital, region, subregion, lat/lng, area, flag emoji
- **Dial codes:** `libphonenumber-js` provides calling codes per country

### Industry Classification
- **NAICS** (North American Industry Classification) — 1,057 industries
- **SIC** (Standard Industrial Classification) — 1,004 industries
- **GICS** (Global Industry Classification Standard) — 163 sub-industries (used by S&P/MSCI)
- **LinkedIn Industries** — LinkedIn has its own taxonomy (~150 industries)

### Useful for:
- Industry dropdown selectors in forms
- Company firmographic enrichment
- ICP definition (for Dolta's outbound targeting)
- Pricing page ("Select your industry" for custom quotes)
- Case study filtering by industry

---

## 37. MISCELLANEOUS UTILITIES

| Package | Install | Purpose |
|---|---|---|
| `clsx` | `npm install clsx` | Conditional class names |
| `tailwind-merge` | `npm install tailwind-merge` | Deduplicate Tailwind classes |
| `nanoid` | `npm install nanoid` | Generate short unique IDs |
| `ms` | `npm install ms` | Convert time strings ("2 days" → ms) |
| `copy-to-clipboard` | `npm install copy-to-clipboard` | Copy text to clipboard |
| `qrcode.react` | `npm install qrcode.react` | Generate QR codes |
| `react-wrap-balancer` | `npm install react-wrap-balancer` | Balance text wrapping in headings |
| `sharp` | `npm install sharp` | Server-side image processing (resize, format, optimize) |
| `next-themes` | `npm install next-themes` | Dark/light mode toggle for Next.js |
| `vaul` | `npm install vaul` | Mobile-friendly bottom drawer |
| `nuqs` | `npm install nuqs` | Type-safe URL search params for Next.js |
| `usehooks-ts` | `npm install usehooks-ts` | Collection of useful React hooks |
