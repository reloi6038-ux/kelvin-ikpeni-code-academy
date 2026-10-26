/**
 * Kelvin Ikpeni Code Academy — Introduction to Web Development exercises
 * Targeted seed: adds 12 exercises linked ONLY to the intro course.
 * Preserves all existing exercises.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const introExercises = [
  {
    title: "Identify HTTP Methods",
    slug: "identify-http-methods",
    description: "<p>Match each action to the correct HTTP method. For each line, write the method name (GET, POST, PUT, PATCH, DELETE) on the left side and a description on the right.</p><p><strong>Required format</strong>:</p><pre>GET - Retrieve data\nPOST - Create data\nPUT - Replace a resource\nPATCH - Modify part of a resource\nDELETE - Remove a resource</pre><p>Write all 5 lines.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "http",
    starterJs: "// Write your 5 lines here\n// GET - ...\n",
    solutionJs: `GET - Retrieve data
POST - Create data
PUT - Replace a resource
PATCH - Modify part of a resource
DELETE - Remove a resource`,
    hints: [
      "GET retrieves, POST creates.",
      "PUT replaces the whole thing; PATCH modifies part.",
      "DELETE removes."
    ],
    testCases: [
      { description: "Lists GET", pattern: "GET\\s*[-:]" },
      { description: "Lists POST", pattern: "POST\\s*[-:]" },
      { description: "Lists PUT", pattern: "PUT\\s*[-:]" },
      { description: "Lists PATCH", pattern: "PATCH\\s*[-:]" },
      { description: "Lists DELETE", pattern: "DELETE\\s*[-:]" }
    ],
    points: 15,
    order: 71
  },
  {
    title: "Interpret Status Codes",
    slug: "interpret-status-codes",
    description: "<p>For each status code below, write what it means on the right side of the dash.</p><pre>200 - \n201 - \n400 - \n401 - \n404 - \n500 - </pre><p>Fill in each one.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "http",
    starterJs: "200 - \n201 - \n400 - \n401 - \n404 - \n500 - \n",
    solutionJs: `200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Internal Server Error`,
    hints: [
      "2xx is success, 4xx is client error, 5xx is server error.",
      "200 means success, 201 means something was created."
    ],
    testCases: [
      { description: "200 - OK", pattern: "200\\s*[-:]\\s*OK" },
      { description: "201 - Created", pattern: "201\\s*[-:]\\s*Created" },
      { description: "400 - Bad Request", pattern: "400\\s*[-:]\\s*Bad\\s+Request" },
      { description: "404 - Not Found", pattern: "404\\s*[-:]\\s*Not\\s+Found" },
      { description: "500 - Server Error", pattern: "500\\s*[-:]\\s*(Internal\\s+)?Server\\s+Error" }
    ],
    points: 15,
    order: 72
  },
  {
    title: "Break Down a URL",
    slug: "break-down-a-url",
    description: "<p>Given this URL:</p><pre>https://api.example.com:443/courses/123?sort=new#top</pre><p>Label each component on its own line using this format:</p><pre>protocol: https\nhost: api.example.com\nport: 443\npath: /courses/123\nquery: ?sort=new\nfragment: #top</pre>",
    difficulty: "beginner",
    language: "node",
    topic: "urls",
    starterJs: "protocol: \nhost: \nport: \npath: \nquery: \nfragment: \n",
    solutionJs: `protocol: https
host: api.example.com
port: 443
path: /courses/123
query: ?sort=new
fragment: #top`,
    hints: [
      "The protocol comes before ://",
      "The port comes after the colon in the host.",
      "The fragment starts with #."
    ],
    testCases: [
      { description: "Identifies protocol", pattern: "protocol\\s*:\\s*https" },
      { description: "Identifies host", pattern: "host\\s*:\\s*api\\.example\\.com" },
      { description: "Identifies port", pattern: "port\\s*:\\s*443" },
      { description: "Identifies path", pattern: "path\\s*:\\s*/courses/123" },
      { description: "Identifies query", pattern: "query\\s*:\\s*\\?sort=new" },
      { description: "Identifies fragment", pattern: "fragment\\s*:\\s*#top" }
    ],
    points: 20,
    order: 73
  },
  {
    title: "Explain localhost:3000",
    slug: "explain-localhost-3000",
    description: "<p>Write a short explanation (3-5 sentences) of what <code>http://localhost:3000</code> means. Use words like <strong>loopback</strong>, <strong>port</strong>, <strong>listening</strong>, and <strong>your machine</strong>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "networking",
    starterJs: "// Explain localhost:3000 here\n",
    solutionJs: `localhost:3000 means your computer is listening on port 3000 on the loopback interface (127.0.0.1). It's a server running on your own machine, not accessible from the internet. The port 3000 is just the number the server chose to accept incoming HTTP requests on.`,
    hints: [
      "localhost = 127.0.0.1 = your own machine.",
      "The number after : is the port.",
      "Servers 'listen' on ports."
    ],
    testCases: [
      { description: "Mentions loopback or 127.0.0.1", pattern: "loopback|127\\.0\\.0\\.1" },
      { description: "Mentions port", pattern: "port\\s*3000" },
      { description: "Mentions listening", pattern: "listen" }
    ],
    points: 15,
    order: 74
  },
  {
    title: "Write a Health Check",
    slug: "write-a-health-check",
    description: "<p><strong>Simulated.</strong> Write an Express route at <code>GET /api/health</code> that returns JSON <code>{ status: \"ok\" }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Write your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});`,
    hints: [
      "Use app.get with the path /api/health.",
      "Use res.json({ status: 'ok' })."
    ],
    testCases: [
      { description: "Uses app.get", pattern: "app\\.get" },
      { description: "Path is /api/health", expectText: "/api/health" },
      { description: "Uses res.json", pattern: "res\\.json" },
      { description: "Returns status ok", pattern: "status\\s*:\\s*[\"']ok[\"']" }
    ],
    points: 20,
    order: 75
  },
  {
    title: "Explain DNS in Three Steps",
    slug: "explain-dns-three-steps",
    description: "<p>Explain DNS resolution in 3 numbered steps. Use these concepts in order: <strong>resolver</strong>, <strong>nameservers</strong>, <strong>IP address</strong>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "dns",
    starterJs: "1. \n2. \n3. \n",
    solutionJs: `1. The browser asks a DNS resolver to look up the domain.
2. The resolver asks nameservers (root, TLD, authoritative) until it finds the answer.
3. The nameserver returns the IP address, and the browser connects to it.`,
    hints: [
      "Start with: the browser asks a resolver.",
      "The resolver queries nameservers.",
      "The final answer is an IP address."
    ],
    testCases: [
      { description: "Mentions resolver", pattern: "resolver" },
      { description: "Mentions nameservers", pattern: "nameserver" },
      { description: "Mentions IP address", pattern: "IP\\s*address|IP\\s*\\(" }
    ],
    points: 15,
    order: 76
  },
  {
    title: "Trace the Request Flow",
    slug: "trace-request-flow",
    description: "<p>Order the following steps of a login request using numbers 1-6. Write <code>1: step</code> through <code>6: step</code>.</p><p>Steps (scrambled):</p><ul><li>Backend returns success</li><li>User submits the form</li><li>Frontend validates fields</li><li>Backend queries the database</li><li>Database returns the user</li><li>Frontend sends POST request</li></ul>",
    difficulty: "intermediate",
    language: "node",
    topic: "architecture",
    starterJs: "1: \n2: \n3: \n4: \n5: \n6: \n",
    solutionJs: `1: User submits the form
2: Frontend validates fields
3: Frontend sends POST request
4: Backend queries the database
5: Database returns the user
6: Backend returns success`,
    hints: [
      "Start with the user action.",
      "Validation happens before sending.",
      "Database query happens after the backend receives the request."
    ],
    testCases: [
      { description: "Has at least 6 numbered lines", pattern: "6\\s*:" },
      { description: "Mentions user submits form", pattern: "user\\s+submits" },
      { description: "Mentions validation", pattern: "valid" },
      { description: "Mentions POST request", pattern: "POST" },
      { description: "Mentions database query", pattern: "quer(y|ies)" }
    ],
    points: 20,
    order: 77
  },
  {
    title: "Write a Response with Status 404",
    slug: "write-response-404",
    description: "<p><strong>Simulated.</strong> Write an Express route <code>GET /api/missing</code> that returns HTTP status 404 with JSON <code>{ error: \"Not found\" }</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "responses",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// Your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/api/missing", (req, res) => {
  res.status(404).json({ error: "Not found" });
});`,
    hints: [
      "Use res.status(404).json({...}).",
      "The path is /api/missing."
    ],
    testCases: [
      { description: "Uses app.get", pattern: "app\\.get" },
      { description: "Path is /api/missing", expectText: "/api/missing" },
      { description: "Sets status 404", pattern: "status\\s*\\(\\s*404\\s*\\)" },
      { description: "Returns JSON error", pattern: "res\\.json|json\\s*\\(" }
    ],
    points: 20,
    order: 78
  },
  {
    title: "Match Ports to Protocols",
    slug: "match-ports-to-protocols",
    description: "<p>For each port number, write the protocol or service on the right side.</p><pre>80 - \n443 - \n3000 - \n27017 - </pre>",
    difficulty: "beginner",
    language: "node",
    topic: "networking",
    starterJs: "80 - \n443 - \n3000 - \n27017 - \n",
    solutionJs: `80 - HTTP
443 - HTTPS
3000 - Node.js (dev)
27017 - MongoDB`,
    hints: [
      "80 is unencrypted HTTP.",
      "443 is HTTPS.",
      "27017 is MongoDB's default port."
    ],
    testCases: [
      { description: "80 is HTTP", pattern: "80\\s*[-:]\\s*HTTP" },
      { description: "443 is HTTPS", pattern: "443\\s*[-:]\\s*HTTPS" },
      { description: "27017 is MongoDB", pattern: "27017\\s*[-:]\\s*MongoDB" }
    ],
    points: 15,
    order: 79
  },
  {
    title: "Explain the Difference: HTTP vs HTTPS",
    slug: "http-vs-https",
    description: "<p>Write 2-3 sentences explaining the difference between HTTP and HTTPS. Use the words <strong>encrypted</strong>, <strong>TLS</strong>, and <strong>secure</strong>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "http",
    starterJs: "// Write your explanation here\n",
    solutionJs: `HTTP sends data as plain text, so anyone on the network can read it. HTTPS is HTTP layered on top of TLS, which encrypts the data so it's secure. Modern browsers mark plain HTTP as "Not Secure" and require HTTPS for most web apps.`,
    hints: [
      "HTTPS = HTTP + TLS.",
      "HTTPS makes data unreadable in transit.",
      "Look for the lock icon in browsers."
    ],
    testCases: [
      { description: "Mentions encryption", pattern: "encrypt" },
      { description: "Mentions TLS", pattern: "TLS" },
      { description: "Mentions secure", pattern: "secure" }
    ],
    points: 15,
    order: 80
  },
  {
    title: "Identify the Frontend vs Backend",
    slug: "identify-frontend-backend",
    description: "<p>For each item, write <code>frontend</code> or <code>backend</code> on the right side.</p><pre>CSS styling - \nDatabase query - \nDOM manipulation - \nPassword hashing - \nFetch API call - \nSession management - </pre>",
    difficulty: "beginner",
    language: "node",
    topic: "architecture",
    starterJs: "CSS styling - \nDatabase query - \nDOM manipulation - \nPassword hashing - \nFetch API call - \nSession management - \n",
    solutionJs: `CSS styling - frontend
Database query - backend
DOM manipulation - frontend
Password hashing - backend
Fetch API call - frontend
Session management - backend`,
    hints: [
      "Anything visible or interactive is frontend.",
      "Anything dealing with data or security is backend."
    ],
    testCases: [
      { description: "CSS is frontend", pattern: "CSS\\s+styling\\s*[-:]\\s*frontend" },
      { description: "Database is backend", pattern: "Database\\s+query\\s*[-:]\\s*backend" },
      { description: "DOM is frontend", pattern: "DOM\\s+manipulation\\s*[-:]\\s*frontend" },
      { description: "Hashing is backend", pattern: "Password\\s+hashing\\s*[-:]\\s*backend" }
    ],
    points: 15,
    order: 81
  },
  {
    title: "Explain the Full Web Request Journey",
    slug: "full-web-request-journey",
    description: "<p>Explain what happens when a user types <code>https://example.com</code> into a browser and hits Enter. Cover these steps in order: <strong>DNS</strong>, <strong>TCP</strong>, <strong>TLS</strong>, <strong>HTTP request</strong>, <strong>HTTP response</strong>, <strong>rendering</strong>.</p><p>Use at least 6 sentences.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "architecture",
    starterJs: "// Write your explanation here\n",
    solutionJs: `1. DNS resolves the domain to an IP address.
2. The browser opens a TCP connection to that IP on port 443.
3. A TLS handshake runs to establish encryption.
4. The browser sends an HTTP GET request.
5. The server responds with HTML, CSS, and JS.
6. The browser parses the HTML into the DOM and renders the page.`,
    hints: [
      "DNS first, then TCP, then TLS, then HTTP.",
      "After the response, the browser renders.",
      "Cover each of the 6 steps."
    ],
    testCases: [
      { description: "Mentions DNS", pattern: "DNS" },
      { description: "Mentions TCP", pattern: "TCP" },
      { description: "Mentions TLS", pattern: "TLS" },
      { description: "Mentions HTTP request", pattern: "HTTP\\s+request|request" },
      { description: "Mentions response", pattern: "response" },
      { description: "Mentions rendering", pattern: "render" }
    ],
    points: 25,
    order: 82
  }
];

async function seedIntroExercises() {
  const course = await Course.findOne({ slug: "introduction-to-web-development" });
  if (!course) {
    console.warn("⚠  Course not found: introduction-to-web-development");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of introExercises) {
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

  console.log(`   Intro exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedIntroExercises };