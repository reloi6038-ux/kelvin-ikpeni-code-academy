/**
 * Kelvin Ikpeni Code Academy — Node.js Runtime quiz
 * Targeted seed: replaces ONLY the node-js-runtime quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const nodeQuiz = {
  title: "Node.js Runtime Final Quiz",
  description: "Test your understanding of Node.js — modules, npm, package.json, file system, events, async programming, and core APIs. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What is Node.js?",
      options: [
        "A CSS framework",
        "A JavaScript runtime that runs on servers",
        "A database engine",
        "A browser extension"
      ],
      correctIndex: 1,
      explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser, on servers, CLIs, and scripts."
    },
    {
      question: "Which JavaScript environment object is NOT available in Node.js?",
      options: ["process", "document", "Buffer", "__dirname"],
      correctIndex: 1,
      explanation: "document (and window) are browser-only APIs. Node.js has no DOM — instead it provides process, Buffer, and file system modules."
    },
    {
      question: "What does `process.version` return?",
      options: [
        "The current date",
        "The Node.js version string (e.g., v20.11.1)",
        "The operating system name",
        "The number of CPU cores"
      ],
      correctIndex: 1,
      explanation: "process.version returns the running Node.js version as a string, e.g., \"v20.11.1\"."
    },
    {
      question: "Which is the correct CommonJS export?",
      options: [
        "export function greet() {}",
        "module.exports = { greet };",
        "exports.greet;",
        "public greet() {}"
      ],
      correctIndex: 1,
      explanation: "CommonJS uses module.exports to expose values. export is ES Modules syntax, not CommonJS."
    },
    {
      question: "How do you import a built-in module like path in CommonJS?",
      options: [
        'import path from "path"',
        'const path = require("node:path")',
        'include("path")',
        'using path = require("path")'
      ],
      correctIndex: 1,
      explanation: "CommonJS uses require(). The node: prefix is recommended to distinguish built-ins from npm packages."
    },
    {
      question: "What is npm?",
      options: [
        "A JavaScript engine",
        "The Node Package Manager — a registry and CLI for packages",
        "A database protocol",
        "A CSS preprocessor"
      ],
      correctIndex: 1,
      explanation: "npm is the world's largest software registry, hosting over 2 million packages. It also provides the npm CLI for installing and managing them."
    },
    {
      question: "What does `npm install --save-dev nodemon` do?",
      options: [
        "Installs nodemon globally",
        "Installs nodemon as a runtime dependency",
        "Installs nodemon as a development-only dependency",
        "Removes nodemon from the project"
      ],
      correctIndex: 2,
      explanation: "--save-dev (or -D) adds the package to devDependencies — only needed during development, not in production."
    },
    {
      question: "What is the purpose of package-lock.json?",
      options: [
        "It locks the user out of the project",
        "It records the exact versions of every installed package for reproducible installs",
        "It stores user passwords",
        "It caches HTTP responses"
      ],
      correctIndex: 1,
      explanation: "package-lock.json locks the exact dependency tree (including nested deps) so everyone installs identical versions. Always commit it to Git."
    },
    {
      question: "Which file should NEVER be committed to Git?",
      options: ["package.json", "node_modules/", "package-lock.json", "README.md"],
      correctIndex: 1,
      explanation: "node_modules/ can be hundreds of MB and is fully reproducible from package.json + package-lock.json. Always add it to .gitignore."
    },
    {
      question: "What does the 'start' script in package.json let you run?",
      options: ["npm run start", "npm start", "node start", "npm execute"],
      correctIndex: 1,
      explanation: "The 'start' script is special: npm start runs it directly without needing 'run'. Other scripts require 'npm run <name>'."
    },
    {
      question: "Which module provides Promise-based file system operations?",
      options: ["node:fs", "node:fs/promises", "node:filesystem", "node:io"],
      correctIndex: 1,
      explanation: "node:fs/promises exposes readFile, writeFile, etc., as Promises you can await. node:fs uses callbacks."
    },
    {
      question: "Which is the correct way to safely join file paths across operating systems?",
      options: [
        '"folder" + "/" + "file.txt"',
        "path.join(\"folder\", \"file.txt\")",
        '"folder/file.txt"',
        "folder.concat(file)"
      ],
      correctIndex: 1,
      explanation: "path.join uses the OS-specific separator automatically. Hardcoded slashes break on Windows."
    },
    {
      question: "What happens when you call `emitter.emit(\"event\")` and no listener is registered?",
      options: [
        "It throws an error",
        "It logs a warning and returns false",
        "Nothing happens — it returns false",
        "Node.js crashes"
      ],
      correctIndex: 2,
      explanation: "emitting an event with no listeners returns false and does nothing. It doesn't throw. This is useful for optional events."
    },
    {
      question: "What does `await` do inside an async function?",
      options: [
        "Blocks the entire event loop",
        "Pauses the async function until the Promise settles, letting other work continue",
        "Throws an error",
        "Runs the operation twice"
      ],
      correctIndex: 1,
      explanation: "await pauses the async function, not the whole program. Node.js can handle other requests or callbacks while the Promise is pending."
    },
    {
      question: "Which is the correct way to read a value from an environment variable?",
      options: [
        "environment.NODE_ENV",
        "process.env.NODE_ENV",
        "env.NODE_ENV",
        "config.NODE_ENV"
      ],
      correctIndex: 1,
      explanation: "Environment variables are always accessible via process.env. Locally you set them in .env (loaded with dotenv); in production via the platform's dashboard."
    }
  ]
};

async function seedNodeQuiz() {
  const course = await Course.findOne({ slug: "node-js-runtime" });
  if (!course) {
    console.warn("⚠  Course not found: node-js-runtime");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(nodeQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...nodeQuiz,
    slug,
    course: course._id,
    published: true
  };

  let created = 0;
  let updated = 0;

  if (existing) {
    await Quiz.updateOne({ slug }, { $set: payload });
    updated = 1;
  } else {
    await Quiz.create(payload);
    created = 1;
  }

  console.log(`   Node.js quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedNodeQuiz };