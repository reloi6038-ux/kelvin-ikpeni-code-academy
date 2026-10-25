/**
 * Kelvin Ikpeni Code Academy — Theme
 * Locks the site to the premium "Midnight Academy" dark theme.
 */
(function () {
  "use strict";

  var root = document.documentElement;

  // Apply the dark theme immediately
  root.setAttribute("data-theme", "dark");
  
  // Optional: smooth transition class to prevent flashing on load
  root.classList.add("theme-transition");
  window.setTimeout(function () { root.classList.remove("theme-transition"); }, 300);
})();