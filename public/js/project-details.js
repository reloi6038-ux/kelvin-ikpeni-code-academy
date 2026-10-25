(function () {
  "use strict";

  function getSlug() {
    return new URLSearchParams(window.location.search).get("slug") || "";
  }

  async function load() {
    var slug = getSlug();
    var header = document.getElementById("project-header");
    var tasksEl = document.getElementById("project-tasks");
    if (!header || !tasksEl) return;

    if (!slug) {
      header.innerHTML = '<p style="color:var(--color-text-muted)">No project specified.</p>';
      return;
    }

    try {
      var res = await window.KICA.api.get("/projects/" + slug);
      var p = res.project;
      var tasks = res.tasks || [];

      var objectivesHtml = (p.objectives || []).map(function (o) {
        return "<li>" + o + "</li>";
      }).join("");

      header.innerHTML =
        '<span class="badge badge-' + p.difficulty + '">' + p.difficulty + '</span>' +
        '<h1 style="margin-top:0.75rem;">' + p.icon + ' ' + p.title + '</h1>' +
        '<p class="lead">' + p.description + '</p>' +
        (objectivesHtml ? '<div class="card" style="margin-top:1.5rem;"><h3 class="card-title">Learning Objectives</h3><ul>' + objectivesHtml + '</ul></div>' : '');

      if (p.comingSoon || tasks.length === 0) {
        tasksEl.innerHTML = '<div class="alert alert-info">This project is coming soon. Check back later!</div>';
        return;
      }

      tasksEl.innerHTML = tasks.map(function (t) {
        return '<a class="task-item' + (t.completed ? " completed" : "") + '" href="/project-task.html?slug=' + slug + '&task=' + t.slug + '">' +
          '<div class="task-num">' + (t.completed ? "✓" : (t.order + 1)) + '</div>' +
          '<div>' +
            '<h4>' + t.title + '</h4>' +
            '<p>' + t.estimatedMinutes + ' min</p>' +
          '</div>' +
          '<span class="badge">' + (t.completed ? 'Done' : 'Start') + '</span>' +
        '</a>';
      }).join("");
    } catch (err) {
      header.innerHTML = '<p style="color:var(--brand-danger)">Project not found.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();