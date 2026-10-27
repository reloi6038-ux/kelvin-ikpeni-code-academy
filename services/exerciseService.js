/**
 * Kelvin Ikpeni Code Academy — Exercise service
 */
"use strict";

const Exercise = require("../models/Exercise");
const Submission = require("../models/Submission");
const { gradeJavaScript, gradeHTMLCSS } = require("./grader");

/**
 * List all published exercises.
 */
async function listExercises({ language, difficulty, topic } = {}) {
  const filter = { published: true };
  if (language) filter.language = language;
  if (difficulty) filter.difficulty = difficulty;
  if (topic) filter.topic = topic;

  return await Exercise.find(filter).sort({ language: 1, order: 1 }).lean();
}

/**
 * Fetch a single exercise by slug.
 */
async function getExerciseBySlug(slug) {
  return await Exercise.findOne({ slug, published: true }).lean();
}

/**
 * Get a user's solved exercise IDs.
 */
async function getSolvedExerciseIds(userId) {
  const subs = await Submission.find({ user: userId, success: true }).lean();
  return new Set(subs.map((s) => s.exercise.toString()));
}

/**
 * Grade a submission and store it.
 * Returns { results, passed, failed, total, success, submissionId }.
 */
async function gradeAndSave(userId, exercise, { html = "", css = "", js = "" }) {
  let gradeResult;

  if (exercise.language === "javascript") {
    gradeResult = await gradeJavaScript(js, exercise.testCases);
  } else if (exercise.language === "node" || exercise.language === "express") {
    gradeResult = await gradeHTMLCSS(js, exercise.testCases);
  } else {
    const code = exercise.language === "html" ? html : css;
    gradeResult = await gradeHTMLCSS(code, exercise.testCases);
  }

  const submission = await Submission.create({
    user: userId,
    exercise: exercise._id,
    html,
    css,
    js,
    passed: gradeResult.passed,
    failed: gradeResult.failed,
    total: gradeResult.total,
    results: gradeResult.results,
    success: gradeResult.success
  });

  return { ...gradeResult, submissionId: submission._id };
}

module.exports = {
  listExercises,
  getExerciseBySlug,
  getSolvedExerciseIds,
  gradeAndSave
};