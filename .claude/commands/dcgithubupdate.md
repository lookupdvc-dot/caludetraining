# DC GitHub Update

Full deployment workflow: security scan → update README → push to GitHub → deploy GitHub Pages → update repo metadata.

**Repo:** `https://github.com/lookupdvc-dot/caludetraining`
**Live site:** `https://lookupdvc-dot.github.io/caludetraining/`

---

## Step 1 — Security Scan

Scan all tracked source files for sensitive information before anything is pushed. Run the following checks and **halt with a clear error if any issue is found**:

```bash
# 1a. Check for secret patterns in source files (exclude .git, node_modules)
grep -rn \
  -e "password\s*=\s*['\"][^'\"]\+['\"]" \
  -e "api[_-]key\s*=\s*['\"][^'\"]\+['\"]" \
  -e "secret\s*=\s*['\"][^'\"]\+['\"]" \
  -e "token\s*=\s*['\"][^'\"]\+['\"]" \
  -e "AKIA[0-9A-Z]\{16\}" \
  -e "-----BEGIN \(RSA \|EC \|\)PRIVATE KEY-----" \
  -e "sk-[a-zA-Z0-9]\{20,\}" \
  --include="*.html" --include="*.js" --include="*.css" \
  --include="*.json" --include="*.yml" --include="*.yaml" \
  --include="*.env*" --include="*.config.*" \
  . 2>/dev/null | grep -v "node_modules" | grep -v ".git"
```

```bash
# 1b. List any .env files or credential files that should never be committed
git ls-files | grep -E "\.(env|pem|key|p12|pfx|credentials|secret)$"
```

```bash
# 1c. Check git status for untracked sensitive files that might get added accidentally
git status --short | grep -E "\.env|\.pem|\.key|credentials|secret|password"
```

If any of the above return results, **stop immediately** and report exactly what was found and in which file/line. Do not proceed until the user resolves each finding.

If the scan is clean, report: "Security scan passed — no sensitive data detected."

---

## Step 2 — Update README

Read the current state of the project files (`index.html`, `styles.css`, `script.js`, `.github/workflows/deploy.yml`) and regenerate `README.md` so it accurately reflects the project. The README must include:

- Project title and one-line description
- `**Live site:**` link → `https://lookupdvc-dot.github.io/caludetraining/`
- Sections overview (what's on the page)
- Files table (`index.html`, `styles.css`, `script.js`)
- Running locally instructions (`python -m http.server 3000`)
- Deployment section explaining the GitHub Actions auto-deploy on push to `main`

Write the updated content to `README.md`. Keep it concise — no more than 50 lines.

---

## Step 3 — Stage, Commit & Push

```bash
# Show what will be committed
git status
git diff --stat

# Stage all changes (source files + README)
git add index.html styles.css script.js README.md .github/

# If there are staged changes, commit them
git diff --cached --quiet || git commit -m "chore: update site and docs

$(git diff --cached --stat | tail -5)"

# Push to origin main
git push origin main
```

After pushing, report the commit hash and confirm "Pushed to GitHub successfully."

---

## Step 4 — Confirm GitHub Pages Deployment

The `deploy.yml` workflow triggers automatically on every push to `main`. Confirm it was triggered:

```bash
# Check the latest workflow run status (requires gh CLI)
gh run list --workflow=deploy.yml --limit=1
```

Report the run status. If it shows `in_progress` or `queued`, tell the user: "GitHub Pages deployment is in progress — the live site will update in ~30–60 seconds at https://lookupdvc-dot.github.io/caludetraining/"

If it shows `completed` / `success`, tell the user the site is already live.

---

## Step 5 — Update Repository Metadata

Set the GitHub repo description and homepage URL using the `gh` CLI:

```bash
gh repo edit lookupdvc-dot/caludetraining \
  --description "Sterling & Vale Advisory — a static wealth advisory one-pager built with vanilla HTML, CSS, and JavaScript." \
  --homepage "https://lookupdvc-dot.github.io/caludetraining/" \
  --add-topic "html" \
  --add-topic "css" \
  --add-topic "javascript" \
  --add-topic "github-pages"
```

Confirm: "Repository About section and live site URL updated on GitHub."

---

## Summary Report

After all steps complete, print a summary:

```
DC GitHub Update — Complete
───────────────────────────
✓ Security scan   No sensitive data found
✓ README          Updated and committed
✓ Git push        Pushed to origin/main (commit: <hash>)
✓ GitHub Pages    Deployment triggered — live at https://lookupdvc-dot.github.io/caludetraining/
✓ Repo metadata   Description and homepage URL set
```

If any step failed, mark it with `✗` and explain what the user needs to fix.
