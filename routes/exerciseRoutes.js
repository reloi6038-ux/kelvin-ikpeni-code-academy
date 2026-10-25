"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const {
  listExercises,
  getExerciseBySlug,
  revealSolution,
  submitExercise,
  myStats
} = require("../controllers/exerciseController");

const router = express.Router();

router.get("/", asyncHandler(listExercises));
router.get("/me/stats", requireAuth, asyncHandler(myStats));
router.get("/:slug", asyncHandler(getExerciseBySlug));
router.get("/:slug/solution", requireAuth, asyncHandler(revealSolution));
router.post("/:slug/submit", requireAuth, asyncHandler(submitExercise));

module.exports = router;