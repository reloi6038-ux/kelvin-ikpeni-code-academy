"use strict";

const User = require("../models/User");

async function loadUser(req, _res, next) {
  req.user = null;
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user && user.isActive && !user.deletedAt) {
        req.user = user;
      } else if (req.session) {
        req.session.destroy(() => {});
      }
    } catch (err) {
      console.error("loadUser error:", err.message);
    }
  }
  next();
}

function requireAuth(req, res, next) {
  if (req.user) return next();
  if (req.originalUrl.startsWith("/api")) {
    return res.status(401).json({ status: "error", message: "Authentication required." });
  }
  return res.redirect(`/login.html?next=${encodeURIComponent(req.originalUrl)}`);
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(401).json({ status: "error", message: "Authentication required." });
    }
    return res.redirect(`/login.html?next=${encodeURIComponent(req.originalUrl)}`);
  }
  if (req.user.role !== "admin") {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(403).json({ status: "error", message: "Admin access required." });
    }
    return res.redirect("/dashboard.html");
  }
  next();
}

function requireGuest(req, res, next) {
  if (req.user) {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(400).json({ status: "error", message: "Already signed in." });
    }
    return res.redirect("/dashboard.html");
  }
  next();
}

module.exports = { loadUser, requireAuth, requireAdmin, requireGuest };