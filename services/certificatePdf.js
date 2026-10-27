/**
 * Kelvin Ikpeni Code Academy — Certificate PDF generator
 * Uses pdfkit to stream a branded A4 (landscape) PDF.
 */
"use strict";

const PDFDocument = require("pdfkit");

// Brand colors
const C_BG = "#0B1120";
const C_ACCENT = "#22D3EE";
const C_ACCENT_2 = "#7C6CFF";
const C_GOLD = "#D4A647";
const C_GOLD_DARK = "#A67C2E";
const C_GOLD_LIGHT = "#F4D47A";
const C_TEXT = "#E2E8F0";
const C_MUTED = "#94A3B8";

// Official production URL (used for verification links on the PDF)
const VERIFY_BASE_URL =
  process.env.BASE_URL || "https://kelvin-ikpeni-code-academy.onrender.com";

/**
 * Outer + inner border frame.
 */
function drawFrame(doc, w, h) {
  doc.rect(0, 0, w, h).fill(C_BG);

  // Outer border
  doc.lineWidth(2).strokeColor("#253264")
    .rect(30, 30, w - 60, h - 60).stroke();

  // Inner border
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

/**
 * Logo mark (KI rounded square) + brand text.
 */
function drawLogoMark(doc, cx, cy) {
  doc.save();
  doc.roundedRect(cx - 28, cy - 28, 56, 56, 14).fill(C_ACCENT_2);
  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(22);
  doc.text("KI", cx - 28, cy - 12, { width: 56, align: "center" });
  doc.restore();
}

/**
 * Gradient divider line.
 */
function drawDivider(doc, cx, cy, w) {
  const grad = doc.linearGradient(cx - w / 2, cy, cx + w / 2, cy);
  grad.stop(0, C_ACCENT_2, 0.2)
    .stop(0.5, C_ACCENT, 1)
    .stop(1, C_GOLD, 0.2);
  doc.rect(cx - w / 2, cy, w, 1).fill(grad);
}

/**
 * Golden embossed seal with "KICA" centered inside.
 * @param {number} cx  center X
 * @param {number} cy  center Y
 * @param {number} r   outer radius
 */
function drawGoldSeal(doc, cx, cy, r) {
  doc.save();

  // Outer glow ring (soft gold halo)
  doc.circle(cx, cy, r + 4).fillOpacity(0.15).fill(C_GOLD);
  doc.fillOpacity(1);

  // Outer ring — dark gold
  doc.circle(cx, cy, r).fill(C_GOLD_DARK);

  // Middle ring — bright gold
  doc.circle(cx, cy, r - 4).fill(C_GOLD);

  // Inner ring — darker gold for depth
  doc.circle(cx, cy, r - 8).fill(C_GOLD_DARK);

  // Innermost disc — light gold
  doc.circle(cx, cy, r - 12).fill(C_GOLD_LIGHT);

  // Notched / star-like inner rim (embossed feel)
  const notches = 32;
  for (let i = 0; i < notches; i++) {
    const angle = (Math.PI * 2 * i) / notches;
    const x1 = cx + Math.cos(angle) * (r - 10);
    const y1 = cy + Math.sin(angle) * (r - 10);
    doc.circle(x1, y1, 1.4).fill(C_GOLD_DARK);
  }

  // "KICA" text — centered, bold, dark, with a subtle highlight
  doc.fillColor("#5C3D0E")
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("KICA", cx - r, cy - 8, { width: r * 2, align: "center" });

  // Subtle top highlight to sell the embossed look
  doc.fillColor(C_GOLD_LIGHT)
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillOpacity(0.35)
    .text("KICA", cx - r, cy - 9, { width: r * 2, align: "center" });
  doc.fillOpacity(1);

  // Tiny star at the top of the seal
  const starY = cy - r + 22;
  doc.fillColor(C_GOLD_DARK);
  doc.circle(cx, starY, 2).fill();

  // Tick marks around the outer edge (decorative)
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12 - Math.PI / 2;
    const x = cx + Math.cos(angle) * (r - 2);
    const y = cy + Math.sin(angle) * (r - 2);
    doc.circle(x, y, 0.7).fill(C_GOLD_LIGHT);
  }

  doc.restore();
}

/**
 * Signature block: name ABOVE line, title BELOW line.
 */
function drawSignature(doc, x, y, lineWidth) {
  // Name above the line
  doc.fillColor(C_TEXT)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Kelvin Ikpeni", x, y - 22, { width: lineWidth, align: "center" });

  // The signature line
  doc.strokeColor("#33418A").lineWidth(0.8)
    .moveTo(x, y).lineTo(x + lineWidth, y).stroke();

  // Title below the line
  doc.fillColor(C_MUTED)
    .font("Helvetica")
    .fontSize(9)
    .text("Founder & Instructor", x, y + 6, { width: lineWidth, align: "center" });
}

/**
 * Build and stream the certificate PDF.
 */
function buildCertificatePdf(cert, res) {
  const W = 842; // A4 landscape width
  const H = 595; // A4 landscape height

  const doc = new PDFDocument({ size: [W, H], margin: 0 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="KICA-Certificate-${cert.certificateId}.pdf"`
  );

  doc.pipe(res);

  // ---- Frame + branding ----
  drawFrame(doc, W, H);

  drawLogoMark(doc, 100, 90);
  doc.fillColor(C_TEXT).font("Helvetica-Bold").fontSize(16);
  doc.text("Kelvin Ikpeni Code Academy", 145, 78);
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(9)
    .text("LEARN TO CODE. BUILD TO LEAD.", 145, 98, { characterSpacing: 2 });

  // ---- Title block ----
  doc.fillColor(C_ACCENT).font("Helvetica").fontSize(11)
    .text("CERTIFICATE OF COMPLETION", 0, 180, {
      width: W,
      align: "center",
      characterSpacing: 4
    });

  doc.fillColor(C_MUTED).font("Helvetica").fontSize(11)
    .text("This certifies that", 0, 220, { width: W, align: "center" });

  // ---- Recipient ----
  doc.fillColor(C_TEXT).font("Helvetica-Bold").fontSize(38)
    .text(cert.recipientName, 0, 245, { width: W, align: "center" });

  drawDivider(doc, W / 2, 305, 320);

  // ---- Course ----
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(11)
    .text("has successfully completed the course", 0, 325, {
      width: W,
      align: "center"
    });

  doc.fillColor(C_ACCENT).font("Helvetica-Bold").fontSize(24)
    .text(cert.courseTitle, 0, 355, { width: W, align: "center" });

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  doc.fillColor(C_MUTED).font("Helvetica").fontSize(10)
    .text(`Issued on ${issuedDate}`, 0, 405, { width: W, align: "center" });

  // ---- Signature (bottom-left) ----
  // Name on top of line, title below
  drawSignature(doc, 100, 510, 220);

  // ---- Gold seal (bottom-center) ----
  // Shifted up to cy = 485 to sit between the issue date and the baseline
  drawGoldSeal(doc, W / 2, 485, 48);

  // ---- Certificate ID + verify URL (bottom-right) ----
  const verifyUrl = `${VERIFY_BASE_URL}/certificate-verify.html?id=${cert.certificateId}`;
  const infoX = 542;
  const infoW = 200;

  doc.fillColor(C_MUTED).font("Helvetica").fontSize(8)
    .text("CERTIFICATE ID", infoX, 490, {
      width: infoW,
      align: "right",
      characterSpacing: 1
    });

  doc.fillColor(C_TEXT).font("Courier-Bold").fontSize(12)
    .text(cert.certificateId, infoX, 503, { width: infoW, align: "right" });

  doc.fillColor(C_MUTED).font("Helvetica").fontSize(7)
    .text(`Verify at ${verifyUrl}`, infoX, 522, {
      width: infoW,
      align: "right"
    });

  doc.end();
}

module.exports = { buildCertificatePdf, VERIFY_BASE_URL };