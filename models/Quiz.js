/**
 * Kelvin Ikpeni Code Academy — Quiz model
 * Multiple-choice quizzes attached to a course.
 */
"use strict";

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, maxlength: 1000 },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 2 && v.length <= 6,
        message: "A question must have between 2 and 6 options."
      }
    },
    correctIndex: { type: Number, required: true, min: 0 },
    explanation: { type: String, default: "" }
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "", maxlength: 1000 },
    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 1,
        message: "A quiz must have at least one question."
      }
    },
    passPercent: { type: Number, default: 70, min: 0, max: 100 },
    maxAttempts: { type: Number, default: 0 }, // 0 = unlimited
    published: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

quizSchema.statics.slugify = function (title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Public quiz payload: never include correctIndex
quizSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    slug: this.slug,
    title: this.title,
    description: this.description,
    course: this.course,
    passPercent: this.passPercent,
    maxAttempts: this.maxAttempts,
    totalQuestions: this.questions.length,
    questions: this.questions.map((q) => ({
      id: q._id,
      question: q.question,
      options: q.options
    }))
  };
};

module.exports = mongoose.model("Quiz", quizSchema);