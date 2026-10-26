/**
 * Kelvin Ikpeni Code Academy — CSS Fundamentals lessons
 * Targeted seed: updates ONLY the "css-fundamentals" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const cssLessons = [
  {
    title: "Introduction to CSS",
    contentHtml: `
      <h2>What is CSS?</h2>
      <p><strong>CSS</strong> (Cascading Style Sheets) is the language that styles HTML. HTML gives structure — headings, paragraphs, links, images. CSS gives that structure colour, typography, spacing, layout, and motion.</p>
      <p>Without CSS, every webpage in the world would look like a plain Word document. With CSS, the same HTML becomes Stripe's landing page, Apple's product showcase, or your own portfolio.</p>

      <h2>How CSS works with HTML</h2>
      <p>A CSS rule has three parts:</p>
      <pre><code class="language-css">selector {
  property: value;
}</code></pre>
      <ul>
        <li><strong>Selector</strong> — which HTML elements to target (e.g., <code>p</code>, <code>.card</code>, <code>#hero</code>)</li>
        <li><strong>Property</strong> — what to change (e.g., <code>color</code>, <code>font-size</code>, <code>padding</code>)</li>
        <li><strong>Value</strong> — what to set it to (e.g., <code>blue</code>, <code>16px</code>, <code>2rem</code>)</li>
      </ul>

      <h2>Three ways to add CSS</h2>
      <p><strong>1. Inline</strong> — inside a <code>style</code> attribute:</p>
      <pre><code class="language-html">&lt;p style="color: red; font-size: 20px;"&gt;Hello&lt;/p&gt;</code></pre>
      <p>Bad for maintainability — you repeat styles on every element.</p>

      <p><strong>2. Internal</strong> — inside a <code>&lt;style&gt;</code> tag in <code>&lt;head&gt;</code>:</p>
      <pre><code class="language-html">&lt;head&gt;
  &lt;style&gt;
    p { color: red; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
      <p>Better, but still scoped to one page.</p>

      <p><strong>3. External</strong> — the recommended way:</p>
      <pre><code class="language-html">&lt;head&gt;
  &lt;link rel="stylesheet" href="/css/styles.css"&gt;
&lt;/head&gt;</code></pre>
      <pre><code class="language-css">/* styles.css */
p {
  color: red;
}</code></pre>
      <p>External stylesheets are cached, reusable across pages, and keep HTML clean.</p>

      <h2>Your first CSS file</h2>
      <p>Create <code>styles.css</code>:</p>
      <pre><code class="language-css">body {
  font-family: system-ui, sans-serif;
  background: #f0f2f5;
  color: #1a1a1a;
  padding: 40px;
}

h1 {
  font-size: 2.5rem;
  color: #2563eb;
}

p {
  line-height: 1.6;
  max-width: 60ch;
}</code></pre>
      <p>Link it from your HTML:</p>
      <pre><code class="language-html">&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>

      <h2>Where CSS lives (the CSSOM)</h2>
      <p>When the browser parses HTML and CSS, it builds two trees:</p>
      <ul>
        <li><strong>DOM</strong> — the HTML structure</li>
        <li><strong>CSSOM</strong> — every computed style for every element</li>
      </ul>
      <p>Then it combines them into a <strong>render tree</strong> — only the visible elements with their styles — and paints that to the screen.</p>

      <h2>Your turn</h2>
      <p>Create <code>styles.css</code> with:</p>
      <ul>
        <li><code>body</code> — a light background and padding</li>
        <li><code>h1</code> — blue and larger font</li>
        <li><code>p</code> — comfortable line-height</li>
      </ul>
      <p>Link it from your HTML and submit.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what CSS is and what it does",
      "Write a CSS rule with selector, property, value",
      "Link an external stylesheet correctly"
    ]
  },
  {
    title: "CSS Selectors and Specificity",
    contentHtml: `
      <h2>Why selectors matter</h2>
      <p>A selector tells the browser <em>which</em> elements a rule applies to. CSS has many selector types, each with different power. Understanding specificity — how the browser decides which rule wins — is the single most important CSS concept.</p>

      <h2>Selector types</h2>
      <pre><code class="language-css">/* Element */
p { color: blue; }

/* Class (starting with .) */
.text-red { color: red; }

/* ID (starting with #) */
#hero { color: green; }

/* Attribute */
input[type="email"] { border-color: blue; }

/* Group (comma) */
h1, h2, h3 { margin-bottom: 1rem; }

/* Descendant (space) */
nav a { color: white; }

/* Child (>) */
ul > li { list-style: none; }

/* Pseudo-class */
a:hover { text-decoration: underline; }

/* Pseudo-element */
p::first-line { font-weight: bold; }</code></pre>

      <h2>Specificity</h2>
      <p>When two rules target the same element, specificity decides which wins. Think of it as four counters, from lowest to highest priority:</p>
      <ol>
        <li><strong>Element selectors</strong> — 1 point each</li>
        <li><strong>Class, attribute, pseudo-class</strong> — 10 points each</li>
        <li><strong>ID selectors</strong> — 100 points each</li>
        <li><strong>Inline styles</strong> — 1000 points each</li>
      </ol>
      <p><code>!important</code> trumps everything but is discouraged.</p>

      <h2>Specificity in action</h2>
      <pre><code class="language-html">&lt;p id="intro" class="highlight"&gt;Hello&lt;/p&gt;</code></pre>
      <pre><code class="language-css">p { color: blue; }              /* 0-0-1 */
.highlight { color: green; }    /* 0-1-0  WINNER */
#intro { color: red; }          /* 1-0-0  WINS over .highlight */</code></pre>
      <p>The paragraph will be red — ID beats class beats element.</p>

      <h2>The cascade</h2>
      <p>When specificity ties, the rule defined <em>later</em> in the CSS wins. This is the "C" in CSS.</p>
      <pre><code class="language-css">p { color: blue; }
p { color: green; }   /* wins — later */</code></pre>

      <h2>Inheritance</h2>
      <p>Some properties — like <code>color</code>, <code>font-family</code>, and <code>line-height</code> — inherit from parent to child. Others — like <code>padding</code>, <code>border</code>, <code>margin</code> — don't.</p>
      <pre><code class="language-css">body { font-family: Arial; }  /* every descendant inherits this */
div  { padding: 20px; }        /* only div, not its children */</code></pre>

      <h2>Best practices</h2>
      <ul>
        <li><strong>Prefer classes</strong> over IDs for styling — IDs are too specific and hard to override</li>
        <li><strong>Avoid <code>!important</code></strong> — it signals a specificity problem, not a solution</li>
        <li><strong>Keep selectors shallow</strong> — <code>.card h3</code> is better than <code>body #main .wrapper .card h3</code></li>
        <li><strong>Use CSS variables</strong> for repeated values (colours, spacing)</li>
      </ul>

      <h2>Your turn</h2>
      <p>Style a webpage with:</p>
      <ul>
        <li>Element selector for paragraphs</li>
        <li>Class <code>.highlight</code> with a different colour</li>
        <li>ID <code>#special</code> on one paragraph that overrides both</li>
      </ul>
      <p>Observe which colour wins — and why.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Use element, class, ID, attribute, and pseudo-class selectors",
      "Calculate CSS specificity",
      "Understand the cascade and inheritance"
    ]
  },
  {
    title: "The CSS Box Model",
    contentHtml: `
      <h2>Every element is a box</h2>
      <p>Whether you see a rectangle or not, every element on a page is rendered as a box. The <strong>box model</strong> describes how those boxes are sized and spaced:</p>
      <pre><code>┌───────────────────────────┐
│         margin            │
│  ┌─────────────────────┐  │
│  │      border         │  │
│  │  ┌───────────────┐  │  │
│  │  │    padding    │  │  │
│  │  │  ┌─────────┐  │  │  │
│  │  │  │ content │  │  │  │
│  │  │  └─────────┘  │  │  │
│  │  └───────────────┘  │  │
│  └─────────────────────┘  │
└───────────────────────────┘</code></pre>

      <h2>Content, padding, border, margin</h2>
      <pre><code class="language-css">.card {
  /* content area is where text/images live */
  width: 300px;
  height: 200px;

  /* space INSIDE the border */
  padding: 20px;

  /* line around the element */
  border: 1px solid #ddd;

  /* space OUTSIDE the border */
  margin: 15px;
}</code></pre>

      <h2>The box-sizing problem</h2>
      <p>By default, <code>box-sizing: content-box</code> — meaning <code>width</code> and <code>height</code> apply to the content area only. Padding and border are added <em>outside</em> the width.</p>
      <pre><code class="language-css">.card {
  width: 300px;
  padding: 20px;
  border: 1px solid;
  /* actual total width = 300 + 40 + 2 = 342px */
}</code></pre>
      <p>This is confusing and causes layouts to break.</p>

      <h2>The fix: border-box</h2>
      <pre><code class="language-css">*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>
      <p>Now <code>width: 300px</code> means exactly 300px — padding and border are included. This is the modern default every project uses.</p>

      <h2>Block vs inline</h2>
      <ul>
        <li><strong>Block</strong> elements (<code>div</code>, <code>p</code>, <code>h1</code>) start on a new line, take full width, and respect all four margins.</li>
        <li><strong>Inline</strong> elements (<code>span</code>, <code>a</code>, <code>strong</code>) flow within text, take only the width they need, and ignore vertical margins.</li>
      </ul>
      <p>You can convert with <code>display: block</code> or <code>display: inline-block</code>.</p>

      <h2>A real-world profile card</h2>
      <pre><code class="language-css">.profile {
  box-sizing: border-box;
  max-width: 320px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.profile img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile h2 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
}

.profile p {
  margin: 0;
  color: #6b7280;
}</code></pre>

      <h2>Your turn</h2>
      <p>Build a card with:</p>
      <ul>
        <li>Max width 320px, centered</li>
        <li>Padding of 2rem</li>
        <li>Rounded corners (12px)</li>
        <li>A subtle shadow</li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Describe the four layers of the box model",
      "Use box-sizing: border-box",
      "Differentiate block from inline elements"
    ]
  },
  {
    title: "Colours, Typography, and Visual Styling",
    contentHtml: `
      <h2>Colour formats</h2>
      <p>CSS supports several ways to express colour:</p>
      <pre><code class="language-css">/* HEX */
color: #2563eb;

/* RGB — red green blue, 0-255 */
color: rgb(37, 99, 235);

/* RGBA — with alpha (0-1) */
color: rgba(37, 99, 235, 0.5);

/* HSL — hue (0-360), saturation %, lightness % */
color: hsl(217, 91%, 60%);

/* Modern named colours */
color: rebeccapurple;
color: coral;</code></pre>
      <p>HSL is the easiest to reason about: adjust lightness for shades, hue for tones.</p>

      <h2>CSS variables</h2>
      <p>Repeated values belong in variables:</p>
      <pre><code class="language-css">:root {
  --color-bg: #0b1020;
  --color-surface: #101827;
  --color-primary: #2563eb;
  --color-text: #e5e7eb;
  --color-muted: #9ca3af;
  --font-sans: "Inter", system-ui, sans-serif;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
}

.btn {
  background: var(--color-primary);
}</code></pre>
      <p>Change the variable once, and every place that uses it updates.</p>

      <h2>Typography</h2>
      <pre><code class="language-css">body {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1a1a;
}

h1 {
  font-size: 2.5rem;      /* 40px if base is 16 */
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

p {
  max-width: 65ch;        /* comfortable reading width */
  margin-bottom: 1.25rem;
}</code></pre>

      <h2>Backgrounds</h2>
      <pre><code class="language-css">/* Solid colour */
background: #f9fafb;

/* Linear gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Radial gradient */
background: radial-gradient(circle at top left, #fbbf24, transparent 60%);

/* Image with overlay */
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url("hero.jpg") center / cover;</code></pre>

      <h2>Shadows and borders</h2>
      <pre><code class="language-css">.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.08);
}</code></pre>
      <p>Two shadows stacked give a subtle, professional depth.</p>

      <h2>Building a hero section</h2>
      <pre><code class="language-css">.hero {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 60ch;
  margin: 0 auto 2rem;
}

.hero button {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}</code></pre>

      <h2>Your turn</h2>
      <p>Build a hero section with:</p>
      <ul>
        <li>A gradient background</li>
        <li>Large white heading</li>
        <li>Muted subheading</li>
        <li>A white pill-shaped button</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Write colours in HEX, RGB, HSL",
      "Use CSS variables for consistency",
      "Apply gradients, shadows, and typography"
    ]
  },
  {
    title: "CSS Display, Positioning, and Layout Basics",
    contentHtml: `
      <h2>The display property</h2>
      <p>Every element has a display value. The most common:</p>
      <ul>
        <li><code>block</code> — starts on a new line, full width</li>
        <li><code>inline</code> — flows within text, only as wide as content</li>
        <li><code>inline-block</code> — inline flow but respects width/height</li>
        <li><code>flex</code> — activates Flexbox on children</li>
        <li><code>grid</code> — activates Grid on children</li>
        <li><code>none</code> — removes from layout entirely (no space reserved)</li>
      </ul>

      <h2>Positioning</h2>
      <p>The <code>position</code> property controls how an element is placed:</p>

      <h3>static (default)</h3>
      <p>Normal flow. <code>top</code>, <code>left</code>, <code>z-index</code> have no effect.</p>

      <h3>relative</h3>
      <p>Nudges from its normal position, but <em>reserves its original space</em>:</p>
      <pre><code class="language-css">.badge {
  position: relative;
  top: -4px;
  left: 4px;
}</code></pre>

      <h3>absolute</h3>
      <p>Removed from normal flow, positioned relative to the nearest positioned ancestor:</p>
      <pre><code class="language-css">.card { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}</code></pre>

      <h3>fixed</h3>
      <p>Relative to the viewport. Stays put when scrolling:</p>
      <pre><code class="language-css">.chat-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
}</code></pre>

      <h3>sticky</h3>
      <p>Behaves like relative until a scroll threshold, then acts fixed:</p>
      <pre><code class="language-css">.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
}</code></pre>

      <h2>z-index</h2>
      <p>Controls stacking order. Higher numbers appear on top:</p>
      <pre><code class="language-css">.modal { z-index: 999; }
.nav   { z-index: 50; }
.content { z-index: 1; }</code></pre>
      <p><code>z-index</code> only works on positioned elements or flex/grid children.</p>

      <h2>Overflow</h2>
      <pre><code class="language-css">.box { overflow: hidden; }   /* clip content */
.box { overflow: auto; }      /* scrollbars if needed */
.box { overflow-y: scroll; }  /* always vertical scrollbar */</code></pre>

      <h2>Visibility vs display</h2>
      <pre><code class="language-css">.hidden-but-takes-space { visibility: hidden; }
.removed-from-layout { display: none; }</code></pre>

      <h2>Sticky nav + notification badge</h2>
      <pre><code class="language-css">.nav {
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  z-index: 50;
}

.icon {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
}</code></pre>

      <h2>Your turn</h2>
      <p>Build a page with:</p>
      <ul>
        <li>A sticky navigation bar</li>
        <li>A notification badge in the corner of an icon</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Differentiate display values",
      "Position elements with static, relative, absolute, fixed, and sticky",
      "Control stacking with z-index"
    ]
  },
  {
    title: "CSS Flexbox",
    contentHtml: `
      <h2>What is Flexbox?</h2>
      <p><strong>Flexbox</strong> is a one-dimensional layout system. It arranges children along a single axis — either row or column — distributing space and aligning items with just a few properties.</p>
      <p>Before Flexbox, centering a div was a notorious pain. With Flexbox:</p>
      <pre><code class="language-css">.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
      <p>Three lines. Perfect centering.</p>

      <h2>The flex container</h2>
      <p>Setting <code>display: flex</code> on a parent turns it into a flex container, and its direct children become flex items.</p>
      <pre><code class="language-html">&lt;div class="row"&gt;
  &lt;div&gt;A&lt;/div&gt;
  &lt;div&gt;B&lt;/div&gt;
  &lt;div&gt;C&lt;/div&gt;
&lt;/div&gt;</code></pre>
      <pre><code class="language-css">.row {
  display: flex;
  gap: 1rem;
}</code></pre>

      <h2>Direction</h2>
      <pre><code class="language-css">.row    { flex-direction: row; }            /* left to right */
.column { flex-direction: column; }         /* top to bottom */
.reverse { flex-direction: row-reverse; }   /* right to left */</code></pre>

      <h2>Main axis alignment</h2>
      <p><code>justify-content</code> aligns items along the main axis (row = horizontal, column = vertical):</p>
      <pre><code class="language-css">.center     { justify-content: center; }
.between    { justify-content: space-between; }
.around     { justify-content: space-around; }
.evenly     { justify-content: space-evenly; }
.start      { justify-content: flex-start; }
.end        { justify-content: flex-end; }</code></pre>

      <h2>Cross axis alignment</h2>
      <p><code>align-items</code> aligns items along the cross axis:</p>
      <pre><code class="language-css">.center     { align-items: center; }
.start      { align-items: flex-start; }
.end        { align-items: flex-end; }
.stretch    { align-items: stretch; }   /* default */</code></pre>

      <h2>Wrapping</h2>
      <p>By default, flex items squeeze onto one line. <code>flex-wrap: wrap</code> lets them wrap to the next line:</p>
      <pre><code class="language-css">.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cards > * {
  flex: 1 1 250px;   /* grow, shrink, base width */
}</code></pre>
      <p>The <code>flex</code> shorthand: <code>flex: grow shrink basis</code>.</p>

      <h2>Gap</h2>
      <p><code>gap</code> adds spacing between flex items — no more manual margins:</p>
      <pre><code class="language-css">.row {
  display: flex;
  gap: 1rem;
}</code></pre>

      <h2>Real-world: navigation bar</h2>
      <pre><code class="language-css">.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}</code></pre>

      <h2>Real-world: feature cards</h2>
      <pre><code class="language-css">.features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.feature-card {
  flex: 1 1 280px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}</code></pre>

      <h2>Your turn</h2>
      <p>Build:</p>
      <ul>
        <li>A nav bar with logo left, links right</li>
        <li>A row of cards that wrap on smaller screens</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Activate Flexbox with display: flex",
      "Align items with justify-content and align-items",
      "Build responsive wrapping layouts"
    ]
  },
  {
    title: "CSS Grid",
    contentHtml: `
      <h2>What is CSS Grid?</h2>
      <p><strong>CSS Grid</strong> is a two-dimensional layout system. Unlike Flexbox (one axis), Grid lets you control rows and columns simultaneously. It's ideal for page layouts, dashboards, and card galleries.</p>

      <h2>Basic grid</h2>
      <pre><code class="language-html">&lt;div class="grid"&gt;
  &lt;div&gt;1&lt;/div&gt;
  &lt;div&gt;2&lt;/div&gt;
  &lt;div&gt;3&lt;/div&gt;
  &lt;div&gt;4&lt;/div&gt;
&lt;/div&gt;</code></pre>
      <pre><code class="language-css">.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}</code></pre>
      <p>Two columns, equal width, with 1rem gap between cells.</p>

      <h2>fr units</h2>
      <p><code>fr</code> (fraction) represents a share of the available space:</p>
      <pre><code class="language-css">.layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;  /* sidebar 25%, main 75% */
}</code></pre>

      <h2>repeat() and minmax()</h2>
      <pre><code class="language-css">/* Equivalent to 3 equal columns */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Responsive: columns at least 250px, at most auto */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}</code></pre>
      <p>This one line creates a fully responsive card grid — no media queries required.</p>

      <h2>auto-fit vs auto-fill</h2>
      <ul>
        <li><code>auto-fit</code> — collapses empty tracks, stretches cards to fill the row</li>
        <li><code>auto-fill</code> — keeps empty tracks, cards stay at their natural size</li>
      </ul>
      <p>For card grids where you want cards to grow, use <code>auto-fit</code>.</p>

      <h2>Rows and explicit placement</h2>
      <pre><code class="language-css">.hero {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.sidebar { grid-column: 1; grid-row: 1 / 3; }
.main    { grid-column: 2; }
.footer  { grid-column: 2; }</code></pre>

      <h2>A dashboard layout</h2>
      <pre><code class="language-css">.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
  gap: 0;
}

.sidebar { grid-area: sidebar; background: #1f2937; }
.header  { grid-area: header; background: white; }
.main    { grid-area: main; padding: 2rem; }</code></pre>
      <p>The <code>grid-template-areas</code> property creates a visual map of your layout using named regions — one of Grid's most readable features.</p>

      <h2>A card gallery</h2>
      <pre><code class="language-css">.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}</code></pre>

      <h2>Grid vs Flexbox — when to use which</h2>
      <ul>
        <li><strong>Flexbox</strong> — 1D layouts: nav bars, card rows, forms, centering</li>
        <li><strong>Grid</strong> — 2D layouts: page templates, dashboards, image galleries</li>
        <li><strong>Both together</strong> — Grid for the page, Flexbox inside cards</li>
      </ul>

      <h2>Your turn</h2>
      <p>Build a responsive gallery with:</p>
      <ul>
        <li><code>grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))</code></li>
        <li>Gap of 1.5rem</li>
        <li>Cards with images that fill the width</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Activate Grid with display: grid",
      "Use fr units, repeat, minmax, and auto-fit",
      "Build responsive two-dimensional layouts"
    ]
  },
  {
    title: "Responsive Web Design",
    contentHtml: `
      <h2>What is responsive design?</h2>
      <p>Users browse your site on phones, tablets, laptops, and desktops. <strong>Responsive design</strong> means the layout adapts fluidly to any screen size — no zooming, no horizontal scroll, no broken layouts.</p>

      <h2>The viewport meta tag</h2>
      <p>Without this meta tag, mobile browsers pretend to be 980px wide:</p>
      <pre><code class="language-html">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
      <p>With it, <code>width=device-width</code> tells the browser to use the actual device width.</p>

      <h2>Mobile-first design</h2>
      <p>Start with the mobile layout (simpler), then enhance for larger screens:</p>
      <pre><code class="language-css">/* Base: mobile styles */
.features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .features {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .features > * {
    flex: 1 1 calc(50% - 1rem);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .features > * {
    flex: 1 1 calc(33.33% - 1rem);
  }
}</code></pre>

      <h2>Common breakpoints</h2>
      <ul>
        <li><strong>640px</strong> — small tablets</li>
        <li><strong>768px</strong> — tablets</li>
        <li><strong>1024px</strong> — laptops</li>
        <li><strong>1280px</strong> — desktops</li>
      </ul>
      <p>These aren't universal. Pick breakpoints where your specific layout starts to break.</p>

      <h2>Relative units</h2>
      <p>Use units that scale with the user's device or preferences:</p>
      <pre><code class="language-css">/* Fixed — bad for responsive */
h1 { font-size: 32px; }

/* Better — rem scales with root font size */
h1 { font-size: 2rem; }

/* Best — clamp() fluidly scales between min and max */
h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); }</code></pre>

      <h2>Fluid sizing with clamp()</h2>
      <p><code>clamp(min, preferred, max)</code> is a one-line responsive rule:</p>
      <pre><code class="language-css">h1 { font-size: clamp(1.75rem, 5vw, 3rem); }
.container {
  width: min(1200px, 90%);
  margin-inline: auto;
}</code></pre>
      <p>No media queries needed for simple fluid scaling.</p>

      <h2>Responsive images</h2>
      <pre><code class="language-css">img {
  max-width: 100%;
  height: auto;
  display: block;
}</code></pre>
      <p>Images shrink to fit their container but never grow beyond their natural size.</p>

      <h2>The picture element (art direction)</h2>
      <pre><code class="language-html">&lt;picture&gt;
  &lt;source media="(min-width: 800px)" srcset="hero-wide.jpg"&gt;
  &lt;img src="hero-mobile.jpg" alt="Hero"&gt;
&lt;/picture&gt;</code></pre>
      <p>Serves different crops for different screen sizes.</p>

      <h2>Media queries in practice</h2>
      <pre><code class="language-css">/* Base mobile layout */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}</code></pre>

      <h2>Test on real devices</h2>
      <p>DevTools has a device toolbar (Ctrl+Shift+M) to simulate phones and tablets. Use it constantly.</p>

      <h2>Your turn</h2>
      <p>Build a responsive grid:</p>
      <ul>
        <li>1 column on mobile</li>
        <li>2 columns at 640px+</li>
        <li>3 columns at 1024px+</li>
        <li>Fluid typography with <code>clamp()</code></li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Apply mobile-first design principles",
      "Write media queries and choose breakpoints",
      "Use clamp() for fluid typography and layout"
    ]
  },
  {
    title: "CSS Transitions, Transforms, and Animations",
    contentHtml: `
      <h2>Why motion matters</h2>
      <p>Motion gives feedback, communicates hierarchy, and makes a UI feel alive. But bad motion is worse than none. Used correctly, it feels natural and premium.</p>

      <h2>Transitions</h2>
      <p>A <strong>transition</strong> smoothly animates property changes when triggered by state (hover, focus, class change):</p>
      <pre><code class="language-css">.btn {
  background: #2563eb;
  transition: background 0.2s ease, transform 0.15s ease;
}

.btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}</code></pre>
      <p>Four transition properties:</p>
      <ul>
        <li><strong>property</strong> — what animates (<code>all</code>, <code>background</code>, <code>transform</code>)</li>
        <li><strong>duration</strong> — how long (0.2s)</li>
        <li><strong>timing function</strong> — easing (<code>ease</code>, <code>linear</code>, <code>ease-in-out</code>)</li>
        <li><strong>delay</strong> — wait before starting (usually 0s)</li>
      </ul>

      <h2>Transforms</h2>
      <p>Transforms change an element's shape or position <em>without affecting layout</em> — perfect for animations:</p>
      <pre><code class="language-css">.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.icon {
  transform: rotate(15deg);
}

