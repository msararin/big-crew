function releaseCaptain(taskDescription, product, architecture, qa) {
  return {
    role: "Release Captain",
    objective: "Describe a safe, shippable checkpoint and handoff.",
    releaseStatement: "Require tests, clear scope, and recovery thinking before ship.",
    notes: [
      "Keep release steps explicit.",
      "Require tests before merge.",
    ],
  };
}

module.exports = {
  releaseCaptain,
};
