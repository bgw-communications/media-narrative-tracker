const state = { articles: [], targets: [], taxonomy: {}, filtered: [] };

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function loadText(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.text();
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (c === '"' && inQuotes && n === '"') { cell += '"'; i++; }
    else if (c === '"') inQuotes = !inQuotes;
    else if (c === ',' && !inQuotes) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && n === '\n') i++;
      row.push(cell); cell = '';
      if (row.some(v => v.trim() !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift().map(h => h.trim());
  return rows.map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] || '').trim()])));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || 'Unknown';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function renderBarList(id, counts, limit = 10) {
  const el = document.getElementById(id);
  const entries = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, limit);
  const max = Math.max(...entries.map(e => e[1]), 1);
  el.innerHTML = entries.length ? entries.map(([label, value]) => `
    <div class="bar-row">
      <div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6, value / max * 100)}%"></div></div>
      <div class="bar-value">${value}</div>
    </div>`).join('') : '<p class="empty">No data yet.</p>';
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag]));
}

function renderFilters() {
  const narrativeSelect = document.getElementById('narrativeFilter');
  const beatSelect = document.getElementById('beatFilter');
  const narratives = [...new Set([...state.taxonomy.narratives || [], ...state.articles.map(a => a.narrative).filter(Boolean)])];
  const beats = [...new Set([...state.taxonomy.beats || [], ...state.articles.map(a => a.beat).filter(Boolean)])];
  narrativeSelect.innerHTML = '<option value="">All narratives</option>' + narratives.map(v => `<option>${escapeHtml(v)}</option>`).join('');
  beatSelect.innerHTML = '<option value="">All beats</option>' + beats.map(v => `<option>${escapeHtml(v)}</option>`).join('');
}

function applyFilters() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const narrative = document.getElementById('narrativeFilter').value;
  const beat = document.getElementById('beatFilter').value;
  const relevance = document.getElementById('relevanceFilter').value;
  state.filtered = state.articles.filter(a => {
    const blob = Object.values(a).join(' ').toLowerCase();
    return (!q || blob.includes(q)) && (!narrative || a.narrative === narrative) && (!beat || a.beat === beat) && (!relevance || a.relevance === relevance);
  });
  renderAll();
}

function renderKpis() {
  document.getElementById('articleCount').textContent = state.filtered.length;
  document.getElementById('journalistCount').textContent = new Set(state.targets.filter(t => t.reporter).map(t => `${t.publication}|${t.reporter}`)).size;
  document.getElementById('publicationCount').textContent = new Set(state.targets.map(t => t.publication).filter(Boolean)).size;
  document.getElementById('highRelevanceCount').textContent = state.filtered.filter(a => a.relevance === 'High').length;
}

function renderJournalistMap() {
  const counts = countBy(state.targets.filter(t => t.reporter), 'beat');
  const entries = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  document.getElementById('journalistMap').innerHTML = entries.map(([beat, count]) => `<span class="tag">${escapeHtml(beat)} · ${count}</span>`).join('');
}

function renderActionQueue() {
  const actions = state.filtered.filter(a => ['Pitch','Commentary','Follow up'].includes(a.action)).slice(0, 8);
  document.getElementById('actionQueue').innerHTML = actions.length ? actions.map(a => `
    <div class="action-item">
      <strong>${escapeHtml(a.action)}: ${escapeHtml(a.publication)}${a.journalist ? ' / ' + escapeHtml(a.journalist) : ''}</strong>
      <div>${escapeHtml(a.title)}</div>
      <div class="action-meta">${escapeHtml(a.narrative)} · ${escapeHtml(a.relevance)}</div>
    </div>`).join('') : '<p class="empty">No action items in current filter.</p>';
}

function renderCoverageTable() {
  const body = document.querySelector('#coverageTable tbody');
  body.innerHTML = state.filtered.sort((a,b) => (b.date || '').localeCompare(a.date || '')).map(a => `
    <tr>
      <td>${escapeHtml(a.date)}</td>
      <td>${escapeHtml(a.publication)}</td>
      <td>${escapeHtml(a.journalist)}</td>
      <td>${a.url ? `<a href="${escapeHtml(a.url)}" target="_blank" rel="noreferrer">${escapeHtml(a.title)}</a>` : escapeHtml(a.title)}</td>
      <td>${escapeHtml(a.narrative)}</td>
      <td><span class="badge ${escapeHtml(a.sentiment)}">${escapeHtml(a.sentiment)}</span></td>
      <td><span class="badge ${escapeHtml(a.relevance)}">${escapeHtml(a.relevance)}</span></td>
      <td>${escapeHtml(a.action)}</td>
    </tr>`).join('');
}

function renderTargetTable() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const targets = state.targets.filter(t => !q || Object.values(t).join(' ').toLowerCase().includes(q)).slice(0, 400);
  const body = document.querySelector('#targetTable tbody');
  body.innerHTML = targets.map(t => `
    <tr>
      <td>${escapeHtml(t.publication)}</td>
      <td>${escapeHtml(t.reporter)}</td>
      <td>${escapeHtml(t.beat)}</td>
      <td>${escapeHtml(t.region)}</td>
      <td>${escapeHtml(t.tier)}</td>
      <td>${escapeHtml(t.notes)}</td>
    </tr>`).join('');
}

function renderAll() {
  renderKpis();
  renderBarList('narrativeChart', countBy(state.filtered, 'narrative'));
  renderBarList('beatChart', countBy(state.filtered, 'beat'));
  renderJournalistMap();
  renderActionQueue();
  renderCoverageTable();
  renderTargetTable();
}

async function init() {
  const [targetData, taxonomy, csv] = await Promise.all([
    loadJson('data/media_targets.json'),
    loadJson('data/taxonomy.json'),
    loadText('data/articles.csv')
  ]);
  state.targets = targetData.targets || [];
  state.taxonomy = taxonomy;
  state.articles = parseCsv(csv);
  state.filtered = state.articles;
  renderFilters();
  ['searchInput','narrativeFilter','beatFilter','relevanceFilter'].forEach(id => document.getElementById(id).addEventListener('input', applyFilters));
  renderAll();
}

init().catch(err => {
  document.body.innerHTML = `<main><div class="card" style="padding:24px"><h1>Could not load dashboard data</h1><p>${escapeHtml(err.message)}</p><p>Run this via GitHub Pages or a local web server, not by opening index.html directly.</p></div></main>`;
});
