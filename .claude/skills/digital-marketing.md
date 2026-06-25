# Digital Marketing Audit Skill

Audit and improve the digital marketing presence of the Sterling & Vale Advisory site. Apply all safe, client-side fixes directly to `index.html`, `styles.css`, and `script.js`. Flag anything that requires third-party accounts, server-side setup, or off-page action.

**Live site:** https://lookupdvc-dot.github.io/caludetraining/

---

## What this skill does

Run this skill when you want to:
- Add social media profile links (LinkedIn, Twitter/X, Facebook, Instagram)
- Add social sharing buttons so visitors can share the page
- Add like / save / bookmark micro-interactions
- Audit and strengthen digital marketing signals (analytics, lead capture, trust badges)
- Improve conversion touchpoints across the funnel

---

## Step 1 — Read current state

```bash
cat index.html
cat styles.css
cat script.js
```

---

## Step 2 — Audit checklist

Work through every item. Mark each: ✓ pass, ✗ fail (fix it), ⚠ needs manual action.

### Social media links
- Footer contains links to LinkedIn, Twitter/X, and at least one other platform (Facebook or Instagram).
- Each link opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Each link has an accessible `aria-label` (e.g. `aria-label="Sterling & Vale on LinkedIn"`).
- Icons are SVG inline (not an external icon font) and `aria-hidden="true"`.
- Links are real placeholders pointing to `https://www.linkedin.com/company/sterling-vale-advisory`, etc. (adjust if firm has real profiles).

### Social sharing buttons
- A sharing strip is present — either inline after a section or as a sticky side element.
- Minimum platforms: LinkedIn Share, Twitter/X Share, WhatsApp Share, and a native Web Share API fallback.
- Share URLs are constructed dynamically from `window.location.href` and a short `og:title` text.
- Strip is not shown if `navigator.share` is the only method available AND the browser doesn't support it.
- Buttons are accessible: `role="link"` or `<a>`, descriptive `aria-label="Share on LinkedIn"`.

### Like / save interaction
- A lightweight "Save this page" or heart-like button exists in the hero or trust bar.
- State persists in `localStorage` (toggled on/off per visit).
- Aria label updates: `aria-label="Saved"` / `aria-label="Save this page"` on toggle.
- No third-party dependency required.

### Analytics & tracking
- A Google Analytics 4 (GA4) `<script>` tag is present in `<head>` (or flagged as ⚠ if measurement ID is unknown).
- The form submission in `script.js` fires a `gtag('event', 'generate_lead', {...})` call after success.
- WhatsApp widget click fires a `gtag('event', 'whatsapp_click', {...})` call.

### Lead magnet / email capture
- The contact form has a clear value statement above it (already exists — verify it matches the checklist from `frontend-design`).
- A secondary micro-opt-in exists (e.g. a sticky bottom banner: "Download our free Wealth Checklist — no spam, unsubscribe anytime") — if absent, note as ⚠ (requires Mailchimp / ConvertKit integration).

### Social proof & trust signals
- At least one third-party review badge placeholder is present (e.g. Google Reviews, Trustpilot) — even a static badge is acceptable for a demo.
- The footer or about section mentions a professional body membership (e.g. FCA, CISI, CFP) — if missing, add placeholder text.

### Open Graph completeness (cross-reference with seo-audit)
- `og:image` is set and the asset exists at the referenced path.
- `twitter:card`, `twitter:title`, `twitter:description` meta tags are present.
- `twitter:site` is set (e.g. `@SterlingValeAdv`) — flag as ⚠ if no Twitter handle exists.

---

## Step 3 — Apply fixes

### 3a — Social media links in footer

Add to the footer in `index.html`, inside `.footer-main`, before `<p class="footer-copy">`:

```html
<div class="footer-social" aria-label="Follow us on social media">
  <!-- LinkedIn -->
  <a href="https://www.linkedin.com/company/sterling-vale-advisory"
     target="_blank" rel="noopener noreferrer"
     aria-label="Sterling &amp; Vale Advisory on LinkedIn" class="social-link">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
  <!-- Twitter / X -->
  <a href="https://twitter.com/SterlingValeAdv"
     target="_blank" rel="noopener noreferrer"
     aria-label="Sterling &amp; Vale Advisory on X (Twitter)" class="social-link">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.852L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  <!-- Facebook -->
  <a href="https://www.facebook.com/SterlingValeAdvisory"
     target="_blank" rel="noopener noreferrer"
     aria-label="Sterling &amp; Vale Advisory on Facebook" class="social-link">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
  <!-- Instagram -->
  <a href="https://www.instagram.com/sterlingvaleadvisory"
     target="_blank" rel="noopener noreferrer"
     aria-label="Sterling &amp; Vale Advisory on Instagram" class="social-link">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </a>
</div>
```

### 3b — Social sharing strip

Add a sharing strip after the testimonials section and before the contact section in `index.html`:

```html
<!-- ==================== SOCIAL SHARE STRIP ==================== -->
<div class="share-strip" aria-label="Share this page">
  <div class="container share-strip-inner">
    <span class="share-label">Share this page</span>
    <div class="share-buttons" role="list">
      <a href="#" class="share-btn share-btn--linkedin" id="share-linkedin"
         target="_blank" rel="noopener noreferrer" role="listitem"
         aria-label="Share on LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="#" class="share-btn share-btn--twitter" id="share-twitter"
         target="_blank" rel="noopener noreferrer" role="listitem"
         aria-label="Share on X (Twitter)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.852L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Twitter / X
      </a>
      <a href="#" class="share-btn share-btn--whatsapp" id="share-whatsapp"
         target="_blank" rel="noopener noreferrer" role="listitem"
         aria-label="Share via WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      <button class="share-btn share-btn--copy" id="share-copy" aria-label="Copy page link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Copy link
      </button>
    </div>
  </div>
</div>
```

### 3c — Like / save button in hero

Add inside the hero `.hero-text` div, after the CTA button:

```html
<button class="hero-save-btn" id="save-btn" aria-label="Save this page" aria-pressed="false">
  <svg class="save-icon save-icon--outline" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  <svg class="save-icon save-icon--filled" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  <span class="save-label">Save for later</span>
</button>
```

### 3d — Twitter card meta tags

Add inside `<head>` after the existing OG tags:

```html
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:site"        content="@SterlingValeAdv" />
<meta name="twitter:title"       content="Independent Wealth Management — Sterling &amp; Vale Advisory" />
<meta name="twitter:description" content="Fee-only, fiduciary wealth management for professionals and families. Book a complimentary 45-minute strategy session today." />
<meta name="twitter:image"       content="https://lookupdvc-dot.github.io/caludetraining/screenshots/preview.png" />
```

### 3e — GA4 placeholder tag

Add as the FIRST child inside `<head>` (replace `G-XXXXXXXXXX` with real Measurement ID):

```html
<!-- Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3f — CSS for new elements

Add to `styles.css`:

```css
/* ── Social links (footer) ─────────────────────────────────── */
.footer-social {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: #ccc;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.social-link:hover,
.social-link:focus-visible {
  background: var(--gold);
  color: var(--navy);
  transform: translateY(-2px);
  outline: none;
}

/* ── Share strip ───────────────────────────────────────────── */
.share-strip {
  background: var(--navy-light);
  border-top: 1px solid rgba(255,255,255,0.07);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 1rem 0;
}
.share-strip-inner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.share-label {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.55);
  white-space: nowrap;
}
.share-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid transparent;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s;
}
.share-btn:hover { opacity: 0.85; transform: translateY(-1px); }
.share-btn--linkedin  { background: #0077B5; color: #fff; }
.share-btn--twitter   { background: #000;    color: #fff; }
.share-btn--whatsapp  { background: #25D366; color: #fff; }
.share-btn--copy      { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.15); }
.share-btn--copy.copied { background: var(--gold); color: var(--navy); }

/* ── Hero save / like button ───────────────────────────────── */
.hero-save-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1rem;
  background: none;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.hero-save-btn:hover,
.hero-save-btn:focus-visible {
  border-color: #e85d8a;
  color: #e85d8a;
  background: rgba(232,93,138,0.08);
  outline: none;
}
.hero-save-btn[aria-pressed="true"] .save-icon--outline  { display: none; }
.hero-save-btn[aria-pressed="false"] .save-icon--filled  { display: none; }
.hero-save-btn[aria-pressed="true"] { border-color: #e85d8a; color: #e85d8a; }
.save-icon--filled { color: #e85d8a; }

@media (max-width: 768px) {
  .share-strip-inner { gap: 0.75rem; }
  .share-label { width: 100%; }
}
```

### 3g — JS for share strip and save button

Add to `script.js`:

```js
// ── Social share strip ──────────────────────────────────────
(function () {
  var url   = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);

  var li = document.getElementById('share-linkedin');
  var tw = document.getElementById('share-twitter');
  var wa = document.getElementById('share-whatsapp');
  if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
  if (tw) tw.href = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  if (wa) wa.href = 'https://api.whatsapp.com/send?text=' + title + '%20' + url;

  var copyBtn = document.getElementById('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        copyBtn.classList.add('copied');
        copyBtn.querySelector('.save-label') && (copyBtn.querySelector('.save-label').textContent = 'Copied!');
        copyBtn.lastChild.textContent = 'Copied!';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.lastChild.textContent = 'Copy link';
        }, 2000);
      });
    });
  }
})();

// ── Hero save / like button ─────────────────────────────────
(function () {
  var btn = document.getElementById('save-btn');
  if (!btn) return;
  var saved = localStorage.getItem('sv-page-saved') === '1';
  btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
  btn.querySelector('.save-label').textContent = saved ? 'Saved!' : 'Save for later';

  btn.addEventListener('click', function () {
    saved = !saved;
    localStorage.setItem('sv-page-saved', saved ? '1' : '0');
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    btn.querySelector('.save-label').textContent = saved ? 'Saved!' : 'Save for later';
  });
})();
```

---

## Step 4 — Off-page and account-level recommendations

Items this skill cannot fix automatically — report as ⚠:

| Item | Action needed |
|------|---------------|
| GA4 Measurement ID | Create a GA4 property at analytics.google.com; replace `G-XXXXXXXXXX` |
| Social profile pages | Create LinkedIn Company, Twitter/X, Facebook, and Instagram accounts for Sterling & Vale Advisory |
| Twitter handle | Register `@SterlingValeAdv` and update the `twitter:site` meta tag |
| Email newsletter | Set up Mailchimp/ConvertKit; add subscribe form to add a secondary lead-capture touchpoint |
| Google Business Profile | Claim listing at business.google.com for local search visibility |
| Review badges | Create a Google Reviews widget link after collecting 5+ reviews |
| `og:image` asset | Upload a 1200×630 screenshot as `/screenshots/preview.png` (referenced in twitter:image) |
| LinkedIn Insight Tag | Add pixel for B2B retargeting once LinkedIn page is created |

---

## Step 5 — Report

```
Digital Marketing Audit — Complete
──────────────────────────────────────
✓ Social links       LinkedIn, Twitter/X, Facebook, Instagram in footer
✓ Share strip        LinkedIn, Twitter/X, WhatsApp, Copy link — dynamic URLs
✓ Save button        Hero heart-like toggle with localStorage persistence
✓ Twitter cards      twitter:card, twitter:site, twitter:title, twitter:image added
⚠ GA4 tracking       Placeholder added — Measurement ID needs replacing
⚠ Social profiles    Accounts must be created manually
⚠ Email newsletter   Requires Mailchimp/ConvertKit integration
⚠ og:image asset     preview.png must be uploaded to /screenshots/

Fixes applied to: index.html, styles.css, script.js
```
