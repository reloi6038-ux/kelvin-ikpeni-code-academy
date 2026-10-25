/**
 * Kelvin Ikpeni Code Academy — Quiz controller
 */
"use strict";

const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const { syncEnrollment } = require("../services/completionService");

/**
 * GET /api/quizzes/course/:courseSlug
 * List quizzes for a course + user's pass status.
 */
async function listByCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const quizzes = await Quiz.find({ course: course._id, published: true });

  let passedMap = {};
  let attemptCountMap = {};

  if (req.user) {
    const attempts = await QuizAttempt.find({ user: req.user._id, course: course._id });
    attempts.forEach((a) => {
      const id = a.quiz.toString();
      attemptCountMap[id] = (attemptCountMap[id] || 0) + 1;
      if (a.passed) passedMap[id] = true;
    });
  }

  res.json({
    status: "success",
    quizzes: quizzes.map((q) => {
      const id = q._id.toString();
      return {
        id: q._id,
        slug: q.slug,
        title: q.title,
        description: q.description,
        totalQuestions: q.questions.length,
        passPercent: q.passPercent,
        maxAttempts: q.maxAttempts,
        passed: !!passedMap[id],
        attempts: attemptCountMap[id] || 0
      };
    })
  });
}

/**
 * GET /api/quizzes/:slug
 * Returns the quiz WITHOUT correct answers.
 */
async function getQuiz(req, res) {
  const quiz = await Quiz.findOne({ slug: req.params.slug, published: true });
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });

  // Ensure enrolled
  if (req.user) {
    const enrolled = await Enrollment.exists({ user: req.user._id, course: quiz.course });
    if (!enrolled) {
      return res.status(403).json({
        status: "error",
        message: "You must enrol in this course before taking the quiz."
      });
    }
  }

  // Check attempts
  let attempts = 0;
  let passed = false;
  let lastAttempt = null;

  if (req.user) {
    attempts = await QuizAttempt.countDocuments({ user: req.user._id, quiz: quiz._id });
    const last = await QuizAttempt.findOne({ user: req.user._id, quiz: quiz._id }).sort({ createdAt: -1 });
    if (last) {
      passed = last.passed;
      lastAttempt = { percent: last.percent, passed: last.passed, createdAt: last.createdAt };
    }
  }

  const exhausted = quiz.maxAttempts > 0 && attempts >= quiz.maxAttempts && !passed;

  res.json({
    status: "success",
    quiz: quiz.toPublicJSON(),
    attempts,
    passed,
    lastAttempt,
    attemptsExhausted: exhausted
  });
}

/**
 * POST /api/quizzes/:slug/submit
 * Submit answers → auto-grade → store attempt → sync enrollment.
 * Body: { answers: [0, 2, 1, ...] } — one index per question, in order.
 */
async function submitQuiz(req, res) {
  const quiz = await Quiz.findOne({ slug: req.params.slug, published: true });
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });

  const enrolled = await Enrollment.exists({ user: req.user._id, course: quiz.course });
  if (!enrolled) {
    return res.status(403).json({ status: "error", message: "You must enrol in this course first." });
  }

  const answers = req.body && req.body.answers;
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({
      status: "error",
      message: `Expected ${quiz.questions.length} answers.`
    });
  }

  // Attempt limit
  const attemptsCount = await QuizAttempt.countDocuments({ user: req.user._id, quiz: quiz._id });
  const alreadyPassed = await QuizAttempt.exists({ user: req.user._id, quiz: quiz._id, passed: true });
  if (quiz.maxAttempts > 0 && attemptsCount >= quiz.maxAttempts && !alreadyPassed) {
    return res.status(429).json({
      status: "error",
      message: "You have used all attempts for this quiz."
    });
  }

  // Grade
  let correctCount = 0;
  const graded = quiz.questions.map((q, i) => {
    const selected = Number(answers[i]);
    const correct = selected === q.correctIndex;
    if (correct) correctCount++;
    return {
      question: q._id,
      selectedIndex: isNaN(selected) ? -1 : selected,
      correct
    };
  });

  const total = quiz.questions.length;
  const percent = Math.round((correctCount / total) * 100);
  const passed = percent >= quiz.passPercent;

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    quiz: quiz._id,
    course: quiz.course,
    answers: graded,
    correctCount,
    totalQuestions: total,
    percent,
    passed
  });

  // Sync course completion
  const status = await syncEnrollment(req.user._id, quiz.course);

  res.json({
    status: "success",
    attemptId: attempt._id,
    correctCount,
    totalQuestions: total,
    percent,
    passed,
    courseComplete: status.isComplete,
    coursePercent: status.percent,
    // Reveal explanations ONLY after submission
    feedback: quiz.questions.map((q, i) => ({
      questionId: q._id,
      selectedIndex: graded[i].selectedIndex,
      correctIndex: q.correctIndex,
      correct: graded[i].correct,
      explanation: q.explanation || ""
    }))
  });
}

/**
 * GET /api/quizzes/:slug/attempts
 * User's attempt history for a quiz.
 */
async function myAttempts(req, res) {
  const quiz = await Quiz.findOne({ slug: req.params.slug, published: true });
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });

  const attempts = await QuizAttempt.find({ user: req.user._id, quiz: quiz._id })
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({
    status: "success",
    attempts: attempts.map((a) => ({
      id: a._id,
      percent: a.percent,
      passed: a.passed,
      correctCount: a.correctCount,
      totalQuestions: a.totalQuestions,
      createdAt: a.createdAt
    }))
  });
}

module.exports = { listByCourse, getQuiz, submitQuiz, myAttempts };