/**
 * Kelvin Ikpeni Code Academy — Admin controller
 */
"use strict";

const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Certificate = require("../models/Certificate");
const Submission = require("../models/Submission");
const QuizAttempt = require("../models/QuizAttempt");
const Announcement = require("../models/Announcement");

async function analytics(req, res) {
  const [users, courses, enrollments, completions, certificates, submissions, quizAttempts] = await Promise.all([
    User.countDocuments({ role: "student", deletedAt: null }),
    Course.countDocuments({}),
    Enrollment.countDocuments({}),
    Enrollment.countDocuments({ status: "completed" }),
    Certificate.countDocuments({ revokedAt: null }),
    Submission.countDocuments({ success: true }),
    QuizAttempt.countDocuments({ passed: true })
  ]);

  res.json({
    status: "success",
    analytics: {
      totalStudents: users,
      totalCourses: courses,
      totalEnrollments: enrollments,
      totalCompletions: completions,
      totalCertificates: certificates,
      totalExercisesSolved: submissions,
      totalQuizzesPassed: quizAttempts
    }
  });
}

async function listUsers(req, res) {
  const { q, role } = req.query;
  const filter = { deletedAt: null };
  if (role) filter.role = role;
  if (q) {
    filter.$or = [
      { name: new RegExp(q, "i") },
      { email: new RegExp(q, "i") }
    ];
  }

  const users = await User.find(filter).sort({ createdAt: -1 }).limit(200);

  res.json({
    status: "success",
    count: users.length,
    users: users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt
    }))
  });
}

async function updateUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: "error", message: "User not found." });

  if (user._id.equals(req.user._id) && req.body.role === "student") {
    return res.status(400).json({ status: "error", message: "You cannot demote yourself." });
  }

  if (req.body.role && ["student", "admin"].includes(req.body.role)) {
    user.role = req.body.role;
  }
  if (typeof req.body.isActive === "boolean") {
    user.isActive = req.body.isActive;
  }
  await user.save();

  res.json({ status: "success", message: "User updated." });
}

async function listAnnouncements(req, res) {
  const items = await Announcement.find({}).sort({ createdAt: -1 }).limit(50);
  res.json({ status: "success", announcements: items });
}

async function createAnnouncement(req, res) {
  const { title, body, level, expiresAt } = req.body || {};
  const errors = {};
  if (!title || title.trim().length < 3) errors.title = "Title required.";
  if (!body || body.trim().length < 5) errors.body = "Body required.";
  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const ann = await Announcement.create({
    title: title.trim(),
    body: body.trim(),
    level: level || "info",
    expiresAt: expiresAt ? new Date(expiresAt) : null,
    createdBy: req.user._id
  });

  res.status(201).json({ status: "success", announcement: ann });
}

async function deleteAnnouncement(req, res) {
  await Announcement.deleteOne({ _id: req.params.id });
  res.json({ status: "success", message: "Announcement deleted." });
}

async function publicAnnouncements(req, res) {
  const now = new Date();
  const items = await Announcement.find({
    active: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }]
  }).sort({ createdAt: -1 }).limit(5);

  res.json({
    status: "success",
    announcements: items.map((a) => ({
      title: a.title,
      body: a.body,
      level: a.level,
      createdAt: a.createdAt
    }))
  });
}

module.exports = {
  analytics,
  listUsers,
  updateUser,
  listAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  publicAnnouncements
};