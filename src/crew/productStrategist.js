function productStrategist(taskDescription) {
  const heading = extractFirstHeading(taskDescription).toLowerCase();
  const isSchemaValidation = containsAny(taskDescription, [
    "D1 Schema Validation",
    "schema validation",
    "SQL-backed data boundary",
  ]) || heading.includes("d1 schema validation");
  const isRepoBootstrap = containsAny(taskDescription, [
    "Repo Bootstrap",
    "repo bootstrap",
    "bootstrapping a new repo",
    "bootstrap a new repo",
  ]) || heading.includes("repo bootstrap");
  const planningTask = containsAny(taskDescription, [
    "priorities",
    "planning/validation",
    "validation task",
    "priority mindset",
    "Maliwan 2.0",
  ]);
  const isPriorityReview = containsAny(taskDescription, [
    "prioritize first",
    "operating priorities",
    "priority mindset",
  ]);
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "Product Strategist",
    objective: isSchemaValidation
      ? "Clarify the first schema-validation slice before implementation."
      : isRepoBootstrap
      ? "Define the repo bootstrap goal and protect the standalone boundary."
      : planningTask
      ? "Clarify operating priorities before implementation."
      : "Clarify the user value and the smallest useful outcome.",
    valueStatement: isSchemaValidation
      ? "A reliable D1 schema keeps member-scoped medication safe for the Malaithong household and prevents Rin and Benchawan from being mixed in later runtime work."
      : isRepoBootstrap
      ? "A clean standalone repository boundary keeps maliwan-2 separate from Maliwan 1.0 and Big Crew, so the new system can evolve without inherited coupling."
      : planningTask
      ? hasHouseholdBoundary
        ? "Big Crew should decide the first Maliwan 2.0 slice that proves the household/member boundary before implementation spreads."
        : "Big Crew should help decide the right first Maliwan 2.0 slice before any implementation starts."
      : "Clarify the user value and the smallest useful outcome.",
    priorityStatement: isSchemaValidation
      ? "Prioritize validating the household/member/LINE identity boundary and the D1 schema before runtime work; defer inventory and admin UI."
      : isRepoBootstrap
      ? "Prioritize the standalone repo skeleton and architecture boundary before feature implementation."
      : planningTask
      ? hasHouseholdBoundary
        ? "Prioritize D1 validation, household-aware sessions, and member-scoped medication, then defer household-scoped inventory and admin UI."
        : "Prioritize product value, quality, Codex quota efficiency, architecture learning, scope control, regression safety, and release readiness."
      : "Keep the scope narrow and testable.",
    inScopeStatement: isSchemaValidation
      ? "Scope the D1 schema draft, seed data, and boundary tests for the first member-scoped medication slice."
      : isRepoBootstrap
      ? "Scope the repo bootstrap slice: initialize the skeleton, README, folder boundaries, and D1 placeholders."
      : planningTask
      ? hasHouseholdBoundary
        ? "Scope one validation/planning ticket around the household/member boundary and the first SQL-backed data layer."
        : "Scope the first decision-making slice, ticket split, and quality gates."
      : "Keep the scope narrow and testable.",
    deferStatement: isSchemaValidation
      ? "Defer runtime medication behavior, inventory, and admin UI."
      : isRepoBootstrap
      ? "Defer runtime feature implementation, inventory, and admin UI."
      : planningTask
      ? hasHouseholdBoundary
        ? "Defer household-scoped inventory, full implementation, and admin UI."
        : "Defer full implementation, whole-system migration, and admin UI."
      : "Prefer the smallest workflow that still helps the user.",
    outOfScopeStatements: isRepoBootstrap
      ? [
          "Do not copy Maliwan 1.0 runtime code.",
          "Do not mix Big Crew code into maliwan-2.",
          "Do not implement inventory yet.",
          "Do not build admin UI.",
          "Do not migrate the whole system.",
        ]
      : isSchemaValidation
      ? [
          "Do not implement LINE webhook runtime.",
          "Do not implement medication read runtime.",
          "Do not implement medication log runtime.",
          "Do not implement inventory.",
          "Do not build admin UI.",
          "Do not copy Maliwan 1.0 runtime code.",
          "Do not copy Big Crew runtime code.",
        ]
      : [],
    ticketSplitStatements: isRepoBootstrap
      ? [
          "1. Initialize the standalone maliwan-2 repo structure.",
          "2. Create a README with product and architecture intent.",
          "3. Create a minimal Node / Cloudflare Worker project skeleton.",
          "4. Add folder boundaries for app, orchestrator, domain, infrastructure, and tests.",
          "5. Add a D1 schema draft or migration placeholder.",
          "6. Add a JSON seed data placeholder for one household with Rin and Benchawan.",
          "7. Add a smoke test for the project skeleton.",
          "8. Prepare the Codex prompt for repo bootstrap only.",
        ]
      : isSchemaValidation
      ? [
          "1. Draft D1 tables and constraints for households, household_members, line_identities, medication_schedules, and medication_logs.",
          "2. Add seed data for the Malaithong household with Rin and Benchawan.",
          "3. Define the repository boundary between domain logic and D1.",
          "4. Add schema and seed validation tests.",
          "5. Prepare the Codex prompt for the schema-validation ticket only.",
        ]
      : planningTask
      ? hasHouseholdBoundary
        ? [
            "1. Validate D1 schema for the household/member medication flow.",
            "2. Add JSON seed data for one household and two members: Rin and Benchawan.",
            "3. Define the repository boundary for household/member/medication data.",
            "4. Add medication read/log validation without migrating the whole runtime.",
            "5. Add regression tests for member-scoped medication isolation.",
            "6. Prepare the Codex implementation prompt for Ticket 1 only.",
          ]
        : [
            "1. Validate the smallest planning slice.",
            "2. Split the work into one implementation ticket.",
            "3. Define the first regression gate.",
          ]
      : [],
    notes: isSchemaValidation
      ? [
          "Use the Malaithong household and Rin/Benchawan as the validation seed.",
          "Keep the schema ready for future LINE identity mapping.",
        ]
      : [
          "Keep the scope narrow and testable.",
          "Prefer the smallest workflow that still helps the user.",
        ],
    activitySummary: isSchemaValidation
      ? "frames this as a schema validation slice that protects senior-friendly family care and medication data safety from household/member mix-ups."
      : isRepoBootstrap
      ? "frames this as a clean standalone repo boundary so maliwan-2 stays separate from Maliwan 1.0 and Big Crew."
      : isPriorityReview
      ? "frames the operating priorities so Big Crew can choose the first useful Maliwan 2.0 slice before implementation."
      : planningTask
      ? "clarifies the user value and the smallest useful outcome before implementation."
      : "clarifies the user value and the smallest useful outcome.",
  };
}

function extractFirstHeading(text) {
  const match = String(text || "").match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  productStrategist,
};
