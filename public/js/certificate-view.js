(function () {
  "use strict";

  function getId() {
    return new URLSearchParams(window.location.search).get("id") || "";
  }

  async function load() {
    var mount = document.getElementById("cert-mount");
    var id = getId();
    if (!mount) return;

    if (!id) {
      mount.innerHTML = '<p style="color:var(--color-text-muted);text-align:center;">No certificate ID specified.</p>';
      return;
    }

    try {
      var res = await window.KICA.api.get("/certificates/" + encodeURIComponent(id));
      var c = res.certificate;
      var issued = new Date(c.issuedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      });

      mount.innerHTML =
        '<div class="cert-display">' +
          '<div class="cert-eyebrow">Certificate of Completion</div>' +
          '<h1 class="cert-brand">Kelvin Ikpeni Code Academy</h1>' +
          '<div class="cert-brand-tagline">Learn to Code. Build to Lead.</div>' +
          '<p class="cert-certifies">This certifies that</p>' +
          '<h2 class="cert-recipient">' + escapeHtml(c.recipientName) + '</h2>' +
          '<div class="cert-divider"></div>' +
          '<p class="cert-completed">has successfully completed the course</p>' +
          '<div class="cert-course">' + escapeHtml(c.courseTitle) + '</div>' +
          '<p class="cert-date">Issued on ' + issued + '</p>' +
          '<div class="cert-footer">' +
            '<div class="cert-signature">' +
              '<strong>Kelvin Ikpeni</strong>' +
              '<span>Founder &amp; Instructor</span>' +
            '</div>' +
            '<div class="cert-id-block">' +
              '<div class="label">Certificate ID</div>' +
              '<div class="value">' + escapeHtml(c.certificateId) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="cert-actions">' +
          '<a class="btn btn-primary" href="/api/certificates/' + encodeURIComponent(c.certificateId) + '/pdf">Download PDF</a>' +
          '<a class="btn btn-ghost" href="/certificate-verify.html?id=' + encodeURIComponent(c.certificateId) + '">Verify</a>' +
          '<a class="btn btn-ghost" href="/certificates.html">All Certificates</a>' +
        '</div>';
    } catch (err) {
      mount.innerHTML = '<p style="color:var(--brand-danger);text-align:center;">' +
        (err.message || "Could not load certificate.") + '</p>';
    }
  }

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", load);
})();