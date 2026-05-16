---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Étude
status: roadmapped
last_updated: "2026-05-16T15:08:35.555Z"
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
---

# Project State: QHSE CESI Hub

**Last updated:** 2026-05-16
**Session start:** 2026-05-16

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-16 after v1.0)

**Core value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without digging through scattered sources every time. *(v2.0 extends this with: actively revise that content and track mastery.)*

**Current focus:** v2.0 "Étude" — roadmap created, 5 phases defined, ready for Phase 1 planning.

**Mode:** mvp · **Granularity:** coarse
**Deploy target:** `https://mes-apps-claude.vercel.app/qhse-cesi/` (live, HTTP 200)
**Source:** `qhse-cesi/index.html` (944 lines) + `qhse-cesi/LEGAL.md`

## Current Position

```
Milestone : v2.0 Étude
Phase     : 1 — Shell & Gateway (NOT STARTED)
Plan      : —
Status    : Roadmapped — awaiting /gsd-plan-phase 1

[░░░░░░░░░░] 0% — 0/5 phases complete
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

## Next Step

`/gsd-plan-phase 1` — plan Phase 1 (Shell & Gateway): extract `chassis.css`, scaffold `outils.html` 4-tab shell, un-hide Hub `#outils` gateway.

---
*State updated: 2026-05-16 — v2.0 "Étude" roadmap created; 5 phases, 26/26 requirements mapped*
