"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");
const {
  listByCourse,
  getQuiz,
  submitQuiz,
  myAttempts
} = require("../controllers/quizController");

const quizSubmitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many quiz submissions. Wait a minute." }
});

const router = express.Router();

router.get("/course/:courseSlug", asyncHandler(listByCourse));
router.get("/:slug/attempts", requireAuth, asyncHandler(myAttempts));
router.get("/:slug", requireAuth, asyncHandler(getQuiz));
router.post("/:slug/submit", requireAuth, quizSubmitLimiter, asyncHandler(submitQuiz));

module.exports = router;