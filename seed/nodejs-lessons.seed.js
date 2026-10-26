/**
 * Kelvin Ikpeni Code Academy — Node.js Runtime lessons
 * Targeted seed: updates ONLY the "node-js-runtime" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const nodeLessons = [
  {
    title: "Introduction to Node.js",
    contentHtml: `
      <h2>What is Node.js?</h2>
      <p><strong>Node.js</strong> is a JavaScript runtime — a program that executes JavaScript code outside of a web browser. It was created in 2009 by Ryan Dahl, who wanted to run JavaScript on the server side.</p>
      <p>Before Node.js, JavaScript could only run inside browsers. Node.js changed that: now you can write servers, command-line tools, build scripts, and even desktop apps in JavaScript.</p>

      <h2>How Node.js differs from browser JavaScript</h2>
      <p>Both run JavaScript, but they provide different environments:</p>
      <ul>
        <li><strong>Browser JS</strong> has the DOM (<code>document</code>), <code>window</code>, <code>fetch</code>, <code>localStorage</code>, and events like <code>click</code>. It runs in a sandboxed tab for security.</li>
        <li><strong>Node.js</strong> has the file system (<code>fs</code>), HTTP servers (<code>http</code>), the process object (<code>process</code>), and OS access (<code>os</code>). It runs with the user's full privileges on their machine.</li>
      </ul>
      <p>Node.js does <strong>not</strong> have <code>document</code> or <code>window</code>. Try typing <code>document</code> in Node and you'll get <em>"ReferenceError: document is not defined"</em>.</p>

      <h2>The V8 engine</h2>
      <p>Node.js uses <strong>V8</strong> — the same JavaScript engine that powers Google Chrome. V8 compiles JavaScript to fast machine code using JIT (just-in-time) compilation.</p>
      <p>But V8 alone can only execute JavaScript — it can't read files or open network sockets. Node.js wraps V8 with a <strong>runtime</strong> that provides those capabilities through built-in modules like <code>fs</code>, <code>http</code>, <code>crypto</code>, and <code>path</code>.</p>

      <h2>Your first Node.js script</h2>
      <p>Create a file called <code>app.js</code>:</p>
      <pre><code class="language-javascript">// app.js
console.log("Hello from Node.js!");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Current directory:", process.cwd());</code></pre>
      <p>Run it from your terminal:</p>
      <pre><code class="language-bash">node app.js</code></pre>
      <p><strong>Output:</strong></p>
      <pre><code>Hello from Node.js!
Node version: v20.11.1
Platform: linux
Current directory: /home/user/projects</code></pre>
      <p>Notice there's no HTML, no browser, no window — just pure JavaScript executing on your machine.</p>

      <h2>Verify your installation</h2>
      <p>Run these commands to confirm Node is installed:</p>
      <pre><code class="language-bash">node --version   # should print v20.x.x or newer
npm --version    # should print 10.x.x or newer</code></pre>
      <p>If either command fails, download Node.js from <code>nodejs.org</code> and install the LTS version.</p>

      <h2>Why Node.js is popular</h2>
      <ul>
        <li><strong>Same language everywhere</strong> — JavaScript on the frontend and backend.</li>
        <li><strong>Non-blocking I/O</strong> — a single thread handles thousands of concurrent connections.</li>
        <li><strong>Huge ecosystem</strong> — over 2 million packages on npm.</li>
        <li><strong>Fast startup</strong> — Node processes start in milliseconds.</li>
      </ul>

      <h2>Your turn</h2>
      <p>Create a file called <code>app.js</code> that logs:</p>
      <ul>
        <li>The text "Node.js is running!"</li>
        <li>Your Node version using <code>process.version</code></li>
        <li>Your current working directory using <code>process.cwd()</code></li>
      </ul>
      <p>Run it with <code>node app.js</code> and submit the code.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what Node.js is and what it's not",
      "Differentiate Node.js from browser JavaScript",
      "Run your first Node.js script from the terminal"
    ]
  },
  {
    title: "Node.js Modules and Code Organization",
    contentHtml: `
      <h2>Why modules exist</h2>
      <p>Imagine a 10,000-line <code>app.js</code>. Impossible to maintain. <strong>Modules</strong> split code into small, focused files that each do one thing. Then you import them where needed.</p>
      <p>Node.js has two module systems: <strong>CommonJS</strong> (older, still the default) and <strong>ES Modules</strong> (newer, browser-compatible).</p>

      <h2>CommonJS — the classic approach</h2>
      <p>Export from a file using <code>module.exports</code>:</p>
      <pre><code class="language-javascript">// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };</code></pre>
      <p>Import in another file using <code>require</code>:</p>
      <pre><code class="language-javascript">// app.js
const { add, multiply } = require("./math");

console.log(add(2, 3));        // 5
console.log(multiply(4, 5));   // 20</code></pre>
      <p>Notice the <code>./</code> prefix. That means "look in the current directory". For built-in modules like <code>fs</code> or <code>http</code>, use the bare name:</p>
      <pre><code class="language-javascript">const fs = require("fs");
const http = require("http");</code></pre>

      <h2>ES Modules — the modern approach</h2>
      <p>ES Modules use <code>import</code> and <code>export</code>:</p>
      <pre><code class="language-javascript">// math.mjs
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}</code></pre>
      <pre><code class="language-javascript">// app.mjs
import { add, multiply } from "./math.mjs";

console.log(add(2, 3));        // 5</code></pre>
      <p>To use ES Modules in Node.js, you must either:</p>
      <ul>
        <li>Name your files <code>.mjs</code>, OR</li>
        <li>Add <code>"type": "module"</code> to your <code>package.json</code></li>
      </ul>

      <h2>Choosing between CommonJS and ES Modules</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Feature</th>
          <th style="text-align:left;padding:8px;">CommonJS</th>
          <th style="text-align:left;padding:8px;">ES Modules</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Syntax</td>
          <td style="padding:8px;"><code>require</code>, <code>module.exports</code></td>
          <td style="padding:8px;"><code>import</code>, <code>export</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Load time</td>
          <td style="padding:8px;">Synchronous</td>
          <td style="padding:8px;">Asynchronous</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Works in browsers</td>
          <td style="padding:8px;">No</td>
          <td style="padding:8px;">Yes</td>
        </tr>
        <tr>
          <td style="padding:8px;">Default in Node</td>
          <td style="padding:8px;">Yes</td>
          <td style="padding:8px;">No (opt-in)</td>
        </tr>
      </table>
      <p>For new projects in 2026, <strong>ES Modules are recommended</strong>. But most existing Node code uses CommonJS, so you need to know both.</p>

      <h2>Your turn</h2>
      <p>Create two files:</p>
      <ul>
        <li><code>greetings.js</code> — exports a function <code>greet(name)</code> that returns "Hello, [name]!"</li>
        <li><code>app.js</code> — imports the function and logs <code>greet("World")</code></li>
      </ul>
      <p>Use <strong>CommonJS</strong> syntax (<code>module.exports</code> and <code>require</code>).</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Explain why modules matter",
      "Use CommonJS require and module.exports",
      "Understand the role of type: module in package.json"
    ]
  },
  {
    title: "npm and Package Management",
    contentHtml: `
      <h2>What is npm?</h2>
      <p><strong>npm</strong> (Node Package Manager) is the world's largest software registry. It hosts over 2 million packages — reusable libraries you can install and use in your projects instead of writing everything from scratch.</p>
      <p>npm comes bundled with Node.js. When you install Node, you get npm.</p>

      <h2>Initializing a project</h2>
      <pre><code class="language-bash">mkdir my-project
cd my-project
npm init -y</code></pre>
      <p>The <code>-y</code> flag accepts all defaults. This creates a <code>package.json</code> file describing your project.</p>

      <h2>Installing packages</h2>
      <p>To install a package as a runtime dependency:</p>
      <pre><code class="language-bash">npm install express</code></pre>
      <p>To install it as a development-only dependency:</p>
      <pre><code class="language-bash">npm install --save-dev nodemon</code></pre>
      <p>Difference:</p>
      <ul>
        <li><strong>dependencies</strong> — required at runtime (Express, Mongoose)</li>
        <li><strong>devDependencies</strong> — only needed during development (testing tools, linters, nodemon)</li>
      </ul>

      <h2>Semantic versioning</h2>
      <p>Packages have versions like <code>4.19.2</code>. The three numbers mean:</p>
      <ul>
        <li><strong>Major</strong> (4) — breaking changes</li>
        <li><strong>Minor</strong> (19) — new features, backwards-compatible</li>
        <li><strong>Patch</strong> (2) — bug fixes</li>
      </ul>
      <p>When you install, npm writes a version range like <code>^4.19.2</code>. The caret (<code>^</code>) means "compatible with 4.x.x" — so <code>4.20.0</code> would satisfy but <code>5.0.0</code> would not.</p>

      <h2>What is node_modules?</h2>
      <p>When you install a package, npm downloads it and its dependencies into a <code>node_modules/</code> folder. That folder can grow to hundreds of megabytes.</p>
      <p><strong>Never commit node_modules to Git.</strong> Add it to <code>.gitignore</code>. Anyone can reinstall it by running <code>npm install</code>.</p>

      <h2>What is package-lock.json?</h2>
      <p><code>package-lock.json</code> records the <em>exact</em> versions of every installed package (including nested dependencies). This ensures everyone on the team installs identical versions.</p>
      <p>Always commit <code>package-lock.json</code> to Git.</p>

      <h2>Using an installed package</h2>
      <p>After <code>npm install express</code>:</p>
      <pre><code class="language-javascript">const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello"));
app.listen(3000);</code></pre>

      <h2>Useful npm commands</h2>
      <pre><code class="language-bash">npm install              # install all deps from package.json
npm list                 # show installed packages
npm outdated             # show outdated packages
npm update               # update to latest compatible versions
npm uninstall express    # remove a package
npm run dev              # run a script from package.json</code></pre>

      <h2>Your turn</h2>
      <p>Create a new folder, run <code>npm init -y</code>, install <code>is-odd</code>, and write an <code>app.js</code> that uses it:</p>
      <pre><code class="language-javascript">const isOdd = require("is-odd");
console.log(isOdd(3));  // true
console.log(isOdd(4));  // false</code></pre>
      <p>Submit the code.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Initialize a Node project with npm",
      "Install dependencies and devDependencies",
      "Understand semantic versioning and node_modules"
    ]
  },
  {
    title: "Understanding package.json",
    contentHtml: `
      <h2>The project manifest</h2>
      <p><code>package.json</code> is the heart of any Node.js project. It tells npm what packages to install, what scripts to run, and what metadata describes the project.</p>

      <h2>Complete example</h2>
      <pre><code class="language-json">{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A simple Node.js app",
  "main": "server.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node --test",
    "seed": "node seed.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "keywords": ["node", "express", "tutorial"],
  "author": "Kelvin Ikpeni",
  "license": "MIT"
}</code></pre>

      <h2>Key fields explained</h2>
      <ul>
        <li><strong>name</strong> — the package name. Must be lowercase, no spaces.</li>
        <li><strong>version</strong> — semantic version (1.0.0).</li>
        <li><strong>main</strong> — the entry point. When someone does <code>require("my-app")</code>, this file runs.</li>
        <li><strong>type</strong> — <code>"commonjs"</code> (default) or <code>"module"</code> (for ES Modules).</li>
        <li><strong>scripts</strong> — custom commands run via <code>npm run &lt;name&gt;</code>.</li>
        <li><strong>dependencies</strong> — runtime packages.</li>
        <li><strong>devDependencies</strong> — development-only packages.</li>
        <li><strong>engines</strong> — required Node version. Helps deployment platforms pick the right runtime.</li>
      </ul>

      <h2>The power of npm scripts</h2>
      <p>Scripts let you define shortcuts. Instead of typing:</p>
      <pre><code class="language-bash">node server.js</code></pre>
      <p>You type:</p>
      <pre><code class="language-bash">npm start</code></pre>
      <p>And <code>npm run dev</code> can be configured to use nodemon (auto-restart on file changes).</p>

      <h2>Special script names</h2>
      <ul>
        <li><code>npm start</code> — runs the <code>start</code> script</li>
        <li><code>npm test</code> — runs the <code>test</code> script</li>
        <li><code>npm stop</code> — runs the <code>stop</code> script</li>
        <li>Everything else: <code>npm run &lt;name&gt;</code></li>
      </ul>

      <h2>Pre and post scripts</h2>
      <p>You can hook into any script with <code>pre&lt;name&gt;</code> and <code>post&lt;name&gt;</code>:</p>
      <pre><code class="language-json">"scripts": {
  "prebuild": "echo 'Building...'",
  "build": "node build.js",
  "postbuild": "echo 'Build complete.'"
}</code></pre>
      <p>Running <code>npm run build</code> executes all three in order.</p>

      <h2>engines for production</h2>
      <p>When deploying to Render (or any platform), the <code>engines.node</code> field tells the platform which Node version to use:</p>
      <pre><code class="language-json">"engines": {
  "node": ">=20.0.0"
}</code></pre>
      <p>Without this, deployment platforms may pick an outdated Node version and break your app.</p>

      <h2>Your turn</h2>
      <p>Create a <code>package.json</code> with:</p>
      <ul>
        <li>A "start" script that runs <code>node server.js</code></li>
        <li>A "dev" script that runs <code>nodemon server.js</code></li>
        <li>The express dependency at <code>^4.19.2</code></li>
        <li>The engines field set to <code>&gt;=20.0.0</code></li>
      </ul>
      <p>Submit the JSON.</p>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Read and write a complete package.json",
      "Define and use npm scripts",
      "Set Node version requirements for deployment"
    ]
  },
  {
    title: "File System Operations",
    contentHtml: `
      <h2>The file system in Node.js</h2>
      <p>Node.js can read and write files — something browser JavaScript cannot do (for security reasons). This is why Node.js is used for servers, build tools, CLIs, and scripts.</p>
      <p>There are two main APIs:</p>
      <ul>
        <li><strong>node:fs</strong> — callback-based, older</li>
        <li><strong>node:fs/promises</strong> — Promise-based, modern</li>
      </ul>
      <p>Always use <code>node:fs/promises</code> for new code. Callbacks are error-prone.</p>

      <h2>Reading a file</h2>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

async function readConfig() {
  try {
    const data = await fs.readFile("config.json", "utf8");
    const config = JSON.parse(data);
    console.log("Config:", config);
  } catch (err) {
    console.error("Could not read file:", err.message);
  }
}

readConfig();</code></pre>
      <p>Key details:</p>
      <ul>
        <li><code>"utf8"</code> tells Node to return a string, not a Buffer.</li>
        <li>Always wrap in try/catch — the file might not exist.</li>
        <li>Parse JSON carefully — it can throw on malformed input.</li>
      </ul>

      <h2>Writing a file</h2>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

async function saveData() {
  const data = { name: "Alice", score: 42 };
  await fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
  console.log("Saved!");
}

saveData();</code></pre>
      <p><code>writeFile</code> <strong>overwrites</strong> the file. To append instead, use <code>appendFile</code>.</p>

      <h2>Appending to a file</h2>
      <pre><code class="language-javascript">await fs.appendFile("log.txt", "User logged in\\n", "utf8");</code></pre>

      <h2>Other operations</h2>
      <pre><code class="language-javascript">await fs.rename("old.txt", "new.txt");
await fs.unlink("file.txt");           // delete
await fs.mkdir("data", { recursive: true });  // create folder
const files = await fs.readdir(".");    // list files</code></pre>

      <h2>Path handling</h2>
      <p>Never concatenate paths with <code>+</code>. Use <code>node:path</code>:</p>
      <pre><code class="language-javascript">const path = require("node:path");

const filePath = path.join(__dirname, "data", "config.json");
// correctly joins on Windows and Unix</code></pre>
      <p><code>__dirname</code> is the current file's directory. <code>path.join</code> uses the OS's separator automatically.</p>

      <h2>Sync vs async</h2>
      <p>Node also has sync variants (<code>fs.readFileSync</code>). <strong>Never use them in a server</strong> — they block the entire event loop. Only use sync functions for quick startup scripts.</p>

      <h2>Your turn — a simple notes app</h2>
      <p>Write a script that:</p>
      <ul>
        <li>Reads a file <code>notes.json</code> (creates it if missing)</li>
        <li>Appends a new note to the array</li>
        <li>Writes the updated array back to the file</li>
      </ul>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

async function addNote(text) {
  let notes = [];
  try {
    const data = await fs.readFile("notes.json", "utf8");
    notes = JSON.parse(data);
  } catch (err) {
    // file doesn't exist yet — start with empty array
  }
  notes.push({ text, createdAt: new Date().toISOString() });
  await fs.writeFile("notes.json", JSON.stringify(notes, null, 2), "utf8");
  console.log("Note saved. Total:", notes.length);
}

addNote("Learn Node.js fs module");</code></pre>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Read and write files using node:fs/promises",
      "Use path.join to build cross-platform file paths",
      "Handle file errors with try/catch"
    ]
  },
  {
    title: "Events and EventEmitter",
    contentHtml: `
      <h2>Event-driven programming</h2>
      <p>Node.js is built around <strong>events</strong>. Instead of asking "is it done yet?" in a loop, you register a function to run <em>when</em> an event occurs. When the event fires, the listeners run.</p>
      <p>Examples of built-in events:</p>
      <ul>
        <li>An HTTP server emits <code>"request"</code> when a request arrives</li>
        <li>A stream emits <code>"data"</code> when new chunks arrive</li>
        <li>A process emits <code>"exit"</code> when it terminates</li>
      </ul>

      <h2>Using EventEmitter</h2>
      <p>The <code>EventEmitter</code> class is the foundation. Import it:</p>
      <pre><code class="language-javascript">const { EventEmitter } = require("node:events");

const emitter = new EventEmitter();

emitter.on("greeting", (name) => {
  console.log("Hello,", name);
});

emitter.emit("greeting", "Alice");
// Output: Hello, Alice</code></pre>

      <h2>How on and emit work</h2>
      <ul>
        <li><code>emitter.on(eventName, handler)</code> — registers a listener</li>
        <li><code>emitter.emit(eventName, ...args)</code> — fires the event, passing args to every listener</li>
      </ul>
      <p>You can register <strong>multiple</strong> listeners for the same event — all will run.</p>
      <pre><code class="language-javascript">emitter.on("login", (user) => console.log("User logged in:", user.name));
emitter.on("login", (user) => console.log("Updating lastLoginAt for:", user.name));
emitter.emit("login", { name: "Alice" });
// Both listeners run</code></pre>

      <h2>Once: fire only once</h2>
      <pre><code class="language-javascript">emitter.once("init", () => {
  console.log("This runs exactly once.");
});

emitter.emit("init");
emitter.emit("init");  // no output — listener removed after first call</code></pre>

      <h2>Removing listeners</h2>
      <pre><code class="language-javascript">function onLogin(user) { /* ... */ }

emitter.on("login", onLogin);
emitter.off("login", onLogin);    // remove a specific listener
emitter.removeAllListeners("login"); // remove all for an event</code></pre>

      <h2>Custom emitter subclass</h2>
      <p>Extend <code>EventEmitter</code> to make a class that emits its own events:</p>
      <pre><code class="language-javascript">const { EventEmitter } = require("node:events");

class Order extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
  }

  ship() {
    console.log("Shipping order", this.id);
    this.emit("shipped", { orderId: this.id, at: new Date() });
  }
}

const order = new Order(123);
order.on("shipped", (data) => {
  console.log("Notification sent for order", data.orderId);
});

order.ship();
// Shipping order 123
// Notification sent for order 123</code></pre>

      <h2>Why events matter</h2>
      <p>Events let different parts of your app communicate <em>without knowing about each other</em>. The order doesn't know who's listening. The notification service doesn't know how orders are created. They just exchange events — decoupled and testable.</p>

      <h2>Your turn</h2>
      <p>Build a notification system:</p>
      <pre><code class="language-javascript">const { EventEmitter } = require("node:events");

const notifier = new EventEmitter();

notifier.on("signup", (user) => console.log("Welcome email sent to", user.email));
notifier.on("signup", (user) => console.log("Onboarding started for", user.name));

notifier.emit("signup", { name: "Alice", email: "alice@example.com" });</code></pre>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Explain event-driven programming",
      "Use EventEmitter with on, emit, once, off",
      "Build custom emitter subclasses"
    ]
  },
  {
    title: "Asynchronous JavaScript in Node.js",
    contentHtml: `
      <h2>Why async matters</h2>
      <p>Node.js runs on a single thread. If you block that thread (e.g., with a synchronous file read), <em>nothing else runs</em> — no other requests, no other callbacks, no timers. That would make a server useless.</p>
      <p>The solution: <strong>non-blocking I/O</strong>. When you do I/O (read a file, query a database, make a network request), Node starts the operation in the background and moves on to other work. When the operation finishes, it queues a callback.</p>

      <h2>Callbacks — the old way</h2>
      <pre><code class="language-javascript">const fs = require("node:fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});</code></pre>
      <p>Problem: nested callbacks ("callback hell") become unreadable fast.</p>

      <h2>Promises — cleaner async</h2>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

fs.readFile("data.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));</code></pre>
      <p>A Promise represents a future value. It can be <em>pending</em>, <em>fulfilled</em>, or <em>rejected</em>.</p>

      <h2>async/await — the modern way</h2>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

async function readData() {
  try {
    const data = await fs.readFile("data.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error("Read failed:", err.message);
  }
}

readData();</code></pre>
      <p><code>await</code> pauses the <em>async function</em>, not the whole thread. While paused, Node handles other work.</p>

      <h2>The event loop</h2>
      <p>The <strong>event loop</strong> is Node's scheduler. It processes phases in a loop:</p>
      <ol>
        <li><strong>Timers</strong> — <code>setTimeout</code>, <code>setInterval</code></li>
        <li><strong>I/O callbacks</strong> — completed file reads, network responses</li>
        <li><strong>Poll</strong> — fetches new I/O events</li>
        <li><strong>Check</strong> — <code>setImmediate</code> callbacks</li>
        <li><strong>Close callbacks</strong> — <code>socket.on('close')</code></li>
      </ol>
      <p>Between phases, Node runs any pending microtasks (Promise <code>.then</code> handlers). This is why <code>await</code> resolves before the next phase.</p>

      <h2>Example: parallel vs sequential</h2>
      <pre><code class="language-javascript">// Sequential — takes 2s
await readFileA();
await readFileB();

// Parallel — takes 1s
await Promise.all([readFileA(), readFileB()]);</code></pre>
      <p>When operations are independent, use <code>Promise.all</code> to run them concurrently.</p>

      <h2>Error handling</h2>
      <p>Always wrap <code>await</code> in try/catch:</p>
      <pre><code class="language-javascript">try {
  const user = await findUser(email);
  if (!user) throw new Error("User not found");
  console.log(user.name);
} catch (err) {
  console.error("Login failed:", err.message);
}</code></pre>

      <h2>Your turn</h2>
      <p>Read two files in parallel, and if either fails, log the error but continue with the successful one:</p>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");

async function readAll() {
  const results = await Promise.allSettled([
    fs.readFile("a.txt", "utf8"),
    fs.readFile("b.txt", "utf8")
  ]);
  results.forEach((r, i) => {
    if (r.status === "fulfilled") console.log("File", i, "content:", r.value);
    else console.log("File", i, "error:", r.reason.message);
  });
}

readAll();</code></pre>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Explain non-blocking I/O",
      "Use callbacks, Promises, and async/await",
      "Understand the event loop phases",
      "Handle errors with try/catch"
    ]
  },
  {
    title: "Core Runtime APIs and Environment Variables",
    contentHtml: `
      <h2>The process object</h2>
      <p><code>process</code> is a global object representing the running Node.js process. It exposes:</p>
      <ul>
        <li><code>process.env</code> — environment variables</li>
        <li><code>process.argv</code> — command-line arguments</li>
        <li><code>process.cwd()</code> — current working directory</li>
        <li><code>process.exit(code)</code> — exit the process</li>
        <li><code>process.version</code> — Node version</li>
        <li><code>process.platform</code> — OS ("linux", "darwin", "win32")</li>
      </ul>

      <h2>Environment variables</h2>
      <p>Environment variables store configuration <em>outside</em> your code. This is essential for secrets:</p>
      <pre><code class="language-javascript">// BAD: hardcoded
const apiKey = "sk-abc123secret";

// GOOD: from environment
const apiKey = process.env.API_KEY;</code></pre>
      <p>Locally, set them in a <code>.env</code> file (never committed):</p>
      <pre><code class="language-bash"># .env
API_KEY=sk-abc123secret
PORT=3000NODE_ENV=development</code></pre>
      <p>Load them with the <code>dotenv</code> package:</p>
      <pre><code class="language-javascript">require("dotenv").config();

const port = process.env.PORT || 3000;
console.log("Server will listen on port", port);</code></pre>

      <h2>Command-line arguments</h2>
      <p><code>process.argv</code> is an array: <code>[node, scriptPath, ...args]</code>.</p>
      <pre><code class="language-bash">node app.js greet Alice</code></pre>
      <pre><code class="language-javascript">// app.js
const args = process.argv.slice(2);
// args = ["greet", "Alice"]

const [command, name] = args;
if (command === "greet") {
  console.log("Hello,", name);
}</code></pre>

      <h2>node:path — cross-platform paths</h2>
      <pre><code class="language-javascript">const path = require("node:path");

path.join("folder", "file.txt");        // "folder/file.txt" (or "folder\\file.txt" on Windows)
path.resolve("config.json");             // absolute path
path.basename("/home/user/data.json");   // "data.json"
path.dirname("/home/user/data.json");    // "/home/user"
path.extname("photo.png");               // ".png"
path.parse("/home/user/data.json");
// { root: "/", dir: "/home/user", base: "data.json", ext: ".json", name: "data" }</code></pre>
      <p><strong>Never</strong> concatenate paths with <code>+</code> or hardcoded <code>/</code>. Windows uses <code>\\</code> and Unix uses <code>/</code>. <code>path.join</code> handles both.</p>

      <h2>node:os — OS information</h2>
      <pre><code class="language-javascript">const os = require("node:os");

os.platform();      // "linux", "darwin", "win32"
os.arch();          // "x64", "arm64"
os.cpus().length;   // number of CPU cores
os.totalmem();      // total RAM in bytes
os.freemem();       // free RAM in bytes
os.homedir();       // user's home directory
os.tmpdir();        // temp directory</code></pre>
      <p>Use <code>os.cpus().length</code> to set worker thread pool sizes, or <code>os.homedir()</code> to find user config files.</p>

      <h2>Putting it together</h2>
      <p>A CLI greeting app that reads config from env:</p>
      <pre><code class="language-javascript">require("dotenv").config();

const name = process.argv[2] || "World";
const greeting = process.env.GREETING || "Hello";

console.log(\`\${greeting}, \${name}!\`);
console.log(\`Running on \${process.platform} with Node \${process.version}\`);</code></pre>

      <h2>Your turn</h2>
      <p>Write a script that:</p>
      <ul>
        <li>Reads the user's name from <code>process.argv[2]</code> (default: "World")</li>
        <li>Reads a greeting from <code>process.env.GREETING</code> (default: "Hello")</li>
        <li>Logs "<em>greeting</em>, <em>name</em>!"</li>
      </ul>
      <pre><code class="language-javascript">require("dotenv").config();

const name = process.argv[2] || "World";
const greeting = process.env.GREETING || "Hello";

console.log(\`\${greeting}, \${name}!\`);</code></pre>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Read env vars with process.env and dotenv",
      "Access CLI arguments via process.argv",
      "Use node:path and node:os for cross-platform code"
    ]
  },
  {
    title: "Practical Project: Command-Line Task Manager",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a CLI task manager that adds, lists, completes, and deletes tasks stored in a JSON file. This project combines everything from the course:</p>
      <ul>
        <li>Modules — split code into <code>tasks.js</code> and <code>app.js</code></li>
        <li>npm scripts — <code>npm run add -- "Task"</code></li>
        <li>File system — read/write <code>tasks.json</code></li>
        <li>Async/await — all file operations are async</li>
        <li>Error handling — try/catch everywhere</li>
        <li>process.argv — CLI arguments</li>
      </ul>

      <h2>Requirements</h2>
      <ol>
        <li>Store tasks in <code>tasks.json</code> in the current directory</li>
        <li>Commands:
          <ul>
            <li><code>node app.js add "Buy milk"</code> — add a task</li>
            <li><code>node app.js list</code> — list all tasks</li>
            <li><code>node app.js complete &lt;id&gt;</code> — mark task as done</li>
            <li><code>node app.js delete &lt;id&gt;</code> — remove a task</li>
          </ul>
        </li>
        <li>Each task has an <code>id</code>, <code>text</code>, <code>done</code> boolean, and <code>createdAt</code></li>
        <li>Handle the case where <code>tasks.json</code> doesn't exist yet</li>
      </ol>

      <h2>Starter: tasks.js</h2>
      <pre><code class="language-javascript">const fs = require("node:fs/promises");
const path = require("node:path");

const FILE = path.join(process.cwd(), "tasks.json");

async function load() {
  try {
    const data = await fs.readFile(FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function save(tasks) {
  await fs.writeFile(FILE, JSON.stringify(tasks, null, 2), "utf8");
}

module.exports = { load, save };</code></pre>

      <h2>Starter: app.js</h2>
      <pre><code class="language-javascript">const { load, save } = require("./tasks");

async function main() {
  const [, , command, ...args] = process.argv;
  const tasks = await load();

  if (command === "add") {
    const text = args.join(" ");
    if (!text) return console.error("Usage: node app.js add \\"Task text\\"");

    const id = Date.now().toString();
    tasks.push({ id, text, done: false, createdAt: new Date().toISOString() });
    await save(tasks);
    console.log(\`Added task #\${id}: \${text}\`);
  }

  else if (command === "list") {
    if (tasks.length === 0) return console.log("No tasks yet.");
    tasks.forEach((t) => {
      const marker = t.done ? "✓" : " ";
      console.log(\`[\${marker}] #\${t.id} \${t.text}\`);
    });
  }

  else if (command === "complete") {
    const id = args[0];
    const task = tasks.find((t) => t.id === id);
    if (!task) return console.error("Task not found:", id);

    task.done = true;
    await save(tasks);
    console.log(\`Completed task #\${id}\`);
  }

  else if (command === "delete") {
    const id = args[0];
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return console.error("Task not found:", id);

    tasks.splice(idx, 1);
    await save(tasks);
    console.log(\`Deleted task #\${id}\`);
  }

  else {
    console.log("Commands: add <text> | list | complete <id> | delete <id>");
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});</code></pre>

      <h2>Run it</h2>
      <pre><code class="language-bash">node app.js add "Learn Node.js"
node app.js add "Build a project"
node app.js list
node app.js complete 1234567890
node app.js list
node app.js delete 1234567890</code></pre>

      <h2>What you learned</h2>
      <ul>
        <li>How to persist structured data with JSON + fs</li>
        <li>How to parse CLI arguments</li>
        <li>How to structure a CLI app with modules</li>
        <li>How to handle errors gracefully</li>
      </ul>

      <h2>Final task</h2>
      <p>Complete all four commands (add, list, complete, delete) and submit the code. The tests verify:</p>
      <ul>
        <li>The <code>tasks.js</code> module exports <code>load</code> and <code>save</code></li>
        <li><code>app.js</code> handles all four commands</li>
        <li>File path is built with <code>path.join</code></li>
        <li>Async operations use <code>await</code></li>
      </ul>
    `,
    estimatedMinutes: 90,
    learningObjectives: [
      "Build a complete CLI application",
      "Persist data to a JSON file",
      "Use async/await with proper error handling",
      "Structure code into modules"
    ]
  }
];

async function seedNodeLessons() {
  const course = await Course.findOne({ slug: "node-js-runtime" });
  if (!course) {
    console.warn("⚠  Course not found: node-js-runtime");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  // Delete existing lessons for THIS course only, then reinsert
  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < nodeLessons.length; i++) {
    const l = nodeLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: nodeLessons.length } }
  );

  console.log(`   Node.js lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedNodeLessons };