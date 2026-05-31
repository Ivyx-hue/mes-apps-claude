---
phase: 04-qcm-tests-blancs
type: uat-report
date: 2026-05-31
tester: Claude Code + Playwright MCP (live Vercel)
deploy: https://mes-apps-claude.vercel.app/qhse-cesi/outils.html
verdict: PASS (21/21)
---

# Phase 4 UAT Report — QCM + Tests blancs

Automated browser UAT executed via Playwright MCP against the live Vercel deploy.
All 21 acceptance criteria from `04-01-PLAN` / `04-02-PLAN` / `04-03-PLAN` / `04-04-PLAN` exercised.

## Verdict: PASS — 21/21

| ID | Test | Verdict | Evidence |
|----|------|---------|----------|
| A1 | QCM tab loads — picker + first question + 4 choices | PASS | 16 theme options, BANK 226 (92 QCM), SRS API present, question + 4 letter-prefixed buttons rendered |
| A2 | QCM auto-reveal on click (badge + answer + explanation + source) | PASS | Reveal un-hidden, badge `✗ Incorrect`+state="incorrect", answer "40 ans.", explanation, source w/ `<code>`+`<a target=_blank rel="noopener noreferrer">`, Next focused |
| A3 | Wrong QCM writes to qhse-srs-v1 | PASS | `duerp-qcm-001`: ease=2.3, interval=1, lapses=1, due=2026-06-01, introduced=2026-05-31 — matches `SRS.schedule(null,'rate','2026-05-31')` |
| A4 | Correct QCM does NOT write to qhse-srs-v1 | PASS | After picking correct on `duerp-qcm-002`, SRS keys still only `[duerp-qcm-001]` |
| A5 | Suivant advances + double-penalty guard | PASS | Click + Space-key advance verified; post-reveal `pointer-events:none` + `srsWrittenThisSession` Set + verify-quiz.cjs group(a) PASS prove guard |
| A6 | Theme change preserves Phase 3+5 prefs (merge-safe) | PASS | After theme="tms": lastQcmTheme added, lastTheme/lastMode/newCardsPerDay/lastFicheTheme all preserved byte-equal |
| A7 | Reload restores lastQcmTheme | PASS | After reload picker.value="tms", first question is a TMS item (`tms-qcm-001`) |
| B1 | Tests tab shows Start screen + history | PASS | Démarrer button enabled, 16-option theme picker, history section visible ("Aucun test terminé…") |
| B2 | Démarrer → STATE B with timer counting | PASS | Timer decremented 19:47 → 19:36 over ~13s, progress 1/20, prev disabled, Q1 rendered |
| B3 | Choice toggle select/deselect | PASS | First click → state="selected", aria-pressed=true; second click → state="idle", aria-pressed=false |
| B4 | Nav preserves picks (Suivant/Précédent) | PASS | Pick A on Q1, Suivant → 2/20 (different Q), Précédent → 1/20 (same Q text), A still state="selected" |
| B5 | Q20 Suivant label = "Terminer le test" | PASS | After 19 Suivants progress=20/20, next button text="Terminer le test" |
| B6 | Terminer → STATE C (score + 20 corrections + history row) | PASS | Score 0/20 tier="low", 20 `<li>` corrections, history table row [2026-05-31, "Tous les thèmes", "0/20"], qhse-scores-v1 length=1 with id/dateISO/theme/score/total |
| B7 | D-V2-03 — qhse-srs-v1 unchanged by Tests run | PASS | `srsBefore === srsAfter` byte-equal (only duerp-qcm-001 from QCM mode persists) |
| B8 | Abandonner triggers confirm dialog | PASS | French message "Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues." — Cancel keeps test running (timer 19:18), Accept returns to STATE A with `historyDelta=0` |
| B9 | Reload mid-test → STATE A (no auto-save) | PASS | After `location.reload()`: qz-start visible (display=flex, h=359), qz-running hidden (display=none), qz-results hidden, qz-history visible, timer="20:00" (fresh). Note: `browser_navigate` to same URL preserved state via bfcache — true F5 reload behaves correctly per D-14/D-16 |
| B10 | qhse-scores-v1 FIFO cap 50 | PASS | Seeded 51 fake scores, ran full Test cycle → length=50, new test at index 0, oldest tail entries trimmed |
| C1 | Console clean | PASS | Single non-app error: `favicon.ico 404` (cosmetic deployment hygiene); zero `[QCM]`/`[TEST]`/`[FC]`/`[FI]` errors across all flows |
| C2 | Phase 3 Flashcards regression-free | PASS | Question "Qu'est-ce que le Papripact…" rendered, Révéler → verso visible with answer, 4 grade buttons (Raté/Dur/Bien/Facile), 16 theme options, SRS+prefs intact |
| C3 | Phase 5 Fiches regression-free | PASS | Fiches panel renders DUERP fiche (matches `lastFicheTheme="duerp"`), 15-option theme picker |
| C4 | Empty/insufficient pool defensive | PASS | Switching theme to "duerp" (8 QCM) disables Démarrer + shows inline French message: "Pool insuffisant pour ce thème (8 QCM disponibles, 20 requis). Choisis 'Tous les thèmes' ou un autre thème." |

## Notes & Findings

1. **Pool reality**: All 15 single themes have <20 QCM (max=8). Tests blancs only operates against "Tous les thèmes" (92 QCM). The defensive disable (B-C4) is therefore exercised for **every** theme switch in production. The copy is calm, French, and informative — no crash, no console error.

2. **bfcache caveat (B9)**: Same-URL `browser_navigate()` via Playwright triggered a back-forward cache restore that preserved the prior IIFE state — initial appearance of "test resumes after reload". A true `location.reload()` correctly returns to STATE A. End-user F5 / Ctrl+R is equivalent to `location.reload()`, so D-14/D-16 is respected in real usage.

3. **D-V2-03 invariant** (Tests blancs never mutates `qhse-srs-v1`) re-verified empirically (B7) AND by verify-quiz.cjs group (e) earlier — double-witnessed.

4. **FIFO cap arithmetic** (B10): seeded 51 → after Terminer added 1 → trimmed to 50. The implementation prepends new at index 0 and slices the tail.

5. **Console**: only error during entire session was a single `GET /favicon.ico → 404` at root. No app-level errors, no schema validation warnings, no `[QCM]`/`[TEST]` logs.

## Phase 4 — milestone close gate

All Phase 4 owner-UAT criteria met. The only remaining blocker before milestone v2.0 "Étude" close is removed. Recommend running `/gsd-complete-milestone` (or `/gsd-audit-milestone` first if preferred).
