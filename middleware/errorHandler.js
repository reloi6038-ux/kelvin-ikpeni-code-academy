"use strict";

const logger = require("../utils/logger");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isProd = process.env.NODE_ENV === "production";
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, isProd ? null : err.stack);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]))
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      status: "error",
      message: `That ${field} is already registered.`,
      errors: { [field]: `This ${field} is already in use.` }
    });
  }

  // Mongoose cast error (bad ID)
  if (err.name === "CastError") {
    return res.status(400).json({ status: "error", message: "Invalid resource ID." });
  }

  // Custom errors
  const status = err.status || err.statusCode || 500;
  const message = status >= 500 && isProd ? "Internal server error." : err.message || "Something went wrong.";

  if (req.originalUrl.startsWith("/api")) {
    const payload = { status: "error", message };
    if (err.errors) payload.errors = err.errors;
    return res.status(status).json(payload);
  }

  // HTML fallback
  res.status(status).type("html").send(
    `<h1>${status} — ${status >= 500 ? "Server Error" : "Error"}</h1>
     <p>${message}</p>
     <p><a href="/">Back to Home</a></p>`
  );
}

module.exports = errorHandler;