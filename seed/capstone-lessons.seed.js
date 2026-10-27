/**
 * Kelvin Ikpeni Code Academy — Full-Stack Capstone lessons
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const capstoneLessons = [
  {
    title: "Project Planning & Architecture",
    contentHtml: `
      <h2>From Idea to Blueprint</h2>
      <p>Before writing a single line of code, you need a plan. A production-ready app starts with clear architecture.</p>
      <p><strong>Step 1: Define the MVP</strong></p>
      <ul>
        <li>What is the core problem this app solves?</li>
        <li>Who is the target user?</li>
        <li>What are the 3-5 essential features?</li>
      </ul>
      <p><strong>Step 2: Design the Data Models</strong></p>
      <p>Sketch your MongoDB schemas. For a task manager, you might need <code>User</code> and <code>Task</code>.</p>
      <pre><code class="language-javascript">// User Schema
{
  name: String,
  email: { type: String, unique: true },
  passwordHash: String
}

// Task Schema
{
  title: String,
  completed: Boolean,
  author: { type: ObjectId, ref: "User" }
}</code></pre>
      <p><strong>Step 3: Define the API Routes</strong></p>
      <ul>
        <li><code>POST /api/auth/register</code></li>
        <li><code>POST /api/auth/login</code></li>
        <li><code>GET /api/tasks</code> (Auth required)</li>
        <li><code>POST /api/tasks</code> (Auth required)</li>
        <li><code>PATCH /api/tasks/:id</code> (Auth required)</li>
      </ul>
      <p><strong>Your turn:</strong> Create a <code>PLAN.md</code> file in your project. Outline the MVP features, schemas, and routes for your capstone idea.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: ["Define a clear MVP", "Design database schemas", "Plan REST API endpoints"]
  },
  {
    title: "Backend Setup & Database Connection",
    contentHtml: `
      <h2>Initializing the Server</h2>
      <p>We start with a clean Node.js project connected to MongoDB Atlas.</p>
      <pre><code class="language-bash">mkdir my-capstone
cd my-capstone
npm init -y
npm install express mongoose dotenv cors</code></pre>
      <p>Create <code>server.js</code>:</p>
      <pre><code class="language-javascript">require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

app.listen(PORT, () => console.log(\`Server on port \${PORT}\`));</code></pre>
      <p>Add your connection string to <code>.env</code>:</p>
      <pre><code class="language-bash">MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/capstone</code></pre>
      <p><strong>Your turn:</strong> Set up the project and get the server to log "MongoDB connected".</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: ["Initialize a Node project", "Connect Mongoose to Atlas"]
  },
  {
    title: "Building the Models & Controllers",
    contentHtml: `
      <h2>Separating Concerns</h2>
      <p>Don't put everything in <code>server.js</code>. Use a modular structure:</p>
      <ul>
        <li><strong>models/</strong> — Mongoose schemas</li>
        <li><strong>controllers/</strong> — Route logic</li>
        <li><strong>routes/</strong> — Express route definitions</li>
      </ul>
      <p><strong>User Model:</strong></p>
      <pre><code class="language-javascript">const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);</code></pre>
      <p><strong>Your turn:</strong> Build the <code>User</code> and <code>Task</code> models, then create a controller for creating a task. Wire it up to a <code>POST /api/tasks</code> route.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: ["Structure backend files", "Write Mongoose models", "Create a controller"]
  },
  {
    title: "Authentication & Session Management",
    contentHtml: `
      <h2>Securing the App</h2>
      <p>Add secure login. We'll use sessions and cookies.</p>
      <pre><code class="language-javascript">const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));</code></pre>
      <p><strong>Auth Controller (Login):</strong></p>
      <pre><code class="language-javascript">async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session.userId = user._id;
  res.json({ status: "success" });
}</code></pre>
      <p><strong>Your turn:</strong> Implement register and login routes. Test with Postman or curl to ensure the session cookie is set.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: ["Add session middleware", "Implement login/register", "Verify cookies"]
  },
  {
    title: "Protecting Routes",
    contentHtml: `
      <h2>Auth Middleware</h2>
      <p>Only logged-in users should see tasks.</p>
      <pre><code class="language-javascript">function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

app.get("/api/tasks", requireAuth, (req, res) => {
  // only runs if logged in
});</code></pre>
      <p><strong>Your turn:</strong> Add <code>requireAuth</code> to all task-related routes.</p>
    `,
    estimatedMinutes: 20,
    learningObjectives: ["Write auth middleware", "Protect endpoints"]
  },
  {
    title: "Frontend Setup (HTML/CSS/JS)",
    contentHtml: `
      <h2>Serving Static Files</h2>
      <p>Express can serve HTML, CSS, and JS directly from a <code>public</code> folder.</p>
      <pre><code class="language-javascript">app.use(express.static("public"));</code></pre>
      <p>Create <code>public/index.html</code>:</p>
      <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My Tasks&lt;/title&gt;
  &lt;link rel="stylesheet" href="/style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My Tasks&lt;/h1&gt;
  &lt;ul id="taskList"&gt;&lt;/ul&gt;
  &lt;script src="/app.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      <p><strong>Your turn:</strong> Create the frontend structure. Serve it and verify you can see the page at <code>http://localhost:3000</code>.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: ["Serve static files", "Create a frontend layout"]
  },
  {
    title: "Connecting Frontend to Backend",
    contentHtml: `
      <h2>Fetching Data</h2>
      <p>Use <code>fetch()</code> to talk to your API.</p>
      <pre><code class="language-javascript">async function loadTasks() {
  const res = await fetch("/api/tasks", { credentials: "include" });
  const data = await res.json();
  renderTasks(data.tasks);
}</code></pre>
      <p>Posting data:</p>
      <pre><code class="language-javascript">async function addTask(title) {
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
    credentials: "include"
  });
  loadTasks();
}</code></pre>
      <p><strong>Your turn:</strong> Wire up your frontend form to your backend. Ensure tasks appear after submission.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: ["Use fetch with credentials", "Send POST requests", "Update the DOM"]
  },
  {
    title: "Testing & Debugging",
    contentHtml: `
      <h2>Finding the Bugs</h2>
      <p>Test edge cases:</p>
      <ul>
        <li>What happens if the user is not logged in?</li>
        <li>What if the title is empty?</li>
        <li>What happens on a slow network?</li>
      </ul>
      <p>Use the browser DevTools → Network tab to inspect requests and responses.</p>
      <p><strong>Your turn:</strong> Write a list of 10 manual test cases. Run through them all and fix any bugs you find.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: ["Test edge cases", "Use DevTools effectively"]
  },
  {
    title: "Deployment Preparation",
    contentHtml: `
      <h2>Getting Ready for Production</h2>
      <p>Update <code>package.json</code>:</p>
      <pre><code class="language-json">"scripts": {
  "start": "node server.js"
},
"engines": {
  "node": ">=20.0.0"
}</code></pre>
      <p>Add <code>.env.example</code> to show required variables without leaking secrets.</p>
      <p>Ensure <code>.gitignore</code> excludes <code>node_modules</code> and <code>.env</code>.</p>
      <p><strong>Your turn:</strong> Prepare the project for Render. Push everything to GitHub.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: ["Configure production scripts", "Prepare for Git"]
  },
  {
    title: "Deployment to Render",
    contentHtml: `
      <h2>Going Live</h2>
      <p>On Render:</p>
      <ol>
        <li>Create a new Web Service.</li>
        <li>Connect your GitHub repo.</li>
        <li>Set Build Command: <code>npm install</code></li>
        <li>Set Start Command: <code>npm start</code></li>
        <li>Add your environment variables (<code>MONGO_URI</code>, <code>SESSION_SECRET</code>).</li>
      </ol>
      <p>Once deployed, visit the URL, register a user, and create a task.</p>
      <p><strong>Your turn:</strong> Deploy and verify the full flow on your live URL.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: ["Deploy to Render", "Verify production flow"]
  }
];

async function seedCapstoneLessons() {
  const course = await Course.findOne({ slug: "full-stack-capstone" });
  if (!course) {
    console.warn("⚠  Course not found: full-stack-capstone");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < capstoneLessons.length; i++) {
    const l = capstoneLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: capstoneLessons.length } }
  );

  console.log(`   Capstone lessons: ${created} created`);
  return { created, updated };
}

module.exports = { seedCapstoneLessons };