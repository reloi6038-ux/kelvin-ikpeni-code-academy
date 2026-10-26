/**
 * Kelvin Ikpeni Code Academy — CSS Fundamentals quiz
 * Targeted seed: replaces ONLY the css-fundamentals quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const cssQuiz = {
  title: "CSS Fundamentals Final Quiz",
  description: "Test your understanding of CSS — selectors, specificity, the box model, colours, layout, Flexbox, Grid, responsive design, and animations. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "Which of these is the recommended way to add CSS to a webpage?",
      options: [
        "Inline style attribute",
        "Internal <style> tag",
        "External stylesheet linked with <link>",
        "JavaScript injection"
      ],
      correctIndex: 2,
      explanation: "External stylesheets are cached, reusable across pages, and keep HTML clean. Inline and internal styles should be avoided for anything beyond quick prototypes."
    },
    {
      question: "What does the selector `p` target?",
      options: [
        "Any element with class 'p'",
        "The element with ID 'p'",
        "All <p> elements on the page",
        "Only the first <p> element"
      ],
      correctIndex: 2,
      explanation: "A bare element name is an element selector that matches all instances. Classes start with `.`, IDs with `#`."
    },
    {
      question: "Given `p { color: blue; }` and `.highlight { color: green; }` applied to `<p class='highlight'>`, which color wins?",
      options: [
        "Blue (element selector is more specific)",
        "Green (class selector is more specific)",
        "Neither — it becomes transparent",
        "The one defined first"
      ],
      correctIndex: 1,
      explanation: "Classes have specificity 0-1-0, elements have 0-0-1. Class wins because it's more specific."
    },
    {
      question: "Which specificity value wins? ID, class, or element?",
      options: [
        "Element beats class beats ID",
        "Class beats ID beats element",
        "ID beats class beats element",
        "All selectors have equal weight"
      ],
      correctIndex: 2,
      explanation: "ID = 100 points, class = 10 points, element = 1 point. Higher wins."
    },
    {
      question: "What is the default value of `box-sizing`?",
      options: [
        "border-box",
        "content-box",
        "padding-box",
        "margin-box"
      ],
      correctIndex: 1,
      explanation: "The default is content-box, meaning width/height apply only to the content area — padding and border are added outside. Most projects switch to border-box for predictability."
    },
    {
      question: "If an element has `box-sizing: border-box`, `width: 200px`, `padding: 20px`, `border: 2px`, what is the total rendered width?",
      options: ["200px", "240px", "244px", "164px"],
      correctIndex: 0,
      explanation: "With border-box, the total width is exactly 200px — padding and border are included inside. With content-box, it would be 200 + 40 + 4 = 244px."
    },
    {
      question: "Which CSS unit is relative to the root font size?",
      options: ["px", "em", "rem", "%"],
      correctIndex: 2,
      explanation: "rem = root em. 1rem equals the root (html) font size. em is relative to the parent font size."
    },
    {
      question: "What does `display: flex` do to a container?",
      options: [
        "Hides it from view",
        "Turns it into a flex container, arranging its direct children along one axis",
        "Makes it a grid layout",
        "Removes it from the document flow"
      ],
      correctIndex: 1,
      explanation: "display: flex activates Flexbox, letting you align and distribute children along the main axis (row or column)."
    },
    {
      question: "Which property aligns flex items along the MAIN axis?",
      options: [
        "align-items",
        "justify-content",
        "flex-direction",
        "align-self"
      ],
      correctIndex: 1,
      explanation: "justify-content aligns along the main axis (horizontal if flex-direction is row). align-items aligns along the cross axis."
    },
    {
      question: "What does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` do?",
      options: [
        "Creates exactly 3 columns",
        "Creates a responsive grid where columns are at least 250px wide, growing to fill available space",
        "Sets the gap between columns to 250px",
        "Centers the grid"
      ],
      correctIndex: 1,
      explanation: "auto-fit collapses empty tracks, minmax(250px, 1fr) sets each column to be at least 250px but at most 1fr. The result: responsive columns that wrap automatically."
    },
    {
      question: "What is the difference between `auto-fit` and `auto-fill` in CSS Grid?",
      options: [
        "They are identical",
        "auto-fit collapses empty tracks and stretches items; auto-fill keeps empty tracks",
        "auto-fill stretches items; auto-fit keeps empty tracks",
        "auto-fit only works with flexbox"
      ],
      correctIndex: 1,
      explanation: "auto-fit collapses empty tracks so cards grow to fill the row. auto-fill keeps empty tracks so cards stay at their defined size."
    },
    {
      question: "Which media query targets screens 768px wide or wider?",
      options: [
        "@media (max-width: 768px)",
        "@media (min-width: 768px)",
        "@media (width: 768px)",
        "@media (device-width: 768px)"
      ],
      correctIndex: 1,
      explanation: "min-width matches screens AT LEAST that wide — the foundation of mobile-first design."
    },
    {
      question: "What is the recommended approach for responsive design?",
      options: [
        "Start with desktop styles then override for mobile",
        "Start with mobile styles then enhance for larger screens (mobile-first)",
        "Use a separate CSS file for each device",
        "Use JavaScript to detect screen size"
      ],
      correctIndex: 1,
      explanation: "Mobile-first is the industry standard. Start with the simplest layout, use min-width media queries to add complexity as the screen grows."
    },
    {
      question: "Which CSS properties should you animate for best performance?",
      options: [
        "width and height",
        "margin and padding",
        "transform and opacity",
        "top and left"
      ],
      correctIndex: 2,
      explanation: "transform and opacity are GPU-accelerated and don't trigger layout recalculation. Animating layout properties like width or top causes jank."
    },
    {
      question: "Why should you include a `prefers-reduced-motion` media query?",
      options: [
        "It makes animations faster",
        "It's required by CSS specification",
        "It respects users who experience motion sickness by disabling animations",
        "It improves page load speed"
      ],
      correctIndex: 2,
      explanation: "Some users experience vertigo, nausea, or seizures from motion. The media query lets you disable animations for those who've asked their OS for reduced motion — an accessibility requirement."
    }
  ]
};

async function seedCssQuiz() {
  const course = await Course.findOne({ slug: "css-fundamentals" });
  if (!course) {
    console.warn("⚠  Course not found: css-fundamentals");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(cssQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...cssQuiz,
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

  console.log(`   CSS quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedCssQuiz };