(function () {
  "use strict";

  var projectSlug = "";
  var taskSlug = "";
  var taskData = null;
  var ide = null;

  function getParams() {
    var p = new URLSearchParams(window.location.search);
    return { project: p.get("slug") || "", task: p.get("task") || "" };
  }

  async function load() {
    var params = getParams();
    projectSlug = params.project;
    taskSlug = params.task;

    var briefEl = document.getElementById("task-brief");
    var ideMount = document.getElementById("ide-mount");
    if (!briefEl || !ideMount) return;

    if (!projectSlug || !taskSlug) {
      briefEl.innerHTML = '<p style="color:var(--color-text-muted)">No task specified.</p>';
      return;
    }

    try {
      var res = await window.KICA.api.get("/projects/" + projectSlug + "/tasks/" + taskSlug);
      taskData = res.task;

      // Update back link
      document.getElementById("back-link").href = "/project-details.html?slug=" + projectSlug;
      document.getElementById("back-link").textContent = "← Back to " + res.project.title;

      // Render brief
      var hintsHtml = "";
      if (taskData.hints && taskData.hints.length) {
        hintsHtml =
          '<details style="margin-top:1rem;color:var(--color-text-muted);">' +
            '<summary style="cursor:pointer;color:var(--brand-accent);font-weight:600;">Hints</summary>' +
            '<ul style="margin-top:0.5rem;">' +
              taskData.hints.map(function (h) { return "<li>" + h + "</li>"; }).join("") +
            "</ul>" +
          "</details>";
      }

      briefEl.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span class="badge badge-brand">Task ' + taskData.index + ' of ' + taskData.total + '</span>' +
          '<span style="font-size:0.8rem;color:var(--color-text-muted);">' + taskData.estimatedMinutes + ' min</span>' +
        '</div>' +
        '<h1>' + taskData.title + '</h1>' +
        '<div class="task-description">' + taskData.description + '</div>' +
        hintsHtml +
        '<div class="task-actions">' +
          (taskData.prev ? '<a class="btn btn-ghost btn-sm" href="/project-task.html?slug=' + projectSlug + '&task=' + taskData.prev.slug + '">← Prev</a>' : '') +
          '<button class="btn btn-ghost btn-sm" id="save-btn">Save</button>' +
          '<button class="btn btn-primary btn-sm" id="complete-btn" ' + (taskData.completed ? 'disabled' : '') + '>' +
            (taskData.completed ? '✓ Completed' : 'Mark Complete') +
          '</button>' +
          (taskData.next && taskData.completed ? '<a class="btn btn-outline btn-sm" href="/project-task.html?slug=' + projectSlug + '&task=' + taskData.next.slug + '">Next →</a>' : '') +
        '</div>';

      // Mount IDE
      var saved = res.saved;
      ide = window.KICA.ide.create({
        containerId: "ide-mount",
        language: "html",
        starterHtml: (saved && saved.html) || taskData.starterHtml,
        starterCss: (saved && saved.css) || taskData.starterCss,
        starterJs: (saved && saved.js) || taskData.starterJs,
        onSubmit: null // no auto-grading for project tasks
      });

      // Save button
      document.getElementById("save-btn").addEventListener("click", async function () {
        var btn = this;
        btn.disabled = true;
        btn.textContent = "Saving…";
        try {
          var code = ide.getCode();
          await window.KICA.api.post("/projects/" + projectSlug + "/tasks/" + taskSlug + "/save", code);
          if (window.KICA.ui) window.KICA.ui.toast("Saved.", "success");
        } catch (err) {
          if (window.KICA.ui) window.KICA.ui.toast(err.message || "Save failed.", "error");
        }
        btn.disabled = false;
        btn.textContent = "Save";
      });

      // Complete button
      var completeBtn = document.getElementById("complete-btn");
      if (completeBtn && !taskData.completed) {
        completeBtn.addEventListener("click", async function () {
          completeBtn.disabled = true;
          completeBtn.textContent = "Saving…";
          try {
            var code = ide.getCode();
            var result = await window.KICA.api.post(
              "/projects/" + projectSlug + "/tasks/" + taskSlug + "/complete",
              code
            );
            if (window.KICA.ui) window.KICA.ui.toast("Task complete! " + result.percent + "% done.", "success");
            completeBtn.textContent = "✓ Completed";
            if (result.projectComplete) {
              setTimeout(function () {
                window.location.href = "/project-details.html?slug=" + projectSlug;
              }, 800);
            } else if (taskData.next) {
              setTimeout(function () {
                window.location.href = "/project-task.html?slug=" + projectSlug + "&task=" + taskData.next.slug;
              }, 800);
            }
          } catch (err) {
            if (window.KICA.ui) window.KICA.ui.toast(err.message || "Could not complete.", "error");
            completeBtn.disabled = false;
            completeBtn.textContent = "Mark Complete";
          }
        });
      }
    } catch (err) {
      briefEl.innerHTML = '<p style="color:var(--brand-danger)">Task not found.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();