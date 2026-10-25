/**
 * Kelvin Ikpeni Code Academy — Tiny UI helpers
 * Toasts, alerts, loading states, formatters.
 */
(function () {
  "use strict";

  function toast(message, type, timeoutMs) {
    type = type || "info";
    timeoutMs = timeoutMs || 3200;
    var el = document.createElement("div");
    el.className = "alert alert-" + type;
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.textContent = message;
    el.style.position = "fixed";
    el.style.top = "80px";
    el.style.right = "20px";
    el.style.zIndex = "9999";
    el.style.minWidth = "240px";
    el.style.boxShadow = "var(--shadow-md)";
    el.style.background = "var(--color-surface)";
    document.body.appendChild(el);
    window.setTimeout(function () {
      el.style.opacity = "0";
      el.style.transition = "opacity 200ms ease";
      window.setTimeout(function () { el.remove(); }, 220);
    }, timeoutMs);
  }

  function setLoading(button, isLoading, labelWhenLoading) {
    if (!button) return;
    if (isLoading) {
      button.dataset._origText = button.textContent;
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span> ' + (labelWhenLoading || "Loading…");
    } else {
      button.disabled = false;
      if (button.dataset._origText) {
        button.textContent = button.dataset._origText;
        delete button.dataset._origText;
      }
    }
  }

  function formatDate(iso) {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch (_) { return "—"; }
  }

  window.KICA = window.KICA || {};
  window.KICA.ui = { toast: toast, setLoading: setLoading, formatDate: formatDate };
})();