/**
 * Kelvin Ikpeni Code Academy — User model
 * Handles students, admins, password hashing, roles.
 */
"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12; // cost factor. 12 is a good balance in 2026 hardware.

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be under 80 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ],
      index: true
    },

    // Never returned to the client. select: false hides it by default.
    passwordHash: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    // Public profile fields
    bio: { type: String, maxlength: 500, default: "" },
    avatarUrl: { type: String, default: "" },

    // Account state
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },

    // Soft-delete / moderation
    deletedAt: { type: Date }
  },
  {
    timestamps: true, // adds createdAt, updatedAt
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        // Absolutely never leak passwordHash.
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// ---------- Indexes ----------
// email is already indexed via unique: true
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// ---------- Virtuals ----------
userSchema.virtual("initials").get(function () {
  if (!this.name) return "?";
  return this.name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
});

// ---------- Static / instance methods ----------

/**
 * Hash a plaintext password. Used in the seed script and in register routes.
 * Returns the hash.
 */
userSchema.statics.hashPassword = async function (plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

/**
 * Compare a plaintext password against this user's stored hash.
 * Requires passwordHash to be selected (use .select("+passwordHash")).
 */
userSchema.methods.comparePassword = async function (plain) {
  if (!this.passwordHash) {
    throw new Error("passwordHash not selected on this user document");
  }
  return bcrypt.compare(plain, this.passwordHash);
};

/**
 * Update password safely (hashing happens here, not in the controller).
 */
userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, SALT_ROUNDS);
};

// ---------- Pre-save hook (safety net) ----------
// If someone assigns a plaintext-looking passwordHash (e.g. during seed),
// hashing is still centralized here. But if they used setPassword or
// hashPassword first, we skip re-hashing.
userSchema.pre("save", function (next) {
  // Only hash if the field was directly modified to something that doesn't
  // already look like a bcrypt hash.
  if (this.isModified("passwordHash")) {
    const looksHashed = /^\$2[aby]\$\d{2}\$/.test(this.passwordHash || "");
    if (!looksHashed) {
      bcrypt
        .hash(this.passwordHash, SALT_ROUNDS)
        .then((hashed) => {
          this.passwordHash = hashed;
          next();
        })
        .catch(next);
      return;
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);