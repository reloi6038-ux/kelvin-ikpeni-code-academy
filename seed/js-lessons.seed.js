/**
 * Kelvin Ikpeni Code Academy — JavaScript Essentials lessons
 * Targeted seed: updates ONLY the "javascript-essentials" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const jsLessons = [
  {
    title: "Introduction to JavaScript",
    contentHtml: `
      <h2>What is JavaScript?</h2>
      <p><strong>JavaScript</strong> is the programming language of the web. It runs in every browser and powers interactivity: buttons, forms, animations, and entire web apps like Gmail, Figma, and Netflix.</p>
      <p>JavaScript is also the language of Node.js — so the same syntax you learn here runs on servers, CLIs, and desktop apps.</p>

      <h2>JavaScript + HTML + CSS</h2>
      <p>Every web page is built from three layers:</p>
      <ul>
        <li><strong>HTML</strong> — structure (headings, paragraphs, buttons)</li>
        <li><strong>CSS</strong> — style (colours, layout, typography)</li>
        <li><strong>JavaScript</strong> — behaviour (respond to clicks, fetch data, update the page)</li>
      </ul>
      <p>HTML and CSS are declarative — you describe <em>what</em>. JavaScript is imperative — you describe <em>how</em> and <em>when</em>.</p>

      <h2>Where to run JavaScript</h2>
      <p><strong>1. In the browser console</strong> — open DevTools (F12), click Console, and type:</p>
      <pre><code class="language-javascript">console.log("Hello from the console!");</code></pre>

      <p><strong>2. In an external .js file</strong> — the recommended way:</p>
      <pre><code class="language-html">&lt;script src="app.js" defer&gt;&lt;/script&gt;</code></pre>
      <pre><code class="language-javascript">// app.js
console.log("Hello from app.js!");</code></pre>

      <p><strong>3. In Node.js</strong> — running JavaScript on your machine:</p>
      <pre><code class="language-bash">node app.js</code></pre>

      <h2>Your first program</h2>
      <p>Every program starts with output. The most useful tool is <code>console.log</code>:</p>
      <pre><code class="language-javascript">console.log("Hello, World!");
console.log("My name is Alice.");
console.log(2 + 2);</code></pre>
      <p><strong>Output:</strong></p>
      <pre><code>Hello, World!
My name is Alice.
4</code></pre>

      <h2>Comments</h2>
      <p>Comments explain code to humans. JavaScript ignores them:</p>
      <pre><code class="language-javascript">// single-line comment

/*
  multi-line comment
  spans multiple lines
*/</code></pre>

      <h2>Statements and expressions</h2>
      <p>A <strong>statement</strong> is a complete instruction. An <strong>expression</strong> produces a value.</p>
      <pre><code class="language-javascript">2 + 2;                            // expression
