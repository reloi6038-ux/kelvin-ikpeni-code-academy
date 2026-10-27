(function () {
  "use strict";

  function toast(msg, type) {
    if (window.KICA && window.KICA.ui) return window.KICA.ui.toast(msg, type);
    console.log("[toast]", type, msg);
  }

  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function wireTabs() {
    var tabs = document.querySelectorAll(".admin-tab");
    var panels = document.querySelectorAll(".admin-panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        panels.forEach(function (p) { p.classList.remove("active"); });
        document.getElementById("panel-" + target).classList.add("active");

        if (target === "users") loadUsers();
        if (target === "courses") loadCourses();
        if (target === "quizzes") loadQuizzes();
        if (target === "certificates") loadCertificates();
        if (target === "announcements") loadAnnouncements();
        if (target === "contacts") loadContacts();
      });
    });
  }

  // ---------- Overview ----------
  async function loadOverview() {
    var grid = document.getElementById("analytics-grid");
    try {
      var res = await window.KICA.api.get("/admin/analytics");
      var a = res.analytics;
      var cards = [
        ["Students", a.totalStudents, "registered"],
        ["Courses", a.totalCourses, "published"],
        ["Enrolments", a.totalEnrollments, "total"],
        ["Completions", a.totalCompletions, "courses finished"],
        ["Certificates", a.totalCertificates, "issued"],
        ["Exercises Solved", a.totalExercisesSolved, "all-time"],
        ["Quizzes Passed", a.totalQuizzesPassed, "all-time"]
      ];
      grid.innerHTML = cards.map(function (c) {
        return '<div class="stat-card"><h4>' + c[0] + '</h4><strong>' + c[1] + '</strong><small>' + c[2] + '</small></div>';
      }).join("");
    } catch (err) {
      grid.innerHTML = '<p style="color:var(--brand-danger)">Could not load analytics.</p>';
    }
  }

  // ---------- Users ----------
  async function loadUsers() {
    var wrap = document.getElementById("users-table-wrap");
    var search = document.getElementById("user-search").value || "";
    try {
      var url = "/admin/users" + (search ? "?q=" + encodeURIComponent(search) : "");
      var res = await window.KICA.api.get(url);
      if (!res.users.length) {
        wrap.innerHTML = '<p style="color:var(--color-text-muted)">No users found.</p>';
        return;
      }
      wrap.innerHTML =
        '<table class="admin-table"><thead><tr>' +
          "<th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        res.users.map(function (u) {
          var roleBadge = u.role === "admin" ? '<span class="status-badge status-admin">Admin</span>' : "Student";
          var statusBadge = u.isActive ? '<span class="status-badge status-active">Active</span>' : '<span class="status-badge status-inactive">Suspended</span>';
          return "<tr>" +
            "<td>" + esc(u.name) + "</td>" +
            "<td>" + esc(u.email) + "</td>" +
            "<td>" + roleBadge + "</td>" +
            "<td>" + statusBadge + "</td>" +
            "<td>" + new Date(u.createdAt).toLocaleDateString() + "</td>" +
            "<td>" +
              '<button class="btn btn-ghost btn-sm" data-user-role="' + u.id + '" data-current-role="' + u.role + '">Toggle Role</button> ' +
              '<button class="btn btn-ghost btn-sm" data-user-active="' + u.id + '" data-current-active="' + u.isActive + '">' + (u.isActive ? "Suspend" : "Reactivate") + "</button>" +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      wrap.querySelectorAll("[data-user-role]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          var id = btn.getAttribute("data-user-role");
          var current = btn.getAttribute("data-current-role");
          var next = current === "admin" ? "student" : "admin";
          try {
            await window.KICA.api.patch("/admin/users/" + id, { role: next });
            toast("Role updated to " + next, "success");
            loadUsers();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });

      wrap.querySelectorAll("[data-user-active]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          var id = btn.getAttribute("data-user-active");
          var current = btn.getAttribute("data-current-active") === "true";
          try {
            await window.KICA.api.patch("/admin/users/" + id, { isActive: !current });
            toast(!current ? "Reactivated" : "Suspended", "success");
            loadUsers();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load users.</p>';
    }
  }

  // ---------- Courses ----------
  async function loadCourses() {
    var wrap = document.getElementById("courses-table-wrap");
    try {
      var res = await window.KICA.api.get("/courses");
      wrap.innerHTML =
        '<table class="admin-table"><thead><tr>' +
          "<th>Title</th><th>Track</th><th>Difficulty</th><th>Lessons</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        res.courses.map(function (c) {
          return "<tr>" +
            "<td>" + esc(c.icon) + " " + esc(c.title) + "</td>" +
            "<td>" + esc(c.track) + "</td>" +
            "<td>" + esc(c.difficulty) + "</td>" +
            "<td>" + (c.lessonsCount || 0) + "</td>" +
            "<td>" +
              '<button class="btn btn-ghost btn-sm" data-course-edit="' + c.slug + '">Edit</button> ' +
              '<button class="btn btn-ghost btn-sm" data-course-lessons="' + c.slug + '">Lessons</button> ' +
              '<button class="btn btn-ghost btn-sm" data-course-delete="' + c.slug + '" style="color:var(--brand-danger);">Delete</button>' +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      wrap.querySelectorAll("[data-course-edit]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          openCourseEditor(btn.getAttribute("data-course-edit"));
        });
      });
      wrap.querySelectorAll("[data-course-lessons]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          openLessonsManager(btn.getAttribute("data-course-lessons"));
        });
      });
      wrap.querySelectorAll("[data-course-delete]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          if (!confirm("Delete this course? This cannot be undone.")) return;
          try {
            await window.KICA.api.del("/admin/courses/" + btn.getAttribute("data-course-delete"));
            toast("Course deleted", "success");
            loadCourses();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load courses.</p>';
    }
  }

  document.getElementById("new-course-btn").addEventListener("click", function () {
    var root = document.getElementById("modal-root");
    root.innerHTML =
      '<div class="modal-backdrop"><div class="modal-card">' +
        "<h3>Create Course</h3>" +
        '<div class="form">' +
          '<div class="field"><label>Title</label><input class="input" id="mc-title" required /></div>' +
          '<div class="field"><label>Description</label><textarea class="textarea" id="mc-desc" rows="4" required></textarea></div>' +
          '<div class="field"><label>Track</label><select class="select" id="mc-track"><option value="frontend">Frontend</option><option value="backend">Backend</option><option value="fullstack">Fullstack</option></select></div>' +
          '<div class="field"><label>Difficulty</label><select class="select" id="mc-diff"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>' +
          '<div class="field"><label>Estimated hours</label><input class="input" type="number" id="mc-hours" value="4" /></div>' +
          '<div class="field"><label>Icon (emoji)</label><input class="input" id="mc-icon" value="📘" maxlength="2" /></div>' +
        "</div>" +
        '<div class="form-actions" style="margin-top:1rem;">' +
          '<button class="btn btn-primary" id="mc-save">Create</button>' +
          '<button class="btn btn-ghost" id="mc-cancel">Cancel</button>' +
        "</div>" +
      "</div></div>";

    document.getElementById("mc-cancel").addEventListener("click", function () { root.innerHTML = ""; });
    document.getElementById("mc-save").addEventListener("click", async function () {
      var btn = this;
      btn.disabled = true;
      btn.textContent = "Creating…";
      try {
        await window.KICA.api.post("/admin/courses", {
          title: document.getElementById("mc-title").value.trim(),
          description: document.getElementById("mc-desc").value.trim(),
          track: document.getElementById("mc-track").value,
          difficulty: document.getElementById("mc-diff").value,
          estimatedHours: parseInt(document.getElementById("mc-hours").value, 10),
          icon: document.getElementById("mc-icon").value.trim() || "📘"
        });
        toast("Course created", "success");
        root.innerHTML = "";
        loadCourses();
      } catch (err) {
        toast(err.message || "Failed", "error");
        btn.disabled = false;
        btn.textContent = "Create";
      }
    });
  });

  async function openCourseEditor(slug) {
    var root = document.getElementById("modal-root");
    try {
      var res = await window.KICA.api.get("/admin/courses/" + slug);
      var c = res.course;

      root.innerHTML =
        '<div class="modal-backdrop"><div class="modal-card">' +
          "<h3>Edit Course: " + esc(c.title) + "</h3>" +
          '<div class="form">' +
            '<div class="field"><label>Title</label><input class="input" id="ec-title" value="' + esc(c.title) + '" /></div>' +
            '<div class="field"><label>Description</label><textarea class="textarea" id="ec-desc" rows="4">' + esc(c.description) + '</textarea></div>' +
            '<div class="field"><label>Summary</label><input class="input" id="ec-summary" value="' + esc(c.summary || "") + '" /></div>' +
            '<div class="field"><label>Track</label><select class="select" id="ec-track">' +
              '<option value="frontend"' + (c.track === "frontend" ? " selected" : "") + '>Frontend</option>' +
              '<option value="backend"' + (c.track === "backend" ? " selected" : "") + '>Backend</option>' +
              '<option value="fullstack"' + (c.track === "fullstack" ? " selected" : "") + '>Fullstack</option>' +
              '<option value="capstone"' + (c.track === "capstone" ? " selected" : "") + '>Capstone</option>' +
            "</select></div>" +
            '<div class="field"><label>Difficulty</label><select class="select" id="ec-diff">' +
              '<option value="beginner"' + (c.difficulty === "beginner" ? " selected" : "") + '>Beginner</option>' +
              '<option value="intermediate"' + (c.difficulty === "intermediate" ? " selected" : "") + '>Intermediate</option>' +
              '<option value="advanced"' + (c.difficulty === "advanced" ? " selected" : "") + '>Advanced</option>' +
            "</select></div>" +
            '<div class="field"><label>Estimated hours</label><input class="input" type="number" id="ec-hours" value="' + (c.estimatedHours || 4) + '" /></div>' +
            '<div class="field"><label>Icon (emoji)</label><input class="input" id="ec-icon" value="' + esc(c.icon || "📘") + '" maxlength="2" /></div>' +
            '<div class="field"><label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">' +
              '<input type="checkbox" id="ec-published"' + (c.published ? " checked" : "") + ' /> Published (visible to students)' +
            "</label></div>" +
          "</div>" +
          '<div class="form-actions" style="margin-top:1rem;">' +
            '<button class="btn btn-primary" id="ec-save">Save Changes</button>' +
            '<button class="btn btn-ghost" id="ec-cancel">Cancel</button>' +
          "</div>" +
        "</div></div>";

      document.getElementById("ec-cancel").addEventListener("click", function () { root.innerHTML = ""; });
      document.getElementById("ec-save").addEventListener("click", async function () {
        var btn = this;
        btn.disabled = true;
        btn.textContent = "Saving…";
        try {
          await window.KICA.api.patch("/admin/courses/" + slug, {
            title: document.getElementById("ec-title").value.trim(),
            description: document.getElementById("ec-desc").value.trim(),
            summary: document.getElementById("ec-summary").value.trim(),
            track: document.getElementById("ec-track").value,
            difficulty: document.getElementById("ec-diff").value,
            estimatedHours: parseInt(document.getElementById("ec-hours").value, 10) || 4,
            icon: document.getElementById("ec-icon").value.trim() || "📘",
            published: document.getElementById("ec-published").checked
          });
          toast("Course updated", "success");
          root.innerHTML = "";
          loadCourses();
        } catch (err) {
          toast(err.message || "Failed", "error");
          btn.disabled = false;
          btn.textContent = "Save Changes";
        }
      });
    } catch (err) {
      toast("Could not load course", "error");
    }
  }

  // ---------- Lessons (inside Course editor) ----------
  async function openLessonsManager(courseSlug) {
    var root = document.getElementById("modal-root");
    root.innerHTML =
      '<div class="modal-backdrop"><div class="modal-card" style="max-width:800px;">' +
        "<div style='display:flex;justify-content:space-between;align-items:center;'>" +
          "<h3>Lessons</h3>" +
          '<button class="btn btn-primary btn-sm" id="lm-new">+ New Lesson</button>' +
        "</div>" +
        '<div id="lm-list" style="margin-top:1rem;"><p style="color:var(--color-text-muted);">Loading lessons…</p></div>' +
        '<div class="form-actions" style="margin-top:1rem;">' +
          '<button class="btn btn-ghost" id="lm-close">Close</button>' +
        "</div>" +
      "</div></div>";

    document.getElementById("lm-close").addEventListener("click", function () { root.innerHTML = ""; });
    document.getElementById("lm-new").addEventListener("click", function () {
      openLessonEditor(courseSlug, null);
    });

    await refreshLessonsList(courseSlug);
  }

  async function refreshLessonsList(courseSlug) {
    var list = document.getElementById("lm-list");
    if (!list) return;
    try {
      var res = await window.KICA.api.get("/admin/courses/" + courseSlug + "/lessons");
      var lessons = res.lessons || [];
      if (!lessons.length) {
        list.innerHTML = '<p style="color:var(--color-text-muted);">No lessons yet. Click "+ New Lesson" to add one.</p>';
        return;
      }
      list.innerHTML =
        '<table class="admin-table"><thead><tr><th>#</th><th>Title</th><th>Minutes</th><th>Actions</th></tr></thead><tbody>' +
        lessons.map(function (l, i) {
          return "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + esc(l.title) + "</td>" +
            "<td>" + l.estimatedMinutes + "</td>" +
            "<td>" +
              '<button class="btn btn-ghost btn-sm" data-lesson-edit="' + l._id + '">Edit</button> ' +
              '<button class="btn btn-ghost btn-sm" data-lesson-del="' + l._id + '" style="color:var(--brand-danger);">Delete</button>' +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      list.querySelectorAll("[data-lesson-edit]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          openLessonEditor(courseSlug, btn.getAttribute("data-lesson-edit"));
        });
      });
      list.querySelectorAll("[data-lesson-del]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          if (!confirm("Delete this lesson?")) return;
          try {
            await window.KICA.api.del("/admin/lessons/" + btn.getAttribute("data-lesson-del"));
            toast("Lesson deleted", "success");
            refreshLessonsList(courseSlug);
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      list.innerHTML = '<p style="color:var(--brand-danger);">Could not load lessons.</p>';
    }
  }

  async function openLessonEditor(courseSlug, lessonId) {
    var root = document.getElementById("modal-root");
    var isNew = !lessonId;
    var lesson = {};

    if (!isNew) {
      try {
        var res = await window.KICA.api.get("/admin/lessons/" + lessonId);
        lesson = res.lesson;
      } catch (err) {
        toast("Could not load lesson", "error");
        return;
      }
    }

    root.innerHTML =
      '<div class="modal-backdrop"><div class="modal-card" style="max-width:800px;">' +
        "<h3>" + (isNew ? "New Lesson" : "Edit Lesson") + "</h3>" +
        '<div class="form">' +
          '<div class="field"><label>Title</label><input class="input" id="le-title" value="' + esc(lesson.title || "") + '" /></div>' +
          '<div class="field"><label>Estimated minutes</label><input class="input" type="number" id="le-minutes" value="' + (lesson.estimatedMinutes || 10) + '" /></div>' +
          '<div class="field"><label>Content (HTML allowed)</label>' +
            '<textarea class="textarea" id="le-content" rows="14" style="font-family:var(--font-mono);font-size:0.85rem;">' + esc(lesson.contentHtml || "") + '</textarea>' +
          "</div>" +
          '<div class="field"><label>Code example (optional, shown separately)</label>' +
            '<textarea class="textarea" id="le-code" rows="4" style="font-family:var(--font-mono);font-size:0.85rem;">' + esc(lesson.codeExample || "") + '</textarea>' +
          "</div>" +
          '<div class="field"><label>Learning objectives (one per line)</label>' +
            '<textarea class="textarea" id="le-objectives" rows="3">' + (lesson.learningObjectives || []).join("\n") + '</textarea>' +
          "</div>" +
        "</div>" +
        '<div class="form-actions" style="margin-top:1rem;">' +
          '<button class="btn btn-primary" id="le-save">' + (isNew ? "Create" : "Save") + '</button>' +
          '<button class="btn btn-ghost" id="le-cancel">Cancel</button>' +
        "</div>" +
      "</div></div>";

    document.getElementById("le-cancel").addEventListener("click", function () { openLessonsManager(courseSlug); });
    document.getElementById("le-save").addEventListener("click", async function () {
      var btn = this;
      btn.disabled = true;
      btn.textContent = "Saving…";
      var body = {
        title: document.getElementById("le-title").value.trim(),
        estimatedMinutes: parseInt(document.getElementById("le-minutes").value, 10) || 10,
        contentHtml: document.getElementById("le-content").value,
        codeExample: document.getElementById("le-code").value,
        learningObjectives: document.getElementById("le-objectives").value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean)
      };
      try {
        if (isNew) {
          await window.KICA.api.post("/admin/courses/" + courseSlug + "/lessons", body);
          toast("Lesson created", "success");
        } else {
          await window.KICA.api.patch("/admin/lessons/" + lessonId, body);
          toast("Lesson updated", "success");
        }
        openLessonsManager(courseSlug);
      } catch (err) {
        toast(err.message || "Failed", "error");
        btn.disabled = false;
        btn.textContent = isNew ? "Create" : "Save";
      }
    });
  }

  // ---------- Quizzes ----------
  var coursesCache = [];
  async function ensureCoursesCache() {
    if (coursesCache.length > 0) return coursesCache;
    var res = await window.KICA.api.get("/courses");
    coursesCache = res.courses || [];
    return coursesCache;
  }

  async function loadQuizzes() {
    var wrap = document.getElementById("quizzes-table-wrap");
    try {
      var res = await window.KICA.api.get("/admin/quizzes");
      if (!res.quizzes.length) {
        wrap.innerHTML = '<p style="color:var(--color-text-muted)">No quizzes yet. Click "+ New Quiz" to add one.</p>';
        return;
      }
      wrap.innerHTML =
        '<table class="admin-table"><thead><tr>' +
          "<th>Title</th><th>Course</th><th>Questions</th><th>Pass %</th><th>Max Attempts</th><th>Status</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        res.quizzes.map(function (q) {
          return "<tr>" +
            "<td>" + esc(q.title) + "</td>" +
            "<td>" + esc(q.courseTitle) + "</td>" +
            "<td>" + q.questionCount + "</td>" +
            "<td>" + q.passPercent + "%</td>" +
            "<td>" + (q.maxAttempts > 0 ? q.maxAttempts : "Unlimited") + "</td>" +
            "<td>" + (q.published ? '<span class="status-badge status-active">Published</span>' : '<span class="status-badge status-inactive">Draft</span>') + "</td>" +
            "<td>" +
              '<button class="btn btn-ghost btn-sm" data-quiz-edit="' + q.id + '">Edit</button> ' +
              '<button class="btn btn-ghost btn-sm" data-quiz-delete="' + q.id + '" style="color:var(--brand-danger);">Delete</button>' +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      wrap.querySelectorAll("[data-quiz-edit]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          openQuizEditor(btn.getAttribute("data-quiz-edit"));
        });
      });
      wrap.querySelectorAll("[data-quiz-delete]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          if (!confirm("Delete this quiz? All attempts will be orphaned.")) return;
          try {
            await window.KICA.api.del("/admin/quizzes/" + btn.getAttribute("data-quiz-delete"));
            toast("Quiz deleted", "success");
            loadQuizzes();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load quizzes.</p>';
    }
  }

  document.getElementById("new-quiz-btn").addEventListener("click", async function () {
    await openQuizEditor(null);
  });

  async function openQuizEditor(quizId) {
    var root = document.getElementById("modal-root");
    var isNew = !quizId;
    var quiz = null;

    try {
      var courses = await ensureCoursesCache();
      if (!courses.length) {
        toast("Create a course first.", "error");
        return;
      }

      if (!isNew) {
        var res = await window.KICA.api.get("/admin/quizzes/" + quizId);
        quiz = res.quiz;
      }

      var courseOptions = courses.map(function (c) {
        var selected = quiz && quiz.courseId && quiz.courseId === c.id ? " selected" : "";
        return '<option value="' + c.id + '"' + selected + ">" + esc(c.icon + " " + c.title) + "</option>";
      }).join("");

      root.innerHTML =
        '<div class="modal-backdrop"><div class="modal-card" style="max-width:900px;">' +
          "<h3>" + (isNew ? "New Quiz" : "Edit Quiz: " + esc(quiz.title)) + "</h3>" +
          '<div class="form">' +
            '<div class="field"><label>Title</label><input class="input" id="qz-title" value="' + esc(quiz ? quiz.title : "") + '" /></div>' +
            '<div class="field"><label>Description</label><textarea class="textarea" id="qz-desc" rows="2">' + esc(quiz ? quiz.description : "") + '</textarea></div>' +
            '<div class="field"><label>Course</label><select class="select" id="qz-course">' + courseOptions + "</select></div>" +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">' +
              '<div class="field"><label>Pass %</label><input class="input" type="number" id="qz-pass" value="' + (quiz ? quiz.passPercent : 70) + '" /></div>' +
              '<div class="field"><label>Max attempts (0 = unlimited)</label><input class="input" type="number" id="qz-attempts" value="' + (quiz ? quiz.maxAttempts : 0) + '" /></div>' +
            "</div>" +
            '<div class="field"><label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">' +
              '<input type="checkbox" id="qz-published"' + ((!quiz || quiz.published) ? " checked" : "") + " /> Published" +
            "</label></div>" +
            '<div class="field"><label>Questions</label><div id="qz-questions"></div></div>' +
            '<button type="button" class="btn btn-ghost btn-sm" id="qz-add-q">+ Add Question</button>' +
          "</div>" +
          '<div class="form-actions" style="margin-top:1rem;">' +
            '<button class="btn btn-primary" id="qz-save">' + (isNew ? "Create Quiz" : "Save Changes") + "</button>" +
            '<button class="btn btn-ghost" id="qz-cancel">Cancel</button>' +
          "</div>" +
        "</div></div>";

      var questionsState = quiz ? quiz.questions.slice() : [];

      function renderQuestions() {
        var wrap = document.getElementById("qz-questions");
        if (!questionsState.length) {
          wrap.innerHTML = '<p style="color:var(--color-text-muted);">No questions yet. Click "+ Add Question".</p>';
          return;
        }
        wrap.innerHTML = questionsState.map(function (q, i) {
          var optionsHtml = q.options.map(function (o, j) {
            return '<div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.4rem;">' +
              '<input type="radio" name="q-correct-' + i + '" value="' + j + '"' + (q.correctIndex === j ? " checked" : "") + ' data-q="' + i + '" data-o="' + j + '" />' +
              '<input class="input" data-q="' + i + '" data-o="' + j + '" value="' + esc(o) + '" placeholder="Option ' + (j + 1) + '" />' +
              (q.options.length > 2 ? '<button type="button" class="btn btn-ghost btn-sm" data-remove-option="' + i + ':' + j + '" style="color:var(--brand-danger);">✕</button>' : '') +
            "</div>";
          }).join("");

          return '<div class="card" style="margin-bottom:1rem;padding:1rem;" data-question-idx="' + i + '">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
              '<strong>Question ' + (i + 1) + '</strong>' +
              '<button type="button" class="btn btn-ghost btn-sm" data-remove-question="' + i + '" style="color:var(--brand-danger);">Remove</button>' +
            "</div>" +
            '<div class="field"><label>Question text</label><input class="input" data-q="' + i + '" data-field="question" value="' + esc(q.question) + '" /></div>' +
            '<div class="field" style="margin-top:0.75rem;"><label>Options (select the correct one)</label>' + optionsHtml +
              '<button type="button" class="btn btn-ghost btn-sm" data-add-option="' + i + '" style="margin-top:0.5rem;">+ Add Option</button>' +
            "</div>" +
            '<div class="field" style="margin-top:0.75rem;"><label>Explanation (optional)</label><input class="input" data-q="' + i + '" data-field="explanation" value="' + esc(q.explanation || "") + '" /></div>' +
          "</div>";
        }).join("");

        wrap.querySelectorAll("[data-field]").forEach(function (el) {
          el.addEventListener("input", function () {
            var i = parseInt(el.getAttribute("data-q"), 10);
            var field = el.getAttribute("data-field");
            questionsState[i][field] = el.value;
          });
        });
        wrap.querySelectorAll("[data-o][data-q]").forEach(function (el) {
          if (el.type === "radio") {
            el.addEventListener("change", function () {
              var i = parseInt(el.getAttribute("data-q"), 10);
              var o = parseInt(el.getAttribute("data-o"), 10);
              questionsState[i].correctIndex = o;
            });
          } else if (el.classList.contains("input")) {
            el.addEventListener("input", function () {
              var i = parseInt(el.getAttribute("data-q"), 10);
              var o = parseInt(el.getAttribute("data-o"), 10);
              questionsState[i].options[o] = el.value;
            });
          }
        });
        wrap.querySelectorAll("[data-add-option]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var i = parseInt(btn.getAttribute("data-add-option"), 10);
            if (questionsState[i].options.length >= 6) {
              toast("Max 6 options", "error");
              return;
            }
            questionsState[i].options.push("");
            renderQuestions();
          });
        });
        wrap.querySelectorAll("[data-remove-option]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var parts = btn.getAttribute("data-remove-option").split(":");
            var i = parseInt(parts[0], 10);
            var o = parseInt(parts[1], 10);
            if (questionsState[i].options.length <= 2) {
              toast("Min 2 options", "error");
              return;
            }
            questionsState[i].options.splice(o, 1);
            if (questionsState[i].correctIndex >= questionsState[i].options.length) {
              questionsState[i].correctIndex = 0;
            }
            renderQuestions();
          });
        });
        wrap.querySelectorAll("[data-remove-question]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var i = parseInt(btn.getAttribute("data-remove-question"), 10);
            questionsState.splice(i, 1);
            renderQuestions();
          });
        });
      }

      renderQuestions();

      document.getElementById("qz-add-q").addEventListener("click", function () {
        questionsState.push({
          question: "",
          options: ["", "", "", ""],
          correctIndex: 0,
          explanation: ""
        });
        renderQuestions();
      });

      document.getElementById("qz-cancel").addEventListener("click", function () { root.innerHTML = ""; });

      document.getElementById("qz-save").addEventListener("click", async function () {
        var btn = this;
        btn.disabled = true;
        btn.textContent = "Saving…";
        var payload = {
          title: document.getElementById("qz-title").value.trim(),
          description: document.getElementById("qz-desc").value.trim(),
          courseId: document.getElementById("qz-course").value,
          passPercent: parseInt(document.getElementById("qz-pass").value, 10) || 70,
          maxAttempts: parseInt(document.getElementById("qz-attempts").value, 10) || 0,
          published: document.getElementById("qz-published").checked,
          questions: questionsState.map(function (q) {
            return {
              _id: q._id,
              question: q.question,
              options: q.options,
              correctIndex: q.correctIndex,
              explanation: q.explanation
            };
          })
        };
        try {
          if (isNew) {
            await window.KICA.api.post("/admin/quizzes", payload);
            toast("Quiz created", "success");
          } else {
            await window.KICA.api.patch("/admin/quizzes/" + quizId, payload);
            toast("Quiz updated", "success");
          }
          root.innerHTML = "";
          loadQuizzes();
        } catch (err) {
          toast(err.message || "Failed", "error");
          btn.disabled = false;
          btn.textContent = isNew ? "Create Quiz" : "Save Changes";
        }
      });
    } catch (err) {
      toast(err.message || "Could not load editor", "error");
    }
  }

  // ---------- Certificates ----------
  async function loadCertificates() {
    var wrap = document.getElementById("certs-table-wrap");
    try {
      var res = await window.KICA.api.get("/admin/certificates");
      if (!res.certificates.length) {
        wrap.innerHTML = '<p style="color:var(--color-text-muted)">No certificates issued yet.</p>';
        return;
      }
      wrap.innerHTML =
        '<table class="admin-table"><thead><tr>' +
          "<th>ID</th><th>Recipient</th><th>Course</th><th>Issued</th><th>Status</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        res.certificates.map(function (c) {
          return "<tr>" +
            "<td><code>" + esc(c.certificateId) + "</code></td>" +
            "<td>" + esc(c.recipientName) + "<br><small style='color:var(--color-text-muted)'>" + esc(c.recipientEmail) + "</small></td>" +
            "<td>" + esc(c.courseTitle) + "</td>" +
            "<td>" + new Date(c.issuedAt).toLocaleDateString() + "</td>" +
            "<td>" + (c.revokedAt ? '<span class="status-badge status-inactive">Revoked</span>' : '<span class="status-badge status-active">Valid</span>') + "</td>" +
            "<td>" +
              (c.revokedAt ? "" : '<button class="btn btn-ghost btn-sm" data-cert-revoke="' + c.certificateId + '">Revoke</button>') +
              ' <a class="btn btn-ghost btn-sm" href="/certificate-verify.html?id=' + encodeURIComponent(c.certificateId) + '" target="_blank">Verify</a>' +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      wrap.querySelectorAll("[data-cert-revoke]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          if (!confirm("Revoke this certificate? The recipient will lose access.")) return;
          try {
            await window.KICA.api.post("/admin/certificates/" + btn.getAttribute("data-cert-revoke") + "/revoke", { reason: "Admin action" });
            toast("Certificate revoked", "success");
            loadCertificates();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load certificates.</p>';
    }
  }

  // ---------- Announcements ----------
  async function loadAnnouncements() {
    var wrap = document.getElementById("announcements-wrap");
    try {
      var res = await window.KICA.api.get("/admin/announcements");
      var items = res.announcements || [];
      if (!items.length) {
        wrap.innerHTML = '<p style="color:var(--color-text-muted)">No announcements yet.</p>';
        return;
      }
      wrap.innerHTML = items.map(function (a) {
        return '<div class="card" style="margin-bottom:1rem;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">' +
            "<div><span class='status-badge status-" + (a.level === "warning" ? "inactive" : "active") + "'>" + a.level + "</span> <strong>" + esc(a.title) + "</strong></div>" +
            '<button class="btn btn-ghost btn-sm" data-ann-del="' + a._id + '">Delete</button>' +
          "</div>" +
          '<p style="margin:0.75rem 0;color:var(--color-text-muted);">' + esc(a.body) + "</p>" +
          '<small style="color:var(--color-text-subtle);">' + new Date(a.createdAt).toLocaleString() + "</small>" +
        "</div>";
      }).join("");

      wrap.querySelectorAll("[data-ann-del]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          try {
            await window.KICA.api.del("/admin/announcements/" + btn.getAttribute("data-ann-del"));
            toast("Deleted", "success");
            loadAnnouncements();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load announcements.</p>';
    }
  }

  document.getElementById("new-announcement-btn").addEventListener("click", function () {
    var root = document.getElementById("modal-root");
    root.innerHTML =
      '<div class="modal-backdrop"><div class="modal-card">' +
        "<h3>New Announcement</h3>" +
        '<div class="form">' +
          '<div class="field"><label>Title</label><input class="input" id="ma-title" /></div>' +
          '<div class="field"><label>Body</label><textarea class="textarea" id="ma-body" rows="4"></textarea></div>' +
          '<div class="field"><label>Level</label><select class="select" id="ma-level"><option value="info">Info</option><option value="success">Success</option><option value="warning">Warning</option></select></div>' +
        "</div>" +
        '<div class="form-actions" style="margin-top:1rem;">' +
          '<button class="btn btn-primary" id="ma-save">Publish</button>' +
          '<button class="btn btn-ghost" id="ma-cancel">Cancel</button>' +
        "</div>" +
      "</div></div>";

    document.getElementById("ma-cancel").addEventListener("click", function () { root.innerHTML = ""; });
    document.getElementById("ma-save").addEventListener("click", async function () {
      var btn = this;
      btn.disabled = true;
      try {
        await window.KICA.api.post("/admin/announcements", {
          title: document.getElementById("ma-title").value.trim(),
          body: document.getElementById("ma-body").value.trim(),
          level: document.getElementById("ma-level").value
        });
        toast("Announcement published", "success");
        root.innerHTML = "";
        loadAnnouncements();
      } catch (err) {
        toast(err.message || "Failed", "error");
        btn.disabled = false;
      }
    });
  });

  // ---------- Contacts (NEW) ----------
  async function loadContacts() {
    var wrap = document.getElementById("contacts-table-wrap");
    try {
      var res = await window.KICA.api.get("/admin/contacts");
      if (!res.contacts.length) {
        wrap.innerHTML = '<p style="color:var(--color-text-muted)">No messages yet.</p>';
        return;
      }
      wrap.innerHTML =
        '<table class="admin-table"><thead><tr>' +
          "<th>From</th><th>Subject</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        res.contacts.map(function (c) {
          var statusBadge = c.status === "new"
            ? '<span class="status-badge status-active">New</span>'
            : c.status === "read"
            ? '<span class="status-badge status-inactive">Read</span>'
            : '<span class="status-badge" style="background:rgba(139,92,246,0.15);color:#a78bfa;">Resolved</span>';
          return "<tr>" +
            "<td>" + esc(c.name) + "<br><small style='color:var(--color-text-muted)'>" + esc(c.email) + "</small></td>" +
            "<td>" + esc(c.subject) + "</td>" +
            "<td style='max-width:300px;'><details><summary style='cursor:pointer;color:var(--brand-accent);'>View</summary><p style='margin:0.5rem 0;'>" + esc(c.message) + "</p></details></td>" +
            "<td>" + statusBadge + "</td>" +
            "<td>" + new Date(c.createdAt).toLocaleDateString() + "</td>" +
            "<td>" +
              (c.status === "new" ? '<button class="btn btn-ghost btn-sm" data-contact-read="' + c.id + '">Mark Read</button> ' : '') +
              (c.status !== "resolved" ? '<button class="btn btn-ghost btn-sm" data-contact-resolve="' + c.id + '">Resolve</button> ' : '') +
              '<button class="btn btn-ghost btn-sm" data-contact-delete="' + c.id + '" style="color:var(--brand-danger);">Delete</button>' +
            "</td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      wrap.querySelectorAll("[data-contact-read]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          try {
            await window.KICA.api.patch("/admin/contacts/" + btn.getAttribute("data-contact-read"), { status: "read" });
            toast("Marked as read", "success");
            loadContacts();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });

      wrap.querySelectorAll("[data-contact-resolve]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          try {
            await window.KICA.api.patch("/admin/contacts/" + btn.getAttribute("data-contact-resolve"), { status: "resolved" });
            toast("Marked as resolved", "success");
            loadContacts();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });

      wrap.querySelectorAll("[data-contact-delete]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          if (!confirm("Delete this contact message?")) return;
          try {
            await window.KICA.api.del("/admin/contacts/" + btn.getAttribute("data-contact-delete"));
            toast("Contact deleted", "success");
            loadContacts();
          } catch (err) { toast(err.message || "Failed", "error"); }
        });
      });
    } catch (err) {
      wrap.innerHTML = '<p style="color:var(--brand-danger)">Could not load contacts.</p>';
    }
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", function () {
    wireTabs();
    loadOverview();

    var searchInput = document.getElementById("user-search");
    if (searchInput) {
      var timer;
      searchInput.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(loadUsers, 300);
      });
    }
  });
})();