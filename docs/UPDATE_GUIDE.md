# Update Guide

## 1. Add new coverage

Open `data/articles.csv` and add one row per article.

Example:

```csv
date,publication,journalist,title,url,beat,narrative,sentiment,companies,relevance,action,summary
2026-05-10,CoinDesk,Helene Braun,Wallets move deeper into payments,https://example.com,Wallets,Wallets as financial interface,Neutral,"MetaMask; Bitget Wallet",High,Pitch,"Useful for wallet-as-interface narrative."
```

## 2. Keep narratives consistent

Use the approved narratives in `data/taxonomy.json` where possible:

- Stablecoins as payment infrastructure
- Wallets as financial interface
- Real-world crypto spending: card, QR, bank transfer
- Tokenized assets and market access
- Prediction markets and information finance
- Self-custody, security and user risk
- Regulation and compliance
- Institutional adoption and enterprise infrastructure
- Emerging markets and financial access
- Competitor/product coverage

## 3. Set PR action clearly

Use one of the following values:

- `Pitch`: the article creates an opening for proactive outreach
- `Commentary`: the story is timely enough for executive comment
- `Follow up`: the reporter should receive more context or data
- `Monitor`: relevant, but no immediate action
- `No action`: archive only

## 4. Weekly operating rhythm

Recommended cadence:

- Daily: add Tier 1 / highly relevant articles
- Twice weekly: add competitor mentions and emerging trend pieces
- Weekly: review the action queue and narrative momentum
- Monthly: clean taxonomy and merge duplicate narratives

## 5. How to update the journalist database

The journalist database is stored in `data/media_targets.json`. For simple edits, update the JSON directly. For larger updates, replace the source spreadsheet and regenerate the JSON using a short script or manual conversion.

Required fields:

```json
{
  "publication": "CoinDesk",
  "reporter": "Helene Braun",
  "beat": "Crypto",
  "region": "Global",
  "tier": "Trade Outlet Tier 2",
  "uvm": "2065117",
  "notes": "",
  "source": "Medialist.xlsx"
}
```
