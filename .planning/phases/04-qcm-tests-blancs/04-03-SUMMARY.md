---
phase: 04-qcm-tests-blancs
plan: 03
type: execute
wave: 3
status: complete
completed: 2026-05-27
files_modified:
  - qhse-cesi/outils.html
lines_added: 657
lines_removed: 2
requirements_addressed: [TEST-01, TEST-02, TEST-03]
commit: 271f258
deploy_url: https://mes-apps-claude.vercel.app/qhse-cesi/outils.html
---

# Phase 4 Plan 03 — outils.html: Tests blancs chronométrés

## One-liner

Shipped the Tests blancs chronométrés mode inside `#panel-tests` of `outils.html` — replaced the placeholder with a tri-state scaffold (Start / Running / Results + persistent History section) and appended a new IIFE after the Plan 02 QCM IIFE that wires the A→B→C state machine, a drift-resistant `Date.now()`-based timer, free-nav with answer map, native-`confirm()` abandon flow, banner-only timeout (D-13), `qhse-scores-v1` append-only FIFO with cap 50, and merge-safe `lastTestTheme` write that preserves all upstream prefs — closing TEST-01 + TEST-02 + TEST-03 with the D-V2-03 hard invariant (zero `SRS.schedule` calls in this IIFE) verified.

## What shipped

**Single file modified:** `qhse-cesi/outils.html` (1302 → 1957 lines; +657 insertions, −2 deletions).

**Two regions touched (atomic):**

| # | Region | Before | After |
|---|--------|--------|-------|
| 1 | `#panel-tests` block | Single `<p class="placeholder">` | Tri-state scaffold: `<section class="qz-start">` (theme picker + Démarrer + pool-too-small warning), `<section class="qz-running" hidden>` (timer + progress + card + 3-button controls row), `<section class="qz-results" hidden>` (4-tier hero + `<ol class="qz-corrections">` + Nouveau test), `<section class="qz-history-section">` (`<table class="qz-history">` + empty-state copy + sr-only announce) |
| 2 | After Plan 02 QCM `</script>`, before `</body>` | (nothing) | New `<script>` IIFE (banner at line 1379) — boot/guard, pre-flight BANK check with `todayLocal` fallback, merge-safe readPrefs/writePrefs/readScores/appendScore, Fisher-Yates question shuffle (choices[] never shuffled — D-08), `transitionTo` state machine, drift-resistant `startTimer/tickTimer/stopTimer`, `renderTestQuestion` (XSS-safe), `onTestChoiceClick` (toggle-on-second-click, NO SRS write), Précédent/Suivant/Abandonner/Restart wiring, `finishTest` (computes correctCount, builds row, calls `appendScore`, renders results + history), `renderResults` (4-tier prefix + 3-tier score-tier + 20 corrections), `renderHistory` (`<time datetime>` cells + empty-state toggle) |

## IIFE anatomy

| Element | Line | Notes |
|---------|------|-------|
| Banner comment | 1379 | `IIFE: Tests blancs chronométrés — tri-state, 20Q/20min, free-nav, score history` |
| Double-load guard | 1385-1386 | `if (window.__qzTestsBooted) return; window.__qzTestsBooted = true;` (unique name) |
| Module-top constants | 1388-1402 | `TEST_SIZE=20`, `DURATION_MS=20*60*1000`, `ALERT_THRESHOLD_MS=5*60*1000`, `TICK_MS=1000`, `STATE={START,RUNNING,RESULTS}`, `SCORES_KEY`, `PREFS_KEY`, full `DEFAULT_PREFS` |
| Pre-flight BANK + `todayLocal` fallback | ~1410-1438 | Renders inline `.qz-error` on missing BANK; SRS-missing path uses local `new Date().toLocaleDateString('sv-SE')` |
| `themeLabels` slug→label map | ~1485-1492 | Built from picker `<option>.textContent` once at boot; powers results + history `themeDisplayName(slug)` |
| Merge-safe `writePrefs` | ~1508-1519 | `Object.assign({}, existing, partial)` — preserves `lastTheme/lastMode/newCardsPerDay/lastQcmTheme` |
| `appendScore` (D-11 + D-12) | ~1543-1555 | `scores.unshift(row); scores.slice(0, 50)` — cap 50 FIFO, newest-first |
| Fisher-Yates `shuffle` | ~1561-1568 | Applied to pool of items only; `item.choices[]` never touched |
| `transitionTo(target)` | ~1583-1601 | Toggles `[hidden]` on the 3 screens + history section (hidden during B); auto-stops timer outside RUNNING; focus moves to themeSelect/restartBtn |
| `updatePoolWarning` | ~1606-1616 | Renders "Pool insuffisant…" copy + disables Démarrer when `pool.length < 20` |
| `startTimer/tickTimer/stopTimer` | ~1624-1657 | `Date.now() - startedAt` is the source of truth; setInterval is paint-only — survives mobile Safari/Chromium hidden-tab throttling (Pitfall 2); at 00:00 banner un-hides once, interval is NOT cleared (idempotent paint per D-13) |
| `renderTestQuestion(idx)` | ~1662-1700 | Empties + rebuilds 4 choice buttons; aria-pressed reflects `picks[idx]`; Prev disabled at idx 0; Suivant label morphs to `Terminer le test` at last index |
| `onTestChoiceClick` (NO SRS write) | ~1705-1714 | Toggle-on-same/replace-on-different; explicit comment `D-V2-03: zero SRS.schedule calls in this IIFE` |
| `onAbandonClick` | ~1729-1734 | Sole `window.confirm(` call site in the file — exact French copy: `Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues.` |
| `finishTest` | ~1839-1862 | Computes `correctCount`, builds row `{id:'test-'+Date.now(), dateISO:todayLocal(), theme, score, total:20}`, `appendScore` → returns capped array, `renderResults` + `renderHistory(capped)`, sr-only announce, `transitionTo(STATE.RESULTS)` |
| `renderResults` (4-tier prefix + 3-tier score) | ~1797-1820 | `Sans faute / Bravo / À retravailler / Beaucoup à revoir` thresholds; `data-qz-score-tier` ∈ `high|mid|low` |
| `renderHistory` with `<time datetime>` | ~1825-1856 | One `<tr>` per row; empty-state toggle between `<table>` and `[data-qz-history-empty]` |
| Event wiring | ~1868-1875 | 7 panel-scoped listeners; zero document-level keydown |

