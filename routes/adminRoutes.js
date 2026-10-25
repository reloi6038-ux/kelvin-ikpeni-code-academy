"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAdmin } = require("../middleware/auth");

const adminController = require("../controllers/adminController");
const courseController = require("../controllers/courseController");
const lessonController = require("../controllers/lessonController");
const certificateController = require("../controllers/certificateController");
const adminEditController = require("../controllers/adminEditController");
const adminQuizController = require("../controllers/adminQuizController");

const router = express.Router();

router.use(requireAdmin);

// Analytics
router.get("/analytics", asyncHandler(adminController.analytics));

// Users
router.get("/users", asyncHandler(adminController.listUsers));
router.patch("/users/:id", asyncHandler(adminController.updateUser));

// Courses
router.get("/courses/:slug", asyncHandler(adminEditController.getCourseFull));
router.post("/courses", asyncHandler(courseController.createCourse));
router.patch("/courses/:slug", asyncHandler(courseController.updateCourse));
router.delete("/courses/:slug", asyncHandler(courseController.deleteCourse));

// Lessons
router.get("/courses/:courseSlug/lessons", asyncHandler(adminEditController.listLessonsForCourse));
router.get("/lessons/:id", asyncHandler(adminEditController.getLessonById));
router.post("/courses/:courseSlug/lessons", asyncHandler(lessonController.createLesson));
router.patch("/lessons/:id", asyncHandler(lessonController.updateLesson));
router.delete("/lessons/:id", asyncHandler(lessonController.deleteLesson));

// Quizzes
router.get("/quizzes", asyncHandler(adminQuizController.listQuizzes));
router.get("/quizzes/:id", asyncHandler(adminQuizController.getQuizFull));
router.post("/quizzes", asyncHandler(adminQuizController.createQuiz));
router.patch("/quizzes/:id", asyncHandler(adminQuizController.updateQuiz));
router.delete("/quizzes/:id", asyncHandler(adminQuizController.deleteQuiz));

// Certificates
router.get("/certificates", asyncHandler(certificateController.adminListCertificates));
router.post("/certificates/:id/revoke", asyncHandler(certificateController.revokeCertificate));

// Announcements
router.get("/announcements", asyncHandler(adminController.listAnnouncements));
router.post("/announcements", asyncHandler(adminController.createAnnouncement));
router.delete("/announcements/:id", asyncHandler(adminController.deleteAnnouncement));

module.exports = router;