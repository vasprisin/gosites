# 05 — Design System Template
> Copy into `app/globals.css`. Replace accent colors and font names for each project.

---

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
@source "../app";
@source "../components";
@source "../lib";
@source "../content";
@source not "../.claude";
@source not "../docs";
@source not "../node_modules";
@source not "../public";
@source not "../tasks";

/* ==========================================================================
   [PROJECT NAME] — Design System
   [THEME] theme only. All tokens as CSS custom properties.
   ========================================================================== */

:root {
  /* ---- Surfaces ---- */
  --color-bg-primary:    #0a0a0a;   /* [CHANGE] Main background */
  --color-bg-secondary:  #111111;   /* [CHANGE] Card backgrounds */
  --color-bg-tertiary:   #1a1a1a;   /* [CHANGE] Elevated surfaces */

  /* ---- Borders ---- */
  --color-border:        #222222;
  --color-border-subtle: #1c1c1c;
  --color-border-strong: #333333;

  /* ---- Text ---- */
  --color-text-primary:   #f8f8f8;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary:  #666666;

  /* ---- Accent — [CHANGE THIS PER PROJECT] ---- */
  --color-accent:       #A78BFA;    /* [CHANGE] Primary accent */
  --color-accent-hover: #C4B5FD;    /* [CHANGE] Hover state */
  --color-accent-muted: rgba(167, 139, 250, 0.15);
  --color-accent-dark:  #7C3AED;
  --color-accent-glow:  #8B5CF6;

  /* ---- Semantic ---- */
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-error:   #EF4444;

  /* ---- Fonts (resolved by next/font CSS variables) ---- */
  --font-heading: var(--font-cal-sans), Georgia, serif;    /* [CHANGE] */
  --font-body:    var(--font-inter), system-ui, sans-serif; /* [CHANGE] */
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  /* ---- Fluid type scale ---- */
  --text-display: clamp(2.5rem, 6vw + 0.5rem, 4rem);
  --text-h1:      clamp(2rem, 4vw + 0.25rem, 3rem);
  --text-h2:      clamp(1.5rem, 3vw, 2.5rem);
  --text-h3:      clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem);
  --text-body-lg: 1.125rem;
  --text-body:    1rem;
  --text-body-sm: 0.875rem;

  /* ---- Radius ---- */
  --radius: 0.5rem;

  /* ---- shadcn tokens ---- */
  --background:           #0a0a0a;
  --foreground:           #f8f8f8;
  --card:                 #111111;
  --card-foreground:      #f8f8f8;
  --popover:              #111111;
  --popover-foreground:   #f8f8f8;
  --primary:              #A78BFA;  /* [CHANGE] Match accent */
  --primary-foreground:   #ffffff;
  --secondary:            #1a1a1a;
  --secondary-foreground: #f8f8f8;
  --muted:                #1a1a1a;
  --muted-foreground:     #a3a3a3;
  --accent:               #A78BFA;  /* [CHANGE] Match accent */
  --accent-foreground:    #ffffff;
  --destructive:          #EF4444;
  --border:               #222222;
  --input:                #222222;
  --ring:                 #A78BFA;  /* [CHANGE] Match accent */
}

@theme inline {
  --color-surface-primary:   #0a0a0a;
  --color-surface-secondary: #111111;
  --color-surface-tertiary:  #1a1a1a;
  --color-accent:       #A78BFA;    /* [CHANGE] */
  --color-accent-hover: #C4B5FD;    /* [CHANGE] */
  --color-accent-muted: rgba(167, 139, 250, 0.15);
  --color-border-DEFAULT: #222222;
  --color-border-subtle:  #1c1c1c;
  --color-border-strong:  #333333;
  --color-text-primary:   #f8f8f8;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary:  #666666;
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-error:   #EF4444;
  --font-heading: Georgia, serif;
  --font-body:    system-ui, sans-serif;
  --font-mono:    ui-monospace, monospace;
  --font-sans:    system-ui, sans-serif;
  --radius-sm:  0.3rem;
  --radius-md:  0.4rem;
  --radius-lg:  0.5rem;
  --radius-xl:  0.7rem;
  --radius-2xl: 0.9rem;
  --animate-spotlight: spotlight 2s ease 0.75s 1 forwards;
}

/* ---- Keyframes ---- */
@keyframes spotlight {
  0%   { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
  100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 30px rgba(167, 139, 250, 0.4), 0 0 60px rgba(139, 92, 246, 0.2); }
  50%      { box-shadow: 0 0 50px rgba(167, 139, 250, 0.6), 0 0 100px rgba(139, 92, 246, 0.3); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ---- Base ---- */
html {
  scroll-padding-top: 100px;
  scroll-behavior: smooth;
}
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::selection {
  background-color: var(--color-accent);
  color: #ffffff;
}

/* ---- Scrollbar ---- */
::-webkit-scrollbar        { width: 6px; height: 6px; }
::-webkit-scrollbar-track  { background: var(--color-bg-primary); }
::-webkit-scrollbar-thumb  { background: var(--color-border-strong); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-text-tertiary); }
* { scrollbar-width: thin; scrollbar-color: var(--color-border-strong) var(--color-bg-primary); }

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Accent Color Presets (Pick One Per Project)

| Name | Accent | Hover | Glow |
|---|---|---|---|
| Electric Blue | #3B82F6 | #60A5FA | #2563EB |
| Vibrant Purple | #A78BFA | #C4B5FD | #8B5CF6 |
| Neon Green | #22C55E | #4ADE80 | #16A34A |
| Gold | #F59E0B | #FCD34D | #D97706 |
| Hot Pink | #EC4899 | #F472B6 | #DB2777 |
| Cyan | #06B6D4 | #22D3EE | #0891B2 |
