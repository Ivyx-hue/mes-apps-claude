---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Étude
status: planning
last_updated: "2026-05-16T11:14:55.501Z"
last_activity: 2026-05-16
progress:
  total_phases: 0
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State: QHSE CESI Hub

**Last updated:** 2026-05-16
**Session start:** 2026-05-11

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-16 after v1.0)

**Core value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without digging through scattered sources every time.

**Current focus:** Planning next milestone — **v2.0 "Étude"** (study tools), designed & parked in `.planning/V2-ETUDE-SPEC.md`.

**Mode:** mvp · **Granularity:** coarse
**Deploy target:** `https://mes-apps-claude.vercel.app/qhse-cesi/` (live, HTTP 200)
**Source:** single `qhse-cesi/index.html` (944 lines) + `qhse-cesi/LEGAL.md`

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-05-16 — Milestone v2.0 started

## Accumulated Context

Full decision log in `.planning/PROJECT.md` (Key Decisions). Full milestone record in `.planning/MILESTONES.md`. Retrospective in `.planning/RETROSPECTIVE.md`.

### Constraints in Effect (carried to v2.0)

- Single-file `qhse-cesi/index.html`, no build/deps; must not break the QHSE Trainer at repo root.
- No `.pdf` under `/qhse-cesi/`; no backend/auth/analytics/runtime-scraping.
- Dark default; deploys exclusively via the existing GitHub Actions pipeline.
- **Link discipline:** content-verify every external URL before ship (real `<title>` + topic match + soft-404 grep). HTTP-status audits banned. Memory: `feedback_verify_links_before_ship.md`.
- Token-conscious: commit/push atomically (owner hits weekly caps mid-task).

### Open Blockers

None. v1.0 closed clean (owner-verified across 3 link-fix rounds).

## Next Step

Start the next milestone:

`/gsd-new-milestone` — ingest `.planning/V2-ETUDE-SPEC.md` to scaffold **v2.0 "Étude"** (study tools).

Alternative: v1.1 reading-hub quick wins from `.planning/V2_BACKLOG.md` § v1.1 (scrollspy, filter chips, mark-as-read, Ctrl+K search, light toggle, link-checker Action).

---
*State updated: 2026-05-16 — v1.0 "Reading Hub" milestone complete; awaiting /gsd-new-milestone*
