# Big Crew

Big Crew is a small Node.js CLI that turns a task description into a markdown Engineering Work Package.

It is intentionally simple:

- no external AI API
- rule-based / template-based output only
- readable code
- easy to extend later

## Crew members

- Product Strategist
- System Architect
- QA Sentinel
- Prompt Smith
- Release Captain

## What it does

Given one task description, the CLI generates a structured markdown package with:

- product framing
- architecture notes
- QA notes
- prompt framing
- release notes

## Getting started

Direct task input:

```bash
npm install
npm run generate -- "D1 spike: validate inventory-aware menu routing"
```

File input for longer tasks:

```bash
npm run generate -- --input examples/input-d1-spike.md
```

Or use the binary directly:

```bash
npx big-crew "D1 spike: validate inventory-aware menu routing"
```

## Project structure

```text
src/
  index.js
  orchestrator/engineeringOrchestrator.js
  crew/
  templates/
context/
examples/
```

## Design goals

- Keep the CLI thin.
- Keep orchestration separate from templates.
- Keep the output deterministic.
- Keep the project Codex-ready.

## Current context

- `context/maliwan-1-current-state.md`
- `context/maliwan-2-target-direction.md`
