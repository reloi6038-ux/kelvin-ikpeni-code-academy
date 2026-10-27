/**
 * Kelvin Ikpeni Code Academy — Deploying to Render exercises
 * Targeted seed: adds 15 new deployment exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const deployExercises = [
  {
    title: "Deploy: Production Start Script",
    slug: "deploy-production-start-script",
    description: "<p>Configure <code>package.json</code> with a production-ready <code>start</code> script using <code>node</code> (not nodemon) and <code>engines.node</code> set to <code>&gt;=20.0.0</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "production-config",
    starterJs: '// Write a package.json object with the required fields\nconst pkg = {\n  // ...\n};\n',
    solutionJs: `const pkg = {
  name: "my-app",
  version: "1.0.0",
  main: "server.js",
  scripts: {
    start: "node server.js",
    dev: "nodemon server.js"
  },
  engines: {
    node: ">=20.0.0"
  }
};`,
    hints: ["Use 'node server.js' for start (never nodemon).", "Add an engines field with node >=20.0.0."],
    testCases: [
      { description: "Has start script with node", pattern: "start\\s*:\\s*[\"']node\\s+server\\.js[\"']" },
      { description: "Has engines.node field", pattern: "engines[\\s\\S]*node" },
      { description: "Requires Node >=20", pattern: ">=\\s*20\\.0\\.0" }
    ],
    points: 20,
    order: 150
  },
  {
    title: "Deploy: Listen on Process Env Port",
    slug: "deploy-listen-on-port",
    description: "<p>Configure Express to listen on <code>process.env.PORT</code> with a fallback to 3000, and bind to <code>0.0.0.0</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "production-config",
    starterJs: "// Configure the server to listen correctly\n",
    solutionJs: `const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log("Server running on port " + PORT);
});`,
    hints: ["Use process.env.PORT || 3000.", "Bind to 0.0.0.0 (not localhost)."],
    testCases: [
      { description: "Uses process.env.PORT", pattern: "process\\.env\\.PORT" },
      { description: "Has fallback to 3000", pattern: "\\|\\|\\s*3000" },
      { description: "Binds to 0.0.0.0", pattern: "[\"']0\\.0\\.0\\.0[\"']" }
    ],
    points: 25,
    order: 151
  },
  {
    title: "Deploy: Serve Static Files",
    slug: "deploy-serve-static",
    description: "<p>Configure Express to serve static files from the <code>public</code> directory using <code>path.join</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "production-config",
    starterJs: 'const express = require("express");\nconst path = require("path");\nconst app = express();\n\n// Serve files from public\n',
    solutionJs: `const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));`,
    hints: ["Use express.static().", "Build the path with path.join(__dirname, 'public')."],
    testCases: [
      { description: "Uses express.static", pattern: "express\\.static" },
      { description: "Uses path.join", pattern: "path\\.join" },
      { description: "Uses __dirname", pattern: "__dirname" },
      { description: "References 'public'", pattern: "[\"']public[\"']" }
    ],
    points: 20,
    order: 152
  },
  {
    title: "Deploy: Env Var Check on Startup",
    slug: "deploy-env-var-check",
    description: "<p>Add a startup check that exits with code 1 if <code>MONGODB_URI</code> is missing.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "env-vars",
    starterJs: "// Fail fast if MONGODB_URI is missing\n",
    solutionJs: `if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}`,
    hints: ["Check !process.env.MONGODB_URI.", "Use process.exit(1) on failure."],
    testCases: [
      { description: "Checks MONGODB_URI", pattern: "process\\.env\\.MONGODB_URI" },
      { description: "Uses process.exit(1)", pattern: "process\\.exit\\s*\\(\\s*1\\s*\\)" },
      { description: "Logs an error", pattern: "console\\.error" }
    ],
    points: 20,
    order: 153
  },
  {
    title: "Deploy: Health Check Endpoint",
    slug: "deploy-health-check",
    description: "<p>Add a <code>GET /api/health</code> endpoint that returns <code>{ status: \"ok\", uptime: process.uptime() }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "health-checks",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Add health endpoint\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});`,
    hints: ["Path is /api/health.", "Use res.json with status and uptime."],
    testCases: [
      { description: "Route is /api/health", pattern: "/api/health" },
      { description: "Returns status ok", pattern: "status\\s*:\\s*[\"']ok[\"']" },
      { description: "Uses process.uptime", pattern: "process\\.uptime" }
    ],
    points: 25,
    order: 154
  },
  {
    title: "Deploy: Health Endpoint with DB Check",
    slug: "deploy-health-db",
    description: "<p>Return 200 if MongoDB is connected, 503 otherwise. Check via <code>mongoose.connection.readyState === 1</code>.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "health-checks",
    starterJs: 'const mongoose = require("mongoose");\n\n// Add health check with DB status\n',
    solutionJs: `app.get("/api/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "degraded",
    database: { connected }
  });
});`,
    hints: ["Use mongoose.connection.readyState === 1.", "Return 200 or 503 based on connection."],
    testCases: [
      { description: "Checks readyState", pattern: "connection\\.readyState" },
      { description: "Returns 503", pattern: "503" },
      { description: "Returns 200", pattern: "200" },
      { description: "Uses ternary", pattern: "\\?\\s*200\\s*:\\s*503|\\?\\s*\\\"ok\\\"" }
    ],
    points: 30,
    order: 155
  },
  {
    title: "Deploy: MongoDB Connection",
    slug: "deploy-mongo-connect",
    description: "<p>Connect Mongoose to <code>process.env.MONGODB_URI</code> with <code>serverSelectionTimeoutMS</code> set to 10000.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "mongodb",
    starterJs: 'const mongoose = require("mongoose");\n\n// Connect to MongoDB\n',
    solutionJs: `const mongoose = require("mongoose");

await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
});`,
    hints: ["Use mongoose.connect().", "Pass options object with serverSelectionTimeoutMS."],
    testCases: [
      { description: "Uses mongoose.connect", pattern: "mongoose\\.connect" },
      { description: "Uses process.env.MONGODB_URI", pattern: "process\\.env\\.MONGODB_URI" },
      { description: "Sets serverSelectionTimeoutMS", pattern: "serverSelectionTimeoutMS\\s*:\\s*10000" }
    ],
    points: 25,
    order: 156
  },
  {
    title: "Deploy: Trust Proxy in Production",
    slug: "deploy-trust-proxy",
    description: "<p>Set <code>app.set('trust proxy', 1)</code> when <code>NODE_ENV</code> is 'production'.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "production-config",
    starterJs: "// Configure trust proxy for production\n",
    solutionJs: `if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}`,
    hints: ["Wrap in if (process.env.NODE_ENV === 'production').", "Use app.set('trust proxy', 1)."],
    testCases: [
      { description: "Checks NODE_ENV", pattern: "process\\.env\\.NODE_ENV" },
      { description: "Sets trust proxy", pattern: "trust\\s+proxy" }
    ],
    points: 20,
    order: 157
  },
  {
    title: "Deploy: Secure Cookie Config",
    slug: "deploy-secure-cookie",
    description: "<p>Configure a session cookie with <code>httpOnly: true</code>, <code>sameSite: 'lax'</code>, and <code>secure: true</code> when in production.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "production-config",
    starterJs: "// Configure cookie for production\n",
    solutionJs: `cookie: {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
}`,
    hints: ["httpOnly: true.", "sameSite: 'lax'.", "secure based on NODE_ENV."],
    testCases: [
      { description: "Sets httpOnly: true", pattern: "httpOnly\\s*:\\s*true" },
      { description: "Sets sameSite: 'lax'", pattern: "sameSite\\s*:\\s*[\"']lax[\"']" },
      { description: "Sets secure from NODE_ENV", pattern: "secure\\s*:\\s*process\\.env\\.NODE_ENV" }
    ],
    points: 25,
    order: 158
  },
  {
    title: "Deploy: Helmet Security Headers",
    slug: "deploy-helmet",
    description: "<p>Enable helmet middleware on your Express app.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "security",
    starterJs: '// Enable helmet\n',
    solutionJs: `const helmet = require("helmet");
app.use(helmet());`,
    hints: ["Require helmet.", "Use app.use(helmet())."],
    testCases: [
      { description: "Requires helmet", pattern: "require\\([\"']helmet[\"']\\)" },
      { description: "Uses helmet()", pattern: "helmet\\(\\)" }
    ],
    points: 20,
    order: 159
  },
  {
    title: "Deploy: Graceful Shutdown",
    slug: "deploy-graceful-shutdown",
    description: "<p>Handle SIGTERM by closing the server and MongoDB connection, then exiting with code 0.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "reliability",
    starterJs: "// Handle graceful shutdown\n",
    solutionJs: `process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down...");
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
});`,
    hints: ["Listen on SIGTERM.", "Use server.close(callback).", "Close mongoose connection before exiting."],
    testCases: [
      { description: "Handles SIGTERM", pattern: "SIGTERM" },
      { description: "Uses server.close", pattern: "server\\.close" },
      { description: "Closes mongoose connection", pattern: "mongoose\\.connection\\.close" },
      { description: "Exits with 0", pattern: "process\\.exit\\s*\\(\\s*0\\s*\\)" }
    ],
    points: 30,
    order: 160
  },
  {
    title: "Deploy: Render Config (render.yaml)",
    slug: "deploy-render-yaml",
    description: "<p>Write a <code>render.yaml</code> snippet declaring a Node web service with build command <code>npm install</code> and start command <code>npm start</code>.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "render",
    starterJs: "// Write a render.yaml snippet as a string\nconst yaml = `\n`;\n",
    solutionJs: `const yaml = \`
services:
  - type: web
    name: my-app
    runtime: node
    buildCommand: npm install
    startCommand: npm start
\`;`,
    hints: ["Use services: - type: web.", "Set runtime: node.", "Set buildCommand and startCommand."],
    testCases: [
      { description: "Has type: web", pattern: "type\\s*:\\s*web" },
      { description: "Runtime is node", pattern: "runtime\\s*:\\s*node" },
      { description: "buildCommand is npm install", pattern: "buildCommand\\s*:\\s*npm\\s+install" },
      { description: "startCommand is npm start", pattern: "startCommand\\s*:\\s*npm\\s+start" }
    ],
    points: 25,
    order: 161
  },
  {
    title: "Deploy: .gitignore for Deploy",
    slug: "deploy-gitignore",
    description: "<p>Write a <code>.gitignore</code> snippet that excludes <code>.env</code> (but allows <code>.env.example</code>) and <code>node_modules/</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "git",
    starterJs: "// Write the .gitignore contents as a string\nconst gitignore = `\n`;\n",
    solutionJs: `const gitignore = \`
.env
.env.*
!.env.example
node_modules/
logs/
*.log
\`;`,
    hints: ["Exclude .env.", "Use !.env.example to re-include.", "Exclude node_modules/."],
    testCases: [
      { description: "Excludes .env", pattern: "^\\.env\\s*$|\\n\\.env\\s*\\n" },
      { description: "Allows .env.example", pattern: "!\\.env\\.example" },
      { description: "Excludes node_modules/", pattern: "node_modules/" }
    ],
    points: 20,
    order: 162
  },
  {
    title: "Deploy: Environment Variables Loader",
    slug: "deploy-env-loader",
    description: "<p>Load <code>dotenv</code> at the top of the server file so env vars are available before anything else runs.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "env-vars",
    starterJs: "// Load .env before other imports\n",
    solutionJs: `require("dotenv").config();`,
    hints: ["Use require('dotenv').config().", "Place it at the very top of server.js."],
    testCases: [
      { description: "Requires dotenv", pattern: "require\\([\"']dotenv[\"']\\)" },
      { description: "Calls .config()", pattern: "\\.config\\(\\)" }
    ],
    points: 15,
    order: 163
  },
  {
    title: "Deploy: Request Timeout",
    slug: "deploy-request-timeout",
    description: "<p>Set a request timeout of 30 seconds using <code>req.setTimeout</code>, responding with 408 on timeout.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "reliability",
    starterJs: "// Add timeout middleware\n",
    solutionJs: `app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    res.status(408).json({ error: "Request timeout" });
  });
  next();
});`,
    hints: ["Use req.setTimeout(ms, callback).", "Respond with 408 on timeout.", "Call next() to continue."],
    testCases: [
      { description: "Uses req.setTimeout", pattern: "req\\.setTimeout" },
      { description: "Uses 30000ms", pattern: "30000" },
      { description: "Returns 408", pattern: "408" }
    ],
    points: 25,
    order: 164
  }
];

async function seedDeployExercises() {
  const course = await Course.findOne({ slug: "deploying-to-render" });
  if (!course) {
    console.warn("⚠  Course not found: deploying-to-render");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of deployExercises) {
    const slug = ex.slug;
    const existing = await Exercise.findOne({ slug });
    const payload = { ...ex, slug, course: course._id };

    if (existing) {
      await Exercise.updateOne({ slug }, { $set: payload });
      updated++;
    } else {
      await Exercise.create(payload);
      created++;
    }
  }

  console.log(`   Deploy exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedDeployExercises };