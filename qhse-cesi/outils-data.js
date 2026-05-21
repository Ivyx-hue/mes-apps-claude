/* qhse-cesi/outils-data.js
 * Content bank — Phase 2.
 * window.BANK: array of study items (flashcards + QCM) covering the full Bachelor QHSE scope.
 * Schema: { id, type, theme, question, answer, choices?, correct?, explanation, source, difficulty }
 * Consumed by: P3 (Flashcards/SM-2), P4 (QCM/Tests), P5 (Fiches).
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 */
window.BANK = [

  /* =========================================================
   * THEME: duerp (18 items — 10 flashcards + 8 QCM)
   * Authority: INRS demarche/document-unique
   * Ref: Code du travail R4121-1, L4121-3, L4121-3-1
   * ========================================================= */

  {
    id: 'duerp-flashcard-001',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quel article du Code du travail impose à l'employeur de transcrire les résultats de l'évaluation des risques ?",
    answer: "L'article R4121-1 du Code du travail impose à tout employeur de transcrire les résultats de l'évaluation des risques dans un Document Unique (DUERP).",
    explanation: "R4121-1 est l'article réglementaire (R = décret) qui concrétise l'obligation générale de l'employeur posée par L4121-1. Piège fréquent : confondre R4121-1 (DUERP) avec L4121-3 (obligation de mise à jour) ou L4121-1 (obligation générale). (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562)",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-flashcard-002',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quelle est la durée de conservation obligatoire du DUERP ?",
    answer: "Le DUERP doit être conservé pendant 40 ans.",
    explanation: "40 ans (et non 5 ou 10 ans — erreur d'examen très courante). Cette durée est justifiée par la latence de certaines maladies professionnelles (cancers, maladies respiratoires) qui peuvent se déclarer des décennies après l'exposition. La loi du 2 août 2021 a durci cette obligation pour permettre le suivi des expositions aux agents chimiques cancérogènes.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-flashcard-003',
    type: 'flashcard',
    theme: 'duerp',
    question: "À partir de quel seuil d'effectif le DUERP est-il obligatoire ?",
    answer: "Le DUERP est obligatoire dès le premier salarié, quelle que soit la taille de l'entreprise.",
    explanation: "Aucun seuil minimal d'effectif : toute entreprise employant au moins 1 salarié doit tenir un DUERP. La confusion vient parfois du Papripact (programme annuel de prévention), qui lui n'est obligatoire que dans les entreprises de 50 salariés et plus.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-flashcard-004',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quelle est la fréquence minimale de mise à jour du DUERP dans les entreprises de 11 salariés et plus ?",
    answer: "Dans les entreprises de 11 salariés et plus, le DUERP doit être mis à jour au moins une fois par an.",
    explanation: "Trois situations déclenchent également la mise à jour : (1) toute décision d'aménagement important modifiant les conditions d'hygiène, de sécurité ou les conditions de travail ; (2) toute information nouvelle sur un risque dans une unité de travail. Pour les entreprises de moins de 11 salariés, la mise à jour est au moins à chaque modification importante. (Art. L4121-3 Code du travail)",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-flashcard-005',
    type: 'flashcard',
    theme: 'duerp',
    question: "Qu'est-ce que le Papripact et à qui s'applique-t-il ?",
    answer: "Le Papripact (Programme Annuel de Prévention des Risques Professionnels et d'Amélioration des Conditions de Travail) est un programme annuel obligatoire pour les entreprises d'au moins 50 salariés, annexé au DUERP.",
    explanation: "Le Papripact découle de l'évaluation des risques : il liste les actions concrètes à conduire dans l'année pour réduire les risques identifiés dans le DUERP. Il est obligatoire depuis la loi du 2 août 2021 dans les entreprises ≥ 50 salariés. En dessous de ce seuil, un programme de prévention est défini mais sans obligation de formalisme annuel. (Art. L4121-3-1 Code du travail)",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-flashcard-006',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quelles sont les 5 étapes de la démarche d'évaluation des risques professionnels (EvRP) ?",
    answer: "1. Préparer la démarche (périmètre, ressources, acteurs) ; 2. Identifier les risques par unité de travail ; 3. Classer les risques (fréquence × gravité) ; 4. Proposer des actions de prévention ; 5. Mettre en œuvre et réévaluer.",
    explanation: "L'EvRP est une démarche structurée, non un simple inventaire. L'unité de travail est le découpage de référence (pas le poste). La hiérarchisation (étape 3) oriente le plan d'action (étape 4). L'EvRP est un processus continu : la mise à jour (étape 5) relance le cycle.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-flashcard-007',
    type: 'flashcard',
    theme: 'duerp',
    question: "Qu'est-ce qu'une 'unité de travail' dans le contexte du DUERP ?",
    answer: "Une unité de travail est un regroupement de salariés exposés aux mêmes risques professionnels. Elle peut correspondre à un poste, un atelier, un secteur ou une activité.",
    explanation: "L'unité de travail est le grain d'analyse du DUERP. Elle n'est pas forcément identique au poste de travail : plusieurs postes différents peuvent être regroupés si les risques sont identiques. Ce découpage est propre à chaque entreprise selon son organisation. Une mauvaise définition des unités de travail est la première erreur dans un DUERP.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-flashcard-008',
    type: 'flashcard',
    theme: 'duerp',
    question: "Qui est responsable de l'élaboration et de la mise à jour du DUERP ?",
    answer: "L'employeur est seul responsable de l'élaboration et de la mise à jour du DUERP. Il peut déléguer la réalisation technique mais en conserve la responsabilité juridique.",
    explanation: "La délégation à un prestataire, un chargé de sécurité ou un service de prévention n'exonère pas l'employeur de sa responsabilité pénale en cas d'accident. Le CSE (Comité Social et Économique) doit être consulté sur le DUERP dans les entreprises de 50 salariés et plus.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-flashcard-009',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quelle sanction pénale l'employeur encourt-il en l'absence de DUERP ?",
    answer: "L'absence de DUERP est passible d'une contravention de 5e classe (amende jusqu'à 1 500 € par unité de travail non couverte), pouvant être multipliée par le nombre d'unités de travail manquantes.",
    explanation: "L'amende est de 1 500 € maximum pour une contravention de 5e classe (3 000 € en cas de récidive). Ce n'est pas un délit correctionnel mais une contravention. Cependant, en cas d'accident du travail consécutif à l'absence de DUERP, la responsabilité pénale de l'employeur pour faute inexcusable est quasi-systématique.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4741-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'duerp-flashcard-010',
    type: 'flashcard',
    theme: 'duerp',
    question: "Quels acteurs internes doivent être associés à l'élaboration du DUERP ?",
    answer: "Le CSE (ou CSSCT dans les entreprises ≥ 50 salariés), les salariés eux-mêmes (via leurs représentants ou directement), et les services de santé au travail (médecin du travail, SPST).",
    explanation: "La participation des salariés est clé : ce sont eux qui connaissent les risques réels de leur poste. Le médecin du travail apporte son expertise médicale. La CSSCT (Commission Santé, Sécurité et Conditions de Travail) est la sous-commission du CSE dédiée à la santé-sécurité, obligatoire dans les entreprises ≥ 50 salariés.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-qcm-001',
    type: 'qcm',
    theme: 'duerp',
    question: "Quelle est la durée légale de conservation du DUERP ?",
    answer: "40 ans.",
    choices: [
      "5 ans",
      "10 ans",
      "40 ans.",
      "Durée indéterminée (pas de limite fixée)"
    ],
    correct: 2,
    explanation: "40 ans (option C) est la réponse exacte, issue de la loi du 2 août 2021. Options A (5 ans) et B (10 ans) sont les distracteurs les plus courants : 5 ans correspond à la prescription de certaines actions civiles, 10 ans à d'autres délais de conservation de documents RH. L'option D est fausse : la durée est fixée à 40 ans précisément pour permettre le suivi des expositions à long terme (cancérogènes notamment).",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-qcm-002',
    type: 'qcm',
    theme: 'duerp',
    question: "Quel article du Code du travail impose spécifiquement la transcription des résultats de l'évaluation des risques dans le DUERP ?",
    answer: "Art. R4121-1",
    choices: [
      "Art. L4121-1",
      "Art. L4121-2",
      "Art. R4121-1",
      "Art. L4121-3"
    ],
    correct: 2,
    explanation: "R4121-1 (option C) est l'article réglementaire qui impose le DUERP. L4121-1 (option A) pose l'obligation générale de sécurité de l'employeur. L4121-2 (option B) liste les 9 principes généraux de prévention. L4121-3 (option D) impose la mise à jour du DUERP mais ne crée pas le document lui-même.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-qcm-003',
    type: 'qcm',
    theme: 'duerp',
    question: "Dans les entreprises de quelle taille le Papripact (programme annuel de prévention) est-il obligatoire ?",
    answer: "50 salariés et plus.",
    choices: [
      "Dès le 1er salarié",
      "11 salariés et plus",
      "50 salariés et plus.",
      "100 salariés et plus"
    ],
    correct: 2,
    explanation: "Le Papripact est obligatoire à partir de 50 salariés (option C), depuis la loi du 2 août 2021. Ne pas confondre avec le seuil de 11 salariés (option B) qui déclenche l'obligation de mise à jour annuelle du DUERP, ou le seuil de 1 salarié (option A) qui déclenche le DUERP lui-même. Le seuil de 100 salariés (option D) n'existe pas dans ce contexte.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-qcm-004',
    type: 'qcm',
    theme: 'duerp',
    question: "Quelle est la première étape d'une démarche d'évaluation des risques professionnels (EvRP) selon l'INRS ?",
    answer: "Préparer la démarche (définir le périmètre, les acteurs, les ressources).",
    choices: [
      "Identifier les risques par unité de travail",
      "Préparer la démarche (définir le périmètre, les acteurs, les ressources).",
      "Classer et hiérarchiser les risques",
      "Élaborer le plan d'actions de prévention"
    ],
    correct: 1,
    explanation: "La préparation (option B) est l'étape 1 de l'EvRP : avant d'identifier quoi que ce soit, l'entreprise doit définir qui pilote la démarche, quelles unités de travail sont concernées et avec quels outils. Identifier (option A) vient en étape 2, classer (option C) en étape 3, planifier les actions (option D) en étape 4.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-qcm-005',
    type: 'qcm',
    theme: 'duerp',
    question: "Qui est juridiquement responsable de l'élaboration du DUERP ?",
    answer: "L'employeur, quelle que soit la taille de l'entreprise.",
    choices: [
      "Le médecin du travail",
      "Le responsable HSE ou QHSE",
      "Le CSE (Comité Social et Économique)",
      "L'employeur, quelle que soit la taille de l'entreprise."
    ],
    correct: 3,
    explanation: "L'employeur (option D) est le seul responsable juridique, même s'il délègue la réalisation à un responsable HSE (option B) ou un prestataire extérieur. Le médecin du travail (option A) conseille mais ne peut pas être tenu responsable. Le CSE (option C) est consulté mais n'est pas l'auteur du DUERP.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'duerp-qcm-006',
    type: 'qcm',
    theme: 'duerp',
    question: "Parmi les situations suivantes, laquelle ne déclenche PAS obligatoirement une mise à jour du DUERP ?",
    answer: "Un changement de dirigeant de l'entreprise.",
    choices: [
      "Une décision d'aménagement importante des conditions de travail",
      "Une information nouvelle sur un risque identifié dans une unité de travail",
      "Un changement de dirigeant de l'entreprise.",
      "L'arrivée de la date anniversaire annuelle (pour les entreprises ≥ 11 salariés)"
    ],
    correct: 2,
    explanation: "Le changement de dirigeant (option C) n'est pas un déclencheur légal de mise à jour du DUERP. Les trois déclencheurs légaux sont : (1) annuellement pour les ≥ 11 salariés (option D), (2) décision d'aménagement important (option A), (3) information nouvelle sur un risque (option B). Un nouveau dirigeant devrait mettre à jour le DUERP par bonne pratique mais n'y est pas légalement contraint à ce titre.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'duerp-qcm-007',
    type: 'qcm',
    theme: 'duerp',
    question: "Le DUERP est construit autour d'une unité d'analyse. Laquelle ?",
    answer: "L'unité de travail.",
    choices: [
      "Le poste de travail individuel",
      "Le service ou département",
      "L'unité de travail.",
      "Le site ou établissement"
    ],
    correct: 2,
    explanation: "L'unité de travail (option C) est l'unité réglementaire de l'EvRP selon R4121-1. Elle peut regrouper plusieurs postes exposés aux mêmes risques. Le poste individuel (option A) est trop fin : il multiplierait inutilement les entrées. Le service (option B) et le site (option D) sont trop larges : ils masquent les risques spécifiques à chaque activité.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'duerp-qcm-008',
    type: 'qcm',
    theme: 'duerp',
    question: "La loi du 2 août 2021 a renforcé les obligations liées au DUERP. Quelle mesure phare a-t-elle introduite ?",
    answer: "Elle a étendu la conservation du DUERP à 40 ans et rendu obligatoire le Papripact dans les entreprises de 50 salariés et plus.",
    choices: [
      "Elle a créé le DUERP (avant 2021, il n'existait pas)",
      "Elle a exigé la certification ISO 45001 pour valider le DUERP",
      "Elle a étendu la conservation du DUERP à 40 ans et rendu obligatoire le Papripact dans les entreprises de 50 salariés et plus.",
      "Elle a supprimé l'obligation de mise à jour annuelle pour les PME"
    ],
    correct: 2,
    explanation: "La loi du 2 août 2021 (option C) a renforcé la conservation (40 ans) et créé le Papripact obligatoire pour les ≥ 50 salariés. Le DUERP existait depuis le décret du 5 novembre 2001 (option A est fausse). L'ISO 45001 (option B) est volontaire. La mise à jour annuelle pour les ≥ 11 salariés est maintenue (option D est fausse).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  /* =========================================================
   * THEME: principes-generaux (18 items — 10 flashcards + 8 QCM)
   * Authority: INRS demarche/principes-generaux
   * Ref: Art. L4121-2 Code du travail
   * ========================================================= */

  {
    id: 'principes-generaux-flashcard-001',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Quel article du Code du travail énumère les 9 principes généraux de prévention ?",
    answer: "L'article L4121-2 du Code du travail liste les 9 principes généraux de prévention que l'employeur doit respecter.",
    explanation: "L4121-2 (et non L4121-1 — piège courant). L4121-1 est l'obligation générale de l'employeur de protéger la santé et la sécurité des travailleurs. L4121-2 en est l'application concrète via les 9 principes. (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033019913)",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'principes-generaux-flashcard-002',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Quel est le 1er principe général de prévention selon l'article L4121-2 ?",
    answer: "Éviter les risques.",
    explanation: "Le 1er principe est la suppression du risque à la source : si le risque n'existe pas, il ne peut pas se réaliser. C'est le principe de prévention absolue, hiérarchiquement supérieur à tous les autres. Ex : supprimer une machine dangereuse plutôt que de mettre des EPI.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'principes-generaux-flashcard-003',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Citez les 9 principes généraux de prévention dans l'ordre exact de l'article L4121-2.",
    answer: "1. Éviter les risques. 2. Évaluer les risques qui ne peuvent pas être évités. 3. Combattre les risques à la source. 4. Adapter le travail à l'homme. 5. Tenir compte de l'état d'évolution de la technique. 6. Remplacer ce qui est dangereux par ce qui ne l'est pas ou l'est moins. 7. Planifier la prévention. 8. Prendre des mesures de protection collective en priorité sur la protection individuelle. 9. Donner les instructions appropriées aux travailleurs.",
    explanation: "L'ordre est exam-critique car les QCM testent la position de chaque principe. Mémo : Éviter / Évaluer / Combattre / Adapter / Technique / Remplacer / Planifier / Collectif avant individuel / Instructions. La priorité de la protection collective (principe 8) sur les EPI (principe 9) est un point clé régulièrement évalué.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'principes-generaux-flashcard-004',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Que signifie le 4e principe général de prévention 'adapter le travail à l'homme' ?",
    answer: "Le travail doit être conçu pour s'adapter aux caractéristiques physiques et cognitives de l'être humain, notamment pour réduire le travail monotone, le travail cadencé et les effets néfastes sur la santé.",
    explanation: "Ce principe traduit l'ergonomie en obligation légale. Il conduit à adapter les postes (hauteur de plan de travail, outils adaptés), les rythmes (pauses, rotations de poste) et l'organisation (autonomie, variété). Son pendant QCM : ne pas confondre avec le principe 3 (combattre à la source) ou le principe 6 (remplacer).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-flashcard-005',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Pourquoi la protection collective est-elle prioritaire sur la protection individuelle (principe 8) ?",
    answer: "La protection collective protège l'ensemble des salariés sans dépendre du comportement de chacun, alors que la protection individuelle (EPI) peut être mal utilisée ou oubliée.",
    explanation: "Exemple concret : installer une aspiration à la source (protection collective) est supérieur à distribuer des masques (EPI). Les EPI ne viennent qu'en dernier recours, quand le risque ne peut pas être réduit par des mesures collectives. Ce principe 8 est souvent testé en QCM avec une mise en situation : quelle mesure choisir en premier ?",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-flashcard-006',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Qu'est-ce que le principe de 'combattre les risques à la source' (principe 3) et comment diffère-t-il du principe 'éviter les risques' (principe 1) ?",
    answer: "Éviter (principe 1) signifie supprimer le risque en éliminant l'activité dangereuse. Combattre à la source (principe 3) signifie agir là où le risque est généré, quand il n'est pas possible de le supprimer entièrement.",
    explanation: "Exemple : principe 1 = remplacer une machine qui génère du bruit par un procédé silencieux. Principe 3 = encapsuler la source de bruit. Principe 8 = mettre des bouchons d'oreilles. La hiérarchie montre que l'on descend du plus radical (élimination) au moins radical (protection individuelle) uniquement si le niveau supérieur n'est pas réalisable.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'principes-generaux-flashcard-007',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Que couvre le principe 7 'planifier la prévention' selon L4121-2 ?",
    answer: "Le principe 7 exige d'intégrer dans la planification de la prévention l'ensemble des facteurs : technique, organisation du travail, conditions de travail, relations sociales et facteurs ambiants — y compris les risques psychosociaux (RPS) et le harcèlement.",
    explanation: "La mention explicite des RPS et du harcèlement dans ce principe est remarquable : elle intègre les risques psychosociaux dans le cadre général de la prévention, aux côtés des risques physiques. 'Planifier' signifie inscrire la prévention dans le temps (DUERP + Papripact) et dans l'organisation.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'principes-generaux-flashcard-008',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Quel est le lien entre les 9 principes généraux de prévention (L4121-2) et l'obligation générale de sécurité de l'employeur (L4121-1) ?",
    answer: "L4121-1 pose l'obligation générale de l'employeur de prendre les mesures nécessaires pour assurer la sécurité et protéger la santé des travailleurs. L4121-2 en est la déclinaison opérationnelle : les 9 principes sont les modalités concrètes pour remplir cette obligation.",
    explanation: "L4121-1 est le 'quoi' (obligation de résultat de moyen), L4121-2 est le 'comment' (les 9 principes). L'obligation de sécurité de l'employeur est une obligation de moyens renforcée depuis les arrêts 'amiante' de 2002. Le non-respect des 9 principes peut engager la responsabilité pénale de l'employeur.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-1 et L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'principes-generaux-flashcard-009',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Que signifie le principe 5 'tenir compte de l'état d'évolution de la technique' ?",
    answer: "L'employeur doit intégrer les progrès technologiques dans sa démarche de prévention : si une technique plus sûre est disponible et accessible, il doit l'adopter ou justifier pourquoi il ne le fait pas.",
    explanation: "Ce principe oblige à une veille technologique en matière de sécurité. Ex : si de nouveaux équipements de ventilation captent mieux les poussières qu'auparavant et sont accessibles sur le marché, l'employeur ne peut pas se contenter des anciens équipements en invoquant leur existence. Ce principe crée une obligation dynamique (pas figée dans le temps).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-flashcard-010',
    type: 'flashcard',
    theme: 'principes-generaux',
    question: "Quel est le principe 9, dernier de la liste de L4121-2, et pourquoi est-il en dernière position ?",
    answer: "Le principe 9 est 'donner les instructions appropriées aux travailleurs'. Il est en dernier parce qu'il représente la mesure la moins protectrice : elle repose sur le comportement humain, qui est faillible.",
    explanation: "Placer la formation et les instructions en dernier ne les rend pas négligeables — elles sont obligatoires. Mais la hiérarchie de prévention signifie qu'on ne doit pas commencer par former les travailleurs à un risque qu'on pourrait éliminer (principe 1) ou réduire à la source (principe 3). Les instructions arrivent après toutes les mesures techniques et organisationnelles.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-001',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Quel est le 3e principe général de prévention au sens de l'article L4121-2 ?",
    answer: "Combattre les risques à la source.",
    choices: [
      "Éviter les risques",
      "Évaluer les risques qui ne peuvent pas être évités",
      "Combattre les risques à la source.",
      "Adapter le travail à l'homme"
    ],
    correct: 2,
    explanation: "Ordre L4121-2 : 1-Éviter, 2-Évaluer, 3-Combattre à la source, 4-Adapter. Option A est le principe 1, option B le principe 2, option D le principe 4. Ce QCM est un classique : les 4 options sont les 4 premiers principes, mais dans un ordre mélangé.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-002',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Combien de principes généraux de prévention l'article L4121-2 du Code du travail énumère-t-il ?",
    answer: "9 principes.",
    choices: [
      "7 principes",
      "8 principes",
      "9 principes.",
      "10 principes"
    ],
    correct: 2,
    explanation: "9 principes (option C). Ne pas confondre avec les 7 principes de management de la qualité de l'ISO 9001 (option A), ni les 8 principes de l'ancienne version ISO 9001:2000 (option B). L'option D (10) n'existe pas dans ce contexte.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 1
  },

  {
    id: 'principes-generaux-qcm-003',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Selon les 9 principes généraux de prévention, quel type de protection doit être privilégié ?",
    answer: "La protection collective, qui prime sur la protection individuelle.",
    choices: [
      "La protection individuelle (EPI), car chaque salarié est responsable de sa sécurité",
      "La protection collective, qui prime sur la protection individuelle.",
      "Les deux sont équivalentes : le choix dépend du coût",
      "La formation des travailleurs, qui est le principe le plus efficace"
    ],
    correct: 1,
    explanation: "La protection collective (option B) est le principe 8 et prime sur les EPI (principe 9). L'option A est l'inverse de la règle. L'option C est fausse : la hiérarchie est réglementaire, pas économique. L'option D confond le principe 9 (instructions) avec une hiérarchie de valeur — les instructions sont le dernier recours, pas le plus efficace.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-004',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "L'article L4121-2 du Code du travail liste les 9 principes généraux de prévention. Quel article contient l'obligation générale de l'employeur de protéger la santé des travailleurs ?",
    answer: "Art. L4121-1",
    choices: [
      "Art. L4121-1",
      "Art. L4121-2",
      "Art. R4121-1",
      "Art. L4121-3"
    ],
    correct: 0,
    explanation: "L4121-1 (option A) est l'obligation générale. L4121-2 (option B) est la déclinaison en 9 principes — c'est l'objet même de la question. R4121-1 (option C) impose le DUERP. L4121-3 (option D) impose la mise à jour du DUERP. Retenir : L1 = obligation générale, L2 = 9 principes, R1 = DUERP, L3 = mise à jour.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-005',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Quelle est la bonne position du principe 'adapter le travail à l'homme' dans la liste de L4121-2 ?",
    answer: "4e principe.",
    choices: [
      "2e principe",
      "3e principe",
      "4e principe.",
      "5e principe"
    ],
    correct: 2,
    explanation: "Adapter le travail à l'homme est le 4e principe. Ordre rappel : 1-Éviter, 2-Évaluer, 3-Combattre à la source, 4-Adapter, 5-Technique. Option A (2e) = Évaluer. Option B (3e) = Combattre à la source. Option D (5e) = Tenir compte de l'évolution de la technique.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-006',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Le principe 7 'planifier la prévention' mentionne explicitement quels types de risques parmi les suivants ?",
    answer: "Les risques psychosociaux (RPS) et le harcèlement.",
    choices: [
      "Uniquement les risques physiques (bruit, chutes, TMS)",
      "Les risques chimiques et biologiques",
      "Les risques psychosociaux (RPS) et le harcèlement.",
      "Les risques environnementaux (pollution, déchets)"
    ],
    correct: 2,
    explanation: "Le texte de L4121-2 mentionne explicitement que la planification doit intégrer 'l'influence des facteurs ambiants et psychosociaux et les relations sociales' — ce qui inclut RPS et harcèlement (option C). C'est une spécificité notable : les RPS sont intégrés dans la loi de base sur la prévention, pas seulement dans des textes spécifiques. Les options A, B et D ne reflètent pas le texte de L4121-2.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },

  {
    id: 'principes-generaux-qcm-007',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Quel principe général de prévention oblige l'employeur à intégrer les progrès technologiques dans sa démarche ?",
    answer: "Principe 5 : tenir compte de l'état d'évolution de la technique.",
    choices: [
      "Principe 3 : combattre les risques à la source",
      "Principe 4 : adapter le travail à l'homme",
      "Principe 5 : tenir compte de l'état d'évolution de la technique.",
      "Principe 6 : remplacer ce qui est dangereux"
    ],
    correct: 2,
    explanation: "Le principe 5 (option C) est celui de la veille technologique en prévention : l'employeur doit adopter les solutions plus sûres rendues disponibles par l'évolution technique. Principe 3 (option A) concerne l'action à la source. Principe 4 (option B) est l'ergonomie. Principe 6 (option D) est la substitution du dangereux par le moins dangereux — proche mais distinct du principe 5.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 2
  },

  {
    id: 'principes-generaux-qcm-008',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Dans quel ordre l'article L4121-2 place-t-il ces deux principes : 'remplacer ce qui est dangereux' et 'planifier la prévention' ?",
    answer: "Remplacer (principe 6) vient avant planifier (principe 7).",
    choices: [
      "Planifier (6e) vient avant remplacer (7e)",
      "Remplacer (principe 6) vient avant planifier (principe 7).",
      "Ils sont au même rang (co-principes)",
      "Planifier est le 5e, remplacer est le 6e"
    ],
    correct: 1,
    explanation: "Ordre exact L4121-2 : 6-Remplacer, 7-Planifier (option B). Option A inverse les rangs. Option C est fausse : les principes sont numérotés et ordonnés. Option D est fausse : le 5e est 'tenir compte de l'évolution de la technique', pas planifier.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-19'
    },
    difficulty: 3
  },


  /* =========================================================
   * THEME: iso-45001 (18 items — 10 flashcards + 8 QCM)
   * Authority: Wikipédia FR (fr.wikipedia.org/wiki/ISO_45001)
   * Ref: ISO 45001:2018 + clause
   * Source URL approved at human-verify checkpoint 2026-05-19
   * ========================================================= */

  {
    id: 'iso-45001-flashcard-001',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Quelle norme ISO 45001:2018 remplace-t-elle ?",
    answer: "ISO 45001:2018 remplace OHSAS 18001 (Occupational Health and Safety Assessment Series), qui n'était pas une norme ISO mais un référentiel BSI.",
    explanation: "Piège d'examen majeur : ISO 45001 ne remplace pas une norme ISO précédente (il n'y avait pas d''ISO 18001'). OHSAS 18001 était un référentiel britannique (BSI) largement adopté comme standard de facto international. ISO 45001 est la première vraie norme internationale ISO sur la santé-sécurité au travail, publiée en mars 2018. La transition s'est effectuée sur 3 ans.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — historique et remplacement OHSAS 18001',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-flashcard-002',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "En quelle année et quel mois ISO 45001 a-t-elle été publiée ?",
    answer: "ISO 45001:2018 a été publiée en mars 2018.",
    explanation: "La date de publication (mars 2018) est un point factuel testé à l'examen. Ne pas confondre avec OHSAS 18001 (1999, révisée 2007) ni avec l'année de démarrage des travaux ISO (2013). La norme est issue d'un comité projet ISO/PC 283.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — date de publication mars 2018',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-flashcard-003',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Quelle est la structure de haut niveau (HLS) d'ISO 45001 et quels chapitres couvre-t-elle ?",
    answer: "ISO 45001 suit la High Level Structure (HLS) commune aux normes de systèmes de management ISO : §4 Contexte, §5 Leadership, §6 Planification, §7 Support, §8 Réalisation, §9 Évaluation des performances, §10 Amélioration.",
    explanation: "La HLS est identique pour ISO 9001:2015, ISO 14001:2015 et ISO 45001:2018. Elle facilite l'intégration des trois systèmes de management (SMQ + SME + SMS). Les chapitres 1 à 3 sont génériques (domaine, références normatives, termes). La structure PDCA (Planifier §6, Développer §8, Contrôler §9, Agir §10) sous-tend les §4–§10.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §4–§10 — High Level Structure',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-flashcard-004',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Que couvre le §5.4 d'ISO 45001 ?",
    answer: "Le §5.4 d'ISO 45001 porte sur la consultation et la participation des travailleurs : l'organisation doit établir, mettre en œuvre et maintenir des processus pour consulter et faire participer les travailleurs à tous les niveaux.",
    explanation: "§5.4 est une exigence clé qui distingue ISO 45001 d'OHSAS 18001 : la participation des travailleurs est explicitement requise, pas seulement leur information. Cela inclut les représentants des travailleurs. La consultation porte sur les décisions affectant la SST (objectifs, identification des dangers, évaluation des risques, contrôles opérationnels). Piège : ne pas confondre §5.4 (participation travailleurs) avec §5.1 (leadership et engagement de la direction).",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §5.4 — consultation et participation des travailleurs',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-flashcard-005',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Que couvre le §6.1.2 d'ISO 45001 ?",
    answer: "Le §6.1.2 d'ISO 45001 porte sur l'identification des dangers et l'évaluation des risques et opportunités pour la SST : l'organisation doit établir, mettre en œuvre et maintenir des processus pour identifier de manière proactive et continue les dangers.",
    explanation: "§6.1.2 est le cœur de la planification SST : identifier les dangers (hazard identification) et évaluer les risques qui en découlent. L'identification est proactive (avant l'accident) et couvre toutes les activités, situations et personnes. Différent de l'évaluation des risques professionnels français (EvRP) mais conceptuellement proche. Lien DUERP : §6.1.2 ISO 45001 est l'équivalent normatif de l'EvRP française.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §6.1.2 — identification des dangers et évaluation des risques SST',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-flashcard-006',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Quel est l'objet d'un Système de Management de la Santé et Sécurité au Travail (SMS/SMSST) conforme à ISO 45001 ?",
    answer: "Un SMSST conforme à ISO 45001 vise à prévenir les lésions corporelles et les atteintes à la santé liées au travail et à fournir des lieux de travail sûrs et sains.",
    explanation: "ISO 45001 va au-delà de la conformité réglementaire : l'objectif est d'améliorer continuellement les performances SST. Le SMSST intègre quatre dimensions : contexte de l'organisme (parties intéressées, enjeux), leadership (direction + travailleurs), planification (dangers, risques, objectifs) et support (compétences, communication, documentation).",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — objet et domaine d\'application',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-flashcard-007',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Quel apport majeur ISO 45001 introduit-elle par rapport à OHSAS 18001 concernant le contexte de l'organisme ?",
    answer: "ISO 45001 exige une analyse du contexte de l'organisme (§4) : identifier les enjeux internes et externes, les parties intéressées et leurs exigences pertinentes — ce qui n'était pas requis par OHSAS 18001.",
    explanation: "Le §4 'contexte de l'organisme' est une exigence HLS absente d'OHSAS 18001. Il oblige l'organisation à analyser son environnement (enjeux politiques, juridiques, technologiques, économiques, sociaux) et à identifier les parties intéressées pertinentes pour le SMSST (salariés, sous-traitants, riverains, autorités). Ce contexte conditionne le périmètre du SMSST.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §4 — contexte de l\'organisme',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-flashcard-008',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Comment le cycle PDCA structure-t-il ISO 45001 ?",
    answer: "Planifier (§6) → Développer/Faire (§8) → Contrôler/Vérifier (§9) → Agir/Améliorer (§10). Les §4 et §5 constituent le cadre d'ensemble (contexte et leadership).",
    explanation: "Le PDCA (Roue de Deming) est le fil conducteur de toutes les normes de systèmes de management HLS. Pour ISO 45001 : P = définir objectifs SST et planifier les actions pour les atteindre ; D = mettre en œuvre les contrôles opérationnels ; C = surveiller, mesurer, auditer ; A = traiter les non-conformités, corriger, améliorer. Le cycle s'applique à l'ensemble du SMSST et à chacune de ses composantes.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — cycle PDCA et structure §4–§10',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-flashcard-009',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Qu'est-ce qu'un 'danger' (hazard) au sens d'ISO 45001 ?",
    answer: "Un danger est une source, une situation ou un acte ayant un potentiel de dommage pour la santé et la sécurité humaines.",
    explanation: "La distinction danger/risque est fondamentale en SST : le danger est la source potentielle de dommage (ex : produit chimique corrosif, sol glissant, machine sans carter), le risque est la combinaison de la probabilité qu'un dommage survienne et de sa gravité. ISO 45001 §6.1.2 impose d'identifier les dangers avant d'évaluer les risques qu'ils génèrent.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — définition danger (hazard)',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-flashcard-010',
    type: 'flashcard',
    theme: 'iso-45001',
    question: "Quelles sont les principales exigences du §8 d'ISO 45001 concernant les contrôles opérationnels ?",
    answer: "Le §8 exige de planifier, mettre en œuvre, maîtriser et maintenir les processus nécessaires pour répondre aux exigences du SMSST, notamment gérer les changements, les activités externalisées, les achats et les entrepreneurs.",
    explanation: "Le §8 'Réalisation des activités opérationnelles' couvre : (1) planification et maîtrise opérationnelles, (2) élimination des dangers et réduction des risques SST (selon la hiérarchie des contrôles), (3) gestion des changements, (4) achats (évaluation des fournisseurs sur critères SST), (5) entrepreneurs et sous-traitants, (6) préparation et réponse aux situations d'urgence.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §8 — contrôles opérationnels',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-qcm-001',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Quel référentiel de santé-sécurité au travail, antérieur à ISO 45001:2018, a été retiré au profit de cette norme ?",
    answer: "OHSAS 18001",
    choices: [
      "ISO 18001",
      "OHSAS 18001",
      "ISO 18000",
      "OHSAS 45001"
    ],
    correct: 1,
    explanation: "OHSAS 18001 (option B) est la bonne réponse. 'ISO 18001' (option A) n'existe pas — c'est le piège classique ; ISO 45001 n'est pas la version ISO d'une norme ISO précédente puisqu'OHSAS n'était pas une norme ISO. 'ISO 18000' (option C) désigne les normes RFID, sans lien avec la SST. 'OHSAS 45001' (option D) n'existe pas.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — remplacement OHSAS 18001',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-qcm-002',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Quel paragraphe d'ISO 45001 porte spécifiquement sur la consultation et la participation des travailleurs ?",
    answer: "§5.4",
    choices: [
      "§4.2",
      "§5.1",
      "§5.4",
      "§6.1.2"
    ],
    correct: 2,
    explanation: "§5.4 (option C) est le paragraphe 'Consultation et participation des travailleurs'. §4.2 (option A) concerne la compréhension des besoins des parties intéressées. §5.1 (option B) porte sur le leadership et l'engagement de la direction. §6.1.2 (option D) traite de l'identification des dangers et évaluation des risques — c'est un distractor courant car les deux paragraphes sont exam-critiques.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §5.4 — consultation et participation des travailleurs',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-qcm-003',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Quel paragraphe d'ISO 45001 couvre l'identification des dangers et l'évaluation des risques SST ?",
    answer: "§6.1.2",
    choices: [
      "§5.4",
      "§6.1.1",
      "§6.1.2",
      "§8.1"
    ],
    correct: 2,
    explanation: "§6.1.2 (option C) est l'exigence d'identification des dangers. §5.4 (option A) porte sur la participation des travailleurs — distractor fréquent. §6.1.1 (option B) couvre les actions face aux risques et opportunités de manière générale (§6.1.2 en est le sous-paragraphe spécifique SST). §8.1 (option D) concerne les contrôles opérationnels pour maîtriser les risques identifiés.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §6.1.2 — identification des dangers et évaluation des risques SST',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-qcm-004',
    type: 'qcm',
    theme: 'iso-45001',
    question: "En quelle année ISO 45001 a-t-elle été publiée ?",
    answer: "2018",
    choices: [
      "2013",
      "2015",
      "2018",
      "2020"
    ],
    correct: 2,
    explanation: "ISO 45001 a été publiée en mars 2018 (option C). 2013 (option A) est l'année du début des travaux du comité ISO/PC 283. 2015 (option B) est l'année de publication d'ISO 9001:2015 et ISO 14001:2015 — distractor fort car les trois normes HLS sont souvent étudiées ensemble. 2020 (option D) n'a pas de signification particulière pour ISO 45001.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — date de publication mars 2018',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-45001-qcm-005',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Quelle est la principale nouveauté d'ISO 45001 par rapport à OHSAS 18001 concernant le rôle des travailleurs ?",
    answer: "ISO 45001 exige explicitement la consultation et la participation des travailleurs (§5.4), pas seulement leur information.",
    choices: [
      "ISO 45001 supprime l'obligation d'évaluation des risques pour les PME",
      "ISO 45001 exige explicitement la consultation et la participation des travailleurs (§5.4), pas seulement leur information.",
      "ISO 45001 remplace le DUERP par un document unique international",
      "ISO 45001 exige une certification obligatoire pour tous les employeurs"
    ],
    correct: 1,
    explanation: "La participation active des travailleurs (option B, §5.4) est une innovation clé d'ISO 45001 : OHSAS 18001 évoquait la consultation mais ne la rendait pas aussi centrale. Option A est fausse : l'identification des dangers reste obligatoire pour tous. Option C est fausse : ISO 45001 est une norme internationale volontaire ; le DUERP reste une obligation française autonome. Option D est fausse : la certification ISO 45001 est volontaire.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §5.4 — apport par rapport à OHSAS 18001',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-qcm-006',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Parmi les affirmations suivantes, laquelle est correcte concernant la structure d'ISO 45001 ?",
    answer: "ISO 45001 utilise la High Level Structure (HLS) commune à ISO 9001:2015 et ISO 14001:2015.",
    choices: [
      "ISO 45001 a une structure propre, incompatible avec les autres normes ISO de management",
      "ISO 45001 utilise la High Level Structure (HLS) commune à ISO 9001:2015 et ISO 14001:2015.",
      "ISO 45001 utilise la structure d'OHSAS 18001 avec des amendements mineurs",
      "La structure d'ISO 45001 comporte 12 chapitres numérotés 1 à 12"
    ],
    correct: 1,
    explanation: "La HLS (option B) est la structure commune aux trois normes — c'est précisément ce qui permet leur intégration en système de management intégré (SMI). Option A est l'opposé : la HLS garantit la compatibilité. Option C est fausse : ISO 45001 a une structure ISO entièrement reconstruite, pas un amendement d'OHSAS. Option D est fausse : la HLS couvre les chapitres 4 à 10 (les chapitres 1–3 sont introductifs, soit 10 chapitres au total, numérotés 1–10).",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — High Level Structure §4–§10',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-45001-qcm-007',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Dans le cadre d'ISO 45001, quelle est la distinction fondamentale entre 'danger' et 'risque' ?",
    answer: "Le danger est la source potentielle de dommage ; le risque est la combinaison de la probabilité qu'un dommage survienne et de sa gravité.",
    choices: [
      "Danger et risque sont synonymes dans ISO 45001",
      "Le risque est la source potentielle de dommage ; le danger est sa probabilité d'occurrence",
      "Le danger est la source potentielle de dommage ; le risque est la combinaison de la probabilité qu'un dommage survienne et de sa gravité.",
      "ISO 45001 n'utilise que le terme 'risque', pas 'danger'"
    ],
    correct: 2,
    explanation: "Danger = source, situation ou acte à potentiel de dommage (option C, première partie). Risque SST = effet combiné de la probabilité qu'un événement dangereux survienne et de la gravité des lésions ou atteintes à la santé qui pourraient en résulter (option C, deuxième partie). Option A est fausse : la distinction est précise et importante. Option B inverse les définitions. Option D est fausse : ISO 45001 utilise les deux termes avec des définitions distinctes.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 — définitions danger et risque SST',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-45001-qcm-008',
    type: 'qcm',
    theme: 'iso-45001',
    question: "Quelle est la portée du §9 d'ISO 45001 ?",
    answer: "L'évaluation des performances : surveillance, mesure, analyse, audits internes et revues de direction.",
    choices: [
      "La planification des actions face aux risques et opportunités",
      "Les contrôles opérationnels et la gestion des entrepreneurs",
      "L'évaluation des performances : surveillance, mesure, analyse, audits internes et revues de direction.",
      "L'amélioration continue et le traitement des non-conformités"
    ],
    correct: 2,
    explanation: "§9 est le 'Check' du cycle PDCA (option C) : mesurer et surveiller les performances SST, réaliser des audits internes, tenir des revues de direction. §6 (option A) est le 'Plan' (planification). §8 (option B) est le 'Do' (réalisation opérationnelle). §10 (option D) est le 'Act' (amélioration, non-conformités, actions correctives). Retenir la correspondance §6=P, §8=D, §9=C, §10=A.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 45001:2018 §9 — évaluation des performances',
      url: 'https://fr.wikipedia.org/wiki/ISO_45001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  /* =========================================================
   * THEME: iso-9001 (14 items — 8 flashcards + 6 QCM)
   * Authority: Wikipédia FR (fr.wikipedia.org/wiki/ISO_9001)
   * Ref: ISO 9001:2015 + clause
   * Source URL approved at human-verify checkpoint 2026-05-19
   * ========================================================= */

  {
    id: 'iso-9001-flashcard-001',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Combien de principes de management de la qualité la norme ISO 9001:2015 reconnaît-elle ?",
    answer: "ISO 9001:2015 s'appuie sur 7 principes de management de la qualité (définis dans ISO 9000:2015).",
    explanation: "Piège d'examen critique : l'édition ISO 9001:2000 avait 8 principes. La révision 2015 en a fusionné deux pour arriver à 7. Le nombre 8 (option de distraction) est systématiquement utilisé dans les QCM. Mémo : 7 principes en 2015, comme les 7 couleurs de l'arc-en-ciel, depuis la fusion de 'implication du personnel' et 'approche mutuelle des bénéfices'.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — 7 principes de management de la qualité (ISO 9000:2015)',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-9001-flashcard-002',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Listez les 7 principes de management de la qualité d'ISO 9001:2015.",
    answer: "1. Orientation client. 2. Leadership. 3. Implication du personnel. 4. Approche processus. 5. Amélioration. 6. Prise de décision fondée sur des preuves. 7. Management des relations avec les parties intéressées.",
    explanation: "Mémo pour les retenir : OLIA-APM (Orientation client, Leadership, Implication, Approche processus, Amélioration, Preuves, Management des relations). Par rapport aux 8 principes de 2000, deux ont été fusionnés : 'Relations mutuellement bénéfiques avec les fournisseurs' et 'Approche système' ont évolué en 'Management des relations avec les parties intéressées'. L'approche processus (principe 4) est particulièrement exam-importante.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — 7 principes de management de la qualité',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-flashcard-003',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Quelle est la structure de haut niveau (HLS) d'ISO 9001:2015 ?",
    answer: "ISO 9001:2015 suit la HLS : §4 Contexte, §5 Leadership, §6 Planification, §7 Support, §8 Réalisation des activités opérationnelles, §9 Évaluation des performances, §10 Amélioration.",
    explanation: "La HLS est commune à ISO 9001:2015, ISO 14001:2015 et ISO 45001:2018 — c'est ce qui permet d'intégrer les trois systèmes. §8 est particulièrement développé dans ISO 9001 car il couvre toute la chaîne de réalisation du produit/service (conception, achats, production, contrôle des sorties). Le cycle PDCA : §6=Planifier, §8=Faire, §9=Contrôler, §10=Agir.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §4–§10 — High Level Structure',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-flashcard-004',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Qu'est-ce que l'approche processus dans le cadre d'ISO 9001:2015 ?",
    answer: "L'approche processus consiste à comprendre et gérer les activités comme des processus interdépendants qui forment un système cohérent, permettant d'atteindre les résultats visés de façon plus efficace.",
    explanation: "L'approche processus est le 4e principe de management de la qualité et une exigence structurante d'ISO 9001. Elle requiert d'identifier les processus (leurs entrées, sorties, séquences, interactions), de les surveiller et de les maîtriser. Elle est souvent représentée par la tortue de processus (ou diagramme SIPOC). Différent de l'approche projet : les processus sont répétitifs, continus, tandis que les projets sont ponctuels.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — approche processus (principe 4)',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-flashcard-005',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Quelle innovation majeure la révision ISO 9001:2015 a-t-elle apportée par rapport à ISO 9001:2008 ?",
    answer: "ISO 9001:2015 a introduit la pensée basée sur les risques (risk-based thinking), l'analyse du contexte de l'organisme (§4) et la gestion des parties intéressées pertinentes — tous absents de la version 2008.",
    explanation: "La version 2008 était centrée sur les procédures et la documentation. La version 2015 adopte la HLS et introduit : (1) §4 contexte et parties intéressées, (2) pensée basée sur les risques intégrée dans tout le SMQ (pas un paragraphe séparé), (3) moins d'exigences documentaires prescriptives (le terme 'procédure documentée obligatoire' disparaît). La transition de 2008 à 2015 a représenté un changement de paradigme.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — innovations par rapport à ISO 9001:2008',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-flashcard-006',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Qu'est-ce que la 'satisfaction client' dans le contexte d'ISO 9001 et comment est-elle mesurée ?",
    answer: "La satisfaction client est la perception du client sur le niveau de réponse à ses exigences. ISO 9001:2015 (§9.1.2) exige que l'organisme surveille les informations relatives à la perception des clients.",
    explanation: "ISO 9001 n'impose pas de méthode spécifique de mesure : enquêtes de satisfaction, analyse des retours clients, taux de réclamations, analyse des garanties, entretiens peuvent tous servir. L'orientation client (premier des 7 principes) signifie dépasser la simple satisfaction pour anticiper les besoins futurs. La mesure de satisfaction est une entrée obligatoire de la revue de direction (§9.3).",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §9.1.2 — satisfaction client',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-flashcard-007',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Qu'est-ce que la revue de direction dans ISO 9001:2015 et que doit-elle couvrir ?",
    answer: "La revue de direction (§9.3) est une réunion périodique de la direction qui évalue l'adéquation, l'efficacité et l'alignement du SMQ avec l'orientation stratégique de l'organisme.",
    explanation: "Entrées de la revue de direction (§9.3.2) : résultats des audits internes, satisfaction client, performance des processus, non-conformités et actions correctives, résultats de la surveillance des indicateurs, enjeux externes et internes, risques et opportunités. Sorties (§9.3.3) : décisions sur les opportunités d'amélioration, besoins de changement du SMQ, besoins en ressources. La revue de direction est une exigence, pas une option.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §9.3 — revue de direction',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-9001-flashcard-008',
    type: 'flashcard',
    theme: 'iso-9001',
    question: "Comment ISO 9001:2015 définit-elle la 'non-conformité' et que doit faire l'organisme lorsqu'elle survient ?",
    answer: "Une non-conformité est le non-respect d'une exigence. Face à une non-conformité, l'organisme doit (§10.2) : maîtriser et corriger, évaluer si des actions correctives sont nécessaires, mettre en œuvre les actions, évaluer leur efficacité.",
    explanation: "§10.2 distingue correction (action immédiate sur la non-conformité) et action corrective (action sur la cause pour éviter la récurrence). L'analyse des causes est obligatoire. Les informations documentées des non-conformités et actions correctives sont des exigences de documentation explicites d'ISO 9001:2015. Lien PDCA : §10 est le 'A' (Agir) qui alimente le prochain tour du cycle.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §10.2 — non-conformité et action corrective',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-9001-qcm-001',
    type: 'qcm',
    theme: 'iso-9001',
    question: "Combien de principes de management de la qualité ISO 9001:2015 reconnaît-elle ?",
    answer: "7 principes",
    choices: [
      "5 principes",
      "8 principes",
      "7 principes",
      "9 principes"
    ],
    correct: 2,
    explanation: "7 principes (option C) depuis la révision 2015. 8 principes (option B) était le nombre dans l'ancienne version ISO 9001:2000/2008 — c'est le distractor classique. 5 principes (option A) et 9 principes (option D) n'existent pas dans ce référentiel. Ne pas confondre avec les 9 principes généraux de prévention (L4121-2) qui concernent la SST française, pas la qualité ISO.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — 7 principes de management de la qualité',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-9001-qcm-002',
    type: 'qcm',
    theme: 'iso-9001',
    question: "Quel est le 4e principe de management de la qualité selon ISO 9001:2015 ?",
    answer: "Approche processus",
    choices: [
      "Amélioration",
      "Leadership",
      "Implication du personnel",
      "Approche processus"
    ],
    correct: 3,
    explanation: "Approche processus (option D) est le 4e principe. Ordre des 7 principes : 1-Orientation client, 2-Leadership, 3-Implication du personnel, 4-Approche processus, 5-Amélioration, 6-Prise de décision fondée sur des preuves, 7-Management des relations avec les parties intéressées. Leadership (option B) est le 2e, implication du personnel (option C) est le 3e, amélioration (option A) est le 5e.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — principes de management de la qualité (ordre)',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-qcm-003',
    type: 'qcm',
    theme: 'iso-9001',
    question: "Parmi les affirmations suivantes sur ISO 9001:2015, laquelle est FAUSSE ?",
    answer: "ISO 9001:2015 a 8 principes de management de la qualité (comme la version 2000).",
    choices: [
      "ISO 9001:2015 utilise la High Level Structure (HLS) commune à ISO 14001:2015",
      "ISO 9001:2015 introduit la pensée basée sur les risques",
      "ISO 9001:2015 a 8 principes de management de la qualité (comme la version 2000).",
      "ISO 9001:2015 exige une analyse du contexte de l'organisme (§4)"
    ],
    correct: 2,
    explanation: "L'affirmation fausse est l'option C : ISO 9001:2015 a 7 principes (et non 8 — les 8 principes étaient ceux de ISO 9001:2000/2008). Les options A (HLS partagée), B (pensée basée sur les risques) et D (§4 contexte) sont toutes vraies et représentent les apports clés de la version 2015.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — 7 principes et innovations par rapport à 2008',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-qcm-004',
    type: 'qcm',
    theme: 'iso-9001',
    question: "Quel paragraphe d'ISO 9001:2015 porte sur l'évaluation de la satisfaction client ?",
    answer: "§9.1.2",
    choices: [
      "§5.1",
      "§8.2",
      "§9.1.2",
      "§10.2"
    ],
    correct: 2,
    explanation: "§9.1.2 (option C) est spécifiquement dédié à la satisfaction du client dans la section 'Évaluation des performances'. §5.1 (option A) concerne le leadership et l'engagement (orientation client y est mentionnée mais pas l'évaluation). §8.2 (option B) couvre les exigences relatives aux produits et services (écoute du marché). §10.2 (option D) est le traitement des non-conformités et actions correctives.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §9.1.2 — satisfaction du client',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-9001-qcm-005',
    type: 'qcm',
    theme: 'iso-9001',
    question: "La structure §4–§10 d'ISO 9001:2015 correspond à quel cycle de management ?",
    answer: "PDCA (Planifier – Développer – Contrôler – Agir)",
    choices: [
      "DMAIC (Define – Measure – Analyze – Improve – Control)",
      "PDCA (Planifier – Développer – Contrôler – Agir)",
      "5S (Seiri – Seiton – Seiso – Seiketsu – Shitsuke)",
      "HACCP (Hazard Analysis Critical Control Points)"
    ],
    correct: 1,
    explanation: "PDCA (option B) — §6=Planifier, §8=Développer (Faire), §9=Contrôler, §10=Agir. C'est la Roue de Deming appliquée au SMQ. DMAIC (option A) est une méthode Six Sigma (amélioration de processus) — distincte du SMQ ISO. 5S (option C) est une méthode d'organisation du poste de travail. HACCP (option D) est un système d'analyse des risques alimentaires.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 — cycle PDCA structure §4–§10',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-9001-qcm-006',
    type: 'qcm',
    theme: 'iso-9001',
    question: "Quelle est la différence entre 'correction' et 'action corrective' dans le vocabulaire ISO 9001:2015 ?",
    answer: "La correction traite la non-conformité elle-même ; l'action corrective élimine la cause pour éviter sa récurrence.",
    choices: [
      "Ce sont des synonymes dans ISO 9001:2015",
      "La correction est planifiée ; l'action corrective est immédiate",
      "La correction traite la non-conformité elle-même ; l'action corrective élimine la cause pour éviter sa récurrence.",
      "L'action corrective s'applique aux clients ; la correction s'applique aux processus internes"
    ],
    correct: 2,
    explanation: "Correction (option C, 1ère partie) = action immédiate sur l'effet (rebuter, retoucher, informer le client). Action corrective (option C, 2e partie) = analyse cause, plan d'action pour que ça ne se reproduise plus. Option A est fausse : la distinction est fondamentale dans ISO 9001. Option B inverse les définitions. Option D n'a pas de sens dans ce cadre.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 9001:2015 §10.2 — correction vs action corrective',
      url: 'https://fr.wikipedia.org/wiki/ISO_9001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  /* =========================================================
   * THEME: iso-14001 (14 items — 8 flashcards + 6 QCM)
   * Authority: Wikipédia FR (fr.wikipedia.org/wiki/ISO_14001)
   * Ref: ISO 14001:2015 + clause
   * Source URL approved at human-verify checkpoint 2026-05-19
   * ========================================================= */

  {
    id: 'iso-14001-flashcard-001',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Quel est l'objet d'un Système de Management Environnemental (SME) conforme à ISO 14001:2015 ?",
    answer: "Un SME conforme à ISO 14001:2015 permet à l'organisme de gérer ses responsabilités environnementales de façon systématique, en contribuant au pilier environnemental du développement durable.",
    explanation: "ISO 14001 est une norme volontaire — elle ne définit pas de critères de performance environnementale absolus, mais exige que l'organisme s'améliore continuellement. Elle s'applique à tout type d'organisme, quelle que sa taille ou son secteur. Le SME couvre les aspects environnementaux des activités, produits et services — pas seulement les rejets ou déchets.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — objet et Système de Management Environnemental',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'iso-14001-flashcard-002',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Que sont les 'aspects environnementaux' et les 'impacts environnementaux' dans le cadre d'ISO 14001:2015 ?",
    answer: "Un aspect environnemental est un élément des activités, produits ou services d'un organisme qui peut interagir avec l'environnement. Un impact environnemental est toute modification de l'environnement résultant d'un aspect environnemental.",
    explanation: "Relation causale : aspect → impact. Ex : consommation de solvants organiques (aspect) → émission de COV dans l'atmosphère (impact). La norme exige d'identifier les aspects environnementaux significatifs (§6.1.2) : ceux ayant ou pouvant avoir un impact significatif sur l'environnement. La significativité est évaluée selon des critères définis par l'organisme (probabilité, gravité, étendue géographique, réversibilité…).",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §6.1.2 — aspects et impacts environnementaux',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-flashcard-003',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Quelle est la structure (HLS) d'ISO 14001:2015 et comment s'articule-t-elle avec le cycle PDCA ?",
    answer: "ISO 14001:2015 suit la HLS §4–§10. PDCA : §6=Planifier (politique, aspects, objectifs), §8=Faire (contrôles opérationnels), §9=Contrôler (audits, revue), §10=Agir (amélioration).",
    explanation: "La HLS commune à ISO 9001:2015 et ISO 45001:2018 facilite le SMI (Système de Management Intégré). §4 contexte et parties intéressées — exigence nouvelle en 2015 absente de la version 2004. §5 leadership — engagement de la direction requis explicitement. §6 planification — aspects significatifs, obligations de conformité, objectifs. §7 support — ressources, compétences, sensibilisation, communication, documentation.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §4–§10 — High Level Structure et PDCA',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-flashcard-004',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Qu'est-ce qu'une 'obligation de conformité' dans ISO 14001:2015 ?",
    answer: "Une obligation de conformité est une exigence légale ou une autre exigence qu'un organisme doit respecter ou choisit de respecter en matière environnementale (§6.1.3).",
    explanation: "Les obligations de conformité couvrent : (1) les exigences légales (lois, réglementations, autorisations ICPE…), et (2) les autres exigences (engagements volontaires, exigences des parties intéressées, codes de bonne pratique acceptés). L'organisme doit déterminer comment ces obligations s'appliquent à ses aspects environnementaux et les intégrer dans son SME. Lien ICPE : les prescriptions des arrêtés préfectoraux sont des obligations de conformité.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §6.1.3 — obligations de conformité',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-flashcard-005',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Quelle innovation majeure ISO 14001:2015 a-t-elle apportée par rapport à ISO 14001:2004 ?",
    answer: "ISO 14001:2015 a introduit la HLS, l'analyse du contexte de l'organisme (§4), la gestion du cycle de vie, la vision stratégique du management environnemental et une plus grande intégration du leadership de la direction.",
    explanation: "ISO 14001:2004 était plus prescriptive et moins stratégique. Les apports 2015 : (1) §4 contexte (enjeux internes/externes, parties intéressées), (2) perspective cycle de vie (prise en compte des impacts en amont et aval de l'activité), (3) leadership renforcé (§5 — la direction ne peut plus déléguer la responsabilité à un 'représentant de la direction' isolé). La perspective cycle de vie est une nouveauté 2015 absente de la version 2004.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — apports par rapport à ISO 14001:2004',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-flashcard-006',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Qu'est-ce que la 'perspective de cycle de vie' introduite par ISO 14001:2015 ?",
    answer: "La perspective de cycle de vie exige que l'organisme considère les aspects environnementaux de ses produits et services de l'extraction des matières premières jusqu'à la fin de vie (élimination).",
    explanation: "Cela ne demande pas une analyse de cycle de vie (ACV) formelle à toutes les entreprises. Mais l'organisme doit tenir compte des phases amont (fournisseurs, achats) et aval (utilisation par le client, fin de vie du produit) de ses activités. Exemple : un fabricant de batteries doit considérer l'extraction du lithium et le recyclage en fin de vie, pas seulement la fabrication. Exigences spécifiques : contrôle des prestations externalisées et communication des exigences environnementales aux fournisseurs.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — perspective de cycle de vie',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-14001-flashcard-007',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Qu'est-ce que l'audit interne dans le cadre d'ISO 14001:2015 (§9.2) ?",
    answer: "L'audit interne est un processus systématique, indépendant et documenté permettant d'obtenir des preuves d'audit et de les évaluer objectivement pour déterminer dans quelle mesure les critères d'audit sont satisfaits.",
    explanation: "Exigences de l'audit interne ISO 14001 §9.2 : planifier, établir, mettre en œuvre et maintenir un programme d'audit. Les auditeurs ne doivent pas auditer leur propre travail (indépendance). Les résultats sont rapportés à la direction. L'audit interne diffère de l'audit tierce partie (certification) : il est réalisé par l'organisme lui-même ou pour son compte. Il alimente la revue de direction.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §9.2 — audit interne',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-flashcard-008',
    type: 'flashcard',
    theme: 'iso-14001',
    question: "Quel est le lien entre ISO 14001:2015 et la réglementation ICPE en France ?",
    answer: "ISO 14001 est une norme volontaire qui peut coexister avec les obligations ICPE (réglementation d'autorisation administrative). La certification ISO 14001 ne dispense pas des obligations ICPE mais peut démontrer une démarche volontaire aux autorités.",
    explanation: "Les ICPE (art. L511-1 Code de l'environnement) sont des obligations réglementaires administrées par la DREAL. ISO 14001 est une certification volontaire auprès d'un organisme accrédité. Complémentarité : un site ICPE soumis à autorisation peut être certifié ISO 14001 ; la norme couvre la démarche systématique de management, la réglementation fixe les seuils et prescriptions techniques. Les obligations de conformité de la norme (§6.1.3) incluent les arrêtés préfectoraux ICPE.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — relation avec les réglementations environnementales',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'iso-14001-qcm-001',
    type: 'qcm',
    theme: 'iso-14001',
    question: "Dans le cadre d'ISO 14001:2015, quelle est la relation entre 'aspect environnemental' et 'impact environnemental' ?",
    answer: "L'aspect est la cause (élément de l'activité) ; l'impact est l'effet (modification de l'environnement).",
    choices: [
      "Ce sont des synonymes dans ISO 14001",
      "L'impact est la cause ; l'aspect est l'effet mesuré",
      "L'aspect est la cause (élément de l'activité) ; l'impact est l'effet (modification de l'environnement).",
      "L'aspect se mesure ; l'impact se gère"
    ],
    correct: 2,
    explanation: "Aspect → Impact (option C) : l'aspect est l'interface entre l'activité et l'environnement ; l'impact est ce qui se passe dans l'environnement en conséquence. Ex : consommation d'eau (aspect) → réduction des ressources en eau locale (impact). Option A est fausse : les deux termes sont distincts. Option B inverse la relation. Option D n'a pas de sens normatif.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §6.1.2 — aspects et impacts environnementaux',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-qcm-002',
    type: 'qcm',
    theme: 'iso-14001',
    question: "Parmi les normes suivantes, lesquelles partagent la High Level Structure (HLS) avec ISO 14001:2015 ?",
    answer: "ISO 9001:2015 et ISO 45001:2018",
    choices: [
      "ISO 14001:2004 et ISO 9001:2000",
      "ISO 9001:2015 et ISO 45001:2018",
      "OHSAS 18001 et ISO 9001:2015",
      "ISO 14001:2015 est la seule norme utilisant la HLS"
    ],
    correct: 1,
    explanation: "ISO 9001:2015 et ISO 45001:2018 (option B) partagent la HLS — c'est le fondement du SMI (Système de Management Intégré). ISO 14001:2004 (option A) utilisait une structure différente (l'ancienne annex SL n'existait pas). OHSAS 18001 (option C) n'est pas une norme ISO et ne suit pas la HLS. Option D est fausse : de nombreuses normes ISO utilisent maintenant la HLS.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — High Level Structure commune ISO 9001 ISO 45001',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-qcm-003',
    type: 'qcm',
    theme: 'iso-14001',
    question: "Dans ISO 14001:2015, que recouvre la notion d'« obligation de conformité » (compliance obligation) ?",
    answer: "Toute exigence légale ou autre exigence que l'organisme doit ou choisit de respecter en matière environnementale.",
    choices: [
      "Uniquement les lois et règlements environnementaux obligatoires",
      "Les objectifs chiffrés de performance environnementale de l'organisme",
      "Toute exigence légale ou autre exigence que l'organisme doit ou choisit de respecter en matière environnementale.",
      "Les certifications ISO obligatoires pour opérer dans un secteur réglementé"
    ],
    correct: 2,
    explanation: "L'obligation de conformité (option C, §6.1.3) couvre DEUX catégories : (1) les exigences légales (lois, règlements, arrêtés — obligatoires), ET (2) les autres exigences que l'organisme choisit de respecter (engagements volontaires, codes de bonne pratique). Option A est trop restrictive : elle oublie les exigences volontaires. Option B décrit les objectifs (§6.2), pas les obligations. Option D n'a pas de sens dans ce cadre.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §6.1.3 — obligations de conformité',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-qcm-004',
    type: 'qcm',
    theme: 'iso-14001',
    question: "Quelle nouveauté ISO 14001:2015 a-t-elle introduite par rapport à ISO 14001:2004 concernant les produits et services ?",
    answer: "La perspective de cycle de vie : l'organisme doit considérer les aspects environnementaux de l'extraction des matières premières jusqu'à la fin de vie.",
    choices: [
      "L'obligation de réaliser une Analyse de Cycle de Vie (ACV) formelle pour tous les produits",
      "L'interdiction de toute activité à impact environnemental non nul",
      "La perspective de cycle de vie : l'organisme doit considérer les aspects environnementaux de l'extraction des matières premières jusqu'à la fin de vie.",
      "L'obligation de certification ISO 14001 pour les sous-traitants"
    ],
    correct: 2,
    explanation: "La perspective de cycle de vie (option C) est une innovation 2015 : l'organisme doit prendre en compte les phases amont (fournisseurs, extraction) et aval (utilisation, fin de vie) sans forcément réaliser une ACV formelle. Option A est fausse : ISO 14001 ne requiert pas une ACV formelle. Option B est absurde : toute activité humaine a un impact. Option D est fausse : ISO 14001 encourage la communication des exigences aux fournisseurs mais n'impose pas leur certification.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — perspective de cycle de vie (innovation par rapport à 2004)',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-qcm-005',
    type: 'qcm',
    theme: 'iso-14001',
    question: "Dans la structure HLS d'ISO 14001:2015, quel paragraphe couvre l'identification des aspects environnementaux significatifs ?",
    answer: "§6.1.2",
    choices: [
      "§4.1",
      "§5.2",
      "§6.1.2",
      "§8.1"
    ],
    correct: 2,
    explanation: "§6.1.2 (option C) est 'Aspects environnementaux' dans la section Planification — l'organisme y identifie ses aspects et détermine ceux qui sont significatifs. §4.1 (option A) est le contexte de l'organisme (enjeux internes/externes). §5.2 (option B) est la politique environnementale. §8.1 (option D) est la maîtrise opérationnelle des aspects significatifs — en aval de leur identification en §6.1.2.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 §6.1.2 — aspects environnementaux significatifs',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'iso-14001-qcm-006',
    type: 'qcm',
    theme: 'iso-14001',
    question: "ISO 14001:2015 est-elle une norme obligatoire ou volontaire, et que certifie-t-elle ?",
    answer: "Volontaire. Elle certifie le système de management environnemental (la démarche), pas un niveau de performance environnementale absolue.",
    choices: [
      "Obligatoire pour les sites ICPE soumis à autorisation",
      "Volontaire, mais elle certifie un niveau minimal de performance environnementale",
      "Volontaire. Elle certifie le système de management environnemental (la démarche), pas un niveau de performance environnementale absolue.",
      "Obligatoire pour les entreprises de plus de 500 salariés depuis 2020"
    ],
    correct: 2,
    explanation: "ISO 14001 est volontaire (option C) et certifie la mise en place d'un système de management (processus, documentation, amélioration continue) — pas l'atteinte de seuils de performance absolus. Option A est fausse : les ICPE ont des obligations réglementaires autonomes, ISO 14001 est complémentaire mais non obligatoire. Option B : ISO 14001 exige l'amélioration continue des performances mais ne fixe pas de niveau absolu. Option D est inventée.",
    source: {
      authority: 'Wikipédia FR',
      ref: 'ISO 14001:2015 — norme volontaire, certification du SME',
      url: 'https://fr.wikipedia.org/wiki/ISO_14001',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  /* =========================================================
   * THEME: tms (14 items — 8 flashcards + 6 QCM)
   * Authority: INRS risques/tms + ameli risques-pro
   * Ref: statistiques INRS/ameli — 1ère maladie professionnelle
   * ========================================================= */

  {
    id: 'tms-flashcard-001',
    type: 'flashcard',
    theme: 'tms',
    question: "Quelle place occupent les TMS parmi les maladies professionnelles reconnues en France ?",
    answer: "Les TMS représentent environ 88 % des maladies professionnelles reconnues (source ameli 2024) et plus de 80 % selon l'INRS. Ils constituent la 1ère cause de maladie professionnelle indemnisée.",
    explanation: "Ce chiffre varie légèrement selon la source (88 % ameli / >80 % INRS) mais le message exam est le même : les TMS dominent très largement les maladies professionnelles, devant les maladies liées aux agents chimiques (~10 %). Retenir : 1ère maladie professionnelle reconnue = TMS.",
    source: {
      authority: 'Assurance Maladie - ameli',
      ref: 'INRS - statistiques TMS',
      url: 'https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'tms-flashcard-002',
    type: 'flashcard',
    theme: 'tms',
    question: "Quelles sont les 3 catégories de facteurs de risque de TMS ?",
    answer: "Les 3 catégories de facteurs de risque TMS sont : (1) biomécaniques (gestes répétitifs, postures contraignantes, efforts excessifs), (2) psychosociaux (stress, manque d'autonomie, pression temporelle), (3) environnementaux (froid, vibrations, mauvais éclairage).",
    explanation: "Cette trilogie est la grille de lecture standard INRS. Les facteurs biomécaniques sont les plus visibles (les mouvements) mais les facteurs psychosociaux sont tout aussi importants — un salarié stressé contracte davantage ses muscles. Les facteurs environnementaux potentialisent les deux autres. Piège : confondre 'facteurs psychosociaux' du risque TMS avec les RPS (deux choses distinctes).",
    source: {
      authority: 'INRS',
      ref: 'INRS - facteurs de risque TMS',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-flashcard-003',
    type: 'flashcard',
    theme: 'tms',
    question: "Que signifie l'acronyme PRAP et quel est son objet ?",
    answer: "PRAP = Prévention des Risques liés à l'Activité Physique. C'est un programme de formation qui vise à réduire les risques de TMS et d'accidents liés aux manutentions manuelles en formant les salariés à analyser et améliorer leurs gestes et postures.",
    explanation: "PRAP est une formation certifiante INRS (opérateurs PRAP, formateurs PRAP). Elle ne se limite pas à la manutention lourde : elle couvre tous les gestes contraignants, y compris les petits mouvements répétitifs. À distinguer de PRAP IBC (Industries, services et commerce de Proximité et Bureau) et PRAP 2S (Sanitaire et Social) — deux déclinaisons sectorielles.",
    source: {
      authority: 'INRS',
      ref: 'INRS - programme PRAP',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'tms-flashcard-004',
    type: 'flashcard',
    theme: 'tms',
    question: "Quelles régions anatomiques sont principalement touchées par les TMS ?",
    answer: "Les membres supérieurs sont principalement touchés : épaule (coiffe des rotateurs), coude (épicondylite), poignet/main (syndrome du canal carpien). Le rachis (lombalgies) et les membres inférieurs sont également concernés.",
    explanation: "Le syndrome du canal carpien (compression du nerf médian au poignet) est la TMS la plus fréquemment reconnue en maladie professionnelle. L'épaule (tendinites de la coiffe des rotateurs) est la TMS la plus grave en termes d'arrêts de travail. Le rachis (lombalgies) donne davantage lieu à AT qu'à MP car la lombalgie est difficile à rattacher à un seul employeur.",
    source: {
      authority: 'INRS',
      ref: 'INRS - statistiques TMS',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-flashcard-005',
    type: 'flashcard',
    theme: 'tms',
    question: "Quelles sont les 4 étapes du programme TMS-Pros de l'Assurance Maladie ?",
    answer: "TMS-Pros = programme Assurance Maladie en 4 étapes : (1) Mobiliser, (2) Investiguer, (3) Maîtriser, (4) Évaluer.",
    explanation: "TMS-Pros accompagne les entreprises ayant une sinistralité TMS élevée. Étape 1 : constitution d'un groupe de travail pluridisciplinaire (mobiliser). Étape 2 : analyse des situations de travail via observations et questionnaires (investiguer). Étape 3 : mise en œuvre des actions correctives techniques et organisationnelles (maîtriser). Étape 4 : mesure de l'efficacité des actions (évaluer). C'est un PDCA appliqué aux TMS.",
    source: {
      authority: 'Assurance Maladie - ameli',
      ref: 'Programme TMS-Pros — Assurance Maladie',
      url: 'https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-flashcard-006',
    type: 'flashcard',
    theme: 'tms',
    question: "Quelle est la différence entre AT (accident du travail) et MP (maladie professionnelle) dans le contexte TMS ?",
    answer: "Un AT est un événement soudain survenu par le fait ou à l'occasion du travail (ex. : chute, effort brutal). Une MP est une affection contractée progressivement et listée dans les tableaux de MP (ex. : tableau 57 pour les TMS des membres supérieurs). Les TMS sont quasi exclusivement des MP, pas des AT.",
    explanation: "Le tableau 57 des maladies professionnelles (régime général) liste les affections périarticulaires provoquées par certains gestes et postures. C'est le tableau le plus sollicité en France. La reconnaissance en MP ouvre droit à une indemnisation majorée (IPP, rente) par rapport à l'AT. Enjeu employeur : contribuer à la sinistralité MP augmente le taux de cotisation AT/MP.",
    source: {
      authority: 'INRS',
      ref: 'Tableaux MP — tableau 57',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-flashcard-007',
    type: 'flashcard',
    theme: 'tms',
    question: "Quels sont les principes de la démarche de prévention TMS préconisée par l'INRS ?",
    answer: "La prévention TMS repose sur une démarche collective centrée sur le travail réel : analyser les situations de travail (observations, questionnaires), identifier les facteurs de risque, concevoir des solutions techniques et organisationnelles, mettre en œuvre et évaluer. La prévention individuelle (gestes et postures) ne suffit pas seule.",
    explanation: "Point clé exam : la prévention TMS efficace est collective et organisationnelle — elle n'est pas réduite à la 'formation gestes et postures' individuelle. L'INRS insiste sur la conception des postes (ergonomie) et l'organisation du travail (rotation, pauses, cadences). La démarche s'intègre dans le DUERP et s'appuie sur les résultats de l'évaluation des risques.",
    source: {
      authority: 'INRS',
      ref: 'INRS - démarche de prévention TMS',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'tms-flashcard-008',
    type: 'flashcard',
    theme: 'tms',
    question: "Dans quels secteurs professionnels les TMS sont-ils les plus fréquents ?",
    answer: "Les TMS sont particulièrement fréquents dans les secteurs suivants : agroalimentaire, bâtiment/travaux publics, commerce/grande distribution, santé/action sociale (aide à domicile, EHPAD), et industrie manufacturière.",
    explanation: "Ces secteurs cumulent les facteurs biomécaniques (gestes répétitifs à cadence élevée dans l'agroalimentaire, port de charges dans le BTP et le soin) et les facteurs psychosociaux (pression de temps, faible autonomie). Le taux de TMS dans l'agroalimentaire est parmi les plus élevés de tous les secteurs. À retenir pour les QCM : le secteur agricole et le travail sur écran sont également touchés.",
    source: {
      authority: 'INRS',
      ref: 'INRS - statistiques TMS par secteur',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-qcm-001',
    type: 'qcm',
    theme: 'tms',
    question: "Selon l'Assurance Maladie (ameli 2024), quelle proportion des maladies professionnelles reconnues en France sont des TMS ?",
    answer: "Environ 88 %.",
    choices: [
      "Environ 50 %",
      "Environ 70 %",
      "Environ 88 %.",
      "Environ 95 %"
    ],
    correct: 2,
    explanation: "La réponse exacte est environ 88 % (ameli 2024). L'INRS cite >80 %, les deux sources convergent pour faire des TMS la 1ère maladie professionnelle de très loin. Option A (50 %) et D (95 %) sont écartées par le bon sens. Option B (70 %) est le piège le plus fréquent — certains retiennent 'plus des deux tiers' et atterrissent sur 70 %. Memoriser 88 % (ameli) ou >80 % (INRS) selon la source citée en cours.",
    source: {
      authority: 'Assurance Maladie - ameli',
      ref: 'INRS - statistiques TMS',
      url: 'https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'tms-qcm-002',
    type: 'qcm',
    theme: 'tms',
    question: "Parmi les propositions suivantes, laquelle décrit correctement le programme TMS-Pros de l'Assurance Maladie ?",
    answer: "Un programme en 4 étapes (Mobiliser, Investiguer, Maîtriser, Évaluer) accompagnant les entreprises à forte sinistralité TMS.",
    choices: [
      "Une formation gestes et postures certifiante dispensée par l'INRS (PRAP)",
      "Un programme en 4 étapes (Mobiliser, Investiguer, Maîtriser, Évaluer) accompagnant les entreprises à forte sinistralité TMS.",
      "Un tableau de maladies professionnelles (tableau 57) couvrant les affections périarticulaires",
      "Un questionnaire d'évaluation des risques psychosociaux utilisé dans le DUERP"
    ],
    correct: 1,
    explanation: "TMS-Pros est un programme Assurance Maladie (option B). Option A décrit PRAP (formation INRS — distincte). Option C décrit le tableau 57 MP (instrument de reconnaissance, pas un programme de prévention). Option D décrit le questionnaire RPS-DU (INRS — thème RPS, pas TMS). Confusion fréquente : TMS-Pros (AM) vs PRAP (INRS) — deux outils complémentaires mais distincts.",
    source: {
      authority: 'Assurance Maladie - ameli',
      ref: 'Programme TMS-Pros — Assurance Maladie',
      url: 'https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-qcm-003',
    type: 'qcm',
    theme: 'tms',
    question: "Quelles sont les 3 catégories de facteurs de risque TMS selon l'INRS ?",
    answer: "Biomécaniques, psychosociaux et environnementaux.",
    choices: [
      "Physiques, chimiques et biologiques",
      "Organisationnels, relationnels et techniques",
      "Biomécaniques, psychosociaux et environnementaux.",
      "Ergonomiques, médicaux et comportementaux"
    ],
    correct: 2,
    explanation: "La trilogie INRS est biomécaniques / psychosociaux / environnementaux (option C). Option A regroupe les 3 grandes familles de risques professionnels en général (pas spécifiques aux TMS). Option B est une formulation plausible mais non standardisée — 'organisationnel' est un sous-ensemble du facteur psychosocial TMS. Option D 'médicaux' n'est pas une catégorie INRS.",
    source: {
      authority: 'INRS',
      ref: 'INRS - facteurs de risque TMS',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'tms-qcm-004',
    type: 'qcm',
    theme: 'tms',
    question: "Que signifie PRAP dans le domaine de la prévention des TMS ?",
    answer: "Prévention des Risques liés à l'Activité Physique.",
    choices: [
      "Programme de Réduction des Accidents Professionnels",
      "Plan de Réhabilitation des Agents Publics",
      "Prévention des Risques liés à l'Activité Physique.",
      "Protocole de Reclassement des Agents à Pathologies"
    ],
    correct: 2,
    explanation: "PRAP = Prévention des Risques liés à l'Activité Physique (option C). Les options A, B et D sont des acronymes inventés — ils n'existent pas dans le référentiel QHSE. PRAP est une formation certifiante INRS qui forme les salariés à analyser leurs propres gestes et postures pour réduire les TMS. À distinguer de TMS-Pros (programme AM) et de SST (Sauveteur Secouriste du Travail).",
    source: {
      authority: 'INRS',
      ref: 'INRS - programme PRAP',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'tms-qcm-005',
    type: 'qcm',
    theme: 'tms',
    question: "Quelle TMS est la plus fréquemment reconnue en maladie professionnelle en France ?",
    answer: "Le syndrome du canal carpien (compression du nerf médian au poignet).",
    choices: [
      "L'épicondylite latérale (tennis elbow)",
      "Les tendinites de la coiffe des rotateurs (épaule)",
      "Le syndrome du canal carpien (compression du nerf médian au poignet).",
      "La hernie discale lombaire (rachis)"
    ],
    correct: 2,
    explanation: "Le syndrome du canal carpien (option C) est la TMS la plus fréquemment reconnue en MP (tableau 57 B du régime général). L'épicondylite (option A, tableau 57 C) est fréquente mais moins que le canal carpien. Les tendinites de la coiffe des rotateurs (option B) génèrent davantage d'arrêts de travail mais sont moins souvent reconnues en MP. La hernie discale lombaire (option D) relève plus de l'AT que de la MP dans la classification.",
    source: {
      authority: 'INRS',
      ref: 'Tableau MP 57 — affections périarticulaires',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'tms-qcm-006',
    type: 'qcm',
    theme: 'tms',
    question: "Quelle affirmation sur la prévention des TMS est correcte selon l'INRS ?",
    answer: "La prévention des TMS est avant tout collective et organisationnelle ; la formation aux gestes et postures ne suffit pas seule.",
    choices: [
      "La formation aux gestes et postures individuels est la mesure la plus efficace pour prévenir les TMS",
      "Les TMS ne pouvant pas être évités dans certains secteurs, la prévention se limite à la surveillance médicale",
      "La prévention des TMS est avant tout collective et organisationnelle ; la formation aux gestes et postures ne suffit pas seule.",
      "La prévention des TMS repose uniquement sur l'amélioration du matériel (outillage, port de charges)"
    ],
    correct: 2,
    explanation: "L'option C reflète la position INRS : prévention collective et organisationnelle en priorité (conception des postes, organisation du travail, rotation des tâches), complétée par la formation individuelle. Option A est le piège classique : la 'formation gestes et postures' seule est insuffisante et peut même donner une fausse impression de maîtrise du risque. Option B est fausse — l'INRS ne préconise pas la fatalité. Option D est réductrice : le matériel est important mais pas suffisant sans action organisationnelle.",
    source: {
      authority: 'INRS',
      ref: 'INRS - démarche de prévention TMS',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  /* =========================================================
   * THEME: risque-routier (12 items — 7 flashcards + 5 QCM)
   * Authority: INRS risques/routiers
   * Ref: statistiques ONISR — ~30 % des AT mortels
   * ========================================================= */

  {
    id: 'risque-routier-flashcard-001',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quelle proportion des accidents du travail mortels le risque routier professionnel représente-t-il en France ?",
    answer: "Le risque routier professionnel (mission + trajet) représente environ 30 % des accidents du travail mortels. C'est la 1ère cause de mortalité au travail.",
    explanation: "~30 % des AT mortels = stat exam incontournable. Ce chiffre additionne les accidents de mission (conduite dans le cadre d'une mission pro) et les accidents de trajet (domicile ↔ travail). Les accidents de trajet ne sont techniquement pas des 'accidents du travail' au sens strict, mais sont couverts par la législation AT/MP. Piège : ne retenir que les accidents de mission en oubliant le trajet.",
    source: {
      authority: 'INRS',
      ref: 'INRS - statistiques accidents routiers du travail',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-routier-flashcard-002',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quelle est la distinction entre risque routier de mission et risque routier de trajet ?",
    answer: "Risque routier de mission : conduite d'un véhicule dans le cadre d'une mission professionnelle (visites clients, déplacements inter-sites). Risque routier de trajet : déplacement entre le domicile et le lieu de travail (aller-retour quotidien).",
    explanation: "Cette distinction est fondamentale pour la couverture AT/MP : accident de mission = accident du travail (couverture totale, présomption d'imputabilité). Accident de trajet = couverture AT/MP spécifique, légèrement différente (pas d'indemnisation journalière à 100% dès J1 de la même façon). Les deux types doivent figurer dans le DUERP. Piège exam : confondre les régimes d'indemnisation ou inclure le trajet dans 'accident du travail stricto sensu'.",
    source: {
      authority: 'INRS',
      ref: 'Art. L411-1 et L411-2 Code de la Sécurité Sociale',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-flashcard-003',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quels sont les 3 axes de prévention du risque routier professionnel selon l'INRS ?",
    answer: "Les 3 axes de prévention du risque routier sont : (1) organisation du travail et des déplacements, (2) ressources (véhicules, télécommunications, équipements), (3) compétences (recrutement, formation, sensibilisation).",
    explanation: "Axe 1 — Organisation : planifier les déplacements pour éviter la conduite en état de fatigue ou sous pression temporelle, favoriser les alternatives (visioconférence, covoiturage, transport en commun). Axe 2 — Ressources : état et choix des véhicules, politique téléphone au volant, GPS, EPI. Axe 3 — Compétences : formation à la conduite préventive (éco-conduite, conduite en conditions difficiles), bilan de conduite. Ces 3 axes s'intègrent dans la politique de prévention et le DUERP.",
    source: {
      authority: 'INRS',
      ref: 'INRS - prévention risque routier',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-flashcard-004',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Pourquoi le risque routier professionnel doit-il obligatoirement figurer dans le DUERP ?",
    answer: "Parce que l'employeur a une obligation générale d'évaluation de tous les risques professionnels (Art. R4121-1). Les déplacements professionnels (mission et, pour la politique de prévention, le trajet) sont des activités de travail exposant les salariés — ils doivent être évalués et des mesures de prévention planifiées.",
    explanation: "L'intégration du risque routier dans le DUERP est une application directe de l'obligation d'évaluation des risques. En pratique, cela signifie identifier les postes exposés (représentants, techniciens itinérants, livreurs), analyser les déplacements, et prévoir des actions (axe organisation/ressources/compétences). L'absence du risque routier dans un DUERP d'une entreprise avec des déplacements fréquents est une non-conformité réglementaire.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail — DUERP',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-flashcard-005',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quels sont les principaux facteurs de risque d'accident routier professionnel ?",
    answer: "Les principaux facteurs de risque sont : la vitesse excessive, la fatigue (conducteur), l'usage du téléphone au volant, l'alcool/drogues, les conditions météo/route, et les facteurs organisationnels (pression du temps, horaires décalés, kilométrage annuel élevé).",
    explanation: "Les facteurs organisationnels sont spécifiques au risque routier professionnel : un salarié qui conduit parce que l'employeur impose une réunion lointaine à 8h sans tenir compte du trajet, ou qui conduit fatigué après une longue journée de travail. L'employeur ne peut pas contrôler tous les comportements individuels, mais peut agir sur les facteurs organisationnels (planification, alternatives).",
    source: {
      authority: 'INRS',
      ref: 'INRS - facteurs de risque routier professionnel',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-flashcard-006',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quelle est la démarche de prévention du risque routier recommandée par l'INRS pour une entreprise ?",
    answer: "La démarche comprend : (1) obtenir l'engagement de la direction, (2) constituer un groupe de travail (conducteurs, encadrement, préventeur), (3) établir un diagnostic (kilométrage, sinistralité, enquêtes conducteurs), (4) définir un plan d'action sur les 3 axes (organisation/ressources/compétences), (5) évaluer les résultats.",
    explanation: "Cette démarche suit la logique PDCA (Plan-Do-Check-Act) appliquée au risque routier. La spécificité par rapport à d'autres risques : le risque se produit hors de l'entreprise et implique des véhicules qui sont souvent la propriété du salarié (véhicules personnels en mission). L'INRS propose des outils : Bilan de Conduite, analyse des sinistres, simulateurs.",
    source: {
      authority: 'INRS',
      ref: 'INRS - démarche prévention risque routier',
      url: 'https://www.inrs.fr/risques/routiers/demarche-prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'risque-routier-flashcard-007',
    type: 'flashcard',
    theme: 'risque-routier',
    question: "Quel outil de prévention l'INRS recommande-t-il pour identifier les marges d'amélioration de la conduite d'un salarié ?",
    answer: "Le Bilan de Conduite (ou formation à la conduite préventive) permet d'identifier les comportements à risque d'un conducteur et de définir des actions correctives personnalisées.",
    explanation: "Le Bilan de Conduite est différent du permis de conduire ou d'un stage de récupération de points : c'est un outil préventif utilisé en entreprise pour former les conducteurs professionnels (commerciaux itinérants, chauffeurs). Il analyse les comportements en situation réelle de conduite. L'éco-conduite est un bénéfice connexe (réduction de consommation). L'INRS propose également des simulateurs de conduite pour certains secteurs.",
    source: {
      authority: 'INRS',
      ref: 'INRS - formation conduite préventive',
      url: 'https://www.inrs.fr/risques/routiers/demarche-prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'risque-routier-qcm-001',
    type: 'qcm',
    theme: 'risque-routier',
    question: "Quelle proportion des accidents du travail mortels le risque routier professionnel (mission + trajet) représente-t-il en France ?",
    answer: "Environ 30 %.",
    choices: [
      "Environ 10 %",
      "Environ 20 %",
      "Environ 30 %.",
      "Environ 50 %"
    ],
    correct: 2,
    explanation: "~30 % (option C) est la statistique INRS/ONISR de référence pour l'examen. Option A (10 %) est trop basse — elle sous-estime l'ampleur du risque routier. Option B (20 %) est un piège plausible. Option D (50 %) est trop haute. Le risque routier est la 1ère cause de mortalité au travail en France, devant les chutes de hauteur. Retenir : '1 mort au travail sur 3 est lié à la route'.",
    source: {
      authority: 'INRS',
      ref: 'INRS - statistiques accidents routiers du travail',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-routier-qcm-002',
    type: 'qcm',
    theme: 'risque-routier',
    question: "Un salarié se blesse dans un accident de voiture pendant un trajet domicile-travail. De quelle catégorie relève cet accident ?",
    answer: "Accident de trajet, couvert par la législation AT/MP mais distinct de l'accident du travail stricto sensu.",
    choices: [
      "Accident du travail (AT) stricto sensu, couvert exactement comme un accident survenu sur le lieu de travail",
      "Accident de mission, car le salarié se déplace pour rejoindre son employeur",
      "Accident de trajet, couvert par la législation AT/MP mais distinct de l'accident du travail stricto sensu.",
      "Accident privé, non couvert par la législation professionnelle"
    ],
    correct: 2,
    explanation: "Option C est correcte : le trajet domicile-travail relève de l'accident de trajet (Art. L411-2 CSS), qui bénéficie d'une couverture AT/MP spécifique mais avec des nuances (notamment sur l'indemnisation journalière et la faute inexcusable). Option A est fausse : l'AT stricto sensu (Art. L411-1 CSS) concerne les événements sur le lieu ou lors de l'exécution du travail — la présomption d'imputabilité est plus forte. Option B est fausse : la mission implique un déplacement commandé par l'employeur, pas le simple aller-retour quotidien. Option D est fausse : le trajet est bien couvert.",
    source: {
      authority: 'INRS',
      ref: 'Art. L411-1 et L411-2 Code de la Sécurité Sociale',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-qcm-003',
    type: 'qcm',
    theme: 'risque-routier',
    question: "Quels sont les 3 axes de la démarche de prévention du risque routier professionnel selon l'INRS ?",
    answer: "Organisation des déplacements, ressources (véhicules et équipements), compétences (formation et sensibilisation).",
    choices: [
      "Technique, organisationnelle, humaine",
      "Prévention primaire, secondaire, tertiaire",
      "Organisation des déplacements, ressources (véhicules et équipements), compétences (formation et sensibilisation).",
      "Identification, évaluation, contrôle"
    ],
    correct: 2,
    explanation: "Les 3 axes INRS sont Organisation / Ressources / Compétences (option C). Option A (Technique/Organisationnelle/Humaine) est la trilogie générale de prévention (valide pour d'autres risques) mais ne correspond pas à la terminologie spécifique risque routier. Option B (Primaire/Secondaire/Tertiaire) est le modèle de prévention en santé publique. Option D (Identifier/Évaluer/Contrôler) est la logique EvRP — pas la nomenclature prévention routière.",
    source: {
      authority: 'INRS',
      ref: 'INRS - prévention risque routier',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-qcm-004',
    type: 'qcm',
    theme: 'risque-routier',
    question: "Un représentant commercial se blesse dans un accident de voiture alors qu'il se rend chez un client dans le cadre de ses fonctions. De quelle catégorie relève cet accident ?",
    answer: "Accident de mission, qualifié d'accident du travail.",
    choices: [
      "Accident de trajet, car il se déplace hors des locaux de l'entreprise",
      "Accident de mission, qualifié d'accident du travail.",
      "Accident privé, car il conduit son véhicule personnel",
      "Accident de travail seulement si le véhicule appartient à l'employeur"
    ],
    correct: 1,
    explanation: "Accident de mission = accident survenu pendant un déplacement commandé par l'employeur dans le cadre de l'activité professionnelle. Ici le représentant se rend chez un client — c'est bien une mission. L'accident de mission est qualifié d'accident du travail (Art. L411-1 CSS). Option A est le piège : trajet s'applique uniquement au domicile-travail, pas aux déplacements professionnels hors locaux. Option C est fausse : la propriété du véhicule n'entre pas en compte. Option D est fausse : même avec un véhicule personnel utilisé en mission, l'AT est caractérisé.",
    source: {
      authority: 'INRS',
      ref: 'Art. L411-1 Code de la Sécurité Sociale — accident de mission',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-routier-qcm-005',
    type: 'qcm',
    theme: 'risque-routier',
    question: "Parmi les mesures suivantes, laquelle relève de l'axe 'organisation des déplacements' dans la prévention du risque routier professionnel ?",
    answer: "Limiter les réunions tardives imposant une conduite de nuit ou en état de fatigue.",
    choices: [
      "Former les conducteurs à la conduite préventive (Bilan de Conduite)",
      "Équiper les véhicules de systèmes d'aide à la conduite (ABS, ESP)",
      "Limiter les réunions tardives imposant une conduite de nuit ou en état de fatigue.",
      "Contrôler régulièrement les permis de conduire et les visites médicales des conducteurs"
    ],
    correct: 2,
    explanation: "Option C est de l'organisation (planification, gestion du temps de travail pour éviter la conduite en état de fatigue). Option A (formation) relève de l'axe Compétences. Option B (équipements véhicules) relève de l'axe Ressources. Option D (contrôle permis/médical) relève des Compétences (aptitude à conduire). La distinction organisation/ressources/compétences est fréquemment testée — chaque mesure concrète doit être rattachée à son axe.",
    source: {
      authority: 'INRS',
      ref: 'INRS - prévention risque routier — axe organisation',
      url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  /* =========================================================
   * THEME: rps (14 items — 8 flashcards + 6 QCM)
   * Authority: INRS risques/psychosociaux
   * Ref: Code du travail L4121-1, L1152-1
   * ========================================================= */

  {
    id: 'rps-flashcard-001',
    type: 'flashcard',
    theme: 'rps',
    question: "Que sont les risques psychosociaux (RPS) ? Donner la définition et les 3 composantes.",
    answer: "Les RPS sont des risques pour la santé physique et mentale des travailleurs, résultant de l'exposition à des facteurs liés à l'organisation, aux conditions de travail et aux relations sociales. Ils comprennent 3 composantes : (1) le stress, (2) les violences internes (harcèlement moral, harcèlement sexuel), (3) les violences externes (incivilités, agressions).",
    explanation: "RPS ≠ une maladie : ce sont des risques pouvant conduire à des troubles (cardiovasculaires, TMS, anxio-dépression, burnout). La définition 'psychosocial' combine le caractère psychologique (vécu subjectif du salarié) et social (contexte relationnel et organisationnel). Le stress est souvent le mécanisme central qui potentialise violences internes et externes.",
    source: {
      authority: 'INRS',
      ref: 'INRS - définition RPS',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rps-flashcard-002',
    type: 'flashcard',
    theme: 'rps',
    question: "Quelle est la définition du harcèlement moral au sens de l'article L1152-1 du Code du travail ?",
    answer: "Selon l'Art. L1152-1, le harcèlement moral consiste en des agissements répétés ayant pour objet ou pour effet une dégradation des conditions de travail susceptible de porter atteinte aux droits et à la dignité du salarié, d'altérer sa santé physique ou mentale ou de compromettre son avenir professionnel.",
    explanation: "L1152-1 (harcèlement moral) ≠ L1153-1 (harcèlement sexuel) — confusion d'article très courante en examen. Les éléments constitutifs du harcèlement moral : agissements RÉPÉTÉS (un seul acte ne suffit pas) + dégradation des conditions de travail. L'intention de nuire n'est pas requise (contrairement à l'idée reçue) — l'effet suffit. (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900818)",
    source: {
      authority: 'INRS',
      ref: 'Art. L1152-1 Code du travail',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rps-flashcard-003',
    type: 'flashcard',
    theme: 'rps',
    question: "Qu'est-ce que le burnout (épuisement professionnel) et comment se distingue-t-il du stress aigu ?",
    answer: "Le burnout (ou épuisement professionnel) est un ensemble de réactions consécutives à des situations de stress chronique au travail. Il se manifeste par un épuisement émotionnel, une dépersonnalisation (détachement cynique) et une réduction du sentiment d'accomplissement. Il se distingue du stress aigu par sa dimension chronique et ses 3 dimensions spécifiques.",
    explanation: "Le modèle de référence (Maslach) définit 3 dimensions : épuisement émotionnel (sentiment d'être vidé de ses ressources), dépersonnalisation (détachement, perte d'empathie), réduction du sentiment d'accomplissement. Le burnout n'est pas un état passager — il s'installe progressivement sur des mois. Il peut conduire à un arrêt de travail prolongé et, dans les cas graves, à des idées suicidaires. À la différence des TMS, le burnout n'est pas encore reconnu comme maladie professionnelle dans le tableau MP en France (situation 2026).",
    source: {
      authority: 'INRS',
      ref: 'INRS - burnout / épuisement professionnel',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-flashcard-004',
    type: 'flashcard',
    theme: 'rps',
    question: "Quelle est l'obligation de l'employeur en matière de prévention des RPS ?",
    answer: "L'employeur a une obligation générale de santé et de sécurité (Art. L4121-1 Code du travail) qui inclut explicitement les RPS. Il doit évaluer les risques (les inscrire dans le DUERP), prendre des mesures de prévention, et agir sur l'organisation du travail — pas seulement gérer les cas individuels.",
    explanation: "L4121-1 pose l'obligation de résultat en matière de sécurité : l'employeur doit prendre toutes les mesures nécessaires pour assurer la sécurité et protéger la santé physique ET MENTALE. Inclure 'mentale' depuis la loi de 2002 couvre explicitement les RPS. La prévention des RPS intègre obligatoirement le DUERP. Un employeur qui ne prend pas de mesures collectives face à une situation de RPS identifiée peut voir sa responsabilité engagée (faute inexcusable si AT/MP consécutif). (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902892)",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-1 Code du travail',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-flashcard-005',
    type: 'flashcard',
    theme: 'rps',
    question: "Quels sont les deux principaux questionnaires INRS utilisés pour évaluer les RPS en entreprise ?",
    answer: "L'INRS propose deux questionnaires principaux : (1) RPS-DU, conçu pour alimenter le DUERP — aide à identifier et évaluer les facteurs de risque RPS dans les unités de travail ; (2) Sumer, une enquête nationale sur les expositions aux risques professionnels (dont RPS) réalisée par les médecins du travail.",
    explanation: "RPS-DU est l'outil de l'entreprise (démarche interne, confidentiel). Sumer est une enquête épidémiologique nationale (Surveillance Médicale des Expositions aux Risques professionnels) — elle donne des données de référence sectorielles pour comparer l'entreprise à son secteur. Les deux se complètent : RPS-DU pour agir, Sumer pour se situer. Il existe aussi le questionnaire KARASEK (modèle demande-autonomie-soutien) utilisé dans certaines démarches RPS.",
    source: {
      authority: 'INRS',
      ref: 'INRS - outils RPS-DU et Sumer',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-flashcard-006',
    type: 'flashcard',
    theme: 'rps',
    question: "Quelle est l'approche correcte de la prévention des RPS selon l'INRS ?",
    answer: "La prévention des RPS repose sur une démarche collective centrée sur le travail et son organisation (prévention primaire). Elle ne se réduit pas à l'accompagnement psychologique individuel des salariés en souffrance (qui relève de la prévention tertiaire).",
    explanation: "La distinction prévention primaire / secondaire / tertiaire est exam-critique en RPS : primaire = agir sur les causes organisationnelles (charge, autonomie, relations) ; secondaire = renforcer les ressources individuelles (formation, gestion du stress) ; tertiaire = traiter les cas (accompagnement, cellule de crise). L'INRS insiste que la primaire (collective, organisationnelle) doit primer. Piège : réduire la 'prévention RPS' à l'organisation d'ateliers de gestion du stress individuel.",
    source: {
      authority: 'INRS',
      ref: 'INRS - démarche prévention RPS',
      url: 'https://www.inrs.fr/risques/psychosociaux/prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'rps-flashcard-007',
    type: 'flashcard',
    theme: 'rps',
    question: "Quelles sont les conséquences des RPS sur la santé des travailleurs ?",
    answer: "Les RPS peuvent conduire à : troubles anxio-dépressifs (anxiété, dépression), burnout (épuisement professionnel), troubles du sommeil, pathologies cardiovasculaires (hypertension, infarctus), TMS (via augmentation des tensions musculaires), conduites addictives (alcool, médicaments).",
    explanation: "RPS et TMS sont liés : le stress chronique augmente la tension musculaire et potentialise les facteurs biomécaniques. Ainsi un salarié sous pression psychosociale développe plus facilement des TMS. Les pathologies cardiovasculaires liées au stress (modèle de Karasek : forte demande + faible latitude de décision + faible soutien social = risque cardiovasculaire accru) sont documentées scientifiquement. Le burnout n'est pas une maladie au sens MP mais un syndrome reconnu cliniquement.",
    source: {
      authority: 'INRS',
      ref: 'INRS - conséquences RPS sur la santé',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-flashcard-008',
    type: 'flashcard',
    theme: 'rps',
    question: "Quels sont les principaux facteurs organisationnels de risque RPS identifiés par l'INRS ?",
    answer: "Les principaux facteurs organisationnels RPS sont : intensité et complexité du travail (surcharge, délais), faible autonomie et marges de manœuvre, mauvaises relations de travail (conflits, isolement), insécurité de l'emploi, conflits de valeurs (travail prescrit vs travail réel), et exigences émotionnelles (contact avec le public en souffrance).",
    explanation: "Le modèle de Karasek (job strain) identifie 3 axes : demande psychologique (charge), latitude décisionnelle (autonomie), soutien social. Le déséquilibre effort/récompense (modèle de Siegrist) est un autre cadre : si l'effort fourni n'est pas récompensé (salaire, reconnaissance, sécurité), le risque RPS augmente. Ces deux modèles sont les références scientifiques des questionnaires RPS utilisés en entreprise (Sumer, Karasek).",
    source: {
      authority: 'INRS',
      ref: 'INRS - facteurs de risque RPS',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'rps-qcm-001',
    type: 'qcm',
    theme: 'rps',
    question: "Quel article du Code du travail pose l'obligation de l'employeur en matière de prévention des RPS (protection de la santé mentale) ?",
    answer: "L'article L4121-1 du Code du travail.",
    choices: [
      "L'article L1152-1 (harcèlement moral)",
      "L'article L4121-2 (9 principes généraux de prévention)",
      "L'article L4121-1 du Code du travail.",
      "L'article R4121-1 (DUERP)"
    ],
    correct: 2,
    explanation: "L4121-1 (option C) pose l'obligation générale de l'employeur de prendre toutes les mesures nécessaires pour assurer la sécurité et protéger la santé physique ET MENTALE — c'est le fondement de la prévention des RPS. Option A (L1152-1) définit le harcèlement moral — c'est une composante RPS, pas le fondement général. Option B (L4121-2) énonce les 9 principes généraux de prévention — cadre méthodologique mais pas l'obligation spécifique RPS. Option D (R4121-1) concerne le DUERP (obligation de transcription).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-1 Code du travail',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-qcm-002',
    type: 'qcm',
    theme: 'rps',
    question: "Quel article du Code du travail définit le harcèlement moral ?",
    answer: "L'article L1152-1.",
    choices: [
      "L'article L1153-1 (harcèlement sexuel)",
      "L'article L1152-1.",
      "L'article L4121-1 (obligation générale de sécurité)",
      "L'article R4121-1 (DUERP)"
    ],
    correct: 1,
    explanation: "L1152-1 = harcèlement moral (option B). L1153-1 = harcèlement sexuel (option A) — c'est LE piège classique d'examen : L1152 et L1153 se suivent, les confondre est très fréquent. Moyen mnémotechnique : 1152 → 'moral' (m = 2e lettre de l'alphabet avant s) ; 1153 → 'sexuel'. Options C et D ne concernent pas le harcèlement.",
    source: {
      authority: 'INRS',
      ref: 'Art. L1152-1 Code du travail',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rps-qcm-003',
    type: 'qcm',
    theme: 'rps',
    question: "Quelles sont les 3 composantes des risques psychosociaux selon l'INRS ?",
    answer: "Stress, violences internes (harcèlement moral/sexuel) et violences externes (incivilités, agressions de la clientèle).",
    choices: [
      "Burnout, dépression et anxiété",
      "Stress, conflits interpersonnels et surcharge de travail",
      "Stress, violences internes (harcèlement moral/sexuel) et violences externes (incivilités, agressions de la clientèle).",
      "Harcèlement moral, harcèlement sexuel et discrimination"
    ],
    correct: 2,
    explanation: "Les 3 composantes RPS selon l'INRS sont Stress / Violences internes / Violences externes (option C). Option A liste des conséquences sur la santé (pas les composantes du risque). Option B est une formulation approximative qui mélange une composante (stress) et des facteurs (conflits, surcharge). Option D liste des formes de violences internes uniquement — c'est une sous-partie d'une seule des 3 composantes.",
    source: {
      authority: 'INRS',
      ref: 'INRS - définition RPS',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rps-qcm-004',
    type: 'qcm',
    theme: 'rps',
    question: "Quelle approche de prévention des RPS est préconisée en priorité par l'INRS ?",
    answer: "La prévention primaire : agir collectivement sur les facteurs organisationnels (charge de travail, autonomie, organisation).",
    choices: [
      "La prévention tertiaire : accompagnement psychologique des salariés en souffrance par un psychologue du travail",
      "La prévention secondaire : ateliers de gestion du stress et de la résilience individuelle",
      "La prévention primaire : agir collectivement sur les facteurs organisationnels (charge de travail, autonomie, organisation).",
      "La prévention par la surveillance médicale : visites médicales renforcées pour les salariés à risque"
    ],
    correct: 2,
    explanation: "L'INRS préconise en priorité la prévention primaire (option C) : intervenir sur les causes (organisation, management, conditions de travail) avant que la souffrance ne s'installe. Option A (tertiaire) soigne après coup — nécessaire mais insuffisant seul. Option B (secondaire) renforce les individus mais ne supprime pas les causes. Option D (surveillance médicale) est une mesure de santé au travail mais pas de prévention des causes. Le piège exam : confondre 'prévention RPS' avec 'aide psychologique'.",
    source: {
      authority: 'INRS',
      ref: 'INRS - démarche prévention RPS',
      url: 'https://www.inrs.fr/risques/psychosociaux/prevention.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'rps-qcm-005',
    type: 'qcm',
    theme: 'rps',
    question: "Parmi les situations suivantes, laquelle relève des 'violences internes' au sens des RPS ?",
    answer: "Un responsable isole systématiquement un salarié lors des réunions d'équipe et lui retire ses responsabilités sans justification.",
    choices: [
      "Un client insulte une caissière de supermarché à la caisse",
      "Un salarié est agressé verbalement par un patient dans un service d'urgence",
      "Un responsable isole systématiquement un salarié lors des réunions d'équipe et lui retire ses responsabilités sans justification.",
      "Un prestataire externe tient des propos méprisants envers un agent d'accueil"
    ],
    correct: 2,
    explanation: "Option C décrit du harcèlement moral (agissements répétés par un supérieur hiérarchique) = violence interne (au sein de l'organisation, entre membres de l'entreprise). Options A, B et D décrivent des violences exercées par des personnes extérieures à l'entreprise (client, patient, prestataire) = violences externes. La distinction interne/externe est fondée sur l'origine de la violence (intra vs extra-organisationnelle), pas sur sa gravité.",
    source: {
      authority: 'INRS',
      ref: 'INRS - violences internes vs violences externes',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rps-qcm-006',
    type: 'qcm',
    theme: 'rps',
    question: "Qu'est-ce que le burnout selon l'INRS ?",
    answer: "Un syndrome d'épuisement professionnel consécutif à un stress chronique au travail, caractérisé par épuisement émotionnel, dépersonnalisation et réduction du sentiment d'accomplissement.",
    choices: [
      "Une maladie professionnelle reconnue figurant dans les tableaux MP",
      "Un syndrome d'épuisement professionnel consécutif à un stress chronique au travail, caractérisé par épuisement émotionnel, dépersonnalisation et réduction du sentiment d'accomplissement.",
      "Une forme sévère de dépression clinique diagnostiquée par un psychiatre",
      "Un trouble uniquement observable chez les managers soumis à forte pression hiérarchique"
    ],
    correct: 1,
    explanation: "Option B reflète la définition INRS du burnout (modèle Maslach). Option A est fausse : en 2026, le burnout n'est PAS encore reconnu comme maladie professionnelle dans un tableau MP spécifique en France — il peut être reconnu via le système complémentaire (CRRMP) mais pas via un tableau. Option C est trop restrictive : le burnout est un syndrome professionnel, pas nécessairement une dépression clinique. Option D est fausse : le burnout touche tous les secteurs et tous les niveaux hiérarchiques — les soignants, les enseignants et les salariés en contact avec le public y sont particulièrement exposés.",
    source: {
      authority: 'INRS',
      ref: 'INRS - burnout / épuisement professionnel',
      url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  /* =========================================================
   * THEME: risque-chimique (18 items — 10 flashcards + 8 QCM)
   * Authority: Assurance Maladie - ameli / INRS
   * Ref: Règlement CLP, VLEP — Code du travail R4412
   * ========================================================= */

  {
    id: 'risque-chimique-flashcard-001',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Quelle est la place du risque chimique parmi les causes de maladies professionnelles en France ?",
    answer: "Le risque chimique est la 2e cause de maladies professionnelles reconnues en France, après les TMS.",
    explanation: "Après les TMS (qui représentent ~88 % des MP), le risque chimique constitue la deuxième cause de maladies professionnelles. Il est à l'origine de pathologies aiguës (brûlures, intoxications) et chroniques (cancers, maladies respiratoires, allergies). Cette position justifie l'importance accordée à ce risque dans le Bachelor QHSE et dans l'évaluation des risques (DUERP).",
    source: {
      authority: 'Assurance Maladie - ameli',
      ref: 'Ameli - risques chimiques en entreprise',
      url: 'https://www.ameli.fr/entreprise/sante-travail/risques/risques-chimiques-entreprise/definition',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-flashcard-002',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Que signifie l'acronyme CMR en santé et sécurité au travail ?",
    answer: "CMR = Cancérogène, Mutagène, toxique pour la Reproduction. Ce sont des agents chimiques faisant l'objet d'une réglementation renforcée.",
    explanation: "Les agents CMR sont classés en catégories (1A = avéré, 1B = présumé, 2 = suspecté). Pour ces substances, l'employeur a une obligation de substitution prioritaire (remplacer le CMR par un produit moins dangereux si techniquement possible) avant d'envisager d'autres mesures. Le Code du travail consacre les articles R4412-59 et suivants aux CMR. La classification repose sur le règlement CLP (CE) 1272/2008.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-59 et s. Code du travail — agents CMR',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-flashcard-003',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Quel règlement européen régit la classification et l'étiquetage des produits chimiques depuis le 1er juin 2015 ?",
    answer: "Le règlement CLP (CE) n° 1272/2008 — Classification, Labelling, Packaging — a remplacé intégralement l'ancien système DSD/DPD le 1er juin 2015.",
    explanation: "CLP transpose en droit européen le SGH (Système Général Harmonisé des Nations Unies). Avant le CLP, la classification reposait sur la directive DSD (substances) et DPD (préparations/mélanges). La date clé à retenir pour l'examen est le 1er juin 2015 : à compter de cette date, toute nouvelle étiquette de produit chimique doit obligatoirement utiliser les pictogrammes SGH, les mentions de danger (H) et les conseils de prudence (P) du CLP. (Légifrance : règlement UE intégré en droit interne via le Code du travail, Art. R4411-6 et s.)",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) 1272/2008',
      url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-flashcard-004',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Qu'est-ce que le SGH et quel est son lien avec le règlement CLP ?",
    answer: "Le SGH (Système Général Harmonisé) est le système de classification/étiquetage développé par l'ONU. Le règlement CLP est la déclinaison européenne du SGH.",
    explanation: "Le SGH a été adopté au niveau onusien pour harmoniser les critères de classification des dangers chimiques à l'échelle mondiale. Il définit 9 classes de pictogrammes. Le CLP (CE) 1272/2008 l'a intégré dans le droit européen. Le SGH prévoit des mentions de danger (H-phrases) et des conseils de prudence (P-phrases) qui remplacent les anciennes phrases R et S de l'ancien système DSD/DPD. Piège d'examen : SGH ≠ CLP — le SGH est l'outil ONU, le CLP est la norme UE qui l'applique.",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) 1272/2008 — SGH ONU',
      url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-flashcard-005',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Combien de pictogrammes de danger le SGH/CLP définit-il, et quels types de dangers couvrent-ils ?",
    answer: "Le SGH/CLP définit 9 pictogrammes (losanges rouges) couvrant les dangers physiques (flamme, explosion, bouteille sous pression…), les dangers pour la santé (crâne, point d'exclamation, danger grave…) et les dangers pour l'environnement (arbre/poisson).",
    explanation: "Les 9 pictogrammes CLP : GHS01 Explosif · GHS02 Inflammable · GHS03 Comburant · GHS04 Gaz sous pression · GHS05 Corrosif · GHS06 Toxique (crâne, mortel) · GHS07 Irritant/nocif (point d'exclamation) · GHS08 Danger pour la santé à long terme (silhouette + exclamation — CMR, sensibilisants) · GHS09 Dangereux pour l'environnement aquatique. Piège : le pictogramme GHS08 (danger grave pour la santé) inclut les CMR — c'est lui qui signale les cancérogènes.",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) 1272/2008 — 9 pictogrammes SGH',
      url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-flashcard-006',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Que sont les VLEP et quelles sont les deux valeurs qu'elles comprennent ?",
    answer: "Les VLEP (valeurs limites d'exposition professionnelle) fixent les concentrations maximales d'un agent chimique dans l'air. Elles comprennent : la VME (valeur moyenne d'exposition, sur 8 heures) et la VLE (valeur limite d'exposition courte durée, sur 15 minutes).",
    explanation: "La VME s'applique sur une période de référence de 8 heures (durée d'un poste de travail) : elle protège contre les effets à long terme. La VLE s'applique sur 15 minutes et ne doit jamais être dépassée : elle protège contre les effets aigus d'une exposition de courte durée. Piège d'examen : VME ≠ VLE. VME = durée longue (8h), VLE = courte durée (15 min). Les VLEP peuvent être réglementaires (obligatoires, fixées par décret) ou indicatives (valeurs guides).",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-149 et s. Code du travail — VLEP',
      url: 'https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-flashcard-007',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Qu'est-ce qu'une Fiche de Données de Sécurité (FDS) et quand est-elle obligatoire ?",
    answer: "La FDS est un document remis par le fournisseur à tout utilisateur professionnel d'un agent chimique dangereux. Elle est obligatoire pour tout agent chimique dangereux classé selon le CLP.",
    explanation: "La FDS comporte 16 rubriques obligatoires définies par le règlement REACH (annexe II, Art. R4411-73 du Code du travail) : 1. Identification · 2. Identification des dangers · 3. Composition · 4. Premiers secours · 5. Lutte contre l'incendie · 6. Mesures en cas de dispersion · 7. Manipulation/stockage · 8. Contrôles/EPI · 9. Propriétés physico-chimiques · 10. Stabilité/réactivité · 11. Toxicologie · 12. Écologie · 13. Élimination · 14. Transport · 15. Réglementation · 16. Autres. La FDS est le principal outil d'information sur les risques d'un produit chimique et sert de base à l'évaluation des risques chimiques.",
    source: {
      authority: 'INRS',
      ref: 'Règlement REACH (CE) 1907/2006, Annexe II — FDS 16 rubriques (Art. R4411-73 CT)',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-flashcard-008',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Quelle est la hiérarchie des mesures de prévention pour le risque chimique ?",
    answer: "La hiérarchie prioritaire est : 1) Substitution (remplacer le produit dangereux) → 2) Mesures techniques collectives (captage, ventilation, confinement) → 3) Mesures organisationnelles → 4) EPI (en dernier recours).",
    explanation: "Cette hiérarchie découle des 9 principes généraux de prévention (Art. L4121-2) appliqués au risque chimique. La substitution est la priorité absolue, notamment pour les CMR (obligation réglementaire si techniquement possible). Les EPI (masques, gants, lunettes) ne doivent être utilisés qu'en complément des mesures collectives, jamais comme seule protection. La protection collective prime toujours sur la protection individuelle (principe 8 de L4121-2). Piège : les EPI ne réduisent pas le risque à la source, ils protègent seulement l'opérateur exposé.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail — principes généraux + Art. R4412-x risque chimique',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-flashcard-009',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Quelles sont les deux VLEP réglementaires contraignantes en France, et quelle est leur valeur juridique ?",
    answer: "En France, il existe des VLEP réglementaires contraignantes (obligatoires — fixées par décret, leur dépassement est interdit) et des VLEP indicatives (valeurs guides, non contraignantes mais de référence).",
    explanation: "Les VLEP réglementaires contraignantes sont directement opposables à l'employeur : leur dépassement constitue une infraction. Les VLEP indicatives servent de référence pour l'évaluation des risques mais ne créent pas d'obligation absolue de ne pas les dépasser. La liste des VLEP réglementaires contraignantes figure dans l'arrêté du 30 juin 2004 et ses actualisations. Exemple : benzène, chlorure de vinyle monomère, poussières de bois. Piège : confondre VLEP réglementaire (opposable) et VLEP indicative (guide).",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-149 et s. Code du travail — VLEP réglementaires',
      url: 'https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-flashcard-010',
    type: 'flashcard',
    theme: 'risque-chimique',
    question: "Quels sont les effets sur la santé des agents chimiques dangereux ?",
    answer: "Les effets sont aigus (immédiats : brûlures, intoxication aiguë, irritation) ou chroniques (à long terme : cancers, maladies respiratoires, dermites, troubles de la reproduction pour les CMR).",
    explanation: "Les voies de pénétration d'un agent chimique dans l'organisme sont : inhalation (principale voie), contact cutané/oculaire, ingestion (accidentelle). L'inhalation est la voie la plus fréquente dans le milieu professionnel, d'où l'importance des VLEP atmosphériques. Les effets chroniques (cancers professionnels, asthmes professionnels, insuffisance rénale…) sont souvent sous-déclarés en maladies professionnelles. Le risque chimique est d'autant plus difficile à percevoir que les effets chroniques n'apparaissent qu'après une longue période de latence.",
    source: {
      authority: 'INRS',
      ref: 'INRS — effets sur la santé des agents chimiques',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-qcm-001',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Quelle est la durée de référence de la VME (valeur moyenne d'exposition) ?",
    answer: "8 heures (correspondant à un poste de travail).",
    choices: [
      "15 minutes",
      "1 heure",
      "8 heures (correspondant à un poste de travail).",
      "24 heures"
    ],
    correct: 2,
    explanation: "La VME (valeur moyenne d'exposition) est calculée sur 8 heures, correspondant à la durée standard d'un poste de travail. Option A (15 min) correspond à la VLE (valeur limite d'exposition courte durée) — c'est le piège classique d'examen VME/VLE. Option B (1h) ne correspond à aucune VLEP réglementaire. Option D (24h) est la valeur guide environnementale, pas une VLEP professionnelle.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-149 et s. Code du travail — VME 8h / VLE 15 min',
      url: 'https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-qcm-002',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Le règlement CLP (CE) 1272/2008 a remplacé l'ancien système de classification chimique européen. Quelle était la date d'application complète pour les mélanges ?",
    answer: "1er juin 2015.",
    choices: [
      "1er janvier 2009 (date de publication du règlement CLP)",
      "1er décembre 2010 (pour les substances pures)",
      "1er juin 2015.",
      "1er janvier 2020 (fin de la période de transition)"
    ],
    correct: 2,
    explanation: "Option C est correcte : le 1er juin 2015 est la date à laquelle le règlement CLP est devenu pleinement applicable pour les mélanges (préparations), remplaçant définitivement la directive DPD. Option A (2009) est la date de publication officielle du règlement mais pas sa date d'application complète. Option B (2010) est la date d'application obligatoire pour les substances pures (étape intermédiaire). Option D (2020) est inventée. Piège d'examen : confondre la date de publication (2008/2009) avec la date d'application complète (2015).",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) 1272/2008 — remplacement DSD/DPD le 1er juin 2015',
      url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-qcm-003',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Combien de rubriques obligatoires comporte une Fiche de Données de Sécurité (FDS) selon le règlement REACH ?",
    answer: "16 rubriques.",
    choices: [
      "8 rubriques",
      "12 rubriques",
      "16 rubriques.",
      "20 rubriques"
    ],
    correct: 2,
    explanation: "Option C est correcte : la FDS comporte exactement 16 rubriques obligatoires définies par l'annexe II du règlement REACH (CE) 1907/2006, transposée en droit français par l'Art. R4411-73 du Code du travail. Option A (8) et B (12) sont insuffisants. Option D (20) est excessif. Mnémotechnique : penser aux 16 cases d'une FDS comme un formulaire standardisé à 16 chapitres allant de l'identification du produit jusqu'aux informations diverses.",
    source: {
      authority: 'INRS',
      ref: 'Règlement REACH (CE) 1907/2006, Annexe II — FDS 16 rubriques (Art. R4411-73 CT)',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'risque-chimique-qcm-004',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Pour un agent chimique CMR avéré (catégorie 1A), quelle est l'obligation prioritaire de l'employeur ?",
    answer: "Substituer le produit CMR par un produit ou procédé moins dangereux, si cela est techniquement possible.",
    choices: [
      "Équiper immédiatement les travailleurs exposés d'EPI adaptés (masques FFP3, gants nitrile)",
      "Substituer le produit CMR par un produit ou procédé moins dangereux, si cela est techniquement possible.",
      "Informer les travailleurs des risques via une formation annuelle",
      "Réduire le temps d'exposition en dessous de la VLEP réglementaire"
    ],
    correct: 1,
    explanation: "Option B est correcte : pour les CMR, la substitution est la mesure prioritaire (obligation réglementaire — Art. R4412-66 CT). Si la substitution est impossible, l'employeur doit ensuite mettre en place des mesures techniques collectives (confinement, captage), puis organisationnelles, et seulement en dernier recours des EPI (option A). Option A seul est insuffisant et ne respecte pas la hiérarchie. Option C (formation) est complémentaire mais pas la mesure prioritaire. Option D (réduire en dessous de la VLEP) est une mesure utile mais secondaire par rapport à la substitution.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-66 Code du travail — substitution CMR',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-qcm-005',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Quel règlement européen constitue la base réglementaire des FDS (Fiches de Données de Sécurité) ?",
    answer: "Le règlement REACH (CE) 1907/2006.",
    choices: [
      "Le règlement CLP (CE) 1272/2008",
      "Le règlement REACH (CE) 1907/2006.",
      "La directive Seveso III (2012/18/UE)",
      "Le règlement Biocides (UE) 528/2012"
    ],
    correct: 1,
    explanation: "Option B est correcte : les FDS sont régies par le règlement REACH (CE) 1907/2006, Annexe II (exigences relatives aux FDS). Le règlement CLP (option A) régit la classification et l'étiquetage, pas les FDS directement — bien que les informations de classification CLP figurent en rubrique 2 de la FDS. Option C (Seveso III) concerne les établissements à hauts risques industriels. Option D (Biocides) concerne les produits biocides. Piège classique : confondre CLP (étiquetage) et REACH (FDS).",
    source: {
      authority: 'INRS',
      ref: 'Règlement REACH (CE) 1907/2006, Annexe II — FDS',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-qcm-006',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Parmi les pictogrammes CLP suivants, lequel signale spécifiquement les dangers pour la santé à long terme (dont les CMR) ?",
    answer: "GHS08 — silhouette humaine avec exclamation (danger grave pour la santé).",
    choices: [
      "GHS06 — tête de mort sur tibias croisés (toxicité aiguë létale)",
      "GHS07 — point d'exclamation (irritant/nocif, toxicité aiguë faible)",
      "GHS08 — silhouette humaine avec exclamation (danger grave pour la santé).",
      "GHS05 — corrosion (corrosif pour la peau et les métaux)"
    ],
    correct: 2,
    explanation: "Option C est correcte : GHS08 (silhouette humaine + point d'exclamation, cadre rouge) signale les dangers graves pour la santé à long terme : CMR (cancérogènes, mutagènes, toxiques pour la reproduction), sensibilisants respiratoires, toxicité spécifique pour certains organes. GHS06 (option A) signale la toxicité aiguë létale (mortelle en cas d'ingestion/inhalation/contact). GHS07 (option B) signale une toxicité moins grave (irritation, sensibilisation cutanée, toxicité systémique légère). GHS05 (option D) signale la corrosion. Piège : GHS07 et GHS08 se ressemblent — GHS07 = point d'exclamation seul; GHS08 = silhouette humaine avec exclamation = danger grave.",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) 1272/2008 — pictogrammes SGH',
      url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'risque-chimique-qcm-007',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Dans la hiérarchie de prévention du risque chimique, quelle mesure doit être mise en place EN PRIORITÉ avant toute autre ?",
    answer: "La suppression ou la substitution de l'agent chimique dangereux.",
    choices: [
      "La fourniture d'EPI adaptés (gants, masques, lunettes) aux travailleurs exposés",
      "La mise en place d'une ventilation générale des locaux de travail",
      "La suppression ou la substitution de l'agent chimique dangereux.",
      "La réalisation de mesurages atmosphériques pour vérifier le respect des VLEP"
    ],
    correct: 2,
    explanation: "Option C est correcte : la suppression/substitution est la priorité absolue (principe 6 de L4121-2 : remplacer ce qui est dangereux par ce qui l'est moins). Elle intervient avant toute mesure technique ou organisationnelle. Option A (EPI) est le dernier recours — la protection collective prime sur la protection individuelle (principe 8). Option B (ventilation) est une mesure technique collective utile, mais secondaire à la suppression/substitution. Option D (mésurage) est une étape d'évaluation, pas une mesure de prévention à proprement parler.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail — 9 principes généraux de prévention',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'risque-chimique-qcm-008',
    type: 'qcm',
    theme: 'risque-chimique',
    question: "Quelle est la principale voie de pénétration des agents chimiques en milieu professionnel ?",
    answer: "L'inhalation (voie respiratoire).",
    choices: [
      "L'ingestion (voie digestive)",
      "Le contact cutané (voie dermique)",
      "L'inhalation (voie respiratoire).",
      "L'injection (plaies/coupures)"
    ],
    correct: 2,
    explanation: "Option C est correcte : l'inhalation est la principale voie d'entrée des agents chimiques dans l'organisme en milieu de travail, notamment pour les vapeurs, gaz, aérosols et poussières. C'est pourquoi les VLEP atmosphériques (VME/VLE) sont la mesure d'évaluation centrale. Option B (contact cutané) est la deuxième voie importante — certains solvants et pesticides traversent facilement la peau (ex. : solvants organiques, acide cyanhydrique). Option A (ingestion) est généralement accidentelle (mains sales) et moins fréquente. Option D (injection) est exceptionnelle et liée à des accidents.",
    source: {
      authority: 'INRS',
      ref: 'INRS — voies de pénétration agents chimiques',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  /* =========================================================
   * THEME: espaces-confines (12 items — 7 flashcards + 5 QCM)
   * Authority: INRS
   * Ref: Code du travail R4222 — atmosphères confinées
   * ========================================================= */

  {
    id: 'espaces-confines-flashcard-001',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Quelle est la définition d'un espace confiné au sens de la prévention des risques professionnels ?",
    answer: "Un espace confiné est un volume totalement ou partiellement fermé, non conçu pour une occupation permanente, accessible temporairement pour y effectuer des travaux.",
    explanation: "Exemples d'espaces confinés : fosses, cuves, silos, égouts, canalisations, puits, trémies, réservoirs, vides sanitaires, caissons, espaces sous-planchers. La notion clé est 'non conçu pour l'occupation permanente' — c'est ce qui distingue un espace confiné d'un local de travail ordinaire. L'accès temporaire implique que la configuration de l'espace complique les interventions de secours en cas d'accident.",
    source: {
      authority: 'INRS',
      ref: 'INRS — définition espace confiné',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'espaces-confines-flashcard-002',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Quels sont les 3 risques atmosphériques principaux en espace confiné ?",
    answer: "1) Appauvrissement en oxygène (O₂ < 19,5%) ; 2) Atmosphère toxique (présence d'agents chimiques dangereux) ; 3) Atmosphère explosive (ATEX — mélange air/gaz/vapeurs inflammables).",
    explanation: "Ces 3 risques atmosphériques sont souvent simultanés et potentiellement mortels. L'appauvrissement en O₂ peut être dû à la consommation d'oxygène par des réactions chimiques (oxydation, fermentation) ou par déplacement par un gaz inerte (azote, CO₂). L'atmosphère toxique résulte de la présence d'agents chimiques (H₂S, CO, solvants…). L'ATEX se forme quand la concentration d'un gaz ou vapeur inflammable est comprise entre la LIE (limite inférieure d'explosivité) et la LSE (limite supérieure d'explosivité). Une analyse atmosphérique OBLIGATOIRE avant toute entrée.",
    source: {
      authority: 'INRS',
      ref: 'INRS — risques atmosphériques espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'espaces-confines-flashcard-003',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "En dessous de quel taux d'oxygène parle-t-on d'atmosphère appauvrie en O₂ dans un espace confiné ?",
    answer: "En dessous de 19,5 % d'O₂ (valeur normale : 20,9 %). Une atmosphère est aussi considérée enrichie (suroxygénée) au-delà de 23,5 %.",
    explanation: "Le taux normal d'O₂ dans l'air est de 20,9 %. Seuils critiques : < 19,5 % = atmosphère appauvrie (risque de perte de conscience rapide) ; < 16 % = danger grave immédiat ; < 6 % = mort en quelques minutes. Au-delà de 23,5 % = atmosphère enrichie/suroxygénée : risque d'inflammation accrue (les matières s'enflamment plus facilement). Piège d'examen : certains candidats écrivent '< 21 %' ou '< 17 %' — la valeur réglementaire INRS est bien 19,5 %.",
    source: {
      authority: 'INRS',
      ref: 'INRS — seuil O₂ atmosphère appauvrie espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'espaces-confines-flashcard-004',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Qu'est-ce que le permis d'entrer en espace confiné et pourquoi est-il obligatoire ?",
    answer: "Le permis d'entrer est un document formel, obligatoire avant toute pénétration dans un espace confiné. Il informe les intervenants des dangers présents, des mesures de prévention à appliquer et des dispositions de secours.",
    explanation: "Le permis d'entrer comporte typiquement : identification de l'espace, nature des travaux, résultats de l'analyse atmosphérique préalable, EPI requis, consignation des énergies, nombre d'intervenants, durée d'intervention, organisation des secours, nom du surveillant extérieur. Il constitue un acte formel de gestion des risques et de coordination entre le donneur d'ordre et l'entreprise intervenante. Sans permis d'entrer validé, aucun intervenant ne doit pénétrer dans l'espace. (Art. R4512-6 et s. CT pour les opérations impliquant plusieurs entreprises.)",
    source: {
      authority: 'INRS',
      ref: "INRS — permis d'entrer espaces confinés",
      url: 'https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-flashcard-005',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Quel est le rôle du surveillant extérieur lors d'une intervention en espace confiné ?",
    answer: "Le surveillant extérieur maintient une présence permanente à l'extérieur de l'espace confiné, surveille les travailleurs à l'intérieur et peut déclencher immédiatement les secours sans pénétrer lui-même dans l'espace.",
    explanation: "La surveillance permanente extérieure est une exigence fondamentale des interventions en espace confiné. Le surveillant ne doit JAMAIS pénétrer dans l'espace pour secourir un intervenant en difficulté — il doit appeler les secours (pompiers) spécialisés. Une des causes majeures d'accidents mortels en espace confiné est la tentative de sauvetage non préparée : plusieurs personnes décèdent en tentant de secourir une première victime. Le surveillant est qualifié pour utiliser les équipements de communication, connaît la procédure d'urgence et surveille les paramètres atmosphériques en continu.",
    source: {
      authority: 'INRS',
      ref: 'INRS — surveillance permanente extérieure espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-flashcard-006',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Quel est le lien entre le risque chimique et le risque en espace confiné ?",
    answer: "Les espaces confinés sont souvent le lieu d'une accumulation d'agents chimiques dangereux (toxiques, asphyxiants, inflammables) provenant de la nature du produit stocké, de réactions chimiques ou de travaux effectués à l'intérieur.",
    explanation: "Exemples concrets : une cuve ayant contenu un solvant présente des vapeurs toxiques et inflammables après vidange ; un égout peut contenir du H₂S (hydrogène sulfuré) — gaz incolore, odorant à faible dose mais anesthésiant les voies nasales à forte dose, donc très dangereux ; un réservoir à azote présente un risque d'asphyxie par O₂ < 19,5 %. La détection atmosphérique multi-gaz (O₂, CO, H₂S, LIE) est indispensable avant toute entrée. Ce lien justifie que les VLEP s'appliquent aussi à l'intérieur des espaces confinés.",
    source: {
      authority: 'INRS',
      ref: 'INRS — lien risque chimique / espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-flashcard-007',
    type: 'flashcard',
    theme: 'espaces-confines',
    question: "Quelles sont les principales causes d'accidents mortels dans les espaces confinés ?",
    answer: "Analyse insuffisante des dangers, mauvaise coordination entre intervenants, absence de surveillance atmosphérique, formation inadéquate et — principale cause aggravante — les tentatives de sauvetage non préparées par des témoins.",
    explanation: "Statistiquement, les tentatives de sauvetage spontanées (sans équipement ni protocole) multiplient le nombre de victimes : une seconde puis une troisième personne décèdent en tentant de secourir la première. Les accidents en espace confiné ont souvent plusieurs victimes pour cette raison. La prévention repose donc sur : (1) analyse préalable systématique, (2) permis d'entrer formalisé, (3) surveillance atmosphérique continue, (4) surveillant extérieur formé, (5) plan de secours préétabli avec pompiers spécialisés.",
    source: {
      authority: 'INRS',
      ref: 'INRS — causes accidents espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-qcm-001',
    type: 'qcm',
    theme: 'espaces-confines',
    question: "En dessous de quel taux d'oxygène une atmosphère en espace confiné est-elle considérée comme appauvrie selon les référentiels INRS ?",
    answer: "19,5 %",
    choices: [
      "17 %",
      "19,5 %",
      "21 %",
      "23,5 %"
    ],
    correct: 1,
    explanation: "Option B est correcte : le seuil d'appauvrissement en O₂ retenu par l'INRS est 19,5 % (taux normal = 20,9 %). Option A (17 %) est un seuil de danger grave mais pas le seuil d'appauvrissement défini. Option C (21 %) correspond au taux normal arrondi — ce n'est pas un seuil d'alerte. Option D (23,5 %) est le seuil de suroxygénation (atmosphère enrichie). Piège classique d'examen : choisir 21 % parce que c'est le taux normal arrondi ou 17 % parce que c'est plus grave.",
    source: {
      authority: 'INRS',
      ref: 'INRS — seuil O₂ < 19,5 % atmosphère appauvrie',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'espaces-confines-qcm-002',
    type: 'qcm',
    theme: 'espaces-confines',
    question: "Parmi les mesures suivantes, laquelle est OBLIGATOIRE avant toute pénétration dans un espace confiné ?",
    answer: "Délivrance d'un permis d'entrer formalisé, après analyse atmosphérique préalable.",
    choices: [
      "Contacter le CHSCT (ou la CSSCT) pour information préalable",
      "Délivrance d'un permis d'entrer formalisé, après analyse atmosphérique préalable.",
      "Effectuer une formation SST (Sauveteur Secouriste du Travail) pour tous les intervenants",
      "Installer une ventilation naturelle en ouvrant tous les accès disponibles"
    ],
    correct: 1,
    explanation: "Option B est correcte : le permis d'entrer (après mesure atmosphérique) est la mesure obligatoire et préalable à toute pénétration. Option A (informer le CSE/CSSCT) peut être une bonne pratique mais n'est pas l'obligation immédiate avant chaque entrée. Option C (formation SST) est utile mais une formation générique ne suffit pas — des compétences spécifiques espaces confinés sont nécessaires, et ce n'est pas la condition préalable à chaque intervention. Option D (ventilation naturelle) n'est pas suffisante : certains gaz (CO₂, H₂S) sont plus lourds que l'air et persistent en fond d'espace même avec les ouvertures en haut.",
    source: {
      authority: 'INRS',
      ref: "INRS — permis d'entrer obligatoire espaces confinés",
      url: 'https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-qcm-003',
    type: 'qcm',
    theme: 'espaces-confines',
    question: "Quelle est la règle absolue pour le surveillant extérieur en cas d'accident à l'intérieur d'un espace confiné ?",
    answer: "Ne jamais pénétrer dans l'espace — alerter immédiatement les secours spécialisés (pompiers) sans tenter de sauvetage improvisé.",
    choices: [
      "Pénétrer avec un masque filtrant FFP3 pour récupérer la victime rapidement",
      "Attendre 5 minutes que la victime reprenne connaissance avant d'appeler les secours",
      "Ne jamais pénétrer dans l'espace — alerter immédiatement les secours spécialisés (pompiers) sans tenter de sauvetage improvisé.",
      "Ventiler l'espace avec un souffleur pendant 10 minutes avant d'entrer secourir"
    ],
    correct: 2,
    explanation: "Option C est la seule réponse correcte : le surveillant ne doit JAMAIS pénétrer sans équipement spécialisé. Un masque FFP3 (option A) ne protège pas contre l'asphyxie par O₂ < 19,5 % (il filtre les particules, pas l'oxygène). Option B (attendre 5 min) est dangereuse — chaque minute compte en cas d'asphyxie. Option D (ventiler puis entrer) est insuffisante : 10 minutes peuvent ne pas suffire et l'atmosphère peut rester mortelle. La cause principale du bilan aggravé dans les accidents en espaces confinés est précisément la tentative de sauvetage improvisée.",
    source: {
      authority: 'INRS',
      ref: 'INRS — surveillant extérieur / non-pénétration espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-qcm-004',
    type: 'qcm',
    theme: 'espaces-confines',
    question: "Lequel des exemples suivants correspond à un espace confiné au sens de la prévention des risques ?",
    answer: "Un silo à grain vide dans lequel un technicien entre pour inspection.",
    choices: [
      "Un atelier de mécanique sans fenêtre avec 3 salariés permanents",
      "Un bureau sous-sol mal ventilé occupé quotidiennement",
      "Un silo à grain vide dans lequel un technicien entre pour inspection.",
      "Un local technique de 20 m² avec éclairage artificiel"
    ],
    correct: 2,
    explanation: "Option C est correcte : un silo à grain vide est un espace confiné classique — volume fermé, non conçu pour l'occupation permanente, accessible temporairement. Les espaces A, B et D sont des locaux de travail ordinaires (occupation permanente ou régulière) — ils peuvent avoir des problèmes de ventilation mais ne sont pas des 'espaces confinés' au sens réglementaire. La notion clé est 'non conçu pour l'occupation permanente' couplée à un accès difficile ou restreint (trappe, trou d'homme, passage étroit).",
    source: {
      authority: 'INRS',
      ref: 'INRS — définition et exemples espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'espaces-confines-qcm-005',
    type: 'qcm',
    theme: 'espaces-confines',
    question: "Dans quel intervalle de concentration d'un gaz ou vapeur inflammable dans l'air une explosion est-elle possible ?",
    answer: "Entre la LIE (limite inférieure d'explosivité) et la LSE (limite supérieure d'explosivité).",
    choices: [
      "En dessous de la LIE (limite inférieure d'explosivité)",
      "Entre la LIE (limite inférieure d'explosivité) et la LSE (limite supérieure d'explosivité).",
      "Au-dessus de la LSE (limite supérieure d'explosivité)",
      "Uniquement lorsque le taux d'O₂ est supérieur à 23,5 %"
    ],
    correct: 1,
    explanation: "Option B est correcte : une explosion est possible uniquement dans le domaine d'inflammabilité, défini entre la LIE et la LSE. En dessous de la LIE (option A), le mélange est trop pauvre en combustible pour s'enflammer (pas assez de gaz). Au-dessus de la LSE (option C), le mélange est trop riche — il ne brûle pas mais peut devenir explosif si dilué. Option D est une condition aggravante (suroxygénation abaisse les seuils LIE/LSE) mais pas la condition exclusive d'explosivité. Exemple : pour le méthane (grisou), LIE = 5 %, LSE = 15 % dans l'air.",
    source: {
      authority: 'INRS',
      ref: 'INRS — ATEX LIE/LSE espaces confinés',
      url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  }

,

  /* =========================================================
   * THEME: icpe-seveso (12 items — 7 flashcards + 5 QCM)
   * Authority: Service-Public Entreprendre / AIDA - INERIS
   * Ref: Art. L511-1 Code de l'environnement / Directive 2012/18/UE
   * ========================================================= */

  {
    id: 'icpe-seveso-flashcard-001',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Quel article du Code de l'environnement fonde la réglementation des Installations Classées pour la Protection de l'Environnement (ICPE) ?",
    answer: "L'article L511-1 du Code de l'environnement est le fondement des ICPE. Il soumet à réglementation les installations qui présentent des dangers ou inconvénients pour l'environnement, la santé ou la sécurité publique.",
    explanation: "Piège fréquent : confondre avec le Code du travail (qui régit la santé-sécurité des salariés). Les ICPE relèvent du Code de l'environnement, car elles concernent l'impact sur l'environnement ET les tiers, pas uniquement les salariés. L511-1 ouvre le Titre Ier du Livre V : les activités potentiellement dangereuses nécessitent une autorisation ou déclaration préalable.",
    source: {
      authority: 'Service-Public Entreprendre',
      ref: 'Art. L511-1 Code de l\'environnement',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-flashcard-002',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Quels sont les 3 régimes ICPE, classés du moins dangereux au plus dangereux ?",
    answer: "Les 3 régimes ICPE, du moins au plus dangereux : 1. Déclaration (D) — risques moindres, simple déclaration en préfecture ; 2. Enregistrement (E) — procédure simplifiée ; 3. Autorisation (A) — dangers sérieux, enquête publique.",
    explanation: "L'ordre Déclaration → Enregistrement → Autorisation est exam-critique. Erreur classique = inverser (partir de l'Autorisation). Mémo : DEA (comme diplôme) — du plus simple au plus lourd. L'Enregistrement (créé par ordonnance 2009) est intermédiaire : procédure simplifiée mais encadrée par des prescriptions standardisées, sans enquête publique contrairement à l'Autorisation.",
    source: {
      authority: 'Service-Public Entreprendre',
      ref: 'Art. L511-2 Code de l\'environnement — Nomenclature ICPE',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-flashcard-003',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Quelle autorité administrative contrôle les ICPE en région ?",
    answer: "La DREAL (Direction Régionale de l'Environnement, de l'Aménagement et du Logement) est l'autorité de contrôle des ICPE au niveau régional. Elle instruit les dossiers d'Autorisation et réalise les inspections.",
    explanation: "DREAL = fusion de la DRIRE, DIREN et DRE opérée en 2009-2010. Niveau régional. L'inspection des ICPE relève de la DREAL, avec des inspecteurs assermentés habilités à dresser des procès-verbaux. Ne pas confondre avec la DREETS (inspection du travail) qui contrôle les salariés, ou le SDIS (pompiers) qui intervient en urgence.",
    source: {
      authority: 'Service-Public Entreprendre',
      ref: 'Art. L514-5 Code de l\'environnement — inspection des ICPE',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-flashcard-004',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Quelle directive européenne définit les établissements SEVESO ? Quel est son numéro exact ?",
    answer: "La Directive Seveso 3 : 2012/18/UE du 4 juillet 2012, relative à la maîtrise des dangers liés aux accidents majeurs impliquant des substances dangereuses. Elle remplace Seveso II (96/82/CE).",
    explanation: "Seveso 3 = 2012/18/UE (pas 96/82/CE qui est Seveso II). Le chiffre 3 correspond à la 3e génération après Seveso I (1982, suite à la catastrophe d'Icmesa à Seveso, Italie, 1976) et Seveso II (1996). L'erreur fréquente est de citer l'ancienne directive 96/82/CE ou de confondre le numéro de l'UE avec l'année.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Directive Seveso 3 — 2012/18/UE',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-flashcard-005',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Quels sont les 2 niveaux de classement Seveso et leurs désignations officielles ?",
    answer: "Les 2 niveaux Seveso : Seuil bas (S) — exigences minimales de maîtrise des risques ; Seuil haut (SH) — exigences renforcées, PPRT obligatoire.",
    explanation: "On parle de 'seuil bas' (S) et 'seuil haut' (SH) — et NON de 'catégorie 1' et 'catégorie 2' (erreur fréquente). Les seuils sont définis par les quantités de substances dangereuses détenues (en tonnes, annexes I et II de la directive 2012/18/UE). Établissements Seveso SH : PPRT (Plan de Prévention des Risques Technologiques) obligatoire, POI (Plan d'Opération Interne) + PPI (Plan Particulier d'Intervention) — l'effet domino entre établissements proches est aussi pris en compte.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Directive Seveso 3 — 2012/18/UE, annexes I et II',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'icpe-seveso-flashcard-006',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Qu'est-ce qu'un PPRT et à quel type d'établissement est-il associé ?",
    answer: "Le PPRT (Plan de Prévention des Risques Technologiques) est un outil de maîtrise de l'urbanisation autour des installations industrielles à hauts risques. Il est associé aux établissements Seveso à seuil haut (SH).",
    explanation: "Créé par la loi Bachelot du 30 juillet 2003 (suite à l'explosion AZF, Toulouse, 2001). Le PPRT délimite des zones autour de l'établissement et réglemente l'usage des sols (interdiction de construire, prescriptions sur l'existant, possibilité d'expropriation ou délaissement). Il vise les riverains, pas seulement les salariés. Associé exclusivement aux Seveso SH, pas au seuil bas.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Loi n°2003-699 du 30 juillet 2003 — PPRT',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'icpe-seveso-flashcard-007',
    type: 'flashcard',
    theme: 'icpe-seveso',
    question: "Qu'est-ce qu'une installation classée (ICPE) ? Donnez la définition réglementaire.",
    answer: "Une ICPE est une installation exploitée ou détenue par toute personne physique ou morale, publique ou privée, qui peut présenter des dangers ou des inconvénients pour la commodité du voisinage, la santé, la sécurité, la salubrité publique, l'agriculture, la protection de la nature, de l'environnement et des paysages (Art. L511-1 Code de l'environnement).",
    explanation: "Le champ est très large : inclut industries, élevages, entrepôts, carrières, etc. La classification se fait par 'rubriques' de la nomenclature ICPE : rubriques 4xxx pour substances dangereuses CLP (Seveso) ; 1xxx-3xxx pour activités et procédés. Toute installation figurant dans la nomenclature et dépassant un seuil est soumise à l'un des 3 régimes.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Art. L511-1 Code de l\'environnement',
      url: 'https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-qcm-001',
    type: 'qcm',
    theme: 'icpe-seveso',
    question: "Dans quel code est inscrit le fondement des ICPE (Installations Classées pour la Protection de l'Environnement) ?",
    answer: "Code de l'environnement (Art. L511-1).",
    choices: [
      "Code du travail",
      "Code de l'environnement (Art. L511-1).",
      "Code de la santé publique",
      "Code général des collectivités territoriales"
    ],
    correct: 1,
    explanation: "Option B correcte : les ICPE sont fondées sur l'Art. L511-1 du Code de l'environnement. Option A (Code du travail) est le piège principal — le Code du travail régit la protection des salariés, mais les ICPE concernent les impacts sur l'environnement et les tiers, pas uniquement les travailleurs. Option C (Code de la santé publique) régit les établissements de santé. Option D (CGCT) régit les collectivités territoriales. Mnémotechnique : ICPE = 'Protection de l'Environnement' → Code de l'environnement.",
    source: {
      authority: 'Service-Public Entreprendre',
      ref: 'Art. L511-1 Code de l\'environnement',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'icpe-seveso-qcm-002',
    type: 'qcm',
    theme: 'icpe-seveso',
    question: "Quel est l'ordre correct des 3 régimes ICPE, du moins contraignant au plus contraignant ?",
    answer: "Déclaration → Enregistrement → Autorisation.",
    choices: [
      "Autorisation → Enregistrement → Déclaration",
      "Déclaration → Enregistrement → Autorisation.",
      "Enregistrement → Déclaration → Autorisation",
      "Déclaration → Autorisation → Enregistrement"
    ],
    correct: 1,
    explanation: "Option B correcte : DEA = Déclaration → Enregistrement → Autorisation (du plus simple au plus lourd). Option A (Autorisation → Enregistrement → Déclaration) est l'erreur classique — inverser l'ordre. Option C et D mélangent les régimes. L'Autorisation est le régime le plus exigeant : dossier de danger, enquête publique, arrêté préfectoral. L'Enregistrement (ordonnance 2009) est intermédiaire : prescriptions standardisées sans enquête publique. La Déclaration = risques moindres, simple formalité préalable.",
    source: {
      authority: 'Service-Public Entreprendre',
      ref: 'Art. L511-2 Code de l\'environnement',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'icpe-seveso-qcm-003',
    type: 'qcm',
    theme: 'icpe-seveso',
    question: "Quelle est la directive européenne en vigueur définissant les établissements Seveso ?",
    answer: "Directive 2012/18/UE (Seveso 3).",
    choices: [
      "Directive 96/82/CE (Seveso II)",
      "Directive 2012/18/UE (Seveso 3).",
      "Directive 2006/42/CE (Machines)",
      "Directive 89/391/CEE (Santé-sécurité au travail)"
    ],
    correct: 1,
    explanation: "Option B correcte : Seveso 3 = Directive 2012/18/UE. Option A (96/82/CE) est la directive Seveso II abrogée — c'est le principal piège, car 96/82/CE est encore souvent citée dans les anciens supports. Option C (2006/42/CE) concerne la directive Machines. Option D (89/391/CEE) est la directive-cadre SST (les 9 principes). La Directive Seveso tire son nom de l'accident d'Icmesa à Seveso (Italie, 1976) qui a libéré de la dioxine.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Directive Seveso 3 — 2012/18/UE',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'icpe-seveso-qcm-004',
    type: 'qcm',
    theme: 'icpe-seveso',
    question: "Comment appelle-t-on les 2 niveaux de classement Seveso ?",
    answer: "Seuil bas (S) et seuil haut (SH).",
    choices: [
      "Catégorie 1 et catégorie 2",
      "Seuil bas (S) et seuil haut (SH).",
      "Niveau rouge et niveau orange",
      "Autorisation et enregistrement spécial"
    ],
    correct: 1,
    explanation: "Option B correcte : la terminologie officielle est seuil bas (S) et seuil haut (SH). Option A (catégorie 1 / catégorie 2) est le faux-ami — utilisé en ancien droit ou dans le langage courant, mais pas la dénomination réglementaire Seveso 3. Option C (rouge/orange) n'existe pas dans la réglementation. Option D confond avec les régimes ICPE. Les seuils sont fixés en quantités de substances dangereuses (tonnes) ; le SH est associé au PPRT obligatoire.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Directive 2012/18/UE — annexes I et II',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'icpe-seveso-qcm-005',
    type: 'qcm',
    theme: 'icpe-seveso',
    question: "Quel document de planification est obligatoire autour d'un établissement Seveso à seuil haut (SH) ?",
    answer: "Le PPRT (Plan de Prévention des Risques Technologiques).",
    choices: [
      "Le DUERP (Document Unique d'Évaluation des Risques Professionnels)",
      "Le PPRT (Plan de Prévention des Risques Technologiques).",
      "Le PRAP (Programme de Réduction des Accidents Professionnels)",
      "Le PAPRIPACT (Programme Annuel de Prévention des Risques)"
    ],
    correct: 1,
    explanation: "Option B correcte : le PPRT est associé aux Seveso SH — il maîtrise l'urbanisation autour des installations à hauts risques (loi Bachelot, 30 juillet 2003, suite à AZF Toulouse 2001). Option A (DUERP) s'applique à toutes les entreprises ≥1 salarié — document interne de l'employeur, pas un outil d'urbanisme. Option C (PRAP) est un programme INRS de réduction des TMS. Option D (PAPRIPACT) est le programme annuel de prévention dans les entreprises. Le PPRT inclut des zones de danger avec restrictions d'usage des sols pour les riverains.",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Loi n°2003-699 du 30 juillet 2003 — PPRT / Seveso SH',
      url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  /* =========================================================
   * THEME: calendrier (11 items — 6 flashcards + 5 QCM)
   * Authority: Service-Public (F2918 / F15478)
   * Ref: Code du travail — contrat d'apprentissage / professionnalisation
   * Rémunération % RE-FETCHED LIVE 2026-05-20 from F2918 / F15478
   * ========================================================= */

  {
    id: 'calendrier-flashcard-001',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quelle est la durée minimale et maximale du contrat d'apprentissage (CDL) ?",
    answer: "Le contrat d'apprentissage à durée limitée (CDL) dure de 6 mois minimum à 3 ans maximum. Il peut aussi être conclu en CDI (période d'apprentissage au début).",
    explanation: "6 mois–3 ans pour le CDL. Prolongations possibles : jusqu'à 4 ans si l'apprenti est travailleur handicapé ou sportif de haut niveau ; +1 an en cas d'échec à l'examen. La durée est alignée sur le cycle de formation. Mémo : le Bachelor (Bac+3) implique en général 1 à 3 ans de contrat d'apprentissage. (Source : service-public.fr F2918, vérifié 2026-05-20)",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — contrat d\'apprentissage',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'calendrier-flashcard-002',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quelle est la part minimale de formation en CFA dans le contrat d'apprentissage ?",
    answer: "La formation en CFA doit représenter au moins 25 % de la durée totale du contrat d'apprentissage. L'apprenti doit entrer en CFA dans les 3 mois suivant le début du contrat.",
    explanation: "25 % = proportion minimum de temps en CFA (le reste se passe en entreprise). Piège : ce seuil de 25 % s'applique au contrat d'apprentissage, PAS au contrat de professionnalisation (pour lequel la formation = 15–25 % de la durée du contrat). C'est une distinction exam-fréquente. L'entrée en CFA dans les 3 mois est également une obligation réglementaire.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — art. L6211-2 et suivants',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-flashcard-003',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quels sont les salaires minimaux d'un apprenti en 1re année selon son âge ? (source : service-public.fr, re-fetché 2026-05-20)",
    answer: "1re année — % du SMIC : 16-17 ans : 27 % ; 18-20 ans : 43 % ; 21-25 ans : 53 % ; 26 ans et plus : 100 %.",
    explanation: "Valeurs lues en direct sur service-public.fr F2918 le 2026-05-20 (SMIC 2026 = 1 823,03 €/mois). Ces % augmentent avec l'ancienneté : 2e année — 39/51/61/100 % ; 3e année — 55/67/80%+/100 %. La logique : plus l'apprenti est âgé et expérimenté, plus son salaire se rapproche du SMIC. Les 26 ans et + perçoivent le salaire le plus élevé entre le SMIC et le minimum conventionnel de la branche.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — rémunération apprentissage',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'calendrier-flashcard-004',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quelle est la différence entre le maître d'apprentissage et le tuteur dans les contrats d'alternance ?",
    answer: "Le maître d'apprentissage est le référent en entreprise dans le contrat d'apprentissage. Le tuteur est le référent en entreprise dans le contrat de professionnalisation. Ces deux rôles sont distincts et portent des désignations différentes selon le type de contrat.",
    explanation: "Confusion exam-fréquente : maître d'apprentissage ≠ tuteur selon le type de contrat. Apprentissage → maître d'apprentissage ; Professionnalisation → tuteur. Le maître d'apprentissage 'assume la fonction de tuteur' (formulation service-public.fr), mais son titre officiel est 'maître d'apprentissage'. Critères de désignation différents : maître d'apprentissage = salarié majeur, diplôme du même domaine + 1 an d'expérience ou sans diplôme + 2 ans ; tuteur = 2 ans d'expérience dans la qualification visée.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — maître d\'apprentissage / tuteur',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-flashcard-005',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quelle est la durée du contrat de professionnalisation et quelle part de formation minimale doit-il contenir ?",
    answer: "Durée : 6 à 12 mois (extensible jusqu'à 24 mois par accord de branche, 36 mois pour certains publics prioritaires). La formation représente entre 15 % et 25 % de la durée totale du contrat (minimum 150 heures/an).",
    explanation: "Contrat de pro : 6-12 mois de base (contre 6 mois-3 ans pour l'apprentissage). Extension à 24 mois si accord de branche le prévoit — la loi permet jusqu'à 36 mois pour les demandeurs d'emploi depuis >1 an, bénéficiaires RSA/AAH, personnes sortant d'un CUI. La formation = 15-25 % (contre ≥25 % pour l'apprentissage) — distinction piège. Les actions de formation doivent débuter dans les 2 mois suivant la signature.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — contrat de professionnalisation',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F15478',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-flashcard-006',
    type: 'flashcard',
    theme: 'calendrier',
    question: "Quelle est la rémunération minimale d'un salarié de moins de 21 ans en contrat de professionnalisation ? (re-fetché 2026-05-20)",
    answer: "55 % du SMIC, soit 1 002,67 € bruts/mois (SMIC 2026 = 1 823,03 €). Si le salarié a un baccalauréat professionnel ou titre de même niveau : 65 % du SMIC (1 184,98 €/mois).",
    explanation: "Valeur lue en direct sur service-public.fr F15478 le 2026-05-20. Pour les 21-25 ans : 70 % du SMIC (75 % si bac pro ou équivalent) ; pour les 26 ans et plus : 85 % du SMIC ou minimum conventionnel si supérieur. Comparaison avec l'apprentissage (1re année, 18-20 ans : 43 %) : le contrat de professionnalisation rémunère en général mieux, car le salarié est censé avoir une formation préalable.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — rémunération contrat de professionnalisation',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F15478',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'calendrier-qcm-001',
    type: 'qcm',
    theme: 'calendrier',
    question: "Quel est le pourcentage minimum de temps que l'apprenti doit passer en CFA (Centre de Formation d'Apprentis) ?",
    answer: "25 % de la durée totale du contrat d'apprentissage.",
    choices: [
      "15 % de la durée totale du contrat",
      "25 % de la durée totale du contrat d'apprentissage.",
      "33 % de la durée totale du contrat",
      "50 % de la durée totale du contrat"
    ],
    correct: 1,
    explanation: "Option B correcte : ≥25 % en CFA pour l'apprentissage. Option A (15 %) correspond au minimum pour le contrat de professionnalisation — piège principal, confusion entre les deux types de contrats. Option C (33 %) et D (50 %) sont des leurres sans fondement réglementaire. Rappel : contrat de professionnalisation = 15-25 % de formation ; apprentissage = ≥25 %. La date d'entrée en CFA doit intervenir dans les 3 mois suivant le début du contrat.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — Art. L6211-2',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-qcm-002',
    type: 'qcm',
    theme: 'calendrier',
    question: "Comment appelle-t-on le référent en entreprise dans le contrat de professionnalisation ?",
    answer: "Le tuteur.",
    choices: [
      "Le maître d'apprentissage",
      "Le tuteur.",
      "Le référent alternance",
      "Le mentor professionnel"
    ],
    correct: 1,
    explanation: "Option B correcte : dans le contrat de professionnalisation, c'est le tuteur. Option A (maître d'apprentissage) est le référent dans le contrat d'apprentissage — c'est exactement le piège D-12 prévu pour ce sujet. Options C et D n'existent pas dans la nomenclature réglementaire. Le tuteur doit justifier d'au moins 2 ans d'expérience dans la qualification visée, être salarié de l'entreprise et être volontaire. Il peut suivre simultanément 3 personnes.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — tuteur / contrat de professionnalisation',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F15478',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'calendrier-qcm-003',
    type: 'qcm',
    theme: 'calendrier',
    question: "Quelle est la rémunération minimale brute d'un apprenti de 20 ans en 1re année (source : service-public.fr, 2026) ?",
    answer: "43 % du SMIC.",
    choices: [
      "27 % du SMIC",
      "43 % du SMIC.",
      "53 % du SMIC",
      "100 % du SMIC"
    ],
    correct: 1,
    explanation: "Option B correcte : un apprenti de 18-20 ans en 1re année = 43 % du SMIC (valeur lue sur F2918 le 2026-05-20). Option A (27 %) correspond aux 16-17 ans en 1re année. Option C (53 %) correspond aux 21-25 ans en 1re année. Option D (100 %) concerne les 26 ans et plus. Mémo du tableau : croissance par âge (27/43/53/100) et par année (1re→2e→3e : +12 à +16 points par palier).",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — rémunération apprentissage',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-qcm-004',
    type: 'qcm',
    theme: 'calendrier',
    question: "Quelle est la durée maximale initiale d'un contrat de professionnalisation (sans accord de branche particulier) ?",
    answer: "12 mois.",
    choices: [
      "6 mois",
      "12 mois.",
      "24 mois",
      "3 ans"
    ],
    correct: 1,
    explanation: "Option B correcte : durée standard 6-12 mois (maximum 12 mois sans accord de branche). Option C (24 mois) est possible mais uniquement si un accord de branche le prévoit — ce n'est pas la durée initiale sans accord. Option D (3 ans) est la durée maximale du contrat d'apprentissage. Option A (6 mois) est la durée minimale, pas la durée maximale. Pour publics prioritaires (demandeurs d'emploi, RSA, AAH, CUI), la durée peut atteindre 36 mois sans accord de branche.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — durée contrat de professionnalisation',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F15478',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'calendrier-qcm-005',
    type: 'qcm',
    theme: 'calendrier',
    question: "Dans le contrat d'apprentissage, qui est responsable de la formation pratique en entreprise et porte le titre officiel de référent ?",
    answer: "Le maître d'apprentissage.",
    choices: [
      "Le tuteur pédagogique",
      "Le maître d'apprentissage.",
      "Le responsable RH de l'entreprise",
      "Le directeur du CFA"
    ],
    correct: 1,
    explanation: "Option B correcte : dans l'apprentissage, c'est le maître d'apprentissage (et non le 'tuteur' — dénomination réservée au contrat de professionnalisation). Option A (tuteur pédagogique) est une confusion avec la terminologie du contrat de professionnalisation. Option C (RH) n'a pas de rôle réglementaire spécifique dans la formation de l'apprenti. Option D (directeur CFA) est responsable de la formation théorique, pas pratique. La loi dit : le maître d'apprentissage 'est directement responsable de la formation de l'apprenti et assume la fonction de tuteur' — le mot 'tuteur' est ici utilisé en sens générique, mais le titre officiel reste maître d'apprentissage.",
    source: {
      authority: 'Service-Public',
      ref: 'Code du travail — maître d\'apprentissage',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  /* =========================================================
   * THEME: acronymes (26 items — 20 flashcards + 6 QCM)
   * Authority: INRS / Service-Public / AIDA — selon acronyme
   * Note: Acronyms sourced from already-[CV] non-SPA pages only.
   * RNCP, CFA, VAE, BC01-BC04 DEFERRED to Batch F (plan 02-06) — SPA only.
   * ========================================================= */

  {
    id: 'acronymes-flashcard-001',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie DUERP ?",
    answer: "DUERP = Document Unique d'Évaluation des Risques Professionnels. Document obligatoire (Art. R4121-1 Code du travail) dans lequel l'employeur transcrit les résultats de l'évaluation de tous les risques auxquels sont exposés les salariés.",
    explanation: "Piège fréquent : confondre DUERP avec DUER (ancienne dénomination — 'Document Unique d'Évaluation des Risques', sans le P de Professionnels) ou écrire 'DUER-P'. Depuis la loi du 2 août 2021, la dénomination officielle est DUERP. Obligatoire dès le 1er salarié ; conservation 40 ans ; mise à jour annuelle si ≥11 salariés et après tout accident grave ou aménagement significatif.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-002',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie EvRP ?",
    answer: "EvRP = Évaluation des Risques Professionnels. Démarche obligatoire (Art. L4121-3 Code du travail) par laquelle l'employeur identifie et analyse tous les risques auxquels sont exposés les salariés, en vue de les éliminer ou de les réduire.",
    explanation: "EvRP est la démarche ; DUERP est le document qui transcrit les résultats de cette démarche. L'EvRP ne se confond pas avec le DUERP : on 'réalise' une EvRP, on 'transcrit' ses résultats dans le DUERP. L'EvRP est continue (obligation de mise à jour), le DUERP est le résultat formalisé à un instant T.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-003',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie PAPRIPACT ?",
    answer: "PAPRIPACT = Programme Annuel de Prévention des Risques Professionnels et d'Amélioration des Conditions de Travail. Document que l'employeur (entreprises ≥11 salariés) doit établir à partir du DUERP, fixant les actions, ressources et délais de prévention pour l'année.",
    explanation: "Le PAPRIPACT traduit le DUERP en plan d'action concret. Il est obligatoire depuis la loi du 2 août 2021 pour les entreprises ≥11 salariés. Il est soumis pour avis au CSE. Acronyme long = souvent mal orthographié à l'examen : P-A-P-R-I-P-A-C-T (5 lettres, tiret, 4 lettres en pratique).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-3-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-004',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient CMR et FDS dans le domaine des risques chimiques ?",
    answer: "CMR = Cancérogène, Mutagène, Reprotoxique (substances présentant 3 types de danger différé). FDS = Fiche de Données de Sécurité (document réglementaire en 16 rubriques, obligatoire pour toute substance/préparation dangereuse — règlement REACH).",
    explanation: "CMR : 3 niveaux de danger — catégorie 1A (prouvé), 1B (présumé), 2 (suspecté). Exposition chronique → risque de cancer, d'altération de l'ADN ou des fonctions reproductives. FDS : 16 rubriques standardisées par le règlement CLP/REACH ; fournit les informations sur la composition, les dangers, les premiers secours, les EPI requis. Tout employeur doit avoir les FDS de ses produits chimiques et les rendre accessibles aux salariés et au médecin du travail.",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) n°1272/2008 — CMR / Règlement REACH — FDS',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-005',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient VLEP, VME et VLE dans la réglementation des risques chimiques ?",
    answer: "VLEP = Valeur Limite d'Exposition Professionnelle (terme générique). VME = Valeur Moyenne d'Exposition (sur 8 heures — exposition chronique). VLE = Valeur Limite d'Exposition à court terme (sur 15 minutes — pics d'exposition).",
    explanation: "Hiérarchie VLEP : VME s'applique à l'exposition journalière moyenne sur 8 h ; VLE s'applique aux expositions brèves (15 min), ne devant pas être dépassée même instantanément. En France, les VLEP sont fixées par arrêté ministériel (Code du travail) et publiées dans des tables INRS. Attention : VLEP est le terme chapeau ; VME et VLE en sont deux sous-types. Erreur fréquente : appeler VME 'valeur maximale en entreprise' — faux.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-149 Code du travail — VLEP chimiques',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'acronymes-flashcard-006',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient SGH et CLP dans la classification des produits chimiques ?",
    answer: "SGH = Système Général Harmonisé de classification et d'étiquetage des produits chimiques (ONU, 2003). CLP = Classification, Labelling, Packaging — règlement européen (CE) n°1272/2008 qui transpose le SGH en droit européen.",
    explanation: "Le CLP remplace depuis le 1er juin 2015 l'ancien système DSD/DPD. Il introduit les pictogrammes SGH (losanges rouges), les mentions H (hazard = danger) et P (précaution), et les catégories de danger standardisées. SGH = cadre ONU international ; CLP = déclinaison européenne obligatoire. Ne pas confondre avec REACH (enregistrement et autorisation des substances) : REACH et CLP sont complémentaires mais distincts.",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) n°1272/2008',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-007',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie ATEX ?",
    answer: "ATEX = ATmosphères EXplosives. Zone ou atmosphère dans laquelle des gaz, vapeurs, brouillards ou poussières inflammables peuvent former un mélange explosif avec l'air. La réglementation ATEX impose des zones classées et des équipements certifiés.",
    explanation: "Deux directives ATEX : directive 94/9/CE (ATEX 95, équipements) et directive 99/92/CE (ATEX 137, prévention dans les lieux de travail). L'explosion est possible uniquement entre la LIE (limite inférieure d'explosivité) et la LSE (limite supérieure). Les zones ATEX sont classées 0/1/2 (gaz) et 20/21/22 (poussières). L'employeur doit établir un DRPCE (document relatif à la protection contre les explosions) dans les zones ATEX.",
    source: {
      authority: 'INRS',
      ref: 'Directive 99/92/CE — ATEX lieux de travail',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-008',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient TMS et PRAP ?",
    answer: "TMS = Troubles Musculo-Squelettiques (pathologies de l'appareil locomoteur liées au travail — tendons, muscles, articulations, nerfs). PRAP = Prévention des Risques liés à l'Activité Physique (programme INRS de formation et de démarche de prévention des TMS).",
    explanation: "TMS = 1re cause de maladie professionnelle en France (88 % des MP reconnues). Affectent les membres supérieurs (poignet, coude, épaule) et le dos. PRAP est à la fois un programme de formation INRS (formation 'acteur PRAP') et une démarche de prévention structurée. Ne pas confondre PRAP avec PAPRIPACT (programme annuel de prévention plus large). L'acteur PRAP est le référent TMS en entreprise, formé par un organisme habilité INRS.",
    source: {
      authority: 'INRS',
      ref: 'INRS — TMS / PRAP',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-009',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient AT/MP ?",
    answer: "AT = Accident du Travail. MP = Maladie Professionnelle. Ensemble de sinistres reconnus et indemnisés par la Sécurité Sociale (branche AT/MP de l'Assurance Maladie) lorsqu'ils sont en lien avec l'activité professionnelle.",
    explanation: "AT : événement soudain survenant par le fait ou à l'occasion du travail. MP : maladie inscrite dans les tableaux des MP (INRS / CPAM) ou reconnue par expertise médicale. La branche AT/MP finance l'incapacité temporaire (ITT), l'incapacité permanente partielle (IPP) et les rentes. Le taux de cotisation AT/MP de l'employeur varie selon le secteur d'activité et la sinistralité de l'entreprise.",
    source: {
      authority: 'INRS',
      ref: 'Code de la Sécurité Sociale — branche AT/MP',
      url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-010',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient EPI et EPC ?",
    answer: "EPI = Équipement de Protection Individuelle (équipement porté par le travailleur pour se protéger d'un risque résiduel — casque, gants, masque…). EPC = Équipement de Protection Collective (dispositif protégeant un groupe de personnes — garde-corps, aspiration à la source, capot de machine…).",
    explanation: "La hiérarchie de prévention (9 principes généraux, Art. L4121-2) place l'EPC avant l'EPI : on protège collectivement avant d'équiper individuellement. L'EPI est le dernier recours. L'employeur doit fournir les EPI gratuitement (Art. L4122-2 Code du travail). Piège : confondre EPI avec EPC — un casque = EPI (individuel), une protection anti-chute sur un chantier = EPC (collective).",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail — 9 principes / EPI-EPC',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-011',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie PDCA et à quel système de management est-il associé ?",
    answer: "PDCA = Plan (Planifier) – Do (Faire) – Check (Vérifier) – Act (Agir/Améliorer). Cycle d'amélioration continue (roue de Deming) qui structure les systèmes de management ISO 9001, ISO 14001 et ISO 45001.",
    explanation: "Inventé par W.E. Deming (mais formalisé par Shewhart). Structure les normes HLS (High Level Structure) des trois ISO : § 6 = Plan, § 8 = Do, § 9 = Check, § 10 = Act. Le PDCA est aussi appelé 'boucle de Deming' ou 'roue de Deming'. Dans un SM, le cycle se répète en continu : l'axe Act repart sur un nouveau Plan amélioré (amélioration continue, pas un cercle fermé).",
    source: {
      authority: 'INRS',
      ref: 'ISO 9001:2015 / ISO 14001:2015 / ISO 45001:2018 — cycle PDCA',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-012',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient SMQ, SME et SMS dans le management des organisations ?",
    answer: "SMQ = Système de Management de la Qualité (référentiel ISO 9001). SME = Système de Management Environnemental (référentiel ISO 14001). SMS = Système de Management de la Santé-Sécurité (référentiel ISO 45001). Le SMQSE ou SMI (Système de Management Intégré) combine les trois.",
    explanation: "Distinctions : Q = Qualité (satisfaction client, processus), E = Environnement (impacts env., parties intéressées), S = Sécurité/Santé (travailleurs, risques SST). QHSE = Qualité + Hygiène + Sécurité + Environnement — acronyme métier englobant les trois normes. Les trois normes partagent la structure HLS (§4–§10), ce qui facilite leur intégration en SMI.",
    source: {
      authority: 'INRS',
      ref: 'ISO 9001 / ISO 14001 / ISO 45001 — systèmes de management',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-013',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifient CSE, CHSCT et CSSCT dans la représentation du personnel ?",
    answer: "CSE = Comité Social et Économique (instance unique, créée par les ordonnances Macron 2017, obligatoire ≥11 salariés). CHSCT = Comité d'Hygiène, de Sécurité et des Conditions de Travail (ancienne instance, supprimée et absorbée par le CSE). CSSCT = Commission Santé, Sécurité et Conditions de Travail (sous-commission obligatoire du CSE dans les entreprises ≥300 salariés).",
    explanation: "Chronologie : CHSCT créé en 1982, supprimé par ordonnances Macron n°2017-1386 (22 septembre 2017). Le CSE regroupe les anciennes instances CE, CHSCT et DP. La CSSCT est la commission spécialisée SST au sein du CSE pour les grands établissements. Piège fréquent : écrire qu'il 'existe un CHSCT' dans une entreprise créée après 2017 — faux depuis les ordonnances. Dans les entreprises de 11-49 salariés, le CSE fait tout (pas de CSSCT obligatoire).",
    source: {
      authority: 'INRS',
      ref: 'Ordonnances Macron n°2017-1386 — CSE / CSSCT',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'acronymes-flashcard-014',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie ICPE et quelle autorité le contrôle en région ?",
    answer: "ICPE = Installation Classée pour la Protection de l'Environnement. Autorité de contrôle en région : la DREAL (Direction Régionale de l'Environnement, de l'Aménagement et du Logement). Fondement : Art. L511-1 Code de l'environnement.",
    explanation: "ICPE désigne toute installation (industrielle, agricole, de stockage) qui, par ses activités ou les substances qu'elle met en œuvre, présente des risques pour l'environnement ou les tiers. La DREAL instruit les dossiers d'autorisation et inspecte les installations. Pour les Seveso, la DREAL est renforcée par une inspection spécialisée risques accidentels. Ne pas confondre DREAL (environnement) avec DREETS (travail / inspection du travail).",
    source: {
      authority: 'AIDA - INERIS',
      ref: 'Art. L511-1 Code de l\'environnement — ICPE / DREAL',
      url: 'https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-qcm-001',
    type: 'qcm',
    theme: 'acronymes',
    question: "Quelle est la dénomination officielle actuelle du document obligatoire d'évaluation des risques en entreprise ?",
    answer: "DUERP (Document Unique d'Évaluation des Risques Professionnels).",
    choices: [
      "DUER (Document Unique d'Évaluation des Risques)",
      "DUERP (Document Unique d'Évaluation des Risques Professionnels).",
      "DUERP-CT (Document Unique d'Évaluation des Risques et Conditions de Travail)",
      "EvRP (Évaluation des Risques Professionnels)"
    ],
    correct: 1,
    explanation: "Option B correcte : depuis la loi du 2 août 2021, la dénomination officielle est DUERP (avec le P de Professionnels). Option A (DUER) est l'ancienne dénomination avant 2021 — c'est le principal piège dans les supports pré-2021. Option C (DUERP-CT) n'existe pas. Option D (EvRP) est la démarche d'évaluation, pas le document lui-même. Le DUERP = résultat formalisé de l'EvRP.",
    source: {
      authority: 'INRS',
      ref: 'Loi n°2021-1018 du 2 août 2021 — Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-qcm-002',
    type: 'qcm',
    theme: 'acronymes',
    question: "Que signifie CMR dans la classification des risques chimiques ?",
    answer: "Cancérogène, Mutagène, Reprotoxique.",
    choices: [
      "Contrôle du Matériel Réglementaire",
      "Cancérogène, Mutagène, Reprotoxique.",
      "Chimique, Microbiologique, Radioactif",
      "Contrôle des Mesures de Réduction"
    ],
    correct: 1,
    explanation: "Option B correcte : CMR = Cancérogène (risque cancer), Mutagène (altération de l'ADN/chromosomes), Reprotoxique (atteinte à la reproduction/fertilité/développement fœtal). Trois dangers différés (pas immédiats). Options A, C, D sont des leurres sans existence réglementaire. Les substances CMR bénéficient d'une réglementation renforcée (substitution obligatoire si possible, surveillance médicale renforcée, valeurs limites d'exposition plus strictes).",
    source: {
      authority: 'INRS',
      ref: 'Règlement CLP (CE) n°1272/2008 — catégories CMR',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-qcm-003',
    type: 'qcm',
    theme: 'acronymes',
    question: "Quelle valeur limite s'applique à une exposition chimique sur une durée de 15 minutes ?",
    answer: "VLE (Valeur Limite d'Exposition à court terme).",
    choices: [
      "VME (Valeur Moyenne d'Exposition)",
      "VLE (Valeur Limite d'Exposition à court terme).",
      "VLEP (Valeur Limite d'Exposition Professionnelle)",
      "VTR (Valeur Toxicologique de Référence)"
    ],
    correct: 1,
    explanation: "Option B correcte : VLE s'applique aux expositions brèves de 15 minutes (pics). Option A (VME) s'applique à l'exposition moyenne sur 8 heures (exposition chronique journalière). Option C (VLEP) est le terme générique chapeau qui englobe VME et VLE — trop large pour répondre à '15 minutes'. Option D (VTR) est un outil d'évaluation des risques sanitaires (ANSES) différent du contexte réglementaire du Code du travail. Moyen mnémotechnique : VLE = court terme (lettre E = Exposure au bout = ponctuelle) ; VME = Moyenne = journalière.",
    source: {
      authority: 'INRS',
      ref: 'Art. R4412-149 Code du travail — VLEP / VME / VLE',
      url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'acronymes-qcm-004',
    type: 'qcm',
    theme: 'acronymes',
    question: "Quelle est la relation entre CHSCT et CSSCT dans le droit du travail français actuel ?",
    answer: "Le CHSCT a été supprimé par les ordonnances Macron (2017) et remplacé par le CSE. La CSSCT est une commission du CSE obligatoire dans les entreprises ≥300 salariés.",
    choices: [
      "CHSCT et CSSCT coexistent : CHSCT pour les PME, CSSCT pour les grandes entreprises",
      "Le CHSCT a été supprimé par les ordonnances Macron (2017) et remplacé par le CSE. La CSSCT est une commission du CSE obligatoire dans les entreprises ≥300 salariés.",
      "La CSSCT est l'ancien nom du CHSCT avant la réforme de 2015",
      "CHSCT et CSSCT sont synonymes — même institution, deux dénominations selon la région"
    ],
    correct: 1,
    explanation: "Option B correcte : les ordonnances Macron n°2017-1386 ont fusionné CE, CHSCT et DP en un CSE unique. Le CHSCT n'existe plus depuis le 1er janvier 2020 (délai de transition). La CSSCT est la commission spécialisée SST obligatoire au sein du CSE pour les entreprises et établissements ≥300 salariés. Option A (coexistence) est fausse — depuis 2020, seul le CSE existe. Option C (CSSCT = ancien CHSCT) inverse la chronologie. Option D (synonymes) est fausse.",
    source: {
      authority: 'INRS',
      ref: 'Ordonnances Macron n°2017-1386 du 22 sept. 2017',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'acronymes-qcm-005',
    type: 'qcm',
    theme: 'acronymes',
    question: "Que signifie PDCA et à quelle démarche de management est-il associé ?",
    answer: "Plan–Do–Check–Act : cycle d'amélioration continue (roue de Deming), socle de ISO 9001, 14001 et 45001.",
    choices: [
      "Prévenir–Détecter–Corriger–Améliorer : démarche de contrôle qualité interne",
      "Plan–Do–Check–Act : cycle d'amélioration continue (roue de Deming), socle de ISO 9001, 14001 et 45001.",
      "Planification–Documentation–Certification–Audit : séquence de certification ISO",
      "Processus–Danger–Contrôle–Action : méthode HACCP de sécurité alimentaire"
    ],
    correct: 1,
    explanation: "Option B correcte : PDCA = Plan–Do–Check–Act (anglais) = Planifier–Faire–Vérifier–Agir. Option A utilise des termes français proches mais incorrect pour PDCA (ce serait une autre méthode). Option C (Planification–Documentation–Certification–Audit) est un leurre décrivant une démarche ISO mais pas l'acronyme PDCA. Option D (HACCP) est une méthode agroalimentaire sans lien avec PDCA. Le PDCA structure les §6/§8/§9/§10 des normes ISO à structure HLS.",
    source: {
      authority: 'INRS',
      ref: 'ISO 9001:2015 / ISO 45001:2018 — PDCA amélioration continue',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-qcm-006',
    type: 'qcm',
    theme: 'acronymes',
    question: "Quel est le sigle correspondant à l'ancienne norme de management de la santé-sécurité au travail, remplacée par ISO 45001 en 2018 ?",
    answer: "OHSAS 18001.",
    choices: [
      "ISO 18001",
      "OHSAS 18001.",
      "BS 8800",
      "ISO 45000"
    ],
    correct: 1,
    explanation: "Option B correcte : OHSAS 18001 (Occupational Health and Safety Assessment Series) a été remplacée par ISO 45001 en mars 2018. Option A (ISO 18001) n'existe pas — erreur fréquente de confondre le numéro OHSAS 18001 avec un numéro ISO. Option C (BS 8800) est la norme britannique qui a précédé OHSAS 18001. Option D (ISO 45000) n'existe pas — la norme publiée est ISO 45001. La période de transition OHSAS → ISO 45001 a pris fin en mars 2021 (3 ans après publication).",
    source: {
      authority: 'INRS',
      ref: 'ISO 45001:2018 — remplace OHSAS 18001',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },


  /* =========================================================
   * THEME: metiers (12 items — 7 flashcards + 5 QCM)
   * Authority: France Travail — nomenclature ROME
   * Ref: codes ROME H1302 / H1502 …
   * ========================================================= */

  {
    id: 'metiers-flashcard-001',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quel est le code ROME et l'intitulé du métier de responsable HSE dans l'industrie (niveau Bac+5) ?",
    answer: "ROME H1302 — Management et ingénierie Hygiène Sécurité Environnement (HSE) industriels. Niveau typiquement Bac+5 (Master/Ingénieur).",
    explanation: "H1302 est l'un des trois codes ROME officiellement associés à la certification RNCP41446 par France compétences. Il couvre la conception et le pilotage du SME/SMS en milieu industriel, la mise en conformité réglementaire, la gestion des risques industriels et des relations avec les autorités (DREAL, inspection du travail). À distinguer de H1523 (Bac+3, niveau du Bachelor QHSE) et H1303 (Bac+2, technicien).",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1302',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'metiers-flashcard-002',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quel code ROME correspond au métier de responsable qualité en industrie, officiellement associé à RNCP41446 ?",
    answer: "ROME H1502 — Management et ingénierie qualité industrielle.",
    explanation: "H1502 est le deuxième code ROME officiellement mappé à RNCP41446 par France compétences. Le responsable qualité industriel pilote le SMQ (ISO 9001), gère la certification produit/process, les audits fournisseurs et la métrologie. Distinct de H1302 (HSE) et H1523 (QSE intégré Bac+3). La conjonction H1302 + H1502 + M1402 constitue la triade ROME de la fiche RNCP41446.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1502',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'metiers-flashcard-003',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quel code ROME correspond exactement au niveau Bachelor (Bac+3) pour le métier de responsable QSE ?",
    answer: "ROME M1402 — Conseil en organisation et management d'entreprise, troisième code officiellement associé à RNCP41446 par France compétences.",
    explanation: "Correction importante : H1523 (Responsable QSE) est le code ROME le plus souvent cité dans les offres d'emploi pour un Bac+3 QSE, MAIS France compétences liste officiellement H1302, H1502 et M1402 comme codes associés à RNCP41446 — pas H1523. M1402 couvre le conseil en organisation, management des processus et systèmes intégrés. H1523 reste un code ROME valide dans la nomenclature France Travail pour les fonctions QSE de niveau Bachelor mais n'apparaît pas dans la fiche RNCP41446 officielle.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME M1402 / RNCP41446',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-flashcard-004',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quel code ROME correspond au technicien HSE (niveau Bac+2) dans la nomenclature France Travail ?",
    answer: "ROME H1303 — Intervention technique en Hygiène Sécurité Environnement. Niveau typiquement Bac+2.",
    explanation: "H1303 couvre les fonctions terrain : réalisation de rondes de sécurité, vérification des EPI/EPC, animation des quarts d'heure sécurité, tenue du registre des accidents. C'est le niveau d'entrée avant H1302 (Bac+5) et H1523 (Bac+3). La distinction H1302/H1303/H1523 est un distractor classique en QCM de formation QHSE.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1303',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'metiers-flashcard-005',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quelle est la structure du code ROME dans la nomenclature France Travail ?",
    answer: "Un code ROME comprend 5 caractères : 1 lettre (domaine professionnel) + 4 chiffres (sous-famille). Exemple : H1302 — lettre H (Industrie), 1302 (Management et ingénierie HSE industriels).",
    explanation: "Le ROME (Répertoire Opérationnel des Métiers et des Emplois) est le référentiel conçu par France Travail et actualisé régulièrement. La lettre indique le grand domaine : H = Industrie, M = Support à l'entreprise, K = Services à la personne et à la collectivité, A = Agriculture… Les 4 chiffres identifient la famille métier puis la fiche. À ne pas confondre avec les NSF (Nomenclature des Spécialités de Formation) ou les codes CPF.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'Référentiel ROME — structure code',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'metiers-flashcard-006',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quels sont les trois codes ROME officiellement associés à la certification RNCP41446 (Bachelor QHSE CESI) selon France compétences ?",
    answer: "H1302 (Management et ingénierie HSE industriels), H1502 (Management et ingénierie qualité industrielle), M1402 (Conseil en organisation et management d'entreprise).",
    explanation: "Ces trois codes sont ceux listés dans la fiche RNCP41446 officielle publiée par France compétences. H1523 (Responsable QSE) est souvent mentionné dans les offres d'emploi pour le niveau Bac+3 QSE, mais il n'apparaît pas dans la fiche RNCP41446 — c'est un piège fréquent. M1402 souligne la dimension 'conseil en management' du Bachelor, au-delà de la seule dimension HSE.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'RNCP41446 — codes ROME associés H1302 / H1502 / M1402',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-flashcard-007',
    type: 'flashcard',
    theme: 'metiers',
    question: "Quel code ROME couvre les fonctions de conseil en organisation et management d'entreprise, troisième code officiel de RNCP41446 ?",
    answer: "ROME M1402 — Conseil en organisation et management d'entreprise. Lettre M = domaine Support à l'entreprise.",
    explanation: "M1402 est moins intuitif que H1302/H1502 pour un profil QHSE, mais sa présence dans la fiche RNCP41446 reflète la composante systémique et transversale du Bachelor : un responsable QSE conseille la direction sur l'organisation des processus, la stratégie RSE et la structuration du SMI (Système de Management Intégré). La lettre M (Support à l'entreprise) rappelle que le QHSE est aussi une fonction siège/direction et pas seulement terrain.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME M1402',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-qcm-001',
    type: 'qcm',
    theme: 'metiers',
    question: "Quel code ROME est officiellement associé à RNCP41446 et couvre le management et l'ingénierie HSE industriels ?",
    answer: "H1302 — Management et ingénierie Hygiène Sécurité Environnement industriels.",
    choices: [
      "H1303 — Intervention technique en Hygiène Sécurité Environnement",
      "H1302 — Management et ingénierie Hygiène Sécurité Environnement industriels.",
      "H1523 — Responsable QSE en industrie",
      "H1502 — Management et ingénierie qualité industrielle"
    ],
    correct: 1,
    explanation: "Option B correcte : H1302 est le code ROME management/ingénierie HSE, officiellement dans la fiche RNCP41446. Option A (H1303) est le niveau technicien Bac+2 — niveau inférieur. Option C (H1523) couvre les fonctions QSE Bac+3 dans les offres d'emploi mais ne figure pas dans la liste officielle des ROME associés à RNCP41446 selon France compétences. Option D (H1502) est aussi un code officiel RNCP41446 mais couvre la qualité industrielle, pas l'HSE.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1302 / RNCP41446',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-qcm-002',
    type: 'qcm',
    theme: 'metiers',
    question: "Un technicien HSE (niveau Bac+2) correspond à quel code ROME dans la nomenclature France Travail ?",
    answer: "H1303 — Intervention technique en Hygiène Sécurité Environnement.",
    choices: [
      "H1302 — Management et ingénierie HSE industriels",
      "H1303 — Intervention technique en Hygiène Sécurité Environnement.",
      "M1402 — Conseil en organisation et management",
      "H1502 — Management et ingénierie qualité industrielle"
    ],
    correct: 1,
    explanation: "Option B correcte : H1303 est le code du technicien HSE, niveau d'entrée dans la filière (Bac+2). Option A (H1302) est le responsable/ingénieur HSE Bac+5 — le niveau supérieur. Option C (M1402) est le conseil en organisation, domaine transverse. Option D (H1502) est la qualité industrielle. La progression de carrière type est H1303 → H1523 (Bachelor) → H1302 (Master/Ingénieur).",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1303',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-qcm-003',
    type: 'qcm',
    theme: 'metiers',
    question: "Quels sont les trois codes ROME officiellement inscrits dans la fiche RNCP41446 de France compétences pour le Bachelor QHSE CESI ?",
    answer: "H1302, H1502, M1402.",
    choices: [
      "H1302, H1502, H1523",
      "H1302, H1303, H1502",
      "H1302, H1502, M1402.",
      "H1523, H1502, M1402"
    ],
    correct: 2,
    explanation: "Option C correcte : France compétences liste H1302 (HSE industriels), H1502 (qualité industrielle) et M1402 (conseil en organisation) pour RNCP41446. Option A substitue H1523 à M1402 — H1523 est pertinent en pratique mais absent de la fiche officielle. Option B substitue H1303 (technicien Bac+2) à M1402. Option D substitue H1523 à H1302. Le piège principal est H1523 : très présent dans les offres d'emploi pour ce niveau mais pas dans la fiche RNCP officielle.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'RNCP41446 — codes ROME H1302 / H1502 / M1402',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 3
  },

  {
    id: 'metiers-qcm-004',
    type: 'qcm',
    theme: 'metiers',
    question: "Dans la nomenclature ROME, que signifie la lettre initiale du code ROME d'un poste QHSE industriel comme H1302 ?",
    answer: "La lettre H désigne le domaine professionnel 'Industrie' dans la nomenclature ROME de France Travail.",
    choices: [
      "La lettre H signifie 'Hygiène' — initiale du domaine HSE",
      "La lettre H désigne le domaine professionnel 'Industrie' dans la nomenclature ROME de France Travail.",
      "La lettre H identifie le niveau de qualification (H = Bac+3 à Bac+5)",
      "La lettre H désigne le domaine 'Santé et action sociale' dans la nomenclature ROME"
    ],
    correct: 1,
    explanation: "Option B correcte : dans le ROME, la lettre indique le grand domaine professionnel, pas une initiale de spécialité. H = Industrie. Autres exemples : M = Support à l'entreprise (d'où M1402), K = Services à la collectivité, A = Agriculture, B = Arts, D = Commerce. Option A est un faux ami intuitif (H pour Hygiène) mais inexact. Option C est fausse : le code ROME n'encode pas le niveau. Option D (Santé) est inexact — la lettre K couvre services à la personne et à la collectivité.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'Référentiel ROME — domaines professionnels',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'metiers-qcm-005',
    type: 'qcm',
    theme: 'metiers',
    question: "Quel code ROME couvre les fonctions de responsable qualité industrielle (hors HSE), officiellement associé à RNCP41446 ?",
    answer: "H1502 — Management et ingénierie qualité industrielle.",
    choices: [
      "M1402 — Conseil en organisation et management d'entreprise",
      "H1302 — Management et ingénierie HSE industriels",
      "H1502 — Management et ingénierie qualité industrielle.",
      "H1303 — Intervention technique en HSE"
    ],
    correct: 2,
    explanation: "Option C correcte : H1502 est le code ROME dédié à la qualité industrielle — pilotage du SMQ ISO 9001, audits qualité, métrologie, certification produit. Option A (M1402) est le conseil en organisation — transverse mais moins centré qualité produit/process. Option B (H1302) est l'HSE, pas la qualité au sens strict. Option D (H1303) est le technicien HSE terrain. H1502 + H1302 + M1402 forment la triade ROME officielle de RNCP41446.",
    source: {
      authority: 'France Travail — nomenclature ROME',
      ref: 'code ROME H1502 / RNCP41446',
      url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  /* =========================================================
   * THEME: rncp (13 items — 8 flashcards + 5 QCM)
   * Authority: France compétences — fiche RNCP41446
   * Ref: RNCP41446 / BC01–BC04
   * ========================================================= */

  {
    id: 'rncp-flashcard-001',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel est le numéro de fiche RNCP du Bachelor QHSE de CESI et quel est son intitulé officiel ?",
    answer: "RNCP41446 — Responsable qualité sécurité environnement. Certificateur : CESI Ecole d'Ingénieurs.",
    explanation: "RNCP41446 est la fiche officielle publiée par France compétences pour la certification CESI Bac+3 QHSE. L'intitulé exact est 'Responsable qualité sécurité environnement' (pas 'Bachelor QHSE' qui est le nom commercial CESI). Le SIRET du certificateur est 77572257201109. La fiche est valable jusqu'au 27-10-2030.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-002',
    type: 'flashcard',
    theme: 'rncp',
    question: "À quel niveau du cadre européen des certifications (EQF) correspond RNCP41446 et à quel niveau français cela correspond-il ?",
    answer: "Niveau 6 du Cadre National des Certifications (CNC), équivalent Bac+3 — niveau Bachelor / Licence.",
    explanation: "Niveau 6 = Bac+3 dans la nomenclature française issue du décret 2019-14. À distinguer du Niveau 7 (Bac+5 Master/Ingénieur) et du Niveau 5 (Bac+2 BTS/DUT). Piège fréquent : confondre Niveau 6 avec le niveau 6 ECTS (crédits) ou avec l'ancienne nomenclature Niveau I/II. RNCP41446 est explicitement 'Niveau 6' dans la fiche France compétences — pas 'Niveau III' (ancienne classification).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — Niveau 6',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-003',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quelle est la date d'échéance de l'enregistrement de RNCP41446 au Répertoire National des Certifications Professionnelles ?",
    answer: "27 octobre 2030 (27-10-2030).",
    explanation: "L'enregistrement au RNCP a une durée limitée. Passée cette date, la certification n'est plus reconnue par l'État comme RNCP si elle n'est pas renouvelée. Pour RNCP41446, l'échéance est le 27-10-2030. Cela signifie que les promotions CESI entrant en formation avant cette date et la terminant dans les délais normaux verront leur diplôme reconnu. Le renouvellement est à l'initiative du certificateur (CESI).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — date d\'échéance 27-10-2030',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-004',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel est l'intitulé exact du Bloc de Compétences 01 (BC01) de RNCP41446 ?",
    answer: "BC01 — Construire le système de management QSE.",
    explanation: "BC01 couvre la conception et la mise en place du SMI QSE (Système de Management Intégré) : diagnostic initial, politique QSE, cartographie des processus, planification des actions, structuration documentaire. C'est la phase 'Construire' du cycle de vie d'un SMQSE. Piège classique : intervertir BC01 (Construire) et BC02 (Améliorer). 'Construire' précède 'Améliorer' dans la logique PDCA (Plan avant Do/Check/Act).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC01',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-005',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel est l'intitulé exact du Bloc de Compétences 02 (BC02) de RNCP41446 ?",
    answer: "BC02 — Améliorer le système de management QSE.",
    explanation: "BC02 couvre la phase d'amélioration continue du SMQSE existant : audits internes, revues de direction, traitement des non-conformités, actions correctives et préventives, indicateurs de performance QSE. C'est la phase 'Check–Act' du PDCA sur un système déjà déployé. Distinct de BC01 (construction initiale) et BC03 (management des risques spécifiques).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC02',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-006',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel est l'intitulé exact du Bloc de Compétences 03 (BC03) de RNCP41446 ?",
    answer: "BC03 — Manager les risques QSE.",
    explanation: "BC03 couvre la démarche d'évaluation et de traitement des risques professionnels, environnementaux et qualité : DUERP, analyse des risques chimiques/physiques/RPS, plan de prévention, PPRE (plan de prévention des risques environnementaux), gestion des situations d'urgence. C'est la compétence 'risque opérationnel' au sens large. Piège : attribuer 'Manager les risques' à BC04 (qui couvre RSE/DD, pas les risques opérationnels).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC03',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-007',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel est l'intitulé exact du Bloc de Compétences 04 (BC04) de RNCP41446 ?",
    answer: "BC04 — Accompagner l'organisme dans ses démarches RSE et de développement durable.",
    explanation: "BC04 est le seul bloc qui dépasse la conformité réglementaire pour aller vers la stratégie d'entreprise responsable : reporting extra-financier (CSRD), bilan carbone, achats responsables, parties prenantes, label RSE. L'intitulé combine explicitement RSE ET développement durable (ne pas tronquer en 'développement durable' seul). C'est aussi le bloc le plus évolutif : la réglementation RSE (directive CSRD, taxonomie verte) évolue rapidement.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC04',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'rncp-flashcard-008',
    type: 'flashcard',
    theme: 'rncp',
    question: "Quel organisme est le certificateur officiel de RNCP41446 (Bachelor Responsable QSE) ?",
    answer: "CESI Ecole d'Ingénieurs (SIRET 77572257201109).",
    explanation: "CESI est à la fois organisme de formation et certificateur de la certification RNCP41446. La double casquette (formation + certification) est courante pour les grandes écoles privées. Le SIRET figure dans la fiche France compétences pour permettre la vérification administrative de l'organisme certificateur. À ne pas confondre avec les certificateurs institutionnels (Ministères) pour les diplômes nationaux.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — certificateur CESI SIRET 77572257201109',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rncp-qcm-001',
    type: 'qcm',
    theme: 'rncp',
    question: "Quel est l'intitulé du Bloc de Compétences 01 (BC01) dans la fiche RNCP41446 ?",
    answer: "Construire le système de management QSE.",
    choices: [
      "Améliorer le système de management QSE",
      "Construire le système de management QSE.",
      "Manager les risques QSE",
      "Accompagner l'organisme dans ses démarches RSE et de développement durable"
    ],
    correct: 1,
    explanation: "Option B correcte : BC01 = 'Construire le système de management QSE'. Option A est BC02 (Améliorer). Option C est BC03 (Manager les risques). Option D est BC04 (RSE et DD). L'ordre BC01→BC04 suit une progression logique : construire le système → l'améliorer → gérer les risques → intégrer la dimension stratégique RSE. La confusion BC01/BC02 est le piège le plus fréquent (mêmes thèmes, ordre inversé).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC01–BC04',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rncp-qcm-002',
    type: 'qcm',
    theme: 'rncp',
    question: "Quel bloc de RNCP41446 couvre spécifiquement les démarches RSE et de développement durable ?",
    answer: "BC04 — Accompagner l'organisme dans ses démarches RSE et de développement durable.",
    choices: [
      "BC01 — Construire le système de management QSE",
      "BC02 — Améliorer le système de management QSE",
      "BC03 — Manager les risques QSE",
      "BC04 — Accompagner l'organisme dans ses démarches RSE et de développement durable."
    ],
    correct: 3,
    explanation: "Option D correcte : BC04 est explicitement dédié à la RSE et au développement durable — reporting extra-financier CSRD, bilan carbone, achats responsables, labellisation RSE. Les trois premiers blocs (BC01–BC03) couvrent le système QSE interne (construction, amélioration, risques). BC04 est la dimension stratégique externe et sociétale. Piège : attribuer RSE à BC03 (qui couvre les risques opérationnels QSE, pas la stratégie RSE).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC04',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rncp-qcm-003',
    type: 'qcm',
    theme: 'rncp',
    question: "Quel est le niveau officiel de RNCP41446 dans le Cadre National des Certifications ?",
    answer: "Niveau 6 (Bac+3, équivalent Bachelor / Licence).",
    choices: [
      "Niveau 5 (Bac+2, BTS/BUT)",
      "Niveau 6 (Bac+3, équivalent Bachelor / Licence).",
      "Niveau 7 (Bac+5, Master/Ingénieur)",
      "Niveau III (ancienne classification RNCP)"
    ],
    correct: 1,
    explanation: "Option B correcte : RNCP41446 est enregistré Niveau 6 = Bac+3. Option A (Niveau 5) est Bac+2 (BTS, BUT, DEUST). Option C (Niveau 7) est Bac+5 (Master, diplôme d'ingénieur). Option D utilise l'ancienne nomenclature (Niveau I/II/III) abandonnée en 2019 — Niveau III correspondait à Bac+2, pas Bac+3. Depuis le décret 2019-14, la nomenclature est 1 à 8 (alignée sur le cadre européen EQF).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — Niveau 6',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rncp-qcm-004',
    type: 'qcm',
    theme: 'rncp',
    question: "Jusqu'à quelle date l'enregistrement de RNCP41446 est-il valide selon France compétences ?",
    answer: "27 octobre 2030.",
    choices: [
      "27 octobre 2025",
      "27 octobre 2028",
      "27 octobre 2030.",
      "31 décembre 2030"
    ],
    correct: 2,
    explanation: "Option C correcte : la date d'échéance de RNCP41446 est le 27-10-2030, telle qu'indiquée dans la fiche France compétences. Option A (2025) est dépassée — la certification est active. Option B (2028) est une date inventée. Option D (31 décembre 2030) reprend l'année correcte mais avec une date de fin d'année erronée. La date exacte (jour/mois/année) est un fait mémorisable car elle figure telle quelle dans la fiche officielle.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — date d\'échéance',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  {
    id: 'rncp-qcm-005',
    type: 'qcm',
    theme: 'rncp',
    question: "Quel bloc de RNCP41446 couvre spécifiquement le management des risques QSE ?",
    answer: "BC03 — Manager les risques QSE.",
    choices: [
      "BC01 — Construire le système de management QSE",
      "BC02 — Améliorer le système de management QSE",
      "BC03 — Manager les risques QSE.",
      "BC04 — Accompagner l'organisme dans ses démarches RSE et de développement durable"
    ],
    correct: 2,
    explanation: "Option C correcte : BC03 = 'Manager les risques QSE' — DUERP, risques chimiques, RPS, plans de prévention, gestion des urgences. Option A (BC01) construit le système mais n'est pas centré sur les risques. Option B (BC02) améliore le système via audits et non-conformités. Option D (BC04) couvre la RSE/DD, pas les risques opérationnels. Piège : certains confondent BC03 (risques QSE opérationnels) et BC04 (risques stratégiques/sociétaux de la RSE).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC03',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 2
  },

  // ── BATCH F : 6 acronymes déférés de Batch E ─────────────────────────────

  {
    id: 'acronymes-flashcard-015',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie RNCP ?",
    answer: "Répertoire National des Certifications Professionnelles.",
    explanation: "Le RNCP est géré par France compétences (ex-CNCP). Il recense toutes les certifications professionnelles reconnues par l'État : titres professionnels, BTS, licences professionnelles, Bachelor/Master certifiants. Une certification inscrite au RNCP est reconnue officiellement et peut être financée via le CPF. RNCP41446 est le numéro de fiche de la certification Bachelor QHSE de CESI.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 — définition RNCP',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-016',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie CFA dans le contexte de la formation professionnelle ?",
    answer: "Centre de Formation d'Apprentis.",
    explanation: "Le CFA est l'organisme de formation habilité à accueillir les apprentis dans le cadre d'un contrat d'apprentissage. CESI dispose de son propre CFA. Le CFA assure la formation théorique (au moins 25 % de la durée totale du contrat d'apprentissage) pendant que l'entreprise d'accueil assure la formation pratique sous la supervision d'un maître d'apprentissage. À distinguer du CIF (Congé Individuel de Formation, supprimé en 2019) et du CPF (Compte Personnel de Formation).",
    source: {
      authority: 'Service Public — Contrat d\'apprentissage',
      ref: 'F2918 — définition CFA / contrat apprentissage',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-017',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie VAE ?",
    answer: "Validation des Acquis de l'Expérience.",
    explanation: "La VAE permet d'obtenir tout ou partie d'une certification professionnelle (diplôme, titre, certificat) inscrite au RNCP en faisant reconnaître son expérience professionnelle ou bénévole, sans repasser par une formation complète. Ouverte à toute personne justifiant d'au moins 1 an d'expérience en rapport avec la certification visée. Pertinent pour accéder à RNCP41446 via une expérience QHSE terrain. Régie par les articles L6411-1 et suivants du Code du travail.",
    source: {
      authority: 'Service Public — Validation des acquis de l\'expérience',
      ref: 'F2401 — VAE définition et conditions',
      url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2401',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-018',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie BC01 dans la fiche RNCP41446 ?",
    answer: "BC01 — Bloc de Compétences 01 : Construire le système de management QSE.",
    explanation: "Dans la nomenclature RNCP, les Blocs de Compétences (BC) découpent la certification en unités capitalisables indépendantes. BC01 est le premier bloc de RNCP41446 : il couvre la conception et la mise en place du Système de Management Intégré QSE (diagnostic, politique, cartographie processus, planification). La certification peut être obtenue bloc par bloc via la VAE ou la formation modulaire.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC01',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-019',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie BC02 dans la fiche RNCP41446 ?",
    answer: "BC02 — Bloc de Compétences 02 : Améliorer le système de management QSE.",
    explanation: "BC02 couvre l'amélioration continue du SMQSE existant : audits internes, revues de direction, traitement des non-conformités, actions correctives et préventives, mesure de la performance par indicateurs QSE. C'est la dimension 'Check–Act' du PDCA sur un système déjà déployé. À distinguer de BC01 (Construire) qui est la mise en place initiale.",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC02',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

  {
    id: 'acronymes-flashcard-020',
    type: 'flashcard',
    theme: 'acronymes',
    question: "Que signifie BC03 dans la fiche RNCP41446 ?",
    answer: "BC03 — Bloc de Compétences 03 : Manager les risques QSE.",
    explanation: "BC03 couvre l'identification, l'évaluation et le traitement des risques professionnels, environnementaux et qualité : DUERP, analyse des risques chimiques/biologiques/physiques et RPS, plans de prévention, gestion des situations d'urgence et des accidents. C'est le bloc le plus directement lié à l'expérience terrain HSE. À distinguer de BC04 (RSE et développement durable, dimension stratégique).",
    source: {
      authority: 'France compétences — fiche RNCP41446',
      ref: 'RNCP41446 BC03',
      url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
      verified: '2026-05-20'
    },
    difficulty: 1
  },

]; // end window.BANK
// Total items: 226 — verified 2026-05-20
