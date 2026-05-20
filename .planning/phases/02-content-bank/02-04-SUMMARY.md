---
phase: 02-content-bank
plan: 04
subsystem: content
tags: [outils-data, BANK, risque-chimique, espaces-confines, INRS, ameli, CLP, SGH, VLEP, CMR, FDS, content-bank]

# Dependency graph
requires:
  - phase: 02-content-bank/02-03
    provides: "122-item BANK (Batches A+B+C: duerp/principes-generaux/iso-45001/iso-9001/iso-14001/tms/risque-routier/rps)"
provides:
  - "30 items appended: risque-chimique (18) + espaces-confines (12)"
  - "BANK.length = 152; verify-bank.cjs ALL ASSERTIONS PASSED"
  - "All Batch D source URLs content-verified against INRS/ameli pédagogique pages"
affects:
  - "02-05 (Batch E: icpe-seveso/calendrier/acronymes append point)"
  - "02-07 (final integration gate asserts BANK >= 200)"
  - "Phase 3 (Flashcards/SRS consumes window.BANK)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CLP/SGH facts: règlement (CE) 1272/2008, remplacement DSD/DPD le 1er juin 2015"
    - "VLEP split: VME (8h, long terme) vs VLE (15 min, courte durée) — piège d'examen reproduced in QCM"
    - "Espaces confinés O2 seuils: < 19,5% appauvri, > 23,5% suroxygéné — QCM avec distractor 21%"
    - "D-11 editorial: QCM distractors reproduce real-domain confusions (VME/VLE, 1er juin 2015 vs 2008, < 19,5% vs < 21%)"

key-files:
  created: []
  modified:
    - "qhse-cesi/outils-data.js — 30 items appended (risque-chimique + espaces-confines); trailer updated to 152"

key-decisions:
  - "All 6 Batch D source URLs content-verified with curl: HTTP 200 + title match + no soft-404 — no gaps"
  - "CLP date: 1er juin 2015 (application complète mélanges) used as exam anchor — not 2008 (publication) nor 2010 (substances)"
  - "VME vs VLE: systematically reproduced as primary QCM trap; VME=8h, VLE=15min explicitly in items"
  - "O2 seuil: 19,5% used (not 21% or 17%) — reproduced as QCM distractor per D-12"
  - "CMR substitution: obligation prioritaire per Art. R4412-66 CT — included in flashcard + QCM"
  - "FDS: 16 rubriques per règlement REACH (CE) 1907/2006 Annexe II — distinct from CLP (piège réglementaire)"
  - "Surveillant extérieur: règle de non-pénétration absolue — made the core of espaces-confines-qcm-003"

requirements-completed: [BANK-01, BANK-02, BANK-03, BANK-04, BANK-05]

# Metrics
duration: 8min
completed: 2026-05-20
---

# Phase 2 Plan 04: Content Bank Batch D Summary

**Batch D appended: 30 source-verified INRS/ameli items (risque-chimique 18 + espaces-confines 12), BANK.length = 152, CLP/SGH/VLEP/CMR/FDS/O2-threshold facts cross-checked against RESEARCH accuracy anchors**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-20T00:05:57Z
- **Completed:** 2026-05-20T00:13:30Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Appended 30 schema-compliant items to `window.BANK` (risque-chimique: 18, espaces-confines: 12)
- All 6 distinct source URLs content-verified with curl: HTTP 200 + matching title + no soft-404
- Exam-critical accuracy anchors cross-checked and embedded: CLP (CE) 1272/2008 / 1er juin 2015 / VME 8h vs VLE 15 min / CMR R4412-66 substitution / FDS 16 rubriques REACH / O2 < 19,5% seuil / permis d'entrer obligatoire / surveillant non-pénétration
- `verify-bank.cjs` exits 0 with all 10 theme assertions passing; BANK.length = 152
- Pushed to main: `37eae57`

## Task Commits

1. **Task 1: Author Batch D (risque-chimique/espaces-confines, 30 items) + content-verify all source URLs** — `37eae57` (feat)

**Plan metadata:** (this commit — docs)

## Files Created/Modified

- `qhse-cesi/outils-data.js` — 30 items appended after line 2384; `// Total items: 152` trailer updated

## Content-Verified Source URLs (Batch D)

| URL | Title (curl) | Size | Status |
|-----|-------------|------|--------|
| `https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html` | Risques chimiques. Ce qu'il faut retenir - Risques - INRS | 79 KB | PASS |
| `https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html` | Classification et étiquetage des produits chimiques. Ce qu'il faut retenir - Risques - INRS | 51 KB | PASS |
| `https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html` | Mesure des expositions aux agents chimiques et biologiques. Ce qu'il faut retenir - Risques - INRS | 54 KB | PASS |
| `https://www.ameli.fr/entreprise/sante-travail/risques/risques-chimiques-entreprise/definition` | Tout savoir sur les risques chimiques \| ameli.fr \| Entreprise | 82 KB | PASS |
| `https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html` | Espaces confinés. Ce qu'il faut retenir - Risques - INRS | 66 KB | PASS |
| `https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html` | Espaces confinés. Procédure de travail en espaces confinés - Risques - INRS | 53 KB | PASS |