.circle {
  transform: scale(1.5);
}</code></pre>
      <p>Common transforms: <code>translateX/Y</code>, <code>scale</code>, <code>rotate</code>, <code>skew</code>.</p>

      <h2>Keyframe animations</h2>
      <p>For animations that loop or play automatically, use <code>@keyframes</code>:</p>
      <pre><code class="language-css">@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

.pulse-dot {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: slideIn 0.6s ease-out both;
}</code></pre>

      <h2>Staggered animations</h2>
      <p>Add delay per child using the same keyframes:</p>
      <pre><code class="language-css">.card:nth-child(1) { animation-delay: 0.05s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.15s; }
.card:nth-child(4) { animation-delay: 0.2s; }</code></pre>
      <p>Each card enters slightly after the previous — a polished entrance.</p>

      <h2>Respect prefers-reduced-motion</h2>
      <p>Some users experience motion sickness or vertigo. Always respect their preference:</p>
      <pre><code class="language-css">@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}</code></pre>
      <p>This disables all motion for users who asked for it. It's not just polite — it's an accessibility requirement.</p>

      <h2>Performance tip</h2>
      <p>Only animate <code>transform</code> and <code>opacity</code>. Those are GPU-accelerated and run at 60fps. Animating <code>width</code>, <code>top</code>, or <code>background-position</code> forces layout recalculation and causes jank.</p>
      <pre><code class="language-css">/* BAD — triggers layout */
