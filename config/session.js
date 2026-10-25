"use strict";

const session = require("express-session");
const MongoStore = require("connect-mongo");

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function buildSessionMiddleware() {
  const secret = process.env.SESSION_SECRET || "insecure-dev-secret-change-me";

  return session({
    name: process.env.SESSION_NAME || "kica.sid",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60,
      autoRemove: "native",
      touchAfter: 24 * 3600
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.SESSION_MAX_AGE_MS || SEVEN_DAYS_MS),
      path: "/"
    }
  });
}

module.exports = { buildSessionMiddleware };