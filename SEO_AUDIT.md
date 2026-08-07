# SEO Audit — themehdiceo.com (Mehdi CEO)

**Audit date:** 2026-08-02  
**Scope:** All 38 public URLs (19 route types × FR + AR)  
**Primary branded targets:** Mehdi CEO · themehdiceo · Mehdi CEO e-commerce · Mehdi CEO Ecom Billionaire · Mehdi CEO PAS High Ticket · Mehdi CEO entrepreneur  
**Method:** Static codebase review, metadata analysis, structured-data validation, build verification. No live crawl against production (site may not yet be deployed).  
**Constraint:** Audit only — no fixes implemented.

---

## Executive summary

The site has a solid bilingual foundation: locale-prefixed URLs (`/fr`, `/ar`), reciprocal hreflang, canonical tags, a complete sitemap, and strong branded messaging in French and Arabic copy. Cornerstone entity pages exist for Ecom Billionaire and PAS High Ticket.

Critical gaps block authority consolidation:

1. **Missing `/og-image.jpg`** referenced in Person schema and implied for default social sharing — likely 404.
2. **`/blog` is indexable but contains only draft titles** — thin/placeholder content risk.
3. **Homepage FAQPage JSON-LD lists 8 Q&As while only 4 are visible** — structured-data policy violation risk.
4. **No preview/staging noindex guard** — any non-production deploy could be indexed.

High-priority improvements: entity schema alignment (themehdiceo as digital brand), noindex blog until articles publish, Open Graph images sitewide, keyword cannibalization between `/parcours`, `/a-propos`, and homepage timeline, and missing legal/trust pages.

**Build status (2026-08-02):** `npm run lint` ✅ · `npx tsc --noEmit` ✅ · `npm run build` ✅ (43 routes generated, 38 locale content pages)

---

## 1. Crawlability and indexing

| Check | Status | Notes |
|-------|--------|-------|
| `robots.txt` | ✅ Pass | `app/robots.ts` — allows all, references sitemap |
| `sitemap.xml` | ✅ Pass | 11 static routes + 8 video slugs × 2 locales; hreflang alternates with `x-default` → `/fr` |
| Index directives | ⚠️ Partial | All pages hard-coded `robots: { index: true, follow: true }` in `seo/metadata.ts` |
| Canonical URLs | ✅ Pass | Self-referencing per locale via `alternates.canonical` |
| Redirect `/` → `/fr` | ✅ Pass | Permanent redirect in `next.config.ts` |
| Status codes | ✅ Expected | SSG static pages; `/` → 308 to `/fr`; invalid locale/slug → 404 |
| Broken links (internal) | ✅ Pass | All routes use typed `Link` / `routes` config |
| Broken assets | ❌ Fail | `/og-image.jpg` referenced but file absent from `public/` |
| Orphan / low-discoverability pages | ⚠️ Partial | `/expertise`, `/ressources`, `/blog` linked only in footer secondary nav |
| Duplicate URLs | ✅ Pass | `localePrefix: "always"` — no non-locale duplicates |
| Preview indexing protection | ❌ Fail | No env-based `noindex` for preview/staging |
| Production indexing config | ⚠️ Partial | Correct for production; unsafe for previews |

### Issues — Crawlability and indexing

#### Critical

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| C-01 | `public/` (missing) · `seo/structured-data.ts` L24 | Person schema and social defaults reference `${siteConfig.url}/og-image.jpg` but no file exists | Broken image in rich results; poor link-preview CTR; trust signal failure | Add a branded 1200×630 OG image at `public/og-image.jpg`; wire into default OG/Twitter metadata |
| C-02 | `/fr/blog`, `/ar/blog` · `app/[locale]/blog/page.tsx` | Page is fully indexable but contains only 10 unpublished draft titles (~150 words total) | Thin-content penalty; mismatched SERP snippet vs page; wasted crawl budget | Set `robots: { index: false }` until first article publishes; remove from sitemap or lower priority |
| C-03 | `seo/metadata.ts` L64–67 | No environment guard — all deployments indexable | Staging/preview URLs may enter Google index, diluting branded SERP | Add `noindex` when `VERCEL_ENV !== 'production'` or equivalent |

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-01 | `/fr/expertise`, `/ar/expertise`, `/fr/ressources`, `/ar/ressources`, `/fr/blog`, `/ar/blog` | Only in `secondaryNavigation` (footer), not primary header nav | Lower PageRank flow; slower discovery for supporting pages | Add contextual internal links from homepage body sections; consider promoting expertise in primary nav |
| H-02 | `app/sitemap.ts` | Blog and thin hub pages at same priority (0.8) as cornerstone pages | Crawlers may overweight low-value URLs | Differentiate priorities: home 1.0, entity pages 0.9, videos 0.7, blog 0.3 or exclude until live |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-01 | `public/` | Default Next.js assets (`vercel.svg`, `next.svg`) remain; no custom favicon/apple-touch-icon | Weak brand recognition in tabs/bookmarks | Replace with Mehdi CEO / themehdiceo favicon set |
| M-02 | Homepage `/fr`, `/ar` | No BreadcrumbList (acceptable for home) | Minor — no rich breadcrumb on home | Optional: skip or add minimal WebSite breadcrumb |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-01 | `app/sitemap.ts` L8 | `lastModified` set to build time for all URLs | Google may deprioritize inaccurate freshness signals | Use content-specific dates when articles/videos update |

---

## 2. International SEO

| Check | Status | Notes |
|-------|--------|-------|
| `/fr` and `/ar` architecture | ✅ Pass | `localePrefix: "always"`, middleware via `proxy.ts` |
| `html lang` | ✅ Pass | `lang={locale}` on `<html>` in `app/[locale]/layout.tsx` |
| RTL direction | ✅ Pass | `dir={direction}` — Arabic RTL via `getDirection()` |
| hreflang reciprocity | ✅ Pass | Both locales generate identical `alternates.languages` maps |
| `x-default` | ✅ Pass | Points to French (`/fr` + path) |
| Localized canonicals | ✅ Pass | Each locale self-canonicalizes |
| Translated metadata | ✅ Pass | Full `Metadata.*` namespaces in `fr.json` and `ar.json` |
| Translated visible content | ✅ Pass | All page copy bilingual |
| Language switcher | ✅ Pass | `LanguageSwitcher` preserves pathname, swaps locale |
| Accidental FR/AR duplication | ⚠️ Partial | Same structural sections; acceptable for i18n but timeline/FAQ text is near-verbatim translated |

### Issues — International SEO

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-03 | `seo/metadata.ts` L56 vs L39–40 | Open Graph uses `fr_FR` / `ar_MA`; hreflang uses `fr` / `ar` | Minor inconsistency; generally acceptable | Align to `fr`/`ar` or use region subtags consistently everywhere |
| M-04 | `seo/structured-data.ts` L54 | WebSite `inLanguage` uses `fr-FR` / `ar` (mixed conventions) | Minor schema inconsistency | Standardize BCP-47 tags (`fr-FR`, `ar`) |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-02 | `components/ui/LanguageSwitcher.tsx` L25 | Hard-coded English `aria-label="Language"` | Accessibility gap on Arabic pages | Localize aria-label via i18n |
| L-03 | Video pages | YouTube original titles are Arabic; FR display titles are translations — good practice but may confuse Arabic users expecting original | Minor UX/SEO for Arabic locale video SERPs | On `/ar/videos/*`, consider showing Arabic-forward titles more prominently |

---

## 3. Metadata audit (all routes)

Legend: **Title len** / **Desc len** = character count. Target: title 50–60 chars, description 150–160 chars.

### Static pages

