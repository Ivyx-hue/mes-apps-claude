---
phase: 05-fiches-de-r-vision
plan: 04
type: execute
wave: 4
status: complete
completed_tasks: 2
total_tasks: 2
owner_uat: approved-2026-05-30
task1_commit: 2c57ea8
subsystem: fiches
tags: [phase-5, fiches, content-authoring, rps, espaces-confines, acronymes, metiers]
dependency_graph:
  requires: [05-03]
  provides: [4-fiches-content-wave4]
  affects: [qhse-cesi/fiches-data.js]
tech_stack:
  added: []
  patterns: [append-only-content, INRS-authority, curl-url-verification, SPA-Batch-F-reuse, Legifrance-pre-verified]
key_files:
  modified:
    - qhse-cesi/fiches-data.js
decisions:
  - "rps: 3 INRS sources (ce-qu-il-faut-retenir + prevention + accidents-travail-MP) — ameli.fr burnout all 404'd"
  - "espaces-confines: 3 INRS sources (ce-qu-il-faut-retenir + procedure + prevenir-risques)"
  - "acronymes: INRS x2 + francecompetences.fr SPA (Batch F) — 17 definitions (>= 15 gate)"
  - "metiers: francecompetences.fr SPA + France Travail + INRS — France Travail curl-200"
  - "Légifrance L1152-1 + L1153-1: pre-verified by orchestrator WebFetch 2026-05-29 — used as <a href> in rps cadreLegal"
  - "R4222-23, R4225-1, L6313-1 refs: plain <code> text without hyperlinks — not curl-verifiable"
metrics:
  duration_min: ~60
  completed_date: 2026-05-29
  tasks_completed: 1
  files_modified: 1
---

# Phase 5 Plan 04 — Wave 4 Content: RPS, Espaces confinés, Acronymes, Métiers

## One-liner

Appended 4 fully-authored revision sheets (rps, espaces-confines, acronymes, metiers) to `fiches-data.js` — all URLs content-verified via curl 200 + title match + soft-404 grep (or accounted for under SPA Batch F / Légifrance pre-verified protocols), all selectedIds cross-referenced against BANK, all schema gates exit 0, Phase 3 + Phase 4 regression gates exit 0. Stopped at Task 2 (blocking human-verify UAT checkpoint).

## What shipped

| Task | File | Commit | Lines +/- |
|------|------|--------|-----------|
| Task 1 — 4 fiches | `qhse-cesi/fiches-data.js` | `2c57ea8` | +366 / −0 |

### Task 1 — 4 fiches (`2c57ea8`, fiches-data.js only)

4 fiche objects appended after `risque-chimique`. First 8 fiches from Plans 05-02 and 05-03 are byte-identical (append-only, 0 deletions confirmed by git diff --stat).

| Fiche | defs | selectedIds | pieges | sources |
|-------|------|-------------|--------|---------|
| rps | 8 | 8 | 6 | 3 |
| espaces-confines | 7 | 8 | 6 | 3 |
| acronymes | 17 | 8 | 6 | 3 |
| metiers | 7 | 8 | 6 | 3 |

`window.FICHES.length === 12` after load. All schema invariants pass.

## Accuracy anchors verified

| Anchor | Status |
|--------|--------|
| rps.pieges contains "L1152-1" (harcèlement moral) | PASS — present in piège 1 |
| rps.pieges contains "L1153-1" (harcèlement sexuel) | PASS — present in piège 1 |
| rps.definitions includes "Burnout PAS au tableau MP" | PASS — encoded in burnout definition (CRRMP hors-tableau) |
| rps.pieges encodes "Burnout PAS au tableau MP" | PASS — present in piège 2 |
| acronymes.definitions.length >= 15 | PASS — 17 definitions |
| CHSCT supprimé 2017 → CSE | PASS — encoded in acronymes definitions + pieges |
| metiers.sources has francecompetences.fr URL | PASS — sources[0] |

## URL verification table

All non-SPA, non-Légifrance URLs content-verified via `curl -sL` on 2026-05-29. Légifrance and SPA URLs handled per constraint categories (b) and (c).

