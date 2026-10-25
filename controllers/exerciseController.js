/**
 * Kelvin Ikpeni Code Academy — Exercise controller
 */
"use strict";

const Exercise = require("../models/Exercise");
const Submission = require("../models/Submission");
const { gradeJavaScript, gradeHTMLCSS } = require("../services/grader");

async function listExercises(req, res) {
  const { language, difficulty, topic } = req.query;
  const filter = { published: true };
  if (language) filter.language = language;
  if (difficulty) filter.difficulty = difficulty;
  if (topic) filter.topic = topic;

  const exercises = await Exercise.find(filter).sort({ language: 1, order: 1 }).lean();

  let solvedSet = new Set();
  if (req.user) {
    const subs = await Submission.find({ user: req.user._id, success: true }).lean();
    solvedSet = new Set(subs.map((s) => s.exercise.toString()));
  }

  res.json({
    status: "success",
    count: exercises.length,
    exercises: exercises.map((e) => ({
      id: e._id,
      slug: e.slug,
      title: e.title,
      difficulty: e.difficulty,
      language: e.language,
      topic: e.topic,
      points: e.points,
      solved: solvedSet.has(e._id.toString())
    }))
  });
}

async function getExerciseBySlug(req, res) {
  const exercise = await Exercise.findOne({ slug: req.params.slug, published: true }).lean();
  if (!exercise) return res.status(404).json({ status: "error", message: "Exercise not found." });

  const sanitized = {
    id: exercise._id,
    slug: exercise.slug,
    title: exercise.title,
    description: exercise.description,
    difficulty: exercise.difficulty,
    language: exercise.language,
    topic: exercise.topic,
    starterHtml: exercise.starterHtml,
    starterCss: exercise.starterCss,
    starterJs: exercise.starterJs,
    hints: exercise.hints,
    points: exercise.points
  };

  res.json({ status: "success", exercise: sanitized });
}

async function revealSolution(req, res) {
  const exercise = await Exercise.findOne({ slug: req.params.slug, published: true });
  if (!exercise) return res.status(404).json({ status: "error", message: "Exercise not found." });

  res.json({
    status: "success",
    solution: {
      html: exercise.solutionHtml,
      css: exercise.solutionCss,
      js: exercise.solutionJs
    }
  });
}

async function submitExercise(req, res) {
  const exercise = await Exercise.findOne({ slug: req.params.slug, published: true });
  if (!exercise) return res.status(404).json({ status: "error", message: "Exercise not found." });

  const { html = "", css = "", js = "" } = req.body || {};

  if (html.length > 100_000 || css.length > 100_000 || js.length > 100_000) {
    return res.status(413).json({ status: "error", message: "Submission too large." });
  }

  let gradeResult;
  if (exercise.language === "javascript" || exercise.language === "node" || exercise.language === "express") {
    if (exercise.language === "javascript") {
      gradeResult = await gradeJavaScript(js, exercise.testCases);
    } else {
      gradeResult = await gradeHTMLCSS(js, exercise.testCases);
    }
  } else {
    const code = exercise.language === "html" ? html : css;
    gradeResult = await gradeHTMLCSS(code, exercise.testCases);
  }

  const submission = await Submission.create({
    user: req.user._id,
    exercise: exercise._id,
    html, css, js,
    passed: gradeResult.passed,
    failed: gradeResult.failed,
    total: gradeResult.total,
    results: gradeResult.results,
    success: gradeResult.success
  });

  res.json({
    status: "success",
    submissionId: submission._id,
    passed: gradeResult.passed,
    failed: gradeResult.failed,
    total: gradeResult.total,
    success: gradeResult.success,
    results: gradeResult.results
  });
}

async function myStats(req, res) {
  if (!req.user) return res.json({ status: "success", solved: 0, attempted: 0 });
  const attemptedDistinct = await Submission.distinct("exercise", { user: req.user._id });
  const solvedDistinct = await Submission.distinct("exercise", { user: req.user._id, success: true });
  res.json({
    status: "success",
    attempted: attemptedDistinct.length,
    solved: solvedDistinct.length
  });
}

module.exports = { listExercises, getExerciseBySlug, revealSolution, submitExercise, myStats };