console.log(2 + 2);               // statement (uses expression)
const name = "Alice";             // statement (declaration + assignment)</code></pre>

      <h2>Case sensitivity</h2>
      <p>JavaScript is case-sensitive: <code>name</code>, <code>Name</code>, and <code>NAME</code> are three different variables.</p>

      <h2>Your turn</h2>
      <p>Write a program that logs:</p>
      <ul>
        <li>"Hello from JavaScript!"</li>
        <li>Your name</li>
        <li>The result of 10 * 5</li>
      </ul>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what JavaScript does",
      "Run JavaScript in console, external file, or Node.js",
      "Write and comment simple statements"
    ]
  },
  {
    title: "Variables, Data Types, and Operators",
    contentHtml: `
      <h2>Variables</h2>
      <p>A variable is a named container for a value. JavaScript has three keywords:</p>
      <pre><code class="language-javascript">const name = "Alice";       // cannot be reassigned
let age = 30;                // can be reassigned
var oldStyle = "avoid";      // legacy — don't use</code></pre>
      <p>Modern best practice:</p>
      <ul>
        <li>Use <code>const</code> by default</li>
        <li>Use <code>let</code> only when the variable must be reassigned</li>
        <li>Never use <code>var</code></li>
      </ul>

      <h2>Data types</h2>
      <p>JavaScript has eight types. Five primitive types you'll use constantly:</p>
      <ul>
        <li><strong>String</strong> — text: <code>"hello"</code>, <code>'world'</code>, <code>\`backticks\`</code></li>
        <li><strong>Number</strong> — integers and decimals: <code>42</code>, <code>3.14</code></li>
        <li><strong>Boolean</strong> — <code>true</code> or <code>false</code></li>
        <li><strong>null</strong> — intentional absence</li>
        <li><strong>undefined</strong> — variable declared but not assigned</li>
      </ul>
      <p>The other three are <code>Object</code>, <code>Symbol</code>, and <code>BigInt</code>.</p>

      <h2>typeof</h2>
      <pre><code class="language-javascript">typeof "hello"      // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object" (a historical bug)
typeof []            // "object"
typeof function(){}  // "function"</code></pre>

      <h2>Template literals</h2>
      <p>Use backticks for string interpolation:</p>
      <pre><code class="language-javascript">const name = "Alice";
const age = 30;

// string concatenation (old)
console.log("Hello, " + name + "!");

// template literal (new, cleaner)
console.log(\`Hello, \${name}! You are \${age} years old.\`);</code></pre>

      <h2>Operators</h2>
      <p><strong>Arithmetic</strong>:</p>
      <pre><code class="language-javascript">2 + 3    // 5
10 - 4   // 6
3 * 4    // 12
15 / 3   // 5
17 % 5   // 2 (remainder)
2 ** 3   // 8 (exponent)</code></pre>

      <p><strong>Comparison</strong>:</p>
      <pre><code class="language-javascript">5 == "5"      // true  — loose equality (coerces types) — AVOID
5 === "5"     // false — strict equality — USE THIS
5 !== "5"     // true
10 > 5        // true
10 >= 10      // true</code></pre>

      <p><strong>Logical</strong>:</p>
      <pre><code class="language-javascript">true && false     // false (AND)
true || false     // true  (OR)
!true             // false (NOT)

// Short-circuiting
const name = userInput || "Guest";  // fallback if falsy</code></pre>

      <h2>Type conversion</h2>
      <pre><code class="language-javascript">Number("42")       // 42
String(42)         // "42"
Boolean(0)         // false
Boolean("")        // false
Boolean("hello")   // true

parseInt("42px")   // 42
parseFloat("3.14") // 3.14</code></pre>

      <h2>Your turn</h2>
      <p>Build a mini calculator:</p>
      <ul>
        <li>Two variables <code>a</code> and <code>b</code></li>
        <li>Log their sum, difference, product, and quotient</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Declare variables with let and const",
      "Identify primitive data types",
      "Use arithmetic, comparison, and logical operators"
    ]
  },
  {
    title: "Conditions and Loops",
    contentHtml: `
      <h2>if / else if / else</h2>
      <p>Conditional statements let your program make decisions:</p>
      <pre><code class="language-javascript">const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}</code></pre>

      <h2>Truthy and falsy</h2>
      <p>In a condition, values are either truthy or falsy. The falsy values are:</p>
      <ul>
        <li><code>false</code></li>
        <li><code>0</code> and <code>-0</code></li>
        <li><code>""</code> (empty string)</li>
        <li><code>null</code></li>
        <li><code>undefined</code></li>
        <li><code>NaN</code></li>
      </ul>
      <p>Everything else is truthy — including <code>"0"</code>, <code>[]</code>, and <code>{}</code>.</p>
      <pre><code class="language-javascript">if ("hello") console.log("truthy");
if (0) console.log("never runs");</code></pre>

      <h2>switch</h2>
      <p>When comparing against many specific values, <code>switch</code> is cleaner than <code>if/else</code> chains:</p>
      <pre><code class="language-javascript">const day = "monday";

switch (day) {
  case "monday":
  case "tuesday":
    console.log("Weekday morning");
    break;
  case "friday":
    console.log("Almost weekend");
    break;
  default:
    console.log("Weekend");
}</code></pre>
      <p>Always include <code>break</code> — otherwise execution falls through to the next case.</p>

      <h2>for loops</h2>
      <pre><code class="language-javascript">for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}</code></pre>

      <h2>while loops</h2>
      <pre><code class="language-javascript">let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}</code></pre>

      <h2>for...of — iterate over values</h2>
      <pre><code class="language-javascript">const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>
      <p>Use <code>for...of</code> when you need the values. Use <code>for...in</code> only for object keys.</p>

      <h2>Avoiding infinite loops</h2>
      <p>An infinite loop never ends and freezes the page. Always verify:</p>
      <ul>
        <li><code>while</code> loops have a variable that eventually becomes falsy</li>
        <li><code>for</code> loops have a termination condition</li>
      </ul>
      <pre><code class="language-javascript">// BAD — infinite
while (true) { console.log("stuck"); }

// GOOD — has exit
let i = 0;
while (i < 10) { i++; }</code></pre>

      <h2>Your turn</h2>
      <p>Write a program that:</p>
      <ul>
        <li>Prints "Even" for even numbers 0-10</li>
        <li>Prints "Odd" for odd numbers 0-10</li>
      </ul>
      <pre><code class="language-javascript">for (let i = 0; i <= 10; i++) {
  if (i % 2 === 0) console.log(i, "Even");
  else console.log(i, "Odd");
}</code></pre>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Write if/else if/else chains",
      "Identify truthy and falsy values",
      "Loop with for, while, and for...of"
    ]
  },
  {
    title: "Functions and Scope",
    contentHtml: `
      <h2>What is a function?</h2>
      <p>A function is a named block of code that can be reused. It takes inputs (parameters), does work, and optionally returns a value.</p>

      <h2>Three ways to declare functions</h2>

      <p><strong>1. Function declaration</strong>:</p>
      <pre><code class="language-javascript">function add(a, b) {
  return a + b;
}

add(2, 3);  // 5</code></pre>
      <p>Function declarations are hoisted — you can call them before they're defined in the file.</p>

      <p><strong>2. Function expression</strong>:</p>
      <pre><code class="language-javascript">const add = function (a, b) {
  return a + b;
};</code></pre>
      <p>Not hoisted — the variable is defined only after the assignment.</p>

      <p><strong>3. Arrow function</strong> (modern, concise):</p>
      <pre><code class="language-javascript">const add = (a, b) => a + b;

const square = n => n * n;

const greet = name => {
  const message = "Hello, " + name;
  return message;
};</code></pre>
      <p>Arrow functions without <code>{}</code> return the expression implicitly.</p>

      <h2>Parameters vs arguments</h2>
      <pre><code class="language-javascript">function greet(name) {         // "name" is a parameter
  return "Hello, " + name;
}

greet("Alice");                 // "Alice" is an argument</code></pre>

      <h2>Return values</h2>
      <p>Without <code>return</code>, a function returns <code>undefined</code>:</p>
      <pre><code class="language-javascript">function noReturn() {
  const x = 5;
  // no return statement
}

console.log(noReturn());   // undefined</code></pre>
      <p><code>return</code> also exits the function immediately:</p>
      <pre><code class="language-javascript">function check(x) {
  if (x < 0) return "negative";
  if (x === 0) return "zero";
  return "positive";
}</code></pre>

      <h2>Scope</h2>
      <p>Scope determines where variables are accessible:</p>
      <pre><code class="language-javascript">const global = "I'm global";

function test() {
  const local = "I'm local";
  console.log(global);  // works
  console.log(local);   // works
}

test();
console.log(local);  // ERROR — local is not defined outside</code></pre>

      <h2>Block scope</h2>
      <p><code>let</code> and <code>const</code> are scoped to the nearest <code>{}</code>:</p>
      <pre><code class="language-javascript">if (true) {
  const secret = "hidden";
  console.log(secret);  // works
}
console.log(secret);  // ERROR — secret only exists inside {}</code></pre>
      <p><code>var</code> ignores block scope (another reason to avoid it).</p>

      <h2>Closures</h2>
      <p>An inner function remembers variables from the outer function even after the outer returns:</p>
      <pre><code class="language-javascript">function counter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const next = counter();
next();  // 1
next();  // 2
next();  // 3</code></pre>

      <h2>Callbacks</h2>
      <p>A callback is a function passed to another function, to be called later:</p>
      <pre><code class="language-javascript">function greet(name, callback) {
  const message = "Hello, " + name;
  callback(message);
}

greet("Alice", (msg) => console.log(msg));</code></pre>

      <h2>Your turn</h2>
      <p>Write three functions:</p>
      <ul>
        <li><code>add(a, b)</code> → sum</li>
        <li><code>isEven(n)</code> → true/false</li>
        <li><code>greet(name)</code> → "Hello, [name]!"</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Write function declarations, expressions, and arrows",
      "Understand parameters, arguments, and return values",
      "Explain scope and closures"
    ]
  },
  {
    title: "Arrays and Array Methods",
    contentHtml: `
      <h2>What is an array?</h2>
      <p>An array is an ordered list of values:</p>
      <pre><code class="language-javascript">const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null];</code></pre>

      <h2>Indexing</h2>
      <pre><code class="language-javascript">fruits[0];      // "apple"
