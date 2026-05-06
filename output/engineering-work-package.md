# Big Crew Engineering Work Package

## Task Summary
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

## Product Value
- Clarify the user value and the smallest useful outcome.
- Task summary: # D1 Validation Spike for Maliwan 2.0

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
- Keep the scope narrow and testable.
- Prefer the smallest workflow that still helps the user.

## Priority
- Keep the scope narrow and testable.
- Prefer the smallest workflow that still helps the user.

## In Scope
- Keep the scope narrow and testable.
- Separate orchestration from templates.

## Out of Scope
- Complex orchestration
- External AI API integration

## Architecture Impact
- Define a simple structure that can be extended later.
- Keep the entry point thin.
- Separate orchestration from templates.
- Architecture hint for: # D1 Validation Spike for Maliwan 2.0

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
- Primary product focus: Clarify the user value and the smallest useful outcome.

## Acceptance Criteria
- Define the minimum regressions that must stay green.
- Add a happy-path check and one negative-path check.
- Verify the generated package stays readable.
- Test anchor: # D1 Validation Spike for Maliwan 2.0

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
- Scope anchor: Clarify the user value and the smallest useful outcome. / Define a simple structure that can be extended later.

## Regression Tests
- Add a happy-path check and one negative-path check.
- Verify the generated package stays readable.

## Codex-Ready Prompt
- Turn the task into a clear work package request.
- Use concise markdown headings.
- Avoid AI-provider-specific language.
- Input: # D1 Validation Spike for Maliwan 2.0

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
- Framing: Clarify the user value and the smallest useful outcome. + Define a simple structure that can be extended later.

## Definition of Done
- Describe a safe, shippable checkpoint and handoff.
- Keep release steps explicit.
- Require tests before merge.
- Release input: # D1 Validation Spike for Maliwan 2.0

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
- Release guardrails: Define the minimum regressions that must stay green. / Define a simple structure that can be extended later.

## Release Captain
- Describe a safe, shippable checkpoint and handoff.
- Keep release steps explicit.
- Require tests before merge.
- Release input: # D1 Validation Spike for Maliwan 2.0

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
- Release guardrails: Define the minimum regressions that must stay green. / Define a simple structure that can be extended later.

## Notes
- No external AI API is used in this MVP.
- This package is rule-based and template-based only.
