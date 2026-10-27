/**
 * Kelvin Ikpeni Code Academy — Async route wrapper
 * Wraps an async route handler so thrown errors go to Express's error handler.
 */
"use strict";

module.exports = function asyncHandler(fn) {
  if (typeof fn !== "function") {
    console.error(
      "❌ asyncHandler received a non-function value. " +
      "This usually means a controller export is misspelled or missing."
    );
    // Return a safe handler that reports 500 instead of crashing at boot
    return function (req, res, _next) {
      res.status(500).json({
        status: "error",
        message: "Route handler misconfigured. Please contact support."
      });
    };
  }

  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};