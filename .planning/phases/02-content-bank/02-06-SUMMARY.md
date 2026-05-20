---
phase: 02-content-bank
plan: 06
subsystem: content
tags: [content-bank, ROME, RNCP, metiers, diplome, France-competences, France-Travail]

# Dependency graph
requires:
  - phase: 02-content-bank/plan-05
    provides: 195-item bank (Waves 1-5), 20 acronymes items, spa-scouting-note.txt with N=6 deferred acronymes list
provides:
  - metiers theme: 12 items (ROME H1302/H1502/M1402/H1303 + structure codes)
  - rncp theme: 13 items (RNCP41446 overview, BC01-BC04 titles, Niveau 6, expiration, certificateur)
  - acronymes theme completed: 6 deferred Batch-E items absorbed (RNCP/CFA/VAE/BC01/BC02/BC03)
  - BANK.length = 226 (target >= 220 exceeded)
  - All 15 themes populated; bank ready for Phase 3 consumption
affects: [Phase 3 Flashcards/SRS, Phase 4 QCM/Tests, Phase 5 Fiches]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Static-source fallback pattern for SPA domains (candidat.francetravail.fr metierscope → static francetravail.fr ROME page)
    - Content-verified service-public.fr page lookup (F-code verification before citing)

key-files:
  created: []
  modified:
    - qhse-cesi/outils-data.js

key-decisions:
  - "H1523 correction: H1523 (Responsable QSE) is NOT in official RNCP41446 ROME mapping per France competences — the three official codes are H1302, H1502, M1402. H1523 appears in job postings but not in the fiche. Items document this distinction explicitly."
  - "Static source for all metiers items: candidat.francetravail.fr/metierscope/* URLs are TRUE JS SPAs (curl returns 5KB skeleton). All 12 metiers items cite the static page https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html which is content-verified (128KB, real ROME prose)."
  - "VAE page correction: F2412 was 404 — correct page is F2401 (Validation des acquis de l'experience (VAE), HTTP 200, title matches). All VAE acronyme items cite F2401."
  - "CFA source: service-public.fr/F2918 (Contrat d'apprentissage, HTTP 200, content-verified) used instead of francecompetences.fr — avoids SPA dependency for a definition available on a static page."
  - "BC04 exact title: 'Accompagner l'organisme dans ses démarches RSE et de développement durable' — both RSE AND développement durable explicitly in the title (not truncated to 'développement durable' alone)."
  - "6 deferred acronymes absorbed: RNCP, CFA, VAE, BC01, BC02, BC03 — all authored, none silently dropped. acronymes total 20→26 (20 + N=6)."

patterns-established:
  - "ROME code distractor pattern: items explicitly document H1523 vs M1402 distinction (common job-posting confusion vs official RNCP mapping)"
  - "BC title precision: exact official titles from France competences cross-checked against WebFetch-extracted anchor facts; answer/explanation fields carry full titles"

requirements-completed: [BANK-01, BANK-02, BANK-03, BANK-04, BANK-05]

# Metrics
duration: 45min
completed: 2026-05-20
---

# Phase 2 Plan 06: Batch F (metiers + rncp + deferred acronymes) Summary

**31 items covering RNCP41446 diploma structure (BC01-BC04), ROME career codes (H1302/H1502/M1402/H1303), and 6 deferred acronymes — all on content-verified static sources; BANK.length reaches 226**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-05-20T09:35:00Z
- **Completed:** 2026-05-20T10:20:00Z
- **Tasks:** 1 (Task 3 — Task 1 done in prior session be5c21d, Task 2 checkpoint resolved out-of-band)
- **Files modified:** 1

## Accomplishments

- Authored 12 `metiers` items covering the 3 official RNCP41446 ROME codes (H1302/H1502/M1402), the career-ladder code H1303, and the ROME nomenclature structure — all citing the static francetravail.fr page (SPA fallback strategy applied)
- Authored 13 `rncp` items covering RNCP41446 overview, BC01-BC04 exact titles, Niveau 6, expiration 27-10-2030, certificateur CESI — all citing France competences RNCP41446 fiche (content-verified via WebFetch in Task 1)
- Absorbed all 6 Batch-E-deferred acronymes (RNCP, CFA, VAE, BC01, BC02, BC03) with content-verified static sources; acronymes total reaches 26
- BANK.length: 195 → 226, all 15 themes non-empty, verify-bank ALL ASSERTIONS PASSED

## Task Commits

1. **Task 1: Curl-pre-screen SPA URLs + compile deferred-acronyme list** - `be5c21d` (chore)
2. **Task 2: Human-verify SPA URLs** - checkpoint resolved out-of-band (WebFetch content-verification + user-approved sourcing strategy)
3. **Task 3: Author Batch F — metiers + rncp + deferred acronymes** - `d3dc28c` (feat)

## Files Created/Modified

- `qhse-cesi/outils-data.js` — 31 items appended (metiers×12, rncp×13, acronymes×6); BANK.length 195→226; trailing comma fix on last Wave-5 item

## Decisions Made

**1. H1523 NOT in RNCP41446 official ROME mapping (correction from plan)**
The plan's `must_haves` truths mentioned H1523 as a ROME code for RNCP41446. France competences WebFetch-extraction confirmed only H1302, H1502, M1402 are listed in the fiche. H1523 does not appear. Items document this distinction (H1523 is common in job postings but absent from the official fiche). No item cites H1523 as an "official" RNCP41446 code.

**2. Static source for all metiers items**
All 4 MétierScope SPAs (H1302/H1502/H1523/H1303) confirmed TRUE SPAs — curl returns identical 5KB "Fiche Métier" skeleton with zero ROME content. Per locked sourcing strategy, all 12 metiers items cite `https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html` (128KB static page, content-verified, real ROME prose). This is the D-09-compliant fallback for the SPA domain.

**3. VAE F-code correction**
F2412 → HTTP 404. Correct page is F2401 ("Validation des acquis de l'expérience (VAE)"), HTTP 200, title match confirmed. VAE acronyme item cites F2401.

**4. CFA from service-public, not France competences**
CFA definition is available on the content-verified F2918 apprentissage page (service-public.fr). Using that static page avoids the France competences SPA dependency for a concept that has a better direct source. Per D-08: "domain authority of each acronym."

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Missing trailing comma on last Wave-5 item**
- **Found during:** Task 3 (first verify-bank run)
- **Issue:** JS syntax error "Unexpected token '{'" — the `acronymes-qcm-006` item had no trailing comma before the new BATCH F comment block
- **Fix:** Added comma after `difficulty: 2` closing brace
- **Files modified:** `qhse-cesi/outils-data.js`
- **Verification:** verify-bank ALL ASSERTIONS PASSED after fix
- **Committed in:** d3dc28c (same task commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - syntax bug)
**Impact on plan:** Required for correctness; no scope change.

## Sourcing Strategy (Locked — for downstream reference)

| Theme | source.url | Verification |
|-------|-----------|--------------|
| metiers (all 12) | `https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html` | curl 200, 128KB, static page, real ROME prose |
| rncp (all 13) | `https://www.francecompetences.fr/recherche/rncp/41446/` | WebFetch 276KB body, RNCP41446 + BC01-BC04 + CESI content present |
| acronymes RNCP/BC01/BC02/BC03 | `https://www.francecompetences.fr/recherche/rncp/41446/` | same as above |
| acronymes CFA | `https://www.service-public.gouv.fr/particuliers/vosdroits/F2918` | curl 200, title "Contrat d'apprentissage" |
| acronymes VAE | `https://www.service-public.gouv.fr/particuliers/vosdroits/F2401` | curl 200, title "Validation des acquis de l'expérience (VAE)" |

**SPA URLs NOT used as source.url:** `candidat.francetravail.fr/metierscope/*` (confirmed SPA skeleton, no content in curl body)

## Deferred Acronymes — Final Accounting

| Acronyme | ID | Source | Notes |
|----------|----|--------|-------|
| RNCP | acronymes-flashcard-015 | France competences RNCP41446 | |
| CFA | acronymes-flashcard-016 | service-public.fr F2918 | Static, not SPA |
| VAE | acronymes-flashcard-017 | service-public.fr F2401 | F2412 was 404 |
| BC01 | acronymes-flashcard-018 | France competences RNCP41446 | |
| BC02 | acronymes-flashcard-019 | France competences RNCP41446 | |
| BC03 | acronymes-flashcard-020 | France competences RNCP41446 | |

Prior total: 20 | Deferred N=6 | New total: 26 | D-09 gaps: 0

## Issues Encountered

- F2412 (service-public.fr) returned HTTP 404 — found correct VAE page at F2401 via alternative code search.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 15 themes populated, BANK.length = 226, verify-bank passes all assertions
- Phase 3 (Flashcards/SRS) can consume `window.BANK` via `<script src="outils-data.js">` (already wired in outils.html from Phase 1)
- No blockers

---
*Phase: 02-content-bank*
*Completed: 2026-05-20*
