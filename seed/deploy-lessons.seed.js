/**
 * Kelvin Ikpeni Code Academy — Deploying to Render lessons
 * Targeted seed: updates ONLY the "deploying-to-render" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const deployLessons = [
  {
    title: "Introduction to Cloud Deployment",
    contentHtml: `
      <h2>What is cloud deployment?</h2>
      <p>Cloud deployment means moving your application from your local machine to a remote server that anyone on the internet can reach. Instead of <code>http://localhost:3000</code>, your app is at <code>https://yourapp.com</code> or <code>https://yourapp.onrender.com</code>.</p>
      <p>You don't manage the underlying hardware — the platform handles servers, networking, TLS certificates, and scaling.</p>

      <h2>How Render web services work</h2>
      <p>Render is a Platform-as-a-Service (PaaS). When you connect a GitHub repository, Render:</p>
      <ol>
        <li>Clones your repo</li>
        <li>Runs your build command (<code>npm install</code>)</li>
        <li>Runs your start command (<code>npm start</code>)</li>
        <li>Assigns a public URL with automatic HTTPS</li>
        <li>Monitors your app and restarts it if it crashes</li>
      </ol>

      <h2>Local development vs production</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Aspect</th>
          <th style="text-align:left;padding:8px;">Local</th>
          <th style="text-align:left;padding:8px;">Production</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Port</td>
          <td style="padding:8px;">Fixed (3000)</td>
          <td style="padding:8px;"><code>process.env.PORT</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Secrets</td>
          <td style="padding:8px;"><code>.env</code> file</td>
          <td style="padding:8px;">Platform dashboard</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Database</td>
          <td style="padding:8px;">Local MongoDB</td>
          <td style="padding:8px;">MongoDB Atlas (cloud)</td>
        </tr>
        <tr>
          <td style="padding:8px;">HTTPS</td>
          <td style="padding:8px;">Optional</td>
          <td style="padding:8px;">Required</td>
        </tr>
      </table>

      <h2>Static sites vs dynamic web services</h2>
      <ul>
        <li><strong>Static site</strong> — HTML/CSS/JS files served as-is. No server logic. Cheaper and faster.</li>
        <li><strong>Dynamic web service</strong> — runs Node.js (or another runtime) to handle requests, DB queries, auth, etc. This is what we're deploying.</li>
      </ul>

      <h2>GitHub repositories and deployment workflows</h2>
      <p>Render deploys from a GitHub repo. The workflow is:</p>
      <ol>
        <li>Push code to GitHub</li>
        <li>Render detects the new commit</li>
        <li>Rebuilds and redeploys automatically</li>
      </ol>
      <p>Your repo is the source of truth. Never edit files on the server — always push to Git.</p>

      <h2>Free vs paid tiers</h2>
      <ul>
        <li><strong>Free</strong> — 512 MB RAM, spins down after 15 min inactivity, ~30-60s cold start</li>
        <li><strong>Starter ($7/mo)</strong> — always-on, faster, more resources</li>
        <li><strong>Standard+</strong> — persistent disks, autoscaling, more RAM</li>
      </ul>
      <p>Free tier is perfect for learning. For production, upgrade.</p>

      <h2>Files and services needed</h2>
      <p>To deploy an Express app, you need:</p>
      <ul>
        <li><code>package.json</code> with a <code>start</code> script</li>
        <li><code>server.js</code> that listens on <code>process.env.PORT</code></li>
        <li>A GitHub repository</li>
        <li>A MongoDB Atlas database (for data)</li>
        <li>Environment variables on Render</li>
      </ul>

      <h2>Your turn</h2>
      <p>List every file in your project that Render needs to serve. Which files should NOT be committed to Git?</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what cloud deployment is",
      "Compare local and production",
      "Identify what Render needs to deploy your app"
    ]
  },
  {
    title: "Preparing Your Node.js App for Production",
    contentHtml: `
      <h2>Project structure</h2>
      <p>A clean production structure:</p>
      <pre><code>my-app/
├── server.js           ← entry point
├── package.json
├── package-lock.json
├── .env                ← NOT committed
├── .env.example        ← committed
├── .gitignore
├── public/             ← HTML, CSS, JS
│   └── index.html
├── config/
├── routes/
├── controllers/
├── models/
└── middleware/</code></pre>

      <h2>package.json for production</h2>
      <pre><code class="language-json">{
  "name": "my-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}</code></pre>
      <p>Key points:</p>
      <ul>
        <li><strong>start</strong> uses <code>node</code> (not <code>nodemon</code>) — production should never use dev tools</li>
        <li><strong>engines</strong> tells Render which Node version to use</li>
        <li><strong>main</strong> points to your entry point</li>
      </ul>

      <h2>Lockfiles</h2>
      <p><code>package-lock.json</code> locks every dependency to an exact version — the exact versions of dependencies and their sub-dependencies. This ensures:</p>
      <ul>
        <li>Everyone installs identical versions</li>
        <li>Builds are reproducible</li>
        <li>No "works on my machine" bugs</li>
      </ul>
      <p><strong>Always commit package-lock.json.</strong></p>

      <h2>Serving static files</h2>
      <p>Express can serve HTML, CSS, JS from a folder:</p>
      <pre><code class="language-javascript">const path = require("path");
app.use(express.static(path.join(__dirname, "public")));</code></pre>
      <p>Now <code>/index.html</code> serves <code>public/index.html</code>, <code>/css/styles.css</code> serves <code>public/css/styles.css</code>, etc.</p>

      <h2>Listening on the right port</h2>
      <pre><code class="language-javascript">const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () =&gt; {
  console.log(\`Server running on port \${PORT}\`);
});</code></pre>
      <p><strong>Critical</strong>: bind to <code>0.0.0.0</code>, not <code>localhost</code>. Render needs to reach the app from outside.</p>

      <h2>Removing dev-only assumptions</h2>
      <ul>
        <li>Don't hardcode <code>http://localhost</code> in API URLs</li>
        <li>Don't log full request bodies (may leak passwords)</li>
        <li>Don't use <code>nodemon</code> in the start script</li>
        <li>Don't serve source files from node_modules</li>
      </ul>

      <h2>Environment-aware code</h2>
      <pre><code class="language-javascript">const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  app.set("trust proxy", 1);
  // Secure cookies
  // Generic error messages
} else {
  // Verbose logging
  // Stack traces in responses
}</code></pre>

      <h2>.gitignore — the essentials</h2>
      <pre><code>.env
.env.*
!.env.example
node_modules/
logs/
*.log
.DS_Store</code></pre>

      <h2>Verify locally before deploying</h2>
      <p>Simulate production:</p>
      <pre><code class="language-bash"># Set production env vars locally
NODE_ENV=production npm start</code></pre>
      <p>Test every route. If it works with <code>NODE_ENV=production</code> locally, it should work on Render.</p>

      <h2>Your turn</h2>
      <p>Configure your <code>package.json</code> with:</p>
      <ul>
        <li>A <code>start</code> script that runs <code>node server.js</code></li>
        <li>An <code>engines</code> field with <code>node: &gt;=20.0.0</code></li>
        <li>A <code>.gitignore</code> that excludes <code>.env</code> and <code>node_modules</code></li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Configure package.json for production",
      "Serve static files from Express",
      "Listen on process.env.PORT and 0.0.0.0"
    ]
  },
  {
    title: "Git and GitHub Deployment Workflow",
    contentHtml: `
      <h2>Why Git matters for deployment</h2>
      <p>Git is your source of truth. Every deploy on Render comes from a Git commit. Without Git, there's no repeatable workflow, no rollback, and no way to collaborate.</p>

      <h2>Initialising a repository</h2>
      <pre><code class="language-bash">cd my-app
git init
git add .
git commit -m "Initial commit"</code></pre>

      <h2>Creating a GitHub repository</h2>
      <ol>
        <li>Go to <strong>github.com/new</strong></li>
        <li>Choose a name (e.g., <code>kelvin-ikpeni-code-academy</code>)</li>
        <li>Skip README, gitignore, license (you already have files)</li>
        <li>Click <strong>Create repository</strong></li>
      </ol>

      <h2>Pushing to GitHub</h2>
      <pre><code class="language-bash">git remote add origin https://github.com/YOUR_USERNAME/my-app.git
git branch -M main
git push -u origin main</code></pre>

      <h2>Branches</h2>
      <p>A simple workflow:</p>
      <ul>
        <li><code>main</code> — production. Every push triggers a Render deploy.</li>
        <li><code>dev</code> — active development. No auto-deploy.</li>
        <li><code>feature/*</code> — per-feature branches merged into <code>dev</code></li>
      </ul>
      <pre><code class="language-bash">git checkout -b feature/dark-mode
# ... make changes ...
git add .
git commit -m "Add dark mode toggle"
git push -u origin feature/dark-mode</code></pre>
      <p>Open a Pull Request on GitHub → review → merge into <code>main</code> → auto-deploy.</p>

      <h2>Commit history as documentation</h2>
      <p>Good commit messages describe <em>why</em> the change was made:</p>
      <pre><code class="language-bash"># BAD
git commit -m "fixed stuff"

# GOOD
git commit -m "Fix: prevent rate limiter from blocking admin users"</code></pre>

      <h2>Protecting secrets from Git</h2>
      <p>The most common deployment disaster: committing <code>.env</code>. Prevent it:</p>
      <ol>
        <li>Add <code>.env</code> to <code>.gitignore</code> BEFORE the first commit</li>
        <li>Use <code>.env.example</code> for documentation</li>
        <li>Verify: <code>git status</code> should not show <code>.env</code></li>
      </ol>
      <p>If you already committed a secret:</p>
      <pre><code class="language-bash">git rm --cached .env
git commit -m "Remove .env from tracking"
git push</code></pre>
      <p>Then <strong>rotate every secret</strong> immediately (they're already in Git history).</p>

      <h2>Connecting to Render</h2>
      <ol>
        <li>Render Dashboard → <strong>New +</strong> → <strong>Web Service</strong></li>
        <li>Click <strong>Connect account</strong> and authorize Render on GitHub</li>
        <li>Pick your repository</li>
        <li>Configure build/start commands</li>
        <li>Click <strong>Deploy</strong></li>
      </ol>

      <h2>Auto-deploy configuration</h2>
      <p>Render deploys automatically when the tracked branch receives a new commit. Options:</p>
      <ul>
        <li><strong>Auto-deploy</strong> — every push to <code>main</code> deploys</li>
        <li><strong>Manual deploy</strong> — click "Deploy" in the dashboard</li>
        <li><strong>Deploy hooks</strong> — trigger from CI tools</li>
      </ul>

      <h2>Rolling back</h2>
      <p>If a deploy breaks something:</p>
      <ul>
        <li>Render dashboard → <strong>Deploys</strong> → find the previous working commit → <strong>Redeploy</strong></li>
        <li>Or: <code>git revert HEAD</code> and push</li>
      </ul>

      <h2>Your turn</h2>
      <p>Create a GitHub repo for your app, push it, and verify that <code>.env</code> is NOT in the repo. Then connect it to a new Render web service.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Initialise Git and push to GitHub",
      "Protect secrets from source control",
      "Connect a GitHub repository to Render"
    ]
  },
  {
    title: "Deploying an Express App to Render",
    contentHtml: `
      <h2>Step-by-step deployment</h2>

      <h3>1. Create the web service</h3>
      <ol>
        <li>Render Dashboard → <strong>New +</strong> → <strong>Web Service</strong></li>
        <li>Connect GitHub if not already</li>
        <li>Select your repository</li>
      </ol>

      <h3>2. Configure</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Field</th>
          <th style="text-align:left;padding:8px;">Value</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Name</td>
          <td style="padding:8px;">my-app (must be unique)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Region</td>
          <td style="padding:8px;">Closest to users</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Branch</td>
          <td style="padding:8px;"><code>main</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Root Directory</td>
          <td style="padding:8px;">(empty — your app is at root)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Runtime</td>
          <td style="padding:8px;">Node</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Build Command</td>
          <td style="padding:8px;"><code>npm install</code></td>
        </tr>
        <tr>
          <td style="padding:8px;">Start Command</td>
          <td style="padding:8px;"><code>npm start</code></td>
        </tr>
      </table>

      <h3>3. Choose Node version</h3>
      <p>Render reads the <code>engines</code> field from <code>package.json</code>:</p>
      <pre><code class="language-json">"engines": {
  "node": ">=20.0.0"
}</code></pre>
      <p>Or set explicitly via env var <code>NODE_VERSION</code>.</p>

      <h3>4. Environment variables</h3>
      <p>Before clicking Create, add all env vars (Phase 5 covers this in depth):</p>
      <ul>
        <li><code>NODE_ENV=production</code></li>
        <li><code>MONGODB_URI=...</code></li>
        <li><code>SESSION_SECRET=...</code></li>
        <li><code>BASE_URL=https://your-app.onrender.com</code></li>
      </ul>

      <h3>5. Deploy</h3>
      <p>Click <strong>Create Web Service</strong>. Render will:</p>
      <ol>
        <li>Clone your repo</li>
        <li>Run <code>npm install</code></li>
        <li>Run <code>npm start</code></li>
        <li>Start serving on the assigned <code>$PORT</code></li>
      </ol>

      <h3>6. Monitor the deploy</h3>
      <p>The <strong>Logs</strong> tab shows:</p>
      <pre><code>==> Cloning from https://github.com/...
==> Running 'npm install'
...
==> Running 'npm start'
Server running on port 10000
====================================================
  Kelvin Ikpeni Code Academy
  Server running at: http://localhost:10000
====================================================
✅ MongoDB connected: kica</code></pre>
      <p>If you see <code>Server running</code>, the deploy is a success.</p>

      <h2>Testing the public URL</h2>
      <pre><code class="language-bash"># Homepage
curl https://my-app.onrender.com

# Health check
curl https://my-app.onrender.com/api/health
</code></pre>
      <p>Expected health response:</p>
      <pre><code class="language-json">{
  "status": "ok",
  "service": "my-app",
  "database": { "connected": true, "name": "kica" }
}</code></pre>

      <h2>Common build failures</h2>
      <ul>
        <li><strong>Missing package.json</strong> — check root directory</li>
        <li><strong>npm ERR!</strong> — missing dependency in package.json</li>
        <li><strong>Port scan timeout</strong> — not listening on <code>process.env.PORT</code> or not bound to <code>0.0.0.0</code></li>
        <li><strong>Build fails on engines</strong> — invalid Node version format</li>
        <li><strong>Private repo but not authenticated</strong> — reconnect GitHub in Render</li>
      </ul>

      <h2>Free tier spin-down</h2>
      <p>Free services sleep after 15 min inactivity. First request takes ~30-60s to wake. Test your app in the first 15 min after deploy.</p>

      <h2>Your turn</h2>
      <p>Deploy your Express app. Verify:</p>
      <ul>
        <li>The homepage loads at the public URL</li>
        <li><code>/api/health</code> returns <code>connected: true</code></li>
        <li>You can register a new user</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Create and configure a Render web service",
      "Set build and start commands",
      "Verify the deployed app"
    ]
  },
  {
    title: "Production Configuration and Environment Variables",
    contentHtml: `
      <h2>Why env vars?</h2>
      <p>Secrets (DB URIs, API keys, session secrets) must NEVER be in source code. Environment variables let you configure the app per environment.</p>

      <h2>Using process.env</h2>
      <pre><code class="language-javascript">const uri = process.env.MONGODB_URI;
const secret = process.env.SESSION_SECRET;
const port = process.env.PORT || 3000;</code></pre>
      <p>If a required var is missing, fail fast:</p>
      <pre><code class="language-javascript">if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}</code></pre>

      <h2>Loading .env locally</h2>
      <pre><code class="language-javascript">require("dotenv").config();</code></pre>
      <p>Locally, <code>.env</code> holds secrets. In production, Render injects them automatically — no <code>.env</code> file needed.</p>

      <h2>Configuring env vars in Render</h2>
      <ol>
        <li>Dashboard → your service → <strong>Environment</strong></li>
        <li>Click <strong>Add Environment Variable</strong></li>
        <li>Enter Key and Value</li>
        <li>Click <strong>Save Changes</strong> → Render auto-redeploys</li>
      </ol>
      <p>Or paste a bulk <code>.env</code> using <strong>Add from .env</strong>.</p>

      <h2>Essential production env vars</h2>
      <pre><code class="language-bash">NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kica
SESSION_SECRET=long-random-hex-string
COOKIE_SECURE=true
BASE_URL=https://my-app.onrender.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password</code></pre>

      <h2>Port configuration</h2>
      <p><strong>Never hardcode the port</strong> in production. Render assigns <code>$PORT</code> dynamically:</p>
      <pre><code class="language-javascript">const PORT = process.env.PORT || 3000;</code></pre>
      <p>If you hardcode <code>3000</code>, Render's health checks will fail and the deploy will crash-loop.</p>

      <h2>BASE_URL for absolute links</h2>
      <p>Certificates and verification links need the public URL:</p>
      <pre><code class="language-javascript">const baseUrl = process.env.BASE_URL || "http://localhost:3000";</code></pre>
      <p>Set <code>BASE_URL=https://your-app.onrender.com</code> in Render so links work from emails, PDFs, and shared pages.</p>

      <h2>Managing missing config</h2>
      <p>A single missing var can break the app silently. Add startup checks:</p>
      <pre><code class="language-javascript">const REQUIRED = ["MONGODB_URI", "SESSION_SECRET"];
for (const key of REQUIRED) {
  if (!process.env[key]) {
    console.error("❌ Missing required env var:", key);
    process.exit(1);
  }
}</code></pre>

      <h2>.env vs .env.example</h2>
      <ul>
        <li><strong>.env</strong> — real values, gitignored, exists only locally</li>
        <li><strong>.env.example</strong> — placeholders, committed, documents what's needed</li>
      </ul>
      <pre><code class="language-bash"># .env.example
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster/kica
SESSION_SECRET=replace-me
COOKIE_SECURE=false
BASE_URL=http://localhost:3000</code></pre>

      <h2>Rotating secrets</h2>
      <p>If a secret is compromised:</p>
      <ol>
        <li>Generate a new value</li>
        <li>Update in Render → Save → auto-redeploy</li>
        <li>Notify affected users (sessions are invalidated)</li>
      </ol>

      <h2>Your turn</h2>
      <p>Add these env vars to Render:</p>
      <ul>
        <li><code>NODE_ENV=production</code></li>
        <li><code>MONGODB_URI</code></li>
        <li><code>SESSION_SECRET</code> (random 48-byte hex)</li>
        <li><code>COOKIE_SECURE=true</code></li>
        <li><code>BASE_URL</code> (your Render URL)</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Use process.env correctly",
      "Configure env vars in Render",
      "Fail fast on missing config"
    ]
  },
  {
    title: "Connecting MongoDB Atlas to Render",
    contentHtml: `
      <h2>Why Atlas?</h2>
      <p>Local MongoDB doesn't exist on Render. You need a cloud database. MongoDB Atlas offers a free M0 tier perfect for learning.</p>

      <h2>Creating an Atlas database</h2>
      <ol>
        <li>Go to <strong>cloud.mongodb.com</strong></li>
        <li>Sign up / log in</li>
        <li>Create a free M0 cluster</li>
        <li>Choose AWS + your closest region</li>
        <li>Create a database user (save the password)</li>
        <li>Whitelist IP addresses</li>
      </ol>

      <h2>Database users</h2>
      <ul>
        <li>Use a dedicated user for the app (not the admin account)</li>
        <li>Generate a strong password (32+ chars, no special chars that break URIs)</li>
        <li>Grant <strong>Read and write to any database</strong> for development</li>
      </ul>

      <h2>Network access</h2>
      <p>Atlas blocks connections by default. Add IPs:</p>
      <ul>
        <li><strong>Local dev</strong> — your home IP or <code>0.0.0.0/0</code></li>
        <li><strong>Render free tier</strong> — uses dynamic IPs, so use <code>0.0.0.0/0</code></li>
        <li><strong>Render paid</strong> — can use static outbound IPs</li>
      </ul>
      <p>For a learning project, <code>0.0.0.0/0</code> + a strong password is acceptable. For real production, restrict.</p>

      <h2>Connection string</h2>
      <pre><code>mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE?retryWrites=true&amp;w=majority</code></pre>
      <p>Anatomy:</p>
      <ul>
        <li><strong>mongodb+srv</strong> — protocol (auto-discovers cluster nodes)</li>
        <li><strong>USERNAME:PASSWORD</strong> — DB user credentials (URL-encode special chars)</li>
        <li><strong>cluster.mongodb.net</strong> — cluster hostname</li>
        <li><strong>DATABASE</strong> — must match <code>mongoose.connection.name</code></li>
        <li><strong>retryWrites + w=majority</strong> — reliability options</li>
      </ul>

      <h2>Connecting with Mongoose</h2>
      <pre><code class="language-javascript">const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log("✅ MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}</code></pre>

      <h2>Connection events</h2>
      <pre><code class="language-javascript">mongoose.connection.on("connected", () =&gt; {
  console.log("MongoDB connected");
});
mongoose.connection.on("disconnected", () =&gt; {
  console.warn("MongoDB disconnected");
});
mongoose.connection.on("error", (err) =&gt; {
  console.error("MongoDB error:", err.message);
});</code></pre>

      <h2>Testing connectivity</h2>
      <pre><code class="language-javascript">// Add a health check endpoint that reports DB state
app.get("/api/health", (req, res) =&gt; {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "degraded",
    database: {
      connected,
      name: mongoose.connection.name || null
    }
  });
});</code></pre>

      <h2>Handling connection failures</h2>
      <p>Retry with backoff:</p>
      <pre><code class="language-javascript">async function connectWithRetry(retries = 3, delay = 2000) {
  for (let i = 1; i &lt;= retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000
      });
      return;
    } catch (err) {
      console.error(\`Attempt \${i}/\${retries} failed:\`, err.message);
      if (i === retries) throw err;
      await new Promise((r) =&gt; setTimeout(r, delay));
      delay *= 2;
    }
  }
}</code></pre>

      <h2>Securing credentials</h2>
      <ul>
        <li>Store the URI in Render's env vars, never in code</li>
        <li>Use a dedicated DB user with only the permissions needed</li>
        <li>Rotate credentials regularly</li>
        <li>Never log the full URI (it contains the password)</li>
      </ul>

      <h2>Common errors</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Error</th>
          <th style="text-align:left;padding:8px;">Cause / Fix</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">bad auth</td>
          <td style="padding:8px;">Wrong password. Regenerate in Atlas.</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">ETIMEDOUT</td>
          <td style="padding:8px;">IP not whitelisted. Add 0.0.0.0/0.</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">ENOTFOUND</td>
          <td style="padding:8px;">Wrong cluster hostname.</td>
        </tr>
        <tr>
          <td style="padding:8px;">Invalid scheme</td>
          <td style="padding:8px;">Missing mongodb+srv:// or leftover &lt; &gt; chars.</td>
        </tr>
      </table>

      <h2>Your turn</h2>
      <p>Create an Atlas cluster, connect your app, and verify <code>/api/health</code> reports <code>"connected": true</code>.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Create a MongoDB Atlas cluster",
      "Connect Mongoose safely with env vars",
      "Handle connection failures and errors"
    ]
  },
  {
    title: "Deployment Logs and Troubleshooting",
    contentHtml: `
      <h2>Two types of logs</h2>
      <ul>
        <li><strong>Build logs</strong> — output from <code>npm install</code> and build steps. Failures here mean the deploy can't start.</li>
        <li><strong>Runtime logs</strong> — output from your running app (<code>console.log</code>, errors). Failures here mean the app starts but breaks.</li>
      </ul>

      <h2>Where to find them</h2>
      <p>Render dashboard → your service → <strong>Logs</strong>. Filter by build or runtime.</p>

      <h2>Reading build logs</h2>
      <p>Success looks like:</p>
      <pre><code>==&gt; Cloning from https://github.com/user/repo
==&gt; Running 'npm install'
added 243 packages in 8s
==&gt; Build succeeded 🎉</code></pre>
      <p>Failure example:</p>
      <pre><code>==&gt; Running 'npm install'
npm ERR! code ENOENT
npm ERR! Could not read package.json
==&gt; Build failed 😞</code></pre>
      <p>Cause: missing <code>package.json</code> at root. Fix: verify Root Directory setting, or commit <code>package.json</code>.</p>

      <h2>Reading runtime logs</h2>
      <p>Success:</p>
      <pre><code>Server running on port 10000
✅ MongoDB connected: kica</code></pre>
      <p>Failure:</p>
      <pre><code>Error: MONGODB_URI is not set
    at /opt/render/.../config/db.js:5:3
==&gt; Exited with status 1</code></pre>
      <p>Cause: missing env var. Fix: add <code>MONGODB_URI</code> in Render's Environment tab.</p>

      <h2>Understanding stack traces</h2>
      <pre><code>TypeError: Cannot read properties of undefined (reading 'name')
    at getUserName (/opt/render/project/src/controllers/user.js:12:20)
    at Layer.handle [as handle_request] ...</code></pre>
      <ul>
        <li><strong>Line 1</strong> — error type and message</li>
        <li><strong>Second line</strong> — where it happened (file:line:column)</li>
        <li><strong>Following lines</strong> — call stack (who invoked)</li>
      </ul>
      <p>Fix in your source locally, push, and redeploy.</p>

      <h2>Common runtime errors</h2>

      <h3>Port scan timeout</h3>
      <pre><code>Port scan timeout reached, no open ports detected</code></pre>
      <p>Cause: not listening on <code>process.env.PORT</code>, or bound to <code>localhost</code> instead of <code>0.0.0.0</code>. Fix:</p>
      <pre><code class="language-javascript">app.listen(process.env.PORT || 3000, "0.0.0.0");</code></pre>

      <h3>Module not found</h3>
      <pre><code>Error: Cannot find module 'express'</code></pre>
      <p>Cause: dependency missing from <code>package.json</code>. Fix: <code>npm install express</code> locally, commit <code>package.json</code> + <code>package-lock.json</code>, push.</p>

      <h3>MongoDB connection refused</h3>
      <pre><code>MongooseServerSelectionError: connect ECONNREFUSED</code></pre>
      <p>Cause: IP not whitelisted in Atlas. Fix: Network Access → add <code>0.0.0.0/0</code>.</p>

      <h3>Missing environment variable</h3>
      <pre><code>Error: SESSION_SECRET is not set</code></pre>
      <p>Cause: forgot to add the var. Fix: Render → Environment → add var.</p>

      <h2>Handling crashes</h2>
      <p>Render restarts your app on crash. To prevent crash loops:</p>
      <ul>
        <li>Wrap top-level setup in try/catch</li>
        <li>Log the full error before exiting</li>
        <li>Exit with code 1 on unrecoverable errors</li>
      </ul>
      <pre><code class="language-javascript">process.on("uncaughtException", (err) =&gt; {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) =&gt; {
  console.error("Unhandled rejection:", err);
});</code></pre>

      <h2>Writing useful logs</h2>
      <p>Log enough to diagnose, but never leak secrets:</p>
      <pre><code class="language-javascript">// GOOD — structured, no secrets
console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url} -&gt; \${res.statusCode}\`);

// BAD — leaks secrets
console.log("Login:", req.body); // includes password!
console.log("MONGODB_URI:", process.env.MONGODB_URI);
</code></pre>

      <h2>Reading logs in production</h2>
      <p>Render aggregates logs. Options:</p>
      <ul>
        <li>Live view in dashboard (recent logs)</li>
        <li>Log drains — stream to Datadog, Logtail, Papertrail</li>
        <li>Retention — 7 days free, longer on paid</li>
      </ul>

      <h2>Your turn</h2>
      <p>Break your deploy on purpose:</p>
      <ul>
        <li>Remove <code>MONGODB_URI</code> from Render env vars</li>
        <li>Watch the runtime logs</li>
        <li>Add it back — verify the app restarts</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Read build and runtime logs",
      "Diagnose common deploy errors",
      "Write useful, safe logs"
    ]
  },
  {
    title: "Health Checks and Application Monitoring",
    contentHtml: `
      <h2>Why health checks?</h2>
      <p>A health check is an endpoint that reports whether your app is functioning. Platforms use it to:</p>
      <ul>
        <li>Restart your service if it's hung</li>
        <li>Route traffic away from unhealthy instances</li>
        <li>Trigger alerts</li>
      </ul>

      <h2>A basic health endpoint</h2>
      <pre><code class="language-javascript">app.get("/api/health", (req, res) =&gt; {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});</code></pre>

      <h2>Liveness vs readiness</h2>
      <ul>
        <li><strong>Liveness</strong> — "Is the app running?" If not, restart it.</li>
        <li><strong>Readiness</strong> — "Is the app ready to serve requests?" If not, stop sending traffic but don't restart.</li>
      </ul>
      <p>For a small app, one combined health endpoint is fine. For complex systems, split them.</p>

      <h2>Database readiness check</h2>
      <pre><code class="language-javascript">app.get("/api/health", (req, res) =&gt; {
  const dbConnected = mongoose.connection.readyState === 1;

  const payload = {
    status: dbConnected ? "ok" : "degraded",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      name: mongoose.connection.name || null
    }
  };

  res.status(dbConnected ? 200 : 503).json(payload);
});</code></pre>

      <h2>HTTP status codes</h2>
      <ul>
        <li><strong>200</strong> — everything healthy</li>
        <li><strong>503 Service Unavailable</strong> — degraded (database down, etc.)</li>
        <li>Render will restart if 5xx persists</li>
      </ul>
      <p>Don't return 200 when the database is down — that defeats the purpose of monitoring.</p>

      <h2>Testing dependencies</h2>
      <p>To check readiness of dependencies:</p>
      <pre><code class="language-javascript">app.get("/api/health/ready", async (req, res) =&gt; {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: "ready" });
  } catch (err) {
    res.status(503).json({ status: "not ready", error: err.message });
  }
});</code></pre>
      <p>Ping actually exercises the DB — more reliable than checking <code>readyState</code>.</p>

      <h2>What NOT to include</h2>
      <p>Health endpoints are often public. Never include:</p>
      <ul>
        <li>Database URIs</li>
        <li>API keys</li>
        <li>File paths</li>
        <li>Stack traces</li>
        <li>User data</li>
      </ul>
      <pre><code class="language-javascript">// BAD
res.json({
  status: "ok",
  mongoUri: process.env.MONGODB_URI, // leaks password!
  sessionSecret: process.env.SESSION_SECRET // catastrophic
});</code></pre>

      <h2>Configuring Render health checks</h2>
      <p>For paid plans, Render can use a health check to detect failures:</p>
      <ol>
        <li>Dashboard → your service → <strong>Settings</strong></li>
        <li>Find <strong>Health Check Path</strong></li>
        <li>Set to <code>/api/health</code></li>
        <li>Render pings it periodically</li>
      </ol>
      <p>If it returns 5xx repeatedly, Render restarts the service. Free tier may not include health check config.</p>

      <h2>Monitoring beyond health checks</h2>
      <ul>
        <li><strong>Metrics</strong> — CPU, memory, response times in Render dashboard</li>
        <li><strong>Error tracking</strong> — Sentry, Rollbar, Bugsnag</li>
        <li><strong>Uptime monitoring</strong> — UptimeRobot, Pingdom</li>
        <li><strong>Log alerts</strong> — via log drain + Datadog</li>
      </ul>

      <h2>Alerts</h2>
      <p>Configure alerts for:</p>
      <ul>
        <li>Service down (health check fails)</li>
        <li>Error rate above threshold</li>
        <li>Response time above threshold</li>
        <li>Memory/CPU above threshold</li>
      </ul>

      <h2>Your turn</h2>
      <p>Build a health endpoint that:</p>
      <ul>
        <li>Returns 200 with <code>{ status: "ok", database: { connected: true } }</code></li>
        <li>Returns 503 if MongoDB is disconnected</li>
        <li>Never includes sensitive data</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Design liveness and readiness endpoints",
      "Return meaningful HTTP status codes",
      "Configure monitoring and alerts"
    ]
  },
  {
    title: "Automatic Deployments and CI/CD",
    contentHtml: `
      <h2>What is CI/CD?</h2>
      <ul>
        <li><strong>CI (Continuous Integration)</strong> — every commit is automatically built and tested</li>
        <li><strong>CD (Continuous Deployment)</strong> — passing commits are automatically deployed to production</li>
      </ul>
      <p>Together they ensure every change is tested and shipped consistently.</p>

      <h2>How Render auto-deploys</h2>
      <p>When you connect a repo, Render automatically redeploys on every push to the tracked branch. This IS continuous deployment (without the test gate).</p>

      <h2>Adding tests to the pipeline</h2>
      <p>To prevent broken code from reaching production, add tests BEFORE deploy:</p>
      <pre><code class="language-json">"scripts": {
  "start": "node server.js",
  "test": "node --test"
}</code></pre>

      <h2>GitHub Actions — the test gate</h2>
      <p>Create <code>.github/workflows/test.yml</code>:</p>
      <pre><code class="language-yaml">name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
</code></pre>
      <p>Now every PR runs tests. If tests fail, don't merge.</p>

      <h2>Preventing deploys when tests fail</h2>
      <p>Options:</p>
      <ul>
        <li><strong>Branch protection</strong> — require CI to pass before merge to <code>main</code></li>
        <li><strong>Auto-deploy from a different branch</strong> — deploy only from <code>production</code> which only receives merged, tested code</li>
        <li><strong>Deploy hook</strong> — trigger Render only after tests pass in CI</li>
      </ul>

      <h2>Branch-based workflow</h2>
      <pre><code>main ───────────────────► auto-deploy to production
  │
  └─ feature/login ──► PR ──► tests pass ──► merge</code></pre>

      <h2>Render deploy hooks</h2>
      <p>Instead of auto-deploy, use a deploy hook triggered by CI:</p>
      <ol>
        <li>Render dashboard → service → Settings → Deploy Hook</li>
        <li>Copy the URL</li>
        <li>Call it from CI after tests pass:</li>
      </ol>
      <pre><code class="language-yaml">- name: Deploy to Render
  if: success()
  run: |
    curl -X POST \${{ secrets.RENDER_DEPLOY_HOOK }}
</code></pre>
      <p>Set <code>RENDER_DEPLOY_HOOK</code> in GitHub → repo → Settings → Secrets.</p>

      <h2>Rollbacks</h2>
      <p>If a deploy breaks:</p>
      <ul>
        <li><strong>Redeploy previous commit</strong> in Render dashboard</li>
        <li><strong>Revert commit</strong> — <code>git revert HEAD</code> + push</li>
        <li><strong>Rollback via git tag</strong> — tag stable versions, deploy from tags</li>
      </ul>

      <h2>Blue-green deployments</h2>
      <p>For zero-downtime deploys:</p>
      <ol>
        <li>Deploy new version alongside old</li>
        <li>Health check the new version</li>
        <li>Switch traffic only if healthy</li>
        <li>Keep old version running until new is confirmed</li>
      </ol>
      <p>Render handles this automatically — new instance must pass health check before old is killed.</p>

      <h2>Release checklist</h2>
      <ul>
        <li>All tests pass in CI</li>
        <li>Manual smoke test on staging (if available)</li>
        <li>Commit message describes the change</li>
        <li>Migrations (if any) are backward-compatible</li>
        <li>Rollback plan documented</li>
      </ul>

      <h2>Your turn</h2>
      <p>Add a GitHub Actions workflow that:</p>
      <ul>
        <li>Runs on every push to <code>main</code></li>
        <li>Installs dependencies with <code>npm ci</code></li>
        <li>Runs <code>npm test</code></li>
        <li>Fails the build if any test fails</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Explain CI/CD concepts",
      "Add automated tests to the deploy pipeline",
      "Configure GitHub Actions and deploy hooks"
    ]
  },
  {
    title: "Domains, HTTPS, and Production Security",
    contentHtml: `
      <h2>Render-provided URLs</h2>
      <p>Every Render service gets a free URL: <code>https://your-app.onrender.com</code>. HTTPS is automatic.</p>
      <ul>
        <li><strong>Free tier</strong> — URL includes random suffix</li>
        <li><strong>Paid tier</strong> — you can rename the service</li>
      </ul>

      <h2>Custom domains</h2>
      <p>Use <code>yourapp.com</code> instead of the default URL:</p>
      <ol>
        <li>Buy a domain (Namecheap, Cloudflare, Google Domains)</li>
        <li>Render dashboard → service → <strong>Settings</strong> → <strong>Custom Domain</strong></li>
        <li>Add <code>yourapp.com</code> and <code>www.yourapp.com</code></li>
        <li>Render gives you DNS records to add at your registrar</li>
        <li>Add the records and wait for propagation (minutes to hours)</li>
        <li>Render auto-provisions a TLS certificate</li>
      </ol>

      <h2>DNS records</h2>
      <p>You'll need:</p>
      <ul>
        <li><strong>A record</strong> for apex domain → Render's IP</li>
        <li><strong>CNAME</strong> for <code>www</code> → Render-provided target</li>
        <li>Or <strong>ALIAS/ANAME</strong> if your registrar supports apex CNAME</li>
      </ul>

      <h2>HTTPS — automatic on Render</h2>
      <p>Render provisions and renews TLS certificates automatically. Nothing to configure — but:</p>
      <ul>
        <li>Redirect HTTP → HTTPS (Render does this automatically)</li>
        <li>Use <code>https://</code> in your code for any absolute URLs</li>
        <li>Set <code>COOKIE_SECURE=true</code> in production</li>
      </ul>

      <h2>Security headers with helmet</h2>
      <pre><code class="language-javascript">const helmet = require("helmet");

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      "style-src": ["'self'", "https://cdn.jsdelivr.net"],
      "img-src": ["'self'", "data:", "blob:"]
    }
  }
}));</code></pre>
      <p>Helmet sets 11+ headers automatically:</p>
      <ul>
        <li><code>Content-Security-Policy</code> — restricts resource loading</li>
        <li><code>Strict-Transport-Security</code> — forces HTTPS for the next year</li>
        <li><code>X-Frame-Options</code> — prevents clickjacking</li>
        <li><code>X-Content-Type-Options</code> — prevents MIME sniffing</li>
      </ul>

      <h2>CORS configuration</h2>
      <p>If your frontend and API share an origin (like this platform), you don't need CORS. If separated:</p>
      <pre><code class="language-javascript">const cors = require("cors");

app.use(cors({
  origin: "https://yourfrontend.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));</code></pre>
      <p>Never use <code>origin: "*"</code> with credentials.</p>

      <h2>Trust proxy</h2>
      <p>Render sits behind a load balancer. Express needs to trust it to see real client IPs:</p>
      <pre><code class="language-javascript">if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}</code></pre>
      <p>Without this, rate limiting uses the load balancer's IP for everyone.</p>

      <h2>Rate limiting in production</h2>
      <pre><code class="language-javascript">const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/api/", limiter);
app.post("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }));</code></pre>

      <h2>Dependency security</h2>
      <pre><code class="language-bash">npm audit
npm audit fix
npm outdated</code></pre>
      <p>Run before every deploy. Add to CI:</p>
      <pre><code class="language-yaml">- run: npm audit --audit-level=high</code></pre>

      <h2>Production secrets</h2>
      <ul>
        <li>All secrets in Render env vars, none in code</li>
        <li>Different secrets for production vs staging</li>
        <li>Rotate secrets on any suspected compromise</li>
        <li>Never log env vars, request bodies with passwords, or session tokens</li>
      </ul>

      <h2>Access controls</h2>
      <ul>
        <li>Restrict Render dashboard access to trusted team members</li>
        <li>Use 2FA on Render, GitHub, and Atlas accounts</li>
        <li>Review deploy permissions — who can trigger a production deploy?</li>
      </ul>

      <h2>Your turn</h2>
      <p>Review your deployed app for:</p>
      <ul>
        <li>Helmet enabled</li>
        <li>HTTPS enforced</li>
        <li>COOKIE_SECURE=true</li>
        <li>trust proxy set</li>
        <li>Rate limiting on auth endpoints</li>
        <li>No secrets in code or logs</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Configure custom domains and HTTPS",
      "Apply security headers with helmet",
      "Harden production configuration"
    ]
  },
  {
    title: "Reliability, Performance, and Maintenance",
    contentHtml: `
      <h2>Service resource limits</h2>
      <p>Free tier has tight limits:</p>
      <ul>
        <li><strong>RAM</strong>: 512 MB</li>
        <li><strong>CPU</strong>: 0.1 (shared)</li>
        <li><strong>Spin-down</strong>: after 15 min inactivity</li>
        <li><strong>Bandwidth</strong>: 100 GB/month</li>
      </ul>
      <p>Watch memory usage in the dashboard. A memory leak will crash the app repeatedly.</p>

      <h2>Cold starts</h2>
      <p>When a free service spins down after inactivity, the first request after triggers a cold start — 30-60 seconds before the server responds. During this time, users see a slow load or timeout.</p>
      <ul>
        <li><strong>Accept it</strong> for dev/learning projects</li>
        <li><strong>Upgrade to Starter ($7/mo)</strong> — always on</li>
        <li><strong>Ping yourself</strong> — use UptimeRobot or cron to hit the health endpoint every 10 min</li>
      </ul>

      <h2>Database connection management</h2>
      <p>Each server instance opens a pool of connections. Too many instances × too many connections = Atlas rate limits.</p>
      <pre><code class="language-javascript">await mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000
});</code></pre>
      <p>Rules:</p>
      <ul>
        <li>Set <code>maxPoolSize</code> based on your tier</li>
        <li>Never create a new connection per request</li>
        <li>Close connections on graceful shutdown</li>
      </ul>

      <h2>Timeouts</h2>
      <p>A hung request can tie up resources indefinitely. Set timeouts:</p>
      <pre><code class="language-javascript">app.use((req, res, next) =&gt; {
  req.setTimeout(30000, () =&gt; {
    res.status(408).json({ error: "Request timeout" });
  });
  next();
});</code></pre>
      <p>For outbound requests (fetch, DB queries), always set a timeout too.</p>

      <h2>Graceful shutdown</h2>
      <p>When Render restarts your app, it sends SIGTERM. Close gracefully:</p>
      <pre><code class="language-javascript">const server = app.listen(PORT);

async function shutdown(signal) {
  console.log(\`\${signal} received. Shutting down...\`);
  server.close(async () =&gt; {
    await mongoose.connection.close();
    console.log("Shutdown complete");
    process.exit(0);
  });
  setTimeout(() =&gt; process.exit(1), 10000);
}

process.on("SIGINT", () =&gt; shutdown("SIGINT"));
process.on("SIGTERM", () =&gt; shutdown("SIGTERM"));</code></pre>
      <p>Without this, in-flight requests fail abruptly on every restart.</p>

      <h2>Monitoring performance</h2>
      <ul>
        <li><strong>Response time</strong> — Render metrics, APM tools</li>
        <li><strong>Error rate</strong> — count 5xx responses</li>
        <li><strong>Memory/CPU</strong> — Render dashboard</li>
        <li><strong>Slow queries</strong> — MongoDB Atlas performance tab</li>
      </ul>

      <h2>Backups and database recovery</h2>
      <p>Atlas M0 (free) does NOT include automated backups. For production:</p>
      <ul>
        <li>Upgrade to M10+ for automated backups</li>
        <li>Or: export periodically with <code>mongodump</code></li>
        <li>Test restores regularly (untested backups are not backups)</li>
      </ul>
      <pre><code class="language-bash">mongodump --uri="$MONGODB_URI" --out=./backup-$(date +%Y%m%d)
mongorestore --uri="$MONGODB_URI" ./backup-20261126
</code></pre>

      <h2>Scaling</h2>
      <p>Options on Render:</p>
      <ul>
        <li><strong>Vertical</strong> — bigger instance (Standard, Pro)</li>
        <li><strong>Horizontal</strong> — multiple instances (requires stateless app — no in-memory sessions!)</li>
        <li><strong>Autoscaling</strong> — Render scales based on load (paid)</li>
      </ul>
      <p>For horizontal scaling, sessions MUST be in a shared store (MongoDB sessions, Redis), not in memory.</p>

      <h2>Cost considerations</h2>
      <ul>
        <li><strong>Free</strong> — $0, spin-down, 512 MB</li>
        <li><strong>Starter</strong> — $7/mo, always on, 512 MB</li>
        <li><strong>Standard</strong> — $25/mo, 2 GB, better CPU</li>
        <li><strong>Pro</strong> — scales from there</li>
        <li>MongoDB Atlas free = 512 MB storage</li>
      </ul>
      <p>Typical small app: $7/mo (Render Starter) + $0 (Atlas free) = $7/month.</p>

      <h2>Maintenance checklist</h2>
      <ul>
        <li>Weekly: review logs, check error rate</li>
        <li>Weekly: <code>npm audit</code></li>
        <li>Monthly: update dependencies</li>
        <li>Monthly: test database restore</li>
        <li>Quarterly: review access controls, rotate secrets</li>
        <li>Yearly: review pricing, capacity planning</li>
      </ul>

      <h2>Your turn</h2>
      <p>Add graceful shutdown to your server. Then create a maintenance checklist for your app.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Manage connections and timeouts",
      "Implement graceful shutdown",
      "Plan backups, scaling, and maintenance"
    ]
  },
  {
    title: "Post-Deployment Testing and Release Management",
    contentHtml: `
      <h2>Why post-deploy testing?</h2>
      <p>Local tests aren't enough. Production has different config, DB, and network. Verify the LIVE app works:</p>
      <ul>
        <li>Public pages load</li>
        <li>API endpoints respond</li>
        <li>Database operations work</li>
        <li>Authentication functions</li>
        <li>No security regressions</li>
      </ul>

      <h2>Smoke tests</h2>
      <p>Quick tests that catch major breakage:</p>
      <pre><code class="language-bash"># Homepage
curl -f https://my-app.onrender.com/ || echo "FAIL: homepage"

# Health
curl -f https://my-app.onrender.com/api/health || echo "FAIL: health"

# Public API
curl -f https://my-app.onrender.com/api/courses || echo "FAIL: courses"

# 404 handling
curl -f https://my-app.onrender.com/nonexistent || echo "FAIL: 404"
</code></pre>
      <p>Automate with a script or CI workflow.</p>

      <h2>Testing database functionality</h2>
      <pre><code class="language-bash"># Register a test user
curl -X POST https://my-app.onrender.com/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123!"}'

# Should return 201

# Login
curl -X POST https://my-app.onrender.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"TestPass123!"}' \\
  -c cookies.txt

# Access protected route with cookie
curl -b cookies.txt https://my-app.onrender.com/api/profile
</code></pre>
      <p>Verifies: registration, DB write, login, DB read, session persistence, protected route auth.</p>

      <h2>Testing authentication and authorization</h2>
      <pre><code class="language-bash"># Unauthenticated — should return 401
curl -i https://my-app.onrender.com/api/profile

# Non-admin — should return 403
curl -i -b student-cookies.txt https://my-app.onrender.com/api/admin/users

# Admin — should return 200
curl -i -b admin-cookies.txt https://my-app.onrender.com/api/admin/users
</code></pre>

      <h2>Checking deployment status</h2>
      <p>Render dashboard shows:</p>
      <ul>
        <li><strong>Live</strong> — deploy succeeded, serving traffic</li>
        <li><strong>Build failed</strong> — check logs</li>
        <li><strong>Crashed</strong> — check runtime logs</li>
        <li><strong>Pending</strong> — deploy in progress</li>
      </ul>

      <h2>Investigating regressions</h2>
      <p>If something broke after a deploy:</p>
      <ol>
        <li>Check what changed — <code>git log</code> since last successful deploy</li>
        <li>Read runtime logs for errors</li>
        <li>Reproduce locally with <code>NODE_ENV=production</code></li>
        <li>Redeploy the last known good commit if urgent</li>
        <li>Fix the bug locally, test, push</li>
      </ol>

      <h2>Rollback procedure</h2>
      <p>Fastest recovery:</p>
      <ol>
        <li>Render dashboard → Deploys</li>
        <li>Find the last successful deploy</li>
        <li>Click <strong>Redeploy</strong></li>
      </ol>
      <p>Then fix the issue and push a proper fix.</p>

      <h2>Release notes</h2>
      <p>Document every release:</p>
      <pre><code class="language-markdown">## Release 2026-11-26

### Added
- Certificate PDF download
- Admin quiz editor

### Fixed
- Session cookie not cleared on logout
- Rate limiter blocking admin users

### Known issues
- Free tier cold starts (30-60s)
- Mobile menu overlap on iPhone SE

### Deploy
- Commit: abc1234
- Duration: 2m 12s
- Status: ✅ Success
</code></pre>

      <h2>Smoke test automation</h2>
      <p>Add a post-deploy workflow:</p>
      <pre><code class="language-yaml">name: Post-Deploy Smoke Test

on:
  deployment_status:

jobs:
  smoke:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Health check
        run: curl -f https://my-app.onrender.com/api/health
      - name: Homepage
        run: curl -f https://my-app.onrender.com/
      - name: API
        run: curl -f https://my-app.onrender.com/api/courses
</code></pre>

      <h2>Documenting known issues</h2>
      <p>Maintain a <code>KNOWN_ISSUES.md</code>:</p>
      <pre><code class="language-markdown"># Known Issues

## Cold starts on free tier
First request after 15 min inactivity takes 30-60s. Upgrade to Starter or ping health endpoint every 10 min.

## Mobile menu on iOS Safari
Small overlap on iPhone SE. Workaround: scroll up slightly.

## Reset password emails
Sends via logs only. Email provider integration pending.
</code></pre>

      <h2>Production readiness checklist</h2>
      <ul>
        <li>✅ All pages load on the live URL</li>
        <li>✅ /api/health returns 200 with connected: true</li>
        <li>✅ Registration works (creates user in Atlas)</li>
        <li>✅ Login works (session cookie set)</li>
        <li>✅ Protected routes reject unauthenticated (401)</li>
        <li>✅ Admin routes reject non-admin (403)</li>
        <li>✅ Logout clears session</li>
        <li>✅ HTTPS enforced</li>
        <li>✅ No errors in runtime logs</li>
        <li>✅ Data persists in MongoDB Atlas</li>
        <li>✅ Certificates generate and download</li>
      </ul>

      <h2>Your turn</h2>
      <p>Run a full smoke test on your deployed app. Document results:</p>
      <ul>
        <li>Which routes work</li>
        <li>Which features fail</li>
        <li>Any errors in logs</li>
        <li>Known issues to track</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Run smoke tests against live deployments",
      "Detect and fix regressions",
      "Document releases and known issues"
    ]
  }
];

async function seedDeployLessons() {
  const course = await Course.findOne({ slug: "deploying-to-render" });
  if (!course) {
    console.warn("⚠  Course not found: deploying-to-render");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < deployLessons.length; i++) {
    const l = deployLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: deployLessons.length } }
  );

  console.log(`   Deploy lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedDeployLessons };