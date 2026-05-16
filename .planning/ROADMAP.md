# Roadmap: QHSE CESI Hub

**Created:** 2026-05-11
**Mode:** mvp (Vertical MVP — each phase ships a deployable, user-visible artifact)
**Granularity:** coarse

## Milestones

- ✅ **v1.0 Reading Hub** — Phases 1–3 (shipped 2026-05-16) — see `milestones/v1.0-ROADMAP.md`
- 📋 **v2.0 Étude** — study tools, designed & parked in `.planning/V2-ETUDE-SPEC.md` (not started)

## Phases

<details>
<summary>✅ v1.0 Reading Hub (Phases 1–3) — SHIPPED 2026-05-16</summary>

- [x] Phase 1: Skeleton chassis + visual identity (1/1 plan) — owner-verified 2026-05-11
- [x] Phase 2: Découverte content (1/1 plan) — owner-verified 2026-05-15
- [x] Phase 3: Biblio data + render + 5 categories populated (1/1 plan) — owner-verified 2026-05-16

Full phase details, goals, success criteria, and coverage audit: `.planning/milestones/v1.0-ROADMAP.md`

</details>

### 📋 v2.0 Étude (Planned)

Study tools (quiz / fiches / tests + spaced repetition) on top of the V1 reading hub by un-hiding the reserved `<section id="outils" hidden>`. 5-phase decomposition designed and parked in `.planning/V2-ETUDE-SPEC.md`. Start via `/gsd-new-milestone` ingesting that spec. Alternative: v1.1 reading-hub quick wins in `.planning/V2_BACKLOG.md` § v1.1.

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Skeleton chassis + visual identity | v1.0 | 1/1 | Complete | 2026-05-11 |
| 2. Découverte content | v1.0 | 1/1 | Complete | 2026-05-15 |
| 3. Biblio data + render + 5 categories populated | v1.0 | 1/1 | Complete | 2026-05-16 |

## Out-of-Roadmap Notes

- Each phase ends with a `git push origin main` to the existing GitHub Actions pipeline; live URL ~60 s later.
- The existing QHSE Trainer at the repo root is treated as a frozen sibling — no modifications, only co-existence.
- No backend, no Supabase, no auth in V1 — static HTML is sufficient.
- Link curation discipline (v1.0): content-verify every URL before ship (real `<title>` + topic match + soft-404 grep); HTTP-status audits banned. See memory `feedback_verify_links_before_ship.md`.

---
*Roadmap created: 2026-05-11*
*Last updated: 2026-05-16 — v1.0 "Reading Hub" milestone shipped & archived*
