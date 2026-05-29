/* qhse-cesi/fiches-data.js
 * Fiches de révision content — Phase 5.
 * window.FICHES: array of exam-grade study sheets, one per BANK theme (15 total).
 * Schema: { slug, title, tldr, definitions[], cadreLegal, demarche, selectedIds[], pieges[], sources[] }
 *   - slug          : matches a window.BANK theme slug (duerp, iso-9001, …)
 *   - title         : French display title
 *   - tldr          : one-paragraph synthesis (plain text, no HTML)
 *   - definitions[] : { term, value } key-vocabulary list (all plain text)
 *   - cadreLegal    : whitelisted-HTML string (legal framework) — safeSetHTML filter in IIFE
 *   - demarche      : whitelisted-HTML string (method / steps) — safeSetHTML filter in IIFE
 *   - selectedIds[] : 5-10 BANK item ids surfaced as "Questions clés"
 *   - pieges[]      : common exam traps (plain text)
 *   - sources[]     : { authority, ref, url } citation list
 * Consumed by: P5 Fiches IIFE in outils.html (read-only; never writes SRS/scores — DEC-09).
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 *
 * Wave 2 (Plan 05-02) ships 4 fiches: duerp, principes-generaux, iso-9001, iso-14001.
 * Plans 05-03..05-05 add the remaining 11 fiches.
 *
 * WR-04: idempotent double-load guard. If this file is included twice, the first
 * FICHES wins — a second load must not silently overwrite markers/state downstream
 * code attached. window.FICHES stays a plain global (no IIFE, no module scope) so it
 * is readable as the bare identifier FICHES in the browser console.
 */
if (window.FICHES && window.FICHES.length) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('fiches-data.js loaded twice — keeping the first FICHES');
  }
} else {
window.FICHES = [

  /* =========================================================
   * FICHE 1: duerp
   * Plan 05-02, Wave 2
   * selectedIds: 8 items from duerp pool (18 total in BANK)
   * URL verification: INRS + service-public.fr (curl 200, 2026-05-29)
   * ========================================================= */
  {
    slug: 'duerp',
    title: 'DUERP',
    tldr: 'Le Document Unique d\'Évaluation des Risques Professionnels (DUERP) est obligatoire dès le premier salarié et constitue la pièce maîtresse de la prévention en entreprise — il transcrit les résultats de l\'évaluation des risques par unité de travail, doit être mis à jour au moins une fois par an dans les entreprises de 11 salariés et plus, et se conserve pendant 40 ans. Fondement réglementaire du Bachelor QHSE, il tombe à chaque promotion.',
    definitions: [
      {
        term: 'DUERP',
        value: 'Document Unique d\'Évaluation des Risques Professionnels. Transcription obligatoire des résultats de l\'évaluation des risques pour la santé et la sécurité des travailleurs, établi par unité de travail. Imposé par l\'art. R4121-1 du Code du travail depuis le décret du 5 novembre 2001.'
      },
      {
        term: 'Unité de travail',
        value: 'Regroupement de salariés exposés aux mêmes risques professionnels. Peut correspondre à un poste, un atelier, un secteur ou une activité. C\'est le grain d\'analyse de l\'EvRP — ni trop fin (poste individuel) ni trop large (site entier).'
      },
      {
        term: 'Danger',
        value: 'Propriété ou capacité intrinsèque d\'un équipement, d\'une substance, d\'une méthode de travail ou d\'une situation à causer un dommage pour la santé des travailleurs. Ex : une machine sans carter est un danger mécanique.'
      },
      {
        term: 'Risque professionnel',
        value: 'Probabilité qu\'un travailleur subisse un dommage suite à une exposition à un danger, combinée à la gravité potentielle de ce dommage. Risque = f(danger × exposition). C\'est ce qu\'évalue le DUERP.'
      },
      {
        term: 'EvRP',
        value: 'Évaluation des Risques Professionnels. Démarche structurée en 5 étapes : préparer → identifier les dangers → évaluer et hiérarchiser → planifier les actions → mettre en œuvre et réévaluer. L\'EvRP est continue, non ponctuelle.'
      },
      {
        term: 'Papripact',
        value: 'Programme Annuel de Prévention des Risques Professionnels et d\'Amélioration des Conditions de Travail. Obligatoire depuis la loi du 2 août 2021 dans les entreprises d\'au moins 50 salariés. Liste les actions concrètes à conduire dans l\'année, annexé au DUERP.'
      },
      {
        term: 'Faute inexcusable',
        value: 'Faute de l\'employeur qui avait ou aurait dû avoir conscience du danger et n\'a pas pris les mesures nécessaires pour le prévenir. L\'absence de DUERP ou une EvRP insuffisante facilite grandement la reconnaissance de la faute inexcusable en cas d\'accident.'
      }
    ],
    cadreLegal: '<p>L\'obligation d\'évaluer les risques professionnels et de transcrire les résultats dans un document unique est posée par <span class="fi-cite"><a href="https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. R4121-1 Code du travail</code></a></span>. L\'obligation générale de sécurité de l\'employeur est quant à elle fondée sur <span class="fi-cite"><a href="https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-1 Code du travail</code></a></span>.</p><p>La mise à jour du DUERP est régie par <span class="fi-cite"><a href="https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-3 Code du travail</code></a></span> : au moins une fois par an dans les entreprises de 11 salariés et plus, et lors de toute décision d\'aménagement important ou d\'information nouvelle sur un risque.</p><p>La loi du 2 août 2021 a renforcé le dispositif en portant la durée de conservation à <strong>40 ans</strong> et en rendant obligatoire le Papripact dans les entreprises de 50 salariés et plus <span class="fi-cite"><a href="https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-3-1 Code du travail</code></a></span>. L\'absence de DUERP est passible d\'une contravention de 5e classe (amende jusqu\'à 1 500 € par unité de travail non couverte, <code>Art. R4741-1</code>).</p>',
    demarche: '<p>La démarche d\'évaluation des risques professionnels suit <strong>5 étapes</strong> successives, selon le référentiel INRS :</p><ul><li><strong>Préparer la démarche</strong> — définir le périmètre (unités de travail), mobiliser les acteurs (employeur, CSE, médecin du travail, SPST, salariés) et choisir les outils.</li><li><strong>Identifier les dangers</strong> par unité de travail — liste exhaustive des dangers mécaniques, chimiques, biologiques, psychosociaux, organisationnels, etc.</li><li><strong>Évaluer et hiérarchiser les risques</strong> — combiner la probabilité d\'occurrence et la gravité potentielle pour chaque danger identifié. Produire une cotation ou un classement par priorité.</li><li><strong>Planifier les actions de prévention</strong> — définir les mesures techniques, organisationnelles et humaines en respectant la hiérarchie des 9 principes généraux (L4121-2) : d\'abord supprimer le risque, puis le réduire à la source, puis protéger collectivement, enfin individuellement.</li><li><strong>Mettre en œuvre, suivre et réévaluer</strong> — conduire les actions du plan, mesurer leur efficacité, actualiser le DUERP. Le cycle reprend en continu.</li></ul><p>Le DUERP doit être accessible à tout moment aux salariés, au CSE, à l\'inspecteur du travail et à la CARSAT.</p>',
    selectedIds: [
      'duerp-flashcard-001',
      'duerp-flashcard-002',
      'duerp-flashcard-003',
      'duerp-flashcard-004',
      'duerp-flashcard-005',
      'duerp-qcm-001',
      'duerp-qcm-003',
      'duerp-qcm-006'
    ],
    pieges: [
      'Confusion R4121-1 / L4121-3 / L4121-1 : R4121-1 impose le DUERP (transcription), L4121-3 impose la mise à jour, L4121-1 pose l\'obligation générale de sécurité — trois articles distincts, une seule question de QCM.',
      'Confusion danger / risque : le danger est la propriété intrinsèque (la lame coupante), le risque est la probabilité × gravité de la blessure (risque de coupure).',
      'Le DUERP n\'est PAS réservé aux grandes entreprises : il est obligatoire dès le 1er salarié, sans seuil d\'effectif minimal.',
      'Le Papripact (≥ 50 salariés) et la mise à jour annuelle (≥ 11 salariés) sont deux seuils distincts à ne pas confondre.',
      'La conservation est de 40 ans (loi 2021) et non de 5 ou 10 ans — les durées de conservation d\'autres documents RH sont des distracteurs classiques.',
      'Le CSE est consulté sur le DUERP mais n\'en est pas l\'auteur — la responsabilité juridique reste celle de l\'employeur, même en cas de délégation.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Dossier DUERP — Document unique d\'évaluation des risques',
        url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Évaluation des risques professionnels — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'Service-public.fr',
        ref: 'DUERP — Document unique d\'évaluation des risques professionnels',
        url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F35360'
      }
    ]
  },

  /* =========================================================
   * FICHE 2: principes-generaux
   * Plan 05-02, Wave 2
   * selectedIds: 8 items from principes-generaux pool (18 total in BANK)
   * URL verification: INRS (curl 200, 2026-05-29)
   * ========================================================= */
  {
    slug: 'principes-generaux',
    title: 'Principes généraux',
    tldr: 'Les 9 principes généraux de prévention, énumérés à l\'article L4121-2 du Code du travail, constituent le fondement hiérarchisé de toute démarche de prévention des risques professionnels — l\'employeur doit les appliquer dans l\'ordre, en partant de la suppression du risque jusqu\'à la formation des travailleurs. Leur ordre exact et leur articulation avec L4121-1 sont des points testés à chaque promotion du Bachelor QHSE.',
    definitions: [
      {
        term: 'L4121-2',
        value: 'Article du Code du travail qui énumère les 9 principes généraux de prévention. Déclinaison opérationnelle de l\'obligation générale de sécurité posée par L4121-1. Ne pas confondre : L4121-1 = obligation générale (le "quoi"), L4121-2 = les 9 principes (le "comment").'
      },
      {
        term: 'Principe 1 — Éviter les risques',
        value: 'Supprimer le risque en éliminant l\'activité dangereuse ou en remplaçant la situation dangereuse. Mesure de prévention absolue, hiérarchiquement supérieure à tous les autres principes.'
      },
      {
        term: 'Principe 2 — Évaluer les risques',
        value: 'Évaluer les risques qui ne peuvent pas être évités, afin de les combattre à la source (principe 3) ou de les réduire. Base de l\'EvRP et du DUERP.'
      },
      {
        term: 'Principe 3 — Combattre à la source',
        value: 'Agir là où le risque est généré plutôt que sur ses effets. Ex : encapsuler une source de bruit plutôt que distribuer des bouchons d\'oreilles.'
      },
      {
        term: 'Principe 4 — Adapter le travail à l\'homme',
        value: 'Concevoir le travail (postes, rythmes, outils, organisation) pour s\'adapter aux caractéristiques physiques et cognitives de l\'être humain. Traduit l\'ergonomie en obligation légale.'
      },
      {
        term: 'Principe 8 — Protection collective avant individuelle',
        value: 'Donner la priorité aux mesures de protection collective (garde-corps, aspiration à la source, écran) sur les EPI (masques, gants, casques). Les EPI arrivent en dernier recours.'
      },
      {
        term: 'Principe 9 — Instructions appropriées',
        value: 'Dernier principe : donner aux travailleurs les instructions et la formation nécessaires. En dernière position non parce qu\'elles sont facultatives, mais parce qu\'elles reposent sur le comportement humain, faillible.'
      },
      {
        term: 'Hiérarchie de prévention',
        value: 'L\'ordre des 9 principes est hiérarchisé : on ne passe au principe suivant que si le précédent ne peut pas être mis en œuvre. Élimination > Réduction à la source > Protection collective > EPI > Formation.'
      }
    ],
    cadreLegal: '<p>Les 9 principes généraux de prévention sont énumérés par <span class="fi-cite"><a href="https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-2 Code du travail</code></a></span>. Ils constituent la déclinaison concrète de l\'obligation générale de l\'employeur posée par <span class="fi-cite"><a href="https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-1 Code du travail</code></a></span>.</p><p>Le non-respect de ces principes peut engager la responsabilité pénale de l\'employeur, notamment en cas de faute inexcusable reconnue suite à un accident du travail. L\'obligation de sécurité de l\'employeur est qualifiée d\'obligation de moyens renforcée depuis les arrêts amiante de la Cour de cassation (2002).</p><p>Le principe 7 mentionne explicitement dans son texte l\'intégration des facteurs psychosociaux et du harcèlement — ce qui intègre les RPS dans le cadre légal général de la prévention, aux côtés des risques physiques.</p>',
    demarche: '<p>Les 9 principes généraux s\'appliquent en respectant leur <strong>ordre hiérarchique</strong>, du plus protecteur (élimination) au moins protecteur (formation) :</p><ul><li><strong>P1 — Éviter les risques</strong> : supprimer l\'activité ou la situation dangereuse. Ex : remplacer une machine bruyante par un procédé silencieux.</li><li><strong>P2 — Évaluer les risques non évitables</strong> : fonder la démarche sur l\'EvRP et le DUERP.</li><li><strong>P3 — Combattre à la source</strong> : encapsuler la source de bruit, capturer les poussières au point d\'émission.</li><li><strong>P4 — Adapter le travail à l\'homme</strong> : ergonomie des postes, rotation des tâches, réduction du travail cadencé.</li><li><strong>P5 — Tenir compte de l\'évolution technique</strong> : adopter les technologies plus sûres quand elles sont disponibles et accessibles.</li><li><strong>P6 — Remplacer le dangereux</strong> : substituer une substance cancérogène par un produit moins nocif.</li><li><strong>P7 — Planifier la prévention</strong> : inscrire la prévention dans le temps (DUERP + Papripact + plan d\'actions), en intégrant aussi les RPS.</li><li><strong>P8 — Protection collective avant individuelle</strong> : garde-corps, aspiration à la source, écrans de protection avant EPI.</li><li><strong>P9 — Donner les instructions</strong> : former et informer les travailleurs — en dernier, car c\'est la mesure la moins fiable.</li></ul><p>Dans la pratique, la hiérarchie STOP (Suppression / Technical controls / Organisational / Personal protection) est un mémo pédagogique qui reflète cet ordre.</p>',
    selectedIds: [
      'principes-generaux-flashcard-001',
      'principes-generaux-flashcard-003',
      'principes-generaux-flashcard-005',
      'principes-generaux-flashcard-008',
      'principes-generaux-qcm-001',
      'principes-generaux-qcm-002',
      'principes-generaux-qcm-003',
      'principes-generaux-qcm-006'
    ],
    pieges: [
      'Confusion L4121-1 / L4121-2 : L4121-1 = obligation générale de sécurité, L4121-2 = liste des 9 principes. Un QCM classique demande "quel article liste les 9 principes ?" — réponse L4121-2, pas L4121-1.',
      'L\'ordre des principes est exam-critique : certaines questions présentent les 4 premiers dans le désordre. Mémo : Éviter / Évaluer / Combattre / Adapter / Technique / Remplacer / Planifier / Collectif / Instructions.',
      'Confusion principe vs. mesure de prévention : les 9 principes sont des règles d\'ordonnancement, pas des mesures concrètes. Une "aspiration à la source" est une mesure (principe 3), pas un principe en soi.',
      'Protection collective (P8) prime TOUJOURS sur les EPI (P9) — un QCM qui propose EPI en priorité est un piège classique.',
      'Le principe 7 (planifier la prévention) mentionne explicitement les RPS et le harcèlement dans son texte légal — beaucoup l\'ignorent et pensent que les RPS relèvent d\'une réglementation séparée.',
      'L\'ISO 9001 a 7 principes de management de la qualité ; L4121-2 en a 9 pour la prévention — ne pas confondre dans les QCM croisés.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Principes généraux de prévention — Neuf principes généraux',
        url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 3: iso-9001
   * Plan 05-02, Wave 2
   * selectedIds: 8 items from iso-9001 pool (14 total in BANK)
   * URL verification: Wikipédia FR (curl 200, title "ISO 9001 — Wikipédia", 2026-05-29)
   * Locked decision STATE.md: "ISO source.url = Wikipedia FR for all three ISO themes"
   * ========================================================= */
  {
    slug: 'iso-9001',
    title: 'ISO 9001',
    tldr: 'ISO 9001:2015 définit les exigences d\'un Système de Management de la Qualité (SMQ) fondé sur 7 principes, le cycle PDCA et la pensée basée sur les risques — c\'est la norme de certification qualité la plus déployée au monde, applicable à tout type d\'organisme. Sa structure en High Level Structure (HLS, §4 à §10) est partagée avec ISO 14001:2015 et ISO 45001:2018, ce qui permet d\'intégrer les trois systèmes en un SMI.',
    definitions: [
      {
        term: 'SMQ',
        value: 'Système de Management de la Qualité. Ensemble des activités coordonnées pour diriger et contrôler un organisme en matière de qualité. ISO 9001 en définit les exigences (ce que l\'organisme DOIT faire). ISO 9000 en définit le vocabulaire.'
      },
      {
        term: '7 principes de management de la qualité',
        value: 'Depuis ISO 9001:2015 (et non 8 principes comme en 2000/2008) : 1-Orientation client, 2-Leadership, 3-Implication du personnel, 4-Approche processus, 5-Amélioration, 6-Prise de décision fondée sur des preuves, 7-Management des relations avec les parties intéressées.'
      },
      {
        term: 'Approche processus',
        value: '4e principe de management de la qualité. Consiste à comprendre et gérer les activités comme des processus interdépendants formant un système cohérent. Chaque processus a des entrées, des sorties, des séquences et des interactions à maîtriser.'
      },
      {
        term: 'PDCA',
        value: 'Cycle Plan-Do-Check-Act (Roue de Deming). Structuration de la HLS : §6=Planifier, §8=Développer/Faire, §9=Contrôler, §10=Agir. Principe moteur de l\'amélioration continue dans tout le SMQ.'
      },
      {
        term: 'Non-conformité',
        value: 'Non-respect d\'une exigence. ISO 9001 §10.2 distingue la correction (action sur l\'effet immédiat) et l\'action corrective (action sur la cause pour éviter la récurrence). L\'analyse de cause est obligatoire.'
      },
      {
        term: 'Pensée basée sur les risques',
        value: 'Innovation majeure de la révision 2015 : les risques et opportunités sont intégrés dans l\'ensemble du SMQ (§6.1), pas dans un paragraphe isolé. Remplace l\'approche "actions préventives" de la version 2008.'
      },
      {
        term: 'Parties intéressées pertinentes',
        value: 'Personnes ou organisations pouvant avoir une incidence sur l\'aptitude de l\'organisme à fournir en permanence des produits/services conformes (§4.2). Ex : clients, autorités réglementaires, fournisseurs, personnel.'
      },
      {
        term: 'HLS — High Level Structure',
        value: 'Structure de haut niveau commune à ISO 9001:2015, ISO 14001:2015 et ISO 45001:2018 (§4 Contexte → §5 Leadership → §6 Planification → §7 Support → §8 Réalisation → §9 Évaluation → §10 Amélioration). Facilite le SMI.'
      }
    ],
    cadreLegal: '<p>ISO 9001:2015 est une norme internationale volontaire publiée par l\'Organisation internationale de normalisation. Elle remplace ISO 9001:2008 et s\'appuie sur les définitions de <span class="fi-cite"><a href="https://fr.wikipedia.org/wiki/ISO_9001" target="_blank" rel="noopener noreferrer">Wikipédia FR — <code>ISO 9001:2015 (ISO 9000:2015 vocabulaire)</code></a></span>.</p><p>La certification ISO 9001 est délivrée par un organisme de certification accrédité (ex : AFNOR Certification, Bureau Veritas, SGS) — elle n\'est jamais accordée directement par l\'ISO. La certification est valable 3 ans, avec des audits de surveillance annuels.</p><p>ISO 9001 n\'impose pas de niveau de performance qualité absolu : elle exige que l\'organisme s\'améliore continuellement par rapport à ses propres objectifs. La norme s\'applique à tout type et toute taille d\'organisme, dans tous les secteurs.</p>',
    demarche: '<p>La mise en œuvre d\'un SMQ conforme à ISO 9001:2015 suit le <strong>cycle PDCA</strong> appliqué aux 7 paragraphes de la HLS :</p><ul><li><strong>Plan — §4 à §6</strong> : analyser le contexte (§4), affirmer le leadership et définir la politique qualité (§5), planifier les objectifs et traiter les risques et opportunités (§6).</li><li><strong>Do — §7 et §8</strong> : mobiliser les ressources, assurer les compétences et la communication (§7), réaliser les produits et services selon les processus maîtrisés (§8).</li><li><strong>Check — §9</strong> : surveiller et mesurer les processus (§9.1), évaluer la satisfaction client (§9.1.2), conduire les audits internes (§9.2), tenir la revue de direction (§9.3).</li><li><strong>Act — §10</strong> : améliorer en continu (§10.1), traiter les non-conformités et conduire les actions correctives avec analyse de cause (§10.2), améliorer le SMQ (§10.3).</li></ul><p>La revue de direction (§9.3) est la réunion clé qui boucle chaque cycle : elle évalue l\'adéquation du SMQ avec la stratégie et décide des ressources et améliorations pour le cycle suivant.</p>',
    selectedIds: [
      'iso-9001-flashcard-001',
      'iso-9001-flashcard-002',
      'iso-9001-flashcard-003',
      'iso-9001-flashcard-004',
      'iso-9001-flashcard-005',
      'iso-9001-qcm-001',
      'iso-9001-qcm-003',
      'iso-9001-qcm-005'
    ],
    pieges: [
      'ISO 9001:2015 a 7 principes de management de la qualité — PAS 8 (ancienne version 2000/2008) ni 9 (les 9 principes généraux de prévention L4121-2 concernent la SST française, pas la qualité ISO).',
      'La certification ISO 9001 est délivrée par un organisme accrédité, JAMAIS par l\'ISO elle-même. "Certifié ISO" sans précision de l\'organisme = formulation inexacte.',
      'Confusion approche processus (principe 4, §4–§10) vs. approche système : l\'approche processus EST l\'approche système dans ISO 9001:2015 — elles ne sont plus distinguées depuis 2015.',
      'Correction ≠ action corrective : la correction traite l\'effet immédiat de la non-conformité ; l\'action corrective élimine la cause racine. Un QCM demandant la différence est classique.',
      'ISO 9001:2015 n\'impose PAS de procédures documentées obligatoires spécifiques (contrairement à la version 2008 qui listait 6 procédures) — elle exige des informations documentées, dont la forme est laissée à l\'organisme.',
      'Le cycle PDCA mappe sur la HLS : P=§6, D=§8, C=§9, A=§10. §4 et §5 sont le socle (contexte + leadership) qui précède le cycle proprement dit.'
    ],
    sources: [
      {
        authority: 'Wikipédia FR',
        ref: 'ISO 9001 — Système de Management de la Qualité',
        url: 'https://fr.wikipedia.org/wiki/ISO_9001'
      }
    ]
  },

  /* =========================================================
   * FICHE 4: iso-14001
   * Plan 05-02, Wave 2
   * selectedIds: 8 items from iso-14001 pool (14 total in BANK)
   * URL verification: Wikipédia FR (curl 200, title "ISO 14001 — Wikipédia", 2026-05-29)
   * Locked decision STATE.md: "ISO source.url = Wikipedia FR for all three ISO themes"
   * ========================================================= */
  {
    slug: 'iso-14001',
    title: 'ISO 14001',
    tldr: 'ISO 14001:2015 définit les exigences d\'un Système de Management Environnemental (SME) permettant à tout organisme de gérer ses impacts environnementaux de façon systématique et de s\'améliorer en continu — c\'est une norme volontaire (pas une obligation réglementaire), qui partage la HLS avec ISO 9001 et ISO 45001 pour faciliter l\'intégration dans un SMI. La distinction aspect / impact et la notion d\'obligation de conformité sont des points exam incontournables.',
    definitions: [
      {
        term: 'SME',
        value: 'Système de Management Environnemental. Ensemble des processus et pratiques permettant à un organisme de gérer ses responsabilités environnementales de façon systématique. ISO 14001:2015 en définit les exigences.'
      },
      {
        term: 'Aspect environnemental',
        value: 'Élément des activités, produits ou services d\'un organisme susceptible d\'interagir avec l\'environnement. Ex : consommation de solvants, rejets d\'eaux usées, émissions de gaz. C\'est la cause dans la relation aspect → impact.'
      },
      {
        term: 'Impact environnemental',
        value: 'Toute modification de l\'environnement, négative ou positive, résultant totalement ou partiellement d\'un aspect environnemental. Ex : pollution de l\'air (impact) causée par des émissions de COV (aspect). C\'est l\'effet dans la relation aspect → impact.'
      },
      {
        term: 'Obligation de conformité',
        value: 'Exigence légale ou autre exigence que l\'organisme doit ou choisit de respecter en matière environnementale (§6.1.3). Couvre : (1) les lois et règlements (arrêtés ICPE, Code de l\'environnement), et (2) les engagements volontaires.'
      },
      {
        term: 'Perspective de cycle de vie',
        value: 'Innovation clé de la révision 2015 : l\'organisme doit considérer les aspects environnementaux de ses produits/services depuis l\'extraction des matières premières jusqu\'à la fin de vie. Exige de communiquer ses exigences environnementales aux fournisseurs.'
      },
      {
        term: 'Aspects environnementaux significatifs',
        value: 'Aspects ayant ou susceptibles d\'avoir un impact significatif sur l\'environnement (§6.1.2). Identifiés selon des critères définis par l\'organisme (probabilité, gravité, étendue, réversibilité). Fondent les objectifs environnementaux et les contrôles opérationnels.'
      },
      {
        term: 'SMI',
        value: 'Système de Management Intégré. Résulte de la fusion opérationnelle des SMQ (ISO 9001), SME (ISO 14001) et SMSST (ISO 45001) dans une structure commune. Rendu possible par la HLS partagée depuis les révisions 2015/2018.'
      }
    ],
    cadreLegal: '<p>ISO 14001:2015 est une norme internationale volontaire — elle ne crée pas d\'obligation légale mais peut coexister avec les réglementations environnementales obligatoires. Référence normative de base : <span class="fi-cite"><a href="https://fr.wikipedia.org/wiki/ISO_14001" target="_blank" rel="noopener noreferrer">Wikipédia FR — <code>ISO 14001:2015</code></a></span>.</p><p>En France, les installations industrielles soumises à la réglementation ICPE (art. L511-1 et suivants du Code de l\'environnement, administrés par la DREAL) doivent respecter des prescriptions techniques obligatoires indépendamment de toute certification ISO 14001. La norme ISO 14001 intègre ces obligations réglementaires dans la notion d\'obligations de conformité (§6.1.3) : les arrêtés préfectoraux ICPE y figurent au même titre que les engagements volontaires.</p><p>La certification ISO 14001 est délivrée par un organisme accrédité et n\'est pas reconnue comme équivalente à une conformité réglementaire ICPE — les deux démarches sont complémentaires mais distinctes.</p>',
    demarche: '<p>La mise en œuvre d\'un SME conforme à ISO 14001:2015 suit le <strong>cycle PDCA</strong> adapté à l\'environnement :</p><ul><li><strong>Plan — §4 à §6</strong> : analyser le contexte et les parties intéressées (§4), définir la politique environnementale et le leadership de la direction (§5), identifier les aspects environnementaux significatifs, les obligations de conformité et les risques/opportunités, définir les objectifs environnementaux et les plans d\'action (§6).</li><li><strong>Do — §7 et §8</strong> : mobiliser les ressources et assurer les compétences, communiquer en interne et en externe (§7), maîtriser les opérations selon les aspects significatifs, préparer et répondre aux situations d\'urgence environnementale (§8).</li><li><strong>Check — §9</strong> : surveiller et mesurer les performances environnementales (§9.1), évaluer la conformité aux obligations (§9.1.2), conduire les audits internes (§9.2), tenir la revue de direction (§9.3).</li><li><strong>Act — §10</strong> : traiter les non-conformités, conduire les actions correctives, améliorer continuellement le SME (§10).</li></ul><p>La perspective de cycle de vie oblige à intégrer les enjeux amont (fournisseurs, achats) et aval (utilisation, fin de vie du produit) dans la planification, au-delà des seules activités du site.</p>',
    selectedIds: [
      'iso-14001-flashcard-001',
      'iso-14001-flashcard-002',
      'iso-14001-flashcard-003',
      'iso-14001-flashcard-004',
      'iso-14001-flashcard-005',
      'iso-14001-qcm-001',
      'iso-14001-qcm-002',
      'iso-14001-qcm-003'
    ],
    pieges: [
      'Confusion aspect / impact : l\'aspect est la CAUSE (élément de l\'activité qui interagit avec l\'environnement) ; l\'impact est l\'EFFET (modification de l\'environnement). Un QCM qui inverse les définitions est un piège classique.',
      'ISO 14001 est VOLONTAIRE — elle ne constitue pas une obligation réglementaire et ne remplace pas les autorisations ICPE ou les arrêtés préfectoraux.',
      'Confusion ISO 14001 vs. EMAS : EMAS (Eco-Management and Audit Scheme) est le système européen d\'éco-management, plus exigeant qu\'ISO 14001 (il exige un rapport environnemental public annuel validé par un vérificateur accrédité). EMAS intègre ISO 14001 mais va au-delà.',
      'Obligation de conformité ≠ uniquement les lois : le §6.1.3 d\'ISO 14001 couvre AUSSI les exigences volontaires que l\'organisme choisit de respecter (engagements clients, codes de bonne pratique). Un QCM qui restreint la définition aux seules lois est un piège.',
      'La perspective de cycle de vie (2015) ne requiert pas une ACV formelle pour toutes les entreprises — elle exige une prise en compte des phases amont et aval, pas une analyse quantitative complète.',
      'HLS partagée : ISO 9001:2015, ISO 14001:2015 et ISO 45001:2018 ont la même structure §4–§10. OHSAS 18001 n\'utilise PAS la HLS (c\'est son successeur ISO 45001 qui l\'utilise).'
    ],
    sources: [
      {
        authority: 'Wikipédia FR',
        ref: 'ISO 14001 — Système de Management Environnemental',
        url: 'https://fr.wikipedia.org/wiki/ISO_14001'
      }
    ]
  }

];
}
