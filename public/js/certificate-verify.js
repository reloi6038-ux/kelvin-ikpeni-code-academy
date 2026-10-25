(function () {
  "use strict";

  var form = document.getElementById("verifyForm");
  var resultEl = document.getElementById("verify-result");

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async function verify(id) {
    if (!id) return;
    resultEl.innerHTML = '<p style="color:var(--color-text-muted);">Verifying…</p>';
    try {
      var res = await window.KICA.api.get("/certificates/verify/" + encodeURIComponent(id));
      if (res.valid) {
        var c = res.certificate;
        var issued = new Date(c.issuedAt).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        });
        resultEl.innerHTML =
          '<div class="card" style="border-color:var(--brand-success);">' +
            '<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">' +
              '<div style="font-size:2rem;">✅</div>' +
              '<div><h3 style="margin:0;color:var(--brand-success);">Valid Certificate</h3>' +
              '<p style="margin:0;font-size:0.9rem;color:var(--color-text-muted);">This certificate is authentic.</p></div>' +
            '</div>' +
            '<table class="table">' +
              '<tr><th style="width:40%;">Recipient</th><td>' + escapeHtml(c.recipientName) + '</td></tr>' +
              '<tr><th>Course</th><td>' + escapeHtml(c.courseTitle) + '</td></tr>' +
              '<tr><th>Certificate ID</th><td><code>' + escapeHtml(c.certificateId) + '</code></td></tr>' +
              '<tr><th>Issued</th><td>' + issued + '</td></tr>' +
            '</table>' +
          '</div>';
      } else {
        resultEl.innerHTML =
          '<div class="alert alert-error" style="padding:1.5rem;text-align:center;">' +
            '<h3 style="margin-top:0;color:var(--brand-danger);">❌ Invalid Certificate</h3>' +
            '<p style="margin:0;">' + escapeHtml(res.reason || "Certificate not found.") + '</p>' +
          '</div>';
      }
    } catch (err) {
      resultEl.innerHTML =
        '<div class="alert alert-error" style="padding:1.5rem;text-align:center;">' +
          '<h3 style="margin-top:0;">Verification failed</h3>' +
          '<p style="margin:0;">' + escapeHtml(err.message || "Could not verify.") + '</p>' +
        '</div>';
    }
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var id = form.certId.value.trim().toUpperCase();
      verify(id);
      // Update URL so the result is shareable
      var url = new URL(window.location);
      url.searchParams.set("id", id);
      window.history.replaceState({}, "", url);
    });
  }

  // Auto-verify if ?id= is in the URL
  document.addEventListener("DOMContentLoaded", function () {
    var id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      if (form) form.certId.value = id;
      verify(id.toUpperCase());
    }
  });
})();