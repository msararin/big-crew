function systemArchitect(taskDescription, product) {
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
    role: "System Architect",
    objective: isSchemaValidation
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : isRepoBootstrap
      ? "Define the standalone repo boundary and initial folder structure."
      : hasHouseholdBoundary
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : "Define a simple structure that can be extended later.",
    boundaryStatement: isSchemaValidation
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : isRepoBootstrap
      ? "Keep maliwan-2 separate from Maliwan 1.0 and Big Crew; avoid copied runtime code; define folder boundaries and a D1 boundary."
      : hasHouseholdBoundary
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : "Keep responsibilities separated and avoid broad rewrites.",
    notes: isSchemaValidation
      ? [
          "Use Cloudflare D1 as the SQL-backed validation target.",
          "Keep a repository boundary between domain logic and D1.",
          "JSON seed data is acceptable for the early setup slice.",
        ]
      : isRepoBootstrap
      ? [
          "Use a repository pattern boundary for the bootstrap slice.",
          "Create app, orchestrator, domain, infrastructure, and tests folders.",
          "D1 schema placeholders and JSON seed placeholders are acceptable.",
        ]
      : hasHouseholdBoundary
      ? [
          "Use Cloudflare D1 as the SQL-backed validation target.",
          "Keep a repository boundary between domain logic and D1.",
          "JSON seed data is acceptable for the early setup slice.",
        ]
      : [
          "Keep the entry point thin.",
          "Separate orchestration from templates.",
        ],
    activitySummary: isSchemaValidation
      ? "separates D1 schema validation from repo bootstrap and keeps household_id, member_id, and line_user_id explicit."
      : isRepoBootstrap
      ? "separates the new repo from Maliwan 1.0 and Big Crew, with Worker/D1 placeholders and clear folder boundaries."
      : isPriorityReview
      ? "draws the architecture boundary so the first Maliwan 2.0 slice stays small and testable."
      : hasHouseholdBoundary
      ? "defines the household/member boundary and the first SQL-backed data layer."
      : "keeps the architecture boundaries clear and simple.",
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
  systemArchitect,
};
