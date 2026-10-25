"use strict";

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");
const { syncEnrollment } = require("../services/completionService");

async function markComplete(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const lesson = await Lesson.findOne({ course: course._id, slug: req.params.lessonSlug });
  if (!lesson) return res.status(404).json({ status: "error", message: "Lesson not found." });

  const enrollment = await Enrollment.findOne({ user: req.user._id, course: course._id });
  if (!enrollment) {
    return res.status(403).json({ status: "error", message: "You must enrol in this course first." });
  }

  let progress = await Progress.findOne({ user: req.user._id, course: course._id });
  if (!progress) {
    progress = await Progress.create({
      user: req.user._id,
      course: course._id,
      completedLessons: []
    });
  }

  const alreadyComplete = progress.completedLessons.some((l) => l.lesson.equals(lesson._id));
  if (!alreadyComplete) {
    progress.completedLessons.push({ lesson: lesson._id, completedAt: new Date() });
    progress.lastAccessedAt = new Date();
    await progress.save();
  }

  // Sync enrollment (considers lessons + quizzes)
  const status = await syncEnrollment(req.user._id, course._id);

  res.json({
    status: "success",
    message: alreadyComplete ? "Already completed." : "Lesson marked complete.",
    progressPercent: status.percent,
    completedLessons: status.completedLessons,
    totalLessons: status.totalLessons,
    courseComplete: status.isComplete
  });
}

async function getProgress(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const progress = await Progress.findOne({ user: req.user._id, course: course._id });
  const totalLessons = await Lesson.countDocuments({ course: course._id });
  const completedIds = progress ? progress.completedLessons.map((l) => l.lesson.toString()) : [];

  res.json({
    status: "success",
    course: { id: course._id, slug: course.slug, title: course.title },
    completedLessons: completedIds,
    completedCount: completedIds.length,
    totalLessons,
    percent: totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0
  });
}

module.exports = { markComplete, getProgress };