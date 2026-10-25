/**
 * Kelvin Ikpeni Code Academy — main.js
 * Loads theme immediately, then injects partials, then wires page bits.
 */
(function () {
  "use strict";

  // 1) Load theme FIRST (before partials) so there's no flash
  // theme.js is loaded via <script src="/js/theme.js"> in <head>.

  // 2) Load UI helpers
  // ui.js and api.js are loaded via <script> tags in the page.

  // 3) Inject shared header/footer
  // partials.js handles this on DOMContentLoaded.

  // 4) On theme change, update meta theme-color for the address bar
  document.addEventListener("kica:theme-change", function (e) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", e.detail.theme === "light" ? "#f6f7fb" : "#5b7cfa");
  });

  // 5) Optional: ping health endpoint once per page load (visible in Network tab)
  document.addEventListener("DOMContentLoaded", function () {
    if (window.KICA && window.KICA.api) {
      window.KICA.api.health().catch(function () { /* silent */ });
    }
  });
})();