/**
 * Kelvin Ikpeni Code Academy — Environment configuration
 * Validates required env vars on startup so failures are loud and clear.
 */
"use strict";

const REQUIRED = [
  "MONGODB_URI",
  "SESSION_SECRET"
];

const OPTIONAL = [
  "PORT",
  "NODE_ENV",
  "BASE_URL",
  "COOKIE_SECURE",
  "SESSION_NAME",
  "SESSION_MAX_AGE_MS",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "NOTIFY_EMAIL",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "ADMIN_NAME",
  "STUDENT_EMAIL",
  "STUDENT_PASSWORD",
  "STUDENT_NAME"
];

/**
 * Validate environment variables. Throws if a required var is missing.
 * Call this BEFORE connecting to any services.
 */
function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error("\n👉 Add them to your .env file (or Render dashboard).");
    process.exit(1);
  }

  // Warn if SESSION_SECRET is a placeholder
  if (process.env.SESSION_SECRET === "change-me-to-a-48-byte-random-hex-string") {
    console.warn("⚠️  SESSION_SECRET is a placeholder — change it in production.");
  }

  // Warn if email is partially configured
  const hasEmailUser = !!process.env.GMAIL_USER;
  const hasEmailPass = !!process.env.GMAIL_APP_PASSWORD;
  if (hasEmailUser !== hasEmailPass) {
    console.warn("⚠️  Only one of GMAIL_USER / GMAIL_APP_PASSWORD is set. Email sending will fail.");
  }

  console.log("✅ Environment variables validated");
}

/**
 * Get an env var with a default.
 */
function getEnv(key, defaultValue = undefined) {
  return process.env[key] ?? defaultValue;
}

module.exports = { validateEnv, getEnv, REQUIRED, OPTIONAL };