fruits[1];      // "banana"
fruits.length;  // 3
fruits[10];     // undefined</code></pre>
      <p>Arrays are zero-indexed.</p>

      <h2>Adding and removing</h2>
      <pre><code class="language-javascript">const arr = [1, 2, 3];

arr.push(4);        // [1,2,3,4] — add at end
arr.unshift(0);     // [0,1,2,3,4] — add at start
arr.pop();          // removes last → [0,1,2,3]
arr.shift();        // removes first → [1,2,3]</code></pre>

      <h2>Iteration</h2>
      <pre><code class="language-javascript">// classic for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// for...of
for (const fruit of fruits) {
  console.log(fruit);
}

// forEach (doesn't return anything)
fruits.forEach((fruit) => console.log(fruit));</code></pre>

      <h2>map — transform each item</h2>
      <pre><code class="language-javascript">const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]</code></pre>
      <p><code>map</code> returns a new array of the same length.</p>

      <h2>filter — keep items that pass</h2>
      <pre><code class="language-javascript">const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]</code></pre>

      <h2>find — first match</h2>
      <pre><code class="language-javascript">const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const user = users.find(u => u.id === 2);
// { id: 2, name: "Bob" }</code></pre>
      <p>Returns <code>undefined</code> if nothing matches.</p>

      <h2>reduce — collapse to single value</h2>
      <pre><code class="language-javascript">const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 10</code></pre>
      <p>The second argument (<code>0</code>) is the initial accumulator value.</p>

      <h2>Other useful methods</h2>
      <pre><code class="language-javascript">arr.includes(3);      // true / false
