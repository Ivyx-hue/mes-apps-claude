---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: milestone
status: phase-3-awaiting-owner-verify-paused
last_updated: "2026-05-15T23:35:52.423Z"
progress:
  total_phases: 3
  completed_phases: 2
  total_plans: 2
  completed_plans: 2
  percent: 67
---

# Project State: QHSE CESI Hub

**Last updated:** 2026-05-15
**Session start:** 2026-05-11

## Project Reference

**Core Value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without having to dig through scattered sources every time.

**Mode:** mvp (Vertical MVP)
**Granularity:** coarse
**Deploy target:** `https://mes-apps-claude.vercel.app/qhse-cesi/`
**Source location:** single `index.html` under `/qhse-cesi/` in `mes-apps-claude` repo

## Current Position

**Phase:** 3 — Biblio data + render + 5 categories populated
**Plan:** 03-PLAN.md (1 of 1)
**Status:** ⏸ AWAITING owner-verify (T-03-08, 16-point checklist). Tasks 1-7 shipped & deployed live.
**Progress:** █████████░ 89 % (2 of 3 phases owner-verified; Phase 3 awaits sign-off)

```
[x] Phase 1: Skeleton chassis + visual identity     ✓ owner-verified 2026-05-11
[x] Phase 2: Découverte content                     ✓ owner-verified 2026-05-15
[~] Phase 3: Biblio data + render + 5 categories populated   ← AWAITING owner-verify (16-pt checklist)
```

## Performance Metrics

| Metric | Value |
|--------|-------|
| v1 requirements | 39 |
| Requirements mapped | 39 / 39 (100 %) |
| Phases | 3 |
| Phases complete | 2 |
| Plans complete | 2 (Phase 1 + Phase 2) |

## Accumulated Context

### Key Decisions (from PROJECT.md)

- Single-file HTML/CSS/JS app, no framework
- Hub lives at `/qhse-cesi/` subdirectory (does not replace the existing QHSE Trainer at root)
- V1 is read-only (Découverte + Biblio); study tools deferred to V2
- Each app has its own visual identity (no shared design system)
- Mono-page with anchored sections (Approach A) over multi-page or sidebar-wiki

### Phase 2 decisions (locked)

- **Calendrier alternance: Mode B** (generic rythme only, no personal contract dates) — owner pre-resolved Task 5 checkpoint
- **F1204 fallback → H1502** (executor in-flight deviation): used distinct ROMEs H1502 + H1302 across the two Tier A métiers articles instead of duplicating H1302; first Tier A article heading renamed to "Animateur QSE / Coordinateur QSE" to honestly reflect H1502 source
- **Citation discipline pattern established:** every factual claim carries `(Source : <named entity>, vérifié le YYYY-MM-DD)` inline in `--ink-2`. Phase 3 Biblio cards will mirror this provenance discipline.
- **Outbound link safety pattern locked:** 8 outbound URLs total, all `target="_blank" rel="noopener noreferrer"`. Phase 3 cards must inherit this attribute pair.

### Open Owner Gates

None — Phase 2 closed clean on `approuvé` (2026-05-15).

### Constraints in Effect

- No `.pdf` files under `/qhse-cesi/` (French pedagogical-exception scope)
- No backend, no auth, no analytics, no scraping at runtime
- Must not break the existing QHSE Trainer at the repo root
- Dark mode is the default; no light toggle in V1
- Deploys exclusively via the existing GitHub Actions pipeline

### Pre-existing issue carried into Phase 3 scope decision

- `oklch(0% 0 0 / 0.45)` translucent shadow at `qhse-cesi/index.html:230` — Phase 1 chassis artefact. Trips the surface-color invariant despite being a translucent shadow. Options for Phase 3 discuss-phase:
  - Treat as a Phase 1 maintenance commit before Phase 3 lands, or
  - Relax the invariant to surface-color contexts only (recommended — shadow alpha is intentional editorial depth).

### Todos / Blockers

- **Next action:** `/gsd-plan-phase 3` to start Phase 3 (Biblio) planning. No blockers.

## Session Continuity

### Last Session Summary (2026-05-15)

- Phase 2 closed (`approuvé` from owner, commit `70ff842`).
- Owner bumped Biblio card target 25 → 35 (commit `9065c82`).
- `/gsd-discuss-phase 3` ran end-to-end. 5 locked decisions captured in `.planning/phases/03-biblio-data-render-5-categories-populated/03-CONTEXT.md` + 9 Claude's-discretion items codified. Discussion log at `03-DISCUSSION-LOG.md`. Commit `ba4e774`.
- Phase 3 hard gate established: researcher writes `03-SEED-CANDIDATES.md` during plan-phase; owner replies "seed approuvé" before `/gsd-execute-phase 3` runs.

### Next Session Resume Point — PAUSED 2026-05-15 ("je finirai demain")

**Read `.planning/phases/03-biblio-data-render-5-categories-populated/.continue-here.md` first** (has a BLOCKING constraint on content-level link verification) and `.planning/HANDOFF.json`.

1. Owner re-tests `https://mes-apps-claude.vercel.app/qhse-cesi/` (phone+desktop): the 13 round-2 fixes + the 3 un-verifiable SPA cards (RNCP francecompetences, Apec HSE, Apec Qualité) + random sample.
2. Reply `approuvé` → finalise `03-SUMMARY.md` COMPLETE, STATE → `v1-milestone-complete`, ROADMAP Phase 3 → Complete, `/gsd-complete-milestone`, then `/gsd-new-milestone` ingesting `.planning/V2-ETUDE-SPEC.md`.
3. Paste still-broken URLs → ONE more **content-verified** fix round (read memory `feedback_verify_links_before_ship.md` first — HTTP-status audits are banned).

**Phase 3 status:** code fully shipped & live. Two URL-fix rounds done (`c9ba98c` HTTP-only/insufficient → `3ace8b3` content-verified). 32/35 cards content-provable; 3 SPA cards flagged honestly. All pushed through `3ace8b3`.

**V2 "Étude" milestone:** fully designed, PARKED in `.planning/V2-ETUDE-SPEC.md` (`540cd66`). Do NOT start until V1 closes.

### Session Resumed — 2026-05-16

Context restored via `/gsd-resume-work`. Owner browser-tested → found 1 broken card: `pro-carsat-aquitaine` (soft-404, `/media/404.html`).

**URL fix round 3 (content-verified):** `pro-carsat-aquitaine` deep-link replaced with `https://www.carsat-aquitaine.fr/home/entreprise.html` (200, real title "Espace entreprises - Carsat Aquitaine", body covers prévention/subventions/tarification AT-MP, stays regional). Commit `e8ea7ac`, pushed, live-verified on Vercel. Owner confirmed CARSAT was the **only** broken link.

**Remaining:** owner does a final re-test → replies `approuvé` to close V1. 3 SPA cards (RNCP francecompetences, Apec HSE, Apec Qualité) still curl-unverifiable by design — owner eyeballs in browser.

On `approuvé`: finalise `03-SUMMARY.md` COMPLETE, STATE → `v1-milestone-complete`, ROADMAP Phase 3 → Complete, `/gsd-complete-milestone`, then `/gsd-new-milestone` ingesting `.planning/V2-ETUDE-SPEC.md`.

---
*State updated: 2026-05-16 — fix round 3 (CARSAT) shipped & live, awaiting final owner `approuvé` (T-03-08)*
