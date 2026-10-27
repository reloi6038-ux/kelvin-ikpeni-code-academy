/**
 * Kelvin Ikpeni Code Academy — Email service (Nodemailer with Gmail)
 */
"use strict";

const nodemailer = require("nodemailer");

// Create a reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify connection on startup (helps catch bad credentials early)
transporter.verify().then(() => {
  console.log("📧 Gmail SMTP server is ready to send emails");
}).catch((err) => {
  console.error("❌ Gmail SMTP connection error:", err.message);
  console.error("   → Check GMAIL_USER and GMAIL_APP_PASSWORD in .env");
});

const FROM_EMAIL = `"Kelvin Ikpeni Code Academy" <${process.env.GMAIL_USER}>`;

// ✅ Contact notifications go to NOTIFY_EMAIL (falls back to GMAIL_USER if missing)
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || process.env.GMAIL_USER;

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Password reset email
 */
async function sendPasswordResetEmail(toEmail, resetUrl, name) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: toEmail,
      subject: "Reset Your Password — Kelvin Ikpeni Code Academy",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1020; color: #e2e8f0; padding: 2rem; border-radius: 12px;">
          <h1 style="color: #22d3ee; margin-bottom: 1rem;">Reset Your Password</h1>
          <p>Hello ${escapeHtml(name || "there")},</p>
          <p>We received a request to reset your password for Kelvin Ikpeni Code Academy.</p>
          <p>Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
          <p style="text-align: center; margin: 2rem 0;">
            <a href="${resetUrl}" style="background: #5b7cfa; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #94a3b8; font-size: 0.85rem;">${resetUrl}</p>
          <p>If you didn't request this, you can safely ignore this email. Your password won't change.</p>
          <p style="margin-top: 2rem; color: #64748b; font-size: 0.85rem;">— Kelvin Ikpeni Code Academy</p>
        </div>
      `,
      text: `Reset your password for Kelvin Ikpeni Code Academy: ${resetUrl}`
    });

    console.log(`📧 Password reset email sent to ${toEmail} (ID: ${info.messageId})`);
    return { success: true, id: info.messageId };
  } catch (err) {
    console.error("Email send failed (password reset):", err.message);
    return { success: false, error: err };
  }
}

/**
 * Contact form notification to admin/owner
 */
async function sendContactNotification({ name, email, subject, message }) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `📬 New Contact: ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1020; color: #e2e8f0; padding: 2rem; border-radius: 12px;">
          <h2 style="color: #22d3ee; margin-top: 0;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr><td style="padding: 0.5rem 0; color: #94a3b8; width: 120px;">From:</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 0.5rem 0; color: #94a3b8;">Email:</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 0.5rem 0; color: #94a3b8;">Subject:</td><td>${escapeHtml(subject)}</td></tr>
          </table>
          <div style="background: #111827; border: 1px solid #253264; border-radius: 8px; padding: 1rem; white-space: pre-wrap;">${escapeHtml(message)}</div>
          <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #64748b;">Reply directly to this email to respond to ${escapeHtml(email)}.</p>
        </div>
      `,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`
    });

    console.log(`📧 Contact notification sent to ${NOTIFY_EMAIL} (ID: ${info.messageId})`);
    return { success: true, id: info.messageId };
  } catch (err) {
    console.error("Email send failed (contact notification):", err.message);
    return { success: false, error: err };
  }
}

/**
 * Contact form confirmation to sender
 */
async function sendContactConfirmation(toEmail, name) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: toEmail,
      subject: "We received your message — Kelvin Ikpeni Code Academy",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1020; color: #e2e8f0; padding: 2rem; border-radius: 12px;">
          <h1 style="color: #22d3ee; margin-bottom: 1rem;">Thanks for reaching out!</h1>
          <p>Hello ${escapeHtml(name)},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to explore our courses and start learning.</p>
          <p style="text-align: center; margin: 2rem 0;">
            <a href="${process.env.BASE_URL || "http://localhost:3000"}/courses.html" style="background: #5b7cfa; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Browse Courses
            </a>
          </p>
          <p style="margin-top: 2rem; color: #64748b; font-size: 0.85rem;">— Kelvin Ikpeni Code Academy</p>
        </div>
      `
    });

    console.log(`📧 Contact confirmation sent to ${toEmail} (ID: ${info.messageId})`);
    return { success: true, id: info.messageId };
  } catch (err) {
    console.error("Email send failed (contact confirmation):", err.message);
    return { success: false, error: err };
  }
}

/**
 * Certificate email with PDF attachment
 */
async function sendCertificateEmail(toEmail, name, courseTitle, pdfBuffer, certificateId) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: toEmail,
      subject: `🎓 Your Certificate for ${courseTitle}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1020; color: #e2e8f0; padding: 2rem; border-radius: 12px;">
          <h1 style="color: #22d3ee; margin-bottom: 1rem;">Congratulations, ${escapeHtml(name)}!</h1>
          <p>You've successfully completed <strong>${escapeHtml(courseTitle)}</strong>.</p>
          <p>Your official certificate is attached to this email as a PDF.</p>
          <p>You can also verify it publicly at any time:</p>
          <p style="word-break: break-all; color: #94a3b8; font-size: 0.85rem;">
            ${process.env.BASE_URL || "http://localhost:3000"}/certificate-verify.html?id=${certificateId}
          </p>
          <p style="margin-top: 2rem; color: #64748b; font-size: 0.85rem;">— Kelvin Ikpeni Code Academy</p>
        </div>
      `,
      attachments: [
        {
          filename: `KICA-Certificate-${certificateId}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    console.log(`📧 Certificate emailed to ${toEmail} (${certificateId})`);
    return { success: true, id: info.messageId };
  } catch (err) {
    console.error("Email send failed (certificate):", err.message);
    return { success: false, error: err };
  }
}

module.exports = {
  sendPasswordResetEmail,
  sendContactNotification,
  sendContactConfirmation,
  sendCertificateEmail
};