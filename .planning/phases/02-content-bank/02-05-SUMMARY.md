---
phase: 02-content-bank
plan: "05"
subsystem: content-bank
tags: [icpe-seveso, calendrier, acronymes, batch-e, content-verified]
dependency_graph:
  requires: [02-04]
  provides: [BANK.length=195, icpe-seveso:12, calendrier:11, acronymes:20]
  affects: [qhse-cesi/outils-data.js]
tech_stack:
  added: []
  patterns: [content-verified-url, live-refetch-volatile-data, spa-deferral]
key_files:
  modified:
    - qhse-cesi/outils-data.js
decisions:
  - "Calendrier rémunération % re-fetched LIVE from service-public.fr F2918/F15478 on 2026-05-20 — values confirmed unchanged from RESEARCH snapshot"
  - "RNCP, CFA, VAE, BC01-BC04 deferred to plan 02-06 (Batch F) — SPA-only sources at francecompetences.fr"
  - "All 5 distinct Batch E source URLs content-verified with full curl protocol (title + soft-404)"
metrics:
  duration: "~90 minutes"
  completed_date: "2026-05-20"
  tasks_completed: 1
  tasks_total: 1
  files_changed: 1
---

# Phase 2 Plan 05: Batch E — ICPE-Seveso / Calendrier / Acronymes Summary

**One-liner:** 43 content-verified items (ICPE/Seveso 3 régimes+seuils, calendrier alternance with live-re-fetched % SMIC, QHSE acronyme set) appended to window.BANK bringing total to 195 items; SPA-only acronymes deferred to Batch F.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author Batch E — icpe-seveso (12) + calendrier (11) + acronymes (20) | 87d477c | qhse-cesi/outils-data.js |

## Verification Result

```
BANK.length = 195
PASS: theme "icpe-seveso" has 12 items (>= 12)
PASS: theme "calendrier" has 11 items (>= 11)
PASS: theme "acronymes" has 20 items (>= 20)
PASS: theme "risque-chimique" has 18 items (>= 18)
PASS: theme "espaces-confines" has 12 items (>= 12)
PASS: theme "tms" has 14 items (>= 14)
PASS: theme "risque-routier" has 12 items (>= 12)
PASS: theme "rps" has 14 items (>= 14)
PASS: theme "iso-45001" has 18 items (>= 18)
PASS: theme "iso-9001" has 14 items (>= 14)
PASS: theme "iso-14001" has 14 items (>= 14)
PASS: theme "duerp" has 18 items (>= 18)
PASS: theme "principes-generaux" has 18 items (>= 18)
ALL ASSERTIONS PASSED.
```

## Calendrier Rémunération Live Re-Fetch (RESEARCH Open Question 3 / A5)

**Re-fetch date:** 2026-05-20 (live curl of F2918 and F15478)

**RESEARCH snapshot values (from planning phase):** 27/43/53/100% (1re année)

**Live values confirmed (2026-05-20):**

### Contrat d'apprentissage (F2918) — % du SMIC par âge et année

| Année | 16-17 ans | 18-20 ans | 21-25 ans | 26 ans+ |
|-------|-----------|-----------|-----------|---------|
| 1re   | 27 %      | 43 %      | 53 %      | 100 %   |
| 2e    | 39 %      | 51 %      | 61 %      | 100 %   |
| 3e    | 55 %      | 67 %      | 80 %+     | 100 %   |

SMIC 2026 (lu sur F2918) = 1 823,03 €/mois brut.

### Contrat de professionnalisation (F15478) — % du SMIC par âge

| Âge | Rémunération min | Si bac pro ou équivalent |
|-----|-----------------|--------------------------|
| <21 ans | 55 % (1 002,67 €) | 65 % (1 184,98 €) |
| 21-25 ans | 70 % du SMIC | 75 % du SMIC |
| 26 ans+ | 85 % du SMIC | min. conventionnel si supérieur |

**Deviation vs RESEARCH:** None. The RESEARCH snapshot percentages (27/43/53/100 for 1re année) match the live values exactly. The 2e and 3e year values (39/51/61/100 and 55/67/80/100) and professionnalisation values (55%/65%) were not in RESEARCH snapshots — authored from live read only. `source.verified = '2026-05-20'` set on all calendrier items.

## Batch E Source URL Verification Log

All URLs verified with curl (title check + soft-404 grep) on 2026-05-20:

