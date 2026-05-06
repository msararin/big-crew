function renderWorkPackage({ taskDescription, product, architecture, qa, prompt, release }) {
  return [
    `# Big Crew Engineering Work Package`,
    "",
    `## Task Summary`,
    `${taskDescription}`,
    "",
    `## Product Value`,
    `- ${product.valueStatement || product.objective}`,
    ...product.notes.map((note) => `- ${note}`),
    "",
    `## Priority`,
    `- ${product.priorityStatement || product.notes[1]}`,
    `- ${product.deferStatement || product.notes[2]}`,
    "",
    `## Suggested Ticket Split`,
    ...(product.ticketSplitStatements && product.ticketSplitStatements.length > 0
      ? product.ticketSplitStatements.map((statement) => `- ${statement}`)
      : [
          `- Split the work into one scoped implementation ticket.`,
          `- Keep the validation slice small and reviewable.`,
        ]),
    "",
    `## In Scope`,
    `- ${product.inScopeStatement || product.notes[1]}`,
    `- ${architecture.boundaryStatement || architecture.notes[1]}`,
    "",
    `## Out of Scope`,
    `- ${product.deferStatement || "Complex orchestration"}`,
    `- External AI API integration`,
    "",
    `## Architecture Impact`,
    `- ${architecture.objective}`,
    ...(
      architecture.boundaryStatement
        ? [`- ${architecture.boundaryStatement}`]
        : []
    ),
    ...architecture.notes.map((note) => `- ${note}`),
    "",
    `## Acceptance Criteria`,
    `- ${qa.objective}`,
    `- ${qa.acceptanceStatement || qa.notes[0]}`,
    ...qa.notes.map((note) => `- ${note}`),
    "",
    `## Regression Tests`,
    ...qa.notes.map((note) => `- ${note}`),
    "",
    `## Codex-Ready Prompt`,
    `- ${prompt.objective}`,
    `- ${prompt.promptStatement || prompt.notes[0]}`,
    ...prompt.notes.map((note) => `- ${note}`),
    "",
    `## Definition of Done`,
    `- Acceptance criteria are defined and testable.`,
    `- Regression tests are listed and pass.`,
    `- The work stays within one scoped slice.`,
    "",
    `## Release Captain`,
    `- ${release.objective}`,
    `- ${release.releaseStatement || release.notes[0]}`,
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
