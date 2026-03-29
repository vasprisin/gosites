# 10 — Pre-Launch Checklist
> Complete every item before going live. No exceptions.

---

## Content

- [ ] No lorem ipsum anywhere on the site
- [ ] No placeholder copy ("Your headline here", "Description...")
- [ ] No fake testimonials or invented quotes
- [ ] No fake stats — every number is real and defensible
- [ ] No duplicate text — every section has unique copy
- [ ] All CTAs link to real, working URLs
- [ ] Pricing is visible on the page (never hidden)
- [ ] Contact email/links are real and monitored
- [ ] Blog posts have real dates (not 2023)
- [ ] All images have proper alt text

---

## Design & Layout

- [ ] Homepage renders correctly at 375px (iPhone SE)
- [ ] Homepage renders correctly at 768px (iPad)
- [ ] Homepage renders correctly at 1280px (desktop)
- [ ] Homepage renders correctly at 1920px (wide screen)
- [ ] No horizontal scroll at any breakpoint
- [ ] Header sticky and readable on scroll
- [ ] Footer has all required links
- [ ] Dark theme consistent — no white flashes on load
- [ ] All images load (no broken image icons)
- [ ] Fonts load correctly (Cal Sans + Inter)
- [ ] Animations work and don't cause layout shift

---

## Performance

- [ ] `npm run build` completes with no errors
- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse SEO score ≥ 95
- [ ] Lighthouse Best Practices score ≥ 90
- [ ] No images above the fold without width/height attributes
- [ ] No render-blocking resources
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## SEO

- [ ] Every page has unique `<title>` (under 60 chars)
- [ ] Every page has unique `<meta description>` (under 160 chars)
- [ ] One `<h1>` per page
- [ ] Logical heading hierarchy on every page
- [ ] All URLs are lowercase and hyphenated
- [ ] Canonical tags on all pages
- [ ] robots.txt exists and is correct
- [ ] sitemap.xml generated and accessible at /sitemap.xml
- [ ] JSON-LD: Organization on homepage
- [ ] JSON-LD: Article on blog posts
- [ ] JSON-LD: FAQPage on FAQ/compare pages
- [ ] JSON-LD: BreadcrumbList on all non-homepage pages
- [ ] OG image set for homepage (1200×630)
- [ ] OG images set for all key pages
- [ ] Twitter card tags correct
- [ ] Google Search Console property verified

---

## Technical

- [ ] No `console.log` statements in production code
- [ ] No `TODO` comments left in code
- [ ] All `"use client"` directives are necessary (audit each one)
- [ ] No hardcoded hex colors outside globals.css
- [ ] No raw `<img>` tags — all using next/image
- [ ] No fonts loaded via `<link>` — all via next/font
- [ ] Environment variables all set in production
- [ ] .env.local NOT committed to git
- [ ] .gitignore includes .env*, .next/, node_modules/
- [ ] No unused dependencies in package.json
- [ ] TypeScript: `npm run lint` passes with no errors
- [ ] All API routes have error handling
- [ ] Contact form actually sends emails (test it)

---

## Security

- [ ] No API keys visible in client-side code
- [ ] No sensitive data in git history
- [ ] Security headers configured in next.config.ts
- [ ] Contact form has rate limiting or spam protection
- [ ] External links use `rel="noopener noreferrer"`

---

## Analytics & Monitoring

- [ ] PostHog initialized and receiving events
- [ ] Vercel Analytics (or equivalent) active
- [ ] Crisp chat widget loading (if used)
- [ ] Error monitoring set up (Sentry or equivalent)

---

## Final Check

- [ ] Test on Chrome ✓
- [ ] Test on Firefox ✓
- [ ] Test on Safari ✓
- [ ] Test on iPhone (real device or BrowserStack) ✓
- [ ] Founder has reviewed and approved copy
- [ ] All external links open in new tab
- [ ] 404 page exists and is on-brand
- [ ] Favicon set correctly (multiple sizes)

---

## Go Live

1. Merge final branch to main
2. Run deploy script on server
3. Verify live URL
4. Submit sitemap to Google Search Console
5. Share with first 10 people for feedback
