/**
 * Kelvin Ikpeni Code Academy — Deploying to Render quiz
 * Targeted seed: replaces ONLY the deploying-to-render quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const deployQuiz = {
  title: "Deploying to Render Final Quiz",
  description: "Test your understanding of deployment — production config, env vars, MongoDB Atlas, health checks, logs, CI/CD, HTTPS, and maintenance. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What does cloud deployment mean?",
      options: [
        "Saving files to a cloud drive",
        "Running your app on a remote server that anyone on the internet can reach",
        "Building a mobile app",
        "Storing data in a browser",
      ],
      correctIndex: 1,
      explanation: "Cloud deployment moves your app from localhost to a publicly accessible server. Render handles servers, TLS, and networking for you."
    },
    {
      question: "Which command should your production 'start' script run?",
      options: [
        "nodemon server.js",
        "node server.js",
        "node --watch server.js",
        "npm run dev",
      ],
      correctIndex: 1,
      explanation: "Production must use `node server.js`, never nodemon or watchers. Dev tools add overhead, ignore restart logic, and can hide errors."
    },
    {
      question: "Why does package.json include the `engines.node` field?",
      options: [
        "It locks the app to a specific CPU",
        "It tells deployment platforms (like Render) which Node version to use",
        "It enables TypeScript",
        "It installs Node.js",
      ],
      correctIndex: 1,
      explanation: "Render reads `engines.node` to pick the correct Node runtime. Without it, Render may default to an incompatible version."
    },
    {
      question: "Which port should your app listen on in production?",
      options: [
        "Always 3000",
        "Always 80",
        "process.env.PORT with a fallback",
        "A random port each time",
      ],
      correctIndex: 2,
      explanation: "Render assigns a dynamic port via the PORT env var. Hardcoding 3000 will fail — the platform cannot reach your app."
    },
    {
      question: "What interface should the server bind to in production?",
      options: [
        "localhost",
        "127.0.0.1",
        "0.0.0.0 (all interfaces)",
        "The server's public IP",
      ],
      correctIndex: 2,
      explanation: "Bind to 0.0.0.0 so the platform's load balancer can reach the app. Binding to localhost makes it unreachable from outside."
    },
    {
      question: "Which file should NEVER be committed to Git?",
      options: ["package.json", ".env", ".env.example", "README.md"],
      correctIndex: 1,
      explanation: ".env contains real secrets (DB URI, session keys). Committing it exposes credentials publicly. Add it to .gitignore, and use .env.example for documentation."
    },
    {
      question: "Where do production environment variables live on Render?",
      options: [
        "In .env committed to Git",
        "In the Render dashboard's Environment tab",
        "In the code as constants",
        "In a JSON file served to the browser",
      ],
      correctIndex: 1,
      explanation: "Render injects env vars set in the dashboard at runtime. They never live in source code, keeping secrets safe even if the repo is public."
    },
    {
      question: "Which string is the correct MongoDB Atlas URI structure?",
      options: [
        "mongodb://localhost/kica",
        "mongodb+srv://user:pass@cluster.mongodb.net/database?retryWrites=true&w=majority",
        "https://mongo.example.com/kica",
        "mongodb+kica://cluster/database",
      ],
      correctIndex: 1,
      explanation: "Atlas uses mongodb+srv:// for auto-discovery. The format is user:pass@cluster.mongodb.net/database?options."
    },
    {
      question: "What should a health endpoint return when the database is down?",
      options: [
        "200 with { status: 'ok' }",
        "503 with { status: 'degraded' }",
        "500 with a stack trace",
        "Nothing — close the connection",
      ],
      correctIndex: 1,
      explanation: "Return 503 when the DB is unreachable — platforms and monitoring tools use this to detect unhealthy instances. Never return 200 when a critical dependency is down."
    },
    {
      question: "Why should health endpoints NEVER include MONGODB_URI or SESSION_SECRET?",
      options: [
        "It breaks the endpoint",
        "Health endpoints are often public — exposing secrets is a critical leak",
        "It slows down the request",
        "It's not allowed by Express",
      ],
      correctIndex: 1,
      explanation: "Health checks are typically reachable from the internet. Returning secrets there is catastrophic. Only report booleans and non-sensitive status."
    },
    {
      question: "Which command prevents the app from crashing when MONGODB_URI is missing?",
      options: [
        "Ignore it — the app will run fine",
        "Check process.env.MONGODB_URI and call process.exit(1) with a clear error message",
        "Use a default fallback URI",
        "Catch the error silently",
      ],
      correctIndex: 1,
      explanation: "Fail fast: if a required env var is missing, log a clear message and exit(1). Silent failures and default fallbacks hide misconfiguration."
    },
    {
      question: "Where can you find build and runtime errors on Render?",
      options: [
        "In the browser console",
        "In the Logs tab of the service dashboard",
        "In the MongoDB Atlas dashboard",
        "In the GitHub commit page",
      ],
      correctIndex: 1,
      explanation: "Render's Logs tab shows both build (npm install) and runtime (app output) logs. Critical for diagnosing deploy failures."
    },
    {
      question: "What does Render auto-deploy do when you push to the tracked branch?",
      options: [
        "Sends you an email",
        "Rebuilds and redeploys the service automatically",
        "Only runs tests",
        "Archives the old deploy",
      ],
      correctIndex: 1,
      explanation: "Auto-deploy is continuous deployment: every push to the tracked branch triggers a fresh build and deploy. Combine with CI tests and branch protection to prevent broken deploys."
    },
    {
      question: "Why should you set `trust proxy` in Express on Render?",
      options: [
        "To enable HTTPS",
        "So Express sees the real client IP behind the load balancer",
        "To compress responses",
        "To enable caching",
      ],
      correctIndex: 1,
      explanation: "Render sits behind a proxy. Without `trust proxy`, Express reads the proxy's IP for every request — breaking rate limiting and IP-based logic."
    },
    {
      question: "What should you do when a deploy breaks production?",
      options: [
        "Wait for it to fix itself",
        "Redeploy the last successful commit, then fix locally and push a proper fix",
        "Delete the repo",
        "Restart MongoDB",
      ],
      correctIndex: 1,
      explanation: "Rollback first (redeploy the previous working commit) to restore service. Then debug locally, commit the fix, and redeploy safely."
    }
  ]
};

async function seedDeployQuiz() {
  const course = await Course.findOne({ slug: "deploying-to-render" });
  if (!course) {
    console.warn("⚠  Course not found: deploying-to-render");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(deployQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...deployQuiz,
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

  console.log(`   Deploy quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedDeployQuiz };