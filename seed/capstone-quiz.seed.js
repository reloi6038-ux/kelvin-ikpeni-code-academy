/**
 * Kelvin Ikpeni Code Academy — Full-Stack Capstone quiz
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const capstoneQuiz = {
  title: "Full-Stack Capstone Final Quiz",
  description: "Test your understanding of the full-stack development workflow: architecture, models, auth, and deployment.",
  passPercent: 70,
  questions: [
    {
      question: "Which of the following is NOT a typical step in project planning?",
      options: ["Define the MVP", "Design the database schemas", "Write all the frontend code before the backend", "Plan the API routes"],
      correctIndex: 2,
      explanation: "Writing all frontend code first often leads to rewrites. It's better to plan models and routes first."
    },
    {
      question: "What is the purpose of a pre-save hook in Mongoose?",
      options: ["To query the database", "To run logic automatically before a document is saved", "To handle errors", "To close the connection"],
      correctIndex: 1,
      explanation: "Pre-save hooks are perfect for hashing passwords, generating slugs, or updating timestamps."
    },
    {
      question: "Why use <code>bcrypt</code> instead of standard hashing for passwords?",
      options: ["It's faster", "It's reversible", "It includes a salt and is deliberately slow to prevent brute-force", "It stores the password in plain text"],
      correctIndex: 2,
      explanation: "bcrypt is slow by design, making brute-force attacks computationally expensive."
    },
    {
      question: "What is the correct way to store passwords in the database?",
      options: ["Plain text", "Encrypted", "Hashed with bcrypt", "Base64 encoded"],
      correctIndex: 2,
      explanation: "Always hash passwords with a secure algorithm like bcrypt."
    },
    {
      question: "Which HTTP status code means 'Unauthorized'?",
      options: ["400", "401", "403", "404"],
      correctIndex: 1,
      explanation: "401 means the user is not authenticated. 403 means authenticated but forbidden."
    },
    {
      question: "Which Express feature lets you store user state across requests?",
      options: ["Sessions", "Body parsers", "Helmet", "CORS"],
      correctIndex: 0,
      explanation: "express-session stores state on the server, linking it to the client via a cookie."
    },
    {
      question: "Where should you put files that the browser can access directly?",
      options: ["models/", "controllers/", "public/", "routes/"],
      correctIndex: 2,
      explanation: "The public folder is served statically by Express and is visible to the client."
    },
    {
      question: "Which package is used to connect Express to MongoDB?",
      options: ["express", "mongodb", "mongoose", "dotenv"],
      correctIndex: 2,
      explanation: "Mongoose is the ODM that provides schemas and models for MongoDB."
    },
    {
      question: "What is the purpose of <code>express.static()</code>?",
      options: ["To connect to a database", "To serve static files like HTML, CSS, and images", "To parse JSON bodies", "To handle routing"],
      correctIndex: 1,
      explanation: "express.static() serves files from a directory over HTTP."
    },
    {
      question: "What is the correct way to prevent a route from being accessed without login?",
      options: ["Use a try/catch block", "Add a middleware function that checks req.session.userId", "Hide the button in the frontend", "Use a different HTTP method"],
      correctIndex: 1,
      explanation: "Server-side middleware is the only reliable way to protect a route."
    },
    {
      question: "Which status code is appropriate after a successful POST that created a resource?",
      options: ["200", "201", "204", "301"],
      correctIndex: 1,
      explanation: "201 Created is the standard response for a successful creation."
    },
    {
      question: "What should you NEVER commit to Git?",
      options: ["index.html", "package.json", ".env", "models/User.js"],
      correctIndex: 2,
      explanation: ".env contains secrets like database URIs and session keys and must be gitignored."
    },
    {
      question: "Why do we use environment variables in production?",
      options: ["To make the code run faster", "To keep secrets out of source code and change configuration per environment", "To shorten the code", "To improve SEO"],
      correctIndex: 1,
      explanation: "Env vars separate code from configuration, which is critical for security and deployment flexibility."
    },
    {
      question: "On Render, what should the 'start command' be for a Node.js app?",
      options: ["nodemon server.js", "npm run dev", "npm start", "node index.html"],
      correctIndex: 2,
      explanation: "Production should use <code>npm start</code> (which runs <code>node server.js</code>), never a dev tool."
    },
    {
      question: "What is the first thing to check if the deployed app crashes on startup?",
      options: ["Delete the database", "Restart the server", "Check the logs for errors and missing environment variables", "Rewrite the code"],
      correctIndex: 2,
      explanation: "The logs tell you exactly what's missing (like MONGO_URI or SESSION_SECRET)."
    }
  ]
};

async function seedCapstoneQuiz() {
  const course = await Course.findOne({ slug: "full-stack-capstone" });
  if (!course) {
    console.warn("⚠  Course not found: full-stack-capstone");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(capstoneQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = { ...capstoneQuiz, slug, course: course._id, published: true };

  let created = 0;
  let updated = 0;

  if (existing) {
    await Quiz.updateOne({ slug }, { $set: payload });
    updated = 1;
  } else {
    await Quiz.create(payload);
    created = 1;
  }

  console.log(`   Capstone quiz: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedCapstoneQuiz };