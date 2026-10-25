(function () {
  "use strict";

  async function load() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;

    try {
      var res = await window.KICA.api.get("/projects");
      var projects = res.projects || [];

      if (projects.length === 0) {
        grid.innerHTML = '<p style="color:var(--color-text-muted)">No projects yet.</p>';
        return;
      }

      grid.innerHTML = projects.map(function (p) {
        var classes = "project-card" + (p.comingSoon ? " coming-soon" : "");
        var statusBadge = "";
        if (p.started && !p.comingSoon) {
          statusBadge = '<span class="badge badge-brand" style="margin-left:0.5rem;">' + p.percent + '%</span>';
        }

        var actionLink = p.comingSoon
          ? '<span class="btn btn-ghost btn-sm" style="margin-top:1rem;opacity:0.5;cursor:not-allowed;">Coming Soon</span>'
          : '<a class="btn btn-primary btn-sm" href="/project-details.html?slug=' + p.slug + '" style="margin-top:1rem;">' + (p.started ? "Continue" : "Start Project") + '</a>';

        return '<article class="' + classes + '">' +
          '<span class="badge badge-' + p.difficulty + '">' + p.difficulty + '</span>' +
          '<span class="project-icon">' + p.icon + '</span>' +
          '<h3 class="card-title">' + p.title + statusBadge + '</h3>' +
          '<p class="card-text">' + p.description + '</p>' +
          '<div class="card-meta">' +
            '<span>' + p.totalTasks + ' tasks</span>' +
            '<span>·</span>' +
            '<span>≈' + p.estimatedHours + 'h</span>' +
          '</div>' +
          actionLink +
        '</article>';
      }).join("");
    } catch (err) {
      grid.innerHTML = '<p style="color:var(--color-text-muted)">Could not load projects.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();