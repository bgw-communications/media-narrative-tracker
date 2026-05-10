# GitHub Pages Setup Guide

Use this guide to deploy the Media Narrative Monitor as a GitHub Pages dashboard.

---

## 1. Upload files to your repo

Upload the full project folder into the root of your repository.

The root should include:

```text
index.html
style.css
script.js
data/
scripts/
docs/
.github/
```

Do not place the files inside an extra nested folder, otherwise GitHub Pages may not find `index.html`.

---

## 2. Enable GitHub Pages

In your GitHub repo:

1. Go to **Settings**
2. Click **Pages** in the left sidebar
3. Under **Build and deployment**, set:
   - Source: **GitHub Actions**
4. Save the setting

---

## 3. Enable GitHub Actions permissions

The daily update workflow needs permission to commit the updated article data back to the repo.

Go to:

```text
Settings → Actions → General → Workflow permissions
```

Select:

```text
Read and write permissions
```

Then save.

---

## 4. Run the first update manually

Go to:

```text
Actions → Daily media narrative update → Run workflow
```

This will trigger the first article fetch and dashboard deployment.

---

## 5. Open the dashboard

After the workflow finishes, open:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

If your repo is under an organization, use:

```text
https://ORG_NAME.github.io/REPO_NAME/
```

---

## 6. Recommended repo settings

Recommended setup:

- Repo visibility: Private or internal, unless the dashboard is intended to be public
- GitHub Pages source: GitHub Actions
- Workflow permissions: Read and write
- Branch: `main`

---

## 7. Update frequency

The workflow schedule is defined in:

```text
.github/workflows/daily-news.yml
```

Default schedule:

```yaml
schedule:
  - cron: "0 1 * * *"
```

This runs once per day at 01:00 UTC.

You can adjust the cron time based on your preferred monitoring window.
