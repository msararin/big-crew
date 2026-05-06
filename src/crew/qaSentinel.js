function qaSentinel(taskDescription, product, architecture) {
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "QA Sentinel",
    objective: hasHouseholdBoundary
      ? "Define the minimum regressions that must stay green for the D1 validation slice."
      : "Define the minimum regressions that must stay green.",
    acceptanceStatement: hasHouseholdBoundary
      ? "Prove the first Maliwan 2.0 slice keeps the household/member boundary intact and validates the SQL-backed data layer without expanding scope."
      : "Use testable criteria, edge cases, and a regression gate before implementation.",
    notes: hasHouseholdBoundary
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
