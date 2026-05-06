# D1 Validation Spike for Maliwan 2.0

## Context
Maliwan 1.0 is a working LINE-based household care assistant that currently uses Google Sheets.

Maliwan 2.0 should move away from Google Sheets because the next version needs:

- multi-household support
- household-aware sessions
- member-scoped medication data
- household-scoped inventory data
- future family admin editing
- auditability
- a more extensible backend architecture

## Goal
Validate whether Cloudflare D1 is a good first SQL data layer for Maliwan 2.0.

This is not a full migration task. This is an architecture validation spike.

## Why This Matters
Google Sheets was good enough for Maliwan 1.0 MVP, but it is becoming hard to extend for household/member boundaries, future admin editing, audit logs, and regression-tested backend workflows.

D1 is a strong candidate because:

- Maliwan already uses Cloudflare Worker.
- D1 provides SQL modeling.
- It keeps the stack low-cost.
- It helps build backend architecture proof for portfolio.
- It can support a gradual migration through repository boundaries.

## Scope
Start with the medication workflow because it has clearer household/member boundaries and higher safety risk than inventory.

## In Scope

- minimal schema for households
- household members
- LINE identities
- medication schedules
- medication logs
- JSON seed data concept
- repository boundary concept
- regression tests for household/member separation
- first ticket for D1 validation only

## Out of Scope

- full migration from Google Sheets
- inventory migration
- meal planning migration
- admin UI
- production auth
- multi-family production onboarding
- medication interaction checking
- medical advice or diagnosis

## Big Crew Role Expectations

- Product Strategist must define product value, smallest useful scope, and ticket split.
- System Architect must propose household/member/session boundaries, D1 schema direction, and repository boundary.
- QA Sentinel must define acceptance criteria and regression tests for household/member isolation.
- Prompt Smith must create a Codex-ready prompt for Ticket 1 only.
- Release Captain must define readiness checks, rollback considerations, and Definition of Done.

## Expected Output

Generate an engineering work package with:

- product value
- architecture impact
- suggested ticket split
- acceptance criteria
- regression tests
- risk notes
- Codex-ready prompt for the first implementation ticket only
- definition of done
