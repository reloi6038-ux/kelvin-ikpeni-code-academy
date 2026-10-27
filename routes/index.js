"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");

const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
const lessonRoutes = require("./lessonRoutes");
const progressRoutes = require("./progressRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const quizRoutes = require("./quizRoutes");
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const certificateRoutes = require("./certificateRoutes");
const adminRoutes = require("./adminRoutes");
const contactRoutes = require("./contactRoutes"); // NEW

const adminController = require("../controllers/adminController");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/lessons", lessonRoutes);
router.use("/progress", progressRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/quizzes", quizRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/certificates", certificateRoutes);
router.use("/admin", adminRoutes);
router.use("/contact", contactRoutes); // NEW

// Public announcements
router.get("/announcements", asyncHandler(adminController.publicAnnouncements));

module.exports = router;