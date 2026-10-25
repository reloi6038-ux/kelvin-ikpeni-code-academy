/**
 * Kelvin Ikpeni Code Academy — Submission model
 */
"use strict";

const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", required: true, index: true },

    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },

    passed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    results: [
      {
        description: String,
        passed: Boolean,
        expected: mongoose.Schema.Types.Mixed,
        actual: mongoose.Schema.Types.Mixed,
        error: String
      }
    ],
    success: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

submissionSchema.index({ user: 1, exercise: 1, createdAt: -1 });
submissionSchema.index({ user: 1, success: 1 });

module.exports = mongoose.model("Submission", submissionSchema);