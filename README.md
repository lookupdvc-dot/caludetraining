# Sterling & Vale Advisory

A static wealth advisory one-pager built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Features a red theme, a lead-magnet contact section wired to FormSubmit, a floating WhatsApp widget, and social sharing.

**Live site:** https://lookupdvc-dot.github.io/caludetraining/

![Site preview](screenshots/preview.png)

## Sections

| Section | Content |
|---|---|
| Hero | Headline, trust stats ($2B+ advised, 20+ years, 98% retention), CTA, save button |
| Services | Wealth Planning, Retirement Strategy, Portfolio Management, Estate Planning |
| About | Firm story and fee-only fiduciary values |
| Testimonials | Auto-advancing carousel (3 client quotes, 5-second interval) |
| Share strip | LinkedIn, Twitter/X, WhatsApp, and copy-link sharing buttons |
| Contact | Two-column lead magnet — value proposition + enquiry form (FormSubmit AJAX) |
| Footer | Brand, nav links, social media icons (LinkedIn, Twitter/X, Facebook, Instagram) |
| WhatsApp Widget | Floating chatbot (bottom-right) with 4 suggested query chips |

## Files

| File | Purpose |
|---|---|
| `index.html` | All markup |
| `styles.css` | All styles — CSS custom properties, responsive layout, animations |
| `script.js` | Navbar, scroll animations, carousel, form logic, share strip, WhatsApp widget |
| `.github/workflows/deploy.yml` | GitHub Actions deploy pipeline |
| `.claude/skills/frontend-design.md` | Claude skill: audit and improve frontend design |
| `.claude/skills/seo-audit.md` | Claude skill: audit and fix on-page SEO |
| `.claude/skills/digital-marketing.md` | Claude skill: social links, sharing, and digital marketing audit |

## Running Locally

A local HTTP server is required (the form uses `fetch`, which is blocked on `file://`):

```bash
python -m http.server 3000
```

Then open http://localhost:3000

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. The workflow (`deploy.yml`) uploads the entire repo root as the Pages artifact — no build step required.

Live URL: https://lookupdvc-dot.github.io/caludetraining/
