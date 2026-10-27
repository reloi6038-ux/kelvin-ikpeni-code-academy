"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const rateLimit = require("express-rate-limit");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many messages. Please try again later." }
});

router.post("/", contactLimiter, asyncHandler(submitContact));

module.exports = router;