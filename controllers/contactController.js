/**
 * Kelvin Ikpeni Code Academy — Contact controller
 */
"use strict";

const Contact = require("../models/Contact");

async function submitContact(req, res) {
  const { name, email, subject, message } = req.body || {};

  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Name must be 2+ characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email.";
  if (!subject || subject.trim().length < 3) errors.subject = "Subject is required.";
  if (!message || message.trim().length < 10) errors.message = "Message must be 10+ characters.";

  if (Object.keys(errors).length) {
    return res.status(400).json({ status: "error", message: "Validation failed.", errors });
  }

  const contact = await Contact.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    subject: subject.trim(),
    message: message.trim(),
    submittedFromIp: req.ip || ""
  });

  console.log(`📬 Contact message from ${contact.email}: "${contact.subject}"`);

  res.status(201).json({
    status: "success",
    message: "Message received. We'll be in touch soon.",
    id: contact._id
  });
}

async function adminListContacts(req, res) {
  const { status } = req.query;
  const filter = {};
  if (status && ["new", "read", "resolved"].includes(status)) {
    filter.status = status;
  }

  const items = await Contact.find(filter).sort({ createdAt: -1 }).limit(200);

  res.json({
    status: "success",
    count: items.length,
    contacts: items.map((c) => ({
      id: c._id,
      name: c.name,
      email: c.email,
      subject: c.subject,
      message: c.message,
      status: c.status,
      createdAt: c.createdAt,
      resolvedAt: c.resolvedAt
    }))
  });
}

async function adminUpdateContact(req, res) {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ status: "error", message: "Contact not found." });

  if (req.body.status && ["new", "read", "resolved"].includes(req.body.status)) {
    contact.status = req.body.status;
    if (req.body.status === "resolved" && !contact.resolvedAt) {
      contact.resolvedAt = new Date();
    } else if (req.body.status !== "resolved") {
      contact.resolvedAt = null;
    }
  }
  await contact.save();

  res.json({ status: "success", message: "Contact updated." });
}

async function adminDeleteContact(req, res) {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return res.status(404).json({ status: "error", message: "Contact not found." });
  res.json({ status: "success", message: "Contact deleted." });
}

module.exports = { submitContact, adminListContacts, adminUpdateContact, adminDeleteContact };