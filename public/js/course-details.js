(function () {
  "use strict";

  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get("slug") || "";
  }

  async function load() {
    var slug = getSlug();
    var container = document.getElementById("course-content");
    if (!container) return;

    if (!slug) {
      container.innerHTML = '<p style="color:var(--color-text-muted)">Course not specified.</p>';
      return;
    }

    try {
      var results = await Promise.all([
        window.KICA.api.get("/courses/" + slug),
        window.KICA.api.get("/lessons/course/" + slug).catch(function () { return { lessons: [] }; }),
        window.KICA.api.get("/quizzes/course/" + slug).catch(function () { return { quizzes: [] }; })
      ]);

      var c = results[0].course;
      var lessons = results[1].lessons || [];
      var quizzes = results[2].quizzes || [];

      var outcomesHtml = (c.outcomes || []).map(function (o) { return "<li>" + o + "</li>"; }).join("");

      var lessonsHtml = lessons.length
        ? lessons.map(function (l) {
            return '<div class="course-item" style="grid-template-columns: 40px 1fr auto;">' +
              '<div style="display:grid;place-items:center;width:32px;height:32px;border-radius:6px;background:var(--color-surface-2);font-weight:700;font-size:0.85rem;">' + (l.order + 1) + '</div>' +
              '<div>' +
                '<h4 style="margin:0;font-size:1rem;">' + l.title + '</h4>' +
                '<p style="margin:0;font-size:0.85rem;color:var(--color-text-muted);">' + l.estimatedMinutes + ' min</p>' +
              '</div>' +
              '<span class="badge ' + (l.completed ? 'badge-brand' : '') + '">' + (l.completed ? '✓ Done' : 'Start') + '</span>' +
            '</div>';
          }).join("")
        : '<p style="color:var(--color-text-muted)">Lessons loading…</p>';

      var quizzesHtml = quizzes.length
        ? quizzes.map(function (q) {
            return '<div class="course-item" style="grid-template-columns: 40px 1fr auto;">' +
              '<div style="display:grid;place-items:center;width:32px;height:32px;border-radius:6px;background:rgba(139,92,246,0.15);font-weight:700;font-size:0.85rem;color:var(--brand-accent);">📝</div>' +
              '<div>' +
                '<h4 style="margin:0;font-size:1rem;">' + q.title + '</h4>' +
                '<p style="margin:0;font-size:0.85rem;color:var(--color-text-muted);">' +
                  q.totalQuestions + " questions · Pass: " + q.passPercent + "%" +
                '</p>' +
              '</div>' +
              '<a class="btn btn-outline btn-sm" href="/quiz.html?slug=' + q.slug + '">' +
                (q.passed ? "✓ Passed" : (q.attempts > 0 ? "Retry" : "Start")) +
              '</a>' +
            '</div>';
          }).join("")
        : "";

      container.innerHTML = `
        <span class="badge badge-${c.difficulty}">${c.difficulty}</span>
        <h1 style="margin-top:0.75rem;">${c.icon} ${c.title}</h1>
        <p class="lead">${c.description}</p>
        <div class="card" style="margin-top:1.5rem;">
          <h3 class="card-title">What you'll learn</h3>
          <ul>${outcomesHtml}</ul>
        </div>
        <h2 style="margin-top:2rem;">Curriculum</h2>
        <div class="course-list">${lessonsHtml}</div>
        
        <h2 style="margin-top:2rem;">Final Quiz</h2>
        <div class="course-list">${quizzesHtml || '<p style="color:var(--color-text-muted)">No quiz for this course.</p>'}</div>
      `;

      // Update the enrol/continue button based on enrolment status
      var enrolBtn = document.getElementById("enrol-btn");
      if (enrolBtn) {
        try {
          var meRes = await window.KICA.api.get("/enrollments/me");
          var enrolled = (meRes.enrollments || []).some(function (e) { return e.course && e.course.slug === slug; });
          
          if (enrolled) {
            enrolBtn.textContent = "Continue Learning";
            enrolBtn.onclick = function () {
              var firstIncomplete = lessons.find(function (l) { return !l.completed; }) || lessons[0];
              if (firstIncomplete) {
                window.location.href = "/learning.html?course=" + slug + "&lesson=" + firstIncomplete.slug;
              } else {
                // If all lessons done, maybe go to quiz?
                if (quizzes.length && !quizzes.every(function(q) { return q.passed; })) {
                  window.location.href = "/quiz.html?slug=" + quizzes[0].slug;
                } else {
                  window.location.href = "/learning.html?course=" + slug;
                }
              }
            };
          } else {
            enrolBtn.textContent = "Enrol Now";
            enrolBtn.addEventListener("click", async function () {
              enrolBtn.disabled = true;
              enrolBtn.textContent = "Enrolling...";
              try {
                await window.KICA.api.post("/enrollments/" + slug);
                if (window.KICA.ui) window.KICA.ui.toast("Enrolled! Redirecting to first lesson...", "success");
                var firstLesson = lessons[0];
                setTimeout(function () {
                  if (firstLesson) window.location.href = "/learning.html?course=" + slug + "&lesson=" + firstLesson.slug;
                  else window.location.href = "/dashboard.html";
                }, 800);
              } catch (err) {
                if (window.KICA.ui) window.KICA.ui.toast(err.message || "Enrolment failed.", "error");
                enrolBtn.disabled = false;
                enrolBtn.textContent = "Enrol Now";
              }
            });
          }
        } catch (_) {
          // Not logged in — fallback to plain enrol flow
        }
      }
    } catch (err) {
      container.innerHTML = '<p style="color:var(--color-text-muted)">Course not found.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();