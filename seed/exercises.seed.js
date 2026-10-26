/**
 * Kelvin Ikpeni Code Academy — Exercise seed
 * 70 exercises across HTML, CSS, JavaScript, Node, Express, debugging, and algorithms.
 * Part 2: HTML Fundamentals expanded to 20 exercises.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const exercises = [
  // ============ HTML (1-20) ============
  {
    title: "Add a Heading",
    slug: "add-a-heading",
    description: "<p>Create an <code>&lt;h1&gt;</code> element with the text <strong>Hello, World!</strong> inside the body.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <h1>Hello, World!</h1>\n</body>",
    hints: ["Use an &lt;h1&gt; tag."],
    testCases: [
      { description: "Contains an <h1> element", pattern: "<h1" },
      { description: "Contains the text 'Hello, World!'", expectText: "Hello, World!" }
    ],
    points: 10, order: 1
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
    points: 10, order: 2
  },
  {
    title: "Build an Unordered List",
    slug: "build-unordered-list",
    description: "<p>Create an unordered list with three items: <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "lists",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: `<body>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n  </ul>\n</body>`,
    hints: ["Use &lt;ul&gt; and &lt;li&gt;."],
    testCases: [
      { description: "Contains a <ul> element", pattern: "<ul" },
      { description: "Contains 'HTML'", expectText: "HTML" },
      { description: "Contains 'CSS'", expectText: "CSS" },
      { description: "Contains 'JavaScript'", expectText: "JavaScript" }
    ],
    points: 15, order: 3
  },
  {
    title: "Add an Image",
    slug: "add-an-image",
    description: "<p>Add an <code>&lt;img&gt;</code> tag with the source <code>/logo.png</code> and alt text <code>Logo</code>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: '<body>\n  <img src="/logo.png" alt="Logo">\n</body>',
    hints: ["Use the &lt;img&gt; tag with src and alt attributes."],
    testCases: [
      { description: "Contains an <img> tag", pattern: "<img" },
      { description: "src is /logo.png", pattern: "src=[\"']?/logo\\.png" },
      { description: "alt is Logo", pattern: "alt=[\"']?Logo" }
    ],
    points: 10, order: 4
  },
  {
    title: "Create a Button",
    slug: "create-a-button",
    description: "<p>Create a <code>&lt;button&gt;</code> element that says <strong>Click Me</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <button>Click Me</button>\n</body>",
    hints: ["Use the &lt;button&gt; tag."],
    testCases: [
      { description: "Contains a <button> element", pattern: "<button" },
      { description: "Contains 'Click Me'", expectText: "Click Me" }
    ],
    points: 10, order: 5
  },
  {
    title: "Add a Paragraph",
    slug: "add-a-paragraph",
    description: "<p>Create a <code>&lt;p&gt;</code> element with the text <strong>This is a paragraph.</strong></p>",
    difficulty: "beginner",
    language: "html",
    topic: "basics",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <p>This is a paragraph.</p>\n</body>",
    hints: ["Use the &lt;p&gt; tag."],
    testCases: [
      { description: "Contains a <p> element", pattern: "<p" },
      { description: "Contains the correct text", expectText: "This is a paragraph." }
    ],
    points: 10, order: 6
  },
  {
    title: "Create a Form with Input",
    slug: "create-a-form-with-input",
    description: "<p>Create a <code>&lt;form&gt;</code> containing a text <code>&lt;input&gt;</code> and a submit button.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "forms",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: '<body>\n  <form>\n    <input type="text">\n    <button type="submit">Submit</button>\n  </form>\n</body>',
    hints: ["Use &lt;form&gt;, &lt;input type='text'&gt;, and &lt;button&gt;."],
    testCases: [
      { description: "Contains a <form> element", pattern: "<form" },
      { description: "Contains a text input", pattern: "<input[^>]*type=[\"']?text" },
      { description: "Contains a submit button", pattern: "<button[^>]*type=[\"']?submit" }
    ],
    points: 15, order: 7
  },
  {
    title: "Create an Ordered List",
    slug: "create-an-ordered-list",
    description: "<p>Create an ordered list with items: <strong>First</strong>, <strong>Second</strong>, <strong>Third</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "lists",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <ol>\n    <li>First</li>\n    <li>Second</li>\n    <li>Third</li>\n  </ol>\n</body>",
    hints: ["Use &lt;ol&gt; and &lt;li&gt;."],
    testCases: [
      { description: "Contains an <ol> element", pattern: "<ol" },
      { description: "Contains 'First'", expectText: "First" },
      { description: "Contains 'Third'", expectText: "Third" }
    ],
    points: 10, order: 8
  },
  {
    title: "Semantic Header",
    slug: "semantic-header",
    description: "<p>Use a semantic <code>&lt;header&gt;</code> element containing an <code>&lt;h1&gt;</code> that says <strong>My Site</strong>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "semantic",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <header>\n    <h1>My Site</h1>\n  </header>\n</body>",
    hints: ["Use &lt;header&gt; as the container, &lt;h1&gt; inside."],
    testCases: [
      { description: "Contains a <header> element", pattern: "<header" },
      { description: "Contains an <h1> inside", pattern: "<header[\\s\\S]*<h1" },
      { description: "Contains 'My Site'", expectText: "My Site" }
    ],
    points: 15, order: 9
  },
  {
    title: "Add a Table",
    slug: "add-a-table",
    description: "<p>Create a <code>&lt;table&gt;</code> with a single row and one cell containing the text <strong>Data</strong>.</p>",
    difficulty: "intermediate",
    language: "html",
    topic: "tables",
    starterHtml: "<body>\n  <!-- Your code here -->\n</body>",
    solutionHtml: "<body>\n  <table>\n    <tr>\n      <td>Data</td>\n    </tr>\n  </table>\n</body>",
    hints: ["Use &lt;table&gt;, &lt;tr&gt;, and &lt;td&gt;."],
    testCases: [
      { description: "Contains a <table> element", pattern: "<table" },
      { description: "Contains a <tr> element", pattern: "<tr" },
      { description: "Contains the text 'Data'", expectText: "Data" }
    ],
    points: 15, order: 10
  },
  {
    title: "Build a Full Page Structure",
    slug: "full-page-structure",
    description: "<p>Create a complete HTML5 document with <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang='en'&gt;</code>, a <code>&lt;head&gt;</code> with charset + viewport + title, and a <code>&lt;body&gt;</code> with an <code>&lt;h1&gt;</code> saying 'My Page'.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "structure",
    starterHtml: "<!-- Start your document below -->\n",
    solutionHtml: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>My Page</h1>\n</body>\n</html>",
    hints: ["The doctype must be the first line.", "Include both charset and viewport metas.", "The <h1> goes inside <body>."],
    testCases: [
      { description: "Contains <!DOCTYPE html>", pattern: "<!DOCTYPE html>" },
      { description: "Contains <html lang='en'>", pattern: "<html[^>]*lang=[\"']en[\"']" },
      { description: "Contains charset UTF-8", pattern: "charset=[\"']UTF-8[\"']" },
      { description: "Contains viewport meta", pattern: "name=[\"']viewport[\"']" },
      { description: "Contains <title>My Page</title>", pattern: "<title>\\s*My Page\\s*</title>" },
      { description: "Contains <h1>My Page</h1>", expectText: "My Page" }
    ],
    points: 20, order: 11
  },
  {
    title: "Build a Navigation Menu",
    slug: "build-nav-menu",
    description: "<p>Create a <code>&lt;nav&gt;</code> element with 3 links: Home (to <code>/</code>), About (to <code>/about</code>), Contact (to <code>/contact</code>).</p>",
    difficulty: "beginner",
    language: "html",
    topic: "navigation",
    starterHtml: "<body>\n  <!-- Add nav here -->\n</body>",
    solutionHtml: '<body>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n    <a href="/contact">Contact</a>\n  </nav>\n</body>',
    hints: ["Use the &lt;nav&gt; tag.", "Each link is an &lt;a href='...'&gt;."],
    testCases: [
      { description: "Contains a <nav> element", pattern: "<nav" },
      { description: "Links to /", pattern: "href=[\"']/[\"']" },
      { description: "Links to /about", pattern: "href=[\"']/about[\"']" },
      { description: "Links to /contact", pattern: "href=[\"']/contact[\"']" },
      { description: "Shows 'Home'", expectText: "Home" },
      { description: "Shows 'Contact'", expectText: "Contact" }
    ],
    points: 15, order: 12
  },
  {
    title: "Create an Article with Header",
    slug: "create-article-with-header",
    description: "<p>Create an <code>&lt;article&gt;</code> containing a <code>&lt;header&gt;</code> with an <code>&lt;h2&gt;</code> 'Blog Post', and a paragraph with 'Content here.'</p>",
    difficulty: "intermediate",
    language: "html",
    topic: "semantic",
    starterHtml: "<body>\n  <!-- Add article here -->\n</body>",
    solutionHtml: "<body>\n  <article>\n    <header>\n      <h2>Blog Post</h2>\n    </header>\n    <p>Content here.</p>\n  </article>\n</body>",
    hints: ["Use &lt;article&gt; as the wrapper.", "Put &lt;header&gt; inside &lt;article&gt;."],
    testCases: [
      { description: "Contains an <article>", pattern: "<article" },
      { description: "Article contains a <header>", pattern: "<article[\\s\\S]*<header" },
      { description: "Header contains an <h2>", pattern: "<header[\\s\\S]*<h2" },
      { description: "Shows 'Blog Post'", expectText: "Blog Post" },
      { description: "Shows 'Content here.'", expectText: "Content here." }
    ],
    points: 20, order: 13
  },
  {
    title: "Accessible Form",
    slug: "accessible-form",
    description: "<p>Create a form with a labeled email input and a submit button. Both the label's <code>for</code> and the input's <code>id</code> must be <code>email</code>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "forms",
    starterHtml: "<body>\n  <!-- Add form here -->\n</body>",
    solutionHtml: '<body>\n  <form>\n    <label for="email">Email</label>\n    <input id="email" name="email" type="email" required>\n    <button type="submit">Submit</button>\n  </form>\n</body>',
    hints: ["The label's 'for' must match the input's 'id'.", "Use type='email' for validation."],
    testCases: [
      { description: "Contains a <form>", pattern: "<form" },
      { description: "Label with for='email'", pattern: "<label[^>]*for=[\"']email[\"']" },
      { description: "Input with id='email'", pattern: "<input[^>]*id=[\"']email[\"']" },
      { description: "Input type='email'", pattern: "<input[^>]*type=[\"']email[\"']" },
      { description: "Contains submit button", pattern: "<button[^>]*type=[\"']submit[\"']" }
    ],
    points: 20, order: 14
  },
  {
    title: "Create a Table with Headers",
    slug: "table-with-headers",
    description: "<p>Create a table with a <code>&lt;caption&gt;</code>, header row (<code>&lt;th&gt;</code>), and at least one data row with two <code>&lt;td&gt;</code> cells.</p>",
    difficulty: "intermediate",
    language: "html",
    topic: "tables",
    starterHtml: "<body>\n  <!-- Add table here -->\n</body>",
    solutionHtml: "<body>\n  <table>\n    <caption>Product Prices</caption>\n    <thead>\n      <tr><th>Product</th><th>Price</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Apple</td><td>$1</td></tr>\n    </tbody>\n  </table>\n</body>",
    hints: ["Use &lt;caption&gt; inside &lt;table&gt;.", "Use &lt;th&gt; for headers, &lt;td&gt; for data."],
    testCases: [
      { description: "Contains a <table>", pattern: "<table" },
      { description: "Has a <caption>", pattern: "<caption" },
      { description: "Has a <th>", pattern: "<th" },
      { description: "Has a <td>", pattern: "<td" }
    ],
    points: 20, order: 15
  },
  {
    title: "Use the <fieldset> Element",
    slug: "use-fieldset",
    description: "<p>Group two radio buttons inside a <code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code> 'Choose One'.</p>",
    difficulty: "intermediate",
    language: "html",
    topic: "forms",
    starterHtml: "<body>\n  <!-- Add fieldset here -->\n</body>",
    solutionHtml: '<body>\n  <fieldset>\n    <legend>Choose One</legend>\n    <label><input type="radio" name="choice" value="a"> A</label>\n    <label><input type="radio" name="choice" value="b"> B</label>\n  </fieldset>\n</body>',
    hints: ["Wrap the radio buttons in &lt;fieldset&gt;.", "The &lt;legend&gt; is the group's label."],
    testCases: [
      { description: "Contains a <fieldset>", pattern: "<fieldset" },
      { description: "Contains a <legend>Choose One</legend>", pattern: "<legend>\\s*Choose One\\s*</legend>" },
      { description: "Contains a radio input", pattern: "type=[\"']radio[\"']" },
      { description: "Two radio buttons share the same name", pattern: "name=[\"']choice[\"'][\\s\\S]*name=[\"']choice[\"']" }
    ],
    points: 20, order: 16
  },
  {
    title: "Add Meta Description",
    slug: "add-meta-description",
    description: "<p>Add a <code>&lt;meta name='description'&gt;</code> tag with content 'Learn HTML from scratch.' inside the <code>&lt;head&gt;</code>.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "metadata",
    starterHtml: "<html>\n  <head>\n    <!-- Add meta here -->\n  </head>\n  <body></body>\n</html>",
    solutionHtml: "<html>\n  <head>\n    <meta name=\"description\" content=\"Learn HTML from scratch.\">\n  </head>\n  <body></body>\n</html>",
    hints: ["Use name='description'.", "Put it inside &lt;head&gt;."],
    testCases: [
      { description: "Contains meta description", pattern: "<meta[^>]*name=[\"']description[\"']" },
      { description: "Content is the right text", expectText: "Learn HTML from scratch." }
    ],
    points: 10, order: 17
  },
  {
    title: "Create a Footer",
    slug: "create-footer",
    description: "<p>Create a <code>&lt;footer&gt;</code> element containing a paragraph with '© 2026 My Site'.</p>",
    difficulty: "beginner",
    language: "html",
    topic: "semantic",
    starterHtml: "<body>\n  <!-- Add footer here -->\n</body>",
    solutionHtml: '<body>\n  <footer>\n    <p>© 2026 My Site</p>\n  </footer>\n</body>',
    hints: ["Use the &lt;footer&gt; tag.", "Use &amp;copy; or the © symbol."],
    testCases: [
      { description: "Contains a <footer>", pattern: "<footer" },
      { description: "Contains '© 2026 My Site'", expectText: "2026 My Site" },
      { description: "Has a paragraph inside footer", pattern: "<footer[\\s\\S]*<p" }
    ],
    points: 10, order: 18
  },
  {
    title: "Build a Definition List",
    slug: "build-definition-list",
    description: "<p>Create a <code>&lt;dl&gt;</code> with one term '<strong>HTML</strong>' and its description '<strong>Markup language</strong>'.</p>",
    difficulty: "intermediate",
    language: "html",
    topic: "lists",
    starterHtml: "<body>\n  <!-- Add dl here -->\n</body>",
    solutionHtml: "<body>\n  <dl>\n    <dt>HTML</dt>\n    <dd>Markup language</dd>\n  </dl>\n</body>",
    hints: ["Use &lt;dl&gt; for the list.", "Use &lt;dt&gt; for the term, &lt;dd&gt; for the description."],
    testCases: [
      { description: "Contains a <dl>", pattern: "<dl" },
      { description: "Contains a <dt>", pattern: "<dt" },
      { description: "Contains a <dd>", pattern: "<dd" },
      { description: "Shows 'HTML'", expectText: "HTML" },
      { description: "Shows 'Markup language'", expectText: "Markup language" }
    ],
    points: 15, order: 19
  },
  {
    title: "Full Semantic Page",
    slug: "full-semantic-page",
    description: "<p>Build a full semantic page with <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code>. Put an <code>&lt;h1&gt;</code> inside the header and a paragraph inside the main.</p>",
    difficulty: "advanced",
    language: "html",
    topic: "semantic",
    starterHtml: "<body>\n  <!-- Build the full page here -->\n</body>",
    solutionHtml: "<body>\n  <header>\n    <h1>My Site</h1>\n    <nav>\n      <a href=\"/\">Home</a>\n    </nav>\n  </header>\n  <main>\n    <p>Main content</p>\n  </main>\n  <footer>\n    <p>© 2026</p>\n  </footer>\n</body>",
    hints: ["Use all four semantic elements.", "Header should contain the h1 and nav."],
    testCases: [
      { description: "Contains <header>", pattern: "<header" },
      { description: "Contains <nav>", pattern: "<nav" },
      { description: "Contains <main>", pattern: "<main" },
      { description: "Contains <footer>", pattern: "<footer" },
      { description: "Header contains an h1", pattern: "<header[\\s\\S]*<h1" },
      { description: "Main contains a paragraph", pattern: "<main[\\s\\S]*<p" }
    ],
    points: 25, order: 20
  },

  // ============ CSS (21-30) ============
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
    points: 10, order: 21
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
    points: 15, order: 22
  },
  {
    title: "Bold Text",
    slug: "bold-text",
    description: "<p>Make all <code>&lt;strong&gt;</code> elements use <code>font-weight: 700</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "typography",
    starterHtml: "<body>\n  <strong>Bold</strong>\n</body>",
    starterCss: "",
    solutionCss: "strong {\n  font-weight: 700;\n}\n",
    hints: ["Target the strong tag.", "Set font-weight: 700."],
    testCases: [
      { description: "Targets strong", pattern: "strong\\s*\\{" },
      { description: "Sets font-weight", pattern: "font-weight\\s*:\\s*700" }
    ],
    points: 10, order: 23
  },
  {
    title: "Remove Bullets",
    slug: "remove-bullets",
    description: "<p>Remove the default bullets from an unordered list using CSS.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "lists",
    starterHtml: "<body>\n  <ul><li>Item</li></ul>\n</body>",
    starterCss: "",
    solutionCss: "ul {\n  list-style-type: none;\n}\n",
    hints: ["Target ul.", "Use list-style-type: none."],
    testCases: [
      { description: "Targets ul", pattern: "ul\\s*\\{" },
      { description: "Removes list-style", pattern: "list-style(-type)?\\s*:\\s*none" }
    ],
    points: 10, order: 24
  },
  {
    title: "Add Padding",
    slug: "add-padding",
    description: "<p>Add <code>20px</code> padding to the <code>&lt;body&gt;</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "box-model",
    starterHtml: "<body>\n  <p>Padding test</p>\n</body>",
    starterCss: "",
    solutionCss: "body {\n  padding: 20px;\n}\n",
    hints: ["Target body.", "Use padding: 20px;"],
    testCases: [
      { description: "Targets body", pattern: "body\\s*\\{" },
      { description: "Sets padding to 20px", pattern: "padding\\s*:\\s*20px" }
    ],
    points: 10, order: 25
  },
  {
    title: "Change Background",
    slug: "change-background",
    description: "<p>Set the background color of the page to <strong>#f0f0f0</strong>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "colors",
    starterHtml: "<body>\n  <p>Background test</p>\n</body>",
    starterCss: "",
    solutionCss: "body {\n  background-color: #f0f0f0;\n}\n",
    hints: ["Target body.", "Use background-color."],
    testCases: [
      { description: "Sets background color", pattern: "background(-color)?\\s*:\\s*#f0f0f0" }
    ],
    points: 10, order: 26
  },
  {
    title: "Rounded Corners",
    slug: "rounded-corners",
    description: "<p>Give the <code>.card</code> div a border radius of <code>8px</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "border",
    starterHtml: '<body>\n  <div class="card">Card</div>\n</body>',
    starterCss: "",
    solutionCss: ".card {\n  border-radius: 8px;\n}\n",
    hints: ["Target .card.", "Use border-radius."],
    testCases: [
      { description: "Targets .card", pattern: "\\.card\\s*\\{" },
      { description: "Sets border-radius", pattern: "border-radius\\s*:\\s*8px" }
    ],
    points: 10, order: 27
  },
  {
    title: "Hover Effect",
    slug: "hover-effect",
    description: "<p>Change the background color of a <code>.btn</code> to <strong>red</strong> on hover.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "pseudo",
    starterHtml: '<body>\n  <button class="btn">Hover</button>\n</body>',
    starterCss: "",
    solutionCss: ".btn:hover {\n  background-color: red;\n}\n",
    hints: ["Use the :hover pseudo-class.", "Target .btn:hover."],
    testCases: [
      { description: "Uses :hover", pattern: ":hover" },
      { description: "Sets background to red", pattern: "background(-color)?\\s*:\\s*red" }
    ],
    points: 15, order: 28
  },
  {
    title: "Text Alignment",
    slug: "text-alignment",
    description: "<p>Center align the text inside <code>.title</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "typography",
    starterHtml: '<body>\n  <h1 class="title">Center</h1>\n</body>',
    starterCss: "",
    solutionCss: ".title {\n  text-align: center;\n}\n",
    hints: ["Target .title.", "Use text-align: center."],
    testCases: [
      { description: "Targets .title", pattern: "\\.title\\s*\\{" },
      { description: "Sets text-align: center", pattern: "text-align\\s*:\\s*center" }
    ],
    points: 10, order: 29
  },
  {
    title: "Grid Layout",
    slug: "grid-layout",
    description: "<p>Make <code>.container</code> a grid with 2 equal columns using CSS Grid.</p>",
    difficulty: "advanced",
    language: "css",
    topic: "grid",
    starterHtml: '<body>\n  <div class="container">\n    <div>A</div>\n    <div>B</div>\n  </div>\n</body>',
    starterCss: "",
    solutionCss: ".container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n",
    hints: ["Use display: grid.", "Use grid-template-columns: 1fr 1fr."],
    testCases: [
      { description: "Uses display: grid", pattern: "display\\s*:\\s*grid" },
      { description: "Defines 2 columns", pattern: "grid-template-columns\\s*:\\s*1fr\\s+1fr" }
    ],
    points: 20, order: 30
  },

  // ============ JavaScript (31-50) ============
  {
    title: "Say Hello",
    slug: "say-hello",
    description: "<p>Write a function <code>hello()</code> that returns the string <code>\"Hello, World!\"</code>.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "functions",
    starterJs: "function hello() {\n  // your code here\n}\n",
    solutionJs: "function hello() {\n  return \"Hello, World!\";\n}\n",
    hints: ["Use return."],
    testCases: [
      { description: "hello() returns 'Hello, World!'", callFn: "hello", input: [], expected: "Hello, World!" }
    ],
    points: 10, order: 31
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
    hints: ["Add the arguments."],
    testCases: [
      { description: "sum(1, 2) === 3", callFn: "sum", input: [1, 2], expected: 3 },
      { description: "sum(10, -5) === 5", callFn: "sum", input: [10, -5], expected: 5 }
    ],
    points: 10, order: 32
  },
  {
    title: "Reverse a String",
    slug: "reverse-a-string",
    description: "<p>Write <code>reverseString(s)</code> that returns the string reversed.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function reverseString(s) {\n  // your code here\n}\n",
    solutionJs: 'function reverseString(s) {\n  return s.split("").reverse().join("");\n}\n',
    hints: ["split('') → reverse() → join('')."],
    testCases: [
      { description: "reverseString('abc') === 'cba'", callFn: "reverseString", input: ["abc"], expected: "cba" },
      { description: "reverseString('') === ''", callFn: "reverseString", input: [""], expected: "" }
    ],
    points: 15, order: 33
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
    hints: ["Use the modulo operator %."],
    testCases: [
      { description: "evenOrOdd(2) === 'even'", callFn: "evenOrOdd", input: [2], expected: "even" },
      { description: "evenOrOdd(3) === 'odd'", callFn: "evenOrOdd", input: [3], expected: "odd" }
    ],
    points: 10, order: 34
  },
  {
    title: "FizzBuzz (Short)",
    slug: "fizzbuzz-short",
    description: "<p>Write <code>fizzBuzz(n)</code> that returns \"FizzBuzz\", \"Fizz\", \"Buzz\", or the number as a string.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "conditionals",
    starterJs: "function fizzBuzz(n) {\n  // your code here\n}\n",
    solutionJs: `function fizzBuzz(n) {\n  if (n % 15 === 0) return "FizzBuzz";\n  if (n % 3 === 0) return "Fizz";\n  if (n % 5 === 0) return "Buzz";\n  return String(n);\n}\n`,
    hints: ["Check 15 first."],
    testCases: [
      { description: "fizzBuzz(15)", callFn: "fizzBuzz", input: [15], expected: "FizzBuzz" },
      { description: "fizzBuzz(3)", callFn: "fizzBuzz", input: [3], expected: "Fizz" },
      { description: "fizzBuzz(7)", callFn: "fizzBuzz", input: [7], expected: "7" }
    ],
    points: 20, order: 35
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
    hints: ["Use .reduce()."],
    testCases: [
      { description: "sumArray([1,2,3]) === 6", callFn: "sumArray", input: [[1, 2, 3]], expected: 6 },
      { description: "sumArray([]) === 0", callFn: "sumArray", input: [[]], expected: 0 }
    ],
    points: 15, order: 36
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
    hints: ["Use Math.max and the spread operator."],
    testCases: [
      { description: "max([1,5,3]) === 5", callFn: "max", input: [[1, 5, 3]], expected: 5 }
    ],
    points: 15, order: 37
  },
  {
    title: "Count Vowels",
    slug: "count-vowels",
    description: "<p>Write <code>countVowels(s)</code> that counts vowels (a,e,i,o,u) in a string.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function countVowels(s) {\n  // your code here\n}\n",
    solutionJs: `function countVowels(s) {\n  const m = s.toLowerCase().match(/[aeiou]/g);\n  return m ? m.length : 0;\n}\n`,
    hints: ["Use a regex /[aeiou]/g."],
    testCases: [
      { description: "countVowels('hello') === 2", callFn: "countVowels", input: ["hello"], expected: 2 },
      { description: "countVowels('xyz') === 0", callFn: "countVowels", input: ["xyz"], expected: 0 }
    ],
    points: 20, order: 38
  },
  {
    title: "Palindrome Check",
    slug: "palindrome-check",
    description: "<p>Write <code>isPalindrome(s)</code> that returns true if the string is a palindrome (case-insensitive).</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function isPalindrome(s) {\n  // your code here\n}\n",
    solutionJs: `function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}\n`,
    hints: ["Normalize, reverse, compare."],
    testCases: [
      { description: "isPalindrome('racecar')", callFn: "isPalindrome", input: ["racecar"], expected: true },
      { description: "isPalindrome('hello')", callFn: "isPalindrome", input: ["hello"], expected: false }
    ],
    points: 20, order: 39
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
    hints: ["Use .flat()."],
    testCases: [
      { description: "flatten([1,[2,3]]) === [1,2,3]", callFn: "flatten", input: [[1, [2, 3]]], expected: [1, 2, 3], compare: "deepEqual" }
    ],
    points: 20, order: 40
  },
  {
    title: "Debounce Function",
    slug: "debounce-function",
    description: "<p>Write <code>debounce(fn, delay)</code> that returns a function which delays calling fn.</p>",
    difficulty: "advanced",
    language: "javascript",
    topic: "functions",
    starterJs: "function debounce(fn, delay) {\n  // your code here\n}\n",
    solutionJs: `function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n`,
    hints: ["Use clearTimeout and setTimeout in a closure."],
    testCases: [
      { description: "Returns a function", callFn: "debounce", input: [function () {}, 100], expected: "function" }
    ],
    points: 30, order: 41
  },
  {
    title: "Multiply",
    slug: "multiply",
    description: "<p>Write a function <code>multiply(a, b)</code> that returns the product.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "functions",
    starterJs: "function multiply(a, b) {\n  // your code here\n}\n",
    solutionJs: "function multiply(a, b) {\n  return a * b;\n}\n",
    hints: ["Use the * operator."],
    testCases: [
      { description: "multiply(2, 3) === 6", callFn: "multiply", input: [2, 3], expected: 6 }
    ],
    points: 10, order: 42
  },
  {
    title: "Convert to Uppercase",
    slug: "convert-to-uppercase",
    description: "<p>Write <code>toUpperCase(s)</code> that returns the string in uppercase.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "strings",
    starterJs: "function toUpperCase(s) {\n  // your code here\n}\n",
    solutionJs: "function toUpperCase(s) {\n  return s.toUpperCase();\n}\n",
    hints: ["Use .toUpperCase()."],
    testCases: [
      { description: "toUpperCase('hello') === 'HELLO'", callFn: "toUpperCase", input: ["hello"], expected: "HELLO" }
    ],
    points: 10, order: 43
  },
  {
    title: "Get First Element",
    slug: "get-first-element",
    description: "<p>Write <code>first(arr)</code> that returns the first element of an array.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function first(arr) {\n  // your code here\n}\n",
    solutionJs: "function first(arr) {\n  return arr[0];\n}\n",
    hints: ["Use arr[0]."],
    testCases: [
      { description: "first([10, 20]) === 10", callFn: "first", input: [[10, 20]], expected: 10 }
    ],
    points: 10, order: 44
  },
  {
    title: "Get Last Element",
    slug: "get-last-element",
    description: "<p>Write <code>last(arr)</code> that returns the last element of an array.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function last(arr) {\n  // your code here\n}\n",
    solutionJs: "function last(arr) {\n  return arr[arr.length - 1];\n}\n",
    hints: ["Use arr[arr.length - 1]."],
    testCases: [
      { description: "last([10, 20]) === 20", callFn: "last", input: [[10, 20]], expected: 20 }
    ],
    points: 10, order: 45
  },
  {
    title: "Check if Array Contains",
    slug: "array-contains",
    description: "<p>Write <code>contains(arr, item)</code> that returns true if the array contains the item.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function contains(arr, item) {\n  // your code here\n}\n",
    solutionJs: "function contains(arr, item) {\n  return arr.includes(item);\n}\n",
    hints: ["Use .includes()."],
    testCases: [
      { description: "contains([1,2,3], 2) === true", callFn: "contains", input: [[1, 2, 3], 2], expected: true }
    ],
    points: 10, order: 46
  },
  {
    title: "Remove Duplicates",
    slug: "remove-duplicates",
    description: "<p>Write <code>unique(arr)</code> that removes duplicates from an array.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "arrays",
    starterJs: "function unique(arr) {\n  // your code here\n}\n",
    solutionJs: "function unique(arr) {\n  return [...new Set(arr)];\n}\n",
    hints: ["Use a Set and the spread operator."],
    testCases: [
      { description: "unique([1,1,2]) === [1,2]", callFn: "unique", input: [[1, 1, 2]], expected: [1, 2], compare: "deepEqual" }
    ],
    points: 20, order: 47
  },
  {
    title: "Sort Numbers",
    slug: "sort-numbers",
    description: "<p>Write <code>sortAsc(arr)</code> that returns the array sorted ascending.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "arrays",
    starterJs: "function sortAsc(arr) {\n  // your code here\n}\n",
    solutionJs: "function sortAsc(arr) {\n  return [...arr].sort((a, b) => a - b);\n}\n",
    hints: ["Use .sort((a, b) => a - b)."],
    testCases: [
      { description: "sortAsc([3,1,2]) === [1,2,3]", callFn: "sortAsc", input: [[3, 1, 2]], expected: [1, 2, 3], compare: "deepEqual" }
    ],
    points: 15, order: 48
  },
  {
    title: "Capitalize First Letter",
    slug: "capitalize-first",
    description: "<p>Write <code>capitalize(s)</code> that capitalizes the first letter.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "strings",
    starterJs: "function capitalize(s) {\n  // your code here\n}\n",
    solutionJs: "function capitalize(s) {\n  return s.charAt(0).toUpperCase() + s.slice(1);\n}\n",
    hints: ["Use .charAt(0) and .slice(1)."],
    testCases: [
      { description: "capitalize('hello') === 'Hello'", callFn: "capitalize", input: ["hello"], expected: "Hello" }
    ],
    points: 10, order: 49
  },
  {
    title: "Square a Number",
    slug: "square-a-number",
    description: "<p>Write <code>square(n)</code> that returns the number squared.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "math",
    starterJs: "function square(n) {\n  // your code here\n}\n",
    solutionJs: "function square(n) {\n  return n * n;\n}\n",
    hints: ["Multiply n by itself."],
    testCases: [
      { description: "square(5) === 25", callFn: "square", input: [5], expected: 25 }
    ],
    points: 10, order: 50
  },

  // ============ Node.js (51-55) ============
  {
    title: "Node: Read a File",
    slug: "node-read-a-file",
    description: "<p><strong>Simulated.</strong> Use <code>fs.readFile</code> to read <code>data.txt</code> and log it.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("fs");\n\n// your code here\n',
    solutionJs: `const fs = require("fs");\n\nfs.readFile("data.txt", "utf8", (err, data) => {\n  if (err) return console.error(err);\n  console.log(data);\n});\n`,
    hints: ["Use fs.readFile with a callback."],
    testCases: [
      { description: "Uses fs.readFile", pattern: "fs\\.readFile" },
      { description: "Reads data.txt", expectText: "data.txt" }
    ],
    points: 15, order: 51
  },
  {
    title: "Node: Write to a File",
    slug: "node-write-a-file",
    description: "<p><strong>Simulated.</strong> Use <code>fs.writeFile</code> to write 'Hello' to <code>output.txt</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "filesystem",
    starterJs: 'const fs = require("fs");\n\n// your code here\n',
    solutionJs: `const fs = require("fs");\n\nfs.writeFile("output.txt", "Hello", (err) => {\n  if (err) console.error(err);\n});\n`,
    hints: ["Use fs.writeFile(filename, data, callback)."],
    testCases: [
      { description: "Uses fs.writeFile", pattern: "fs\\.writeFile" },
      { description: "Writes to output.txt", expectText: "output.txt" }
    ],
    points: 15, order: 52
  },
  {
    title: "Node: HTTP Server",
    slug: "node-http-server",
    description: "<p><strong>Simulated.</strong> Create an HTTP server that responds with 'Hello' on any request.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "http",
    starterJs: 'const http = require("http");\n\n// your code here\n',
    solutionJs: `const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.end("Hello");\n});\nserver.listen(3000);\n`,
    hints: ["Use http.createServer().", "Call res.end() with the response."],
    testCases: [
      { description: "Uses http.createServer", pattern: "http\\.createServer" },
      { description: "Responds with 'Hello'", expectText: "Hello" }
    ],
    points: 20, order: 53
  },
  {
    title: "Node: Read JSON",
    slug: "node-read-json",
    description: "<p><strong>Simulated.</strong> Read <code>config.json</code>, parse it, and log the <code>name</code> field.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "json",
    starterJs: 'const fs = require("fs");\n\n// your code here\n',
    solutionJs: `const fs = require("fs");\n\nfs.readFile("config.json", "utf8", (err, data) => {\n  if (err) return console.error(err);\n  const cfg = JSON.parse(data);\n  console.log(cfg.name);\n});\n`,
    hints: ["Use JSON.parse() on the file contents."],
    testCases: [
      { description: "Reads config.json", expectText: "config.json" },
      { description: "Parses JSON", pattern: "JSON\\.parse" }
    ],
    points: 20, order: 54
  },
  {
    title: "Node: Environment Variables",
    slug: "node-env-vars",
    description: "<p><strong>Simulated.</strong> Log the value of <code>process.env.PORT</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "env",
    starterJs: "// your code here\n",
    solutionJs: "console.log(process.env.PORT);\n",
    hints: ["Access env vars via process.env."],
    testCases: [
      { description: "Uses process.env.PORT", expectText: "process.env.PORT" }
    ],
    points: 10, order: 55
  },

  // ============ Express (56-60) ============
  {
    title: "Express: GET Route",
    slug: "express-get-route",
    description: "<p><strong>Simulated.</strong> Write an Express GET route on <code>/hello</code> that returns <code>\"Hello\"</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your route here\n',
    solutionJs: `const express = require("express");\nconst app = express();\n\napp.get("/hello", (req, res) => {\n  res.send("Hello");\n});\n`,
    hints: ["Use app.get."],
    testCases: [
      { description: "Uses app.get", pattern: "app\\.get" },
      { description: "Route is /hello", expectText: "/hello" },
      { description: "Sends 'Hello'", expectText: "Hello" }
    ],
    points: 15, order: 56
  },
  {
    title: "Express: POST Route",
    slug: "express-post-route",
    description: "<p><strong>Simulated.</strong> Create a POST route on <code>/submit</code> that sends 'Received'.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your route here\n',
    solutionJs: `const express = require("express");\nconst app = express();\n\napp.post("/submit", (req, res) => {\n  res.send("Received");\n});\n`,
    hints: ["Use app.post."],
    testCases: [
      { description: "Uses app.post", pattern: "app\\.post" },
      { description: "Route is /submit", expectText: "/submit" }
    ],
    points: 15, order: 57
  },
  {
    title: "Express: JSON Response",
    slug: "express-json-response",
    description: "<p><strong>Simulated.</strong> Send a JSON response <code>{ ok: true }</code> on <code>GET /status</code>.</p>",
    difficulty: "beginner",
    language: "express",
    topic: "responses",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your route here\n',
    solutionJs: `const express = require("express");\nconst app = express();\n\napp.get("/status", (req, res) => {\n  res.json({ ok: true });\n});\n`,
    hints: ["Use res.json()."],
    testCases: [
      { description: "Uses res.json", pattern: "res\\.json" },
      { description: "Returns ok: true", expectText: "ok" }
    ],
    points: 15, order: 58
  },
  {
    title: "Express: Route Parameter",
    slug: "express-route-param",
    description: "<p><strong>Simulated.</strong> Create a route <code>GET /users/:id</code> that sends the ID back.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "routing",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your route here\n',
    solutionJs: `const express = require("express");\nconst app = express();\n\napp.get("/users/:id", (req, res) => {\n  res.send(req.params.id);\n});\n`,
    hints: ["Access params with req.params."],
    testCases: [
      { description: "Uses :id param", expectText: ":id" },
      { description: "Accesses req.params", pattern: "req\\.params" }
    ],
    points: 20, order: 59
  },
  {
    title: "Express: Middleware",
    slug: "express-middleware",
    description: "<p><strong>Simulated.</strong> Add middleware that logs 'Request received' before routes.</p>",
    difficulty: "intermediate",
    language: "express",
    topic: "middleware",
    starterJs: 'const express = require("express");\nconst app = express();\n\n// your middleware here\n',
    solutionJs: `const express = require("express");\nconst app = express();\n\napp.use((req, res, next) => {\n  console.log("Request received");\n  next();\n});\n`,
    hints: ["Use app.use with (req, res, next)."],
    testCases: [
      { description: "Uses app.use", pattern: "app\\.use" },
      { description: "Logs the message", expectText: "Request received" },
      { description: "Calls next()", pattern: "next\\(\\)" }
    ],
    points: 25, order: 60
  },

  // ============ Debugging (61-65) ============
  {
    title: "Fix: Off-by-One",
    slug: "fix-off-by-one",
    description: "<p>This function <code>firstN(arr, n)</code> should return the first n items. Fix the bug.</p><pre><code>function firstN(arr, n) {\n  return arr.slice(0, n - 1);\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function firstN(arr, n) {\n  return arr.slice(0, n - 1);\n}\n",
    solutionJs: "function firstN(arr, n) {\n  return arr.slice(0, n);\n}\n",
    hints: ["Look at the second argument of slice."],
    testCases: [
      { description: "firstN([1,2,3,4], 2) === [1,2]", callFn: "firstN", input: [[1, 2, 3, 4], 2], expected: [1, 2], compare: "deepEqual" }
    ],
    points: 15, order: 61
  },
  {
    title: "Fix: Missing Return",
    slug: "fix-missing-return",
    description: "<p>This function should double a number but returns undefined. Fix the bug.</p><pre><code>function double(n) {\n  const r = n * 2;\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function double(n) {\n  const r = n * 2;\n}\n",
    solutionJs: "function double(n) {\n  return n * 2;\n}\n",
    hints: ["Add a return statement."],
    testCases: [
      { description: "double(5) === 10", callFn: "double", input: [5], expected: 10 }
    ],
    points: 10, order: 62
  },
  {
    title: "Fix: Missing Parentheses",
    slug: "fix-missing-parentheses",
    description: "<p>This conditional has a bug. Fix it so it returns 'yes' if x is 5, else 'no'.</p><pre><code>function check(x) {\n  if (x = 5) return 'yes';\n  return 'no';\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function check(x) {\n  if (x = 5) return 'yes';\n  return 'no';\n}\n",
    solutionJs: "function check(x) {\n  if (x === 5) return 'yes';\n  return 'no';\n}\n",
    hints: ["Use strict equality ===, not =."],
    testCases: [
      { description: "check(5) === 'yes'", callFn: "check", input: [5], expected: "yes" },
      { description: "check(3) === 'no'", callFn: "check", input: [3], expected: "no" }
    ],
    points: 15, order: 63
  },
  {
    title: "Fix: Wrong Loop",
    slug: "fix-wrong-loop",
    description: "<p>This loop should sum 1 to n. Fix the bug.</p><pre><code>function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i < n; i++) sum += i;\n  return sum;\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i < n; i++) sum += i;\n  return sum;\n}\n",
    solutionJs: "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) sum += i;\n  return sum;\n}\n",
    hints: ["The loop should use <="],
    testCases: [
      { description: "sumTo(5) === 15", callFn: "sumTo", input: [5], expected: 15 }
    ],
    points: 15, order: 64
  },
  {
    title: "Fix: Reversed Arguments",
    slug: "fix-reversed-arguments",
    description: "<p>This function subtracts a from b, but it's reversed. Fix it.</p><pre><code>function subtract(a, b) {\n  return b - a;\n}</code></pre>",
    difficulty: "beginner",
    language: "javascript",
    topic: "debugging",
    starterJs: "function subtract(a, b) {\n  return b - a;\n}\n",
    solutionJs: "function subtract(a, b) {\n  return a - b;\n}\n",
    hints: ["Should return a - b."],
    testCases: [
      { description: "subtract(10, 5) === 5", callFn: "subtract", input: [10, 5], expected: 5 }
    ],
    points: 10, order: 65
  },

  // ============ Algorithms (66-70) ============
  {
    title: "Factorial",
    slug: "factorial",
    description: "<p>Write <code>factorial(n)</code> that returns n!.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "math",
    starterJs: "function factorial(n) {\n  // your code here\n}\n",
    solutionJs: "function factorial(n) {\n  let r = 1;\n  for (let i = 2; i <= n; i++) r *= i;\n  return r;\n}\n",
    hints: ["Multiply 1 × 2 × ... × n."],
    testCases: [
      { description: "factorial(5) === 120", callFn: "factorial", input: [5], expected: 120 },
      { description: "factorial(0) === 1", callFn: "factorial", input: [0], expected: 1 }
    ],
    points: 20, order: 66
  },
  {
    title: "Fibonacci",
    slug: "fibonacci",
    description: "<p>Write <code>fib(n)</code> that returns the nth Fibonacci number.</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "math",
    starterJs: "function fib(n) {\n  // your code here\n}\n",
    solutionJs: "function fib(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    const tmp = a + b;\n    a = b; b = tmp;\n  }\n  return b;\n}\n",
    hints: ["Use an iterative loop, not recursion."],
    testCases: [
      { description: "fib(0) === 0", callFn: "fib", input: [0], expected: 0 },
      { description: "fib(10) === 55", callFn: "fib", input: [10], expected: 55 }
    ],
    points: 25, order: 67
  },
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "<p>Write <code>twoSum(nums, target)</code> that returns indices of the two numbers that add up to target.</p>",
    difficulty: "advanced",
    language: "javascript",
    topic: "algorithms",
    starterJs: "function twoSum(nums, target) {\n  // your code here\n}\n",
    solutionJs: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (need in map) return [map[need], i];\n    map[nums[i]] = i;\n  }\n  return [];\n}\n`,
    hints: ["Use a hashmap for O(n) lookup."],
    testCases: [
      { description: "twoSum([2,7,11,15], 9) === [0,1]", callFn: "twoSum", input: [[2, 7, 11, 15], 9], expected: [0, 1], compare: "deepEqual" }
    ],
    points: 30, order: 68
  },
  {
    title: "Count Occurrences",
    slug: "count-occurrences",
    description: "<p>Write <code>count(arr, item)</code> that counts how many times item appears in arr.</p>",
    difficulty: "beginner",
    language: "javascript",
    topic: "arrays",
    starterJs: "function count(arr, item) {\n  // your code here\n}\n",
    solutionJs: "function count(arr, item) {\n  return arr.filter(x => x === item).length;\n}\n",
    hints: ["Use .filter() and .length."],
    testCases: [
      { description: "count([1,2,2,3], 2) === 2", callFn: "count", input: [[1, 2, 2, 3], 2], expected: 2 }
    ],
    points: 15, order: 69
  },
  {
    title: "Anagram Check",
    slug: "anagram-check",
    description: "<p>Write <code>isAnagram(a, b)</code> that returns true if a and b are anagrams (same letters).</p>",
    difficulty: "intermediate",
    language: "javascript",
    topic: "strings",
    starterJs: "function isAnagram(a, b) {\n  // your code here\n}\n",
    solutionJs: `function isAnagram(a, b) {\n  const clean = s => s.toLowerCase().split("").sort().join("");\n  return clean(a) === clean(b);\n}\n`,
    hints: ["Sort both strings and compare."],
    testCases: [
      { description: "isAnagram('listen', 'silent') === true", callFn: "isAnagram", input: ["listen", "silent"], expected: true },
      { description: "isAnagram('hello', 'world') === false", callFn: "isAnagram", input: ["hello", "world"], expected: false }
    ],
    points: 25, order: 70
  }
];

async function seedExercises() {
  let created = 0;
  let updated = 0;

  const allCourses = await Course.find({});
  const courseBySlug = {};
  allCourses.forEach((c) => { courseBySlug[c.slug] = c; });

  const linkMap = {
    "html-fundamentals": [
      "add-a-heading", "create-a-link", "build-unordered-list", "add-an-image",
      "create-a-button", "add-a-paragraph", "create-a-form-with-input",
      "create-an-ordered-list", "semantic-header", "add-a-table",
      "full-page-structure", "build-nav-menu", "create-article-with-header",
      "accessible-form", "table-with-headers", "use-fieldset",
      "add-meta-description", "create-footer", "build-definition-list",
      "full-semantic-page"
    ],
    "css-fundamentals": [
      "color-a-paragraph", "center-a-div", "bold-text", "remove-bullets",
      "add-padding", "change-background", "rounded-corners", "hover-effect",
      "text-alignment", "grid-layout"
    ],
    "javascript-essentials": [
      "say-hello", "sum-two-numbers", "reverse-a-string", "even-or-odd",
      "fizzbuzz-short", "sum-an-array", "find-the-maximum", "count-vowels",
      "palindrome-check", "flatten-an-array", "multiply", "convert-to-uppercase",
      "get-first-element", "get-last-element", "array-contains",
      "remove-duplicates", "sort-numbers", "capitalize-first", "square-a-number"
    ],
    "express-js-fundamentals": [
      "express-get-route", "express-post-route", "express-json-response",
      "express-route-param", "express-middleware"
    ],
    "node-js-runtime": [
      "node-read-a-file", "node-write-a-file", "node-http-server",
      "node-read-json", "node-env-vars"
    ]
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