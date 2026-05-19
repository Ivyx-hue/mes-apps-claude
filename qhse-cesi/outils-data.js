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
  }

]; // end window.BANK
// Total items: 36 — verified 2026-05-19
