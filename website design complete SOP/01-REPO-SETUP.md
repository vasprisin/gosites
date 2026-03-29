# 01 — Repo & Environment Setup
> Run these steps once per project, in order.

---

## Step 1 — Create GitHub Repo

1. Go to github.com → New repository
2. Name: `[project-name]-site` (e.g. `goaccounts-site`)
3. Private
4. **Do NOT** check "Add README" (you'll push from local)
5. Click Create

---

## Step 2 — Scaffold Next.js Project Locally

```bash
cd ~/Desktop
npx create-next-app@latest [project-name]-site \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd [project-name]-site
```

---

## Step 3 — Connect to GitHub

```bash
git remote add origin https://github.com/[username]/[project-name]-site.git
git branch -M main
```

---

## Step 4 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:
```bash
claude --version
```

---

## Step 5 — Configure Claude Code MCP (GitHub)

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

---

## Step 6 — Create Project Folder Structure

```bash
mkdir -p .claude/skills
mkdir -p docs
mkdir -p tasks
mkdir -p public/assets
mkdir -p public/fonts
```

---

## Step 7 — Add CLAUDE.md

Copy the template from `03-CLAUDE-MD-TEMPLATE.md` → fill in project-specific sections → save as `CLAUDE.md` in project root.

---

## Step 8 — Add .cursorrules

Copy the template from `04-CURSORRULES-TEMPLATE.md` → save as `.cursorrules` in project root.

---

## Step 9 — Add Skills to .claude/skills/

Copy ALL skill files from your master skills library into `.claude/skills/`. Key skills:
- `DESIGN-SYSTEM.md`
- `COMPONENTS.md`
- `SECTIONS.md`
- `BUILD-ORCHESTRATOR.md`
- `EXTENDED-TOOLKIT.md`
- `WEBFLOW-DESIGN-VOCABULARY.md`
- `react-best-practices/`
- `composition-patterns/`
- `seo-audit/`
- `programmatic-seo/`
- `copywriting/`

---

## Step 10 — Create tasks files

```bash
cat > tasks/todo.md << 'EOF'
# Todo

## Current Task
- [ ] Phase 3: Design system setup

## Completed
EOF

cat > tasks/lessons.md << 'EOF'
# Lessons Learned

## Rules
- (populated during build)
EOF
```

---

## Step 11 — Create .env.local

```bash
touch .env.local
```

Add:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_CRISP_WEBSITE_ID=
REVALIDATION_SECRET=
```

---

## Step 12 — Init shadcn/ui

```bash
npx shadcn@latest init
```

Select:
- Library: **Radix**
- Preset: **Nova** (Lucide + Geist)
- CSS variables: **Yes**

---

## Step 13 — Initial Commit

```bash
git add .
git commit -m "Initial scaffold — Next.js 15, shadcn, all dependencies"
git push -u origin main
```

---

## Step 14 — Open in Cursor

File → Open Folder → select `[project-name]-site`

---

## Step 15 — Start Claude Code

Open terminal in Cursor:
```bash
claude
```

First message every session:
```
Read CLAUDE.md and tasks/lessons.md before doing anything.
Confirm you've read them by listing the 5 most important rules.
```
