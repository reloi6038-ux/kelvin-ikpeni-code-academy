/**
 * Kelvin Ikpeni Code Academy — MongoDB connection
 * Uses Mongoose. Retries on failure. Logs all lifecycle events.
 */
"use strict";

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env. Aborting.");
  process.exit(1);
}

// Options (Mongoose 8 defaults are good — these are explicit for clarity)
const options = {
  serverSelectionTimeoutMS: 10000, // fail fast if Atlas unreachable
  socketTimeoutMS: 45000
};

// Event listeners
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected:", mongoose.connection.name);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

/**
 * Connect with retry.
 * @param {number} retries - how many times to retry
 * @param {number} delayMs - initial delay between retries (doubles)
 */
async function connectDB(retries = 3, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI, options);
      return mongoose.connection;
    } catch (err) {
      console.error(
        `❌ MongoDB connection attempt ${attempt}/${retries} failed:`,
        err.message
      );
      if (attempt === retries) {
        console.error("❌ All MongoDB connection attempts failed. Exiting.");
        throw err;
      }
      console.log(`   Retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
      delayMs *= 2;
    }
  }
}

/** Gracefully close the connection. */
async function disconnectDB() {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed.");
}

/**
 * Is the current connection usable?
 * @returns {boolean}
 */
function isConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, disconnectDB, isConnected, mongoose };