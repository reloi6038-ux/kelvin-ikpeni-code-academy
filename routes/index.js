/**
 * Kelvin Ikpeni Code Academy — API router aggregator
 * Mounts all feature routers under /api
 */
"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");

// Route modules
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const lessonRoutes = require("./lessonRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
const progressRoutes = require("./progressRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const submissionRoutes = require("./submissionRoutes"); // NEW
const quizRoutes = require("./quizRoutes");
const projectRoutes = require("./projectRoutes");
const certificateRoutes = require("./certificateRoutes");
const contactRoutes = require("./contactRoutes");
const adminRoutes = require("./adminRoutes");

// Controllers used directly on the router
const adminController = require("../controllers/adminController");

const router = express.Router();

// =========================================================
// Feature routers
// =========================================================
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/progress", progressRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/submissions", submissionRoutes); // NEW
router.use("/quizzes", quizRoutes);
router.use("/projects", projectRoutes);
router.use("/certificates", certificateRoutes);
router.use("/contact", contactRoutes);
router.use("/admin", adminRoutes);

// =========================================================
// Public announcements (no admin needed)
// =========================================================
router.get("/announcements", asyncHandler(adminController.publicAnnouncements));

module.exports = router;