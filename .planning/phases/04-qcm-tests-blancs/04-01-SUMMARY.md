---
phase: 04-qcm-tests-blancs
plan: 01
type: execute
wave: 1
status: complete
completed: 2026-05-26
duration_min: ~25
files_modified:
  - qhse-cesi/chassis.css
files_created: []
lines_added: 529
selectors_introduced: 13_blocks
tokens_added: 0
requirements_addressed: []
# CSS-only foundation plan. Closes no requirement on its own; underpins QUIZ-01..03 + TEST-01..03 visual rendering.
---

# Phase 4 Plan 01 — chassis.css: `.qz-*` CSS namespace

## One-liner

Appended a 529-line `.qz-*` CSS block inside `@layer components { ... }` of `chassis.css` — scoped under `#panel-qcm` / `#panel-tests`, reusing 100% of existing chassis tokens, zero animations, zero new fonts — so Wave 2 (QCM IIFE) and Wave 3 (Tests blancs IIFE) can render against a finished visual contract.

## What shipped

**Single file modified:** `qhse-cesi/chassis.css` (960 → 1489 lines; +529 insertions, 0 deletions).

**Region:** New CSS appended inside `@layer components { ... }` immediately after the `.fc-*` Phase 3 region (line 881) and before the layer's closing brace (now at line 1412). Banner comment at line 883: `/* ============ Phase 4 — QCM + Tests blancs (.qz-*) ============ */`.

**13 CSS blocks landed (in order):**

| # | Block | Selectors |
|---|-------|-----------|
| 1 | Theme picker | `.qz-theme`, `#qz-qcm-theme-select`, `#qz-test-theme-select` (shared rule), focus + ≥48rem media |
| 2 | Card | `#panel-qcm .qz-card`, `#panel-tests .qz-card` with `min-height: clamp(20rem, 50vh, 32rem)` (Phase 4 taller card per UI-SPEC) |
| 3 | Question stem | `[data-qz-question]` — Fraunces 600, `--step-3`, `text-wrap: balance` |
| 4 | Choices + choice button | `.qz-choices` (column on both viewports — D-08); `.qz-choices > button` + `.qz-choice__letter` mono prefix; hover/focus accent border; **five `[data-qz-choice-state]` variants**: `picked-correct`, `picked-incorrect`, `unpicked-correct` (2px dashed success), `unpicked-distractor`, `selected` (Tests-running accent mark); QCM-only `[data-qz-disabled="true"]` pointer-events-none |
| 5 | Reveal panel | `.qz-reveal` separator + flex layout; `.qz-reveal__badge` with `[data-qz-badge-state="correct"]` and `="incorrect"` `color-mix(in oklch, …)` tints; `[data-qz-answer]`, `[data-qz-explanation]`, `[data-qz-source]` typography + `[data-qz-source] code` mono + `[data-qz-source] a` underline hover (verbatim port of Phase 3 verso rules) |
| 6 | Primary CTAs | `#panel-qcm [data-qz-next], #panel-tests [data-qz-start], #panel-tests [data-qz-restart]` — accent background, `filter: brightness(1.05)` hover, `:disabled` opacity 0.5 |
| 7 | Keyboard hint | `#panel-qcm [data-qz-next-hint]` — `display: none` mobile, mono inline ≥48rem |
| 8 | Timer row + timer + progress + banner | `.qz-timer-row` flex; `[data-qz-timer]` mono with `[data-qz-timer-state="alert"]` and `="expired"` → `--alert`; `[data-qz-progress]` mono `--ink-1`; `.qz-timer-banner` `color-mix(in oklch, var(--alert) 12%, var(--bg-2))` tint |
| 9 | Test footer controls | `.qz-test-controls` flex-wrap; `[data-qz-prev]` + `.qz-test-controls [data-qz-next]` secondary chrome (50/50 mobile, auto desktop); `[data-qz-abandon]` lighter weight + hover `--alert`; `:disabled` opacity 0.4; ≥48rem nowrap row |
| 10 | Start screen | `.qz-start` flex column; `h3` Fraunces; `p` ink-2; `.qz-pool-small` inline warning |
| 11 | Results screen | `.qz-results__hero` centred bg-2 panel; `.qz-results__heading` Fraunces; `[data-qz-score]` `--step-5` with three `[data-qz-score-tier]` variants (`high`→accent, `mid`→warning, `low`→alert); `.qz-results__subheading`; `.qz-results > h3`; `.qz-corrections` `<ol>` decimal; `.qz-correction__question` Fraunces + 2px accent `::after` underline (3rem × 2px); `.qz-correction__noanswer` |
| 12 | History table | `.qz-history-section`; `.qz-history` border-collapse + `caption` + `thead th` + `tbody td`; zebra `tr:nth-child(odd) td` with `color-mix(in oklch, var(--bg-2) 50%, transparent)`; `.qz-history__date` mono nowrap; `.qz-history__theme` sans; `.qz-history__score` mono 500; `.qz-history__empty`; mobile `<48rem` horizontal scroll on the section |
| 13 | Inline error / no-pool | `#panel-qcm .qz-no-pool`, `#panel-qcm .qz-error` — calm `--ink-2` copy, no red alert chrome |

## Tokens consumed (zero added)

