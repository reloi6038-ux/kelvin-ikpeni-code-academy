/**
 * Kelvin Ikpeni Code Academy — Lesson seed
 * Part 1: HTML Fundamentals (7 lessons)
 * Other courses keep their existing lessons from earlier phases.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// =========================================================
// HTML FUNDAMENTALS — 7 LESSONS
// =========================================================
const htmlLessons = [
  {
    title: "Introduction to HTML",
    contentHtml: `
      <h2>What is HTML?</h2>
      <p><strong>HTML</strong> (HyperText Markup Language) is the standard language for creating web pages. It is <em>not</em> a programming language — it has no logic, loops, or variables. Instead, HTML is a <strong>markup language</strong>: it uses <strong>tags</strong> to describe the structure and meaning of content.</p>
      <p>When you visit a website, your browser downloads an HTML document and reads it top-to-bottom, rendering each element visually. HTML tells the browser "this is a heading," "this is a paragraph," "this is an image," and so on.</p>

      <h2>How browsers render HTML</h2>
      <p>The browser follows a three-step process:</p>
      <ol>
        <li><strong>Parsing</strong> — it reads the HTML text and builds a tree of nodes called the <em>DOM</em> (Document Object Model).</li>
        <li><strong>Layout</strong> — it calculates where each element goes on the page.</li>
        <li><strong>Painting</strong> — it draws pixels to the screen.</li>
      </ol>
      <p>If HTML has an error (a missing close tag, for example), the browser tries to "guess" what you meant and continue. This is called <em>error recovery</em> and is why HTML is forgiving.</p>

      <h2>HTML elements, tags, and attributes</h2>
      <p>Everything in HTML is built from <strong>elements</strong>. An element is made of:</p>
      <ul>
        <li>An <strong>opening tag</strong>: <code>&lt;p&gt;</code></li>
        <li><strong>Content</strong>: <code>Hello, World!</code></li>
        <li>A <strong>closing tag</strong>: <code>&lt;/p&gt;</code></li>
      </ul>
      <p>Some elements are <em>empty</em> (self-closing) and have no content: <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;hr&gt;</code>.</p>

      <h3>Attributes</h3>
      <p>Attributes add extra information to an element. They always live in the opening tag:</p>
      <pre><code class="language-html">&lt;a href="https://example.com" target="_blank"&gt;Visit&lt;/a&gt;</code></pre>
      <p>Here, <code>href</code> and <code>target</code> are attributes. The <code>href</code> tells the browser where the link goes. The <code>target="_blank"</code> opens it in a new tab.</p>

      <h2>Basic document structure</h2>
      <p>Every HTML document follows this skeleton:</p>
      <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first webpage.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      <p>Line by line:</p>
      <ul>
        <li><code>&lt;!DOCTYPE html&gt;</code> — tells the browser "this is HTML5."</li>
        <li><code>&lt;html lang="en"&gt;</code> — the root element. <code>lang</code> helps screen readers pick the right voice.</li>
        <li><code>&lt;head&gt;</code> — metadata: title, charset, styles, scripts. Invisible to users.</li>
        <li><code>&lt;body&gt;</code> — everything visible on the page.</li>
      </ul>

      <h2>Your turn — build your first webpage</h2>
      <p>In the editor on the right, write a complete HTML document with:</p>
      <ul>
        <li>A <code>&lt;title&gt;</code> that says "My First Page"</li>
        <li>An <code>&lt;h1&gt;</code> that says "Welcome to HTML"</li>
        <li>A <code>&lt;p&gt;</code> describing what you're learning</li>
      </ul>
      <p>Click <strong>Run</strong> to preview. Click <strong>Submit</strong> to check your work.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain what HTML is and what it's not",
      "Identify tags, elements, and attributes",
      "Write a valid HTML5 document from memory"
    ]
  },
  {
    title: "HTML Document Structure and Metadata",
    contentHtml: `
      <h2>The doctype declaration</h2>
      <p>The very first line of any HTML document should be:</p>
      <pre><code class="language-html">&lt;!DOCTYPE html&gt;</code></pre>
      <p>This is not a tag — it's a special instruction that tells the browser "use modern standards mode, not the old quirks mode." Without it, old browsers may render your page in unexpected ways.</p>

      <h2>The &lt;head&gt; element</h2>
      <p>Everything in <code>&lt;head&gt;</code> is metadata: information <em>about</em> the page, not visible content. The most important children are:</p>
      <ul>
        <li><strong><code>&lt;title&gt;</code></strong> — the text in the browser tab. Critical for SEO and bookmarks.</li>
        <li><strong><code>&lt;meta charset&gt;</code></strong> — declares text encoding. Always use UTF-8.</li>
        <li><strong><code>&lt;meta name="viewport"&gt;</code></strong> — required for mobile responsiveness.</li>
        <li><strong><code>&lt;meta name="description"&gt;</code></strong> — the summary shown in Google search results.</li>
        <li><strong><code>&lt;link rel="stylesheet"&gt;</code></strong> — loads external CSS.</li>
        <li><strong><code>&lt;script&gt;</code></strong> — loads or embeds JavaScript.</li>
        <li><strong><code>&lt;link rel="icon"&gt;</code></strong> — the favicon.</li>
      </ul>

      <h2>Complete standard head example</h2>
      <pre><code class="language-html">&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="A modern portfolio site."&gt;
  &lt;title&gt;Jane Doe — Frontend Developer&lt;/title&gt;
  &lt;link rel="stylesheet" href="/css/styles.css"&gt;
  &lt;link rel="icon" href="/favicon.ico"&gt;
  &lt;script src="/js/main.js" defer&gt;&lt;/script&gt;
&lt;/head&gt;</code></pre>

      <h3>Why viewport matters</h3>
      <p>Without <code>&lt;meta name="viewport"&gt;</code>, mobile browsers pretend to be a 980px-wide desktop. Your site will look tiny and users will have to zoom. The <code>width=device-width</code> value tells the browser "use the actual device width."</p>

      <h3>The defer attribute</h3>
      <p><code>&lt;script defer&gt;</code> tells the browser: download the script in parallel, but don't execute it until the HTML is fully parsed. This prevents scripts from blocking the page from rendering. Always use <code>defer</code> for scripts unless you have a reason not to.</p>

      <h2>Your turn</h2>
      <p>Create a standards-compliant HTML document with a proper <code>&lt;head&gt;</code> including:</p>
      <ul>
        <li>UTF-8 charset</li>
        <li>Responsive viewport</li>
        <li>A title</li>
        <li>A description</li>
        <li>An external CSS link</li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Write a complete, standards-compliant <head>",
      "Understand why the doctype exists",
      "Use viewport meta for responsive design"
    ]
  },
  {
    title: "Semantic HTML",
    contentHtml: `
      <h2>What are semantic elements?</h2>
      <p>In the early days of HTML, developers used <code>&lt;div&gt;</code> for everything. A page header was <code>&lt;div class="header"&gt;</code>. The nav was <code>&lt;div class="nav"&gt;</code>. The machine couldn't tell them apart from body content.</p>
      <p><strong>Semantic elements</strong> describe what their content <em>means</em>. A <code>&lt;nav&gt;</code> is navigation. An <code>&lt;article&gt;</code> is a self-contained piece of content. This helps:</p>
      <ul>
        <li><strong>Screen readers</strong> — they let users jump between sections.</li>
        <li><strong>Search engines</strong> — Google weights <code>&lt;main&gt;</code> content more than boilerplate.</li>
        <li><strong>Other developers</strong> — your code becomes readable.</li>
      </ul>

      <h2>The main semantic elements</h2>
      <ul>
        <li><code>&lt;header&gt;</code> — introductory content: logo, nav, hero</li>
        <li><code>&lt;nav&gt;</code> — navigation links</li>
        <li><code>&lt;main&gt;</code> — the primary content (only one per page)</li>
        <li><code>&lt;section&gt;</code> — a thematic grouping with a heading</li>
        <li><code>&lt;article&gt;</code> — self-contained content (a blog post, a widget)</li>
        <li><code>&lt;aside&gt;</code> — tangential content (sidebar, related links)</li>
        <li><code>&lt;footer&gt;</code> — closing content: copyright, contact, sitemap</li>
      </ul>

      <h2>Example: a blog homepage</h2>
      <pre><code class="language-html">&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;My Blog&lt;/h1&gt;
    &lt;nav&gt;
      &lt;a href="/"&gt;Home&lt;/a&gt;
      &lt;a href="/about"&gt;About&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;article&gt;
      &lt;h2&gt;Why Semantic HTML Matters&lt;/h2&gt;
      &lt;p&gt;Published Nov 1, 2026&lt;/p&gt;
      &lt;p&gt;Semantic HTML improves accessibility...&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;

  &lt;aside&gt;
    &lt;h3&gt;About Me&lt;/h3&gt;
    &lt;p&gt;I'm a developer learning HTML.&lt;/p&gt;
  &lt;/aside&gt;

  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2026 Jane Doe&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</code></pre>

      <h2>Your turn</h2>
      <p>Structure a blog homepage using all 7 semantic elements. Include:</p>
      <ul>
        <li>A header with your site name and 2 nav links</li>
        <li>A main area with 2 articles</li>
        <li>An aside with author info</li>
        <li>A footer with copyright</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Use all 7 semantic elements correctly",
      "Explain why semantics matter for accessibility and SEO",
      "Replace div soup with meaningful structure"
    ]
  },
  {
    title: "HTML Links, Images, Lists, and Tables",
    contentHtml: `
      <h2>Hyperlinks</h2>
      <p>The <code>&lt;a&gt;</code> element creates a link:</p>
      <pre><code class="language-html">&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;
&lt;a href="/about"&gt;About Us&lt;/a&gt;
&lt;a href="#section-2"&gt;Jump to Section 2&lt;/a&gt;
&lt;a href="mailto:hi@example.com"&gt;Email Me&lt;/a&gt;
&lt;a href="tel:+1234567890"&gt;Call Us&lt;/a&gt;</code></pre>
      <ul>
        <li>Absolute URLs start with <code>https://</code>.</li>
        <li>Relative URLs start with <code>/</code> (from site root) or <code>./</code> (from current page).</li>
        <li>Fragment links start with <code>#</code> and jump to an element with the matching id.</li>
        <li><code>mailto:</code> and <code>tel:</code> open the user's email or phone app.</li>
      </ul>

      <h2>Images</h2>
      <pre><code class="language-html">&lt;img src="/images/hero.jpg" alt="A mountain at sunrise" width="800" height="600"&gt;</code></pre>
      <p>Always include <code>alt</code> text describing the image. This is used by screen readers and appears if the image fails to load. Decorative images should have <code>alt=""</code> (empty) so screen readers skip them.</p>

      <h2>Lists</h2>
      <pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;Item one&lt;/li&gt;
  &lt;li&gt;Item two&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;First step&lt;/li&gt;
  &lt;li&gt;Second step&lt;/li&gt;
&lt;/ol&gt;

&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;The markup language of the web&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
      <p>Use <code>&lt;ul&gt;</code> for unordered (bulleted) lists, <code>&lt;ol&gt;</code> for ordered (numbered) lists, and <code>&lt;dl&gt;</code> for description lists (term + definition pairs).</p>

      <h2>Tables</h2>
      <pre><code class="language-html">&lt;table&gt;
  &lt;caption&gt;Course Timetable&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Time&lt;/th&gt;
      &lt;th&gt;Course&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;9:00 AM&lt;/td&gt;
      &lt;td&gt;HTML Fundamentals&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
      <p>Tables are for <em>tabular data</em>, not for page layout. Use <code>&lt;caption&gt;</code> to describe the table, <code>&lt;thead&gt;</code> for header rows, <code>&lt;tbody&gt;</code> for data rows, and <code>&lt;th&gt;</code> (not <code>&lt;td&gt;</code>) for header cells. Screen readers use these to help users navigate complex tables.</p>

      <h2>Your turn</h2>
      <p>Build a course catalogue page containing:</p>
      <ul>
        <li>A list of 3 courses (unordered list)</li>
        <li>A link to "Enrol Now"</li>
        <li>An image for each course</li>
        <li>A timetable table showing when each course meets</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Create internal, external, and fragment links",
      "Write accessible images with descriptive alt text",
      "Build semantic tables with captions and headers"
    ]
  },
  {
    title: "Accessible HTML Markup",
    contentHtml: `
      <h2>Why accessibility matters</h2>
      <p>Over 1 billion people worldwide have some form of disability. Accessible HTML ensures your site works for users who:</p>
      <ul>
        <li>Use screen readers (blind or low vision)</li>
        <li>Navigate with keyboards only</li>
        <li>Have motor impairments</li>
        <li>Are deaf or hard of hearing (need captions)</li>
        <li>Have cognitive disabilities (need clarity)</li>
      </ul>
      <p>Accessibility is not just ethically right — it's legally required in many countries (ADA in the US, WCAG in the EU, AODA in Canada).</p>

      <h2>Accessible headings</h2>
      <p>Use headings to outline your document. Never skip levels:</p>
      <pre><code class="language-html">&lt;!-- GOOD --&gt;
&lt;h1&gt;Main Title&lt;/h1&gt;
&lt;h2&gt;Section&lt;/h2&gt;
&lt;h3&gt;Subsection&lt;/h3&gt;

&lt;!-- BAD: skipped h2 --&gt;
&lt;h1&gt;Main Title&lt;/h1&gt;
&lt;h3&gt;Section&lt;/h3&gt;</code></pre>
      <p>Use one <code>&lt;h1&gt;</code> per page. Screen reader users navigate by jumping between headings — a proper hierarchy lets them skim your page.</p>

      <h2>Descriptive links</h2>
      <p>Screen reader users often list all links on a page. "Click here" tells them nothing.</p>
      <pre><code class="language-html">&lt;!-- BAD --&gt;
&lt;a href="/docs"&gt;Click here&lt;/a&gt;

&lt;!-- GOOD --&gt;
&lt;a href="/docs"&gt;Read the documentation&lt;/a&gt;</code></pre>

      <h2>Image alt text</h2>
      <p>Alt text describes images for users who can't see them. Be specific:</p>
      <pre><code class="language-html">&lt;!-- BAD --&gt;
&lt;img src="/chart.png" alt="chart"&gt;

&lt;!-- GOOD --&gt;
&lt;img src="/chart.png" alt="Bar chart showing 40% growth in Q3 2026"&gt;

&lt;!-- DECORATIVE --&gt;
&lt;img src="/decor.png" alt=""&gt;</code></pre>

      <h2>Form labels</h2>
      <p>Every input must have a label associated with it. Use <code>for</code> matching the input's <code>id</code>:</p>
      <pre><code class="language-html">&lt;label for="email"&gt;Email address&lt;/label&gt;
&lt;input id="email" name="email" type="email" required&gt;</code></pre>
      <p>Clicking the label focuses the input. Screen readers announce "Email address, edit text" when the user tabs to the field.</p>

      <h2>Keyboard navigation</h2>
      <p>Users who can't use a mouse navigate with <kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>, <kbd>Enter</kbd>, and <kbd>Space</kbd>. Ensure:</p>
      <ul>
        <li>All interactive elements (<code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>) are reachable by Tab.</li>
        <li>Focus outlines are visible (don't remove them with <code>outline: none</code>).</li>
      </ul>

      <h2>When to use ARIA</h2>
      <p><strong>ARIA</strong> (Accessible Rich Internet Applications) attributes add extra meaning for screen readers. But the first rule of ARIA is: <em>don't use ARIA when native HTML works</em>.</p>
      <pre><code class="language-html">&lt;!-- BAD: redundant --&gt;
&lt;button role="button" aria-label="Submit"&gt;Submit&lt;/button&gt;

&lt;!-- GOOD: only when needed --&gt;
&lt;div role="alert"&gt;Your changes were saved.&lt;/div&gt;</code></pre>

      <h2>Your turn</h2>
      <p>Improve the accessibility of the provided HTML:</p>
      <ul>
        <li>Fix the heading hierarchy</li>
        <li>Make link text descriptive</li>
        <li>Add proper alt text to images</li>
        <li>Associate labels with form inputs</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Write accessible headings and link text",
      "Use descriptive alt text",
      "Associate labels with form inputs",
      "Know when to use ARIA"
    ]
  },
  {
    title: "HTML Forms and Input Elements",
    contentHtml: `
      <h2>The &lt;form&gt; element</h2>
      <p>Forms collect user input. Every form needs:</p>
      <ul>
        <li>An <code>action</code> attribute — the URL where data is submitted.</li>
        <li>A <code>method</code> — usually <code>post</code> (or <code>get</code> for search).</li>
      </ul>
      <pre><code class="language-html">&lt;form action="/api/register" method="post"&gt;
  &lt;!-- inputs go here --&gt;
&lt;/form&gt;</code></pre>

      <h2>Text inputs</h2>
      <pre><code class="language-html">&lt;label for="name"&gt;Full name&lt;/label&gt;
&lt;input id="name" name="name" type="text" required maxlength="80"&gt;

&lt;label for="email"&gt;Email&lt;/label&gt;
&lt;input id="email" name="email" type="email" required&gt;

&lt;label for="pw"&gt;Password&lt;/label&gt;
&lt;input id="pw" name="pw" type="password" required minlength="8"&gt;

&lt;label for="age"&gt;Age&lt;/label&gt;
&lt;input id="age" name="age" type="number" min="13" max="120"&gt;</code></pre>
      <p>Notice:</p>
      <ul>
        <li><code>type="email"</code> gives free email validation.</li>
        <li><code>required</code> makes the field mandatory.</li>
        <li><code>minlength</code>, <code>maxlength</code>, <code>min</code>, <code>max</code> constrain values.</li>
      </ul>

      <h2>Radio buttons and checkboxes</h2>
      <pre><code class="language-html">&lt;fieldset&gt;
  &lt;legend&gt;Preferred contact method&lt;/legend&gt;

  &lt;label&gt;&lt;input type="radio" name="contact" value="email" checked&gt; Email&lt;/label&gt;
  &lt;label&gt;&lt;input type="radio" name="contact" value="phone"&gt; Phone&lt;/label&gt;
&lt;/fieldset&gt;

&lt;fieldset&gt;
  &lt;legend&gt;Topics you enjoy&lt;/legend&gt;
  &lt;label&gt;&lt;input type="checkbox" name="topics" value="html"&gt; HTML&lt;/label&gt;
  &lt;label&gt;&lt;input type="checkbox" name="topics" value="css"&gt; CSS&lt;/label&gt;
  &lt;label&gt;&lt;input type="checkbox" name="topics" value="js"&gt; JavaScript&lt;/label&gt;
&lt;/fieldset&gt;</code></pre>
      <p>Radio buttons are for <em>mutually exclusive</em> choices (pick one). Checkboxes are for <em>multiple</em> choices (pick any). Group them with <code>&lt;fieldset&gt;</code> and label the group with <code>&lt;legend&gt;</code>.</p>

      <h2>Select menus and textareas</h2>
      <pre><code class="language-html">&lt;label for="country"&gt;Country&lt;/label&gt;
&lt;select id="country" name="country"&gt;
  &lt;option value=""&gt;-- Choose --&lt;/option&gt;
  &lt;option value="ng"&gt;Nigeria&lt;/option&gt;
  &lt;option value="us"&gt;United States&lt;/option&gt;
  &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
&lt;/select&gt;

&lt;label for="bio"&gt;Short bio&lt;/label&gt;
&lt;textarea id="bio" name="bio" rows="4" maxlength="500"&gt;&lt;/textarea&gt;</code></pre>

      <h2>Buttons</h2>
      <pre><code class="language-html">&lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;button type="reset"&gt;Reset&lt;/button&gt;
&lt;button type="button" onclick="alert('Hi')"&gt;Click Me&lt;/button&gt;</code></pre>
      <p>Always specify <code>type</code>. The default is <code>submit</code>, which can trigger accidental submissions.</p>

      <h2>Built-in validation</h2>
      <pre><code class="language-html">&lt;input type="email" required&gt;
&lt;input type="url"&gt;
&lt;input type="number" min="0" max="100" step="5"&gt;
&lt;input type="text" pattern="[A-Za-z]{3,}"&gt;
&lt;input type="date"&gt;
&lt;input type="color"&gt;
&lt;input type="file" accept="image/*"&gt;</code></pre>
      <p>Modern browsers validate these automatically and show error messages. Server-side validation is still required — never trust the client.</p>

      <h2>Your turn</h2>
      <p>Build a student registration form with:</p>
      <ul>
        <li>Full name (required)</li>
        <li>Email (required)</li>
        <li>Password (min 8 chars)</li>
        <li>Date of birth</li>
        <li>Country (select)</li>
        <li>Favorite subjects (checkboxes)</li>
        <li>Subscribe to newsletter (checkbox)</li>
        <li>A submit button</li>
      </ul>
      <p>Use labels, fieldsets, and validation attributes.</p>
    `,
    estimatedMinutes: 60,
    learningObjectives: [
      "Build forms with proper labels",
      "Choose the right input type for each field",
      "Use fieldset/legend for grouped inputs",
      "Apply HTML5 validation attributes"
    ]
  },
  {
    title: "HTML Practical Project",
    contentHtml: `
      <h2>Project: Personal Portfolio</h2>
      <p>Now you'll combine everything from the course into a complete portfolio page. This is a real project you can deploy and show to employers.</p>

      <h2>Requirements</h2>
      <p>Your portfolio must include:</p>
      <ol>
        <li><strong>A &lt;header&gt;</strong> with your name and a nav linking to each section (#about, #projects, #contact)</li>
        <li><strong>A hero section</strong> with a headline and a call-to-action button</li>
        <li><strong>An "About" section</strong> with a short bio (2-3 paragraphs) and an image</li>
        <li><strong>A "Projects" section</strong> with 3 project cards using semantic articles</li>
        <li><strong>A "Contact" section</strong> with a form: name, email, message, submit</li>
        <li><strong>A &lt;footer&gt;</strong> with copyright and social links</li>
        <li><strong>Semantic structure</strong> using all major elements</li>
        <li><strong>Accessibility</strong>: proper headings, alt text, labels</li>
        <li><strong>Metadata</strong>: proper title, description, viewport, favicon</li>
      </ol>

      <h2>Starter structure</h2>
      <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Portfolio of [Your Name], aspiring frontend developer."&gt;
  &lt;title&gt;[Your Name] — Portfolio&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;[Your Name]&lt;/h1&gt;
    &lt;nav&gt;
      &lt;a href="#about"&gt;About&lt;/a&gt;
      &lt;a href="#projects"&gt;Projects&lt;/a&gt;
      &lt;a href="#contact"&gt;Contact&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;section class="hero"&gt;
      &lt;h2&gt;Building for the Web&lt;/h2&gt;
      &lt;p&gt;I'm a self-taught developer...&lt;/p&gt;
      &lt;a href="#contact"&gt;Get in Touch&lt;/a&gt;
    &lt;/section&gt;

    &lt;section id="about"&gt;
      &lt;h2&gt;About Me&lt;/h2&gt;
      &lt;img src="/me.jpg" alt="Photo of [Your Name]"&gt;
      &lt;p&gt;Bio paragraph 1...&lt;/p&gt;
    &lt;/section&gt;

    &lt;section id="projects"&gt;
      &lt;h2&gt;Projects&lt;/h2&gt;
      &lt;article&gt;
        &lt;h3&gt;Project 1&lt;/h3&gt;
        &lt;p&gt;Description...&lt;/p&gt;
        &lt;a href="#"&gt;View Project&lt;/a&gt;
      &lt;/article&gt;
    &lt;/section&gt;

    &lt;section id="contact"&gt;
      &lt;h2&gt;Contact&lt;/h2&gt;
      &lt;form action="/api/contact" method="post"&gt;
        &lt;label for="name"&gt;Name&lt;/label&gt;
        &lt;input id="name" name="name" type="text" required&gt;

        &lt;label for="email"&gt;Email&lt;/label&gt;
        &lt;input id="email" name="email" type="email" required&gt;

        &lt;label for="message"&gt;Message&lt;/label&gt;
        &lt;textarea id="message" name="message" rows="4" required&gt;&lt;/textarea&gt;

        &lt;button type="submit"&gt;Send Message&lt;/button&gt;
      &lt;/form&gt;
    &lt;/section&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2026 [Your Name]. All rights reserved.&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

      <h2>Your turn</h2>
      <p>Fill in the template with your own content, then test:</p>
      <ul>
        <li>Run the page in the IDE</li>
        <li>Click each nav link — verify it jumps to the correct section</li>
        <li>Try to submit with an invalid email — browser should block it</li>
        <li>Tab through — every interactive element should receive focus</li>
      </ul>
    `,
    estimatedMinutes: 90,
    learningObjectives: [
      "Combine semantic HTML, forms, images, and metadata into a real page",
      "Test a page for accessibility and validity",
      "Ship a portfolio you can share"
    ]
  }
];

// =========================================================
// OTHER COURSES — keep their existing lessons
// =========================================================
const otherLessons = {
  "introduction-to-web-development": [
    {
      title: "How the Web Works",
      contentHtml: `
        <p>The web is a network of computers that talk using HTTP. When you type a URL into your browser:</p>
        <ol>
          <li><strong>DNS resolution</strong> — the domain becomes an IP address.</li>
          <li><strong>TCP/TLS connection</strong> — a secure pipe is opened.</li>
          <li><strong>HTTP request</strong> — your browser asks the server for the page.</li>
          <li><strong>HTTP response</strong> — the server returns HTML, CSS, and JS.</li>
          <li><strong>Rendering</strong> — your browser paints the page.</li>
        </ol>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Explain DNS and HTTP", "Identify frontend vs backend"]
    },
    {
      title: "Clients, Servers, and APIs",
      contentHtml: `
        <p>A <strong>client</strong> is a browser making requests. A <strong>server</strong> listens for requests and returns responses.</p>
        <p>Most modern apps communicate using <strong>APIs</strong> — usually REST APIs that speak JSON over HTTP.</p>
        <pre><code>GET /api/courses
{ "courses": [{ "title": "HTML Fundamentals", "lessons": 7 }] }</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Differentiate client and server", "Read a JSON API response"]
    }
  ],

  "css-fundamentals": [
    {
      title: "Selectors and Specificity",
      contentHtml: `
        <p>CSS selectors target HTML elements. Specificity decides which rule wins when they conflict.</p>
        <pre><code>p { color: blue; }           /* element: 0-0-1 */
.text-red { color: red; }    /* class: 0-1-0 */
#hero { color: green; }      /* id: 1-0-0 */</code></pre>
        <p>Rule of thumb: prefer classes. Avoid IDs for styling.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Write selectors", "Understand specificity"]
    },
    {
      title: "The Box Model",
      contentHtml: `
        <p>Every element is a box: <strong>content</strong> + <strong>padding</strong> + <strong>border</strong> + <strong>margin</strong>.</p>
        <p>Modern best practice:</p>
        <pre><code>*, *::before, *::after { box-sizing: border-box; }</code></pre>
        <p>Now <code>width</code> includes padding and border.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Describe the box layers", "Use box-sizing"]
    },
    {
      title: "Flexbox Layouts",
      contentHtml: `
        <pre><code>.row {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}</code></pre>
        <p>Flexbox arranges children along one axis.</p>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Build a flex row", "Center content"]
    }
  ],

  "javascript-essentials": [
    {
      title: "Variables and Data Types",
      contentHtml: `
        <pre><code>const name = "Alice";      // string
let age = 30;              // number
const isAdmin = false;     // boolean
const tags = ["a", "b"];   // array
const user = { name: "Alice" }; // object</code></pre>
        <p>Use <code>const</code> by default, <code>let</code> when reassigning.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Declare variables", "Identify types"]
    },
    {
      title: "Functions and Arrow Functions",
      contentHtml: `
        <pre><code>function add(a, b) { return a + b; }
const add2 = (a, b) => a + b;</code></pre>
        <p>Arrow functions are shorter and inherit <code>this</code>.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Write functions", "Write arrow functions"]
    }
  ],

  "es6-and-async-javascript": [
    {
      title: "Destructuring and Spread",
      contentHtml: `
        <pre><code>const user = { name: "Alice", age: 30 };
const { name, age } = user;

const arr = [1, 2, 3];
const [first, ...rest] = arr;

const merged = { ...user, role: "admin" };</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Destructure objects", "Use spread"]
    },
    {
      title: "Async / Await and Fetch",
      contentHtml: `
        <pre><code>async function loadCourses() {
  try {
    const res = await fetch("/api/courses");
    if (!res.ok) throw new Error("HTTP " + res.status);
    return (await res.json()).courses;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}</code></pre>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Use async/await", "Handle errors"]
    }
  ],

  "node-js-runtime": [
    {
      title: "What is Node.js?",
      contentHtml: `
        <p>Node.js runs JavaScript <em>outside</em> the browser. Built on Chrome's V8 engine.</p>
        <pre><code>// hello.js
console.log("Hello from Node!");</code></pre>
        <p>Run with <code>node hello.js</code>.</p>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Explain Node.js", "Run a script"]
    },
    {
      title: "npm and package.json",
      contentHtml: `
        <pre><code>npm init -y
npm install express</code></pre>
        <p><code>package.json</code> describes dependencies and scripts.</p>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Install packages", "Write scripts"]
    }
  ],

  "express-js-fundamentals": [
    {
      title: "Your First Express Server",
      contentHtml: `
        <pre><code>const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(3000);</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Create a server", "Handle a route"]
    },
    {
      title: "Middleware and Routing",
      contentHtml: `
        <pre><code>app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});</code></pre>
      `,
      estimatedMinutes: 12,
      learningObjectives: ["Write middleware", "Chain middleware"]
    }
  ],

  "mongodb-mongoose": [
    {
      title: "Connecting to MongoDB",
      contentHtml: `
        <pre><code>const mongoose = require("mongoose");
await mongoose.connect(process.env.MONGODB_URI);</code></pre>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Connect Mongoose", "Use env vars"]
    },
    {
      title: "Defining Schemas",
      contentHtml: `
        <pre><code>const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Define a schema", "Add validation"]
    }
  ],

  "authentication-security": [
    {
      title: "Password Hashing with bcrypt",
      contentHtml: `
        <pre><code>const bcrypt = require("bcryptjs");
const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, hash);</code></pre>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Hash passwords", "Verify with bcrypt"]
    },
    {
      title: "Session vs JWT Auth",
      contentHtml: `
        <ul>
          <li><strong>Sessions</strong> — server stores state, client holds HttpOnly cookie.</li>
          <li><strong>JWT</strong> — client holds a signed token.</li>
        </ul>
      `,
      estimatedMinutes: 10,
      learningObjectives: ["Compare auth strategies"]
    }
  ],

  "deploying-to-render": [
    {
      title: "Production Environment Variables",
      contentHtml: `
        <p>Never commit secrets. Set them in Render's dashboard:</p>
        <ul>
          <li><code>MONGODB_URI</code></li>
          <li><code>SESSION_SECRET</code></li>
          <li><code>NODE_ENV=production</code></li>
        </ul>
      `,
      estimatedMinutes: 8,
      learningObjectives: ["Configure env vars", "Secure cookies"]
    },
    {
      title: "Health Checks and Logs",
      contentHtml: `
        <pre><code>app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});</code></pre>
        <p>Render uses this to monitor your app.</p>
      `,
      estimatedMinutes: 6,
      learningObjectives: ["Add a health check", "Read logs"]
    }
  ]
};

// =========================================================
// Seeder
// =========================================================
async function seedLessons() {
  let created = 0;
  let updated = 0;

  // Seed HTML Fundamentals
  const htmlCourse = await Course.findOne({ slug: "html-fundamentals" });
  if (htmlCourse) {
    for (let i = 0; i < htmlLessons.length; i++) {
      const l = htmlLessons[i];
      const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const existing = await Lesson.findOne({ course: htmlCourse._id, slug: lessonSlug });

      if (existing) {
        await Lesson.updateOne(
          { _id: existing._id },
          { $set: { ...l, slug: lessonSlug, order: i, course: htmlCourse._id } }
        );
        updated++;
      } else {
        await Lesson.create({ ...l, slug: lessonSlug, order: i, course: htmlCourse._id });
        created++;
      }
    }
    const total = await Lesson.countDocuments({ course: htmlCourse._id });
    await Course.updateOne({ _id: htmlCourse._id }, { $set: { lessonsCount: total } });
  }

  // Seed other courses
  for (const [slug, lessons] of Object.entries(otherLessons)) {
    const course = await Course.findOne({ slug });
    if (!course) {
      console.warn(`⚠  Course not found for lessons: ${slug}`);
      continue;
    }

    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const existing = await Lesson.findOne({ course: course._id, slug: lessonSlug });

      if (existing) {
        await Lesson.updateOne(
          { _id: existing._id },
          { $set: { ...l, slug: lessonSlug, order: i, course: course._id } }
        );
        updated++;
      } else {
        await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
        created++;
      }
    }

    const total = await Lesson.countDocuments({ course: course._id });
    await Course.updateOne({ _id: course._id }, { $set: { lessonsCount: total } });
  }

  console.log(`   Lessons:  ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedLessons };