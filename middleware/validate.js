/**
 * Kelvin Ikpeni Code Academy — Validation middleware factory
 * Usage: router.post("/", validateRegistrationBody, handler);
 */
"use strict";

const { validateRegistration, validateContact } = require("../utils/validators");

/**
 * Validates a user registration body.
 */
function validateRegistrationBody(req, res, next) {
  const { valid, errors } = validateRegistration(req.body);
  if (!valid) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }
  next();
}

/**
 * Validates a contact form body.
 */
function validateContactBody(req, res, next) {
  const { valid, errors } = validateContact(req.body);
  if (!valid) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }
  next();
}

module.exports = { validateRegistrationBody, validateContactBody };