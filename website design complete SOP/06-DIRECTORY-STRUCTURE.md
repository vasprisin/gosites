# 06 — Directory Structure
> Standard file/folder layout for any Next.js 15 marketing site.

---

```
[project-name]-site/
├── app/
│   ├── (marketing)/              # Route group — no layout prefix
│   │   ├── page.tsx              # Homepage — SSG
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index — ISR
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Blog post — ISR revalidate 3600
│   │   ├── compare/
│   │   │   └── [competitor]/
│   │   │       └── page.tsx      # SSG via generateStaticParams
│   │   ├── use-case/
│   │   │   └── [usecase]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   ├── api/
│   │   ├── contact/route.ts      # Contact form → Resend
│   │   └── og/route.tsx          # OG image generation
│   ├── layout.tsx                # Root layout — fonts, metadata, providers
│   ├── globals.css               # Design system — ALL CSS variables here
│   ├── not-found.tsx
│   └── sitemap.ts                # Dynamic sitemap
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (auto-generated)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx         # max-w-7xl mx-auto px-6 lg:px-8
│   │   └── MobileNav.tsx         # "use client"
│   ├── sections/                 # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── PainPoints.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── Integrations.tsx
│   │   ├── Founder.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   ├── graphics/                 # Animated hero graphics
│   │   └── HeroGraphic.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   └── BlogContent.tsx
│   └── shared/
│       ├── AnimatedCounter.tsx   # "use client"
│       ├── AccountCard.tsx
│       └── Badge.tsx
│
├── lib/
│   ├── utils.ts                  # cn() helper
│   ├── constants.ts              # Site-wide constants
│   ├── seo.ts                    # Metadata factory
│   └── mdx.ts                   # MDX utilities
│
├── content/
│   └── blog/                    # .mdx blog post files
│       └── example-post.mdx
│
├── public/
│   ├── fonts/                   # Self-hosted fonts (.woff2)
│   ├── assets/                  # All brand collateral (raw)
│   └── images/
│       ├── logo/
│       ├── founder/
│       ├── og/                  # Pre-generated OG images
│       └── integrations/        # Tool logos
│
├── docs/                        # Project reference docs (markdown only)
│   └── [PROJECT]-Build-Plan.md
│
├── tasks/
│   ├── todo.md
│   └── lessons.md
│
├── .claude/
│   ├── settings.json
│   ├── settings.local.json
│   └── skills/                  # All Claude Code skills
│
├── .env.local                   # Never commit
├── .gitignore
├── .cursorrules
├── CLAUDE.md
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json              # shadcn config
└── package.json
```

---

## Key Conventions

- `app/` — Next.js App Router pages and API routes only
- `components/sections/` — One file per homepage section
- `components/layout/` — Header, Footer, Container
- `components/ui/` — shadcn/ui primitives only (never edit manually)
- `lib/` — Pure utility functions, no React
- `content/` — MDX files for blog posts
- `public/assets/` — Raw brand assets (before optimization)
- `public/images/` — Organized, web-ready assets
- `docs/` — Text reference docs only (no images)
- `tasks/` — Claude Code session state
