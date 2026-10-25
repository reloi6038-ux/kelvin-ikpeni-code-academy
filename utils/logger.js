"use strict";

const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug");

function log(level, message, extra) {
  if (levels[level] > levels[currentLevel]) return;
  const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
  if (extra !== undefined && extra !== null) {
    console.log(prefix, message, extra);
  } else {
    console.log(prefix, message);
  }
}

module.exports = {
  error: (msg, extra) => log("error", msg, extra),
  warn: (msg, extra) => log("warn", msg, extra),
  info: (msg, extra) => log("info", msg, extra),
  debug: (msg, extra) => log("debug", msg, extra)
};