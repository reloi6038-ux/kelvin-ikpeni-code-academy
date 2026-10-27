/**
 * Kelvin Ikpeni Code Academy — User seed
 * Idempotent: creates admin + demo student if they don't exist.
 */
"use strict";

const User = require("../models/User");

async function seedUsers() {
  const admin = await upsertUser({
    name: process.env.ADMIN_NAME || "Kelvin Ikpeni",
    email: process.env.ADMIN_EMAIL || "admin@kelvinikpeni.dev",
    password: process.env.ADMIN_PASSWORD || "AdminPass123!",
    role: "admin"
  });

  const student = await upsertUser({
    name: process.env.STUDENT_NAME || "Demo Student",
    email: process.env.STUDENT_EMAIL || "student@kelvinikpeni.dev",
    password: process.env.STUDENT_PASSWORD || "StudentPass123!",
    role: "student"
  });

  return { admin, student };
}

async function upsertUser({ name, email, password, role }) {
  if (!email || !password || !name) {
    throw new Error(`Missing seed values for role=${role}`);
  }

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

  const user = new User({
    name,
    email: email.toLowerCase(),
    passwordHash: password,
    role
  });
  await user.save();
  console.log(`✅ Created ${role}: ${email}`);
  return user;
}

module.exports = { seedUsers, upsertUser };