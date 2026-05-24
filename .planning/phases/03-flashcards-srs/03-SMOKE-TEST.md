# Phase 3 — Smoke Test Checklist

**Run:** 2026-05-25 (owner; pre-push)
**Live URL after push:** https://mes-apps-claude.vercel.app/qhse-cesi/outils.html#tab-flashcards

## Automated gates (must all PASS before manual walk-through)

- [x] `node .planning/phases/03-flashcards-srs/verify-srs.cjs` exits 0 — **PASS** (21 named assertions, exit 0)
- [x] `BANK.length === 226` (Phase 2 invariant) — **PASS**
- [x] All 15 locked theme slugs present in BANK (duerp, principes-generaux, iso-9001/14001/45001, tms, risque-routier, risque-chimique, rps, espaces-confines, acronymes, metiers, calendrier, icpe-seveso, rncp) — **PASS**
- [x] Phase 1 tablist IIFE intact (`tab.addEventListener('keydown', e =>` + `aria-selected` attrs in outils.html) — **PASS**
- [x] `chassis.css` contains BOTH `.biblio-card__title` (P1) AND `.fc-card` (P3) — **PASS**
- [x] Root `index.html` (QHSE Trainer, frozen sibling) unchanged by Phase 3 — **PASS** (empty diff over Phase 3 commits)

## ROADMAP Success Criteria — owner walk-through (in a real browser)

### SC1 — Recto → Reveal → Verso
- [ ] Open outils.html → Flashcards tab loads automatically (default tab from Phase 1)
- [ ] Bandeau shows two counters (dues/total · new/cap) in JetBrains Mono
- [ ] Theme `<select>` defaults to "Tous les thèmes" (or last-used theme from prefs)
- [ ] A recto question is visible in Fraunces, large size (~20-24px)
- [ ] Click "Révéler" — verso appears below with: canonical answer (sans, 17-18px, weight 600), explanation (sans, 16px, ink-2), source line with authority + ref (in `<code>`) + URL
- [ ] 4 grade buttons appear: `1 · Raté`, `2 · Dur`, `3 · Bien`, `4 · Facile`
- [ ] No console errors in DevTools

### SC2 — Grade buttons advance + persist
- [ ] Click "3 · Bien" — verso hides, next card's recto appears, focus moves to reveal button
- [ ] Open DevTools → Application → Local Storage → `qhse-srs-v1` — a new entry exists with keys `ease`, `interval`, `due`, `lapses`, `reps`, `introduced`
- [ ] The graded card's `introduced` field equals today's local date (yyyy-mm-dd format, your local timezone — NOT UTC)
- [ ] Keyboard: with verso visible, pressing `1`/`2`/`3`/`4` grades the card (no need to click)

### SC3 — "À réviser aujourd'hui" view (bandeau dues counter)
- [ ] After grading a card, bandeau `dues` decrements by 1
- [ ] Bandeau `nouvelles` increments by 1 IF the card was new (had no row before)
- [ ] Grade enough cards (or wait until tomorrow): bandeau `dues` reaches 0 → empty-queue panel appears with "Bravo — file vide pour aujourd'hui." + next-due date

### SC4 — Reload survives
- [ ] Switch theme to e.g. "DUERP" via the picker
- [ ] Set "Réglages" → newCardsPerDay to 5
- [ ] Reload the page (Ctrl-R)
- [ ] Theme picker is still on "DUERP" (restored from `qhse-prefs-v1.lastTheme`)
- [ ] Réglages input shows 5 (restored from `qhse-prefs-v1.newCardsPerDay`)
- [ ] Previously graded cards' SRS rows still in `qhse-srs-v1` (DevTools confirm)

### SC5 — Raté re-queues immediately (cross-phase SRS-03 schema check)
- [ ] Grade a card "1 · Raté"
- [ ] Check `qhse-srs-v1` in DevTools — the card's row has `lapses >= 1`, `interval === 1`, `due === addDays(today, 1)` (i.e. tomorrow's date)
- [ ] Card disappears from today's queue (bandeau decrements; if last card, empty panel appears)
- [ ] Card's `introduced` field set if this was the first time (cross-phase contract for Phase 4 wrong-QCM-feed)

## Regression — Phase 1 + Phase 2 + v1.0 invariants