| URL | Title fragment captured | HTTP | Authority | Fiche(s) | Category |
|-----|------------------------|------|-----------|----------|----------|
| https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html | "Risques psychosociaux (RPS). Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | rps | (a) curl-verified |
| https://www.inrs.fr/risques/psychosociaux/prevention.html | "Risques psychosociaux (RPS). Prévention - Risques - INRS" | 200 | INRS | rps | (a) curl-verified |
| https://www.inrs.fr/risques/psychosociaux/accidents-travail-maladies-professionnelles.html | "Risques psychosociaux (RPS). Accidents du travail et maladies professionnelles - Risques - INRS" | 200 | INRS | rps | (a) curl-verified |
| https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html | "Espaces confinés. Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | espaces-confines | (a) curl-verified |
| https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html | "Espaces confinés. Procédure de travail en espaces confinés - Risques - INRS" | 200 | INRS | espaces-confines | (a) curl-verified |
| https://www.inrs.fr/risques/espaces-confines/prevenir-risques.html | "Espaces confinés. Prévenir les risques - Risques - INRS" | 200 | INRS | espaces-confines | (a) curl-verified |
| https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html | verified in prior waves (Plan 05-02) | 200 | INRS | acronymes, metiers | (a) curl-verified (prior) |
| https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html | verified in prior waves (Plan 05-03) | 200 | INRS | acronymes | (a) curl-verified (prior) |
| https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee | verified in prior waves (Plan 05-02) | 200 | AIDA INERIS | acronymes | (a) curl-verified (prior) |
| https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html | "Le ROME et les fiches métiers \|France Travail" | 200 | France Travail | metiers | (a) curl-verified |
| https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900818 | L1152-1 harcèlement moral | pre-verified | Légifrance | rps cadreLegal | (b) orchestrator WebFetch 2026-05-29 |
| https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043893894 | L1153-1 harcèlement sexuel | pre-verified | Légifrance | rps cadreLegal | (b) orchestrator WebFetch 2026-05-29 |
| https://www.francecompetences.fr/recherche/rncp/41446/ | RNCP41446 Bachelor QHSE CESI | SPA | France compétences | acronymes, metiers | (c) SPA — verified Batch F 2026 (human-eyeball, per outils-data.js metiers/rncp); curl/WebFetch cannot render JS content |

Soft-404 grep (search for "404", "introuvable", "non trouvé") on all curl-verified pages: no matches on topic pages (6 new INRS pages + France Travail).

**URLs NOT committed (curl-blocked, 404, or out-of-scope):**
- ameli.fr burnout all URL patterns → HTTP 404 (multiple paths tried: `/assure/sante/themes/epuisement-professionnel-burnout/definition`, `/assure/sante/themes/epuisement-professionnel-burnout`, `/assure/sante/themes/burnout`, `/assure/sante/themes/epuisement-professionnel-burn-out`, `/entreprise/sante-travail/risques/epuisement-professionnel-burnout`) — replaced with INRS RPS AT/MP page (200, title-verified)
- INRS burnout dedicated pages → HTTP 404 (URL structure not found: `/risques/epuisement-professionnel-burnout/`, `/risques/burn-out/`)
- Légifrance R4222-23, R4225-1 → curl returns 403 (anti-bot) — rendered as plain `<code>Art. X</code>` text without hyperlink
- Code du travail Art. L6313-1 → curl returns 403 — rendered as plain `<code>Art. L6313-1</code>` text without hyperlink

## selectedIds cross-reference table

All 32 selectedIds (8 per fiche × 4 fiches) verified by Node gate: `window.BANK.find(b => b.id === id)` returned a matching item with `item.theme === fiche.slug` for every entry. Node gate result: `xrefOK: true`.

| Fiche | selectedIds |
|-------|-------------|
| rps | rps-flashcard-001, rps-flashcard-002, rps-flashcard-003, rps-flashcard-004, rps-qcm-001, rps-qcm-002, rps-qcm-004, rps-qcm-006 |
| espaces-confines | espaces-confines-flashcard-001, espaces-confines-flashcard-002, espaces-confines-flashcard-003, espaces-confines-flashcard-004, espaces-confines-flashcard-005, espaces-confines-qcm-001, espaces-confines-qcm-002, espaces-confines-qcm-003 |
| acronymes | acronymes-flashcard-001, acronymes-flashcard-006, acronymes-flashcard-008, acronymes-flashcard-009, acronymes-flashcard-010, acronymes-flashcard-013, acronymes-qcm-001, acronymes-qcm-004 |
| metiers | metiers-flashcard-001, metiers-flashcard-002, metiers-flashcard-003, metiers-flashcard-004, metiers-flashcard-006, metiers-qcm-001, metiers-qcm-002, metiers-qcm-003 |

Node gate: `xrefOK: true` — exit 0.

## Automated schema gate results

```
{ lenOK: true, slugsOK: true, schemaOK: true, xrefOK: true, acroOK: true, rpsOK: true, relOK: true, metiersSourceOK: true }
acronymes.definitions.length: 17
```

All 8 invariants verified:
- `lenOK`: `window.FICHES.length === 12` ✓
- `slugsOK`: exact order `['duerp','principes-generaux','iso-9001','iso-14001','iso-45001','tms','risque-routier','risque-chimique','rps','espaces-confines','acronymes','metiers']` ✓
- `schemaOK`: all 4 new fiches pass selectedIds[5-10], pieges[>=3], sources[>=3], tldr[>=30], all source URLs match `^https?://` ✓
- `xrefOK`: every selectedId resolves in BANK AND `item.theme === fiche.slug` ✓
- `acroOK`: `acronymes.definitions.length === 17` (>= 15 gate) ✓
- `rpsOK`: rps.pieges joined contains both "L1152-1" AND "L1153-1" ✓
- `relOK`: `target="_blank"` count ≡ `rel="noopener noreferrer"` count in cadreLegal+demarche for all 4 new fiches ✓
- `metiersSourceOK`: metiers.sources has francecompetences.fr URL ✓

## Regression check results

| Gate | Result |
|------|--------|
| `node .planning/phases/03-flashcards-srs/verify-srs.cjs` | **PASS** — exit 0 (21/21 named PASS lines) |
| `node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` | **PASS** — exit 0 (6/6 groups PASS) |

## Byte-identity of first 8 fiches

`git diff --stat HEAD -- qhse-cesi/fiches-data.js` (pre-commit check): `1 file changed, 366 insertions(+)` with 0 deletions. Prior 8 fiches (from Plans 05-02 and 05-03, commits `f344e7d` and `3e182f1`) are byte-identical.

## Deviations from Plan

**1. [Rule 3 - Blocking] ameli.fr burnout URLs all return HTTP 404**

- **Found during:** URL verification (Task 1)
- **Issue:** Plan editorial guidance referenced "ameli.fr burnout reconnaissance" as a source for the rps fiche. All candidate ameli.fr URL patterns for burnout returned HTTP 404 (URL structure changed since BANK items were authored 2026-05-20). Tested 5+ URL patterns.
- **Fix:** Used INRS RPS AT/MP page (`/accidents-travail-maladies-professionnelles.html`, HTTP 200, title "Risques psychosociaux (RPS). Accidents du travail et maladies professionnelles") as 3rd source — directly covers the burnout MP recognition topic. Burnout status (not in tableau MP; CRRMP hors-tableau) is correctly documented in the fiche content.
- **Files modified:** None in addition to planned fiches-data.js
- **Commit:** Incorporated into `2c57ea8` (never shipped broken URLs)

**2. [Rule 3 - Blocking] INRS burnout dedicated pages not found**

- **Found during:** URL verification (Task 1)
- **Issue:** INRS does not have a standalone dedicated burnout page at `/risques/epuisement-professionnel-burnout/` or `/risques/burn-out/` — both return HTTP 404. Burnout content is integrated within the RPS dossier.
- **Fix:** Burnout documented via INRS RPS dossier pages (already used for the fiche), which explicitly cover burnout/épuisement professionnel in context of RPS AT/MP.
- **Commit:** Incorporated into `2c57ea8`

## Owner UAT

**PENDING** — Task 2 is a blocking human-verify checkpoint. See checkpoint section below.

## Known Stubs

None. All 4 new fiches have full authored content (tldr, definitions, cadreLegal, demarche, pieges, sources). No placeholder text, no TODO markers.

## Threat Flags

None. T-05-04-01 (SPA URL rot) mitigated — francecompetences.fr SPA annotated as Batch F verified; UAT step 5 re-verifies live. T-05-04-02 (RPS L1152-1/L1153-1 accuracy) mitigated — rpsOK gate confirms both strings present. T-05-04-03 (safeSetHTML) mitigated — no renderer changes, whitelist unchanged. T-05-04-04 (selectedIds xref) mitigated — Node xrefOK gate exit 0.

## Self-Check: PASSED

- Task 1 commit `2c57ea8` exists on main: confirmed (`git log` shows `2c57ea8 feat(05-04): append 4 fiches...`).
- Commit touches only `qhse-cesi/fiches-data.js` (1 file, 366 insertions, 0 deletions).
- `window.FICHES.length === 12` after load: confirmed by Node gate.
- All source URLs in SUMMARY verification table match URLs in `sources[]` arrays in fiches-data.js.
- Phase 3 verify-srs.cjs: exit 0. Phase 4 verify-quiz.cjs: exit 0.
- `acronymes.definitions.length === 17` (gate: >= 15): confirmed by Node gate.
- `rps.pieges` contains both "L1152-1" AND "L1153-1": confirmed by Node gate.
- `metiers.sources` contains francecompetences.fr URL: confirmed by Node gate.
