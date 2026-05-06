# Big Crew Engineering Work Package

## Task Summary
Maliwan 2.0 Medication Repository Contract is a planning task for Big Crew's Maliwan 2.0 mission. Define the medication repository boundary so member-scoped schedules and logs stay safe for future LINE-based care workflows without coupling product logic directly to Cloudflare D1. Keep real D1 queries, LINE runtime, inventory, and admin UI deferred; this is a contract/interface slice, not runtime implementation.

## Crew Activity Summary
- Product Strategist: frames this as a repository contract slice that keeps medication schedules and logs safe without coupling product logic to D1.
- System Architect: separates the medication repository contract from D1 implementation and keeps the household/member boundary explicit.
- QA Sentinel: requires contract-shape tests and keeps member-scoped medication isolated from D1 details.
- Prompt Smith: scopes the Codex prompt to the repository contract only and keeps runtime work deferred.
- Release Captain: requires contract tests and blocks ship if the boundary is too coupled to D1.

## Crew Role Trace
### Product Strategist
- Decision: Define the contract before real D1 queries so business logic stays decoupled.
- Product value / user risk: Keep member-scoped medication safe for future LINE workflows.
- Impact on final package: The work stays focused on a contract-first medication boundary.
### System Architect
- Decision: Keep the contract decoupled from D1 and define interfaces first.
- Boundary enforced: The contract must not be bound to real D1 queries.
- Impact on final package: The work centers on a D1-agnostic repository contract.
### QA Sentinel
- Decision: Prove the exported contract shape without real D1 queries.
- Test risk / regression risk: The contract must not drift into D1 runtime behavior.
- Impact on final package: The work requires contract-shape tests and identity guards.
### Prompt Smith
- Decision: Keep the prompt on the repository contract only.
- Scope compression / Codex guardrail: Do not ask for real D1 queries.
- Impact on final package: The output becomes a contract-only implementation prompt.
### Release Captain
- Decision: Require proof that the contract is not too coupled to D1.
- Release gate / readiness check: Do not ship if the contract shape is unclear.
- Impact on final package: The work gets a hard release gate for contract safety.

## Product Value
- A clear repository contract keeps member-scoped medication schedules and logs safe for future LINE workflows without coupling business logic directly to D1.
- Keep the repository boundary separate from D1 implementation details.
- Use the contract to prepare for future LINE-based medication workflows.

## Priority
- Prioritize the repository contract and method boundaries before any real D1 queries or runtime behavior.
- Defer real D1 queries, LINE runtime, inventory, and admin UI.

## Suggested Ticket Split
- 1. Define the MedicationRepository contract and exported interface shape.
- 2. Specify method names and expected inputs/outputs for member-scoped schedules and logs.
- 3. Keep household_id, member_id, and line_user_id explicit in the contract.
- 4. Add contract-shape tests for the repository interface.
- 5. Prepare the Codex prompt for the contract slice only.

## In Scope
- Scope the medication repository contract, method names, and exported interface shape.
- Keep the contract separate from D1 implementation details; model household_id, member_id, and line_user_id explicitly.

## Out of Scope
- Do not implement real D1 queries.
- Do not implement LINE webhook runtime.
- Do not implement medication read runtime behavior.
- Do not implement medication log runtime behavior.
- Do not implement inventory.
- Do not build admin UI.
- Do not migrate the whole Maliwan runtime.

## Architecture Impact
- Define the medication repository boundary and interface contract.
- Keep the contract separate from D1 implementation details; model household_id, member_id, and line_user_id explicitly.
- Define method names and input/output shapes without binding to D1.
- Keep repository behavior testable through exported contract functions.
- Treat D1 as infrastructure behind the boundary.

## Acceptance Criteria
- Define the minimum regressions that must stay green for the repository contract slice.
- Prove the repository contract exposes the correct member-scoped medication boundary without binding to D1 implementation details.
- The repository contract exports the expected interface for member-scoped schedules and logs.
- The contract includes household_id, member_id, and line_user_id in its shape or documentation.
- No real D1 queries are implemented.
- No LINE runtime is introduced.
- Inventory and admin UI remain out of scope.

## Regression Tests
- The repository contract exports the expected interface for member-scoped schedules and logs.
- The contract includes household_id, member_id, and line_user_id in its shape or documentation.
- No real D1 queries are implemented.
- No LINE runtime is introduced.
- Inventory and admin UI remain out of scope.

## Codex-Ready Prompt
- Turn the repository contract slice into a clear work package request.
- Create one Codex-ready prompt for defining the medication repository contract only.
- Implement only the repository contract slice.
- Do not implement real D1 queries yet.
- Do not implement LINE webhook runtime.
- Do not implement medication read or log runtime behavior.
- Do not build inventory or admin UI.
- Define method names, inputs, and outputs for member-scoped schedules and logs.
- Keep household_id, member_id, and line_user_id explicit.
- Add contract-shape tests for the exported interface.

## Definition of Done
- Acceptance criteria are defined and testable.
- Regression tests are listed and pass.
- The work stays within one scoped slice.

## Release Captain
- Keep the repository contract slice reviewable and recoverable before ship.
- Keep the release small, reviewable, and safe to hand off while the repository boundary is being defined.
- Treat this as a contract slice before runtime implementation.
- Require tests before merge.
- Identify the rollback/recovery path before shipping.
- Do not ship if the contract shape is unclear or too coupled to D1.

## Notes
- No external AI API is used in this MVP.
- This package is rule-based and template-based only.
