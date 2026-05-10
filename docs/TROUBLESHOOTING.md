# Troubleshooting Guide

## The dashboard shows no articles

Possible reasons:

1. `data/articles.json` has not been generated yet
2. The GitHub Action has not run successfully
3. `data/media_sources.csv` does not include valid domains
4. The search source returned no recent articles

Fix:

```text
Actions → Daily media narrative update → Run workflow
```

Then check whether `data/articles.json` was updated.

---

## The workflow cannot commit updated files

Check workflow permissions:

```text
Settings → Actions → General → Workflow permissions
```

Select:

```text
Read and write permissions
```

Then rerun the workflow.

---

## GitHub Pages does not update

Check:

1. GitHub Pages source is set to **GitHub Actions**
2. The deployment workflow completed successfully
3. `index.html` is in the repo root
4. Files are not inside an extra nested folder

---

## Too many irrelevant articles

Improve source quality by:

1. Using clean outlet domains in `data/media_sources.csv`
2. Reducing the media list to priority outlets
3. Tightening keywords in `scripts/fetch_daily_news.py`
4. Adding exclusion terms if needed

---

## Narrative classification is inaccurate

The first version uses keyword-based classification.

To improve it:

1. Edit keyword groups in `scripts/fetch_daily_news.py`
2. Add specific crypto/payment terms
3. Add competitor and product keywords
4. Review the daily output and refine weekly

---

## Some media are skipped

The script skips outlets without a valid `domain` field.

Check:

```text
data/media_sources.csv
```

Make sure each important outlet has a clean domain.

---

## The dashboard loads old data

Try:

1. Hard refresh the browser
2. Wait 1–3 minutes after GitHub Pages deployment
3. Check whether `data/articles.json` was updated in the repo
4. Open the page in an incognito window
