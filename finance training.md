# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Sterling & Vale Advisory** — a static one-page investment advisory website. No build tools, no frameworks, no dependencies. Vanilla HTML/CSS/JS only.

## Running locally

Open via a local HTTP server (required for the FormSubmit AJAX call — `file://` blocks cross-origin fetch):

```bash
# Python (available on this machine)
python -m http.server 3000
# then open http://localhost:3000
```

There are no build, lint, or test commands — this is a pure static site.

## Architecture

Three files, each self-contained:

- **[index.html](index.html)** — all markup. Sections in DOM order: `#navbar` → `#home` (hero) → `.services` (no anchor) → `#about` → `#testimonials` → `#contact` → `<footer>`. The services section intentionally has no nav anchor; the nav links are Home/About/Testimonials/Contact only.
- **[styles.css](styles.css)** — structured in 15 numbered blocks matching section order. All colours, spacing, and typography tokens live in `:root` custom properties at the top of the file — change palette values there, not inline.
- **[script.js](script.js)** — four IIFEs in order: `initNavbar`, `initFadeAnimations`, `initCarousel`, `initForm`, plus a footer-year one-liner. Each IIFE is fully self-contained with its own DOM queries.

## Key conventions

**CSS tokens** (styles.css `:root`): `--navy` / `--navy-light` / `--navy-mid` are the three hero gradient stops. `--gold` / `--gold-light` are the accent. `--nav-height: 76px` is referenced by both the navbar height and `scroll-padding-top` on `html`, and by `.hero-content`'s `padding-top` — if you change navbar height, update this one variable.

**Scroll animations**: add class `fade-up` to any element in HTML; `initFadeAnimations` in script.js picks it up automatically via `IntersectionObserver`. CSS handles the transition; JS only adds `.visible`. Stagger delays for service cards are in styles.css via `:nth-child` selectors.

**Carousel**: slides are `.carousel-slide` children of `#carousel-track`. To add/remove a slide, edit the HTML — the JS counts `slides.length` dynamically and builds dots to match. No hardcoded slide count anywhere.

**Form submission**: POSTs JSON to `https://formsubmit.co/ajax/lookupdvc@gmail.com`. Required fields validated in JS before fetch: name (non-empty), email (regex), message (non-empty). The `_honey` input is the spam honeypot — keep it empty and hidden via CSS (`position: absolute; left: -9999px`). On success the form element is hidden and `#form-success` is shown; on network/API error `#form-error` is shown and the button re-enables.

**FormSubmit activation**: the very first submission to a new email triggers a confirmation email from FormSubmit. The form only delivers after clicking that activation link.

## Responsive breakpoints

- `≤ 768px`: hamburger menu, single-column about grid, single-column form rows
- `≤ 480px`: trust stats stack vertically, hero text centred
