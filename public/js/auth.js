(function () {
  "use strict";

  function toast(msg, type) {
    if (window.KICA && window.KICA.ui) return window.KICA.ui.toast(msg, type);
    console.log("[toast]", type || "info", msg);
  }

  function setLoading(btn, on, text) {
    if (window.KICA && window.KICA.ui && window.KICA.ui.setLoading) return window.KICA.ui.setLoading(btn, on, text);
    if (!btn) return;
    btn.disabled = !!on;
  }

  function showFieldErrors(form, errors) {
    form.querySelectorAll("[data-error-for]").forEach(function (el) { el.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
    if (!errors) return;
    Object.keys(errors).forEach(function (field) {
      var input = form.querySelector('[name="' + field + '"]');
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (input) input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = errors[field];
    });
  }

  async function refreshNav() {
    try {
      var res = await window.KICA.api.auth.me();
      var user = res.user;
      var authBlock = document.querySelector(".nav-auth");
      var accountBlock = document.querySelector(".nav-account");
      if (!authBlock || !accountBlock) return;

      authBlock.classList.add("is-hidden");
      accountBlock.classList.remove("is-hidden");

      var greeting = document.querySelector("[data-nav-greeting]");
      if (!greeting) {
        greeting = document.createElement("a");
        greeting.setAttribute("data-nav-greeting", "");
        greeting.href = "/profile.html";
        greeting.style.color = "var(--brand-accent)";
        greeting.style.fontWeight = "600";
        accountBlock.insertBefore(greeting, accountBlock.firstChild);
      }
      greeting.textContent = "Hi, " + (user.name || "").split(" ")[0];

      if (user.role === "admin") {
        var adminLink = document.querySelector("[data-nav-admin]");
        if (!adminLink) {
          adminLink = document.createElement("a");
          adminLink.setAttribute("data-nav-admin", "");
          adminLink.href = "/admin-dashboard.html";
          adminLink.textContent = "Admin";
          accountBlock.insertBefore(adminLink, accountBlock.querySelector("[data-logout]"));
        }
      }
    } catch (_) {}
  }

  document.addEventListener("kica:header-ready", refreshNav);

  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type="submit"]');
      showFieldErrors(form);
      setLoading(btn, true, "Signing in…");
      try {
        var res = await window.KICA.api.auth.login({ email: form.email.value.trim(), password: form.password.value });
        toast("Welcome back, " + res.user.name.split(" ")[0] + "!", "success");
        var next = new URLSearchParams(window.location.search).get("next") || "/dashboard.html";
        setTimeout(function () { window.location.href = next; }, 600);
      } catch (err) {
        setLoading(btn, false);
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Sign-in failed.", "error");
      }
    });
  }

  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type="submit"]');
      showFieldErrors(form);

      var errors = {};
      if (!form.fullName.value.trim()) errors.name = "Full name is required.";
      if (form.password.value.length < 8) errors.password = "Password must be at least 8 characters.";
      if (form.password.value !== form.confirm.value) errors.confirm = "Passwords do not match.";
      if (!form.agree.checked) errors.agree = "You must accept the terms.";
      if (Object.keys(errors).length) return showFieldErrors(form, errors);

      setLoading(btn, true, "Creating account…");
      try {
        var res = await window.KICA.api.auth.register({ name: form.fullName.value.trim(), email: form.email.value.trim(), password: form.password.value });
        toast("Account created. Welcome, " + res.user.name.split(" ")[0] + "!", "success");
        setTimeout(function () { window.location.href = "/dashboard.html"; }, 600);
      } catch (err) {
        setLoading(btn, false);
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Registration failed.", "error");
      }
    });
  }

  var forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type="submit"]');
      showFieldErrors(form);
      setLoading(btn, true, "Sending…");
      try {
        await window.KICA.api.auth.forgot({ email: form.email.value.trim() });
        toast("If that email exists, a reset link has been sent.", "success");
        form.reset();
      } catch (err) {
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Could not send reset link.", "error");
      } finally {
        setLoading(btn, false);
      }
    });
  }

  var resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type="submit"]');
      showFieldErrors(form);
      var params = new URLSearchParams(window.location.search);
      var token = params.get("token") || "";

      var errors = {};
      if (!token) errors.token = "Missing reset token in URL.";
      if (form.password.value.length < 8) errors.password = "Password must be at least 8 characters.";
      if (form.password.value !== form.confirm.value) errors.confirm = "Passwords do not match.";
      if (Object.keys(errors).length) return showFieldErrors(form, errors);

      setLoading(btn, true, "Updating…");
      try {
        await window.KICA.api.auth.reset({ token: token, password: form.password.value });
        toast("Password updated. Please sign in.", "success");
        setTimeout(function () { window.location.href = "/login.html"; }, 900);
      } catch (err) {
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Could not reset password.", "error");
        setLoading(btn, false);
      }
    });
  }

  document.addEventListener("click", async function (e) {
    var btn = e.target.closest("[data-logout]");
    if (!btn) return;
    e.preventDefault();
    try { await window.KICA.api.auth.logout(); } catch (_) {}
    toast("Signed out.", "info");
    setTimeout(function () { window.location.href = "/login.html"; }, 400);
  });
})();