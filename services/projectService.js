/**
 * Kelvin Ikpeni Code Academy — Project service
 */
"use strict";

const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");
const ProjectProgress = require("../models/ProjectProgress");

async function getProjectProgress(userId, projectId) {
  const totalTasks = await ProjectTask.countDocuments({ project: projectId });
  let progress = await ProjectProgress.findOne({ user: userId, project: projectId });
  let completed = 0;

  if (progress) {
    completed = progress.tasks.filter((t) => t.completed).length;
  }

  const percent = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
  const isComplete = totalTasks > 0 && completed >= totalTasks;

  return {
    started: !!progress,
    completedTasks: completed,
    totalTasks,
    percent,
    isComplete
  };
}

async function ensureProgress(userId, projectId) {
  let progress = await ProjectProgress.findOne({ user: userId, project: projectId });
  if (!progress) {
    progress = await ProjectProgress.create({
      user: userId,
      project: projectId,
      tasks: []
    });
  }
  return progress;
}

module.exports = { getProjectProgress, ensureProgress };