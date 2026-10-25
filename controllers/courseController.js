/**
 * Kelvin Ikpeni Code Academy — Course controller
 * Public: list, get by slug
 * Admin: create, update, delete
 */
"use strict";

const Course = require("../models/Course");

// ---------- PUBLIC ----------

async function listCourses(req, res) {
  const { track, difficulty } = req.query;
  const filter = { published: true };
  if (track) filter.track = track;
  if (difficulty) filter.difficulty = difficulty;

  const courses = await Course.find(filter).sort({ track: 1, order: 1 });

  res.json({
    status: "success",
    count: courses.length,
    courses: courses.map((c) => ({
      id: c._id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      summary: c.summary,
      track: c.track,
      difficulty: c.difficulty,
      estimatedHours: c.estimatedHours,
      lessonsCount: c.lessonsCount,
      icon: c.icon,
      outcomes: c.outcomes
    }))
  });
}

async function getCourseBySlug(req, res) {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) {
    return res.status(404).json({ status: "error", message: "Course not found." });
  }

  res.json({
    status: "success",
    course: {
      id: course._id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      summary: course.summary,
      track: course.track,
      difficulty: course.difficulty,
      estimatedHours: course.estimatedHours,
      lessonsCount: course.lessonsCount,
      icon: course.icon,
      outcomes: course.outcomes
    }
  });
}

// ---------- ADMIN ----------

async function createCourse(req, res) {
  const { title, description, summary, track, difficulty, estimatedHours, icon, outcomes, prerequisites } = req.body || {};

  const errors = {};
  if (!title || title.trim().length < 3) errors.title = "Title must be at least 3 characters.";
  if (!description || description.trim().length < 10) errors.description = "Description must be at least 10 characters.";
  if (!["frontend", "backend", "fullstack", "capstone"].includes(track)) errors.track = "Invalid track.";
  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) errors.difficulty = "Invalid difficulty.";
  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const slug = Course.slugify(title);
  const existing = await Course.findOne({ slug });
  if (existing) {
    return res.status(409).json({
      status: "error",
      message: "A course with this title already exists.",
      errors: { title: "Title in use." }
    });
  }

  const course = await Course.create({
    title: title.trim(),
    slug,
    description,
    summary: summary || "",
    track,
    difficulty,
    estimatedHours: estimatedHours || 4,
    icon: icon || "📘",
    outcomes: outcomes || [],
    prerequisites: prerequisites || [],
    createdBy: req.user._id
  });

  res.status(201).json({
    status: "success",
    message: "Course created.",
    course: { id: course._id, slug: course.slug, title: course.title }
  });
}

async function updateCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const allowed = ["title", "description", "summary", "track", "difficulty", "estimatedHours", "icon", "outcomes", "prerequisites", "published"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) course[key] = req.body[key];
  }
  await course.save();

  res.json({ status: "success", message: "Course updated.", course: { id: course._id, slug: course.slug } });
}

async function deleteCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  await Course.deleteOne({ _id: course._id });
  res.json({ status: "success", message: "Course deleted." });
}

module.exports = {
  listCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
};