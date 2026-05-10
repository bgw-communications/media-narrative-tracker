# Media Narrative Tracker

A lightweight GitHub Pages dashboard for tracking mainstream and crypto media narratives, journalist focus areas, and PR opportunities.

## What this dashboard shows

- Which narratives are appearing most often across monitored coverage
- Which beats are gaining momentum: stablecoins, payments, wallets, RWAs, prediction markets, security, regulation, enterprise infrastructure, emerging markets
- Which journalists and publications are mapped to each focus area
- Which articles should trigger PR action: pitch, commentary, follow-up, or monitoring
- A searchable media target database generated from the uploaded publication and journalist lists

## Repository structure

```text
.
├── index.html                  # Dashboard page
├── style.css                   # Dashboard styling
├── app.js                      # Dashboard logic
├── data/
│   ├── articles.csv            # Weekly coverage tracker; edit this file regularly
│   ├── media_targets.json      # Generated media and journalist database
│   └── taxonomy.json           # Narrative, beat and action categories
├── docs/
│   ├── UPDATE_GUIDE.md         # How to maintain the tracker
│   ├── GITHUB_PAGES_SETUP.md   # Deployment instructions
│   └── DATA_SCHEMA.md          # Field definitions
└── .github/workflows/pages.yml # Optional GitHub Pages deployment workflow
```

## Recommended workflow

1. Add new monitored coverage to `data/articles.csv`.
2. Commit the change to GitHub.
3. GitHub Pages refreshes the dashboard automatically.
4. Review the dashboard weekly to identify:
   - rising narratives
   - journalists to pitch
   - competitor coverage gaps
   - commentary opportunities

## Core data fields

The dashboard is powered mainly by `data/articles.csv`:

| Field | Description |
|---|---|
| date | Publication date, `YYYY-MM-DD` |
| publication | Media outlet name |
| journalist | Reporter name, if known |
| title | Article headline |
| url | Article link |
| beat | Topic area, such as Stablecoins, Payments, Wallets, RWA |
| narrative | The broader story angle |
| sentiment | Positive, Neutral, or Critical |
| companies | Companies mentioned |
| relevance | High, Medium, or Low |
| action | Pitch, Commentary, Follow up, Monitor, or No action |
| summary | 1-2 sentence summary of why the article matters |

## Suggested weekly review questions

- Which narratives are increasing in volume?
- Which journalists are repeatedly covering the same theme?
- Are competitors being quoted where Bitget Wallet should have a voice?
- Which stories need a data-backed pitch or executive commentary?
- Which topics should be turned into a report, op-ed, or media FAQ?

