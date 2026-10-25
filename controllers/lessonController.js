/**
 * Kelvin Ikpeni Code Academy — Lesson controller
 */
"use strict";

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");

// ---------- PUBLIC ----------

async function listByCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });

  let completedIds = [];
  if (req.user) {
    const progress = await Progress.findOne({ user: req.user._id, course: course._id });
    if (progress) completedIds = progress.completedLessons.map((l) => l.lesson.toString());
  }

  res.json({
    status: "success",
    course: {
      id: course._id,
      slug: course.slug,
      title: course.title,
      icon: course.icon,
      difficulty: course.difficulty,
      lessonsCount: lessons.length
    },
    lessons: lessons.map((l) => ({
      id: l._id,
      title: l.title,
      slug: l.slug,
      order: l.order,
      estimatedMinutes: l.estimatedMinutes,
      completed: completedIds.includes(l._id.toString())
    }))
  });
}

async function getLesson(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug, published: true });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const lesson = await Lesson.findOne({ course: course._id, slug: req.params.lessonSlug });
  if (!lesson) return res.status(404).json({ status: "error", message: "Lesson not found." });

  const allLessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
  const idx = allLessons.findIndex((l) => l._id.equals(lesson._id));

  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  let completed = false;
  if (req.user) {
    const progress = await Progress.findOne({ user: req.user._id, course: course._id });
    if (progress) {
      completed = progress.completedLessons.some((l) => l.lesson.equals(lesson._id));
      progress.lastLesson = lesson._id;
      progress.lastAccessedAt = new Date();
      await progress.save();
    } else {
      await Progress.create({
        user: req.user._id,
        course: course._id,
        completedLessons: [],
        lastLesson: lesson._id
      });
    }
  }

  res.json({
    status: "success",
    course: { id: course._id, slug: course.slug, title: course.title, icon: course.icon },
    lesson: {
      id: lesson._id,
      title: lesson.title,
      slug: lesson.slug,
      order: lesson.order,
      contentHtml: lesson.contentHtml,
      codeExample: lesson.codeExample,
      estimatedMinutes: lesson.estimatedMinutes,
      learningObjectives: lesson.learningObjectives,
      completed,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
      index: idx + 1,
      total: allLessons.length
    }
  });
}

// ---------- ADMIN ----------

async function createLesson(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const { title, contentHtml, codeExample, estimatedMinutes, learningObjectives } = req.body || {};
  const errors = {};
  if (!title || title.trim().length < 3) errors.title = "Title must be at least 3 characters.";
  if (!contentHtml || contentHtml.trim().length < 10) errors.contentHtml = "Content is required.";
  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const count = await Lesson.countDocuments({ course: course._id });

  const lesson = await Lesson.create({
    course: course._id,
    title: title.trim(),
    slug,
    order: count,
    contentHtml,
    codeExample: codeExample || "",
    estimatedMinutes: estimatedMinutes || 10,
    learningObjectives: learningObjectives || []
  });

  await Course.updateOne({ _id: course._id }, { $set: { lessonsCount: count + 1 } });

  res.status(201).json({ status: "success", message: "Lesson created.", lesson: { id: lesson._id, slug: lesson.slug } });
}

async function updateLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ status: "error", message: "Lesson not found." });

  const allowed = ["title", "contentHtml", "codeExample", "estimatedMinutes", "learningObjectives"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) lesson[key] = req.body[key];
  }
  await lesson.save();
  res.json({ status: "success", message: "Lesson updated." });
}

async function deleteLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ status: "error", message: "Lesson not found." });

  const courseId = lesson.course;
  await Lesson.deleteOne({ _id: lesson._id });

  const count = await Lesson.countDocuments({ course: courseId });
  await Course.updateOne({ _id: courseId }, { $set: { lessonsCount: count } });

  res.json({ status: "success", message: "Lesson deleted." });
}

module.exports = {
  listByCourse,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson
};