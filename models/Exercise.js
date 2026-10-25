/**
 * Kelvin Ikpeni Code Academy — Exercise model
 */
"use strict";

const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, maxlength: 5000 },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      index: true
    },
    language: {
      type: String,
      enum: ["html", "css", "javascript", "node", "express"],
      required: true,
      index: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
      index: true
    },
    topic: { type: String, default: "fundamentals", index: true },

    starterHtml: { type: String, default: "" },
    starterCss: { type: String, default: "" },
    starterJs: { type: String, default: "" },

    solutionHtml: { type: String, default: "" },
    solutionCss: { type: String, default: "" },
    solutionJs: { type: String, default: "" },

    hints: { type: [String], default: [] },

    testCases: [
      {
        description: String,
        input: [mongoose.Schema.Types.Mixed],
        expected: mongoose.Schema.Types.Mixed,
        selector: String,
        expectText: String,
        expectCss: String,
        expectAttribute: String,
        pattern: String,
        callFn: String,
        compare: String
      }
    ],

    points: { type: Number, default: 10 },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

exerciseSchema.index({ published: 1, difficulty: 1, language: 1 });

exerciseSchema.statics.slugify = function (title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

module.exports = mongoose.model("Exercise", exerciseSchema);