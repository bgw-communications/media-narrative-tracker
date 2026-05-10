# GitHub Pages Deploy Hotfix

This fixes the GitHub Pages deployment error:

`Missing environment. Ensure your workflow's deployment job has an environment.`

## What changed

The deploy job now includes:

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

It also includes the required permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## How to apply

1. Upload `.github/workflows/pages.yml` to the root of your repo.
2. If you already have another Pages deploy workflow, replace it with this one or add the same `environment` block to its `deploy` job.
3. Go to GitHub repo settings:
   - Settings → Pages
   - Source: GitHub Actions
4. Re-run the failed workflow or push a small commit to `main`.

## Expected file path

Make sure the file is here:

```text
.github/workflows/pages.yml
```

Not inside a nested folder.
