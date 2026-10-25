"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const { markComplete, getProgress } = require("../controllers/progressController");

const router = express.Router();

router.post("/:courseSlug/:lessonSlug/complete", requireAuth, asyncHandler(markComplete));
router.get("/:courseSlug", requireAuth, asyncHandler(getProgress));

module.exports = router;