(function () {
  "use strict";

  function renderCard(c) {
    return `
      <article class="card card-hover">
        <span class="badge badge-${c.difficulty}">${c.difficulty}</span>
        <h3 class="card-title" style="margin-top:0.75rem;">${c.icon} ${c.title}</h3>
        <p class="card-text">${c.description}</p>
        <div class="card-meta">
          <span>${c.lessonsCount} lessons</span>
          <span>·</span>
          <span>≈${c.estimatedHours}h</span>
        </div>
        <a class="btn btn-outline btn-sm" href="/course-details.html?slug=${c.slug}" style="margin-top:1rem;">View Course</a>
      </article>
    `;
  }

  async function load() {
    var frontendEl = document.getElementById("frontend-courses");
    var backendEl = document.getElementById("backend-courses");
    if (!frontendEl && !backendEl) return;

    try {
      var res = await window.KICA.api.get("/courses");
      var frontend = res.courses.filter(function (c) { return c.track === "frontend"; });
      var backend = res.courses.filter(function (c) { return c.track === "backend"; });

      if (frontendEl) frontendEl.innerHTML = frontend.map(renderCard).join("");
      if (backendEl) backendEl.innerHTML = backend.map(renderCard).join("");
    } catch (err) {
      console.error("Failed to load courses:", err);
      if (frontendEl) frontendEl.innerHTML = '<p style="color:var(--color-text-muted)">Could not load courses.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();