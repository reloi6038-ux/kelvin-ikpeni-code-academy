# Kelvin Ikpeni Code Academy

**Learn to Code. Build to Lead.**

A full-stack coding education platform built with HTML5, CSS3, vanilla JavaScript, Node.js, Express.js, MongoDB, and Mongoose.

## Live URL

**https://kelvin-ikpeni-code-academy.onrender.com**

## Features

- **10 full courses** with 99 lessons covering Frontend and Backend development.
- **202 auto-graded coding exercises** across HTML, CSS, JavaScript, Node.js, Express, MongoDB, Auth, and Deployment.
- **10 final quizzes** with 150 total questions and instant feedback.
- **7 guided projects** with 33 tasks that walk you through building real applications.
- **In-browser IDE** with syntax highlighting, live preview, and console output.
- **PDF certificates** with gold seal, unique IDs, and public verification.
- **Role-based admin dashboard** with 7 management tabs.
- **Contact form** with admin inbox and Gmail notifications.
- **Session-based authentication** with bcrypt password hashing.
- **Responsive dark UI** with "Midnight Academy" theme.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS, CodeMirror, Prism.js |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | express-session + connect-mongo + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| PDF | pdfkit |
| Deployment | Render |

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env
# Then fill in your MongoDB URI, session secret, and Gmail credentials.

# Seed the database
npm run seed

# Run in development
npm run dev