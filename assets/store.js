/* ===== The one file to fill in before launch (used by every page) ===== */
window.SP_CONFIG = {
  buyUrl: "https://uiuxpass.gumroad.com/l/second-pass",          /* Gumroad paid product, e.g. https://uiuxpass.gumroad.com/l/second-pass */
  freeUrl: "https://uiuxpass.gumroad.com/l/second-pass-free",          /* Gumroad free product, e.g. https://uiuxpass.gumroad.com/l/second-pass-free */
  launch: {             /* launch sale: Gumroad discount code, applied to every buy link until it ends, then the page goes back to list prices by itself */
    code: "LAUNCH40", percent: 40,
    ends: "2026-12-01T07:59:00Z",   /* = Nov 30, 11:59 PM PST, same as the code's end date in Gumroad */
    en: "Launch week · 40% off until Nov 30",
    vi: "Tuần mở bán · giảm 40% đến hết 30/11"
  },
  cloudflareToken: "",   /* Cloudflare Web Analytics token (free): visitors, pages, referrers */
  plausibleDomain: "",   /* optional, Plausible (paid): adds click events — Buy click, Free click, Checker run */
  testimonials: [        /* only real quotes, with permission. Leave empty and the section stays hidden. */
    /* { quote: "…", name: "Full name", role: "Product designer, Company", url: "https://link-to-post", photo: "media/people/name.jpg" } */
  ]
};
window.SP = {
  apply() {
    const c = window.SP_CONFIG;
    const L = c.launch, on = !!(c.buyUrl && L && L.code && Date.now() < Date.parse(L.ends));
    if (c.buyUrl) document.querySelectorAll('[data-buy]').forEach(a => { a.href = on ? c.buyUrl.replace(/\/$/, '') + '/' + L.code : c.buyUrl; });
    if (on) {
      const vi = document.documentElement.lang === 'vi', f = v => '$' + (Math.round(v * (100 - L.percent)) / 100).toFixed(2);
      document.querySelectorAll('[data-price]').forEach(el => { if (el.dataset.done) return; const v = +el.dataset.price; el.dataset.done = 1; el.innerHTML = `<s class="was"><span class="sr-only">${vi ? 'giá gốc ' : 'was '}</span>$${v}</s> <span class="sr-only">${vi ? 'giá mở bán ' : 'now '}</span>${f(v)}`; });
      document.querySelectorAll('[data-launch]').forEach(el => { el.textContent = vi ? L.vi : L.en; el.hidden = false; });
    }
    if (c.freeUrl) document.querySelectorAll('[data-free]').forEach(a => { a.href = c.freeUrl; });
  },
  track(name, props) { try { if (window.plausible) window.plausible(name, props ? { props } : undefined); } catch (e) {} },
  init() {
    const c = window.SP_CONFIG;
    this.apply();
    if (c.cloudflareToken) { const s = document.createElement('script'); s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js'; s.setAttribute('data-cf-beacon', JSON.stringify({ token: c.cloudflareToken })); document.head.appendChild(s); }
    if (c.plausibleDomain) { const s = document.createElement('script'); s.defer = true; s.src = 'https://plausible.io/js/script.js'; s.setAttribute('data-domain', c.plausibleDomain); document.head.appendChild(s); window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); }; }
    document.addEventListener('click', e => { const a = e.target.closest('[data-buy],[data-free]'); if (a) this.track(a.hasAttribute('data-buy') ? 'Buy click' : 'Free click', { page: location.pathname }); });
    const box = document.getElementById('love'); const list = c.testimonials.filter(t => t && t.quote && t.name);
    if (box && list.length) {
      const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
      box.querySelector('.love-grid').innerHTML = list.map(t => `<figure class="card" style="margin:0"><blockquote style="margin:0">“${esc(t.quote)}”</blockquote><figcaption class="note" style="margin-top:12px;display:flex;gap:10px;align-items:center">${t.photo ? `<img src="${esc(t.photo)}" alt="" width="36" height="36" style="border-radius:50%">` : ''}<span><strong>${esc(t.name)}</strong><br>${esc(t.role || '')}${t.url ? ` · <a href="${esc(t.url)}">source</a>` : ''}</span></figcaption></figure>`).join('');
      box.hidden = false;
    }
  }
};
document.addEventListener('DOMContentLoaded', () => window.SP.init());
