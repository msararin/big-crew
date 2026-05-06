function qaSentinel(taskDescription, product, architecture) {
  return {
    role: "QA Sentinel",
    objective: "Define the minimum regressions that must stay green.",
    acceptanceStatement: "Use testable criteria, edge cases, and a regression gate before implementation.",
    notes: [
      "Add a happy-path check and one negative-path check.",
      "Verify the generated package stays readable.",
    ],
  };
}

module.exports = {
  qaSentinel,
};
