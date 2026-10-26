/**
 * Kelvin Ikpeni Code Academy — ES6+ & Async JavaScript lessons
 * Targeted seed: updates ONLY the "es6-and-async-javascript" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const es6Lessons = [
  {
    title: "Modern JavaScript and ES6+ Fundamentals",
    contentHtml: `
      <h2>What is ECMAScript?</h2>
      <p><strong>ECMAScript</strong> is the standard specification that defines how JavaScript works. Each version adds new language features. The big turning point was <strong>ES6</strong> (2015), which introduced most of what we call "modern JavaScript."</p>
      <p>Versions since 2015 ship annually (ES2016, ES2017, …), but people still say "ES6+" to mean "modern JavaScript."</p>

      <h2>Why modern JavaScript matters</h2>
      <p>Older JavaScript was verbose and error-prone. Modern syntax is shorter, clearer, and safer:</p>
      <pre><code class="language-javascript">// ES5 (old)
var name = "Alice";
var greeting = "Hello, " + name + "!";
function greet(person) {
  person = person || "Guest";
  return "Hi, " + person;
}

// ES6+ (modern)
const name = "Alice";
const greeting = \`Hello, \${name}!\`;
const greet = (person = "Guest") => \`Hi, \${person}\`;</code></pre>
      <p>The modern version is shorter, has fewer bugs, and doesn't silently fail on missing values.</p>

      <h2>let and const</h2>
      <p>Replace <code>var</code> with <code>let</code> (reassignable) and <code>const</code> (not reassignable):</p>
      <pre><code class="language-javascript">let count = 0;
count = 1;              // fine

const name = "Alice";
name = "Bob";           // ERROR — const can't be reassigned

// But const objects CAN be mutated:
const user = { name: "Alice" };
user.name = "Bob";      // works — mutating, not reassigning</code></pre>
      <p>Rule of thumb: use <code>const</code> by default. Only switch to <code>let</code> when you must reassign.</p>

      <h2>Template literals</h2>
      <p>Backtick strings with <code>\${}</code> interpolation:</p>
      <pre><code class="language-javascript">const user = { name: "Alice", age: 30 };

// Old
const message = "Hi " + user.name + ", you are " + user.age;

// Modern
const message2 = \`Hi \${user.name}, you are \${user.age}\`;

// Multi-line (impossible with regular strings without \\n)
const html = \`
  &lt;div class="card"&gt;
    &lt;h2&gt;\${user.name}&lt;/h2&gt;
  &lt;/div&gt;
\`;</code></pre>

      <h2>Default parameters</h2>
      <pre><code class="language-javascript">// Old
function greet(name) {
  name = name || "Guest";
  return "Hi, " + name;
}

// Modern
const greet2 = (name = "Guest") => \`Hi, \${name}\`;

greet2();         // "Hi, Guest"
greet2("Alice");  // "Hi, Alice"</code></pre>

      <h2>Shorthand properties</h2>
      <p>When a variable name matches the property name, use shorthand:</p>
      <pre><code class="language-javascript">// Old
const name = "Alice";
const age = 30;
const user = { name: name, age: age };

// Modern
const user2 = { name, age };</code></pre>

      <h2>Your turn</h2>
      <p>Refactor this ES5 code into modern syntax:</p>
      <pre><code class="language-javascript">var items = [];
var total = 0;
for (var i = 0; i &lt; items.length; i++) {
  total = total + items[i].price;
}
console.log("Total: " + total);</code></pre>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what ECMAScript is",
      "Use let, const, template literals, and default parameters",
      "Recognize modern alternatives to older patterns"
    ]
  },
  {
    title: "Arrow Functions and Callbacks",
    contentHtml: `
      <h2>Arrow function syntax</h2>
      <p>Arrow functions are shorter and inherit <code>this</code> from their enclosing scope:</p>
      <pre><code class="language-javascript">// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function (block body)
const add = (a, b) => {
  return a + b;
};

// Arrow function (expression body — implicit return)
const add2 = (a, b) => a + b;

// Single parameter — no parentheses needed
const double = n => n * 2;

// No parameters
const greet = () => "Hello!";</code></pre>

      <h2>Implicit return</h2>
      <p>Without curly braces, the expression is returned automatically:</p>
      <pre><code class="language-javascript">// Explicit
const square = (n) => { return n * n; };

// Implicit
const square2 = (n) => n * n;</code></pre>
      <p>Need to return an object? Wrap in parentheses:</p>
      <pre><code class="language-javascript">const makeUser = (name) => ({ name, active: true });
// Without parentheses, {} would be parsed as a code block</code></pre>

      <h2>How arrows differ from regular functions</h2>
      <p><strong>1. No own <code>this</code></strong>:</p>
      <pre><code class="language-javascript">const user = {
  name: "Alice",

  greetTraditional: function () {
    setTimeout(function () {
      console.log(this.name);  // undefined — this is window/timer
    }, 0);
  },

  greetArrow: function () {
    setTimeout(() => {
      console.log(this.name);  // "Alice" — this is user
    }, 0);
  }
};</code></pre>
      <p>Arrow functions capture <code>this</code> from where they're defined. This makes them perfect for callbacks.</p>

      <p><strong>2. Cannot be used as constructors</strong>:</p>
      <pre><code class="language-javascript">const f = () => {};
new f();  // TypeError — arrow functions are not constructors</code></pre>

      <p><strong>3. No <code>arguments</code> object</strong>:</p>
      <pre><code class="language-javascript">const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
// Use rest parameters instead of arguments</code></pre>

      <h2>Callbacks</h2>
      <p>A <strong>callback</strong> is a function passed to another function to be called later:</p>
      <pre><code class="language-javascript">function processItems(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

processItems([1, 2, 3], (n) => console.log(n * 2));</code></pre>

      <h2>Array callbacks in practice</h2>
      <pre><code class="language-javascript">const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

numbers.forEach(n => console.log(n));</code></pre>
      <p>All of these accept a callback. Arrow functions make them concise and readable.</p>

      <h2>Callbacks with setTimeout</h2>
      <pre><code class="language-javascript">setTimeout(() => {
  console.log("3 seconds later");
}, 3000);

setInterval(() => {
  console.log("every 5 seconds");
}, 5000);</code></pre>

      <h2>Your turn</h2>
      <p>Convert these to arrow functions:</p>
      <ul>
        <li><code>function add(a, b) { return a + b; }</code></li>
        <li><code>function greet(name) { return "Hi, " + name; }</code></li>
        <li><code>[1,2,3].map(function(n) { return n * 2; })</code></li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Write arrow functions with block and expression bodies",
      "Explain how arrows handle this differently",
      "Use callbacks with array methods"
    ]
  },
  {
    title: "Destructuring, Spread, and Rest Syntax",
    contentHtml: `
      <h2>Object destructuring</h2>
      <p>Extract properties into variables in one line:</p>
      <pre><code class="language-javascript">const user = { name: "Alice", age: 30, email: "a@x.com" };

// Old
const name = user.name;
const age = user.age;

// Modern
const { name, age } = user;</code></pre>

      <p><strong>Renaming</strong>:</p>
      <pre><code class="language-javascript">const { name: userName, age: userAge } = user;</code></pre>

      <p><strong>Defaults</strong>:</p>
      <pre><code class="language-javascript">const { city = "Unknown" } = user;   // user.city is undefined → "Unknown"</code></pre>

      <p><strong>Nested destructuring</strong>:</p>
      <pre><code class="language-javascript">const data = { user: { name: "Alice", age: 30 } };
const { user: { name, age } } = data;</code></pre>

      <h2>Array destructuring</h2>
      <pre><code class="language-javascript">const [first, second] = [1, 2, 3];  // first=1, second=2

// Skip elements
const [, , third] = [1, 2, 3];      // third=3

// Rest
const [a, ...rest] = [1, 2, 3, 4];  // a=1, rest=[2,3,4]

// Swap without temp variable
let x = 1, y = 2;
[x, y] = [y, x];                    // x=2, y=1</code></pre>

      <h2>Destructuring in function parameters</h2>
      <pre><code class="language-javascript">// Old
function greet(user) {
  return "Hi, " + user.name;
}

// Modern
function greet2({ name }) {
  return \`Hi, \${name}\`;
}

greet2({ name: "Alice", age: 30 });  // "Hi, Alice"</code></pre>

      <h2>Spread syntax</h2>
      <p>Spread "unpacks" arrays and objects:</p>
      <pre><code class="language-javascript">// Copy arrays
const original = [1, 2, 3];
const copy = [...original];

// Combine arrays
const combined = [...[1, 2], ...(3, 4), 5];  // [1,2,3,4,5]

// Copy objects
const user = { name: "Alice" };
const updated = { ...user, age: 30 };  // { name:"Alice", age:30 }

// Override properties
const changed = { ...user, name: "Bob" };  // { name:"Bob" }

// Pass array elements as arguments
const numbers = [5, 2, 8];
Math.max(...numbers);   // 8</code></pre>
      <p>Spread creates a <strong>shallow copy</strong> — nested objects are still shared.</p>

      <h2>Rest parameters</h2>
      <p>Collect multiple arguments into a single array:</p>
      <pre><code class="language-javascript">function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4);      // 10
sum();                 // 0</code></pre>

      <p>Combine regular and rest parameters:</p>
      <pre><code class="language-javascript">function log(level, ...messages) {
  console.log(level, ...messages);
}

log("INFO", "User logged in", "session=123");</code></pre>

      <h2>Rest in destructuring</h2>
      <pre><code class="language-javascript">const { name, ...others } = { name: "A", age: 30, email: "x@y" };
// name = "A", others = { age: 30, email: "x@y" }

const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]</code></pre>

      <h2>Optional chaining</h2>
      <p>Safely access nested properties:</p>
      <pre><code class="language-javascript">const user = { name: "Alice" };

user.address.city;           // ERROR — address is undefined
user.address?.city;          // undefined — safe
user.address?.city?.zip;     // undefined — chained safely

// Combine with nullish coalescing
const city = user.address?.city ?? "Unknown";</code></pre>

      <h2>Your turn</h2>
      <p>Given two objects:</p>
      <pre><code class="language-javascript">const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };</code></pre>
      <p>Create a merged object where b's <code>y</code> overrides a's. Then destructure <code>x</code> and <code>z</code> out of the result.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Destructure objects and arrays",
      "Use spread to copy and merge",
      "Use rest parameters and optional chaining"
    ]
  },
  {
    title: "JavaScript Modules: Import and Export",
    contentHtml: `
      <h2>Why modules?</h2>
      <p>As applications grow, a single 5,000-line file becomes impossible to maintain. Modules let you split code into focused, reusable, testable files.</p>

      <h2>Named exports</h2>
      <p>Export multiple things from a file:</p>
      <pre><code class="language-javascript">// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export const PI = 3.14159;</code></pre>
      <p>Import them with matching names:</p>
      <pre><code class="language-javascript">// app.js
import { add, multiply, PI } from "./math.js";

console.log(add(2, 3));</code></pre>

      <h2>Default export</h2>
      <p>One main thing per file — imported with any name:</p>
      <pre><code class="language-javascript">// user.js
export default function createUser(name) {
  return { name, createdAt: new Date() };
}</code></pre>
      <pre><code class="language-javascript">// app.js
import createUser from "./user.js";      // any name works
import makeUser from "./user.js";        // also works

const user = createUser("Alice");</code></pre>
      <p>You can have one default export and any number of named exports in the same file.</p>

      <h2>Import aliasing</h2>
      <pre><code class="language-javascript">import { add as sum } from "./math.js";

// Import everything
import * as math from "./math.js";
math.add(2, 3);</code></pre>

      <h2>Re-exports</h2>
      <p>Combine modules into a barrel file:</p>
      <pre><code class="language-javascript">// utils/index.js
export { add, multiply } from "./math.js";
export { default as createUser } from "./user.js";</code></pre>

      <h2>Modules in browsers</h2>
      <pre><code class="language-html">&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</code></pre>
      <p>Browsers only load <code>type="module"</code> scripts as ES modules. Regular scripts can't use <code>import</code>.</p>

      <h2>Modules in Node.js</h2>
      <p>Node.js supports both CommonJS (<code>require</code>) and ES Modules (<code>import</code>). To use ES Modules:</p>
      <ol>
        <li>Name files <code>.mjs</code>, OR</li>
        <li>Add <code>"type": "module"</code> to <code>package.json</code></li>
      </ol>
      <pre><code class="language-json">{
  "type": "module"
}</code></pre>
      <pre><code class="language-javascript">import express from "express";
import { add } from "./math.js";   // note: .js extension required</code></pre>

      <h2>Module scope</h2>
      <p>Variables declared in a module are local — they don't leak globally:</p>
      <pre><code class="language-javascript">// utils.js
const secret = "hidden";    // not exported, not accessible elsewhere
export const visible = "hello";</code></pre>
      <pre><code class="language-javascript">// app.js
import { visible } from "./utils.js";
console.log(visible);       // "hello"
console.log(secret);        // ERROR — not exported</code></pre>

      <h2>Dynamic imports</h2>
      <p>Load a module only when needed:</p>
      <pre><code class="language-javascript">button.addEventListener("click", async () => {
  const { openModal } = await import("./modal.js");
  openModal();
});</code></pre>

      <h2>Your turn</h2>
      <p>Split a calculator into three files:</p>
      <ul>
        <li><code>math.js</code> — exports <code>add</code>, <code>subtract</code>, <code>multiply</code>, <code>divide</code></li>
        <li><code>calculate.js</code> — imports math and exposes a <code>calculate(a, op, b)</code> function</li>
        <li><code>main.js</code> — imports <code>calculate</code> and logs the result</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Use named and default exports",
      "Import and alias modules",
      "Configure ES modules in browsers and Node.js"
    ]
  },
  {
    title: "Understanding Promises",
    contentHtml: `
      <h2>What is a Promise?</h2>
      <p>A <strong>Promise</strong> represents a value that will exist in the future. It's JavaScript's way of handling async operations without blocking the main thread.</p>
      <p>A Promise has three states:</p>
      <ul>
        <li><strong>Pending</strong> — still working</li>
        <li><strong>Fulfilled</strong> — succeeded with a value</li>
        <li><strong>Rejected</strong> — failed with an error</li>
      </ul>
      <p>Once settled (fulfilled or rejected), a Promise can never change state.</p>

      <h2>Creating a Promise</h2>
      <pre><code class="language-javascript">const promise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) resolve("Done!");
    else reject(new Error("Failed"));
  }, 1000);
});</code></pre>
      <p><code>resolve(value)</code> fulfills the Promise. <code>reject(error)</code> rejects it.</p>

      <h2>.then() and .catch()</h2>
      <pre><code class="language-javascript">promise
  .then((value) => {
    console.log("Success:", value);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });</code></pre>
      <p>Almost always use <code>.catch()</code> — an unhandled rejection can crash the process.</p>

      <h2>.finally()</h2>
      <p>Runs whether the Promise fulfills or rejects:</p>
      <pre><code class="language-javascript">loadUser()
  .then((user) => console.log(user))
  .catch((err) => console.error(err))
  .finally(() => console.log("Request finished"));</code></pre>
      <p>Perfect for hiding loading spinners.</p>

      <h2>Chaining</h2>
      <p>Each <code>.then()</code> returns a new Promise, so you can chain:</p>
      <pre><code class="language-javascript">fetch("/api/user")
  .then((res) => res.json())
  .then((user) => fetch(\`/api/posts?userId=\${user.id}\`))
  .then((res) => res.json())
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err));</code></pre>
      <p>If any step throws, the chain jumps to <code>.catch()</code>.</p>

      <h2>Promise.all() — parallel, fail fast</h2>
      <pre><code class="language-javascript">const [users, posts, comments] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
  fetch("/api/comments").then((r) => r.json())
]);</code></pre>
      <p>Fulfills when ALL resolve. Rejects if ANY rejects.</p>

      <h2>Promise.allSettled() — parallel, never fails</h2>
      <pre><code class="language-javascript">const results = await Promise.allSettled([
  fetch("/api/a").then((r) => r.json()),
  fetch("/api/b").then((r) => r.json())
]);

results.forEach((r) => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.log("Failed:", r.reason.message);
});</code></pre>
      <p>Fulfills regardless. Each result is either <code>{ status: "fulfilled", value }</code> or <code>{ status: "rejected", reason }</code>.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li><strong>Forgetting to return</strong> in a chain — breaks the chain</li>
        <li><strong>No .catch()</strong> — unhandled rejections crash Node.js and hide bugs in browsers</li>
        <li><strong>Awaiting sequential operations that could run in parallel</strong> — use Promise.all</li>
      </ul>

      <h2>Your turn</h2>
      <p>Create a Promise that resolves with "Hello" after 1 second. Then log the value. Then create one that rejects and handle the error.</p>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Explain pending, fulfilled, rejected states",
      "Use then, catch, and finally",
      "Coordinate parallel Promises with Promise.all"
    ]
  },
  {
    title: "Async/Await and Asynchronous Error Handling",
    contentHtml: `
      <h2>async/await in one sentence</h2>
      <p><code>async/await</code> is syntactic sugar over Promises. It makes async code look and read like synchronous code.</p>

      <h2>Basic syntax</h2>
      <pre><code class="language-javascript">// Promise style
function loadUser() {
  return fetch("/api/user")
    .then((res) => res.json())
    .then((user) => console.log(user))
    .catch((err) => console.error(err));
}

// async/await style
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    const user = await res.json();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}</code></pre>
      <p>Same behaviour. The second version is easier to read.</p>

      <h2>Two rules</h2>
      <ol>
        <li><strong>async</strong> on a function makes it return a Promise</li>
        <li><strong>await</strong> pauses the function until the Promise settles</li>
      </ol>
      <pre><code class="language-javascript">async function getNumber() {
  return 42;
}

// getNumber() returns Promise.resolve(42), not 42 itself
getNumber().then(n => console.log(n));</code></pre>

      <h2>try/catch with async</h2>
      <p>Wrap awaits in try/catch to handle rejections:</p>
      <pre><code class="language-javascript">async function loadData() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed:", err.message);
    return null;
  }
}</code></pre>
      <p>Always check <code>res.ok</code> — fetch does NOT throw on HTTP errors.</p>

      <h2>Execution order</h2>
      <p>await pauses the enclosing function, not the entire program:</p>
      <pre><code class="language-javascript">async function run() {
  console.log("1");
  await null;
  console.log("3");
}

console.log("0");
run();
console.log("2");

// Output: 0, 1, 2, 3</code></pre>
      <p>The synchronous code outside the async function keeps running while it's paused.</p>

      <h2>Sequential vs parallel</h2>
      <pre><code class="language-javascript">// Sequential — takes 2s total
const a = await fetchA();   // 1s
const b = await fetchB();   // 1s

// Parallel — takes 1s total
const [a, b] = await Promise.all([fetchA(), fetchB()]);</code></pre>
      <p>Only await sequential when the second depends on the first.</p>

      <h2>Common mistakes</h2>
      <p><strong>Forgetting await</strong>:</p>
      <pre><code class="language-javascript">// BAD — res is a Promise, res.json doesn't exist
async function bad() {
  const res = fetch("/api/user");
  const data = res.json();      // TypeError
}

// GOOD
async function good() {
  const res = await fetch("/api/user");
  const data = await res.json();
}</code></pre>

      <p><strong>Using await in top-level (outside async)</strong>:</p>
      <pre><code class="language-javascript">// Not allowed in most environments
const user = await fetch("/api/user");

// Wrap in async function
async function main() {
  const user = await fetch("/api/user");
}
main();</code></pre>
      <p>(Top-level await IS allowed in ES modules, but not in classic scripts.)</p>

      <h2>Your turn</h2>
      <p>Write an async function that:</p>
      <ul>
        <li>Fetches <code>https://jsonplaceholder.typicode.com/users</code></li>
        <li>Checks <code>res.ok</code></li>
        <li>Returns the first user's name</li>
        <li>Handles errors with try/catch</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Write async functions and await Promises",
      "Handle errors with try/catch",
      "Recognize common async mistakes"
    ]
  },
  {
    title: "Fetch API and HTTP Requests",
    contentHtml: `
      <h2>What is fetch()?</h2>
      <p><code>fetch()</code> is the modern browser API for making HTTP requests. It returns a Promise that resolves with a <code>Response</code> object.</p>

      <h2>Basic GET request</h2>
      <pre><code class="language-javascript">async function loadUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return users;
}</code></pre>
      <p>Two awaits: one for the response, one for parsing the JSON body.</p>

      <h2>Why two awaits?</h2>
      <p><code>fetch()</code> resolves as soon as headers arrive — the body is still streaming. <code>res.json()</code> reads and parses the body, returning another Promise.</p>

      <h2>Checking the status</h2>
      <p><strong>fetch does NOT throw on HTTP errors.</strong> A 404 or 500 is still a resolved Promise:</p>
      <pre><code class="language-javascript">async function loadData() {
  const res = await fetch("/api/data");

  if (!res.ok) {
    throw new Error(\`HTTP \${res.status} \${res.statusText}\`);
  }

  return res.json();
}</code></pre>
      <p>Always check <code>res.ok</code> or <code>res.status</code>.</p>

      <h2>HTTP methods</h2>
      <pre><code class="language-javascript">// POST
await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "a@x.com" })
});

// PUT (full replace)
await fetch("/api/users/42", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "b@x.com" })
});

// PATCH (partial update)
await fetch("/api/users/42", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "new@x.com" })
});

// DELETE
await fetch("/api/users/42", { method: "DELETE" });</code></pre>

      <h2>Headers</h2>
      <pre><code class="language-javascript">await fetch("/api/protected", {
  headers: {
    "Authorization": "Bearer " + token,
    "Accept": "application/json"
  }
});</code></pre>

      <h2>Sending form data</h2>
      <pre><code class="language-javascript">const formData = new FormData();
formData.append("name", "Alice");
formData.append("file", fileInput.files[0]);

await fetch("/api/upload", {
  method: "POST",
  body: formData
  // note: no Content-Type header — fetch sets it with boundary
});</code></pre>

      <h2>Reading different response types</h2>
      <pre><code class="language-javascript">await res.json();    // parse JSON
await res.text();    // plain text
await res.blob();    // binary (images, files)
await res.arrayBuffer(); // raw bytes</code></pre>

      <h2>Complete example</h2>
      <pre><code class="language-javascript">async function createUser(user) {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Request failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to create user:", err.message);
    throw err;
  }
}</code></pre>

      <h2>Your turn</h2>
      <p>Fetch <code>https://jsonplaceholder.typicode.com/posts/1</code> and log the post's title. Check <code>res.ok</code> first.</p>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Make GET and POST requests with fetch",
      "Check response status with res.ok",
      "Send JSON bodies and custom headers"
    ]
  },
  {
    title: "API Integration and UI State Management",
    contentHtml: `
      <h2>From fetch to UI</h2>
      <p>Fetching data is only half the job. The other half is rendering it correctly: loading indicators, empty states, errors, and updates.</p>

      <h2>The four UI states</h2>
      <p>Every async UI needs:</p>
      <ol>
        <li><strong>Loading</strong> — request in flight, show spinner</li>
        <li><strong>Success</strong> — render results</li>
        <li><strong>Empty</strong> — no results, show message</li>
        <li><strong>Error</strong> — request failed, show retry</li>
      </ol>

      <h2>Basic pattern</h2>
      <pre><code class="language-javascript">const container = document.querySelector("#results");

async function load() {
  container.innerHTML = "&lt;p&gt;Loading…&lt;/p&gt;";

  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const items = await res.json();

    if (items.length === 0) {
      container.innerHTML = "&lt;p&gt;No items yet.&lt;/p&gt;";
      return;
    }

    container.innerHTML = items
      .map((item) =&gt; \`&lt;div class="item"&gt;\${item.name}&lt;/div&gt;\`)
      .join("");
  } catch (err) {
    container.innerHTML = \`&lt;p class="error"&gt;Failed to load. &lt;button id="retry"&gt;Retry&lt;/button&gt;&lt;/p&gt;\`;
    document.querySelector("#retry").addEventListener("click", load);
  }
}

load();</code></pre>

      <h2>Search with debounce</h2>
      <p>Wait for the user to stop typing before firing a request:</p>
      <pre><code class="language-javascript">const input = document.querySelector("#search");
let debounceTimer;

input.addEventListener("input", (e) =&gt; {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() =&gt; {
    search(e.target.value);
  }, 300);
});

async function search(q) {
  if (!q) return;
  const res = await fetch(\`/api/search?q=\${encodeURIComponent(q)}\`);
  const results = await res.json();
  render(results);
}</code></pre>

      <h2>Preventing stale updates</h2>
      <p>Imagine typing "ab" then quickly "abc". If the "ab" request finishes AFTER "abc", it will overwrite correct results.</p>
      <p>Fix with a request ID or <code>AbortController</code>:</p>
      <pre><code class="language-javascript">let currentController = null;

async function search(q) {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    const res = await fetch(\`/api/search?q=\${encodeURIComponent(q)}\`, {
      signal: currentController.signal
    });
    const results = await res.json();
    render(results);
  } catch (err) {
    if (err.name === "AbortError") return; // ignore cancelled request
    showError(err);
  }
}</code></pre>
      <p>Now old requests are cancelled the moment a new one starts. Results always match the current search.</p>

      <h2>Rendering helpers</h2>
      <pre><code class="language-javascript">function renderLoading() {
  results.innerHTML = "&lt;p&gt;Loading…&lt;/p&gt;";
}

function renderEmpty() {
  results.innerHTML = "&lt;p&gt;No results found.&lt;/p&gt;";
}

function renderError(message) {
  results.innerHTML = \`&lt;p class="error"&gt;\${message}&lt;/p&gt;\`;
}

function renderItems(items) {
  results.innerHTML = items.map((i) =&gt; \`&lt;div&gt;\${i.name}&lt;/div&gt;\`).join("");
}</code></pre>

      <h2>Loading button state</h2>
      <pre><code class="language-javascript">button.addEventListener("click", async () => {
  button.disabled = true;
  button.textContent = "Submitting…";
  try {
    await submit();
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
});</code></pre>

      <h2>Your turn</h2>
      <p>Build a search interface with:</p>
      <ul>
        <li>Input field with 300ms debounce</li>
        <li>Loading state while fetching</li>
        <li>Empty state if no results</li>
        <li>Error state with retry</li>
        <li>Abort previous request when a new search starts</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Handle loading, success, empty, and error states",
      "Debounce search input",
      "Prevent stale async updates"
    ]
  },
  {
    title: "Advanced Asynchronous Patterns",
    contentHtml: `
      <h2>Sequential vs concurrent</h2>
      <pre><code class="language-javascript">// Sequential — total 3s
const a = await fetchA();   // 1s
const b = await fetchB();   // 1s
const c = await fetchC();   // 1s

// Concurrent — total 1s
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);</code></pre>
      <p>Use sequential only when the second depends on the first.</p>

      <h2>Promise.all() — fail fast</h2>
      <pre><code class="language-javascript">const results = await Promise.all([fetchA(), fetchB()]);</code></pre>
      <ul>
        <li>Fulfills when ALL resolve</li>
        <li>Rejects immediately when ANY rejects</li>
        <li>Best when you need every result and any failure is fatal</li>
      </ul>

      <h2>Promise.allSettled() — never fails</h2>
      <pre><code class="language-javascript">const results = await Promise.allSettled([fetchA(), fetchB()]);

results.forEach((r) => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.error(r.reason);
});</code></pre>
      <ul>
        <li>Fulfills when ALL settle (fulfilled or rejected)</li>
        <li>Never rejects</li>
        <li>Best when you want partial results even if some fail</li>
      </ul>

      <h2>Promise.race() — first to settle</h2>
      <pre><code class="language-javascript">const fastest = await Promise.race([
  fetch("https://api1.example.com/data"),
  fetch("https://api2.example.com/data")
]);</code></pre>
      <ul>
        <li>Fulfills or rejects with the FIRST settled Promise</li>
        <li>Best for timeouts, fastest-server-wins, or fallbacks</li>
      </ul>

      <h2>Promise.any() — first to SUCCEED</h2>
      <pre><code class="language-javascript">const result = await Promise.any([
  fetch("https://mirror1.example.com/file"),
  fetch("https://mirror2.example.com/file"),
  fetch("https://mirror3.example.com/file")
]);</code></pre>
      <ul>
        <li>Fulfills with the FIRST fulfilled Promise</li>
        <li>Rejects only if ALL reject</li>
        <li>Best for redundant sources where any working is fine</li>
      </ul>

      <h2>Timeouts</h2>
      <p>Fetch has no built-in timeout. Add one with race + AbortController:</p>
      <pre><code class="language-javascript">async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}</code></pre>

      <h2>AbortController — cancel requests</h2>
      <pre><code class="language-javascript">const controller = new AbortController();

fetch("/api/slow", { signal: controller.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === "AbortError") console.log("Cancelled");
    else console.error(err);
  });

// Cancel after 2 seconds
setTimeout(() => controller.abort(), 2000);</code></pre>
      <p>Cancelling frees the connection and prevents stale UI updates. Essential for search-as-you-type.</p>

      <h2>Race conditions in UI</h2>
      <p>Scenario: user types fast. Two requests fire. The slow one finishes last and overwrites correct data.</p>
      <pre><code class="language-javascript">let currentController;

async function search(q) {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    const res = await fetch(\`/api/search?q=\${q}\`, {
      signal: currentController.signal
    });
    const results = await res.json();
    render(results);
  } catch (err) {
    if (err.name !== "AbortError") showError(err);
  }
}</code></pre>

      <h2>Batching with Promise.all</h2>
      <p>Fetch many resources efficiently:</p>
      <pre><code class="language-javascript">const userIds = [1, 2, 3, 4, 5];
const users = await Promise.all(
  userIds.map((id) => fetch(\`/api/users/\${id}\`).then((r) => r.json()))
);</code></pre>

      <h2>Rate limiting</h2>
      <p>Respect API rate limits by waiting between requests:</p>
      <pre><code class="language-javascript">async function fetchSequential(urls) {
  const results = [];
  for (const url of urls) {
    const res = await fetch(url);
    results.push(await res.json());
    await new Promise((r) => setTimeout(r, 200));
  }
  return results;
}</code></pre>

      <h2>Your turn</h2>
      <p>Fetch three endpoints in parallel with <code>Promise.allSettled</code>, log which succeeded and which failed, and cancel all requests if it takes longer than 5 seconds.</p>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Compare sequential and concurrent execution",
      "Use Promise.all, race, any, allSettled appropriately",
      "Cancel requests with AbortController"
    ]
  },
  {
    title: "Practical Project: API-Powered Dashboard",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a responsive dashboard that fetches remote data, handles all UI states, and uses modern JavaScript throughout.</p>

      <h2>Requirements</h2>
      <ol>
        <li>Fetch data from <code>https://jsonplaceholder.typicode.com/users</code></li>
        <li>Render each user in a card</li>
        <li>Include a search input that filters by name (debounced)</li>
        <li>Show loading, empty, and error states</li>
        <li>Use modules (split into files)</li>
        <li>Use async/await with try/catch</li>
        <li>Add a "Refresh" button</li>
        <li>Responsive card grid</li>
      </ol>

      <h2>HTML structure</h2>
      <pre><code class="language-html">&lt;header&gt;
  &lt;h1&gt;Users Dashboard&lt;/h1&gt;
  &lt;input id="search" placeholder="Search by name…"&gt;
  &lt;button id="refresh"&gt;Refresh&lt;/button&gt;
&lt;/header&gt;
&lt;main id="results"&gt;&lt;/main&gt;</code></pre>

      <h2>modules/api.js</h2>
      <pre><code class="language-javascript">export async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return await res.json();
}</code></pre>

      <h2>modules/render.js</h2>
      <pre><code class="language-javascript">export function renderLoading(root) {
  root.innerHTML = "&lt;p class='state'&gt;Loading…&lt;/p&gt;";
}

export function renderEmpty(root) {
  root.innerHTML = "&lt;p class='state'&gt;No users found.&lt;/p&gt;";
}

export function renderError(root, message) {
  root.innerHTML = \`&lt;p class='state error'&gt;\${message}&lt;/p&gt;\`;
}

export function renderUsers(root, users) {
  root.innerHTML = users
    .map(
      (u) => \`
        &lt;article class="card"&gt;
          &lt;h2&gt;\${escape(u.name)}&lt;/h2&gt;
          &lt;p&gt;\${escape(u.email)}&lt;/p&gt;
          &lt;p&gt;\${escape(u.address?.city ?? "")}&lt;/p&gt;
        &lt;/article&gt;
      \`
    )
    .join("");
}

function escape(str) {
  return String(str || "")
    .replace(/&amp;/g, "&amp;amp;")
    .replace(/&lt;/g, "&amp;lt;")
    .replace(/&gt;/g, "&amp;gt;");
}</code></pre>

      <h2>main.js</h2>
      <pre><code class="language-javascript">import { fetchUsers } from "./modules/api.js";
import { renderLoading, renderEmpty, renderError, renderUsers } from "./modules/render.js";

const root = document.querySelector("#results");
const searchInput = document.querySelector("#search");
const refreshBtn = document.querySelector("#refresh");

let allUsers = [];
let query = "";

async function load() {
  renderLoading(root);
  try {
    allUsers = await fetchUsers();
    render();
  } catch (err) {
    renderError(root, "Failed to load users: " + err.message);
  }
}

function render() {
  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
  if (filtered.length === 0) renderEmpty(root);
  else renderUsers(root, filtered);
}

// Debounced search
let timer;
searchInput.addEventListener("input", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    query = e.target.value.trim();
    render();
  }, 250);
});

// Refresh button
refreshBtn.addEventListener("click", load);

// Initial load
load();</code></pre>

      <h2>Styling</h2>
      <pre><code class="language-css">body {
  font-family: system-ui, sans-serif;
  background: #0b1020;
  color: #e5e7eb;
  padding: 2rem;
}

header {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

input, button {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #253264;
  background: #111827;
  color: white;
}

#results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.card {
  background: #101827;
  border: 1px solid #253264;
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.state { text-align: center; color: #9ca3af; padding: 2rem; }
.error { color: #f87171; }</code></pre>

      <h2>Optional enhancements</h2>
      <ul>
        <li>Add pagination</li>
        <li>Cache responses in localStorage</li>
        <li>Show a "last updated" timestamp</li>
        <li>Add a user details modal</li>
        <li>Add a dark/light theme toggle</li>
      </ul>

      <h2>Your turn</h2>
      <p>Build the complete dashboard:</p>
      <ul>
        <li>Fetch users via a module</li>
        <li>Render them in a responsive grid</li>
        <li>Debounced search that filters by name</li>
        <li>Refresh button reloads</li>
        <li>Loading, empty, and error states</li>
        <li>Works on mobile</li>
      </ul>
      <p>Submit the complete code when it's polished.</p>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Build a complete async-powered UI",
      "Organize code into modules",
      "Handle all async states gracefully"
    ]
  }
];

async function seedEs6Lessons() {
  const course = await Course.findOne({ slug: "es6-and-async-javascript" });
  if (!course) {
    console.warn("⚠  Course not found: es6-and-async-javascript");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  // Delete existing lessons for THIS course only, then reinsert
  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < es6Lessons.length; i++) {
    const l = es6Lessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: es6Lessons.length } }
  );

  console.log(`   ES6+ & Async lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedEs6Lessons };