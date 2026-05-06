# Maliwan 1.0 Current State

## What exists

- A LINE-based assistant prototype.
- Food and pantry flows:
  - ดูของในตู้
  - คิดเมนู
- Medication flows:
  - เช็กยาวันนี้
  - บันทึกว่ากินยาแล้วหรือยัง
- Person-scoped medication support for:
  - Rin
  - Benchawan

## Current design direction

- User value comes first.
- Keep medication and food/pantry flows separate.
- Keep medication state person-scoped.
- Keep the bot senior-friendly and simple.

## Relevant constraints

- Do not over-engineer.
- Prefer small safe changes.
- Regression tests matter before release.
- LINE menu wording should stay clear and conversational.
