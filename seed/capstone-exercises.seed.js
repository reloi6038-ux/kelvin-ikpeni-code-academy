/**
 * Kelvin Ikpeni Code Academy — Full-Stack Capstone exercises
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const capstoneExercises = [
  {
    title: "Capstone: User Schema",
    slug: "capstone-user-schema",
    description: "<p>Define a Mongoose schema for a <code>User</code> with <code>name</code>, <code>email</code>, and <code>passwordHash</code>. Add a pre-save hook to hash the password using <code>bcrypt</code>.</p>",
    difficulty: "advanced",
    language: "node",
    topic: "capstone",
    starterJs: 'const mongoose = require("mongoose");\nconst bcrypt = require("bcryptjs");\n\n// Define the User schema here\n',
    solutionJs: `const mongoose = require("mongoose");
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

module.exports = mongoose.model("User", userSchema);`,
    hints: ["Use <code>new mongoose.Schema({...})</code>.", "Call <code>bcrypt.hash()</code> in a pre-save hook."],
    testCases: [
      { description: "Defines userSchema", pattern: "new\\s+mongoose\\.Schema" },
      { description: "Uses pre-save hook", pattern: "pre\\s*\\(\\s*[\"']save[\"']" },
      { description: "Hashes password with bcrypt", pattern: "bcrypt\\.hash" }
    ],
    points: 25, order: 1
  },
  {
    title: "Capstone: Login Controller",
    slug: "capstone-login-controller",
    description: "<p>Write an Express login controller that verifies a password and sets <code>req.session.userId</code>.</p>",
    difficulty: "advanced",
    language: "node",
    topic: "capstone",
    starterJs: 'async function login(req, res) {\n  // your code here\n}\n',
    solutionJs: `async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session.userId = user._id;
  res.json({ status: "success" });
}`,
    hints: ["Find user by email.", "Use <code>bcrypt.compare()</code>.", "Set <code>req.session.userId</code>."],
    testCases: [
      { description: "Finds user by email", pattern: "User\\.findOne\\(\\{ email \\}\\)" },
      { description: "Uses bcrypt.compare", pattern: "bcrypt\\.compare" },
      { description: "Sets session.userId", pattern: "req\\.session\\.userId" }
    ],
    points: 25, order: 2
  },
  {
    title: "Capstone: Auth Middleware",
    slug: "capstone-auth-middleware",
    description: "<p>Write middleware <code>requireAuth</code> that returns 401 if <code>req.session.userId</code> is missing, else calls <code>next()</code>.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "capstone",
    starterJs: "// Write requireAuth middleware\n",
    solutionJs: `function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}`,
    hints: ["Check <code>req.session.userId</code>.", "Return 401 if missing.", "Call <code>next()</code> otherwise."],
    testCases: [
      { description: "Checks session.userId", pattern: "req\\.session\\.userId" },
      { description: "Returns 401", pattern: "status\\s*\\(\\s*401\\s*\\)" },
      { description: "Calls next()", pattern: "next\\(\\)" }
    ],
    points: 20, order: 3
  },
  {
    title: "Capstone: Task Schema",
    slug: "capstone-task-schema",
    description: "<p>Define a Mongoose schema for a <code>Task</code> with <code>title</code>, <code>completed</code> (default false), and <code>author</code> (ref to User).</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "capstone",
    starterJs: 'const mongoose = require("mongoose");\n\n// Define the Task schema here\n',
    solutionJs: `const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);`,
    hints: ["Use <code>mongoose.Schema.Types.ObjectId</code> for refs.", "Set <code>ref: 'User'</code>.", "Add <code>{ timestamps: true }</code>."],
    testCases: [
      { description: "Defines taskSchema", pattern: "new\\s+mongoose\\.Schema" },
      { description: "Has author reference", pattern: "ref\\s*:\\s*[\"']User[\"']" },
      { description: "Uses timestamps", pattern: "timestamps\\s*:\\s*true" }
    ],
    points: 20, order: 4
  },
  {
    title: "Capstone: Create Task Route",
    slug: "capstone-create-task",
    description: "<p>Write a POST route <code>/api/tasks</code> that creates a task, assigning the current user as author.</p>",
    difficulty: "advanced",
    language: "node",
    topic: "capstone",
    starterJs: 'app.post("/api/tasks", requireAuth, async (req, res) => {\n  // your code here\n});\n',
    solutionJs: `app.post("/api/tasks", requireAuth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    author: req.session.userId
  });
  res.status(201).json({ status: "success", task });
});`,
    hints: ["Use <code>Task.create()</code>.", "Set <code>author: req.session.userId</code>.", "Return 201 status."],
    testCases: [
      { description: "Uses Task.create", pattern: "Task\\.create" },
      { description: "Sets author to session user", pattern: "author\\s*:\\s*req\\.session\\.userId" },
      { description: "Returns 201", pattern: "status\\s*\\(\\s*201\\s*\\)" }
    ],
    points: 30, order: 5
  },
  {
    title: "Capstone: List Tasks Route",
    slug: "capstone-list-tasks",
    description: "<p>Write a GET route <code>/api/tasks</code> that returns only tasks owned by the logged-in user.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "capstone",
    starterJs: 'app.get("/api/tasks", requireAuth, async (req, res) => {\n  // your code here\n});\n',
    solutionJs: `app.get("/api/tasks", requireAuth, async (req, res) => {
  const tasks = await Task.find({ author: req.session.userId });
  res.json({ status: "success", tasks });
});`,
    hints: ["Filter by <code>{ author: req.session.userId }</code>.", "Return <code>res.json()</code>."],
    testCases: [
      { description: "Finds tasks by author", pattern: "Task\\.find\\(\\{\\s*author:\\s*req\\.session\\.userId" },
      { description: "Returns JSON", pattern: "res\\.json" }
    ],
    points: 20, order: 6
  }
];

async function seedCapstoneExercises() {
  const course = await Course.findOne({ slug: "full-stack-capstone" });
  if (!course) {
    console.warn("⚠  Course not found: full-stack-capstone");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of capstoneExercises) {
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

  console.log(`   Capstone exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedCapstoneExercises };