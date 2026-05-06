# Big Crew Engineering Work Package

## Task Summary
Maliwan 2.0 Repo Bootstrap is a planning task for Big Crew's Maliwan 2.0 mission. Create a new standalone maliwan-2 repository separate from Maliwan 1.0 and Big Crew, with a Cloudflare Worker + D1 skeleton and member-scoped medication as the first domain slice. Do not copy runtime code; keep inventory and admin UI deferred. The work should balance quality.

## Crew Activity Summary
- Product Strategist: frames this as a clean standalone repo boundary so maliwan-2 stays separate from Maliwan 1.0 and Big Crew.
- System Architect: separates the new repo from Maliwan 1.0 and Big Crew, with Worker/D1 placeholders and clear folder boundaries.
- QA Sentinel: requires smoke tests, placeholder checks, and no copied runtime code.
- Prompt Smith: scopes the Codex prompt to repo bootstrap only with no feature implementation.
- Release Captain: keeps the bootstrap commit small and reviewable, with rollback/recovery in mind.

## Crew Role Trace
### Product Strategist
- Decision: Protect the repo boundary before any feature implementation.
- Product value / user risk: Keep the new repo separate from Maliwan 1.0 and Big Crew.
- Impact on final package: The work becomes a clean standalone repo bootstrap plan.
### System Architect
- Decision: Keep maliwan-2 separate from Maliwan 1.0 and Big Crew.
- Boundary enforced: Copied runtime code and blurred repo boundaries are not allowed.
- Impact on final package: The work becomes a clean standalone repo boundary.
### QA Sentinel
- Decision: Prove the skeleton imports and placeholders are present.
- Test risk / regression risk: Copied runtime code or missing placeholders would break the bootstrap proof.
- Impact on final package: The work requires skeleton smoke tests and placeholder checks.
### Prompt Smith
- Decision: Keep the prompt on repo bootstrap only.
- Scope compression / Codex guardrail: Do not drift into feature implementation.
- Impact on final package: The output becomes a bootstrap-only implementation prompt.
### Release Captain
- Decision: Keep the release small and reviewable.
- Release gate / readiness check: Do not ship if repo separation is unproven.
- Impact on final package: The work stays small and recoverable.

## Product Value
- A clean standalone repository boundary keeps maliwan-2 separate from Maliwan 1.0 and Big Crew, so the new system can evolve without inherited coupling.
- Keep the scope narrow and testable.
- Prefer the smallest workflow that still helps the user.

## Priority
- Prioritize the standalone repo skeleton and architecture boundary before feature implementation.
- Defer runtime feature implementation, inventory, and admin UI.

## Suggested Ticket Split
- 1. Initialize the standalone maliwan-2 repo structure.
- 2. Create a README with product and architecture intent.
- 3. Create a minimal Node / Cloudflare Worker project skeleton.
- 4. Add folder boundaries for app, orchestrator, domain, infrastructure, and tests.
- 5. Add a D1 schema draft or migration placeholder.
- 6. Add a JSON seed data placeholder for one household with Rin and Benchawan.
- 7. Add a smoke test for the project skeleton.
- 8. Prepare the Codex prompt for repo bootstrap only.

## In Scope
- Scope the repo bootstrap slice: initialize the skeleton, README, folder boundaries, and D1 placeholders.
- Keep maliwan-2 separate from Maliwan 1.0 and Big Crew; avoid copied runtime code; define folder boundaries and a D1 boundary.

## Out of Scope
- Do not copy Maliwan 1.0 runtime code.
- Do not mix Big Crew code into maliwan-2.
- Do not implement inventory yet.
- Do not build admin UI.
- Do not migrate the whole system.

## Architecture Impact
- Define the standalone repo boundary and initial folder structure.
- Keep maliwan-2 separate from Maliwan 1.0 and Big Crew; avoid copied runtime code; define folder boundaries and a D1 boundary.
- Use a repository pattern boundary for the bootstrap slice.
- Create app, orchestrator, domain, infrastructure, and tests folders.
- D1 schema placeholders and JSON seed placeholders are acceptable.

## Acceptance Criteria
- Define the minimum regressions that must stay green for the repo bootstrap slice.
- Prove the new repo boots, tests run, the README explains Maliwan 2.0 purpose, and placeholders exist without copying legacy runtime code.
- npm test passes.
- Skeleton imports do not fail.
- D1 schema placeholder exists.
- Seed data placeholder exists.
- No Maliwan 1.0 runtime code is copied.
- No Big Crew code is copied.
- No inventory/admin UI files are introduced.
- Inventory/admin UI are not implemented.

## Regression Tests
- npm test passes.
- Skeleton imports do not fail.
- D1 schema placeholder exists.
- Seed data placeholder exists.
- No Maliwan 1.0 runtime code is copied.
- No Big Crew code is copied.
- No inventory/admin UI files are introduced.
- Inventory/admin UI are not implemented.

## Codex-Ready Prompt
- Turn the repo bootstrap slice into a clear work package request.
- Create one Codex-ready prompt for bootstrapping the new maliwan-2 repository skeleton only.
- Create the standalone repo skeleton only.
- Do not implement medication runtime logic yet.
- Do not copy Maliwan 1.0 runtime code.
- Do not copy Big Crew runtime code.
- Keep inventory and admin UI deferred.
- Add minimal D1 placeholders and seed-data placeholders.

## Definition of Done
- Acceptance criteria are defined and testable.
- Regression tests are listed and pass.
- The work stays within one scoped slice.

## Release Captain
- Keep the repo bootstrap slice reviewable and recoverable before ship.
- Keep the bootstrap release small, reviewable, and safe to hand off.
- Treat this as repo bootstrap before feature implementation.
- Require tests before merge.
- Identify the rollback/recovery path before shipping.
- Do not ship if repo separation is unproven.

## Notes
- No external AI API is used in this MVP.
- This package is rule-based and template-based only.
