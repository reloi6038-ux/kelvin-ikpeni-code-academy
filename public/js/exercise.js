(function () {
  "use strict";

  var exercise = null;
  var ide = null;

  function getSlug() {
    return new URLSearchParams(window.location.search).get("slug") || "";
  }

  async function load() {
    var slug = getSlug();
    var brief = document.getElementById("exercise-brief");
    var ideMount = document.getElementById("ide-mount");

    if (!brief || !ideMount) {
      console.error("[exercise] Missing #exercise-brief or #ide-mount");
      return;
    }

    if (!slug) {
      brief.innerHTML = '<p style="color:var(--color-text-muted)">No exercise specified. <a href="/practice.html" style="color:var(--brand-accent)">Browse practice →</a></p>';
      return;
    }

    try {
      var res = await window.KICA.api.get("/exercises/" + slug);
      exercise = res.exercise;

      // Render brief
      var hintsHtml = "";
      if (exercise.hints && exercise.hints.length) {
        hintsHtml =
          '<details style="margin-top:1rem;color:var(--color-text-muted);">' +
            '<summary style="cursor:pointer;color:var(--brand-accent);font-weight:600;">Show Hints</summary>' +
            '<ul style="margin-top:0.5rem;">' +
              exercise.hints.map(function (h) { return "<li>" + h + "</li>"; }).join("") +
            "</ul>" +
          "</details>";
      }

      brief.innerHTML =
        '<span class="badge badge-' + exercise.difficulty + '">' + exercise.difficulty + "</span>" +
        '<h1 style="margin-top:0.75rem;">' + exercise.title + "</h1>" +
        '<div class="exercise-description">' + exercise.description + "</div>" +
        '<div class="card-meta" style="margin-bottom:1.5rem;">' +
          "<span>" + exercise.language.toUpperCase() + "</span>" +
          "<span>·</span>" +
          "<span>" + exercise.points + " pts</span>" +
        "</div>" +
        hintsHtml +
        '<button type="button" class="btn btn-ghost btn-sm" id="reveal-btn" style="margin-top:1rem; width:100%;">Show Solution</button>';

      // Mount the IDE
      ide = window.KICA.ide.create({
        containerId: "ide-mount",
        language: exercise.language,
        starterHtml: exercise.starterHtml,
        starterCss: exercise.starterCss,
        starterJs: exercise.starterJs,
        onSubmit: async function (code) {
          await submit(code);
        }
      });

      // Reveal solution listener
      document.getElementById("reveal-btn").addEventListener("click", async function () {
        try {
          var sol = await window.KICA.api.get("/exercises/" + slug + "/solution");
          var s = sol.solution;
          var code = s.html || s.css || s.js || "(no solution)";
          brief.insertAdjacentHTML("beforeend",
            '<details style="margin-top:1rem;" open>' +
              '<summary style="cursor:pointer;color:var(--brand-accent);font-weight:600;">Solution</summary>' +
              '<pre style="background:var(--color-surface-2);padding:1rem;border-radius:var(--radius-sm);margin-top:0.5rem;overflow:auto;font-size:0.85rem;"><code>' +
                escapeHtml(code) +
              "</code></pre>" +
            "</details>");
        } catch (err) {
          if (window.KICA.ui) window.KICA.ui.toast(err.message || "Could not load solution.", "error");
        }
      });
    } catch (err) {
      console.error("[exercise] Load failed:", err);
      brief.innerHTML = '<p style="color:var(--brand-danger)">Exercise not found. ' +
        '<a href="/practice.html" style="color:var(--brand-accent)">Back to practice →</a></p>';
    }
  }

  async function submit(code) {
    var resultsEl = document.getElementById("results-mount");
    if (!resultsEl) return;
    
    resultsEl.innerHTML = '<p style="color:var(--color-text-muted)">Running tests…</p>';
    try {
      var res = await window.KICA.api.post("/exercises/" + exercise.slug + "/submit", code);
      var success = res.success;
      
      resultsEl.innerHTML =
        '<div class="ide-results">' +
          '<h3 style="color:' + (success ? "var(--brand-success)" : "var(--brand-danger)") + ';">' +
            (success ? "✓ All tests passed!" : "✗ Some tests failed") +
          "</h3>" +
          '<p style="color:var(--color-text-muted);">' + res.passed + " of " + res.total + " tests passed</p>" +
          '<div class="test-list">' +
            res.results.map(function (r) {
              var expectedLine = !r.passed && r.expected !== undefined
                ? '<code>Expected: ' + JSON.stringify(r.expected) + " — Got: " + JSON.stringify(r.actual) + "</code>"
                : "";
              var errorLine = r.error ? '<code>Error: ' + r.error + "</code>" : "";
              return '<div class="test-case ' + (r.passed ? "passed" : "failed") + '">' +
                '<span class="test-icon">' + (r.passed ? "✓" : "✗") + "</span>" +
                '<div class="test-detail">' +
                  "<div>" + r.description + "</div>" +
                  expectedLine +
                  errorLine +
                "</div>" +
              "</div>";
            }).join("") +
          "</div>" +
        "</div>";

      if (success && window.KICA.ui) {
        window.KICA.ui.toast("Exercise solved! +" + exercise.points + " points", "success");
      }
    } catch (err) {
      resultsEl.innerHTML = '<p style="color:var(--brand-danger)">Submission failed: ' + (err.message || "unknown") + "</p>";
    }
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", load);
})();