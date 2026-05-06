function qaSentinel(taskDescription, product, architecture) {
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
    role: "QA Sentinel",
    objective: isRepoBootstrap
      ? "Define the minimum regressions that must stay green for the repo bootstrap slice."
      : hasHouseholdBoundary
      ? "Define the minimum regressions that must stay green for the D1 validation slice."
      : "Define the minimum regressions that must stay green.",
    acceptanceStatement: isRepoBootstrap
      ? "Prove the new repo boots, tests run, the README explains Maliwan 2.0 purpose, and placeholders exist without copying legacy runtime code."
      : hasHouseholdBoundary
      ? "Prove the first Maliwan 2.0 slice keeps the household/member boundary intact and validates the SQL-backed data layer without expanding scope."
      : "Use testable criteria, edge cases, and a regression gate before implementation.",
    notes: isRepoBootstrap
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
  };
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  qaSentinel,
};
