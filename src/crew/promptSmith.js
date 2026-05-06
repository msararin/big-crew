function promptSmith(taskDescription, product, architecture) {
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "Prompt Smith",
    objective: hasHouseholdBoundary
      ? "Turn the D1 validation slice into a clear work package request."
      : "Turn the task into a clear work package request.",
    promptStatement: hasHouseholdBoundary
      ? "Create one Codex-ready validation/planning ticket for the Maliwan 2.0 household/member boundary and the first SQL-backed data layer."
      : "Create a Codex-ready prompt for one scoped ticket only.",
    notes: hasHouseholdBoundary
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
