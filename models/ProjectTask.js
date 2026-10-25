/**
 * Kelvin Ikpeni Code Academy — ProjectTask model
 * One checkpoint inside a project.
 */
"use strict";

const mongoose = require("mongoose");

const projectTaskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true },
    order: { type: Number, required: true, min: 0 },

    description: { type: String, required: true, maxlength: 5000 }, // HTML
    instructions: { type: String, default: "" },
    learningObjectives: { type: [String], default: [] },

    // Code shown in the IDE
    starterHtml: { type: String, default: "" },
    starterCss: { type: String, default: "" },
    starterJs: { type: String, default: "" },

    hints: { type: [String], default: [] },

    estimatedMinutes: { type: Number, default: 15, min: 1 }
  },
  { timestamps: true }
);

projectTaskSchema.index({ project: 1, slug: 1 }, { unique: true });
projectTaskSchema.index({ project: 1, order: 1 });

module.exports = mongoose.model("ProjectTask", projectTaskSchema);