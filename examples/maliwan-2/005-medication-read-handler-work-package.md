# Big Crew Engineering Work Package

## Task Summary
Maliwan 2.0 Medication Read Handler is a planning task for Big Crew's Maliwan 2.0 mission. Wire the read-only medication schedule flow from a LINE-style handler into the orchestrator and return a reviewable response model. Keep medication logging, session/state engine, inventory, and admin UI deferred; this is a thin runtime wiring task, not full LINE behavior.

## Crew Activity Summary
- Product Strategist: frames this as the read-only LINE handler wiring slice that keeps the response reviewable.
- System Architect: separates the LINE handler wiring from the orchestrator and keeps the reviewable response model explicit.
- QA Sentinel: requires handler smoke tests and safe fallback coverage.
- Prompt Smith: scopes the Codex prompt to the read-only handler wiring only.
- Release Captain: keeps the handler wiring small, reviewable, and reversible.

## Crew Role Trace
### Product Strategist
- Decision: Protect the read-only handler boundary before adding more LINE behavior.
- Product value / user risk: Do not add logging or session behavior yet.
- Impact on final package: The work stays focused on read-only runtime wiring.
### System Architect
- Decision: Keep the handler thin and the orchestrator boundary explicit.
- Boundary enforced: Do not add direct SQL or logging behavior to the handler.
- Impact on final package: The work becomes a thin handler wiring boundary.
### QA Sentinel
- Decision: Prove the handler wiring and reply model are correct.
- Test risk / regression risk: The handler must stay read-only and avoid accidental logging paths.
- Impact on final package: The work requires handler-level smoke tests and safe fallback checks.
### Prompt Smith
- Decision: Keep the prompt on read-only handler wiring only.
- Scope compression / Codex guardrail: Do not drift into medication logging or session behavior.
- Impact on final package: The output becomes a read-only handler wiring prompt.
### Release Captain
- Decision: Keep the handler wiring small and reviewable.
- Release gate / readiness check: Do not ship if the handler flow is not read-only.
- Impact on final package: The work stays small, reviewable, and reversible.

## Product Value
- A thin LINE handler bridge lets caregivers check today’s medication safely without dragging logging or session behavior into the first runtime slice.
- Keep the handler thin and dependency-injected.
- Use seed-level member mapping only for this slice.
- Do not introduce logging or session behavior yet.

## Priority
- Prioritize the read-only handler wiring and reviewable response model before medication logging or session logic.
- Defer medication logging, session/state engine, inventory, admin UI, and deploy config.

## Suggested Ticket Split
- 1. Map 'เช็กยาวันนี้' to the orchestrator.
- 2. Resolve member context from a seed-level mapping.
- 3. Format the response model back to LINE text and suggested responses.
- 4. Add smoke tests for the read-only handler flow.
- 5. Prepare the Codex prompt for the handler wiring ticket only.

## In Scope
- Scope the LINE handler wiring, seed-level member context resolution, response formatting, and smoke tests.
- Keep the LINE handler thin, resolve member context outside the orchestrator, and do not add logging or session behavior yet.

## Out of Scope
- Defer medication logging, session/state engine, inventory, admin UI, and deploy config.
- External AI API integration

## Architecture Impact
- Define the thin handler-to-orchestrator boundary for read-only medication schedules.
- Keep the LINE handler thin, resolve member context outside the orchestrator, and do not add logging or session behavior yet.
- Keep the handler dependency-injected and reviewable.
- Resolve member context from a seed-level mapping only.
- Keep the orchestrator boundary separate from LINE text parsing.

## Acceptance Criteria
- Define the minimum regressions that must stay green for the read-only medication handler slice.
- Prove the LINE-style handler routes 'เช็กยาวันนี้' to the orchestrator, resolves member context, and returns a reviewable response model.
- The LINE-style handler routes 'เช็กยาวันนี้' to the orchestrator.
- The handler resolves the expected member context from seed-level mapping.
- The reply includes medication schedule text and suggested responses.
- Missing member context returns a safe fallback.
- No medication logging is introduced.
- No session engine is introduced.
- No inventory or admin UI is introduced.

## Regression Tests
- The LINE-style handler routes 'เช็กยาวันนี้' to the orchestrator.
- The handler resolves the expected member context from seed-level mapping.
- The reply includes medication schedule text and suggested responses.
- Missing member context returns a safe fallback.
- No medication logging is introduced.
- No session engine is introduced.
- No inventory or admin UI is introduced.

## Codex-Ready Prompt
- Turn the read-only medication handler slice into a clear work package request.
- Create one Codex-ready prompt for wiring the read-only medication schedule handler only.
- Implement only the read-only medication handler wiring.
- Do not implement medication logging.
- Do not implement 'กินยาแล้ว' behavior.
- Do not add session/state engine.
- Do not add inventory or admin UI.
- Use fake or seed-level member mapping only.
- Format the response model back to LINE text and suggested responses.

## Definition of Done
- Acceptance criteria are defined and testable.
- Regression tests are listed and pass.
- The work stays within one scoped slice.

## Release Captain
- Keep the read-only handler slice reviewable and recoverable before ship.
- Keep the handler release small, reviewable, and safe to hand off.
- Treat this as thin runtime wiring before adding more LINE behavior.
- Require tests before merge.
- Identify the rollback/recovery path before shipping.
- Do not ship if the handler flow is not read-only.

## Notes
- No external AI API is used in this MVP.
- This package is rule-based and template-based only.
