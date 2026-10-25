/**
 * Kelvin Ikpeni Code Academy — Certificate model
 * One doc per (user, course) — issued on course completion.
 */
"use strict";

const mongoose = require("mongoose");
const crypto = require("crypto");

const certificateSchema = new mongoose.Schema(
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

    // Public identifier — what goes in the URL, on the PDF, and on the verify page.
    certificateId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Snapshot of key fields at issuance time (course title can change later;
    // the certificate must remain truthful about what was completed).
    recipientName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now, index: true },

    // Cryptographic fingerprint for tamper-checking.
    // SHA-256 of certificateId + user + course + issuedAt.
    verificationHash: { type: String, required: true },

    // Optional revocation
    revokedAt: { type: Date, default: null },
    revokedReason: { type: String, default: "" }
  },
  { timestamps: true }
);

// A user can only have one active certificate per course
certificateSchema.index({ user: 1, course: 1 }, { unique: true });

// ---------- Static helpers ----------
certificateSchema.statics.generateId = function () {
  // KICA-XXXX-XXXX format (uppercase hex)
  const raw = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `KICA-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
};

certificateSchema.statics.hash = function (parts) {
  return crypto
    .createHash("sha256")
    .update(parts.join("|"))
    .digest("hex");
};

certificateSchema.methods.verify = function (hash) {
  return this.verificationHash === hash;
};

module.exports = mongoose.model("Certificate", certificateSchema);