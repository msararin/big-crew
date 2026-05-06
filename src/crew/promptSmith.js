function promptSmith(taskDescription, product, architecture) {
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
    role: "Prompt Smith",
    objective: isRepoBootstrap
      ? "Turn the repo bootstrap slice into a clear work package request."
      : hasHouseholdBoundary
      ? "Turn the D1 validation slice into a clear work package request."
      : "Turn the task into a clear work package request.",
    promptStatement: isRepoBootstrap
      ? "Create one Codex-ready prompt for bootstrapping the new maliwan-2 repository skeleton only."
      : hasHouseholdBoundary
      ? "Create one Codex-ready validation/planning ticket for the Maliwan 2.0 household/member boundary and the first SQL-backed data layer."
      : "Create a Codex-ready prompt for one scoped ticket only.",
    notes: isRepoBootstrap
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
  };
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  promptSmith,
};
