/**
 * Kelvin Ikpeni Code Academy — Project model
 * A guided practical project with ordered tasks.
 */
"use strict";

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, maxlength: 2000 },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "capstone"],
      required: true,
      index: true
    },
    track: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "capstone"],
      default: "fullstack"
    },
    icon: { type: String, default: "🚀" },
    estimatedHours: { type: Number, default: 8 },
    objectives: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
    comingSoon: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

projectSchema.statics.slugify = function (title) {
  return String(title).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

module.exports = mongoose.model("Project", projectSchema);