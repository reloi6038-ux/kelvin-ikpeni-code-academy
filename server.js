/* =========================================================
   Kelvin Ikpeni Code Academy — server.js (Phase 11)
   ========================================================= */

"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const { connectDB, disconnectDB, isConnected, mongoose } = require("./config/db");
const { buildSessionMiddleware } = require("./config/session");
const { loadUser, requireAuth, requireAdmin, requireGuest } = require("./middleware/auth");
const apiRoutes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.join(__dirname, "public");

express.static.mime.define({ "application/manifest+json": ["webmanifest"] });

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:", "blob:"],
        "font-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
        "connect-src": ["'self'"],
        "frame-ancestors": ["'self'"],
        "frame-src": ["'self'", "blob:"],
        "form-action": ["'self'"],
        "base-uri": ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(buildSessionMiddleware());
app.use(loadUser);

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    );
  });
  next();
});

app.get("/api/health", async (req, res) => {
  const dbConnected = isConnected();
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "degraded",
    service: "kelvin-ikpeni-code-academy",
    phase: 11,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    database: {
      connected: dbConnected,
      state: dbStates[mongoose.connection.readyState] || "unknown",
      name: mongoose.connection.name || null
    }
  });
});

app.use("/api", apiRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ status: "error", message: "API route not found." });
});

// ---------------- Protected Pages ----------------
app.get(["/dashboard.html", "/dashboard"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "dashboard.html"));
});
app.get(["/profile.html", "/profile"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "profile.html"));
});
app.get(["/learning.html", "/learning"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "learning.html"));
});
app.get(["/exercise.html", "/exercise"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "exercise.html"));
});
app.get(["/quiz.html", "/quiz"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "quiz.html"));
});
app.get(["/project-details.html", "/project-details"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "project-details.html"));
});
app.get(["/project-task.html", "/project-task"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "project-task.html"));
});
app.get(["/certificate-view.html", "/certificate-view"], requireAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "certificate-view.html"));
});

// ---------------- Admin Page ----------------
app.get(["/admin-dashboard.html", "/admin"], requireAdmin, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "admin-dashboard.html"));
});

// ---------------- Guest Pages ----------------
app.get(["/login.html", "/login"], requireGuest, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "login.html"));
});
app.get(["/register.html", "/register"], requireGuest, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "register.html"));
});

app.use(express.static(PUBLIC_DIR, { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, "404.html"), (err) => {
    if (err) {
      res
        .type("html")
        .send("<h1>404 — Page Not Found</h1><p><a href=\"/\">Back to Home</a></p>");
    }
  });
});

app.use(errorHandler);

(async function bootstrap() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Fatal: could not connect to MongoDB.");
  }

  const server = app.listen(PORT, HOST, () => {
    console.log("====================================================");
    console.log("  Kelvin Ikpeni Code Academy — Learn to Code. Build to Lead.");
    console.log(`  Server running at: http://localhost:${PORT}`);
    console.log(`  Health check:      http://localhost:${PORT}/api/health`);
    console.log("====================================================");
  });

  let shuttingDown = false;
  async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`\n${signal} received — shutting down gracefully...`);
    server.close(async () => {
      try {
        await disconnectDB();
      } catch (_) { /* ignore */ }
      console.log("Server closed. Bye.");
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  }
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
})();