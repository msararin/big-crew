function qaSentinel(taskDescription, product, architecture) {
  return {
    role: "QA Sentinel",
    objective: "Define the minimum regressions that must stay green.",
    notes: [
      "Add a happy-path check and one negative-path check.",
      "Verify the generated package stays readable.",
      `Test anchor: ${taskDescription}`,
      `Scope anchor: ${product.objective} / ${architecture.objective}`,
    ],
  };
}

module.exports = {
  qaSentinel,
};
