/**
 * Kelvin Ikpeni Code Academy — Express.js Fundamentals exercises
 * Targeted seed: adds 15 new Express-specific exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const expressExercises = [
  {
    title: "Express: Welcome Route",
    slug: "express-welcome-route",
    description: "<p><strong>Simulated.</strong> Create an Express app with a <code>GET /</code> route that sends 'Welcome to my API'.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});`,
    hints: ["Use app.get with path '/'", "Use res.send to return a string."],
    testCases: [
      { description: "Uses app.get", pattern: "app\\.get" },
      { description: "Route is /", pattern: "app\\.get\\(\\s*[\"']/[\"']" },
      { description: "Sends welcome text", expectText: "Welcome to my API" }
    ],
    points: 15,
    order: 60
  },
  {
    title: "Express: Route Parameter",
    slug: "express-route-param",
    description: "<p><strong>Simulated.</strong> Create a route <code>GET /users/:id</code> that sends the ID back as JSON <code>{ id: ... }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});`,
    hints: ["Use :id in the path.", "Access with req.params.id.", "Return JSON with res.json()."],
    testCases: [
      { description: "Uses :id param", expectText: ":id" },
      { description: "Accesses req.params", pattern: "req\\.params" },
      { description: "Uses res.json", pattern: "res\\.json" }
    ],
    points: 20,
    order: 61
  },
  {
    title: "Express: Query Parameters",
    slug: "express-query-params",
    description: "<p><strong>Simulated.</strong> Create a <code>GET /search</code> route that reads <code>req.query.q</code> and returns JSON <code>{ query: q }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/search", (req, res) => {
  const { q } = req.query;
  res.json({ query: q });
});`,
    hints: ["Query params come from req.query.", "Destructure q from req.query."],
    testCases: [
      { description: "Route is /search", expectText: "/search" },
      { description: "Reads req.query", pattern: "req\\.query" },
      { description: "Returns query in JSON", pattern: "query\\s*:" }
    ],
    points: 20,
    order: 62
  },
  {
    title: "Express: POST with JSON Body",
    slug: "express-post-json-body",
    description: "<p><strong>Simulated.</strong> Configure <code>express.json()</code> middleware, then create a <code>POST /api/users</code> route that returns <code>req.body</code> with status 201.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "middleware",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Add middleware and POST route\n',
    solutionJs: `const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/users", (req, res) => {
  res.status(201).json(req.body);
});`,
    hints: ["Add app.use(express.json()).", "Return res.status(201).json(req.body)."],
    testCases: [
      { description: "Uses express.json()", pattern: "express\\.json\\(\\)" },
      { description: "Route is POST /api/users", pattern: "app\\.post\\(\\s*[\"']/api/users[\"']" },
      { description: "Sets status 201", pattern: "status\\s*\\(\\s*201\\s*\\)" },
      { description: "Returns req.body", pattern: "req\\.body" }
    ],
    points: 25,
    order: 63
  },
  {
    title: "Express: Custom Logger Middleware",
    slug: "express-custom-logger",
    description: "<p><strong>Simulated.</strong> Write middleware that logs 'Request received' before any routes. Include a call to <code>next()</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "middleware",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Add logger middleware here\n',
    solutionJs: `const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Request received");
  next();
});`,
    hints: ["Use app.use with (req, res, next).", "Don't forget next()."],
    testCases: [
      { description: "Uses app.use", pattern: "app\\.use" },
      { description: "Has (req, res, next)", pattern: "req,\\s*res,\\s*next" },
      { description: "Logs the message", expectText: "Request received" },
      { description: "Calls next()", pattern: "next\\(\\)" }
    ],
    points: 20,
    order: 64
  },
  {
    title: "Express: Health Check Endpoint",
    slug: "express-health-check",
    description: "<p><strong>Simulated.</strong> Add a <code>GET /api/health</code> route that returns <code>{ status: \"ok\", uptime: process.uptime() }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Add health route\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});`,
    hints: ["Path is /api/health.", "Use process.uptime() for seconds since start."],
    testCases: [
      { description: "Route is /api/health", expectText: "/api/health" },
      { description: "Returns status ok", pattern: "status\\s*:\\s*[\"']ok[\"']" },
      { description: "Uses process.uptime", pattern: "process\\.uptime" }
    ],
    points: 20,
    order: 65
  },
  {
    title: "Express: 404 Not Found Handler",
    slug: "express-404-handler",
    description: "<p><strong>Simulated.</strong> Write a catch-all 404 handler that returns status 404 with JSON <code>{ error: \"Not found\" }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "error-handling",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Your routes here\n\n// Add 404 handler here\n',
    solutionJs: `const express = require("express");
const app = express();

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});`,
    hints: ["Use app.use (matches all unmatched routes).", "Status 404 with JSON."],
    testCases: [
      { description: "Uses app.use", pattern: "app\\.use" },
      { description: "Sets status 404", pattern: "status\\s*\\(\\s*404\\s*\\)" },
      { description: "Returns error message", pattern: "error\\s*:\\s*[\"']Not found[\"']" }
    ],
    points: 20,
    order: 66
  },
  {
    title: "Express: Centralized Error Handler",
    slug: "express-error-handler",
    description: "<p><strong>Simulated.</strong> Write error-handling middleware (4 arguments) that returns status 500 with the error message.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "error-handling",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Add error-handling middleware here\n',
    solutionJs: `const express = require("express");
const app = express();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});`,
    hints: ["4 arguments: err, req, res, next.", "Set status 500.", "Return err.message."],
    testCases: [
      { description: "Uses 4-arg signature", pattern: "err,\\s*req,\\s*res,\\s*next" },
      { description: "Sets status 500", pattern: "status\\s*\\(\\s*500\\s*\\)" },
      { description: "Returns err.message", pattern: "err\\.message" }
    ],
    points: 25,
    order: 67
  },
  {
    title: "Express: Modular Router",
    slug: "express-modular-router",
    description: "<p><strong>Simulated.</strong> Create an <code>express.Router()</code> with a <code>GET /</code> route, then mount it at <code>/api/products</code>.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Create a router\n',
    solutionJs: `const express = require("express");
const app = express();

const router = express.Router();
router.get("/", (req, res) => res.json({ products: [] }));

app.use("/api/products", router);`,
    hints: ["Use express.Router().", "Mount with app.use('/api/products', router)."],
    testCases: [
      { description: "Uses express.Router()", pattern: "express\\.Router\\(\\)" },
      { description: "Mounts at /api/products", expectText: "/api/products" },
      { description: "Uses app.use", pattern: "app\\.use" }
    ],
    points: 25,
    order: 68
  },
  {
    title: "Express: PUT vs PATCH",
    slug: "express-put-vs-patch",
    description: "<p><strong>Simulated.</strong> Create both a <code>PUT /api/users/:id</code> and a <code>PATCH /api/users/:id</code> route. The PUT should send 'Full replace', the PATCH should send 'Partial update'.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "rest",
    starterJs: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\n// Add PUT and PATCH routes\n',
    solutionJs: `const express = require("express");
const app = express();
app.use(express.json());

app.put("/api/users/:id", (req, res) => {
  res.send("Full replace");
});

app.patch("/api/users/:id", (req, res) => {
  res.send("Partial update");
});`,
    hints: ["Use app.put for full replacement.", "Use app.patch for partial."],
    testCases: [
      { description: "Has PUT route", pattern: "app\\.put" },
      { description: "Has PATCH route", pattern: "app\\.patch" },
      { description: "PUT sends 'Full replace'", expectText: "Full replace" },
      { description: "PATCH sends 'Partial update'", expectText: "Partial update" }
    ],
    points: 25,
    order: 69
  },
  {
    title: "Express: Validation with 400",
    slug: "express-validation-400",
    description: "<p><strong>Simulated.</strong> Create a <code>POST /api/users</code> route that returns 400 with errors if <code>email</code> is missing.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "validation",
    starterJs: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\napp.post("/api/users", (req, res) => {\n  // Validate email\n});\n',
    solutionJs: `const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/users", (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: "error",
      errors: { email: "Email required" }
    });
  }
  res.status(201).json({ ok: true });
});`,
    hints: ["Check req.body.email.", "Return early with 400.", "Include field-level errors."],
    testCases: [
      { description: "Checks req.body.email", pattern: "req\\.body\\.email|email.*req\\.body" },
      { description: "Returns 400", pattern: "status\\s*\\(\\s*400\\s*\\)" },
      { description: "Has errors object", pattern: "errors\\s*:" },
      { description: "Has email error", pattern: "email\\s*:" }
    ],
    points: 25,
    order: 70
  },
  {
    title: "Express: 201 Created Response",
    slug: "express-201-created",
    description: "<p><strong>Simulated.</strong> Create a <code>POST /api/tasks</code> route that responds with status 201 and JSON <code>{ status: \"success\", data: {...} }</code> containing the new task.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "rest",
    starterJs: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\n// POST route here\n',
    solutionJs: `const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/tasks", (req, res) => {
  res.status(201).json({
    status: "success",
    data: { id: 1, title: req.body.title }
  });
});`,
    hints: ["Use status(201).", "Wrap in { status: 'success', data: {...} }."],
    testCases: [
      { description: "Sets status 201", pattern: "status\\s*\\(\\s*201\\s*\\)" },
      { description: "Has status success", pattern: "status\\s*:\\s*[\"']success[\"']" },
      { description: "Has data object", pattern: "data\\s*:" }
    ],
    points: 20,
    order: 71
  },
  {
    title: "Express: DELETE with 204",
    slug: "express-delete-204",
    description: "<p><strong>Simulated.</strong> Create a <code>DELETE /api/tasks/:id</code> route that responds with status 204 (no content) using <code>res.status(204).end()</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "rest",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// DELETE route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.delete("/api/tasks/:id", (req, res) => {
  res.status(204).end();
});`,
    hints: ["Use app.delete.", "204 means No Content.", "Call .end() with no body."],
    testCases: [
      { description: "Uses app.delete", pattern: "app\\.delete" },
      { description: "Sets status 204", pattern: "status\\s*\\(\\s*204\\s*\\)" },
      { description: "Calls .end()", pattern: "\\.end\\(\\)" }
    ],
    points: 20,
    order: 72
  },
  {
    title: "Express: Search with Filter",
    slug: "express-search-filter",
    description: "<p><strong>Simulated.</strong> Create a <code>GET /api/products</code> route that filters an array of products by <code>req.query.q</code> (case-insensitive).</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\nconst products = [\n  { id: 1, name: "Laptop" },\n  { id: 2, name: "Phone" },\n  { id: 3, name: "Tablet" }\n];\n\n// Your route here\n',
    solutionJs: `const express = require("express");
const app = express();

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" }
];

app.get("/api/products", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(q)
  );
  res.json({ count: filtered.length, data: filtered });
});`,
    hints: ["Use req.query.q.", "Filter with .filter().", "Use .includes() for substring matching.", "Use toLowerCase() for case-insensitivity."],
    testCases: [
      { description: "Reads req.query.q", pattern: "req\\.query\\.q" },
      { description: "Uses filter", pattern: "\\.filter" },
      { description: "Uses toLowerCase", pattern: "toLowerCase" },
      { description: "Returns count and data", pattern: "count\\s*:[\\s\\S]*data\\s*:" }
    ],
    points: 30,
    order: 73
  },
  {
    title: "Express: Test with supertest",
    slug: "express-supertest",
    description: "<p><strong>Simulated.</strong> Write a test using <code>supertest</code> that makes a GET request to <code>/api/health</code> and asserts status 200. Import both <code>node:test</code> and <code>supertest</code>.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "testing",
    starterJs: '// Write a test using node:test and supertest\n',
    solutionJs: `const { test } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../server");

test("GET /api/health returns 200", async () => {
  const res = await request(app).get("/api/health");
  assert.strictEqual(res.status, 200);
});`,
    hints: ["Use node:test's test() function.", "Import supertest.", "Assert with assert.strictEqual."],
    testCases: [
      { description: "Imports supertest", pattern: "require\\([\"']supertest[\"']\\)" },
      { description: "Uses node:test", pattern: "require\\([\"']node:test[\"']\\)" },
      { description: "Calls request(app)", pattern: "request\\(app\\)" },
      { description: "Asserts status 200", pattern: "strictEqual\\([\\s\\S]*200" }
    ],
    points: 30,
    order: 74
  }
];

async function seedExpressExercises() {
  const course = await Course.findOne({ slug: "express-js-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: express-js-fundamentals");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of expressExercises) {
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

  console.log(`   Express exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedExpressExercises };