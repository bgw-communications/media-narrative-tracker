# Daily Update Guide

This dashboard is designed for media-level monitoring, not journalist-level CRM.

## What to update daily

### 1. `data/articles.csv`

Add one row per article. Minimum required fields:

- `date`
- `publication`
- `category`
- `title`
- `url`
- `summary`
- `primary_narrative`
- `sentiment`
- `pr_implication`
- `action`
- `status`

### 2. `daily-updates/YYYY-MM-DD.md`

Use this for a short editorial readout that can be shared internally.

Recommended format:

```markdown
# Daily Media Narrative Update — YYYY-MM-DD

## Executive Takeaways
- 
- 
- 

## Notable Articles
| Media | Category | Headline | Narrative | Sentiment | PR implication |
|---|---|---|---|---|---|

## Narrative Movement
- Rising:
- Stable:
- Declining:

## Recommended Actions
- 
```

## Suggested daily monitoring questions

- Which narratives are gaining media attention today?
- Are mainstream outlets and crypto-native outlets framing the same topic differently?
- Which publications are repeatedly covering stablecoins, payments, wallets, RWAs, prediction markets, or regulation?
- Which stories create openings for commentary, data-led pitching, or op-eds?
- Are competitors being mentioned more often in specific media categories?

## Weekly analysis questions

Use the dashboard every Friday to answer:

1. Which narrative generated the most coverage this week?
2. Which media category drove the narrative: mainstream, crypto trade, fintech, regional, or policy?
3. Which outlets are becoming more relevant for our priority themes?
4. What PR action should follow: pitch, commentary, report angle, op-ed, or no action?
