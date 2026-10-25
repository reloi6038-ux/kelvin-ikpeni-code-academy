/**
 * Kelvin Ikpeni Code Academy — Certificate PDF generator
 * Uses pdfkit to stream a branded A4 (landscape) PDF.
 */
"use strict";

const PDFDocument = require("pdfkit");

// Brand colors
const C_BG = "#0B1120";
const C_BG_SOFT = "#111C33";
const C_ACCENT = "#22D3EE";
const C_ACCENT_2 = "#7C6CFF";
const C_GOLD = "#F4B860";
const C_TEXT = "#E2E8F0";
const C_MUTED = "#94A3B8";

function drawFrame(doc, w, h) {
  // Background
  doc.rect(0, 0, w, h).fill(C_BG);

  // Soft border
  doc.lineWidth(2).strokeColor("#253264")
    .rect(30, 30, w - 60, h - 60).stroke();

  // Inner border (thin)
  doc.lineWidth(0.5).strokeColor("#33418A")
    .rect(45, 45, w - 90, h - 90).stroke();

  // Corner accents
  const corners = [
    [30, 30, 1, 1],
    [w - 30, 30, -1, 1],
    [30, h - 30, 1, -1],
    [w - 30, h - 30, -1, -1]
  ];
  doc.lineWidth(3).strokeColor(C_ACCENT);
  corners.forEach(([x, y, sx, sy]) => {
    doc.moveTo(x, y + 30 * sy).lineTo(x, y).lineTo(x + 30 * sx, y).stroke();
  });
}

function drawLogoMark(doc, cx, cy) {
  // Simple "KI" mark: rounded square + letter
  doc.save();
  doc.roundedRect(cx - 28, cy - 28, 56, 56, 14).fill(C_ACCENT_2);
  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(22);
  doc.text("KI", cx - 28, cy - 12, { width: 56, align: "center" });
  doc.restore();
}

function drawDivider(doc, cx, cy, w) {
  const grad = doc.linearGradient(cx - w / 2, cy, cx + w / 2, cy);
  grad.stop(0, C_ACCENT_2, 0.2)
    .stop(0.5, C_ACCENT, 1)
    .stop(1, C_GOLD, 0.2);
  doc.rect(cx - w / 2, cy, w, 1).fill(grad);
}

function buildCertificatePdf(cert, res) {
  const W = 842; // A4 landscape width in points
  const H = 595; // A4 landscape height

  const doc = new PDFDocument({ size: [W, H], margin: 0 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="KICA-Certificate-${cert.certificateId}.pdf"`
  );

  doc.pipe(res);

  drawFrame(doc, W, H);

  // Top: logo mark + brand name
  drawLogoMark(doc, 100, 90);
  doc.fillColor(C_TEXT).font("Helvetica-Bold").fontSize(16);
  doc.text("Kelvin Ikpeni Code Academy", 145, 78);
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(9)
    .text("LEARN TO CODE. BUILD TO LEAD.", 145, 98, { characterSpacing: 2 });

  // Certificate title block
  doc.fillColor(C_ACCENT).font("Helvetica").fontSize(11)
    .text("CERTIFICATE OF COMPLETION", 0, 180, { width: W, align: "center", characterSpacing: 4 });

  doc.fillColor(C_MUTED).font("Helvetica").fontSize(11)
    .text("This certifies that", 0, 220, { width: W, align: "center" });

  // Recipient name
  doc.fillColor(C_TEXT).font("Helvetica-Bold").fontSize(38)
    .text(cert.recipientName, 0, 245, { width: W, align: "center" });

  drawDivider(doc, W / 2, 305, 320);

  // "has successfully completed"
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(11)
    .text("has successfully completed the course", 0, 325, { width: W, align: "center" });

  // Course title
  doc.fillColor(C_ACCENT).font("Helvetica-Bold").fontSize(24)
    .text(cert.courseTitle, 0, 355, { width: W, align: "center" });

  // Issue date
  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(10)
    .text(`Issued on ${issuedDate}`, 0, 405, { width: W, align: "center" });

  // Signature area (bottom-left)
  doc.save();
  doc.strokeColor("#33418A").lineWidth(0.8)
    .moveTo(100, 490).lineTo(280, 490).stroke();
  doc.fillColor(C_TEXT).font("Helvetica-Bold").fontSize(13)
    .text("Kelvin Ikpeni", 100, 498);
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(9)
    .text("Founder & Instructor", 100, 515);
  doc.restore();

  // Certificate ID (bottom-right)
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(8)
    .text("CERTIFICATE ID", 542, 490, { width: 200, align: "right", characterSpacing: 1 });
  doc.fillColor(C_TEXT).font("Courier-Bold").fontSize(12)
    .text(cert.certificateId, 542, 503, { width: 200, align: "right" });

  // Verification line
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(7)
    .text(`Verify at ${baseUrl}/certificate-verify.html?id=${cert.certificateId}`,
      542, 522, { width: 200, align: "right" });

  doc.end();
}

module.exports = { buildCertificatePdf };