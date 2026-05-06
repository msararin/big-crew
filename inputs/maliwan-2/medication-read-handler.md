# Maliwan 2.0 Medication Read Handler

## Product Vision
Maliwan 2.0 should let a caregiver ask "เช็กยาวันนี้" and get a member-scoped medication schedule review without exposing LINE runtime details to the domain layer.

This is the first thin runtime wiring step after the D1 adapter: LINE-style text input should reach the orchestrator, and the orchestrator should return a reviewable response model.

## Context
The backend flow already exists:
- D1 schema
- D1 adapter
- care orchestrator medication read behavior
- LINE-style handler mapping
- seed-level member context mapping

The last step before more LINE behavior is to wire the read-only flow into a handler path and keep it read-only.

## Goal
Create an implementation-ready work package for wiring the read-only medication schedule flow to the LINE handler.

This is thin runtime wiring, not medication logging, not session management, and not full LINE menu behavior.

## Scope
Focus only on "เช็กยาวันนี้" read-only handler wiring.

## In Scope
- map "เช็กยาวันนี้" to the orchestrator
- resolve member context from a seed-level mapping
- format response model back to LINE text + suggested responses
- behavior-focused smoke tests
- empty-state handling
- safe missing-member fallback

## Out of Scope
- medication logging
- "กินยาแล้ว" button behavior
- session/state engine
- inventory
- admin UI
- deploy config
- full LINE runtime refactor

## Constraints
- Do not add direct SQL to the handler.
- Do not connect to real LINE.
- Do not connect to real Cloudflare.
- Do not connect to real D1.
- Keep the change small and readable.

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
