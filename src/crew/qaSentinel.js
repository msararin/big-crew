function qaSentinel(taskDescription, product, architecture) {
  const heading = extractFirstHeading(taskDescription).toLowerCase();
  const isRepositoryContract = containsAny(taskDescription, [
    "Medication Repository Contract",
    "repository contract",
    "contract/interface slice",
  ]) || heading.includes("medication repository contract");
  const isSchemaValidation = !isRepositoryContract && (containsAny(taskDescription, [
    "D1 Schema Validation",
    "schema validation",
    "SQL-backed data boundary",
  ]) || heading.includes("d1 schema validation"));
  const isRepoBootstrap = containsAny(taskDescription, [
    "Repo Bootstrap",
    "repo bootstrap",
    "standalone repository",
    "bootstrap a new repo",
  ]) || heading.includes("repo bootstrap");
  const isMedicationReadHandler = !isRepositoryContract && !isSchemaValidation && !isRepoBootstrap && (containsAny(taskDescription, [
    "Medication Read Handler",
    "read-only medication schedule flow",
    "thin runtime wiring",
    "LINE handler",
    "เช็กยาวันนี้",
  ]) || heading.includes("medication read handler"));
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);
  const isPriorityReview = containsAny(taskDescription, [
    "prioritize first",
    "operating priorities",
    "priority mindset",
  ]);

  return {
    role: "QA Sentinel",
    objective: isSchemaValidation
      ? "Define the minimum regressions that must stay green for the D1 validation slice."
      : isRepositoryContract
      ? "Define the minimum regressions that must stay green for the repository contract slice."
      : isRepoBootstrap
      ? "Define the minimum regressions that must stay green for the repo bootstrap slice."
      : isMedicationReadHandler
      ? "Define the minimum regressions that must stay green for the read-only medication handler slice."
      : hasHouseholdBoundary
      ? "Define the minimum regressions that must stay green for the D1 validation slice."
      : "Define the minimum regressions that must stay green.",
    acceptanceStatement: isSchemaValidation
      ? "Prove the first Maliwan 2.0 slice keeps the household/member boundary intact, validates the SQL-backed data layer, and leaves inventory/admin UI deferred."
      : isRepositoryContract
      ? "Prove the repository contract exposes the correct member-scoped medication boundary without binding to D1 implementation details."
      : isRepoBootstrap
      ? "Prove the new repo boots, tests run, the README explains Maliwan 2.0 purpose, and placeholders exist without copying legacy runtime code."
      : isMedicationReadHandler
      ? "Prove the LINE-style handler routes 'เช็กยาวันนี้' to the orchestrator, resolves member context, and returns a reviewable response model."
      : hasHouseholdBoundary
      ? "Prove the first Maliwan 2.0 slice keeps the household/member boundary intact and validates the SQL-backed data layer without expanding scope."
      : "Use testable criteria, edge cases, and a regression gate before implementation.",
    notes: isSchemaValidation
      ? [
          "The D1 schema placeholder includes households, household_members, line_identities, medication_schedules, and medication_logs.",
          "The seed placeholder includes one household plus Rin and Benchawan.",
          "Medication data stays member-scoped and traceable through LINE identities.",
          "Inventory remains untouched in this slice.",
          "No admin UI is introduced.",
          "No full migration is performed.",
        ]
      : isRepositoryContract
      ? [
          "The repository contract exports the expected interface for member-scoped schedules and logs.",
          "The contract includes household_id, member_id, and line_user_id in its shape or documentation.",
          "No real D1 queries are implemented.",
          "No LINE runtime is introduced.",
          "Inventory and admin UI remain out of scope.",
        ]
      : isRepoBootstrap
      ? [
          "npm test passes.",
          "Skeleton imports do not fail.",
          "D1 schema placeholder exists.",
          "Seed data placeholder exists.",
          "No Maliwan 1.0 runtime code is copied.",
          "No Big Crew code is copied.",
          "No inventory/admin UI files are introduced.",
          "Inventory/admin UI are not implemented.",
        ]
      : isMedicationReadHandler
      ? [
          "The LINE-style handler routes 'เช็กยาวันนี้' to the orchestrator.",
          "The handler resolves the expected member context from seed-level mapping.",
          "The reply includes medication schedule text and suggested responses.",
          "Missing member context returns a safe fallback.",
          "No medication logging is introduced.",
          "No session engine is introduced.",
          "No inventory or admin UI is introduced.",
        ]
      : hasHouseholdBoundary
      ? [
          "Rin sees only Rin medication schedule.",
          "Benchawan sees only Benchawan medication schedule.",
          "Medication logs include household_id and member_id.",
          "Missing active_member_id returns a safe clarification response.",
          "Inventory remains untouched in this slice.",
          "No admin UI is introduced.",
          "No full migration is performed.",
        ]
      : [
          "Add a happy-path check and one negative-path check.",
          "Verify the generated package stays readable.",
        ],
    activitySummary: isSchemaValidation
      ? "requires tests for schema tables, seed data, and member-scoped medication isolation."
      : isRepositoryContract
      ? "requires contract-shape tests and keeps member-scoped medication isolated from D1 details."
      : isRepoBootstrap
      ? "requires smoke tests, placeholder checks, and no copied runtime code."
      : isMedicationReadHandler
      ? "requires handler smoke tests and safe fallback coverage."
      : isPriorityReview
      ? "defines the quality gates so Big Crew keeps the first slice safe and testable."
      : hasHouseholdBoundary
      ? "defines the quality gates for the household/member D1 validation slice."
      : "defines the minimum regressions that must stay green.",
    trace: {
      decision: isSchemaValidation
        ? "Prove schema and seed boundaries before runtime behavior."
        : isRepositoryContract
        ? "Prove the exported contract shape without real D1 queries."
      : isRepoBootstrap
      ? "Prove the skeleton imports and placeholders are present."
      : isMedicationReadHandler
      ? "Prove the handler wiring and reply model are correct."
      : isPriorityReview
      ? "Require quality gates before implementation starts."
      : "Lock the critical behavior with tests first.",
      middle: isSchemaValidation
        ? "Rin and Benchawan must not cross household boundaries."
        : isRepositoryContract
        ? "The contract must not drift into D1 runtime behavior."
      : isRepoBootstrap
      ? "Copied runtime code or missing placeholders would break the bootstrap proof."
      : isMedicationReadHandler
      ? "The handler must stay read-only and avoid accidental logging paths."
      : isPriorityReview
      ? "Avoid approving a slice without testable success criteria."
      : "Do not ship without clear regression coverage.",
      impact: isSchemaValidation
        ? "The work requires schema, seed, and isolation tests."
        : isRepositoryContract
        ? "The work requires contract-shape tests and identity guards."
      : isRepoBootstrap
      ? "The work requires skeleton smoke tests and placeholder checks."
      : isMedicationReadHandler
      ? "The work requires handler-level smoke tests and safe fallback checks."
      : isPriorityReview
      ? "The work gains a clearer quality gate."
      : "The package stays testable and bounded.",
    },
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
  qaSentinel,
};
