/**
 * Kelvin Ikpeni Code Academy — 404 handler
 * Returns JSON for /api/* routes, HTML for pages.
 */
"use strict";

const path = require("path");

function notFound(PUBLIC_DIR) {
  return function (req, res) {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(404).json({
        status: "error",
        message: `API route not found: ${req.method} ${req.originalUrl}`
      });
    }

    const fourOhFour = path.join(PUBLIC_DIR, "404.html");
    res.status(404).sendFile(fourOhFour, (err) => {
      if (err) {
        res.type("html").send(
          "<h1>404 — Page Not Found</h1><p><a href=\"/\">Back to Home</a></p>"
        );
      }
    });
  };
}

module.exports = notFound;