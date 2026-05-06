function releaseCaptain(taskDescription, product, architecture, qa) {
  return {
    role: "Release Captain",
    objective: "Describe a safe, shippable checkpoint and handoff.",
    notes: [
      "Keep release steps explicit.",
      "Require tests before merge.",
      `Release input: ${taskDescription}`,
      `Release guardrails: ${qa.objective} / ${architecture.objective}`,
    ],
  };
}

module.exports = {
  releaseCaptain,
};
