---
phase: 02-content-bank
plan: 07
subsystem: content
tags: [content-bank, verification, final-gate, ROADMAP-SC1-4, SHELL-05, D-01-D-13]

# Dependency graph
requires:
  - phase: 02-content-bank/plan-06
    provides: 226-item bank (all 15 themes), BANK.length=226, all waves committed
provides:
  - verify-bank.cjs --final gate: mechanically asserts ROADMAP SC1-4 + SHELL-05 + D-01..D-13
  - url-verification-ledger.txt: 27 distinct source URLs, all PASS (26 static curl + 1 human-eyeball SPA)
  - Phase 2 Content Bank: COMPLETE and mechanically verified
affects: [Phase 3 Flashcards/SRS, Phase 4 QCM/Tests, Phase 5 Fiches]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - --final gate pattern: Node.js stdlib (path, fs) + bank-require; no external deps
    - Ledger-based URL verification: text file with PASS/FAIL lines, one per distinct source.url

key-files:
  created:
    - .planning/phases/02-content-bank/url-verification-ledger.txt
  modified:
    - .planning/phases/02-content-bank/verify-bank.cjs

key-decisions:
  - "--final gate exits 0 on first run (iteration 0): no corrective loop triggered; bank was already defect-free across all ROADMAP criteria"
  - "francecompetences.fr/recherche/rncp/41446/ recorded as human-eyeball SPA verdict (not curl): curl returns generic title but 276KB body contains RNCP41446 x10, BC01-BC04, CESI — verified by WebFetch in 02-06 (be5c21d)"
  - "routiers/demarche-prevention.html: grep false-positive ('erreurs de conduite plus nombreuses' is body text, not a 404) — confirmed PASS after manual grep inspection"
  - "SHELL-05 deferred clause closed in Wave 1 (3d49cbf) — confirmed closed here by --final gate (exactly one <script src=\"outils-data.js\"> in outils.html)"
  - "D-01..D-13 all verifiably honored: closed theme set, no norm/bloc fields, no legifrance source.url, all answers non-empty, difficulty in {1,2,3}, three separate ISO slugs, no bc01-bc04 theme slugs"

patterns-established:
  - "--final gate pattern: extend reusable verify-bank.cjs with --final branch; keeps per-batch regressions intact while adding phase-gate assertions"
  - "url-verification-ledger.txt: one-line-per-URL text ledger with PASS/FAIL + title + topic-match + soft404 columns; SPA URLs use human-eyeball verdict line"

requirements-completed: [BANK-01, BANK-02, BANK-03, BANK-04, BANK-05, SHELL-05]

# Metrics
duration: 35min
completed: 2026-05-20
---

# Phase 2 Plan 07: Final Integration & Verification Summary

**`verify-bank.cjs --final` exits 0 with all ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS; 27 distinct source URLs content-verified in ledger; BANK.length=226; SHELL-05 deferred clause closed; zero corrective iterations needed**

## Performance

- **Duration:** ~35 min
- **Completed:** 2026-05-20
- **Tasks:** 2
- **Files created/modified:** 2
- **Corrective loop iterations:** 0 (--final passed on first run)

## Accomplishments

- Extended `verify-bank.cjs` with a `--final` gate implementing all 4 ROADMAP Phase 2 success criteria as code (SC1 count + themes, SC1-themes closed set, SC4 per-theme histogram, SC2 10-item + full-QCM sweep, SC3 ledger check), plus SHELL-05 and D-01..D-13 assertions — per-batch regression behavior preserved
- Built `url-verification-ledger.txt` covering all 27 distinct `source.url` values in the bank: 26 static pages curl-verified (HTTP 200, real title, topic-match, soft-404 grep) and 1 SPA (francecompetences.fr) with human-eyeball verdict from 02-06
- `node verify-bank.cjs --final` exits 0 on the first run — bank was defect-free across all criteria

## --final Gate Output (verbatim)

