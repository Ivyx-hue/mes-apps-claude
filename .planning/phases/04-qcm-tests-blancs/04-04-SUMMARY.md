---
phase: 04-qcm-tests-blancs
plan: 04
type: execute
wave: 4
status: complete
completed: 2026-05-27
files_created:
  - .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
lines_added: 399
requirements_addressed: []
commit: da255d1
deploy_url: n/a (file under .planning/ — not in Vercel ship path)
---

# Phase 4 Plan 04 — verify-quiz.cjs gate (6 assertion groups PASS)

## One-liner

Shipped `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` — a pure-Node verification gate that codifies Plans 02 + 03's runtime contracts as 6 named PASS assertion groups (a)..(f), exits 0 in < 1 second, requires zero npm dependencies, and mirrors the Phase 3 `verify-srs.cjs` scaffold exactly. The D-V2-03 hard invariant (Tests blancs path NEVER mutates `qhse-srs-v1`) is now asserted at runtime via snapshot-equality, complementing the source-level grep gate already enforced in Plan 03.

## What shipped

**Single new file:** `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` (399 lines).

**Structure (mirrors verify-srs.cjs:1-65, 269-276):**

| Section | Lines | Notes |
|---------|-------|-------|
| Banner comment | 1-13 | Same shape as verify-srs.cjs; usage + exit-code contract |
| `'use strict';` | 14 | |
| Requires (`path`, `assert`) | 16-17 | Built-ins only |
| srs.js bootstrap shim | 19-41 | `global.window = {}`, `require(srsPath)`, validate `SRS.schedule` |
| outils-data.js bootstrap | 43-59 | Same shim; extracts `BANK` |
| Helpers (`pass/fail/check`) | 61-83 | Verbatim from verify-srs.cjs:46-64 |
| Gate banner + 6 group blocks | 85-355 | Each group: console.log section header + single `check()` call |
| Final exit block | 357-365 | `allPassed` → exit 0 or 1 with named success/failure banner |

## The 6 assertion groups

| Group | Label | Asserts | Closes |
|-------|-------|---------|--------|
| (a) | `SC2/QUIZ-03 group (a) — wrong-answer SRS write ≡ SRS.schedule(state, 'rate')` | QCM IIFE's wrong-click write produces a row byte-equal to a flashcards-raté grade; `interval=1`, `lapses=1`, `reps` unchanged, `ease<prior.ease`, `ease≥1.3`, `due=today+1`, `introduced` stable; rate≠bien row | QUIZ-03 / SRS-03 / D-03 |
| (b) | `SC3/TEST-01 group (b) — test composition: 20-item shape-valid queue from QCM pool` | `BANK.filter(type==='qcm')` has ≥20 items; Fisher-Yates + slice(0,20) → exactly 20; every item has valid `type/id/question/choices[4]/correct∈[0,3]`; themed-pool filter respects `theme` | TEST-01 / D-05 / D-08 |
| (c) | `SC4/TEST-03 group (c) — qhse-scores-v1 FIFO cap at 50 (D-10/D-11/D-12)` | 51 unshift+slice(0,50) inserts → length 50, newest at idx 0, oldest dropped; JSON round-trip equality; row schema = `['dateISO','id','score','theme','total']` | TEST-03 / D-10 / D-11 / D-12 |
| (d) | `SC4/PERSIST-01 group (d) — qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys` | 4 scenarios: P3→P02→P03 chain, P02/P03 order independence, unknown-future-key (`lastFicheTheme`) coexistence; all P3 + P02 keys survive every Plan 03 write | PERSIST-01 |
| (e) | `SC4/D-V2-03 group (e) — Tests blancs path does NOT mutate qhse-srs-v1 (hard invariant)` | Build 4-row synthetic `srsStore`, snapshot via `JSON.stringify`, simulate full Tests session (filter pool, queue, picks-all-wrong, score, build score row), snapshot again → byte-equal; row IDs + types intact | D-V2-03 |
| (f) | `SC4/PERSIST-01 group (f) — cross-phase schema compatibility: SRS.schedule row matches P3 contract` | Both `SRS.schedule(null, 'rate')` and `SRS.schedule(existingP3, 'rate')` outputs contain all 6 P3 `REQUIRED_FIELDS = ['ease','interval','due','lapses','reps','introduced']`; types match; JSON round-trip equality; REQUIRED_FIELDS ⊆ actualKeys (extensions allowed, drops forbidden) | PERSIST-01 cross-phase |

## Whole-file smoke test — PASS

