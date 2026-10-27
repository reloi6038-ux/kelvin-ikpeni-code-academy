/**
 * Kelvin Ikpeni Code Academy — Reusable validators
 * Keeps validation rules consistent across controllers.
 */
"use strict";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email);
}

function isValidPassword(password, minLength = 8) {
  return typeof password === "string" && password.length >= minLength;
}

function isValidName(name, minLength = 2, maxLength = 80) {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

function isValidObjectId(id) {
  return typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
}

function isNonEmptyString(s, minLength = 1) {
  return typeof s === "string" && s.trim().length >= minLength;
}

/**
 * Validate a user registration payload.
 * Returns { valid, errors } where errors is a field-to-message object.
 */
function validateRegistration({ name, email, password }) {
  const errors = {};
  if (!isValidName(name)) errors.name = "Name must be 2-80 characters.";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!isValidPassword(password)) errors.password = "Password must be at least 8 characters.";

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Validate a contact submission.
 */
function validateContact({ name, email, subject, message }) {
  const errors = {};
  if (!isValidName(name)) errors.name = "Name must be 2+ characters.";
  if (!isValidEmail(email)) errors.email = "Invalid email.";
  if (!isNonEmptyString(subject, 3)) errors.subject = "Subject is required.";
  if (!isNonEmptyString(message, 10)) errors.message = "Message must be 10+ characters.";

  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidObjectId,
  isNonEmptyString,
  validateRegistration,
  validateContact
};