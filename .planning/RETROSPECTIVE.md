# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — Reading Hub

**Shipped:** 2026-05-16
**Phases:** 3 | **Plans:** 3 | **Sessions:** ~6 (2026-05-11 → 2026-05-16)

### What Was Built
- Single-file dark-editorial study hub at `/qhse-cesi/` — Accueil + Découverte + Biblio, no build, no deps (944-line `index.html` + `LEGAL.md`).
- Phase 1: owner-approved visual identity + chassis (sticky nav, smooth-scroll, mobile burger, skip-link, print stylesheet, reserved V2 `#outils` slot).
- Phase 2: hand-written sourced French prose (pitch, programme RNCP41446, calendrier alternance, métiers + salary ranges), every fact cited inline.
- Phase 3: 35 content-verified Biblio cards, data-driven render, provenance + freshness signals, governance scaffolding (LEGAL.md, V2_BACKLOG.md).

### What Worked
- **Skeleton-before-content phase ordering** — sticky/scroll/burger bugs were cheap to fix on an empty shell; content landed on a stable chassis.
- **Atomic commit-per-task + immediate push** — survived owner weekly-cap interruptions; every checkpoint recoverable. Matched the token-conscious constraint well.
- **Citation discipline pattern** (Source : …, vérifié le …) carried cleanly from Phase 2 prose into Phase 3 card provenance.
- **HANDOFF.json + .continue-here.md** made the cross-session pause/resume seamless (resume restored full context in one pass).

### What Was Inefficient
- **3 owner-verify link-fix rounds on Phase 3.** Root cause: the D-02 seed-approve gate was auto-resolved by the owner's "j'approuve tout", which short-circuited the URL verification it existed to enforce. Round 1 then audited HTTP-status only (invalid) → round 2 content-verified → round 3 caught a remaining soft-404 (CARSAT). ~3 extra deploy/verify cycles.
- Orchestrator auto-picked 35 un-probed seeds rather than probing during planning — the rework was entirely avoidable with up-front content verification.

### Patterns Established
- **Content-level link verification is mandatory** (real `<title>` + topic match + soft-404 grep); HTTP-status audits are banned. Codified in memory `feedback_verify_links_before_ship.md` and PROJECT.md Key Decisions.
- **An auto-resolved approval gate still requires running the verification it protected** — never let "approuve tout" skip the underlying check.
- **Unreliable-domain list** maintained (SPA/bot-wall/login-wall/wrong-doc-redirect domains) with stable preferred FR sources.
- One-file + atomic-push + handoff-doc workflow validated for a single-user static project.

### Key Lessons
1. A gate auto-resolved by a blanket approval must still execute its protected verification — gates encode *work*, not just *consent*.
2. HTTP 200 ≠ working link. SPAs, soft-404s, bot-walls, and wrong-doc redirects all return 200 — only page-content inspection is trustworthy.
3. Verify external dependencies (links) *before* shipping, during planning — post-ship verification rounds are the most expensive way to find the same defects.
4. Cross-session handoff artifacts (HANDOFF.json + .continue-here.md) pay for themselves the first time a cap interrupts mid-phase.

### Cost Observations
- Model mix: ~100% opus (orchestrator-inline; gsd-executor subagent deliberately skipped in Phase 3 to conserve token budget under cap pressure).
- Sessions: ~6 across 5 calendar days.
- Notable: skipping the executor subagent in Phase 3 (orchestrator executed inline, 1 commit/task) was cheaper and gave a cleaner audit trail with no quality loss — but the seed-verification shortcut taken alongside it caused the costly rework. Speed-up was real; the corner cut was the link audit, not the executor.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 Reading Hub | ~6 | 3 | Established content-verified link discipline; atomic-push + handoff workflow for cap-interrupted single-user work |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 Reading Hub | manual owner-verify (16-pt checklist) | 39/39 v1 reqs | 1 app, 0 runtime deps |

### Top Lessons (Verified Across Milestones)

1. (v1.0) Approval gates encode work, not just consent — a blanket "approve all" must not skip the verification the gate enforces.
2. (v1.0) External-link health requires content inspection, never HTTP status alone.
