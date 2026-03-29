# PROMPTING-GUIDE.md
# How to Prompt Claude Code for Maximum Instruction-Following

> This guide ensures Claude Code reads and follows ALL directive files before writing code.
> It covers prompting patterns, CLAUDE.md enforcement, correction techniques, and ready-to-use prompt templates.

---

## THE GOLDEN RULE

Claude Code reads `CLAUDE.md` at the project root automatically. Everything in that file is treated as a permanent directive. But **Claude Code must be reminded to read the /docs/ files** — it will not automatically read them unless instructed.

The solution: **CLAUDE.md itself tells Claude to read the docs files.** This is already configured. But your prompts should reinforce it.

---

## HOW CLAUDE CODE PROCESSES INSTRUCTIONS

1. **CLAUDE.md** — read automatically at session start. Highest authority.
2. **Conversation context** — your prompts in the current session.
3. **File contents** — code Claude reads during the task.

Priority: CLAUDE.md > Your explicit instructions > Claude's own judgment.

If Claude ignores a rule, it's usually because:
- The rule is buried in prose (fix: make rules short, imperative, scannable)
- The rule contradicts another rule (fix: resolve conflicts in CLAUDE.md)
- The context window is full and Claude "forgot" (fix: repeat key rules in your prompt)

---

## CLAUDE.MD FORMATTING BEST PRACTICES

### DO: Write rules as imperative commands
```
NEVER use <img> tags. Use Next.js <Image> component exclusively.
ALWAYS use Server Components unless the component requires useState, useEffect, or event handlers.
Every section MUST follow: <section> → <Container> → content pattern.
```

### DO: Use scannable structure
```
## Rules (NEVER violate)
1. One rule per line
2. Short, specific, testable
3. Include the consequence of violation
```

### DON'T: Write paragraphs of explanation
```
❌ "It's generally a good practice to consider using Server Components when possible,
    as they reduce the client-side JavaScript bundle and improve performance..."

✅ "ALWAYS use Server Components. Only add 'use client' to components that use
    useState, useEffect, onClick, onChange, or other browser-only APIs."
```

### DO: Use trigger words Claude responds to
- **NEVER** — absolute prohibition
- **ALWAYS** — absolute requirement
- **MUST** — strong requirement
- **DO NOT** — prohibition with emphasis
- **BEFORE [doing X], [do Y]** — sequence enforcement
- **IF [condition], THEN [action]** — conditional rules
- **CRITICAL** / **NON-NEGOTIABLE** — flags for highest priority rules

### DO: Put the most important rules first
Claude Code weighs earlier content more heavily. Structure CLAUDE.md as:
1. Tech stack (non-negotiable choices)
2. Absolute rules (NEVER/ALWAYS)
3. Project structure
4. Component patterns
5. Nice-to-haves

---

## SESSION-START PROMPT (Use Every Time)

When starting a new coding session, send this first:

```
Read CLAUDE.md and all files in /docs/ before doing anything.
Confirm you've read and understood:
- CLAUDE.md
- docs/BUILD-ORCHESTRATOR.md
- docs/DESIGN-SYSTEM.md
- docs/COMPONENTS.md
- docs/SECTIONS.md
- docs/EXTENDED-TOOLKIT.md
- docs/WEBFLOW-DESIGN-VOCABULARY.md

List the 5 most important rules from CLAUDE.md.
```

This forces Claude to actually process the files and prove it. If it can't list the rules, it didn't read them.

---

## TASK PROMPTING PATTERNS

### Pattern 1: Reference the Doc
Always reference which doc applies to the task:

```
Build the homepage hero section.
Follow the Hero pattern in docs/SECTIONS.md.
Use the color tokens from docs/DESIGN-SYSTEM.md.
The hero should follow the Webflow pattern: Section > Container > flex content.
```

### Pattern 2: Constrain the Output
Be specific about what you want and what you don't:

```
Create the Footer component.
- Server Component (NO "use client")
- 4-column layout on desktop, stacked on mobile
- Uses navLinks from lib/constants.ts
- Uses design tokens from globals.css
- DO NOT use any hardcoded colors — only CSS variables
- DO NOT add a newsletter signup form
```

### Pattern 3: Step-by-Step Sequencing
For complex tasks, break it down:

```
Step 1: Create src/components/ui/Button.tsx with variants (primary, secondary, ghost, link)
        and sizes (sm, md, lg). Use the cn() utility from lib/utils.ts.
Step 2: Create src/components/ui/Badge.tsx with variants (default, outline, accent).
Step 3: Create src/components/ui/SectionHeader.tsx with optional overline, title, description.
Step 4: Show me all three files for review before moving on.
```

### Pattern 4: Correction with Reference
When Claude gets something wrong, point to the specific rule:

```
This violates CLAUDE.md rule: "NEVER use <img> tags."
Replace the <img> on line 47 with <Image> from next/image.
Width and height are required props — set them based on the original image dimensions.
```

### Pattern 5: Quality Gate
Ask Claude to self-check before delivering:

```
Before showing me the final code, verify:
1. No "use client" on any component that doesn't need it
2. All images use <Image> from next/image with width/height
3. All colors use CSS variables, not hardcoded hex/Tailwind colors
4. Section > Container > content pattern is followed everywhere
5. Mobile-first responsive classes (base → sm → md → lg)
6. All interactive elements have focus-visible styles
```

---

## COMMON MISTAKES & HOW TO FIX THEM

### Mistake: Claude adds "use client" everywhere
```
Correction: This component does not use useState, useEffect, or event handlers.
Remove "use client". It should be a Server Component.
Only these components should be client components: MobileNav, any form, any interactive widget.
Re-read the Server Component rules in CLAUDE.md.
```

### Mistake: Claude uses hardcoded colors
```
Correction: You used "bg-stone-950" and "text-amber-500" as hardcoded classes.
Replace with the semantic tokens from globals.css:
- bg-stone-950 → bg-[var(--surface-primary)]
- text-amber-500 → text-[var(--accent)]
Re-read docs/DESIGN-SYSTEM.md for the full token list.
```

### Mistake: Claude skips Container wrapper
```
Correction: The section content goes directly to full width.
Every section MUST follow: <section className="w-full ..."> → <div className="mx-auto max-w-7xl px-6 lg:px-8"> → content.
Never put content directly inside <section> without a max-width container.
```

### Mistake: Claude writes CSS files instead of Tailwind
```
Correction: We use Tailwind utility classes exclusively. Do not create .css or .module.css files.
The only CSS file is globals.css for design tokens and Tailwind imports.
All styling must be inline Tailwind classes.
```

### Mistake: Claude uses generic copy
```
Correction: "Learn More" and "Get Started" are banned. CTAs must be specific and action-oriented.
Refer to docs/BUILD-ORCHESTRATOR.md > Phase 4: Copywriting Framework > Button/CTA Copy.
Use: "Book a Discovery Call" / "View Case Studies" / "See Pricing"
```

### Mistake: Claude creates files in wrong location
```
Correction: Components go in src/components/, not in src/app/.
- Layout components (Header, Footer) → src/components/layout/
- Page sections (Hero, Features) → src/components/sections/
- Small primitives (Button, Badge) → src/components/ui/
- Content displays (BlogCard, TeamMember) → src/components/content/
Re-read the project structure in CLAUDE.md.
```

---

## PROMPT TEMPLATES (Copy-Paste Ready)

### Template: Build a New Page
```
Build the [PAGE NAME] page at app/(pages)/[route]/page.tsx

Follow the page flow from docs/BUILD-ORCHESTRATOR.md > Phase 4 > [Page] Page Flow.
Use section patterns from docs/SECTIONS.md.
Use components from docs/COMPONENTS.md.

Requirements:
- Export metadata with title, description, canonical URL
- Server Component (no "use client")
- Mobile-first responsive
- Section > Container > content pattern for every section
- Use design tokens from globals.css
- All images use next/image with width, height, alt

Page sections (in order):
1. [Section 1]
2. [Section 2]
3. [Section 3]
...
```

