/**
 * Kelvin Ikpeni Code Academy — Additional security headers
 * Supplements helmet with custom headers.
 */
"use strict";

function securityHeaders(req, res, next) {
  // Prevent MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy (formerly Feature Policy)
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  // Remove Express signature
  res.removeHeader("X-Powered-By");

  next();
}

module.exports = securityHeaders;