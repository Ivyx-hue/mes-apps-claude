# Phase 3 — Discussion Log

**Date:** 2026-05-15
**Workflow:** `/gsd-discuss-phase 3` (interactive, default mode)
**Owner:** Vincent Lasmoles
**Format:** AskUserQuestion with previews for layout choices

This log is a human-readable record of the discuss-phase Q&A. Canonical decisions live in `03-CONTEXT.md` (`<decisions>` section). Downstream agents (researcher, planner, executor) read CONTEXT.md, not this log.

---

## Areas presented

Four candidate gray areas were surfaced via the orchestrator's phase analysis:

1. Répartition des 35 cards across 5 categories
2. Stratégie couleurs par catégorie (BIBLIO-08)
3. Quand on locke les 35 URLs concrètes
4. Densité layout + tri intra-catégorie

**Owner selected for discussion:** 1, 3, 4 (multi-select).
**Owner declined (Claude's Discretion):** 2 — codified as "single shared `--accent` for every badge surface, badge LABEL differentiates" in CONTEXT.md `Claude's Discretion`.

A fifth follow-up question was raised about the pre-existing Phase 1 shadow at `qhse-cesi/index.html:230` (carries from Phase 2 SUMMARY) — owner answered single-select.

---

## Q1 — Répartition des 35 cards

**Options presented:**

- Équitable 7/7/7/7/7 (preview: every category at 7)
- Pondéré référence 10/5/10/5/5 (preview: officiel + pedago heavy, others at floor)
- Légèrement pondéré 9/6/9/6/5 (preview: light weighting)

**Owner answer:** Équitable 7/7/7/7/7

**Captured as:** D-01 — symmetric split locks the floor and gives the researcher a clear per-category target. If a category cannot produce 7 vetted cards, researcher flags the shortfall during plan-phase.

---

## Q2 — Quand on locke les 35 URLs

**Options presented:**

- Owner-fourni maintenant (discuss-phase) — 30-60 min of owner time, total control
- Researcher propose ~50, owner picks/cuts to 35 in plan-phase (Recommended) — explicit owner-approve checkpoint between plan-phase and execute-phase
- Executor propose card-par-card during execute — 35 commits, fine-grained but heavy in tokens

**Owner answer:** Researcher propose + owner approuve (plan-phase)

**Captured as:** D-02 — researcher writes `03-SEED-CANDIDATES.md` (one section per category, ~10 candidates each). Owner edits in place and replies "seed approuvé" before `/gsd-execute-phase 3` runs. Researcher honours hard rejects: no `.pdf` URLs, no aggregators, no paywalled-without-alternative, no URLs that already 404 at research time.

---

## Q3a — Densité layout

**Options presented:**

- 1-col mobile / 2-col desktop (preview: balanced readability)
- 1/2/3-col responsive via container queries (preview: denser)
- Liste éditoriale full-width (preview: 1-col everywhere, max info per card)

**Owner answer:** Liste éditoriale full-width

**Captured as:** D-03 — 1-column at every breakpoint, each card is a full-width row carrying [badge] + title + 2-3 line description + footer with domain + lastChecked. Whole card surface is clickable (`<a>` wrapping `<article>`). Matches the chassis "library / editorial" identity.

---

## Q3b — Tri intra-catégorie

**Options presented:**

- `priority` desc (owner-decided importance)
- `lastChecked` desc (freshly verified at the top)
- Hand-ordered (BIBLIO[] array order)

**Owner answer:** `lastChecked` desc

**Captured as:** D-04 — render-time sort `BIBLIO.sort((a, b) => b.lastChecked.localeCompare(a.lastChecked))` over ISO `YYYY-MM-DD` strings. `priority` stays in schema for V2 filter chips but is not used for sort in V1.

---

## Q4 — Pre-existing Phase 1 shadow (carry-forward decision)

**Options presented:**

- Relax invariant to surface-colors only (Recommended) — shadow alpha is intentional editorial depth
- Fix as a Phase 1 maintenance commit before Phase 3 — rewrite line 230 to `rgb(0 0 0 / 0.45)` or `oklch(15% 0 0 / 0.45)`
- Fix opportunistically during Phase 3 — same commit as the grid render, violates "no out-of-scope changes" rule

**Owner answer:** Relax l'invariant aux surface-colors only

**Captured as:** D-05 — black-floor invariant now applies to `background`, `background-color`, `color`, `border-color`, etc., NOT to `box-shadow`, `filter: drop-shadow`, `outline-color` when carrying an alpha channel < 1. Line 230 stays as-is; planner adds the relaxed invariant to PLAN.md verification gates.

---

## Notes for the planner

- The owner-approve seed-list checkpoint between plan-phase and execute-phase is a **hard gate** — no card-render task starts until "seed approuvé" is received.
- Phase 3 file-size budget: ≤ 1100 lines for `qhse-cesi/index.html` (current 720 + ~350-400 for biblio render). `LEGAL.md` and `V2_BACKLOG.md` are separate files.
- Cards are the SEVENTH and FINAL named component allowed (Phase 1 reserved this slot for Phase 3). No other new components in Phase 3.
- Badge surface is the second slot for `--accent` (Phase 1 reserved this). Only one badge surface per card.

---

## Deferred / scope-creep redirects

None — no scope creep was raised by the owner during this discussion. All deferrals are inherited from PROJECT.md + REQUIREMENTS.md §v2 + Phase 2 deferred section, and consolidated in CONTEXT.md `<deferred>` and the planned `V2_BACKLOG.md`.

---

*Discussion log written: 2026-05-15. Canonical decisions: `03-CONTEXT.md`.*
