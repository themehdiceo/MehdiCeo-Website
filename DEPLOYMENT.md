# Production deployment — themehdiceo.com

This guide covers deploying the Mehdi CEO website to Vercel with indexing **disabled** for the first launch. Enable search indexing only after validating the live site.

## Prerequisites

- GitHub repository: [themehdiceo/MehdiCeo-Website](https://github.com/themehdiceo/MehdiCeo-Website)
- Domain registrar access for `themehdiceo.com`
- Vercel account with access to the project

## A. Import the GitHub repository into Vercel

1. Sign in to [Vercel](https://vercel.com) and click **Add New… → Project**.
2. Import **themehdiceo/MehdiCeo-Website** from GitHub.
3. Confirm framework preset: **Next.js** (auto-detected).
4. Leave the default build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `.next` (default for Next.js)
   - **Install command:** `npm install`
5. Add the environment variables from section B **before** the first production deploy.
6. Deploy the project.

## B. Environment variables (Vercel)

Add these in **Project Settings → Environment Variables** for **Production** (and optionally Preview if you want consistent canonical URLs on previews):

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://themehdiceo.com` | Used for canonical, hreflang, sitemap, Open Graph, and JSON-LD URLs |
| `NEXT_PUBLIC_SITE_INDEXING_ENABLED` | `false` | Keeps `robots.txt` as `Disallow: /` and pages as `noindex,nofollow` |

Copy from `.env.example` in the repository root. Do **not** commit `.env.local`.

**Important:** `NEXT_PUBLIC_*` variables are inlined at build time. After changing them, trigger a **new production deployment**.

## C. Connect custom domains

In **Project Settings → Domains**, add:

- `themehdiceo.com` (primary apex domain)
- `www.themehdiceo.com` (www subdomain)

Vercel will prompt you to configure DNS. Set `www.themehdiceo.com` to redirect to `https://themehdiceo.com` (recommended: redirect www → apex in the Vercel domain settings).

## D. DNS records

Do **not** hardcode DNS values in this repository. After adding each domain in Vercel, copy the exact records shown in the **Vercel dashboard** (typically an `A` record for the apex and a `CNAME` for `www`). DNS propagation can take up to 48 hours.

## E. Verify production before enabling indexing

With `NEXT_PUBLIC_SITE_INDEXING_ENABLED=false`, confirm the following on `https://themehdiceo.com`:

### Build and routing

- [ ] Homepage loads at `https://themehdiceo.com/fr` (root `/` redirects to `/fr`)
- [ ] Arabic locale works at `https://themehdiceo.com/ar`
- [ ] All main pages render (about, journey, Ecom Billionaire, PAS High Ticket, videos, FAQ, contact, blog articles)
- [ ] Favicon and apple-touch-icon display correctly
- [ ] Open Graph image generates (`/fr/opengraph-image`, `/ar/opengraph-image`)

### Indexing guard (must pass before launch)

- [ ] `https://themehdiceo.com/robots.txt` returns `Disallow: /` (no sitemap line)
- [ ] View page source on any page — `<meta name="robots" content="noindex, nofollow"/>`
- [ ] `https://themehdiceo.com/sitemap.xml` returns an empty `<urlset>` (no indexable URLs)

### SEO URLs (inspect source / structured data)

- [ ] Canonical URLs use `https://themehdiceo.com/{locale}/…`
- [ ] hreflang alternates use `https://themehdiceo.com/fr/…` and `https://themehdiceo.com/ar/…`
- [ ] JSON-LD (`Person`, `WebSite`, `Organization`, articles, videos) uses `https://themehdiceo.com` — no localhost or `*.vercel.app` URLs
- [ ] Open Graph `og:url` and image URLs use the production domain

### Domains

- [ ] `https://themehdiceo.com` serves the site
- [ ] `https://www.themehdiceo.com` redirects to `https://themehdiceo.com`

## F. Final launch step — enable indexing

Only after all checks in section E pass:

1. In Vercel **Production** environment variables, change:
   ```
   NEXT_PUBLIC_SITE_INDEXING_ENABLED=true
   ```
2. Trigger a **new production deployment** (rebuild required).
3. Re-verify:
   - `robots.txt` allows crawling and references `https://themehdiceo.com/sitemap.xml`
   - Page metadata uses `index, follow`
   - `sitemap.xml` lists indexable pages with correct production URLs
4. Submit `https://themehdiceo.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Local development

```bash
npm install
cp .env.example .env.local   # optional; defaults match production URL with indexing off
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/fr`. Indexing remains disabled unless you explicitly set `NEXT_PUBLIC_SITE_INDEXING_ENABLED=true` in `.env.local`.

## Troubleshooting

| Issue | Action |
|-------|--------|
| Wrong canonical / OG URLs on production | Confirm `NEXT_PUBLIC_SITE_URL=https://themehdiceo.com` is set for Production and redeploy |
| Site indexed before ready | Set `NEXT_PUBLIC_SITE_INDEXING_ENABLED=false` and redeploy immediately |
| www not redirecting | Configure redirect in Vercel **Domains** settings (not in code) |
| Env change has no effect | Redeploy — `NEXT_PUBLIC_*` vars are baked in at build time |
