# Phase 4: QCM + Tests blancs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-25
**Phase:** 4-qcm-tests-blancs
**Areas discussed:** Boucle de réponse QCM, Composition des tests blancs, Vue historique des scores, Comportement d'interruption

---

## Boucle de réponse QCM

### Q1 — Interaction au clic d'une réponse QCM ?

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-reveal au clic | Click → reveal immediate (correct/faux + réponse + explication + source). Pas de bouton 'Valider'. Cale sur le rythme Flashcards. | ✓ |
| Sélection + bouton Valider | Highlight visuel sans révéler ; bouton 'Valider' s'active ; permet de changer d'avis. | |
| Comme Tests blancs (différent du QCM solo) | Auto-reveal en QCM solo, Sélection+Valider en Tests blancs. | |

**User's choice:** Auto-reveal au clic
**Notes:** Cohérent avec D-V2 et la cadence Flashcards 1 clic = 1 action.

### Q2 — Comment passer à la question suivante après révélation ?

| Option | Description | Selected |
|--------|-------------|----------|
| Bouton 'Suivant' explicite | Avance manuelle, support Espace/Entrée clavier. | ✓ |
| Auto-advance après délai | Révélation 3-4s puis advance auto. | |
| Clic n'importe où sur la verso | Tap-le-card pattern. | |

**User's choice:** Bouton 'Suivant' explicite
**Notes:** Lecture explication + source à son rythme ; raccourcis clavier hérités de Phase 3.

### Q3 — Sémantique SRS d'un mauvais clic en QCM solo ?

| Option | Description | Selected |
|--------|-------------|----------|
| Plein 'raté' SM-2 | interval reset à 1j + ease -0.20 + lapses++. Équivalent strict bouton 'raté' Flashcards. | ✓ |
| Bump atténué | interval × 0.5 + ease -0.10. QCM peut deviner. | |
| Bon clic = 'bien', mauvais clic = 'raté' | Étend SRS-03 aux bons clics aussi. | |

**User's choice:** Plein 'raté' SM-2
**Notes:** Honore le contrat cross-phase qhse-srs-v1 : le store est mode-agnostique. `SRS.schedule(state, 'rate')` du module frozen Phase 3.

### Q4 — Re-clics du même QCM : écritures multiples au SRS ?

| Option | Description | Selected |
|--------|-------------|----------|
| 1 écriture par session de panel | Set<itemId> en mémoire ; premier clic écrit, suivants no-op. Reset à la fermeture du panel/page. | ✓ |
| Chaque mauvais clic compte | Re-attempts cumulent lapses. | |
| 1 écriture/jour par carte | Date-stamp dans qhse-srs-v1[id].lastReviewed. | |

**User's choice:** 1 écriture par session de panel
**Notes:** Évite la double-pénalité sur re-révision immédiate ; mécanisme purement mémoire (aucune nouvelle clé localStorage).

---

## Composition des tests blancs

### Q1 — Nombre de questions par test ?

| Option | Description | Selected |
|--------|-------------|----------|
| Fixe 20 questions | Standard exam, ~15-20 min, supporte ~4 tests thématiques uniques avant répétition. | ✓ |
| Réglable par session (10/20/30/Tous) | Drop-down avant démarrage, persisté qhse-prefs-v1.lastTestSize. | |
| Proportionnel au pool du thème | Tous les QCM du thème (variable). | |

**User's choice:** Fixe 20 questions

### Q2 — Durée du minuteur ?

| Option | Description | Selected |
|--------|-------------|----------|
| Fixe 20 min (1 min/question) | Calibre classique exam. Display MM:SS en haut. | ✓ |
| Fixe 30 min | Plus confortable (1.5 min/question). | |
| Pas de timer (mode tranquille) | Sans pression temporelle. | |

**User's choice:** Fixe 20 min (1 min/question)

### Q3 — Navigation pendant le test ?

| Option | Description | Selected |
|--------|-------------|----------|
| Libre back/forward | Précédent/Suivant + indicateur 5/20. Réaliste examen. | ✓ |
| Strictement séquentielle | Une fois répondu = locké. | |
| Libre + indicateur 'répondues/non-répondues' | Barre de progression visuelle 20 carrés. | |

**User's choice:** Libre back/forward

### Q4 — Composition du pool ?

| Option | Description | Selected |
|--------|-------------|----------|
| Random shuffle du pool filtré | 20 QCM aléatoires du thème ; ordre des choix conservé. | ✓ |
| Random + shuffle des choix aussi | Choix mélangés (correct devient index dynamique). | |
| Pondéré par difficulté | 8/8/4 sur 20 selon difficulty 1/2/3. | |

**User's choice:** Random shuffle du pool filtré
**Notes:** `correct` index reste valide ; shuffle Fisher-Yates en JS pur.

---

## Vue historique des scores

### Q1 — Où vit la vue historique ?

| Option | Description | Selected |
|--------|-------------|----------|
| En bas du #panel-tests | Section 'Historique' sous l'accueil/résultats. Toujours visible quand hors test. | ✓ |
| Bouton 'Voir historique' → modal/sub-view | Overlay ou bascule d'écran. | |
| Affiché sur la page d'accueil du panel | Sur l'écran de démarrage ; caché pendant test. | |

