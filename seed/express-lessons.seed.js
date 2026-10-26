/**
 * Kelvin Ikpeni Code Academy — Express.js Fundamentals lessons
 * Targeted seed: updates ONLY the "express-js-fundamentals" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const expressLessons = [
  {
    title: "Introduction to Express.js",
    contentHtml: `
      <h2>What is Express.js?</h2>
      <p><strong>Express.js</strong> is a minimal, unopinionated web framework for Node.js. It doesn't force a folder structure, ORM, or template engine on you — it just gives you the tools to build HTTP servers quickly and cleanly.</p>
      <p>Without Express, a basic Node.js server requires dealing with raw <code>http</code>, manual URL parsing, manual body parsing, and manual routing. Express turns all of that into one-liners.</p>

      <h2>Raw Node.js vs Express</h2>
      <p><strong>Raw Node.js</strong>:</p>
      <pre><code class="language-javascript">const http = require("http");

const server = http.createServer((req, res) =&gt; {
  if (req.method === "GET" &amp;&amp; req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  } else if (req.method === "POST" &amp;&amp; req.url === "/api/users") {
    // parse body manually
    let body = "";
    req.on("data", (chunk) =&gt; { body += chunk; });
    req.on("end", () =&gt; {
      const user = JSON.parse(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, user }));
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000);</code></pre>
      <p><strong>Express</strong>:</p>
      <pre><code class="language-javascript">const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) =&gt; res.send("Hello, World!"));

app.post("/api/users", (req, res) =&gt; {
  res.status(201).json({ ok: true, user: req.body });
});

app.use((req, res) =&gt; res.status(404).send("Not found"));

app.listen(3000);</code></pre>
      <p>Same behaviour. ~70% less code. That's the value of Express.</p>

      <h2>Initializing a project</h2>
      <pre><code class="language-bash">mkdir my-api
cd my-api
npm init -y
npm install express
npm install --save-dev nodemon</code></pre>
      <p>Add scripts to <code>package.json</code>:</p>
      <pre><code class="language-json">"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}</code></pre>

      <h2>Your first Express server</h2>
      <pre><code class="language-javascript">// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) =&gt; {
  res.send("Welcome to Kelvin Ikpeni Code Academy API!");
});

app.get("/api/health", (req, res) =&gt; {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =&gt; {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});</code></pre>

      <h2>Why developers love Express</h2>
      <ul>
        <li><strong>Minimal</strong> — you only add what you need</li>
        <li><strong>Massive ecosystem</strong> — thousands of compatible middleware</li>
        <li><strong>Well documented</strong> — one of the most popular backend frameworks in the world</li>
        <li><strong>Industry standard</strong> — used by companies like Uber, IBM, and many startups</li>
      </ul>

      <h2>Your turn</h2>
      <p>Build a server with two routes:</p>
      <ul>
        <li><code>GET /</code> → responds with "Welcome to my API"</li>
        <li><code>GET /api/health</code> → responds with JSON <code>{ status: "ok" }</code></li>
      </ul>
      <p>Run it and visit both URLs in the browser.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what Express.js is and why it exists",
      "Create your first Express server",
      "Compare raw Node.js to Express"
    ]
  },
  {
    title: "Routing and Route Parameters",
    contentHtml: `
      <h2>What is routing?</h2>
      <p><strong>Routing</strong> maps an HTTP method + URL path to a handler function. Express provides a method for each HTTP verb: <code>app.get</code>, <code>app.post</code>, <code>app.put</code>, <code>app.patch</code>, <code>app.delete</code>.</p>

      <h2>Basic routes</h2>
      <pre><code class="language-javascript">app.get("/products", (req, res) =&gt; {
  res.json({ products: [] });
});

app.post("/products", (req, res) =&gt; {
  res.status(201).json({ ok: true });
});

app.put("/products/1", (req, res) =&gt; {
  res.json({ updated: true });
});

app.patch("/products/1", (req, res) =&gt; {
  res.json({ patched: true });
});

app.delete("/products/1", (req, res) =&gt; {
  res.status(204).end();
});</code></pre>

      <h2>Route parameters</h2>
      <p>Use a colon to capture part of the URL:</p>
      <pre><code class="language-javascript">app.get("/products/:id", (req, res) =&gt; {
  const id = req.params.id;
  res.json({ productId: id });
});

// GET /products/42 → { productId: "42" }</code></pre>
      <p><code>req.params</code> is an object. <code>req.params.id</code> returns the string "42".</p>

      <h2>Multiple params</h2>
      <pre><code class="language-javascript">app.get("/users/:userId/posts/:postId", (req, res) =&gt; {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// GET /users/alice/posts/42 → { userId: "alice", postId: "42" }</code></pre>

      <h2>Query parameters</h2>
      <p>Query strings come after <code>?</code>. Access them via <code>req.query</code>:</p>
      <pre><code class="language-javascript">app.get("/search", (req, res) =&gt; {
  const { q, page = 1, limit = 20 } = req.query;
  res.json({ query: q, page: Number(page), limit: Number(limit) });
});

// GET /search?q=javascript&amp;page=2
// → { query: "javascript", page: 2, limit: 20 }</code></pre>
      <p>Note: <code>req.query</code> values are strings. Convert to numbers when needed.</p>

      <h2>Route ordering matters</h2>
      <p>Express matches routes <strong>in the order they're defined</strong>. Always put specific routes before parameterized ones:</p>
      <pre><code class="language-javascript">// GOOD
app.get("/products/new", (req, res) =&gt; res.send("New product form"));
app.get("/products/:id", (req, res) =&gt; res.send("Product " + req.params.id));

// BAD: /products/new would match :id as id="new"</code></pre>

      <h2>Modular routers</h2>
      <p>As your API grows, split routes into files using <code>express.Router()</code>:</p>
      <pre><code class="language-javascript">// routes/products.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) =&gt; res.json({ products: [] }));
router.get("/:id", (req, res) =&gt; res.json({ id: req.params.id }));
router.post("/", (req, res) =&gt; res.status(201).json({ ok: true }));

module.exports = router;</code></pre>
      <pre><code class="language-javascript">// server.js
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);</code></pre>
      <p>Now <code>GET /api/products</code> hits <code>router.get("/")</code>, and <code>GET /api/products/42</code> hits <code>router.get("/:id")</code>.</p>

      <h2>Your turn</h2>
      <p>Create a modular router for <code>/api/products</code> with:</p>
      <ul>
        <li><code>GET /</code> — list all products</li>
        <li><code>GET /:id</code> — get one product</li>
        <li><code>POST /</code> — create a product</li>
        <li><code>DELETE /:id</code> — delete a product</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Define routes for all HTTP methods",
      "Use route parameters and query strings",
      "Split routes into modular routers"
    ]
  },
  {
    title: "Understanding Express Middleware",
    contentHtml: `
      <h2>What is middleware?</h2>
      <p><strong>Middleware</strong> is a function that runs <em>before</em> your route handler. It receives <code>(req, res, next)</code>. Middleware can:</p>
      <ul>
        <li>Inspect the request</li>
        <li>Modify the request or response</li>
        <li>End the request early (e.g., return 401)</li>
        <li>Call <code>next()</code> to pass control to the next middleware</li>
      </ul>
      <p>Think of it as a pipeline. Each middleware is a station that either handles the request or passes it on.</p>

      <h2>Anatomy of middleware</h2>
      <pre><code class="language-javascript">function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next();  // CRITICAL — without this, the request hangs
}

app.use(logger);</code></pre>
      <p>If you forget <code>next()</code>, the request hangs forever — the client waits until timeout.</p>

      <h2>Application-level middleware</h2>
      <p>Use <code>app.use()</code> to run middleware on <em>every</em> request:</p>
      <pre><code class="language-javascript">app.use((req, res, next) =&gt; {
  console.log("Request received at", new Date().toISOString());
  next();
});</code></pre>

      <h2>Built-in middleware</h2>
      <pre><code class="language-javascript">app.use(express.json());                        // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use(express.static("public"));              // serve static files</code></pre>

      <h2>Route-specific middleware</h2>
      <p>Only run middleware on certain routes:</p>
      <pre><code class="language-javascript">function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/api/profile", requireAuth, (req, res) =&gt; {
  res.json({ name: "Alice" });
});</code></pre>

      <h2>Order matters</h2>
      <p>Middleware and routes run in the order they're registered. This matters:</p>
      <pre><code class="language-javascript">app.use(logger);              // runs first
app.use(express.json());      // runs second
app.get("/api/users", handler); // runs last (if others call next())

// If you put app.get() before app.use(logger), the logger won't see it</code></pre>

      <h2>Third-party middleware</h2>
      <pre><code class="language-javascript">const helmet = require("helmet");   // security headers
const cors = require("cors");        // CORS support
const morgan = require("morgan");    // request logging

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));</code></pre>

      <h2>Error-handling middleware</h2>
      <p>Middleware with 4 arguments is treated as an error handler:</p>
      <pre><code class="language-javascript">app.use((err, req, res, next) =&gt; {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});</code></pre>

      <h2>Your turn</h2>
      <p>Create two pieces of middleware:</p>
      <ul>
        <li><strong>Logger</strong> — logs <code>METHOD URL</code> for every request</li>
        <li><strong>JSON parser</strong> — configure <code>express.json()</code></li>
      </ul>
      <p>Then a route <code>POST /api/echo</code> that returns <code>req.body</code>.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Explain what middleware does",
      "Write custom middleware with next()",
      "Understand middleware order and error middleware"
    ]
  },
  {
    title: "REST API Design Fundamentals",
    contentHtml: `
      <h2>What is REST?</h2>
      <p><strong>REST</strong> (Representational State Transfer) is an architectural style for APIs. It's not a protocol or standard — it's a set of principles. A <strong>RESTful API</strong> follows these principles:</p>
      <ol>
        <li><strong>Resource-based URLs</strong> — URLs represent nouns, not actions</li>
        <li><strong>HTTP methods express verbs</strong> — GET, POST, PUT, PATCH, DELETE</li>
        <li><strong>Stateless</strong> — each request contains all information needed</li>
        <li><strong>JSON responses</strong> — consistent, structured data</li>
        <li><strong>Standard status codes</strong> — 200, 201, 404, etc.</li>
      </ol>

      <h2>Resource-based URLs</h2>
      <p><strong>Bad</strong> (RPC style — verb in URL):</p>
      <pre><code class="language-http">GET /getAllUsers
POST /createUser
POST /deleteUser/42
POST /updateUserEmail/42</code></pre>
      <p><strong>Good</strong> (REST style — noun in URL, verb in method):</p>
      <pre><code class="language-http">GET /users
POST /users
GET /users/42
PATCH /users/42
DELETE /users/42</code></pre>

      <h2>A complete resource mapping</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Method + URL</th>
          <th style="text-align:left;padding:8px;">Action</th>
          <th style="text-align:left;padding:8px;">Status</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>GET /users</code></td>
          <td style="padding:8px;">List users</td>
          <td style="padding:8px;">200</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>GET /users/:id</code></td>
          <td style="padding:8px;">Get one user</td>
          <td style="padding:8px;">200 / 404</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>POST /users</code></td>
          <td style="padding:8px;">Create user</td>
          <td style="padding:8px;">201</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>PUT /users/:id</code></td>
          <td style="padding:8px;">Replace user</td>
          <td style="padding:8px;">200 / 404</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>PATCH /users/:id</code></td>
          <td style="padding:8px;">Modify user</td>
          <td style="padding:8px;">200 / 404</td>
        </tr>
        <tr>
          <td style="padding:8px;"><code>DELETE /users/:id</code></td>
          <td style="padding:8px;">Delete user</td>
          <td style="padding:8px;">204 / 404</td>
        </tr>
      </table>

      <h2>PUT vs PATCH</h2>
      <p><strong>PUT</strong> replaces the entire resource. Send all fields.</p>
      <pre><code class="language-javascript">// PUT /users/42 with { name: "Alice", email: "a@x.com", age: 30 }
// Result: user becomes exactly these 3 fields</code></pre>
      <p><strong>PATCH</strong> modifies specific fields. Send only what changed.</p>
      <pre><code class="language-javascript">// PATCH /users/42 with { email: "new@x.com" }
// Result: only email changes, everything else stays</code></pre>
      <p>Rule of thumb: use PATCH for most updates. Use PUT only when you want to fully replace.</p>

      <h2>Status codes that matter</h2>
      <ul>
        <li><strong>200 OK</strong> — successful GET/PUT/PATCH</li>
        <li><strong>201 Created</strong> — successful POST</li>
        <li><strong>204 No Content</strong> — successful DELETE (nothing to return)</li>
        <li><strong>400 Bad Request</strong> — client sent malformed data</li>
        <li><strong>401 Unauthorized</strong> — no auth provided</li>
        <li><strong>403 Forbidden</strong> — authenticated but no permission</li>
        <li><strong>404 Not Found</strong> — resource doesn't exist</li>
        <li><strong>409 Conflict</strong> — duplicate resource (e.g., email exists)</li>
        <li><strong>500 Internal Server Error</strong> — server crashed</li>
      </ul>

      <h2>Consistent JSON shapes</h2>
      <p>Always respond with consistent structure:</p>
      <pre><code class="language-javascript">// Success
{ "status": "success", "data": { "id": 1, "name": "Alice" } }

// List
{ "status": "success", "count": 2, "data": [...] }

// Error
{ "status": "error", "message": "User not found" }

// Validation error
{ "status": "error", "message": "Validation failed", "errors": { "email": "Required" } }</code></pre>

      <h2>Your turn</h2>
      <p>Design a REST API for a student management app. Write out:</p>
      <ul>
        <li>At least 5 endpoints</li>
        <li>Method + URL for each</li>
        <li>Expected status codes</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Explain REST principles",
      "Design resource-based URLs",
      "Choose the right status code"
    ]
  },
  {
    title: "Request and Response Handling",
    contentHtml: `
      <h2>Accessing the request</h2>
      <p>Express wraps the raw Node.js request into a convenient <code>req</code> object. Key properties:</p>
      <ul>
        <li><code>req.method</code> — "GET", "POST", etc.</li>
        <li><code>req.url</code> — full URL path with query string</li>
        <li><code>req.path</code> — URL without query string</li>
        <li><code>req.params</code> — route parameters</li>
        <li><code>req.query</code> — parsed query string</li>
        <li><code>req.body</code> — parsed body (requires express.json())</li>
        <li><code>req.headers</code> — all headers</li>
        <li><code>req.ip</code> — client IP</li>
      </ul>

      <h2>Reading the body</h2>
      <p>You <strong>must</strong> have <code>express.json()</code> middleware before you can read JSON bodies:</p>
      <pre><code class="language-javascript">app.use(express.json());

app.post("/api/users", (req, res) =&gt; {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }
  res.status(201).json({ ok: true, user: { name, email } });
});</code></pre>
      <p>Without <code>express.json()</code>, <code>req.body</code> is <code>undefined</code>.</p>

      <h2>Reading headers</h2>
      <pre><code class="language-javascript">app.get("/api/whoami", (req, res) =&gt; {
  res.json({
    userAgent: req.headers["user-agent"],
    authorization: req.headers["authorization"] || "none"
  });
});</code></pre>

      <h2>Returning JSON</h2>
      <p><code>res.json()</code> sets <code>Content-Type: application/json</code> automatically and serializes the object:</p>
      <pre><code class="language-javascript">res.json({ hello: "world" });
// Sends: {"hello":"world"}\n
// Headers: Content-Type: application/json; charset=utf-8</code></pre>

      <h2>Sending other response types</h2>
      <pre><code class="language-javascript">res.send("Plain text");           // text/html
res.send(&lt;h1&gt;HTML&lt;/h1&gt;);         // text/html
res.redirect("/login");           // 302 redirect
res.sendFile("/path/to/file.pdf"); // stream a file
res.download("/path/to/file.pdf", "report.pdf"); // force download</code></pre>

      <h2>Setting status codes</h2>
      <pre><code class="language-javascript">res.status(201).json({ ok: true });        // created
res.status(400).json({ error: "Bad input" });
res.status(404).json({ error: "Not found" });
res.status(500).json({ error: "Server error" });
res.status(204).end();                     // no content (for DELETE)</code></pre>

      <h2>The "headers already sent" error</h2>
      <p>A common bug: calling <code>res.send()</code> or <code>res.json()</code> twice. This throws <em>"Cannot set headers after they are sent"</em>.</p>
      <pre><code class="language-javascript">// BAD
app.get("/api/test", (req, res) =&gt; {
  res.json({ ok: true });
  res.json({ also: "sent" });   // ERROR
});

// GOOD
app.get("/api/test", (req, res) =&gt; {
  res.json({ ok: true });
  return;  // exit early
});</code></pre>

      <h2>Your turn</h2>
      <p>Build a search endpoint:</p>
      <pre><code class="language-javascript">const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 499 }
];

app.get("/api/products", (req, res) =&gt; {
  const { q, maxPrice } = req.query;
  let result = products;

  if (q) {
    result = result.filter((p) =&gt;
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }
  if (maxPrice) {
    result = result.filter((p) =&gt; p.price &lt;= Number(maxPrice));
  }

  res.json({ status: "success", count: result.length, data: result });
});</code></pre>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Access req.body, req.params, req.query, req.headers",
      "Return JSON with appropriate status codes",
      "Avoid double-response bugs"
    ]
  },
  {
    title: "Input Validation and API Security Basics",
    contentHtml: `
      <h2>Why validate on the server</h2>
      <p>Client-side validation is a convenience — <strong>it's never security</strong>. Anyone can bypass it with curl, Postman, or browser DevTools. The server must always validate independently.</p>

      <h2>What to validate</h2>
      <ul>
        <li><strong>Type</strong> — is it a string, number, boolean?</li>
        <li><strong>Presence</strong> — is it required?</li>
        <li><strong>Format</strong> — does it match a pattern (email, phone)?</li>
        <li><strong>Range</strong> — is it within min/max?</li>
        <li><strong>Length</strong> — does it fit expected size?</li>
        <li><strong>Whitelist</strong> — is it one of the allowed values?</li>
      </ul>

      <h2>Manual validation</h2>
      <pre><code class="language-javascript">app.post("/api/users", (req, res) =&gt; {
  const { name, email, age } = req.body;
  const errors = {};

  if (!name || name.trim().length &lt; 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    errors.email = "Valid email required.";
  }

  if (age !== undefined &amp;&amp; (typeof age !== "number" || age &lt; 13)) {
    errors.age = "Age must be 13 or older.";
  }

  if (Object.keys(errors).length &gt; 0) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors
    });
  }

  res.status(201).json({ ok: true, user: { name, email, age } });
});</code></pre>

      <h2>Field-level error responses</h2>
      <p>Return errors per field so the frontend can highlight inputs:</p>
      <pre><code class="language-json">{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "name": "Name must be at least 2 characters.",
    "email": "Valid email required."
  }
}</code></pre>

      <h2>Limiting request size</h2>
      <p>An attacker can send a 100MB payload to crash your server. Limit it:</p>
      <pre><code class="language-javascript">app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));</code></pre>

      <h2>Security headers</h2>
      <p>Use <code>helmet</code> to set safe HTTP headers:</p>
      <pre><code class="language-javascript">const helmet = require("helmet");
app.use(helmet());</code></pre>
      <p>Helmet sets 11+ headers by default, including <code>X-Content-Type-Options</code>, <code>X-Frame-Options</code>, <code>Content-Security-Policy</code>, and more.</p>

      <h2>Rate limiting</h2>
      <p>Prevent abuse by limiting requests per IP:</p>
      <pre><code class="language-javascript">const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per IP
  message: "Too many requests, please try again later."
});

app.use("/api/", limiter);</code></pre>

      <h2>Safe error messages</h2>
      <p>Never leak stack traces or DB internals to users:</p>
      <pre><code class="language-javascript">// BAD
res.status(500).json({ error: err.stack });

// GOOD
res.status(500).json({
  error: process.env.NODE_ENV === "production"
    ? "Internal server error"
    : err.message
});</code></pre>

      <h2>Your turn</h2>
      <p>Add validation to a registration endpoint:</p>
      <ul>
        <li>Name required, 2+ characters</li>
        <li>Email required, valid format</li>
        <li>Password required, 8+ characters</li>
        <li>Return field-level errors in JSON</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Validate request bodies server-side",
      "Return field-level error responses",
      "Use helmet, rate limiting, and safe errors"
    ]
  },
  {
    title: "Error Handling and Debugging",
    contentHtml: `
      <h2>Types of errors</h2>
      <ul>
        <li><strong>Client errors (4xx)</strong> — bad request, missing auth, not found. The client can fix these.</li>
        <li><strong>Server errors (5xx)</strong> — bugs, DB down, crashes. The client can't fix these.</li>
      </ul>

      <h2>Sync vs async errors</h2>
      <p>Express automatically catches <strong>synchronous</strong> errors thrown in routes:</p>
      <pre><code class="language-javascript">app.get("/api/crash", (req, res) =&gt; {
  throw new Error("Oops");  // caught by Express
});</code></pre>
      <p>But <strong>async</strong> errors are NOT caught automatically in Express 4:</p>
      <pre><code class="language-javascript">// BAD in Express 4
app.get("/api/users", async (req, res) =&gt; {
  const users = await User.find();  // if this throws, it's unhandled
  res.json(users);
});

// GOOD — wrap in try/catch
app.get("/api/users", async (req, res, next) =&gt; {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);  // forward to error middleware
  }
});</code></pre>
      <p>Or use a helper:</p>
      <pre><code class="language-javascript">const asyncHandler = (fn) =&gt; (req, res, next) =&gt;
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/api/users", asyncHandler(async (req, res) =&gt; {
  const users = await User.find();  // errors forwarded automatically
  res.json(users);
}));</code></pre>

      <h2>Centralized error middleware</h2>
      <p>Express error middleware has 4 arguments. Place it last:</p>
      <pre><code class="language-javascript">// routes and other middleware above...
app.use((req, res) =&gt; {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// error handler (must be LAST, must have 4 args)
app.use((err, req, res, next) =&gt; {
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = status &gt;= 500 &amp;&amp; process.env.NODE_ENV === "production"
    ? "Internal server error"
    : err.message;

  res.status(status).json({ status: "error", message });
});</code></pre>

      <h2>Creating custom errors with status</h2>
      <pre><code class="language-javascript">function notFound(message) {
  const err = new Error(message);
  err.status = 404;
  return err;
}

app.get("/api/users/:id", asyncHandler(async (req, res) =&gt; {
  const user = await User.findById(req.params.id);
  if (!user) throw notFound("User not found");
  res.json({ status: "success", data: user });
}));</code></pre>

      <h2>Logging and debugging</h2>
      <p>Use <code>morgan</code> for request logging:</p>
      <pre><code class="language-javascript">const morgan = require("morgan");
app.use(morgan("dev"));
// Output: GET /api/users 200 12.314 ms - 42
</code></pre>
      <p>Use <code>console.error(err.stack)</code> during development. In production, log to a service like Sentry, Logtail, or Datadog.</p>

      <h2>Your turn</h2>
      <p>Build:</p>
      <ul>
        <li>A 404 handler that returns JSON</li>
        <li>An error middleware that returns JSON with status</li>
        <li>A route that throws an error → verify the JSON response</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Differentiate client errors from server errors",
      "Forward async errors to Express error handler",
      "Build centralized error and 404 middleware"
    ]
  },
  {
    title: "Modular API Architecture and Configuration",
    contentHtml: `
      <h2>Why modular architecture matters</h2>
      <p>A single <code>server.js</code> with 2000 lines becomes impossible to maintain. Splitting code into logical files makes it:</p>
      <ul>
        <li><strong>Testable</strong> — you can test each part independently</li>
        <li><strong>Reusable</strong> — controllers can be shared</li>
        <li><strong>Readable</strong> — new developers find things quickly</li>
        <li><strong>Scalable</strong> — add features without rewriting</li>
      </ul>

      <h2>The recommended structure</h2>
      <pre><code>my-api/
├── server.js              ← Entry point
├── config/
│   └── db.js              ← Database connection
├── routes/
│   ├── index.js           ← Router aggregator
│   ├── userRoutes.js
│   └── productRoutes.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── services/
│   └── userService.js     ← Business logic
├── utils/
│   └── helpers.js
└── .env                   ← Never commit</code></pre>

      <h2>Sample controller</h2>
      <pre><code class="language-javascript">// controllers/userController.js
const User = require("../models/User");

async function list(req, res) {
  const users = await User.find();
  res.json({ status: "success", data: users });
}

async function getOne(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: "error", message: "Not found" });
  res.json({ status: "success", data: user });
}

module.exports = { list, getOne };</code></pre>

      <h2>Sample router</h2>
      <pre><code class="language-javascript">// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { list, getOne } = require("../controllers/userController");

router.get("/", list);
router.get("/:id", getOne);

module.exports = router;</code></pre>

      <h2>Router aggregator</h2>
      <pre><code class="language-javascript">// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

const router = express.Router();
router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;</code></pre>

      <h2>Clean server.js</h2>
      <pre><code class="language-javascript">// server.js
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const apiRoutes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) =&gt; res.json({ status: "ok" }));

app.use("/api", apiRoutes);

app.use((req, res) =&gt; res.status(404).json({ status: "error", message: "Not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =&gt; console.log("http://localhost:" + PORT));</code></pre>
      <p>Notice how short and readable this is. All the real logic is in dedicated files.</p>

      <h2>Environment variables</h2>
      <p>Never hardcode secrets. Use a <code>.env</code> file (never committed):</p>
      <pre><code class="language-bash"># .env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-me</code></pre>
      <p>Load with <code>dotenv</code>:</p>
      <pre><code class="language-javascript">require("dotenv").config();
const uri = process.env.MONGODB_URI;</code></pre>

      <h2>The .env.example pattern</h2>
      <p>Commit a <code>.env.example</code> showing what's required — without real secrets:</p>
      <pre><code class="language-bash"># .env.example
PORT=3000
MONGODB_URI=mongodb+srv://&lt;user&gt;:&lt;password&gt;@cluster/...
JWT_SECRET=replace-with-random-string</code></pre>

      <h2>Your turn</h2>
      <p>Refactor a single-file Express app into:</p>
      <ul>
        <li><code>server.js</code> — app setup</li>
        <li><code>routes/users.js</code> — user routes</li>
        <li><code>controllers/userController.js</code> — handlers</li>
        <li><code>.env</code> + <code>.env.example</code></li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Structure an Express app across folders",
      "Separate controllers from routes",
      "Manage configuration via .env"
    ]
  },
  {
    title: "Testing and Debugging Express APIs",
    contentHtml: `
      <h2>Why testing matters</h2>
      <p>You can't manually click through every endpoint after every change. Automated tests:</p>
      <ul>
        <li>Catch regressions instantly</li>
        <li>Document expected behaviour</li>
        <li>Let you refactor with confidence</li>
        <li>Prove your API works before shipping</li>
      </ul>

      <h2>Manual testing tools</h2>
      <p><strong>curl</strong> (terminal):</p>
      <pre><code class="language-bash"># GET request
curl http://localhost:3000/api/users

# POST with JSON
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"a@x.com"}'

# Check status code
curl -i http://localhost:3000/api/users/999
</code></pre>
      <p><strong>Postman / Bruno</strong> (GUI) — visual editor for building requests, inspecting responses, saving collections.</p>

      <h2>Browser DevTools</h2>
      <p>Open DevTools → Network. Every fetch made by your frontend appears with:</p>
      <ul>
        <li>Method and URL</li>
        <li>Request headers and body</li>
        <li>Response status, headers, and body</li>
        <li>Timing</li>
      </ul>

      <h2>Automated testing with node:test</h2>
      <p>Node.js 20+ has a built-in test runner:</p>
      <pre><code class="language-javascript">// tests/users.test.js
const { test } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../server");

test("GET /api/users returns 200", async () =&gt; {
  const res = await request(app).get("/api/users");
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
});

test("POST /api/users requires name", async () =&gt; {
  const res = await request(app)
    .post("/api/users")
    .send({ email: "x@x.com" });

  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.errors.name, "Name required");
});

test("GET /api/users/999 returns 404", async () =&gt; {
  const res = await request(app).get("/api/users/999");
  assert.strictEqual(res.status, 404);
});</code></pre>

      <h2>Install supertest</h2>
      <pre><code class="language-bash">npm install --save-dev supertest</code></pre>
      <p>Supertest spins up your app in-memory and makes HTTP requests without opening a real socket. Fast and reliable.</p>

      <h2>Run tests</h2>
      <pre><code class="language-bash">node --test</code></pre>
      <p>Or add a script:</p>
      <pre><code class="language-json">"scripts": {
  "test": "node --test tests/"
}</code></pre>
      <p>Then:</p>
      <pre><code class="language-bash">npm test</code></pre>

      <h2>What to test</h2>
      <ul>
        <li><strong>Happy path</strong> — a valid request returns 200</li>
        <li><strong>Validation</strong> — bad input returns 400 with errors</li>
        <li><strong>Not found</strong> — unknown IDs return 404</li>
        <li><strong>Auth</strong> — unauth requests return 401</li>
        <li><strong>Errors</strong> — thrown errors return 500 with safe message</li>
      </ul>

      <h2>Your turn</h2>
      <p>Write tests for a users API:</p>
      <ul>
        <li>Test that <code>GET /api/users</code> returns 200 with an array</li>
        <li>Test that <code>POST /api/users</code> with no body returns 400</li>
        <li>Test that <code>GET /api/users/999</code> returns 404</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Test Express APIs manually with curl and Postman",
      "Write automated tests with node:test + supertest",
      "Cover happy path, validation, and error cases"
    ]
  },
  {
    title: "Practical Project: Build a REST API",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a complete task management REST API using everything you learned:</p>
      <ul>
        <li>Modular routing</li>
        <li>Controllers</li>
        <li>Middleware (logging, JSON parsing, error handling)</li>
        <li>Input validation</li>
        <li>CRUD operations with in-memory data</li>
        <li>Consistent JSON responses</li>
        <li>Automated tests</li>
      </ul>

      <h2>API specification</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Method + URL</th>
          <th style="text-align:left;padding:8px;">Action</th>
          <th style="text-align:left;padding:8px;">Status</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>GET /api/tasks</code></td>
          <td style="padding:8px;">List all tasks</td>
          <td style="padding:8px;">200</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>GET /api/tasks/:id</code></td>
          <td style="padding:8px;">Get one task</td>
          <td style="padding:8px;">200 / 404</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>POST /api/tasks</code></td>
          <td style="padding:8px;">Create task</td>
          <td style="padding:8px;">201 / 400</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;"><code>PATCH /api/tasks/:id</code></td>
          <td style="padding:8px;">Update task</td>
          <td style="padding:8px;">200 / 400 / 404</td>
        </tr>
        <tr>
          <td style="padding:8px;"><code>DELETE /api/tasks/:id</code></td>
          <td style="padding:8px;">Delete task</td>
          <td style="padding:8px;">204 / 404</td>
        </tr>
      </table>

      <h2>Step 1 — Data model</h2>
      <p>In-memory for now (will be MongoDB in the next course):</p>
      <pre><code class="language-javascript">// services/taskService.js
let tasks = [];
let nextId = 1;

function list() { return tasks; }

function findById(id) {
  return tasks.find((t) =&gt; t.id === Number(id));
}

function create({ title }) {
  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
}

function update(id, changes) {
  const task = findById(id);
  if (!task) return null;
  Object.assign(task, changes);
  return task;
}

function remove(id) {
  const idx = tasks.findIndex((t) =&gt; t.id === Number(id));
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

module.exports = { list, findById, create, update, remove };</code></pre>

      <h2>Step 2 — Controller</h2>
      <pre><code class="language-javascript">// controllers/taskController.js
const service = require("../services/taskService");

function list(req, res) {
  res.json({ status: "success", data: service.list() });
}

function getOne(req, res) {
  const task = service.findById(req.params.id);
  if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
  res.json({ status: "success", data: task });
}

function create(req, res) {
  const { title } = req.body;
  if (!title || title.trim().length &lt; 3) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: { title: "Title must be 3+ characters" }
    });
  }
  const task = service.create({ title: title.trim() });
  res.status(201).json({ status: "success", data: task });
}

function update(req, res) {
  const task = service.update(req.params.id, req.body);
  if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
  res.json({ status: "success", data: task });
}

function remove(req, res) {
  const ok = service.remove(req.params.id);
  if (!ok) return res.status(404).json({ status: "error", message: "Task not found" });
  res.status(204).end();
}

module.exports = { list, getOne, create, update, remove };</code></pre>

      <h2>Step 3 — Router</h2>
      <pre><code class="language-javascript">// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskController");

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;</code></pre>

      <h2>Step 4 — Wire it up</h2>
      <pre><code class="language-javascript">// server.js
const express = require("express");
const helmet = require("helmet");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) =&gt; res.json({ status: "ok" }));
app.use("/api/tasks", taskRoutes);

app.use((req, res) =&gt; res.status(404).json({ status: "error", message: "Not found" }));
app.use((err, req, res, next) =&gt; {
  console.error(err);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

app.listen(3000, () =&gt; console.log("http://localhost:3000"));</code></pre>

      <h2>Step 5 — Test it</h2>
      <pre><code class="language-bash"># Create
curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Learn Express"}'

# List
curl http://localhost:3000/api/tasks

# Update
curl -X PATCH http://localhost:3000/api/tasks/1 \\
  -H "Content-Type: application/json" \\
  -d '{"completed":true}'

# Delete
curl -X DELETE http://localhost:3000/api/tasks/1
</code></pre>

      <h2>Step 6 — Add tests</h2>
      <pre><code class="language-javascript">// tests/tasks.test.js
const { test } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../server");

test("GET /api/tasks returns 200 and array", async () =&gt; {
  const res = await request(app).get("/api/tasks");
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
});

test("POST /api/tasks with no title returns 400", async () =&gt; {
  const res = await request(app).post("/api/tasks").send({});
  assert.strictEqual(res.status, 400);
  assert.ok(res.body.errors.title);
});</code></pre>

      <h2>Your turn</h2>
      <p>Complete the API and submit:</p>
      <ul>
        <li>All 5 endpoints working</li>
        <li>Validation on POST (title required, 3+ chars)</li>
        <li>404 for missing IDs</li>
        <li>Consistent response shape</li>
        <li>At least 2 tests passing</li>
      </ul>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Build a complete CRUD REST API",
      "Structure modules, routes, controllers, services",
      "Validate inputs and handle errors consistently",
      "Test with curl and automated tests"
    ]
  }
];

async function seedExpressLessons() {
  const course = await Course.findOne({ slug: "express-js-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: express-js-fundamentals");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  // Delete existing lessons for THIS course only, then reinsert
  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < expressLessons.length; i++) {
    const l = expressLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: expressLessons.length } }
  );

  console.log(`   Express lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedExpressLessons };