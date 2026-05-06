function releaseCaptain(taskDescription, product, architecture, qa) {
  return {
    role: "Release Captain",
    objective: "Describe release readiness, reviewability, and recovery before ship.",
    releaseStatement: "Keep the release small, reviewable, and recoverable.",
    notes: [
      "Require tests before merge.",
      "Identify the rollback path before shipping.",
    ],
  };
}

module.exports = {
  releaseCaptain,
};
