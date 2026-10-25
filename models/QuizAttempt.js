/**
 * Kelvin Ikpeni Code Academy — QuizAttempt model
 * One document per completed quiz attempt.
 */
"use strict";

const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true, index: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },

    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedIndex: { type: Number, required: true },
        correct: { type: Boolean, required: true }
      }
    ],

    correctCount: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percent: { type: Number, required: true, min: 0, max: 100 },
    passed: { type: Boolean, required: true, index: true }
  },
  { timestamps: true }
);

quizAttemptSchema.index({ user: 1, quiz: 1, createdAt: -1 });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);