"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { listByCourse, getLesson } = require("../controllers/lessonController");

const router = express.Router();

router.get("/course/:slug", asyncHandler(listByCourse));
router.get("/:courseSlug/:lessonSlug", asyncHandler(getLesson));

module.exports = router;