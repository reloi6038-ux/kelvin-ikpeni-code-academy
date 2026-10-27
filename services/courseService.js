/**
 * Kelvin Ikpeni Code Academy — Course service
 */
"use strict";

const Course = require("../models/Course");

/**
 * Fetch all published courses, with optional filters.
 */
async function listCourses({ track, difficulty } = {}) {
  const filter = { published: true };
  if (track) filter.track = track;
  if (difficulty) filter.difficulty = difficulty;

  return await Course.find(filter).sort({ track: 1, order: 1 });
}

/**
 * Fetch a single course by slug.
 */
async function getCourseBySlug(slug) {
  return await Course.findOne({ slug, published: true });
}

/**
 * Fetch a course by its ID.
 */
async function getCourseById(id) {
  return await Course.findById(id);
}

/**
 * Format a course document for API responses.
 */
function toPublicJSON(course) {
  return {
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
  };
}

module.exports = { listCourses, getCourseBySlug, getCourseById, toPublicJSON };