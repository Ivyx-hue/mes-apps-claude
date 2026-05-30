---
phase: 05-fiches-de-r-vision
plan: 05
type: execute
wave: 5
status: complete
completed_tasks: 2
total_tasks: 2
owner_uat: approved-2026-05-30
task1_commit: 5dec14c
subsystem: fiches
tags: [phase-5, fiches, content-authoring, calendrier, icpe-seveso, rncp]
dependency_graph:
  requires: [05-04]
  provides: [3-fiches-content-wave5, dec-01-coverage-complete]
  affects: [qhse-cesi/fiches-data.js]
tech_stack:
  added: []
  patterns: [append-only-content, curl-url-verification, SPA-Batch-F-reuse, Legifrance-code-text, accuracy-anchor-27-43-53-100]
key_files:
  modified:
    - qhse-cesi/fiches-data.js
decisions:
  - "calendrier: service-public.gouv.fr F2918 + F15478 (curl 200) — D6222-26 as <code> text (anti-bot)"
  - "icpe-seveso: AIDA INERIS ICPE + Seveso pages + entreprendre.service-public.gouv.fr F33414 (all curl 200) — L511-1 as <code> text"
  - "rncp: francecompetences.fr SPA (Batch F verified) + FranceTravail ROME; L6113-1 + L335-5 as <code> text (anti-bot)"
  - "F33414 canonical URL is entreprendre.service-public.gouv.fr (not www.service-public.gouv.fr — that path returns 404)"
  - "calendrier source[2] url points to F2918 (no separate Légifrance source shipped — constraint (b) applies)"
  - "rncp source[2] url points to francecompetences.fr (no separate Légifrance source shipped — constraint (b) applies)"
metrics:
  duration_min: ~45
  completed_date: 2026-05-30
  tasks_completed: 1
  files_modified: 1
---

# Phase 5 Plan 05 — Wave 5 Content: Calendrier, ICPE/Seveso, RNCP

## One-liner

Appended 3 fully-authored revision sheets (calendrier, icpe-seveso, rncp) to `fiches-data.js` — completing DEC-01's 15-fiche coverage contract; all accuracy anchors preserved (27/43/53/100% barème, RNCP41446 BC01-BC04 exact intitulés); all URLs curl-verified 200 or accounted for under SPA Batch F / Légifrance constraint protocols; all 7 Node gate checks exit 0; Phase 3 + Phase 4 regression gates exit 0. Stopped at Task 2 (blocking human-verify UAT checkpoint).

## What shipped

| Task | File | Commit | Lines +/- |
|------|------|--------|-----------|
| Task 1 — 3 fiches | `qhse-cesi/fiches-data.js` | `5dec14c` | +256 / −0 |

### Task 1 — 3 fiches (`5dec14c`, fiches-data.js only)

3 fiche objects appended after `metiers` from Plan 05-04. First 12 fiches (Plans 05-02 through 05-04) are byte-identical (append-only, 0 deletions confirmed by `git diff --diff-filter=D`).

| Fiche | defs | selectedIds | pieges | sources |
|-------|------|-------------|--------|---------|
| calendrier | 7 | 8 | 6 | 3 |
| icpe-seveso | 10 | 8 | 6 | 3 |
| rncp | 8 | 8 | 6 | 3 |

`window.FICHES.length === 15` after load. DEC-01 coverage contract satisfied.

## Accuracy anchors verified

| Anchor | Status |
|--------|--------|
| calendrier text contains `27 %` (< 18 ans, 1re année SMIC) | PASS — present in tldr, cadreLegal, demarche, pieges |
| calendrier text contains `43 %` (18-20 ans, 1re année SMIC) | PASS — present in tldr, cadreLegal, demarche, pieges |
| calendrier text contains `53 %` (21-25 ans, 1re année SMIC) | PASS — present in tldr, cadreLegal, demarche, pieges |
| calendrier text contains `100 %` (26 ans+, 1re année SMIC) | PASS — present in tldr, cadreLegal |
| rncp references `RNCP41446` | PASS — tldr, definitions, cadreLegal, demarche, sources |
| rncp references `francecompetences.fr` | PASS — cadreLegal + sources[0] URL |
| rncp BC01-BC04 exact intitulés (per BANK items rncp-flashcard-004..007) | PASS — BC01 Construire, BC02 Améliorer, BC03 Manager les risques, BC04 RSE |
| FICHES.length === 15 | PASS |
| Slug order exact (duerp…metiers…calendrier…icpe-seveso…rncp) | PASS |
| Every BANK theme has exactly one fiche (coverageOK) | PASS |

## URL verification table

| URL | Title fragment captured | HTTP | Authority | Fiche(s) | Category |
|-----|------------------------|------|-----------|----------|----------|
| https://www.service-public.gouv.fr/particuliers/vosdroits/F2918 | "Contrat d'apprentissage \| Service Public" | 200 | Service-Public.gouv.fr | calendrier | (a) curl-verified 2026-05-30 |
| https://www.service-public.gouv.fr/particuliers/vosdroits/F15478 | "Contrat de professionnalisation \| Service Public" | 200 | Service-Public.gouv.fr | calendrier | (a) curl-verified 2026-05-30 |
| https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee | "Qu'est ce qu'une installation classée ? \| AIDA" | 200 | AIDA INERIS | icpe-seveso | (a) curl-verified 2026-05-30 (also Batch E verified 2026-05-20) |
| https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso | "Seveso \| AIDA" | 200 | AIDA INERIS | icpe-seveso | (a) curl-verified 2026-05-30 (also Batch E verified 2026-05-20) |
| https://entreprendre.service-public.gouv.fr/vosdroits/F33414 | "Installations classées pour la protection de l'environnement (ICPE) \| Service Public Entreprendre" | 200 | Service-Public Entreprendre | icpe-seveso | (a) curl-verified 2026-05-30 (Batch E verified 2026-05-20 per outils-data.js) |
| https://www.francecompetences.fr/recherche/rncp/41446/ | RNCP41446 Bachelor QHSE CESI | SPA | France compétences | rncp | (c) SPA — vérifié Batch F 2026-05-20 (human-eyeball, per outils-data.js rncp items source.verified); curl/WebFetch ne peut pas rendre le contenu JS |
| https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html | "Le ROME et les fiches métiers \|France Travail" | 200 | France Travail | rncp | (a) curl-verified (prior wave 05-04, metiers fiche) |

Soft-404 grep sur toutes les pages curl-vérifiées : 0 correspondances (aucun "404", "introuvable", "non trouvé" sur les pages topic).

**URL F33414 — note canonique :** `www.service-public.gouv.fr/professionnels/vosdroits/F33414` retourne HTTP 404 (les deux sous-domaines testés). L'URL canonique est `entreprendre.service-public.gouv.fr/vosdroits/F33414` — confirmée 200 et conforme au `source.url` dans outils-data.js (Batch E).

**URLs NON embarquées (Légifrance — contrainte (b)) :**
- `Art. D6222-26` Code du travail (rémunération apprenti) — rendu en `<code>` text sans hyperlien
- `Art. L511-1` Code de l'environnement (ICPE) — rendu en `<code>` text sans hyperlien
- `Art. L6113-1` Code du travail (blocs de compétences) — rendu en `<code>` text sans hyperlien
- `Art. L335-5` Code de l'éducation (niveaux de qualification) — rendu en `<code>` text sans hyperlien

## selectedIds cross-reference table

Tous les selectedIds vérifiés par le gate Node : `window.BANK.find(b => b.id === id)` retourne un item avec `item.theme === fiche.slug` pour chaque entrée. Gate result : `xrefOK: true`.

| Fiche | selectedIds |
|-------|-------------|
| calendrier | calendrier-flashcard-001, calendrier-flashcard-002, calendrier-flashcard-003, calendrier-flashcard-004, calendrier-flashcard-005, calendrier-qcm-001, calendrier-qcm-002, calendrier-qcm-003 |
| icpe-seveso | icpe-seveso-flashcard-001, icpe-seveso-flashcard-002, icpe-seveso-flashcard-003, icpe-seveso-flashcard-004, icpe-seveso-flashcard-005, icpe-seveso-flashcard-007, icpe-seveso-qcm-001, icpe-seveso-qcm-002 |
| rncp | rncp-flashcard-001, rncp-flashcard-002, rncp-flashcard-003, rncp-flashcard-004, rncp-flashcard-005, rncp-flashcard-006, rncp-qcm-001, rncp-qcm-003 |

## Automated schema gate results

```
{ lenOK: true, slugsOK: true, schemaOK: true, xrefOK: true, calOK: true, rncpOK: true, coverageOK: true }
Exit: 0
```

Tous les 7 invariants vérifiés :
- `lenOK`: `window.FICHES.length === 15` ✓
- `slugsOK`: ordre exact `['duerp','principes-generaux','iso-9001','iso-14001','iso-45001','tms','risque-routier','risque-chimique','rps','espaces-confines','acronymes','metiers','calendrier','icpe-seveso','rncp']` ✓
- `schemaOK`: toutes les 3 nouvelles fiches passent selectedIds[5-10], pieges[>=3], sources[>=3], tldr[>=30], tous les URLs sources matchent `^https?://` ✓
- `xrefOK`: chaque selectedId se résout dans BANK ET `item.theme === fiche.slug` ✓
- `calOK`: calendrier (tldr + cadreLegal + demarche + pieges) contient tous les quatre `27 %`, `43 %`, `53 %`, `100 %` ✓
- `rncpOK`: rncp contient `RNCP41446` et `francecompetences.fr` ✓
- `coverageOK`: `[...new Set(BANK.map(b=>b.theme))].sort()` === `FICHES.map(f=>f.slug).sort()` ✓

## Regression check results

| Gate | Result |
|------|--------|
| `node .planning/phases/03-flashcards-srs/verify-srs.cjs` | **PASS** — exit 0 (21/21 named PASS lines) |
| `node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` | **PASS** — exit 0 (6/6 groups PASS) |

## Byte-identity des 12 premières fiches

`git diff --diff-filter=D --name-only HEAD~1 HEAD` : aucune suppression. Commit : `1 file changed, 256 insertions(+)` — 0 suppressions. Les 12 fiches antérieures (Plans 05-02 à 05-04) sont byte-identiques.

## Deviations from Plan

**1. [Rule 3 - Blocking] F33414 URL canonique différente de celle indiquée dans le plan**

- **Found during:** Vérification URL (Task 1)
- **Issue:** Le plan référence `service-public.fr/professionnels/vosdroits/F33414` et `service-public.gouv.fr/professionnels/vosdroits/F33414` — les deux retournent HTTP 404. La page ICPE entreprise a migré vers `entreprendre.service-public.gouv.fr/vosdroits/F33414`.
- **Fix:** URL canonique `entreprendre.service-public.gouv.fr/vosdroits/F33414` utilisée — confirmée 200, titre "Installations classées pour la protection de l'environnement (ICPE) | Service Public Entreprendre". C'est l'URL déjà présente dans les sources de outils-data.js (Batch E).
- **Files modified:** Aucun fichier supplémentaire — embarqué dans `5dec14c`.
- **Commit:** `5dec14c`

## Owner UAT

**EN ATTENTE** — Task 2 est un checkpoint human-verify bloquant. Voir la section checkpoint ci-dessous.

## Known Stubs

Aucun. Les 3 nouvelles fiches ont un contenu complet (tldr, definitions, cadreLegal, demarche, pieges, sources). Pas de texte placeholder, pas de marqueurs TODO.

## Threat Flags

Aucun. T-05-05-01 (drift % calendrier) mitigé — calOK gate confirme les 4 pourcentages présents. T-05-05-02 (SPA URL rot rncp) mitigé — francecompetences.fr SPA annoté Batch F; UAT step 4 re-vérifie live. T-05-05-03 (safeSetHTML) mitigé — aucune modification du renderer. T-05-05-04 (selectedIds xref) mitigé — xrefOK gate exit 0. T-05-05-05 (coverage drift) mitigé — coverageOK gate exit 0.

## Self-Check: PASSED

- Task 1 commit `5dec14c` existe sur main : confirmé.
- Commit touche uniquement `qhse-cesi/fiches-data.js` (1 fichier, 256 insertions, 0 suppressions).
- `window.FICHES.length === 15` après chargement : confirmé par gate Node.
- Tous les URLs dans la table de vérification correspondent aux URLs dans les tableaux `sources[]` de fiches-data.js.
- Phase 3 verify-srs.cjs : exit 0. Phase 4 verify-quiz.cjs : exit 0.
- Tous les 4 pourcentages (27 %, 43 %, 53 %, 100 %) présents dans calendrier : confirmé par calOK gate.
- RNCP41446 + francecompetences.fr présents dans rncp : confirmé par rncpOK gate.
- Couverture BANK complète (coverageOK) : confirmé par gate Node.
