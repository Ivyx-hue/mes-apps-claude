# Roadmap: QHSE CESI Hub

**Created:** 2026-05-11
**Mode:** mvp (Vertical MVP — each phase ships a deployable, owner-visible artifact)
**Granularity:** coarse

## Milestones

- ✅ **v1.0 Reading Hub** — Phases 1–3 (shipped 2026-05-16) — see `milestones/v1.0-ROADMAP.md`
- 📋 **v2.0 Étude** — study tools (current milestone, in planning)

## Phases

<details>
<summary>✅ v1.0 Reading Hub (Phases 1–3) — SHIPPED 2026-05-16</summary>

- [x] Phase 1: Skeleton chassis + visual identity (1/1 plan) — owner-verified 2026-05-11
- [x] Phase 2: Découverte content (1/1 plan) — owner-verified 2026-05-15
- [x] Phase 3: Biblio data + render + 5 categories populated (1/1 plan) — owner-verified 2026-05-16

Full phase details, goals, success criteria, and coverage audit: `.planning/milestones/v1.0-ROADMAP.md`

</details>

### v2.0 Étude

- [x] **Phase 1: Shell & Gateway** — Extract `chassis.css`, scaffold `outils.html` 4-tab shell, un-hide Hub `#outils` gateway. Deployable walking skeleton. (completed 2026-05-17)
- [x] **Phase 2: Content Bank** — `outils-data.js` with 200+ source-verified study items covering all Bachelor QHSE themes. (completed 2026-05-21)
- [x] **Phase 3: Flashcards + SRS** — Flashcard mode with SM-2 spaced repetition scheduler and `localStorage` persistence. (completed 2026-05-25)
- [ ] **Phase 4: QCM + Tests blancs** — Quiz mode, timed mock exams, score history, SRS error feed.
- [ ] **Phase 5: Fiches de révision** — Structured per-theme revision sheets with print stylesheet.

## Phase Details

### Phase 1: Shell & Gateway
**Goal**: The owner can navigate to `outils.html` from the Hub and see a deployable 4-tab study shell with the same editorial identity — no broken links, no broken Hub pages.
**Depends on**: Nothing (first v2.0 phase)
**Requirements**: SHELL-01, SHELL-02, SHELL-03, SHELL-04, SHELL-05, PERSIST-02
**Success Criteria** (what must be TRUE):
  1. Owner opens `https://mes-apps-claude.vercel.app/qhse-cesi/` and sees the `#outils` nav item and gateway section (previously hidden); clicking it navigates smoothly to a description of the 4 study modes with a working link to `outils.html`.
  2. Owner opens `outils.html` directly and sees a 4-tab navigation shell (Flashcards, Fiches, QCM, Tests blancs) with the same dark editorial identity (Fraunces + Inter + OKLCH tokens) — on both mobile and desktop.
  3. Owner opens `index.html` (Hub) and verifies all existing sections (Accueil, Découverte, Biblio) render identically to v1.0 — zero visual or functional regression.
  4. Owner opens the root QHSE Trainer (`https://mes-apps-claude.vercel.app/`) and confirms it still renders unchanged.
  5. Owner inspects the repo and confirms `chassis.css` exists, is loaded by both `index.html` and `outils.html` via `<link>`, and no inline `<style>` block duplicates the extracted tokens.
**Plans**: 2 plans
Plans:
**Wave 1**
- [x] 01-01-PLAN.md — Extract chassis.css verbatim from index.html; swap inline <style> for <link>

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 01-02-PLAN.md — Scaffold outils.html 4-tab ARIA shell; un-hide & rewrite the Hub #outils gateway
**UI hint**: yes

### Phase 2: Content Bank
**Goal**: `outils-data.js` is published with 200+ study items — fully sourced, schema-compliant, covering every Bachelor QHSE theme — such that any mode can consume them without further content work.
**Depends on**: Phase 1
**Requirements**: BANK-01, BANK-02, BANK-03, BANK-04, BANK-05
**Success Criteria** (what must be TRUE):
  1. Owner loads `outils-data.js` in the browser console and evaluates `BANK.length >= 200` — it returns `true`; items span all declared themes (DUERP, principes généraux, ISO 9001/14001/45001, TMS, risque routier, risque chimique, RPS, espaces confinés, acronymes, métiers/ROME, calendrier, ICPE/Seveso, RNCP blocs).
  2. Owner samples 10 random items and confirms each has all required fields: `id`, `type`, `theme`, `question`, `answer`, `explanation`, `source` (with `authority`, `ref`, `url`, `verified`), `difficulty` — and QCM items also carry `choices` and `correct`.
  3. Every `source.url` is content-verified: real `<title>` + topic match + soft-404 grep; no search/index pages; no HTTP-status-only checks — zero broken source links at ship time.
  4. Owner filters `BANK.filter(i => i.theme === 'duerp')` and gets a non-empty array; same for at least 5 other themes — confirming `theme` is a usable filter key across the whole bank.
**Plans**: 7 plans
Plans:
**Wave 1**
- [x] 02-01-PLAN.md — Scaffold outils-data.js + window.BANK contract, wire <script src> into outils.html (closes SHELL-05), author Batch A duerp+principes-generaux (36 items)

**Wave 2** *(blocked on Wave 1 — shared outils-data.js)*
- [x] 02-02-PLAN.md — Batch B: iso-45001/iso-9001/iso-14001 (46 items) — blocking human-verify of ISO free-source URLs

**Wave 3** *(blocked on Wave 2)*
- [x] 02-03-PLAN.md — Batch C: tms/risque-routier/rps (40 items) — INRS/ameli backbone

**Wave 4** *(blocked on Wave 3)*
- [x] 02-04-PLAN.md — Batch D: risque-chimique/espaces-confines (30 items) — CLP/SGH/VLEP/O2 accuracy

**Wave 5** *(blocked on Wave 4)*
- [x] 02-05-PLAN.md — Batch E: icpe-seveso/calendrier/acronymes (43 items) — calendrier % live-refetch; SPA acronyms deferred

**Wave 6** *(blocked on Wave 5)*
- [x] 02-06-PLAN.md — Batch F: metiers/rncp + deferred SPA acronymes (25+ items) — blocking human-verify of MétierScope/France compétences SPAs

**Wave 7** *(blocked on Wave 6)*
- [x] 02-07-PLAN.md — Final integration: --final gate asserting ROADMAP SC1-4 + SHELL-05 closure + D-01..D-13 (BANK >= 200, target >= 210)

### Phase 3: Flashcards + SRS
**Goal**: The owner can study flashcards with spaced repetition — reviewing due cards, self-grading, and returning the next day to find the scheduler has advanced their queue.
**Depends on**: Phase 2
**Requirements**: FLASH-01, FLASH-02, SRS-01, SRS-02, SRS-03, SRS-04, PERSIST-01
**Success Criteria** (what must be TRUE):
  1. Owner opens the Flashcards tab, selects a theme (or "all themes"), and sees the recto (question) of the first card; clicking "Révéler" shows the verso (answer + explanation + source reference). ✅ owner-verified 2026-05-25
  2. After revealing, owner sees 4 self-grade buttons (raté / dur / bien / facile); clicking one advances to the next card and the SM-2 scheduler records the grade in `localStorage` key `qhse-srs-v1`. ✅ owner-verified 2026-05-25
  3. Owner opens the "À réviser aujourd'hui" view and sees only cards whose computed due date is today or earlier — demonstrating the scheduler is surfacing the right cards. ✅ owner-verified 2026-05-25
  4. Owner reloads `outils.html` and returns to flashcards — their SRS progress (ease, interval, due, lapses, reps per card) is intact; their last-used theme/mode is restored from `qhse-prefs-v1`. ✅ owner-verified 2026-05-25
  5. Owner grades a card as "raté" in flashcard mode, then checks the SRS queue — that card appears as due immediately; confirms flashcard grades and QCM wrong answers both feed the same queue. ✅ owner-verified 2026-05-25 (flashcard half; QCM-feed half ships in Phase 4)
**Plans**:
  - `03-01-PLAN.md` — `qhse-cesi/srs.js` pure SM-2 module (window.SRS w/ 6 pure functions + DEFAULTS + GRADE)
  - `03-02-PLAN.md` — `verify-srs.cjs` Node gate (21 named PASS assertions, exit 0)
  - `03-03-PLAN.md` — Flashcards view DOM/IIFE in `outils.html` + `.fc-*` CSS namespace in `chassis.css`
  - `03-04-PLAN.md` — Integration + smoke-test + ship (this plan)
**UI hint**: yes

### Phase 4: QCM + Tests blancs
**Goal**: The owner can take themed or global quizzes and full timed mock exams — with immediate feedback per question, a final score, and a score history that persists across sessions.
**Depends on**: Phase 3
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, TEST-01, TEST-02, TEST-03
**Success Criteria** (what must be TRUE):
  1. Owner opens the QCM tab, picks a theme (or "all"), and sees a question stem with 4 answer choices; selecting one immediately reveals whether it was correct, shows the canonical answer, the explanation, and the source.
  2. A wrong QCM answer adds that card to the SRS queue — owner can verify by checking `localStorage` key `qhse-srs-v1` and finding the card's interval reset.
  3. Owner opens the Tests blancs tab, starts a timed exam (thematic or global), sees a countdown timer, and answers a sequence of QCM questions; on completion the final score (N/Total) and per-question correction with sources is displayed.
  4. Owner completes two separate test sessions and opens the score history view — both results appear with date/theme/score, persisted in `localStorage` key `qhse-scores-v1`; completing a test does NOT modify `qhse-srs-v1`.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Fiches de révision
**Goal**: The owner can read a condensed, sourced revision sheet for each major theme and print it cleanly for offline study.
**Depends on**: Phase 4
**Requirements**: FICHE-01, FICHE-02
**Success Criteria** (what must be TRUE):
  1. Owner opens the Fiches tab and sees one revision sheet per major theme — each a structured, readable summary with inline source citations (authority + ref), consistent with the Découverte section's provenance style.
  2. Owner triggers browser print (Ctrl+P) on a fiche and sees a clean print preview: sticky nav removed, link URLs rendered as footnotes, no dark-mode ink waste — reusing the v1.0 print stylesheet rules.
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Skeleton chassis + visual identity | v1.0 | 2/2 | Complete   | 2026-05-17 |
| 2. Découverte content | v1.0 | 6/7 | In Progress|  |
| 3. Biblio data + render + 5 categories populated | v1.0 | 3/4 | In Progress|  |
| 1. Shell & Gateway | v2.0 | 0/? | Not started | - |
| 2. Content Bank | v2.0 | 0/7 | Planned | - |
| 3. Flashcards + SRS | v2.0 | 4/4 | Complete | 2026-05-25 |
| 4. QCM + Tests blancs | v2.0 | 4/4 | Awaiting UAT | - |
| 5. Fiches de révision | v2.0 | 0/? | Not started | - |

## Out-of-Roadmap Notes

- Each phase ends with a `git push origin main` to the existing GitHub Actions pipeline; live URL ~60 s later.
- The existing QHSE Trainer at the repo root is treated as a frozen sibling — no modifications, only co-existence.
- No backend, no Supabase, no auth — static HTML + `localStorage` is the entire persistence layer.
- Link curation discipline (v1.0, carried to v2.0): content-verify every external URL before ship (real `<title>` + topic match + soft-404 grep); HTTP-status audits banned. See memory `feedback_verify_links_before_ship.md`.
- PERSIST-02 is a standing architectural invariant (no backend, no accounts, hand-authored bank) — mapped to Phase 1 as the phase that establishes the file architecture it constrains.

---
*Roadmap created: 2026-05-11*
*Last updated: 2026-05-27 — Phase 4 Plan 04 complete (verify-quiz.cjs gate shipped, commit da255d1); all Phase 4 plans 4/4 done, awaiting owner UAT*
