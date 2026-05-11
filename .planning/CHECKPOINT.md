# Session Checkpoint — QHSE CESI Hub

**Saved**: 2026-05-11 (Europe/Paris)
**Reason**: Mid-session save before potential token reset
**Branch**: main
**Workflow**: `/gsd-new-project` (interactive, YOLO mode)

---

## Where We Are in the GSD Workflow

| Step | Status | Notes |
|------|--------|-------|
| 1. Setup | ✓ Done | greenfield, agents installed, git ready |
| 2. Brownfield offer | ✓ Skipped | `needs_codebase_map: false` |
| 3. Deep questioning | ✓ Done | Context from brainstorming was sufficient |
| 4. PROJECT.md | ✓ Committed (`6bf70e6`) | `.planning/PROJECT.md` |
| 5. Workflow preferences | ✓ Committed (`3f84ebf`) | `.planning/config.json` |
| 5.1 Sub-repo detection | ✓ Skipped | no sub-repos |
| 5.5 Resolve model profile | ✓ Done | sonnet (balanced) |
| 6. Research decision | ✓ Done | 4 researchers spawned and **completed** |
| 6a. Synthesize SUMMARY.md | ⏸ **Pending** | spawn `gsd-research-synthesizer` next |
| 7. Define REQUIREMENTS.md | ⏸ Pending | depends on synthesis |
| 7.5 Project structure mode | ⏸ Pending | likely Vertical MVP |
| 8. Create ROADMAP.md | ⏸ Pending | spawn `gsd-roadmapper` |
| 9. Done | ⏸ Pending | hand off to `/gsd-discuss-phase 1` |

---

## Files Created So Far

```
.planning/
├── PROJECT.md         (committed 6bf70e6)
├── config.json        (committed 3f84ebf)
├── CHECKPOINT.md      (this file — uncommitted at write time)
└── research/
    ├── STACK.md        (uncommitted)
    ├── FEATURES.md     (uncommitted)
    ├── ARCHITECTURE.md (uncommitted)
    └── PITFALLS.md     (uncommitted)
```

Plus an unrelated change still pending:
- `CLAUDE.md` modified (Toulouse → Bordeaux) — uncommitted

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

## How to Resume (in a fresh session)

```bash
# 1. Pull latest
git pull origin main

# 2. Restart the workflow at the synthesizer step:
#    Spawn gsd-research-synthesizer to read the 4 research files
#    and write .planning/research/SUMMARY.md, then commit.

# 3. Then continue Steps 7 → 8 → 9 of /gsd-new-project:
#    - Define REQUIREMENTS.md (interactive, scoped by category)
#    - Pick project mode (Vertical MVP recommended)
#    - Spawn gsd-roadmapper to write ROADMAP.md + STATE.md
#    - Approve roadmap, commit, then run /gsd-discuss-phase 1
```

The exact synthesizer prompt to use (from `workflows/new-project.md` Step 6):
- Reads: `.planning/research/STACK.md`, `FEATURES.md`, `ARCHITECTURE.md`, `PITFALLS.md`
- Writes: `.planning/research/SUMMARY.md` (using template at `~/.claude/get-shit-done/templates/research-project/SUMMARY.md`)
- Commits after writing
- subagent_type: `gsd-research-synthesizer`, model: `sonnet`

---

## Things to Re-confirm With User on Resume

1. Visual identity direction — features research recommends warm dark `#1a1814` + paper `#e8e2d4` + warm accent `#c9a96e`, humanist sans + quiet serif. Architecture research suggests Fraunces + Inter + JetBrains Mono. Owner should sign off before any HTML is written.
2. Project mode in Step 7.5 — likely **Vertical MVP** (single V1 phase that ships end-to-end).
3. GitHub token for push (90-day token, may need refresh).
