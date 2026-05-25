---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Étude
status: phase_complete
stopped_at: Phase 3 complete — owner-verified all 5 ROADMAP SC + 6/6 automated gates green
last_updated: "2026-05-24T23:25:00.000Z"
progress:
  total_phases: 5
  completed_phases: 3
  total_plans: 13
  completed_plans: 13
  percent: 60
---

# Project State: QHSE CESI Hub

**Last updated:** 2026-05-16
**Session start:** 2026-05-16

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-16 after v1.0)

**Core value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without digging through scattered sources every time. *(v2.0 extends this with: actively revise that content and track mastery.)*

**Current focus:** Phase 4 — QCM + Tests blancs (next; Phase 3 closed 2026-05-25)

**Mode:** mvp · **Granularity:** coarse
**Deploy target:** `https://mes-apps-claude.vercel.app/qhse-cesi/` (live, HTTP 200)
**Source:** `qhse-cesi/index.html` (944 lines) + `qhse-cesi/LEGAL.md`

## Current Position

Phase: 03 (flashcards-srs) — COMPLETE
Next:  Phase 4 — QCM + Tests blancs (awaiting `/gsd-discuss-phase 4`)

```
Milestone : v2.0 Étude
Phase     : 3 — Flashcards + SRS (COMPLETE, owner-verified 2026-05-25)
Plans     : 4/4 complete (srs.js + verify gate + view DOM/IIFE/CSS + ship)

[██████░░░░] 60% — 3/5 phases complete
```

## Accumulated Context

Full decision log in `.planning/PROJECT.md` (Key Decisions). Full v1.0 milestone record in `.planning/MILESTONES.md`. V1.0 phase artifacts archived to `.planning/milestones/v1.0-phases/`. Retrospective in `.planning/RETROSPECTIVE.md`.

### Constraints in Effect (carried to v2.0)

- `chassis.css` extracted in Phase 1 — both `index.html` and `outils.html` load it via `<link>`; no build step.
- Root QHSE Trainer (`/index.html`) is a frozen sibling — zero modifications allowed.
- v1.0 Hub content (Accueil, Découverte, Biblio) must be regression-free through all v2.0 phases.
- No backend, no accounts, no sync, no runtime AI generation — `localStorage` only.
- No `.pdf` under `/qhse-cesi/`; dark default; GitHub Actions pipeline only.
- **Link discipline:** content-verify every external URL before ship (real `<title>` + topic match + soft-404 grep). HTTP-status audits banned. Memory: `feedback_verify_links_before_ship.md`.
- Token-conscious: commit/push atomically (owner hits weekly caps mid-task).
- **Content accuracy (Phase 2+):** every `source.url` must be content-verified; no unsourced regulatory claim ships.

### Open Blockers

None. v1.0 closed clean; v2.0 roadmap approved; ready to plan Phase 1.

### Key Decisions (v2.0)

| Decision | Outcome |
|----------|---------|
| Phase numbering reset at 1 for v2.0 | Owner-confirmed; v1.0 phases archived |
| PERSIST-02 mapped to Phase 1 | It is a standing architectural invariant established when the file architecture is created |
| PERSIST-01 mapped to Phase 3 | First fully realized when SM-2 scheduler + all three localStorage keys are live |
| Granularity: coarse | 5 phases = natural delivery boundaries from spec; no compression needed |
| D-04: 4-tab ARIA tablist locked order | Flashcards · Fiches de révision · QCM · Tests blancs — source-order asserted |
| D-05: ARIA tab pattern (JS, not CSS-only) | role=tablist/tab/tabpanel, aria-selected, roving tabindex, hash sync — scoped to outils.html only |
| D-06: Dated placeholders per panel | Flashcards=Phase 3, Fiches=Phase 5, QCM=Phase 4, Tests=Phase 4 |
| D-07/D-08/D-09: Hub gateway un-hidden | #outils nav item + section visible; editorial copy + same-tab link to outils.html |
| ISO source.url: Wikipedia FR for all three ISO themes | Human-approved at checkpoint 2026-05-19; iso-45001 swapped from Pollutec to Wikipedia FR for OHSAS 18001 coverage |
| --final gate exits 0 on iteration 0 | Bank entered Plan 07 defect-free; all 4 ROADMAP SC + SHELL-05 + D-01..D-13 PASS; BANK.length=226 |
| srs.js: reps unchanged on raté | lapses and reps are independent counters (Anki model); a lapse is not a successful review — reps stays at its pre-raté value |
| window.SRS itself Object.freeze'd | Structural free-revision purity: zero side-effecting keys assertable by Object.keys inspection (RESEARCH §5.3) |
| verify-srs.cjs runs identically with or without --final | SRS module is frozen-by-contract — no iterative-mode shortcut needed (unlike Phase 2's evolving bank). 21 named PASS lines cover SC2/SC3/SC4 + PERSIST-01. |
| Inline `<script>` ignores `defer` (HTML5 spec) | Phase 3 hotfix `0553899`: Flashcards IIFE was reading window.BANK during HTML parsing, before deferred outils-data.js evaluated. Wrap IIFE body in `boot()` dispatched via DOMContentLoaded — defer scripts complete before DCL fires. Pattern to reuse for any future inline IIFE that consumes a deferred global. |
| SRS-03 split P3/P4 | Phase 3 ships flashcard-grade-feeds-SRS half (qhse-srs-v1 write path live); Phase 4 ships wrong-QCM-feeds-SRS half. Schema asserted in P3 via verify-srs.cjs so P4 cannot drift. |
| No norm sub-field in ISO items | Theme slug (iso-9001, iso-14001, iso-45001) carries the norm identity per D-02 |
| Batch C: All 7 source URLs content-verified; no D-09 gaps | INRS/ameli pédagogique pages used; /prevention.html sub-pages for prevention items |
| RPS harcèlement moral = L1152-1 (not L1153-1) | Accuracy anchor embedded in QCM distractor; L1153-1 = harcèlement sexuel |
| Burnout not in tableau MP as of 2026 | Accurate per RESEARCH; included as exam-relevant fact in rps-qcm-006 |
| Calendrier rémunération % live-re-fetched 2026-05-20 | RESEARCH snapshot confirmed accurate (27/43/53/100% 1re année unchanged); source.verified = 2026-05-20 |
| SPA-only acronymes deferred to Batch F (02-06) | RNCP, CFA, VAE, BC01-BC04 — only authoritative source is francecompetences.fr SPA; shipped in 02-06 with human eyeball |
| Batch E: 8 source URLs content-verified; no D-09 gaps | All PASS: F33414 ICPE, AIDA Seveso x2, F2918, F15478, INRS DUERP/chimiques/TMS pages |

## Next Step

`/gsd-discuss-phase 4` — Phase 4: QCM + Tests blancs (QUIZ-01..03 + TEST-01..03)

## Session Continuity

Last session: 2026-05-24T23:25:00.000Z
Stopped at: Phase 3 complete — owner walk-through PASS on all 5 ROADMAP SC + DCL hotfix shipped
Resume file: None (Phase 3 closed; awaiting Phase 4 discuss-phase)
Proceeding to: `/gsd-discuss-phase 4` — Phase 4 QCM + Tests blancs context gathering

---
*State updated: 2026-05-16 — v2.0 "Étude" roadmap created; 5 phases, 26/26 requirements mapped; Phase 1 context locked, ready to plan*
