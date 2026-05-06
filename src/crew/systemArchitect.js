function systemArchitect(taskDescription, product) {
  return {
    role: "System Architect",
    objective: "Define a simple structure that can be extended later.",
    notes: [
      "Keep the entry point thin.",
      "Separate orchestration from templates.",
      `Architecture hint for: ${taskDescription}`,
      `Primary product focus: ${product.objective}`,
    ],
  };
}

module.exports = {
  systemArchitect,
};
