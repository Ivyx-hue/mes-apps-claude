---
phase: 05-fiches-de-r-vision
plan: 03
type: execute
wave: 3
status: checkpoint-human-verify
completed_tasks: 1
total_tasks: 2
task1_commit: 3e182f1
subsystem: fiches
tags: [phase-5, fiches, content-authoring, iso-45001, tms, risque-routier, risque-chimique]
dependency_graph:
  requires: [05-02]
  provides: [4-fiches-content-wave3]
  affects: [qhse-cesi/fiches-data.js]
tech_stack:
  added: []
  patterns: [append-only-content, Wikipedia-FR-ISO-source, INRS-authority, curl-url-verification]
key_files:
  modified:
    - qhse-cesi/fiches-data.js
decisions:
  - "iso-45001 uses Wikipedia FR for all 3 sources (locked STATE.md decision: Wikipedia FR for all three ISO themes)"
  - "tms sources: INRS TMS x2 + ameli.fr TMS-Pros — tableau 57/98 refs as plain code text (no Légifrance links)"
  - "risque-routier sources: INRS x2 + service-public.fr — Art. L411-1/L411-2 CSS as plain code text"
  - "risque-chimique sources: INRS x3 — CLP/REACH refs as plain code text (no eur-lex, not curl-verified)"
metrics:
  duration_min: ~90
  completed_date: 2026-05-29
  tasks_completed: 1
  files_modified: 1
---

# Phase 5 Plan 03 — Wave 3 Content: ISO 45001, TMS, Risque routier, Risque chimique

## One-liner

Appended 4 fully-authored revision sheets (iso-45001, tms, risque-routier, risque-chimique) to `fiches-data.js` — all URLs content-verified via curl 200 + title match + soft-404 grep, all selectedIds cross-referenced against BANK, schema gate exit 0, Phase 3 + Phase 4 regression gates exit 0. Stopped at Task 2 (blocking human-verify UAT checkpoint).

## What shipped

| Task | File | Commit | Lines +/- |
|------|------|--------|-----------|
| Task 1 — 4 fiches | `qhse-cesi/fiches-data.js` | `3e182f1` | +309 / −0 |

### Task 1 — 4 fiches (`3e182f1`, fiches-data.js only)

4 fiche objects appended after `iso-14001`. First 4 fiches from Plan 05-02 are byte-identical (append-only, 0 deletions confirmed by post-commit diff-filter).

| Fiche | defs | selectedIds | pieges | sources |
|-------|------|-------------|--------|---------|
| iso-45001 | 7 | 8 | 6 | 3 |
| tms | 7 | 8 | 6 | 3 |
| risque-routier | 5 | 8 | 6 | 3 |
| risque-chimique | 7 | 8 | 6 | 3 |

`window.FICHES.length === 8` after load. All schema invariants pass.

## URL verification table

All URLs content-verified via `curl -sL` on 2026-05-29. Légifrance and eur-lex return 403 (anti-bot for curl) — excluded from sources[]. Regulatory article references cited as plain `<code>Art. X</code>` text without hyperlinks, per constraint. No eur-lex URL committed.

| URL | Title fragment captured | HTTP | Authority | Fiche(s) |
|-----|------------------------|------|-----------|----------|
| https://fr.wikipedia.org/wiki/ISO_45001 | "ISO 45001 — Wikipédia" | 200 | Wikipédia FR | iso-45001 |
| https://fr.wikipedia.org/wiki/BS_OHSAS_18001 | "BS OHSAS 18001 — Wikipédia" | 200 | Wikipédia FR | iso-45001 |
| https://fr.wikipedia.org/wiki/PDCA | "Roue de Deming — Wikipédia" | 200 | Wikipédia FR | iso-45001 |
| https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html | "Troubles musculosquelettiques (TMS). Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | tms |
| https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir | "Les TMS : pourquoi et comment agir" | 200 | Assurance Maladie — ameli | tms |
| https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html | "Troubles musculosquelettiques (TMS). Démarche de prévention - Risques - INRS" | 200 | INRS | tms |
| https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html | "Risques routiers. Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | risque-routier |
| https://www.inrs.fr/risques/routiers/demarche-prevention.html | "Risques routiers. Démarche de prévention - Risques - INRS" | 200 | INRS | risque-routier |
| https://www.service-public.fr/particuliers/vosdroits/F171 | "Accident du travail : démarches à effectuer" | 200 | Service-public.fr | risque-routier |
| https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html | "Risques chimiques. Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | risque-chimique |
| https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html | "Classification et étiquetage des produits chimiques. Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | risque-chimique |
| https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html | "Mesure des expositions aux agents chimiques et biologiques. Ce qu'il faut retenir - Risques - INRS" | 200 | INRS | risque-chimique |

