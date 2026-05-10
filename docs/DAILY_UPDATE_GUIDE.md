# Daily Update Guide

This dashboard is designed to refresh automatically every day through GitHub Actions.

---

## What updates daily

Each daily run updates:

- Recent articles from tracked media outlets
- Narrative classification
- Daily news feed
- Narrative trend chart
- Media category analysis
- Outlet-level narrative analysis
- Daily narrative summary

The updated article data is stored in:

```text
data/articles.json
```

---

## Manual update

To refresh the dashboard manually:

1. Go to the repo on GitHub
2. Click **Actions**
3. Select **Daily media narrative update**
4. Click **Run workflow**
5. Wait for the workflow to complete
6. Refresh the GitHub Pages dashboard

---

## Automatic update

The workflow runs once per day by default.

File:

```text
.github/workflows/daily-news.yml
```

Default schedule:

```yaml
schedule:
  - cron: "0 1 * * *"
```

GitHub uses UTC time for cron schedules.

Suggested schedules:

```yaml
# 09:00 Singapore / China time
- cron: "0 1 * * *"

# 09:00 London time during standard time
- cron: "0 9 * * *"

# 09:00 New York time during standard time
- cron: "0 14 * * *"
```

---

## What the script does

`scripts/fetch_daily_news.py` will:

1. Read `data/media_sources.csv`
2. Search recent articles for each outlet domain
3. Extract article titles, links, outlet names, categories, and dates
4. Classify each article into a narrative
5. Save results into `data/articles.json`

---

## Editing narrative rules

Narrative classification is based on keywords.

To update narrative logic, edit:

```text
scripts/fetch_daily_news.py
```

Look for the narrative keyword section and add or remove terms.

Example:

```python
"Stablecoins / Payments": [
    "stablecoin", "usdt", "usdc", "payment", "payments", "remittance", "settlement"
]
```

---

## Editorial usage

Use the dashboard to answer:

- Which narratives are gaining visibility today?
- Which outlet categories are covering which themes?
- Which outlets are repeatedly covering a specific topic?
- Which stories create openings for commentary, reports, or pitch angles?
- Are competitors being mentioned in stories where Bitget Wallet should have a voice?
