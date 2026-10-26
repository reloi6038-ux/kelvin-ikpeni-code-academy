/**
 * Kelvin Ikpeni Code Academy — Quiz seed
 * One quiz per course. Idempotent.
 * Part 3: HTML Fundamentals expanded to 15 questions.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const quizzesByCourseSlug = {
  "introduction-to-web-development": {
    title: "Introduction to Web Development Quiz",
    description: "Confirm your understanding of how the web works — clients, servers, DNS, and HTTP.",
    passPercent: 70,
    questions: [
      {
        question: "What does DNS do?",
        options: [
          "Encrypts HTTP requests",
          "Translates domain names into IP addresses",
          "Compresses images",
          "Bundles JavaScript"
        ],
        correctIndex: 1,
        explanation: "DNS is the phonebook of the internet — it maps human names to IP addresses."
      },
      {
        question: "Which side stores the database in a typical web app?",
        options: ["The frontend", "The backend", "The browser cache", "The CDN"],
        correctIndex: 1,
        explanation: "The backend owns the database; the frontend requests data via APIs."
      },
      {
        question: "What is an API?",
        options: [
          "A pre-installed code editor",
          "A contract that lets two systems communicate",
          "An image format",
          "A CSS framework"
        ],
        correctIndex: 1,
        explanation: "APIs are the contract between the client and the server."
      },
      {
        question: "Which protocol do modern websites use for secure communication?",
        options: ["FTP", "HTTPS", "SMTP", "TCP-only"],
        correctIndex: 1,
        explanation: "HTTPS encrypts traffic using TLS so no one can read it in transit."
      }
    ]
  },

  "html-fundamentals": {
    title: "HTML Fundamentals Final Quiz",
    description: "Prove your understanding of HTML structure, semantics, accessibility, and forms. 15 questions covering everything from the 7 lessons.",
    passPercent: 70,
    questions: [
      {
        question: "Which tag defines the largest heading?",
        options: ["<h6>", "<h1>", "<head>", "<header>"],
        correctIndex: 1,
        explanation: "<h1> is the top-level heading. Headings go from <h1> (largest) to <h6> (smallest)."
      },
      {
        question: "What does <!DOCTYPE html> do?",
        options: [
          "Creates a comment",
          "Tells the browser to use modern HTML5 standards mode",
          "Loads the CSS file",
          "Defines the page title"
        ],
        correctIndex: 1,
        explanation: "The doctype switches the browser into standards mode, avoiding quirks. Without it, browsers render in legacy mode."
      },
      {
        question: "Which is a self-closing (empty) HTML element?",
        options: ["<p>", "<img>", "<div>", "<h1>"],
        correctIndex: 1,
        explanation: "<img> is an empty element — it has no content and no closing tag. Others like <p> require </p>."
      },
      {
        question: "Which semantic element represents the primary navigation of a page?",
        options: ["<menu>", "<nav>", "<aside>", "<section>"],
        correctIndex: 1,
        explanation: "<nav> is the correct semantic element for navigation links, helping screen reader users jump to navigation."
      },
      {
        question: "Which element should contain the primary content of a page?",
        options: ["<body>", "<main>", "<div id='content'>", "<article>"],
        correctIndex: 1,
        explanation: "<main> wraps the primary content — one per page, no repeated boilerplate. Screen readers can jump directly to it."
      },
      {
        question: "Which element is self-contained content like a blog post?",
        options: ["<section>", "<article>", "<div>", "<aside>"],
        correctIndex: 1,
        explanation: "<article> is for content that makes sense on its own — a post, a comment, a widget."
      },
      {
        question: "Which meta tag is required for mobile responsiveness?",
        options: [
          "<meta charset='UTF-8'>",
          "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
          "<meta name='description'>",
          "<meta http-equiv='X-UA-Compatible'>"
        ],
        correctIndex: 1,
        explanation: "The viewport meta tells mobile browsers to use the device's actual width instead of pretending to be 980px wide."
      },
      {
        question: "Why should the <script> tag use the 'defer' attribute?",
        options: [
          "It makes scripts load faster",
          "It prevents scripts from blocking HTML parsing",
          "It caches scripts",
          "It minifies scripts"
        ],
        correctIndex: 1,
        explanation: "'defer' downloads the script in parallel but executes it after HTML is parsed, so the page renders without waiting for JS."
      },
      {
        question: "Which is the correct way to include descriptive alt text for an image?",
        options: [
          '<img src="pic.jpg">',
          '<img src="pic.jpg" alt="">',
          '<img src="pic.jpg" alt="A sunset over the ocean">',
          '<image src="pic.jpg" caption="sunset">'
        ],
        correctIndex: 2,
        explanation: "Always include descriptive alt text. Use alt='' only for purely decorative images that add no information."
      },
      {
        question: "Which is the correct way to link a <label> to an <input>?",
        options: [
          "Give them both the same class",
          "Use label[for] matching input[id]",
          "Wrap the label inside the input",
          "Add a title attribute to both"
        ],
        correctIndex: 1,
        explanation: "The label's 'for' attribute must match the input's 'id'. Clicking the label then focuses the input, and screen readers announce the association."
      },
      {
        question: "Which input type gives automatic email validation?",
        options: ['type="text"', 'type="email"', 'type="mail"', 'type="address"'],
        correctIndex: 1,
        explanation: 'type="email" enables HTML5 email validation — the browser blocks submission if the format is invalid.'
      },
      {
        question: "Which tag groups related form inputs and their legend?",
        options: ["<group>", "<fieldset>", "<section>", "<field-group>"],
        correctIndex: 1,
        explanation: "<fieldset> groups related form controls; use <legend> for the group label. Essential for accessible radio button groups."
      },
      {
        question: "Which tag should be used for header cells in a table?",
        options: ["<td>", "<th>", "<thead>", "<header>"],
        correctIndex: 1,
        explanation: "<th> marks a header cell. Screen readers use this to associate data cells with their column or row header."
      },
      {
        question: "Why is descriptive link text important?",
        options: [
          "It looks better visually",
          "Screen reader users often list all links out of context",
          "It's required by HTML spec",
          "It improves page load speed"
        ],
        correctIndex: 1,
        explanation: "Screen reader users navigate by listing all links. 'Click here' gives no context — 'Read the documentation' tells them where they're going."
      },
      {
        question: "What should you do before using ARIA attributes?",
        options: [
          "Use them for every element",
          "Check that a native semantic HTML element doesn't already solve the problem",
          "Add them only to <div> elements",
          "Use ARIA on all buttons"
        ],
        correctIndex: 1,
        explanation: "The first rule of ARIA is: don't use ARIA when native HTML works. <button> is better than <div role='button'>."
      }
    ]
  },

  "css-fundamentals": {
    title: "CSS Fundamentals Final Quiz",
    description: "Test your knowledge of selectors, layout, and the box model.",
    passPercent: 70,
    questions: [
      {
        question: "Which property controls the space INSIDE an element's border?",
        options: ["margin", "padding", "border", "gap"],
        correctIndex: 1,
        explanation: "padding is the inside space; margin is outside."
      },
      {
        question: "Which CSS property turns a container into a flex layout?",
        options: ["display: block", "display: flex", "display: grid", "display: table"],
        correctIndex: 1,
        explanation: "display: flex activates flexbox."
      },
      {
        question: "What does box-sizing: border-box do?",
        options: [
          "Removes the border",
          "Makes width include padding and border",
          "Adds a shadow",
          "Sets a min-width"
        ],
        correctIndex: 1,
        explanation: "border-box makes width/height include padding + border."
      },
      {
        question: "Which rule always wins when two selectors target the same element?",
        options: ["The first one", "The one with higher specificity", "The shortest one", "Alphabetical order"],
        correctIndex: 1,
        explanation: "Higher specificity wins. IDs beat classes beat elements."
      }
    ]
  },

  "javascript-essentials": {
    title: "JavaScript Essentials Final Quiz",
    description: "Confirm your grasp of variables, functions, and arrays.",
    passPercent: 70,
    questions: [
      {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "final"],
        correctIndex: 2,
        explanation: "const prevents reassignment (but objects/arrays can still be mutated)."
      },
      {
        question: "Which operator tests strict equality (no type coercion)?",
        options: ["=", "==", "===", "!="],
        correctIndex: 2,
        explanation: "=== compares value and type."
      },
      {
        question: "What does [1,2,3].map(x => x * 2) return?",
        options: ["6", "[2,4,6]", "[1,2,3]", "undefined"],
        correctIndex: 1,
        explanation: "map returns a new array of the same length."
      },
      {
        question: "Which is the correct arrow function for summing two numbers?",
        options: [
          "const sum = (a,b) => a + b;",
          "const sum => (a,b) a + b;",
          "function sum(a,b) => a+b;",
          "sum(a,b) -> a + b;"
        ],
        correctIndex: 0,
        explanation: "const sum = (a, b) => a + b; — the expression after => is returned."
      }
    ]
  },

  "es6-and-async-javascript": {
    title: "ES6+ & Async Quiz",
    description: "Modern JavaScript — destructuring, promises, async/await.",
    passPercent: 70,
    questions: [
      {
        question: "What does `const { a } = obj;` do?",
        options: [
          "Creates a copy of obj",
          "Destructures the `a` property from obj",
          "Deletes `a` from obj",
          "Renames obj to a"
        ],
        correctIndex: 1,
        explanation: "Object destructuring extracts specific properties into variables."
      },
      {
        question: "What does `await` do?",
        options: [
          "Blocks the entire event loop",
          "Pauses the async function until the promise settles",
          "Throws on any error",
          "Runs the promise twice"
        ],
        correctIndex: 1,
        explanation: "await pauses the enclosing async function, not the whole program."
      },
      {
        question: "Which is true about a Promise?",
        options: [
          "It runs twice by default",
          "It represents the eventual result of an async operation",
          "It replaces async/await entirely",
          "It is unique to Node.js"
        ],
        correctIndex: 1,
        explanation: "A Promise is a placeholder for a future value."
      }
    ]
  },

  "node-js-runtime": {
    title: "Node.js Runtime Quiz",
    description: "Modules, npm, event loop, and the file system.",
    passPercent: 70,
    questions: [
      {
        question: "What is Node.js built on?",
        options: ["Python", "Ruby", "V8 engine", "Deno"],
        correctIndex: 2,
        explanation: "Node.js uses Chrome's V8 engine to run JavaScript outside the browser."
      },
      {
        question: "Which file describes a Node.js project's dependencies and scripts?",
        options: ["index.js", "package.json", "node.modules", "config.js"],
        correctIndex: 1,
        explanation: "package.json holds metadata, scripts, and dependencies."
      },
      {
        question: "What does `npm install --save-dev nodemon` do?",
        options: [
          "Installs a runtime dependency",
          "Installs a dev-only dependency",
          "Removes nodemon",
          "Publishes the project"
        ],
        correctIndex: 1,
        explanation: "--save-dev adds it to devDependencies, useful only during development."
      }
    ]
  },

  "express-js-fundamentals": {
    title: "Express.js Fundamentals Quiz",
    description: "Routing, middleware, and error handling.",
    passPercent: 70,
    questions: [
      {
        question: "Which method defines a GET route in Express?",
        options: ["app.get()", "app.post()", "app.route()", "app.use()"],
        correctIndex: 0,
        explanation: "app.get() maps HTTP GET requests to a handler."
      },
      {
        question: "What is middleware in Express?",
        options: [
          "A database layer",
          "A function that runs before the route handler",
          "A template engine",
          "A CSS framework"
        ],
        correctIndex: 1,
        explanation: "Middleware functions receive (req, res, next) and run in order."
      },
      {
        question: "How do you send JSON from an Express handler?",
        options: ["res.send('json')", "res.json({...})", "res.writeJSON()", "res.body = {...}"],
        correctIndex: 1,
        explanation: "res.json() serializes an object and sets Content-Type: application/json."
      },
      {
        question: "Which middleware parses JSON request bodies?",
        options: ["express.parse()", "express.json()", "express.body()", "body.req()"],
        correctIndex: 1,
        explanation: "app.use(express.json()) parses JSON request bodies."
      }
    ]
  },

  "mongodb-mongoose": {
    title: "MongoDB & Mongoose Quiz",
    description: "Schemas, models, and CRUD.",
    passPercent: 70,
    questions: [
      {
        question: "What does a Mongoose Schema define?",
        options: ["A database backup", "The shape and validation of a document", "A route", "An index"],
        correctIndex: 1,
        explanation: "Schemas enforce the shape and rules of documents."
      },
      {
        question: "Which method inserts a new document?",
        options: ["Model.save()", "Model.create()", "Model.insert()", "Model.add()"],
        correctIndex: 1,
        explanation: "Model.create() saves a new document (Model.save() exists on instances)."
      },
      {
        question: "Which option hides a field by default in every query?",
        options: ["hidden: true", "select: false", "private: true", "visible: false"],
        correctIndex: 1,
        explanation: "select: false means the field is excluded unless explicitly requested."
      }
    ]
  },

  "authentication-security": {
    title: "Auth & Security Quiz",
    description: "Hashing, sessions, and OWASP basics.",
    passPercent: 70,
    questions: [
      {
        question: "Which library hashes passwords for Node.js?",
        options: ["crypto-js", "bcryptjs", "jwt-utils", "pass-hash"],
        correctIndex: 1,
        explanation: "bcryptjs is a widely used pure-JS bcrypt implementation."
      },
      {
        question: "Where should a session token live?",
        options: ["localStorage", "sessionStorage", "HttpOnly cookie", "URL query"],
        correctIndex: 2,
        explanation: "HttpOnly cookies aren't readable by JavaScript, protecting against XSS token theft."
      },
      {
        question: "What does CSRF stand for?",
        options: ["Cross-Site Request Forgery", "Client-Side Response Failure", "Cross-Server Request Format", "Cookie Save Route Flag"],
        correctIndex: 0,
        explanation: "CSRF tricks the browser into making a request the user didn't intend."
      }
    ]
  },

  "deploying-to-render": {
    title: "Deploying to Render Quiz",
    description: "Production env vars, health checks, and logs.",
    passPercent: 70,
    questions: [
      {
        question: "Where should secrets live in production?",
        options: ["In source code", "In .env committed to Git", "In Render's env vars", "In README"],
        correctIndex: 2,
        explanation: "Render's dashboard lets you set env vars securely without committing them."
      },
      {
        question: "Why is a health-check endpoint important?",
        options: [
          "It improves SEO",
          "It tells Render your app is alive so it can restart if down",
          "It speeds up the DB",
          "It caches pages"
        ],
        correctIndex: 1,
        explanation: "Render uses health checks to monitor and restart failing services."
      },
      {
        question: "What should COOKIE_SECURE be set to in production?",
        options: ["true", "false", "maybe", "it doesn't matter"],
        correctIndex: 0,
        explanation: "When the app is served over HTTPS, secure cookies prevent transmission over HTTP."
      }
    ]
  }
};

async function seedQuizzes() {
  let created = 0;
  let updated = 0;

  for (const [courseSlug, data] of Object.entries(quizzesByCourseSlug)) {
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      console.warn(`⚠  Course not found for quiz: ${courseSlug}`);
      continue;
    }

    const slug = Quiz.slugify(data.title);
    const existing = await Quiz.findOne({ slug });
    const payload = {
      ...data,
      slug,
      course: course._id,
      published: true
    };

    if (existing) {
      await Quiz.updateOne({ slug }, { $set: payload });
      updated++;
    } else {
      await Quiz.create(payload);
      created++;
    }
  }

  console.log(`   Quizzes:  ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedQuizzes };