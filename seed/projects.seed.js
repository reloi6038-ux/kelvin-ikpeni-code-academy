/**
 * Kelvin Ikpeni Code Academy — Project seed
 * All 7 guided projects, fully built out with 33 real tasks.
 */
"use strict";

const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");

const projectsData = [
  // =========================================================
  // 1. Personal Portfolio Website
  // =========================================================
  {
    project: {
      title: "Personal Portfolio Website",
      description: "Build and deploy a responsive personal portfolio site that showcases your work. HTML, CSS, and vanilla JavaScript.",
      difficulty: "beginner",
      track: "frontend",
      icon: "🎨",
      estimatedHours: 4,
      objectives: [
        "Structure a page with semantic HTML",
        "Style with modern CSS",
        "Add interactive JS (mobile menu, form validation)",
        "Deploy to Render"
      ],
      order: 1,
      comingSoon: false
    },
    tasks: [
      {
        title: "Set up the HTML skeleton",
        description:
          "<p>Every portfolio starts with a clean HTML skeleton. In this task, you'll create the basic structure: a <code>&lt;header&gt;</code> with navigation, a <code>&lt;main&gt;</code> for content, and a <code>&lt;footer&gt;</code>.</p><p><strong>Requirements:</strong></p><ul><li>Use <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code></li><li>Inside <code>&lt;nav&gt;</code>, add 3 links: Home, About, Contact</li><li>Inside <code>&lt;main&gt;</code>, add an <code>&lt;h1&gt;</code> with your name</li></ul>",
        learningObjectives: ["Use semantic HTML5 elements", "Structure a page correctly"],
        starterHtml:
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
</head>
<body>
  <!-- Add your header, main, footer here -->
</body>
</html>`,
        starterCss: "",
        starterJs: "",
        hints: [
          "Start with <header> followed by <main> and <footer>.",
          "Use <nav> inside <header> for the links.",
          "The <h1> should be inside <main>."
        ],
        estimatedMinutes: 15
      },
      {
        title: "Style the header and nav",
        description:
          "<p>Now make the header look professional. Create a dark header with horizontal navigation links and a hover effect.</p><p><strong>Requirements:</strong></p><ul><li>Header with dark background</li><li>Nav links displayed horizontally</li><li>Hover effect changes link color</li></ul>",
        learningObjectives: ["Write CSS for layout", "Use flexbox for horizontal nav"],
        starterHtml: "",
        starterCss:
`/* Start your CSS here */
header {
  /* Add background, padding */
}

nav a {
  /* Make links look nice */
}`,
        starterJs: "",
        hints: [
          "Use display: flex on nav.",
          "Add padding to nav a for clickable areas.",
          "Use :hover selector for hover effect."
        ],
        estimatedMinutes: 20
      },
      {
        title: "Add a hero section",
        description:
          "<p>Create a visually striking hero section under the header with your name, a tagline, and a call-to-action button.</p><p><strong>Requirements:</strong></p><ul><li>A <code>&lt;section class=\"hero\"&gt;</code> after the header</li><li>Centered <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code></li><li>A prominent button linking to <code>#contact</code></li></ul>",
        learningObjectives: ["Build a hero section", "Center content with flexbox"],
        starterHtml: "",
        starterCss: "",
        starterJs: "",
        hints: [
          "Use min-height: 60vh for a full-screen feel.",
          "display: flex; flex-direction: column; align-items: center; justify-content: center."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Make it responsive",
        description:
          "<p>Test your site at mobile widths. Add a media query that stacks the nav links vertically below 600px.</p>",
        learningObjectives: ["Write responsive CSS", "Use media queries"],
        starterHtml: "",
        starterCss:
`/* Add your media query here */
@media (max-width: 600px) {
  /* ... */
}`,
        starterJs: "",
        hints: [
          "Change flex-direction to column on nav.",
          "Adjust padding for smaller screens."
        ],
        estimatedMinutes: 15
      }
    ]
  },

  // =========================================================
  // 2. Interactive JavaScript App (To-Do)
  // =========================================================
  {
    project: {
      title: "Interactive JavaScript App",
      description: "Build a fully interactive to-do app with DOM manipulation, events, and localStorage persistence.",
      difficulty: "intermediate",
      track: "frontend",
      icon: "⚡",
      estimatedHours: 5,
      objectives: [
        "Manipulate the DOM",
        "Handle user events",
        "Persist data with localStorage"
      ],
      order: 2,
      comingSoon: false
    },
    tasks: [
      {
        title: "Build the UI shell",
        description:
          "<p>Create the to-do app UI: an input field, an Add button, and an empty <code>&lt;ul&gt;</code> for tasks.</p>",
        learningObjectives: ["Create form UI", "Reference elements by ID"],
        starterHtml:
`<!DOCTYPE html>
<html>
<head><title>To-Do</title></head>
<body>
  <div class="app">
    <h1>My Tasks</h1>
    <input id="taskInput" placeholder="New task">
    <button id="addBtn">Add</button>
    <ul id="taskList"></ul>
  </div>
</body>
</html>`,
        starterCss:
`body { font-family: sans-serif; padding: 2rem; }
.app { max-width: 400px; margin: auto; }`,
        starterJs: "// your JS here",
        hints: ["Give each element a unique id.", "Use a <ul> for the task list."],
        estimatedMinutes: 10
      },
      {
        title: "Add tasks via JavaScript",
        description:
          "<p>When the Add button is clicked, read the input value, create a new <code>&lt;li&gt;</code>, and append it to the list.</p>",
        learningObjectives: ["Read input values", "Create and append DOM elements"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

btn.addEventListener("click", () => {
  // Create a new <li> with the input value
});`,
        hints: [
          "Use document.createElement('li').",
          "Set li.textContent = input.value.",
          "Append with list.appendChild(li).",
          "Don't forget to clear the input."
        ],
        estimatedMinutes: 20
      },
      {
        title: "Mark tasks as done",
        description:
          "<p>Click a task to toggle a 'done' class that strikes it through.</p>",
        learningObjectives: ["Delegate events", "Toggle classes"],
        starterHtml: "",
        starterCss:
`.done { text-decoration: line-through; opacity: 0.6; cursor: pointer; }`,
        starterJs: "// Add click handling for tasks",
        hints: [
          "Add a click listener to the <ul> and check e.target.tagName === 'LI'.",
          "Or add a listener to each <li> when created."
        ],
        estimatedMinutes: 15
      },
      {
        title: "Persist tasks in localStorage",
        description:
          "<p>Save tasks to <code>localStorage</code> on every change, and reload them on page load.</p>",
        learningObjectives: ["Use localStorage", "Serialize arrays"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`// Load saved tasks on page load
// Save on every change
// Hint: JSON.stringify and JSON.parse`,
        hints: [
          "localStorage.setItem('tasks', JSON.stringify(tasks)).",
          "const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')."
        ],
        estimatedMinutes: 25
      }
    ]
  },

  // =========================================================
  // 3. Auth System
  // =========================================================
  {
    project: {
      title: "Authentication System",
      description: "Design the frontend for a complete auth system: registration, login, session state, and protected content.",
      difficulty: "intermediate",
      track: "fullstack",
      icon: "🔒",
      estimatedHours: 6,
      objectives: [
        "Design accessible auth forms",
        "Validate inputs on the client",
        "Show / hide UI based on login state"
      ],
      order: 3,
      comingSoon: false
    },
    tasks: [
      {
        title: "Build the registration form",
        description:
          "<p>Create a registration form with name, email, password, and confirm password. Include inline error messages.</p>",
        learningObjectives: ["Build accessible forms", "Add inline errors"],
        starterHtml:
`<form id="registerForm">
  <h2>Create Account</h2>
  <label for="name">Name</label>
  <input id="name" name="name" required>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <label for="pw">Password</label>
  <input id="pw" name="pw" type="password" required minlength="8">
  <label for="pw2">Confirm</label>
  <input id="pw2" name="pw2" type="password" required>
  <button type="submit">Register</button>
</form>`,
        starterCss: "",
        starterJs: "",
        hints: ["Use type='email' for free validation.", "Add minlength='8' on password."],
        estimatedMinutes: 20
      },
      {
        title: "Validate with JavaScript",
        description:
          "<p>Add JS that prevents submission if passwords don't match or fields are empty. Show error messages below each field.</p>",
        learningObjectives: ["Validate on submit", "Show errors per field"],
        starterHtml: "",
        starterCss: ".error { color: red; font-size: 0.8rem; }",
        starterJs:
`document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // validate fields
});`,
        hints: [
          "Compare pw.value and pw2.value.",
          "Insert a <span class='error'> after invalid fields.",
          "Use input.focus() on the first invalid field."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Login form and UI state",
        description:
          "<p>Build a login form and toggle the visible form based on whether a fake `loggedIn` flag is true.</p>",
        learningObjectives: ["Toggle UI based on state", "Handle multiple forms"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`let loggedIn = false;
// Show/hide login vs dashboard based on loggedIn
function render() {
  // ...
}`,
        hints: [
          "Store the flag in localStorage to persist.",
          "Use display: none / block to toggle sections."
        ],
        estimatedMinutes: 25
      }
    ]
  },

  // =========================================================
  // 4. REST API for a To-Do App
  // =========================================================
  {
    project: {
      title: "REST API for a To-Do App",
      description: "Build a production-ready REST API with Node.js, Express, MongoDB, and automated tests. Includes validation, error handling, and deployment.",
      difficulty: "intermediate",
      track: "backend",
      icon: "🔌",
      estimatedHours: 8,
      objectives: [
        "Set up an Express server",
        "Design a REST API",
        "Connect MongoDB with Mongoose",
        "Validate and handle errors",
        "Deploy to Render"
      ],
      order: 4,
      comingSoon: false
    },
    tasks: [
      {
        title: "Initialize the Node.js project",
        description:
          "<p>Create a new Node.js project with npm, install Express, and set up a basic server.</p><p><strong>Requirements:</strong></p><ul><li>Run <code>npm init -y</code></li><li>Install <code>express</code> and <code>mongoose</code></li><li>Create <code>server.js</code> with an Express app on port 3000</li></ul>",
        learningObjectives: ["Initialize a Node project", "Create an Express server"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`// server.js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("http://localhost:3000"));`,
        hints: [
          "npm init -y && npm install express mongoose",
          "Use app.use(express.json()) to parse JSON bodies."
        ],
        estimatedMinutes: 15
      },
      {
        title: "Define the To-Do model",
        description:
          "<p>Create a Mongoose schema for a To-Do item.</p><p><strong>Fields:</strong> <code>title</code> (string, required), <code>done</code> (boolean, default false), <code>createdAt</code> (date, auto).</p>",
        learningObjectives: ["Define a Mongoose schema", "Export a model"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);`,
        hints: ["Use timestamps: true to auto-add createdAt/updatedAt."],
        estimatedMinutes: 15
      },
      {
        title: "Build CRUD routes",
        description:
          "<p>Implement <code>GET</code>, <code>POST</code>, <code>PATCH</code>, <code>DELETE</code> routes for <code>/api/todos</code>.</p>",
        learningObjectives: ["Implement REST endpoints", "Use Mongoose CRUD"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`const Todo = require("./models/Todo");

// GET all
app.get("/api/todos", async (req, res) => {
  // return all todos
});

// POST create
app.post("/api/todos", async (req, res) => {
  // create a new todo
});

// PATCH toggle
app.patch("/api/todos/:id", async (req, res) => {
  // toggle done
});

// DELETE
app.delete("/api/todos/:id", async (req, res) => {
  // delete
});`,
        hints: [
          "Use Todo.find(), Todo.create(), Todo.findByIdAndUpdate(), Todo.findByIdAndDelete().",
          "Return proper status codes: 200, 201, 404."
        ],
        estimatedMinutes: 30
      },
      {
        title: "Validate requests",
        description:
          "<p>Reject requests with missing title. Return <code>400</code> with a helpful error.</p>",
        learningObjectives: ["Validate request bodies", "Return meaningful errors"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`app.post("/api/todos", async (req, res) => {
  if (!req.body.title || req.body.title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  // ...
});`,
        hints: ["Always trim strings.", "Return early on validation failure."],
        estimatedMinutes: 15
      },
      {
        title: "Error handling middleware",
        description:
          "<p>Add a centralized error handler that returns JSON for all errors.</p>",
        learningObjectives: ["Centralize error handling"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});`,
        hints: ["Must be added AFTER all routes.", "Takes 4 arguments: err, req, res, next."],
        estimatedMinutes: 15
      },
      {
        title: "Deploy to Render",
        description:
          "<p>Push to GitHub, create a Render Web Service, add <code>MONGODB_URI</code>, deploy, and test the live API.</p>",
        learningObjectives: ["Deploy a Node.js API", "Configure production env vars"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// No code needed — deploy via Render dashboard.",
        hints: [
          "Render → New + → Web Service → Connect GitHub.",
          "Set MONGODB_URI in Render's Environment.",
          "Start command: npm start"
        ],
        estimatedMinutes: 20
      }
    ]
  },

  // =========================================================
  // 5. Full-Stack Blog
  // =========================================================
  {
    project: {
      title: "Full-Stack Blog",
      description: "Build a complete blog with authentication, post CRUD, search, and pagination. HTML, CSS, JS on the front; Express + MongoDB on the back.",
      difficulty: "advanced",
      track: "fullstack",
      icon: "📝",
      estimatedHours: 12,
      objectives: [
        "Full auth flow (register/login)",
        "CRUD posts",
        "Search + pagination",
        "Deploy to Render"
      ],
      order: 5,
      comingSoon: false
    },
    tasks: [
      {
        title: "Set up the Express + MongoDB backend",
        description:
          "<p>Create an Express server connected to MongoDB, with an author model and a post model.</p>",
        learningObjectives: ["Connect MongoDB", "Define two related schemas"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`// models/Post.js
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);`,
        hints: [
          "User model already exists (from earlier projects or add one).",
          "Use timestamps: true for createdAt."
        ],
        estimatedMinutes: 30
      },
      {
        title: "Auth: register and login",
        description:
          "<p>Implement <code>POST /api/auth/register</code> and <code>POST /api/auth/login</code> with bcrypt hashing and JWT or session.</p>",
        learningObjectives: ["Hash passwords", "Issue auth tokens"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`app.post("/api/auth/register", async (req, res) => {
  // hash password with bcrypt, save user
});

app.post("/api/auth/login", async (req, res) => {
  // verify password, issue token or session
});`,
        hints: [
          "Use bcrypt.hash(pw, 12) to hash.",
          "Use bcrypt.compare(pw, hash) to verify.",
          "Store JWT in an HttpOnly cookie OR use express-session."
        ],
        estimatedMinutes: 45
      },
      {
        title: "Post CRUD routes",
        description:
          "<p>Add <code>GET /api/posts</code>, <code>POST /api/posts</code>, <code>PATCH /api/posts/:id</code>, <code>DELETE /api/posts/:id</code>. Only the author can edit/delete their post.</p>",
        learningObjectives: ["Implement REST CRUD", "Enforce ownership"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
  res.json({ posts });
});

app.post("/api/posts", requireAuth, async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user._id });
  res.status(201).json({ post });
});`,
        hints: ["Check post.author.equals(req.user._id) before allowing edits."],
        estimatedMinutes: 40
      },
      {
        title: "Search and pagination",
        description:
          "<p>Support <code>?q=</code> for text search and <code>?page=</code> for pagination. Return 10 posts per page.</p>",
        learningObjectives: ["Add text search", "Paginate results"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`const { q, page = 1 } = req.query;
const filter = q ? { title: new RegExp(q, "i") } : {};
const limit = 10;
const skip = (page - 1) * limit;

const posts = await Post.find(filter).skip(skip).limit(limit);`,
        hints: [
          "Use $regex or a MongoDB text index.",
          "Return total count too: await Post.countDocuments(filter)."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Frontend: list, single post, and editor",
        description:
          "<p>Build three pages: <code>index.html</code> (post list), <code>post.html</code> (single post), <code>editor.html</code> (create/edit). Fetch from your own API.</p>",
        learningObjectives: ["Fetch from your API", "Render dynamic content"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`async function loadPosts() {
  const res = await fetch("/api/posts");
  const { posts } = await res.json();
  // render posts into the DOM
}`,
        hints: [
          "Use the same fetch() pattern from earlier projects.",
          "Use innerHTML = '' to clear before re-rendering."
        ],
        estimatedMinutes: 60
      },
      {
        title: "Deploy to Render",
        description:
          "<p>Deploy the whole app (front + back) as a single Render Web Service. Set env vars, verify auth flow, publish a post.</p>",
        learningObjectives: ["Deploy a full-stack app"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// Deploy via Render. Set MONGODB_URI, JWT_SECRET (or SESSION_SECRET).",
        hints: [
          "Serve your static HTML from Express with app.use(express.static('public')).",
          "Ensure cookies are set with secure: true in production."
        ],
        estimatedMinutes: 30
      }
    ]
  },

  // =========================================================
  // 6. Student Learning Management Dashboard
  // =========================================================
  {
    project: {
      title: "Learning Management Dashboard",
      description: "Build a dashboard that tracks student enrolments, course progress, assessments, and certificates. Role-based views for students and admins.",
      difficulty: "advanced",
      track: "fullstack",
      icon: "📊",
      estimatedHours: 14,
      objectives: [
        "Design a dashboard layout",
        "Model enrolments and progress",
        "Role-based views",
        "Charts / progress visualization"
      ],
      order: 6,
      comingSoon: false
    },
    tasks: [
      {
        title: "Model users, courses, and enrolments",
        description:
          "<p>Create schemas for <code>User</code> (with role), <code>Course</code>, and <code>Enrollment</code> (linking user + course + progress %).</p>",
        learningObjectives: ["Define related schemas", "Use refs for relationships"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  progressPercent: { type: Number, default: 0 },
  enrolledAt: { type: Date, default: Date.now }
});

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });`,
        hints: ["Use a unique compound index to prevent duplicate enrolments."],
        estimatedMinutes: 30
      },
      {
        title: "Student dashboard page",
        description:
          "<p>Build a page where logged-in students see:</p><ul><li>A stat grid (enrolled, completed, % done)</li><li>A list of current courses with progress bars</li><li>Quick actions (browse, resume)</li></ul>",
        learningObjectives: ["Build a dashboard", "Fetch user-specific data"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`async function load() {
  const res = await fetch("/api/enrollments/me");
  const { enrollments } = await res.json();
  // render stats + course list
}`,
        hints: ["Compute % complete on the server, not the client."],
        estimatedMinutes: 45
      },
      {
        title: "Role-based views (student vs admin)",
        description:
          "<p>If the logged-in user's role is <code>admin</code>, show an extra \"Admin\" link in the nav. Non-admins should be redirected if they try to access <code>/admin</code>.</p>",
        learningObjectives: ["Check role on both client and server", "Protect routes"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}`,
        hints: [
          "Client-side hiding is not security — always check on the server.",
          "Use middleware for admin routes."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Admin: overview and management",
        description:
          "<p>Build an admin page with:</p><ul><li>Total students, courses, enrolments</li><li>A table of all students with progress</li><li>Actions to promote a user to admin or suspend them</li></ul>",
        learningObjectives: ["Build an admin analytics view", "Implement user management"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`app.get("/api/admin/analytics", requireAdmin, async (req, res) => {
  const stats = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Enrollment.countDocuments()
  ]);
  res.json({ students: stats[0], courses: stats[1], enrollments: stats[2] });
});`,
        hints: ["Use Promise.all to parallelize countDocuments calls."],
        estimatedMinutes: 60
      },
      {
        title: "Issue certificates on completion",
        description:
          "<p>When a student completes 100% of a course, auto-generate a <code>Certificate</code> with a unique ID. Show it on the student dashboard and allow downloading as PDF.</p>",
        learningObjectives: ["Auto-issue certificates", "Generate PDFs server-side"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`async function issueCertificate(userId, courseId) {
  const exists = await Certificate.findOne({ user: userId, course: courseId });
  if (exists) return exists;
  return Certificate.create({
    user: userId,
    course: courseId,
    certificateId: "KICA-" + crypto.randomBytes(4).toString("hex").toUpperCase()
  });
}`,
        hints: [
          "Use pdfkit to generate the PDF.",
          "Never let users download someone else's certificate — check ownership."
        ],
        estimatedMinutes: 60
      }
    ]
  },

  // =========================================================
  // 7. Kelvin Ikpeni Code Academy Capstone
  // =========================================================
  {
    project: {
      title: "Kelvin Ikpeni Code Academy Capstone",
      description: "Rebuild the entire KICA platform end-to-end: courses, lessons, exercises, quizzes, projects, certificates, admin panel, and deployment.",
      difficulty: "capstone",
      track: "capstone",
      icon: "🏆",
      estimatedHours: 20,
      objectives: [
        "Integrate every subsystem",
        "Ship a production-ready platform",
        "Deploy with a public URL"
      ],
      order: 7,
      comingSoon: false
    },
    tasks: [
      {
        title: "Plan your architecture",
        description:
          "<p>Before writing code, plan the whole app:</p><ul><li>List every model and its fields</li><li>List every API endpoint</li><li>Sketch the page map</li><li>Identify risky areas (auth, grading, certificates)</li></ul><p>Save your plan as <code>PLAN.md</code> in your project.</p>",
        learningObjectives: ["Plan a full-stack app", "Identify risks early"],
        starterHtml: "",
        starterCss: "",
        starterJs: "# PLAN.md\n\n## Models\n- User\n- Course\n- Lesson\n- ...\n\n## Endpoints\n- POST /api/auth/register\n- ...",
        hints: ["The better the plan, the faster the code."],
        estimatedMinutes: 45
      },
      {
        title: "Build auth + roles",
        description:
          "<p>Implement full authentication (register, login, logout, password reset) with session-based auth and role checks (student/admin).</p>",
        learningObjectives: ["Session-based auth", "Role-based authorization"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// Use express-session + connect-mongo + bcryptjs",
        hints: [
          "Never store plaintext passwords.",
          "Test with Postman or the browser before moving on."
        ],
        estimatedMinutes: 90
      },
      {
        title: "Build the learning flow",
        description:
          "<p>Implement:</p><ul><li>Course catalogue and details</li><li>Enrolment</li><li>Lesson viewer with progress</li><li>Dashboard showing enrolled courses</li></ul>",
        learningObjectives: ["Track per-user progress", "Persist state"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// Track completedLessons[] per (user, course) in Progress model",
        hints: ["Compute % on the server for accuracy."],
        estimatedMinutes: 120
      },
      {
        title: "Build assessments + certificates",
        description:
          "<p>Implement quizzes with attempt tracking, auto-grading, and pass thresholds. On course completion, issue a PDF certificate with a public verify page.</p>",
        learningObjectives: ["Auto-grade quizzes", "Generate PDFs", "Public verification"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// Never expose correctIndex in GET /api/quizzes/:slug",
        hints: [
          "Reveal answers only after submit.",
          "Verify pages must work without login."
        ],
        estimatedMinutes: 120
      },
      {
        title: "Deploy and monitor",
        description:
          "<p>Push to GitHub. Deploy to Render. Set env vars. Configure MongoDB Atlas IP access. Verify health check. Test every flow on the live URL.</p>",
        learningObjectives: ["Deploy a production app", "Monitor with logs"],
        starterHtml: "",
        starterCss: "",
        starterJs: "// Read Render logs after every change.",
        hints: [
          "Set NODE_ENV=production, COOKIE_SECURE=true.",
          "Never commit .env."
        ],
        estimatedMinutes: 60
      }
    ]
  }
];

async function seedProjects() {
  let created = 0;
  let updated = 0;
  let tasksCreated = 0;
  let tasksUpdated = 0;

  for (const entry of projectsData) {
    const p = entry.project;
    const slug = Project.slugify(p.title);
    const existing = await Project.findOne({ slug });
    // Explicitly set comingSoon to false since we now have tasks for all projects
    const payload = { ...p, slug, comingSoon: false };

    let projectDoc;
    if (existing) {
      await Project.updateOne({ slug }, { $set: payload });
      projectDoc = existing;
      updated++;
    } else {
      projectDoc = await Project.create(payload);
      created++;
    }

    // Seed tasks
    for (let i = 0; i < entry.tasks.length; i++) {
      const t = entry.tasks[i];
      const taskSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const taskExisting = await ProjectTask.findOne({ project: projectDoc._id, slug: taskSlug });

      if (taskExisting) {
        await ProjectTask.updateOne(
          { _id: taskExisting._id },
          { $set: { ...t, slug: taskSlug, order: i, project: projectDoc._id } }
        );
        tasksUpdated++;
      } else {
        await ProjectTask.create({ ...t, slug: taskSlug, order: i, project: projectDoc._id });
        tasksCreated++;
      }
    }
  }

  console.log(`   Projects: ${created} created, ${updated} updated`);
  console.log(`   Tasks:    ${tasksCreated} created, ${tasksUpdated} updated`);
}

module.exports = { seedProjects };