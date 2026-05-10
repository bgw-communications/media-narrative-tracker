#!/usr/bin/env python3
"""Fetch daily coverage from target media and generate data/articles.json.

Default source: Google News RSS search. No API key is required.
For better precision, fill `domain` in data/media_sources.csv. Rows without a
valid domain are skipped by default to avoid noisy matches.
"""
import csv, json, os, re, sys, time, urllib.parse, urllib.request
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MEDIA_CSV = os.path.join(ROOT, 'data', 'media_sources.csv')
TAXONOMY_JSON = os.path.join(ROOT, 'data', 'taxonomy.json')
OUT_JSON = os.path.join(ROOT, 'data', 'articles.json')
DAYS = int(os.environ.get('LOOKBACK_DAYS', '1'))
MAX_OUTLETS = int(os.environ.get('MAX_OUTLETS', '80'))
MAX_PER_OUTLET = int(os.environ.get('MAX_PER_OUTLET', '8'))
NEWS_QUERY = os.environ.get('NEWS_QUERY', 'crypto OR stablecoin OR blockchain OR wallet OR tokenized OR payment OR regulation OR bitcoin OR ethereum')

DEFAULT_NARRATIVES = {
    'Stablecoins / Payments': ['stablecoin','stablecoins','usdt','usdc','payment','payments','settlement','remittance','cross-border','merchant','checkout','qr code','card'],
    'Wallets / Self-Custody': ['wallet','wallets','self-custody','self custody','custody','private key','seed phrase','onchain account'],
    'Tokenized Assets / RWA': ['tokenized','tokenization','rwa','real-world asset','stocks','etf','treasury','treasuries','xstocks','ondo'],
    'Prediction Markets': ['prediction market','polymarket','kalshi','forecast market','sports betting','event market'],
    'Regulation / Policy': ['regulation','regulator','sec','cftc','fca','mica','genius act','compliance','license','lawsuit'],
    'Market Structure / Trading': ['trading','exchange','dex','liquidity','derivatives','perpetual','perps','memecoin','market maker'],
    'Security / Risk': ['hack','exploit','phishing','scam','security','breach','attack','drain','fraud'],
    'AI / Agentic Finance': ['ai','agent','agentic','autonomous','x402','chatbot','automation']
}

def load_taxonomy():
    try:
        data = json.load(open(TAXONOMY_JSON, encoding='utf-8'))
        narrs = data.get('narratives') or []
        if isinstance(narrs, list) and narrs and isinstance(narrs[0], dict):
            return {n['name']: n.get('keywords', []) for n in narrs}
        if isinstance(narrs, list) and narrs:
            return {n: DEFAULT_NARRATIVES.get(n, []) for n in narrs}
    except Exception:
        pass
    return DEFAULT_NARRATIVES

def classify(text, taxonomy):
    t = (text or '').lower()
    scores = []
    for name, kws in taxonomy.items():
        s = sum(1 for kw in kws if kw.lower() in t)
        if s: scores.append((s, name))
    return sorted(scores, reverse=True)[0][1] if scores else 'Other / General Market'

def clean_google_title(title, publication):
    title = re.sub(r'\s+-\s+Google News$', '', title or '').strip()
    if publication:
        title = re.sub(rf'\s+-\s+{re.escape(publication)}$', '', title).strip()
    return title

def fetch_rss(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 media-narrative-monitor/1.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        return resp.read()

def google_news_url(domain):
    q = f'site:{domain} ({NEWS_QUERY}) when:{DAYS}d'
    return 'https://news.google.com/rss/search?' + urllib.parse.urlencode({
        'q': q, 'hl': 'en-US', 'gl': 'US', 'ceid': 'US:en'
    })

def read_sources():
    rows=[]
    with open(MEDIA_CSV, newline='', encoding='utf-8') as f:
        for r in csv.DictReader(f):
            if (r.get('domain') or '').strip(): rows.append(r)
    rows.sort(key=lambda r: int(r.get('priority') or 9))
    return rows[:MAX_OUTLETS]

def parse_feed(xml_bytes, source, taxonomy):
    root = ET.fromstring(xml_bytes)
    items = []
    for item in root.findall('.//item')[:MAX_PER_OUTLET]:
        title = clean_google_title(item.findtext('title'), source['publication'])
        link = item.findtext('link') or ''
        desc = re.sub('<[^<]+?>', '', item.findtext('description') or '').strip()
        pub = item.findtext('pubDate')
        try:
            dt = parsedate_to_datetime(pub).astimezone(timezone.utc).date().isoformat() if pub else datetime.now(timezone.utc).date().isoformat()
        except Exception:
            dt = datetime.now(timezone.utc).date().isoformat()
        text = ' '.join([title, desc])
        items.append({
            'date': dt,
            'publication': source['publication'],
            'domain': source['domain'],
            'category': source.get('category',''),
            'region': source.get('region',''),
            'tier': source.get('tier',''),
            'title': title,
            'url': link,
            'summary': desc[:360],
            'narrative': classify(text, taxonomy),
            'source_method': 'Google News RSS'
        })
    return items

def dedupe(items):
    seen=set(); out=[]
    for x in items:
        key = (x.get('publication',''), re.sub(r'\W+',' ',x.get('title','').lower()).strip()[:120])
        if key in seen or not key[1]: continue
        seen.add(key); out.append(x)
    return out

def main():
    taxonomy = load_taxonomy()
    articles=[]
    for src in read_sources():
        try:
            xml = fetch_rss(google_news_url(src['domain']))
            articles.extend(parse_feed(xml, src, taxonomy))
            time.sleep(0.4)
        except Exception as e:
            print(f"WARN: failed {src['publication']} ({src['domain']}): {e}", file=sys.stderr)
    articles = dedupe(articles)
    articles.sort(key=lambda x: (x.get('date',''), x.get('publication','')), reverse=True)
    payload = {'generated_at': datetime.now(timezone.utc).isoformat(), 'lookback_days': DAYS, 'article_count': len(articles), 'articles': articles}
    with open(OUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Generated {len(articles)} articles -> {OUT_JSON}")

if __name__ == '__main__':
    main()