**User's choice:** En bas du #panel-tests

### Q2 — Champs sauvegardés dans qhse-scores-v1 ?

| Option | Description | Selected |
|--------|-------------|----------|
| Minimum : date, thème, score, total | { id, dateISO, theme, score, total }. | ✓ |
| Standard : + durée + status | { durationSec, status: 'completed'\|'abandoned'\|'timeout' }. | |
| Complet : + answers[] par question | Permet retrospective fine ; +lourd. | |

**User's choice:** Minimum : date, thème, score, total
**Notes:** SRS trace déjà les ratés ; l'historique reste coarse-grained.

### Q3 — Rétention ?

| Option | Description | Selected |
|--------|-------------|----------|
| Illimité, tri récent en premier | Footprint négligeable. | |
| Cap 50 entrées (FIFO) | Au-delà de 50, les plus anciennes supprimées. | ✓ |
| Cap 30 jours glissants | Date-based cleanup. | |

**User's choice:** Cap 50 entrées (FIFO)

### Q4 — Présentation visuelle ?

| Option | Description | Selected |
|--------|-------------|----------|
| Table compacte (date \| thème \| score/total) | `<table>` sortable par date, décroissant par défaut. | ✓ |
| Liste de cartes (1 carte par session) | Score coloré vert/orange/rouge. | |
| Sparkline graphique | Mini-graph SVG d'évolution. | |

**User's choice:** Table compacte (date | thème | score/total)
**Notes:** Cohérent avec l'identité editorial dense du Hub.

---

## Comportement d'interruption

### Q1 — Timer à zéro pendant un test ?

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-submit à zéro | Test terminé auto ; non-répondues = fausses ; status='timeout'. | |
| Bandeau d'alerte mais continue | Timer rouge + banner ; tu peux finir tranquillement. | ✓ |
| 5 min de grâce puis auto-submit | Compromis tolérance/réalisme. | |

**User's choice:** Bandeau d'alerte mais continue
**Notes:** Tolérant ; le user-purpose est mastery, pas time-pressure simulation.

### Q2 — Fermeture d'onglet pendant un test ?

| Option | Description | Selected |
|--------|-------------|----------|
| Abandon silencieux | Aucune écriture qhse-scores-v1. Test perdu. SRS pas touché. | ✓ |
| Sauvegarde auto → reprise | Clé éphémère 'qhse-test-in-progress' ; reprise au prochain ouverture. | |
| Enregistrer ce qui a été fait | Score partiel avec status='abandoned'. | |

**User's choice:** Abandon silencieux
**Notes:** Pas de timer-cheating via tab-pause ; D-V2-03 respecté.

### Q3 — Bouton 'Abandonner' explicite ?

| Option | Description | Selected |
|--------|-------------|----------|
| Oui, avec confirmation | Bouton 'Abandonner' → modal de confirmation → retour accueil sans écriture. | ✓ |
| Non, juste changer d'onglet ARIA | Pas de bouton, abandon implicite via navigation. | |
| Oui, sans confirmation | Direct sans modal. | |

**User's choice:** Oui, avec confirmation

### Q4 — F5 / reload pendant un test ?

| Option | Description | Selected |
|--------|-------------|----------|
| Test perdu, retour à l'accueil panel | Pas de restauration ; cohérent avec abandon silencieux. | ✓ |
| Warning beforeunload | Native browser warning. | |
| Restauration du test | Sauvegarde + reprise avec timer ajusté. | |

**User's choice:** Test perdu, retour à l'accueil panel
**Notes:** Simplifie le state machine ; cohérent avec D-14/D-15.

---

## Claude's Discretion

- CSS namespace : `.qz-*` partagé entre `#panel-qcm` et `#panel-tests` (un seul namespace ; gating par parent selector).
- Module layout : deux IIFEs inline dans outils.html après l'IIFE Flashcards ; `renderQuestion(item, opts)` helper partagé.
- `qhse-prefs-v1` extensions : keys `lastQcmTheme`, `lastTestTheme` — merge-safe (read-mutate-write).
- Verification gate : nouveau `qhse-cesi/verify-quiz.cjs` ; ne touche pas `verify-srs.cjs`.
- Keyboard discipline : Tab navigation native, pas d'arrow-key sur les choices.
- No animations (chassis.css respecte déjà `prefers-reduced-motion`).
- Atomic commit per delivery unit (QCM, Tests blancs, score history, verify-quiz.cjs).
- DCL boot pattern mandatory (Phase 3 hotfix `0553899` lesson).

## Deferred Ideas

- Per-question retrospective in score row (rejected — D-10)
- Mid-test save/resume across reload (rejected — D-14/D-16)
- Statistique agrégée sur l'historique (deferred to hypothetical v2.1)
- Filtrage de l'historique par thème (deferred — trivial extension later)
- Export historique CSV/JSON (out of v2.0 scope)
- Shuffle des choix `choices[]` (rejected — D-08)
- Fiches de révision (Phase 5)
- Print stylesheet (Phase 5)
