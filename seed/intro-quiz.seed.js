/**
 * Kelvin Ikpeni Code Academy — Introduction to Web Development quiz
 * Targeted seed: creates/replaces ONLY the intro course quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const introQuiz = {
  title: "Introduction to Web Development Final Quiz",
  description: "Test your understanding of how the web works — clients, servers, HTTP, DNS, browsers, and deployment. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What are the three main layers of a modern web application?",
      options: [
        "HTML, CSS, and JavaScript",
        "Frontend, backend, and database",
        "Client, server, and CDN",
        "DNS, HTTP, and TCP"
      ],
      correctIndex: 1,
      explanation: "Every web app has a frontend (browser), a backend (server), and a database (storage). They communicate through HTTP."
    },
    {
      question: "Which HTTP method is designed to retrieve data without modifying it?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctIndex: 0,
      explanation: "GET is the only method that never modifies data — it only retrieves. POST creates, PUT replaces, DELETE removes."
    },
    {
      question: "Which HTTP method is NOT idempotent?",
      options: ["GET", "PUT", "DELETE", "POST"],
      correctIndex: 3,
      explanation: "POST is not idempotent — sending it twice creates two records. GET, PUT, and DELETE are idempotent."
    },
    {
      question: "Which status code indicates the request was successful?",
      options: ["200", "301", "404", "500"],
      correctIndex: 0,
      explanation: "200 OK means success. 3xx are redirects, 4xx are client errors, 5xx are server errors."
    },
    {
      question: "A request to a missing resource returns which status code?",
      options: ["201", "302", "404", "500"],
      correctIndex: 2,
      explanation: "404 Not Found means the server could not locate the requested resource."
    },
    {
      question: "Which status code indicates a server-side error?",
      options: ["200", "400", "401", "500"],
      correctIndex: 3,
      explanation: "500 Internal Server Error means the server crashed or failed during processing. 4xx are client errors."
    },
    {
      question: "What is DNS?",
      options: [
        "A CSS framework",
        "The Domain Name System that translates names to IP addresses",
        "A database protocol",
        "A JavaScript bundler"
      ],
      correctIndex: 1,
      explanation: "DNS is the phonebook of the internet. It maps names like 'example.com' to IP addresses."
    },
    {
      question: "Which record type maps a domain name to an IPv4 address?",
      options: ["CNAME", "MX", "A record", "TXT"],
      correctIndex: 2,
      explanation: "An A record maps a hostname to an IPv4 address. AAAA records map to IPv6."
    },
    {
      question: "What does 'localhost' mean in a URL?",
      options: [
        "A public internet domain",
        "The user's own machine (loopback interface)",
        "The server's database",
        "A cached CDN node"
      ],
      correctIndex: 1,
      explanation: "localhost resolves to 127.0.0.1 — the machine itself. Servers running on localhost are only accessible locally."
    },
    {
      question: "When you run a Node.js server on 'localhost:3000', what does '3000' represent?",
      options: ["The process ID", "The port number", "The HTTP version", "The thread count"],
      correctIndex: 1,
      explanation: "3000 is the port number. Servers listen on specific ports so the OS can route incoming connections."
    },
    {
      question: "What is the primary difference between HTTP and HTTPS?",
      options: [
        "HTTPS is faster",
        "HTTPS uses TLS to encrypt traffic",
        "HTTP supports POST; HTTPS does not",
        "HTTPS is only for mobile"
      ],
      correctIndex: 1,
      explanation: "HTTPS is HTTP over TLS. All traffic is encrypted, protecting against eavesdropping and tampering."
    },
    {
      question: "In the browser rendering pipeline, what does the DOM represent?",
      options: [
        "The CSS rules applied to the page",
        "A tree of nodes parsed from the HTML",
        "The JavaScript event loop",
        "A network request log"
      ],
      correctIndex: 1,
      explanation: "The DOM is the Document Object Model — a tree of nodes the browser builds by parsing HTML. JavaScript can read and modify it."
    },
    {
      question: "Which side is responsible for hashing passwords?",
      options: [
        "The frontend (browser)",
        "The backend (server)",
        "The CSS parser",
        "The DNS resolver"
      ],
      correctIndex: 1,
      explanation: "Password hashing happens on the backend. The browser never sees or stores the hash — that would expose it to XSS attacks."
    },
    {
      question: "In the full flow of a login request, which step comes FIRST?",
      options: [
        "The backend queries the database",
        "The browser sends a POST request",
        "The user submits the form",
        "The backend returns a session cookie"
      ],
      correctIndex: 2,
      explanation: "The user action comes first. Then the browser validates, sends the request, the backend processes it, and the response returns."
    },
    {
      question: "What is the difference between local development and production?",
      options: [
        "Production uses more CSS",
        "Production runs on a publicly accessible server with real secrets, HTTPS, and real users",
        "Local development does not need HTML",
        "Production does not use JavaScript"
      ],
      correctIndex: 1,
      explanation: "Production means real users, real data, real secrets stored securely, HTTPS enforced, and monitoring in place. Local is for development on your machine."
    }
  ]
};

async function seedIntroQuiz() {
  const course = await Course.findOne({ slug: "introduction-to-web-development" });
  if (!course) {
    console.warn("⚠  Course not found: introduction-to-web-development");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(introQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...introQuiz,
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

  console.log(`   Intro quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedIntroQuiz };