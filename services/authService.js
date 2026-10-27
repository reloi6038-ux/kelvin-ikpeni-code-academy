/**
 * Kelvin Ikpeni Code Academy — Auth service
 * Centralized logic for registration, login, and password resets.
 */
"use strict";

const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function isValidPassword(pw) {
  return typeof pw === "string" && pw.length >= MIN_PASSWORD_LENGTH;
}

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email);
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio || "",
    createdAt: user.createdAt
  };
}

/**
 * Create a new user. Throws errors with `.status` for controller use.
 */
async function createUser({ name, email, password, role = "student" }) {
  if (!name || name.trim().length < 2) {
    const err = new Error("Name must be at least 2 characters.");
    err.status = 400;
    throw err;
  }
  if (!isValidEmail(email)) {
    const err = new Error("Enter a valid email address.");
    err.status = 400;
    throw err;
  }
  if (!isValidPassword(password)) {
    const err = new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    err.status = 400;
    throw err;
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const err = new Error("That email is already registered.");
    err.status = 409;
    throw err;
  }

  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: password,
    role
  });
  await user.save();

  return user;
}

/**
 * Verify email + password. Returns the user on success, null on failure.
 */
async function verifyCredentials(email, password) {
  if (!isValidEmail(email) || !password) return null;

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
  if (!user || !user.isActive || user.deletedAt) return null;

  const valid = await user.comparePassword(password);
  if (!valid) return null;

  user.lastLoginAt = new Date();
  await user.save();

  return user;
}

/**
 * Generate a password reset token for a user.
 * Returns { plainToken, resetUrl } or null if user doesn't exist.
 */
async function generateResetToken(email, ip = "") {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || !user.isActive || user.deletedAt) return null;

  // Invalidate old tokens
  await PasswordResetToken.updateMany(
    { user: user._id, usedAt: null },
    { $set: { usedAt: new Date() } }
  );

  const plainToken = PasswordResetToken.generate();
  const tokenHash = PasswordResetToken.hash(plainToken);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await PasswordResetToken.create({
    user: user._id,
    tokenHash,
    expiresAt,
    requestedFromIp: ip
  });

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password.html?token=${plainToken}`;

  return { user, plainToken, resetUrl };
}

/**
 * Consume a reset token and update the password.
 */
async function resetPassword(token, newPassword) {
  if (!token) {
    const err = new Error("Reset token missing.");
    err.status = 400;
    throw err;
  }
  if (!isValidPassword(newPassword)) {
    const err = new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    err.status = 400;
    throw err;
  }

  const tokenHash = PasswordResetToken.hash(token);
  const doc = await PasswordResetToken.findOne({ tokenHash });

  if (!doc || doc.usedAt || doc.expiresAt < new Date()) {
    const err = new Error("This reset link is invalid or has expired.");
    err.status = 400;
    throw err;
  }

  const user = await User.findById(doc.user);
  if (!user || !user.isActive || user.deletedAt) {
    const err = new Error("Account unavailable.");
    err.status = 400;
    throw err;
  }

  await user.setPassword(newPassword);
  await user.save();

  doc.usedAt = new Date();
  await doc.save();

  return user;
}

module.exports = {
  createUser,
  verifyCredentials,
  generateResetToken,
  resetPassword,
  publicUser,
  isValidEmail,
  isValidPassword
};