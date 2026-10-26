/**
 * Kelvin Ikpeni Code Academy — Authentication & Security lessons
 * Targeted seed: updates ONLY the "authentication-security" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const authLessons = [
  {
    title: "Introduction to Authentication and Security",
    contentHtml: `
      <h2>Authentication vs. Authorization</h2>
      <p>These two terms are often confused. They answer different questions:</p>
      <ul>
        <li><strong>Authentication</strong> — "Who are you?" Verifying identity (login).</li>
        <li><strong>Authorization</strong> — "What are you allowed to do?" Checking permissions (RBAC).</li>
      </ul>
      <p>Authentication comes first. You can't authorize a user until you know who they are.</p>

      <h2>Why web applications need security</h2>
      <p>A web app is exposed to the entire internet. Anyone can send any request — including attackers. Common threats:</p>
      <ul>
        <li><strong>Credential stuffing</strong> — reusing leaked passwords across sites</li>
        <li><strong>Brute-force attacks</strong> — trying millions of password combinations</li>
        <li><strong>Session hijacking</strong> — stealing a user's session cookie</li>
        <li><strong>XSS</strong> — injecting scripts into pages</li>
        <li><strong>CSRF</strong> — forging requests on behalf of a logged-in user</li>
        <li><strong>SQL/NoSQL injection</strong> — abusing database queries</li>
        <li><strong>Privilege escalation</strong> — a user gaining admin access</li>
      </ul>

      <h2>The principle of least privilege</h2>
      <p>Every user, service, and process should have the <em>minimum</em> access required to do its job. A student should not be able to delete courses. A read-only service should not be able to write to the database.</p>
      <p>This limits the damage of a compromised account or bug.</p>

      <h2>Secure application architecture</h2>
      <p>A secure app enforces checks at every layer:</p>
      <ol>
        <li><strong>Client</strong> — validation for UX (never trusted)</li>
        <li><strong>Server</strong> — validation, authentication, authorization</li>
        <li><strong>Database</strong> — schema validation, unique constraints, indexes</li>
      </ol>
      <p>Never rely on the client. An attacker can send any request.</p>

      <h2>Environment awareness</h2>
      <pre><code class="language-javascript">// Development
process.env.NODE_ENV === "development"
// Verbose errors, no HTTPS needed, dummy data

// Production
process.env.NODE_ENV === "production"
// Generic errors, HTTPS required, real secrets</code></pre>
      <p>Always gate sensitive behaviour on the environment:</p>
      <pre><code class="language-javascript">if (process.env.NODE_ENV === "production") {
  // Enable secure cookies
  // Use generic error messages
  // Require HTTPS
}</code></pre>

      <h2>A sample insecure login</h2>
      <pre><code class="language-javascript">app.post("/login", async (req, res) =&gt; {
  // BAD: plaintext password comparison
  const user = await User.findOne({ email: req.body.email });
  if (user &amp;&amp; user.password === req.body.password) {
    res.json({ ok: true, userId: user._id }); // no session, no cookie
  } else {
    res.status(401).json({ error: "User not found or wrong password" }); // leaks which
  }
});</code></pre>
      <p>Problems: plaintext password, no session, generic-vs-specific error leaking enumeration, no rate limiting, no HTTPS check, no CSRF.</p>

      <h2>Your turn</h2>
      <p>Open the login route above. List five specific security problems it has. For each, describe how you'd fix it.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Differentiate authentication from authorization",
      "Identify common web security threats",
      "Apply the principle of least privilege"
    ]
  },
  {
    title: "Password Security and Hashing",
    contentHtml: `
      <h2>Never store plaintext passwords</h2>
      <p>If your database is breached (it happens), plaintext passwords become a catastrophic leak — users reuse passwords everywhere. <strong>Always hash passwords</strong>.</p>

      <h2>Hashing vs. encryption</h2>
      <ul>
        <li><strong>Encryption</strong> — reversible with a key. You can get the original back.</li>
        <li><strong>Hashing</strong> — one-way. You can't reverse it.</li>
      </ul>
      <p>Passwords are <em>hashed</em>, not encrypted. Even you should not be able to recover a user's password.</p>

      <h2>Why not MD5 or SHA-256?</h2>
      <p>These are fast hashes — designed to compute millions per second. An attacker with a stolen database can try <em>billions</em> of password guesses per second. Fast hashes are useless for passwords.</p>

      <h2>Password hashing algorithms</h2>
      <p>Use an algorithm designed for passwords — deliberately slow and hard to parallelize:</p>
      <ul>
        <li><strong>bcrypt</strong> — battle-tested, widely used</li>
        <li><strong>scrypt</strong> — memory-hard, resistant to GPU attacks</li>
        <li><strong>Argon2id</strong> — modern, OWASP recommended</li>
      </ul>
      <p>All three are acceptable. Pick one and use it correctly.</p>

      <h2>Salting</h2>
      <p>A <strong>salt</strong> is random data added to the password before hashing. It ensures two users with the same password have different hashes, defeating rainbow tables.</p>
      <p>Good algorithms add the salt automatically — you just call the library.</p>

      <h2>bcrypt in Node.js</h2>
      <pre><code class="language-javascript">const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12;

// Hash
const hash = await bcrypt.hash("my-password", SALT_ROUNDS);
// $2a$12$...

// Verify
const ok = await bcrypt.compare("my-password", hash);
// true</code></pre>
      <p>Cost factor 12 is standard. Each increment doubles the work — 12 is ~250ms per hash, which is imperceptible to users but crippling for attackers.</p>

      <h2>Argon2id</h2>
      <pre><code class="language-javascript">const argon2 = require("argon2");

const hash = await argon2.hash("my-password", {
  type: argon2.argon2id,
  memoryCost: 65536,   // 64 MB
  timeCost: 3,
  parallelism: 1
});

const ok = await argon2.verify(hash, "my-password");</code></pre>
      <p>Memory-hard — GPU/ASIC attackers can't parallelize effectively. Argon2id is the current OWASP recommendation.</p>

      <h2>Mongoose pre-save hook</h2>
      <pre><code class="language-javascript">userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});</code></pre>
      <p>Hashing happens automatically before every save — you can't forget.</p>

      <h2>Password strength</h2>
      <ul>
        <li><strong>Minimum length</strong>: 8 characters (12+ is better)</li>
        <li><strong>No forced complexity</strong> (uppercase + symbol rules actually reduce entropy — users pick predictable patterns)</li>
        <li><strong>Check against breach lists</strong> (HaveIBeenPwned API)</li>
        <li><strong>Enforce length, not composition</strong></li>
      </ul>

      <h2>Your turn</h2>
      <p>Write a function <code>hashPassword(plain)</code> that returns a bcrypt hash with 12 rounds. Then write <code>verifyPassword(plain, hash)</code> that returns a boolean.</p>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Explain why fast hashes are unsafe for passwords",
      "Use bcrypt or Argon2id correctly",
      "Apply salting and appropriate cost factors"
    ]
  },
  {
    title: "Secure User Registration",
    contentHtml: `
      <h2>The registration flow</h2>
      <p>Registration creates a new user account. Every step needs care:</p>
      <ol>
        <li>Validate email format and password strength</li>
        <li>Check if email already exists</li>
        <li>Hash the password</li>
        <li>Create the user document</li>
        <li>Establish a session (or return a token)</li>
      </ol>

      <h2>Express route</h2>
      <pre><code class="language-javascript">app.post("/api/auth/register", async (req, res) =&gt; {
  const { name, email, password } = req.body;

  // 1. Validate
  const errors = {};
  if (!name || name.trim().length &lt; 2) errors.name = "Name is required";
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) errors.email = "Invalid email";
  if (!password || password.length &lt; 8) errors.password = "Password must be 8+ characters";

  if (Object.keys(errors).length &gt; 0) {
    return res.status(400).json({ status: "error", errors });
  }

  // 2. Check duplicate
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({
      status: "error",
      errors: { email: "Email already registered" }
    });
  }

  // 3. Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // 4. Create user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash
  });

  // 5. Establish session
  req.session.userId = user._id;

  res.status(201).json({
    status: "success",
    user: { id: user._id, name: user.name, email: user.email }
  });
});</code></pre>

      <h2>Mongoose schema with validation</h2>
      <pre><code class="language-javascript">const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    }
  },
  { timestamps: true }
);</code></pre>

      <h2>Safe error messages</h2>
      <p><strong>Never</strong> leak internal details:</p>
      <pre><code class="language-javascript">// BAD
res.status(500).json({ error: err.message, stack: err.stack });

// GOOD
res.status(500).json({ error: "Registration failed. Please try again." });</code></pre>

      <h2>Return safe user data</h2>
      <p>Never return the full user document — exclude sensitive fields:</p>
      <pre><code class="language-javascript">function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
}</code></pre>

      <h2>Rate limit registration</h2>
      <p>Attackers can spam account creation. Limit by IP:</p>
      <pre><code class="language-javascript">const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour
  max: 5,
  message: "Too many registration attempts"
});

app.post("/api/auth/register", registerLimiter, async (req, res) =&gt; {
  // ...
});</code></pre>

      <h2>Email verification</h2>
      <p>For production apps, require email verification before full access:</p>
      <ol>
        <li>Create user with <code>verified: false</code></li>
        <li>Send verification email with a signed token</li>
        <li>User clicks link → server verifies and sets <code>verified: true</code></li>
        <li>Block login (or limit features) until verified</li>
      </ol>

      <h2>Your turn</h2>
      <p>Write a registration handler that:</p>
      <ul>
        <li>Validates name, email, password</li>
        <li>Checks for duplicates</li>
        <li>Hashes the password with bcrypt</li>
        <li>Returns a safe user object (no passwordHash)</li>
        <li>Uses safe error messages</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Validate registration input server-side",
      "Prevent duplicate accounts",
      "Return safe user data without leaking secrets"
    ]
  },
  {
    title: "Login, Logout, and Account Access",
    contentHtml: `
      <h2>The login flow</h2>
      <ol>
        <li>Validate email and password are present</li>
        <li>Find user by email (select +passwordHash)</li>
        <li>Compare password with the stored hash</li>
        <li>Regenerate session ID (prevent fixation)</li>
        <li>Set session.userId</li>
        <li>Return success + safe user data</li>
      </ol>

      <h2>Login route</h2>
      <pre><code class="language-javascript">app.post("/api/auth/login", async (req, res) =&gt; {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.regenerate((err) =&gt; {
    if (err) return res.status(500).json({ error: "Login failed" });

    req.session.userId = user._id;
    user.lastLoginAt = new Date();
    user.save();

    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});</code></pre>

      <h2>Why generic error messages?</h2>
      <p>If you return "User not found" for unknown emails and "Wrong password" for known ones, attackers can enumerate valid emails. Use the same message — "Invalid credentials" — for both.</p>
      <p>Same for registration: return success even if the email exists when checking password reset — never reveal account existence.</p>

      <h2>Logout route</h2>
      <pre><code class="language-javascript">app.post("/api/auth/logout", (req, res) =&gt; {
  req.session.destroy((err) =&gt; {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("kica.sid", { path: "/" });
    res.json({ status: "success" });
  });
});</code></pre>

      <h2>Login attempt monitoring</h2>
      <p>Track failed attempts per account to slow brute-force:</p>
      <pre><code class="language-javascript">const attempts = {};

async function checkRateLimit(email) {
  const record = attempts[email] || { count: 0, firstAt: Date.now() };

  if (Date.now() - record.firstAt &gt; 15 * 60 * 1000) {
    record.count = 0;
    record.firstAt = Date.now();
  }

  if (record.count &gt;= 5) {
    throw new Error("Too many attempts. Try again in 15 minutes.");
  }

  record.count++;
  attempts[email] = record;
}</code></pre>

      <h2>Account recovery</h2>
      <p>When a user forgets their password:</p>
      <ol>
        <li>User enters email on "forgot password" page</li>
        <li>Server generates a random one-time token</li>
        <li>Token is hashed and stored with expiry (e.g., 1 hour)</li>
        <li>Plaintext token is emailed to the user</li>
        <li>User clicks link → submits new password</li>
        <li>Server hashes the submitted token, looks it up, validates expiry and unused status</li>
        <li>Server hashes the new password, saves, invalidates the token</li>
      </ol>
      <p>Always respond "If that email exists, we've sent instructions" — do not confirm whether the email is registered.</p>

      <h2>Password reset token model</h2>
      <pre><code class="language-javascript">const resetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  usedAt: { type: Date, default: null }
});

resetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });</code></pre>

      <h2>Your turn</h2>
      <p>Implement login with:</p>
      <ul>
        <li>Generic "Invalid credentials" for both wrong email and wrong password</li>
        <li>Session regeneration via <code>req.session.regenerate()</code></li>
        <li>A <code>lastLoginAt</code> update</li>
        <li>A logout route that destroys the session</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Verify passwords without leaking account existence",
      "Prevent session fixation",
      "Implement logout and account recovery safely"
    ]
  },
  {
    title: "Sessions and Secure Cookies",
    contentHtml: `
      <h2>How sessions work</h2>
      <p>HTTP is stateless. To remember a logged-in user, the server issues a <strong>session</strong>:</p>
      <ol>
        <li>User logs in → server creates a session record</li>
        <li>Server sends a signed session ID cookie to the browser</li>
        <li>Browser sends the cookie on every subsequent request</li>
        <li>Server looks up the session ID → identifies the user</li>
      </ol>

      <h2>Session IDs must be unguessable</h2>
      <p>Session IDs should be 32+ bytes of cryptographically random data. Libraries like <code>express-session</code> do this for you.</p>

      <h2>Server-side storage</h2>
      <p>The session data lives on the server, not in the cookie. The cookie only contains the session ID.</p>
      <pre><code class="language-javascript">const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
  name: "kica.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 7 * 24 * 60 * 60
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
  }
}));</code></pre>

      <h2>Cookie flags explained</h2>
      <ul>
        <li><strong>httpOnly</strong> — JavaScript cannot read it. Blocks XSS-based session theft.</li>
        <li><strong>secure</strong> — sent only over HTTPS. Blocks eavesdropping on HTTP.</li>
        <li><strong>sameSite</strong> — controls cross-site sending:
          <ul>
            <li><code>strict</code> — most secure, but breaks some login flows</li>
            <li><code>lax</code> — balanced (recommended)</li>
            <li><code>none</code> — cross-site, requires secure</li>
          </ul>
        </li>
      </ul>

      <h2>Session fixation</h2>
      <p>An attacker who can set a session cookie before login can hijack the session after login. Always regenerate the session ID on login:</p>
      <pre><code class="language-javascript">req.session.regenerate((err) =&gt; {
  if (err) return res.status(500).json({ error: "Login failed" });
  req.session.userId = user._id;
  res.json({ status: "success" });
});</code></pre>

      <h2>Session expiration</h2>
      <p>Two mechanisms:</p>
      <ul>
        <li><strong>TTL</strong> — session dies after maxAge</li>
        <li><strong>Rolling</strong> — session extends on every request (user stays logged in while active)</li>
      </ul>
      <pre><code class="language-javascript">{
  rolling: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}</code></pre>

      <h2>Invalidation</h2>
      <pre><code class="language-javascript">req.session.destroy((err) =&gt; {
  if (err) return res.status(500).json({ error: "Logout failed" });
  res.clearCookie("kica.sid");
  res.json({ status: "success" });
});</code></pre>

      <h2>Never use in-memory sessions in production</h2>
      <p>The default MemoryStore leaks memory, doesn't scale, and loses all sessions when the server restarts. Always use a persistent store — MongoDB, Redis, PostgreSQL, etc.</p>

      <h2>Logout everywhere</h2>
      <p>To invalidate all sessions for a user (password change, forced logout):</p>
      <pre><code class="language-javascript">app.post("/api/auth/logout-all", requireAuth, async (req, res) =&gt; {
  const sessions = await Session.find({
    session: { $regex: req.user._id }
  });

  await Session.deleteMany({ _id: { $in: sessions.map(s =&gt; s._id) } });

  req.session.destroy(() =&gt; {
    res.json({ status: "success", message: "All sessions terminated" });
  });
});</code></pre>

      <h2>Your turn</h2>
      <p>Configure <code>express-session</code> with:</p>
      <ul>
        <li>A Mongo store (persistence)</li>
        <li>HttpOnly cookies</li>
        <li>Secure in production</li>
        <li>7-day max age with rolling</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Explain how sessions track logged-in users",
      "Configure secure cookie flags",
      "Prevent session fixation with regeneration"
    ]
  },
  {
    title: "JSON Web Tokens (JWT)",
    contentHtml: `
      <h2>What is a JWT?</h2>
      <p>A <strong>JWT</strong> (JSON Web Token) is a signed, self-contained token. Unlike sessions (server stores state), JWTs encode the user's identity <em>inside</em> the token itself.</p>

      <h2>Structure</h2>
      <p>A JWT looks like <code>xxxxx.yyyyy.zzzzz</code> — three parts separated by dots:</p>
      <ol>
        <li><strong>Header</strong> — algorithm and type: <code>{"alg": "HS256", "typ": "JWT"}</code></li>
        <li><strong>Payload</strong> — claims: <code>{"userId": "abc", "iat": 1700000000}</code></li>
        <li><strong>Signature</strong> — <code>HMAC(header + payload, secret)</code></li>
      </ol>
      <p>The payload is <strong>base64-encoded, NOT encrypted</strong> — anyone can read it. The signature ensures it hasn't been tampered with.</p>

      <h2>Creating a JWT</h2>
      <pre><code class="language-javascript">const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);</code></pre>

      <h2>Verifying a JWT</h2>
      <pre><code class="language-javascript">app.get("/api/profile", (req, res) =&gt; {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: decoded.userId, role: decoded.role });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});</code></pre>

      <h2>Secrets and signing keys</h2>
      <ul>
        <li><strong>Never</strong> commit JWT_SECRET to Git</li>
        <li>Use at least 32 random bytes (256 bits)</li>
        <li>Rotate secrets if they leak (invalidates all tokens)</li>
        <li>Use different secrets per environment (dev vs prod)</li>
      </ul>
      <pre><code class="language-bash">node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"</code></pre>

      <h2>Expiration</h2>
      <pre><code class="language-javascript">jwt.sign(payload, secret, { expiresIn: "15m" });</code></pre>
      <p>Verify automatically checks expiry. If expired, <code>jwt.verify</code> throws <code>TokenExpiredError</code>.</p>

      <h2>Access tokens vs refresh tokens</h2>
      <ul>
        <li><strong>Access token</strong> — short-lived (15 min), used for API calls</li>
        <li><strong>Refresh token</strong> — long-lived (7-30 days), only used to get new access tokens</li>
      </ul>
      <p>This limits the damage of a stolen access token.</p>

      <h2>Storage</h2>
      <p>Where you store a JWT matters:</p>
      <ul>
        <li><strong>localStorage</strong> — convenient but vulnerable to XSS theft</li>
        <li><strong>HttpOnly cookie</strong> — safer (JS can't read it), but requires CSRF protection</li>
        <li><strong>In-memory (JS variable)</strong> — safest for XSS, lost on page reload</li>
      </ul>
      <p><strong>Recommended</strong>: HttpOnly cookie + SameSite=lax for most apps.</p>

      <h2>Revocation</h2>
      <p>JWTs are stateless — you can't revoke a token like a session. Options:</p>
      <ul>
        <li>Short expiry (15 min) + refresh tokens</li>
        <li>Blocklist of revoked token IDs</li>
        <li>Token version: include <code>tokenVersion</code> in payload; increment on password change → old tokens invalid</li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li><strong>Not verifying the signature</strong> — using <code>jwt.decode</code> instead of <code>jwt.verify</code></li>
        <li><strong>Trusting <code>alg: none</code></strong> — always verify with a specific algorithm</li>
        <li><strong>Long expiry without refresh</strong> — one stolen token = long-term access</li>
        <li><strong>Storing sensitive data in payload</strong> — payload is readable by anyone</li>
      </ul>

      <h2>When to use JWT vs sessions</h2>
      <ul>
        <li><strong>JWT</strong> — stateless APIs, mobile apps, microservices</li>
        <li><strong>Sessions</strong> — server-rendered apps, when you need revocation</li>
      </ul>
      <p>For a single-server web app, sessions are simpler and more secure.</p>

      <h2>Your turn</h2>
      <p>Write a middleware that:</p>
      <ul>
        <li>Reads a JWT from <code>Authorization: Bearer &lt;token&gt;</code></li>
        <li>Verifies it against <code>JWT_SECRET</code></li>
        <li>Attaches the decoded payload to <code>req.user</code></li>
        <li>Returns 401 on any failure</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Understand JWT structure and signing",
      "Verify tokens and manage expiry",
      "Choose between JWT and session auth"
    ]
  },
  {
    title: "Authorization and Role-Based Access Control",
    contentHtml: `
      <h2>Authentication ≠ authorization</h2>
      <p>Authentication confirms <em>who you are</em>. Authorization confirms <em>what you can do</em>. A logged-in student should not be able to delete courses.</p>

      <h2>Roles</h2>
      <ul>
        <li><strong>student</strong> — read courses, submit exercises, view own data</li>
        <li><strong>instructor</strong> — create courses, grade submissions</li>
        <li><strong>admin</strong> — everything, plus user management</li>
      </ul>
      <p>Start with <code>student</code> and <code>admin</code>. Add more only when needed.</p>

      <h2>Authentication middleware</h2>
      <pre><code class="language-javascript">function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}</code></pre>
      <p>Populate <code>req.user</code> from the session:</p>
      <pre><code class="language-javascript">async function loadUser(req, res, next) {
  req.user = null;
  if (req.session &amp;&amp; req.session.userId) {
    try {
      req.user = await User.findById(req.session.userId);
    } catch (err) {
      req.user = null;
    }
  }
  next();
}

app.use(loadUser);
app.use(requireAuth);</code></pre>

      <h2>Admin middleware</h2>
      <pre><code class="language-javascript">function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

app.delete("/api/courses/:id", requireAuth, requireAdmin, async (req, res) =&gt; {
  // Only admins reach here
});</code></pre>
      <p>Note the codes: <strong>401</strong> = not logged in. <strong>403</strong> = logged in but not permitted.</p>

      <h2>Resource ownership</h2>
      <pre><code class="language-javascript">app.patch("/api/posts/:id", requireAuth, async (req, res) =&gt; {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ error: "Not found" });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Not your post" });
  }

  Object.assign(post, req.body);
  await post.save();
  res.json({ status: "success", data: post });
});</code></pre>

      <h2>Preventing privilege escalation</h2>
      <p>Never let a user set their own role:</p>
      <pre><code class="language-javascript">// BAD
app.patch("/api/users/:id", requireAuth, async (req, res) =&gt; {
  Object.assign(req.user, req.body);
  await req.user.save();
});</code></pre>
      <p>Fix: whitelist allowed fields:</p>
      <pre><code class="language-javascript">const allowed = ["name", "bio", "avatarUrl"];
for (const key of allowed) {
  if (req.body[key] !== undefined) req.user[key] = req.body[key];
}</code></pre>

      <h2>Admin actions that require re-auth</h2>
      <pre><code class="language-javascript">app.post("/api/account/delete", requireAuth, async (req, res) =&gt; {
  const ok = await bcrypt.compare(req.body.password, req.user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Wrong password" });
  await User.deleteOne({ _id: req.user._id });
  res.json({ status: "success" });
});</code></pre>

      <h2>Protecting admin pages</h2>
      <p>The server must enforce authorization — hiding the admin link in the frontend is NOT security:</p>
      <pre><code class="language-javascript">app.get("/admin-dashboard.html", requireAuth, requireAdmin, (req, res) =&gt; {
  res.sendFile(path.join(__dirname, "public/admin-dashboard.html"));
});</code></pre>

      <h2>Your turn</h2>
      <p>Write middleware that:</p>
      <ul>
        <li>Returns 401 if the user is not logged in</li>
        <li>Returns 403 if the user is logged in but not an admin</li>
        <li>Calls <code>next()</code> only if both pass</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Differentiate 401 from 403",
      "Write authentication and role middleware",
      "Enforce resource ownership and prevent privilege escalation"
    ]
  },
  {
    title: "CSRF, CORS, and Browser Security",
    contentHtml: `
      <h2>Cross-Site Request Forgery (CSRF)</h2>
      <p>An attacker's site tricks a logged-in user's browser into making a request to your server — using the user's cookies. Example:</p>
      <pre><code class="language-html">&lt;!-- On attacker.com --&gt;
&lt;img src="https://yourapp.com/api/users/me/delete"&gt;</code></pre>
      <p>If the user is logged in on yourapp.com, their browser sends the delete request with their session cookie. CSRF protection prevents this.</p>

      <h2>SameSite cookies</h2>
      <p>The most effective mitigation. <code>sameSite: "lax"</code> prevents cookies from being sent on cross-site requests:</p>
      <pre><code class="language-javascript">cookie: {
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production"
}</code></pre>

      <h2>CSRF tokens</h2>
      <p>For extra safety, include a token in forms:</p>
      <pre><code class="language-javascript">app.use((req, res, next) =&gt; {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
});

function requireCsrf(req, res, next) {
  if (req.method === "GET" || req.method === "HEAD") return next();

  const token = req.headers["x-csrf-token"] || req.body._csrf;
  if (token !== req.session.csrfToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next();
}</code></pre>

      <h2>Origin checks</h2>
      <pre><code class="language-javascript">app.use((req, res, next) =&gt; {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = req.headers.origin;
  const allowed = process.env.BASE_URL;

  if (origin &amp;&amp; origin !== allowed) {
    return res.status(403).json({ error: "Cross-origin request blocked" });
  }
  next();
});</code></pre>

      <h2>CORS</h2>
      <pre><code class="language-javascript">const cors = require("cors");

app.use(cors({
  origin: "https://yourapp.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));</code></pre>
      <p><strong>Never</strong> use <code>origin: "*"</code> with credentials.</p>

      <h2>Same-Origin Policy</h2>
      <p>Browsers enforce Same-Origin Policy: JavaScript at <code>a.com</code> cannot read responses from <code>b.com</code>. CORS headers relax this deliberately.</p>

      <h2>Why we avoid CORS entirely</h2>
      <p>This platform serves frontend from the same Express server. Same-origin means:</p>
      <ul>
        <li>No CORS headers needed</li>
        <li>Cookies work without cross-site complexity</li>
        <li>Fewer attack surfaces</li>
      </ul>

      <h2>Your turn</h2>
      <p>Configure:</p>
      <ul>
        <li>SameSite: lax cookies</li>
        <li>Origin verification on non-GET routes</li>
        <li>No CORS wildcard</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Explain CSRF and how to prevent it",
      "Use SameSite cookies and CSRF tokens",
      "Configure CORS safely"
    ]
  },
  {
    title: "Rate Limiting and Brute-Force Protection",
    contentHtml: `
      <h2>Why rate limiting matters</h2>
      <p>Attackers can guess passwords, enumerate users, exhaust resources, or spam OTPs. Rate limiting throttles these attacks.</p>

      <h2>express-rate-limit</h2>
      <pre><code class="language-javascript">const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, try again later" }
});

app.use("/api/", limiter);</code></pre>

      <h2>Tighter limits on sensitive routes</h2>
      <pre><code class="language-javascript">const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again in 15 minutes."
});

app.post("/api/auth/login", authLimiter, loginHandler);
app.post("/api/auth/register", authLimiter, registerHandler);</code></pre>

      <h2>HTTP 429 Too Many Requests</h2>
      <pre><code class="language-javascript">rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) =&gt; {
    res.status(429).json({
      error: "Too many requests",
      retryAfter: Math.ceil(res.getHeader("Retry-After") || 900)
    });
  }
});</code></pre>

      <h2>IP vs account-based limits</h2>
      <p><strong>IP-based</strong> — limits per IP. Bypassed by proxies.</p>
      <p><strong>Account-based</strong> — limits per email. Resistant to botnets, but attackers can lock out real users.</p>
      <p><strong>Combine both</strong>:</p>
      <pre><code class="language-javascript">async function checkLoginAttempts(email, ip) {
  const byEmail = await Attempts.countDocuments({
    email,
    createdAt: { $gt: new Date(Date.now() - 15 * 60 * 1000) }
  });
  const byIp = await Attempts.countDocuments({
    ip,
    createdAt: { $gt: new Date(Date.now() - 15 * 60 * 1000) }
  });

  if (byEmail &gt;= 5 || byIp &gt;= 20) {
    throw new Error("Too many attempts");
  }
}</code></pre>

      <h2>Login brute-force prevention</h2>
      <pre><code class="language-javascript">app.post("/api/auth/login", authLimiter, async (req, res) =&gt; {
  const { email, password } = req.body;

  await Attempts.create({ email, ip: req.ip });

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  await Attempts.deleteMany({ email });

  req.session.userId = user._id;
  res.json({ status: "success" });
});</code></pre>

      <h2>Distributed deployments</h2>
      <p>In-memory rate limiters don't work across multiple servers. Use Redis:</p>
      <pre><code class="language-javascript">const RedisStore = require("rate-limit-redis");
const { createClient } = require("redis");

const client = createClient({ url: process.env.REDIS_URL });
await client.connect();

const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) =&gt; client.sendCommand(args) }),
  windowMs: 15 * 60 * 1000,
  max: 5
});</code></pre>

      <h2>Password reset limits</h2>
      <pre><code class="language-javascript">const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many reset requests. Try again later."
});

app.post("/api/auth/forgot-password", resetLimiter, forgotPasswordHandler);</code></pre>

      <h2>Your turn</h2>
      <p>Add rate limiting to:</p>
      <ul>
        <li><code>/api/auth/login</code> — 5 per 15 min</li>
        <li><code>/api/auth/register</code> — 5 per hour</li>
        <li><code>/api/auth/forgot-password</code> — 3 per hour</li>
        <li>All other API routes — 100 per minute</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Use express-rate-limit for sensitive endpoints",
      "Combine IP-based and account-based limits",
      "Handle distributed rate limiting with Redis"
    ]
  },
  {
    title: "Input Validation and Common Web Attacks",
    contentHtml: `
      <h2>Why input validation matters</h2>
      <p>Every byte of user input is potentially hostile. Failing to validate means crashes, XSS, NoSQL/SQL injection, and privilege escalation.</p>

      <h2>Cross-Site Scripting (XSS)</h2>
      <p>Attackers inject JavaScript into your pages. It runs in victims' browsers with full access to cookies and the DOM.</p>
      <pre><code class="language-javascript">// BAD — user content inserted as HTML
el.innerHTML = \`&lt;p&gt;\${userInput}&lt;/p&gt;\`;

// GOOD — user content as text
el.textContent = userInput;</code></pre>
      <p>Rules:</p>
      <ul>
        <li>Use <code>textContent</code>, not <code>innerHTML</code> for user-provided data</li>
        <li>If you must use HTML, sanitize with a library like <code>DOMPurify</code></li>
        <li>Set <code>Content-Security-Policy</code> headers (helmet does this)</li>
      </ul>

      <h2>NoSQL injection</h2>
      <pre><code class="language-javascript">// BAD — user can send { email: { $ne: null } } to log in as anyone
const user = await User.findOne({ email: req.body.email });

// SAFER — cast to string, validate format
if (typeof req.body.email !== "string") {
  return res.status(400).json({ error: "Invalid email" });
}
const user = await User.findOne({ email: String(req.body.email) });</code></pre>
      <p>Cast inputs to expected types to prevent operator injection.</p>

      <h2>Mass assignment</h2>
      <pre><code class="language-javascript">// BAD
const user = await User.create(req.body);

// SAFER — pick allowed fields
const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  role: "student"
});</code></pre>

      <h2>File upload security</h2>
      <pre><code class="language-javascript">const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =&gt; {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  }
});</code></pre>

      <h2>Safe error handling</h2>
      <pre><code class="language-javascript">// BAD
res.status(500).json({ error: err.message, stack: err.stack });

// GOOD
res.status(500).json({ error: "Internal server error" });</code></pre>

      <h2>Your turn</h2>
      <p>Given a vulnerable code snippet with XSS and mass assignment, write the fixed version.</p>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Prevent XSS with textContent and CSP",
      "Defend against NoSQL injection",
      "Avoid mass assignment and unsafe uploads"
    ]
  },
  {
    title: "OWASP Top 10 and Secure Development",
    contentHtml: `
      <h2>What is OWASP?</h2>
      <p><strong>OWASP</strong> publishes the <strong>Top 10</strong> — the most critical web application security risks, updated every few years.</p>

      <h2>The 2021 OWASP Top 10</h2>
      <ol>
        <li><strong>Broken Access Control</strong></li>
        <li><strong>Cryptographic Failures</strong></li>
        <li><strong>Injection</strong></li>
        <li><strong>Insecure Design</strong></li>
        <li><strong>Security Misconfiguration</strong></li>
        <li><strong>Vulnerable and Outdated Components</strong></li>
        <li><strong>Identification and Authentication Failures</strong></li>
        <li><strong>Software and Data Integrity Failures</strong></li>
        <li><strong>Security Logging and Monitoring Failures</strong></li>
        <li><strong>Server-Side Request Forgery (SSRF)</strong></li>
      </ol>

      <h2>A01 — Broken Access Control</h2>
      <p><strong>Example</strong>: A user visits <code>/api/users/123</code> and changes it to <code>/api/users/124</code> — and can see another user's data.</p>
      <pre><code class="language-javascript">app.get("/api/users/:id", requireAuth, async (req, res) =&gt; {
  const requestedId = req.params.id;
  if (requestedId !== req.user._id.toString() &amp;&amp; req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const user = await User.findById(requestedId);
  res.json({ status: "success", data: user });
});</code></pre>

      <h2>A02 — Cryptographic Failures</h2>
      <p><strong>Fix</strong>: bcrypt/Argon2 for passwords, HTTPS, encryption at rest.</p>

      <h2>A03 — Injection</h2>
      <p><strong>Fix</strong>: validate input, encode output, use prepared queries, sanitize HTML.</p>

      <h2>A04 — Insecure Design</h2>
      <p><strong>Example</strong>: Password reset uses a 4-digit code with no rate limit.</p>
      <p><strong>Fix</strong>: cryptographically random tokens (32+ bytes), expire in 1 hour, rate-limit resets.</p>

      <h2>A05 — Security Misconfiguration</h2>
      <p><strong>Fix</strong>: deny-by-default, change defaults, disable stack traces in production, restrict CORS.</p>

      <h2>A06 — Vulnerable Components</h2>
      <pre><code class="language-bash">npm audit
npm audit fix</code></pre>

      <h2>A07 — Authentication Failures</h2>
      <p><strong>Fix</strong>: strong password policy, rate limiting, secure hashing, session rotation.</p>

      <h2>A08 — Data Integrity Failures</h2>
      <pre><code class="language-html">&lt;script src="https://cdn.example.com/lib.js"
        integrity="sha384-..."
        crossorigin="anonymous"&gt;&lt;/script&gt;</code></pre>

      <h2>A09 — Logging and Monitoring Failures</h2>
      <pre><code class="language-javascript">app.post("/api/auth/login", async (req, res) =&gt; {
  const ok = await verifyCredentials(req.body);
  if (!ok) {
    logger.warn("Failed login", { email: req.body.email, ip: req.ip });
    return res.status(401).json({ error: "Invalid credentials" });
  }
  logger.info("Successful login", { userId: user._id, ip: req.ip });
});</code></pre>

      <h2>A10 — SSRF</h2>
      <pre><code class="language-javascript">const ALLOWED = ["api.example.com"];
const url = new URL(req.body.url);
if (!ALLOWED.includes(url.hostname)) {
  return res.status(400).json({ error: "URL not allowed" });
}</code></pre>

      <h2>Secure development checklist</h2>
      <ul>
        <li>HTTPS enforced everywhere</li>
        <li>Helmet enabled for security headers</li>
        <li>All user input validated server-side</li>
        <li>All output HTML-encoded</li>
        <li>Passwords hashed (bcrypt/Argon2)</li>
        <li>Rate limiting on auth endpoints</li>
        <li>Sessions regenerated on login</li>
        <li>Cookies HttpOnly, Secure, SameSite=lax</li>
        <li>Authorization checked on every request</li>
        <li>Errors logged, not leaked to clients</li>
        <li>Dependencies audited weekly</li>
        <li>Backups encrypted and tested</li>
      </ul>

      <h2>Your turn</h2>
      <p>Run <code>npm audit</code> on your project. Identify any vulnerabilities. If found, use <code>npm audit fix</code> or update the package.</p>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Map vulnerabilities to the OWASP Top 10",
      "Fix common access control and injection flaws",
      "Apply a security checklist to your project"
    ]
  },
  {
    title: "Security Testing and Deployment",
    contentHtml: `
      <h2>Why test security?</h2>
      <p>Manual security review is slow and error-prone. Automated tests catch regressions: if someone accidentally removes an authorization check, a test fails immediately.</p>

      <h2>Types of security tests</h2>
      <ul>
        <li><strong>Unit</strong> — test individual functions</li>
        <li><strong>Integration</strong> — test routes with real middleware</li>
        <li><strong>E2E</strong> — test the full flow in a browser</li>
        <li><strong>Penetration</strong> — simulated attacks</li>
      </ul>

      <h2>Test authentication failures</h2>
      <pre><code class="language-javascript">const { test } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../server");

test("GET /api/profile returns 401 when not logged in", async () =&gt; {
  const res = await request(app).get("/api/profile");
  assert.strictEqual(res.status, 401);
});

test("Login with wrong password returns 401", async () =&gt; {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "student@kica.dev", password: "wrong" });
  assert.strictEqual(res.status, 401);
});

test("Valid login returns 200 with safe user data", async () =&gt; {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "student@kica.dev", password: "StudentPass123!" });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.user.passwordHash, undefined);
});</code></pre>

      <h2>Test authorization</h2>
      <pre><code class="language-javascript">test("Non-admin cannot access admin routes", async () =&gt; {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "student@kica.dev", password: "StudentPass123!" });

  const cookie = login.headers["set-cookie"];

  const res = await request(app)
    .get("/api/admin/users")
    .set("Cookie", cookie);

  assert.strictEqual(res.status, 403);
});</code></pre>

      <h2>Test password hashing</h2>
      <pre><code class="language-javascript">const bcrypt = require("bcryptjs");

test("Passwords are never stored in plaintext", async () =&gt; {
  const user = await User.findOne({ email: "student@kica.dev" }).select("+passwordHash");
  assert.notStrictEqual(user.passwordHash, "StudentPass123!");
  assert.ok(user.passwordHash.startsWith("$2a$12$"));
});</code></pre>

      <h2>Environment variables and secrets</h2>
      <ul>
        <li><strong>Never</strong> commit secrets to Git</li>
        <li>Use <code>.env</code> locally (gitignored)</li>
        <li>Use platform env vars in production</li>
        <li>Rotate secrets if a breach is suspected</li>
        <li>Use <code>.env.example</code> to document required vars</li>
      </ul>
      <pre><code class="language-bash"># .gitignore
.env
.env.*
!.env.example</code></pre>

      <h2>HTTPS</h2>
      <p>In production, always serve over HTTPS. On Render, this is automatic.</p>
      <pre><code class="language-javascript">cookie: {
  secure: process.env.NODE_ENV === "production"
}</code></pre>

      <h2>Security headers</h2>
      <pre><code class="language-javascript">const helmet = require("helmet");
app.use(helmet());</code></pre>
      <p>Helmet sets 11+ security headers automatically.</p>

      <h2>Dependency auditing</h2>
      <pre><code class="language-bash">npm audit
npm audit fix
npm outdated</code></pre>

      <h2>Logging</h2>
      <pre><code class="language-javascript">logger.info("Login success", { userId: user._id, ip: req.ip });
logger.warn("Login failed", { email: req.body.email, ip: req.ip });
logger.error("Unexpected error", { err: err.message, path: req.path });
// NEVER log passwords, tokens, or session IDs
</code></pre>

      <h2>Production checklist</h2>
      <ul>
        <li>NODE_ENV=production</li>
        <li>HTTPS enforced</li>
        <li>COOKIE_SECURE=true</li>
        <li>trust proxy set</li>
        <li>Helmet enabled</li>
        <li>Rate limiting enabled</li>
        <li>Sessions in a persistent store</li>
        <li>Secrets in env vars, not code</li>
        <li>npm audit clean (no high/critical)</li>
        <li>Logging configured</li>
        <li>Error messages generic to clients</li>
        <li>Health check endpoint</li>
      </ul>

      <h2>Your turn</h2>
      <p>Write tests for:</p>
      <ul>
        <li>Unauthenticated request to a protected route returns 401</li>
        <li>Wrong password returns 401</li>
        <li>Valid login returns a cookie</li>
        <li>Non-admin user gets 403 on admin routes</li>
        <li>Password hash is not plaintext</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Write security-focused automated tests",
      "Manage env vars and secrets safely",
      "Configure HTTPS, headers, and rate limits for production"
    ]
  },
  {
    title: "Practical Project: Complete Authentication System",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a complete authentication and authorization system from scratch using everything from the course.</p>

      <h2>Required features</h2>
      <ol>
        <li>User registration with validation</li>
        <li>Login with rate limiting</li>
        <li>Session-based authentication (or JWT)</li>
        <li>Password hashing with bcrypt</li>
        <li>Logout destroys session</li>
        <li>Role-based access control (student/admin)</li>
        <li>Protected user profile route</li>
        <li>Protected admin routes</li>
        <li>Input validation on all writes</li>
        <li>Rate limiting on auth endpoints</li>
        <li>Secure cookies (HttpOnly, Secure, SameSite)</li>
        <li>Security headers via helmet</li>
        <li>Environment-based secrets</li>
        <li>Automated tests for successful and rejected access</li>
      </ol>

      <h2>Suggested structure</h2>
      <pre><code>auth-project/
├── config/
│   ├── db.js
│   └── session.js
├── models/
│   └── User.js
├── middleware/
│   ├── auth.js
│   └── rateLimit.js
├── controllers/
│   └── authController.js
├── routes/
│   ├── authRoutes.js
│   └── adminRoutes.js
├── tests/
│   └── auth.test.js
├── .env.example
└── server.js</code></pre>

      <h2>Acceptance criteria</h2>
      <ul>
        <li>✅ Unauthenticated users cannot access <code>/api/profile</code> (returns 401)</li>
        <li>✅ Authenticated users can access <code>/api/profile</code></li>
        <li>✅ Only admins can access <code>/api/admin/users</code></li>
        <li>✅ Non-admin users get 403 on admin routes</li>
        <li>✅ Passwords are stored as bcrypt hashes, never plaintext</li>
        <li>✅ Wrong passwords return 401 with "Invalid credentials"</li>
        <li>✅ Registering with an existing email returns 409</li>
        <li>✅ Login rate limiting blocks after 5 attempts</li>
        <li>✅ Cookies are HttpOnly, Secure (in prod), SameSite=lax</li>
        <li>✅ Session is regenerated on login</li>
        <li>✅ Logout destroys session and clears cookie</li>
        <li>✅ All error messages to clients are safe (no stack traces)</li>
        <li>✅ At least 5 automated tests pass</li>
      </ul>

      <h2>Starter: models/User.js</h2>
      <pre><code class="language-javascript">const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);</code></pre>

      <h2>Your turn</h2>
      <p>Complete the implementation. Test every acceptance criterion. Submit when all pass.</p>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Build a complete auth system",
      "Test authentication and authorization",
      "Ship a production-ready feature"
    ]
  }
];

async function seedAuthLessons() {
  const course = await Course.findOne({ slug: "authentication-security" });
  if (!course) {
    console.warn("⚠  Course not found: authentication-security");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < authLessons.length; i++) {
    const l = authLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: authLessons.length } }
  );

  console.log(`   Auth & Security lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedAuthLessons };