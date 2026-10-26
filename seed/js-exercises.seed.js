/**
 * Kelvin Ikpeni Code Academy — JavaScript Essentials exercises
 * Targeted seed: adds 15 new JS-specific exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const jsExercises = [
  {
    title: "JS: Declare Variables",
    slug: "js-declare-variables",
    description: "<p>Declare three variables: <code>name</code> (const, string 'Alice'), <code>age</code> (let, number 30), and <code>isActive</code> (const, boolean true).</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "variables",
    starterJs: "// Declare your variables here\n",
    solutionJs: `const name = "Alice";
let age = 30;
const isActive = true;`,
    hints: ["Use <code>const</code> for values that don't change.", "Use <code>let</code> for values that might."],
    testCases: [
      { description: "Declares const name = 'Alice'", pattern: "const\\s+name\\s*=\\s*[\"']Alice[\"']" },
      { description: "Declares let age = 30", pattern: "let\\s+age\\s*=\\s*30" },
      { description: "Declares const isActive = true", pattern: "const\\s+isActive\\s*=\\s*true" }
    ],
    points: 15,
    order: 90
  },
  {
    title: "JS: Template Literal",
    slug: "js-template-literal",
    description: "<p>Given variables <code>name</code> and <code>age</code>, use a template literal to log <code>'Hi, my name is Alice and I am 30 years old.'</code></p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "strings",
    starterJs: 'const name = "Alice";\nconst age = 30;\n\n// Log using a template literal\n',
    solutionJs: `const name = "Alice";
const age = 30;
console.log(\`Hi, my name is \${name} and I am \${age} years old.\`);`,
    hints: ["Use backticks (`) for template literals.", "Insert variables with ${variable}."],
    testCases: [
      { description: "Uses backticks", pattern: "`" },
      { description: "Uses ${name}", pattern: "\\$\\{\\s*name\\s*\\}" },
      { description: "Uses ${age}", pattern: "\\$\\{\\s*age\\s*\\}" },
      { description: "Logs to console", pattern: "console\\.log" }
    ],
    points: 20,
    order: 91
  },
  {
    title: "JS: Arrow Function",
    slug: "js-arrow-function",
    description: "<p>Write an arrow function <code>square(n)</code> that returns n squared.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "functions",
    starterJs: "// Write the arrow function\n",
    solutionJs: "const square = (n) => n * n;",
    hints: ["Use <code>=&gt;</code> for arrow functions.", "Return implicitly if no braces."],
    testCases: [
      { description: "Uses arrow syntax =>", pattern: "=>" },
      { description: "Declares square", pattern: "const\\s+square|let\\s+square|function\\s+square|square\\s*=" },
      { description: "Multiplies n by n", pattern: "n\\s*\\*\\s*n" }
    ],
    points: 15,
    order: 92
  },
  {
    title: "JS: If Else",
    slug: "js-if-else",
    description: "<p>Write a function <code>checkNumber(n)</code> that returns 'positive', 'zero', or 'negative' based on n.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "conditionals",
    starterJs: "function checkNumber(n) {\n  // your code\n}\n",
    solutionJs: `function checkNumber(n) {
  if (n > 0) return "positive";
  if (n === 0) return "zero";
  return "negative";
}`,
    hints: ["Use if/else if/else.", "Check for zero before positive/negative."],
    testCases: [
      { description: "Uses if statement", pattern: "if\\s*\\(" },
      { description: "Returns positive", expectText: "positive" },
      { description: "Returns zero", expectText: "zero" },
      { description: "Returns negative", expectText: "negative" }
    ],
    points: 20,
    order: 93
  },
  {
    title: "JS: For Loop",
    slug: "js-for-loop",
    description: "<p>Use a for loop to log numbers 1 through 5.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "loops",
    starterJs: "// Write a for loop\n",
    solutionJs: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
    hints: ["Start at 1.", "End at 5 (use <=)."],
    testCases: [
      { description: "Uses for loop", pattern: "for\\s*\\(" },
      { description: "Iterates with i++", pattern: "i\\+\\+" },
      { description: "Logs to console", pattern: "console\\.log" }
    ],
    points: 15,
    order: 94
  },
  {
    title: "JS: Array Map",
    slug: "js-array-map",
    description: "<p>Use <code>map()</code> to double each number in <code>[1, 2, 3, 4]</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "const numbers = [1, 2, 3, 4];\n// Use map to double each number\n",
    solutionJs: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);`,
    hints: ["Use <code>.map()</code>.", "Return n * 2 inside the callback."],
    testCases: [
      { description: "Uses .map()", pattern: "\\.map\\(" },
      { description: "Multiplies by 2", pattern: "\\*\\s*2|\\*\\s*2" },
      { description: "Uses arrow function", pattern: "=>" }
    ],
    points: 20,
    order: 95
  },
  {
    title: "JS: Array Filter",
    slug: "js-array-filter",
    description: "<p>Use <code>filter()</code> to keep only even numbers from <code>[1, 2, 3, 4, 5, 6]</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "const numbers = [1, 2, 3, 4, 5, 6];\n// Use filter to keep evens\n",
    solutionJs: `const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter((n) => n % 2 === 0);`,
    hints: ["Use <code>.filter()</code>.", "Check <code>n % 2 === 0</code> for even."],
    testCases: [
      { description: "Uses .filter()", pattern: "\\.filter\\(" },
      { description: "Checks modulo", pattern: "%\\s*2" },
      { description: "Compares to 0", pattern: "===\\s*0|==\\s*0" }
    ],
    points: 20,
    order: 96
  },
  {
    title: "JS: Reduce Sum",
    slug: "js-reduce-sum",
    description: "<p>Use <code>reduce()</code> to compute the sum of <code>[10, 20, 30, 40]</code>.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "arrays",
    starterJs: "const numbers = [10, 20, 30, 40];\n// Use reduce to sum\n",
    solutionJs: `const numbers = [10, 20, 30, 40];
const total = numbers.reduce((sum, n) => sum + n, 0);`,
    hints: ["Use <code>.reduce()</code>.", "Initial value should be 0."],
    testCases: [
      { description: "Uses .reduce()", pattern: "\\.reduce\\(" },
      { description: "Adds accumulator", pattern: "sum\\s*\\+\\s*n|\\+\\s*n|acc\\s*\\+" },
      { description: "Initial value 0", pattern: ",\\s*0\\s*\\)" }
    ],
    points: 25,
    order: 97
  },
  {
    title: "JS: Object Property Access",
    slug: "js-object-access",
    description: "<p>Given a user object, log the user's name using dot notation.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "objects",
    starterJs: 'const user = { name: "Alice", age: 30 };\n// Log the name\n',
    solutionJs: `const user = { name: "Alice", age: 30 };
console.log(user.name);`,
    hints: ["Use <code>user.name</code>.", "Wrap in <code>console.log()</code>."],
    testCases: [
      { description: "Uses user.name", pattern: "user\\.name" },
      { description: "Logs to console", pattern: "console\\.log" }
    ],
    points: 10,
    order: 98
  },
  {
    title: "JS: Destructure Object",
    slug: "js-destructure-object",
    description: "<p>Use object destructuring to extract <code>name</code> and <code>age</code> from a user object.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "objects",
    starterJs: 'const user = { name: "Alice", age: 30 };\n// Destructure name and age\n',
    solutionJs: `const user = { name: "Alice", age: 30 };
const { name, age } = user;`,
    hints: ["Use <code>const { name, age } = user;</code>.", "Curly braces on the left side of the =."],
    testCases: [
      { description: "Destructures name and age", pattern: "\\{[^}]*name[^}]*age[^}]*\\}" },
      { description: "From user object", pattern: "=\\s*user" }
    ],
    points: 20,
    order: 99
  },
  {
    title: "JS: Optional Chaining",
    slug: "js-optional-chaining",
    description: "<p>Given <code>user = { name: 'Alice' }</code>, safely log <code>user.address.city</code> using optional chaining (should not crash).</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "objects",
    starterJs: 'const user = { name: "Alice" };\n// Safely access address.city\n',
    solutionJs: `const user = { name: "Alice" };
console.log(user.address?.city);`,
    hints: ["Use <code>?.</code> before accessing nested properties.", "Without it, the code throws TypeError."],
    testCases: [
      { description: "Uses optional chaining ?.", pattern: "\\?\\." },
      { description: "Logs to console", pattern: "console\\.log" },
      { description: "Accesses address", pattern: "address" }
    ],
    points: 20,
    order: 100
  },
  {
    title: "JS: Select DOM Element",
    slug: "js-select-element",
    description: "<p>Use <code>document.querySelector</code> to select the element with id <code>title</code> and change its textContent to 'Hello'.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "dom",
    starterHtml: '<h1 id="title">Old Title</h1>',
    starterJs: "// Select and update the title\n",
    solutionJs: `const title = document.querySelector("#title");
title.textContent = "Hello";`,
    hints: ["Use <code>#title</code> to select by ID.", "Set <code>.textContent = 'Hello'</code>."],
    testCases: [
      { description: "Uses querySelector", pattern: "querySelector" },
      { description: "Selects #title", pattern: "[\"']#title[\"']" },
      { description: "Sets textContent", pattern: "textContent\\s*=" },
      { description: "Sets to 'Hello'", pattern: "[\"']Hello[\"']" }
    ],
    points: 20,
    order: 101
  },
  {
    title: "JS: Add Event Listener",
    slug: "js-add-event-listener",
    description: "<p>Add a click event listener to a button that logs 'Clicked!' when clicked.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "events",
    starterHtml: '<button id="btn">Click me</button>',
    starterJs: "// Add a click listener\n",
    solutionJs: `const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  console.log("Clicked!");
});`,
    hints: ["Use <code>addEventListener('click', fn)</code>.", "Log inside the callback."],
    testCases: [
      { description: "Selects element", pattern: "querySelector" },
      { description: "Uses addEventListener", pattern: "addEventListener" },
      { description: "Listens for click", pattern: "[\"']click[\"']" },
      { description: "Logs message", expectText: "Clicked!" }
    ],
    points: 20,
    order: 102
  },
  {
    title: "JS: Async Fetch",
    slug: "js-async-fetch",
    description: "<p>Write an async function that fetches <code>https://jsonplaceholder.typicode.com/users</code> and logs the response as JSON. Wrap in try/catch.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "async",
    starterJs: "// Write async fetch here\n",
    solutionJs: `async function loadUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}

loadUsers();`,
    hints: ["Use <code>async function</code>.", "Use <code>await fetch(url)</code>.", "Wrap in try/catch."],
    testCases: [
      { description: "Uses async function", pattern: "async\\s+function|async\\s*\\(" },
      { description: "Uses await fetch", pattern: "await\\s+fetch" },
      { description: "Uses res.json()", pattern: "\\.json\\(\\)" },
      { description: "Has try/catch", pattern: "try\\s*\\{[\\s\\S]*catch" }
    ],
    points: 30,
    order: 103
  },
  {
    title: "JS: Try Catch",
    slug: "js-try-catch",
    description: "<p>Wrap <code>JSON.parse('invalid')</code> in try/catch and log the error message in the catch block.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "errors",
    starterJs: "// Write try/catch around JSON.parse('invalid')\n",
    solutionJs: `try {
  JSON.parse("invalid");
} catch (err) {
  console.error(err.message);
}`,
    hints: ["Use try/catch blocks.", "Log <code>err.message</code>."],
    testCases: [
      { description: "Uses try block", pattern: "try\\s*\\{" },
      { description: "Uses catch block", pattern: "catch\\s*\\(" },
      { description: "Uses JSON.parse", pattern: "JSON\\.parse" },
      { description: "Logs err.message", pattern: "err\\.message|\\.message" }
    ],
    points: 20,
    order: 104
  }
];

async function seedJsExercises() {
  const course = await Course.findOne({ slug: "javascript-essentials" });
  if (!course) {
    console.warn("⚠  Course not found: javascript-essentials");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of jsExercises) {
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

  console.log(`   JavaScript exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedJsExercises };