/**
 * Kelvin Ikpeni Code Academy — Course model
 */
"use strict";

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true, maxlength: 2000 },
    summary: { type: String, maxlength: 250, default: "" },
    track: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "capstone"],
      required: true,
      index: true
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      index: true
    },
    estimatedHours: { type: Number, default: 4, min: 0 },
    lessonsCount: { type: Number, default: 0, min: 0 },
    icon: { type: String, default: "📘" },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
    prerequisites: { type: [String], default: [] },
    outcomes: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

courseSchema.index({ published: 1, order: 1 });

// Helper to generate a slug from a title
courseSchema.statics.slugify = function (title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

module.exports = mongoose.model("Course", courseSchema);