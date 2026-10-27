/**
 * Kelvin Ikpeni Code Academy — Auth controller
 */
"use strict";

const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const logger = require("../utils/logger");
const { sendPasswordResetEmail } = require("../services/emailService");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function isValidPassword(pw) { return typeof pw === "string" && pw.length >= MIN_PASSWORD_LENGTH; }
function isValidEmail(email) { return typeof email === "string" && EMAIL_RE.test(email); }
function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, bio: user.bio || "", createdAt: user.createdAt };
}

async function register(req, res) {
  const { name, email, password } = req.body || {};
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!isValidPassword(password)) errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;

  if (Object.keys(errors).length) return res.status(400).json({ status: "error", message: "Validation failed.", errors });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ status: "error", message: "That email is already registered.", errors: { email: "This email is already in use." } });

  const user = new User({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash: password, role: "student" });
  await user.save();

  req.session.userId = user._id.toString();
  req.session.userRole = user.role;

  res.status(201).json({ status: "success", message: "Account created.", user: publicUser(user) });
}

async function login(req, res) {
  const { email, password } = req.body || {};
  const errors = {};
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  if (Object.keys(errors).length) return res.status(400).json({ status: "error", message: "Validation failed.", errors });

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
  if (!user || !user.isActive || user.deletedAt) return res.status(401).json({ status: "error", message: "Invalid email or password." });

  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ status: "error", message: "Invalid email or password." });

  await new Promise((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())));
  req.session.userId = user._id.toString();
  req.session.userRole = user.role;

  user.lastLoginAt = new Date();
  await user.save();

  res.json({ status: "success", message: "Signed in.", user: publicUser(user) });
}

async function logout(req, res) {
  if (!req.session) return res.json({ status: "success", message: "Already signed out." });
  await new Promise((resolve) => req.session.destroy(() => resolve()));
  res.clearCookie(process.env.SESSION_NAME || "kica.sid", { path: "/" });
  res.json({ status: "success", message: "Signed out." });
}

async function me(req, res) {
  if (!req.user) return res.status(401).json({ status: "error", message: "Not signed in." });
  res.json({ status: "success", user: publicUser(req.user) });
}

async function forgotPassword(req, res) {
  const { email } = req.body || {};
  if (!isValidEmail(email)) return res.status(400).json({ status: "error", message: "Enter a valid email address.", errors: { email: "Invalid email." } });

  const genericOk = { status: "success", message: "If that email is registered, a reset link has been sent." };
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || !user.isActive || user.deletedAt) return res.json(genericOk);

  await PasswordResetToken.updateMany({ user: user._id, usedAt: null }, { $set: { usedAt: new Date() } });

  const plainToken = PasswordResetToken.generate();
  const tokenHash = PasswordResetToken.hash(plainToken);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await PasswordResetToken.create({ user: user._id, tokenHash, expiresAt, requestedFromIp: req.ip || "" });

  const baseUrl = process.env.BASE_URL || "https://kelvin-ikpeni-code-academy.onrender.com";
  const resetUrl = `${baseUrl}/reset-password.html?token=${plainToken}`;

  // Send email (non-blocking — never fail the request if email fails)
  sendPasswordResetEmail(user.email, resetUrl, user.name).catch((err) => {
    console.error("Password reset email failed:", err.message);
  });

  logger.info(`Password reset requested for ${user.email}`);
  res.json(genericOk);
}

async function resetPassword(req, res) {
  const { token, password } = req.body || {};
  const errors = {};
  if (!token) errors.token = "Reset token missing.";
  if (!isValidPassword(password)) errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (Object.keys(errors).length) return res.status(400).json({ status: "error", message: "Validation failed.", errors });

  const tokenHash = PasswordResetToken.hash(token);
  const doc = await PasswordResetToken.findOne({ tokenHash });

  if (!doc || doc.usedAt || doc.expiresAt < new Date()) return res.status(400).json({ status: "error", message: "This reset link is invalid or has expired. Please request a new one." });

  const user = await User.findById(doc.user);
  if (!user || !user.isActive || user.deletedAt) return res.status(400).json({ status: "error", message: "Account unavailable." });

  await user.setPassword(password);
  await user.save();

  doc.usedAt = new Date();
  await doc.save();

  res.json({ status: "success", message: "Password updated. You can now sign in." });
}

module.exports = { register, login, logout, me, forgotPassword, resetPassword };