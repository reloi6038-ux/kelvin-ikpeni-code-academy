/**
 * Kelvin Ikpeni Code Academy — Enrollment controller
 */
"use strict";

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const { getCourseProgress } = require("../services/completionService");

async function enroll(req, res) {
  const slug = req.params.slug;

  const course = await Course.findOne({ slug, published: true });
  if (!course) {
    return res.status(404).json({ status: "error", message: "Course not found." });
  }

  const existing = await Enrollment.findOne({ user: req.user._id, course: course._id });
  if (existing) {
    return res.json({
      status: "success",
      message: "Already enrolled.",
      enrollmentId: existing._id
    });
  }

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: course._id,
    status: "active",
    progressPercent: 0
  });

  res.status(201).json({
    status: "success",
    message: "Enrolled.",
    enrollmentId: enrollment._id
  });
}

async function myEnrollments(req, res) {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate("course")
    .sort({ lastAccessedAt: -1 });

  const results = await Promise.all(enrollments.map(async (e) => {
    if (!e.course) return null;
    const status = await getCourseProgress(req.user._id, e.course._id);
    return {
      id: e._id,
      status: e.status,
      progressPercent: status.percent,
      lessonsComplete: status.lessonsComplete,
      quizzesComplete: status.quizzesComplete,
      isComplete: status.isComplete,
      completedLessons: status.completedLessons,
      totalLessons: status.totalLessons,
      passedQuizzes: status.passedQuizzes,
      totalQuizzes: status.totalQuizzes,
      enrolledAt: e.createdAt,
      course: {
        id: e.course._id,
        slug: e.course.slug,
        title: e.course.title,
        icon: e.course.icon,
        difficulty: e.course.difficulty,
        lessonsCount: e.course.lessonsCount
      }
    };
  }));

  res.json({ status: "success", enrollments: results.filter(Boolean) });
}

module.exports = { enroll, myEnrollments };