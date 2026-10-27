/**
 * Kelvin Ikpeni Code Academy — Role-based authorization
 * Complements auth.js with flexible role checks.
 */
"use strict";

/**
 * Returns a middleware that requires ONE of the given roles.
 * Usage: router.get("/admin", requireRole("admin"), handler);
 *        router.get("/staff", requireRole("admin", "instructor"), handler);
 */
function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "Authentication required." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: `Access denied. Requires role: ${allowedRoles.join(" or ")}.`
      });
    }
    next();
  };
}

/**
 * Convenience: requires admin.
 */
const requireAdmin = requireRole("admin");

/**
 * Convenience: allows admins OR instructors (future-proofing).
 */
const requireStaff = requireRole("admin", "instructor");

module.exports = { requireRole, requireAdmin, requireStaff };