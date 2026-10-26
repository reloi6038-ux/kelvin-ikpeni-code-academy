"use strict";

require("dotenv").config();

const { connectDB, disconnectDB } = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Exercise = require("../models/Exercise");
const Quiz = require("../models/Quiz");
const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");

// Main seeders
const { seedCourses } = require("./courses.seed");
const { seedLessons } = require("./lessons.seed");
const { seedExercises } = require("./exercises.seed");
const { seedQuizzes } = require("./quizzes.seed");
const { seedProjects } = require("./projects.seed");

// Targeted seeders (per-course)
const { seedIntroLessons } = require("./intro-lessons.seed");
const { seedIntroExercises } = require("./intro-exercises.seed");
const { seedIntroQuiz } = require("./intro-quiz.seed");
const { seedNodeLessons } = require("./nodejs-lessons.seed");
const { seedNodeExercises } = require("./nodejs-exercises.seed");
const { seedNodeQuiz } = require("./nodejs-quiz.seed");
const { seedExpressLessons } = require("./express-lessons.seed");
const { seedExpressExercises } = require("./express-exercises.seed");
const { seedExpressQuiz } = require("./express-quiz.seed");
const { seedCssLessons } = require("./css-lessons.seed");
const { seedCssExercises } = require("./css-exercises.seed");
const { seedCssQuiz } = require("./css-quiz.seed");
const { seedJsLessons } = require("./js-lessons.seed");
const { seedJsExercises } = require("./js-exercises.seed");
const { seedJsQuiz } = require("./js-quiz.seed");

async function upsertUser({ name, email, password, role }) {
  if (!email || !password || !name) throw new Error(`Missing seed values for role=${role}`);
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    if (existing.role !== role) {
      existing.role = role;
      await existing.save();
      console.log(`🔁 Updated role for ${email} → ${role}`);
    } else {
      console.log(`✔  ${role} already exists: ${email}`);
    }
    return existing;
  }
  const user = new User({ name, email: email.toLowerCase(), passwordHash: password, role });
  await user.save();
  console.log(`✅ Created ${role}: ${email}`);
  return user;
}

async function main() {
  console.log("\n🌱 Seeding Kelvin Ikpeni Code Academy database...\n");
  await connectDB();

  const admin = await upsertUser({
    name: process.env.ADMIN_NAME || "Kelvin Ikpeni",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin"
  });

  await upsertUser({
    name: process.env.STUDENT_NAME || "Demo Student",
    email: process.env.STUDENT_EMAIL,
    password: process.env.STUDENT_PASSWORD,
    role: "student"
  });

  console.log("\n📚 Seeding courses...\n");
  await seedCourses(admin._id);

  console.log("\n📖 Seeding lessons (base)...\n");
  await seedLessons();

  console.log("\n📖 Seeding Introduction to Web Development lessons...\n");
  await seedIntroLessons();

  console.log("\n📖 Seeding Node.js Runtime lessons...\n");
  await seedNodeLessons();

  console.log("\n📖 Seeding Express.js Fundamentals lessons...\n");
  await seedExpressLessons();

  console.log("\n📖 Seeding CSS Fundamentals lessons...\n");
  await seedCssLessons();

  console.log("\n📖 Seeding JavaScript Essentials lessons...\n");
  await seedJsLessons();

  console.log("\n🧪 Seeding exercises (base)...\n");
  await seedExercises();

  console.log("\n🧪 Seeding Introduction to Web Development exercises...\n");
  await seedIntroExercises();

  console.log("\n🧪 Seeding Node.js Runtime exercises...\n");
  await seedNodeExercises();

  console.log("\n🧪 Seeding Express.js Fundamentals exercises...\n");
  await seedExpressExercises();

  console.log("\n🧪 Seeding CSS Fundamentals exercises...\n");
  await seedCssExercises();

  console.log("\n🧪 Seeding JavaScript Essentials exercises...\n");
  await seedJsExercises();

  console.log("\n📝 Seeding quizzes (base)...\n");
  await seedQuizzes();

  console.log("\n📝 Seeding Introduction to Web Development quiz...\n");
  await seedIntroQuiz();

  console.log("\n📝 Seeding Node.js Runtime quiz...\n");
  await seedNodeQuiz();

  console.log("\n📝 Seeding Express.js Fundamentals quiz...\n");
  await seedExpressQuiz();

  console.log("\n📝 Seeding CSS Fundamentals quiz...\n");
  await seedCssQuiz();

  console.log("\n📝 Seeding JavaScript Essentials quiz...\n");
  await seedJsQuiz();

  console.log("\n🚀 Seeding projects...\n");
  await seedProjects();

  const totalUsers = await User.countDocuments();
  const totalCourses = await Course.countDocuments();
  const totalLessons = await Lesson.countDocuments();
  const totalExercises = await Exercise.countDocuments();
  const totalQuizzes = await Quiz.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalTasks = await ProjectTask.countDocuments();

  console.log("\n📊 Database summary:");
  console.log(`   Users:      ${totalUsers}`);
  console.log(`   Courses:    ${totalCourses}`);
  console.log(`   Lessons:    ${totalLessons}`);
  console.log(`   Exercises:  ${totalExercises}`);
  console.log(`   Quizzes:    ${totalQuizzes}`);
  console.log(`   Projects:   ${totalProjects}`);
  console.log(`   Tasks:      ${totalTasks}`);

  await disconnectDB();
  console.log("\n✅ Seed complete.\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});