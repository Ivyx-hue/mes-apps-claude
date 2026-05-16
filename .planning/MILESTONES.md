# Milestones

## v1.0 Reading Hub (Shipped: 2026-05-16)

**Delivered:** A single-file, dark-editorial study hub for the Bachelor QHSE at CESI Bordeaux — Accueil + sourced Découverte prose + a 35-card content-verified Biblio — live at `https://mes-apps-claude.vercel.app/qhse-cesi/`.

**Stats:** 3 phases · 3 plans · 39/39 v1 requirements ✓ · `qhse-cesi/index.html` 944 lines (no build, no deps) + `LEGAL.md` · timeline 2026-05-11 → 2026-05-16 (5 days) · git `5523c5d…` → tag `v1.0`.

**Key accomplishments:**

1. **Phase 1 — Skeleton chassis + visual identity**: deployed empty shell with owner-approved warm-dark editorial identity (Fraunces + Inter + JetBrains Mono, OKLCH + `light-dark()`), sticky nav, smooth-scroll anchors, mobile burger, skip-link, print stylesheet, reserved `<section id="outils" hidden>` for V2 — visibly distinct from the QHSE Trainer.
2. **Phase 2 — Découverte content**: hand-written French semantic prose — accueil lead, 1-min pitch, programme `<dl>` (RNCP41446 BC blocs), calendrier alternance (Mode B), 4 métiers in 2 experience tiers with sourced salary ranges — every factual claim cited inline `(Source : …, vérifié le …)`.
3. **Phase 3 — Biblio**: 35 curated link cards across 5 categories rendered data-driven from `BIBLIO[]` + `renderCards()` (single mount, no inline `onclick`, no duplicated HTML), with provenance badges, age-coloured freshness, and Wayback fallback on officiel high-value cards.
4. **Governance scaffolding**: `qhse-cesi/LEGAL.md` (link-curation policy + CPI L122-5 pedagogical exception, POLICY-01), `.planning/V2_BACKLOG.md` (deferred-features discipline, POLICY-02), no PDFs under `/qhse-cesi/` (POLICY-03), footer `derniere_maj` + repo link (POLICY-04).
5. **Content-verified link discipline established**: HTTP-status link audits proven invalid and banned after 3 owner-verify fix rounds (HTTP-only → content-verified → CARSAT soft-404); codified in memory `feedback_verify_links_before_ship.md`. 35/35 cards content-verified at close.

**Process lessons:** the D-02 seed-approve gate was auto-resolved by "j'approuve tout", which short-circuited the URL verification it existed to force — cost 3 post-ship fix rounds. Structural fix: link verification must check page **content** (real `<title>` + topic match + soft-404 grep), never HTTP status alone.

**Next:** v2.0 "Étude" (study tools) — fully designed, parked in `.planning/V2-ETUDE-SPEC.md`.

---
