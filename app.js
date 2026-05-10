let mediaData = { media: [], categories: [] };
let articles = [];

const narratives = [
  'Stablecoins as payment infrastructure',
  'Wallets as financial interface',
  'Real-world crypto spending',
  'Tokenized assets / RWA access',
  'Prediction markets and information finance',
  'Self-custody and wallet security',
  'Regulation and compliance',
  'Institutional adoption',
  'Emerging markets and financial access',
  'Competitor / product coverage'
];

async function init(){
  const [media, csv] = await Promise.all([
    fetch('data/media_outlets.json').then(r=>r.json()),
    fetch('data/articles.csv').then(r=>r.text())
  ]);
  mediaData = media;
  articles = parseCSV(csv).filter(r => r.title && !r.title.startsWith('Example:'));
  setupFilters();
  render();
}

function parseCSV(text){
  const rows=[]; let row=[], cell='', q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c==='"' && q && n==='"'){cell+='"';i++;}
    else if(c==='"'){q=!q;}
    else if(c===',' && !q){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r') && !q){ if(cell||row.length){row.push(cell);rows.push(row);row=[];cell='';} if(c==='\r'&&n==='\n')i++; }
    else cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row)}
  const headers=rows.shift()||[];
  return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h.trim(),(r[i]||'').trim()])));
}

function setupFilters(){
  const cat=document.getElementById('categoryFilter');
  mediaData.categories.forEach(c=>cat.add(new Option(c,c)));
  const nar=document.getElementById('narrativeFilter');
  narratives.forEach(n=>nar.add(new Option(n,n)));
  ['search','categoryFilter','narrativeFilter','dateFilter'].forEach(id=>document.getElementById(id).addEventListener('input', render));
}

function filteredArticles(){
  const q=document.getElementById('search').value.toLowerCase();
  const cat=document.getElementById('categoryFilter').value;
  const nar=document.getElementById('narrativeFilter').value;
  const days=document.getElementById('dateFilter').value;
  const cutoff = days==='all' ? null : new Date(Date.now() - Number(days)*86400000);
  return articles.filter(a=>{
    const hay=[a.publication,a.title,a.summary,a.primary_narrative,a.secondary_narrative,a.companies_mentioned].join(' ').toLowerCase();
    const dateOk=!cutoff || (a.date && new Date(a.date)>=cutoff);
    return (!q || hay.includes(q)) && (!cat || a.category===cat) && (!nar || a.primary_narrative===nar || a.secondary_narrative===nar) && dateOk;
  }).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
}

function render(){
  const fa=filteredArticles();
  document.getElementById('lastUpdated').textContent = mediaData.generated_at || '—';
  document.getElementById('kpiMedia').textContent = mediaData.count || mediaData.media.length;
  document.getElementById('kpiArticles').textContent = fa.length;
  document.getElementById('kpiNarratives').textContent = new Set(fa.map(a=>a.primary_narrative).filter(Boolean)).size;
  document.getElementById('kpiActions').textContent = fa.filter(a=>['Pitch','Respond','Commentary','Follow up'].includes(a.action)).length;
  renderCategoryMap(); renderNarratives(fa); renderArticles(fa); renderAnalysis(fa); renderMediaTable();
}

function renderCategoryMap(){
  const counts={}; mediaData.media.forEach(m=>counts[m.category]=(counts[m.category]||0)+1);
  const max=Math.max(1,...Object.values(counts));
  document.getElementById('categoryMap').innerHTML = Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([k,v])=>bar(k,v,max)).join('');
}
function renderNarratives(rows){
  const counts={}; rows.forEach(a=>{ if(a.primary_narrative) counts[a.primary_narrative]=(counts[a.primary_narrative]||0)+1; });
  const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const max=Math.max(1,...entries.map(e=>e[1]));
  document.getElementById('narrativeBars').innerHTML = entries.length ? entries.map(([k,v])=>bar(k,v,max)).join('') : '<div class="empty">Add daily articles in data/articles.csv to see narrative trends.</div>';
}
function bar(label,val,max){ return `<div class="bar-row"><span>${label}</span><div class="bar"><div class="fill" style="width:${Math.max(4,val/max*100)}%"></div></div><b>${val}</b></div>`; }

function renderArticles(rows){
  document.getElementById('articleList').innerHTML = rows.length ? rows.slice(0,20).map(a=>`<article class="article"><h3><a href="${a.url}" target="_blank" rel="noreferrer">${a.title}</a></h3><div class="meta">${a.date} · ${a.publication} · ${a.category}</div><span class="pill">${a.primary_narrative||'Unclassified'}</span><span class="pill ${(a.sentiment||'').toLowerCase()}">${a.sentiment||'Neutral'}</span><p>${a.summary||''}</p><small><b>PR implication:</b> ${a.pr_implication||'—'}</small></article>`).join('') : '<div class="empty">No article rows match the current filters.</div>';
}

function renderAnalysis(rows){
  const grouped={};
  rows.forEach(a=>{
    const key=a.publication || a.category || 'Unknown';
    grouped[key]=grouped[key]||{count:0,narr:{},cat:a.category,action:0};
    grouped[key].count++;
    if(a.primary_narrative) grouped[key].narr[a.primary_narrative]=(grouped[key].narr[a.primary_narrative]||0)+1;
    if(['Pitch','Respond','Commentary','Follow up'].includes(a.action)) grouped[key].action++;
  });
  const rowsHtml=Object.entries(grouped).sort((a,b)=>b[1].count-a[1].count).slice(0,30).map(([pub,d])=>{
    const top=Object.entries(d.narr).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';
    return `<tr><td>${pub}</td><td>${d.cat||'—'}</td><td>${d.count}</td><td>${top}</td><td>${d.action}</td></tr>`;
  }).join('');
  document.getElementById('analysisTable').innerHTML = rowsHtml ? `<table><thead><tr><th>Media</th><th>Category</th><th>Articles</th><th>Top narrative</th><th>PR actions</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : '<div class="empty">Add articles to generate outlet-level narrative analysis.</div>';
}

function renderMediaTable(){
  const q=document.getElementById('search').value.toLowerCase(); const cat=document.getElementById('categoryFilter').value;
  const rows=mediaData.media.filter(m=>(!cat||m.category===cat)&&(!q||[m.publication,m.category,m.region,m.tier,(m.beats||[]).join(' ')].join(' ').toLowerCase().includes(q))).slice(0,300);
  document.getElementById('mediaTable').innerHTML = `<table><thead><tr><th>Publication</th><th>Category</th><th>Region</th><th>Tier</th><th>Beat / Notes</th></tr></thead><tbody>${rows.map(m=>`<tr><td>${m.publication}</td><td>${m.category}</td><td>${m.region||'—'}</td><td>${m.tier||'—'}</td><td>${(m.beats||[]).join('; ')||'—'}</td></tr>`).join('')}</tbody></table>`;
}

init().catch(err=>{document.body.innerHTML='<pre>'+err.stack+'</pre>';});
