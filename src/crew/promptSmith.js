function promptSmith(taskDescription, product, architecture) {
  return {
    role: "Prompt Smith",
    objective: "Turn the task into a clear work package request.",
    notes: [
      "Use concise markdown headings.",
      "Avoid AI-provider-specific language.",
      `Input: ${taskDescription}`,
      `Framing: ${product.objective} + ${architecture.objective}`,
    ],
  };
}

module.exports = {
  promptSmith,
};
