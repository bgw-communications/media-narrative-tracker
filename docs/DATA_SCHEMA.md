# Data Schema

## `data/articles.csv`

| Field | Required | Description | Example |
|---|---:|---|---|
| date | Yes | Publication date in `YYYY-MM-DD` format | `2026-05-10` |
| publication | Yes | Media outlet | `Bloomberg` |
| journalist | No | Reporter name | `Emily Nicolle` |
| title | Yes | Article headline | `Stablecoins move into payments` |
| url | No | Article URL | `https://...` |
| beat | Yes | Specific coverage topic | `Stablecoins` |
| narrative | Yes | Broader storyline | `Stablecoins as payment infrastructure` |
| sentiment | Yes | Coverage tone | `Positive`, `Neutral`, `Critical` |
| companies | No | Companies mentioned, separated by semicolon | `Circle; Tether; Bitget Wallet` |
| relevance | Yes | PR relevance | `High`, `Medium`, `Low` |
| action | Yes | Recommended PR action | `Pitch`, `Commentary`, `Follow up`, `Monitor`, `No action` |
| summary | No | Short internal note | `Useful for wallet narrative.` |

## `data/media_targets.json`

Generated from the uploaded media and journalist lists.

| Field | Description |
|---|---|
| publication | Media outlet |
| reporter | Reporter name; blank if the row is a publication-level target |
| beat | Main beat or category |
| region | Region or source section |
| tier | Publication tier, when available |
| uvm | Monthly traffic/UVM, when available |
| notes | Extra notes such as exclusive target |
| source | Original spreadsheet source |

## `data/taxonomy.json`

Controls dropdown categories for narratives and beats. Update this file when adding a new recurring narrative.
