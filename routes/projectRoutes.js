"use strict";

const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const {
  listProjects,
  getProject,
  getTask,
  saveCode,
  completeTask,
  myProjectsProgress
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", asyncHandler(listProjects));
router.get("/my/progress", requireAuth, asyncHandler(myProjectsProgress));
router.get("/:slug", asyncHandler(getProject));
router.get("/:slug/tasks/:taskSlug", requireAuth, asyncHandler(getTask));
router.post("/:slug/tasks/:taskSlug/save", requireAuth, asyncHandler(saveCode));
router.post("/:slug/tasks/:taskSlug/complete", requireAuth, asyncHandler(completeTask));

module.exports = router;