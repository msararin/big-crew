function systemArchitect(taskDescription, product) {
  const isRepoBootstrap = containsAny(taskDescription, [
    "Repo Bootstrap",
    "repo bootstrap",
    "standalone repository",
    "bootstrap a new repo",
    "maliwan-2",
  ]);
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "System Architect",
    objective: isRepoBootstrap
      ? "Define the standalone repo boundary and initial folder structure."
      : hasHouseholdBoundary
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : "Define a simple structure that can be extended later.",
    boundaryStatement: isRepoBootstrap
      ? "Keep maliwan-2 separate from Maliwan 1.0 and Big Crew; avoid copied runtime code; define folder boundaries and a D1 boundary."
      : hasHouseholdBoundary
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : "Keep responsibilities separated and avoid broad rewrites.",
    notes: isRepoBootstrap
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
  };
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  systemArchitect,
};
