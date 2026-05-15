# V2 Milestone Spec — QHSE CESI Hub « Étude »

**Designed:** 2026-05-16 (via brainstorming skill, owner-approved same day)
**Status:** PARKED — do not start until V1 milestone closes (Phase 3 owner-verified → `/gsd-complete-milestone`)
**Consumed by:** `/gsd-new-milestone` (V2) — this spec is the input; do not re-brainstorm.

---

## Why this exists

V1 deliberately scoped the Hub as a *reading hub* (Découverte + Biblio) and deferred study tools to V2 — to be built once the reading hub is validated in real study sessions. Owner confirmed 2026-05-16 they want the full study suite. This is **not scope drift back to "the original project"** — it is the planned V2, now designed.

The existing root `index.html` "QHSE Trainer" (flashcards + QCM, "Industrial Safety Terminal" aesthetic) stays untouched and separate. V2 builds a *new* study surface inside the CESI Hub, driven by the Hub's own accumulated content.

## Owner decisions (locked during brainstorming 2026-05-16)

| # | Decision | Choice |
|---|----------|--------|
| D-V2-01 | Relationship to existing apps | **New study surface in the Hub, driven by Hub content** (not linking to / not enriching the root Trainer) |
| D-V2-02 | Study modes | **All four**: Flashcards, Fiches de révision, QCM/Quiz, Tests blancs chronométrés |
| D-V2-03 | Content bank volume | **Exhaustive** — 200+ items, full Bachelor QHSE coverage |
| D-V2-04 | Progress persistence | **Spaced repetition (SM-2 / Anki-like)**, localStorage |
| D-V2-05 | File architecture | **Dedicated page `qhse-cesi/outils.html`** + `outils-data.js` via `<script src>`, shared `chassis.css`, zero build step |
| D-V2-06 | Sequencing | **Finish V1 first** (owner-verify Phase 3 → close v1 milestone) before any V2 work |

## Non-negotiable constraint — content accuracy

This is exam-prep content on regulatory QHSE material (RNCP41446, Code du Travail, ISO, ICPE/Seveso). A wrong answer makes the owner revise *false* information for a real diploma. Therefore the content bank MUST follow the **Phase 2 citation discipline**: every item carries a `source` object (authority + ref + url + verified date); no unsourced regulatory claim ships. Fiches de révision show inline citations like the Découverte section. URL discipline from the Phase 3 fix applies (every source URL HTTP-200 + direct, no search/index pages — see [[verify-links-before-ship]]).

## Architecture

- **`qhse-cesi/chassis.css`** — extract the inline `<style>` block (tokens, type scale, components, utilities) from `index.html` into a shared stylesheet. `index.html` and `outils.html` both `<link>` it. Documented Phase 1 evolution path ("split becomes worth it… still no build step — just a second `<link>`"). Extraction is a clean refactor, not a rewrite — token contract and component contract unchanged.
- **`qhse-cesi/outils.html`** — the study app. Same chassis, same visual identity, same dark-default. Inline `<script>` holds the 4 mode engines + SM-2 scheduler + localStorage layer.
- **`qhse-cesi/outils-data.js`** — the sourced content bank. Loaded via `<script src="outils-data.js">`. Plain JS array literals, no build.
- **Hub gateway** — unhide the reserved nav item (`index.html:674`) and `#outils` section (`index.html:793`). The section copy describes the 4 modes and links to `outils.html`. This is the only edit to the frozen V1 `index.html` (plus the `chassis.css` `<link>` swap).

## Content bank

**Themes (exhaustive):** RNCP41446 + BC01–BC04 blocs · DUERP (R4121-1) · 9 principes généraux de prévention (L4121-2) · ISO 9001 / 14001 / 45001 · TMS · risque routier · risque chimique · RPS · espaces confinés · acronymes QHSE · métiers / salaires / ROME (H1502, H1302, Apec) · calendrier alternance · réglementation ICPE / Seveso / Code de l'environnement.

**Item schema:**
```js
{
  id: 'duerp-qcm-001',
  type: 'flashcard' | 'qcm',
  theme: 'duerp',
  question: '…',            // recto for flashcard, stem for qcm
  answer: '…',              // verso for flashcard, canonical answer text
  choices: ['…','…','…','…'], // qcm only
  correct: 2,               // qcm only — index into choices
  explanation: '…',         // shown after answer/correction
  source: { authority: 'INRS', ref: 'ED 6322', url: 'https://…', verified: '2026-…' },
  difficulty: 1 | 2 | 3
}
```

**Fiches de révision:** one structured printable sheet per major theme — condensed sourced summary of the Hub content, inline citations, print stylesheet (reuse Phase 1 print rules).

**Tests blancs:** composed from the QCM pool (thematic or global), timed, final score + per-question correction with source. Score history saved; does NOT feed the SRS queue (pure exam simulation).

## Spaced repetition (SM-2)

- `localStorage` keys: `qhse-srs-v1` (per-card `{ease, interval, due, lapses, reps}`), `qhse-scores-v1` (test/quiz history), `qhse-prefs-v1` (last theme/mode).
- Standard SM-2 with 4 self-grades (raté / dur / bien / facile). "À réviser aujourd'hui" view surfaces due cards.
- Flashcards self-grades and QCM wrong answers feed the SRS queue. Tests blancs do not.

## Phase decomposition (5 phases)

| Phase | Deliverable | Analogous to |
|-------|-------------|--------------|
| **V2-P1** | Extract `chassis.css`; scaffold `outils.html` (4-tab nav shell, empty); unhide Hub `#outils` gateway. Deployable walking skeleton. | V1 Phase 1 (chassis) |
| **V2-P2** | `outils-data.js` — 200+ sourced items, all themes, every item source-verified. The big content-acquisition phase. | V1 Phase 2 (Découverte content) |
| **V2-P3** | Flashcards mode + SM-2 scheduler + localStorage persistence. | — |
| **V2-P4** | QCM mode + Tests blancs chronométrés + score history + SRS error feed. | — |
| **V2-P5** | Fiches de révision + print stylesheet. | — |

Each phase ends with owner-verify against the live URL, same discipline as V1.

## Out of scope for V2 (do not fold in)

- Backend / accounts / sync — localStorage only, single-user, static.
- Modifying the root QHSE Trainer.
- AI-generated questions at runtime — bank is hand-authored + sourced at commit time.
- Multi-user leaderboards / gamification — explicitly rejected in `V2_BACKLOG.md`.

## Process / sequencing

1. **Now:** finish V1 — owner runs the Phase 3 T-03-08 16-point checklist against `https://mes-apps-claude.vercel.app/qhse-cesi/`, replies `approuvé`.
2. **Then:** `/gsd-complete-milestone` archives the v1 milestone.
3. **Then:** `/gsd-new-milestone` "Étude" — ingest this spec, generate the 5-phase roadmap.
4. Per-phase: `/gsd-discuss-phase` → `/gsd-plan-phase` → `/gsd-execute-phase` → owner-verify, as in V1.

GSD is the project's workflow (CLAUDE.md). This spec replaces the superpowers writing-plans step — it is the milestone input, not a plan.

---

*Spec written 2026-05-16 via brainstorming skill. Owner-approved design. Parked pending V1 closure. Related: [[qhse-cesi-hub]], [[verify-links-before-ship]], `.planning/V2_BACKLOG.md` (TOOL-01..03 now have this concrete design).*
