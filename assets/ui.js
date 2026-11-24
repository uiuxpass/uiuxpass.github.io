/* UI/UX Pass 4.0 shared UI: phone menu, sticky buy bar, examples gallery + viewer, skill tabs */
(function () {
  const ROOT = (function () { const s = document.currentScript && document.currentScript.src; return s ? s.replace(/assets\/ui\.js.*$/, '') : '/'; })();
  const u = p => ROOT + p;
  const track = (n, p) => { try { window.SP && SP.track(n, p); } catch (e) {} };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- examples (one list for the homepage and the examples page) ---------- */
  const CATS = { quality: 'Check quality', research: 'Research & product', present: 'Present', system: 'Design system' };
  const EX = [
    { id: 'polish', cat: 'quality', kind: 'compare', skill: 'interface-polish', title: 'An AI-made pricing page, 38 → 66 of 66 checks',
      result: '7 critical problems → 0: readable contrast, real buttons, no overflow on a phone, zoom allowed. Same content, same checker.',
      ask: 'Check and fix this page. Measure it first, fix the critical problems, then measure again: [attach page.html or paste a URL]',
      before: 'media/before.jpg', after: 'media/after.jpg', thumb: 'media/thumbs/polish.jpg', extra: ['See the full checker log', 'media/proof-polish.jpg'] },
    { id: 'design-qa', cat: 'quality', kind: 'page', skill: 'design-qa', title: 'Design QA: the build vs the design',
      result: '9.7% of pixels differ. Drag to compare, differences in red, the worst areas listed, fix tickets written.',
      ask: 'Compare this built page with the design export at the same width and list what to fix: [page URL] [design.png]',
      src: 'samples/design-qa.html', thumb: 'media/thumbs/design-qa.jpg' },
    { id: 'usability-test', cat: 'research', kind: 'page', skill: 'usability-test', title: 'Usability test results with honest ranges',
      result: 'Success per task with a 95% range, time, SEQ, SUS grade, and issues ranked by severity × share of users.',
      ask: 'Analyse these usability test notes. Give task success with confidence ranges and tell me what to fix first: [attach notes or CSV]',
      src: 'samples/usability-report.html', thumb: 'media/thumbs/usability-report.jpg' },
    { id: 'journey-map', cat: 'research', kind: 'page', skill: 'journey-map', title: 'A journey map built from evidence',
      result: 'Stages, an emotion line from −2 to +2, pain points with evidence and the opportunity for each.',
      ask: 'Make a journey map for [user] doing [goal] from these interviews and tickets, and flag stages with no evidence: [attach]',
      src: 'samples/journey-map.html', thumb: 'media/thumbs/journey-map.jpg' },
    { id: 'ux-benchmark', cat: 'research', kind: 'page', skill: 'competitive-ux-benchmark', title: 'A UX benchmark against two competitors',
      result: 'The same tasks in every product, weighted 1–5 scores, and the gaps in the order worth fixing.',
      ask: 'Benchmark our onboarding against [Rival A] and [Rival B]: same tasks, weighted scores, biggest gaps first.',
      src: 'samples/ux-benchmark.html', thumb: 'media/thumbs/ux-benchmark.jpg' },
    { id: 'user-flow', cat: 'research', kind: 'page', skill: 'user-flows-wireframes', title: 'A user flow with every state',
      result: 'Flow diagram, a check for dead ends and missing empty, loading and error states, and a grey-box wireframe per screen.',
      ask: 'Map the flow for [task], check for dead ends and missing empty, loading and error states, and wireframe each screen.',
      src: 'samples/user-flow.html', thumb: 'media/thumbs/user-flow.jpg' },
    { id: 'design-system', cat: 'system', kind: 'page', skill: 'design-system-starter', title: 'A design system in light and dark',
      result: 'Every component in every state from semantic tokens; every colour pair passes WCAG AA. Toggle dark theme inside.',
      ask: 'Make a design system from this brand colour [#hex]: tokens, light and dark, Figma variables and every component state.',
      src: 'samples/design-system.html', thumb: 'media/thumbs/design-system.jpg' },
    { id: 'style-directions', cat: 'system', kind: 'page', skill: 'ui-style-library', title: 'Three style directions, contrast-checked',
      result: 'Palette, font pairing and style recipe side by side, every one passing AA.',
      ask: 'Show me three visual directions for a calm, accessible healthcare app, with palettes and fonts that pass contrast.',
      src: 'samples/style-directions.html', thumb: 'media/thumbs/style-directions.jpg' },
    { id: 'web-report', cat: 'present', kind: 'page', skill: 'web-report', title: 'A research readout people actually read',
      result: 'Conclusion first, three key points, sourced numbers and a method note, as one web page.',
      ask: 'Turn these findings into a one-page web report for leadership, conclusion first: [paste findings]',
      src: 'samples/web-report.html', thumb: 'media/thumbs/web-report.jpg' },
    { id: 'deck', cat: 'present', kind: 'page', skill: 'presentation-deck', title: 'A deck you can present',
      result: 'One HTML file: scroll or present, presenter view, edit in place, PDF and PowerPoint export.',
      ask: 'Use presentation-deck to make slides from this readout for a 10-minute review: [paste or attach]',
      src: 'samples/deck.html', thumb: 'media/thumbs/deck.jpg' },
    { id: 'launch-video', cat: 'present', kind: 'video', skill: 'product-video', title: 'A 12-second launch video',
      result: 'Written in HTML, rendered to MP4, checked for readable text, safe area and captions.',
      ask: 'Make a 12-second launch video for [feature] with captions, in our brand colours.',
      src: 'media/launch-sample.mp4', thumb: 'media/thumbs/launch-video.jpg' }
  ];
  window.UIUX_EXAMPLES = EX;

  const ICON = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  /* ---------- viewer ---------- */
  let dlg, cur = -1, lastFocus = null, onHome = false;
  function buildViewer() {
    dlg = document.createElement('dialog');
    dlg.className = 'viewer';
    dlg.setAttribute('aria-labelledby', 'vw-title');
    dlg.innerHTML = `<div class="vw">
      <div class="vw-top">
        <span class="count" id="vw-count"></span>
        <span class="ttl" id="vw-ttl" aria-hidden="true"></span>
        <button class="ic hide-sm" type="button" data-vw="prev" aria-label="Previous example">${ICON.prev}</button>
        <button class="ic hide-sm" type="button" data-vw="next" aria-label="Next example">${ICON.next}</button>
        <a class="ic hide-sm" id="vw-ext" target="_blank" rel="noopener">${ICON.ext}<span>New tab</span></a>
        <button class="ic" type="button" data-vw="close" aria-label="Close">${ICON.close}</button>
      </div>
      <div class="vw-body">
        <div class="vw-stage" id="vw-stage"></div>
        <aside class="vw-side">
          <span class="skill" id="vw-skill"></span>
          <h2 id="vw-title"></h2>
          <p class="res" id="vw-res"></p>
          <p class="extra" id="vw-extra" hidden></p>
          <p class="lbl" id="vw-ask-l">Try this request in Claude</p>
          <p class="ask" id="vw-ask" aria-labelledby="vw-ask-l"></p>
          <div class="copy-row"><button class="btn btn-ghost" type="button" data-vw="copy">Copy request</button><span class="copied" role="status" id="vw-st"></span></div>
          <div class="buy">
            <a class="btn btn-primary" data-buy href="${u('index.html#pricing')}">Get all 45 skills · <span data-price="49">$49</span></a>
            <a class="btn btn-free" data-free href="${u('index.html#pricing')}">Try 2 skills free</a>
            <p>One payment, lifetime updates. Sample data is invented; the numbers are what the checkers measured.</p>
          </div>
        </aside>
      </div>
      <div class="vw-nav"><button type="button" data-vw="prev">← Previous</button><button type="button" data-vw="next">Next →</button></div>
    </div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('click', e => {
      const b = e.target.closest('[data-vw]');
      if (e.target === dlg) return close();
      if (!b) return;
      const a = b.dataset.vw;
      if (a === 'close') close(); else if (a === 'prev') go(-1); else if (a === 'next') go(1); else if (a === 'copy') copy();
    });
    dlg.addEventListener('cancel', e => { e.preventDefault(); close(); });
    dlg.addEventListener('keydown', e => {
      if (e.target.closest('input,textarea')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });
    window.SP && SP.apply && SP.apply();
  }
  function stageFor(x) {
    if (x.kind === 'compare') {
      return `<div class="vw-cmp"><div class="ba" id="vw-ba">
        <img src="${u(x.after)}" alt="After: the fixed page, 66 of 66 checks" width="1600" height="1111">
        <div class="top" id="vw-ba-top" style="width:50%"><img src="${u(x.before)}" alt="Before: the AI-made page, 38 of 66 checks" width="1600" height="1111"></div>
        <span class="chip bad mono">Before 38/66 · 7 critical</span><span class="chip good mono">After 66/66 · 0 critical</span>
      </div><div class="ba-control"><label for="vw-range">Drag to compare</label><input id="vw-range" type="range" min="0" max="100" value="50"></div></div>`;
    }
    if (x.kind === 'video') return `<video src="${u(x.src)}" controls autoplay muted playsinline loop poster="${u(x.thumb)}"></video>`;
    return `<iframe src="${u(x.src)}" title="${esc(x.title)}" loading="lazy"></iframe>`;
  }
  function render() {
    const x = EX[cur];
    dlg.querySelector('#vw-count').textContent = (cur + 1) + ' of ' + EX.length;
    dlg.querySelector('#vw-ttl').textContent = x.title;
    dlg.querySelector('#vw-skill').textContent = x.skill;
    dlg.querySelector('#vw-title').textContent = x.title;
    dlg.querySelector('#vw-res').textContent = x.result;
    dlg.querySelector('#vw-ask').textContent = x.ask;
    dlg.querySelector('#vw-st').textContent = '';
    const ex = dlg.querySelector('#vw-extra');
    if (x.extra) { ex.innerHTML = `<a href="${u(x.extra[1])}" target="_blank" rel="noopener">${esc(x.extra[0])} ↗</a>`; ex.hidden = false; } else ex.hidden = true;
    const ext = dlg.querySelector('#vw-ext');
    ext.href = u(x.kind === 'compare' ? x.after : x.src);
    ext.setAttribute('aria-label', 'Open ' + x.title + ' in a new tab');
    const st = dlg.querySelector('#vw-stage');
    st.innerHTML = stageFor(x);
    if (x.kind === 'compare') {
      const ba = st.querySelector('#vw-ba'), top = st.querySelector('#vw-ba-top'), r = st.querySelector('#vw-range');
      const size = () => { top.querySelector('img').style.width = ba.clientWidth + 'px'; };
      r.addEventListener('input', () => { top.style.width = r.value + '%'; });
      requestAnimationFrame(size); window.addEventListener('resize', size);
    }
    const h = '#ex=' + x.id;
    if (location.hash !== h) history.replaceState(null, '', h);
  }
  function open(i, src) {
    if (!dlg) buildViewer();
    cur = (i + EX.length) % EX.length;
    lastFocus = document.activeElement;
    render();
    if (!dlg.open) { dlg.showModal(); document.documentElement.classList.add('vw-open'); }
    dlg.querySelector('[data-vw="close"]').focus();
    track('Example open', { example: EX[cur].id, from: src || location.pathname });
  }
  function go(d) { cur = (cur + d + EX.length) % EX.length; render(); track('Example next', { example: EX[cur].id }); }
  function close() {
    if (!dlg || !dlg.open) return;
    dlg.querySelector('#vw-stage').innerHTML = '';
    dlg.close(); document.documentElement.classList.remove('vw-open');
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  async function copy() {
    const x = EX[cur], st = dlg.querySelector('#vw-st');
    try { await navigator.clipboard.writeText(x.ask); st.textContent = 'Copied'; }
    catch (e) { const r = document.createRange(); r.selectNodeContents(dlg.querySelector('#vw-ask')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); st.textContent = 'Selected: press Ctrl+C or ⌘C'; }
    track('Copy request', { skill: x.skill });
  }
  const idx = id => EX.findIndex(x => x.id === id);

  /* ---------- gallery (examples page) ---------- */
  function gallery() {
    const grid = document.getElementById('ex-grid'); if (!grid) return;
    if (!grid.querySelector('.ex-card')) grid.innerHTML = EX.map(x => `<a class="ex-card" href="${u(x.kind === 'compare' ? x.after : x.src)}" data-ex="${x.id}" data-cat="${x.cat}">
      <div class="shot"><div class="win-bar"><i></i><i></i><i></i><span class="mono">${esc(x.skill)}</span></div><img src="${u(x.thumb)}" alt="" width="800" height="500" loading="lazy"></div>
      <h2>${esc(x.title)}</h2><p>${esc(x.result)}</p><span class="go">${x.kind === 'video' ? 'Play' : x.kind === 'compare' ? 'Compare before and after' : 'Open'} →</span></a>`).join('');
    const f = document.getElementById('ex-filter');
    if (f && !f.dataset.on) {
      f.dataset.on = 1;
      const counts = EX.reduce((m, x) => (m[x.cat] = (m[x.cat] || 0) + 1, m), {});
      if (!f.querySelector('button')) f.innerHTML = `<button type="button" aria-pressed="true" data-cat="all">All<span class="c">${EX.length}</span></button>` +
        Object.keys(CATS).map(k => `<button type="button" aria-pressed="false" data-cat="${k}">${CATS[k]}<span class="c">${counts[k] || 0}</span></button>`).join('');
      f.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        f.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
        grid.querySelectorAll('.ex-card').forEach(c => { c.hidden = !(b.dataset.cat === 'all' || c.dataset.cat === b.dataset.cat); });
        track('Example filter', { cat: b.dataset.cat });
      });
    }
  }

  /* ---------- skill tabs (homepage) ---------- */
  function kitTabs() {
    const sec = document.getElementById('skills'); if (!sec) return;
    const kits = [...sec.querySelectorAll('.kit')]; if (kits.length < 2) return;
    const host = kits[0].parentElement; host.classList.add('kits-tabbed');
    const bar = document.createElement('div'); bar.className = 'kit-tabs'; bar.setAttribute('role', 'tablist'); bar.setAttribute('aria-label', 'Skill kits');
    kits.forEach((k, i) => {
      const h = k.querySelector('h3'); const n = k.querySelectorAll('.skill').length;
      k.id = k.id || 'kit-' + i; k.setAttribute('role', 'tabpanel'); k.setAttribute('aria-labelledby', 'kit-tab-' + i);
      const b = document.createElement('button'); b.type = 'button'; b.id = 'kit-tab-' + i; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', k.id);
      b.innerHTML = `${esc(h.textContent.replace(/ Kit$/, ''))}<span class="c">${n}</span>`;
      bar.appendChild(b);
    });
    host.insertBefore(bar, kits[0]);
    const tabs = [...bar.children];
    const pick = (i, focus) => { tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; kits[j].hidden = j !== i; }); if (focus) tabs[i].focus(); };
    bar.addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if (b) pick(tabs.indexOf(b)); });
    bar.addEventListener('keydown', e => { const i = tabs.indexOf(document.activeElement); if (i < 0) return; if (e.key === 'ArrowRight') pick((i + 1) % tabs.length, true); if (e.key === 'ArrowLeft') pick((i - 1 + tabs.length) % tabs.length, true); });
    pick(0);
  }

  /* ---------- phone menu ---------- */
  function menu() {
    const nav = document.querySelector('.nav .nav-links'); if (!nav) return;
    const btn = document.createElement('button');
    btn.className = 'menu-btn'; btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'm-menu'); btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = ICON.menu;
    nav.insertBefore(btn, nav.querySelector('.btn'));
    const m = document.createElement('div'); m.id = 'm-menu'; m.className = 'm-menu'; m.hidden = true;
    m.innerHTML = [...nav.querySelectorAll('a.link')].map(a => `<a class="m-link" href="${a.getAttribute('href')}"${a.getAttribute('aria-current') ? ' aria-current="page"' : ''}>${esc(a.textContent)}<span aria-hidden="true">→</span></a>`).join('') +
      `<a class="btn btn-primary" data-buy href="${nav.querySelector('.btn').getAttribute('href')}">Get UI/UX Pass · <span data-price="49">$49</span></a>`;
    document.querySelector('.nav').after(m);
    const set = o => { if (o) m.style.top = Math.max(0, document.querySelector('.nav').getBoundingClientRect().bottom) + 'px'; m.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); btn.innerHTML = o ? ICON.close : ICON.menu; btn.setAttribute('aria-label', o ? 'Close menu' : 'Menu'); };
    btn.addEventListener('click', () => set(m.hidden));
    m.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) { set(false); btn.focus(); } });
    window.addEventListener('resize', () => { if (innerWidth > 860) set(false); });
  }

  /* ---------- sticky buy bar (phones) ---------- */
  function buybar() {
    if (!document.body.hasAttribute('data-buybar')) return;
    const bar = document.createElement('div'); bar.className = 'buybar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Buy UI/UX Pass');
    bar.innerHTML = `<span class="t"><b>UI/UX Pass · <span data-price="49">$49</span></b>45 skills, pay once</span><a class="btn btn-primary" data-buy href="${u('index.html#pricing')}">Get it</a>`;
    document.body.appendChild(bar); document.body.classList.add('has-buybar');
    const hero = document.querySelector('.hero3 .ctas, .ex-head'), pricing = document.getElementById('pricing'), final = document.getElementById('final');
    let heroOut = false, endIn = false;
    const upd = () => bar.classList.toggle('on', heroOut && !endIn);
    if ('IntersectionObserver' in window) {
      if (hero) new IntersectionObserver(es => { heroOut = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; upd(); }).observe(hero);
      const ends = [pricing, final].filter(Boolean); const seen = new Set();
      if (ends.length) { const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); endIn = seen.size > 0; upd(); }); ends.forEach(el => io.observe(el)); }
    }
  }

  /* ---------- wire up ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-ex]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const i = idx(a.dataset.ex); if (i < 0) return;
    e.preventDefault(); open(i, a.closest('#does') ? 'home' : 'gallery');
  });
  function fromHash() { const m = location.hash.match(/^#ex=([\w-]+)/); if (m) { const i = idx(m[1]); if (i >= 0) open(i, 'link'); } }
  document.addEventListener('DOMContentLoaded', () => {
    menu(); gallery(); kitTabs(); buybar();
    window.SP && SP.apply && SP.apply();
    fromHash();
  });
  window.addEventListener('hashchange', fromHash);
})();
