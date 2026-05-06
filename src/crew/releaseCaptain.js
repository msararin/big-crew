function releaseCaptain(taskDescription, product, architecture, qa) {
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
    role: "Release Captain",
    objective: isRepoBootstrap
      ? "Keep the repo bootstrap slice reviewable and recoverable before ship."
      : hasHouseholdBoundary
      ? "Keep the D1 validation slice reviewable and recoverable before ship."
      : "Describe release readiness, reviewability, and recovery before ship.",
    releaseStatement: isRepoBootstrap
      ? "Keep the bootstrap release small, reviewable, and safe to hand off."
      : hasHouseholdBoundary
      ? "Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check."
      : "Keep the release small, reviewable, and recoverable.",
    notes: isRepoBootstrap
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
  };
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => String(text || "").includes(keyword));
}

module.exports = {
  releaseCaptain,
};
