# Big Crew Engineering Work Package

## Task Summary
Maliwan 2.0 D1 Schema Validation is a planning task for Big Crew's Maliwan 2.0 mission. Validate the first SQL-backed data boundary for a senior-friendly household-aware care workflow, using household_id, member_id, and line_user_id to keep member-scoped medication safe for the Malaithong household with Rin and Benchawan. Keep household-scoped inventory and admin UI deferred; this is a schema validation task, not runtime implementation.

## Crew Activity Summary
- Product Strategist: frames this as a schema validation slice that protects senior-friendly family care and medication data safety from household/member mix-ups.
- System Architect: separates D1 schema validation from repo bootstrap and keeps household_id, member_id, and line_user_id explicit.
- QA Sentinel: requires tests for schema tables, seed data, and member-scoped medication isolation.
- Prompt Smith: scopes the Codex prompt to Ticket 1 only and excludes runtime, inventory, admin UI, and full migration.
- Release Captain: requires tests to pass and blocks commit if household/member isolation is unproven.

## Crew Role Trace
### Product Strategist
- Decision: Protect medication safety by validating household/member boundaries before runtime work.
- Product value / user risk: Rin and Benchawan must not be mixed, and inventory/admin UI stay deferred.
- Impact on final package: The work stays focused on schema validation and seed boundaries.
### System Architect
- Decision: Keep household_id, member_id, and line_user_id explicit behind a D1 repository boundary.
- Boundary enforced: Medication must not mix across households or drift into inventory/admin UI.
- Impact on final package: The work centers on D1 schema and seed boundaries.
### QA Sentinel
- Decision: Prove schema and seed boundaries before runtime behavior.
- Test risk / regression risk: Rin and Benchawan must not cross household boundaries.
- Impact on final package: The work requires schema, seed, and isolation tests.
### Prompt Smith
- Decision: Keep the prompt on D1 schema validation only.
- Scope compression / Codex guardrail: Do not expand into runtime, inventory, or admin UI.
- Impact on final package: The output becomes a Ticket 1-only validation prompt.
### Release Captain
- Decision: Require proof of household/member isolation before ship.
- Release gate / readiness check: Do not ship if household/member isolation is unproven.
- Impact on final package: The work gets a hard release gate for household safety.

## Product Value
- A reliable D1 schema keeps member-scoped medication safe for the Malaithong household and prevents Rin and Benchawan from being mixed in later runtime work.
- Use the Malaithong household and Rin/Benchawan as the validation seed.
- Keep the schema ready for future LINE identity mapping.

## Priority
- Prioritize validating the household/member/LINE identity boundary and the D1 schema before runtime work; defer inventory and admin UI.
- Defer runtime medication behavior, inventory, and admin UI.

## Suggested Ticket Split
- 1. Draft D1 tables and constraints for households, household_members, line_identities, medication_schedules, and medication_logs.
- 2. Add seed data for the Malaithong household with Rin and Benchawan.
- 3. Define the repository boundary between domain logic and D1.
- 4. Add schema and seed validation tests.
- 5. Prepare the Codex prompt for the schema-validation ticket only.

## In Scope
- Scope the D1 schema draft, seed data, and boundary tests for the first member-scoped medication slice.
- Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI.

## Out of Scope
- Do not implement LINE webhook runtime.
- Do not implement medication read runtime.
- Do not implement medication log runtime.
- Do not implement inventory.
- Do not build admin UI.
- Do not copy Maliwan 1.0 runtime code.
- Do not copy Big Crew runtime code.

## Architecture Impact
- Define the household/member boundary and the first SQL-backed data layer.
- Model household_id, member_id, and line_user_id explicitly; keep member-scoped medication isolated; defer household-scoped inventory and admin UI.
- Use Cloudflare D1 as the SQL-backed validation target.
- Keep a repository boundary between domain logic and D1.
- JSON seed data is acceptable for the early setup slice.

## Acceptance Criteria
- Define the minimum regressions that must stay green for the D1 validation slice.
- Prove the first Maliwan 2.0 slice keeps the household/member boundary intact, validates the SQL-backed data layer, and leaves inventory/admin UI deferred.
- The D1 schema placeholder includes households, household_members, line_identities, medication_schedules, and medication_logs.
- The seed placeholder includes one household plus Rin and Benchawan.
- Medication data stays member-scoped and traceable through LINE identities.
- Inventory remains untouched in this slice.
- No admin UI is introduced.
- No full migration is performed.

## Regression Tests
- The D1 schema placeholder includes households, household_members, line_identities, medication_schedules, and medication_logs.
- The seed placeholder includes one household plus Rin and Benchawan.
- Medication data stays member-scoped and traceable through LINE identities.
- Inventory remains untouched in this slice.
- No admin UI is introduced.
- No full migration is performed.

## Codex-Ready Prompt
- Turn the schema-validation slice into a clear work package request.
- Create one Codex-ready prompt for validating the D1 schema for the Malaithong household only.
- Implement only the D1 validation/planning slice.
- Do not migrate the whole Maliwan runtime.
- Do not touch inventory.
- Do not build admin UI.
- Do not refactor the whole LINE webhook.
- Add or document minimal D1 schema for households, household_members, line_identities, medication_schedules, and medication_logs.
- Add or document seed data for one household with Rin and Benchawan.
- Add verification/tests for member-scoped medication isolation.

## Definition of Done
- Acceptance criteria are defined and testable.
- Regression tests are listed and pass.
- The work stays within one scoped slice.

## Release Captain
- Keep the D1 validation slice reviewable and recoverable before ship.
- Keep the release small, reviewable, and safe to hand off for the first Maliwan 2.0 boundary check.
- Treat this as validation/planning before implementation.
- Require tests before merge.
- Identify the rollback/recovery path before shipping.
- Do not ship if household/member isolation is unproven.

## Notes
- No external AI API is used in this MVP.
- This package is rule-based and template-based only.