.menu:hover { width: 300px; }

/* GOOD — GPU-accelerated */
.menu:hover { transform: scaleX(1.2); }</code></pre>

      <h2>Your turn</h2>
      <p>Add:</p>
      <ul>
        <li>A button with hover lift + colour transition</li>
        <li>A pulse dot that loops</li>
        <li>A <code>prefers-reduced-motion</code> rule that disables motion</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Use transitions for smooth state changes",
      "Apply transforms for subtle motion",
      "Animate with @keyframes",
      "Respect prefers-reduced-motion"
    ]
  },
  {
    title: "Practical Project: Build a Responsive Portfolio Website",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a complete, responsive portfolio website combining everything you learned:</p>
      <ul>
        <li>Semantic HTML structure</li>
        <li>CSS variables for colours and typography</li>
        <li>Flexbox and Grid for layout</li>
        <li>Responsive breakpoints</li>
        <li>Smooth transitions and animations</li>
      </ul>

      <h2>Structure</h2>
      <pre><code class="language-html">&lt;body&gt;
  &lt;nav class="navbar"&gt;
    &lt;a class="logo" href="#"&gt;Jane Doe&lt;/a&gt;
    &lt;ul class="nav-links"&gt;
      &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#projects"&gt;Projects&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;

  &lt;header class="hero"&gt;
    &lt;h1&gt;Hi, I'm &lt;span&gt;Jane Doe&lt;/span&gt;&lt;/h1&gt;
    &lt;p&gt;Frontend developer building clean, fast websites.&lt;/p&gt;
    &lt;a class="btn" href="#contact"&gt;Get in touch&lt;/a&gt;
  &lt;/header&gt;

  &lt;section id="projects" class="projects"&gt;
    &lt;h2&gt;Selected Work&lt;/h2&gt;
    &lt;div class="grid"&gt;
      &lt;article class="card"&gt;
        &lt;h3&gt;Project One&lt;/h3&gt;
        &lt;p&gt;A responsive marketing site.&lt;/p&gt;
      &lt;/article&gt;
      &lt;article class="card"&gt;
        &lt;h3&gt;Project Two&lt;/h3&gt;
        &lt;p&gt;A dashboard with charts.&lt;/p&gt;
      &lt;/article&gt;
      &lt;article class="card"&gt;
        &lt;h3&gt;Project Three&lt;/h3&gt;
        &lt;p&gt;A blog with CMS.&lt;/p&gt;
      &lt;/article&gt;
    &lt;/div&gt;
  &lt;/section&gt;

  &lt;footer id="contact" class="footer"&gt;
    &lt;p&gt;Let's build something. jane@example.com&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</code></pre>

      <h2>Design tokens</h2>
      <pre><code class="language-css">:root {
  --color-bg: #0b1020;
  --color-surface: #111827;
  --color-primary: #6366f1;
  --color-text: #f3f4f6;
  --color-muted: #9ca3af;
  --radius: 12px;
  --shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  --font: "Inter", system-ui, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}</code></pre>

      <h2>Sticky navbar with Flexbox</h2>
      <pre><code class="language-css">.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  background: rgba(11, 16, 32, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1f2937;
  z-index: 50;
}

.logo {
  font-weight: 800;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-text);
}</code></pre>

      <h2>Hero section</h2>
      <pre><code class="language-css">.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background:
    radial-gradient(600px 400px at 50% 0%, rgba(99, 102, 241, 0.2), transparent 60%),
    var(--color-bg);
}

