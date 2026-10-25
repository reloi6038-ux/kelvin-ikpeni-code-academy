"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const { updateMe, changePassword } = require("../controllers/userController");

const router = express.Router();

router.put("/me", requireAuth, asyncHandler(updateMe));
router.post("/me/change-password", requireAuth, asyncHandler(changePassword));

module.exports = router;