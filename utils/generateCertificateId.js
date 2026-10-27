/**
 * Kelvin Ikpeni Code Academy — Certificate ID generator
 * Produces unique IDs like KICA-A1B2-C3D4.
 */
"use strict";

const crypto = require("crypto");

function generateCertificateId() {
  const raw = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `KICA-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

module.exports = { generateCertificateId };