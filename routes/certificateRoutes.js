"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const {
  myCertificates,
  getCertificate,
  downloadPdf,
  verify,
  issueNow
} = require("../controllers/certificateController");

const router = express.Router();

// Public — must be first to avoid auth middleware
router.get("/verify/:certificateId", asyncHandler(verify));

// Authenticated
router.get("/me", requireAuth, asyncHandler(myCertificates));
router.post("/issue", requireAuth, asyncHandler(issueNow));
router.get("/:certificateId/pdf", requireAuth, asyncHandler(downloadPdf));
router.get("/:certificateId", requireAuth, asyncHandler(getCertificate));

module.exports = router;