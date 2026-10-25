(function () {
  "use strict";

  function currentPath() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    return path.replace(/\.html$/, "") || "index";
  }

  function markActive(container) {
    var bodyPage = document.body.getAttribute("data-page");
    var page = bodyPage || currentPath();
    var links = container.querySelectorAll("[data-nav]");
    for (var i = 0; i < links.length; i++) {
      var target = links[i].getAttribute("data-nav");
      if (target === page) {
        links[i].classList.add("is-active");
        links[i].setAttribute("aria-current", "page");
      }
    }
  }

  function wireMobileMenu() {
    var nav = document.querySelector(".nav");
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("primaryMenu");
    if (!nav || !toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-menu-open") === "true";
      nav.setAttribute("data-menu-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    menu.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      nav.setAttribute("data-menu-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-menu-open") === "true") {
        nav.setAttribute("data-menu-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  function inject() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");

    var headerPromise = header
      ? fetch("/partials/header.html").then(function (r) { return r.text(); }).then(function (html) {
          header.innerHTML = html;
          markActive(header);
          wireMobileMenu();
          document.dispatchEvent(new CustomEvent("kica:header-ready"));
        }).catch(function (err) { console.error("Header load failed:", err); })
      : Promise.resolve();

    var footerPromise = footer
      ? fetch("/partials/footer.html").then(function (r) { return r.text(); }).then(function (html) {
          footer.innerHTML = html;
          var y = footer.querySelector("#year");
          if (y) y.textContent = String(new Date().getFullYear());
          document.dispatchEvent(new CustomEvent("kica:footer-ready"));
        }).catch(function (err) { console.error("Footer load failed:", err); })
      : Promise.resolve();

    return Promise.all([headerPromise, footerPromise]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }

  window.KICA = window.KICA || {};
  window.KICA.partials = { reload: inject };
})();