**Reused 100% of existing chassis tokens** declared in `@layer tokens { :root { … } }` (lines 33-89):
- Spacing: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- Type-scale: `--step--1`, `--step-0`, `--step-1`, `--step-2`, `--step-3`, `--step-5`
- Color: `--bg-1`, `--bg-2`, `--ink-1`, `--ink-2`, `--ink-3`, `--accent`, `--success`, `--warning`, `--alert`, `--border-subtle`
- Radius: `--radius-sm`, `--radius-lg`
- Font stacks: Fraunces, Inter, JetBrains Mono inlined as font-family lists (mirroring P3 `.fc-*` rules — chassis declares no `--font-*` shorthand vars for components to consume; both phases inline the family list)

**Zero new `:root` custom properties.** `:root` count in file remained 2 (line 34 `@layer tokens`, line 936 inside `@media print`) — identical to pre-edit baseline.

## Regression verification

| Gate | Result |
|------|--------|
| 1. Phase 4 banner exists exactly once | PASS — line 883: `/* ============ Phase 4 — QCM + Tests blancs (.qz-*) ============ */` |
| 2. `:root` count unchanged | PASS — 2 occurrences (pre-edit) → 2 occurrences (post-edit) |
| 3. Zero bare `.qz-*` selectors | PASS — `grep -nE '^[^#@/]*\.qz-' \| grep -v -E '#panel-qcm\|#panel-tests' \| wc -l` returned 0 |
| 4. `.fc-*` block byte-identical | PASS — `git diff` `-` lines = 0 anywhere; `git diff --stat` reports `529 insertions(+), 0 deletions(-)` |
| 5. No new `@import` / `@font-face` | PASS — count remains 0 |
| 6. All required `[data-qz-*]` state attrs present | PASS — `picked-correct`, `picked-incorrect`, `unpicked-correct`, `unpicked-distractor`, `selected`, `correct`/`incorrect` badge, `alert`/`expired` timer, `high`/`mid`/`low` score-tier all grepped successfully |
| 7. History columns present | PASS — `.qz-history__date`, `.qz-history__theme`, `.qz-history__score` all defined under `#panel-tests` |
| 8. Zero animations / transitions / @keyframes / transforms inside Phase 4 region | PASS — only 6 hits in entire file, all in pre-existing lines 136-432 (chassis Phase 1 base + biblio); none in lines 883-1411 |
| 9. Zero `!important` inside Phase 4 region | PASS — only 5 hits, all in pre-existing reduced-motion reset and print rules (lines 24-27, 1463) |
| 10. `@layer components` brace balance | PASS — closing brace correctly positioned at line 1412 (one line below last Phase 4 rule on line 1411), immediately preceding the blank line and `@layer utilities` |
| 11. Choice button `flex-direction: column` with no `@media` override to `row` (D-08) | PASS — single `.qz-choices` rule sets `column`; no `flex-direction: row` anywhere under `#panel-qcm .qz-choices` / `#panel-tests .qz-choices` |
| 12. History is `<table>` selector with zebra via `tbody tr:nth-child(odd)` | PASS — `#panel-tests .qz-history` styled as `<table>`, zebra rule targets `tbody tr:nth-child(odd) td` |

**Behavioral regression check:** This plan ships CSS only; no JS, no DOM change. The Flashcards panel (#panel-flashcards), root QHSE Trainer, and Hub reading pages render byte-identically — new selectors gate exclusively under `#panel-qcm` / `#panel-tests`, which still hold their `<p class="placeholder">` text (replaced in Waves 2/3). Visual regression on shipped surfaces is impossible by construction.

## Commit + deploy

- **Commit SHA:** `f06f48e`
- **Commit message:** `🚀 Phase 4 Plan 01 — chassis.css: .qz-* CSS namespace (additive, scoped, zero new tokens)`
- **Deploy URL:** `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` (CSS deploys ~60s after push via existing GitHub Actions pipeline; no visible change until Wave 2 IIFE injects DOM)

## Deviations from Plan

None. Plan executed exactly as written.

The plan referenced "line 883" as the closing brace of `@layer components`; the actual closing brace was at line 882 with `@layer utilities` starting at line 884 (chassis.css had grown to 960 lines after the Phase 3 `.fc-*` block — plan was authored against a slightly earlier line-count assumption). The edit was inserted at the semantically correct location (immediately before the `@layer components` closing brace), so the intent of the plan is honoured exactly. Final `@layer components` closing brace is now at line 1412.

## Known Stubs

None. This plan ships pure CSS rules — no data sources, no JS state, no empty placeholders. The CSS sits inert until Waves 2/3 inject the DOM that consumes it.

## Threat Flags

None. Plan threat model items T-04-01-01..06 all mitigated or accepted as written:
- T-04-01-01 (tampering with `:root` tokens) — `mitigate`: grep gate confirmed `:root` count unchanged.
- T-04-01-02 (tampering with Phase 1/2/3 rules) — `mitigate`: `git diff` confirmed additive-only; no `.fc-*` deletions.
- T-04-01-03..06, T-04-01-SC — `accept`: CSS-only edit, no secrets/quota/XSS surface/theme injection/package installs.

## Self-Check: PASSED

- File `qhse-cesi/chassis.css` modified (1489 lines, +529 insertions).
- Banner present at line 883.
- All 13 required CSS blocks present (verified via grep).
- All 5 `[data-qz-choice-state]` variants, both `[data-qz-badge-state]` variants, both `[data-qz-timer-state]` variants, and all 3 `[data-qz-score-tier]` variants present.
- Zero bare `.qz-*` selectors; zero animations/transitions inside new region; zero new tokens.
- `.fc-*` Phase 3 block byte-identical (no `-` diff lines).
- `@layer components` brace balance verified (closing `}` at line 1412 sits one line below the last Phase 4 rule).
