function promptSmith(taskDescription, product, architecture) {
  return {
    role: "Prompt Smith",
    objective: "Turn the task into a clear work package request.",
    promptStatement: "Create a Codex-ready prompt for one scoped ticket only.",
    notes: [
      "Use concise markdown headings.",
      "Avoid AI-provider-specific language.",
    ],
  };
}

module.exports = {
  promptSmith,
};
