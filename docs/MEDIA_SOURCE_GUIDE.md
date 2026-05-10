# Media Source Guide

The media source list controls which outlets the dashboard monitors.

File:

```text
data/media_sources.csv
```

---

## Required columns

Use this format:

```csv
publication,domain,category,region,tier,notes
```

Column definitions:

| Column | Description | Required |
|---|---|---|
| publication | Media outlet name | Yes |
| domain | Website domain used for search | Yes |
| category | Media category | Yes |
| region | Primary region | Recommended |
| tier | Priority or media tier | Recommended |
| notes | Optional internal notes | Optional |

---

## Example rows

```csv
Reuters,reuters.com,Mainstream / Business,Global,Tier 1,
Bloomberg,bloomberg.com,Mainstream / Business,Global,Tier 1,
CoinDesk,coindesk.com,Crypto Trade / Market,Global,Trade Outlet Tier 1,
The Block,theblock.co,Crypto Trade / Market,Global,Trade Outlet Tier 1,
TechCrunch,techcrunch.com,Technology / Startups,Global,Tier 1,
Fortune,fortune.com,Mainstream / Business,US,Tier 1,
Nikkei Asia,asia.nikkei.com,Regional / Emerging Markets,Asia,Tier 1,
```

---

## Recommended media categories

Use a controlled list to keep analysis clean:

```text
Mainstream / Business
Crypto Trade / Market
Fintech / Payments
Institutional / Finance
Technology / Startups
Regional / Emerging Markets
Regulation / Policy
Sports / Prediction Markets
Other / Watchlist
```

---

## Domain rules

Use the clean root domain only.

Good:

```text
reuters.com
bloomberg.com
coindesk.com
asia.nikkei.com
```

Avoid:

```text
https://www.reuters.com/
https://www.bloomberg.com/crypto/
www.coindesk.com/markets/
```

The script searches by domain, so clean domains reduce noise.

---

## How to add a new outlet

Add a new row to `data/media_sources.csv`:

```csv
New Outlet,newoutlet.com,Crypto Trade / Market,Global,Trade Outlet Tier 2,
```

Commit the change and run the workflow manually:

```text
Actions → Daily media narrative update → Run workflow
```

---

## How to remove an outlet

Delete the row from `data/media_sources.csv`, commit the change, and rerun the workflow.

Existing historical articles may still remain in `data/articles.json` unless you clear or regenerate the article database.

---

## Prioritization suggestion

For better signal quality, keep the list focused on priority outlets.

Suggested tiers:

- Tier 1 mainstream: Reuters, Bloomberg, FT, WSJ, CNBC, Fortune, Forbes
- Tier 1 crypto: CoinDesk, The Block, Cointelegraph, Decrypt, DL News
- Fintech/payments: Finextra, PYMNTS, The Paypers, Payments Dive
- Regional: Nikkei Asia, Tech in Asia, Rest of World, BusinessDay, The Ken
- Specialist watchlist: prediction markets, security, RWA, DeFi, AI outlets
