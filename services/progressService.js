/**
 * Kelvin Ikpeni Code Academy — Progress service
 * Tracks per-lesson completion and syncs enrollment status.
 */
"use strict";

const Progress = require("../models/Progress");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const { syncEnrollment } = require("./completionService");

/**
 * Mark a lesson complete for a user. Idempotent.
 * Returns the updated progress status.
 */
async function markLessonComplete(userId, courseId, lessonId) {
  // Ensure enrolment exists
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) {
    const err = new Error("You must enrol in this course first.");
    err.status = 403;
    throw err;
  }

  let progress = await Progress.findOne({ user: userId, course: courseId });
  if (!progress) {
    progress = await Progress.create({
      user: userId,
      course: courseId,
      completedLessons: []
    });
  }

  const alreadyComplete = progress.completedLessons.some((l) => l.lesson.equals(lessonId));
  if (!alreadyComplete) {
    progress.completedLessons.push({ lesson: lessonId, completedAt: new Date() });
    progress.lastAccessedAt = new Date();
    await progress.save();
  }

  // Sync course completion (also updates enrollment %)
  const status = await syncEnrollment(userId, courseId);

  return {
    alreadyComplete,
    progressPercent: status.percent,
    completedLessons: status.completedLessons,
    totalLessons: status.totalLessons,
    courseComplete: status.isComplete
  };
}

/**
 * Get the current progress for a user in a course.
 */
async function getCourseProgress(userId, courseId) {
  const progress = await Progress.findOne({ user: userId, course: courseId });
  const totalLessons = await Lesson.countDocuments({ course: courseId });
  const completedIds = progress ? progress.completedLessons.map((l) => l.lesson.toString()) : [];

  return {
    completedLessonIds: completedIds,
    completedCount: completedIds.length,
    totalLessons,
    percent: totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0
  };
}

module.exports = { markLessonComplete, getCourseProgress };