# Phase 3: Flashcards + SRS - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-23
**Phase:** 3-flashcards-srs
**Areas discussed:** Rythme nouvelles cartes, Pool flashcards, Queue + fin de session
**Areas skipped (Claude's discretion):** Calibration SM-2

---

## Initial area selection (4 gray areas surfaced, 3 selected)

| Area | Description | Selected |
|------|-------------|----------|
| Calibration SM-2 | Profil Anki standard vs plus serré / plus lâche. Pilote la charge de révision. | |
| Rythme nouvelles cartes | Cap quotidien sur l'introduction de cartes jamais vues. | ✓ |
| Pool flashcards | type==='flashcard' uniquement vs inclure les QCM repackagés. | ✓ |
| Queue + fin de session | Comment surfacer "À réviser aujourd'hui" et la fin de file. | ✓ |

---

## Rythme nouvelles cartes

### Q1 — Cap quotidien

| Option | Description | Selected |
|--------|-------------|----------|
| Cap fixe 10/jour | Conservative ; ≈23 jours pour voir tout le bank. Soutenable. | ✓ |
| Cap fixe 20/jour (Anki défaut) | Standard ; ≈12 jours ; pique vite si 2 jours sautés. | |
| Pas de cap | Risque de bourrer 50 cartes puis crouler en revues 4 jours plus tard. | |
| Cap par thème (5/thème/jour) | Couverture large forcée mais limite la prép d'un examen ciblé. | |

**User's choice:** Cap fixe 10/jour.
**Notes:** Profil conservateur cohérent avec un emploi du temps alternance + voix.

### Q2 — Cap ajustable ou figé ?

| Option | Description | Selected |
|--------|-------------|----------|
| Figé dans le code | Constante `NEW_CARDS_PER_DAY=10`. Aucune UI. | |
| Ajustable via qhse-prefs-v1 | Petit contrôle dans "Réglages" du panneau Flashcards. Persisté. | ✓ |
| Figé + override console | `window.SRS_CONFIG.newCardsPerDay = 15`. Pas d'UI. | |

**User's choice:** Ajustable via `qhse-prefs-v1`.
**Notes:** Le cap initial reste 10, mais le owner peut l'ajuster sans patch + push.

---

## Pool flashcards

### Q1 — Quels items du bank inclure ?

| Option | Description | Selected |
|--------|-------------|----------|
| Flashcards strict (type==='flashcard') | ~130 items ; QCM réservés à P4 ; séparation nette. | |
| Flashcards + QCM réempaquetés | 226 items ; question→recto, answer→verso, choices ignorés. | ✓ |
| Strict + flag par item | `includeInFlashcards:true` sur certains QCM. Nécessite re-toucher au bank gelé. | |

**User's choice:** Flashcards + QCM réempaquetés.
**Notes:** Doublage volontaire — le même fait s'étudie en rapidité (P3) puis en discrimination (P4).

### Q2 — Niveau de détail du verso QCM

| Option | Description | Selected |
|--------|-------------|----------|
| Verso complet (answer + explanation + source) | Rendu uniforme ; explanation contient "pourquoi chaque distracteur faux". | ✓ |
| Verso court (explanation cachée derrière toggle) | Plus rapide ; garde le distinguo P3/P4. | |
| Badge "QCM" visible | Verso complet + petit badge. Transparence, un peu de bruit visuel. | |

**User's choice:** Verso complet, pas de badge.
**Notes:** Rendu uniforme = expérience d'étude cohérente.

---

## Queue + fin de session

### Q1 — Surfacer la queue "À réviser aujourd'hui"

| Option | Description | Selected |
|--------|-------------|----------|
| Écran d'entrée | "Tu as N cartes" + bouton "Commencer". Pause réflexive. | |
| Bandeau compteur permanent | "5/12 dues · 3/10 nouvelles" en haut, décroît à chaque grade. | ✓ |
| Sous-onglet dédié 'Dues' | 2 sous-onglets : tout le pool vs dues SM-2. | |

**User's choice:** Bandeau compteur permanent.
**Notes:** Friction minimale ; le owner sait qu'il étudie, pas besoin de re-confirmer.

### Q2 — Fin de file (queue vide)

| Option | Description | Selected |
|--------|-------------|----------|
| Écran "Bravo — reviens demain" | Coupure salutaire + ventilation rapide. | |
| Proposer "révision libre" | Mode lecture pure, ne touche PAS au SM-2. | ✓ |
| Les deux combinés | "Bravo" par défaut + lien discret "révision libre". | |

**User's choice:** Proposer "révision libre" (lecture pure, état SRS protégé).
**Notes:** Permet le bourrage de crâne pré-examen sans corrompre le scheduler.

---

## Claude's Discretion

- **Calibration SM-2** — owner de-selected this area. Defaults : ease initiale `2.5`, premier intervalle `1j`, deuxième `6j`, suivants `interval × ease` (plancher ease `1.3`), lapse "raté" reset à 1j et −0.20 ease, "dur" × 1.2 et −0.15, "bien" standard, "facile" × ease × 1.3 et +0.15. Stock Anki.
- **Reveal + grade interaction** — owner ne l'a pas listé. Defaults : `Space`/`Enter` révèle, `1`/`2`/`3`/`4` notent ; tap-sur-carte sur mobile ; pas d'animation flip (`prefers-reduced-motion` respecté).
- **Theme picker UI** — `<select>` dropdown (16 entrées : "Tous" + 15 thèmes) en haut de `#panel-flashcards`. Persisté à `qhse-prefs-v1.lastTheme`.
- **SRS schema (`qhse-srs-v1`)** — keyed par `item.id` ; row = `{ ease, interval, due (ISO date), lapses, reps, introduced (ISO date) }`. Le champ `introduced` est le contrat cross-phase pour le cap `newCardsPerDay` que P4 respectera aussi.
- **Module layout** — IIFEs inline dans `outils.html` (scheduler pur + view DOM), même pattern que la tab IIFE existante. Pas de fichier `.js` séparé pour l'engine (les seuls fichiers dédiés du milestone sont `outils-data.js` et `chassis.css`).
- **Verification gate** — `verify-srs.cjs` (Node) qui assert SM-2 math + localStorage round-trip + due-date filtering + cap enforcement + non-mutation en mode "révision libre". Pattern hérité de `verify-bank.cjs`.

## Deferred Ideas

- Calibration SM-2 UI-exposée (override clavier ou panneau dev) — revisiter seulement si la calibration stock pose problème.
- Card-history / per-card grade log — pas dans P3 ; `lapses`/`reps` suffisent au scheduler.
- Cross-theme interleaving algorithmique — shuffle aléatoire dans "Tous" par défaut ; tunable plus tard.
- PWA / offline — hors v2.0 (V2_BACKLOG).
- Wrong QCM → SRS feed (write half de SRS-03) — Phase 4 (P3 ne ship que le schéma compatible).
- Tests blancs n'alimentent pas SRS — Phase 4 enforce.
- Fiches de révision — Phase 5.
