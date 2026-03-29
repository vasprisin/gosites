# 02 — Dependencies
> Run once after scaffolding. All free, open source.

---

## Core Dependencies (One Command)

```bash
npm install \
  framer-motion \
  lottie-react \
  @lottiefiles/react-lottie-player \
  canvas-confetti \
  react-hook-form \
  zod \
  @hookform/resolvers \
  @radix-ui/react-accordion \
  @radix-ui/react-dialog \
  @radix-ui/react-tooltip \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs \
  @radix-ui/react-select \
  @radix-ui/react-checkbox \
  @radix-ui/react-switch \
  @radix-ui/react-toast \
  lucide-react \
  react-icons \
  next-mdx-remote \
  gray-matter \
  reading-time \
  date-fns \
  country-list \
  react-phone-number-input \
  libphonenumber-js \
  next-sitemap \
  schema-dts \
  posthog-js \
  @vercel/analytics \
  @vercel/speed-insights \
  @vercel/og \
  plaiceholder \
  sharp \
  shiki \
  recharts \
  react-intersection-observer \
  embla-carousel-react \
  embla-carousel-autoplay \
  sonner \
  copy-to-clipboard \
  nanoid \
  slugify \
  resend \
  next-themes \
  @formkit/auto-animate \
  zustand \
  tailwindcss-animate \
  clsx \
  tailwind-merge \
  tw-animate-css \
  crisp-sdk-web
```

---

## Dev Dependencies

```bash
npm install -D \
  @tailwindcss/typography \
  @tailwindcss/forms \
  @tailwindcss/container-queries \
  prettier \
  prettier-plugin-tailwindcss \
  @types/mdx \
  @next/bundle-analyzer
```

---

## Copy-Paste UI Libraries (No NPM Install)

These are used by referencing their code directly. Claude Code knows all of these from training data — just ask for specific components.

| Library | URL | Best For |
|---|---|---|
| Aceternity UI | ui.aceternity.com | Glowing cards, spotlight, 3D effects |
| Magic UI | magicui.design | Animated counters, marquees, shimmer |
| Motion Primitives | motion-primitives.com | Clean simple animations |
| Cult UI | cult-ui.com | Bold animations, Apple-style |
| Origin UI | originui.com | 400+ free shadcn components |

**How to use:** Tell Claude Code:
```
Add the Aceternity UI "Spotlight" component to components/ui/spotlight.tsx
```

---

## Verify Install

```bash
cat package.json | grep -c '"'
# Should show 50+ entries

ls node_modules | grep -E "framer-motion|lucide-react|sonner|zustand|tailwindcss-animate"
```

---

## Do NOT Install

| Package | Why |
|---|---|
| axios | Use native fetch |
| moment.js | Use date-fns |
| react-query | Use Server Components |
| styled-components | Conflicts with Tailwind |
| bootstrap | Conflicts with Tailwind |
| jquery | Never |
| prisma | Marketing site doesn't need DB |
| next-auth | Marketing site doesn't need auth |
