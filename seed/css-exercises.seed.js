/**
 * Kelvin Ikpeni Code Academy — CSS Fundamentals exercises
 * Targeted seed: adds 15 new CSS-specific exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const cssExercises = [
  {
    title: "CSS: Link External Stylesheet",
    slug: "css-link-stylesheet",
    description: "<p>Add a <code>&lt;link&gt;</code> tag in the head that loads <code>/css/styles.css</code> as a stylesheet.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "basics",
    starterHtml: "<html>\n  <head>\n    <!-- Add the stylesheet link here -->\n  </head>\n  <body></body>\n</html>",
    starterCss: "",
    solutionHtml: '<html>\n  <head>\n    <link rel="stylesheet" href="/css/styles.css">\n  </head>\n  <body></body>\n</html>',
    hints: ["Use &lt;link rel='stylesheet'&gt;.", "Point href to /css/styles.css."],
    testCases: [
      { description: "Contains a <link> tag", pattern: "<link" },
      { description: "rel is stylesheet", pattern: "rel=[\"']stylesheet[\"']" },
      { description: "href is /css/styles.css", pattern: "href=[\"']/css/styles\\.css[\"']" }
    ],
    points: 15,
    order: 75
  },
  {
    title: "CSS: Class Selector",
    slug: "css-class-selector",
    description: "<p>Write a CSS rule for the class <code>.highlight</code> that sets the text colour to red.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "selectors",
    starterHtml: '<body>\n  <p class="highlight">Style me</p>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: ".highlight {\n  color: red;\n}\n",
    hints: ["Classes start with a dot in CSS.", "Use color: red;"],
    testCases: [
      { description: "Targets .highlight", pattern: "\\.highlight\\s*\\{" },
      { description: "Sets color: red", pattern: "color\\s*:\\s*red" }
    ],
    points: 15,
    order: 76
  },
  {
    title: "CSS: ID Selector",
    slug: "css-id-selector",
    description: "<p>Write a CSS rule for the ID <code>#hero</code> that sets the background colour to blue.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "selectors",
    starterHtml: '<body>\n  <div id="hero">Hero</div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: "#hero {\n  background-color: blue;\n}\n",
    hints: ["IDs start with # in CSS.", "Use background-color."],
    testCases: [
      { description: "Targets #hero", pattern: "#hero\\s*\\{" },
      { description: "Sets background to blue", pattern: "background(-color)?\\s*:\\s*blue" }
    ],
    points: 15,
    order: 77
  },
  {
    title: "CSS: Universal Box-Sizing",
    slug: "css-universal-box-sizing",
    description: "<p>Write a rule that applies <code>box-sizing: border-box</code> to all elements (including pseudo-elements).</p>",
    difficulty: "beginner",
    language: "css",
    topic: "box-model",
    starterHtml: "<body>\n  <div>Content</div>\n</body>",
    starterCss: "/* your css */\n",
    solutionCss: "*, *::before, *::after {\n  box-sizing: border-box;\n}\n",
    hints: ["Use the universal selector *.", "Include ::before and ::after."],
    testCases: [
      { description: "Targets * selector", pattern: "\\*[\\s,]" },
      { description: "Includes ::before", pattern: "::before" },
      { description: "Includes ::after", pattern: "::after" },
      { description: "Sets box-sizing: border-box", pattern: "box-sizing\\s*:\\s*border-box" }
    ],
    points: 20,
    order: 78
  },
  {
    title: "CSS: Center with Flexbox",
    slug: "css-center-flexbox",
    description: "<p>Use Flexbox to horizontally and vertically center the <code>.box</code> inside <code>.container</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "flexbox",
    starterHtml: '<body>\n  <div class="container">\n    <div class="box">Centered</div>\n  </div>\n</body>',
    starterCss: ".container {\n  height: 100vh;\n  /* your code */\n}\n",
    solutionCss: ".container {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n",
    hints: ["Use display: flex on .container.", "Combine justify-content and align-items."],
    testCases: [
      { description: "Uses display: flex", pattern: "display\\s*:\\s*flex" },
      { description: "Uses justify-content: center", pattern: "justify-content\\s*:\\s*center" },
      { description: "Uses align-items: center", pattern: "align-items\\s*:\\s*center" }
    ],
    points: 20,
    order: 79
  },
  {
    title: "CSS: Responsive Grid",
    slug: "css-responsive-grid",
    description: "<p>Create a responsive card grid using <code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))</code> and a gap of 1.5rem.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "grid",
    starterHtml: '<body>\n  <div class="cards">\n    <div class="card">A</div>\n    <div class="card">B</div>\n    <div class="card">C</div>\n  </div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n",
    hints: ["Use display: grid.", "Use repeat(auto-fit, minmax(250px, 1fr))."],
    testCases: [
      { description: "Uses display: grid", pattern: "display\\s*:\\s*grid" },
      { description: "Uses repeat(auto-fit, minmax", pattern: "repeat\\(\\s*auto-fit\\s*,\\s*minmax" },
      { description: "Uses gap", pattern: "gap\\s*:\\s*1\\.5rem" }
    ],
    points: 25,
    order: 80
  },
  {
    title: "CSS: Sticky Header",
    slug: "css-sticky-header",
    description: "<p>Make the <code>.header</code> stick to the top when scrolling, using <code>position: sticky</code> and <code>top: 0</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "positioning",
    starterHtml: '<body>\n  <header class="header">Sticky Header</header>\n  <div style="height:2000px;">Scroll me</div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: ".header {\n  position: sticky;\n  top: 0;\n}\n",
    hints: ["Use position: sticky.", "Set top: 0."],
    testCases: [
      { description: "Uses position: sticky", pattern: "position\\s*:\\s*sticky" },
      { description: "Sets top: 0", pattern: "top\\s*:\\s*0" }
    ],
    points: 20,
    order: 81
  },
  {
    title: "CSS: Hover Button",
    slug: "css-hover-button",
    description: "<p>Style <code>.btn</code> with a blue background, then change the background to darker blue on hover with a smooth transition.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "animations",
    starterHtml: '<body>\n  <button class="btn">Hover</button>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: `.btn {
  background: blue;
  transition: background 0.2s ease;
}

.btn:hover {
  background: darkblue;
}`,
    hints: ["Use transition for smoothness.", "Target .btn:hover."],
    testCases: [
      { description: "Sets background blue", pattern: "background(-color)?\\s*:\\s*blue" },
      { description: "Uses transition", pattern: "transition\\s*:" },
      { description: "Uses :hover", pattern: ":hover" },
      { description: "Hover sets darker color", pattern: "background(-color)?\\s*:\\s*darkblue" }
    ],
    points: 20,
    order: 82
  },
  {
    title: "CSS: Gradient Background",
    slug: "css-gradient-background",
    description: "<p>Apply a linear gradient background to <code>.hero</code> going from purple to blue.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "colors",
    starterHtml: '<body>\n  <div class="hero">Hero</div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: ".hero {\n  background: linear-gradient(135deg, purple, blue);\n}\n",
    hints: ["Use linear-gradient().", "Specify direction and two colors."],
    testCases: [
      { description: "Uses linear-gradient", pattern: "linear-gradient\\(" },
      { description: "Contains purple", pattern: "purple" },
      { description: "Contains blue", pattern: "blue" }
    ],
    points: 20,
    order: 83
  },
  {
    title: "CSS: Media Query Breakpoint",
    slug: "css-media-query",
    description: "<p>Write a media query for screens at least 768px wide that sets <code>.container</code> to display: flex.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "responsive",
    starterHtml: '<body>\n  <div class="container">\n    <div>A</div>\n    <div>B</div>\n  </div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: "@media (min-width: 768px) {\n  .container {\n    display: flex;\n  }\n}\n",
    hints: ["Use @media (min-width: 768px).", "Target .container inside."],
    testCases: [
      { description: "Uses @media", pattern: "@media" },
      { description: "min-width 768px", pattern: "min-width\\s*:\\s*768px" },
      { description: "Sets display: flex", pattern: "display\\s*:\\s*flex" }
    ],
    points: 25,
    order: 84
  },
  {
    title: "CSS: Clamp Font Size",
    slug: "css-clamp-font",
    description: "<p>Use <code>clamp()</code> to make <code>h1</code> font-size fluid between 1.5rem and 3rem, with 4vw preferred.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "responsive",
    starterHtml: "<body>\n  <h1>Responsive Heading</h1>\n</body>",
    starterCss: "/* your css */\n",
    solutionCss: "h1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}\n",
    hints: ["Use clamp(min, preferred, max)."],
    testCases: [
      { description: "Targets h1", pattern: "h1\\s*\\{" },
      { description: "Uses clamp()", pattern: "clamp\\(" },
      { description: "Includes 4vw", pattern: "4vw" }
    ],
    points: 20,
    order: 85
  },
  {
    title: "CSS: Card Hover Lift",
    slug: "css-card-hover-lift",
    description: "<p>Make <code>.card</code> lift upward by 4px on hover using <code>transform: translateY(-4px)</code> with a smooth transition.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "animations",
    starterHtml: '<body>\n  <div class="card">Hover me</div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: `.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}`,
    hints: ["Use translateY(-4px).", "Add transition on transform."],
    testCases: [
      { description: "Uses :hover", pattern: ":hover" },
      { description: "Uses translateY(-4px)", pattern: "translateY\\(\\s*-4px\\s*\\)" },
      { description: "Has transition", pattern: "transition\\s*:" }
    ],
    points: 20,
    order: 86
  },
  {
    title: "CSS: Keyframe Animation",
    slug: "css-keyframe-animation",
    description: "<p>Create a <code>@keyframes pulse</code> animation that changes opacity from 1 to 0.5 and back. Apply it to <code>.dot</code> with infinite loop.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "animations",
    starterHtml: '<body>\n  <div class="dot">●</div>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: `@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

.dot {
  animation: pulse 2s infinite;
}`,
    hints: ["Define @keyframes pulse.", "Set 0% and 100% to opacity 1.", "Set 50% to 0.5.", "Apply with animation: pulse 2s infinite."],
    testCases: [
      { description: "Defines @keyframes pulse", pattern: "@keyframes\\s+pulse" },
      { description: "Uses opacity", pattern: "opacity" },
      { description: "Applies animation", pattern: "animation\\s*:\\s*pulse" },
      { description: "Uses infinite", pattern: "infinite" }
    ],
    points: 25,
    order: 87
  },
  {
    title: "CSS: prefers-reduced-motion",
    slug: "css-reduced-motion",
    description: "<p>Add a media query for <code>prefers-reduced-motion: reduce</code> that sets <code>animation-duration: 0.01ms</code> on all elements.</p>",
    difficulty: "intermediate",
    language: "css",
    topic: "animations",
    starterHtml: "<body>\n  <p>Motion-sensitive users matter</p>\n</body>",
    starterCss: "/* your css */\n",
    solutionCss: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
  }
}`,
    hints: ["Use @media (prefers-reduced-motion: reduce).", "Target all elements with *.", "Set animation-duration."],
    testCases: [
      { description: "Uses @media prefers-reduced-motion", pattern: "@media[\\s\\S]*prefers-reduced-motion" },
      { description: "Sets animation-duration", pattern: "animation-duration\\s*:" }
    ],
    points: 25,
    order: 88
  },
  {
    title: "CSS: CSS Variable",
    slug: "css-variable",
    description: "<p>Define a CSS variable <code>--primary: #2563eb</code> on <code>:root</code>, then use it as the background of <code>.btn</code>.</p>",
    difficulty: "beginner",
    language: "css",
    topic: "variables",
    starterHtml: '<body>\n  <button class="btn">Click</button>\n</body>',
    starterCss: "/* your css */\n",
    solutionCss: `:root {
  --primary: #2563eb;
}

.btn {
  background: var(--primary);
}`,
    hints: ["Declare variables in :root.", "Use var(--primary)."],
    testCases: [
      { description: "Declares --primary in :root", pattern: ":root[\\s\\S]*--primary\\s*:" },
      { description: "Uses var(--primary)", pattern: "var\\(\\s*--primary\\s*\\)" },
      { description: "Value is #2563eb", pattern: "#2563eb" }
    ],
    points: 20,
    order: 89
  }
];

async function seedCssExercises() {
  const course = await Course.findOne({ slug: "css-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: css-fundamentals");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of cssExercises) {
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

  console.log(`   CSS exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedCssExercises };