"use strict";

const mongoose = require("mongoose");
const crypto = require("crypto");

const passwordResetTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, index: true, unique: true },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
    requestedFromIp: { type: String, default: "" }
  },
  { timestamps: true }
);

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

passwordResetTokenSchema.statics.hash = function (plainToken) {
  return crypto.createHash("sha256").update(plainToken).digest("hex");
};

passwordResetTokenSchema.statics.generate = function () {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = mongoose.model("PasswordResetToken", passwordResetTokenSchema);