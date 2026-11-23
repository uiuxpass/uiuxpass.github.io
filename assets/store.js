/* ===== The one file to fill in before launch (used by every page) ===== */
window.SP_CONFIG = {
  buyUrl: "",   /* TEMP until Gumroad is published: https://uiuxpass.gumroad.com/l/second-pass */          /* Gumroad paid product, e.g. https://uiuxpass.gumroad.com/l/second-pass */
  freeUrl: "https://github.com/uiuxpass/second-pass-free",   /* TEMP; later https://uiuxpass.gumroad.com/l/second-pass-free */          /* Gumroad free product, e.g. https://uiuxpass.gumroad.com/l/second-pass-free */
  cloudflareToken: "",   /* Cloudflare Web Analytics token (free): visitors, pages, referrers */
  plausibleDomain: "",   /* optional, Plausible (paid): adds click events — Buy click, Free click, Checker run */
  testimonials: [        /* only real quotes, with permission. Leave empty and the section stays hidden. */
    /* { quote: "…", name: "Full name", role: "Product designer, Company", url: "https://link-to-post", photo: "media/people/name.jpg" } */
  ]
};
window.SP = {
  apply() {
    const c = window.SP_CONFIG;
    if (c.buyUrl) document.querySelectorAll('[data-buy]').forEach(a => { a.href = c.buyUrl; });
    else document.querySelectorAll('[data-buy]').forEach(a => { const vi = document.documentElement.lang === 'vi'; a.textContent = vi ? 'Mở bán trong tuần này' : 'Opening this week'; a.href = a.closest('#pricing') ? (vi ? '#free' : '#free') : '#pricing'; });
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
