# 08 — Deploy to Hostinger (Node.js Cloud)
> Step-by-step deployment of Next.js 15 App Router to Hostinger Cloud Startup.

---

## Prerequisites

- Hostinger Cloud Startup plan (or higher)
- SSH access enabled
- Domain DNS pointed to Hostinger nameservers
- GitHub repo with clean main branch
- All env vars known (production values)

---

## Step 1 — Configure next.config.ts for Node.js

Next.js on Hostinger runs as a Node.js server (not static export).

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // DO NOT add output: 'export' — that breaks SSR
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Optional: custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## Step 2 — Add start script to package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "lint": "eslint"
  }
}
```

---

## Step 3 — Create .env.production

Do NOT commit this file. Create it directly on the server.

Variables needed:
```
NEXT_PUBLIC_SITE_URL=https://[yourdomain.com]
RESEND_API_KEY=[your key]
NEXT_PUBLIC_POSTHOG_KEY=[your key]
NEXT_PUBLIC_CRISP_WEBSITE_ID=[your id]
REVALIDATION_SECRET=[random 32 char string]
NODE_ENV=production
```

---

## Step 4 — SSH Into Hostinger Server

```bash
ssh root@[your-server-ip]
```

Or use Hostinger's browser-based SSH terminal.

---

## Step 5 — Install Node.js on Server (if not present)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should show v20.x
```

---

## Step 6 — Clone Repo on Server

```bash
cd /var/www
git clone https://github.com/[username]/[project-name]-site.git
cd [project-name]-site
```

---

## Step 7 — Add Environment Variables on Server

```bash
nano .env.production
# Paste all production env vars
# Ctrl+X to save
```

---

## Step 8 — Install Dependencies & Build

```bash
npm install
npm run build
```

Build output will be in `.next/` folder.

---

## Step 9 — Install PM2 (Process Manager)

PM2 keeps your Next.js app running after SSH disconnect and auto-restarts on crash.

```bash
npm install -g pm2
```

---

## Step 10 — Start App with PM2

```bash
pm2 start npm --name "[project-name]" -- start
pm2 save
pm2 startup  # Follow the printed command to enable auto-start on reboot
```

---

## Step 11 — Configure Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/[project-name]
```

Paste:
```nginx
server {
    listen 80;
    server_name [yourdomain.com] www.[yourdomain.com];

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/[project-name] /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

---

## Step 12 — SSL Certificate (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d [yourdomain.com] -d www.[yourdomain.com]
```

Auto-renewal is set up automatically.

---

## Step 13 — Verify Live Site

Open `https://[yourdomain.com]` in browser.
Check:
- [ ] HTTPS works
- [ ] Homepage loads
- [ ] No console errors
- [ ] Images load correctly
- [ ] Forms work

---

## Step 14 — Set Up Auto-Deploy from GitHub (Optional)

On server, create deploy script:
```bash
nano /var/www/deploy.sh
```

Paste:
```bash
#!/bin/bash
cd /var/www/[project-name]-site
git pull origin main
npm install
npm run build
pm2 restart [project-name]
echo "Deploy complete"
```

Make executable:
```bash
chmod +x /var/www/deploy.sh
```

Now to deploy any update:
```bash
ssh root@[server-ip] "/var/www/deploy.sh"
```

Or set up a GitHub Action to run this automatically on push to main.

---

## Ongoing Deployment Workflow

1. Make changes locally
2. Test on `localhost:3000`
3. `git add . && git commit -m "Description" && git push`
4. SSH into server and run `./deploy.sh`
5. Verify on live site

---

## Troubleshooting

| Problem | Fix |
|---|---|
| App not starting | `pm2 logs [project-name]` to see errors |
| 502 Bad Gateway | App crashed — `pm2 restart [project-name]` |
| Images not loading | Check `next.config.ts` image domains |
| Build fails | Check Node.js version matches local (v20) |
| Env vars not working | Verify `.env.production` exists and is loaded |