### Template: Build a New Component
```
Create [COMPONENT NAME] at src/components/[category]/[ComponentName].tsx

Requirements:
- TypeScript with typed props interface
- Use cn() from lib/utils for conditional classes
- [Server/Client] Component
- Variants: [list variants]
- Sizes: [list sizes]
- Must handle: [edge cases]
- Follow docs/COMPONENTS.md patterns
- Use design tokens, not hardcoded colors

Props:
- variant: 'primary' | 'secondary' | 'ghost'
- size: 'sm' | 'md' | 'lg'
- [other props]

Show me the complete file.
```

### Template: Add Blog Post
```
Create a new blog post at src/content/blog/[slug].mdx

Frontmatter:
- title: "[Title]"
- description: "[Description - 150-160 chars]"
- date: "[YYYY-MM-DD]"
- author: "[Author]"
- image: "/images/blog/[image-name].webp"
- tags: ["tag1", "tag2"]
- featured: [true/false]
- published: true

Content outline:
1. Introduction (problem/hook)
2. [Section 2]
3. [Section 3]
4. Conclusion + CTA

Writing rules:
- 8th grade reading level
- Short paragraphs (3-4 lines max)
- Use subheadings every 2-3 paragraphs
- Include at least one data point or statistic per section
- End with a CTA to book a discovery call
```

### Template: Fix / Refactor
```
In [FILE PATH], fix the following issues:

1. [Specific issue + line number if known]
2. [Specific issue]
3. [Specific issue]

Rules to follow (from CLAUDE.md):
- [Rule 1]
- [Rule 2]

Show me the corrected file. Do not change anything else.
```

### Template: Full Page Review
```
Review [FILE PATH] against our standards:

Check against:
□ CLAUDE.md — 12 Commandments
□ docs/DESIGN-SYSTEM.md — correct token usage
□ docs/COMPONENTS.md — component patterns
□ docs/SECTIONS.md — section structure

Specifically check:
1. No "use client" where unnecessary
2. All images use <Image> with width/height/alt
3. All colors use design tokens
4. Section > Container pattern followed
5. Mobile-first responsive classes
6. Focus-visible on all interactive elements
7. Semantic HTML (section, article, nav, etc.)
8. No hardcoded strings that should be in constants.ts

List every violation with file, line, rule broken, and fix.
```

---

## TIPS FOR LONG SESSIONS

1. **Re-anchor every 5-10 prompts.** Claude's attention drifts in long sessions. Periodically say:
   ```
   Before continuing, re-read CLAUDE.md and confirm you're following all rules.
   ```

2. **Use checkpoints.** After each major component:
   ```
   Pause. Review what you've built so far against CLAUDE.md.
   List any violations. Fix them before continuing.
   ```

3. **Don't let Claude batch too many changes.** One component or one section per prompt. Review before moving to the next.

4. **If Claude starts "drifting," reset.** Start a new conversation and re-read all docs.

5. **Save working patterns.** When Claude gets something right, say:
   ```
   This pattern is correct. Use this exact structure for all future [type] components.
   ```

---

## META-PROMPTING: ADDING NEW RULES

When you discover a new pattern Claude should follow:

```
Add this rule to CLAUDE.md under [section]:

"[NEW RULE — written as imperative command]"

This rule exists because [reason]. Apply it retroactively to all existing components.
```

When you discover a common mistake:

```
Add this to CLAUDE.md under Anti-Patterns:

"❌ [BAD PATTERN] → ✅ [CORRECT PATTERN]"

Check all existing files for this anti-pattern and fix them.
```

---

## FILE REFERENCE CHEAT SHEET

| When building... | Read this first |
|---|---|
| Any component | `docs/COMPONENTS.md` |
| Any page section | `docs/SECTIONS.md` |
| Color, font, spacing decisions | `docs/DESIGN-SYSTEM.md` |
| Need a library/package | `docs/EXTENDED-TOOLKIT.md` |
| SEO, blog, forms, hosting | `docs/BUILD-ORCHESTRATOR.md` |
| Understanding design language | `docs/WEBFLOW-DESIGN-VOCABULARY.md` |
| How to prompt effectively | `docs/PROMPTING-GUIDE.md` (this file) |
| The rules | `CLAUDE.md` |
