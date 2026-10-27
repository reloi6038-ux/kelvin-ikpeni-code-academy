/**
 * Kelvin Ikpeni Code Academy — Reusable IDE component
 * Uses CodeMirror if available, falls back to <textarea>.
 * Handles HTML, CSS, and JS with a combined preview + console overlay.
 */
(function () {
  "use strict";

  function createIDE(options) {
    var containerId = options.containerId;
    var container = document.getElementById(containerId);
    if (!container) {
      console.error("[ide] Container not found:", containerId);
      return null;
    }

    var state = {
      html: options.starterHtml || "",
      css: options.starterCss || "",
      js: options.starterJs || "",
      language: options.language || "html"
    };

    // Determine which tabs to show based on the language
    var languages = [];
    if (state.language === "html") languages = ["html", "css", "js"];
    else if (state.language === "css") languages = ["html", "css"];
    else if (state.language === "javascript") languages = ["html", "js"];
    else if (state.language === "node" || state.language === "express") languages = ["js"];

    // Backend exercises cannot run in a browser
    var isBackend = state.language === "node" || state.language === "express";

    // Build tab buttons
    var tabsHtml = languages.map(function (t, i) {
      return '<button type="button" class="ide-tab' + (i === 0 ? " active" : "") + '" data-tab="' + t + '">' +
        (t === "html" ? "index.html" : t === "css" ? "styles.css" : "app.js") +
        "</button>";
    }).join("");

    // Build textareas (hidden by default if CodeMirror takes over)
    var editorsHtml = languages.map(function (t) {
      var value = t === "html" ? state.html : t === "css" ? state.css : state.js;
      return '<textarea class="ide-editor" data-tab="' + t + '" spellcheck="false" ' +
        'style="display:' + (t === languages[0] ? "block" : "none") + '">' +
        escapeHtml(value) +
        "</textarea>";
    }).join("");

    // Build the IDE DOM
    container.innerHTML =
      '<div class="ide-layout">' +
        '<div class="ide-panel">' +
          '<div class="ide-tabs">' + tabsHtml + '</div>' +
          '<div class="ide-editor-wrap">' + editorsHtml + '</div>' +
          '<div class="ide-actions">' +
            '<button type="button" class="btn btn-primary btn-sm" data-action="run">▶ Run</button>' +
            '<button type="button" class="btn btn-ghost btn-sm" data-action="reset">Reset</button>' +
            '<button type="button" class="btn btn-ghost btn-sm" data-action="submit">Submit</button>' +
            '<div class="ide-status"><span class="dot"></span> Ready</div>' +
          '</div>' +
        '</div>' +
        '<div class="ide-panel">' +
          '<div class="ide-tabs"><span class="ide-tab active" style="cursor:default">Preview & Console</span></div>' +
          '<iframe class="ide-preview" sandbox="allow-scripts" title="Preview"></iframe>' +
        '</div>' +
      '</div>';

    var preview = container.querySelector(".ide-preview");
    var tabButtons = container.querySelectorAll(".ide-tab[data-tab]");
    var editors = {};

    // Init CodeMirror
    container.querySelectorAll(".ide-editor").forEach(function (ta) {
      var tab = ta.getAttribute("data-tab");
      if (window.CodeMirror) {
        var cm = CodeMirror.fromTextArea(ta, {
          lineNumbers: true,
          mode: tab === "html" ? "htmlmixed" : tab === "css" ? "css" : "javascript",
          theme: "material-darker",
          indentUnit: 2,
          tabSize: 2,
          lineWrapping: true
        });
        cm.setSize("100%", "340px");
        editors[tab] = cm;
      } else {
        // Fallback if CDN fails to load
        editors[tab] = {
          getValue: function () { return ta.value; },
          setValue: function (v) { ta.value = v; },
          getWrapperElement: function () { return ta; },
          refresh: function () {}
        };
      }
    });

    // Tab switching
    function showTab(tabName) {
      Object.keys(editors).forEach(function (t) {
        var wrapper = editors[t].getWrapperElement();
        if (wrapper) wrapper.style.display = (t === tabName) ? "" : "none";
      });
      if (window.CodeMirror && editors[tabName]) {
        setTimeout(function () { editors[tabName].refresh(); }, 20);
      }
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        tabButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        showTab(tab);
      });
    });

    showTab(languages[0]);

    // Helpers
    function getVal(t) {
      return editors[t] ? editors[t].getValue() : "";
    }

    function setVal(t, v) {
      if (editors[t]) editors[t].setValue(v);
    }

    // ============================================================
    // Preview builders
    // ============================================================

    function buildBackendPreview() {
      return "<!DOCTYPE html><html><head><meta charset='utf-8'></head>" +
        "<body style='margin:0;padding:32px;font-family:system-ui,sans-serif;background:#0A0F1C;color:#E2E8F0;text-align:center;'>" +
          "<div style='font-size:64px;margin-bottom:16px;'>🖥️</div>" +
          "<h2 style='color:#22d3ee;margin:0 0 12px;'>Backend Exercise</h2>" +
          "<p style='color:#94a3b8;max-width:400px;margin:0 auto;line-height:1.6;'>" +
            "This exercise runs in <strong style='color:#E2E8F0;'>Node.js</strong>. " +
            "Browsers can't run Express servers, so there's nothing to preview here." +
          "</p>" +
          "<p style='color:#94a3b8;max-width:400px;margin:20px auto 0;line-height:1.6;'>" +
            "Write your code and click <strong style='color:#6ee7b7;'>Submit</strong> to be graded. " +
            "The tests check your code structure, not live execution." +
          "</p>" +
        "</body></html>";
    }

    function buildPreviewDoc() {
      if (isBackend) return buildBackendPreview();

      var html = getVal("html");
      var css = getVal("css");
      var js = getVal("js");

      // If no HTML, provide a default sandbox
      if (!html || html.trim() === "") {
        html = "<body>\n  <h1>Preview</h1>\n  <p>Your CSS and JS will render here.</p>\n  <div class='box'>Box</div>\n</body>";
      }

      // The instrumentation script: captures console logs and renders them in a floating panel
      var instrumentation = `
(function(){
  var __log = [];
  var _log = console.log, _err = console.error, _warn = console.warn;
  
  function render() {
    var el = document.getElementById('__console');
    if (el) {
      el.innerHTML = __log.map(function(l){
        return '<div style="font-family:monospace;font-size:12px;color:#6ee7b7;padding:4px 0;border-bottom:1px solid #1e2a44;word-wrap:break-word;">&gt; ' + l + '</div>';
      }).join('') || '<span style="color:#94a3b8;font-size:12px;">(no console output yet)</span>';
    }
  }
  
  console.log = function(){ __log.push([].slice.call(arguments).map(function(a){return typeof a === 'object'?JSON.stringify(a):String(a);}).join(' ')); render(); _log.apply(console, arguments); };
  console.warn = function(){ __log.push('⚠ ' + [].slice.call(arguments).join(' ')); render(); _warn.apply(console, arguments); };
  console.error = function(){ __log.push('❌ ' + [].slice.call(arguments).join(' ')); render(); _err.apply(console, arguments); };
  
  window.addEventListener('error', function(e) {
    __log.push('❌ Error: ' + e.message);
    render();
  });
  
  window.addEventListener('DOMContentLoaded', function() {
    var box = document.createElement('div');
    box.innerHTML = '<div style="position:fixed;bottom:0;left:0;right:0;max-height:40%;overflow-y:auto;background:#0A0F1C;border-top:1px solid #22d3ee;padding:12px 16px;z-index:99999;box-shadow:0 -4px 12px rgba(0,0,0,0.5);"><div style="color:#22d3ee;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22d3ee;"></span>Console</div><div id="__console"></div></div>';
    document.body.appendChild(box);
    render();
  });
})();
`;

      var head = '<meta charset="utf-8">';
      if (css) head += "<style>" + css + "</style>";

      var body = html;
      
      // Inject the instrumentation script FIRST (so it captures console calls)
      // Then inject the user's JavaScript
      if (/<\/body>/i.test(body)) {
        body = body.replace(/<\/body>/i, "<script>" + instrumentation + "<\/script><script>" + js + "<\/script></body>");
      } else {
        body += "<script>" + instrumentation + "<\/script><script>" + js + "<\/script>";
      }

      var isFull = /<html[\s>]/i.test(body);
      if (isFull) {
        return body.replace(/<head>/, "<head>" + head);
      }
      
      return "<!DOCTYPE html><html><head>" + head + "</head>" + body + "</html>";
    }

    // Action: Run
    function run() {
      var doc = buildPreviewDoc();
      var blob = new Blob([doc], { type: "text/html" });
      preview.src = URL.createObjectURL(blob);
      var status = container.querySelector(".ide-status");
      if (status) status.innerHTML = '<span class="dot"></span> Updated at ' + new Date().toLocaleTimeString();
    }

    // Actions
    container.querySelector('[data-action="run"]').addEventListener("click", run);
    container.querySelector('[data-action="reset"]').addEventListener("click", function () {
      setVal("html", state.html);
      setVal("css", state.css);
      setVal("js", state.js);
      run();
    });

    var submitHandler = options.onSubmit;
    if (submitHandler) {
      container.querySelector('[data-action="submit"]').addEventListener("click", function () {
        submitHandler({ html: getVal("html"), css: getVal("css"), js: getVal("js") });
      });
    } else {
      container.querySelector('[data-action="submit"]').style.display = "none";
    }

    // Initial render
    run();

    return {
      getCode: function () { return { html: getVal("html"), css: getVal("css"), js: getVal("js") }; },
      setCode: function (c) {
        if (c.html !== undefined) setVal("html", c.html);
        if (c.css !== undefined) setVal("css", c.css);
        if (c.js !== undefined) setVal("js", c.js);
      },
      run: run
    };
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  window.KICA = window.KICA || {};
  window.KICA.ide = { create: createIDE };
})();