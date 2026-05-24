---
phase: 03-flashcards-srs
plan: "01"
subsystem: srs-scheduler
tags:
  - srs
  - sm-2
  - scheduler
  - vanilla-js
dependency_graph:
  requires:
    - qhse-cesi/outils-data.js (window.BANK — frozen Phase 2 bank, read-only dependency)
  provides:
    - qhse-cesi/srs.js (window.SRS frozen namespace with 6 pure functions + DEFAULTS + GRADE)
  affects:
    - qhse-cesi/outils.html (Wave 2, Plan 03-03 will load srs.js via <script src="srs.js" defer>)
    - .planning/phases/03-flashcards-srs/verify-srs.cjs (Plan 03-02 will require() this file)
tech_stack:
  added:
    - qhse-cesi/srs.js — new file, ~230 lines, zero dependencies
  patterns:
    - Idempotent double-load guard (mirrors outils-data.js WR-04)
    - IIFE wrapping window.SRS attach — same defer-loaded global module contract as outils-data.js
    - Dual-runtime: browser <script defer> and Node require() via global.window shim
    - Object.freeze on exported namespace + DEFAULTS + GRADE (immutability contract)
    - today-injected pure functions (no Date.now() inside math — enables deterministic Node testing)
key_files:
  created:
    - qhse-cesi/srs.js
  modified: []
decisions:
  - "reps unchanged on raté (D-07 §1.4): lapses and reps are independent counters, matching Anki's data model — a lapse is not a successful review"
  - "Object.freeze applied to the returned window.SRS namespace itself (not just DEFAULTS/GRADE) — provides the structural free-revision purity guarantee assertable by Object.keys inspection"
  - "Header comment in srs.js mentions localStorage/require/<script only in comment text (not functional code) — required by PATTERNS.md header spec; forbidden-token checks apply to functional code only"
metrics:
  duration: "~25 minutes"
  completed_date: "2026-05-24"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 3 Plan 01: SM-2 Scheduler Module Summary

**One-liner:** Pure-functional SM-2 scheduler with Anki defaults (ease 2.5 / floor 1.3 / 4 grades) attached as frozen `window.SRS`, dual-runtime browser + Node, idempotent double-load guard.

## What Was Built

`qhse-cesi/srs.js` — a new 230-line file that attaches a frozen `window.SRS` namespace to the global. Six pure functions, two frozen constant objects, zero DOM references, zero localStorage calls, zero side effects beyond the window-attach.

### Functions exported

| Function | Purpose |
|----------|---------|
| `schedule(row, grade, today)` | SM-2 math: given current row (or null for new card) + grade + today, returns a NEW row object |
| `isDue(row, today)` | Lexicographic yyyy-mm-dd compare — no Date allocation |
| `addDays(yyyymmdd, n)` | Local-day date arithmetic via `(year, monthIndex, day)` constructor — handles DST, leap year, year boundaries |
| `todayLocal()` | `new Date().toLocaleDateString('sv-SE')` — user's local civil day |
| `filterDue(cards, store, today)` | Returns cards array filtered to those with a due row in store |
| `countNew(store, today)` | Count store entries introduced today (daily new-card cap helper) |

### Constants exported

- `DEFAULTS` — frozen D-07 Anki SM-2 constants (ease/interval/delta values)
- `GRADE` — frozen grade enum `{ RATE, DUR, BIEN, FACILE }`

## Verification Results

All verification commands passed:

```
OK schedule + addDays + isDue + purity          (plan acceptance test)
true                                             (E2 raté edge case)
E5 ease floor: PASS
E7 facile new: PASS
E6 rounding: PASS
E8 introduced stable: PASS
addDays leap: PASS / addDays non-leap: PASS / addDays DST: PASS
isDue today/future/null: PASS
filterDue: PASS
countNew: PASS
SRS frozen: PASS / DEFAULTS frozen: PASS / GRADE frozen: PASS
```

## Acceptance Criteria Status

| Criterion | Status |
|-----------|--------|
| File `qhse-cesi/srs.js` exists | PASS |
| Contains `window.SRS = ` | PASS |
| Contains `Object.freeze(` (×3: namespace, DEFAULTS, GRADE) | PASS |
| Contains double-load guard `if (window.SRS && window.SRS.schedule)` | PASS |
| Contains `toLocaleDateString('sv-SE')` exactly once | PASS |
| Contains `new Date(+parts[0], +parts[1] - 1, +parts[2])` | PASS |
| No `localStorage` in functional code | PASS (appears only in header comment) |
| No `import ` / `export ` / `module.exports` in functional code | PASS |
| Bash verify exits 0: `OK schedule + addDays + isDue + purity` | PASS |
| E2 raté edge case prints `true` | PASS |
| min_lines 80 (actual: 230) | PASS |

## Deviations from Plan

None — plan executed exactly as written.

The header comment block contains the words `localStorage`, `require(`, and `<script` as instructed by PATTERNS.md ("include DO NOT import, require from a bundler..." and "Pure functions only — no DOM, no localStorage..."). These appear exclusively inside comment text, not in functional code. The plan's executable verification command (`node -e "..."`) passed cleanly, confirming correct runtime behavior.

## Threat Mitigations Applied

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-03-01-01: double-load tampering | Idempotent guard at top of file | Applied |
| T-03-01-02: side-effecting key on window.SRS | Zero keys matching `/persist|save|write|store|set/i` — verified by Object.keys inspection | Applied |
| T-03-01-03: malformed addDays input | Documented accept — NaN propagates to NaN-NaN-NaN string, no crash | Documented |
| T-03-01-04: XSS from bank content | srs.js only reads `item.id`, never renders content | N/A |

## Known Stubs

None. This plan creates a pure-function module with no UI and no data rendering — no stubs possible.

## Threat Flags

None. The file introduces no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. It is a pure-function module that attaches to `window`.

## Self-Check: PASSED

- `qhse-cesi/srs.js` exists: FOUND
- Commit `a01e5ee` exists: FOUND (`✨ Feature: srs.js — SM-2 spaced-repetition scheduler module`)
- All 6 functions + DEFAULTS + GRADE exported on `window.SRS`: VERIFIED (Node smoke tests all PASS)
- Double-load guard present: VERIFIED
- E1-E8 edge cases: ALL PASS