Soft-404 grep (search for "404 ", "introuvable", "page non trouvée") on all verified pages: no matches on topic pages. False positives in ameli.fr JSON (postal code "1404") confirmed as non-error. All pages confirmed to land directly on topic content.

**URLs NOT committed (curl-blocked or 404):**
- ameli.fr `/troubles-musculosquelettiques-tms/tableau-des-maladies-professionnelles` → HTTP 404 (URL changed); replaced with INRS TMS prevention page
- ameli.fr `/troubles-musculosquelettiques-tms/reconnaitre-tms` → HTTP 404; not used
- Légifrance URLs (L411-1, L411-2 CSS; R4412-1, etc.) → HTTP 403 anti-bot; referenced as plain `<code>Art. X</code>` text without hyperlink
- eur-lex CLP 1272/2008 → not curl-verified; referenced as plain text `<code>Règlement (CE) 1272/2008</code>` without hyperlink
- INRS management SST pages (`/demarche/systemes-management-sst/`, `/demarche/systeme-de-management/`) → HTTP 404 (URL not found)

## selectedIds cross-reference table

All 32 selectedIds (8 per fiche × 4 fiches) verified by Node gate: `window.BANK.find(b => b.id === id)` returned a matching item with `item.theme === fiche.slug` for every entry. Node gate result: `xrefOK: true`.

| Fiche | selectedIds |
|-------|-------------|
| iso-45001 | iso-45001-flashcard-001, iso-45001-flashcard-003, iso-45001-flashcard-004, iso-45001-flashcard-005, iso-45001-flashcard-008, iso-45001-qcm-001, iso-45001-qcm-002, iso-45001-qcm-005 |
| tms | tms-flashcard-001, tms-flashcard-002, tms-flashcard-004, tms-flashcard-005, tms-flashcard-006, tms-qcm-001, tms-qcm-002, tms-qcm-006 |
| risque-routier | risque-routier-flashcard-001, risque-routier-flashcard-002, risque-routier-flashcard-003, risque-routier-flashcard-004, risque-routier-flashcard-005, risque-routier-qcm-001, risque-routier-qcm-002, risque-routier-qcm-004 |
| risque-chimique | risque-chimique-flashcard-002, risque-chimique-flashcard-003, risque-chimique-flashcard-005, risque-chimique-flashcard-006, risque-chimique-flashcard-007, risque-chimique-qcm-001, risque-chimique-qcm-004, risque-chimique-qcm-006 |

Node gate: `xrefOK: true` — exit 0.

## Automated schema gate results

```
{ lenOK: true, slugsOK: true, schemaOK: true, xrefOK: true, relOK: true }
```

All 5 invariants verified:
- `lenOK`: `window.FICHES.length === 8` ✓
- `slugsOK`: exact order `['duerp','principes-generaux','iso-9001','iso-14001','iso-45001','tms','risque-routier','risque-chimique']` ✓
- `schemaOK`: all 4 new fiches pass selectedIds[5-10], definitions[≥4], pieges[≥3], sources[≥3], tldr[≥30], fi-cite present, all source URLs match `^https?://` ✓
- `xrefOK`: every selectedId resolves in BANK AND `item.theme === fiche.slug` ✓
- `relOK`: `target="_blank"` count ≡ `rel="noopener noreferrer"` count in cadreLegal+demarche ✓

## Regression check results

| Gate | Result |
|------|--------|
| `node .planning/phases/03-flashcards-srs/verify-srs.cjs` | **PASS** — exit 0 (21/21 named PASS lines) |
| `node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` | **PASS** — exit 0 (6/6 groups PASS) |

## Byte-identity of first 4 fiches

`git diff --diff-filter=D --name-only HEAD~1 HEAD` returned empty output — no deletions. Commit `3e182f1` shows `1 file changed, 309 insertions(+)` with 0 deletions. First 4 fiches (from Plan 05-02 commit `f344e7d`) are byte-identical.

## Owner UAT

**PENDING** — Task 2 checkpoint not yet reached by owner. See checkpoint section below.

## Deviations from Plan

**1. [Rule 3 - Blocking] ameli.fr tableau MP URLs returned HTTP 404**

- **Found during:** URL verification (Task 1)
- **Issue:** Plan referenced `ameli.fr/.../tableau-des-maladies-professionnelles` and `ameli.fr/.../reconnaitre-tms` — both returned HTTP 404 (URL structure changed on ameli.fr since BANK items were authored 2026-05-20).
- **Fix:** Replaced with INRS TMS prevention page (`/prevention.html`, HTTP 200, title-verified) as 3rd source for the tms fiche. The tableau 57/98 references appear as plain text in cadreLegal prose (no broken hyperlinks).
- **Files modified:** None in addition to planned fiches-data.js
- **Commit:** Incorporated into `3e182f1` (never shipped broken URLs)

**2. [Rule 2 - Missing critical] Légifrance + eur-lex URLs not curl-verifiable**

- **Found during:** URL verification (Task 1)
- **Issue:** Légifrance (CSS L411-1/L411-2 for risque-routier; R4412-1 for risque-chimique) and eur-lex (CLP 1272/2008) return HTTP 403 (anti-bot) — cannot be curl-verified per constraint.
- **Fix:** All regulatory article references rendered as plain `<code>Art. X</code>` text without hyperlinks, per the plan's explicit constraint. No unverified hyperlinks committed.
- **Commit:** Incorporated into `3e182f1`

**3. [Rule 3 - Blocking] INRS management-SST pages not found**

- **Found during:** URL verification for iso-45001 3rd source
- **Issue:** Multiple INRS URLs for SMS/SMSST returned HTTP 404 (URL structure not found: `/demarche/systemes-management-sst/`, `/demarche/sante-securite-travail/`, etc.).
- **Fix:** Used Wikipedia FR PDCA (Roue de Deming) as 3rd source for iso-45001 — curl 200, title "Roue de Deming — Wikipédia", on-topic (PDCA is the structural backbone of all three ISO HLS norms). Consistent with locked "Wikipedia FR for ISO themes" decision.
- **Commit:** Incorporated into `3e182f1`

## Known Stubs

None. All 4 new fiches have full authored content (tldr, definitions, cadreLegal, demarche, pieges, sources). No placeholder text, no TODO markers.

## Threat Flags

None. T-05-03-01 (safeSetHTML XSS) mitigated — no new code, renderer unchanged. T-05-03-02 (URL verification) mitigated — all 12 sources[] URLs curl-verified 200 + title match + soft-404 clean. T-05-03-03 (tabnabbing) mitigated — relOK gate confirms target="_blank" ≡ rel="noopener noreferrer". T-05-03-04 (selectedIds drift) mitigated — Node xrefOK gate exit 0.

## Self-Check: PASSED

- Task 1 commit `3e182f1` exists on main: confirmed (`git log --oneline` shows `3e182f1 feat(05-03): append 4 fiches...`).
- Commit touches only `qhse-cesi/fiches-data.js` (1 file, 309 insertions, 0 deletions).
- `window.FICHES.length === 8` after load: confirmed by Node gate.
- All 12 source URLs in SUMMARY verification table match URLs in `sources[]` arrays in fiches-data.js.
- Phase 3 verify-srs.cjs: exit 0. Phase 4 verify-quiz.cjs: exit 0.
