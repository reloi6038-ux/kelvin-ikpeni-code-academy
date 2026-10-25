/**
 * Kelvin Ikpeni Code Academy — User controller
 * PUT /api/users/me — update name + bio
 * POST /api/users/me/change-password — update password
 */
"use strict";

const User = require("../models/User");

async function updateMe(req, res) {
  const { name, bio } = req.body || {};
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ status: "error", message: "User not found." });

  const errors = {};
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
    else user.name = name.trim();
  }
  if (bio !== undefined) {
    if (typeof bio !== "string" || bio.length > 500) errors.bio = "Bio must be under 500 characters.";
    else user.bio = bio;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  await user.save();
  res.json({
    status: "success",
    message: "Profile updated.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio
    }
  });
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body || {};

  const errors = {};
  if (!currentPassword) errors.currentPassword = "Current password is required.";
  if (!newPassword || newPassword.length < 8) errors.newPassword = "New password must be at least 8 characters.";
  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const user = await User.findById(req.user._id).select("+passwordHash");
  if (!user) return res.status(404).json({ status: "error", message: "User not found." });

  const valid = await user.comparePassword(currentPassword);
  if (!valid) {
    return res.status(401).json({
      status: "error",
      message: "Current password is incorrect.",
      errors: { currentPassword: "Incorrect current password." }
    });
  }

  await user.setPassword(newPassword);
  await user.save();

  res.json({ status: "success", message: "Password changed. Please log in again." });
}

module.exports = { updateMe, changePassword };