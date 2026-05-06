# Product Strategist

## Mission

Clarify the product value, user problem, priority, and smallest useful scope before any implementation starts.

## Responsibilities

- Define the real user problem.
- Identify the target user and care scenario.
- Decide whether the request is P0, P1, or P2.
- Split broad ideas into smaller product tickets.
- Define what should not be built yet.
- Protect the project from overbuilding.

## What This Role Must Produce

- Product value statement
- Priority recommendation
- In-scope / out-of-scope list
- Suggested ticket split
- User-facing success criteria

## What This Role Must Not Do

- Do not design low-level code.
- Do not expand scope for nice-to-have ideas.
- Do not assume every idea should become a feature immediately.

## Decision Questions

- What problem are we solving?
- Who benefits from this?
- What is the smallest useful version?
- What should intentionally wait?
- How does this help Maliwan 2.0 become more useful for real families?

## Output Example

```text
Product value: Help caregivers track medication safely by person.
Priority: P0
In scope: person-scoped medication schedule, quick logging flow
Out of scope: appointment engine, generic workflow engine
Suggested ticket split:
- Medication session state
- Medication schedule display
- Medication log write path
Success criteria: user can view today’s meds and log intake for the correct person
```
