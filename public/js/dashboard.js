(function () {
  "use strict";

  async function load() {
    var container = document.getElementById("enrolled-courses");
    var statsEnrolled = document.getElementById("stat-enrolled");
    var statsLessons = document.getElementById("stat-lessons");
    var statsCerts = document.getElementById("stat-certificates");
    if (!container) return;

    try {
      // Load enrollments + certificates in parallel
      var results = await Promise.all([
        window.KICA.api.get("/enrollments/me"),
        window.KICA.api.get("/certificates/me").catch(function () { return { certificates: [] }; })
      ]);

      var enrollments = results[0].enrollments || [];
      var certs = results[1].certificates || [];

      if (statsEnrolled) statsEnrolled.textContent = String(enrollments.length);
      if (statsCerts) statsCerts.textContent = String(certs.length);

      var totalLessons = 0;
      enrollments.forEach(function (e) { totalLessons += e.completedLessons || 0; });

      if (enrollments.length === 0) {
        container.innerHTML = '<p style="color:var(--color-text-muted)">No courses yet. <a href="/courses.html" style="color:var(--brand-accent)">Browse courses →</a></p>';
        if (statsLessons) statsLessons.textContent = "0";
        return;
      }

      container.innerHTML = enrollments.map(function (e) {
        var c = e.course;
        if (!c) return "";
        var percent = e.progressPercent || 0;
        var completeBadge = e.isComplete
          ? '<span class="badge badge-brand" style="margin-left:0.5rem;">✓ Complete</span>'
          : "";
        var subtitle = e.completedLessons + " of " + e.totalLessons + " lessons · " +
                       e.passedQuizzes + " of " + e.totalQuizzes + " quizzes";

        return '<div class="course-item">' +
          '<div class="course-icon">' + (c.icon || "📘") + "</div>" +
          "<div>" +
            "<h4>" + c.title + completeBadge + "</h4>" +
            '<p>' + subtitle + " (" + percent + "%)</p>" +
            '<div class="progress" style="margin-top:0.5rem;"><div class="progress-bar" style="width:' + percent + '%"></div></div>' +
          "</div>" +
          '<a class="btn btn-outline btn-sm" href="/course-details.html?slug=' + c.slug + '">' +
            (percent >= 100 ? "Review" : (percent > 0 ? "Continue" : "Start")) +
          "</a>" +
        "</div>";
      }).join("");

      if (statsLessons) statsLessons.textContent = String(totalLessons);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", load);
})();