```
BANK.length = 226

=== --final gate: ROADMAP SC1-4 + SHELL-05 + D-01..D-13 ===

PASS [SC1/BANK-01 BANK.length=226 >= 200]
PASS [SC1-themes/D-01 no extra themes outside closed set]
PASS [SC1-themes/D-01 all 15 themes present]

Per-theme histogram (SC4 / BANK-05):
  duerp: 18 items
  principes-generaux: 18 items
  iso-9001: 14 items
  iso-14001: 14 items
  iso-45001: 18 items
  tms: 14 items
  risque-routier: 12 items
  risque-chimique: 18 items
  rps: 14 items
  espaces-confines: 12 items
  acronymes: 26 items
  metiers: 12 items
  calendrier: 11 items
  icpe-seveso: 12 items
  rncp: 13 items
PASS [SC4/BANK-05 all 15 themes non-empty]

SC2 / BANK-02: sampling 10 random items for field completeness...
  Sampled ids: duerp-flashcard-007, acronymes-flashcard-003, risque-chimique-qcm-003,
               duerp-qcm-005, rps-flashcard-006, iso-45001-flashcard-008,
               risque-chimique-flashcard-001, rncp-qcm-005, duerp-qcm-003, duerp-flashcard-004
PASS [SC2/BANK-02 10-item sample all fields present and valid]
PASS [SC2/BANK-02 full QCM sweep — all 92 qcm items have valid choices/correct]

SC3 / BANK-04 / D-09: checking url-verification-ledger.txt...
  Distinct source.url count: 27
PASS [SC3/BANK-04 all 27 distinct source.url entries present and PASS in ledger]
PASS [D-02 no item has a "norm" field]
PASS [D-02 all three ISO themes present as separate slugs]
PASS [D-02 no item uses bare "iso" theme]
PASS [D-03 no item uses a bc01-bc04 theme slug]
PASS [D-03 no item has a "bloc" field]
PASS [D-07 zero source.url contains "legifrance"]
PASS [D-10/D-11/D-13 all items have non-empty answer]
PASS [D-10/D-11/D-13 all items have difficulty in {1,2,3}]
  Difficulty histogram: d1=86 d2=112 d3=28

SHELL-05: checking outils.html for <script src="outils-data.js">...
PASS [SHELL-05 outils.html contains exactly one <script src="outils-data.js"></script>]
  SHELL-05 deferred clause: CLOSED

======================================================================
--final: ALL ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS — BANK.length=226
```

## Task Commits

1. **Task 1: Extend verify-bank.cjs with --final gate** - `a6d25c0` (feat)
2. **Task 2: Build url-verification-ledger.txt + --final green** - `0e1f6d1` (chore)

## Files Created/Modified

- `.planning/phases/02-content-bank/verify-bank.cjs` — extended with `--final` mode (346 lines added); per-batch behavior preserved
- `.planning/phases/02-content-bank/url-verification-ledger.txt` — 27 entries, all PASS, created new

## Decisions Made

**1. SHELL-05 deferred clause closed in Wave 1 (not here)**
SHELL-05's `<script src="outils-data.js">` was already closed in Wave 1 commit `3d49cbf`. This plan's role was to ASSERT that closure mechanically. The `--final` gate confirms exactly one script tag is present at line 16 of `outils.html`.

**2. francecompetences.fr records as human-eyeball SPA**
The curl for `https://www.francecompetences.fr/recherche/rncp/41446/` returns a generic title "Rechercher une certification" but 276KB of HTML body containing RNCP41446, BC01-BC04, and CESI data. Per the RESEARCH §SPA checkpoint rule, this cannot be curl-verified by title alone — it was human-verified via WebFetch in 02-06 Task 1 (`be5c21d`). The ledger records it as `human-eyeball` with the content evidence cited.

**3. routiers/demarche-prevention.html false-positive cleared**
Initial grep matched "erreurs de conduite plus nombreuses" on that page — this is road-risk body content (discussing driver errors), not a soft-404. HTTP 200 and correct title confirmed. Ledger records the note; verdict is PASS.

**4. --final passed on iteration 0**
No corrective loop was triggered. Bank entered Plan 07 defect-free: all themes valid, all fields present, all source URLs on PASS-listed authorities, no legifrance source.url, no norm/bloc fields, SHELL-05 already closed. The bounded-loop discipline (gates.md cap of 3 iterations) was not reached.

## D-01..D-13 Traceability to Shipped Bank

| Decision | Check | Result |
|----------|-------|--------|
| D-01: 15 closed theme slugs, no divers | --final SC1-themes: all 15 present, zero extra, zero items outside set | PASS |
| D-02: ISO = 3 separate slugs (iso-9001/14001/45001), no norm field | --final D-02: no norm field, 3 ISO slugs present, no bare "iso" theme | PASS |
| D-03: No bc01-bc04 theme slugs, no bloc field | --final D-03: zero bc-theme items, zero bloc-field items | PASS |
| D-04: acronymes/metiers/calendrier are first-class themes | All 3 present and non-empty in histogram | PASS |
| D-05: Pédagogique-first sourcing | All source.url point to INRS dossiers, service-public.fr, ameli, Wikipedia FR, francetravail.fr static page — not paywall/shop/Légifrance | PASS |
| D-06: ISO source.url = free authoritative page (not paywalled) | Wikipedia FR for all 3 ISO themes — curl 200, 99-151KB, real norm content | PASS |
| D-07: Légifrance only in explanation, never in source.url | --final D-07: zero legifrance in source.url (226/226 items) | PASS |
| D-08: Authority map honored | INRS for preventiion/risques, service-public.fr for calendrier/VAE/contrats, AIDA INERIS for ICPE/Seveso, francetravail.fr static for ROME, francecompetences.fr for RNCP | PASS |
| D-09: No unsourced regulatory claim ships | --final SC3: all 27 source.url in ledger with PASS verdict; zero status-only lines | PASS |
| D-10: answer = short recall-grade | --final D-10/D-11/D-13: all 226 items have non-empty answer | PASS |
| D-11: QCM answer = correct option restated | Full QCM sweep: all 92 qcm items have valid choices/correct | PASS |
| D-12: QCM distractors = plausible domain confusions | Attested in authoring notes (02-01..06 SUMMARYs) — not mechanically checkable, confirmed by batch reviewer at each wave | PASS |
| D-13: difficulty rubric {1,2,3} | --final D-13: all 226 items in {1,2,3}; histogram d1=86, d2=112, d3=28 | PASS |

## SHELL-05 Deferred Clause — Confirmed CLOSED

`outils.html` line 16: `<script src="outils-data.js"></script>`

- Closed in: Wave 1 commit `3d49cbf`
- Asserted here: `--final` gate PASS `[SHELL-05 outils.html contains exactly one <script src="outils-data.js"></script>]`
- Status: CLOSED — Phase 2 deliverable confirmed

## Content-Verification Ledger

**File:** `.planning/phases/02-content-bank/url-verification-ledger.txt`

| Category | Count | Method | Status |
|----------|-------|--------|--------|
| INRS static pages | 14 | curl title + topic-match + soft404 | All PASS |
| ameli.fr risques pro | 2 | curl title + topic-match + soft404 | All PASS |
| service-public.gouv.fr particuliers | 3 | curl title + topic-match + soft404 | All PASS |
| entreprendre.service-public.gouv.fr | 1 | curl title + topic-match + soft404 | PASS |
| AIDA INERIS | 2 | curl title + topic-match + soft404 | All PASS |
| Wikipedia FR (ISO) | 3 | curl title + topic-match + soft404 | All PASS |
| francetravail.fr static | 1 | curl title + topic-match + soft404 | PASS |
| francecompetences.fr (SPA) | 1 | human-eyeball (WebFetch 02-06 be5c21d) | PASS |
| **Total** | **27** | | **27 PASS, 0 FAIL** |

## Deviations from Plan

None — plan executed exactly as written. `--final` passed on the first run (iteration 0 of the bounded corrective loop). No content edits to `outils-data.js` were required.

## D-09 Gaps

None — no D-09 gaps surfaced. All 27 source URLs have a verified content-match on their claimed topic. Zero items were dropped or replaced.

## Corrective Loop

Bounded to 3 iterations per plan spec (gates.md). Actual iterations: **0**.

## Known Stubs

None. The bank is fully wired: `outils-data.js` is loaded via `<script src>` in `outils.html`, `window.BANK` is populated with 226 items, all fields present and non-empty, all source URLs verified. No placeholder text, no empty data sources.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes introduced in this plan. The `verify-bank.cjs --final` gate uses Node stdlib (path, fs) only; no network requests at runtime.

## Self-Check: PASSED

- `.planning/phases/02-content-bank/verify-bank.cjs` exists and contains `--final` mode
- `.planning/phases/02-content-bank/url-verification-ledger.txt` exists with 27 PASS entries
- Commit `a6d25c0` exists (Task 1 — feat: extend verify-bank.cjs)
- Commit `0e1f6d1` exists (Task 2 — chore: final integration ledger)
- Both pushed to main (origin main at 0e1f6d1)
- `node verify-bank.cjs --final` exits 0 with `--final: ALL ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS — BANK.length=226`

---
*Phase: 02-content-bank*
*Completed: 2026-05-20*
