/**
 * Kelvin Ikpeni Code Academy — Admin Quiz controller
 * CRUD for quizzes and their questions.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

/**
 * GET /api/admin/quizzes
 * Returns all quizzes with course info.
 */
async function listQuizzes(req, res) {
  const quizzes = await Quiz.find({})
    .populate("course", "title slug icon")
    .sort({ createdAt: -1 });

  res.json({
    status: "success",
    count: quizzes.length,
    quizzes: quizzes.map((q) => ({
      id: q._id,
      title: q.title,
      slug: q.slug,
      courseId: q.course ? q.course._id : null,
      courseTitle: q.course ? q.course.title : "(missing course)",
      courseSlug: q.course ? q.course.slug : null,
      passPercent: q.passPercent,
      maxAttempts: q.maxAttempts,
      published: q.published,
      questionCount: q.questions.length
    }))
  });
}

/**
 * GET /api/admin/quizzes/:id
 * Returns full quiz including correct answers (for editing).
 */
async function getQuizFull(req, res) {
  const quiz = await Quiz.findById(req.params.id).populate("course", "title slug");
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });

  res.json({
    status: "success",
    quiz: {
      id: quiz._id,
      title: quiz.title,
      slug: quiz.slug,
      courseId: quiz.course ? quiz.course._id : null,
      courseTitle: quiz.course ? quiz.course.title : "",
      description: quiz.description,
      passPercent: quiz.passPercent,
      maxAttempts: quiz.maxAttempts,
      published: quiz.published,
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation
      }))
    }
  });
}

/**
 * POST /api/admin/quizzes
 * Body: { title, description, courseId, passPercent, maxAttempts, published, questions }
 */
async function createQuiz(req, res) {
  const { title, description, courseId, passPercent, maxAttempts, published, questions } = req.body || {};
  const errors = {};
  if (!title || title.trim().length < 3) errors.title = "Title must be at least 3 characters.";
  if (!courseId) errors.courseId = "Course is required.";
  if (!Array.isArray(questions) || questions.length < 1) errors.questions = "At least one question is required.";
  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const slugBase = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  let slug = slugBase;
  let n = 1;
  while (await Quiz.exists({ slug })) {
    slug = slugBase + "-" + n;
    n++;
  }

  // Validate each question
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.question || q.question.trim().length < 3) {
      return res.status(400).json({ status: "error", message: `Question ${i + 1}: text is required.` });
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      return res.status(400).json({ status: "error", message: `Question ${i + 1}: must have 2-6 options.` });
    }
    if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      return res.status(400).json({ status: "error", message: `Question ${i + 1}: correct answer is invalid.` });
    }
  }

  const quiz = await Quiz.create({
    course: course._id,
    title: title.trim(),
    slug,
    description: description || "",
    passPercent: typeof passPercent === "number" ? passPercent : 70,
    maxAttempts: typeof maxAttempts === "number" ? maxAttempts : 0,
    published: published !== false,
    questions: questions.map((q) => ({
      question: q.question.trim(),
      options: q.options.map((o) => String(o).trim()),
      correctIndex: q.correctIndex,
      explanation: q.explanation || ""
    }))
  });

  res.status(201).json({
    status: "success",
    message: "Quiz created.",
    quiz: { id: quiz._id, slug: quiz.slug }
  });
}

/**
 * PATCH /api/admin/quizzes/:id
 */
async function updateQuiz(req, res) {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });

  const { title, description, courseId, passPercent, maxAttempts, published, questions } = req.body || {};

  if (title !== undefined) quiz.title = title.trim();
  if (description !== undefined) quiz.description = description;
  if (courseId) quiz.course = courseId;
  if (typeof passPercent === "number") quiz.passPercent = passPercent;
  if (typeof maxAttempts === "number") quiz.maxAttempts = maxAttempts;
  if (typeof published === "boolean") quiz.published = published;

  if (Array.isArray(questions)) {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || q.question.trim().length < 3) {
        return res.status(400).json({ status: "error", message: `Question ${i + 1}: text is required.` });
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        return res.status(400).json({ status: "error", message: `Question ${i + 1}: needs 2+ options.` });
      }
      if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        return res.status(400).json({ status: "error", message: `Question ${i + 1}: correct answer is invalid.` });
      }
    }
    quiz.questions = questions.map((q) => ({
      _id: q._id, // preserve existing IDs
      question: q.question.trim(),
      options: q.options.map((o) => String(o).trim()),
      correctIndex: q.correctIndex,
      explanation: q.explanation || ""
    }));
  }

  await quiz.save();
  res.json({ status: "success", message: "Quiz updated." });
}

/**
 * DELETE /api/admin/quizzes/:id
 */
async function deleteQuiz(req, res) {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) return res.status(404).json({ status: "error", message: "Quiz not found." });
  res.json({ status: "success", message: "Quiz deleted." });
}

module.exports = { listQuizzes, getQuizFull, createQuiz, updateQuiz, deleteQuiz };