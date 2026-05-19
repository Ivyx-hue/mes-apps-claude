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
      "40 ans",
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
      "50 salariés et plus",
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
      "Préparer la démarche (périmètre, acteurs, ressources)",
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
      "L'employeur"
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
      "Un changement de dirigeant de l'entreprise",
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
      "L'unité de travail",
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
      "Elle a étendu la conservation à 40 ans et rendu le Papripact obligatoire ≥ 50 salariés",
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
      "Combattre les risques à la source",
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
      "9 principes",
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
      "La protection collective, qui prime sur la protection individuelle",
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
      "4e principe",
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
      "Les risques psychosociaux (RPS) et le harcèlement",
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
      "Principe 5 : tenir compte de l'état d'évolution de la technique",
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
      "Remplacer (6e) vient avant planifier (7e)",
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
    question: "Quelle norme ISO 45001:2018 remplace-t-elle ?",
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
      "ISO 45001 exige explicitement la consultation et la participation des travailleurs (§5.4)",
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
      "ISO 45001 utilise la High Level Structure (HLS) commune à ISO 9001:2015 et ISO 14001:2015",
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
      "Le danger est la source potentielle de dommage ; le risque est la combinaison probabilité × gravité",
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
      "L'évaluation des performances : surveillance, mesure, audits internes, revues de direction",
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
      "ISO 9001:2015 a 8 principes de management de la qualité (comme la version 2000)",
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
      "La correction traite la non-conformité elle-même ; l'action corrective élimine la cause pour éviter la récurrence",
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
      "L'aspect est la cause (élément de l'activité) ; l'impact est l'effet (modification de l'environnement)",
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
    question: "Qu'est-ce qu'une 'obligation de conformité' dans ISO 14001:2015 ?",
    answer: "Toute exigence légale ou autre exigence que l'organisme doit ou choisit de respecter en matière environnementale.",
    choices: [
      "Uniquement les lois et règlements environnementaux obligatoires",
      "Les objectifs chiffrés de performance environnementale de l'organisme",
      "Toute exigence légale ou autre exigence que l'organisme doit ou choisit de respecter",
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
      "La perspective de cycle de vie : considérer les aspects de l'extraction jusqu'à la fin de vie",
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
      "Volontaire. Elle certifie le système de management (la démarche), pas un niveau de performance absolue",
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
  }

]; // end window.BANK
// Total items: 82 — verified 2026-05-20
