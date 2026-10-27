(function () {
  "use strict";

  function toast(msg, type) {
    if (window.KICA && window.KICA.ui) return window.KICA.ui.toast(msg, type);
    console.log("[toast]", type, msg);
  }

  function setLoading(btn, on, text) {
    if (window.KICA && window.KICA.ui && window.KICA.ui.setLoading) {
      return window.KICA.ui.setLoading(btn, on, text);
    }
    if (!btn) return;
    btn.disabled = !!on;
  }

  function showFieldErrors(form, errors) {
    form.querySelectorAll("[data-error-for]").forEach((el) => (el.textContent = ""));
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    if (!errors) return;
    Object.keys(errors).forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      const errorEl = form.querySelector(`[data-error-for="${field}"]`);
      if (input) input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = errors[field];
    });
  }

  const form = document.getElementById("contactForm");
  const successEl = document.getElementById("contact-success");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    showFieldErrors(form);
    successEl.classList.add("is-hidden");

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    const errors = {};
    if (!payload.name || payload.name.length < 2) errors.name = "Name must be 2+ characters.";
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "Invalid email.";
    if (!payload.subject || payload.subject.length < 3) errors.subject = "Subject is required.";
    if (!payload.message || payload.message.length < 10) errors.message = "Message must be 10+ characters.";

    if (Object.keys(errors).length) {
      showFieldErrors(form, errors);
      return;
    }

    setLoading(btn, true, "Sending…");
    try {
      await window.KICA.api.post("/contact", payload);
      form.reset();
      successEl.classList.remove("is-hidden");
      toast("Message sent! We'll get back to you shortly.", "success");
      successEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      if (err.payload && err.payload.errors) {
        showFieldErrors(form, err.payload.errors);
      }
      toast(err.message || "Could not send message.", "error");
    } finally {
      setLoading(btn, false);
    }
  });
})();