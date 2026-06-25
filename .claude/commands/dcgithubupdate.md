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

Use PowerShell (git is available globally):

```powershell
Set-Location "c:\Users\Dinesh\Claude Training"

# Show what will be committed
git status
git diff --stat

# Stage all relevant changes
git add index.html styles.css script.js README.md .github/ .claude/

# Commit only if there are staged changes
$staged = git diff --cached --stat
if ($staged) {
  git commit -m "chore: update site and docs"
  "Commit created: $(git rev-parse --short HEAD)"
} else {
  "Nothing to commit — working tree is clean."
}

# Push to origin main
git push origin main
```

After pushing, report the commit hash and confirm "Pushed to GitHub successfully."

---

## Step 4 — Confirm GitHub Pages Deployment

The `deploy.yml` workflow triggers automatically on every push to `main`. Check its status via the GitHub REST API (no auth needed for public repos):

```powershell
$runs = Invoke-RestMethod -Uri "https://api.github.com/repos/lookupdvc-dot/caludetraining/actions/runs?per_page=1" -Headers @{ "User-Agent" = "curl/7.0" }
$r = $runs.workflow_runs[0]
"Name:       $($r.name)"
"Status:     $($r.status)"
"Conclusion: $($r.conclusion)"
"Created:    $($r.created_at)"
"URL:        $($r.html_url)"
```

- If status is `in_progress` or `queued`: "GitHub Pages deployment is in progress — the live site will update in ~30–60 seconds at https://lookupdvc-dot.github.io/caludetraining/"
- If status is `completed` and conclusion is `success`: "GitHub Pages is live at https://lookupdvc-dot.github.io/caludetraining/"
- If conclusion is `failure`: report the URL and tell the user to check the Actions log.

---

## Step 5 — Update Repository Metadata

Use PowerShell and the GitHub REST API (gh CLI is not installed in this environment).

First read current metadata to check what's already set:

```powershell
$repo = Invoke-RestMethod -Uri "https://api.github.com/repos/lookupdvc-dot/caludetraining" -Headers @{ "User-Agent" = "curl/7.0" }
"Description: $($repo.description)"
"Homepage:    $($repo.homepage)"
"Topics:      $($repo.topics -join ', ')"
```

If description or homepage are missing/wrong, update them (requires `$env:GITHUB_TOKEN`):

```powershell
if ($env:GITHUB_TOKEN) {
  $body = @{
    description = "Sterling & Vale Advisory — a static wealth advisory one-pager built with vanilla HTML, CSS, and JavaScript."
    homepage    = "https://lookupdvc-dot.github.io/caludetraining/"
  } | ConvertTo-Json
  Invoke-RestMethod -Method PATCH `
    -Uri "https://api.github.com/repos/lookupdvc-dot/caludetraining" `
    -Headers @{ Authorization = "Bearer $env:GITHUB_TOKEN"; "User-Agent" = "curl/7.0" } `
    -Body $body -ContentType "application/json"

  $topicsBody = @{ names = @("html","css","javascript","github-pages") } | ConvertTo-Json
  Invoke-RestMethod -Method PUT `
    -Uri "https://api.github.com/repos/lookupdvc-dot/caludetraining/topics" `
    -Headers @{ Authorization = "Bearer $env:GITHUB_TOKEN"; "User-Agent" = "curl/7.0"; Accept = "application/vnd.github.mercy-preview+json" } `
    -Body $topicsBody -ContentType "application/json"

  "Repository description, homepage, and topics updated."
} else {
  "GITHUB_TOKEN not set — skipping write operations. To enable:"
  "  1. Create a token at https://github.com/settings/tokens (needs repo scope)"
  "  2. Set it: `$env:GITHUB_TOKEN = 'ghp_...'"
  "  Or install gh CLI: https://cli.github.com and run: gh auth login"
  "  Current repo metadata (read-only check above) was shown."
}
```

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
