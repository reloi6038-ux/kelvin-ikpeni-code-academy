/**
 * Kelvin Ikpeni Code Academy — ProjectProgress model
 */
"use strict";

const mongoose = require("mongoose");

const taskProgressSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "ProjectTask", required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    // Saved code per task so a student can resume
    savedHtml: { type: String, default: "" },
    savedCss: { type: String, default: "" },
    savedJs: { type: String, default: "" }
  },
  { _id: false }
);

const projectProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    tasks: { type: [taskProgressSchema], default: [] },
    startedAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

projectProgressSchema.index({ user: 1, project: 1 }, { unique: true });

module.exports = mongoose.model("ProjectProgress", projectProgressSchema);