| Route | Locale | Title | Len | Description | Len | Branded keywords | OG image | Canonical | Alternates |
|-------|--------|-------|-----|-------------|-----|------------------|----------|-----------|------------|
| `/` | FR | Mehdi CEO — Entrepreneur e-commerce et fondateur d'Ecom Billionaire | 58 | Découvrez le parcours de Mehdi CEO… PAS High Ticket. | 118 | Mehdi CEO ✅ · themehdiceo (keywords only) · e-commerce ✅ · Ecom Billionaire ✅ · PAS High Ticket ✅ · entrepreneur (keywords) | ❌ None | ✅ `/fr` | ✅ fr, ar, x-default |
| `/` | AR | Mehdi CEO — رائد أعمال في التجارة الإلكترونية ومؤسس Ecom Billionaire | ~62 | اكتشف مسار Mehdi CEO… PAS High Ticket. | ~115 | Same pattern | ❌ | ✅ `/ar` | ✅ |
| `/a-propos` | FR | Qui est Mehdi CEO ? Parcours et biographie officielle | 52 | Biographie officielle de Mehdi CEO (@themehdiceo)… | 145 | Strong | ❌ | ✅ | ✅ |
| `/a-propos` | AR | من هو Mehdi CEO؟ المسار والسيرة الرسمية | ~45 | السيرة الرسمية لـ Mehdi CEO (@themehdiceo)… | ~140 | Strong | ❌ | ✅ | ✅ |
| `/parcours` | FR | Parcours de Mehdi CEO — Chronologie e-commerce | 47 | Chronologie du parcours entrepreneurial… | 95 | Mehdi CEO parcours ✅ | ❌ | ✅ | ✅ |
| `/parcours` | AR | مسار Mehdi CEO — الجدول الزمني | ~35 | الخط الزمني لمسار Mehdi CEO… | ~90 | Partial | ❌ | ✅ | ✅ |
| `/ecom-billionaire` | FR | Ecom Billionaire — L'accompagnement créé par Mehdi CEO | 54 | Présentation d'Ecom Billionaire… | 115 | Ecom Billionaire ✅ · Mehdi CEO ✅ | ❌ | ✅ | ✅ |
| `/ecom-billionaire` | AR | Ecom Billionaire — المرافقة التي أنشأها Mehdi CEO | ~52 | تعريف بـ Ecom Billionaire… | ~110 | Strong | ❌ | ✅ | ✅ |
| `/pas-high-ticket` | FR | PAS High Ticket — L'approche e-commerce de Mehdi CEO | 52 | Découvrez PAS High Ticket… | 130 | PAS High Ticket ✅ | ❌ | ✅ | ✅ |
| `/pas-high-ticket` | AR | PAS High Ticket — منهج Mehdi CEO في التجارة الإلكترونية | ~55 | اكتشف PAS High Ticket… | ~125 | Strong | ❌ | ✅ | ✅ |
| `/expertise` | FR | Expertise de Mehdi CEO — E-commerce et marketing | 48 | Domaines d'expertise de Mehdi CEO… | 120 | Mehdi CEO expertise ✅ | ❌ | ✅ | ✅ |
| `/expertise` | AR | خبرات Mehdi CEO — التجارة الإلكترونية والتسويق | ~48 | مجالات خبرة Mehdi CEO… | ~115 | Strong | ❌ | ✅ | ✅ |
| `/ressources` | FR | Ressources — Mehdi CEO | 22 | Hub de ressources de Mehdi CEO (@themehdiceo)… | 115 | **Title too short** | ❌ | ✅ | ✅ |
| `/ressources` | AR | الموارد — Mehdi CEO | ~20 | بوابة موارد Mehdi CEO… | ~110 | **Title too short** | ❌ | ✅ | ✅ |
| `/videos` | FR | Vidéos de Mehdi CEO sur l'e-commerce et l'entrepreneuriat | 58 | Chaîne YouTube officielle de Mehdi CEO (@themehdiceo)… | 105 | Strong | ❌ | ✅ | ✅ |
| `/videos` | AR | فيديوهات Mehdi CEO حول التجارة الإلكترونية وريادة الأعمال | ~58 | قناة YouTube الرسمية… | ~100 | Strong | ❌ | ✅ | ✅ |
| `/faq` | FR | FAQ — Mehdi CEO | 16 | Questions fréquentes sur Mehdi CEO… | 95 | **Title too short** | ❌ | ✅ | ✅ |
| `/faq` | AR | الأسئلة الشائعة — Mehdi CEO | ~28 | إجابات على الأسئلة… | ~90 | Partial | ❌ | ✅ | ✅ |
| `/contact` | FR | Contact — Mehdi CEO | 19 | Contactez Mehdi CEO via LinkedIn… | 75 | **Title/desc short** | ❌ | ✅ | ✅ |
| `/contact` | AR | تواصل — Mehdi CEO | ~18 | تواصل مع Mehdi CEO… | ~70 | Partial | ❌ | ✅ | ✅ |
| `/blog` | FR | Blog — Mehdi CEO | 16 | Articles, guides et analyses de Mehdi CEO… | 95 | **Title short; desc promises unpublished content** | ❌ | ✅ | ✅ |
| `/blog` | AR | المدونة — Mehdi CEO | ~18 | مقالات وأدلة… | ~90 | Same issue | ❌ | ✅ | ✅ |

### Video detail pages (8 slugs × 2 locales)

Pattern: `{displayTitle} — Mehdi CEO` (unique per video). OG image = YouTube thumbnail ✅. Twitter inherits title/desc; video pages get thumbnail via override in `videos/[slug]/page.tsx`.

