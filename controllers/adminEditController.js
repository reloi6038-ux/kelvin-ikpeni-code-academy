/**
 * Kelvin Ikpeni Code Academy — Admin edit controller
 * Returns full documents for editing (unlike public APIs).
 */
"use strict";

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

async function getCourseFull(req, res) {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });
  res.json({ status: "success", course });
}

async function listLessonsForCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
  res.json({ status: "success", lessons });
}

async function getLessonById(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ status: "error", message: "Lesson not found." });
  res.json({ status: "success", lesson });
}

module.exports = { getCourseFull, listLessonsForCourse, getLessonById };