| URL | Title Returned | Status |
|-----|---------------|--------|
| `https://entreprendre.service-public.gouv.fr/vosdroits/F33414` | "Installations classées…(ICPE) \| Service Public Entreprendre" | PASS |
| `https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso` | "Seveso \| AIDA" | PASS |
| `https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee` | "Qu'est ce qu'une installation classée ? \| AIDA" | PASS |
| `https://www.service-public.gouv.fr/particuliers/vosdroits/F2918` | "Contrat d'apprentissage \| Service Public" | PASS |
| `https://www.service-public.gouv.fr/particuliers/vosdroits/F15478` | "Contrat de professionnalisation \| Service Public" | PASS |
| `https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html` | "Document unique d'évaluation des risques…INRS" | PASS |
| `https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html` | "Risques chimiques. Ce qu'il faut retenir - INRS" | PASS |
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` | "Troubles musculosquelettiques (TMS)…INRS" | PASS |

Zero `francecompetences` URLs in Batch E. Zero Légifrance URLs in `source.url`.

## Deferred SPA Acronymes — Handoff to Batch F (plan 02-06)

The following acronymes were assessed as SPA-only (only authoritative source = `francecompetences.fr` which returns generic title "Rechercher une certification") and are **deferred to plan 02-06** per D-09:

| Acronyme | Expansion | Reason for deferral | Authoritative source |
|----------|-----------|--------------------|--------------------|
| RNCP | Répertoire National des Certifications Professionnelles | Only fully authoritative source is the France compétences fiche RNCP41446 (SPA) | `francecompetences.fr/recherche/rncp/41446/` |
| CFA | Centre de Formation d'Apprentis | Acronyme is used in service-public F2918 but not formally *defined* there; formal authority is France compétences / DARES | SPA |
| VAE | Validation des Acquis de l'Expérience | Only authoritative definitional source is France compétences or a dedicated SP page not yet curl-verified | Defer to F eyeball |
| BC01–BC04 | Blocs de Compétences 01–04 (RNCP41446) | Depends on RNCP fiche SPA | `francecompetences.fr/recherche/rncp/41446/` |

**Total deferred: 6 acronyme items** (RNCP, CFA, VAE, BC01, BC02, BC03 conceptually — exact count depends on how plan 02-06 splits them). Plan 02-06 owns the France compétences SPA human-eyeball checkpoint.

Note: CFA as an *acronym used in context* (e.g., "le CFA représente ≥25% de la durée") is referenced in calendrier items — these uses do not require a standalone acronyme item with a France compétences source. The deferred item is a dedicated `acronymes` theme flashcard with authoritative definition sourced from France compétences.

## Per-Theme Item Counts (after Batch E)

| Theme | Items | Running total |
|-------|-------|---------------|
| duerp | 18 | — |
| principes-generaux | 18 | — |
| iso-45001 | 18 | — |
| iso-9001 | 14 | — |
| iso-14001 | 14 | — |
| tms | 14 | — |
| risque-routier | 12 | — |
| risque-chimique | 18 | — |
| rps | 14 | — |
| espaces-confines | 12 | — |
| icpe-seveso | 12 | NEW |
| calendrier | 11 | NEW |
| acronymes | 20 | NEW |
| metiers | 0 | Batch F |
| rncp | 0 | Batch F |
| **TOTAL** | **195** | **+43 from plan 02-05** |

## Regulatory Accuracy Cross-Check

All ICPE/Seveso exam-critical facts verified against RESEARCH §Domain Accuracy Anchors:

| Fact | Value Used | Anchor Match |
|------|-----------|-------------|
| 3 régimes ICPE ordre | Déclaration → Enregistrement → Autorisation | PASS |
| Directive Seveso 3 | 2012/18/UE | PASS (Seveso II = 96/82/CE NOT used) |
| 2 niveaux Seveso | Seuil bas (S) / Seuil haut (SH) | PASS (NOT catégorie 1/2) |
| Fondement ICPE | Art. L511-1 Code de l'environnement | PASS (NOT Code du travail) |
| Maître d'apprentissage | Apprentissage only | PASS |
| Tuteur | Professionnalisation only | PASS (D-12 distractor implemented) |
| CFA ≥ 25% | Apprentissage | PASS |
| Formation pro 15-25% | Professionnalisation | PASS (distinction item made) |
| OHSAS 18001 → ISO 45001 | 2018 / mars 2018 | PASS |
| CHSCT supprimé | Ordonnances 2017 | PASS |

## Deviations from Plan

None — plan executed exactly as written. The live re-fetch (RESEARCH Open Question 3 / A5) confirmed the RESEARCH snapshot values were accurate; no correction needed. SPA-only acronymes deferred exactly as specified in the plan.

## Threat Model Mitigations Applied

| Threat | Mitigation Applied |
|--------|-------------------|
| T-02-13 (Tampering content accuracy) | All 3 régimes order, Seveso 3 directive number, L511-1, maître/tuteur distinction cross-checked against Domain Accuracy Anchors |
| T-02-14 (Stale volatile data) | Calendrier % live-re-fetched 2026-05-20; source.verified = '2026-05-20' |
| T-02-15 (Hostile/SPA link) | All 8 distinct source URLs curl-verified; zero francecompetences URL in Batch E |
| T-02-16 (Legal scope) | Only free pédagogique pages linked; no PDFs hosted |
| T-02-SC (Supply chain) | No package installs; reused existing verify-bank.cjs |

## Known Stubs

None. All 43 items have complete question/answer/explanation/source fields. No placeholder text or TODO markers.

## Threat Flags

None. No new network endpoints, auth paths, or schema changes introduced.

## Self-Check: PASSED

- `qhse-cesi/outils-data.js` modified: FOUND
- Commit 87d477c: FOUND (git log confirmed)
- BANK.length = 195: CONFIRMED (verify-bank.cjs output)
- All theme counts match targets: CONFIRMED
- Zero francecompetences in source.url: CONFIRMED (grep clean)
- Zero legifrance in source.url: CONFIRMED (verify-bank.cjs check)
