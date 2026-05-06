const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

test("CLI supports --input file path", () => {
  const repoRoot = path.resolve(__dirname, "..");
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
  assert.ok(result.stdout.includes("Build a small, safe proof of concept"));
  assert.ok(!result.stdout.includes("--input examples/input-d1-spike.md"));
});

test("CLI returns a clear error when --input is missing a file path", () => {
  const repoRoot = path.resolve(__dirname, "..");
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
  const repoRoot = path.resolve(__dirname, "..");
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
