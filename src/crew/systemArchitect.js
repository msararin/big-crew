function systemArchitect(taskDescription, product) {
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "System Architect",
    objective: hasHouseholdBoundary
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : "Define a simple structure that can be extended later.",
    boundaryStatement: hasHouseholdBoundary
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : "Keep responsibilities separated and avoid broad rewrites.",
    notes: hasHouseholdBoundary
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
