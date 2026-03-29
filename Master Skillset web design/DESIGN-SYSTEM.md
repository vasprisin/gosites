# DESIGN-SYSTEM.md — Design Token Specification

> This file defines EVERY visual decision. All values are stored as CSS custom properties in `globals.css`.
> Components consume these tokens via Tailwind. NEVER hardcode colors, fonts, or spacing.

---

## How to Use This File

1. Copy the CSS variables below into your `globals.css`
2. Extend your `tailwind.config.ts` to reference these variables
3. Use Tailwind classes that reference the tokens (e.g., `bg-surface-primary`, `text-heading`)
4. To rebrand: change the CSS variable values — the entire site updates automatically

---

## Color Tokens

### Palette Definition (Customize These)

Replace these values with the brand's actual colors. Every other token references these primitives.

```css
/* globals.css */
:root {
  /* ━━━ PRIMITIVE PALETTE ━━━ */
  /* Neutrals — warm stone scale (avoid pure gray, it looks dead) */
  --color-neutral-50:  #fafaf9;
  --color-neutral-100: #f5f5f4;
  --color-neutral-200: #e7e5e4;
  --color-neutral-300: #d6d3d1;
  --color-neutral-400: #a8a29e;
  --color-neutral-500: #78716c;
  --color-neutral-600: #57534e;
  --color-neutral-700: #44403c;
  --color-neutral-800: #292524;
  --color-neutral-900: #1c1917;
  --color-neutral-950: #0c0a09;

  /* Brand Primary — the main accent color */
  --color-primary-50:  #fffbeb;
  --color-primary-100: #fef3c7;
  --color-primary-200: #fde68a;
  --color-primary-300: #fcd34d;
  --color-primary-400: #fbbf24;
  --color-primary-500: #f59e0b;
  --color-primary-600: #d97706;
  --color-primary-700: #b45309;
  --color-primary-800: #92400e;
  --color-primary-900: #78350f;

  /* Brand Secondary — used sparingly for accents */
  --color-secondary-500: #6366f1;
  --color-secondary-600: #4f46e5;

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #eab308;
  --color-error:   #ef4444;
  --color-info:    #3b82f6;

  /* ━━━ SEMANTIC SURFACE TOKENS ━━━ */
  /* These are what components actually use */
  --surface-primary:   var(--color-neutral-950);  /* Main background */
  --surface-secondary: var(--color-neutral-900);  /* Cards, elevated surfaces */
  --surface-tertiary:  var(--color-neutral-800);  /* Hover states, subtle areas */
  --surface-inverse:   var(--color-neutral-50);   /* Light sections */

  /* ━━━ SEMANTIC TEXT TOKENS ━━━ */
  --text-primary:   var(--color-neutral-50);   /* Headings, important text */
  --text-secondary: var(--color-neutral-400);  /* Body text, descriptions */
  --text-tertiary:  var(--color-neutral-500);  /* Captions, metadata */
  --text-inverse:   var(--color-neutral-950);  /* Text on light backgrounds */
  --text-accent:    var(--color-primary-400);  /* Links, highlights */

  /* ━━━ SEMANTIC BORDER TOKENS ━━━ */
  --border-default:  var(--color-neutral-800);
  --border-subtle:   var(--color-neutral-800) / 50%;
  --border-strong:   var(--color-neutral-600);
  --border-accent:   var(--color-primary-500);

  /* ━━━ COMPONENT-SPECIFIC TOKENS ━━━ */
  --card-bg:         var(--color-neutral-900);
  --card-border:     var(--color-neutral-800);
  --card-hover-bg:   var(--color-neutral-800);
  --button-primary-bg:    var(--color-primary-500);
  --button-primary-text:  var(--color-neutral-950);
  --button-primary-hover: var(--color-primary-400);
  --button-secondary-bg:    transparent;
  --button-secondary-text:  var(--color-neutral-50);
  --button-secondary-border: var(--color-neutral-700);
  --nav-bg:          var(--color-neutral-950) / 80%;
  --nav-text:        var(--color-neutral-300);
  --nav-text-active: var(--color-neutral-50);
  --footer-bg:       var(--color-neutral-950);
}
```

