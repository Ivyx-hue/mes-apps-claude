# Requirements: QHSE CESI Hub — v2.0 "Étude"

**Defined:** 2026-05-16
**Core Value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without digging through scattered sources every time. *(v2.0 extends this with: actively revise that content and track mastery.)*
**Source:** `.planning/V2-ETUDE-SPEC.md` (owner-approved brainstorming output — locked decisions D-V2-01..06)

## Milestone v2.0 Requirements

Committed scope for the "Étude" milestone. Each maps to exactly one roadmap phase.

### Shell & Gateway (SHELL)

- [ ] **SHELL-01**: The shared chassis CSS is extracted to `qhse-cesi/chassis.css`; both `index.html` and `outils.html` load it via `<link>`, with the v1.0 token + component contract visually unchanged and no build step introduced
- [x] **SHELL-02**: A new page `qhse-cesi/outils.html` exists with the same dark editorial identity as the Hub and a 4-tab navigation shell (Flashcards, Fiches, QCM, Tests blancs)
- [x] **SHELL-03**: The reserved `#outils` nav item and section in `index.html` are un-hidden; the section describes the 4 study modes and links to `outils.html`
- [x] **SHELL-04**: The root QHSE Trainer and the v1.0 Hub reading content (Accueil, Découverte, Biblio) remain visually and functionally unchanged after the chassis extraction
- [x] **SHELL-05**: `outils.html` loads its content bank via `<script src="outils-data.js">` with no build step and is usable on mobile + desktop, dark default

### Content Bank (BANK)

- [ ] **BANK-01**: `qhse-cesi/outils-data.js` provides 200+ study items covering the full Bachelor QHSE scope (RNCP41446/BC01–BC04, DUERP R4121-1, 9 principes L4121-2, ISO 9001/14001/45001, TMS, risque routier, risque chimique, RPS, espaces confinés, acronymes, métiers/ROME, calendrier alternance, ICPE/Seveso)
- [ ] **BANK-02**: Every item follows the canonical schema (`id`, `type`, `theme`, `question`, `answer`, `choices?`, `correct?`, `explanation`, `source`, `difficulty`)
- [ ] **BANK-03**: Every item carries a `source` object (`authority`, `ref`, `url`, `verified` date); no regulatory claim ships unsourced
- [ ] **BANK-04**: Every `source.url` is HTTP-200 and lands directly on the cited content (content-verified — real `<title>` + topic match + soft-404 grep; no search/index pages), per the v1.0 link discipline
- [ ] **BANK-05**: Items carry a `theme` so any mode can filter or compose a session by theme

### Flashcards (FLASH)

- [ ] **FLASH-01**: The user can study flashcards (recto question → reveal verso answer + explanation + source) for a chosen theme or all themes
- [ ] **FLASH-02**: After revealing a card, the user self-grades it on 4 levels (raté / dur / bien / facile)

### Spaced Repetition (SRS)

- [ ] **SRS-01**: A standard SM-2 scheduler computes each card's next due date from the user's self-grades, persisted in `localStorage` (`qhse-srs-v1`: ease, interval, due, lapses, reps)
- [ ] **SRS-02**: A "À réviser aujourd'hui" view surfaces all cards currently due
- [ ] **SRS-03**: Flashcard self-grades and wrong QCM answers feed the SRS queue; tests blancs do not
- [ ] **SRS-04**: SRS progress persists across sessions and survives reloads (localStorage only, single-user, no backend)

### QCM / Quiz (QUIZ)

- [ ] **QUIZ-01**: The user can take a QCM quiz (stem + multiple choices) for a chosen theme or all themes
- [ ] **QUIZ-02**: After answering each question, the user sees whether they were correct, the canonical answer, an explanation, and the source
- [ ] **QUIZ-03**: Wrong QCM answers are fed to the SRS queue for later review

### Tests blancs (TEST)

- [ ] **TEST-01**: The user can run a timed mock exam composed from the QCM pool (thematic or global)
- [ ] **TEST-02**: At the end, the user sees a final score and a per-question correction with the source for each item
- [ ] **TEST-03**: Test/quiz score history is saved in `localStorage` (`qhse-scores-v1`); tests blancs do NOT feed the SRS queue (pure exam simulation)

### Fiches de révision (FICHE)

- [ ] **FICHE-01**: The user can read one structured révision sheet per major theme — a condensed sourced summary of the Hub content with inline citations (Découverte-style provenance)
- [ ] **FICHE-02**: Fiches are printable with a clean print stylesheet (reusing the v1.0 print rules — sticky nav removed, link URLs as footnotes)

### Persistence & Trust (PERSIST)

- [ ] **PERSIST-01**: All persistence uses three documented `localStorage` keys (`qhse-srs-v1`, `qhse-scores-v1`, `qhse-prefs-v1`); the last theme/mode is restored on return
- [x] **PERSIST-02**: No backend, no accounts, no sync, no runtime AI question generation, no multi-user/gamification — the bank is hand-authored + sourced at commit time

## Future Requirements

Deferred beyond v2.0. Tracked but not in this roadmap.

### Reading-hub quick wins (v1.1 backlog — orthogonal to Étude)

- **UX-01..08**: scrollspy, filter chips, mark-as-read, Ctrl+K search, copy-link, reading-progress bar, light toggle, GitHub-Action link-checker — see `.planning/V2_BACKLOG.md` § v1.1

## Out of Scope

Explicitly excluded for v2.0. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Backend / accounts / cloud sync | Single-user, static, localStorage-only — D-V2-04/05 locked |
| Modifying the root QHSE Trainer (`/index.html`) | Frozen sibling; v2.0 builds a *new* surface in the Hub — D-V2-01 |
| AI-generated questions at runtime | Bank is hand-authored + source-verified at commit time; runtime generation breaks the content-accuracy guarantee |
| Multi-user leaderboards / gamification (XP, badges, streaks) | Explicitly rejected in `V2_BACKLOG.md`; single reader, no engagement problem |
| Tests blancs feeding the SRS queue | Pure exam simulation by design (D-V2-04) — only flashcards + wrong QCM feed SM-2 |
| `.pdf` hosting under `/qhse-cesi/` | v1.0 POLICY-03 still holds — link-only, French pedagogical-exception scope |

## Traceability

Coverage audit: 26/26 v2.0 requirements mapped. 0 unmapped. 0 duplicates.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SHELL-01 | Phase 1 | Pending |
| SHELL-02 | Phase 1 | Complete |
| SHELL-03 | Phase 1 | Complete |
| SHELL-04 | Phase 1 | Complete |
| SHELL-05 | Phase 1 | Complete |
| PERSIST-02 | Phase 1 | Complete |
| BANK-01 | Phase 2 | Pending |
| BANK-02 | Phase 2 | Pending |
| BANK-03 | Phase 2 | Pending |
| BANK-04 | Phase 2 | Pending |
| BANK-05 | Phase 2 | Pending |
| FLASH-01 | Phase 3 | Pending |
| FLASH-02 | Phase 3 | Pending |
| SRS-01 | Phase 3 | Pending |
| SRS-02 | Phase 3 | Pending |
| SRS-03 | Phase 3 | Pending |
| SRS-04 | Phase 3 | Pending |
| PERSIST-01 | Phase 3 | Pending |
| QUIZ-01 | Phase 4 | Pending |
| QUIZ-02 | Phase 4 | Pending |
| QUIZ-03 | Phase 4 | Pending |
| TEST-01 | Phase 4 | Pending |
| TEST-02 | Phase 4 | Pending |
| TEST-03 | Phase 4 | Pending |
| FICHE-01 | Phase 5 | Pending |
| FICHE-02 | Phase 5 | Pending |

**Coverage:**
- v2.0 requirements: 26 total
- Mapped to phases: 26 ✓
- Unmapped: 0 ✓
- Duplicates: 0 ✓

---
*Requirements defined: 2026-05-16 from V2-ETUDE-SPEC.md*
*Last updated: 2026-05-16 — traceability filled by roadmapper (26/26 mapped)*
