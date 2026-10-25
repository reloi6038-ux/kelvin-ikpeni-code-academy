(function () {
  "use strict";

  async function load() {
    var grid = document.getElementById("cert-grid");
    if (!grid) return;

    try {
      var res = await window.KICA.api.get("/certificates/me");
      var certs = res.certificates || [];

      if (certs.length === 0) {
        grid.innerHTML =
          '<div class="card" style="grid-column:1/-1;text-align:center;padding:3rem;">' +
            '<div class="cert-ribbon">🏅</div>' +
            '<h3 style="margin-top:0;">No certificates yet</h3>' +
            '<p class="card-text">Complete a course to earn your first certificate.</p>' +
            '<a class="btn btn-primary btn-sm" href="/courses.html" style="margin-top:1rem;">Browse Courses</a>' +
          '</div>';
        return;
      }

      grid.innerHTML = certs.map(function (c) {
        var issued = new Date(c.issuedAt).toLocaleDateString(undefined, {
          year: "numeric", month: "long", day: "numeric"
        });
        return '<article class="cert-card">' +
          '<div class="cert-ribbon">🏅</div>' +
          '<h3>' + escapeHtml(c.courseTitle) + '</h3>' +
          '<div class="cert-meta">Issued to ' + escapeHtml(c.recipientName) + ' on ' + issued + '</div>' +
          '<div class="cert-id">' + escapeHtml(c.certificateId) + '</div>' +
          '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">' +
            '<a class="btn btn-primary btn-sm" href="/certificate-view.html?id=' + encodeURIComponent(c.certificateId) + '">View</a>' +
            '<a class="btn btn-ghost btn-sm" href="/api/certificates/' + encodeURIComponent(c.certificateId) + '/pdf">Download PDF</a>' +
            '<a class="btn btn-ghost btn-sm" href="/certificate-verify.html?id=' + encodeURIComponent(c.certificateId) + '">Verify</a>' +
          '</div>' +
        '</article>';
      }).join("");
    } catch (err) {
      grid.innerHTML = '<p style="color:var(--color-text-muted)">Could not load certificates.</p>';
    }
  }

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", load);
})();