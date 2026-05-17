# Phase 2: Content Bank - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-17
**Phase:** 2-content-bank
**Areas discussed:** Taxonomie des thèmes, Stratégie de sources, Profondeur & calibre
**Area offered but de-selected by owner:** Pondération couverture (→ Claude's discretion)

---

## Taxonomie des thèmes

### Q1 — Granularité ISO dans `theme`

| Option | Description | Selected |
|--------|-------------|----------|
| 3 thèmes séparés | `iso-9001`/`iso-14001`/`iso-45001` — révision ciblée, fiches séparées | ✓ |
| 1 thème `iso` global | Tout sous une clé, plus simple, pas de révision ciblée | |
| 1 `iso` + sous-tag | Champ secondaire hors schéma verrouillé | |

**User's choice:** 3 thèmes séparés.

### Q2 — RNCP41446 / BC01–BC04

| Option | Description | Selected |
|--------|-------------|----------|
| Topiques + méta-thème `rncp` | `theme` topique + thème `rncp` pour méta; pas de champ ajouté | ✓ |
| 4 thèmes par bloc | `bc01..bc04` comme clés — risque de classement arbitraire | |
| Topique + champ `bloc` | Champ hors schéma + mapping 200 items | |

**User's choice:** Thèmes topiques + tag/méta-thème `rncp`.

### Q3 — Validation du vocabulaire de 15 slugs

| Option | Description | Selected |
|--------|-------------|----------|
| Liste validée telle quelle | 15 slugs = vocabulaire fermé, pas de catch-all | ✓ |
| Validée + thème « divers » | Filet de sécurité fourre-tout | |
| Je veux ajuster | Texte libre | |

**User's choice:** Liste validée telle quelle.
**Notes:** `acronymes`/`metiers`/`calendrier` confirmés comme thèmes pleins, pas transversaux.

---

## Stratégie de sources

### Q1 — Sourcing des normes ISO (texte officiel payant, `url` requis)

| Option | Description | Selected |
|--------|-------------|----------|
| URL = synthèse libre faisant autorité | `ref` = norme+clause, `url` = page gratuite couvrant le point | ✓ |
| URL ISO.org page boutique | Autorité max mais page sans la réponse → risque wrong-doc | |
| Convention 'sans URL publique' | `url:null` — sort du schéma, affaiblit la garantie | |

**User's choice:** URL = synthèse libre faisant autorité.

### Q2 — Priorité quand loi (Légifrance) ET pédagogique (INRS) existent

| Option | Description | Selected |
|--------|-------------|----------|
| Loi d'abord pour le réglementaire | `source` = Légifrance article | |
| Pédagogique d'abord | `source` = INRS/service-public/ameli; loi dans `ref`/`explanation` | ✓ |
| Selon le type d'item | Règle de tri par type | |

**User's choice:** Pédagogique d'abord.
**Notes:** Cohérent avec la discipline v1.0 — pages INRS/service-public/ameli sont les plus stables et content-vérifiables. `ref` porte toujours l'article de droit exact.

### Q3 — Validation de la carte des autorités par domaine

| Option | Description | Selected |
|--------|-------------|----------|
| Carte validée | L'agent suit la table; exception → remonte le cas | |
| Validée + Légifrance doublon `ref` | Idem + lien profond Légifrance dans `explanation` | ✓ |
| Je veux ajuster | Texte libre | |

**User's choice:** Carte validée + lien profond Légifrance de l'article aussi dans `explanation` (traçabilité renforcée).

---

## Profondeur & calibre

### Q1 — Ligne éditoriale `answer` vs `explanation`

| Option | Description | Selected |
|--------|-------------|----------|
| answer court à restituer · explanation = le pourquoi | Séparation nette, révision active | ✓ |
| answer = réponse complète développée | Tout dans answer, explanation bonus | |
| Selon le type | Règle différenciée par `type` | |

**User's choice:** `answer` = court à restituer · `explanation` = le pourquoi.
**Notes:** Appliqué uniformément; nuance QCM (answer = option correcte reformulée, explanation = pourquoi juste + pourquoi distracteurs faux) dérivée par Claude de la règle générale, pas une politique "selon le type" séparée.

### Q2 — Calibre des distracteurs QCM

| Option | Description | Selected |
|--------|-------------|----------|
| Plausibles, erreurs réelles | Confusions classiques du domaine, vrai piège CESI | ✓ |
| Mixte selon difficulty | Progressivité du piège | |
| Simples / nettement faux | Rapide mais entraînement faible | |

**User's choice:** Plausibles, erreurs réelles.

### Q3 — Barème `difficulty` 1/2/3

| Option | Description | Selected |
|--------|-------------|----------|
| Grille validée | 1 restitution · 2 compréhension/application · 3 analyse/articulation | ✓ |
| Validée + répartition visée | Idem + cible ≈ 40/40/20 par thème | |
| Je veux ajuster | Texte libre | |

**User's choice:** Grille validée (sans répartition imposée).

---

## Claude's Discretion

- **Global shape:** `window.BANK` array literal in `outils-data.js` + `<script src="outils-data.js">` added to `outils.html` (closes SHELL-05), zero build — derived from ROADMAP success criteria.
- **Coverage weighting & flashcard:QCM ratio:** owner de-selected the "Pondération couverture" area → balanced coverage across all 15 themes, light tilt toward exam-heavy themes, both item types per theme.
- **Authoring delivery:** theme-batched generation with atomic checkpoint commits per batch (token-conscious).
- **`id` convention & `verified` date:** executor's discretion within spec example format.

## Deferred Ideas

- Coverage-weighting precision / fixed difficulty distribution — revisit only if P3/P4 session composition reveals gaps.
- All study-mode behaviour (flashcards, SM-2, QCM engine, timed tests, fiches prose, localStorage) — Phases 3–5 by design.
- Fiches de révision long-form prose — Phase 5 (consumes the same bank).
