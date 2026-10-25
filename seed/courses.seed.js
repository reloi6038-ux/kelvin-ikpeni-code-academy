/**
 * Kelvin Ikpeni Code Academy — Course seed
 */
"use strict";

const Course = require("../models/Course");

const courses = [
  // ---------- FRONTEND ----------
  {
    title: "Introduction to Web Development",
    description: "How the web works — clients, servers, HTTP, DNS, and the browser. The mental model every developer needs.",
    summary: "Understand how websites work from first principles.",
    track: "frontend",
    difficulty: "beginner",
    estimatedHours: 3,
    lessonsCount: 6,
    icon: "🌐",
    order: 1,
    outcomes: ["Understand client-server architecture", "Explain how a URL resolves", "Use browser dev tools"]
  },
  {
    title: "HTML Fundamentals",
    description: "Master the building blocks of every website. Semantic markup, accessibility, forms, and document structure.",
    summary: "The building blocks of every website.",
    track: "frontend",
    difficulty: "beginner",
    estimatedHours: 4,
    lessonsCount: 8,
    icon: "📄",
    order: 2,
    outcomes: ["Structure a webpage with semantic HTML5", "Build accessible forms", "Use links, images, lists, tables correctly"]
  },
  {
    title: "CSS Fundamentals",
    description: "Selectors, the box model, flexbox, grid, and responsive layouts. Style websites like a pro.",
    summary: "Style websites with confidence.",
    track: "frontend",
    difficulty: "beginner",
    estimatedHours: 6,
    lessonsCount: 12,
    icon: "🎨",
    order: 3,
    outcomes: ["Master the box model", "Build layouts with flexbox and grid", "Write responsive media queries"]
  },
  {
    title: "JavaScript Essentials",
    description: "Variables, functions, arrays, objects, DOM, and events. The foundation of interactive web apps.",
    summary: "Bring websites to life with interactivity.",
    track: "frontend",
    difficulty: "intermediate",
    estimatedHours: 10,
    lessonsCount: 18,
    icon: "⚡",
    order: 4,
    outcomes: ["Write clean JavaScript functions", "Manipulate the DOM", "Handle user events"]
  },
  {
    title: "ES6+ and Async JavaScript",
    description: "Arrow functions, modules, promises, async/await, and fetch. Modern JavaScript for modern apps.",
    summary: "Modern JavaScript for modern apps.",
    track: "frontend",
    difficulty: "intermediate",
    estimatedHours: 6,
    lessonsCount: 10,
    icon: "🚀",
    order: 5,
    outcomes: ["Use destructuring and spread", "Write async/await code", "Fetch data from APIs"]
  },

  // ---------- BACKEND ----------
  {
    title: "Node.js Runtime",
    description: "Modules, npm, package.json, the file system, and events. Learn the JavaScript backend runtime.",
    summary: "The JavaScript backend runtime.",
    track: "backend",
    difficulty: "beginner",
    estimatedHours: 5,
    lessonsCount: 10,
    icon: "🟢",
    order: 1,
    outcomes: ["Understand the Node.js event loop", "Use npm and package.json", "Work with the file system"]
  },
  {
    title: "Express.js Fundamentals",
    description: "Routing, middleware, REST API design, error handling. Build robust APIs with Express.js.",
    summary: "Build robust APIs with Express.js.",
    track: "backend",
    difficulty: "intermediate",
    estimatedHours: 8,
    lessonsCount: 12,
    icon: "🚂",
    order: 2,
    outcomes: ["Build Express routes", "Write custom middleware", "Design REST APIs"]
  },
  {
    title: "MongoDB & Mongoose",
    description: "Schemas, models, CRUD, indexes, relationships, validation. Store and query data with MongoDB.",
    summary: "Store and query data with MongoDB.",
    track: "backend",
    difficulty: "intermediate",
    estimatedHours: 8,
    lessonsCount: 12,
    icon: "🍃",
    order: 3,
    outcomes: ["Design Mongoose schemas", "Perform CRUD operations", "Query with filters and indexes"]
  },
  {
    title: "Authentication & Security",
    description: "Password hashing, sessions, CSRF, rate limiting, OWASP. Build secure auth systems.",
    summary: "Build secure auth systems.",
    track: "backend",
    difficulty: "advanced",
    estimatedHours: 8,
    lessonsCount: 10,
    icon: "🔒",
    order: 4,
    outcomes: ["Hash passwords with bcrypt", "Manage sessions securely", "Defend against OWASP risks"]
  },
  {
    title: "Deploying to Render",
    description: "Production config, env vars, logs, health checks, CI/CD. Deploy your Node.js app to the cloud.",
    summary: "Deploy your Node.js app to the cloud.",
    track: "backend",
    difficulty: "advanced",
    estimatedHours: 4,
    lessonsCount: 6,
    icon: "☁️",
    order: 5,
    outcomes: ["Configure env vars", "Read logs", "Run health checks"]
  }
];

async function seedCourses(adminUserId) {
  let created = 0;
  let updated = 0;

  for (const c of courses) {
    const slug = Course.slugify(c.title);
    const existing = await Course.findOne({ slug });

    if (existing) {
      await Course.updateOne({ slug }, { $set: { ...c, slug, createdBy: adminUserId } });
      updated++;
    } else {
      await Course.create({ ...c, slug, createdBy: adminUserId });
      created++;
    }
  }

  console.log(`   Courses:  ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedCourses };