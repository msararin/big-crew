function releaseCaptain(taskDescription, product, architecture, qa) {
  const hasHouseholdBoundary = containsAny(taskDescription, [
    "household-aware sessions",
    "member-scoped medication",
    "household-scoped inventory",
    "Cloudflare D1",
    "SQL-backed data layer",
  ]);

  return {
    role: "Release Captain",
    objective: hasHouseholdBoundary
      ? "Keep the D1 validation slice reviewable and recoverable before ship."
      : "Describe release readiness, reviewability, and recovery before ship.",
    releaseStatement: hasHouseholdBoundary
      ? "Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check."
      : "Keep the release small, reviewable, and recoverable.",
    notes: hasHouseholdBoundary
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
