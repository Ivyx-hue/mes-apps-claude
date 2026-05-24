---
phase: 03-flashcards-srs
plan: "02"
subsystem: verification-gate
tags:
  - verify-gate
  - sm-2
  - node
  - ci
  - persistence
dependency_graph:
  requires:
    - qhse-cesi/srs.js (Plan 03-01 — frozen window.SRS namespace under test)
  provides:
    - .planning/phases/03-flashcards-srs/verify-srs.cjs (executable contract for SC2/SC3/SC4 + PERSIST-01)
  affects:
    - .planning/phases/03-flashcards-srs/03-03-PLAN.md (Plan 03-03 view IIFE must keep the qhse-srs-v1 schema round-trip green)
    - .planning/phases/03-flashcards-srs/03-04-PLAN.md (Plan 03-04 ship gate re-runs this script as the lights-green pre-push check)
tech_stack:
  added:
    - .planning/phases/03-flashcards-srs/verify-srs.cjs — 276-line Node CLI, zero npm deps, built-ins only (assert + path)
  patterns:
    - "Mirror of verify-bank.cjs --final discipline: pass()/fail() helper, allPassed flag, terminal exit-code split"
    - "global.window = {} shim before require() — same dual-runtime bridge documented in srs.js header"
    - "Named PASS lines labeled SC{n}/{REQ-ID} so the gate output doubles as a traceability report"
    - "Edge-case battery E1-E8 lifted verbatim from RESEARCH §1.3 — every assertion has a named identifier"
key_files:
  created:
    - .planning/phases/03-flashcards-srs/verify-srs.cjs
  modified: []
decisions:
  - "Treated --final and no-arg invocation identically: both modes run all 5 assertion groups (a-e). Phase 2's verify-bank.cjs distinguishes iterative vs final mode because the bank evolves; the SRS module is frozen-by-contract, so there is no iterative-mode shortcut."
  - "DST assertion uses CET→CEST boundary 2026-03-28 + 2 → 2026-03-30 (France-specific, matches the deploy audience). Date.getDate() across DST advances by calendar days, not 24h ticks — the (year, monthIndex, day) constructor is what makes this safe."
  - "Schema round-trip uses deepStrictEqual against a literal frozen reference object — guards both the qhse-srs-v1 row shape AND the qhse-prefs-v1 unknown-key preservation contract."
metrics:
  duration: "~5 minutes (orchestrator-resumed; agent had written the file before session-limit cutoff)"
  completed_date: "2026-05-25"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
requirements_completed:
  - SRS-01
  - SRS-02
  - SRS-04
  - PERSIST-01
---

# Phase 3 Plan 02: SRS Verification Gate Summary

**One-liner:** Node CLI gate (`verify-srs.cjs`) with 21 named PASS assertions covering all 8 SM-2 edge cases, qhse-srs-v1 schema round-trip, due-date + DST + leap-year date arithmetic, newCardsPerDay=10 cap simulation, and free-revision structural purity — exits 0 against the Wave 1 srs.js.

## Performance

- **Duration:** ~5 minutes (orchestrator-resumed)
- **Completed:** 2026-05-25
- **Tasks:** 1/1
- **Files created:** 1
- **Files modified:** 0

## What Was Built

`.planning/phases/03-flashcards-srs/verify-srs.cjs` — a 276-line Node-only CLI that requires `qhse-cesi/srs.js` under a `global.window = {}` shim and asserts the full Phase 3 success-criteria contract for the SRS half. Zero npm dependencies, built-ins only (`assert`, `path`). Mirrors Phase 2's `verify-bank.cjs --final` discipline: named `pass()`/`fail()` lines, `allPassed` flag, terminal exit-code split.

### Assertion groups (21 named PASS lines)

| Group | Coverage | Assertions |
|-------|----------|-----------|
| (a) SM-2 math | E1-E8 from RESEARCH §1.3 | 8 |
| (b) Schema round-trip | `qhse-srs-v1` row + `qhse-prefs-v1` unknown-key preservation | 2 |
| (c) Due-date filtering | isDue past/today/future, addDays year-boundary, leap, non-leap, DST, filterDue | 6 |
| (d) newCardsPerDay cap | 15 candidates simulated against cap=10 → exactly 10 introduced | 1 |
| (e) Free-revision purity | Zero side-effecting keys on window.SRS, schedule is pure + non-mutating | 3 |

### Gate output (exit 0)

```
srs.js loaded OK — window.SRS keys: schedule, isDue, addDays, todayLocal, filterDue, countNew, DEFAULTS, GRADE

=== Phase 3 SRS verification gate — SC2/SC3/SC4/SC5 ===

-- (a) SM-2 math: 8 edge cases E1-E8 --
PASS [SC2/SRS-01 E1 first-grade-ever bien on new card]
PASS [SC2/SRS-01 E2 first raté ever]
PASS [SC2/SRS-01 E3 ten consecutive raté ease bottoms at 1.3]
PASS [SC2/SRS-01 E4 raté on brand-new card no negative interval]
PASS [SC2/SRS-01 E5 ease floor preserved on alternating rate/dur]
PASS [SC2/SRS-01 E6 ceil rounding bien rep3 ease 2.5 interval 6]
PASS [SC2/SRS-01 E7 facile on new card]
PASS [SC2/SRS-01 E8 introduced field stable across grades]

-- (b) Schema round-trip: PERSIST-01 --
PASS [SC4/PERSIST-01 qhse-srs-v1 schema JSON round-trip]
PASS [SC4/PERSIST-01 qhse-prefs-v1 schema JSON round-trip preserves unknown keys]

-- (c) Due-date filtering + addDays: SRS-02/SRS-04 --
PASS [SC3/SRS-02 isDue past/today/future]
PASS [SC3/SRS-04 addDays year-boundary 2026-12-31 + 1 → 2027-01-01]
PASS [SC3/SRS-04 addDays leap-year 2024-02-28 + 1 → 2024-02-29]
PASS [SC3/SRS-04 addDays non-leap 2026-02-28 + 1 → 2026-03-01]
PASS [SC3/SRS-04 addDays DST CET→CEST 2026-03-28 + 2 → 2026-03-30]
PASS [SC3/SRS-02 filterDue returns only cards whose row.due <= today]

-- (d) newCardsPerDay cap enforcement (D-03) --
PASS [SC3/SRS-02 newCardsPerDay cap — 15 candidates, cap=10 → exactly 10 introduced]

-- (e) Free-revision purity: SRS-04 / D-06 --
PASS [SC5/SRS-04 free-revision purity — window.SRS has no side-effecting keys]
PASS [SC5/SRS-04 SRS.schedule is pure — same input twice yields equal output]
PASS [SC5/SRS-04 SRS.schedule does not mutate the input row]

======================================================================
--final: ALL Phase 3 SRS gates PASS — window.SRS verified for SC2/SC3/SC4/SC5
```

## Acceptance Criteria Status

| Criterion | Status |
|-----------|--------|
| File `.planning/phases/03-flashcards-srs/verify-srs.cjs` exists | PASS |
| Contains `global.window = {}` shim | PASS |
| Contains `require(...srs.js)` linking back to Plan 03-01 | PASS |
| All 8 SM-2 edge cases E1-E8 from RESEARCH §1.3 named in PASS output | PASS |
| `qhse-srs-v1` schema round-trip asserted via deepStrictEqual | PASS |
| `qhse-prefs-v1` unknown-key preservation asserted | PASS |
| `addDays` leap-year (2024-02-28 → 2024-02-29) asserted | PASS |
| `addDays` DST CET→CEST (2026-03-28 + 2 → 2026-03-30) asserted | PASS |
| `newCardsPerDay = 10` cap — 15 candidates → exactly 10 introduced | PASS |
| `Object.keys(SRS).filter(/persist\|save\|write\|store\|set/i)` returns empty | PASS |
| `schedule()` does not mutate input row (deepStrictEqual snapshot) | PASS |
| `node verify-srs.cjs --final` exits 0 | PASS |
| min_lines 120 (actual: 276) | PASS |

## Deviations from Plan

None — plan executed exactly as written. The agent that authored the file was terminated by a session-limit cutoff between writing the file and committing it; the orchestrator (this session) committed the existing file unchanged after re-running the gate to confirm exit 0.

## Issues Encountered

One — session limit interrupted the original executor between Write and commit. The verify-srs.cjs file was already on disk and passed the gate; the orchestrator session simply added the commit, SUMMARY, and tracking updates to close the plan out cleanly.

## Threat Mitigations Applied

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-03-02-01: silent SM-2 drift | 8 named E1-E8 PASS lines block any merge that breaks the math | Applied |
| T-03-02-02: schema-key drift breaking persistence | qhse-srs-v1 + qhse-prefs-v1 round-trip via deepStrictEqual | Applied |
| T-03-02-03: DST / leap-year off-by-one | Explicit named assertions for both boundaries | Applied |
| T-03-02-04: newCardsPerDay cap silently broken in view | Cap simulation against 15 candidates → exactly 10 | Applied |
| T-03-02-05: side-effecting key sneaked onto window.SRS | Regex assertion + no-mutation snapshot guard | Applied |

## Known Stubs

None. The gate is fully self-contained.

## Next Phase Readiness

- Wave 3 (Plan 03-03) unblocked: the view IIFE can ship with confidence that any qhse-srs-v1 schema drift will be caught locally pre-push.
- Wave 4 (Plan 03-04) will re-run this same gate as the lights-green check before the final ship commit.

## Self-Check: PASSED

- `.planning/phases/03-flashcards-srs/verify-srs.cjs` exists: FOUND
- `node verify-srs.cjs --final` exits 0: VERIFIED (21 PASS lines, 0 FAIL)
- All 8 SM-2 edge cases named in output: VERIFIED
- Schema round-trip both keys: VERIFIED
- newCardsPerDay cap simulation: VERIFIED
- Free-revision purity: VERIFIED
