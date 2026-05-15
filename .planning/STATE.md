---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: milestone
status: phase-2-complete-ready-for-phase-3-planning
last_updated: "2026-05-15T11:20:00.000Z"
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

**Phase:** 3 — Biblio data + render + 5 categories populated (ready to plan)
**Plan:** TBD (Phase 3 planning not yet started)
**Status:** Phase 2 closed; awaiting `/gsd-plan-phase 3`
**Progress:** ███████░░░ 67 % (2 / 3 phases complete)

```
[x] Phase 1: Skeleton chassis + visual identity     ✓ owner-verified 2026-05-11
[x] Phase 2: Découverte content                     ✓ owner-verified 2026-05-15
[ ] Phase 3: Biblio data + render + 5 categories populated   ← NEXT (plan needed)
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

- Owner walked the 27-point checklist on phone + desktop against the live URL and replied `approuvé`.
- Phase 2 SUMMARY.md finalised (status → COMPLETE, owner-verified 2026-05-15).
- STATE.md updated: `completed_phases` 1 → 2, status → `phase-2-complete-ready-for-phase-3-planning`.
- ROADMAP.md Phase 2 row → `Complete`.
- Closing commit batched all three state-management updates with message `✅ Phase 2 complete: owner-verified, 8/8 DECOUV requirements satisfied`.

### Next Session Resume Point

1. Run `/gsd-plan-phase 3` to start Phase 3 (Biblio data + render + 5 categories populated) planning.
2. Expected outputs: `03-CONTEXT.md` (discuss-phase), `03-RESEARCH.md`, `03-PLAN.md`.
3. Phase 3 scope reminder: ≥ 35 link cards (owner-bumped from 25 on 2026-05-15), 5 categories (officiel · communauté · pedago · annales · pro), each with provenance + freshness badges, `BIBLIO[]` array + `renderCard()` function, `LEGAL.md`, `.planning/V2_BACKLOG.md`. POLICY-* requirements complete the v1 set.

---
*State updated: 2026-05-15 — Phase 2 closed, Phase 3 ready to plan*
