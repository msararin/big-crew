function systemArchitect(taskDescription, product) {
  return {
    role: "System Architect",
    objective: "Define a simple structure that can be extended later.",
    boundaryStatement: "Keep responsibilities separated and avoid broad rewrites.",
    notes: [
      "Keep the entry point thin.",
      "Separate orchestration from templates.",
    ],
  };
}

module.exports = {
  systemArchitect,
};