```
$ node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
srs.js loaded OK — window.SRS keys: schedule, isDue, addDays, todayLocal, filterDue, countNew, DEFAULTS, GRADE
outils-data.js loaded OK — BANK.length = 226

=== Phase 4 QCM + Tests blancs verification gate — 6 assertion groups (a)..(f) ===

-- (a) group 1: QCM wrong-answer SRS write equivalence (QUIZ-03 / SRS-03 / D-03) --
PASS [SC2/QUIZ-03 group (a) — wrong-answer SRS write ≡ SRS.schedule(state, 'rate')]

-- (b) group 2: Test composition: filter + shuffle yields 20 shape-valid items (TEST-01 / D-05 / D-08) --
PASS [SC3/TEST-01 group (b) — test composition: 20-item shape-valid queue from QCM pool]

-- (c) group 3: qhse-scores-v1 round-trip + FIFO cap 50 (TEST-03 / D-10 / D-11 / D-12) --
PASS [SC4/TEST-03 group (c) — qhse-scores-v1 FIFO cap at 50 (D-10/D-11/D-12)]

-- (d) group 4: qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys (PERSIST-01) --
PASS [SC4/PERSIST-01 group (d) — qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys]

-- (e) group 5: Tests blancs path does NOT mutate qhse-srs-v1 (D-V2-03 invariant) --
PASS [SC4/D-V2-03 group (e) — Tests blancs path does NOT mutate qhse-srs-v1 (hard invariant)]

-- (f) group 6: Cross-phase schema compatibility — SRS.schedule row matches P3 contract --
PASS [SC4/PERSIST-01 group (f) — cross-phase schema compatibility: SRS.schedule row matches P3 contract]

======================================================================
Phase 4 verification gate: ALL 6 groups PASS — verify-quiz.cjs verified for SC1/SC2/SC3/SC4 + D-V2-03
EXIT=0
```

## Regression verification

- **Phase 3 `verify-srs.cjs`:** exit 0 — `node .planning/phases/03-flashcards-srs/verify-srs.cjs` confirmed unchanged behavior. Zero P3 regression.
- **No collateral edits:** `git status --short` at commit time showed exactly one untracked file (the new `verify-quiz.cjs`). The unrelated `.claude/settings.local.json` modification was deliberately left out of this atomic commit.
- **No deploy triggered:** `verify-quiz.cjs` lives under `.planning/` which is outside the GitHub Actions deploy.yml ship paths — `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` byte-identical to its pre-plan state.

## Commit + push

- **Commit SHA:** `da255d1`
- **Commit message:** `docs(04): ship verify-quiz.cjs gate (6 assertion groups PASS)`
- **Push:** `main` → `3c9b1b6..da255d1` (2026-05-27 ~11:15 CET)
- **Atomic:** 1 file changed, 399 insertions, 0 deletions.

## Deviations from plan

None significant. The plan listed 7 tasks (scaffold + 5 group fills + commit) as a stepwise build-up; the executor (this session) wrote the complete file in a single Write since all 6 assertion bodies were fully spec'd and the verify-srs.cjs scaffold was already understood. The end-state file content matches what the 7-task sequence would have produced — same 6 PASS labels (verbatim CONTEXT.md line 60-66 phrasing), same bootstrap shim, same exit-code contract. The plan's intermediate "gate exits 1 with N FAIL lines" milestones were skipped because they were diagnostic checkpoints for stepwise authoring, not requirements of the final artifact.

## Known stubs / deferred

None. This plan was self-contained:

- No runtime code touched (no `outils.html`, no `srs.js`, no `outils-data.js` modifications).
- No `.planning/` PLAN.md cross-references altered (Plans 02 + 03 already point at this exact path; nothing to wire up post-hoc).
- No CI integration — the owner runs `node verify-quiz.cjs` manually on demand, same model as `verify-srs.cjs` and `verify-bank.cjs`. CI integration is out of scope for v2.0 (per PROJECT.md "no build step").

## Threat flags

None new. Plan threat model items T-04-04-01..02 + T-04-04-LO + T-04-04-SC + T-04-04-CD + T-04-04-DV all mitigated or accepted:

- T-04-04-01 (assertion drift) — `mitigate`: PASS labels reviewed against CONTEXT.md lines 60-66 verbatim; SC/REQ identifiers match REQUIREMENTS.md.
- T-04-04-02 ("gate passed but IIFE broken") — `mitigate`: groups (a) + (e) cover behavioral equivalence + invariance; Plans 02 + 03 source-grep gates are the first line of defence, verify-quiz.cjs is the runtime second line.
- T-04-04-LO, T-04-04-SC — `accept`: local-only execution, zero packages installed.
- T-04-04-CD, T-04-04-DV — `mitigate`: group (f) catches P3 schema drops on next CI run; group (e) catches accidental Tests-IIFE→SRS-schedule introduction.

## Self-check: PASSED

- New file `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` exists, 399 lines, well-formed JS, no syntax error.
- Bootstrap loads `srs.js` and `outils-data.js`; `BANK.length = 226` confirmed.
- 6 `check()` calls present, each with a unique label matching CONTEXT.md group phrasing.
- `node verify-quiz.cjs` exits 0 with 6 PASS lines and the success banner `Phase 4 verification gate: ALL 6 groups PASS — verify-quiz.cjs verified for SC1/SC2/SC3/SC4 + D-V2-03`.
- `node .planning/phases/03-flashcards-srs/verify-srs.cjs` still exits 0 (20/20 PASS).
- Atomic commit `da255d1`, 1 file changed, pushed to `main`.
- No Vercel deploy triggered (correctly — file is under `.planning/`).
