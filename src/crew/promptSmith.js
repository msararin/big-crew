function promptSmith(taskDescription, product, architecture) {
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
    role: "Prompt Smith",
    objective: isSchemaValidation
      ? "Turn the schema-validation slice into a clear work package request."
      : isRepoBootstrap
      ? "Turn the repo bootstrap slice into a clear work package request."
      : hasHouseholdBoundary
      ? "Turn the D1 validation slice into a clear work package request."
      : "Turn the task into a clear work package request.",
    promptStatement: isSchemaValidation
      ? "Create one Codex-ready prompt for validating the D1 schema for the Malaithong household only."
      : isRepoBootstrap
      ? "Create one Codex-ready prompt for bootstrapping the new maliwan-2 repository skeleton only."
      : hasHouseholdBoundary
      ? "Create one Codex-ready validation/planning ticket for the Maliwan 2.0 household/member boundary and the first SQL-backed data layer."
      : "Create a Codex-ready prompt for one scoped ticket only.",
    notes: isSchemaValidation
      ? [
          "Implement only the D1 validation/planning slice.",
          "Do not migrate the whole Maliwan runtime.",
          "Do not touch inventory.",
          "Do not build admin UI.",
          "Do not refactor the whole LINE webhook.",
          "Add or document minimal D1 schema for households, household_members, line_identities, medication_schedules, and medication_logs.",
          "Add or document seed data for one household with Rin and Benchawan.",
          "Add verification/tests for member-scoped medication isolation.",
        ]
      : isRepoBootstrap
      ? [
          "Create the standalone repo skeleton only.",
          "Do not implement medication runtime logic yet.",
          "Do not copy Maliwan 1.0 runtime code.",
          "Do not copy Big Crew runtime code.",
          "Keep inventory and admin UI deferred.",
          "Add minimal D1 placeholders and seed-data placeholders.",
        ]
      : hasHouseholdBoundary
      ? [
          "Implement only the D1 validation/planning slice.",
          "Do not migrate the whole Maliwan runtime.",
          "Do not touch inventory.",
          "Do not build admin UI.",
          "Do not refactor the whole LINE webhook.",
          "Add or document minimal D1 schema for households, household_members, line_identities, medication_schedules, and medication_logs.",
          "Add or document seed data for one household with Rin and Benchawan.",
          "Add verification/tests for member-scoped medication isolation.",
        ]
      : [
          "Use concise markdown headings.",
          "Avoid AI-provider-specific language.",
        ],
    activitySummary: isSchemaValidation
      ? "scopes the Codex prompt to Ticket 1 only and excludes runtime, inventory, admin UI, and full migration."
      : isRepoBootstrap
      ? "scopes the Codex prompt to repo bootstrap only with no feature implementation."
      : isPriorityReview
      ? "keeps the prompt quota-aware and scoped to one validation/planning ticket."
      : hasHouseholdBoundary
      ? "scopes a single validation/planning ticket and keeps the prompt narrow."
      : "scopes the task into one Codex-ready prompt.",
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
  promptSmith,
};
