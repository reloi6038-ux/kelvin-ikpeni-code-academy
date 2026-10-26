/**
 * Kelvin Ikpeni Code Academy — Lesson seed
 * Part 1: Introduction to Web Development (9 lessons)
 * HTML Fundamentals: 7 lessons (from previous expansion)
 * Other courses: keep their existing lessons.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// =========================================================
// INTRODUCTION TO WEB DEVELOPMENT — 9 LESSONS
// =========================================================
const introLessons = [
  {
    title: "What Is Web Development?",
    contentHtml: `
      <h2>Websites vs web applications</h2>
      <p>A <strong>website</strong> is a collection of static pages that present information. A <strong>web application</strong> is a website that lets users <em>do things</em>: create accounts, post content, buy products, track progress. The line is blurry — most modern "websites" are actually applications.</p>
      <p>Examples:</p>
      <ul>
        <li><strong>Website</strong>: a restaurant's menu page</li>
        <li><strong>Web app</strong>: a restaurant's online ordering system with accounts, cart, and payment</li>
      </ul>

      <h2>The three layers of the web</h2>
      <p>Every web app you've ever used is built from three layers:</p>
      <ol>
        <li><strong>Frontend</strong> — what the user sees and interacts with. Runs in the browser.</li>
        <li><strong>Backend</strong> — the server that processes requests, applies business logic, and returns data. Runs on a server.</li>
        <li><strong>Database</strong> — persistent storage for users, content, and state. Runs on a database server.</li>
      </ol>
      <p>These communicate through <strong>HTTP</strong>. The frontend sends requests; the backend handles them, talks to the database, and returns responses.</p>

      <h2>What each technology does</h2>
      <ul>
        <li><strong>HTML</strong> — the structure. Tags describe what content <em>is</em>.</li>
        <li><strong>CSS</strong> — the styling. Rules describe how content <em>looks</em>.</li>
        <li><strong>JavaScript</strong> — the behaviour. Code makes the page <em>interactive</em>.</li>
        <li><strong>Node.js + Express</strong> — the backend. JavaScript that runs on a server and handles HTTP requests.</li>
        <li><strong>MongoDB</strong> — the database. Stores data as flexible JSON-like documents.</li>
      </ul>

      <h2>A very small example</h2>
      <p>Here's a complete (tiny) web app in three files:</p>
      <p><strong>index.html</strong> (frontend structure):</p>
      <pre><code class="language-html">&lt;button id="greet"&gt;Say Hi&lt;/button&gt;</code></pre>
      <p><strong>app.js</strong> (frontend behaviour):</p>
      <pre><code class="language-javascript">document.getElementById("greet").addEventListener("click", async () =&gt; {
  const res = await fetch("/api/greeting");
  const data = await res.json();
  alert(data.message);
});</code></pre>
      <p><strong>server.js</strong> (backend):</p>
      <pre><code class="language-javascript">const express = require("express");
const app = express();

app.get("/api/greeting", (req, res) =&gt; {
  res.json({ message: "Hello from the backend!" });
});

app.listen(3000);</code></pre>
      <p>Click the button → the browser makes an HTTP request → the server responds with JSON → the browser shows an alert. <strong>That's web development.</strong></p>

      <h2>Your turn</h2>
      <p>Think about any website you use daily. Write down (in a note):</p>
      <ul>
        <li>Which parts are <em>frontend</em> (visible, interactive)?</li>
        <li>Which parts must be <em>backend</em> (login, data, business logic)?</li>
        <li>What data does it likely store in a <em>database</em>?</li>
      </ul>
    `,
    estimatedMinutes: 25,
    learningObjectives: [
      "Differentiate websites from web applications",
      "Name the three layers: frontend, backend, database",
      "Explain how HTML, CSS, JS, Node, and MongoDB work together"
    ]
  },
  {
    title: "Understanding Clients and Servers",
    contentHtml: `
      <h2>What is a client?</h2>
      <p>A <strong>client</strong> is any program that makes requests to a server. The most common client is your <strong>browser</strong>, but clients also include:</p>
      <ul>
        <li>Mobile apps (iOS, Android)</li>
        <li>Command-line tools like <code>curl</code></li>
        <li>Another server (server-to-server communication)</li>
        <li>Desktop apps that call APIs</li>
      </ul>
      <p>What they all have in common: they speak HTTP and expect HTTP responses.</p>

      <h2>What is a server?</h2>
      <p>A <strong>server</strong> is a program that listens for incoming requests on a specific port, decides what to do, and returns a response.</p>
      <p>Servers are usually long-running processes. They start, wait, and handle many requests without restarting.</p>

      <h2>The request/response cycle</h2>
      <p>Every interaction is a cycle:</p>
      <ol>
        <li>The client builds an HTTP request: a method, a URL, headers, and optionally a body.</li>
        <li>The request travels over the network to the server.</li>
        <li>The server parses the request, runs its logic, and builds a response.</li>
        <li>The response travels back to the client.</li>
        <li>The client displays or processes the response.</li>
      </ol>

      <h2>A minimal server</h2>
      <pre><code class="language-javascript">// server.js
const http = require("http");

const server = http.createServer((req, res) =&gt; {
  console.log("Request:", req.method, req.url);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, client!");
});

server.listen(3000, () =&gt; {
  console.log("Server listening on http://localhost:3000");
});</code></pre>
      <p>This is a raw Node.js server — no Express, just the built-in HTTP module. It listens on port 3000 and responds to every request with "Hello, client!".</p>

      <h2>What happens when you open a website</h2>
      <p>When you type <code>https://example.com</code> and press Enter:</p>
      <ol>
        <li>The browser resolves the domain to an IP address (<strong>DNS</strong>).</li>
        <li>The browser opens a <strong>TCP</strong> connection (and <strong>TLS</strong> for HTTPS) to that IP on port 443.</li>
        <li>The browser sends an HTTP GET request.</li>
        <li>The server responds with HTML.</li>
        <li>The browser parses the HTML and discovers linked CSS, JS, images.</li>
        <li>The browser requests each of those in parallel.</li>
        <li>The page renders once all critical assets arrive.</li>
      </ol>

      <h2>Your turn</h2>
      <p>Write down (in a note) what happens when you visit a website you use daily. Break it into the 7 steps above. Name each server involved.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Define client and server",
      "Trace the request/response cycle",
      "Write a minimal raw Node.js server"
    ]
  },
  {
    title: "HTTP and HTTPS Fundamentals",
    contentHtml: `
      <h2>What HTTP is</h2>
      <p><strong>HTTP</strong> (HyperText Transfer Protocol) is the language clients and servers use to talk. It defines what a request looks like and what a response looks like.</p>

      <h2>HTTP methods</h2>
      <p>Every request has a <strong>method</strong> that declares its intent:</p>
      <ul>
        <li><strong>GET</strong> — retrieve data. No body. Idempotent.</li>
        <li><strong>POST</strong> — create data. Has a body. Not idempotent.</li>
        <li><strong>PUT</strong> — replace an entire resource. Idempotent.</li>
        <li><strong>PATCH</strong> — modify part of a resource.</li>
        <li><strong>DELETE</strong> — remove a resource.</li>
      </ul>
      <p><em>Idempotent</em> means calling it twice has the same effect as calling it once. GET, PUT, DELETE are idempotent. POST is not — posting the same form twice creates two records.</p>

      <h2>Anatomy of a request</h2>
      <pre><code class="language-http">GET /api/courses HTTP/1.1
Host: example.com
Accept: application/json
User-Agent: Mozilla/5.0

</code></pre>
      <ul>
        <li><strong>Request line</strong>: method + path + HTTP version</li>
        <li><strong>Headers</strong>: key-value metadata</li>
        <li><strong>Body</strong> (optional): for POST/PUT/PATCH</li>
      </ul>

      <h2>Anatomy of a response</h2>
      <pre><code class="language-http">HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 82

{ "courses": [{ "title": "HTML Fundamentals", "lessons": 7 }] }
</code></pre>

      <h2>Status codes</h2>
      <p>Status codes are grouped into categories:</p>
      <ul>
        <li><strong>2xx — success</strong>: 200 OK, 201 Created, 204 No Content</li>
        <li><strong>3xx — redirect</strong>: 301 Moved Permanently, 302 Found</li>
        <li><strong>4xx — client error</strong>: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests</li>
        <li><strong>5xx — server error</strong>: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</li>
      </ul>

      <h2>HTTPS: HTTP with encryption</h2>
      <p><strong>HTTPS</strong> is HTTP over TLS (Transport Layer Security). The data on the wire is encrypted so no one between you and the server (Wi-Fi router, ISP, attacker) can read or modify it.</p>
      <p>You can see this in any browser: <strong>https://</strong> with a lock icon means the connection is encrypted and the server's identity is verified by a certificate authority.</p>

      <h2>Your turn</h2>
      <p>Open DevTools → Network. Visit any site. Look at each request's method and status. Identify one GET, one POST (if any), and one 200. Then find a 404 by visiting a nonexistent page.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Name the five HTTP methods and their purposes",
      "Read a raw HTTP request and response",
      "Interpret status codes by category",
      "Explain why HTTPS is essential"
    ]
  },
  {
    title: "DNS and Domain Names",
    contentHtml: `
      <h2>Why DNS exists</h2>
      <p>Computers talk in IP addresses like <code>93.184.216.34</code>. Humans remember names like <code>example.com</code>. <strong>DNS</strong> (Domain Name System) is the phonebook: it translates names into IP addresses.</p>

      <h2>How DNS resolution works</h2>
      <p>When you type <code>example.com</code>, the resolver runs this sequence:</p>
      <ol>
        <li><strong>Browser cache</strong> — has it been resolved recently? Use it.</li>
        <li><strong>OS cache</strong> — same check at the operating system level.</li>
        <li><strong>Recursive resolver</strong> — usually your ISP's DNS server. If it doesn't know, it asks others.</li>
        <li><strong>Root nameserver</strong> — knows where the <code>.com</code> TLD servers are.</li>
        <li><strong>TLD nameserver</strong> — knows where <code>example.com</code>'s nameservers are.</li>
        <li><strong>Authoritative nameserver</strong> — the actual answer: "example.com is at 93.184.216.34".</li>
      </ol>
      <p>Total: ~50–200ms on first lookup. Subsequent lookups hit caches and take <1ms.</p>

      <h2>DNS record types</h2>
      <ul>
        <li><strong>A record</strong> — maps a name to an IPv4 address</li>
        <li><strong>AAAA record</strong> — maps a name to an IPv6 address</li>
        <li><strong>CNAME</strong> — an alias pointing to another domain</li>
        <li><strong>MX</strong> — mail server for the domain</li>
        <li><strong>TXT</strong> — arbitrary text, often used for verification</li>
        <li><strong>NS</strong> — the nameservers for the domain</li>
      </ul>

      <h2>Example: A record</h2>
      <pre><code>example.com    3600    IN    A    93.184.216.34</code></pre>
      <p>This says: <em>for the next 3600 seconds, "example.com" resolves to 93.184.216.34</em>. The <code>3600</code> is the <strong>TTL</strong> (time to live) in seconds.</p>

      <h2>Domain registration</h2>
      <p>Registering a domain means:</p>
      <ol>
        <li>Buying the right to use a name from a registrar (Namecheap, GoDaddy, Cloudflare).</li>
        <li>Configuring the domain's nameservers to point to your DNS host.</li>
        <li>Adding records (A, AAAA, CNAME) at that DNS host.</li>
      </ol>

      <h2>Your turn</h2>
      <p>Run this in your terminal to see DNS in action:</p>
      <pre><code class="language-bash">nslookup example.com</code></pre>
      <p>You'll see the IP address(es) behind the domain. Try a few more: <code>github.com</code>, <code>openai.com</code>.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain the DNS resolution process",
      "Identify A, AAAA, CNAME, MX, and TXT records",
      "Describe domain registration steps"
    ]
  },
  {
    title: "How Web Browsers Work",
    contentHtml: `
      <h2>The browser as a runtime</h2>
      <p>Modern browsers are almost operating systems. Chrome has a rendering engine (<strong>Blink</strong>), a JavaScript engine (<strong>V8</strong>), a networking stack, a media pipeline, and a security model. Each tab is a sandboxed process.</p>

      <h2>The rendering pipeline</h2>
      <ol>
        <li><strong>Fetch</strong> — the browser downloads HTML</li>
        <li><strong>Parse</strong> — it reads HTML and builds the <strong>DOM</strong> (Document Object Model): a tree of nodes</li>
        <li><strong>Style</strong> — it fetches and parses CSS, building a <strong>CSSOM</strong> (CSS Object Model)</li>
        <li><strong>Layout</strong> — it computes positions and sizes for every element</li>
        <li><strong>Paint</strong> — it converts boxes into pixels</li>
        <li><strong>Composite</strong> — it layers pixels and sends them to the GPU</li>
      </ol>

      <h2>The DOM</h2>
      <p>If you write:</p>
      <pre><code class="language-html">&lt;body&gt;
  &lt;h1&gt;Hello&lt;/h1&gt;
  &lt;p&gt;World&lt;/p&gt;
&lt;/body&gt;</code></pre>
      <p>The DOM is a tree:</p>
      <pre><code>body
├── h1
│   └── "Hello" (text node)
└── p
    └── "World" (text node)</code></pre>
      <p>JavaScript can read and modify this tree. That's what makes pages interactive.</p>

      <h2>JavaScript execution</h2>
      <p>Scripts run in V8, isolated from other tabs and from the OS. They can:</p>
      <ul>
        <li>Read and modify the DOM</li>
        <li>Make network requests with <code>fetch()</code></li>
        <li>Store data in <code>localStorage</code></li>
        <li>Handle events (clicks, keys, scrolling)</li>
      </ul>

      <h2>Developer Tools</h2>
      <p>Open with <kbd>F12</kbd> or <kbd>Ctrl+Shift+I</kbd>. Key panels:</p>
      <ul>
        <li><strong>Elements</strong> — inspect and edit the DOM and CSS in real time</li>
        <li><strong>Console</strong> — run JavaScript, see errors</li>
        <li><strong>Network</strong> — see every request and response</li>
        <li><strong>Application</strong> — cookies, localStorage, service workers</li>
      </ul>

      <h2>Your turn</h2>
      <p>Open any website. In DevTools:</p>
      <ul>
        <li>Use Elements to change a heading's text</li>
        <li>Use Console to run <code>document.title</code></li>
        <li>Use Network to see how many requests load the page</li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Describe the rendering pipeline",
      "Explain what the DOM is",
      "Use the main DevTools panels"
    ]
  },
  {
    title: "URLs, IP Addresses, Ports, and Networking",
    contentHtml: `
      <h2>Anatomy of a URL</h2>
      <pre><code>https://api.example.com:443/courses/123?sort=new#top</code></pre>
      <ul>
        <li><strong>Protocol</strong>: <code>https</code></li>
        <li><strong>Host</strong>: <code>api.example.com</code></li>
        <li><strong>Port</strong>: <code>443</code> (default for HTTPS)</li>
        <li><strong>Path</strong>: <code>/courses/123</code></li>
        <li><strong>Query</strong>: <code>?sort=new</code></li>
        <li><strong>Fragment</strong>: <code>#top</code></li>
      </ul>

      <h2>IP addresses</h2>
      <p>An IP address identifies a machine on a network:</p>
      <ul>
        <li><strong>IPv4</strong>: <code>192.168.1.10</code> (4 bytes)</li>
        <li><strong>IPv6</strong>: <code>2001:db8::1</code> (16 bytes)</li>
        <li><strong>localhost</strong>: <code>127.0.0.1</code> — the machine itself</li>
        <li><strong>0.0.0.0</strong>: "listen on all interfaces"</li>
      </ul>

      <h2>Ports</h2>
      <p>One machine can host many servers, each on a different <strong>port</strong>. Default ports:</p>
      <ul>
        <li><strong>80</strong> — HTTP</li>
        <li><strong>443</strong> — HTTPS</li>
        <li><strong>3000</strong> — typical dev port for Node.js</li>
        <li><strong>5000</strong> — alternate dev port</li>
        <li><strong>27017</strong> — MongoDB</li>
      </ul>
      <p>When you run <code>npm run dev</code> and see "Server running at http://localhost:3000", it means: <em>"the server is listening on the loopback interface, port 3000, on your machine."</em></p>

      <h2>TCP and TLS</h2>
      <p>HTTP is built on <strong>TCP</strong>, which guarantees ordered, reliable delivery. For HTTPS, <strong>TLS</strong> is layered on top of TCP to encrypt the data.</p>
      <p>Every HTTPS connection involves a brief TLS handshake that:</p>
      <ol>
        <li>Verifies the server's certificate</li>
        <li>Negotiates encryption algorithms</li>
        <li>Exchanges session keys</li>
      </ol>

      <h2>Your turn</h2>
      <p>Answer these:</p>
      <ul>
        <li>What is the default port for HTTPS?</li>
        <li>What does <code>localhost:3000</code> mean?</li>
        <li>What's the difference between 127.0.0.1 and 0.0.0.0?</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Break down a URL into its parts",
      "Explain IP addresses and common ports",
      "Describe localhost and 0.0.0.0"
    ]
  },
  {
    title: "Frontend, Backend, and Databases",
    contentHtml: `
      <h2>The full flow of a login request</h2>
      <p>Here's what happens when a user logs in to a web app:</p>
      <ol>
        <li>The user types an email and password and clicks <strong>Submit</strong>.</li>
        <li>The frontend validates the fields, then sends a <code>POST /api/auth/login</code> request with the credentials.</li>
        <li>The backend (Node.js + Express) receives the request.</li>
        <li>The backend queries the <strong>database</strong> (MongoDB): <em>"Find the user with this email."</em></li>
        <li>The database returns the user record (with a hashed password).</li>
        <li>The backend compares the hash with the submitted password.</li>
        <li>If correct, the backend issues a session cookie.</li>
        <li>The frontend stores the cookie and redirects to the dashboard.</li>
      </ol>

      <h2>The backend code</h2>
      <pre><code class="language-javascript">app.post("/api/auth/login", async (req, res) =&gt; {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  req.session.userId = user._id;
  res.json({ ok: true, name: user.name });
});</code></pre>

      <h2>The frontend code</h2>
      <pre><code class="language-javascript">document.querySelector("#loginForm").addEventListener("submit", async (e) =&gt; {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    alert("Invalid credentials");
    return;
  }
  window.location.href = "/dashboard.html";
});</code></pre>

      <h2>The database model (Mongoose)</h2>
      <pre><code class="language-javascript">const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});</code></pre>

      <h2>Why each layer exists</h2>
      <ul>
        <li><strong>Frontend</strong>: user experience, client-side validation, display</li>
        <li><strong>Backend</strong>: security, business logic, orchestration</li>
        <li><strong>Database</strong>: durable storage, queryable data</li>
      </ul>

      <h2>Your turn</h2>
      <p>Draw the request flow for a <em>sign up</em> form. Name the endpoint, the fields sent, the database query, and the response.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Trace a login flow from frontend to database and back",
      "Write a minimal Express login handler",
      "Explain why each layer exists"
    ]
  },
  {
    title: "Hosting, Deployment, and the Web Lifecycle",
    contentHtml: `
      <h2>Local development vs production</h2>
      <p><strong>Local development</strong> means running the app on your machine, usually at <code>http://localhost:3000</code>, with a local or cloud database and dummy data.</p>
      <p><strong>Production</strong> means running the app on a server that anyone in the world can reach, with a real domain, HTTPS, real users, and real data.</p>

      <h2>What changes between the two</h2>
      <ul>
        <li><strong>Environment variables</strong>: production secrets live in the platform's dashboard, never in Git.</li>
        <li><strong>Database</strong>: production uses a managed MongoDB (e.g., Atlas), not a local one.</li>
        <li><strong>HTTPS</strong>: production requires TLS. Locally you can use HTTP.</li>
        <li><strong>Logs and monitoring</strong>: production has real logs and alerts.</li>
        <li><strong>Restarts</strong>: production restarts automatically on crashes.</li>
      </ul>

      <h2>Environment variables in Node.js</h2>
      <pre><code class="language-javascript">// bad: hardcoded
const uri = "mongodb+srv://user:pass@cluster.mongodb.net/kica";

// good: from environment
const uri = process.env.MONGODB_URI;</code></pre>
      <p>Locally, you set them in a <code>.env</code> file (never committed). In production, you set them in Render's dashboard.</p>

      <h2>Health checks</h2>
      <p>Production platforms use a <strong>health check</strong> endpoint to decide if your app is alive:</p>
      <pre><code class="language-javascript">app.get("/api/health", (req, res) =&gt; {
  res.json({ status: "ok", uptime: process.uptime() });
});</code></pre>
      <p>If it returns a 5xx response repeatedly, the platform restarts your app.</p>

      <h2>Steps to deploy a Node.js app</h2>
      <ol>
        <li>Push your code to GitHub.</li>
        <li>Create a Web Service on Render.</li>
        <li>Connect the GitHub repo.</li>
        <li>Set the build command (<code>npm install</code>) and start command (<code>npm start</code>).</li>
        <li>Add environment variables (database URI, session secret, etc.).</li>
        <li>Click Deploy.</li>
        <li>Read the logs. Fix any errors.</li>
        <li>Test the live URL.</li>
      </ol>

      <h2>Your turn</h2>
      <p>Look at your own project. List every secret it uses (database URI, session secret, admin password). Where would each go in production?</p>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Differentiate local development from production",
      "Use environment variables safely",
      "Deploy a Node.js app to a hosting platform"
    ]
  },
  {
    title: "Practical Project: Trace a Web Request",
    contentHtml: `
      <h2>Project objective</h2>
      <p>In this project, you'll <strong>observe</strong> a real HTTP request/response cycle using your browser's DevTools and a live server. This cements everything from the course.</p>

      <h2>Requirements</h2>
      <ol>
        <li>Open DevTools → Network tab</li>
        <li>Visit a page on the KICA platform (e.g., <code>/api/health</code>)</li>
        <li>Document every request you can see:
          <ul>
            <li>Method (GET, POST, etc.)</li>
            <li>URL</li>
            <li>Status code</li>
            <li>Response time</li>
          </ul>
        </li>
        <li>Inspect one response body — you should see JSON</li>
        <li>Click a route that triggers a POST (e.g., login) and inspect the request body</li>
        <li>Use the console to inspect a cookie</li>
      </ol>

      <h2>Starter: a tiny traceable server</h2>
      <p>If you're running this locally, here's a minimal server to test against:</p>
      <pre><code class="language-javascript">const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/health", (req, res) =&gt; {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/echo", (req, res) =&gt; {
  res.json({ received: req.body });
});

app.listen(3000);</code></pre>

      <h2>Walk through these tests</h2>
      <ol>
        <li>Visit <code>http://localhost:3000/api/health</code> → see <code>{ status: "ok" }</code>.</li>
        <li>In DevTools → Network, click the request → inspect its headers.</li>
        <li>In the console, run:
          <pre><code class="language-javascript">fetch("/api/echo", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Hello!" })
}).then(r =&gt; r.json()).then(console.log);</code></pre>
        </li>
        <li>You should see <code>{ received: { message: "Hello!" } }</code> logged.</li>
        <li>Click that request in the Network tab → inspect the request body and response body.</li>
      </ol>

      <h2>Final deliverable</h2>
      <p>Write a short summary (2–3 paragraphs) describing:</p>
      <ul>
        <li>Every request made during the walkthrough</li>
        <li>What was in each request's headers and body</li>
        <li>What each response's status code and body contained</li>
      </ul>
      <p>Submit it as a comment in the task editor to complete the course.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: [
      "Trace a full HTTP request/response using DevTools",
      "Inspect request and response headers and bodies",
      "Explain the complete journey from browser to server"
    ]
  }
];

// =========================================================
// HTML FUNDAMENTALS — 7 LESSONS (from previous expansion)
// =========================================================
const htmlLessons = [
  // (unchanged — 7 lessons already defined in Part 1 of the HTML expansion)
];

// =========================================================
// OTHER COURSES — keep their existing lessons
// =========================================================
const otherLessons = {};

// =========================================================
// Seeder
// =========================================================
async function seedLessons() {
  let created = 0;
  let updated = 0;

  // Intro to Web Dev
  const introCourse = await Course.findOne({ slug: "introduction-to-web-development" });
  if (introCourse) {
    for (let i = 0; i < introLessons.length; i++) {
      const l = introLessons[i];
      const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const existing = await Lesson.findOne({ course: introCourse._id, slug: lessonSlug });

      if (existing) {
        await Lesson.updateOne(
          { _id: existing._id },
          { $set: { ...l, slug: lessonSlug, order: i, course: introCourse._id } }
        );
        updated++;
      } else {
        await Lesson.create({ ...l, slug: lessonSlug, order: i, course: introCourse._id });
        created++;
      }
    }
    const total = await Lesson.countDocuments({ course: introCourse._id });
    await Course.updateOne({ _id: introCourse._id }, { $set: { lessonsCount: total } });
  }

  // HTML Fundamentals — skip here (seeded separately, see Part 1 of HTML expansion)

  // Other courses — skip (kept from earlier phases)

  console.log(`   Lessons:  ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedLessons };