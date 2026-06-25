# Frontend Design Skill

Analyse and improve the frontend design of the Sterling & Vale Advisory site (`index.html`, `styles.css`) with a focus on conversion, visual quality, and audience engagement. Apply changes directly to the files — do not just list suggestions.

---

## What this skill does

Run this skill when you want to:
- Audit design quality, visual hierarchy, and whitespace
- Improve conversion rate of the lead magnet contact section
- Ensure the purple theme is consistently applied
- Tighten typography, spacing, or responsive behaviour
- Add or refine micro-interactions and animations

---

## Step 1 — Read current state

Read all three source files before touching anything:

```bash
cat index.html
cat styles.css
cat script.js
```

---

## Step 2 — Design audit

Check each area against these criteria:

### Visual hierarchy
- Is the hero headline the most prominent element on the page?
- Does the eye flow naturally: hero → services → about → testimonials → contact?
- Are section eyebrows (small uppercase labels) consistent in size, colour, and spacing?

### Purple theme consistency
- All primary backgrounds (hero, navbar, testimonials, footer) must use `--navy` (`#1e0a4e`), `--navy-light`, or `--navy-mid`.
- Accent colour is `--gold` (`#b5924c`) for warmth and `--purple-vivid` (`#7c3aed`) for interactive elements and benefit icons.
- No leftover blue (`#1a2744`, `#243356`, `#1e3a5f`) should remain anywhere.

### Lead magnet contact section
- Left column must show: eyebrow → headline → value paragraph → 3 benefit bullets → urgency notice → mini testimonial.
- Right column is the form card (white, elevated shadow, purple border tint).
- CTA button text: "Claim My Free Strategy Session →"
- Trust line below button: shield icon + privacy assurance.

### Typography
- Headings use `Playfair Display` (serif). Body uses `Inter` (sans-serif).
- `clamp()` used for all headings so they scale across screen sizes.
- Line-height: 1.65 body, 1.1–1.2 headings.

### Spacing
- Sections have `padding: 5.5rem 0`.
- Consistent `gap` values: 1.5rem cards, 4rem grid columns, 2–3rem mobile.

### Responsive
- Single-column layout below 768px for all grids (`.contact-grid`, `.about-grid`, `.services-grid`).
- Trust bar stacks vertically below 480px.
- Hamburger menu appears below 768px.

---

## Step 3 — Apply fixes

Fix every issue found. Common tasks and how to handle them:

**Inconsistent colour** — edit the `:root` custom properties or the specific rule using the old value.

**Weak CTA copy** — update `index.html` text directly; do not add a comment.

**Missing hover state** — add a `:hover` / `:focus-visible` rule in `styles.css`.

**Layout breaks on mobile** — add or correct the `@media (max-width: 768px)` rule.

**Animation not triggering** — check the `.fade-up` / `.visible` logic in `script.js`.

---

## Step 4 — Report

After applying all fixes, print a concise summary:

```
Frontend Design Audit — Complete
─────────────────────────────────
✓ Purple theme    Consistent across all sections
✓ Contact section Two-column lead magnet layout intact
✓ Typography      clamp() scaling applied to all headings
✓ Responsive      Single-column below 768px confirmed
✓ Fixes applied   <list what changed>
```

If anything could not be fixed automatically (e.g. missing assets, server-side requirements), mark it `⚠` and explain what the user needs to do manually.
