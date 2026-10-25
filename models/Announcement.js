/**
 * Kelvin Ikpeni Code Academy — Announcement model
 */
"use strict";

const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    body: { type: String, required: true, maxlength: 5000 },
    level: {
      type: String,
      enum: ["info", "success", "warning"],
      default: "info"
    },
    active: { type: Boolean, default: true, index: true },
    expiresAt: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

announcementSchema.index({ active: 1, createdAt: -1 });

module.exports = mongoose.model("Announcement", announcementSchema);