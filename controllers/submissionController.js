/**
 * Kelvin Ikpeni Code Academy — Submission controller
 */
"use strict";

const Submission = require("../models/Submission");
const Exercise = require("../models/Exercise");

/**
 * GET /api/submissions/me
 */
async function mySubmissions(req, res) {
  const submissions = await Submission.find({ user: req.user._id })
    .populate("exercise", "title slug language difficulty")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json({
    status: "success",
    count: submissions.length,
    submissions: submissions.map((s) => ({
      id: s._id,
      exercise: s.exercise
        ? {
            id: s.exercise._id,
            title: s.exercise.title,
            slug: s.exercise.slug,
            language: s.exercise.language,
            difficulty: s.exercise.difficulty
          }
        : null,
      passed: s.passed,
      failed: s.failed,
      total: s.total,
      success: s.success,
      createdAt: s.createdAt
    }))
  });
}

/**
 * GET /api/submissions/me/:exerciseSlug
 */
async function mySubmissionForExercise(req, res) {
  const exercise = await Exercise.findOne({ slug: req.params.exerciseSlug });
  if (!exercise) {
    return res.status(404).json({ status: "error", message: "Exercise not found." });
  }

  const submission = await Submission.findOne({
    user: req.user._id,
    exercise: exercise._id
  }).sort({ createdAt: -1 });

  if (!submission) {
    return res.json({ status: "success", submission: null });
  }

  res.json({
    status: "success",
    submission: {
      id: submission._id,
      html: submission.html,
      css: submission.css,
      js: submission.js,
      passed: submission.passed,
      failed: submission.failed,
      total: submission.total,
      success: submission.success,
      results: submission.results,
      createdAt: submission.createdAt
    }
  });
}

module.exports = { mySubmissions, mySubmissionForExercise };