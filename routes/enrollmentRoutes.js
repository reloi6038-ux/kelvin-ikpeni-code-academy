"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const { enroll, myEnrollments } = require("../controllers/enrollmentController");

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(myEnrollments));
router.post("/:slug", requireAuth, asyncHandler(enroll));

module.exports = router;