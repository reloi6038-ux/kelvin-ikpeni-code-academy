"use strict";

const express = require("express");
const rateLimiters = require("../middleware/rateLimit");
const asyncHandler = require("../utils/asyncHandler");
const authController = require("../controllers/authController");
const { requireGuest } = require("../middleware/auth");

const router = express.Router();

router.post("/register", rateLimiters.authLimiter, requireGuest, asyncHandler(authController.register));
router.post("/login", rateLimiters.authLimiter, requireGuest, asyncHandler(authController.login));
router.post("/logout", asyncHandler(authController.logout));
router.get("/me", asyncHandler(authController.me));
router.post("/forgot-password", rateLimiters.passwordResetLimiter, asyncHandler(authController.forgotPassword));
router.post("/reset-password", rateLimiters.passwordResetLimiter, asyncHandler(authController.resetPassword));

module.exports = router;