# Session Checkpoint — QHSE CESI Hub

**Saved**: 2026-05-11 03:20 (Europe/Paris)
**Reason**: Post-UI-SPEC save before next workflow step
**Branch**: main (pushed through `0feb90c`)
**Workflow**: `/gsd-new-project` complete; `/gsd-ui-phase 1` complete; next is plan-phase or discuss-phase

---

## Where We Are in the GSD Workflow

`/gsd-new-project` — **DONE** ✓ (commits `6bf70e6`, `3f84ebf`, `db04d6e`, `0de8876`, `686de33`, `3fb0e05`)
`/gsd-ui-phase 1` — **DONE** ✓ (commits `5523c5d`, `44fbd99`, `0feb90c`)

Next workflow step: `/gsd-plan-phase 1` (or optionally `/gsd-discuss-phase 1` first).

---

## Files Now on Disk (all committed and pushed)

```
.planning/
├── PROJECT.md                    (6bf70e6)
├── config.json                   (3f84ebf)
├── REQUIREMENTS.md               (686de33 → traceability filled in 3fb0e05)
├── ROADMAP.md                    (3fb0e05)
├── STATE.md                      (3fb0e05 → updated 0feb90c)
├── CHECKPOINT.md                 (this file)
├── research/
│   ├── STACK.md                  (db04d6e)
│   ├── FEATURES.md               (db04d6e)
│   ├── ARCHITECTURE.md           (db04d6e)
│   ├── PITFALLS.md               (db04d6e)
│   └── SUMMARY.md                (0de8876)
└── phases/
    └── 01-skeleton-chassis-visual-identity/
        └── 01-UI-SPEC.md         (5523c5d → owner sign-off in 44fbd99)
```

CLAUDE.md also regenerated with GSD project / stack / workflow sections (commit `3fb0e05`).

---

## Project Recap (so a fresh session can pick up)

**What**: `QHSE CESI Hub` — personal study companion website aggregating Bachelor QHSE CESI Bordeaux resources (programme, RNCP, exam topics, Reddit threads, ISO/INRS, etc.).

**Tech**: Pure HTML + CSS + JS, single `index.html`, no build step, no deps. Deployed at `https://mes-apps-claude.vercel.app/qhse-cesi/` via existing GitHub Actions pipeline.

**V1 scope**: read-only — Découverte (programme, RNCP blocs, calendrier, débouchés) + Biblio (5 categories of curated links).

**V2 deferred**: study tools (flashcards/QCM).

**Config chosen**:
- mode: `yolo`
- granularity: `coarse`
- parallelization: `true`
- commit_docs: `true`
- model_profile: `balanced`
- workflow.research: `true`
- workflow.plan_check: `true`
- workflow.verifier: `true`
- workflow.nyquist_validation: `false` (coarse granularity)

---

## Key Research Findings (executive bullets, full files in `.planning/research/`)

- **STACK** — single-file vanilla web is right; CDN-friendly micro-tooling only; explicit "do not pull in" list.
- **FEATURES** — table-stakes are mostly trivial CSS/HTML; differentiators are cheap and reuse a single `data-id`/`data-category` primitive; anti-features explicitly listed (no AI chatbot, no gamification, no live RSS, no PWA, no light-mode toggle, no carousel). Visual identity suggestion: editorial/library/reading-room (warm dark + paper + warm accent — distinct from Trainer's industrial lime).
- **ARCHITECTURE** — six numbered CSS banners + IIFE-wrapped JS (data → renderers → controllers); data-driven `BIBLIO` array; reserve `#outils` section + `Outils` namespace stub for V2.
- **PITFALLS** — editorial risk dominates (link rot ~5%/year, source provenance, CESI Bordeaux specificity, French pedagogical-exception copyright limits — no PDFs in repo, link-only); technical traps (FART/FOUC dark-mode init, `scroll-padding-top` for sticky nav anchors, single-file >2000 lines starts to hurt); scope-creep into V2 is the #1 documented failure mode.

---

## Owner Decisions Locked (Phase 1)

| Gate | Choice |
|------|--------|
| Mood | Editorial library / reading-room |
| Palette | Warm-dark editorial — `#1a1814` bg / `#e8e2d4` ink / `#c9a96e` accent |
| Typography | Fraunces (display) + Inter (body/UI) + JetBrains Mono (technical strings) via Google Fonts CSS2 |
| Accent usage | Link + active nav + h2 underline + Phase 3 category badges |

## UI Checker Recommendations for Planner (non-blocking)

1. Active-state scrollspy: confirm IntersectionObserver stays under ~15 LOC and shares the burger's listener footprint.
2. Burger `aria-label` mirroring: lock one path (JS effect vs CSS-only `sr-only` swap) during plan-phase rather than leaving it to the executor.
3. `@starting-style` entrance animation: ship **zero** commented entrance-animation CSS in Phase 1 (commented code rots). Reserved CSS for `.toc` is fine (Phase 2 consumer).

---

## How to Resume (in a fresh session)

```bash
# 1. Pull latest
git pull origin main

# 2. Continue with phase planning. Two options:
#    a) /gsd-plan-phase 1 — generate PLAN.md directly (UI-SPEC.md provides full design context)
#    b) /gsd-discuss-phase 1 — gather extra implementation context first (optional, mostly redundant given the rich research + UI-SPEC already on disk)
```

The PLAN.md will cover 18 Phase 1 requirements: INFRA-01..03, IDENT-01..05, CHASSIS-01..10.