arr.indexOf(3);       // index or -1
arr.slice(1, 3);      // copy items 1-2
arr.concat([4, 5]);   // combine arrays
arr.join(", ");       // "1, 2, 3"
arr.reverse();        // reverses in place
arr.sort((a,b) => a-b);  // sort numbers ascending</code></pre>

      <h2>Your turn</h2>
      <p>Given <code>[5, 10, 15, 20, 25]</code>:</p>
      <ul>
        <li>Filter to numbers > 10</li>
        <li>Double each remaining number with map</li>
        <li>Sum the result with reduce</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Create, index, and modify arrays",
      "Use map, filter, find, and reduce",
      "Chain array methods together"
    ]
  },
  {
    title: "Objects and Modern JavaScript Syntax",
    contentHtml: `
      <h2>What is an object?</h2>
      <p>An object stores key-value pairs. It represents real-world entities — a user, a product, a task:</p>
      <pre><code class="language-javascript">const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

console.log(user.name);       // "Alice"
console.log(user["age"]);     // 30</code></pre>

      <h2>Adding and modifying</h2>
      <pre><code class="language-javascript">user.age = 31;                    // modify
user.city = "Lagos";              // add new
delete user.email;                // remove</code></pre>

      <h2>Nested objects</h2>
      <pre><code class="language-javascript">const user = {
  name: "Alice",
  address: {
    city: "Lagos",
    zip: "100001"
  }
};

console.log(user.address.city);   // "Lagos"</code></pre>

      <h2>Methods</h2>
      <p>Functions stored on an object are methods:</p>
      <pre><code class="language-javascript">const user = {
  name: "Alice",
  greet() {
    return "Hello, " + this.name;
  }
};

user.greet();   // "Hello, Alice"</code></pre>
      <p><code>this</code> refers to the object the method was called on.</p>

      <h2>Destructuring</h2>
      <p>Extract values into variables in one line:</p>
      <pre><code class="language-javascript">const user = { name: "Alice", age: 30 };

const { name, age } = user;
console.log(name);  // "Alice"

// with rename
const { name: userName } = user;
console.log(userName);  // "Alice"

// with default
const { city = "Unknown" } = user;
console.log(city);  // "Unknown"</code></pre>

      <h2>Array destructuring</h2>
      <pre><code class="language-javascript">const [first, second, ...rest] = [1, 2, 3, 4];
// first = 1, second = 2, rest = [3, 4]</code></pre>

      <h2>Spread syntax</h2>
      <pre><code class="language-javascript">const a = { x: 1, y: 2 };
const b = { ...a, z: 3 };   // { x:1, y:2, z:3 }

const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];  // [1,2,3,4]</code></pre>
      <p>Spread creates shallow copies — perfect for immutability.</p>

      <h2>Optional chaining</h2>
      <p>Safely access nested properties without errors:</p>
      <pre><code class="language-javascript">const user = { name: "Alice" };

user.address.city;            // ERROR — address is undefined
user.address?.city;           // undefined — safe
user.address?.city ?? "N/A";  // "N/A" — with fallback</code></pre>
      <p><code>?.</code> stops evaluation if anything before it is <code>null</code> or <code>undefined</code>.</p>

      <h2>Nullish coalescing</h2>
      <pre><code class="language-javascript">const value = null ?? "default";     // "default"
const value2 = 0 ?? "default";       // 0 (unlike ||)</code></pre>
      <p><code>??</code> only falls back for <code>null</code>/<code>undefined</code>, not for other falsy values.</p>

      <h2>Your turn</h2>
      <p>Create a product object with:</p>
      <ul>
        <li><code>name</code>, <code>price</code>, <code>inStock</code></li>
        <li>A method <code>describe()</code> that returns "Product — $price"</li>
        <li>Destructure <code>name</code> and <code>price</code> from it</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Create and modify objects",
      "Use destructuring and spread",
      "Apply optional chaining and nullish coalescing"
    ]
  },
  {
    title: "DOM Manipulation",
    contentHtml: `
      <h2>What is the DOM?</h2>
      <p>The <strong>DOM</strong> (Document Object Model) is JavaScript's representation of the HTML page — a tree of nodes you can read and modify. It's what makes web pages interactive.</p>
      <p>When JavaScript changes the DOM, the browser re-renders the visible page.</p>

      <h2>Selecting elements</h2>
      <pre><code class="language-javascript">// single element (first match)
const title = document.querySelector("h1");
const card = document.querySelector(".card");
const hero = document.querySelector("#hero");

// multiple elements (NodeList)
const items = document.querySelectorAll(".item");
items.forEach(item => console.log(item));</code></pre>
      <p><code>querySelector</code> accepts any CSS selector — you already know the syntax.</p>

      <h2>Reading and writing text</h2>
      <pre><code class="language-javascript">const h1 = document.querySelector("h1");

// read
console.log(h1.textContent);

// write (safe — text only)
h1.textContent = "New Title";

// write HTML (risky if user-provided — XSS)
h1.innerHTML = "&lt;strong&gt;Bold&lt;/strong&gt;";</code></pre>
      <p>Always prefer <code>textContent</code> unless you intentionally need HTML.</p>

      <h2>Changing classes</h2>
      <pre><code class="language-javascript">const btn = document.querySelector(".btn");

btn.classList.add("active");
btn.classList.remove("disabled");
btn.classList.toggle("is-open");           // add if missing, remove if present
console.log(btn.classList.contains("active"));  // true / false</code></pre>

      <h2>Changing styles</h2>
      <pre><code class="language-javascript">el.style.color = "red";
el.style.fontSize = "20px";
el.style.display = "none";</code></pre>
      <p>For anything more than one-off changes, toggle a class instead.</p>

      <h2>Creating elements</h2>
      <pre><code class="language-javascript">const ul = document.querySelector("#taskList");

const li = document.createElement("li");
li.textContent = "New task";
li.className = "task";

ul.appendChild(li);</code></pre>

      <h2>Removing elements</h2>
      <pre><code class="language-javascript">el.remove();

// or
el.parentNode.removeChild(el);</code></pre>

      <h2>Attributes</h2>
      <pre><code class="language-javascript">const link = document.querySelector("a");

link.getAttribute("href");              // read
link.setAttribute("href", "/new");      // write
link.removeAttribute("target");         // delete</code></pre>

      <h2>Building a dynamic list</h2>
      <pre><code class="language-javascript">const items = ["Buy milk", "Walk dog", "Write code"];
const ul = document.querySelector("#tasks");

ul.innerHTML = "";  // clear existing

items.forEach((text) => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
});</code></pre>

      <h2>Your turn</h2>
      <p>Build a page with:</p>
      <ul>
        <li>A button "Add Task"</li>
        <li>An input for the task text</li>
        <li>Clicking the button appends a new <code>&lt;li&gt;</code> to a list</li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Select elements with querySelector",
      "Modify text, classes, and styles",
      "Create and remove DOM elements"
    ]
  },
  {
    title: "Events and Interactive Webpages",
    contentHtml: `
      <h2>What is an event?</h2>
      <p>An event is a signal that something happened: a click, keypress, form submission, page load, or network response. JavaScript can listen for events and respond.</p>

      <h2>Adding event listeners</h2>
      <pre><code class="language-javascript">const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  console.log("Clicked!");
});</code></pre>
      <p><code>addEventListener(eventName, callback)</code> registers a function to run when the event fires.</p>

      <h2>Common events</h2>
      <ul>
        <li><strong>click</strong> — user clicks an element</li>
        <li><strong>input</strong> — input value changes (every keystroke)</li>
        <li><strong>change</strong> — value committed (blur or enter)</li>
        <li><strong>submit</strong> — form submission</li>
        <li><strong>keydown</strong> / <strong>keyup</strong> — keyboard events</li>
        <li><strong>DOMContentLoaded</strong> — HTML parsed and ready</li>
      </ul>

      <h2>The event object</h2>
      <p>The callback receives an event object with details:</p>
      <pre><code class="language-javascript">btn.addEventListener("click", (event) => {
  console.log(event.target);    // the element clicked
  console.log(event.clientX);   // x coordinate
  console.log(event.type);      // "click"
});</code></pre>

      <h2>preventDefault</h2>
      <p>Stop the browser's default behaviour:</p>
      <pre><code class="language-javascript">const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();     // stop page reload
  console.log("Form submitted!");
});</code></pre>
      <p>For a form, the default is to reload the page. <code>preventDefault</code> lets you handle submission with JS instead.</p>

      <h2>Reading form values</h2>
      <pre><code class="language-javascript">const form = document.querySelector("#signupForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  console.log({ email, password });
});</code></pre>

      <h2>Input events</h2>
      <pre><code class="language-javascript">const input = document.querySelector("#search");

input.addEventListener("input", (e) => {
  console.log("Typed:", e.target.value);
});</code></pre>

      <h2>Event delegation</h2>
      <p>When you have many similar elements, attach one listener to their parent:</p>
      <pre><code class="language-javascript">const list = document.querySelector("#tasks");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  }
});</code></pre>
      <p>This works even for <code>&lt;li&gt;</code> elements created later — you don't need to re-bind listeners.</p>

      <h2>Removing listeners</h2>
      <pre><code class="language-javascript">function handleClick() { console.log("clicked"); }

btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);</code></pre>

      <h2>Your turn</h2>
      <p>Build a form with:</p>
      <ul>
        <li>An email input</li>
        <li>A submit button</li>
        <li>Prevent the default submit</li>
        <li>Show "Invalid email" if the input doesn't contain "@"</li>
        <li>Otherwise show "Thank you!"</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Add and remove event listeners",
      "Handle click, input, change, and submit events",
      "Use preventDefault and event delegation"
    ]
  },
  {
    title: "Errors, Debugging, and Asynchronous JavaScript",
    contentHtml: `
      <h2>Types of errors</h2>
      <ul>
        <li><strong>Syntax errors</strong> — JavaScript can't parse the code</li>
        <li><strong>Runtime errors</strong> — code parses but crashes at execution</li>
        <li><strong>Logical errors</strong> — code runs but produces wrong output</li>
      </ul>

      <h2>Reading errors</h2>
      <p>Errors tell you the type, message, and often the line:</p>
      <pre><code>Uncaught TypeError: Cannot read properties of undefined (reading 'name')
    at app.js:5</code></pre>
      <p>Read it as: "On line 5, you tried to access <code>.name</code> on something undefined."</p>

      <h2>try...catch</h2>
      <p>Catch errors so the program keeps running:</p>
      <pre><code class="language-javascript">try {
  const data = JSON.parse("{invalid json}");
  console.log(data);
} catch (err) {
  console.error("Parse failed:", err.message);
} finally {
  console.log("Done");
}</code></pre>
      <ul>
        <li><strong>try</strong> — code that might throw</li>
        <li><strong>catch</strong> — runs if an error is thrown</li>
        <li><strong>finally</strong> — always runs, error or not</li>
      </ul>

      <h2>Throwing errors</h2>
      <pre><code class="language-javascript">function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  console.error(err.message);  // "Cannot divide by zero"
}</code></pre>

      <h2>Debugging with DevTools</h2>
      <ul>
        <li><strong>console.log</strong> — print values at specific points</li>
        <li><strong>console.table</strong> — display arrays/objects as tables</li>
        <li><strong>debugger</strong> — statement that pauses execution when DevTools is open</li>
        <li><strong>Breakpoints</strong> — click a line number in Sources to pause there</li>
        <li><strong>Watch</strong> — track variable values as you step</li>
      </ul>

      <h2>Synchronous vs asynchronous</h2>
      <p>JavaScript is single-threaded. But it handles async work (network, timers, file I/O) without blocking:</p>
      <pre><code class="language-javascript">console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

