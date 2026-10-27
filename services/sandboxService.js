/**
 * Kelvin Ikpeni Code Academy — Sandbox service
 *
 * IMPORTANT SECURITY NOTE:
 * Never `eval()` or `new Function()` untrusted code inside your main
 * Express process. If you enable real backend code execution, you must:
 *   1. Use an external service (e.g., Piston API, Judge0, or a self-hosted
 *      Docker-based sandbox).
 *   2. Enforce CPU/memory/time limits.
 *   3. Block network access from the sandbox.
 *   4. Clean up workspaces after each run.
 *
 * For now, this service returns a "simulation" response used by the
 * exercise grader for node/express exercises.
 */
"use strict";

/**
 * Simulate execution of backend code.
 * Currently returns the pattern-match results produced by the grader.
 *
 * @param {string} code   The user's raw code
 * @param {Array}  tests  The exercise test cases
 * @returns {Promise<{ simulation: true, results: Array, passed, failed, total, success }>}
 */
async function executeCode(code, tests) {
  const { gradeHTMLCSS } = require("./grader");
  const gradeResult = await gradeHTMLCSS(code, tests);

  return {
    simulation: true,
    note: "Backend code is pattern-checked, not executed. Enable real sandbox execution before claiming true runtime validation.",
    ...gradeResult
  };
}

/**
 * Check whether real sandbox execution is currently enabled.
 * Returns false by default — flip this when you integrate a real sandbox.
 */
function isRealExecutionEnabled() {
  return false;
}

module.exports = { executeCode, isRealExecutionEnabled };