**D-09 surfaced gaps:** None. All 6 URLs passed content verification. No items dropped.

## Exam-Critical Accuracy Cross-Check (D-10/D-11/T-02-10/T-02-11)

| Fact | Value used | RESEARCH anchor | Match |
|------|-----------|-----------------|-------|
| Risque chimique rang MP | 2e cause après TMS | RESEARCH §risque-chimique anchors | Yes |
| CMR signification | Cancérogène, Mutagène, toxique pour la Reproduction | RESEARCH §risque-chimique | Yes |
| Règlement CLP référence | (CE) 1272/2008 | RESEARCH §risque-chimique | Yes |
| Remplacement DSD/DPD par CLP | 1er juin 2015 | RESEARCH §State of the Art | Yes |
| VME durée | 8 heures | RESEARCH §risque-chimique | Yes |
| VLE durée | 15 minutes | RESEARCH §risque-chimique | Yes |
| FDS rubriques | 16 (Règlement REACH annexe II) | RESEARCH §risque-chimique | Yes |
| SGH définition | Système Général Harmonisé (ONU) | RESEARCH §risque-chimique | Yes |
| Hiérarchie protection | Substitution → EPC → EPI | RESEARCH §risque-chimique | Yes |
| CMR obligation prioritaire | Substitution (R4412-66 CT) | RESEARCH §risque-chimique | Yes |
| O2 seuil appauvrissement | < 19,5 % | RESEARCH §espaces-confines | Yes |
| O2 seuil suroxygénation | > 23,5 % | RESEARCH §espaces-confines | Yes |
| 3 risques atmosphériques | O2 appauvri / toxique / ATEX (LIE-LSE) | RESEARCH §espaces-confines | Yes |
| Permis d'entrer | Obligatoire avant toute pénétration | RESEARCH §espaces-confines | Yes |
| Surveillant extérieur | Présence permanente, non-pénétration absolue | RESEARCH §espaces-confines | Yes |

## Per-Theme Item Distribution

| Theme | Flashcards | QCM | Total |
|-------|-----------|-----|-------|
| risque-chimique | 10 | 8 | 18 |
| espaces-confines | 7 | 5 | 12 |
| **Batch D total** | **17** | **13** | **30** |

Matches RESEARCH §Volume Distribution targets exactly.

## Running BANK Totals

| After plan | BANK.length | Themes covered |
|-----------|-------------|----------------|
| 02-01 (Batch A) | 36 | duerp, principes-generaux |
| 02-02 (Batch B) | 82 | + iso-45001, iso-9001, iso-14001 |
| 02-03 (Batch C) | 122 | + tms, risque-routier, rps |
| **02-04 (Batch D)** | **152** | **+ risque-chimique, espaces-confines** |

## Decisions Made

- Used the INRS classification-étiquetage page as primary `source.url` for CLP/SGH/pictogrammes items and the chimiques/ce-qu-il-faut-retenir page for general risk + CMR/FDS/hierarchy items — content-topic match respected (D-05)
- Used the mesure-expositions page as primary `source.url` for VLEP/VME/VLE items
- Used the procedure-travail page as primary `source.url` for permis d'entrer + surveillance items
- QCM distractors reproduce documented real-domain traps: VME/VLE swap, 1er juin 2015 vs 2008 confusion, O2 < 19,5% vs < 21% vs 17%, non-pénétration rule for surveillant, CLP vs REACH for FDS

## Deviations from Plan

**1. [Rule 1 - Bug] Apostrophes in single-quoted JS strings**
- **Found during:** Task 1 (node syntax check after edit)
- **Issue:** `ref: 'INRS — permis d'entrer espaces confinés'` — the apostrophe in "d'entrer" broke the single-quoted JS string literal. Occurred at 2 locations (lines 2790 and 2884).
- **Fix:** Changed affected `ref` fields from single-quoted to double-quoted strings at those two lines.
- **Files modified:** `qhse-cesi/outils-data.js`
- **Verification:** `verify-bank.cjs` exited 0 after fix; BANK.length = 152
- **Committed in:** `37eae57` (same atomic task commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — syntax bug from apostrophe in single-quoted string)
**Impact on plan:** Fixed inline before commit. No functional scope change.

## Issues Encountered

- JS syntax error (unescaped apostrophe in single-quoted string) caught by node on first run; fixed in two targeted edits before committing. No items dropped, no content changed.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- BANK.length = 152; 5 themes remaining (icpe-seveso, calendrier, acronymes, metiers, rncp)
- Batch E (02-05) is ready to execute: `icpe-seveso` + `calendrier` + `acronymes` (43 items)
- No blockers

## Known Stubs

None — all 30 items carry complete, non-placeholder content. No stubs.

## Threat Flags

None — Batch D uses only content-verified INRS/ameli pédagogique pages. No new network endpoints, no auth paths, no schema changes. No Légifrance URLs in `source.url` (D-07 compliant: all Légifrance deep-links confined to `explanation` prose).

---
*Phase: 02-content-bank*
*Completed: 2026-05-20*
