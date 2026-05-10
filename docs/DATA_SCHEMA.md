# Data Schema

## `data/media_outlets.json`

Media-only database generated from the uploaded media lists. Individual journalist names are removed.

Fields:

| Field | Description |
|---|---|
| `publication` | Media outlet name |
| `category` | Media segment classification |
| `region` | Primary region, if available |
| `tier` | Priority or reach tier, if available |
| `beats` | General topics associated with the outlet |
| `uvm` | Monthly traffic / UVM, if available |
| `sources` | Original source file(s) |

## `data/articles.csv`

Daily coverage tracking input.

| Field | Description |
|---|---|
| `date` | Publication date, `YYYY-MM-DD` |
| `publication` | Media outlet name |
| `category` | Media category |
| `title` | Article headline |
| `url` | Article URL |
| `summary` | 1–3 sentence summary |
| `primary_narrative` | Main narrative category |
| `secondary_narrative` | Optional secondary narrative |
| `sentiment` | Positive / Neutral / Critical |
| `companies_mentioned` | Companies or competitors mentioned |
| `data_points` | Data points cited or implied |
| `pr_implication` | Why this matters for PR |
| `action` | Pitch / Respond / Commentary / Follow up / Monitor / No action |
| `owner` | Internal owner |
| `status` | New / Reviewed / Actioned / Archived |

## Recommended media categories

- Mainstream / Business
- Crypto Trade / Market
- Fintech / Payments
- Institutional / Finance
- Regional / Emerging Markets
- Policy / Regulation
- Sports / Prediction Markets
- Other / Watchlist

## Recommended narratives

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
