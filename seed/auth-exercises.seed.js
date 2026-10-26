/**
 * Kelvin Ikpeni Code Academy — Authentication & Security exercises
 * Targeted seed: adds 15 new Auth exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const authExercises = [
  {
    title: "Auth: Hash a Password",
    slug: "auth-hash-password",
    description: "<p>Use <code>bcryptjs</code> to hash a password with 12 salt rounds. Store the hash in a variable called <code>hash</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "hashing",
    starterJs: 'const bcrypt = require("bcryptjs");\n\n// Hash a password with 12 rounds\n',
    solutionJs: `const bcrypt = require("bcryptjs");

const hash = await bcrypt.hash("my-password", 12);`,
    hints: ["Use <code>bcrypt.hash(password, rounds)</code>.", "12 is the standard cost factor."],
    testCases: [
      { description: "Requires bcryptjs", pattern: "require\\([\"']bcryptjs[\"']\\)" },
      { description: "Calls bcrypt.hash", pattern: "bcrypt\\.hash\\(" },
      { description: "Uses 12 rounds", pattern: ",\\s*12\\s*\\)" }
    ],
    points: 20,
    order: 135
  },
  {
    title: "Auth: Verify a Password",
    slug: "auth-verify-password",
    description: "<p>Use <code>bcrypt.compare()</code> to verify a plaintext password against a stored hash.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "hashing",
    starterJs: 'const bcrypt = require("bcryptjs");\n\n// Verify password against hash\n',
    solutionJs: `const bcrypt = require("bcryptjs");

const ok = await bcrypt.compare("my-password", hash);`,
    hints: ["Use <code>bcrypt.compare(plain, hash)</code>.", "Returns a Promise<boolean>."],
    testCases: [
      { description: "Requires bcryptjs", pattern: "require\\([\"']bcryptjs[\"']\\)" },
      { description: "Calls bcrypt.compare", pattern: "bcrypt\\.compare\\(" }
    ],
    points: 15,
    order: 136
  },
  {
    title: "Auth: Select Password Hash",
    slug: "auth-select-password-hash",
    description: "<p>Given a User model with <code>passwordHash</code> set to <code>select: false</code>, write a query that includes it.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "mongoose-auth",
    starterJs: 'const User = require("./models/User");\n\n// Find user with passwordHash included\n',
    solutionJs: `const User = require("./models/User");

const user = await User.findOne({ email }).select("+passwordHash");`,
    hints: ["Use <code>.select('+passwordHash')</code>.", "The + prefix explicitly includes hidden fields."],
    testCases: [
      { description: "Uses .select", pattern: "\\.select\\(" },
      { description: "Includes +passwordHash", pattern: "\\+passwordHash" }
    ],
    points: 20,
    order: 137
  },
  {
    title: "Auth: Session Regeneration",
    slug: "auth-session-regenerate",
    description: "<p>Regenerate the session with <code>req.session.regenerate()</code> before setting <code>userId</code>. This prevents session fixation.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "sessions",
    starterJs: '// Regenerate session before login\n',
    solutionJs: `req.session.regenerate((err) => {
  if (err) return res.status(500).json({ error: "Login failed" });
  req.session.userId = user._id;
  res.json({ status: "success" });
});`,
    hints: ["Use <code>req.session.regenerate(callback)</code>.", "Set userId AFTER regeneration."],
    testCases: [
      { description: "Uses req.session.regenerate", pattern: "req\\.session\\.regenerate" },
      { description: "Sets session.userId after", pattern: "regenerate[\\s\\S]*session\\.userId" }
    ],
    points: 25,
    order: 138
  },
  {
    title: "Auth: Session Cookie Config",
    slug: "auth-session-cookie",
    description: "<p>Configure session cookies with <code>httpOnly: true</code>, <code>sameSite: 'lax'</code>, and <code>secure: process.env.NODE_ENV === 'production'</code>.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "sessions",
    starterJs: 'app.use(session({\n  secret: process.env.SESSION_SECRET,\n  cookie: {\n    // configure cookie here\n  }\n}));\n',
    solutionJs: `app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}));`,
    hints: ["Set httpOnly: true", "Set sameSite: 'lax'", "Set secure based on NODE_ENV."],
    testCases: [
      { description: "Sets httpOnly: true", pattern: "httpOnly\\s*:\\s*true" },
      { description: "Sets sameSite: 'lax'", pattern: "sameSite\\s*:\\s*[\"']lax[\"']" },
      { description: "Sets secure based on NODE_ENV", pattern: "secure\\s*:\\s*process\\.env\\.NODE_ENV\\s*===" }
    ],
    points: 25,
    order: 139
  },
  {
    title: "Auth: Create JWT",
    slug: "auth-create-jwt",
    description: "<p>Create a JWT containing <code>{ userId: user._id }</code> signed with <code>process.env.JWT_SECRET</code>, expiring in 7 days.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "jwt",
    starterJs: 'const jwt = require("jsonwebtoken");\n\n// Create token\n',
    solutionJs: `const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);`,
    hints: ["Use <code>jwt.sign(payload, secret, options)</code>.", "Pass <code>expiresIn: '7d'</code>."],
    testCases: [
      { description: "Uses jwt.sign", pattern: "jwt\\.sign\\(" },
      { description: "Includes userId in payload", pattern: "userId" },
      { description: "Uses JWT_SECRET", pattern: "process\\.env\\.JWT_SECRET" },
      { description: "Sets expiresIn", pattern: "expiresIn" }
    ],
    points: 25,
    order: 140
  },
  {
    title: "Auth: Verify JWT",
    slug: "auth-verify-jwt",
    description: "<p>Verify a JWT from <code>req.headers.authorization</code> (Bearer token) and return 401 if invalid.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "jwt",
    starterJs: 'const jwt = require("jsonwebtoken");\n\n// Verify the token from Authorization header\n',
    solutionJs: `const jwt = require("jsonwebtoken");

const header = req.headers.authorization || "";
const token = header.replace("Bearer ", "");

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
} catch (err) {
  return res.status(401).json({ error: "Invalid or expired token" });
}`,
    hints: ["Use <code>jwt.verify(token, secret)</code>.", "Wrap in try/catch.", "Return 401 on failure."],
    testCases: [
      { description: "Uses jwt.verify", pattern: "jwt\\.verify\\(" },
      { description: "Reads Authorization header", pattern: "authorization" },
      { description: "Returns 401 on error", pattern: "status\\s*\\(\\s*401\\s*\\)" }
    ],
    points: 25,
    order: 141
  },
  {
    title: "Auth: Auth Middleware",
    slug: "auth-require-auth",
    description: "<p>Write middleware <code>requireAuth</code> that returns 401 if <code>req.session.userId</code> is missing, else calls <code>next()</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "middleware",
    starterJs: "// Write requireAuth middleware\n",
    solutionJs: `function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}`,
    hints: ["Check <code>req.session.userId</code>.", "Return 401 if missing.", "Call <code>next()</code> if present."],
    testCases: [
      { description: "Checks session.userId", pattern: "req\\.session\\.userId" },
      { description: "Returns 401", pattern: "status\\s*\\(\\s*401\\s*\\)" },
      { description: "Calls next()", pattern: "next\\(\\)" }
    ],
    points: 20,
    order: 142
  },
  {
    title: "Auth: Admin Middleware",
    slug: "auth-require-admin",
    description: "<p>Write middleware <code>requireAdmin</code> that returns 401 if not logged in, 403 if not admin, and calls <code>next()</code> if admin.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "rbac",
    starterJs: "// Write requireAdmin middleware\n",
    solutionJs: `function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}`,
    hints: ["Check req.user first (401).", "Then check role (403).", "Call next() if admin."],
    testCases: [
      { description: "Returns 401 if no user", pattern: "status\\s*\\(\\s*401\\s*\\)" },
      { description: "Returns 403 if not admin", pattern: "status\\s*\\(\\s*403\\s*\\)" },
      { description: "Checks role === 'admin'", pattern: "role\\s*===\\s*[\"']admin[\"']" },
      { description: "Calls next()", pattern: "next\\(\\)" }
    ],
    points: 30,
    order: 143
  },
  {
    title: "Auth: Rate Limiter",
    slug: "auth-rate-limiter",
    description: "<p>Configure an <code>express-rate-limit</code> middleware with <code>windowMs</code> of 15 minutes and <code>max</code> of 5 requests.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "rate-limiting",
    starterJs: 'const rateLimit = require("express-rate-limit");\n\n// Configure a limiter\n',
    solutionJs: `const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, try again later"
});`,
    hints: ["Pass an options object.", "windowMs in milliseconds: 15 * 60 * 1000.", "Set max: 5."],
    testCases: [
      { description: "Uses rateLimit()", pattern: "rateLimit\\(" },
      { description: "Sets windowMs", pattern: "windowMs\\s*:" },
      { description: "Uses 15 * 60 * 1000", pattern: "15\\s*\\*\\s*60\\s*\\*\\s*1000" },
      { description: "Sets max: 5", pattern: "max\\s*:\\s*5" }
    ],
    points: 25,
    order: 144
  },
  {
    title: "Auth: Generic Login Error",
    slug: "auth-generic-error",
    description: "<p>Return the SAME generic error message 'Invalid credentials' whether the email is unknown OR the password is wrong. This prevents account enumeration.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "enumeration",
    starterJs: 'app.post("/login", async (req, res) => {\n  // write handler\n});\n',
    solutionJs: `app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user || !(await bcrypt.compare(password, user.passwordHash || ""))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.userId = user._id;
  res.json({ status: "success" });
});`,
    hints: ["Use the same error message for both cases.", "Combine the check with || or a single if."],
    testCases: [
      { description: "Uses 'Invalid credentials'", expectText: "Invalid credentials" },
      { description: "Returns 401", pattern: "status\\s*\\(\\s*401\\s*\\)" },
      { description: "Checks !user or bcrypt.compare", pattern: "!user|bcrypt\\.compare" }
    ],
    points: 25,
    order: 145
  },
  {
    title: "Auth: XSS Prevention",
    slug: "auth-xss-prevention",
    description: "<p>Fix this vulnerable code: <code>el.innerHTML = userInput;</code> — use safe text insertion instead.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "xss",
    starterJs: "// Fix the XSS vulnerability\nconst el = document.querySelector('#output');\n// el.innerHTML = userInput;  <-- BAD\n",
    solutionJs: `const el = document.querySelector('#output');
el.textContent = userInput;`,
    hints: ["Use <code>textContent</code> instead of <code>innerHTML</code>.", "textContent treats input as plain text, not HTML."],
    testCases: [
      { description: "Uses textContent", pattern: "textContent" },
      { description: "Does NOT use innerHTML", pattern: "^(?!.*innerHTML).*$" }
    ],
    points: 20,
    order: 146
  },
  {
    title: "Auth: Prevent Mass Assignment",
    slug: "auth-prevent-mass-assignment",
    description: "<p>Fix this vulnerability: <code>const user = await User.create(req.body);</code> — only allow name, email, and force role to 'student'.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "mass-assignment",
    starterJs: '// Fix mass assignment\n// const user = await User.create(req.body);  <-- BAD\n',
    solutionJs: `const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  role: "student"
});`,
    hints: ["Whitelist only the fields you want.", "Hardcode role to 'student'.", "Never pass req.body directly."],
    testCases: [
      { description: "Only passes name, email, role", pattern: "name\\s*:\\s*req\\.body\\.name[\\s\\S]*email\\s*:\\s*req\\.body\\.email" },
      { description: "Hardcodes role to student", pattern: "role\\s*:\\s*[\"']student[\"']" }
    ],
    points: 25,
    order: 147
  },
  {
    title: "Auth: NoSQL Injection Prevention",
    slug: "auth-nosql-injection",
    description: "<p>Fix this vulnerability: <code>User.findOne({ email: req.body.email })</code> — an attacker could send <code>{ email: { $ne: null } }</code>. Cast to string first.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "nosql-injection",
    starterJs: '// Fix NoSQL injection\n// const user = await User.findOne({ email: req.body.email });\n',
    solutionJs: `if (typeof req.body.email !== "string") {
  return res.status(400).json({ error: "Invalid email" });
}
const user = await User.findOne({ email: String(req.body.email) });`,
    hints: ["Check <code>typeof === 'string'</code>.", "Cast with <code>String(...)</code>.", "Return 400 on invalid input."],
    testCases: [
      { description: "Checks typeof string", pattern: "typeof[^;]*===\\s*[\"']string[\"']" },
      { description: "Casts with String()", pattern: "String\\(" },
      { description: "Returns 400", pattern: "status\\s*\\(\\s*400\\s*\\)" }
    ],
    points: 30,
    order: 148
  },
  {
    title: "Auth: Logout Handler",
    slug: "auth-logout-handler",
    description: "<p>Write a logout handler that destroys the session with <code>req.session.destroy()</code> and clears the cookie.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "sessions",
    starterJs: 'app.post("/api/auth/logout", (req, res) => {\n  // destroy session and clear cookie\n});\n',
    solutionJs: `app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("kica.sid");
    res.json({ status: "success" });
  });
});`,
    hints: ["Use <code>req.session.destroy(callback)</code>.", "Call <code>res.clearCookie()</code>."],
    testCases: [
      { description: "Uses session.destroy", pattern: "session\\.destroy" },
      { description: "Clears cookie", pattern: "clearCookie" },
      { description: "Returns success", expectText: "success" }
    ],
    points: 20,
    order: 149
  }
];

async function seedAuthExercises() {
  const course = await Course.findOne({ slug: "authentication-security" });
  if (!course) {
    console.warn("⚠  Course not found: authentication-security");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of authExercises) {
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

  console.log(`   Auth exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedAuthExercises };