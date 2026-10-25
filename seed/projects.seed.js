/**
 * Kelvin Ikpeni Code Academy — Project seed
 */
"use strict";

const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");

// Each project: { project: {...}, tasks: [...] }
const projectsData = [
  // =========================================================
  // 1. Personal Portfolio Website
  // =========================================================
  {
    project: {
      title: "Personal Portfolio Website",
      description: "Build and deploy a responsive personal portfolio site that showcases your work. HTML, CSS, and vanilla JavaScript.",
      difficulty: "beginner",
      track: "frontend",
      icon: "🎨",
      estimatedHours: 4,
      objectives: [
        "Structure a page with semantic HTML",
        "Style with modern CSS",
        "Add interactive JS (mobile menu, form validation)",
        "Deploy to Render"
      ],
      order: 1
    },
    tasks: [
      {
        title: "Set up the HTML skeleton",
        description:
          "<p>Every portfolio starts with a clean HTML skeleton. In this task, you'll create the basic structure: a <code>&lt;header&gt;</code> with navigation, a <code>&lt;main&gt;</code> for content, and a <code>&lt;footer&gt;</code>.</p><p><strong>Requirements:</strong></p><ul><li>Use <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code></li><li>Inside <code>&lt;nav&gt;</code>, add 3 links: Home, About, Contact</li><li>Inside <code>&lt;main&gt;</code>, add an <code>&lt;h1&gt;</code> with your name</li></ul>",
        learningObjectives: ["Use semantic HTML5 elements", "Structure a page correctly"],
        starterHtml:
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
</head>
<body>
  <!-- Add your header, main, footer here -->
</body>
</html>`,
        starterCss: "",
        starterJs: "",
        hints: [
          "Start with <header> followed by <main> and <footer>.",
          "Use <nav> inside <header> for the links.",
          "The <h1> should be inside <main>."
        ],
        estimatedMinutes: 15
      },
      {
        title: "Style the header and nav",
        description:
          "<p>Now make the header look professional. Create a dark header with horizontal navigation links and a hover effect.</p><p><strong>Requirements:</strong></p><ul><li>Header with dark background</li><li>Nav links displayed horizontally</li><li>Hover effect changes link color</li></ul>",
        learningObjectives: ["Write CSS for layout", "Use flexbox for horizontal nav"],
        starterHtml: "", // continues from previous
        starterCss:
`/* Start your CSS here */
header {
  /* Add background, padding */
}

nav a {
  /* Make links look nice */
}`,
        starterJs: "",
        hints: [
          "Use display: flex on nav.",
          "Add padding to nav a for clickable areas.",
          "Use :hover selector for hover effect."
        ],
        estimatedMinutes: 20
      },
      {
        title: "Add a hero section",
        description:
          "<p>Create a visually striking hero section under the header with your name, a tagline, and a call-to-action button.</p><p><strong>Requirements:</strong></p><ul><li>A <code>&lt;section class=\"hero\"&gt;</code> after the header</li><li>Centered <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code></li><li>A prominent button linking to <code>#contact</code></li></ul>",
        learningObjectives: ["Build a hero section", "Center content with flexbox"],
        starterHtml: "",
        starterCss: "",
        starterJs: "",
        hints: [
          "Use min-height: 60vh for a full-screen feel.",
          "display: flex; flex-direction: column; align-items: center; justify-content: center."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Make it responsive",
        description:
          "<p>Test your site at mobile widths. Add a media query that stacks the nav links vertically below 600px.</p>",
        learningObjectives: ["Write responsive CSS", "Use media queries"],
        starterHtml: "",
        starterCss:
`/* Add your media query here */
@media (max-width: 600px) {
  /* ... */
}`,
        starterJs: "",
        hints: [
          "Change flex-direction to column on nav.",
          "Adjust padding for smaller screens."
        ],
        estimatedMinutes: 15
      }
    ]
  },

  // =========================================================
  // 2. Interactive JavaScript App (To-Do)
  // =========================================================
  {
    project: {
      title: "Interactive JavaScript App",
      description: "Build a fully interactive to-do app with DOM manipulation, events, and localStorage persistence.",
      difficulty: "intermediate",
      track: "frontend",
      icon: "⚡",
      estimatedHours: 5,
      objectives: [
        "Manipulate the DOM",
        "Handle user events",
        "Persist data with localStorage"
      ],
      order: 2
    },
    tasks: [
      {
        title: "Build the UI shell",
        description:
          "<p>Create the to-do app UI: an input field, an Add button, and an empty <code>&lt;ul&gt;</code> for tasks.</p>",
        learningObjectives: ["Create form UI", "Reference elements by ID"],
        starterHtml:
`<!DOCTYPE html>
<html>
<head><title>To-Do</title></head>
<body>
  <div class="app">
    <h1>My Tasks</h1>
    <input id="taskInput" placeholder="New task">
    <button id="addBtn">Add</button>
    <ul id="taskList"></ul>
  </div>
</body>
</html>`,
        starterCss:
`body { font-family: sans-serif; padding: 2rem; }
.app { max-width: 400px; margin: auto; }`,
        starterJs: "// your JS here",
        hints: ["Give each element a unique id.", "Use a <ul> for the task list."],
        estimatedMinutes: 10
      },
      {
        title: "Add tasks via JavaScript",
        description:
          "<p>When the Add button is clicked, read the input value, create a new <code>&lt;li&gt;</code>, and append it to the list.</p>",
        learningObjectives: ["Read input values", "Create and append DOM elements"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

btn.addEventListener("click", () => {
  // Create a new <li> with the input value
});`,
        hints: [
          "Use document.createElement('li').",
          "Set li.textContent = input.value.",
          "Append with list.appendChild(li).",
          "Don't forget to clear the input."
        ],
        estimatedMinutes: 20
      },
      {
        title: "Mark tasks as done",
        description:
          "<p>Click a task to toggle a 'done' class that strikes it through.</p>",
        learningObjectives: ["Delegate events", "Toggle classes"],
        starterHtml: "",
        starterCss:
`.done { text-decoration: line-through; opacity: 0.6; cursor: pointer; }`,
        starterJs: "// Add click handling for tasks",
        hints: [
          "Add a click listener to the <ul> and check e.target.tagName === 'LI'.",
          "Or add a listener to each <li> when created."
        ],
        estimatedMinutes: 15
      },
      {
        title: "Persist tasks in localStorage",
        description:
          "<p>Save tasks to <code>localStorage</code> on every change, and reload them on page load.</p>",
        learningObjectives: ["Use localStorage", "Serialize arrays"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`// Load saved tasks on page load
// Save on every change
// Hint: JSON.stringify and JSON.parse`,
        hints: [
          "localStorage.setItem('tasks', JSON.stringify(tasks)).",
          "const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')."
        ],
        estimatedMinutes: 25
      }
    ]
  },

  // =========================================================
  // 3. Auth System
  // =========================================================
  {
    project: {
      title: "Authentication System",
      description: "Design the frontend for a complete auth system: registration, login, session state, and protected content.",
      difficulty: "intermediate",
      track: "fullstack",
      icon: "🔒",
      estimatedHours: 6,
      objectives: [
        "Design accessible auth forms",
        "Validate inputs on the client",
        "Show / hide UI based on login state"
      ],
      order: 3
    },
    tasks: [
      {
        title: "Build the registration form",
        description:
          "<p>Create a registration form with name, email, password, and confirm password. Include inline error messages.</p>",
        learningObjectives: ["Build accessible forms", "Add inline errors"],
        starterHtml:
`<form id="registerForm">
  <h2>Create Account</h2>
  <label for="name">Name</label>
  <input id="name" name="name" required>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <label for="pw">Password</label>
  <input id="pw" name="pw" type="password" required minlength="8">
  <label for="pw2">Confirm</label>
  <input id="pw2" name="pw2" type="password" required>
  <button type="submit">Register</button>
</form>`,
        starterCss: "",
        starterJs: "",
        hints: ["Use type='email' for free validation.", "Add minlength='8' on password."],
        estimatedMinutes: 20
      },
      {
        title: "Validate with JavaScript",
        description:
          "<p>Add JS that prevents submission if passwords don't match or fields are empty. Show error messages below each field.</p>",
        learningObjectives: ["Validate on submit", "Show errors per field"],
        starterHtml: "",
        starterCss: ".error { color: red; font-size: 0.8rem; }",
        starterJs:
`document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // validate fields
});`,
        hints: [
          "Compare pw.value and pw2.value.",
          "Insert a <span class='error'> after invalid fields.",
          "Use input.focus() on the first invalid field."
        ],
        estimatedMinutes: 25
      },
      {
        title: "Login form and UI state",
        description:
          "<p>Build a login form and toggle the visible form based on whether a fake `loggedIn` flag is true.</p>",
        learningObjectives: ["Toggle UI based on state", "Handle multiple forms"],
        starterHtml: "",
        starterCss: "",
        starterJs:
`let loggedIn = false;
// Show/hide login vs dashboard based on loggedIn
function render() {
  // ...
}`,
        hints: [
          "Store the flag in localStorage to persist.",
          "Use display: none / block to toggle sections."
        ],
        estimatedMinutes: 25
      }
    ]
  },

  // =========================================================
  // 4-7. Coming soon
  // =========================================================
  {
    project: {
      title: "REST API for a To-Do App",
      description: "Build a production-ready REST API with Node.js, Express, MongoDB, and automated tests.",
      difficulty: "intermediate",
      track: "backend",
      icon: "🔌",
      estimatedHours: 8,
      objectives: ["Express routing", "MongoDB CRUD", "Deploy to Render"],
      order: 4,
      comingSoon: true
    },
    tasks: []
  },
  {
    project: {
      title: "Full-Stack Blog",
      description: "Build a complete blog with auth, CRUD posts, search, and pagination.",
      difficulty: "advanced",
      track: "fullstack",
      icon: "📝",
      estimatedHours: 12,
      objectives: ["Full auth flow", "CRUD posts", "Search + pagination"],
      order: 5,
      comingSoon: true
    },
    tasks: []
  },
  {
    project: {
      title: "Learning Management Dashboard",
      description: "Build a dashboard to track student enrolments, progress, and certificates.",
      difficulty: "advanced",
      track: "fullstack",
      icon: "📊",
      estimatedHours: 14,
      objectives: ["Dashboards", "Charts", "Role-based views"],
      order: 6,
      comingSoon: true
    },
    tasks: []
  },
  {
    project: {
      title: "Kelvin Ikpeni Code Academy Capstone",
      description: "Rebuild and extend the entire academy platform end-to-end.",
      difficulty: "capstone",
      track: "capstone",
      icon: "🏆",
      estimatedHours: 20,
      objectives: ["Full-stack integration", "Production deployment"],
      order: 7,
      comingSoon: true
    },
    tasks: []
  }
];

async function seedProjects() {
  let created = 0;
  let updated = 0;
  let tasksCreated = 0;
  let tasksUpdated = 0;

  for (const entry of projectsData) {
    const p = entry.project;
    const slug = Project.slugify(p.title);
    const existing = await Project.findOne({ slug });
    const payload = { ...p, slug };

    let projectDoc;
    if (existing) {
      await Project.updateOne({ slug }, { $set: payload });
      projectDoc = existing;
      updated++;
    } else {
      projectDoc = await Project.create(payload);
      created++;
    }

    // Seed tasks
    for (let i = 0; i < entry.tasks.length; i++) {
      const t = entry.tasks[i];
      const taskSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const taskExisting = await ProjectTask.findOne({ project: projectDoc._id, slug: taskSlug });

      if (taskExisting) {
        await ProjectTask.updateOne(
          { _id: taskExisting._id },
          { $set: { ...t, slug: taskSlug, order: i, project: projectDoc._id } }
        );
        tasksUpdated++;
      } else {
        await ProjectTask.create({ ...t, slug: taskSlug, order: i, project: projectDoc._id });
        tasksCreated++;
      }
    }
  }

  console.log(`   Projects: ${created} created, ${updated} updated`);
  console.log(`   Tasks:    ${tasksCreated} created, ${tasksUpdated} updated`);
}

module.exports = { seedProjects };