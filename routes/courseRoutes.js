"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { listCourses, getCourseBySlug } = require("../controllers/courseController");

const router = express.Router();

router.get("/", asyncHandler(listCourses));
router.get("/:slug", asyncHandler(getCourseBySlug));

module.exports = router;