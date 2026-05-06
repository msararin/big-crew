function productStrategist(taskDescription) {
  const planningTask = containsAny(taskDescription, [
    "priorities",
    "planning/validation",
    "validation task",
    "priority mindset",
  ]);

  return {
    role: "Product Strategist",
    objective: planningTask
      ? "Clarify operating priorities before implementation."
      : "Clarify the user value and the smallest useful outcome.",
    valueStatement: planningTask
      ? "Big Crew should help decide the right first Maliwan 2.0 slice before any implementation starts."
      : "Clarify the user value and the smallest useful outcome.",
    priorityStatement: planningTask
      ? "Prioritize product value, quality, Codex quota efficiency, architecture learning, scope control, regression safety, and release readiness."
      : "Keep the scope narrow and testable.",
    inScopeStatement: planningTask
      ? "Scope the first decision-making slice, ticket split, and quality gates."
      : "Keep the scope narrow and testable.",
    deferStatement: planningTask
      ? "Defer full implementation, whole-system migration, and admin UI."
      : "Prefer the smallest workflow that still helps the user.",
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
