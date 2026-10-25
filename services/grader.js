/**
 * Kelvin Ikpeni Code Academy — Grader service
 */
"use strict";

const vm = require("vm");

async function gradeJavaScript(code, testCases) {
  const results = [];
  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const result = await runSingleJSTest(code, tc);
    results.push(result);
    if (result.passed) passed++; else failed++;
  }

  return {
    results,
    passed,
    failed,
    total: testCases.length,
    success: failed === 0 && testCases.length > 0
  };
}

function runSingleJSTest(code, tc) {
  return new Promise((resolve) => {
    const sandbox = {
      console: { log: () => {}, error: () => {}, warn: () => {} },
      setTimeout, clearTimeout, Math, JSON, Date, Array, Object, String, Number, Boolean
    };

    const context = vm.createContext(sandbox);
    let actual;
    let error;

    try {
      vm.runInContext(code, context, { timeout: 1000 });

      let callable = null;
      if (tc.callFn && typeof context[tc.callFn] === "function") {
        callable = context[tc.callFn];
      } else if (tc.fnName && typeof context[tc.fnName] === "function") {
        callable = context[tc.fnName];
      }

      if (!callable) {
        for (const k of Object.keys(context)) {
          if (typeof context[k] === "function") { callable = context[k]; break; }
        }
      }

      if (!callable) {
        throw new Error("No function found in your code.");
      }

      // Special case for debounce which returns a function
      if (tc.expected === "function") {
        const result = callable.apply(null, Array.isArray(tc.input) ? tc.input : []);
        actual = typeof result;
      } else {
        actual = callable.apply(null, Array.isArray(tc.input) ? tc.input : []);
      }
    } catch (err) {
      error = err.message || String(err);
    }

    let match = false;
    if (!error) {
      try {
        if (tc.compare === "deepEqual") {
          match = JSON.stringify(actual) === JSON.stringify(tc.expected);
        } else {
          match = actual == tc.expected; // eslint-disable-line eqeqeq
        }
      } catch (e) {
        match = false;
      }
    }

    resolve({
      description: tc.description || "Test case",
      passed: match,
      expected: tc.expected,
      actual: error ? null : actual,
      error
    });
  });
}

async function gradeHTMLCSS(code, testCases) {
  const results = testCases.map((tc) => {
    let pass = true;
    const description = tc.description || "Check";

    if (tc.selector) {
      const sel = tc.selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      pass = pass && new RegExp(sel).test(code);
    }
    if (tc.expectText) {
      pass = pass && code.includes(tc.expectText);
    }
    if (tc.expectCss) {
      pass = pass && code.includes(tc.expectCss);
    }
    if (tc.expectAttribute) {
      pass = pass && code.includes(tc.expectAttribute);
    }
    if (tc.pattern) {
      pass = pass && new RegExp(tc.pattern).test(code);
    }

    return {
      description,
      passed: pass,
      expected: tc.expected || tc.expectText || tc.selector || tc.pattern || "",
      actual: pass ? "match" : "no match"
    };
  });

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;

  return {
    results,
    passed,
    failed,
    total: testCases.length,
    success: failed === 0 && testCases.length > 0
  };
}

module.exports = { gradeJavaScript, gradeHTMLCSS };