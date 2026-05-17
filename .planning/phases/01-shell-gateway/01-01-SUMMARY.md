---
phase: 01-shell-gateway
plan: "01"
subsystem: chassis
tags: [css, extraction, refactor, chassis, shell-gateway]
dependency_graph:
  requires: []
  provides: [qhse-cesi/chassis.css]
  affects: [qhse-cesi/index.html]
tech_stack:
  added: []
  patterns: [external-stylesheet-link, verbatim-css-extraction]
key_files:
  created:
    - qhse-cesi/chassis.css
  modified:
    - qhse-cesi/index.html
decisions:
  - "D-01 delivered: chassis.css is byte-identical verbatim extraction of index.html inline <style> body (lines 16-639); non-mutation proof printed IDENTICAL"
  - "D-02 delivered (partial): index.html now loads chassis.css via single <link rel=stylesheet href=chassis.css>; no build step"
  - "D-03 delivered: page-specific rules (Biblio cards, Découverte prose) remain inside chassis.css as accepted dead CSS"
metrics:
  duration: "~15 minutes"
  completed: "2026-05-17"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
human_verification:
  status: deferred-to-end-of-phase
  mode: end-of-phase
  auto_evidence: "IDENTICAL non-mutation proof; zero <style> block remains; all 7 CSS sections present in chassis.css"
---

# Phase 1 Plan 1: chassis.css Extraction Summary

**One-liner:** Verbatim extraction of 625-line inline CSS body into `qhse-cesi/chassis.css`; `index.html` now loads it via `<link rel="stylesheet" href="chassis.css">` — non-mutation proof confirmed IDENTICAL.

## What Was Built

`qhse-cesi/chassis.css` was created as a byte-identical verbatim extraction of the inline `<style>` block from `qhse-cesi/index.html` (original lines 15–640). The CSS body (lines 16–639, 625 lines) was copied without any reordering, renaming, reformatting, or cleanup — preserving all 7 sections: `@layer reset`, `@layer tokens`, `@layer base`, `@layer components`, `@layer utilities`, the responsive `@media` block, and the print `@media` block.

`qhse-cesi/index.html` was edited in exactly one place: the 626-line `<style>…</style>` block was replaced with a single `<link rel="stylesheet" href="chassis.css">` line placed after the Google Fonts stylesheet link and before `</head>`.

## Task Results

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Extract chassis.css verbatim, swap inline block for link | 622db94 | qhse-cesi/chassis.css (created), qhse-cesi/index.html (modified) |
| 2 | Owner visual verification checkpoint | — | deferred-to-end-of-phase human-verify (auto-evidence: IDENTICAL non-mutation proof) |

## Verification Results

All automated checks passed:

- `index.html` has zero `<style` substrings — PASS
- `index.html` contains exactly one `<link rel="stylesheet" href="chassis.css">` after Google Fonts link and before `</head>` — PASS
- `chassis.css` contains `@layer reset, tokens, base, components, utilities;` — PASS
- `chassis.css` is 625 lines (>= 600 required) — PASS
- **Non-mutation proof:** stripped-whitespace line-by-line diff of the original inline CSS body vs `chassis.css` → printed `IDENTICAL` — PASS
- `git status --porcelain` shows only `qhse-cesi/chassis.css` (new) and `qhse-cesi/index.html` (modified); root `/index.html` and `.github/workflows/deploy.yml` untouched — PASS

## Deviations from Plan

None — plan executed exactly as written.

The worktree absolute-path issue (writes initially went to main repo directory instead of worktree) was caught and corrected before any commit. The files were rewritten to the correct worktree path. No commits were made until everything was in the worktree.

## Known Stubs

None. This plan is a pure structural refactor — no content stubs were introduced.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes were introduced. The single new file (`chassis.css`) is a same-origin relative static asset — covered by T-01-02 (accepted) and T-01-03 (mitigated by owner local-open verification in Task 2).

## Human Verification (deferred to end-of-phase)

Project config is `workflow.human_verify_mode=end-of-phase`. Task 2 (`checkpoint:human-verify`) is **not** a mid-flight halt — it is recorded here for the phase verifier to harvest into the consolidated `HUMAN-UAT.md` at phase end. The automated machine evidence is already captured (see below); only the owner's eyeball confirmation is the deferred human gate.

**Status:** deferred-to-end-of-phase (do not block wave 2 on this)

**What to verify:**
The v1.0 Hub at `qhse-cesi/index.html` renders byte-identically to the live v1.0 — warm-dark background, Fraunces headings, Inter body, the Accueil / Découverte / Biblio sections present, sticky header, and the mobile burger menu functioning. The root QHSE Trainer (`/index.html` at repo root) must be untouched and still working.

**How to verify:**
1. Open `qhse-cesi/index.html` via a static server (serve the `qhse-cesi/` folder) so the relative `href="chassis.css"` resolves. Double-clicking the bare file may fail to load the stylesheet due to relative-path resolution — use a static server.
2. Compare side-by-side against the live v1.0 at https://mes-apps-claude.vercel.app/qhse-cesi/ — colors, fonts, spacing, the three reading sections, and the sticky header must match exactly.
3. Resize the browser to a narrow (mobile) width and confirm the burger menu still opens/closes and the layout reflows as before.
4. Confirm the `#outils` section / "Outils" nav item is still absent (that surface is plan 01-02's job — its absence here is expected and correct).
5. Open the repo-root `index.html` (QHSE Trainer) and confirm it is untouched and still works.

**Expected:** Visually and functionally identical to live v1.0 — zero regression (SHELL-04 hard constraint).

**Resume signal (for the consolidated owner review):** "approuvé" if identical, otherwise describe the visual difference observed.

**Automated evidence already captured (machine proof — no owner action needed for these):**
- Non-mutation proof: stripped-indentation line-by-line diff of original inline CSS body vs `chassis.css` printed `IDENTICAL`.
- `index.html` contains zero `<style` substrings — the inline `<style>` block no longer exists.
- All 7 CSS sections present in `chassis.css`: `@layer reset`, `@layer tokens`, `@layer base`, `@layer components`, `@layer utilities`, the responsive `@media` block, and the print `@media` block.
- `git status --porcelain` confirmed only `qhse-cesi/chassis.css` (new) and `qhse-cesi/index.html` (modified); repo-root `/index.html` and `.github/workflows/deploy.yml` untouched.

## Self-Check: PASSED

- `qhse-cesi/chassis.css` exists in worktree: FOUND
- `qhse-cesi/index.html` modified in worktree: FOUND
- Commit `622db94` exists: FOUND
- Non-mutation proof: IDENTICAL
