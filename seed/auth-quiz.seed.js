/**
 * Kelvin Ikpeni Code Academy — Authentication & Security quiz
 * Targeted seed: replaces ONLY the authentication-security quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const authQuiz = {
  title: "Authentication & Security Final Quiz",
  description: "Test your understanding of authentication and security — hashing, sessions, JWT, RBAC, CSRF, rate limiting, XSS, and OWASP Top 10. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What is the difference between authentication and authorization?",
      options: [
        "They are the same thing",
        "Authentication verifies identity; authorization verifies permissions",
        "Authorization comes first, then authentication",
        "Only authorization applies to APIs"
      ],
      correctIndex: 1,
      explanation: "Authentication answers 'Who are you?' (login). Authorization answers 'What can you do?' (roles/permissions). AuthN comes before AuthZ."
    },
    {
      question: "Why should passwords NEVER be stored in plaintext?",
      options: [
        "It makes the database larger",
        "If the database is breached, attackers get all user passwords directly",
        "It slows down login",
        "Browsers cannot send plaintext"
      ],
      correctIndex: 1,
      explanation: "A single breach exposes every user's password. Since users reuse passwords, that compounds the damage. Always hash passwords with bcrypt/Argon2."
    },
    {
      question: "Which hashing algorithm is appropriate for passwords?",
      options: ["MD5", "SHA-256", "bcrypt", "CRC32"],
      correctIndex: 2,
      explanation: "bcrypt (along with Argon2 and scrypt) is designed for passwords — deliberately slow and salted. MD5, SHA-256, and CRC32 are fast hashes, unsuitable for passwords."
    },
    {
      question: "What is a salt in the context of password hashing?",
      options: [
        "A secret key used for encryption",
        "Random data added to a password before hashing so identical passwords produce different hashes",
        "A type of user role",
        "A HTTP header"
      ],
      correctIndex: 1,
      explanation: "A salt prevents attackers from using precomputed rainbow tables. Two users with the same password get different hashes because each salt is different."
    },
    {
      question: "Why should login errors use a generic message like 'Invalid credentials'?",
      options: [
        "It looks more professional",
        "It prevents attackers from discovering which emails exist (account enumeration)",
        "It is faster to type",
        "Browsers require it"
      ],
      correctIndex: 1,
      explanation: "Specific errors like 'User not found' vs 'Wrong password' let attackers enumerate valid accounts. The same message for both cases avoids leaking that info."
    },
    {
      question: "What must the server do to prevent session fixation attacks?",
      options: [
        "Store sessions in memory only",
        "Regenerate the session ID after login",
        "Use JWT instead of sessions",
        "Disable cookies"
      ],
      correctIndex: 1,
      explanation: "Session fixation: an attacker sets a session ID before login, then hijacks the authenticated session. Regenerating the session ID on login invalidates any ID they knew."
    },
    {
      question: "Which cookie flag prevents JavaScript from accessing the cookie?",
      options: ["Secure", "HttpOnly", "SameSite", "Path"],
      correctIndex: 1,
      explanation: "HttpOnly cookies can't be read by JavaScript, protecting the session ID from XSS theft. Secure restricts transmission to HTTPS. SameSite controls cross-site sending."
    },
    {
      question: "What does `sameSite: 'lax'` on a session cookie do?",
      options: [
        "Blocks the cookie on all cross-site requests",
        "Allows the cookie on top-level GET navigations but not on cross-site POST/PUT/DELETE",
        "Expires the cookie immediately",
        "Makes the cookie readable by JavaScript"
      ],
      correctIndex: 1,
      explanation: "SameSite=lax is the modern default. It sends the cookie on same-site requests and top-level GETs (like clicking a link), but not on cross-site state-changing requests. This blocks most CSRF."
    },
    {
      question: "What does a JWT contain?",
      options: [
        "Encrypted user data",
        "Three base64-encoded parts: header, payload, signature",
        "A server-side session ID",
        "Only a user ID"
      ],
      correctIndex: 1,
      explanation: "A JWT is `header.payload.signature`. The header describes the algorithm, the payload holds claims (userId, role, expiry), and the signature ensures it hasn't been tampered with. The payload is readable by anyone — never store secrets there."
    },
    {
      question: "What is the primary reason to use `jwt.verify()` instead of `jwt.decode()`?",
      options: [
        "It's faster",
        "It validates the signature, ensuring the token hasn't been tampered with",
        "It reads the payload",
        "It expires the token"
      ],
      correctIndex: 1,
      explanation: "jwt.decode() just parses the token — anyone can forge a token if you trust the decoded payload without verifying the signature. Always use jwt.verify() with the secret."
    },
    {
      question: "What is the correct HTTP status for 'logged in but not authorized'?",
      options: ["200", "400", "401", "403"],
      correctIndex: 3,
      explanation: "401 Unauthorized means 'not authenticated'. 403 Forbidden means 'authenticated but not permitted'. Use 403 when a logged-in student tries to access admin-only routes."
    },
    {
      question: "What is CSRF and how do you prevent it?",
      options: [
        "A server attack; block all external IPs",
        "Tricking a logged-in user's browser into making a request; prevent with SameSite cookies, CSRF tokens, and origin checks",
        "An encryption flaw; use HTTPS",
        "A JavaScript bug; use TypeScript"
      ],
      correctIndex: 1,
      explanation: "CSRF exploits the browser's automatic cookie sending. An attacker's site can trigger authenticated requests. SameSite cookies, CSRF tokens, and origin verification block this."
    },
    {
      question: "Which code correctly prevents XSS when inserting user input?",
      options: [
        "el.innerHTML = userInput",
        "el.textContent = userInput",
        "document.write(userInput)",
        "eval(userInput)"
      ],
      correctIndex: 1,
      explanation: "textContent treats input as plain text — no HTML parsing, no script execution. innerHTML and document.write would execute any injected scripts. Never use eval on user input."
    },
    {
      question: "What is 'mass assignment' and how do you prevent it?",
      options: [
        "Assigning too many roles; prevent with enums",
        "Passing req.body directly to Model.create(), letting users set unintended fields; fix by whitelisting allowed fields",
        "Sending too many requests; prevent with rate limiting",
        "A database schema bug"
      ],
      correctIndex: 1,
      explanation: "If you do `User.create(req.body)`, an attacker could send `{ name, email, role: 'admin' }` and grant themselves admin. Always whitelist exactly which fields you accept."
    },
    {
      question: "Which of these is a top item in the OWASP Top 10?",
      options: [
        "Broken Access Control",
        "Using the wrong color scheme",
        "Missing <h1> tags",
        "Slow page load"
      ],
      correctIndex: 0,
      explanation: "OWASP Top 10 (2021) #1 is Broken Access Control — authorization flaws that let users access data or actions they shouldn't. Other items include Injection, Cryptographic Failures, and Security Misconfiguration."
    }
  ]
};

async function seedAuthQuiz() {
  const course = await Course.findOne({ slug: "authentication-security" });
  if (!course) {
    console.warn("⚠  Course not found: authentication-security");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(authQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...authQuiz,
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

  console.log(`   Auth quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedAuthQuiz };