# Maliwan 2.0 Repo Bootstrap

## Context
Maliwan 1.0 is a working LINE-based household care assistant.

Big Crew has passed its first quality review with a 27/30 score and is now approved to prepare implementation inputs.

Maliwan 2.0 should be a new standalone repository, separate from Maliwan 1.0 and separate from Big Crew.

## Goal
Create an implementation-ready work package for bootstrapping a new repo called `maliwan-2`.

## Product Direction
Maliwan 2.0 should become a household-aware care orchestrator.

The first technical direction is:
- Cloudflare Worker
- Cloudflare D1 validation
- household-aware sessions
- member-scoped medication
- household-scoped inventory deferred
- admin UI deferred
- JSON seed data acceptable for early setup
- repository boundary between domain logic and D1

## Constraints
- Do not copy Maliwan 1.0 runtime code.
- Do not mix Big Crew code into Maliwan 2.0.
- Do not migrate the whole system.
- Do not build admin UI.
- Do not implement inventory yet.
- Do not refactor old Maliwan 1.0.
- Start with one validation/planning slice only.

## Expected Output
Generate a work package with:
- repo purpose
- initial folder structure
- first README outline
- first ticket split
- D1 validation spike plan
- initial tests
- Codex-ready prompt for creating the new repo skeleton only
- explicit out-of-scope list
- release/readiness checks
