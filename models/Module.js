/**
 * Kelvin Ikpeni Code Academy — Module model
 * Represents a group of related lessons within a course.
 */
"use strict";

const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true },
    description: { type: String, default: "", maxlength: 1000 },
    order: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// One slug per course
moduleSchema.index({ course: 1, slug: 1 }, { unique: true });
// Sort efficiently
moduleSchema.index({ course: 1, order: 1 });

module.exports = mongoose.model("Module", moduleSchema);