| Slug | Unique title/desc | Notes |
|------|-------------------|-------|
| `histoire-premiers-10000-dollars` | ✅ | Branded suffix consistent |
| `strategie-15000-dollars-ecommerce` | ✅ | |
| `100000-dollars-depuis-zero` | ✅ | Financial framing; page includes disclaimer-style ideas |
| `reussir-business-ecommerce` | ✅ | |
| `abandon-etudes-ecommerce` | ✅ | |
| `erreur-debutants-ecommerce` | ✅ | |
| `verite-ecommerce` | ✅ | |
| `dropshipping-vs-cod` | ✅ | |

Fallback namespace `Metadata.videoDetail` (generic) exists but is overridden per slug ✅.

### Metadata issues

#### Critical

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| C-04 | `/fr/blog`, `/ar/blog` | Meta description promises "Articles, guides et analyses" but no articles exist | Misleading SERP snippet; quality rater red flag | Noindex until publish; rewrite description to match reality or remove page from index |

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-03 | Most pages except `/videos/[slug]` | No default `openGraph.images` or `twitter.images` | Poor social CTR for branded shares | Set default OG image; per-page overrides for key landings |
| H-04 | `/fr`, `/ar` homepage titles | `themehdiceo` absent from title (only in keywords/eyebrow) | Weaker ranking for branded query "themehdiceo" | Add natural mention: e.g. "Mehdi CEO (themehdiceo) — …" without stuffing |
| H-05 | `/fr/faq`, `/fr/contact`, `/fr/blog`, `/fr/ressources` (+ AR) | Titles under 30 characters | Weak SERP differentiation vs competitors | Expand with intent: "FAQ Mehdi CEO — Ecom Billionaire & PAS High Ticket" |
| H-06 | `/fr`, `/ar` | Home meta description ~118 chars — below optimal | Truncation headroom unused; less keyword context | Expand to ~155 chars with natural branded terms |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-05 | `seo/metadata.ts` L46 | `keywords` meta tag populated on all pages | Google ignores since 2009; minor maintenance noise | Remove or keep for non-Google engines only — low priority |
| M-06 | `/fr/parcours` vs `/fr/a-propos` vs `/fr` | Overlapping descriptions mentioning septembre 2021, Ecom Billionaire, PAS High Ticket | Cannibalization for "Mehdi CEO parcours" queries | Differentiate: home = brand hub; about = biography; parcours = chronology deep-dive |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-04 | All pages | No `metadataBase` in root layout | Next.js resolves relative OG URLs inconsistently in some contexts | Set `metadataBase: new URL(siteConfig.url)` in root or locale layout |

---

## 4. On-page SEO (page-by-page)

| Page | H1 | Heading hierarchy | Intro | Internal links | Images/alt | Breadcrumbs | Content depth | Issues |
|------|----|--------------------|-------|----------------|------------|-------------|---------------|--------|
| Home | ✅ 1× "Mehdi CEO" | H2 sections (Timeline, Ecom, PAS, Videos, FAQ) | ✅ Hero + intro | ✅ CTAs to about, ecom, contact | Video thumbs alt=title ✅ | ❌ None | ✅ Substantial | FAQ schema/UI mismatch; timeline duplicates `/parcours` |
| `/a-propos` | ✅ | H2 biography sections | ✅ | Links to journey, ecom, contact | None | ✅ | ✅ Good | Overlaps `/parcours` narrative |
| `/parcours` | ✅ | H1 + TimelineSection H2 "Parcours en bref" (homepage copy) | ✅ | Timeline CTA when enabled | None | ✅ | ⚠️ Medium | **Reuses homepage timeline verbatim** — duplicate content |
| `/ecom-billionaire` | ✅ | H2 sections + disclaimer | ✅ | Links to contact, PAS | None | ✅ | ✅ Good | Strong entity page |
| `/pas-high-ticket` | ✅ | H2 via SectionHeading | ✅ | Cross-links in copy | None | ✅ | ✅ Good | Cornerstone for branded PAS queries |
| `/expertise` | ✅ | H2 grid (sr-only section title) | ✅ | Footer only inbound | None | ✅ | ⚠️ Medium | Overlaps homepage expertise themes |
| `/ressources` | ✅ (via ContentHub) | H2 link cards | ✅ | Outbound to 4 sections | None | ✅ | ❌ Thin | Hub only — ~4 links, minimal unique prose |
| `/videos` | ✅ | H3 video cards | ✅ | Cards → detail pages | Thumbnails alt ✅ | ✅ | ⚠️ Medium | Listing page adequate |
| `/videos/[slug]` | ✅ | H2 key ideas, related | ✅ | Related videos | Thumbnail alt ✅ | ✅ | ⚠️ Medium | Summaries title-derived; financial video titles need disclaimers visible |
| `/faq` | ✅ | FaqSection adds H2 from homepage namespace | ✅ | Link from home | None | ✅ | ✅ Good | Duplicate FAQ content vs home (4 of 8) |
| `/contact` | ✅ | Flat | ✅ | Social external links | None | ✅ | ⚠️ Thin | Email placeholder only |
| `/blog` | ✅ | H2 drafts list | ✅ | None to articles | None | ✅ | ❌ Thin | Draft titles only |

### Issues — On-page SEO

#### Critical

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| C-05 | `/fr`, `/ar` · `app/[locale]/page.tsx` L40–63 | FAQPage JSON-LD includes all 8 FAQs; UI renders 4 via `FaqSection limit={4}` | Google FAQ rich-result guidelines require visible content; risk of manual action or rich-result loss | Limit homepage FAQ schema to 4 visible items, or show all 8 on homepage |

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-07 | `/fr/parcours`, `/ar/parcours` | `TimelineSection` reused from homepage — identical milestone text | Duplicate content; `/parcours` may not rank independently | Expand parcours with unique narrative, sources, milestones commentary; or consolidate with `/a-propos` |
| H-08 | `/fr`, `/fr/a-propos`, `/fr/parcours` | Three URLs compete for "Mehdi CEO parcours / entrepreneur" | Keyword cannibalization | Assign clear intent: home = brand; about = bio; parcours = timeline-only with unique intro |
| H-09 | `/fr/ressources`, `/ar/ressources` | ~120 words unique content | Thin page signal | Enrich with curated descriptions, featured content blocks, or merge into homepage hub section |
| H-10 | `/fr/blog`, `/ar/blog` | Indexed placeholder | Thin content (see C-02) | Noindex + remove from nav until ready, or hide route |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-07 | `/fr/faq` · `FaqSection.tsx` | Section heading pulls `HomePage.faq` strings ("Questions fréquentes") beneath page H1 | Minor semantic duplication | Use `FaqPage`-specific heading keys on FAQ route |
| M-08 | `/fr/parcours` | Timeline section title "Parcours en bref" understates dedicated page intent | UX/SEO mismatch | Pass page-specific section title prop to `TimelineSection` |
| M-09 | Homepage | No inline link to `/expertise` or `/ressources` in body content | Weaker internal linking to supporting pages | Add contextual links from intro or expertise teaser |
| M-10 | Video pages with revenue titles | e.g. `strategie-15000-dollars-ecommerce`, `100000-dollars-depuis-zero` | YMYL-adjacent claims without inline disclaimer on page | Add short disclaimer block on financial-themed video pages (mirroring Ecom Billionaire page) |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-05 | `components/layout/Navigation.tsx` | 8 primary nav items — dense on mobile | Minor UX | Acceptable; mobile menu handles overflow |
| L-06 | `/fr/contact` | No `mailto:` or structured contactPoint | Missed LocalBusiness/Person contact rich data | Add verified email when available; optional `ContactPoint` in Person schema |

---

## 5. Entity and personal-brand SEO

### Branded entity checklist

| Entity signal | Visible text | Metadata | JSON-LD | Social links | Status |
|---------------|-------------|----------|---------|--------------|--------|
| Mehdi CEO = official public identity | ✅ Strong sitewide | ✅ Titles/descriptions | Person, WebSite, ProfilePage | LinkedIn `/in/mehdiceo/` | ✅ Good |
| themehdiceo = official digital brand | ✅ Eyebrow, @mentions, FAQ | Keywords + descriptions | ❌ Not in schema `alternateName` | Instagram/YouTube @themehdiceo | ⚠️ Schema gap |
| Ecom Billionaire ↔ Mehdi CEO | ✅ Dedicated page + home section | ✅ | Organization (external Skool URL) | Skool link via org config | ⚠️ Org URL off-site |
| PAS High Ticket = Mehdi CEO methodology | ✅ Dedicated page + home + FAQ | ✅ | In `knowsAbout` only | — | ✅ Good |
| Abandoned names excluded | ✅ No "Mehdi West" in public pages | ✅ | ✅ | ✅ | ✅ Pass |

### Issues — Entity SEO

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-11 | `seo/structured-data.ts` · Person schema | Missing `alternateName: "themehdiceo"` and `identifier` for @themehdiceo | Weaker entity reconciliation for "themehdiceo" branded search | Add `alternateName`, `url` array including domain, consistent with Google entity guidelines |
| H-12 | `seo/structured-data.ts` · Organization schema · `/ecom-billionaire` | `url` points to Skool community, not `https://themehdiceo.com/{locale}/ecom-billionaire` | Split entity signals; on-site page not linked as official Organization URL | Use on-site URL as primary `url`; add `sameAs` for Skool |
| H-13 | `seo/structured-data.ts` · WebSite schema | Name is "Mehdi CEO" only; no `alternateName` for themehdiceo | Domain brand `themehdiceo.com` not reflected in schema | Add `alternateName: "themehdiceo"` and `identifier` for the domain |
| H-14 | `seo/structured-data.ts` · ProfilePage | Nested Person lacks `sameAs`, `image`, `jobTitle` | Incomplete profile entity on `/a-propos` | Enrich `mainEntity` to match homepage Person or use `@id` reference |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-11 | `config/site.ts` L9–12 | `location.countryName: "Maroc"` configured but rarely in visible copy/metadata | Missed geo-entity signal for "Mehdi CEO Maroc" queries | Mention Marrakech/Morocco naturally on about page if accurate per owner |
| M-12 | `components/layout/Navigation.tsx` · SiteBrand | Logo text shows "Mehdi CEO" only, not themehdiceo | Minor brand handle visibility | Optional subtitle "@themehdiceo" in header |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-07 | Sitewide | No explicit "site officiel" statement in footer beyond legalNote | Minor trust for branded navigational queries | Add one line: "Site officiel de Mehdi CEO — themehdiceo.com" |

---

## 6. Structured data validation

### Schema inventory

| Page | Schema types | Validity |
|------|-------------|----------|
| Home | WebSite, Person, FAQPage | ⚠️ FAQ visibility mismatch |
| `/a-propos` | ProfilePage, BreadcrumbList | ⚠️ ProfilePage Person incomplete |
| `/ecom-billionaire` | Organization, BreadcrumbList | ⚠️ Org URL off-site |
| `/pas-high-ticket` | BreadcrumbList | ✅ |
| `/faq` | FAQPage, BreadcrumbList | ✅ (duplicate FAQ vs home — see below) |
| `/videos/[slug]` | VideoObject, BreadcrumbList | ⚠️ Missing uploadDate |
| Other static pages | BreadcrumbList only | ✅ |

### Type-by-type review

| Type | Status | Notes |
|------|--------|-------|
| **Person** | ⚠️ | Valid core; `image` 404; no `alternateName`; `worksFor` nested Organization OK |
| **WebSite** | ⚠️ | Valid; missing `alternateName`; no `potentialAction` (optional — do not add unless site search exists) |
| **ProfilePage** | ⚠️ | Valid type; under-specified `mainEntity` |
| **Organization** | ⚠️ | Valid; should reference on-site page as canonical org URL for Ecom Billionaire content |
| **FAQPage** | ⚠️ | Duplicated on home + `/faq`; home has invisible answers |
| **BreadcrumbList** | ✅ | Correct positions and URLs |
| **Article** | N/A | No published articles — correct to omit |
| **VideoObject** | ⚠️ | Missing required-recommended `uploadDate` (all videos `publishedAt: ""`); `duration` absent (optional) |

### Issues — Structured data

#### Critical

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| C-05 | (same as on-page C-05) | Homepage FAQPage / visible content mismatch | Rich result eligibility | Align schema to visible FAQs |

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-15 | `seo/structured-data.ts` L24 | Person `image` → 404 | Invalid/image warnings in Search Console | Fix asset (see C-01) |
| H-16 | All `/videos/[slug]` · `content/videos.ts` | `publishedAt` empty → VideoObject omits `uploadDate` | Incomplete video rich results | Fetch publish dates from YouTube API/oEmbed and populate |
| H-17 | `/fr`, `/ar` + `/fr/faq`, `/ar/faq` | Duplicate FAQPage with identical 8 Q&As | Redundant; not invalid but dilutes | Keep FAQPage only on `/faq`; use alternate schema on home (e.g. drop FAQ schema, keep Person/WebSite) |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-13 | Homepage | Person + WebSite + FAQPage (3 graphs) — acceptable | Multiple graphs OK | Consider `@graph` wrapper for clarity |
| M-14 | Organization schema | `EducationalOrganization` type in config comment but schema uses generic `Organization` | Minor | Use `EducationalOrganization` if accurate per owner |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-08 | VideoObject | No `inLanguage` per locale page | Minor | Add `inLanguage: fr-FR` or `ar` matching page |