### Light Mode Override (if needed)
```css
[data-theme="light"] {
  --surface-primary:   var(--color-neutral-50);
  --surface-secondary: white;
  --surface-tertiary:  var(--color-neutral-100);
  --text-primary:      var(--color-neutral-950);
  --text-secondary:    var(--color-neutral-600);
  --text-tertiary:     var(--color-neutral-500);
  --border-default:    var(--color-neutral-200);
  --card-bg:           white;
  --card-border:       var(--color-neutral-200);
}
```

---

## Typography Tokens

### Font Stack
```css
:root {
  /* Set these to your chosen fonts — loaded via next/font in layout.tsx */
  --font-heading: var(--font-cal-sans), 'Georgia', serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
}
```

### Type Scale (Fluid)
Use `clamp()` for fluid responsive typography. NEVER use fixed px values for headings.

```css
:root {
  /* Display — used for hero headlines only */
  --text-display:    clamp(2.5rem, 5vw + 1rem, 4.5rem);    /* 40px → 72px */
  --leading-display: 1.05;
  --tracking-display: -0.025em;

  /* H1 */
  --text-h1:    clamp(2rem, 4vw + 0.5rem, 3.5rem);         /* 32px → 56px */
  --leading-h1: 1.1;
  --tracking-h1: -0.02em;

  /* H2 — section headings */
  --text-h2:    clamp(1.5rem, 3vw + 0.25rem, 2.5rem);      /* 24px → 40px */
  --leading-h2: 1.15;
  --tracking-h2: -0.015em;

  /* H3 — card titles, subsections */
  --text-h3:    clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);   /* 18px → 24px */
  --leading-h3: 1.25;
  --tracking-h3: -0.01em;

  /* Body */
  --text-body-lg: 1.125rem;     /* 18px */
  --text-body:    1rem;          /* 16px */
  --text-body-sm: 0.875rem;     /* 14px */
  --leading-body: 1.65;

  /* Caption / Overline */
  --text-caption: 0.75rem;      /* 12px */
  --text-overline: 0.8125rem;   /* 13px */
  --tracking-overline: 0.1em;
}
```

### Typography Rules
- **Headings:** `font-heading`, tight tracking, bold/semibold weight, `text-balance`
- **Body:** `font-body`, relaxed line-height (1.6–1.75), `text-pretty`
- **Overlines/Labels:** `font-body`, uppercase, wide letter-spacing, small size, medium weight
- **Max line length:** body text NEVER exceeds `max-w-prose` (65ch) or `max-w-2xl`
- **Hierarchy:** Every section needs exactly ONE heading level + supporting text. Don't skip levels.

---

## Spacing Scale

Use Tailwind's default scale. These are the PRIMARY values to use:

| Token  | Value | Use For |
|--------|-------|---------|
| `p-1` / `m-1` | 4px | Icon padding, tight gaps |
| `p-2` / `m-2` | 8px | Inline element gaps |
| `p-3` / `m-3` | 12px | Small component padding |
| `p-4` / `m-4` | 16px | Card inner padding (mobile) |
| `p-6` / `m-6` | 24px | Card inner padding (desktop), section horizontal padding mobile |
| `p-8` / `m-8` | 32px | Card inner padding (large), section horizontal padding desktop |
| `gap-4` | 16px | Tight grid gaps |
| `gap-6` | 24px | Default grid gaps |
| `gap-8` | 32px | Comfortable grid gaps |
| `py-16` | 64px | Section vertical padding (mobile) |
| `py-20` | 80px | Section vertical padding (default) |
| `py-24` | 96px | Section vertical padding (tablet) |
| `py-32` | 128px | Section vertical padding (desktop) |

