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

  async function loadProfile() {
    try {
      var res = await window.KICA.api.auth.me();
      var user = res.user;
      document.getElementById("fullName").value = user.name || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("bio").value = user.bio || "";
    } catch (err) {
      toast("Could not load profile.", "error");
    }
  }

  var profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = document.getElementById("save-btn");
      showFieldErrors(form);

      var name = form.fullName.value.trim();
      var bio = form.bio.value.trim();

      var errors = {};
      if (name.length < 2) errors.name = "Name must be at least 2 characters.";
      if (bio.length > 500) errors.bio = "Bio must be under 500 characters.";
      if (Object.keys(errors).length) return showFieldErrors(form, errors);

      setLoading(btn, true, "Saving…");
      try {
        await window.KICA.api.put("/users/me", { name, bio });
        toast("Profile updated.", "success");
      } catch (err) {
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Could not save profile.", "error");
      } finally {
        setLoading(btn, false);
      }
    });
  }

  var passwordForm = document.getElementById("passwordForm");
  if (passwordForm) {
    passwordForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var btn = document.getElementById("pw-btn");
      showFieldErrors(form);

      var currentPassword = form.currentPassword.value;
      var newPassword = form.newPassword.value;

      var errors = {};
      if (!currentPassword) errors.currentPassword = "Current password is required.";
      if (newPassword.length < 8) errors.newPassword = "New password must be at least 8 characters.";
      if (Object.keys(errors).length) return showFieldErrors(form, errors);

      setLoading(btn, true, "Changing…");
      try {
        await window.KICA.api.post("/users/me/change-password", { currentPassword, newPassword });
        toast("Password changed. Redirecting to login…", "success");
        setTimeout(function () { window.location.href = "/login.html"; }, 1200);
      } catch (err) {
        if (err.payload && err.payload.errors) showFieldErrors(form, err.payload.errors);
        toast(err.message || "Could not change password.", "error");
        setLoading(btn, false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", loadProfile);
})();