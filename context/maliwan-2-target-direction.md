# Maliwan 2.0 Target Direction

Maliwan 2.0 should become a household-aware care orchestrator.

It should support:

- `household_id`
- `member_id`
- LINE identity mapping
- member-scoped medication
- household-scoped inventory
- future family admin editing

Google Sheets should be replaced as the core data layer.
Cloudflare D1 is the current preferred candidate for the first SQL-backed data layer because the current system already uses Cloudflare Worker and the portfolio goal is to learn backend architecture while keeping cost low.

Admin UI is not required yet.
JSON seed files or simple developer-admin data files are acceptable for the early version.

The first validation slice should be the medication workflow because it has clear household/member boundaries and higher safety risk than inventory.

## Big Crew Design Principle

Big Crew should transform product ideas into scoped, testable, Codex-ready engineering work packages.

It should help reduce ambiguity, avoid overbuilding, split tickets, define acceptance criteria, define regression tests, and produce safer implementation prompts.
