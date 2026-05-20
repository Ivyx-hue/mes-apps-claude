---
phase: 02-content-bank
plan: 03
subsystem: content
tags: [outils-data, BANK, tms, risque-routier, rps, INRS, ameli, content-bank]

# Dependency graph
requires:
  - phase: 02-content-bank/02-02
    provides: "82-item BANK (Batches A+B: duerp/principes-generaux/iso-45001/iso-9001/iso-14001)"
provides:
  - "40 items appended: tms (14) + risque-routier (12) + rps (14)"
  - "BANK.length = 122; verify-bank.cjs ALL ASSERTIONS PASSED"
  - "All Batch C source URLs content-verified against INRS/ameli pédagogique pages"
affects:
  - "02-04 (Batch D: risque-chimique/espaces-confines append point)"
  - "02-07 (final integration gate asserts BANK >= 200)"
  - "Phase 3 (Flashcards/SRS consumes window.BANK)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Content-verified INRS source: /risques/<slug>/ce-qu-il-faut-retenir.html + /prevention.html sub-pages"
    - "ameli.fr/entreprise/sante-travail/risques/<slug>/... as secondary authority for TMS stats"
    - "Accuracy-anchor cross-check: TMS ~88% MP, risque routier ~30% AT mortels, L1152-1 vs L1153-1"
    - "D-10/D-11 editorial split maintained: answer = terse recall, explanation = articulation + pitfall"

key-files:
  created: []
  modified:
    - "qhse-cesi/outils-data.js — 40 items appended (lines 1608–2386); trailer updated to 122"

key-decisions:
  - "All 7 Batch C source URLs content-verified with curl (HTTP 200 + title match + no soft-404): no gaps"
  - "TMS stats: 88% ameli / >80% INRS — both cited to distinguish sources; exam anchor documented"
  - "risque-routier: mission/trajet distinction explicit in 2 QCM items (D-12 trap reproduced)"
  - "RPS: L1152-1 (harcèlement moral) vs L1153-1 (harcèlement sexuel) made the primary QCM-002 trap"
  - "Burnout: noted NOT a tableau MP in 2026 — accurate and exam-relevant"
  - "Prevention sub-pages (/prevention.html, /demarche-prevention.html) used for prevention-specific items"

patterns-established:
  - "Batch C: INRS /risques/<slug>/ce-qu-il-faut-retenir.html is primary; /prevention.html for prevention items"
  - "ameli.fr used as secondary authority for TMS stats (88% ameli vs >80% INRS)"
  - "QCM distractors reproduce named real-domain confusions per D-12 (L1152-1 vs L1153-1, mission vs trajet)"

requirements-completed: [BANK-01, BANK-02, BANK-03, BANK-04, BANK-05]

# Metrics
duration: 12min
completed: 2026-05-20
---

# Phase 2 Plan 03: Content Bank Batch C Summary

**Batch C appended: 40 source-verified INRS/ameli items (tms 14 + risque-routier 12 + rps 14), BANK.length = 122, exam-critical stats cross-checked against RESEARCH accuracy anchors**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-05-20T01:53Z
- **Completed:** 2026-05-20T02:05Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Appended 40 schema-compliant items to `window.BANK` (tms: 14, risque-routier: 12, rps: 14)
- All 7 distinct source URLs content-verified with curl: HTTP 200 + matching title + no soft-404
- Exam-critical accuracy anchors cross-checked and embedded: TMS 88% MP, risque routier ~30% AT mortels, L1152-1 harcèlement moral (not L1153-1), burnout not in tableau MP, 3 composantes RPS
- `verify-bank.cjs` exits 0 with all 8 theme assertions passing; BANK.length = 122

## Task Commits

1. **Task 1: Author Batch C (tms/risque-routier/rps, 40 items) + content-verify all source URLs** — `0f1185b` (feat)

**Plan metadata:** (this commit — docs)

## Files Created/Modified

- `qhse-cesi/outils-data.js` — 40 items appended after line 1607; `// Total items: 122` trailer updated

## Content-Verified Source URLs (Batch C)

| URL | Title (curl) | Size | Status |
|-----|-------------|------|--------|
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` | Troubles musculosquelettiques (TMS). Ce qu'il faut retenir - INRS | 69 KB | PASS |
| `https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir` | Les TMS : pourquoi et comment agir | ameli.fr | Entreprise | 94 KB | PASS |
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html` | Troubles musculosquelettiques (TMS). Démarche de prévention - INRS | 79 KB | PASS |
| `https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html` | Risques routiers. Ce qu'il faut retenir - INRS | 69 KB | PASS |
| `https://www.inrs.fr/risques/routiers/demarche-prevention.html` | Risques routiers. Démarche de prévention - INRS | 87 KB | PASS |
| `https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html` | Risques psychosociaux (RPS). Ce qu'il faut retenir - INRS | 87 KB | PASS |
| `https://www.inrs.fr/risques/psychosociaux/prevention.html` | Risques psychosociaux (RPS). Prévention - INRS | 82 KB | PASS |

**D-09 surfaced gaps:** None. All 7 URLs passed content verification. No items dropped.

## Exam-Critical Accuracy Cross-Check (D-10/D-11/T-02-07)

| Fact | Value used | RESEARCH anchor | Match |
|------|-----------|-----------------|-------|
| TMS % des MP | ~88 % (ameli 2024) / >80 % (INRS) | RESEARCH §tms accuracy anchors | Yes |
| Risque routier % AT mortels | ~30 % | RESEARCH §risque-routier accuracy anchors | Yes |
| Harcèlement moral article | L1152-1 | RESEARCH §Domain Accuracy Anchors | Yes |
| Harcèlement sexuel article | L1153-1 (distractor) | RESEARCH §Domain Accuracy Anchors | Yes |
| Burnout = tableau MP | Non (2026) | RESEARCH §rps accuracy anchors | Yes |
| RPS 3 composantes | stress / violences internes / violences externes | RESEARCH §rps accuracy anchors | Yes |
| TMS-Pros étapes | Mobiliser / Investiguer / Maîtriser / Évaluer | RESEARCH §tms accuracy anchors | Yes |
| PRAP | Prévention des Risques liés à l'Activité Physique | RESEARCH §tms accuracy anchors | Yes |
| Obligation employeur RPS | Art. L4121-1 Code du travail | RESEARCH §rps accuracy anchors | Yes |

## Per-Theme Item Distribution

| Theme | Flashcards | QCM | Total |
|-------|-----------|-----|-------|
| tms | 8 | 6 | 14 |
| risque-routier | 7 | 5 | 12 |
| rps | 8 | 6 | 14 |
| **Batch C total** | **23** | **17** | **40** |

Matches RESEARCH §Volume Distribution targets exactly.

## Running BANK Totals

| After plan | BANK.length | Themes covered |
|-----------|-------------|----------------|
| 02-01 (Batch A) | 36 | duerp, principes-generaux |
| 02-02 (Batch B) | 82 | + iso-45001, iso-9001, iso-14001 |
| **02-03 (Batch C)** | **122** | **+ tms, risque-routier, rps** |

## Decisions Made

- Used ameli.fr as primary `source.url` for TMS items citing the 88 % stat (ameli's own data); INRS used for the >80 % INRS stat — both in play, items distinguish sources explicitly
- Prevention sub-pages (`/prevention.html`, `/demarche-prevention.html`) used for prevention-specific items rather than forcing all items onto the `ce-qu-il-faut-retenir` page (D-05 pédagogique-first, content must match item topic)
- Burnout accuracy: stated "not in tableau MP as of 2026" — accurate per RESEARCH and exam-relevant
- QCM distractor precision: `rps-qcm-002` makes L1152-1 vs L1153-1 the primary trap per D-12; `risque-routier-qcm-004` makes mission vs trajet the primary trap

## Deviations from Plan

**1. [Rule 1 - Bug] Missing comma between last ISO item and first TMS item**
- **Found during:** Task 1 (verify-bank.cjs run)
- **Issue:** The Edit appended the new block starting with `{` immediately after the previous closing `}` without a comma separator — valid JS array syntax requires `,` between elements
- **Fix:** Added trailing comma to the last ISO item before the TMS block comment
- **Files modified:** `qhse-cesi/outils-data.js`
- **Verification:** `node verify-bank.cjs` passed after fix
- **Committed in:** `0f1185b` (same atomic task commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — syntax bug introduced by append edit)
**Impact on plan:** Fixed inline before commit. No functional scope change.

## Issues Encountered

- JS syntax error (missing comma) caught immediately by the verifier on first run; fixed in one edit before committing. No items dropped, no content changed.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- BANK.length = 122; 5 themes remaining (risque-chimique, espaces-confines, icpe-seveso, calendrier, acronymes, metiers, rncp)
- Batch D (02-04) is ready to execute: `risque-chimique` + `espaces-confines` (30 items), both INRS backbone with [CV] URLs in RESEARCH
- No blockers

## Known Stubs

None — all 40 items carry complete, non-placeholder content. No stubs.

## Threat Flags

None — Batch C uses only content-verified INRS/ameli pédagogique pages. No new network endpoints, no auth paths, no schema changes. No Légifrance URLs in `source.url` (D-07 compliant: all Légifrance deep-links confined to `explanation` prose).

---
*Phase: 02-content-bank*
*Completed: 2026-05-20*
