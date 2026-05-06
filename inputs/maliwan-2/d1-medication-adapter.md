# Maliwan 2.0 D1 Medication Adapter

## Product Vision
Maliwan 2.0 is a household-aware care orchestrator for senior-friendly family medication workflows.

The first read/write boundary after the schema and contract should be the D1 adapter that reads schedules and writes logs through the repository contract, while still keeping LINE runtime, inventory, and admin UI deferred.

## Context
The Maliwan 2.0 foundation is already in place:
- standalone repo bootstrap
- D1 schema validation
- medication repository contract
- member-scoped medication boundary

The next step is to make the D1 adapter real so the repository contract can talk to the schema without coupling the orchestrator or LINE handler directly to SQL.

## Goal
Create an implementation-ready work package for the D1 medication repository adapter slice.

This is an infrastructure adapter task, not a LINE runtime task.

## Scope
Focus only on the D1-backed medication repository adapter.

## In Scope
- findMedicationSchedulesByMember
- createMedicationLog
- household_id and member_id scoping
- recordedByLineUserId traceability
- fake D1 tests
- adapter query boundaries

## Out of Scope
- LINE webhook runtime
- medication read UI
- medication logging UI
- inventory
- admin UI
- session/state engine
- full migration from Maliwan 1.0

## Constraints
- Keep the adapter behind the repository contract.
- Do not connect the LINE handler directly to D1.
- Do not add inventory or admin logic.
- Keep the change small and testable.

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

