/**
 * Kelvin Ikpeni Code Academy — Progress model
 * Tracks per-user lesson completion per course.
 */
"use strict";

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },
    completedLessons: [
      {
        lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
        completedAt: { type: Date, default: Date.now }
      }
    ],
    lastLesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", default: null },
    lastAccessedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);