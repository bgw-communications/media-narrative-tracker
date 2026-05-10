# GitHub Pages Setup

## 1. Upload files

Upload all files in this folder to the root of your GitHub repo.

Recommended repo name:

```text
media-narrative-monitor
```

## 2. Enable GitHub Pages

Go to:

```text
Settings → Pages
```

Under **Build and deployment**, select:

```text
Source: GitHub Actions
```

## 3. Confirm workflow

The repo includes:

```text
.github/workflows/pages.yml
```

After you push to `main`, GitHub Actions will publish the static dashboard.

## 4. Dashboard URL

The URL will usually be:

```text
https://YOUR_ORG.github.io/YOUR_REPO/
```

For example:

```text
https://bitgetpr.github.io/media-narrative-monitor/
```

## 5. Daily update workflow

For each business day:

1. Add article rows to `data/articles.csv`.
2. Add a short summary file under `daily-updates/YYYY-MM-DD.md`.
3. Commit to `main`.
4. The dashboard will refresh after deployment.
