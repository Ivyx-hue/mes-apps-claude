---
phase: 03-flashcards-srs
plan: "04"
subsystem: integration-ship
tags:
  - integration
  - regression
  - smoke-test
  - human-verify
  - ship
  - hotfix
dependency_graph:
  requires:
    - qhse-cesi/srs.js (Plan 03-01 — SM-2 module)
    - .planning/phases/03-flashcards-srs/verify-srs.cjs (Plan 03-02 — Node gate)
    - qhse-cesi/outils.html + qhse-cesi/chassis.css (Plan 03-03 — Flashcards view)
  provides:
    - .planning/phases/03-flashcards-srs/03-SMOKE-TEST.md (executed owner walk-through; all 5 ROADMAP SC + regression + a11y + mobile + free-revision PASS)
    - Phase 3 completion gate (closes FLASH-01/02, SRS-01/02/04, PERSIST-01; SRS-03 partial)
  affects:
    - .planning/STATE.md (bumped to 3/5 phases, 13/13 plans, 60%)
    - .planning/REQUIREMENTS.md (6 Phase 3 reqs marked Complete; SRS-03 marked Partial)
    - .planning/ROADMAP.md (Phase 3 checkbox ticked + Progress table updated 4/4 Complete 2026-05-25)
tech_stack:
  added: []
  patterns:
    - "DOMContentLoaded guard for inline IIFE consuming a deferred global — wrap body in boot() + readyState check. New project pattern: any future inline view IIFE that reads window.BANK/window.SRS/etc. uses this gate."
key_files:
  created:
    - .planning/phases/03-flashcards-srs/03-SMOKE-TEST.md
    - .planning/phases/03-flashcards-srs/03-04-SUMMARY.md
  modified:
    - qhse-cesi/outils.html (hotfix 0553899 — DOMContentLoaded wrap, +11 lines)
    - .planning/STATE.md (Phase 3 closed; Phase 4 next)
    - .planning/REQUIREMENTS.md (SRS-01 → Complete; SRS-03 → Partial with P3/P4 split note)
    - .planning/ROADMAP.md (Phase 3 ticked + Plans list filled + Progress table updated)
decisions:
  - "Inline scripts ignore `defer` per HTML5 spec — inline IIFE reading a deferred-loaded global MUST wait for DOMContentLoaded. Encoded as a reusable boot() + readyState pattern."
  - "SRS-03 explicitly split P3/P4: P3 ships the flashcard-grade-feeds-SRS half + asserted schema; P4 ships the wrong-QCM-feeds-SRS half. Marking SRS-03 'Complete' in P3 would understate the remaining work."
  - "All 5 ROADMAP success criteria annotated with `✅ owner-verified 2026-05-25` in ROADMAP.md — provides direct traceability from the visible deliverable back to the success contract."
metrics:
  duration: "~45 minutes (Task 1 automated gates + smoke-test write; Task 2 owner walk-through + DCL hotfix discovery + fix + re-test; Task 3 tracking updates + ship)"
  completed_date: "2026-05-25"
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 4
requirements_completed:
  - FLASH-01
  - FLASH-02
  - SRS-01
  - SRS-02
  - SRS-04
  - PERSIST-01
---

# Phase 3 Plan 04: Integration + Ship Summary

**One-liner:** Owner walk-through PASS on all 5 ROADMAP success criteria + 6/6 automated gates green; one hotfix surfaced (inline IIFE racing deferred globals) and shipped before the final commit closes Phase 3.

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-05-25
- **Tasks:** 3/3
- **Files created:** 2
- **Files modified:** 4

## What Shipped

### Task 1 — Automated gates + smoke-test checklist
Ran all 5 automated checks before opening the browser:
1. `node verify-srs.cjs` → exit 0 (21 named PASS lines covering SM-2 E1-E8, qhse-srs-v1 schema, DST/leap/year-boundary date math, newCardsPerDay cap, free-revision purity)
2. `BANK.length === 226` (Phase 2 invariant) → PASS
3. 15 locked theme slugs present in BANK → PASS
4. Phase 1 tablist IIFE intact (`keydown` handler + `aria-selected` attrs) → PASS
5. `chassis.css` contains both `.biblio-card__title` (P1) and `.fc-card` (P3) → PASS
6. Root QHSE Trainer `/index.html` untouched by Phase 3 (SHELL-04) → PASS

Wrote `03-SMOKE-TEST.md` (129 lines) with the 6 automated gates ticked + full owner walk-through checklist for SC1-5 + regression + free-revision + mobile + a11y + final ship. Commit `c94a508`.

### Task 2 — Owner walk-through (browser, blocking checkpoint)

**Hotfix surfaced and shipped during the walk-through.**

First browser load showed the pre-flight error: "Impossible de charger la banque de cartes. Recharge la page ou vérifie que outils-data.js est bien servi." Root cause: the Flashcards `<script>` block is **inline**, so it executes during HTML parsing — strictly BEFORE the deferred `outils-data.js` and `srs.js` have evaluated. The pre-flight check read `window.BANK` while it was still `undefined`.

Fix: wrap the IIFE body in a `boot()` function and dispatch via `DOMContentLoaded` listener (deferred scripts complete before DCL fires, so globals are guaranteed populated). +11 lines, 0 deletions. Commit `0553899`.

After the hotfix the owner walked through:
- **SC1** Recto → Reveal → Verso: PASS
- **SC2** Grade buttons advance + persist (qhse-srs-v1 schema correct, keyboard 1/2/3/4 works): PASS
- **SC3** Bandeau dues counter reflects only due cards: PASS
- **SC4** Reload survives (theme + cap restored from qhse-prefs-v1; SRS rows intact): PASS
- **SC5** Raté re-queues (lapses>=1, interval=1, due=tomorrow): PASS
- Regression: tabs Fiches/QCM/Tests still show placeholders, ArrowLeft/Right works, Hub Accueil/Découverte/Biblio identical, root QHSE Trainer unchanged
- Free-revision purity: qhse-srs-v1 strictly unchanged after multiple "Carte suivante" clicks
- Mobile responsive (DevTools emulator) + A11y (tab order, focus rings, sr-only h2, aria-label grade buttons): PASS

Owner approval received: **"Approved"**.

### Task 3 — Final ship
- `.planning/STATE.md`: status `phase_complete`, 3/5 phases (60%), Phase 4 next; added 2 Key Decisions (DCL inline pattern, SRS-03 P3/P4 split)
- `.planning/REQUIREMENTS.md`: SRS-01 `[ ]` → `[x]` with traceability note; SRS-03 demoted to Partial with P3/P4 split annotation; traceability table updated (SRS-01 Complete, SRS-03 Partial Phase 3→4)
- `.planning/ROADMAP.md`: Phase 3 ticked with completion date; success criteria annotated `✅ owner-verified 2026-05-25`; Plans list filled with 4 plan files; Progress table v2.0 Phase 3 row → `4/4 Complete 2026-05-25`
- `03-SMOKE-TEST.md`: all walk-through boxes ticked
- Single ship commit + push to main (this commit)

## Acceptance Criteria Status

| Criterion | Status |
|-----------|--------|
| `node verify-srs.cjs` exits 0 | PASS |
| `BANK.length === 226` | PASS |
| `window.SRS.schedule` is `function` | PASS |
| `03-SMOKE-TEST.md` exists with SC1, SC2, SC3, SC4, SC5, Regression, Free-revision, Mobile, A11y, Final ship sections | PASS |
| Plan 03-01/02/03 commits already landed | PASS (a01e5ee, 19aa162, 803c4b8, 9cc1f2e, 59d3751, c881231) |
| All 5 ROADMAP SC manually verified by owner | PASS |
| Phase 1 tablist + v1.0 Hub + root QHSE Trainer regression-free | PASS |
| Free-revision purity (qhse-srs-v1 unchanged) | PASS |
| Final commit pushed to main | PASS (this commit) |

## Deviations from Plan

**One — DOMContentLoaded hotfix surfaced during Task 2 walk-through.**

The plan's Task 1 automated gates (file-presence, AST-grep, exit-code checks) cannot detect this class of bug — it's a load-order race that only manifests in a real browser. The smoke-test walk-through caught it exactly as designed. Hotfix commit `0553899` ships +11 lines and zero deletions; downstream impact is zero on srs.js, chassis.css, outils-data.js, the tablist IIFE, and the verify-srs.cjs gate. Walk-through resumed and completed PASS after re-test.

## Issues Encountered

- **Inline IIFE racing deferred globals** — see Deviations. Fixed via `boot()` + `document.readyState === 'loading'` guard. Reusable pattern recorded as a Key Decision in STATE.md.

## Threat Mitigations Applied

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-03-04-01: ship without owner verification | Task 2 is `checkpoint:human-verify` gate=blocking — pause until "approved" signal | Applied |
| T-03-04-02: hidden regression in Phase 1/2 deliverables | 5 automated regression gates (BANK length, theme slugs, tablist intact, chassis.css both namespaces, root index.html untouched) | Applied |
| T-03-04-03: SHELL-04 invariant violation (root QHSE Trainer mutated) | `git log -- index.html` over Phase 3 commit range → empty diff confirmed | Applied |

## Known Stubs

None remaining for Phase 3. The flashcards-wrong-QCM-feed half of SRS-03 is intentionally deferred to Phase 4 (the QCM module itself doesn't exist yet — same-phase coupling rejected during planning).

## Next Phase Readiness

- **Phase 4 (QCM + Tests blancs)** unblocked. The verify-srs.cjs gate becomes the regression guard for any P4 write into `qhse-srs-v1` — if the QCM wrong-answer feed drifts from the asserted schema, the gate catches it pre-push.
- Phase 4 next entry: `/gsd-discuss-phase 4`.

## Self-Check: PASSED

- All 3 tasks executed (automated gates + owner walk-through + final ship)
- Hotfix surfaced + applied + re-test PASS
- All 5 ROADMAP SC owner-verified
- STATE.md / REQUIREMENTS.md / ROADMAP.md all consistent (3/5 phases, 13/13 plans, 60%)
- 03-SMOKE-TEST.md fully ticked
- Phase 3 closed.
