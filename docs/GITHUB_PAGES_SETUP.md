# GitHub Pages Setup

## Option A: Deploy from GitHub Pages settings

1. Create a private or public repository, for example: `media-narrative-tracker`.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. Your dashboard will be available at:

```text
https://<your-org-or-username>.github.io/media-narrative-tracker/
```

## Option B: Deploy with GitHub Actions

This repo includes `.github/workflows/pages.yml`.

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Commit to `main`.
4. The workflow will publish the dashboard.

## Local preview

Because the dashboard uses `fetch()` to load local data files, do not open `index.html` directly. Run a local server instead:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Updating the dashboard

Most updates only require editing:

```text
data/articles.csv
```

Commit the file and GitHub Pages will refresh the dashboard.
