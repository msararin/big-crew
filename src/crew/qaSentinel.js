function qaSentinel(taskDescription, product, architecture) {
  const heading = extractFirstHeading(taskDescription).toLowerCase();
  const isSchemaValidation = containsAny(taskDescription, [
    "D1 Schema Validation",
    "schema validation",
    "SQL-backed data boundary",
  ]) || heading.includes("d1 schema validation");
  const isRepoBootstrap = containsAny(taskDescription, [
    "Repo Bootstrap",
    "repo bootstrap",
    "standalone repository",
    "bootstrap a new repo",
  ]) || heading.includes("repo bootstrap");
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
      : isRepoBootstrap
      ? "Define the minimum regressions that must stay green for the repo bootstrap slice."
      : hasHouseholdBoundary
      ? "Define the minimum regressions that must stay green for the D1 validation slice."
      : "Define the minimum regressions that must stay green.",
    acceptanceStatement: isSchemaValidation
      ? "Prove the first Maliwan 2.0 slice keeps the household/member boundary intact, validates the SQL-backed data layer, and leaves inventory/admin UI deferred."
      : isRepoBootstrap
      ? "Prove the new repo boots, tests run, the README explains Maliwan 2.0 purpose, and placeholders exist without copying legacy runtime code."
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
      : isRepoBootstrap
      ? "requires smoke tests, placeholder checks, and no copied runtime code."
      : isPriorityReview
      ? "defines the quality gates so Big Crew keeps the first slice safe and testable."
      : hasHouseholdBoundary
      ? "defines the quality gates for the household/member D1 validation slice."
      : "defines the minimum regressions that must stay green.",
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
