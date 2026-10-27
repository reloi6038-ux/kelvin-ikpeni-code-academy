/**
 * Kelvin Ikpeni Code Academy — Standard API responses
 * Ensures every endpoint returns the same JSON shape.
 */
"use strict";

/**
 * Success response.
 * @param {object} res  Express response
 * @param {object} data Payload to return under `data`
 * @param {string} message Optional message
 * @param {number} status  HTTP status (default 200)
 */
function success(res, data = {}, message = "Success", status = 200) {
  return res.status(status).json({
    status: "success",
    message,
    data
  });
}

/**
 * Created response (201).
 */
function created(res, data = {}, message = "Created") {
  return success(res, data, message, 201);
}

/**
 * No content (204) — for successful DELETE.
 */
function noContent(res) {
  return res.status(204).end();
}

/**
 * Error response.
 * @param {object} res
 * @param {string} message
 * @param {number} status
 * @param {object} errors  Field-level errors (optional)
 */
function error(res, message = "Error", status = 500, errors = null) {
  const payload = { status: "error", message };
  if (errors) payload.errors = errors;
  return res.status(status).json(payload);
}

/**
 * Paginated response.
 */
function paginated(res, items, total, page, limit) {
  return success(res, {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
}

module.exports = { success, created, noContent, error, paginated };