.hero h1 {
  font-size: clamp(2.25rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.hero h1 span {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero p {
  font-size: 1.125rem;
  color: var(--color-muted);
  max-width: 55ch;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  background: var(--color-primary);
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.15s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}</code></pre>

      <h2>Responsive project grid</h2>
      <pre><code class="language-css">.projects {
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.projects h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--color-surface);
  border: 1px solid #1f2937;
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow);
}

.card h3 {
  margin-bottom: 0.5rem;
}

.card p {
  color: var(--color-muted);
}</code></pre>

      <h2>Footer</h2>
      <pre><code class="language-css">.footer {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--color-muted);
  border-top: 1px solid #1f2937;
  font-size: 0.95rem;
}</code></pre>

      <h2>Responsive tweaks</h2>
      <pre><code class="language-css">@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
  .hero {
    min-height: 70vh;
    padding: 3rem 1.5rem;
  }
}</code></pre>

      <h2>Your turn</h2>
      <p>Build the complete portfolio:</p>
      <ul>
        <li>Sticky nav with logo and links</li>
        <li>Hero with gradient background and animated heading</li>
        <li>Project grid that responds from 1 → 3 columns</li>
        <li>Cards that lift on hover</li>
        <li>Works on mobile (test in DevTools)</li>
      </ul>
      <p>Submit the HTML + CSS when it's polished.</p>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Combine all CSS concepts into one project",
      "Build responsive layouts with Grid and Flexbox",
      "Test across viewports",
      "Ship a portfolio-ready site"
    ]
  }
];

async function seedCssLessons() {
  const course = await Course.findOne({ slug: "css-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: css-fundamentals");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  // Delete existing lessons for THIS course only, then reinsert
  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < cssLessons.length; i++) {
    const l = cssLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: cssLessons.length } }
  );

  console.log(`   CSS lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedCssLessons };