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
  const taskSummaryMatch = result.stdout.match(/## Task Summary\n([\s\S]*?)\n\n## Crew Activity Summary/);
  assert.ok(taskSummaryMatch, "expected to find the Task Summary section");

  const taskSummary = taskSummaryMatch[1];
  assert.ok(taskSummary.includes("Big Crew needs to clarify its operating priorities before helping build Maliwan 2.0."));
  assert.ok(taskSummary.includes("household/member boundary"));
  assert.ok(taskSummary.includes("Cloudflare D1"));
  assert.ok(taskSummary.includes("planning/validation task"));
  assert.ok(taskSummary.includes("one scoped validation/planning ticket"));
  assert.ok(!taskSummary.includes("## Context"));
  assert.ok(!taskSummary.includes("## Task"));
  assert.ok(taskSummary.length < 450);
  assert.equal(
    (result.stdout.match(/Big Crew needs to clarify its operating priorities before helping build Maliwan 2\.0\./g) || []).length,
    1
  );

  const crewSummaryMatch = result.stdout.match(/## Crew Activity Summary\n([\s\S]*?)\n\n## Product Value/);
  assert.ok(crewSummaryMatch, "expected to find the Crew Activity Summary section");
  assert.ok(crewSummaryMatch[1].includes("Product Strategist: frames the operating priorities"));
  assert.ok(crewSummaryMatch[1].includes("System Architect: draws the architecture boundary"));
  assert.ok(crewSummaryMatch[1].includes("QA Sentinel: defines the quality gates"));
  assert.ok(crewSummaryMatch[1].includes("Prompt Smith: keeps the prompt quota-aware"));
  assert.ok(crewSummaryMatch[1].includes("Release Captain: keeps readiness before implementation"));

  const productValueMatch = result.stdout.match(/## Product Value\n([\s\S]*?)\n\n## Priority/);
  assert.ok(productValueMatch, "expected to find the Product Value section");
  assert.ok(productValueMatch[1].includes("household/member boundary"));
  assert.ok(productValueMatch[1].includes("first Maliwan 2.0 slice"));
  assert.ok(!productValueMatch[1].includes("planning/validation task"));

  const priorityMatch = result.stdout.match(/## Priority\n([\s\S]*?)\n\n## Suggested Ticket Split/);
  assert.ok(priorityMatch, "expected to find the Priority section");
  assert.ok(priorityMatch[1].includes("Prioritize D1 validation, household-aware sessions, and member-scoped medication"));
  assert.ok(priorityMatch[1].includes("defer household-scoped inventory and admin UI"));

  const ticketSplitMatch = result.stdout.match(/## Suggested Ticket Split\n([\s\S]*?)\n\n## In Scope/);
  assert.ok(ticketSplitMatch, "expected to find the Suggested Ticket Split section");
  assert.ok(ticketSplitMatch[1].includes("Validate D1 schema for the household/member medication flow"));
  assert.ok(ticketSplitMatch[1].includes("Add JSON seed data for one household and two members: Rin and Benchawan"));
  assert.ok(ticketSplitMatch[1].includes("Prepare the Codex implementation prompt for Ticket 1 only"));

  const architectureMatch = result.stdout.match(/## Architecture Impact\n([\s\S]*?)\n\n## Acceptance Criteria/);
  assert.ok(architectureMatch, "expected to find the Architecture Impact section");
  assert.ok(architectureMatch[1].includes("household/member boundary"));
  assert.ok(architectureMatch[1].includes("household_id"));
  assert.ok(architectureMatch[1].includes("member_id"));
  assert.ok(architectureMatch[1].includes("line_user_id"));
  assert.ok(architectureMatch[1].includes("member-scoped medication"));
  assert.ok(architectureMatch[1].includes("first SQL-backed data layer"));
  assert.ok(architectureMatch[1].includes("admin UI"));
  assert.ok(architectureMatch[1].includes("repository boundary"));
  assert.ok(architectureMatch[1].includes("JSON seed data"));

  const acceptanceMatch = result.stdout.match(/## Acceptance Criteria\n([\s\S]*?)\n\n## Regression Tests/);
  assert.ok(acceptanceMatch, "expected to find the Acceptance Criteria section");
  assert.ok(acceptanceMatch[1].includes("household/member boundary"));
  assert.ok(acceptanceMatch[1].includes("SQL-backed data layer"));
  assert.ok(acceptanceMatch[1].includes("Inventory remains untouched in this slice."));
  assert.ok(acceptanceMatch[1].includes("household/member boundary intact"));

  const regressionMatch = result.stdout.match(/## Regression Tests\n([\s\S]*?)\n\n## Codex-Ready Prompt/);
  assert.ok(regressionMatch, "expected to find the Regression Tests section");
  assert.ok(regressionMatch[1].includes("Rin sees only Rin medication schedule."));
  assert.ok(regressionMatch[1].includes("Benchawan sees only Benchawan medication schedule."));
  assert.ok(regressionMatch[1].includes("Medication logs include household_id and member_id."));
  assert.ok(regressionMatch[1].includes("Missing active_member_id returns a safe clarification response."));
  assert.ok(regressionMatch[1].includes("Inventory remains untouched in this slice."));
  assert.ok(!regressionMatch[1].includes("## Context"));

  const promptMatch = result.stdout.match(/## Codex-Ready Prompt\n([\s\S]*?)\n\n## Definition of Done/);
  assert.ok(promptMatch, "expected to find the Codex-Ready Prompt section");
  assert.ok(promptMatch[1].includes("one Codex-ready validation/planning ticket"));
  assert.ok(promptMatch[1].includes("Implement only the D1 validation/planning slice"));
  assert.ok(promptMatch[1].includes("Do not migrate the whole Maliwan runtime"));
  assert.ok(promptMatch[1].includes("Do not touch inventory"));
  assert.ok(promptMatch[1].includes("Do not build admin UI"));
  assert.ok(promptMatch[1].includes("Add or document minimal D1 schema"));
  assert.ok(promptMatch[1].includes("Add or document seed data for one household with Rin and Benchawan"));
  assert.ok(promptMatch[1].includes("Add verification/tests for member-scoped medication isolation"));

  const releaseMatch = result.stdout.match(/## Release Captain\n([\s\S]*?)\n\n## Notes/);
  assert.ok(releaseMatch, "expected to find the Release Captain section");
  assert.ok(releaseMatch[1].includes("validation/planning before implementation"));
  assert.ok(releaseMatch[1].includes("rollback/recovery path"));
  assert.ok(releaseMatch[1].includes("Do not ship if household/member isolation is unproven"));
});

test("CLI generates repo bootstrap output for a standalone maliwan-2 repository", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input", "inputs/maliwan-2/repo-bootstrap.md"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 0);

  const taskSummaryMatch = result.stdout.match(/## Task Summary\n([\s\S]*?)\n\n## Crew Activity Summary/);
  assert.ok(taskSummaryMatch, "expected to find the Task Summary section");
  assert.ok(taskSummaryMatch[1].includes("Maliwan 2.0 Repo Bootstrap"));
  assert.ok(taskSummaryMatch[1].includes("standalone maliwan-2 repository"));
  assert.ok(taskSummaryMatch[1].includes("Cloudflare Worker + D1 skeleton"));
  assert.ok(taskSummaryMatch[1].includes("member-scoped medication"));
  assert.ok(taskSummaryMatch[1].includes("Do not copy runtime code"));
  assert.ok(!taskSummaryMatch[1].includes("D1 Schema Validation"));

  const crewSummaryMatch = result.stdout.match(/## Crew Activity Summary\n([\s\S]*?)\n\n## Product Value/);
  assert.ok(crewSummaryMatch, "expected to find the Crew Activity Summary section");
  assert.ok(crewSummaryMatch[1].includes("Product Strategist: frames this as a clean standalone repo boundary"));
  assert.ok(crewSummaryMatch[1].includes("System Architect: separates the new repo from Maliwan 1.0 and Big Crew"));
  assert.ok(crewSummaryMatch[1].includes("QA Sentinel: requires smoke tests, placeholder checks, and no copied runtime code"));
  assert.ok(crewSummaryMatch[1].includes("Prompt Smith: scopes the Codex prompt to repo bootstrap only with no feature implementation"));
  assert.ok(crewSummaryMatch[1].includes("Release Captain: keeps the bootstrap commit small and reviewable"));

  const productValueMatch = result.stdout.match(/## Product Value\n([\s\S]*?)\n\n## Priority/);
  assert.ok(productValueMatch, "expected to find the Product Value section");
  assert.ok(productValueMatch[1].includes("clean standalone repository boundary"));
  assert.ok(productValueMatch[1].includes("separate from Maliwan 1.0 and Big Crew"));

  const priorityMatch = result.stdout.match(/## Priority\n([\s\S]*?)\n\n## Suggested Ticket Split/);
  assert.ok(priorityMatch, "expected to find the Priority section");
  assert.ok(priorityMatch[1].includes("standalone repo skeleton and architecture boundary"));
  assert.ok(priorityMatch[1].includes("Defer runtime feature implementation, inventory, and admin UI"));

  const ticketSplitMatch = result.stdout.match(/## Suggested Ticket Split\n([\s\S]*?)\n\n## In Scope/);
  assert.ok(ticketSplitMatch, "expected to find the Suggested Ticket Split section");
  assert.ok(ticketSplitMatch[1].includes("Initialize the standalone maliwan-2 repo structure."));
  assert.ok(ticketSplitMatch[1].includes("Create a README with product and architecture intent."));
  assert.ok(ticketSplitMatch[1].includes("Create a minimal Node / Cloudflare Worker project skeleton."));
  assert.ok(ticketSplitMatch[1].includes("Add folder boundaries for app, orchestrator, domain, infrastructure, and tests."));
  assert.ok(ticketSplitMatch[1].includes("Add a D1 schema draft or migration placeholder."));
  assert.ok(ticketSplitMatch[1].includes("Add a JSON seed data placeholder for one household with Rin and Benchawan."));
  assert.ok(ticketSplitMatch[1].includes("Add a smoke test for the project skeleton."));
  assert.ok(ticketSplitMatch[1].includes("Prepare the Codex prompt for repo bootstrap only."));

  const architectureMatch = result.stdout.match(/## Architecture Impact\n([\s\S]*?)\n\n## Acceptance Criteria/);
  assert.ok(architectureMatch, "expected to find the Architecture Impact section");
  assert.ok(architectureMatch[1].includes("repo boundary"));
  assert.ok(architectureMatch[1].includes("folder boundaries"));
  assert.ok(architectureMatch[1].includes("D1 boundary"));
  assert.ok(architectureMatch[1].includes("repository pattern"));
  assert.ok(architectureMatch[1].includes("copied runtime code"));

  const acceptanceMatch = result.stdout.match(/## Acceptance Criteria\n([\s\S]*?)\n\n## Regression Tests/);
  assert.ok(acceptanceMatch, "expected to find the Acceptance Criteria section");
  assert.ok(acceptanceMatch[1].includes("npm test passes"));
  assert.ok(acceptanceMatch[1].includes("README explains Maliwan 2.0 purpose"));
  assert.ok(acceptanceMatch[1].includes("No Maliwan 1.0 runtime code is copied."));
  assert.ok(acceptanceMatch[1].includes("No Big Crew code is copied."));
  assert.ok(acceptanceMatch[1].includes("D1 schema placeholder exists"));
  assert.ok(acceptanceMatch[1].includes("Inventory/admin UI are not implemented."));

  const regressionMatch = result.stdout.match(/## Regression Tests\n([\s\S]*?)\n\n## Codex-Ready Prompt/);
  assert.ok(regressionMatch, "expected to find the Regression Tests section");
  assert.ok(regressionMatch[1].includes("npm test passes"));
  assert.ok(regressionMatch[1].includes("Skeleton imports do not fail."));
  assert.ok(regressionMatch[1].includes("D1 schema placeholder exists."));
  assert.ok(regressionMatch[1].includes("Seed data placeholder exists."));
  assert.ok(regressionMatch[1].includes("No inventory/admin UI files are introduced."));

  const promptMatch = result.stdout.match(/## Codex-Ready Prompt\n([\s\S]*?)\n\n## Definition of Done/);
  assert.ok(promptMatch, "expected to find the Codex-Ready Prompt section");
  assert.ok(promptMatch[1].includes("Turn the repo bootstrap slice into a clear work package request."));
  assert.ok(promptMatch[1].includes("Create one Codex-ready prompt for bootstrapping the new maliwan-2 repository skeleton only."));
  assert.ok(promptMatch[1].includes("Create the standalone repo skeleton only."));
  assert.ok(promptMatch[1].includes("Do not implement medication runtime logic yet."));
  assert.ok(promptMatch[1].includes("Do not copy Maliwan 1.0 runtime code."));
  assert.ok(promptMatch[1].includes("Do not copy Big Crew runtime code."));
});

test("CLI generates schema validation output for the maliwan-2 D1 boundary slice", () => {
  const result = spawnSync(
    process.execPath,
    ["src/index.js", "--input", "inputs/maliwan-2/d1-schema-validation.md"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );

  assert.equal(result.status, 0);

  const taskSummaryMatch = result.stdout.match(/## Task Summary\n([\s\S]*?)\n\n## Crew Activity Summary/);
  assert.ok(taskSummaryMatch, "expected to find the Task Summary section");
  assert.ok(taskSummaryMatch[1].includes("Maliwan 2.0 D1 Schema Validation"));
  assert.ok(taskSummaryMatch[1].includes("household_id, member_id, and line_user_id"));
  assert.ok(taskSummaryMatch[1].includes("Malaithong household"));
  assert.ok(taskSummaryMatch[1].includes("Rin and Benchawan"));
  assert.ok(taskSummaryMatch[1].includes("schema validation task"));
  assert.ok(taskSummaryMatch[1].includes("not runtime implementation"));
  assert.ok(!taskSummaryMatch[1].includes("Maliwan 2.0 Repo Bootstrap"));

  const crewSummaryMatch = result.stdout.match(/## Crew Activity Summary\n([\s\S]*?)\n\n## Product Value/);
  assert.ok(crewSummaryMatch, "expected to find the Crew Activity Summary section");
  assert.ok(crewSummaryMatch[1].includes("Product Strategist: frames this as a schema validation slice"));
  assert.ok(crewSummaryMatch[1].includes("System Architect: separates D1 schema validation from repo bootstrap"));
  assert.ok(crewSummaryMatch[1].includes("QA Sentinel: requires tests for schema tables, seed data, and member-scoped medication isolation"));
  assert.ok(crewSummaryMatch[1].includes("Prompt Smith: scopes the Codex prompt to Ticket 1 only"));
  assert.ok(crewSummaryMatch[1].includes("Release Captain: requires tests to pass and blocks commit if household/member isolation is unproven"));

  const productValueMatch = result.stdout.match(/## Product Value\n([\s\S]*?)\n\n## Priority/);
  assert.ok(productValueMatch, "expected to find the Product Value section");
  assert.ok(productValueMatch[1].includes("member-scoped medication"));
  assert.ok(productValueMatch[1].includes("Malaithong household"));
  assert.ok(productValueMatch[1].includes("Rin and Benchawan"));

  const priorityMatch = result.stdout.match(/## Priority\n([\s\S]*?)\n\n## Suggested Ticket Split/);
  assert.ok(priorityMatch, "expected to find the Priority section");
  assert.ok(priorityMatch[1].includes("household/member/LINE identity boundary"));
  assert.ok(priorityMatch[1].includes("defer inventory and admin UI"));

  const ticketSplitMatch = result.stdout.match(/## Suggested Ticket Split\n([\s\S]*?)\n\n## In Scope/);
  assert.ok(ticketSplitMatch, "expected to find the Suggested Ticket Split section");
  assert.ok(ticketSplitMatch[1].includes("Draft D1 tables and constraints for households, household_members, line_identities, medication_schedules, and medication_logs."));
  assert.ok(ticketSplitMatch[1].includes("Add seed data for the Malaithong household with Rin and Benchawan."));
  assert.ok(ticketSplitMatch[1].includes("Prepare the Codex prompt for the schema-validation ticket only."));

  const architectureMatch = result.stdout.match(/## Architecture Impact\n([\s\S]*?)\n\n## Acceptance Criteria/);
  assert.ok(architectureMatch, "expected to find the Architecture Impact section");
  assert.ok(architectureMatch[1].includes("household_id"));
  assert.ok(architectureMatch[1].includes("member_id"));
  assert.ok(architectureMatch[1].includes("line_user_id"));
  assert.ok(architectureMatch[1].includes("member-scoped medication"));
  assert.ok(architectureMatch[1].includes("household-scoped inventory"));
  assert.ok(architectureMatch[1].includes("repository boundary"));
  assert.ok(architectureMatch[1].includes("Cloudflare D1"));

  const acceptanceMatch = result.stdout.match(/## Acceptance Criteria\n([\s\S]*?)\n\n## Regression Tests/);
  assert.ok(acceptanceMatch, "expected to find the Acceptance Criteria section");
  assert.ok(acceptanceMatch[1].includes("household/member boundary intact"));
  assert.ok(acceptanceMatch[1].includes("SQL-backed data layer"));
  assert.ok(acceptanceMatch[1].includes("households, household_members, line_identities, medication_schedules, and medication_logs"));
  assert.ok(acceptanceMatch[1].includes("one household plus Rin and Benchawan"));
  assert.ok(acceptanceMatch[1].includes("Inventory remains untouched in this slice."));
  assert.ok(acceptanceMatch[1].includes("No admin UI is introduced."));

  const regressionMatch = result.stdout.match(/## Regression Tests\n([\s\S]*?)\n\n## Codex-Ready Prompt/);
  assert.ok(regressionMatch, "expected to find the Regression Tests section");
  assert.ok(regressionMatch[1].includes("households, household_members, line_identities, medication_schedules, and medication_logs"));
  assert.ok(regressionMatch[1].includes("Rin"));
  assert.ok(regressionMatch[1].includes("Benchawan"));
  assert.ok(regressionMatch[1].includes("Inventory remains untouched in this slice."));
  assert.ok(regressionMatch[1].includes("No admin UI is introduced."));

  const promptMatch = result.stdout.match(/## Codex-Ready Prompt\n([\s\S]*?)\n\n## Definition of Done/);
  assert.ok(promptMatch, "expected to find the Codex-Ready Prompt section");
  assert.ok(promptMatch[1].includes("Create one Codex-ready prompt for validating the D1 schema for the Malaithong household only."));
  assert.ok(promptMatch[1].includes("Implement only the D1 validation/planning slice."));
  assert.ok(promptMatch[1].includes("Do not migrate the whole Maliwan runtime."));
  assert.ok(promptMatch[1].includes("Add or document minimal D1 schema for households, household_members, line_identities, medication_schedules, and medication_logs."));
  assert.ok(promptMatch[1].includes("Add or document seed data for one household with Rin and Benchawan."));
  assert.ok(promptMatch[1].includes("Add verification/tests for member-scoped medication isolation."));

  const releaseMatch = result.stdout.match(/## Release Captain\n([\s\S]*?)\n\n## Notes/);
  assert.ok(releaseMatch, "expected to find the Release Captain section");
  assert.ok(releaseMatch[1].includes("validation/planning before implementation"));
  assert.ok(releaseMatch[1].includes("rollback/recovery path"));
  assert.ok(releaseMatch[1].includes("Do not ship if household/member isolation is unproven"));
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
