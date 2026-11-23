/* Thin bar on sample pages opened on their own: a way back and a way to buy. Hidden inside the examples viewer. */
(function () {
  if (window.self !== window.top) return;
  var id = (location.pathname.split('/').pop() || '').replace('.html', '');
  var map = { 'usability-report': 'usability-test', 'ux-benchmark': 'ux-benchmark', 'demo-before': 'polish', 'demo-after': 'polish' };
  var ex = map[id] || id;
  var css = '.sp-bar{position:relative;z-index:2147483000;display:flex;align-items:center;gap:8px 14px;flex-wrap:wrap;padding:8px 16px;background:#111214;color:#fff;font:500 14px/1.3 Geist,system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.sp-bar a{color:#fff;text-decoration:none;display:inline-flex;align-items:center;min-height:44px}' +
    '.sp-bar .sp-sp{flex:1;min-width:8px}.sp-bar .sp-dim{color:#B9BABE;font-weight:400}' +
    '.sp-bar .sp-buy{background:#fff;color:#111214;border-radius:999px;padding:0 16px}' +
    '.sp-bar a:focus-visible{outline:2px solid #3DD68C;outline-offset:2px}';
  function add() {
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    var b = document.createElement('div'); b.className = 'sp-bar'; b.setAttribute('role', 'navigation'); b.setAttribute('aria-label', 'UI/UX Pass');
    b.innerHTML = '<a href="../examples.html#ex=' + ex + '">← All examples</a><span class="sp-dim">Made by a UI/UX Pass skill · sample data</span><span class="sp-sp"></span><a class="sp-buy" href="../index.html#pricing">Get UI/UX Pass</a>';
    document.body.insertBefore(b, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();
