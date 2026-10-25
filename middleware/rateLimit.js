"use strict";

const rateLimit = require("express-rate-limit");

function buildLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: "error", message },
    handler: (req, res, _next, options) => {
      res.status(options.statusCode).json(options.message);
    }
  });
}

const authLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts. Please wait 15 minutes and try again."
});

const passwordResetLimiter = buildLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many password reset requests. Try again later."
});

module.exports = { authLimiter, passwordResetLimiter };