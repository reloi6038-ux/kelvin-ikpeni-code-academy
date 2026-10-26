/**
 * Kelvin Ikpeni Code Academy — ES6+ & Async JavaScript quiz
 * Targeted seed: replaces ONLY the es6-and-async-javascript quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const es6Quiz = {
  title: "ES6+ & Async JavaScript Final Quiz",
  description: "Test your understanding of modern JavaScript — arrows, destructuring, modules, Promises, async/await, fetch, and advanced async patterns. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What does ECMAScript refer to?",
      options: [
        "A database engine",
        "The standard specification that defines how JavaScript works",
        "A CSS framework",
        "A Node.js build tool"
      ],
      correctIndex: 1,
      explanation: "ECMAScript is the specification. JavaScript is the implementation. ES6 (2015) was the big modern leap — hence 'ES6+'."
    },
    {
      question: "Which keyword declares a variable that can be reassigned but respects block scope?",
      options: ["var", "const", "let", "static"],
      correctIndex: 2,
      explanation: "let is block-scoped and reassignable. const is block-scoped but not reassignable. var is function-scoped — avoid it."
    },
    {
      question: "What does `const add = (a, b) => a + b;` do?",
      options: [
        "Throws an error because there's no return",
        "Returns a + b implicitly (no braces = implicit return)",
        "Returns undefined",
        "Requires a separate return statement"
      ],
      correctIndex: 1,
      explanation: "Arrow functions without curly braces use implicit return. The expression after => is returned automatically."
    },
    {
      question: "How do arrow functions handle `this`?",
      options: [
        "They have their own this, like regular functions",
        "They inherit this from the enclosing scope",
        "this is always undefined",
        "this refers to the global object"
      ],
      correctIndex: 1,
      explanation: "Arrow functions capture this lexically from where they're defined. This makes them ideal for callbacks inside methods."
    },
    {
      question: "What does `const { name, age } = user;` do?",
      options: [
        "Creates a copy of user",
        "Destructures name and age properties from user into variables",
        "Deletes name and age from user",
        "Requires name and age to be functions"
      ],
      correctIndex: 1,
      explanation: "Object destructuring extracts specific properties into local variables in one line. Equivalent to `const name = user.name; const age = user.age;`."
    },
    {
      question: "What does `[...arr1, ...arr2]` produce?",
      options: [
        "An error",
        "Nested arrays [[...arr1], [...arr2]]",
        "A single array combining both arrays",
        "Only the first array"
      ],
      correctIndex: 2,
      explanation: "Spread unpacks the elements of each array into a new array. The result is a single concatenated array."
    },
    {
      question: "What is the difference between spread and rest?",
      options: [
        "They are identical",
        "Spread unpacks values into an array/object; rest collects values into an array",
        "Rest only works in objects",
        "Spread only works in functions"
      ],
      correctIndex: 1,
      explanation: "Same `...` syntax, different meaning. In a function parameter list, it collects (rest). In an expression or function call, it unpacks (spread)."
    },
    {
      question: "Which is a correct NAMED export?",
      options: [
        "export default function add(a, b) {}",
        "export function add(a, b) {}",
        "module.exports.add = add",
        "exports.default = add"
      ],
      correctIndex: 1,
      explanation: "Named exports use `export function`, `export const`, or `export { x }`. Default exports use `export default` — only one per module."
    },
    {
      question: "To use ES Modules in Node.js, which of these is required?",
      options: [
        "Name files .js only",
        "Set `\"type\": \"module\"` in package.json, or use .mjs extension",
        "Use `require()` instead of import",
        "Install a special package"
      ],
      correctIndex: 1,
      explanation: "Node.js defaults to CommonJS. To use import/export, either name files .mjs or set `\"type\": \"module\"` in package.json."
    },
    {
      question: "What are the three states of a Promise?",
      options: [
        "open, closed, failed",
        "pending, fulfilled, rejected",
        "start, running, done",
        "waiting, resolved, error"
      ],
      correctIndex: 1,
      explanation: "A Promise starts as pending, then becomes fulfilled (with a value) or rejected (with an error). Once settled, it cannot change state."
    },
    {
      question: "What does `Promise.all([a, b, c])` do?",
      options: [
        "Returns the first result to finish",
        "Returns an array of all results, rejecting if ANY promise rejects",
        "Never rejects",
        "Runs promises sequentially"
      ],
      correctIndex: 1,
      explanation: "Promise.all runs all promises concurrently and fulfills with an array of all results. If ANY promise rejects, the whole thing rejects."
    },
    {
      question: "When should you use `Promise.allSettled()` instead of `Promise.all()`?",
      options: [
        "When you need all promises to run in parallel",
        "When you want partial results even if some promises fail",
        "When performance matters most",
        "When promises might never resolve"
      ],
      correctIndex: 1,
      explanation: "Promise.allSettled never rejects — it always waits for all promises and gives you per-promise results. Use when you want partial success over fail-fast."
    },
    {
      question: "Why must you check `res.ok` after `fetch()`?",
      options: [
        "Because fetch throws on any error",
        "Because fetch does NOT throw on HTTP errors (404, 500, etc.)",
        "Because res.ok is undefined by default",
        "Because fetch can only handle 200 responses"
      ],
      correctIndex: 1,
      explanation: "fetch only rejects on network failures. HTTP errors like 404 or 500 still return a resolved Promise. You must check `res.ok` (or `res.status`) explicitly."
    },
    {
      question: "What does `await` do inside an async function?",
      options: [
        "Blocks the entire JavaScript event loop",
        "Pauses the async function until the Promise settles, letting other code run",
        "Runs the Promise twice",
        "Throws an error if the Promise rejects"
      ],
      correctIndex: 1,
      explanation: "await pauses only the enclosing async function, not the whole program. Other synchronous code, timers, and network callbacks keep running."
    },
    {
      question: "What is `AbortController` used for in modern fetch?",
      options: [
        "Cancelling a fetch request (e.g., stale search requests)",
        "Caching responses",
        "Changing the HTTP method",
        "Parsing JSON faster"
      ],
      correctIndex: 0,
      explanation: "AbortController.signal can be passed to fetch. Calling controller.abort() cancels the request. Essential for search-as-you-type so old requests don't overwrite current results."
    }
  ]
};

async function seedEs6Quiz() {
  const course = await Course.findOne({ slug: "es6-and-async-javascript" });
  if (!course) {
    console.warn("⚠  Course not found: es6-and-async-javascript");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(es6Quiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...es6Quiz,
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

  console.log(`   ES6+ & Async quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedEs6Quiz };