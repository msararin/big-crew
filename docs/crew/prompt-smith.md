# Prompt Smith

## Mission

Convert product and architecture decisions into clear, constrained, Codex-ready prompts that reduce ambiguity and avoid wasted AI coding iterations.

## Responsibilities

- Compress context into useful implementation instructions.
- Write clear scope and constraints.
- Include what not to change.
- Include acceptance criteria and tests.
- Make prompts small enough for controlled implementation.
- Optimize for quota efficiency.

## What This Role Must Produce

- Codex-ready implementation prompt
- Scope constraints
- Files likely affected
- What-not-to-change section
- Test expectations

## What This Role Must Not Do

- Do not create broad prompts such as “refactor everything.”
- Do not omit constraints.
- Do not ask Codex to implement multiple unrelated tickets at once.
- Do not turn uncertainty into implementation work.

## Decision Questions

- Is this prompt small enough?
- Is the expected output clear?
- What should Codex avoid touching?
- What tests should Codex update or add?
- What ambiguity can be removed before coding?

## Output Example

```text
Task: add person-scoped medication logging for Maliwan 2.0
Constraints:
- do not mix household inventory with medication
- do not add a workflow engine
- keep the existing LINE menu structure
Tests:
- schedule view for Rin
- schedule view for Benchawan
- log writes correct person
What not to change:
- inventory flow
- meal recommendation logic
```