- [ ] Click "Fiches de révision" tab — Phase 5 placeholder still visible
- [ ] Click "QCM" tab — Phase 4 placeholder still visible
- [ ] Click "Tests blancs" tab — Phase 4 placeholder still visible
- [ ] ArrowLeft / ArrowRight on the tab strip navigates correctly (roving tabindex per WAI-ARIA)
- [ ] Navigate back to Hub (`index.html`) — Accueil / Découverte / Biblio sections render identically to v1.0
- [ ] Navigate to root QHSE Trainer (`/index.html` in the root, NOT `/qhse-cesi/`) — frozen sibling unchanged
- [ ] Hub `#outils` gateway section still visible and links to `outils.html`

## Free-revision mode (D-06 structural guarantee)

- [ ] When dues queue is empty: click "Continuer en révision libre"
- [ ] Banner appears: "Révision libre — la progression SRS n'est pas modifiée."
- [ ] Card area shows random cards with ONLY "Carte suivante" and "Quitter la révision libre" buttons (no grade buttons)
- [ ] Click "Carte suivante" several times — `qhse-srs-v1` in DevTools is UNCHANGED (compare timestamp; key order unchanged)
- [ ] Click "Quitter la révision libre" — empty panel returns; mode flag cleared
- [ ] Reload — free-revision flag NOT persisted (always boots in normal mode)

## Mobile responsive check (Chromium DevTools device emulator)

- [ ] Toggle device mode → iPhone or Pixel preset
- [ ] Bandeau wraps to single line with réglages aligned right
- [ ] Theme picker label stacks above `<select>` (full width)
- [ ] Card is full width, padding `--space-md`
- [ ] Grade buttons stack vertically, each 44px min height
- [ ] Reveal-hint "Espace ou Entrée" is hidden on mobile
- [ ] Tap-on-card-body reveals verso (touch parity)

## A11y spot check

- [ ] Tab order through panel: theme select → réglages summary → reveal button → grade buttons (post-reveal)
- [ ] Each focusable element has a visible `:focus-visible` ring (chassis --focus-ring)
- [ ] Screen reader: visiting the panel announces "Cartes mémoire avec répétition espacée" (sr-only h2)
- [ ] Grade buttons have `aria-label="Noter cette carte : Raté (raccourci : 1)"` etc.
- [ ] Empty-queue date wrapped in `<time datetime="...">`

## Final ship

- [ ] All automated gates PASS — **6/6 PASS confirmed above**
- [ ] All ROADMAP SC1-5 manually verified
- [ ] All regression invariants confirmed
- [ ] Free-revision purity confirmed (qhse-srs-v1 unchanged after "Carte suivante" clicks)
- [ ] Commit + push to main (`🚀 Deploy: Phase 3 Flashcards + SM-2 SRS`)
- [ ] Wait ~60s for Vercel deploy
- [ ] Re-test the live URL https://mes-apps-claude.vercel.app/qhse-cesi/outils.html#tab-flashcards
- [ ] Update STATE.md (mark Phase 3 complete)
- [ ] Update REQUIREMENTS.md (mark FLASH-01, FLASH-02, SRS-01, SRS-02, SRS-04, PERSIST-01 complete; SRS-03 partial — schema half shipped)
- [ ] Update ROADMAP.md (tick Phase 3 checkbox)

## Notes / observations

(Owner records anomalies here; if anything fails, do NOT push — surface the issue and re-plan via /gsd-execute-plan for a hotfix.)

---

## Automated gate evidence (run 2026-05-25)

```
$ node .planning/phases/03-flashcards-srs/verify-srs.cjs
srs.js loaded OK — window.SRS keys: schedule, isDue, addDays, todayLocal, filterDue, countNew, DEFAULTS, GRADE
=== Phase 3 SRS verification gate — SC2/SC3/SC4/SC5 ===
[... 21 named PASS lines, exit 0 ...]
--final: ALL Phase 3 SRS gates PASS — window.SRS verified for SC2/SC3/SC4/SC5

PASS: BANK.length === 226 (Phase 2 invariant)
PASS: all 15 locked theme slugs present in BANK
PASS: Phase 1 tablist IIFE intact
PASS: chassis.css both biblio (P1) + fc (P3) namespaces present
PASS: root index.html (QHSE Trainer) untouched by Phase 3 (empty git diff)
```

Commits already on main (origin synced):
- `a01e5ee` — srs.js SM-2 scheduler (Plan 03-01)
- `19aa162` — Plan 03-01 SUMMARY + STATE
- `803c4b8` — verify-srs.cjs Node gate (Plan 03-02)
- `9cc1f2e` — chassis.css `.fc-*` namespace (Plan 03-03 task 1)
- `59d3751` — outils.html Flashcards view IIFE + script tag (Plan 03-03 task 2)
- `c881231` — Plan 03-03 SUMMARY + STATE + ROADMAP + REQUIREMENTS
