# ☕ Putin Coffee — Production Stack

> Beachfront café landing page · Pantai Biaung, Denpasar, Bali
> Built with Astro · Tailwind · Sanity · Netlify · Cloudinary · Plausible

---

## Stack at a Glance

| Layer      | Technology                     | Why                                    |
|------------|--------------------------------|----------------------------------------|
| Framework  | Astro 4 (SSG)                  | 0-JS by default, fastest possible build|
| Styling    | Tailwind CSS 3 + design tokens | Consistent, scalable, no dead CSS      |
| CMS        | Sanity v3                      | Real-time, schema-driven, free tier    |
| Forms      | Netlify Forms (native)         | Zero backend, spam-protected, free     |
| Hosting    | Netlify                        | CDN, instant rollbacks, free tier      |
| Images     | Cloudinary (WebP/AVIF auto)    | Responsive srcset, LQIP blur, fast CDN |
| Analytics  | Plausible (privacy-first)      | No cookies, GDPR compliant, 1.5KB      |
| PWA        | Service Worker + Manifest      | Offline support, installable on mobile |

---

## Project Structure

```
putincoffee-astro/
├── public/
│   ├── favicon.svg          ← Logo
│   ├── hero.jpg             ← Local fallback image (replace with Cloudinary)
│   ├── manifest.json        ← PWA manifest
│   ├── robots.txt           ← SEO crawl rules
│   └── sw.js                ← Service Worker (offline support)
│
├── src/
│   ├── components/
│   │   ├── Navigation.astro     ← Sticky nav, mobile menu, scroll effect
│   │   ├── Hero.astro           ← Full-bleed image, CTAs, rating badge
│   │   ├── Menu.astro           ← Tabbed menu with category filter
│   │   ├── Reviews.astro        ← Google-style review cards
│   │   ├── ReservationForm.astro← Netlify Form with AJAX submit
│   │   ├── WaveDivider.astro    ← Reusable SVG section dividers
│   │   └── UI.astro             ← Cursor, progress bar, toasts, cookie banner
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     ← SEO meta, fonts, PWA, Plausible, JSON-LD
│   │
│   ├── lib/
│   │   ├── sanity.ts            ← Sanity client + all GROQ queries
│   │   ├── cloudinary.ts        ← Cloudinary URL builder (WebP/AVIF srcset)
│   │   ├── analytics.ts         ← Plausible event tracking helpers
│   │   └── fallback.ts          ← Static fallback data (works without Sanity)
│   │
│   ├── pages/
│   │   ├── index.astro          ← Home page (fetches CMS → fallback)
│   │   └── 404.astro            ← Custom 404
│   │
│   ├── sanity/
│   │   ├── sanity.config.ts     ← Studio config (singleton enforcement)
│   │   └── schemas/
│   │       ├── siteSettings.ts  ← Global settings (singleton)
│   │       ├── menuItem.ts      ← Coffee + food items
│   │       └── index.ts         ← Review + feature schemas
│   │
│   ├── styles/global.css        ← Tailwind base + component layer + utilities
│   └── types/index.ts           ← All shared TypeScript types
│
├── .env.example             ← Copy to .env and fill in values
├── astro.config.mjs         ← Astro integrations config
├── tailwind.config.mjs      ← Design tokens + animations
└── netlify.toml             ← Build, headers, redirects, forms
```

---

## Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill environment variables
cp .env.example .env
# Edit .env — add SANITY_PROJECT_ID, SANITY_API_TOKEN, PUBLIC_CLOUDINARY_CLOUD_NAME

# 3. Start dev server (works without Sanity/Cloudinary — uses fallback data)
npm run dev
# → http://localhost:4321

# 4. (Optional) Start Sanity Studio alongside
npm run sanity
# → http://localhost:3333
```

The site works immediately without any CMS — all content is seeded from `src/lib/fallback.ts`.

---

## Step-by-Step Deployment

### 1 · Sanity CMS

```bash
# Create a new Sanity project
npm create sanity@latest -- --project <your-project-id> --dataset production --output-path sanity
cd sanity && npm install

# Or if you already have a project, just set the env var:
# SANITY_PROJECT_ID=abc123
```

Then in Sanity Studio (http://localhost:3333):
1. Go to **Site Settings** → fill in all fields
2. Create **Menu Items** under ☕ Menu Items
3. Add **Reviews** under ⭐ Customer Reviews
4. Fill **Experience Features** under 🌊 Experience Features

Deploy the Studio:
```bash
npm run sanity:deploy
# → https://putincoffee.sanity.studio
```

### 2 · Cloudinary Images

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Upload your hero photo:
   - Go to **Media Library**
   - Create folder `putincoffee/`
   - Upload your photo → rename it to `hero-pantai-biaung`
   - Copy your **Cloud Name** from the dashboard
3. Set `PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name` in `.env`

The `cloudinary.ts` helper auto-generates WebP/AVIF srcsets at 640/1024/1408/2000px.

### 3 · Netlify Deploy

```bash
# Option A: GitHub integration (recommended)
git init && git add . && git commit -m "feat: Putin Coffee launch"
git remote add origin https://github.com/yourname/putincoffee
git push -u origin main
# → Connect at app.netlify.com → New Site from Git

# Option B: Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

**Environment variables** — add in Netlify dashboard → Site settings → Environment variables:
```
SANITY_PROJECT_ID     = your_project_id
SANITY_DATASET        = production
SANITY_API_VERSION    = 2024-01-01
SANITY_API_TOKEN      = your_read_only_token
PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
PUBLIC_PLAUSIBLE_DOMAIN      = putincoffee.com
PUBLIC_SITE_URL              = https://putincoffee.com
PUBLIC_WHATSAPP_NUMBER       = 6281916334989
PUBLIC_EMAIL                 = hello@putincoffee.com
```

**Netlify Forms** are automatically enabled on first deploy — no setup needed.
Configure email notifications at: **Netlify → Forms → reservation → Notifications**.

### 4 · Plausible Analytics

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain `putincoffee.com`
3. Set `PUBLIC_PLAUSIBLE_DOMAIN=putincoffee.com`
4. The script is already injected in `BaseLayout.astro` — zero config

Tracked events:
- `Reservation Submit` · `Newsletter Signup` · `Menu Item Click`
- `WhatsApp Click` · `Maps Click` · `Google Reviews Click`
- `CTA Hero Primary` · `CTA Hero Secondary` · `Share Click`

### 5 · Custom Domain (Netlify)

1. Netlify → Domain settings → Add custom domain → `putincoffee.com`
2. Point DNS to Netlify:
   ```
   A     putincoffee.com       →  75.2.60.5
   CNAME www.putincoffee.com   →  putincoffee.netlify.app
   ```
3. Netlify provisions HTTPS (Let's Encrypt) automatically.

---

## Content Updates

All content is editable in Sanity Studio without touching code:

| What to change          | Where in Studio               |
|-------------------------|-------------------------------|
| Site name, tagline      | Site Settings → Brand         |
| Hero text + image       | Site Settings → Hero          |
| About section           | Site Settings → About         |
| Opening hours           | Site Settings → Hours         |
| Contact info            | Site Settings → Contact       |
| Add/edit menu items     | ☕ Menu Items                  |
| Add/edit reviews        | ⭐ Customer Reviews            |
| Add/edit features       | 🌊 Experience Features         |
| Google review count     | Site Settings → Reviews Meta  |

After saving in Sanity → trigger a Netlify rebuild (or enable **Auto Deploy** webhook in Netlify → Site settings → Build hooks, then add it as a Sanity webhook).

---

## Performance Targets

| Metric      | Target | Strategy                                           |
|-------------|--------|----------------------------------------------------|
| LCP         | < 1.5s | Cloudinary hero preloaded, AVIF/WebP, LQIP blur    |
| CLS         | 0      | Explicit width/height on all images                |
| FID/INP     | < 50ms | Minimal JS, passive event listeners, requestIdleCallback |
| Lighthouse  | 95+    | SSG, no render-blocking, inlined critical CSS      |
| Core Web Vitals | Pass | @netlify/plugin-lighthouse enforces 90+ threshold |

---

## Adding New Sections

1. Create `src/components/NewSection.astro`
2. Add schema field in `src/sanity/schemas/siteSettings.ts` (or create a new type)
3. Add query in `src/lib/sanity.ts`
4. Add fallback in `src/lib/fallback.ts`
5. Import and use in `src/pages/index.astro`

---

## Design System

Colors (via Tailwind tokens `pc-*`):

| Token          | Hex / value          | Use                     |
|----------------|----------------------|-------------------------|
| `pc-bg`        | `#060f1e`            | Primary background      |
| `pc-bg2`       | `#0a1628`            | Secondary background    |
| `pc-bg3`       | `#0e1f35`            | Tertiary background     |
| `pc-gold`      | `#c8953e`            | Brand accent            |
| `pc-gold-lt`   | `#e8b85a`            | Gold light (italic hero)|
| `pc-teal`      | `#1a7085`            | Ocean accent            |
| `pc-cream`     | `#faf8f0`            | Primary text            |
| `pc-muted`     | `#9a9080`            | Secondary text          |
| `pc-text`      | `#e2d8c8`            | Body text               |

Fonts:
- **Headings**: Playfair Display (`font-display`)
- **Body**: DM Sans (`font-body`)

---

## Checklist Before Launch

- [ ] Fill all `.env` variables in Netlify dashboard
- [ ] Upload hero image to Cloudinary at `putincoffee/hero-pantai-biaung`
- [ ] Populate all content in Sanity Studio
- [ ] Set real Google Reviews URL in Site Settings
- [ ] Set real WhatsApp number
- [ ] Test reservation form → check Netlify Forms dashboard
- [ ] Test newsletter form → check Netlify Forms dashboard
- [ ] Configure Netlify form email notifications
- [ ] Register domain in Plausible
- [ ] Point DNS to Netlify
- [ ] Check Lighthouse score ≥ 90 on all categories
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Test offline mode (disable network in DevTools)
- [ ] Verify sitemap at https://putincoffee.com/sitemap-index.xml
- [ ] Submit sitemap to Google Search Console

---

*Built for Putin Coffee · Pantai Biaung, Denpasar, Bali · Made with ☕*