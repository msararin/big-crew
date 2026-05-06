function releaseCaptain(taskDescription, product, architecture, qa) {
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
    role: "Release Captain",
    objective: isSchemaValidation
      ? "Keep the D1 validation slice reviewable and recoverable before ship."
      : isRepoBootstrap
      ? "Keep the repo bootstrap slice reviewable and recoverable before ship."
      : hasHouseholdBoundary
      ? "Keep the D1 validation slice reviewable and recoverable before ship."
      : "Describe release readiness, reviewability, and recovery before ship.",
    releaseStatement: isSchemaValidation
      ? "Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check."
      : isRepoBootstrap
      ? "Keep the bootstrap release small, reviewable, and safe to hand off."
      : hasHouseholdBoundary
      ? "Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check."
      : "Keep the release small, reviewable, and recoverable.",
    notes: isSchemaValidation
      ? [
          "Treat this as validation/planning before implementation.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if household/member isolation is unproven.",
        ]
      : isRepoBootstrap
      ? [
          "Treat this as repo bootstrap before feature implementation.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if repo separation is unproven.",
        ]
      : hasHouseholdBoundary
      ? [
          "Treat this as validation/planning before implementation.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if household/member isolation is unproven.",
        ]
      : [
          "Require tests before merge.",
          "Identify the rollback path before shipping.",
        ],
    activitySummary: isSchemaValidation
      ? "requires tests to pass and blocks commit if household/member isolation is unproven."
      : isRepoBootstrap
      ? "keeps the bootstrap commit small and reviewable, with rollback/recovery in mind."
      : isPriorityReview
      ? "keeps readiness before implementation and blocks shipping until the slice is reviewable."
      : hasHouseholdBoundary
      ? "keeps the validation slice reviewable and blocks shipping until safety is proven."
      : "keeps the change reviewable, tested, and recoverable.",
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
  releaseCaptain,
};
