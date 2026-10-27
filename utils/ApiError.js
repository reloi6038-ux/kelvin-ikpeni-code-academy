/**
 * Kelvin Ikpeni Code Academy — Custom API Error
 * Extends Error with an HTTP status code.
 */
"use strict";

class ApiError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    if (errors) this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static badRequest(message, errors) {
    return new ApiError(message || "Bad request.", 400, errors);
  }

  static unauthorized(message) {
    return new ApiError(message || "Authentication required.", 401);
  }

  static forbidden(message) {
    return new ApiError(message || "Access forbidden.", 403);
  }

  static notFound(message) {
    return new ApiError(message || "Resource not found.", 404);
  }

  static conflict(message, errors) {
    return new ApiError(message || "Conflict.", 409, errors);
  }

  static server(message) {
    return new ApiError(message || "Internal server error.", 500);
  }
}

module.exports = ApiError;