## Automated grep gates — ALL PASS

| Gate | Expected | Actual |
|------|----------|--------|
| `window.__qzTestsBooted` occurrences | 2 | **2** ✓ |
| `document.readyState === 'loading'` total | ≥ 3 (Flashcards + QCM + Tests) | **3** ✓ |
| **`SRS.schedule(` total file-wide** | **2 exactly (Flashcards line 622 + QCM line 1281); ZERO in Tests block (banner at 1379)** | **2** ✓ **D-V2-03 PROVEN** |
| `SRS.todayLocal()` references | ≥ 1 | **6** ✓ |
| `Date.now()` references | ≥ 1 (timer source-of-truth) | **4** ✓ |
| `setInterval(` references | ≥ 1 (paint loop) | **1** ✓ |
| `qhse-scores-v1` references | ≥ 1 | **2** ✓ |
| `scores.unshift` ∪ `.slice(0, 50)` | ≥ 1 | **2** ✓ |
| `lastTestTheme` references | ≥ 2 (decl + write) | **4** ✓ |
| `beforeunload` references | 0 (D-14) | **0** ✓ |
| `document.addEventListener('keydown'` real listeners | 0 | **0** ✓ (only match is a comment) |
| `window.confirm(` call sites | 1 (abandon only) | **1** ✓ |
| `.innerHTML =` assignments | 0 | **0** ✓ |
| `createElement('time')` (history dates) | ≥ 1 | **1** ✓ |
| Tests panel placeholder removed | 0 | **0** ✓ |
| Tri-state + history landmark attrs | 4 distinct | **10** ✓ (each present + history-section appears multiple times for hidden toggles) |

## Regression verification

- **Phase 3 verify-srs.cjs:** `node .planning/phases/03-flashcards-srs/verify-srs.cjs` → exit 0, **20/20 PASS** (all SC2/SC3/SC4/SC5 + PERSIST-01 gates). `window.SRS` frozen contract intact.
- **No structural collateral:** edits scoped to `#panel-tests` block and the new `<script>` appended at end-of-body. `#panel-fiches`, `#panel-flashcards`, `#panel-qcm`, the tablist, the Phase 3 Flashcards IIFE, the Plan 02 QCM IIFE, and the ARIA tablist IIFE are all byte-identical.
- **D-V2-03 hard invariant:** structurally proven — `grep -n "SRS.schedule("` returns exactly two line numbers, both BEFORE the Tests IIFE banner at line 1379. `qhse-srs-v1` is mechanically unreachable from the Tests path; Plan 04-04 verify-quiz.cjs group (e) will codify.
- **Prefs merge safety:** the Tests IIFE's `writePrefs` uses the same `Object.assign({}, existing, partial)` pattern proven in Plan 02; `lastTestTheme` writes preserve `lastTheme / lastMode / newCardsPerDay / lastQcmTheme`.

## Manual smoke test (deferred to owner / live deploy)

`https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` → onglet Tests blancs :

1. STATE A → écran Démarrer + tableau Historique (vide initialement).
2. Switch thèmes : ceux ayant < 20 QCM affichent le bandeau "Pool insuffisant…" + bouton Démarrer disabled.
3. Choisir "Tous les thèmes" (ou un thème ≥ 20) → Démarrer activé → click → STATE B, timer décrémente depuis 20:00, Q1/20 affiché, 4 choix.
4. Click choix A → bordure accent (`data-qz-choice-state="selected"`). Re-click A → désélectionné (toggle).
5. Suivant → Q2 ; Précédent → Q1 ; vérifier que la sélection est conservée (`picks[]`).
6. À Q20 → label Suivant devient "Terminer le test".
7. Click Terminer → STATE C : hero "Sans faute / Bravo / À retravailler / Beaucoup à revoir" + score N/20 coloré, liste de 20 corrections avec pills picked/correct/distractor + source + explanation, ligne ajoutée dans Historique en tête.
8. **Test D-V2-03 :** DevTools → Application → Local Storage → snapshot `qhse-srs-v1` AVANT lancement de test, complète un test, snapshot APRÈS → **doivent être byte-identiques**.
9. Reload → STATE A, thème persisté, historique persisté.
10. Lancer un test, click Abandonner → confirm() en français → OK → STATE A, AUCUNE ligne ajoutée à `qhse-scores-v1`.
11. Lancer un test, F5 / fermer l'onglet en cours → aucune popup beforeunload, retour propre.
12. Laisser tomber le timer à 00:00 → bandeau "Temps écoulé — tu peux continuer." apparaît, timer rouge, test continue, bouton Terminer fonctionne.
13. Vérifier `qhse-prefs-v1` après changement de thème Tests : `lastTestTheme` à jour + `lastQcmTheme` + `lastTheme/lastMode/newCardsPerDay` préservés.
14. Switch onglet Flashcards / QCM → Phase 3 + Plan 02 fonctionnent toujours.

## Commit + deploy

- **Commit SHA:** `271f258`
- **Commit message:** `🚀 Phase 4 Plan 03 — outils.html: Tests blancs chronométrés (TEST-01/02/03 + qhse-scores-v1)`
- **Push:** `main` → `faa5851..271f258` (2026-05-27 ~10:35 CET)
- **Deploy:** Vercel auto-deploy live ~60s after push at `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`

## Deviations from plan

None significant. Three implementation choices worth noting:

1. **Source line builder duplicated in Tests IIFE** rather than refactored to a shared helper. CONTEXT.md Claude's Discretion §"Module layout" explicitly allows each IIFE to own its own copy of small helpers; this keeps the Tests IIFE self-contained and avoids cross-IIFE coupling.
2. **`DEFAULT_PREFS` extended with all known keys** (`lastTheme`, `lastMode`, `newCardsPerDay`, `lastQcmTheme`, `lastTestTheme`) — gives the merge a complete schema so an empty `qhse-prefs-v1` boots with all Phase 3 + Plan 02 defaults intact, even if the Tests IIFE runs before the others have ever written. Belt-and-braces; the `Object.assign({}, existing, partial)` pattern already protects via merge, but stating the full default schema makes the contract explicit.
3. **Per-question correction `<h4>` prefixed with `Q<n>. `** for readability in the corrections list. UI-SPEC didn't mandate this but it's an obvious accessibility/scanability win for a 20-item list.

## Known stubs / deferred

- **Manual smoke test** — see §Manual smoke test above.
- **`verify-quiz.cjs` gate (Plan 04-04)** — will mechanically codify all six assertion groups:
  - (a) single `SRS.schedule` call site per IIFE (Flashcards line 622, QCM line 1281), ZERO in Tests block
  - (b) merge-safe writePrefs preserves all upstream keys
  - (c) `qhse-scores-v1` cap 50 FIFO + newest-first
  - (d) `lastTestTheme` round-trip
  - (e) Tests IIFE never imports/calls `window.SRS.schedule`
  - (f) zero `.innerHTML =` writes on bank content

## Threat flags

None new. Plan threat model items T-04-03-01..11 + T-04-03-SC all mitigated or accepted as written. Highlights:

- T-04-03-01 (XSS) — `mitigate`: source line via `createElement` + `textContent`; grep `.innerHTML =` = 0.
- T-04-03-02 (qhse-srs-v1 D-V2-03 invariant) — `mitigate`: `SRS.schedule(` count file-wide = 2; both call sites are upstream of Tests IIFE banner (line 1379). Plan 04-04 will codify.
- T-04-03-03 (qhse-prefs-v1 P3/P2 key clobber) — `mitigate`: `Object.assign({}, existing, partial)` merge present.
- T-04-03-04 (qhse-scores-v1 unbounded) — `mitigate`: `scores.slice(0, 50)` cap on every append.
- T-04-03-05 (timer drift) — `mitigate`: `Date.now()` delta is source-of-truth; setInterval is paint-only.
- T-04-03-09 (F5 / tab close mid-test) — `mitigate`: D-14 + D-16 architecturally accept; no `beforeunload`, nothing persisted about in-progress test.
- T-04-03-07..08, T-04-03-10..11, T-04-03-SC — `accept` as documented.

## Self-check: PASSED

- File `qhse-cesi/outils.html` modified (1957 lines, +657 / −2).
- `#panel-tests` placeholder removed; tri-state scaffold + history section present.
- New IIFE present (`__qzTestsBooted` guard, DCL boot, full state machine).
- ZERO `SRS.schedule(` calls in Tests block (file-wide count = 2, both upstream of line 1379).
- ZERO `beforeunload`, ZERO real `document.addEventListener('keydown')`, ZERO `.innerHTML =` on bank content.
- ONE `window.confirm(` (abandon flow) with exact French copy.
- Phase 3 verify-srs.cjs still exits 0 (20/20 PASS).
- Committed as `271f258` and pushed to `main`; Vercel deploy in flight.
