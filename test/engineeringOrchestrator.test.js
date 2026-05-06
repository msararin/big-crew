const test = require("node:test");
const assert = require("node:assert/strict");

const { buildEngineeringWorkPackage } = require("../src/orchestrator/engineeringOrchestrator");

test("buildEngineeringWorkPackage includes the expected sections", () => {
  const taskDescription = "D1 spike: validate inventory-aware menu routing";
  const output = buildEngineeringWorkPackage(taskDescription);

  [
    "Engineering Work Package",
    "Task Summary",
    "Crew Activity Summary",
    "Crew Role Trace",
    "Product Value",
    "Priority",
    "In Scope",
    "Out of Scope",
    "Architecture Impact",
    "Acceptance Criteria",
    "Regression Tests",
    "Codex-Ready Prompt",
    "Definition of Done",
  ].forEach((section) => {
    assert.ok(output.includes(section), `expected output to include ${section}`);
  });

  assert.ok(output.includes(taskDescription), "expected output to include the task description");
});
