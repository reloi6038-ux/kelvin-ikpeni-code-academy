"use strict";

const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");

async function getCourseProgress(userId, courseId) {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  const totalLessons = await Lesson.countDocuments({ course: courseId });
  const totalQuizzes = await Quiz.countDocuments({ course: courseId, published: true });

  let completedLessons = 0;
  let passedQuizzes = 0;

  if (enrollment) {
    const progress = await Progress.findOne({ user: userId, course: courseId });
    completedLessons = progress ? progress.completedLessons.length : 0;

    if (totalQuizzes > 0) {
      const passed = await QuizAttempt.aggregate([
        { $match: { user: userId, course: courseId, passed: true } },
        { $group: { _id: "$quiz" } }
      ]);
      passedQuizzes = passed.length;
    }
  }

  const lessonsComplete = totalLessons > 0 ? completedLessons >= totalLessons : true;
  const quizzesComplete = totalQuizzes > 0 ? passedQuizzes >= totalQuizzes : true;
  const isComplete = !!enrollment && lessonsComplete && quizzesComplete;

  const totalItems = totalLessons + totalQuizzes;
  const doneItems = completedLessons + passedQuizzes;
  const percent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return {
    enrolled: !!enrollment,
    completedLessons,
    totalLessons,
    passedQuizzes,
    totalQuizzes,
    lessonsComplete,
    quizzesComplete,
    isComplete,
    percent
  };
}

/**
 * Sync enrollment progress + status. Auto-issues a certificate
 * on the transition to complete.
 */
async function syncEnrollment(userId, courseId) {
  const status = await getCourseProgress(userId, courseId);
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) return status;

  const wasComplete = enrollment.status === "completed";

  enrollment.progressPercent = status.percent;
  if (status.isComplete) {
    enrollment.status = "completed";
    if (!enrollment.completedAt) enrollment.completedAt = new Date();
  } else if (wasComplete) {
    enrollment.status = "active";
    enrollment.completedAt = null;
  }
  enrollment.lastAccessedAt = new Date();
  await enrollment.save();

  // Auto-issue certificate when transitioning to complete
  if (status.isComplete && !wasComplete) {
    try {
      const { issueCertificateIfEligible } = require("./certificateService");
      await issueCertificateIfEligible(userId, courseId);
    } catch (err) {
      console.error("Certificate issuance failed:", err.message);
      // Don't fail the request if cert issuance hiccups — user can retry via /api/certificates/issue
    }
  }

  return status;
}

module.exports = { getCourseProgress, syncEnrollment };