// Output: 1, 3, 2</code></pre>
      <p><code>setTimeout</code> defers execution until the current code finishes.</p>

      <h2>Promises</h2>
      <p>A Promise represents a future value. It's either pending, fulfilled, or rejected:</p>
      <pre><code class="language-javascript">const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise.then(value => console.log(value));
promise.catch(err => console.error(err));</code></pre>

      <h2>async / await</h2>
      <p>Async/await is syntactic sugar over Promises — makes async code look synchronous:</p>
      <pre><code class="language-javascript">async function loadUser() {
  try {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

loadUser();</code></pre>
      <ul>
        <li><strong>async</strong> — makes the function return a Promise</li>
        <li><strong>await</strong> — pauses the function until the Promise settles</li>
      </ul>

      <h2>Fetching data</h2>
      <pre><code class="language-javascript">async function loadPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const posts = await res.json();
    return posts;
  } catch (err) {
    console.error("Failed:", err.message);
    return [];
  }
}</code></pre>

      <h2>Promise.all — parallel fetches</h2>
      <pre><code class="language-javascript">const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);</code></pre>

      <h2>Your turn</h2>
      <p>Fetch from <code>https://jsonplaceholder.typicode.com/users</code>:</p>
      <ul>
        <li>Wrap in try/catch</li>
        <li>Check <code>res.ok</code></li>
        <li>Log the first user's name</li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Read and interpret JavaScript errors",
      "Use try/catch and throw custom errors",
      "Write async/await code and fetch data from APIs"
    ]
  },
  {
    title: "Practical Project: Interactive Task Manager",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a fully interactive task manager using everything you've learned:</p>
      <ul>
        <li>Variables and data types</li>
        <li>Functions and scope</li>
        <li>Arrays and array methods</li>
        <li>Objects</li>
        <li>DOM manipulation</li>
        <li>Events and preventDefault</li>
        <li>Optional: localStorage for persistence</li>
      </ul>

      <h2>Requirements</h2>
      <ol>
        <li>Input field + Add button to create tasks</li>
        <li>Each task shows its title and a "complete" state</li>
        <li>Clicking a task toggles complete/incomplete (strikethrough)</li>
        <li>Each task has a delete button</li>
        <li>Filter buttons: All / Active / Completed</li>
        <li>Tasks persist between page reloads (localStorage)</li>
      </ol>

      <h2>HTML structure</h2>
      <pre><code class="language-html">&lt;div class="app"&gt;
  &lt;h1&gt;My Tasks&lt;/h1&gt;

  &lt;form id="taskForm"&gt;
    &lt;input id="taskInput" placeholder="New task" required&gt;
    &lt;button type="submit"&gt;Add&lt;/button&gt;
  &lt;/form&gt;

  &lt;div class="filters"&gt;
    &lt;button data-filter="all" class="active"&gt;All&lt;/button&gt;
    &lt;button data-filter="active"&gt;Active&lt;/button&gt;
    &lt;button data-filter="completed"&gt;Completed&lt;/button&gt;
  &lt;/div&gt;

  &lt;ul id="taskList"&gt;&lt;/ul&gt;
&lt;/div&gt;</code></pre>

      <h2>JavaScript: state + rendering</h2>
      <p>The pattern: keep state in an array, then re-render the DOM from state.</p>
      <pre><code class="language-javascript">let tasks = [];
let filter = "all";

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll("[data-filter]");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
}

