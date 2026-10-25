/**
 * Kelvin Ikpeni Code Academy — Exercise seed
 * 20 exercises across HTML, CSS, JavaScript, Node, Express.
 * Idempotent: re-running updates existing exercises.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const exercises = [
  // ============ HTML ============
  {
    title: "Add a Heading",
    slug: "add-a-heading",
    description: "<p>Create an <code>&lt;h1&gt;</code> element with the text <strong>Hello, World!</strong> inside the body.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <h1>Hello, World!</h1>\n</body>",
    hints: ["Use an &lt;h1&gt; tag.", "Wrap the text: &lt;h1&gt;Hello, World!&lt;/h1&gt;"],
    testCases: [
      { description: "Contains an <h1> element", pattern: "<h1" },
      { description: "Contains the text 'Hello, World!'", expectText: "Hello, World!" }
    ],
    points: 10,
    order: 1
  },
  {
    title: "Create a Link",
    slug: "create-a-link",
    description: "<p>Add a link to <code>https://example.com</code> with the text <strong>Visit Site</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: '<body>\n  <a href="https://example.com">Visit Site</a>\n</body>',
    hints: ['Use &lt;a href="..."&gt;text&lt;/a&gt;'],
    testCases: [
      { description: "Contains an <a> tag", pattern: "<a " },
      { description: "Links to example.com", pattern: "https://example\\.com" },
      { description: "Text is 'Visit Site'", expectText: "Visit Site" }
    ],
    points: 10,
    order: 2
  },
  {
    title: "Build an Unordered List",
    slug: "build-unordered-list",
    description: "<p>Create an unordered list with three items: <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "lists",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: `<body>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
</body>`,
    hints: ["Use &lt;ul&gt; for the list.", "Each item is an &lt;li&gt;."],
    testCases: [
      { description: "Contains a <ul> element", pattern: "<ul" },
      { description: "Contains 'HTML'", expectText: "HTML" },
      { description: "Contains 'CSS'", expectText: "CSS" },
      { description: "Contains 'JavaScript'", expectText: "JavaScript" }
    ],
    points: 15,
    order: 3
  },

  // ============ CSS ============
  {
    title: "Color a Paragraph",
    slug: "color-a-paragraph",
    description: "<p>Make every <code>&lt;p&gt;</code> element <strong>blue</strong> using CSS.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "colors",
    starterHtml: "<body>\n  <p>Style me.</p>\n</body>",
    starterCss: "/* your css */\n",
    solutionCss: "p {\n  color: blue;\n}\n",
    hints: ["Target p.", "Set color: blue;"],
    testCases: [
      { description: "Uses the p selector", pattern: "p\\s*\\{" },
      { description: "Sets color to blue", pattern: "color\\s*:\\s*blue" }
    ],
    points: 10,
    order: 4
  },
  {
    title: "Center a Div",
    slug: "center-a-div",
    description: "<p>Center a <code>.box</code> div horizontally and vertically using flexbox.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "flexbox",
    starterHtml: '<body>\n  <div class="box">Hello</div>\n</body>',
    starterCss: "body {\n  height: 100vh;\n  /* your code */\n}\n",
    solutionCss: "body {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n",
    hints: ["Use display: flex on body.", "Combine justify-content and align-items."],
    testCases: [
      { description: "Uses display: flex", pattern: "display\\s*:\\s*flex" },
      { description: "Centers horizontally", pattern: "justify-content\\s*:\\s*center" },
      { description: "Centers vertically", pattern: "align-items\\s*:\\s*center" }
    ],
    points: 15,
    order: 5
  },

  // ============ JavaScript ============
  {
    title: "Say Hello",
    slug: "say-hello",
    description: "<p>Write a function <code>hello()</code> that returns the string <code>\"Hello, World!\"</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "functions",
    starterJs: "function hello() {\n  // your code here\n}\n",
    solutionJs: "function hello() {\n  return \"Hello, World!\";\n}\n",
    hints: ["Use return.", 'The string must be exactly "Hello, World!".'],
    testCases: [
      { description: "hello() returns 'Hello, World!'", callFn: "hello", input: [], expected: "Hello, World!" }
    ],
    points: 10,
    order: 6
  },
  {
    title: "Sum Two Numbers",
    slug: "sum-two-numbers",
    description: "<p>Write a function <code>sum(a, b)</code> that returns the sum of two numbers.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "functions",
    starterJs: "function sum(a, b) {\n  // your code here\n}\n",
    solutionJs: "function sum(a, b) {\n  return a + b;\n}\n",
    hints: ["Add the arguments.", "Return the result."],
    testCases: [
      { description: "sum(1, 2) === 3", callFn: "sum", input: [1, 2], expected: 3 },
      { description: "sum(10, -5) === 5", callFn: "sum", input: [10, -5], expected: 5 },
      { description: "sum(0, 0) === 0", callFn: "sum", input: [0, 0], expected: 0 }
    ],
    points: 10,
    order: 7
  },
  {
    title: "Reverse a String",
    slug: "reverse-a-string",
    description: "<p>Write <code>reverseString(s)</code> that returns the string reversed.</p><p>Example: <code>reverseString(\"abc\")</code> → <code>\"cba\"</code></p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function reverseString(s) {\n  // your code here\n}\n",
    solutionJs: 'function reverseString(s) {\n  return s.split("").reverse().join("");\n}\n',
    hints: ["split('') → array of chars.", "reverse() → reverses in place.", "join('') → back to string."],
    testCases: [
      { description: "reverseString('abc') === 'cba'", callFn: "reverseString", input: ["abc"], expected: "cba" },
      { description: "reverseString('') === ''", callFn: "reverseString", input: [""], expected: "" },
      { description: "reverseString('hello') === 'olleh'", callFn: "reverseString", input: ["hello"], expected: "olleh" }
    ],
    points: 15,
    order: 8
  },
  {
    title: "Even or Odd",
    slug: "even-or-odd",
    description: "<p>Write <code>evenOrOdd(n)</code> that returns <code>\"even\"</code> if n is even, else <code>\"odd\"</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "conditionals",
    starterJs: "function evenOrOdd(n) {\n  // your code here\n}\n",
    solutionJs: 'function evenOrOdd(n) {\n  return n % 2 === 0 ? "even" : "odd";\n}\n',
    hints: ["Use the modulo operator %.", "n % 2 === 0 means even."],
    testCases: [
      { description: "evenOrOdd(2) === 'even'", callFn: "evenOrOdd", input: [2], expected: "even" },
      { description: "evenOrOdd(3) === 'odd'", callFn: "evenOrOdd", input: [3], expected: "odd" },
      { description: "evenOrOdd(0) === 'even'", callFn: "evenOrOdd", input: [0], expected: "even" }
    ],
    points: 10,
    order: 9
  },
  {
    title: "FizzBuzz (Short)",
    slug: "fizzbuzz-short",
    description: "<p>Write <code>fizzBuzz(n)</code> that returns:</p><ul><li><strong>\"FizzBuzz\"</strong> if n is divisible by 15</li><li><strong>\"Fizz\"</strong> if n is divisible by 3</li><li><strong>\"Buzz\"</strong> if n is divisible by 5</li><li>otherwise the number as a string</li></ul>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "conditionals",
    starterJs: "function fizzBuzz(n) {\n  // your code here\n}\n",
    solutionJs: `function fizzBuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}
`,
    hints: ["Check divisibility by 15 first.", "Return String(n) for numbers."],
    testCases: [
      { description: "fizzBuzz(15) === 'FizzBuzz'", callFn: "fizzBuzz", input: [15], expected: "FizzBuzz" },
      { description: "fizzBuzz(3) === 'Fizz'", callFn: "fizzBuzz", input: [3], expected: "Fizz" },
      { description: "fizzBuzz(5) === 'Buzz'", callFn: "fizzBuzz", input: [5], expected: "Buzz" },
      { description: "fizzBuzz(7) === '7'", callFn: "fizzBuzz", input: [7], expected: "7" }
    ],
    points: 20,
    order: 10
  },
  {
    title: "Sum an Array",
    slug: "sum-an-array",
    description: "<p>Write <code>sumArray(arr)</code> that returns the sum of all numbers in an array.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function sumArray(arr) {\n  // your code here\n}\n",
    solutionJs: "function sumArray(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}\n",
    hints: ["Use .reduce().", "Start from 0."],
    testCases: [
      { description: "sumArray([1,2,3]) === 6", callFn: "sumArray", input: [[1, 2, 3]], expected: 6 },
      { description: "sumArray([]) === 0", callFn: "sumArray", input: [[]], expected: 0 },
      { description: "sumArray([10, -5]) === 5", callFn: "sumArray", input: [[10, -5]], expected: 5 }
    ],
    points: 15,
    order: 11
  },
  {
    title: "Find the Maximum",
    slug: "find-the-maximum",
    description: "<p>Write <code>max(arr)</code> that returns the largest number in an array.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function max(arr) {\n  // your code here\n}\n",
    solutionJs: "function max(arr) {\n  return Math.max(...arr);\n}\n",
    hints: ["Use Math.max.", "Spread the array with ...arr."],
    testCases: [
      { description: "max([1,5,3]) === 5", callFn: "max", input: [[1, 5, 3]], expected: 5 },
      { description: "max([-1,-5]) === -1", callFn: "max", input: [[-1, -5]], expected: -1 }
    ],
    points: 15,
    order: 12
  },
  {
    title: "Count Vowels",
    slug: "count-vowels",
    description: "<p>Write <code>countVowels(s)</code> that counts vowels (a,e,i,o,u) in a string.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function countVowels(s) {\n  // your code here\n}\n",
    solutionJs: `function countVowels(s) {
  const m = s.toLowerCase().match(/[aeiou]/g);
  return m ? m.length : 0;
}
`,
    hints: ["Use a regex: /[aeiou]/g.", "match() returns null if no vowels."],
    testCases: [
      { description: "countVowels('hello') === 2", callFn: "countVowels", input: ["hello"], expected: 2 },
      { description: "countVowels('xyz') === 0", callFn: "countVowels", input: ["xyz"], expected: 0 }
    ],
    points: 20,
    order: 13
  },
  {
    title: "Palindrome Check",
    slug: "palindrome-check",
    description: "<p>Write <code>isPalindrome(s)</code> that returns true if the string is a palindrome (case-insensitive).</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function isPalindrome(s) {\n  // your code here\n}\n",
    solutionJs: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
`,
    hints: ["Normalize to lowercase.", "Reverse and compare."],
    testCases: [
      { description: "isPalindrome('racecar') === true", callFn: "isPalindrome", input: ["racecar"], expected: true },
      { description: "isPalindrome('hello') === false", callFn: "isPalindrome", input: ["hello"], expected: false }
    ],
    points: 20,
    order: 14
  },
  {
    title: "Flatten an Array",
    slug: "flatten-an-array",
    description: "<p>Write <code>flatten(arr)</code> that flattens a nested array one level.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "arrays",
    starterJs: "function flatten(arr) {\n  // your code here\n}\n",
    solutionJs: "function flatten(arr) {\n  return arr.flat();\n}\n",
    hints: ["Use .flat().", "Or reduce + concat."],
    testCases: [
      { description: "flatten([1,[2,3]]) === [1,2,3]", callFn: "flatten", input: [[1, [2, 3]]], expected: [1, 2, 3], compare: "deepEqual" }
    ],
    points: 20,
    order: 15
  },
  {
    title: "Debounce Function",
    slug: "debounce-function",
    description: "<p>Write <code>debounce(fn, delay)</code> that returns a function which delays calling fn until after `delay` ms of no calls.</p>",
    difficulty: "advanced",
    language: "javascript",
    topic: "functions",
    starterJs: "function debounce(fn, delay) {\n  // your code here\n}\n",
    solutionJs: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
`,
    hints: ["Keep a timer variable in closure.", "clearTimeout on every call."],
    testCases: [
      { description: "Returns a function", callFn: "debounce", input: [function () {}, 100], expected: "function" }
    ],
    points: 30,
    order: 16
  },

  // ============ Node.js (simulated) ============
  {
    title: "Node: Read a File",
    slug: "node-read-a-file",
    description: "<p><strong>Simulated exercise.</strong> Write Node.js code that uses <code>fs.readFile</code> to read <code>data.txt</code> and log its contents. Solutions are pattern-checked, not executed.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("fs");\n\n// your code here\n',
    solutionJs: `const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
`,
    hints: ["Use fs.readFile.", "Pass a callback and check for err."],
    testCases: [
      { description: "Uses fs.readFile", pattern: "fs\\.readFile" },
      { description: "Reads data.txt", expectText: "data.txt" },
      { description: "Logs the data", pattern: "console\\.log" }
    ],
    points: 15,
    order: 17
  },

  // ============ Express (simulated) ============
  {
    title: "Express: GET Route",
    slug: "express-get-route",
    description: "<p><strong>Simulated exercise.</strong> Write an Express GET route on <code>/hello</code> that returns <code>\"Hello\"</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your route here\n',
    solutionJs: `const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello");
});
`,
    hints: ["Use app.get.", "The path is '/hello'."],
    testCases: [
      { description: "Uses app.get", pattern: "app\\.get" },
      { description: "Route is /hello", expectText: "/hello" },
      { description: "Sends 'Hello'", expectText: "Hello" }
    ],
    points: 15,
    order: 18
  },

  // ============ Debugging ============
  {
    title: "Fix: Off-by-One",
    slug: "fix-off-by-one",
    description: "<p>This function <code>firstN(arr, n)</code> should return the first n items. Find and fix the bug.</p><pre><code>function firstN(arr, n) {\n  return arr.slice(0, n - 1);\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function firstN(arr, n) {\n  return arr.slice(0, n - 1);\n}\n",
    solutionJs: "function firstN(arr, n) {\n  return arr.slice(0, n);\n}\n",
    hints: ["Look at the second argument of slice.", "slice(0, n) returns n items."],
    testCases: [
      { description: "firstN([1,2,3,4], 2) === [1,2]", callFn: "firstN", input: [[1, 2, 3, 4], 2], expected: [1, 2], compare: "deepEqual" }
    ],
    points: 15,
    order: 19
  },
  {
    title: "Fix: Missing Return",
    slug: "fix-missing-return",
    description: "<p>This function should double a number but it returns undefined. Find and fix the bug.</p><pre><code>function double(n) {\n  const r = n * 2;\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function double(n) {\n  const r = n * 2;\n}\n",
    solutionJs: "function double(n) {\n  return n * 2;\n}\n",
    hints: ["Functions need to return.", "Add return before n * 2."],
    testCases: [
      { description: "double(5) === 10", callFn: "double", input: [5], expected: 10 },
      { description: "double(0) === 0", callFn: "double", input: [0], expected: 0 }
    ],
    points: 10,
    order: 20
  }
];

