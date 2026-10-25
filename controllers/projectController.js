/**
 * Kelvin Ikpeni Code Academy — Project controller
 */
"use strict";

const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");
const ProjectProgress = require("../models/ProjectProgress");
const { getProjectProgress, ensureProgress } = require("../services/projectService");

/**
 * GET /api/projects
 */
async function listProjects(req, res) {
  const projects = await Project.find({ published: true }).sort({ order: 1 }).lean();

  let progressMap = {};
  if (req.user) {
    const all = await ProjectProgress.find({ user: req.user._id }).lean();
    all.forEach((p) => {
      const completed = p.tasks.filter((t) => t.completed).length;
      progressMap[p.project.toString()] = { started: true, completed };
    });
  }

  // Get task counts in one query
  const taskCounts = await ProjectTask.aggregate([
    { $group: { _id: "$project", count: { $sum: 1 } } }
  ]);
  const countMap = {};
  taskCounts.forEach((t) => { countMap[t._id.toString()] = t.count; });

  res.json({
    status: "success",
    projects: projects.map((p) => {
      const totalTasks = countMap[p._id.toString()] || 0;
      const userProgress = progressMap[p._id.toString()];
      const completedTasks = userProgress ? userProgress.completed : 0;
      return {
        id: p._id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        track: p.track,
        icon: p.icon,
        estimatedHours: p.estimatedHours,
        totalTasks,
        comingSoon: !!p.comingSoon,
        started: !!userProgress,
        completedTasks,
        percent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      };
    })
  });
}

/**
 * GET /api/projects/:slug
 */
async function getProject(req, res) {
  const project = await Project.findOne({ slug: req.params.slug, published: true });
  if (!project) return res.status(404).json({ status: "error", message: "Project not found." });

  const tasks = await ProjectTask.find({ project: project._id }).sort({ order: 1 });

  let progressDoc = null;
  if (req.user) {
    progressDoc = await ProjectProgress.findOne({ user: req.user._id, project: project._id });
  }

  const completedSet = new Set();
  const savedCodeMap = {};
  if (progressDoc) {
    progressDoc.tasks.forEach((t) => {
      if (t.completed) completedSet.add(t.task.toString());
      savedCodeMap[t.task.toString()] = {
        html: t.savedHtml || "",
        css: t.savedCss || "",
        js: t.savedJs || ""
      };
    });
  }

  res.json({
    status: "success",
    project: {
      id: project._id,
      slug: project.slug,
      title: project.title,
      description: project.description,
      difficulty: project.difficulty,
      track: project.track,
      icon: project.icon,
      objectives: project.objectives,
      estimatedHours: project.estimatedHours,
      comingSoon: !!project.comingSoon
    },
    tasks: tasks.map((t) => ({
      id: t._id,
      slug: t.slug,
      title: t.title,
      order: t.order,
      estimatedMinutes: t.estimatedMinutes,
      completed: completedSet.has(t._id.toString())
    })),
    savedCode: savedCodeMap
  });
}

/**
 * GET /api/projects/:slug/tasks/:taskSlug
 */
async function getTask(req, res) {
  const project = await Project.findOne({ slug: req.params.slug, published: true });
  if (!project) return res.status(404).json({ status: "error", message: "Project not found." });

  const task = await ProjectTask.findOne({ project: project._id, slug: req.params.taskSlug });
  if (!task) return res.status(404).json({ status: "error", message: "Task not found." });

  const allTasks = await ProjectTask.find({ project: project._id }).sort({ order: 1 });
  const idx = allTasks.findIndex((t) => t._id.equals(task._id));
  const prev = idx > 0 ? allTasks[idx - 1] : null;
  const next = idx < allTasks.length - 1 ? allTasks[idx + 1] : null;

  // Load saved code
  let saved = null;
  let completed = false;
  if (req.user) {
    const progress = await ProjectProgress.findOne({ user: req.user._id, project: project._id });
    if (progress) {
      const tp = progress.tasks.find((t) => t.task.equals(task._id));
      if (tp) {
        completed = tp.completed;
        if (tp.savedHtml || tp.savedCss || tp.savedJs) {
          saved = { html: tp.savedHtml, css: tp.savedCss, js: tp.savedJs };
        }
      }
    }
  }

  res.json({
    status: "success",
    project: { id: project._id, slug: project.slug, title: project.title, icon: project.icon },
    task: {
      id: task._id,
      slug: task.slug,
      title: task.title,
      order: task.order,
      description: task.description,
      instructions: task.instructions,
      learningObjectives: task.learningObjectives,
      starterHtml: task.starterHtml,
      starterCss: task.starterCss,
      starterJs: task.starterJs,
      hints: task.hints,
      estimatedMinutes: task.estimatedMinutes,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
      index: idx + 1,
      total: allTasks.length,
      completed
    },
    saved
  });
}

/**
 * POST /api/projects/:slug/tasks/:taskSlug/save
 * Body: { html, css, js }
 */
async function saveCode(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ status: "error", message: "Project not found." });

  const task = await ProjectTask.findOne({ project: project._id, slug: req.params.taskSlug });
  if (!task) return res.status(404).json({ status: "error", message: "Task not found." });

  const progress = await ensureProgress(req.user._id, project._id);
  let tp = progress.tasks.find((t) => t.task.equals(task._id));
  if (!tp) {
    progress.tasks.push({
      task: task._id,
      completed: false,
      savedHtml: req.body.html || "",
      savedCss: req.body.css || "",
      savedJs: req.body.js || ""
    });
  } else {
    tp.savedHtml = req.body.html || "";
    tp.savedCss = req.body.css || "";
    tp.savedJs = req.body.js || "";
  }
  progress.lastAccessedAt = new Date();
  await progress.save();

  res.json({ status: "success", message: "Saved." });
}

/**
 * POST /api/projects/:slug/tasks/:taskSlug/complete
 */
async function completeTask(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ status: "error", message: "Project not found." });

  const task = await ProjectTask.findOne({ project: project._id, slug: req.params.taskSlug });
  if (!task) return res.status(404).json({ status: "error", message: "Task not found." });

  const progress = await ensureProgress(req.user._id, project._id);
  let tp = progress.tasks.find((t) => t.task.equals(task._id));
  if (!tp) {
    progress.tasks.push({
      task: task._id,
      completed: true,
      completedAt: new Date(),
      savedHtml: req.body.html || "",
      savedCss: req.body.css || "",
      savedJs: req.body.js || ""
    });
  } else {
    tp.completed = true;
    tp.completedAt = new Date();
    if (req.body.html !== undefined) tp.savedHtml = req.body.html;
    if (req.body.css !== undefined) tp.savedCss = req.body.css;
    if (req.body.js !== undefined) tp.savedJs = req.body.js;
  }
  progress.lastAccessedAt = new Date();

  // Check overall completion
  const totalTasks = await ProjectTask.countDocuments({ project: project._id });
  const completedTasks = progress.tasks.filter((t) => t.completed).length;
  if (completedTasks >= totalTasks) {
    progress.completedAt = new Date();
  }
  await progress.save();

  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  res.json({
    status: "success",
    message: "Task completed.",
    completedTasks,
    totalTasks,
    percent,
    projectComplete: completedTasks >= totalTasks
  });
}

/**
 * GET /api/projects/my/progress
 */
async function myProjectsProgress(req, res) {
  const all = await ProjectProgress.find({ user: req.user._id }).populate("project").lean();

  const results = await Promise.all(all.map(async (p) => {
    if (!p.project) return null;
    const totalTasks = await ProjectTask.countDocuments({ project: p.project._id });
    const completed = p.tasks.filter((t) => t.completed).length;
    return {
      projectId: p.project._id,
      slug: p.project.slug,
      title: p.project.title,
      icon: p.project.icon,
      completedTasks: completed,
      totalTasks,
      percent: totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0,
      isComplete: completed >= totalTasks
    };
  }));

  res.json({ status: "success", projects: results.filter(Boolean) });
}

module.exports = { listProjects, getProject, getTask, saveCode, completeTask, myProjectsProgress };