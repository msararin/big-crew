function releaseCaptain(taskDescription, product, architecture, qa) {
  const heading = extractFirstHeading(taskDescription).toLowerCase();
  const isRepositoryContract = containsAny(taskDescription, [
    "Medication Repository Contract",
    "repository contract",
    "contract/interface slice",
  ]) || heading.includes("medication repository contract");
  const isSchemaValidation = !isRepositoryContract && (containsAny(taskDescription, [
    "D1 Schema Validation",
    "schema validation",
    "SQL-backed data boundary",
  ]) || heading.includes("d1 schema validation"));
  const isRepoBootstrap = containsAny(taskDescription, [
    "Repo Bootstrap",
    "repo bootstrap",
    "standalone repository",
    "bootstrap a new repo",
  ]) || heading.includes("repo bootstrap");
  const isMedicationReadHandler = !isRepositoryContract && !isSchemaValidation && !isRepoBootstrap && (containsAny(taskDescription, [
    "Medication Read Handler",
    "read-only medication schedule flow",
    "thin runtime wiring",
    "LINE handler",
    "เช็กยาวันนี้",
  ]) || heading.includes("medication read handler"));
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
      : isRepositoryContract
      ? "Keep the repository contract slice reviewable and recoverable before ship."
      : isRepoBootstrap
      ? "Keep the repo bootstrap slice reviewable and recoverable before ship."
      : isMedicationReadHandler
      ? "Keep the read-only handler slice reviewable and recoverable before ship."
      : hasHouseholdBoundary
      ? "Keep the D1 validation slice reviewable and recoverable before ship."
      : "Describe release readiness, reviewability, and recovery before ship.",
    releaseStatement: isSchemaValidation
      ? "Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check."
      : isRepositoryContract
      ? "Keep the release small, reviewable, and safe to hand off while the repository boundary is being defined."
      : isRepoBootstrap
      ? "Keep the bootstrap release small, reviewable, and safe to hand off."
      : isMedicationReadHandler
      ? "Keep the handler release small, reviewable, and safe to hand off."
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
      : isRepositoryContract
      ? [
          "Treat this as a contract slice before runtime implementation.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if the contract shape is unclear or too coupled to D1.",
        ]
      : isRepoBootstrap
      ? [
          "Treat this as repo bootstrap before feature implementation.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if repo separation is unproven.",
        ]
      : isMedicationReadHandler
      ? [
          "Treat this as thin runtime wiring before adding more LINE behavior.",
          "Require tests before merge.",
          "Identify the rollback/recovery path before shipping.",
          "Do not ship if the handler flow is not read-only.",
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
      : isRepositoryContract
      ? "requires contract tests and blocks ship if the boundary is too coupled to D1."
      : isRepoBootstrap
      ? "keeps the bootstrap commit small and reviewable, with rollback/recovery in mind."
      : isMedicationReadHandler
      ? "keeps the handler wiring small, reviewable, and reversible."
      : isPriorityReview
      ? "keeps readiness before implementation and blocks shipping until the slice is reviewable."
      : hasHouseholdBoundary
      ? "keeps the validation slice reviewable and blocks shipping until safety is proven."
      : "keeps the change reviewable, tested, and recoverable.",
    trace: {
      decision: isSchemaValidation
        ? "Require proof of household/member isolation before ship."
        : isRepositoryContract
        ? "Require proof that the contract is not too coupled to D1."
      : isRepoBootstrap
      ? "Keep the release small and reviewable."
      : isMedicationReadHandler
      ? "Keep the handler wiring small and reviewable."
      : isPriorityReview
      ? "Do not start implementation until the slice is ready."
      : "Keep the release safe and recoverable.",
      middle: isSchemaValidation
        ? "Do not ship if household/member isolation is unproven."
        : isRepositoryContract
        ? "Do not ship if the contract shape is unclear."
      : isRepoBootstrap
      ? "Do not ship if repo separation is unproven."
      : isMedicationReadHandler
      ? "Do not ship if the handler flow is not read-only."
      : isPriorityReview
      ? "Do not start implementation until the slice is ready."
      : "Do not ship without tests and rollback thinking.",
      impact: isSchemaValidation
        ? "The work gets a hard release gate for household safety."
        : isRepositoryContract
        ? "The work gets a hard release gate for contract safety."
      : isRepoBootstrap
      ? "The work stays small and recoverable."
      : isMedicationReadHandler
      ? "The work stays small, reviewable, and reversible."
      : isPriorityReview
      ? "The work gains a clear readiness check."
      : "The package stays ship-safe.",
    },
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
