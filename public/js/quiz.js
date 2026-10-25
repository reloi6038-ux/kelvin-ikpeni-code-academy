(function () {
  "use strict";

  var quizData = null;
  var selectedAnswers = [];

  function toast(msg, type) {
    if (window.KICA && window.KICA.ui) return window.KICA.ui.toast(msg, type);
    console.log("[toast]", type, msg);
  }

  function getSlug() {
    return new URLSearchParams(window.location.search).get("slug") || "";
  }

  async function load() {
    var mount = document.getElementById("quiz-mount");
    var slug = getSlug();
    if (!mount) return;

    if (!slug) {
      mount.innerHTML = '<p style="color:var(--color-text-muted)">No quiz specified.</p>';
      return;
    }

    try {
      var res = await window.KICA.api.get("/quizzes/" + slug);
      quizData = res;

      if (res.attemptsExhausted) {
        mount.innerHTML =
          '<div class="quiz-result failed">' +
            "<h2>No attempts remaining</h2>" +
            "<p>You have used all attempts for this quiz.</p>" +
            '<div class="quiz-actions"><a class="btn btn-ghost" href="/dashboard.html">Back to Dashboard</a></div>' +
          "</div>";
        return;
      }

      if (res.passed) {
        renderPassedSummary(res);
        return;
      }

      renderQuiz(res);
    } catch (err) {
      mount.innerHTML = '<p style="color:var(--brand-danger)">' +
        (err.message || "Could not load quiz.") +
        "</p>";
    }
  }

  function renderQuiz(res) {
    var quiz = res.quiz;
    var mount = document.getElementById("quiz-mount");
    selectedAnswers = new Array(quiz.questions.length).fill(-1);

    var questionsHtml = quiz.questions.map(function (q, i) {
      var optionsHtml = q.options.map(function (opt, j) {
        return '<li>' +
          '<label class="option" data-q="' + i + '" data-o="' + j + '">' +
            '<input type="radio" name="q' + i + '" value="' + j + '" />' +
            '<span class="option-label">' + escapeHtml(opt) + "</span>" +
          "</label>" +
        "</li>";
      }).join("");

      return '<div class="question-card" id="q' + i + '">' +
        '<div class="question-number">Question ' + (i + 1) + " of " + quiz.questions.length + "</div>" +
        '<h3 class="question-text">' + escapeHtml(q.question) + "</h3>" +
        '<ul class="options-list">' + optionsHtml + "</ul>" +
      "</div>";
    }).join("");

    mount.innerHTML =
      '<div class="quiz-header">' +
        '<p class="eyebrow">Quiz</p>' +
        "<h1>" + escapeHtml(quiz.title) + "</h1>" +
        '<p style="color:var(--color-text-muted);">' + escapeHtml(quiz.description || "") + "</p>" +
        '<div class="quiz-meta">' +
          "<span>" + quiz.questions.length + " questions</span>" +
          "<span>·</span>" +
          "<span>Pass mark: " + quiz.passPercent + "%</span>" +
          (res.attempts > 0 ? '<span>·</span><span>Attempts so far: ' + res.attempts + "</span>" : "") +
        "</div>" +
      "</div>" +
      '<form id="quizForm">' + questionsHtml +
        '<div class="quiz-actions">' +
          '<a class="btn btn-ghost" href="/course-details.html?slug=' + (quiz.slug.split("-")[0]) + '">Cancel</a>' +
          '<button type="submit" class="btn btn-primary" id="submitBtn">Submit Quiz</button>' +
        "</div>" +
      "</form>";

    // Handle option selection
    mount.querySelectorAll(".option").forEach(function (opt) {
      opt.addEventListener("click", function (e) {
        var q = parseInt(opt.getAttribute("data-q"), 10);
        var o = parseInt(opt.getAttribute("data-o"), 10);
        selectedAnswers[q] = o;
        // Visual highlight
        mount.querySelectorAll('.option[data-q="' + q + '"]').forEach(function (el) {
          el.classList.remove("selected");
        });
        opt.classList.add("selected");
      });
    });

    // Handle submit
    document.getElementById("quizForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      var btn = document.getElementById("submitBtn");

      if (selectedAnswers.some(function (a) { return a < 0; })) {
        toast("Please answer every question.", "error");
        return;
      }

      btn.disabled = true;
      btn.textContent = "Grading…";
      try {
        var submitRes = await window.KICA.api.post("/quizzes/" + quiz.slug + "/submit", {
          answers: selectedAnswers
        });
        renderResult(quiz, submitRes);
      } catch (err) {
        toast(err.message || "Submission failed.", "error");
        btn.disabled = false;
        btn.textContent = "Submit Quiz";
      }
    });
  }

  function renderResult(quiz, res) {
    var mount = document.getElementById("quiz-mount");
    var passed = res.passed;

    // Header
    var headerHtml =
      '<div class="quiz-result ' + (passed ? "passed" : "failed") + '">' +
        "<h2>" + (passed ? "🎉 Passed!" : "❌ Not quite") + "</h2>" +
        "<p>" +
          "You scored <strong>" + res.percent + "%</strong> " +
          "(" + res.correctCount + "/" + res.totalQuestions + " correct). " +
          (passed ? "Pass mark was " + quiz.passPercent + "%." : "Pass mark is " + quiz.passPercent + "%.") +
        "</p>" +
        (res.courseComplete ? '<p style="color:var(--brand-success);font-weight:600;">🏆 Course completed!</p>' : "") +
      "</div>";

    // Questions with feedback
    var feedbackHtml = quiz.questions.map(function (q, i) {
      var fb = res.feedback[i];
      var optionsHtml = q.options.map(function (opt, j) {
        var cls = "option";
        if (j === fb.correctIndex) cls += " correct";
        else if (j === fb.selectedIndex) cls += " wrong";
        return '<li>' +
          '<div class="' + cls + '">' +
            '<span class="option-label">' + escapeHtml(opt) + "</span>" +
          "</div>" +
        "</li>";
      }).join("");

      return '<div class="question-card ' + (fb.correct ? "is-correct" : "is-wrong") + '">' +
        '<div class="question-number">Question ' + (i + 1) + (fb.correct ? " · ✓ Correct" : " · ✗ Incorrect") + "</div>" +
        '<h3 class="question-text">' + escapeHtml(q.question) + "</h3>" +
        '<ul class="options-list">' + optionsHtml + "</ul>" +
        (fb.explanation ? '<div class="question-explanation">' + escapeHtml(fb.explanation) + "</div>" : "") +
      "</div>";
    }).join("");

    // Actions
    var actions =
      '<div class="quiz-actions">' +
        '<a class="btn btn-ghost" href="/dashboard.html">Back to Dashboard</a>' +
        '<a class="btn btn-primary" href="/courses.html">Browse Courses</a>' +
        (passed ? "" : '<button class="btn btn-outline" id="retryBtn">Retry Quiz</button>') +
      "</div>";

    mount.innerHTML = headerHtml + feedbackHtml + actions;

    if (!passed) {
      document.getElementById("retryBtn").addEventListener("click", function () {
        window.location.reload();
      });
    }
  }

  function renderPassedSummary(res) {
    var quiz = res.quiz;
    var mount = document.getElementById("quiz-mount");
    mount.innerHTML =
      '<div class="quiz-result passed">' +
        "<h2>🎉 Already Passed</h2>" +
        "<p>You passed <strong>" + escapeHtml(quiz.title) + "</strong>" +
          (res.lastAttempt ? " with " + res.lastAttempt.percent + "%" : "") + ".</p>" +
        '<div class="quiz-actions">' +
          '<a class="btn btn-primary" href="/dashboard.html">Back to Dashboard</a>' +
        "</div>" +
      "</div>";
  }

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", load);
})();