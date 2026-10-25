(function () {
  "use strict";

  function badgeClass(d) {
    return "badge badge-" + d;
  }

  async function load() {
    var container = document.getElementById("exercise-grid");
    if (!container) return;

    try {
      var res = await window.KICA.api.get("/exercises");
      var exercises = res.exercises || [];

      if (exercises.length === 0) {
        container.innerHTML = '<p style="color:var(--color-text-muted)">No exercises yet.</p>';
        return;
      }

      container.innerHTML = exercises.map(function (e) {
        return `
          <article class="card card-hover">
            <span class="${badgeClass(e.difficulty)}">${e.difficulty}</span>
            <h3 class="card-title" style="margin-top:0.75rem;">${e.title}</h3>
            <div class="card-meta">
              <span>${e.language.toUpperCase()}</span>
              <span>·</span>
              <span>${e.points} pts</span>
              ${e.solved ? '<span>·</span><span style="color:var(--brand-success);">✓ Solved</span>' : ""}
            </div>
            <a class="btn btn-outline btn-sm" href="/exercise.html?slug=${e.slug}" style="margin-top:1rem;">Solve</a>
          </article>
        `;
      }).join("");
    } catch (err) {
      container.innerHTML = '<p style="color:var(--color-text-muted)">Failed to load exercises.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();