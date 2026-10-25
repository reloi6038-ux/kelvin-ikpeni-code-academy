/**
 * Kelvin Ikpeni Code Academy — Certificate service
 * - issueCertificateIfEligible: called after course completion
 * - verifyCertificate: public verification
 */
"use strict";

const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const User = require("../models/User");
const { getCourseProgress } = require("./completionService");

/**
 * Issues a certificate if:
 *  - Course is complete (all lessons + quizzes).
 *  - No certificate already exists for (user, course).
 *
 * Returns the certificate (existing or newly issued) or null if not eligible.
 */
async function issueCertificateIfEligible(userId, courseId) {
  const status = await getCourseProgress(userId, courseId);
  if (!status.isComplete) return null;

  const existing = await Certificate.findOne({ user: userId, course: courseId });
  if (existing) return existing;

  const [user, course] = await Promise.all([
    User.findById(userId),
    Course.findById(courseId)
  ]);
  if (!user || !course) return null;

  // Generate a unique ID (retry on collision — astronomically rare)
  let certificateId;
  let attempts = 0;
  do {
    certificateId = Certificate.generateId();
    attempts++;
  } while ((await Certificate.exists({ certificateId })) && attempts < 5);

  if (!certificateId) return null;

  const issuedAt = new Date();
  const verificationHash = Certificate.hash([
    certificateId,
    user._id.toString(),
    course._id.toString(),
    issuedAt.toISOString()
  ]);

  try {
    const cert = await Certificate.create({
      user: user._id,
      course: course._id,
      certificateId,
      recipientName: user.name,
      courseTitle: course.title,
      issuedAt,
      verificationHash
    });
    console.log(`🎓 Certificate issued: ${certificateId} → ${user.email} (${course.title})`);
    return cert;
  } catch (err) {
    // Unique constraint race — refetch
    if (err.code === 11000) {
      return Certificate.findOne({ user: userId, course: courseId });
    }
    throw err;
  }
}

/**
 * Public verification — returns a safe object (no email, no hash).
 */
async function verifyCertificate(certificateId) {
  const cert = await Certificate.findOne({ certificateId })
    .populate("course", "title")
    .populate("user", "name");

  if (!cert) {
    return { valid: false, reason: "Certificate not found." };
  }
  if (cert.revokedAt) {
    return {
      valid: false,
      reason: "Certificate has been revoked.",
      revokedAt: cert.revokedAt
    };
  }

  return {
    valid: true,
    certificate: {
      certificateId: cert.certificateId,
      recipientName: cert.recipientName,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt
    }
  };
}

module.exports = { issueCertificateIfEligible, verifyCertificate };