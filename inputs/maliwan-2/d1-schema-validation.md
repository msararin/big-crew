# Maliwan 2.0 D1 Schema Validation

## Product Vision
Maliwan 2.0 is a household-aware care orchestrator for senior-friendly family care workflows.

The goal is not to build a generic chatbot.

The goal is to help caregivers and senior family members complete practical daily care tasks more safely and simply through familiar LINE-based interactions.

Maliwan should reduce typing, reduce confusion, and make important household care routines easier to track.

The first high-value workflow is medication tracking because medication data must be accurate, member-scoped, and safe from household/member mix-ups.

## Context
maliwan-2 has been bootstrapped as a standalone repository.

The repo already includes:
- Cloudflare Worker skeleton
- D1 schema placeholder
- JSON seed placeholder
- household/member/LINE identity boundary direction
- smoke tests
- no Maliwan 1.0 runtime code copied
- no Big Crew runtime code copied

Big Crew has already generated and reviewed the repo bootstrap package. The next step is to validate the first SQL-backed data boundary before implementing runtime behavior.

## Goal
Create an implementation-ready work package to validate and improve the initial Cloudflare D1 schema for household-aware, member-scoped medication data.

This is a schema validation task, not a runtime feature implementation task.

## Product Value
Maliwan 2.0 should safely support care workflows for multiple household members.

The schema must protect the product vision:
- medication schedules must belong to the correct household member
- medication logs must not mix between Rin and Benchawan
- caregiver actions should be traceable through LINE identity mapping
- future senior-friendly flows should be built on reliable data boundaries
- the system should become easier to extend than Google Sheets without losing simplicity

## User Context
Early household context:
- Household: Malaithong household
- Care members:
  - Rin
  - Benchawan
- Family admin/caregiver may use LINE to view, confirm, or record care tasks
- Inventory is household-scoped but deferred for this slice
- Medication is member-scoped and is the first validation slice

## Scope
Focus only on the D1 schema and seed data validation.

## In Scope
- households table
- household_members table
- line_identities table
- medication_schedules table
- medication_logs table
- seed data for one household
- two members: Rin and Benchawan
- tests that verify schema and seed placeholders include required tables and fields
- repository boundary reminder, but no repository implementation yet

## Out of Scope
- LINE webhook runtime
- medication read runtime
- medication log runtime
- inventory
- meal planning
- admin UI
- production authentication
- full migration from Maliwan 1.0
- copying Maliwan 1.0 runtime code
- copying Big Crew runtime code

## Constraints
- Keep this as one validation slice.
- Do not implement runtime medication behavior yet.
- Do not connect to real D1 yet unless the existing skeleton already supports a safe local validation pattern.
- Prefer testable schema/seed validation over broad implementation.
- Keep the change small enough for one Codex task.
- Do not optimize for technical beauty over care workflow reliability.
- The schema should support future senior-friendly LINE flows without requiring those flows now.

## Expected Output
Generate an implementation-ready work package with:
- product value tied to the senior-friendly family care vision
- priority
- suggested ticket split
- architecture impact
- acceptance criteria
- regression tests
- Codex-ready prompt for Ticket 1 only
- definition of done
- release readiness checks

## Big Crew Quality Target
The generated work package should be strong enough to score 27–30/30 before it is used as implementation input for maliwan-2.

วลา Big Crew ทำงานให้ Maliwan 2.0 ต้องไม่ลืมลำดับนี้:

Product vision
→ user/care workflow
→ data boundary
→ technical implementation

ไม่ใช่:

database
→ schema
→ tests
→ product ค่อยตามมาเวอร์ชันก่อนเริ่มจาก:

validate D1 schema

เวอร์ชันใหม่เริ่มจาก:

ทำให้ senior-friendly family care workflow มี data foundation ที่ปลอดภัยและไม่ปนคน  Maliwan 2.0 คือ:

household-aware care orchestrator
ที่ช่วยให้ครอบครัวดูแลผู้สูงอายุใน daily routine ได้ง่ายขึ้น
โดยเริ่มจาก workflow ที่มี risk และ value สูงก่อน: medication tracking

แก่นคือ:

- ผู้สูงอายุไม่ควรต้องพิมพ์เยอะ
- caregiver ต้องเช็กและบันทึกสิ่งสำคัญได้ง่าย
- ข้อมูลยาไม่ควรปนกันระหว่างสมาชิกในบ้าน
- ระบบต้อง reliable กว่าบอทที่ตอบได้เฉย ๆ
- architecture ต้องรองรับครอบครัวจริง ไม่ใช่ demo