async function seedExercises() {
  let created = 0;
  let updated = 0;

  const allCourses = await Course.find({});
  const courseBySlug = {};
  allCourses.forEach((c) => { courseBySlug[c.slug] = c; });

  const linkMap = {
    "html-fundamentals": ["add-a-heading", "create-a-link", "build-unordered-list"],
    "css-fundamentals": ["color-a-paragraph", "center-a-div"],
    "javascript-essentials": ["say-hello", "sum-two-numbers", "reverse-a-string", "even-or-odd", "fizzbuzz-short", "sum-an-array", "find-the-maximum"],
    "express-js-fundamentals": ["express-get-route"],
    "node-js-runtime": ["node-read-a-file"]
  };

  const exerciseToCourse = {};
  for (const [slug, exSlugs] of Object.entries(linkMap)) {
    if (!courseBySlug[slug]) continue;
    exSlugs.forEach((exSlug) => { exerciseToCourse[exSlug] = courseBySlug[slug]._id; });
  }

  for (const ex of exercises) {
    const slug = ex.slug || Exercise.slugify(ex.title);
    const existing = await Exercise.findOne({ slug });
    const payload = { ...ex, slug, course: exerciseToCourse[slug] || null };

    if (existing) {
      await Exercise.updateOne({ slug }, { $set: payload });
      updated++;
    } else {
      await Exercise.create(payload);
      created++;
    }
  }

  console.log(`   Exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedExercises };