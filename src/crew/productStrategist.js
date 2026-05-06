function productStrategist(taskDescription) {
  return {
    role: "Product Strategist",
    objective: "Clarify the user value and the smallest useful outcome.",
    notes: [
      `Task summary: ${taskDescription}`,
      "Keep the scope narrow and testable.",
      "Prefer the smallest workflow that still helps the user.",
    ],
  };
}

module.exports = {
  productStrategist,
};
