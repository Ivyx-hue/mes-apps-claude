---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Étude
status: executing
stopped_at: "Phase 5 UI-SPEC approved — initial draft (532a05e) BLOCKED on Dimension 4 (5 sizes, 3 weights); revision (063422f) consolidated typography to 4 sizes (`--step-0`, `--step-1`, `--step-3`, `--step-4`) and 2 weights (400 regular, 600 semibold); checker returned 6/6 PASS. Frontmatter updated to `status: approved`, `reviewed_at: 2026-05-27T15:21+02:00`. Phase 4 plans 4/4 still awaiting owner UAT (f06f48e, 1dfc90c, 271f258, da255d1)."
last_updated: "2026-05-30T08:09:52.118Z"
progress:
  total_phases: 5
  completed_phases: 4
  total_plans: 23
  completed_plans: 22
  percent: 80
---

# Project State: QHSE CESI Hub

**Last updated:** 2026-05-16
**Session start:** 2026-05-16

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-16 after v1.0)

**Core value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without digging through scattered sources every time. *(v2.0 extends this with: actively revise that content and track mastery.)*

**Current focus:** Phase 05 — fiches-de-r-vision

**Mode:** mvp · **Granularity:** coarse
**Deploy target:** `https://mes-apps-claude.vercel.app/qhse-cesi/` (live, HTTP 200)
**Source:** `qhse-cesi/index.html` (944 lines) + `qhse-cesi/LEGAL.md`

## Current Position

Phase: 05 (fiches-de-r-vision) — EXECUTING
Plan: 6 of 6 (05-01..05-05 complete & owner-approved — 15 fiches live, DEC-01 coverage satisfied)
Next:  Phase 5 Wave 6 (05-06) — ship `verify-fiches.cjs` Node gate (6 assertion groups: schema · slug coverage · selectedIds cross-ref · prefs merge-safety · DEC-09 read-only invariant · sources URL format). Autonomous (no UAT). After 05-06 → phase verification + completion. (Phase 4 plans 4/4 still awaiting owner UAT.)

```
Milestone : v2.0 Étude
Phase     : 4 — QCM + Tests blancs (Plans 01+02+03+04/4 complete — chassis CSS + QCM IIFE + Tests blancs IIFE + verify-quiz.cjs gate shipped)
Plans     : 17/17 complete (Phase 4 Waves 1-4 done; awaiting owner UAT)

[████████▓░] 82% — 3/5 phases complete + Phase 4 plans all shipped
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

`/gsd-plan-phase 5` for research + multi-plan structure (UI-SPEC contract now locked). Phase 4 UAT can run in parallel.

## Session Continuity

Last session: 2026-05-30T08:09:52.110Z
Stopped at: Phase 5 UI-SPEC approved — initial draft (532a05e) BLOCKED on Dimension 4 (5 sizes, 3 weights); revision (063422f) consolidated typography to 4 sizes (`--step-0`, `--step-1`, `--step-3`, `--step-4`) and 2 weights (400 regular, 600 semibold); checker returned 6/6 PASS. Frontmatter updated to `status: approved`, `reviewed_at: 2026-05-27T15:21+02:00`. Phase 4 plans 4/4 still awaiting owner UAT (f06f48e, 1dfc90c, 271f258, da255d1).
Resume file: None
Proceeding to: /gsd-plan-phase 5

### Phase 4 Plan 04 outcome (2026-05-27)

- File created: `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` (399 lines, pure Node)
- 6 assertion groups (a)..(f) PASS — verbatim CONTEXT.md line 60-66 phrasing:
  - (a) SC2/QUIZ-03 — wrong-answer SRS write ≡ `SRS.schedule(state, 'rate')`
  - (b) SC3/TEST-01 — test composition: 20-item shape-valid queue
  - (c) SC4/TEST-03 — qhse-scores-v1 FIFO cap 50 (D-10/D-11/D-12)
  - (d) SC4/PERSIST-01 — qhse-prefs-v1 merge-safety (P3 + Plan 02 keys preserved through Plan 03 write)
  - (e) SC4/D-V2-03 — Tests blancs path does NOT mutate qhse-srs-v1 (snapshot equality runtime proof)
  - (f) SC4/PERSIST-01 — cross-phase schema compatibility (REQUIRED_FIELDS ⊆ actualKeys)
- Smoke: `node verify-quiz.cjs` exits 0; runtime < 1s; bootstrap loads `srs.js` + `outils-data.js` (BANK.length=226)
- Regression: Phase 3 verify-srs.cjs still exits 0
- Atomic: 1 file, 399 insertions, 0 deletions. No Vercel deploy (file under `.planning/`).
- Deploy: pushed to main 2026-05-27 ~11:15 CET; commit da255d1

### Phase 4 Plan 03 outcome (2026-05-27)

- File modified: `qhse-cesi/outils.html` (+657 lines, −2; 1302 → 1957)
- Region 1: `#panel-tests` placeholder replaced with tri-state scaffold — `[data-qz-start-screen]` (theme picker + pool-too-small warning + Démarrer), `[data-qz-running-screen][hidden]` (timer + progress + question/4 choices + Précédent/Abandonner/Suivant), `[data-qz-results-screen][hidden]` (4-tier hero + 20-item corrections + Nouveau test), `[data-qz-history-section]` (`<table class="qz-history">` + empty-state + sr-only announce)
- Region 2: new `<script>` IIFE appended after Plan 02 QCM IIFE (banner line 1379) — `__qzTestsBooted` guard, DCL boot, A→B→C state machine, drift-resistant `Date.now()`-based timer (Pitfall 2 defense), free-nav `picks[]` map with toggle-on-second-click, native `window.confirm(` abandon flow (line ~1731, sole call site in the file), banner-only timeout (D-13 — no auto-submit), `qhse-scores-v1` `unshift + slice(0,50)` FIFO (D-11/D-12), merge-safe `lastTestTheme` write preserving Phase 3 + Plan 02 keys, `<time datetime>` history cells
- Requirements closed: TEST-01 (20Q timed exam), TEST-02 (score + corrections), TEST-03 (qhse-scores-v1 persistence + qhse-srs-v1 isolation)
- D-V2-03 invariant proven: `SRS.schedule(` file-wide count = 2 (Flashcards line 622 + QCM line 1281); Tests IIFE banner at line 1379 — both call sites upstream, zero in Tests block. Tests IIFE only reads `SRS.todayLocal()` (pure helper) with local-date fallback.
- Verification: all 15 automated grep gates PASS (`__qzTestsBooted`=2, `SRS.schedule(`=2 file-wide, `setInterval(`=1, `qhse-scores-v1`=2, `scores.unshift|slice(0,50)`=2, `lastTestTheme`=4, `beforeunload`=0, real `document.addEventListener('keydown')`=0, `window.confirm(`=1, `.innerHTML =` on bank=0, `createElement('time')`=1)
- Regression: Phase 3 verify-srs.cjs exits 0 (20/20 PASS) post-edit; Plan 02 QCM IIFE byte-identical
- Deploy: pushed to main 2026-05-27 ~10:35 CET; commit 271f258

### Phase 4 Plan 02 outcome (2026-05-27)

- File modified: `qhse-cesi/outils.html` (+506 lines, −2; 796 → 1302)
- Region 1: `#panel-qcm` placeholder `<p>` replaced with full scaffold — theme picker (16 options), `<article class="qz-card">` with `[data-qz-question]`, `[data-qz-choices]`, `[data-qz-reveal][hidden]`, `[data-qz-next][hidden]`
- Region 2: new `<script>` IIFE appended after Phase 3 Flashcards IIFE — `__qzQcmBooted` guard, DCL boot, pre-flight BANK+SRS check, merge-safe readPrefs/writePrefs, `buildPool`, `renderQuestion`, `renderReveal`, `onChoiceClick` (single `SRS.schedule(_,'rate',_)` call site, line 1205), `onNextClick` wrap-around, `onThemeChange` with per-session Set reset, `ensureScaffold` re-mount after `renderEmpty`
- Requirements closed: QUIZ-01 (themed/global QCM), QUIZ-02 (auto-reveal feedback), QUIZ-03 (wrong-answer SRS feed), SRS-03 write-half
- Verification: all 13 automated grep gates PASS (`__qzQcmBooted`=2, `SRS.schedule(`=2 file-wide, `srsWrittenThisSession`=6, `lastQcmTheme`=6, real keydown-on-document=0, `.innerHTML =` on bank content=0, `createElement('code'|'a')`=4)
- Regression: Phase 3 verify-srs.cjs exits 0 (20/20 PASS) post-edit — `window.SRS` frozen contract intact, `qhse-srs-v1` schema unchanged
- Deploy: pushed to main 2026-05-27 ~09:40 CET; commit 1dfc90c

### Phase 4 Plan 01 outcome (2026-05-26)

- File modified: `qhse-cesi/chassis.css` (+529 lines, 960 → 1489)
- Region: `@layer components { /* ============ Phase 4 — QCM + Tests blancs (.qz-*) ============ */ ... }` at line 883
- 13 CSS blocks landed (theme picker, card, question stem, choices + 5 state variants, reveal panel + 2 badge states, primary CTAs, keyboard hint, timer row + 2 timer states, test controls, start screen, results screen + 3 score-tier colors, history table, inline error)
- Tokens consumed: 100% from existing chassis; 0 new `:root` declarations
- Verification: all 12 grep gates PASS (banner present, no bare `.qz-` leaks, `.fc-*` byte-identical, no animations/transitions/!important in new region, all required `[data-qz-*]` state attrs present)
- Deploy: pushed to main 2026-05-26 ~17:20 CET; commit f06f48e

---
*State updated: 2026-05-27 — Phase 4 Plan 04 complete; all 4 plans shipped (chassis CSS + QCM IIFE + Tests blancs IIFE + verify-quiz.cjs gate); awaiting owner UAT to close the phase*
