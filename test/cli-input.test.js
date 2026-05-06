const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const outputFilePath = path.join(repoRoot, "output", "engineering-work-package.md");

function removeOutputFile() {
  fs.rmSync(path.join(repoRoot, "output"), { recursive: true, force: true });
}

test.beforeEach(() => {
  removeOutputFile();
});

test.after(() => {
  removeOutputFile();
});

test("CLI supports --input file path", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input", "examples/input-d1-spike.md"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes("Big Crew Engineering Work Package"));
  assert.ok(result.stdout.includes("D1 Spike is a planning task"));
  assert.ok(!result.stdout.includes("## Context"));
  assert.ok(fs.existsSync(outputFilePath));

  const fileContents = fs.readFileSync(outputFilePath, "utf8");
  assert.ok(fileContents.includes("Big Crew Engineering Work Package"));
  assert.ok(fileContents.includes("D1 Spike is a planning task"));
});

test("CLI synthesizes task summary from markdown input without echoing the whole brief", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input", "inputs/review-tests/team-priority-maliwan-2.md"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 0);
  const taskSummaryMatch = result.stdout.match(/## Task Summary\n([\s\S]*?)\n\n## Product Value/);
  assert.ok(taskSummaryMatch, "expected to find the Task Summary section");

  const taskSummary = taskSummaryMatch[1];
  assert.ok(taskSummary.includes("Big Crew needs to clarify its operating priorities before helping build Maliwan 2.0."));
  assert.ok(taskSummary.includes("planning/validation task"));
  assert.ok(!taskSummary.includes("## Context"));
  assert.ok(!taskSummary.includes("## Task"));
  assert.ok(taskSummary.length < 450);

  const productValueMatch = result.stdout.match(/## Product Value\n([\s\S]*?)\n\n## Priority/);
  assert.ok(productValueMatch, "expected to find the Product Value section");
  assert.ok(productValueMatch[1].includes("help decide the right first Maliwan 2.0 slice"));

  const priorityMatch = result.stdout.match(/## Priority\n([\s\S]*?)\n\n## In Scope/);
  assert.ok(priorityMatch, "expected to find the Priority section");
  assert.ok(priorityMatch[1].includes("Prioritize product value, quality, Codex quota efficiency"));
});

test("CLI returns a clear error when --input is missing a file path", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes("Error: missing file path for --input"));
});

test("CLI returns a clear error when --input file does not exist", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input", "examples/does-not-exist.md"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes("Error: input file not found: examples/does-not-exist.md"));
});
