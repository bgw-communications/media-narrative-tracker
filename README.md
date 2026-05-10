# Media Narrative Monitor

A lightweight GitHub Pages dashboard for monitoring daily coverage and narrative trends across a defined list of media outlets.

The dashboard is designed for PR and communications teams to understand:

- What target media are publishing each day
- Which narratives are gaining traction
- Which media categories are focusing on which themes
- Which outlets are repeatedly covering stablecoins, payments, wallets, RWAs, regulation, security, and related topics

This version tracks **media outlets only**. It does not track individual journalists.

---

## How it works

The system has three parts:

1. **Media source list**  
   Stored in `data/media_sources.csv`. This is the list of target media outlets and their domains.

2. **Daily news fetcher**  
   `scripts/fetch_daily_news.py` searches recent articles from those media domains, classifies them into narratives, and writes results into `data/articles.json`.

3. **GitHub Pages dashboard**  
   `index.html`, `style.css`, and `script.js` read `data/articles.json` and display daily updates, narrative trends, and outlet/category analysis.

---

## Repository structure

```text
.
├── index.html
├── style.css
├── script.js
├── data/
│   ├── media_sources.csv
│   └── articles.json
├── scripts/
│   └── fetch_daily_news.py
├── docs/
│   ├── GITHUB_PAGES_SETUP.md
│   ├── DAILY_UPDATE_GUIDE.md
│   ├── MEDIA_SOURCE_GUIDE.md
│   └── TROUBLESHOOTING.md
└── .github/
    └── workflows/
        └── daily-news.yml
```

---

## Quick start

1. Upload all files to the root of your GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select:
   - Source: `GitHub Actions`
4. Go to **Actions → Daily media narrative update**.
5. Click **Run workflow**.
6. After the workflow finishes, open your GitHub Pages URL.

Example URL:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## Daily workflow

The dashboard updates through GitHub Actions.

By default, the workflow runs once per day and can also be triggered manually.

Manual update:

```text
Actions → Daily media narrative update → Run workflow
```

When the workflow runs, it will:

1. Read the media list from `data/media_sources.csv`
2. Search recent articles from each outlet domain
3. Classify articles by narrative
4. Update `data/articles.json`
5. Commit the updated data back to the repo
6. Redeploy the GitHub Pages dashboard

---

## Required data format

`data/media_sources.csv` should use this format:

```csv
publication,domain,category,region,tier,notes
Reuters,reuters.com,Mainstream / Business,Global,Tier 1,
Bloomberg,bloomberg.com,Mainstream / Business,Global,Tier 1,
CoinDesk,coindesk.com,Crypto Trade / Market,Global,Trade Outlet Tier 1,
The Block,theblock.co,Crypto Trade / Market,Global,Trade Outlet Tier 1,
TechCrunch,techcrunch.com,Technology / Startups,Global,Tier 1,
```

The most important field is `domain`. If the domain is empty, the outlet will be skipped by the automatic search.

---

## Narrative categories

The default narrative taxonomy includes:

- Stablecoins / Payments
- Wallets / Self-Custody
- Tokenized Assets / RWA
- Prediction Markets
- Regulation / Policy
- Security / Risk
- Institutional Adoption
- DeFi / Trading
- AI / Agentic Finance
- Emerging Markets
- Market Structure
- Other

You can edit the keyword rules in `scripts/fetch_daily_news.py`.

---

## Notes

This is a lightweight monitor, not a full media intelligence platform. It is best used to identify daily patterns, recurring narratives, and PR opportunities across a curated list of target outlets.
