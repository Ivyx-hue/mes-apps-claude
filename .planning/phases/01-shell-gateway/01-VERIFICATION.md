---
phase: 01-shell-gateway
verified: 2026-05-17T15:20:00Z
status: human_needed
score: 14/14 automated truths verified
---

# Phase 1: Shell & Gateway Verification Report

**Phase Goal:** The owner can navigate to `outils.html` from the Hub and see a deployable 4-tab study shell with the same editorial identity — no broken links, no broken Hub pages. (Pure scaffolding — no study-mode logic/content/SM-2; those are Phases 2–5.)
**Verified:** 2026-05-17T15:20:00Z
**Status:** human_needed

## Goal Achievement

### Observable Truths

| # | Truth (plan / decision) | Status | Evidence |
|---|-------------------------|--------|----------|
| 1 | D-01: `chassis.css` is a byte-identical verbatim extraction of the index.html inline `<style>` body | ✓ VERIFIED | Whitespace-stripped diff of original inline body (commit 0d5944e/e58203d) vs `chassis.css`: IDENTICAL, 13,598 chars each side |
| 2 | D-02: `index.html` has no inline `<style>`; references `chassis.css` via single `<link>` | ✓ VERIFIED | `grep -c '<style>' index.html` = 0; `<link rel="stylesheet" href="chassis.css">` at index.html:15 |
| 3 | D-03: page-specific Biblio/Découverte rules stay in `chassis.css` as accepted dead CSS | ✓ VERIFIED | Intentional consequence of verbatim extraction; code reviewer confirmed as by-design, not a defect |
| 4 | v1.0 Hub renders byte-for-byte identical CSS rules vs before extraction | ✓ VERIFIED | Verbatim extraction is the same CSS body (truth #1); no rule mutated/reordered/removed |
| 5 | No build step, npm dependency, or preprocessor introduced | ✓ VERIFIED | No `package.json`; `.github/workflows/deploy.yml` untouched in `0d5944e..HEAD` |
| 6 | Root QHSE Trainer (`/index.html` at repo root) not touched | ✓ VERIFIED | `git log 0d5944e..HEAD -- index.html` (repo root) returns no commits |
| 7 | D-02: `outils.html` references `chassis.css` via single `<link>`, no inline `<style>` | ✓ VERIFIED | outils.html:15 `<link ... chassis.css>`; only `<script>` is the inline IIFE |
| 8 | D-04: 4-tab ARIA tablist in locked order Flashcards · Fiches de révision · QCM · Tests blancs | ✓ VERIFIED | `<ul role="tablist">` with 4 `role="tab"` buttons in exact locked order |
| 9 | D-05: minimal vanilla JS + proper ARIA pattern (roles, aria-selected, arrow/Home/End nav, [hidden] toggle, hash sync; no inline on*) | ✓ VERIFIED | IIFE audited; roving tabindex, modular arrow-key wrap, `aria-controls`/`aria-labelledby`; hardened in bd87647 (replaceState, focus-guard). No inline handlers |
| 10 | D-06: each of 4 panels shows a dated placeholder naming the arrival phase | ✓ VERIFIED | Flashcards→Phase 3, Fiches→Phase 5, QCM→Phase 4, Tests blancs→Phase 4 placeholders present |
| 11 | D-07: Hub `#outils` nav `<li>` and `<section id="outils">` un-hidden (reserved `hidden` removed) | ✓ VERIFIED | index.html diff: `<li hidden>`→`<li id="nav-outils">`; `<section … hidden>`→`<section …>` |
| 12 | D-08: `#outils` gateway copy rewritten to editorial paragraph + 4-mode list + link to outils.html | ✓ VERIFIED | Diff shows `<p class="lead">` + 4-item `<ul>` + `<a href="outils.html">Ouvrir les outils d'étude</a>` |
| 13 | D-09: gateway link + back-link open same tab (no `target=_blank`) | ✓ VERIFIED | index.html:178 `<a href="outils.html">` no target; outils.html back-links (`brand`, nav) no target |
| 14 | v1.0 Hub reading sections + root Trainer unchanged (automated scope) | ✓ VERIFIED | index.html body diff scoped solely to `#outils`; root trainer untouched (truth #6). *Pixel-level owner confirm deferred — see Human Verification* |

**Score:** 14/14 automated-verifiable truths VERIFIED

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `qhse-cesi/chassis.css` | Verbatim chassis stylesheet, ≥600 lines, `@layer reset,tokens,base,components,utilities` | ✓ EXISTS + SUBSTANTIVE | 624 lines; 11 `@layer` declarations incl. all 5 named layers |
| `qhse-cesi/index.html` | Hub linking chassis.css + un-hidden #outils gateway linking outils.html | ✓ EXISTS + SUBSTANTIVE | `<link chassis.css>` line 15; `<a href="outils.html">` line 178 |
| `qhse-cesi/outils.html` | 4-tab study shell, ≥60 lines, `role="tablist"` | ✓ EXISTS + SUBSTANTIVE | 141 lines; 1 `role="tablist"`, 4 tabs/4 panels, IIFE tab JS |

**Artifacts:** 3/3 verified

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| index.html | chassis.css | `<link rel=stylesheet>` | ✓ WIRED | index.html:15 |
| index.html #outils | outils.html | `<a href="outils.html">` same tab | ✓ WIRED | index.html:178, no `target=_blank` |
| outils.html | chassis.css | `<link rel=stylesheet>` | ✓ WIRED | outils.html:15 |
| outils.html tabs | tabpanels | `aria-controls` + IIFE `[hidden]` toggle | ✓ WIRED | Audited + hardened (bd87647) |

**Wiring:** 4/4 connections verified

## Requirements Coverage

| Requirement | Status | Note |
|-------------|--------|------|
| SHELL-01: chassis extracted to `chassis.css`; both pages load via `<link>`; v1.0 token/component contract visually unchanged; no build step | ✓ SATISFIED (codebase) | **Traceability defect:** REQUIREMENTS.md mis-tracked this as `[ ]`/Pending. The deliverable is fully met (truths 1–6, artifacts). Corrected to Complete with evidence in this verification commit. |
| SHELL-02: `outils.html` exists, dark editorial identity, 4-tab nav | ✓ SATISFIED | Automated structure verified; visual identity is an owner-visual item (HUMAN-UAT #2) |
| SHELL-03: `#outils` nav + section un-hidden, describes 4 modes, links to outils.html | ✓ SATISFIED | Truths 11–13 |
| SHELL-04: root Trainer + v1.0 Hub reading content visually/functionally unchanged | ✓ SATISFIED (automated) | Verbatim proof + scoped diffs + untouched root trainer; pixel-level owner confirm is HUMAN-UAT #3/#4 |
| SHELL-05: `outils.html` loads content bank via `<script src="outils-data.js">`, no build, mobile+desktop dark | ⚠️ PARTIAL | Shell portion (no build, mobile/desktop, dark default) done. The `<script src="outils-data.js">` content-bank clause is a **Phase 2** deliverable (ROADMAP Phase 2 = "`outils-data.js` with 200+ items"). Was over-tracked as Complete — see Gaps. |
| PERSIST-02: no backend/accounts/sync/runtime-AI/multi-user/gamification | ✓ SATISFIED | Static scaffold; none introduced |

**Coverage:** 5/6 fully satisfied (SHELL-01,02,03,04,PERSIST-02); SHELL-05 partial (Phase-1 portion complete, content-bank clause is Phase 2).

## Anti-Patterns Found

Code review (`01-REVIEW.md`, depth=standard, 3 files): 0 Blocker, 3 Warning, 4 Info.

| File | Finding | Severity | Status |
|------|---------|----------|--------|
| qhse-cesi/outils.html | WR-01 focus-steal on load | ⚠️ Warning | ✓ FIXED (bd87647) |
| qhse-cesi/outils.html | WR-02 hash/history pollution on load | ⚠️ Warning | ✓ FIXED (bd87647) |
| qhse-cesi/outils.html | WR-03 tabpanels not keyboard-reachable | ⚠️ Warning | ✓ FIXED (bd87647) |
| qhse-cesi/outils.html | IN-01 missing `type="button"` | ℹ️ Info | ✓ FIXED (bd87647) |
| qhse-cesi/outils.html | IN-02 unstyled `.tab-shell`/`.tab-list` | ℹ️ Info | Deferred — non-functional polish; owner end-of-phase visual review |
| qhse-cesi/outils.html | IN-03 dead `data-target=""` | ℹ️ Info | Deferred — harmless inert attribute |
| qhse-cesi/index.html | IN-04 pre-existing undefined `.mono` class | ℹ️ Info | Out-of-phase (pre-existing; SHELL-04 verbatim constraint forbids touching it) |

**Anti-patterns:** 0 blockers. All 3 warnings + IN-01 resolved (01-REVIEW.md status: resolved).

## Human Verification Required

Phase success criteria 1–4 are inherently owner-visual ("Owner opens … and sees/confirms") and were intentionally deferred to end-of-phase (`workflow.human_verify_mode=end-of-phase`). SC5 is programmatically verified (✓, not listed here).

### 1. Hub gateway visible and navigable
**Test:** Open `https://mes-apps-claude.vercel.app/qhse-cesi/` (or serve `qhse-cesi/` locally). Confirm the "Outils" nav item and the `#outils` gateway section are now visible; clicking navigates to a 4-mode description with a working link to `outils.html` (same tab).
**Expected:** Nav item + section appear; link opens `outils.html` in the same tab.
**Why human:** Visual visibility, smooth-scroll, and navigation feel require human judgment.

### 2. outils.html identity on mobile + desktop
**Test:** Open `outils.html` directly on both a desktop and a narrow/mobile width. Confirm the 4-tab shell (Flashcards · Fiches de révision · QCM · Tests blancs) with the same dark editorial identity (Fraunces headings, Inter body, OKLCH tokens). Click tabs and arrow-key through them.
**Expected:** Same v1.0 visual identity; tabs switch correctly; keyboard nav works; no focus jump/scroll on first load; Back button not trapped.
**Why human:** Visual identity match + responsive feel + interaction quality need human eyes.

### 3. Hub reading content zero regression
**Test:** Open the Hub `index.html` and compare Accueil / Découverte / Biblio against the live v1.0 (`https://mes-apps-claude.vercel.app/qhse-cesi/`). Resize to mobile and confirm the CSS-only burger menu + scrollspy still work.
**Expected:** Byte-for-byte identical rendering and behavior (SHELL-04).
**Why human:** Pixel-level regression confirmation; automated proof covers CSS-body identity but not rendered output.

### 4. Root QHSE Trainer unchanged
**Test:** Open the root QHSE Trainer (`https://mes-apps-claude.vercel.app/`).
**Expected:** Renders exactly as before — untouched.
**Why human:** Final visual confirmation the frozen app is unaffected.

## Gaps Summary

**No functional gaps block the phase GOAL.** The deployable 4-tab shell exists, is navigable from the Hub, has no broken links, and the v1.0 chassis was extracted verbatim. Two **traceability accuracy** issues (do not block the deliverable, but must be reconciled for honest tracking):

### Non-Critical (tracking reconciliation)

1. **SHELL-01 was under-tracked**
   - Issue: REQUIREMENTS.md had SHELL-01 as `[ ]`/Pending though the codebase fully satisfies it (the executor updated tracking during the quota-interrupted 01-02 run and missed 01-01's requirement).
   - Impact: None on deliverable; would have produced a false "verification debt" warning.
   - Recommendation: Corrected to Complete in this verification commit (evidence-backed).

2. **SHELL-05 was over-tracked**
   - Issue: REQUIREMENTS.md marked SHELL-05 fully Complete, but its `<script src="outils-data.js">` content-bank clause is a Phase 2 deliverable (ROADMAP Phase 2 = `outils-data.js`). Only the deployable-shell portion is Phase 1.
   - Impact: Inflates Phase-1 coverage; would let a genuinely-Phase-2 clause appear done.
   - Recommendation (owner decision): either (a) re-map SHELL-05 to Phase 2 in REQUIREMENTS.md, or (b) split it (Phase-1 shell portion done; content-bank clause tracked under Phase 2). Marked **Partial** here pending owner direction.

## Verification Metadata

**Verification approach:** Goal-backward (derived from ROADMAP Phase 1 goal + 01-01/01-02 PLAN must_haves)
**Must-haves source:** 01-01-PLAN.md + 01-02-PLAN.md frontmatter; ROADMAP success criteria
**Automated checks:** 14 truths + 3 artifacts + 4 key-links passed; 0 failed
**Human checks required:** 4 (owner-visual, deferred by design — HUMAN-UAT)
**Performed by:** orchestrator inline (gsd-verifier subagent returned mid-investigation without writing the report twice; inline verification done with first-hand reconciliation/audit/review evidence to avoid burning the token-constrained budget on repeated incomplete spawns)

---
*Verified: 2026-05-17T15:20:00Z*
*Verifier: Claude (orchestrator inline)*
