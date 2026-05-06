function systemArchitect(taskDescription, product) {
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
    role: "System Architect",
    objective: isSchemaValidation
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : isRepositoryContract
      ? "Define the medication repository boundary and interface contract."
      : isRepoBootstrap
      ? "Define the standalone repo boundary and initial folder structure."
      : isMedicationReadHandler
      ? "Define the thin handler-to-orchestrator boundary for read-only medication schedules."
      : hasHouseholdBoundary
      ? "Define the household/member boundary and the first SQL-backed data layer."
      : "Define a simple structure that can be extended later.",
    boundaryStatement: isSchemaValidation
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : isRepositoryContract
      ? "Keep the contract separate from D1 implementation details; model household_id, member_id, and line_user_id explicitly."
      : isRepoBootstrap
      ? "Keep maliwan-2 separate from Maliwan 1.0 and Big Crew; avoid copied runtime code; define folder boundaries and a D1 boundary."
      : isMedicationReadHandler
      ? "Keep the LINE handler thin, resolve member context outside the orchestrator, and do not add logging or session behavior yet."
      : hasHouseholdBoundary
      ? "Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI."
      : "Keep responsibilities separated and avoid broad rewrites.",
    notes: isSchemaValidation
      ? [
          "Use Cloudflare D1 as the SQL-backed validation target.",
          "Keep a repository boundary between domain logic and D1.",
          "JSON seed data is acceptable for the early setup slice.",
        ]
      : isRepositoryContract
      ? [
          "Define method names and input/output shapes without binding to D1.",
          "Keep repository behavior testable through exported contract functions.",
          "Treat D1 as infrastructure behind the boundary.",
        ]
      : isRepoBootstrap
      ? [
          "Use a repository pattern boundary for the bootstrap slice.",
          "Create app, orchestrator, domain, infrastructure, and tests folders.",
          "D1 schema placeholders and JSON seed placeholders are acceptable.",
        ]
      : isMedicationReadHandler
      ? [
          "Keep the handler dependency-injected and reviewable.",
          "Resolve member context from a seed-level mapping only.",
          "Keep the orchestrator boundary separate from LINE text parsing.",
        ]
      : hasHouseholdBoundary
      ? [
          "Use Cloudflare D1 as the SQL-backed validation target.",
          "Keep a repository boundary between domain logic and D1.",
          "JSON seed data is acceptable for the early setup slice.",
        ]
      : [
          "Keep the entry point thin.",
          "Separate orchestration from templates.",
        ],
    activitySummary: isSchemaValidation
      ? "separates D1 schema validation from repo bootstrap and keeps household_id, member_id, and line_user_id explicit."
      : isRepositoryContract
      ? "separates the medication repository contract from D1 implementation and keeps the household/member boundary explicit."
      : isRepoBootstrap
      ? "separates the new repo from Maliwan 1.0 and Big Crew, with Worker/D1 placeholders and clear folder boundaries."
      : isMedicationReadHandler
      ? "separates the LINE handler wiring from the orchestrator and keeps the reviewable response model explicit."
      : isPriorityReview
      ? "draws the architecture boundary so the first Maliwan 2.0 slice stays small and testable."
      : hasHouseholdBoundary
      ? "defines the household/member boundary and the first SQL-backed data layer."
      : "keeps the architecture boundaries clear and simple.",
    trace: {
      decision: isSchemaValidation
        ? "Keep household_id, member_id, and line_user_id explicit behind a D1 repository boundary."
        : isRepositoryContract
        ? "Keep the contract decoupled from D1 and define interfaces first."
      : isRepoBootstrap
      ? "Keep maliwan-2 separate from Maliwan 1.0 and Big Crew."
      : isMedicationReadHandler
      ? "Keep the handler thin and the orchestrator boundary explicit."
      : isPriorityReview
      ? "Keep the first slice small, testable, and reviewable."
      : "Separate responsibilities before implementation.",
      middle: isSchemaValidation
        ? "Medication must not mix across households or drift into inventory/admin UI."
        : isRepositoryContract
        ? "The contract must not be bound to real D1 queries."
      : isRepoBootstrap
      ? "Copied runtime code and blurred repo boundaries are not allowed."
      : isMedicationReadHandler
      ? "Do not add direct SQL or logging behavior to the handler."
      : isPriorityReview
      ? "Scope stays narrow enough to review."
      : "Responsibilities stay explicit and narrow.",
      impact: isSchemaValidation
        ? "The work centers on D1 schema and seed boundaries."
        : isRepositoryContract
        ? "The work centers on a D1-agnostic repository contract."
      : isRepoBootstrap
      ? "The work becomes a clean standalone repo boundary."
      : isMedicationReadHandler
      ? "The work becomes a thin handler wiring boundary."
      : isPriorityReview
      ? "The work becomes a controlled priority package."
      : "The architecture stays simple and readable.",
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
  systemArchitect,
};
