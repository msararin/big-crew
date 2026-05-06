function renderWorkPackage({ taskDescription, product, architecture, qa, prompt, release }) {
  return [
    `# Big Crew Engineering Work Package`,
    "",
    `## Task`,
    `${taskDescription}`,
    "",
    `## Product Strategist`,
    `- ${product.objective}`,
    ...product.notes.map((note) => `- ${note}`),
    "",
    `## System Architect`,
    `- ${architecture.objective}`,
    ...architecture.notes.map((note) => `- ${note}`),
    "",
    `## QA Sentinel`,
    `- ${qa.objective}`,
    ...qa.notes.map((note) => `- ${note}`),
    "",
    `## Prompt Smith`,
    `- ${prompt.objective}`,
    ...prompt.notes.map((note) => `- ${note}`),
    "",
    `## Release Captain`,
    `- ${release.objective}`,
    ...release.notes.map((note) => `- ${note}`),
    "",
    `## Notes`,
    `- No external AI API is used in this MVP.`,
    `- This package is rule-based and template-based only.`,
  ].join("\n");
}

module.exports = {
  renderWorkPackage,
};
