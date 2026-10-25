/**
 * Kelvin Ikpeni Code Academy — Lesson model
 */
"use strict";

const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, index: true },
    order: { type: Number, required: true, min: 0 }, // position within course
    contentHtml: { type: String, required: true, maxlength: 20000 },
    estimatedMinutes: { type: Number, default: 10, min: 1 },
    codeExample: { type: String, default: "" },
    learningObjectives: { type: [String], default: [] }
  },
  { timestamps: true }
);

// Unique slug per course
lessonSchema.index({ course: 1, slug: 1 }, { unique: true });
// Sort lessons efficiently
lessonSchema.index({ course: 1, order: 1 });

module.exports = mongoose.model("Lesson", lessonSchema);