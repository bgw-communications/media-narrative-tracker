# Hotfix: update-news failed because `scripts/fetch_daily_news.py` is missing

## What happened

The workflow is running correctly, but GitHub Actions cannot find this file:

```text
scripts/fetch_daily_news.py
```

This usually happens when only the documentation package was uploaded to the repo, rather than the full dashboard package.

The Node.js 20 message is a warning, not the cause of the failure. The updated workflow opts into Node.js 24 with:

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

## Files required in repo root

Make sure these files exist at the top level of the repository:

```text
index.html
style.css
app.js
data/media_sources.csv
data/taxonomy.json
data/articles.json
scripts/fetch_daily_news.py
.github/workflows/daily-news.yml
.github/workflows/pages.yml
```

## How to apply this fix

1. Unzip the hotfix package.
2. Upload the following folders to the repo root:
   - `.github/workflows/`
   - `scripts/`
   - `data/`
3. Commit to `main`.
4. Go to GitHub → Actions → Daily media narrative update → Run workflow.

## Important

Do not upload the files inside another nested folder such as:

```text
media-narrative-monitor-v3/scripts/fetch_daily_news.py
```

The correct path must be:

```text
scripts/fetch_daily_news.py
```
