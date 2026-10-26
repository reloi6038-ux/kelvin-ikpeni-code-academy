/**
 * Kelvin Ikpeni Code Academy — JavaScript Essentials quiz
 * Targeted seed: replaces ONLY the javascript-essentials quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const jsQuiz = {
  title: "JavaScript Essentials Final Quiz",
  description: "Test your understanding of JavaScript — variables, operators, control flow, functions, arrays, objects, DOM, events, and async programming. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What does JavaScript add to a webpage?",
      options: [
        "Structure and content",
        "Colours and layout",
        "Interactivity and behaviour",
        "Database storage"
      ],
      correctIndex: 2,
      explanation: "HTML provides structure, CSS provides styling, and JavaScript provides behaviour — the interactive logic that responds to user actions."
    },
    {
      question: "Which keyword declares a variable that cannot be reassigned?",
      options: ["var", "let", "const", "final"],
      correctIndex: 2,
      explanation: "const prevents reassignment. Use let when the value must change. Avoid var — it has confusing scoping rules."
    },
    {
      question: "What is the output of `typeof null`?",
      options: ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""],
      correctIndex: 1,
      explanation: "typeof null returns \"object\" — a well-known historical bug in JavaScript. To check for null, use `value === null`."
    },
    {
      question: "Which operator uses STRICT equality (no type coercion)?",
      options: ["==", "===", "=", "!="],
      correctIndex: 1,
      explanation: "=== compares both value and type. `5 == '5'` is true (coerces), but `5 === '5'` is false. Always prefer ===."
    },
    {
      question: "Which of these values is FALSY in JavaScript?",
      options: ["\"hello\"", "[]", "0", "{}"],
      correctIndex: 2,
      explanation: "The falsy values are: false, 0, -0, \"\" (empty string), null, undefined, and NaN. Empty arrays and objects are truthy."
    },
    {
      question: "What is the output of `console.log(\"1\"); setTimeout(() => console.log(\"2\"), 0); console.log(\"3\");`?",
      options: ["1, 2, 3", "1, 3, 2", "2, 1, 3", "3, 1, 2"],
      correctIndex: 1,
      explanation: "setTimeout defers its callback until the current synchronous code finishes. So 1 and 3 print first, then 2."
    },
    {
      question: "What does `return` do inside a function?",
      options: [
        "Logs a value to the console",
        "Stops the function and produces a value",
        "Pauses execution until input",
        "Declares a variable"
      ],
      correctIndex: 1,
      explanation: "return exits the function immediately and provides a value to whoever called it. Without return, a function yields undefined."
    },
    {
      question: "Which array method creates a NEW array by transforming each item?",
      options: ["forEach", "map", "filter", "reduce"],
      correctIndex: 1,
      explanation: "map() returns a new array of the same length, with each item transformed. forEach() returns nothing. filter() keeps items. reduce() collapses to one value."
    },
    {
      question: "What does `[1, 2, 3, 4, 5].filter(n => n % 2 === 0)` return?",
      options: ["[1, 3, 5]", "[2, 4]", "[true, false, true, false, true]", "2"],
      correctIndex: 1,
      explanation: "filter() keeps items where the callback returns true. For even numbers, that's [2, 4]."
    },
    {
      question: "What does `const { name } = user;` do?",
      options: [
        "Creates a new user object",
        "Destructures the `name` property from user into a variable",
        "Deletes `name` from user",
        "Renames user to name"
      ],
      correctIndex: 1,
      explanation: "Object destructuring extracts specific properties into variables in one line. `const { name } = user` is equivalent to `const name = user.name`."
    },
    {
      question: "What does the `??` operator do in `value ?? \"default\"`?",
      options: [
        "Compares two values",
        "Returns the right side ONLY if the left is null or undefined",
        "Returns the right side if the left is any falsy value",
        "Casts to boolean"
      ],
      correctIndex: 1,
      explanation: "?? (nullish coalescing) falls back only for null/undefined. Unlike ||, it does NOT fall back for 0 or empty string — those pass through."
    },
    {
      question: "Which method selects the FIRST element matching a CSS selector?",
      options: [
        "document.getElementById()",
        "document.querySelector()",
        "document.querySelectorAll()",
        "document.getElementsByClass()"
      ],
      correctIndex: 1,
      explanation: "querySelector() accepts any CSS selector and returns the first match. querySelectorAll() returns all matches as a NodeList."
    },
    {
      question: "What is the purpose of event.preventDefault() in a form submit handler?",
      options: [
        "Stops all JavaScript execution",
        "Prevents the browser's default behaviour (page reload)",
        "Validates the form automatically",
        "Sends the form to the server"
      ],
      correctIndex: 1,
      explanation: "A form's default submit behaviour is a page reload. preventDefault() stops that so you can handle submission with JavaScript."
    },
    {
      question: "What does `await` do inside an async function?",
      options: [
        "Blocks the entire event loop",
        "Pauses the async function until the Promise settles",
        "Throws an error",
        "Runs the function twice"
      ],
      correctIndex: 1,
      explanation: "await pauses the enclosing async function (not the whole program) until the Promise resolves or rejects. Other code continues to run."
    },
    {
      question: "Which method reads a response body as JSON after a fetch()?",
      options: [
        "response.text()",
        "response.json()",
        "response.body",
        "response.parse()"
      ],
      correctIndex: 1,
      explanation: "res.json() parses the response body as JSON and returns a Promise. You typically await it: `const data = await res.json()`."
    }
  ]
};

async function seedJsQuiz() {
  const course = await Course.findOne({ slug: "javascript-essentials" });
  if (!course) {
    console.warn("⚠  Course not found: javascript-essentials");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(jsQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...jsQuiz,
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

  console.log(`   JavaScript quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedJsQuiz };