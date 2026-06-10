# put.in coffee — Deployment Guide (Netlify)

## Stack
- **Framework**: Astro 4 (SSG — static output)
- **Host**: Netlify (free tier is sufficient)
- **Forms**: Netlify Forms (zero backend)
- **Analytics**: Plausible (privacy-first, optional)
- **Node**: 20

---

## 1 · Prerequisites

```bash
# Install dependencies
npm install

# Check everything builds locally
npm run build

# Preview the build
npm run preview
```

---

## 2 · First deploy (GitHub → Netlify)

### A. Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial put.in coffee site"
git remote add origin https://github.com/YOUR_USERNAME/put-in-coffee.git
git branch -M main
git push -u origin main
```

### B. Connect to Netlify
1. Go to **app.netlify.com** → "Add new site" → "Import an existing project"
2. Choose **GitHub** → select your repo
3. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`
4. Click **Deploy site**

---

## 3 · Environment variables (Netlify dashboard)

Go to **Site settings → Environment variables** and add:

| Variable | Value | Required |
|---|---|---|
| `NODE_VERSION` | `20` | ✓ |
| `PUBLIC_SANITY_PROJECT_ID` | your Sanity project ID | only if using Sanity |
| `PUBLIC_SANITY_DATASET` | `production` | only if using Sanity |
| `SANITY_API_TOKEN` | read-only token | only if using Sanity |
| `PUBLIC_PLAUSIBLE_DOMAIN` | `www.putincoffee.com` | optional |

⚠️ **Never paste secrets in code or commit `.env` files.**

---

## 4 · Custom domain

1. **Site settings → Domain management** → "Add custom domain"
2. Add: `putincoffee.com` and `www.putincoffee.com`
3. Update DNS at your registrar:
   ```
   Type  Name   Value
   A     @      75.2.60.5          (Netlify load balancer)
   CNAME www    your-site.netlify.app
   ```
4. Wait for SSL certificate (auto-provisioned by Netlify via Let's Encrypt, ~2 min)
5. Enable **Force HTTPS** in Netlify dashboard

---

## 5 · Netlify Forms setup

Your `ReservationForm.astro` already has:
```html
<form name="reservation" data-netlify="true" netlify-honeypot="bot-field">
```

After first deploy, forms appear automatically in **Netlify → Forms**.

**To get email notifications:**
- Site settings → Forms → Form notifications → Add email notification

**Spam protection**: Netlify's Akismet integration is enabled via `spam_filter = true` in `netlify.toml`.

---

## 6 · Security checklist

- [x] **CSP headers** — locked down in `netlify.toml`
- [x] **HSTS** — `max-age=63072000; includeSubDomains; preload`
- [x] **X-Frame-Options: DENY** — blocks clickjacking
- [x] **X-Content-Type-Options: nosniff** — blocks MIME sniffing
- [x] **Permissions-Policy** — disables camera, mic, payments, USB
- [x] **Referrer-Policy: strict-origin** — no full URL leakage
- [x] **No `.env` in git** — `.gitignore` covers it
- [x] **Honeypot field** — catches bots in the reservation form
- [x] **Netlify spam filter** — server-side form spam protection
- [x] **No secrets in client JS** — all sensitive ops server-side
- [x] **HTTPS forced** — both `netlify.toml` redirect and Netlify dashboard
- [x] **Assets cache-busted** — `/_astro/*` with content hash → `immutable`
- [x] **`robots.txt`** — blocks `/_astro/`, `.git/`, `node_modules/`

**Supabase credentials notice:**
If your Supabase keys were ever committed to git history, rotate them immediately:
→ Supabase dashboard → Settings → API → Regenerate anon key + service role key

---

## 7 · Performance checklist

- [x] Astro SSG — zero JS by default, HTML served from CDN
- [x] `_astro/*` assets — `immutable` cache (1 year)
- [x] Images — 30-day cache + `stale-while-revalidate`
- [x] `inlineStylesheets: 'auto'` — small CSS inlined, no extra request
- [x] `esbuild.drop: ['console']` — no debug logs in prod
- [x] Leaflet lazy-loaded (IntersectionObserver) — not in initial bundle
- [x] Prefetch on hover — near-instant SPA-like navigation

---

## 8 · Ongoing deploys

Every `git push` to `main` triggers an automatic build on Netlify.

```bash
git add .
git commit -m "feat: update menu prices"
git push
# → Netlify builds + deploys in ~30s
```

---

## 9 · Rollback

If something breaks:
1. Netlify dashboard → Deploys tab
2. Click any previous deploy → "Publish deploy"
→ Site reverts in seconds, no downtime.

