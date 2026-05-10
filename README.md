# Media Narrative Monitor

A lightweight GitHub Pages dashboard for tracking **media-level narratives** across priority publications. This version does **not** track individual journalists. It focuses on:

- Which media categories are covering which themes
- Daily news updates from tracked outlets
- Narrative trends by category and publication
- PR implications and recommended actions

## Dashboard views

1. **Media Category Map** — outlet coverage by category.
2. **Narrative Trend** — article volume by narrative.
3. **Daily News Updates** — latest monitored articles and PR implications.
4. **Media Narrative Analysis** — publication/category-level view of dominant narratives.
5. **Tracked Media Database** — deduped media-only target list.

## Folder structure

```text
.
├── index.html
├── style.css
├── app.js
├── data/
│   ├── media_outlets.json      # media-only database, categorized
│   ├── articles.csv            # daily article tracking input
│   └── taxonomy.json           # narrative taxonomy
├── daily-updates/
│   └── YYYY-MM-DD.md           # daily editorial summary template
├── docs/
│   ├── GITHUB_PAGES_SETUP.md
│   ├── UPDATE_GUIDE.md
│   └── DATA_SCHEMA.md
└── .github/workflows/pages.yml
```

## Recommended workflow

1. Add daily coverage into `data/articles.csv`.
2. Write a short daily narrative summary in `daily-updates/YYYY-MM-DD.md`.
3. Commit changes to `main`.
4. GitHub Actions will publish the dashboard automatically.

## Media categories

- Mainstream / Business
- Crypto Trade / Market
- Fintech / Payments
- Institutional / Finance
- Regional / Emerging Markets
- Policy / Regulation
- Sports / Prediction Markets
- Other / Watchlist

## Narrative taxonomy

- Stablecoins as payment infrastructure
- Wallets as financial interface
- Real-world crypto spending
- Tokenized assets / RWA access
- Prediction markets and information finance
- Self-custody and wallet security
- Regulation and compliance
- Institutional adoption
- Emerging markets and financial access
- Competitor / product coverage
