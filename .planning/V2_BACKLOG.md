# V2_BACKLOG.md — QHSE CESI Hub

**Pre-seeded:** 2026-05-15 (Phase 3 — POLICY-02)
**Purpose:** capture every "while-I'm-at-it" idea that surfaces during V1, so the V1 reading hub stays a reading hub. Any feature that lands here is **not in V1 by definition**.

---

## v1.1 — Quick wins (target: 2-4 weeks of real use)

Features that become obvious once V1 is lived in. Each is ≤ 1 day of work and ships independently.

- **UX-01 — Scrollspy on top nav.** `IntersectionObserver` watches each section, top nav highlights the active link. ~30 lines vanilla JS, no dependency. Trigger: owner finds themselves losing context while scrolling.
- **UX-02 — Filter chips on Biblio.** Per-category chip row at top of `#biblio-grid` toggling `display` via `data-category`. Tags also become chips. `BIBLIO[]` schema already carries `tags[]` populated but unused in V1 — V1.1 enables them.
- **UX-03 — Mark-as-read toggle per card.** Click a card → toggle `data-read="true"` → persist in `localStorage`. Visual treatment: dim opacity, strike-through, or eyebrow tag.
- **UX-04 — Ctrl+K search.** Modal-ish input, substring filter over `title` + `description` + `tags[]`. Vanilla JS, ~50 lines.
- **UX-05 — Copy-link button per card.** `navigator.clipboard.writeText(card.url)`. One button per card. Trigger: owner wants to share a single resource via SMS.
- **UX-06 — Reading-progress bar on Découverte.** Position-fixed top thin bar that tracks scroll within `#decouverte`. Visual cue for "how much have I survol'd".
- **UX-07 — Optional light-mode toggle.** Owner-controlled toggle, persisted in `localStorage`. Requires inline `<head>` FART-prevention script (set the class before paint).
- **Sticky mini-TOC on desktop scroll** (deferred from Phase 2). On viewport ≥ 768 px the Découverte mini-TOC becomes a sticky aside on the right. Phase 2 explicitly left this as v1.1 if the static inline TOC proves insufficient.
- **Visual salary bars** (deferred from Phase 2). Mini histogram or range indicator on métiers cards (min / médiane / max). Today shipped as inline JetBrains Mono text only.

## v2 — Study tools — DESIGNED 2026-05-16, see `.planning/V2-ETUDE-SPEC.md`

PROJECT.md hard constraint: **V2 only after V1 lived in.** The reading hub must prove its value as a reading hub before tooling is added.

> **Concrete design exists:** `.planning/V2-ETUDE-SPEC.md` (owner-approved 2026-05-16 via brainstorming). 5-phase V2 "Étude" milestone — dedicated `outils.html`, exhaustive sourced bank (200+ items), 4 modes, SM-2 spaced repetition. PARKED until V1 closes. Feed it to `/gsd-new-milestone` after `/gsd-complete-milestone`.

- **TOOL-01 — Flashcards trainer.** → V2-P3 in the spec. Pure vanilla JS, localStorage, no backend.
- **TOOL-02 — QCM mode + tests blancs.** → V2-P4 in the spec. Thematic/global quizzes + timed mock exams.
- **TOOL-03 — Spaced-repetition scheduling.** → V2-P3 in the spec. SM-2 / Anki-like, localStorage.
- **TOOL-04 — Fiches de révision (new).** → V2-P5. Structured printable sourced summary sheets per theme.

## v2 — Reading & navigation enhancements

- **UX-08 — Auto link-checker as GitHub Action.** Replaces the manual quarterly link-verification ritual deferred from Phase 2. Action runs weekly, HEAD-checks every outbound URL in `BIBLIO[]`, opens a GitHub Issue when one breaks. Avoids the maintenance overhead of a `?verify=1` dev tool.
- **In-page reverse RNCP mapping** (deferred from Phase 2). Bloc N°k → modules X, Y, Z. Currently rendered only forward (module → bloc N°k). Reverse mapping doubles the maintenance surface.

## Ideas considered and explicitly rejected (NOT deferred — NEVER built)

These appeared during ideation but contradict the project's core value. Listed here so we don't re-litigate them.

- **AI chatbot on top of the curated hub** — destroys the "curated trustworthy source" premise. MIT 2026 research shows chatbots degrade accuracy for vulnerable users.
- **Gamification (XP / badges / streaks)** — one reader who already wants to read; no engagement problem to solve.
- **Real-time Reddit / RSS / API embeds** — breaks offline reading, breaks when tokens expire, defeats the curation model. Hand-curated links only.
- **User accounts / authentication / backend sync** — single-user personal tool; static HTML is sufficient.
- **Comments / discussion threads** — no audience.
- **Carousels / sliders** — 15 years of NN/G evidence against them on reference docs.
- **Analytics / heat-maps / tracking pixels** — CNIL exposure, no audience.
- **Newsletter signup, social share buttons** — personal tool, not a publication.
- **Hosting copyrighted annales / corrigés PDFs** — French pedagogical exception does not cover public Vercel hosting; link-only policy enforced via POLICY-03.
- **Multi-language UI** — formation is in French, content is in French, owner is French.
- **Replacing or modifying the existing QHSE Trainer** — Trainer stays at repo root; hub lives at `/qhse-cesi/` and links to the Trainer.
- **Service worker / PWA shell** — single static file is already offline-friendly; complexity not justified.

## How to add to this backlog

When an idea surfaces during V1 work:

1. **Is it a v1.1 quick win?** Add to `## v1.1`. Estimate: ≤ 1 day. Ships independently.
2. **Is it a v2 study tool?** Add to `## v2 — Study tools`.
3. **Does it contradict V1 core value?** Add to `## Ideas considered and explicitly rejected` so we don't re-litigate.
4. **Is it just a refactor / cleanup?** It goes in the relevant phase's deviation log, not here. Backlog is for *features*, not internal hygiene.

Each entry should answer: **what trigger reveals we need it?** (so we don't build it speculatively).

---

*V2_BACKLOG.md — POLICY-02 satisfied. Pre-seeded with every deferred V1 idea + Phase 2 v1.1 deferrals + rejected ideas, so V1 stays a reading hub.*