### Section Spacing Pattern
```tsx
// Every section follows this pattern:
<section className="py-16 md:py-20 lg:py-24 xl:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Section header */}
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-overline">OVERLINE LABEL</p>
      <h2 className="mt-2 text-h2 font-heading font-bold text-primary text-balance">
        Section Heading Goes Here
      </h2>
      <p className="mt-4 text-body-lg text-secondary text-pretty">
        Supporting description text with a max width constraint.
      </p>
    </div>
    {/* Section content with top margin */}
    <div className="mt-12 lg:mt-16">
      {/* Grid, cards, content etc. */}
    </div>
  </div>
</section>
```

---

## Border Radius Scale

```css
:root {
  --radius-sm:   0.375rem;  /* 6px — small badges, tags */
  --radius-md:   0.5rem;    /* 8px — buttons, inputs */
  --radius-lg:   0.75rem;   /* 12px — cards */
  --radius-xl:   1rem;      /* 16px — large cards, modals */
  --radius-2xl:  1.5rem;    /* 24px — hero images, feature blocks */
  --radius-full: 9999px;    /* Pills, avatars */
}
```

**Rule:** Pick ONE radius for cards across the entire site and use it everywhere. Mixing `rounded-lg` and `rounded-2xl` on cards looks inconsistent.

---

## Shadow Scale

```css
:root {
  --shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 20px rgb(var(--color-primary-500) / 0.15);  /* Accent glow */
}
```

For dark themes, shadows are LESS visible. Use `border` + subtle `bg` changes for elevation instead of shadows.

---

## Animation Tokens

```css
:root {
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
  --duration-slower: 600ms;
  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Animation Rules
- Hover transitions: `duration-fast` (150ms) for color/opacity, `duration-normal` (250ms) for transforms
- Page entrance: `duration-slow` to `duration-slower` with staggered `animation-delay`
- NEVER animate `width`, `height`, `top`, `left` — use `transform` and `opacity` only
- Prefer CSS animations over JS — use `@keyframes` in `globals.css`
- Mobile: REDUCE or REMOVE animations. Use `prefers-reduced-motion` media query.

---

## Breakpoint Reference

| Name | Min Width | Typical Use |
|------|-----------|-------------|
| `sm` | 640px | Small tablets, landscape phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops, landscape tablets |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large desktops |

### Container Widths at Each Breakpoint
- Mobile (< 640px): 100% width, `px-6` padding
- `sm`–`md`: 100% width, `px-6` padding
- `lg`: `max-w-7xl` (1280px), `px-8` padding
- `xl`+: `max-w-7xl` centered, `px-8` padding

---

## Tailwind Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
          inverse: 'var(--surface-inverse)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
          accent: 'var(--text-accent)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
          accent: 'var(--border-accent)',
        },
        card: {
          DEFAULT: 'var(--card-bg)',
          border: 'var(--card-border)',
          hover: 'var(--card-hover-bg)',
        },
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' }],
        h1: ['var(--text-h1)', { lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-h1)' }],
        h2: ['var(--text-h2)', { lineHeight: 'var(--leading-h2)', letterSpacing: 'var(--tracking-h2)' }],
        h3: ['var(--text-h3)', { lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-h3)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body)' }],
        body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        'body-sm': ['var(--text-body-sm)', { lineHeight: 'var(--leading-body)' }],
        caption: 'var(--text-caption)',
        overline: ['var(--text-overline)', { letterSpacing: 'var(--tracking-overline)' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      animation: {
        'fade-in': 'fadeIn var(--duration-slow) var(--ease-out) forwards',
        'slide-up': 'slideUp var(--duration-slow) var(--ease-out) forwards',
        'slide-in-left': 'slideInLeft var(--duration-slow) var(--ease-out) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Checklist Before Any Build

- [ ] All CSS variables defined in `globals.css`
- [ ] `tailwind.config.ts` extended with semantic tokens
- [ ] Fonts loaded via `next/font` in `layout.tsx` with CSS variable names
- [ ] Font variables applied to `<html>` className
- [ ] `font-body` set on `<body>`
- [ ] Color tokens tested in both dark sections and any light sections
- [ ] Checked: no hardcoded color values anywhere in components