function render() {
  const visible = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  taskList.innerHTML = "";

  if (visible.length === 0) {
    taskList.innerHTML = "&lt;li class='empty'&gt;No tasks&lt;/li&gt;";
    return;
  }

  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.dataset.id = task.id;

    li.innerHTML = \`
      &lt;span class="title"&gt;\${escapeHtml(task.title)}&lt;/span&gt;
      &lt;button class="delete"&gt;✕&lt;/button&gt;
    \`;

    taskList.appendChild(li);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&amp;/g, "&amp;amp;")
    .replace(/&lt;/g, "&amp;lt;")
    .replace(/&gt;/g, "&amp;gt;");
}</code></pre>

      <h2>Adding tasks</h2>
      <pre><code class="language-javascript">taskForm.addEventListener("submit", (e) =&gt; {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  tasks.push({
    id: Date.now().toString(),
    title,
    completed: false
  });

  taskInput.value = "";
  save();
  render();
});</code></pre>

      <h2>Toggling completion</h2>
      <pre><code class="language-javascript">taskList.addEventListener("click", (e) =&gt; {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;
  const task = tasks.find(t =&gt; t.id === id);
  if (!task) return;

  // Delete button
  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(t =&gt; t.id !== id);
  } else {
    // Toggle completion
    task.completed = !task.completed;
  }

  save();
  render();
});</code></pre>

      <h2>Filter buttons</h2>
      <pre><code class="language-javascript">filterButtons.forEach((btn) =&gt; {
  btn.addEventListener("click", () =&gt; {
    filterButtons.forEach(b =&gt; b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});</code></pre>

      <h2>Initial load</h2>
      <pre><code class="language-javascript">load();
render();</code></pre>

      <h2>Styling ideas</h2>
      <pre><code class="language-css">.completed .title {
  text-decoration: line-through;
  opacity: 0.6;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.delete {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
}</code></pre>

      <h2>Your turn</h2>
      <p>Complete the task manager:</p>
      <ul>
        <li>Add works (Enter or click)</li>
        <li>Click task → toggle completed</li>
        <li>Click ✕ → delete</li>
        <li>Filter buttons work</li>
        <li>Tasks persist after reload</li>
        <li>Works on mobile</li>
      </ul>
      <p>Submit the HTML + CSS + JS when polished.</p>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Combine JS concepts into a working app",
      "Manage state and re-render the DOM",
      "Persist data with localStorage"
    ]
  }
];

async function seedJsLessons() {
  const course = await Course.findOne({ slug: "javascript-essentials" });
  if (!course) {
    console.warn("⚠  Course not found: javascript-essentials");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  // Delete existing lessons for THIS course only, then reinsert
  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < jsLessons.length; i++) {
    const l = jsLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: jsLessons.length } }
  );

  console.log(`   JavaScript lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedJsLessons };