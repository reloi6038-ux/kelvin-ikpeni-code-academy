/**
 * Kelvin Ikpeni Code Academy — ES6+ & Async JavaScript exercises
 * Targeted seed: adds 15 new ES6/async exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const es6Exercises = [
  {
    title: "ES6: Arrow Function Sum",
    slug: "es6-arrow-sum",
    description: "<p>Convert this to an arrow function: <code>function add(a, b) { return a + b; }</code></p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrow-functions",
    starterJs: "function add(a, b) {\n  return a + b;\n}\n\n// Rewrite as an arrow function\n",
    solutionJs: "const add = (a, b) => a + b;",
    hints: ["Use <code>const add = (a, b) => a + b;</code>", "Expression body returns implicitly."],
    testCases: [
      { description: "Uses arrow syntax =>", pattern: "=>" },
      { description: "Adds two parameters", pattern: "add\\s*=\\s*\\(\\s*a\\s*,\\s*b\\s*\\)" },
      { description: "Returns a + b", pattern: "a\\s*\\+\\s*b" }
    ],
    points: 15,
    order: 105
  },
  {
    title: "ES6: Template Literal",
    slug: "es6-template-literal",
    description: "<p>Use a template literal to log <code>'Hello, Alice! You are 30.'</code> given <code>name</code> and <code>age</code> variables.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "template-literals",
    starterJs: 'const name = "Alice";\nconst age = 30;\n\n// Log using a template literal\n',
    solutionJs: `const name = "Alice";
const age = 30;
console.log(\`Hello, \${name}! You are \${age}.\`);`,
    hints: ["Use backticks (`).", "Insert variables with ${name} and ${age}."],
    testCases: [
      { description: "Uses backticks", pattern: "`" },
      { description: "Uses ${name}", pattern: "\\$\\{\\s*name\\s*\\}" },
      { description: "Uses ${age}", pattern: "\\$\\{\\s*age\\s*\\}" },
      { description: "Logs to console", pattern: "console\\.log" }
    ],
    points: 15,
    order: 106
  },
  {
    title: "ES6: Default Parameters",
    slug: "es6-default-parameters",
    description: "<p>Write <code>greet(name = 'Guest')</code> that returns <code>'Hello, [name]!'</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "default-params",
    starterJs: "// Write the function with a default parameter\n",
    solutionJs: "const greet = (name = 'Guest') => `Hello, ${name}!`;",
    hints: ["Use <code>name = 'Guest'</code> in the parameter list.", "Return a template literal."],
    testCases: [
      { description: "Uses default parameter", pattern: "name\\s*=\\s*[\"']Guest[\"']" },
      { description: "Uses template literal", pattern: "`" },
      { description: "Returns greeting", expectText: "Hello" }
    ],
    points: 15,
    order: 107
  },
  {
    title: "ES6: Object Destructuring",
    slug: "es6-object-destructuring",
    description: "<p>Given <code>const user = { name: 'Alice', age: 30 }</code>, use destructuring to extract <code>name</code> and <code>age</code> into their own variables.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "destructuring",
    starterJs: 'const user = { name: "Alice", age: 30 };\n// Destructure here\n',
    solutionJs: 'const user = { name: "Alice", age: 30 };\nconst { name, age } = user;',
    hints: ["Use <code>const { name, age } = user;</code>.", "Curly braces on the left of the =."],
    testCases: [
      { description: "Destructures name and age", pattern: "\\{[^}]*name[^}]*age[^}]*\\}" },
      { description: "From user object", pattern: "=\\s*user" }
    ],
    points: 20,
    order: 108
  },
  {
    title: "ES6: Array Destructuring",
    slug: "es6-array-destructuring",
    description: "<p>Given <code>const colors = ['red', 'green', 'blue']</code>, use destructuring to get the first and third colors into <code>first</code> and <code>third</code> variables (skip the second).</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "destructuring",
    starterJs: "const colors = ['red', 'green', 'blue'];\n// Extract first and third\n",
    solutionJs: "const colors = ['red', 'green', 'blue'];\nconst [first, , third] = colors;",
    hints: ["Use square brackets.", "Use an empty slot for the skipped element: <code>[first, , third]</code>."],
    testCases: [
      { description: "Uses array destructuring", pattern: "\\[\\s*first\\s*," },
      { description: "Skips second element", pattern: "first\\s*,\\s*,\\s*third" },
      { description: "From colors array", pattern: "=\\s*colors" }
    ],
    points: 20,
    order: 109
  },
  {
    title: "ES6: Spread Merge Objects",
    slug: "es6-spread-merge",
    description: "<p>Merge two objects using spread. Given <code>a = { x: 1, y: 2 }</code> and <code>b = { y: 3, z: 4 }</code>, create a new object where <code>b</code>'s values override <code>a</code>'s.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "spread",
    starterJs: "const a = { x: 1, y: 2 };\nconst b = { y: 3, z: 4 };\n// Merge with b overriding a\n",
    solutionJs: "const a = { x: 1, y: 2 };\nconst b = { y: 3, z: 4 };\nconst merged = { ...a, ...b };",
    hints: ["Use <code>{ ...a, ...b }</code>.", "Later spreads override earlier ones."],
    testCases: [
      { description: "Uses spread operator", pattern: "\\.\\.\\." },
      { description: "Spreads both a and b", pattern: "\\.\\.\\.\\s*a[\\s\\S]*\\.\\.\\.\\s*b|\\.\\.\\.\\s*b[\\s\\S]*\\.\\.\\.\\s*a" }
    ],
    points: 20,
    order: 110
  },
  {
    title: "ES6: Rest Parameters",
    slug: "es6-rest-parameters",
    description: "<p>Write a function <code>sumAll(...nums)</code> that returns the sum of all arguments.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "rest",
    starterJs: "// Write sumAll with rest parameters\n",
    solutionJs: "const sumAll = (...nums) => nums.reduce((a, b) => a + b, 0);",
    hints: ["Use <code>(...nums)</code> to collect arguments.", "Use <code>.reduce()</code> to sum."],
    testCases: [
      { description: "Uses rest parameter", pattern: "\\.\\.\\.\\s*nums" },
      { description: "Uses reduce", pattern: "\\.reduce\\(" },
      { description: "Initial value 0", pattern: ",\\s*0\\s*\\)" }
    ],
    points: 20,
    order: 111
  },
  {
    title: "ES6: Optional Chaining",
    slug: "es6-optional-chaining",
    description: "<p>Safely access <code>user.profile.address.city</code> using optional chaining so it doesn't crash if any part is missing.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "optional-chaining",
    starterJs: 'const user = { name: "Alice" };\n// Safely access user.profile.address.city\n',
    solutionJs: 'const user = { name: "Alice" };\nconsole.log(user.profile?.address?.city);',
    hints: ["Use <code>?.</code> at each level.", "Without it, missing intermediate keys throw TypeError."],
    testCases: [
      { description: "Uses optional chaining ?.", pattern: "\\?\\." },
      { description: "Accesses profile", pattern: "profile" },
      { description: "Accesses address", pattern: "address" }
    ],
    points: 15,
    order: 112
  },
  {
    title: "ES6: Named Export",
    slug: "es6-named-export",
    description: "<p>Export a function called <code>multiply</code> using named export syntax.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "modules",
    starterJs: "// Write and export multiply\n",
    solutionJs: "export function multiply(a, b) {\n  return a * b;\n}",
    hints: ["Use <code>export function multiply(...)</code>.", "Or define then <code>export { multiply }</code>."],
    testCases: [
      { description: "Uses export keyword", pattern: "export" },
      { description: "Exports multiply", pattern: "multiply" }
    ],
    points: 15,
    order: 113
  },
  {
    title: "ES6: Import Named",
    slug: "es6-import-named",
    description: "<p>Import <code>add</code> and <code>multiply</code> from <code>'./math.js'</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "modules",
    starterJs: "// Import add and multiply from math.js\n",
    solutionJs: 'import { add, multiply } from "./math.js";',
    hints: ["Use <code>import { add, multiply } from ...</code>.", "Include the .js extension."],
    testCases: [
      { description: "Uses import keyword", pattern: "import" },
      { description: "Imports both", pattern: "\\{[^}]*add[^}]*multiply[^}]*\\}" },
      { description: "From math.js", pattern: "from\\s*[\"']\\./math\\.js[\"']" }
    ],
    points: 15,
    order: 114
  },
  {
    title: "Async: Promise Resolve",
    slug: "async-promise-resolve",
    description: "<p>Create a Promise that resolves with the string <code>'done'</code>. Log the resolved value with <code>.then()</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "promises",
    starterJs: "// Create a Promise that resolves with 'done'\n",
    solutionJs: `new Promise((resolve) => resolve("done"))
  .then((val) => console.log(val));`,
    hints: ["Use <code>new Promise((resolve, reject) => {...})</code>.", "Call <code>resolve('done')</code>."],
    testCases: [
      { description: "Creates new Promise", pattern: "new\\s+Promise" },
      { description: "Calls resolve", pattern: "resolve\\(" },
      { description: "Resolves with 'done'", pattern: "[\"']done[\"']" },
      { description: "Uses .then()", pattern: "\\.then\\(" }
    ],
    points: 20,
    order: 115
  },
  {
    title: "Async: Promise Catch",
    slug: "async-promise-catch",
    description: "<p>Create a Promise that rejects with an Error, and handle it with <code>.catch()</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "promises",
    starterJs: "// Reject a Promise and catch the error\n",
    solutionJs: `new Promise((resolve, reject) => reject(new Error("failed")))
  .catch((err) => console.error(err.message));`,
    hints: ["Use <code>reject(new Error('...'))</code>.", "Chain <code>.catch(err => ...)</code>."],
    testCases: [
      { description: "Creates new Promise", pattern: "new\\s+Promise" },
      { description: "Calls reject", pattern: "reject\\(" },
      { description: "Uses .catch()", pattern: "\\.catch\\(" }
    ],
    points: 20,
    order: 116
  },
  {
    title: "Async: Await Value",
    slug: "async-await-value",
    description: "<p>Write an async function <code>getValue()</code> that awaits a Promise resolving to <code>42</code> and returns the value.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "async-await",
    starterJs: "// Write async function using await\n",
    solutionJs: `async function getValue() {
  const value = await Promise.resolve(42);
  return value;
}`,
    hints: ["Mark function with <code>async</code>.", "Use <code>await Promise.resolve(42)</code>.", "Return the value."],
    testCases: [
      { description: "Uses async function", pattern: "async\\s+function|async\\s*\\(" },
      { description: "Uses await", pattern: "await" },
      { description: "Returns 42", pattern: "42" }
    ],
    points: 20,
    order: 117
  },
  {
    title: "Async: Try/Catch Await",
    slug: "async-try-catch",
    description: "<p>Write an async function that awaits a rejected Promise inside a try/catch block and logs the error message.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "async-errors",
    starterJs: "// Write async try/catch\n",
    solutionJs: `async function run() {
  try {
    await Promise.reject(new Error("oops"));
  } catch (err) {
    console.error(err.message);
  }
}`,
    hints: ["Use <code>try { await ... } catch (err) { ... }</code>.", "Log <code>err.message</code>."],
    testCases: [
      { description: "Uses async", pattern: "async" },
      { description: "Uses try/catch", pattern: "try\\s*\\{[\\s\\S]*catch" },
      { description: "Logs error message", pattern: "err\\.message" }
    ],
    points: 25,
    order: 118
  },
  {
    title: "Async: Promise.all",
    slug: "async-promise-all",
    description: "<p>Use <code>Promise.all</code> to await two Promises that resolve to <code>'A'</code> and <code>'B'</code>. Log the resulting array.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "promise-all",
    starterJs: "// Use Promise.all to await two values\n",
    solutionJs: `async function main() {
  const results = await Promise.all([
    Promise.resolve("A"),
    Promise.resolve("B")
  ]);
  console.log(results);
}
main();`,
    hints: ["Use <code>await Promise.all([...])</code>.", "Pass Promises as array items."],
    testCases: [
      { description: "Uses Promise.all", pattern: "Promise\\.all" },
      { description: "Uses await", pattern: "await" },
      { description: "Logs results", pattern: "console\\.log" }
    ],
    points: 25,
    order: 119
  }
];

async function seedEs6Exercises() {
  const course = await Course.findOne({ slug: "es6-and-async-javascript" });
  if (!course) {
    console.warn("⚠  Course not found: es6-and-async-javascript");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of es6Exercises) {
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

  console.log(`   ES6+ & Async exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedEs6Exercises };