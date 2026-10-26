/**
 * Kelvin Ikpeni Code Academy — Node.js Runtime exercises
 * Targeted seed: adds 15 Node.js-specific exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const nodeExercises = [
  {
    title: "Node: Log the Node Version",
    slug: "node-log-version",
    description: "<p>Write a script that logs <code>process.version</code> to the console.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "runtime",
    starterJs: "// Log the Node.js version\n",
    solutionJs: "console.log(process.version);\n",
    hints: ["Access the version via <code>process.version</code>.", "Use <code>console.log()</code> to print it."],
    testCases: [
      { description: "Uses process.version", pattern: "process\\.version" },
      { description: "Calls console.log", pattern: "console\\.log" }
    ],
    points: 10,
    order: 56
  },
  {
    title: "Node: Export a Function",
    slug: "node-export-function",
    description: "<p>In a module, export a function <code>greet(name)</code> that returns <code>\"Hello, \" + name</code>. Use CommonJS (<code>module.exports</code>).</p>",
    difficulty: "beginner",
    language: "node",
    topic: "modules",
    starterJs: "function greet(name) {\n  // Return the greeting\n}\n\n// Export the function\n",
    solutionJs: "function greet(name) {\n  return \"Hello, \" + name;\n}\n\nmodule.exports = { greet };\n",
    hints: ["Use <code>module.exports = { greet };</code>", "Return a string concatenation."],
    testCases: [
      { description: "Declares a greet function", pattern: "function\\s+greet|const\\s+greet\\s*=" },
      { description: "Returns a greeting", pattern: "return\\s+.*Hello" },
      { description: "Exports via module.exports", pattern: "module\\.exports" }
    ],
    points: 15,
    order: 57
  },
  {
    title: "Node: Require a Module",
    slug: "node-require-module",
    description: "<p>Import the built-in <code>node:path</code> module using <code>require</code>, then log the result of <code>path.join(\"a\", \"b\")</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "modules",
    starterJs: "// Require node:path and log the joined path\n",
    solutionJs: "const path = require(\"node:path\");\nconsole.log(path.join(\"a\", \"b\"));\n",
    hints: ["Use <code>require(\"node:path\")</code>", "Call <code>path.join()</code>."],
    testCases: [
      { description: "Requires node:path", pattern: "require\\([\"']node:path[\"']\\)" },
      { description: "Calls path.join", pattern: "path\\.join" },
      { description: "Logs the result", pattern: "console\\.log" }
    ],
    points: 15,
    order: 58
  },
  {
    title: "Node: Add an npm Script",
    slug: "node-npm-script",
    description: "<p>Write a valid <code>package.json</code> containing a <code>scripts</code> object with a <code>start</code> script set to <code>node server.js</code> and a <code>dev</code> script set to <code>nodemon server.js</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "npm",
    starterJs: "// Write your package.json as a JS object\nconst pkg = {\n  // ...\n};\nconsole.log(JSON.stringify(pkg, null, 2));\n",
    solutionJs: `const pkg = {
  name: "my-app",
  version: "1.0.0",
  scripts: {
    start: "node server.js",
    dev: "nodemon server.js"
  }
};
console.log(JSON.stringify(pkg, null, 2));`,
    hints: ["Add a <code>scripts</code> object.", "Set <code>start</code> to <code>node server.js</code>.", "Set <code>dev</code> to <code>nodemon server.js</code>."],
    testCases: [
      { description: "Has start script", pattern: "start\\s*:\\s*[\"']node\\s+server\\.js[\"']" },
      { description: "Has dev script", pattern: "dev\\s*:\\s*[\"']nodemon\\s+server\\.js[\"']" }
    ],
    points: 15,
    order: 59
  },
  {
    title: "Node: Read a File",
    slug: "node-read-a-file",
    description: "<p><strong>Simulated.</strong> Use <code>fs.promises.readFile</code> to read <code>data.txt</code> as utf8 and log it. Wrap in try/catch.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("node:fs/promises");\n\n// your code here\n',
    solutionJs: `const fs = require("node:fs/promises");

async function main() {
  try {
    const data = await fs.readFile("data.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}

main();`,
    hints: ["Use <code>await fs.readFile(filename, \"utf8\")</code>", "Wrap in try/catch."],
    testCases: [
      { description: "Requires node:fs/promises", pattern: "require\\([\"']node:fs/promises[\"']\\)" },
      { description: "Uses readFile", pattern: "readFile" },
      { description: "Uses utf8", pattern: "utf8" },
      { description: "Has try/catch", pattern: "try\\s*\\{[\\s\\S]*catch" }
    ],
    points: 20,
    order: 60
  },
  {
    title: "Node: Write to a File",
    slug: "node-write-a-file",
    description: "<p><strong>Simulated.</strong> Use <code>fs.promises.writeFile</code> to write 'Hello' to <code>output.txt</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("node:fs/promises");\n\n// your code here\n',
    solutionJs: `const fs = require("node:fs/promises");

async function main() {
  await fs.writeFile("output.txt", "Hello", "utf8");
  console.log("Saved");
}

main();`,
    hints: ["Use <code>await fs.writeFile(path, data, encoding)</code>."],
    testCases: [
      { description: "Requires node:fs/promises", pattern: "require\\([\"']node:fs/promises[\"']\\)" },
      { description: "Uses writeFile", pattern: "writeFile" },
      { description: "Writes 'Hello'", expectText: "Hello" }
    ],
    points: 15,
    order: 61
  },
  {
    title: "Node: Append to a File",
    slug: "node-append-file",
    description: "<p><strong>Simulated.</strong> Append the text 'New entry' to <code>log.txt</code> using <code>fs.appendFile</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("node:fs");\n\n// your code here\n',
    solutionJs: `const fs = require("node:fs");

fs.appendFile("log.txt", "New entry\\n", (err) => {
  if (err) console.error(err);
});`,
    hints: ["Use <code>fs.appendFile(filename, data, callback)</code>."],
    testCases: [
      { description: "Uses appendFile", pattern: "appendFile" },
      { description: "Targets log.txt", expectText: "log.txt" },
      { description: "Writes 'New entry'", expectText: "New entry" }
    ],
    points: 15,
    order: 62
  },
  {
    title: "Node: Emit a Custom Event",
    slug: "node-emit-event",
    description: "<p>Create a new <code>EventEmitter</code>, register a listener for the <code>\"hello\"</code> event, then emit it with a name.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "events",
    starterJs: 'const { EventEmitter } = require("node:events");\n\n// your code here\n',
    solutionJs: `const { EventEmitter } = require("node:events");

const emitter = new EventEmitter();
emitter.on("hello", (name) => console.log("Hello", name));
emitter.emit("hello", "World");`,
    hints: ["Create with <code>new EventEmitter()</code>.", "Register with <code>.on(\"hello\", callback)</code>.", "Fire with <code>.emit(\"hello\", args)</code>."],
    testCases: [
      { description: "Requires EventEmitter", pattern: "require\\([\"']node:events[\"']\\)" },
      { description: "Creates new EventEmitter", pattern: "new\\s+EventEmitter" },
      { description: "Registers on('hello')", pattern: "\\.on\\(\\s*[\"']hello[\"']" },
      { description: "Emits 'hello'", pattern: "\\.emit\\(\\s*[\"']hello[\"']" }
    ],
    points: 20,
    order: 63
  },
  {
    title: "Node: Use once",
    slug: "node-use-once",
    description: "<p>Register a listener with <code>emitter.once(\"init\", ...)</code> that logs 'Initialized', then emit <code>init</code> twice.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "events",
    starterJs: 'const { EventEmitter } = require("node:events");\n\nconst emitter = new EventEmitter();\n\n// Register once, emit twice\n',
    solutionJs: `const { EventEmitter } = require("node:events");

const emitter = new EventEmitter();
emitter.once("init", () => console.log("Initialized"));
emitter.emit("init");
emitter.emit("init");`,
    hints: ["Use <code>emitter.once()</code> instead of <code>emitter.on()</code>."],
    testCases: [
      { description: "Uses once", pattern: "\\.once\\(" },
      { description: "Emits twice", pattern: "\\.emit\\([\\s\\S]*\\.emit\\(" },
      { description: "Logs Initialized", expectText: "Initialized" }
    ],
    points: 15,
    order: 64
  },
  {
    title: "Node: Promise.all",
    slug: "node-promise-all",
    description: "<p>Use <code>Promise.all</code> to run two async functions in parallel and log the results.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "async",
    starterJs: "async function fetchA() { return 'A'; }\nasync function fetchB() { return 'B'; }\n\n// Fetch both in parallel\n",
    solutionJs: `async function fetchA() { return 'A'; }
async function fetchB() { return 'B'; }

async function main() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  console.log(a, b);
}

main();`,
    hints: ["<code>await Promise.all([...])</code>", "Destructure the result."],
    testCases: [
      { description: "Uses Promise.all", pattern: "Promise\\.all" },
      { description: "Uses await", pattern: "await" },
      { description: "Logs the result", pattern: "console\\.log" }
    ],
    points: 20,
    order: 65
  },
  {
    title: "Node: Read Environment Variable",
    slug: "node-read-env-var",
    description: "<p>Log the value of <code>process.env.NODE_ENV</code> with a fallback of <code>\"development\"</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "env",
    starterJs: "// Log NODE_ENV or a fallback\n",
    solutionJs: "console.log(process.env.NODE_ENV || \"development\");\n",
    hints: ["Use <code>process.env.NODE_ENV</code>.", "Fallback with <code>||</code>."],
    testCases: [
      { description: "Reads process.env.NODE_ENV", pattern: "process\\.env\\.NODE_ENV" },
      { description: "Has fallback", pattern: "\\|\\|\\s*[\"']development[\"']" }
    ],
    points: 15,
    order: 66
  },
  {
    title: "Node: CLI Arguments",
    slug: "node-cli-arguments",
    description: "<p>Read the third argument from <code>process.argv</code> (the first user-supplied arg) and log it.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "process",
    starterJs: "// Log the first user argument\n",
    solutionJs: "const name = process.argv[2];\nconsole.log(name);\n",
    hints: ["<code>process.argv[2]</code> is the first user-supplied arg.", "Log it."],
    testCases: [
      { description: "Reads process.argv[2]", pattern: "process\\.argv\\[2\\]" },
      { description: "Logs it", pattern: "console\\.log" }
    ],
    points: 15,
    order: 67
  },
  {
    title: "Node: path.join",
    slug: "node-path-join",
    description: "<p>Use <code>path.join</code> to build the path <code>folder/file.txt</code> and log it.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "path",
    starterJs: 'const path = require("node:path");\n\n// Build and log the path\n',
    solutionJs: "const path = require(\"node:path\");\nconsole.log(path.join(\"folder\", \"file.txt\"));\n",
    hints: ["Use <code>path.join(\"folder\", \"file.txt\")</code>."],
    testCases: [
      { description: "Requires node:path", pattern: "require\\([\"']node:path[\"']\\)" },
      { description: "Uses path.join", pattern: "path\\.join" },
      { description: "Joins folder and file", pattern: "join\\(\\s*[\"']folder[\"'].*[\"']file\\.txt[\"']" }
    ],
    points: 15,
    order: 68
  },
  {
    title: "Node: Handle Promise Rejection",
    slug: "node-catch-rejection",
    description: "<p>Wrap an <code>await</code> in try/catch that logs the error message when something fails.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "async",
    starterJs: "async function main() {\n  // Wrap this in try/catch\n  await failingOperation();\n}\n",
    solutionJs: `async function main() {
  try {
    await failingOperation();
  } catch (err) {
    console.error("Error:", err.message);
  }
}`,
    hints: ["Use try/catch around the <code>await</code>.", "Log <code>err.message</code>."],
    testCases: [
      { description: "Has try/catch", pattern: "try\\s*\\{[\\s\\S]*catch" },
      { description: "Uses await", pattern: "await" },
      { description: "Logs err.message", pattern: "err\\.message" }
    ],
    points: 20,
    order: 69
  },
  {
    title: "Node: Build a Simple CLI",
    slug: "node-simple-cli",
    description: "<p>Read <code>process.argv[2]</code> as a command. If it's <code>\"greet\"</code>, log <code>\"Hello!\"</code>. Otherwise log <code>\"Unknown command\"</code>.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "cli",
    starterJs: "// Handle the command\n",
    solutionJs: `const command = process.argv[2];
if (command === "greet") {
  console.log("Hello!");
} else {
  console.log("Unknown command");
}`,
    hints: ["Use <code>process.argv[2]</code>.", "Use <code>if (command === \"greet\")</code>."],
    testCases: [
      { description: "Reads argv[2]", pattern: "process\\.argv\\[2\\]" },
      { description: "Checks for 'greet'", pattern: "===?\\s*[\"']greet[\"']" },
      { description: "Logs Hello", expectText: "Hello!" },
      { description: "Logs Unknown command", expectText: "Unknown command" }
    ],
    points: 25,
    order: 70
  }
];

async function seedNodeExercises() {
  const course = await Course.findOne({ slug: "node-js-runtime" });
  if (!course) {
    console.warn("⚠  Course not found: node-js-runtime");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of nodeExercises) {
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

  console.log(`   Node.js exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedNodeExercises };