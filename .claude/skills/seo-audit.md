# SEO Audit Skill

Audit and improve the on-page SEO of the Sterling & Vale Advisory site. Apply all safe fixes directly to `index.html`; document anything that requires server-side or off-page action.

**Target email for enquiries:** lookupdvc@gmail.com  
**Live site:** https://lookupdvc-dot.github.io/caludetraining/

---

## Step 1 — Read the source

```bash
cat index.html
```

---

## Step 2 — Audit checklist

Work through every item. Mark each: ✓ pass, ✗ fail (fix it), ⚠ needs manual action.

### Title & meta description
- `<title>` is 50–60 characters, includes primary keyword ("wealth management" or "financial advisory") and location if relevant.
- `<meta name="description">` is 140–160 characters, contains a clear value proposition and a soft call to action.
- Neither is duplicated or missing.

### Open Graph / social tags
- `og:title`, `og:description`, `og:type` are present and correct.
- `og:image` exists and points to a real image (1200×630px ideal). If missing, note it as ⚠.
- `og:url` is set to the canonical live URL.

### Heading structure
- Exactly one `<h1>` on the page (hero headline).
- `<h2>` for each section heading (Services, About, Testimonials, Contact).
- `<h3>` for service card titles and other sub-headings.
- No heading levels skipped.

### Keyword presence
- Primary keyword phrase (e.g. "independent wealth management" or "wealth advisory") appears in: `<h1>`, at least one `<h2>`, the meta description, and naturally in body copy.
- No keyword stuffing (same phrase repeated more than 3× in a single paragraph).

### Structured data (JSON-LD)
- A `LocalBusiness` or `FinancialService` schema block is present in `<head>` or before `</body>`.
- If absent, add a minimal block (see Step 3).

### Image alt text
- Every `<img>` has a descriptive `alt` attribute.
- Decorative images (SVG icons) have `aria-hidden="true"` and no `alt` or empty `alt=""`.

### Canonical tag
- `<link rel="canonical" href="https://lookupdvc-dot.github.io/caludetraining/">` is present in `<head>`.

### Page speed signals (static checks)
- Font preconnect links are present (`fonts.googleapis.com`, `fonts.gstatic.com`).
- No render-blocking `<script>` tags in `<head>` without `defer` or `async`.
- CSS is in `<head>`, JS is at end of `<body>` or deferred.

### Mobile friendliness
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.

### Contact / local signals
- The contact section includes a clear email or phone (even if via form).
- Location signals exist in testimonial author attributions or footer copy.

---

## Step 3 — Apply fixes

Fix every ✗ finding directly in `index.html`. Common fixes:

**Missing/weak title:**
```html
<title>Independent Wealth Management — Sterling &amp; Vale Advisory</title>
```

**Weak meta description:**
```html
<meta name="description" content="Sterling &amp; Vale Advisory offers fee-only, fiduciary wealth management for professionals and families. Book a complimentary 45-minute strategy session today." />
```

**Missing canonical:**
```html
<link rel="canonical" href="https://lookupdvc-dot.github.io/caludetraining/" />
```

**Missing og:url and og:image:**
```html
<meta property="og:url"   content="https://lookupdvc-dot.github.io/caludetraining/" />
<meta property="og:image" content="https://lookupdvc-dot.github.io/caludetraining/screenshots/preview.jpg" />
```

**Missing JSON-LD structured data** — add before `</body>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Sterling & Vale Advisory",
  "description": "Independent, fee-only wealth management for professionals and families.",
  "url": "https://lookupdvc-dot.github.io/caludetraining/",
  "serviceType": ["Wealth Planning", "Retirement Strategy", "Portfolio Management", "Estate Planning"],
  "areaServed": "GB",
  "offers": {
    "@type": "Offer",
    "name": "Complimentary Wealth Strategy Session",
    "price": "0",
    "priceCurrency": "GBP"
  }
}
</script>
```

**Heading hierarchy fix** — if `<h2>` is used where `<h3>` is correct, or vice versa, update the tag in `index.html`.

---

## Step 4 — Off-page and server-side recommendations

Items this skill cannot fix automatically — report these as ⚠:

| Item | Action needed |
|------|---------------|
| `og:image` asset | Upload a 1200×630 screenshot to `/screenshots/preview.jpg` |
| `sitemap.xml` | Generate and submit to Google Search Console |
| `robots.txt` | Add `User-agent: *\nAllow: /` at repo root |
| Google Search Console | Verify ownership and submit the canonical URL |
| Page speed (Core Web Vitals) | Run Lighthouse in Chrome DevTools; target LCP < 2.5s |
| Backlinks | Acquire citations from local business directories and financial press |

---

## Step 5 — Report

```
SEO Audit — Complete
──────────────────────────────────────
✓ Title & meta       Keyword-rich, within character limits
✓ OG tags            All present including og:image
✓ Heading structure  Single h1, logical h2/h3 hierarchy
✓ Canonical          Set to live URL
✓ JSON-LD            FinancialService schema added
✓ Mobile viewport    Present
⚠ Sitemap            Must be created and submitted manually
⚠ Backlinks          Off-page — requires manual outreach

Fixes applied: <list exactly what changed in index.html>
```
