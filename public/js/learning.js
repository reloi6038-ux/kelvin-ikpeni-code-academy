(function () {
  "use strict";

  function getParams() {
    var p = new URLSearchParams(window.location.search);
    return { course: p.get("course") || "", lesson: p.get("lesson") || "" };
  }

  function renderLesson(data) {
    var lesson = data.lesson;
    var container = document.getElementById("lesson-content");

    var objectivesHtml = (lesson.learningObjectives || [])
      .map(function (o) { return "<li>" + o + "</li>"; }).join("");

    var codeHtml = lesson.codeExample
      ? "<h3>Code Example</h3><pre><code class='language-javascript'>" +
        lesson.codeExample.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
        "</code></pre>"
      : "";

    container.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
        <span class="badge badge-brand">Lesson ${lesson.index} of ${lesson.total}</span>
        <span style="color:var(--color-text-muted);font-size:0.85rem;">${lesson.estimatedMinutes} min read</span>
      </div>
      <h1 style="margin-top:0.75rem;">${lesson.title}</h1>
      ${objectivesHtml ? `<div class="card" style="margin-bottom:1.5rem;"><h3 class="card-title">Learning objectives</h3><ul>${objectivesHtml}</ul></div>` : ""}
      <div class="lesson-body">${lesson.contentHtml}</div>
      ${codeHtml}
      <div class="form-actions" style="margin-top:2rem;">
        ${lesson.prev ? `<a class="btn btn-ghost" href="/learning.html?course=${data.course.slug}&lesson=${lesson.prev.slug}">← ${lesson.prev.title}</a>` : `<span></span>`}
        <button class="btn btn-primary" id="complete-btn" ${lesson.completed ? "disabled" : ""}>
          ${lesson.completed ? "✓ Completed" : "Mark Complete"}
        </button>
        ${lesson.next ? `<a class="btn btn-primary" href="/learning.html?course=${data.course.slug}&lesson=${lesson.next.slug}">${lesson.next.title} →</a>` : `<span></span>`}
      </div>
    `;

    if (window.Prism) window.Prism.highlightAll();

    var completeBtn = document.getElementById("complete-btn");
    if (completeBtn && !lesson.completed) {
      completeBtn.addEventListener("click", async function () {
        completeBtn.disabled = true;
        completeBtn.textContent = "Saving…";
        try {
          var res = await window.KICA.api.post("/progress/" + data.course.slug + "/" + lesson.slug + "/complete");
          if (window.KICA.ui) window.KICA.ui.toast("Lesson complete! " + res.progressPercent + "% done.", "success");
          updateProgressUI(res.progressPercent, res.completedLessons, res.totalLessons);
          completeBtn.textContent = "✓ Completed";
          if (lesson.next) {
            setTimeout(function () {
              window.location.href = "/learning.html?course=" + data.course.slug + "&lesson=" + lesson.next.slug;
            }, 700);
          }
        } catch (err) {
          if (window.KICA.ui) window.KICA.ui.toast(err.message || "Could not mark complete.", "error");
          completeBtn.disabled = false;
          completeBtn.textContent = "Mark Complete";
        }
      });
    }
  }

  function updateProgressUI(percent, completed, total) {
    var bar = document.getElementById("progress-bar");
    var text = document.getElementById("progress-text");
    if (bar) bar.style.width = percent + "%";
    if (text) text.textContent = completed + " of " + total + " lessons complete (" + percent + "%)";
  }

  function renderSidebar(lessons, currentSlug, courseSlug) {
    var list = document.getElementById("lesson-list");
    if (!list) return;
    list.innerHTML = lessons.map(function (l) {
      var isActive = l.slug === currentSlug;
      var check = l.completed ? "✅" : (isActive ? "▶" : "·");
      return `<li style="${isActive ? "color:var(--brand-accent);font-weight:700;" : ""}">
        <a href="/learning.html?course=${courseSlug}&lesson=${l.slug}">
          ${check} ${l.order + 1}. ${l.title}
        </a>
      </li>`;
    }).join("");
  }

  async function load() {
    var params = getParams();
    if (!params.course || !params.lesson) {
      document.getElementById("lesson-content").innerHTML = '<p style="color:var(--color-text-muted)">No lesson specified. <a href="/courses.html" style="color:var(--brand-accent)">Browse courses →</a></p>';
      return;
    }

    try {
      var results = await Promise.all([
        window.KICA.api.get("/lessons/" + params.course + "/" + params.lesson),
        window.KICA.api.get("/lessons/course/" + params.course)
      ]);

      var lessonData = results[0];
      var courseData = results[1];

      renderLesson(lessonData);
      renderSidebar(courseData.lessons, params.lesson, params.course);

      var completed = courseData.lessons.filter(function (l) { return l.completed; }).length;
      var total = courseData.lessons.length;
      var percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      updateProgressUI(percent, completed, total);
    } catch (err) {
      document.getElementById("lesson-content").innerHTML = '<p style="color:var(--color-text-muted)">Lesson not found. <a href="/courses.html" style="color:var(--brand-accent)">Browse courses →</a></p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();