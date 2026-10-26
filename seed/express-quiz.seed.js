/**
 * Kelvin Ikpeni Code Academy — Express.js Fundamentals quiz
 * Targeted seed: replaces ONLY the express-js-fundamentals quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const expressQuiz = {
  title: "Express.js Fundamentals Final Quiz",
  description: "Test your understanding of Express.js — routing, middleware, REST design, validation, error handling, modular architecture, and testing. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What is Express.js?",
      options: [
        "A JavaScript engine",
        "A minimal web framework for Node.js",
        "A database",
        "A CSS library"
      ],
      correctIndex: 1,
      explanation: "Express.js is a minimal, unopinionated web framework that runs on Node.js. It provides routing, middleware, and HTTP helpers without forcing a folder structure."
    },
    {
      question: "Which method defines a GET route for /products?",
      options: [
        "app.post('/products', handler)",
        "app.get('/products', handler)",
        "app.route('/products').get()",
        "router.use('/products')"
      ],
      correctIndex: 1,
      explanation: "app.get() maps HTTP GET requests to a handler. app.post handles POST, and app.use is for middleware."
    },
    {
      question: "How do you access a route parameter in Express?",
      options: [
        "req.query.id",
        "req.params.id",
        "req.body.id",
        "req.url.id"
      ],
      correctIndex: 1,
      explanation: "Route parameters defined with `:id` in the path are available at req.params.id. Query strings use req.query, bodies use req.body."
    },
    {
      question: "What is the correct way to read ?q=hello from the URL?",
      options: [
        "req.params.q",
        "req.query.q",
        "req.body.q",
        "req.headers.q"
      ],
      correctIndex: 1,
      explanation: "Query string values are in req.query. For /search?q=hello, req.query.q === 'hello'."
    },
    {
      question: "What must a middleware function call to continue to the next handler?",
      options: [
        "res.send()",
        "return true",
        "next()",
        "res.end()"
      ],
      correctIndex: 2,
      explanation: "Middleware must call next() to pass control along. Forgetting it causes the request to hang forever."
    },
    {
      question: "Which Express middleware parses JSON request bodies?",
      options: [
        "express.body()",
        "express.urlencoded()",
        "express.json()",
        "express.parse()"
      ],
      correctIndex: 2,
      explanation: "app.use(express.json()) parses JSON request bodies. Without it, req.body is undefined for JSON requests."
    },
    {
      question: "In Express 4, what happens when an async route throws an error?",
      options: [
        "Express catches it automatically",
        "The app crashes",
        "The error is unhandled unless you wrap in try/catch or use a helper",
        "The response returns 500 automatically"
      ],
      correctIndex: 2,
      explanation: "Express 4 does NOT catch async errors. Wrap them in try/catch and call next(err), or use an asyncHandler helper. (Express 5 fixes this.)"
    },
    {
      question: "What is the signature of error-handling middleware in Express?",
      options: [
        "(req, res)",
        "(req, res, next)",
        "(err, req, res, next)",
        "(error, handler)"
      ],
      correctIndex: 2,
      explanation: "Error middleware must have 4 arguments: err, req, res, next. Express detects error handlers by the argument count."
    },
    {
      question: "Which status code should a successful POST creation return?",
      options: ["200 OK", "201 Created", "204 No Content", "302 Found"],
      correctIndex: 1,
      explanation: "201 Created is the correct response to a successful POST that created a resource. 200 is for successful GET/PUT/PATCH. 204 is for successful DELETE."
    },
    {
      question: "Which status code should a successful DELETE with no response body return?",
      options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"],
      correctIndex: 2,
      explanation: "204 No Content signals success with nothing to return. Call res.status(204).end() with no body."
    },
    {
      question: "What is the difference between PUT and PATCH?",
      options: [
        "They are identical",
        "PUT replaces the entire resource; PATCH modifies part of it",
        "PUT is for update; PATCH is for delete",
        "PATCH is deprecated"
      ],
      correctIndex: 1,
      explanation: "PUT sends the full new resource and replaces everything. PATCH sends only the fields that changed. Use PATCH for most updates."
    },
    {
      question: "What is the correct way to mount a router at /api/products?",
      options: [
        "app.get('/api/products', router)",
        "app.use('/api/products', router)",
        "router.mount('/api/products')",
        "app.mount(router, '/api/products')"
      ],
      correctIndex: 1,
      explanation: "app.use(path, router) mounts a Router at a base path. All routes inside the router are then prefixed with that path."
    },
    {
      question: "Which tool is commonly used for automated HTTP endpoint testing in Node.js?",
      options: ["jest", "supertest", "mocha", "puppeteer"],
      correctIndex: 1,
      explanation: "supertest is designed for HTTP testing. It wraps your Express app and lets you make requests with syntax like request(app).get('/api/users')."
    },
    {
      question: "Why should Express validation happen on the server, even if you validate on the client?",
      options: [
        "Because Express requires it",
        "Because client-side validation can be bypassed by curl/Postman",
        "Because the server is faster",
        "Because forms don't work without it"
      ],
      correctIndex: 1,
      explanation: "Client-side validation is a UX convenience, not security. Anyone can bypass it with curl or DevTools. The server must always validate independently."
    },
    {
      question: "What is the purpose of returning field-level errors in a 400 response?",
      options: [
        "It reduces response size",
        "It lets the frontend highlight which fields failed validation",
        "It hides the real error",
        "It improves performance"
      ],
      correctIndex: 1,
      explanation: "Field-level errors (e.g., { errors: { email: 'Required' } }) let the frontend map errors to specific form inputs, improving UX."
    }
  ]
};

async function seedExpressQuiz() {
  const course = await Course.findOne({ slug: "express-js-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: express-js-fundamentals");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(expressQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...expressQuiz,
    slug,
    course: course._id,
    published: true
  };

  let created = 0;
  let updated = 0;

  if (existing) {
    await Quiz.updateOne({ slug }, { $set: payload });
    updated = 1;
  } else {
    await Quiz.create(payload);
    created = 1;
  }

  console.log(`   Express quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedExpressQuiz };