function productStrategist(taskDescription) {
  const planningTask = containsAny(taskDescription, [
    "priorities",
    "planning/validation",
    "validation task",
    "priority mindset",
    "Maliwan 2.0",
  ]);
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "Product Strategist",
    objective: planningTask
      ? "Clarify operating priorities before implementation."
      : "Clarify the user value and the smallest useful outcome.",
    valueStatement: planningTask
      ? hasHouseholdBoundary
        ? "Big Crew should decide the first Maliwan 2.0 slice that proves the household/member boundary before implementation spreads."
        : "Big Crew should help decide the right first Maliwan 2.0 slice before any implementation starts."
      : "Clarify the user value and the smallest useful outcome.",
    priorityStatement: planningTask
      ? hasHouseholdBoundary
        ? "Prioritize D1 validation, household-aware sessions, and member-scoped medication, then defer household-scoped inventory and admin UI."
        : "Prioritize product value, quality, Codex quota efficiency, architecture learning, scope control, regression safety, and release readiness."
      : "Keep the scope narrow and testable.",
    inScopeStatement: planningTask
      ? hasHouseholdBoundary
        ? "Scope one validation/planning ticket around the household/member boundary and the first SQL-backed data layer."
        : "Scope the first decision-making slice, ticket split, and quality gates."
      : "Keep the scope narrow and testable.",
    deferStatement: planningTask
      ? hasHouseholdBoundary
        ? "Defer household-scoped inventory, full implementation, and admin UI."
        : "Defer full implementation, whole-system migration, and admin UI."
      : "Prefer the smallest workflow that still helps the user.",
    ticketSplitStatements: planningTask
      ? hasHouseholdBoundary
        ? [
            "1. Validate D1 schema for the household/member medication flow.",
            "2. Add JSON seed data for one household and two members: Rin and Benchawan.",
            "3. Define the repository boundary for household/member/medication data.",
            "4. Add medication read/log validation without migrating the whole runtime.",
            "5. Add regression tests for member-scoped medication isolation.",
            "6. Prepare the Codex implementation prompt for Ticket 1 only.",
          ]
        : [
            "1. Validate the smallest planning slice.",
            "2. Split the work into one implementation ticket.",
            "3. Define the first regression gate.",
          ]
      : [],
    notes: [
      "Keep the scope narrow and testable.",
      "Prefer the smallest workflow that still helps the user.",
    ],
  };
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  productStrategist,
};
