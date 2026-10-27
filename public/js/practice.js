(function () {
  "use strict";

  var allExercises = [];

  function badgeClass(d) {
    return "badge badge-" + d;
  }

  function renderExercises(exercises) {
    var container = document.getElementById("exercise-grid");
    if (!exercises.length) {
      container.innerHTML = '<p style="color:var(--color-text-muted); grid-column: 1 / -1;">No exercises found matching your criteria.</p>';
      return;
    }

    container.innerHTML = exercises.map(function (e) {
      return `
        <article class="card card-hover">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
            <span class="${badgeClass(e.difficulty)}">${e.difficulty}</span>
            ${e.solved ? '<span class="badge badge-success">✓ Solved</span>' : ''}
          </div>
          <h3 class="card-title" style="margin-top:0;">${e.title}</h3>
          <div class="card-meta" style="margin-bottom:1rem;">
            <span>${e.language.toUpperCase()}</span>
            <span>·</span>
            <span>${e.points} pts</span>
          </div>
          <a class="btn btn-outline btn-sm" href="/exercise.html?slug=${e.slug}" style="width:100%;">Solve</a>
        </article>
      `;
    }).join("");
  }

  function applyFilters() {
    var params = new URLSearchParams(window.location.search);
    var languageFilter = params.get("language");
    var topicFilter = params.get("topic");
    
    // Search input (live)
    var searchInput = document.getElementById("exercise-search");
    var searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

    var filtered = allExercises.filter(function (e) {
      // Filter by URL params
      if (languageFilter && e.language !== languageFilter) return false;
      if (topicFilter && e.topic !== topicFilter) return false;
      
      // Filter by search term
      if (searchTerm && !e.title.toLowerCase().includes(searchTerm)) return false;
      
      return true;
    });

    renderExercises(filtered);
  }

  async function load() {
    var container = document.getElementById("exercise-grid");
    if (!container) return;

    try {
      var res = await window.KICA.api.get("/exercises");
      allExercises = res.exercises || [];

      // Wire up search input if it exists
      var searchInput = document.getElementById("exercise-search");
      if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
      }

      // Initial render with URL filters
      applyFilters();
      
    } catch (err) {
      container.innerHTML = '<p style="color:var(--color-text-muted); grid-column: 1 / -1;">Failed to load exercises.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();