---

## 7. Content architecture

### Current map

```
Home (brand hub)
├── /a-propos (biography)
├── /parcours (timeline) ← overlaps home + about
├── /ecom-billionaire (program entity)
├── /pas-high-ticket (methodology entity)
├── /expertise (topic grid)
├── /ressources (thin hub)
├── /videos → 8 video landings
├── /faq
├── /contact
└── /blog (empty — drafts only)
```

### Gap analysis

| Gap | Severity | Notes |
|-----|----------|-------|
| No dedicated "themehdiceo" brand explainer | Medium | Handle appears in copy but no focused page for navigational query |
| Blog indexed without content | Critical | See C-02 |
| `/parcours` vs `/a-propos` overlap | High | Consolidate or differentiate |
| No legal/privacy pages | High | Required for trust (especially EU/MA visitors) |
| No published long-form articles | High | Blog drafts overlap existing pages — risk of duplication when published |
| Video companion depth | Medium | Title-derived summaries; opportunity for transcript-based expansion |
| Missing FAQ clusters by topic | Low | Single FAQ page adequate for now |

### Consolidation candidates

1. **`/parcours` + timeline on homepage** — Keep homepage summary (3–4 milestones) + link to full `/parcours`; expand `/parcours` uniquely.
2. **`/ressources` + `/blog`** — Merge hub until blog launches, or noindex both until content exists.
3. **`/expertise` + homepage intro** — Keep both if expertise page adds depth; currently redundant.

See **`SEO_CONTENT_MAP.md`** for the 6-month plan.

---

## 8. Performance and Core Web Vitals

| Area | Status | Notes |
|------|--------|-------|
| Server vs client | ✅ Excellent | Pages are Server Components; only `Navigation` + `LanguageSwitcher` use `"use client"` |
| JavaScript | ✅ Minimal | next-intl client provider only |
| Images | ✅ Good | `next/image` for YouTube thumbnails; remote pattern for `i.ytimg.com` |
| Fonts | ⚠️ Moderate | Geist Sans + Geist Mono + Noto Sans Arabic (4 weights) — 3 families |
| YouTube iframes | ⚠️ Moderate | Loads on video detail pages immediately (with `loading="lazy"` only) |
| Layout shifts | ⚠️ Moderate | `aspect-video` containers help; iframe injection still causes some CLS |
| Mobile | ✅ Good | Responsive Tailwind; mobile nav via `<details>` |
| Dependencies | ✅ Lean | next, react, next-intl only |
| Oversized assets | ✅ Pass | No large local images; OG image missing not oversized |

### Issues — Performance

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-18 | `/videos/[slug]` · `YouTubeEmbed.tsx` | Full iframe loads on page load (lazy prop still sets `src`) | LCP/INP impact on mobile; third-party weight | Implement click-to-play facade (thumbnail + button → load iframe on interaction) |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-15 | `app/[locale]/layout.tsx` | Three font families loaded for all pages | FCP/font payload on Arabic pages loads Geist unnecessarily | Split fonts: Arabic pages prioritize Noto; Latin pages Geist |
| M-16 | Homepage | 3 featured video thumbnails + 6 sections | Acceptable for SSG | Preload LCP hero text; ensure hero is LCP element not images |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-09 | `YouTubeEmbed.tsx` L12–14 | `lazy` branch logic identical to non-lazy (both set src) | Dead code; misleading API | Fix or remove `lazy` prop distinction |

---

## 9. Trust and credibility

| Check | Status | Notes |
|-------|--------|-------|
| Factual sourcing | ✅ Good | `content/profile-source-of-truth.md`; video source links to YouTube |
| Financial claim wording | ⚠️ Partial | $30k and video revenue titles present; disclaimers on Ecom Billionaire page and footer legalNote; not on all financial video pages |
| Business disclaimers | ⚠️ Partial | Ecom Billionaire page strong; sitewide footer note minimal |
| Contact information | ⚠️ Partial | Social links verified; email is placeholder text |
| Privacy policy | ❌ Missing | No `/politique-de-confidentialite` or equivalent |
| Legal notices | ❌ Missing | No mentions légales / legal page |
| Author attribution | ⚠️ Partial | Mehdi CEO attributed; no bylines (no articles yet) |
| Article dates | ❌ N/A | No published articles |
| Update dates | ❌ Missing | No `dateModified` visible or in schema |
| Social profile consistency | ✅ Good | LinkedIn, Instagram, YouTube align with `siteConfig.social` and FAQ answers |

