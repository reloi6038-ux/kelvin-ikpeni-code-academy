/**
 * Kelvin Ikpeni Code Academy — Lesson seed
 * Seeds 2-3 foundational lessons per course.
 * Keys MUST match the slugified course titles in courses.seed.js.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const lessonsByCourseSlug = {
  // ---------- FRONTEND (matches: introduction-to-web-development, html-fundamentals, ...) ----------
  "introduction-to-web-development": [
    {
      title: "How the Web Works",
      contentHtml: `
        <p>The web is a network of computers that talk to each other using HTTP (HyperText Transfer Protocol). When you type a URL into your browser, several things happen:</p>
        <ol>
          <li><strong>DNS resolution</strong> — the domain name becomes an IP address.</li>
          <li><strong>TCP/TLS connection</strong> — a secure pipe is opened.</li>
          <li><strong>HTTP request</strong> — your browser asks the server for the page.</li>
          <li><strong>HTTP response</strong> — the server returns HTML, CSS, and JS.</li>
          <li><strong>Rendering</strong> — your browser paints the page.</li>
        </ol>
        <p>Modern web development is about both sides: <em>frontend</em> (what the user sees) and <em>backend</em> (the servers and data).</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Explain DNS and HTTP", "Identify frontend vs backend responsibilities"]
    },
    {
      title: "Clients, Servers, and APIs",
      contentHtml: `
        <p>A <strong>client</strong> is a browser or mobile app making requests. A <strong>server</strong> is a program that listens for requests and returns responses.</p>
        <p>Most modern apps communicate using <strong>APIs</strong> (Application Programming Interfaces) — usually REST APIs that speak JSON over HTTP.</p>
        <pre><code>GET /api/courses
{
  "courses": [
    { "title": "HTML Fundamentals", "lessons": 8 }
  ]
}</code></pre>
        <p>This course will teach you to build both the client (HTML/CSS/JS) and the server (Node.js/Express/MongoDB).</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Differentiate client and server", "Read a JSON API response"]
    }
  ],

  "html-fundamentals": [
    {
      title: "Your First HTML Page",
      contentHtml: `
        <p>Every HTML document starts with the same skeleton:</p>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello, World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        <p>The <code>&lt;!DOCTYPE html&gt;</code> tells the browser to use modern HTML5. The <code>&lt;head&gt;</code> holds metadata. The <code>&lt;body&gt;</code> holds visible content.</p>
      `,
      estimatedMinutes: 6,
      learningObjectives: ["Write a valid HTML5 document", "Understand head vs body"]
    },
    {
      title: "Semantic HTML Elements",
      contentHtml: `
        <p>Semantic elements describe <em>what</em> they contain, not just how they look. This helps screen readers, search engines, and other developers.</p>
        <ul>
          <li><code>&lt;header&gt;</code> — intro or nav</li>
          <li><code>&lt;nav&gt;</code> — navigation links</li>
          <li><code>&lt;main&gt;</code> — primary content</li>
          <li><code>&lt;article&gt;</code> — self-contained content</li>
          <li><code>&lt;section&gt;</code> — thematic grouping</li>
          <li><code>&lt;aside&gt;</code> — tangential content</li>
          <li><code>&lt;footer&gt;</code> — closing content</li>
        </ul>
        <p>Prefer semantic tags over <code>&lt;div&gt;</code> whenever the meaning is clear.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Identify semantic elements", "Choose the right tag for content"]
    },
    {
      title: "Forms and Inputs",
      contentHtml: `
        <p>Forms are how users submit data. Every input should have an associated <code>&lt;label&gt;</code> for accessibility.</p>
        <pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" name="email" type="email" required&gt;

  &lt;label for="pw"&gt;Password&lt;/label&gt;
  &lt;input id="pw" name="pw" type="password" minlength="8"&gt;

  &lt;button type="submit"&gt;Sign Up&lt;/button&gt;
&lt;/form&gt;</code></pre>
        <p>HTML5 input types (<code>email</code>, <code>number</code>, <code>date</code>) give you free validation.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Build an accessible form", "Use HTML5 input validation"]
    }
  ],

  "css-fundamentals": [
    {
      title: "Selectors and Specificity",
      contentHtml: `
        <p>CSS selectors target HTML elements. Specificity decides which rule wins when they conflict.</p>
        <pre><code>/* element: specificity 0-0-1 */
p { color: blue; }

/* class: specificity 0-1-0 */
.text-red { color: red; }

/* ID: specificity 1-0-0 */
#hero { color: green; }</code></pre>
        <p>Rule of thumb: prefer classes. Avoid IDs for styling.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Write selectors", "Understand specificity hierarchy"]
    },
    {
      title: "The Box Model",
      contentHtml: `
        <p>Every element is a box made of <strong>content</strong>, <strong>padding</strong>, <strong>border</strong>, and <strong>margin</strong>.</p>
        <p>By default, <code>box-sizing: content-box</code> means width excludes padding. Modern best practice:</p>
        <pre><code>*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>
        <p>Now <code>width</code> includes padding and border — much more predictable.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Describe the 4 box layers", "Use box-sizing correctly"]
    },
    {
      title: "Flexbox Layouts",
      contentHtml: `
        <p>Flexbox arranges children along one axis (row or column).</p>
        <pre><code>.row {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}</code></pre>
        <ul>
          <li><code>justify-content</code> — main axis alignment</li>
          <li><code>align-items</code> — cross axis alignment</li>
          <li><code>gap</code> — spacing between children</li>
        </ul>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Build a flex row", "Center content vertically and horizontally"]
    }
  ],

  "javascript-essentials": [
    {
      title: "Variables and Data Types",
      contentHtml: `
        <p>Use <code>const</code> by default, <code>let</code> when reassigning, and never <code>var</code>.</p>
        <pre><code>const name = "Alice";      // string
let age = 30;              // number
const isAdmin = false;     // boolean
const tags = ["a", "b"];   // array
const user = { name: "Alice", age: 30 }; // object</code></pre>
        <p>JavaScript is dynamically typed — variables can hold any type.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Declare variables with const/let", "Identify primitive types"]
    },
    {
      title: "Functions and Arrow Functions",
      contentHtml: `
        <p>Functions are reusable blocks. Arrow functions are shorter and inherit <code>this</code>.</p>
        <pre><code>// classic
function add(a, b) {
  return a + b;
}

// arrow
const add = (a, b) => a + b;

// arrow with a block body
const greet = (name) => {
  const message = "Hello, " + name;
  return message;
};</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Write function declarations", "Write arrow functions"]
    }
  ],

  "es6-and-async-javascript": [
    {
      title: "Destructuring and Spread",
      contentHtml: `
        <p>Destructure values from objects and arrays:</p>
        <pre><code>const user = { name: "Alice", age: 30 };
const { name, age } = user;

const arr = [1, 2, 3];
const [first, ...rest] = arr; // first=1, rest=[2,3]</code></pre>
        <p>Spread copies and merges:</p>
        <pre><code>const merged = { ...user, role: "admin" };</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Destructure objects", "Use spread for copies"]
    },
    {
      title: "Async / Await and Fetch",
      contentHtml: `
        <p>Fetch data from an API using <code>async</code> / <code>await</code>:</p>
        <pre><code>async function loadCourses() {
  try {
    const res = await fetch("/api/courses");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return data.courses;
  } catch (err) {
    console.error("Failed:", err.message);
    return [];
  }
}</code></pre>
        <p>Always wrap network calls in <code>try/catch</code> and check <code>res.ok</code>.</p>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Use async/await", "Handle fetch errors"]
    }
  ],

  // ---------- BACKEND (corrected slugs — matching slugified titles) ----------

  "node-js-runtime": [
    {
      title: "What is Node.js?",
      contentHtml: `
        <p>Node.js lets you run JavaScript <em>outside</em> the browser — on servers, CLIs, and scripts.</p>
        <p>It's built on Chrome's V8 engine and uses a single-threaded event loop for non-blocking I/O.</p>
        <pre><code>// hello.js
console.log("Hello from Node!");</code></pre>
        <p>Run it with <code>node hello.js</code>.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Explain Node.js", "Run a Node script"]
    },
    {
      title: "npm and package.json",
      contentHtml: `
        <p><strong>npm</strong> is the package manager. <strong>package.json</strong> describes your project.</p>
        <pre><code>npm init -y
npm install express
npm install --save-dev nodemon</code></pre>
        <p>Then <code>package.json</code>:</p>
        <pre><code>{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Install packages", "Write npm scripts"]
    }
  ],

  "express-js-fundamentals": [
    {
      title: "Your First Express Server",
      contentHtml: `
        <pre><code>const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => console.log("http://localhost:3000"));</code></pre>
        <p>Express listens for HTTP requests and runs the matching handler.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Create an Express server", "Handle a GET route"]
    },
    {
      title: "Middleware and Routing",
      contentHtml: `
        <p>Middleware are functions that run in order before your route handler.</p>
        <pre><code>app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "hi" });
});</code></pre>
        <p>Use middleware for logging, auth, body parsing, rate limiting.</p>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Write custom middleware", "Chain middleware correctly"]
    }
  ],

  "mongodb-mongoose": [
    {
      title: "Connecting to MongoDB",
      contentHtml: `
        <pre><code>const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected:", mongoose.connection.name);
}</code></pre>
        <p>Never hardcode the connection string. Use environment variables.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Connect Mongoose", "Use env vars for secrets"]
    },
    {
      title: "Defining Schemas",
      contentHtml: `
        <pre><code>const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "admin"], default: "student" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);</code></pre>
        <p>Schemas validate data at the DB level — the final line of defence.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Define a Mongoose schema", "Add validation rules"]
    }
  ],

  "authentication-security": [
    {
      title: "Password Hashing with bcrypt",
      contentHtml: `
        <p>Never store plaintext passwords. Always hash:</p>
        <pre><code>const bcrypt = require("bcryptjs");
const hash = await bcrypt.hash(password, 12);

const isValid = await bcrypt.compare(password, storedHash);</code></pre>
        <p>bcrypt is intentionally slow — attacks become computationally expensive.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Hash passwords", "Verify with bcrypt.compare"]
    },
    {
      title: "Session vs JWT Auth",
      contentHtml: `
        <p>Two common approaches:</p>
        <ul>
          <li><strong>Sessions</strong> — server stores state, client holds an HttpOnly cookie. Easy logout and revocation.</li>
          <li><strong>JWT</strong> — client holds a signed token. Stateless, good for APIs / microservices, harder to revoke.</li>
        </ul>
        <p>This platform uses sessions for simplicity and security.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Compare sessions and JWT", "Explain cookie security"]
    }
  ],

  "deploying-to-render": [
    {
      title: "Production Environment Variables",
      contentHtml: `
        <p>Never commit secrets to Git. Use Render's dashboard to set env vars:</p>
        <ul>
          <li><code>MONGODB_URI</code></li>
          <li><code>SESSION_SECRET</code></li>
          <li><code>NODE_ENV=production</code></li>
          <li><code>COOKIE_SECURE=true</code></li>
        </ul>
        <p>The app reads these at startup via <code>process.env</code>.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Configure env vars on Render", "Secure cookies in production"]
    },
    {
      title: "Health Checks and Logs",
      contentHtml: `
        <p>A <strong>health check</strong> endpoint tells Render your app is alive:</p>
        <pre><code>app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});</code></pre>
        <p>Render will restart the service if it returns 5xx repeatedly. Always check logs in the Render dashboard after deploying.</p>
      `,
      estimatedMinutes: 6,
      learningObjectives: ["Add a health check", "Read production logs"]
    }
  ]
};

async function seedLessons() {
  let created = 0;
  let updated = 0;

  for (const [slug, lessons] of Object.entries(lessonsByCourseSlug)) {
    const course = await Course.findOne({ slug });
    if (!course) {
      console.warn(`⚠  Course not found for lessons: ${slug}`);
      continue;
    }

    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const existing = await Lesson.findOne({ course: course._id, slug: lessonSlug });

      if (existing) {
        await Lesson.updateOne(
          { _id: existing._id },
          { $set: { ...l, slug: lessonSlug, order: i, course: course._id } }
        );
        updated++;
      } else {
        await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
        created++;
      }
    }

    // Sync lessonsCount on the course
    const totalLessons = await Lesson.countDocuments({ course: course._id });
    await Course.updateOne({ _id: course._id }, { $set: { lessonsCount: totalLessons } });
  }

  console.log(`   Lessons:  ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedLessons };