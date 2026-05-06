# Maliwan 2.0 Medication Repository Contract

## Product Vision
Maliwan 2.0 is a senior-friendly household care orchestrator.

The first high-value workflow is medication tracking because medication data must be accurate, member-scoped, and safe from household/member mix-ups.

The repository contract should support future LINE-based medication workflows without coupling product/domain logic directly to Cloudflare D1.

## Context
maliwan-2 has already been bootstrapped as a standalone repo.

The D1 schema validation slice has passed:
- households
- household_members
- line_identities
- medication_schedules
- medication_logs
- Malaithong household seed
- Rin and Benchawan seed members
- tests validating schema/seed boundaries

## Goal
Create an implementation-ready work package for defining the medication repository contract.

This is a contract/interface slice, not a runtime feature implementation.

## Scope
Focus only on the medication repository boundary.

## In Scope
- define MedicationRepository contract
- define method names and expected inputs/outputs
- support member-scoped medication schedules
- support member-scoped medication logs
- use household_id and member_id explicitly
- keep line_user_id available for future caregiver traceability
- add tests that verify the contract shape or exported functions exist

## Out of Scope
- real D1 query implementation
- LINE webhook runtime
- medication read runtime behavior
- medication log runtime behavior
- inventory
- meal planning
- admin UI
- production authentication
- full migration from Maliwan 1.0

## Constraints
- Keep this as one repository contract slice.
- Do not implement real D1 queries yet.
- Do not connect to Cloudflare D1 yet.
- Do not implement LINE responses yet.
- Keep the change small enough for one Codex task.
- Preserve the existing schema and seed validation tests.

## Expected Output
Generate an implementation-ready work package with:
- product value
- priority
- suggested ticket split
- architecture impact
- acceptance criteria
- regression tests
- Codex-ready prompt for Ticket 1 only
- definition of done
- release readiness checks

## Big Crew Quality Target
The generated work package should score 27–30/30 before it is used as implementation input for maliwan-2.