### Issues — Trust

#### High

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| H-19 | Sitewide | No privacy policy | Legal/trust requirement; AdSense/analytics blocker | Add FR + AR privacy policy pages linked from footer |
| H-20 | Sitewide | No legal mentions / imprint | Trust for commercial entity queries | Add mentions légales with owner identity as approved |
| H-21 | `/fr/contact` · `messages/*.json` ContactPage | Email placeholder instead of verified contact | Weak trust signal | Replace with owner-approved email or remove placeholder |

#### Medium

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| M-17 | Financial video pages | Revenue figures in titles without inline disclaimer | YMYL sensitivity for "Mehdi CEO e-commerce" queries | Add standard results-disclaimer block |
| M-18 | `/fr/videos` · VideosPage | `sourceNote` explains title-derived summaries ✅ | Good transparency | Keep; extend to each video page footer |

#### Low

| ID | Route / file | Problem | SEO impact | Recommended fix |
|----|--------------|---------|------------|-----------------|
| L-10 | Sitewide | No visible "last updated" date | Minor freshness signal | Add to about page when materially updated |

---

## 10. Branded search readiness scorecard

| Target query | Readiness | Top issue to fix |
|--------------|-----------|------------------|
| Mehdi CEO | 🟢 Strong | OG image |
| themehdiceo | 🟡 Moderate | Not in titles/schema `alternateName` |
| Mehdi CEO e-commerce | 🟢 Strong | Cannibalization across home/about/parcours |
| Mehdi CEO Ecom Billionaire | 🟢 Strong | Organization schema URL off-site |
| Mehdi CEO PAS High Ticket | 🟢 Strong | — |
| Mehdi CEO entrepreneur | 🟡 Moderate | Blog thin content; parcours duplication |

---

## 11. Priority remediation roadmap (do not implement yet)

### Phase 1 — Critical (week 1)
1. Add `og-image.jpg` + default OG/Twitter images
2. Noindex `/blog` (and optionally `/ressources`) until content ready
3. Fix homepage FAQ schema to match visible content
4. Add staging/preview `noindex` guard

### Phase 2 — High (weeks 2–4)
5. Enrich entity schema (`alternateName`, on-site Organization URL)
6. Expand short page titles (FAQ, contact, blog, ressources)
7. Differentiate `/parcours` content from homepage timeline
8. Add privacy + legal pages
9. YouTube facade loading + populate `uploadDate`
10. Remove duplicate FAQPage from homepage

### Phase 3 — Medium (month 2+)
11. Launch first 3–4 blog articles per content map (no duplication)
12. Strengthen internal linking to `/expertise`
13. Add financial disclaimers on revenue-themed video pages
14. Font loading optimization

---

## Appendix A — Full URL inventory (38 pages)

| # | URL pattern | FR | AR |
|---|-------------|----|----|
| 1 | Homepage | `/fr` | `/ar` |
| 2 | About | `/fr/a-propos` | `/ar/a-propos` |
| 3 | Journey | `/fr/parcours` | `/ar/parcours` |
| 4 | Ecom Billionaire | `/fr/ecom-billionaire` | `/ar/ecom-billionaire` |
| 5 | PAS High Ticket | `/fr/pas-high-ticket` | `/ar/pas-high-ticket` |
| 6 | Expertise | `/fr/expertise` | `/ar/expertise` |
| 7 | Resources | `/fr/ressources` | `/ar/ressources` |
| 8 | Videos hub | `/fr/videos` | `/ar/videos` |
| 9–16 | Video slugs (×2) | `/fr/videos/{slug}` | `/ar/videos/{slug}` |
| 17 | FAQ | `/fr/faq` | `/ar/faq` |
| 18 | Contact | `/fr/contact` | `/ar/contact` |
| 19 | Blog | `/fr/blog` | `/ar/blog` |

Video slugs: `histoire-premiers-10000-dollars`, `strategie-15000-dollars-ecommerce`, `100000-dollars-depuis-zero`, `reussir-business-ecommerce`, `abandon-etudes-ecommerce`, `erreur-debutants-ecommerce`, `verite-ecommerce`, `dropshipping-vs-cod`

---

## Appendix B — Validation commands

```
npm run lint          ✅ Pass (2026-08-02)
npx tsc --noEmit      ✅ Pass (2026-08-02)
npm run build         ✅ Pass — 43 routes, 38 locale content pages (2026-08-02)
```

---

*End of audit. See `SEO_CONTENT_MAP.md` for the 6-month content architecture proposal.*
