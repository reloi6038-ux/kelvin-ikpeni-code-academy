/**
 * Kelvin Ikpeni Code Academy — Certificate controller
 */
"use strict";

const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const { issueCertificateIfEligible, verifyCertificate } = require("../services/certificateService");
const { buildCertificatePdf } = require("../services/certificatePdf");

// ---------- USER ----------

async function myCertificates(req, res) {
  const certs = await Certificate.find({ user: req.user._id, revokedAt: null })
    .populate("course", "title slug icon")
    .sort({ issuedAt: -1 });

  res.json({
    status: "success",
    count: certs.length,
    certificates: certs.map((c) => ({
      id: c._id,
      certificateId: c.certificateId,
      recipientName: c.recipientName,
      courseTitle: c.courseTitle,
      courseSlug: c.course ? c.course.slug : null,
      issuedAt: c.issuedAt
    }))
  });
}

async function getCertificate(req, res) {
  const cert = await Certificate.findOne({ certificateId: req.params.certificateId });
  if (!cert) return res.status(404).json({ status: "error", message: "Certificate not found." });

  const isOwner = req.user && cert.user.toString() === req.user._id.toString();
  const isAdmin = req.user && req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ status: "error", message: "Not allowed." });
  }
  if (cert.revokedAt) {
    return res.status(410).json({ status: "error", message: "Certificate revoked." });
  }

  res.json({
    status: "success",
    certificate: {
      id: cert._id,
      certificateId: cert.certificateId,
      recipientName: cert.recipientName,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt
    }
  });
}

async function downloadPdf(req, res) {
  const cert = await Certificate.findOne({ certificateId: req.params.certificateId });
  if (!cert) return res.status(404).json({ status: "error", message: "Certificate not found." });

  const isOwner = cert.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ status: "error", message: "Not allowed." });
  }
  if (cert.revokedAt) {
    return res.status(410).json({ status: "error", message: "Certificate revoked." });
  }

  buildCertificatePdf(cert, res);
}

async function verify(req, res) {
  const result = await verifyCertificate(req.params.certificateId);
  res.json(result);
}

async function issueNow(req, res) {
  const { courseSlug } = req.body || {};
  if (!courseSlug) return res.status(400).json({ status: "error", message: "courseSlug required." });

  const course = await Course.findOne({ slug: courseSlug });
  if (!course) return res.status(404).json({ status: "error", message: "Course not found." });

  const cert = await issueCertificateIfEligible(req.user._id, course._id);
  if (!cert) {
    return res.status(400).json({
      status: "error",
      message: "You have not completed this course yet."
    });
  }

  res.json({
    status: "success",
    message: "Certificate issued.",
    certificate: {
      certificateId: cert.certificateId,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt
    }
  });
}

// ---------- ADMIN ----------

async function adminListCertificates(req, res) {
  const certs = await Certificate.find({})
    .populate("user", "name email")
    .populate("course", "title slug")
    .sort({ issuedAt: -1 })
    .limit(200);

  res.json({
    status: "success",
    count: certs.length,
    certificates: certs.map((c) => ({
      id: c._id,
      certificateId: c.certificateId,
      recipientName: c.recipientName,
      recipientEmail: c.user ? c.user.email : "",
      courseTitle: c.courseTitle,
      issuedAt: c.issuedAt,
      revokedAt: c.revokedAt
    }))
  });
}

async function revokeCertificate(req, res) {
  const cert = await Certificate.findOne({ certificateId: req.params.id });
  if (!cert) return res.status(404).json({ status: "error", message: "Certificate not found." });
  if (cert.revokedAt) {
    return res.status(400).json({ status: "error", message: "Already revoked." });
  }
  cert.revokedAt = new Date();
  cert.revokedReason = req.body.reason || "Revoked by admin";
  await cert.save();
  res.json({ status: "success", message: "Certificate revoked." });
}

module.exports = {
  myCertificates,
  getCertificate,
  downloadPdf,
  verify,
  issueNow,
  adminListCertificates,
  revokeCertificate
};