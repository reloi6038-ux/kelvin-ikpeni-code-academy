/**
 * Kelvin Ikpeni Code Academy — Submission routes
 */
"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");

const submissionController = require("../controllers/submissionController");

const router = express.Router();

// Log the exports so you can confirm they exist on startup
if (typeof submissionController.mySubmissions !== "function") {
  console.error("❌ submissionController.mySubmissions is not a function. Check controllers/submissionController.js exports.");
}
if (typeof submissionController.mySubmissionForExercise !== "function") {
  console.error("❌ submissionController.mySubmissionForExercise is not a function. Check controllers/submissionController.js exports.");
}

router.use(requireAuth);

router.get("/me", asyncHandler(submissionController.mySubmissions));
router.get("/me/:exerciseSlug", asyncHandler(submissionController.mySubmissionForExercise));

module.exports = router;