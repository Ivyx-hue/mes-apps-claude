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
/* WR-05: guard on Array.isArray, not on .length. A prior load that set
 * window.FICHES = [] (empty array — dev tooling, test stub, future pre-alloc)
 * has truthy reference but falsy .length, so the old check failed open and
 * clobbered the existing array along with any markers/state downstream code
 * had attached to it. Array.isArray makes "any prior FICHES array wins". */
if (Array.isArray(window.FICHES)) {
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
      },
      {
        authority: 'Légifrance',
        ref: 'Art. L4121-2 Code du travail — les 9 principes',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033019913'
      },
      {
        authority: 'Légifrance',
        ref: 'Art. L4121-1 Code du travail — obligation générale de prévention',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828'
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
      },
      {
        authority: 'Wikipédia FR',
        ref: 'Système de management de la qualité (SMQ)',
        url: 'https://fr.wikipedia.org/wiki/Système_de_management_de_la_qualité'
      },
      {
        authority: 'Wikipédia FR',
        ref: 'Série des normes ISO 9000',
        url: 'https://fr.wikipedia.org/wiki/ISO_9000'
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
      },
      {
        authority: 'Wikipédia FR',
        ref: 'Management environnemental (SME)',
        url: 'https://fr.wikipedia.org/wiki/Système_de_management_environnemental'
      },
      {
        authority: 'Wikipédia FR',
        ref: 'Série des normes ISO 14000',
        url: 'https://fr.wikipedia.org/wiki/ISO_14000'
      }
    ]
  },

  /* =========================================================
   * FICHE 5: iso-45001
   * Plan 05-03, Wave 3
   * selectedIds: 8 items from iso-45001 pool (18 total in BANK)
   * URL verification: Wikipédia FR (curl 200, 2026-05-29)
   * Locked decision STATE.md: "ISO source.url = Wikipedia FR for all three ISO themes"
   * ========================================================= */
  {
    slug: 'iso-45001',
    title: 'ISO 45001',
    tldr: 'ISO 45001:2018 définit les exigences d\'un Système de Management de la Santé et Sécurité au Travail (SMSST), en remplacement d\'OHSAS 18001 retiré en mars 2021. Première norme ISO internationale dédiée à la SST, elle partage la High Level Structure (HLS) avec ISO 9001:2015 et ISO 14001:2015 — ce qui permet leur intégration dans un SMI. Ses deux apports majeurs par rapport à OHSAS 18001 : l\'analyse du contexte (§4) et la participation obligatoire des travailleurs (§5.4).',
    definitions: [
      {
        term: 'SMSST',
        value: 'Système de Management de la Santé et Sécurité au Travail. Ensemble des processus et pratiques permettant à un organisme de gérer ses responsabilités SST de façon systématique et de s\'améliorer en continu. ISO 45001:2018 en définit les exigences — c\'est la première vraie norme internationale ISO sur la SST.'
      },
      {
        term: 'OHSAS 18001',
        value: 'Référentiel britannique (BSI — British Standards Institution) sur la santé et sécurité au travail, adopté comme standard de facto international depuis 1999. N\'était pas une norme ISO. Retiré officiellement en mars 2021, après une période de transition de 3 ans suivant la publication d\'ISO 45001 en mars 2018.'
      },
      {
        term: 'Danger (hazard)',
        value: 'Source, situation ou acte ayant un potentiel de dommage pour la santé et la sécurité humaines. Ex : machine sans carter, produit corrosif, plancher glissant. C\'est la cause ; le risque en est l\'effet combiné (probabilité × gravité). §6.1.2 impose d\'identifier les dangers avant d\'évaluer les risques.'
      },
      {
        term: 'Participation des travailleurs (§5.4)',
        value: 'Exigence clé d\'ISO 45001 absente d\'OHSAS 18001 : l\'organisation doit établir, mettre en œuvre et maintenir des processus pour consulter et faire participer activement les travailleurs à tous les niveaux. Couvre : identification des dangers, évaluation des risques, définition des objectifs SST et des contrôles opérationnels.'
      },
      {
        term: 'Consultation vs. participation',
        value: 'Distinction importante au sens d\'ISO 45001 : la consultation est un processus unilatéral (l\'employeur demande l\'avis des travailleurs avant de décider) ; la participation implique une implication active dans la prise de décision. ISO 45001 exige les deux, alors qu\'OHSAS 18001 n\'exigeait que la consultation.'
      },
      {
        term: 'Leadership SST (§5.1)',
        value: 'ISO 45001 impose que la direction démontre son leadership et son engagement en matière de SST : définir la politique SST, fixer les objectifs, allouer les ressources, participer aux audits, promouvoir l\'amélioration continue. C\'est une exigence HLS renforcée par rapport à OHSAS 18001.'
      },
      {
        term: 'AT/MP',
        value: 'Accident du Travail / Maladie Professionnelle. Dans le contexte d\'un SMSST, les AT et MP constituent les indicateurs de résultat à réduire. ISO 45001 §10.2 exige une investigation systématique des incidents (AT, presqu\'accidents, situations dangereuses) pour identifier les causes et mettre en œuvre des actions correctives.'
      }
    ],
    cadreLegal: '<p>ISO 45001:2018 est une norme internationale volontaire publiée en mars 2018 par l\'ISO (Organisation internationale de normalisation). Elle remplace <span class="fi-cite"><a href="https://fr.wikipedia.org/wiki/BS_OHSAS_18001" target="_blank" rel="noopener noreferrer">Wikipédia FR — <code>BS OHSAS 18001</code></a></span>, référentiel BSI retiré en mars 2021 après 3 ans de transition.</p><p>En France, l\'obligation légale de l\'employeur en matière de SST repose sur le Code du travail (<code>Art. L4121-1</code> obligation générale, <code>Art. L4121-2</code> 9 principes généraux) — ces obligations existent indépendamment de toute certification ISO 45001. La norme est complémentaire au cadre légal français : son §6.1.3 (exigences légales et autres exigences) impose d\'intégrer les obligations réglementaires dans le SMSST.</p><p>ISO 45001 partage la High Level Structure commune à <span class="fi-cite"><a href="https://fr.wikipedia.org/wiki/ISO_45001" target="_blank" rel="noopener noreferrer">Wikipédia FR — <code>ISO 45001:2018 §4–§10</code></a></span> — ISO 9001:2015 et ISO 14001:2015. Cette structure harmonisée (§4 Contexte, §5 Leadership, §6 Planification, §7 Support, §8 Réalisation, §9 Évaluation, §10 Amélioration) facilite l\'intégration des trois normes en un Système de Management Intégré (SMI).</p>',
    demarche: '<p>La mise en œuvre d\'un SMSST conforme à ISO 45001:2018 suit le <strong>cycle PDCA</strong> appliqué à la SST :</p><ul><li><strong>Plan — §4 à §6</strong> : analyser le contexte et identifier les parties intéressées (§4), démontrer le leadership de la direction et définir la politique SST (§5), identifier les dangers et évaluer les risques (§6.1.2), établir les exigences légales et autres exigences (§6.1.3), définir les objectifs SST et les plans d\'action (§6.2). La participation des travailleurs (§5.4) est requise à chacune de ces étapes.</li><li><strong>Do — §7 et §8</strong> : allouer les ressources, assurer les compétences et la communication (§7), maîtriser les opérations selon la hiérarchie des contrôles — élimination → substitution → contrôles techniques collectifs → contrôles administratifs → EPI (§8.1.2), gérer les changements (§8.1.3), maîtriser les entrepreneurs et sous-traitants (§8.1.4), préparer la réponse aux situations d\'urgence (§8.2).</li><li><strong>Check — §9</strong> : surveiller et mesurer les performances SST (§9.1), investiguer les incidents et non-conformités (§9.1.1), conduire les audits internes (§9.2), tenir la revue de direction (§9.3).</li><li><strong>Act — §10</strong> : traiter les incidents et non-conformités avec analyse de cause racine (§10.2), améliorer continuellement le SMSST (§10.3).</li></ul><p>La revue de direction (§9.3) boucle chaque cycle PDCA : elle évalue l\'adéquation du SMSST et décide des priorités et ressources pour le cycle suivant.</p>',
    selectedIds: [
      'iso-45001-flashcard-001',
      'iso-45001-flashcard-003',
      'iso-45001-flashcard-004',
      'iso-45001-flashcard-005',
      'iso-45001-flashcard-008',
      'iso-45001-qcm-001',
      'iso-45001-qcm-002',
      'iso-45001-qcm-005'
    ],
    pieges: [
      'ISO 45001 ≠ une norme ISO précédente renommée : il n\'existait pas d\'"ISO 18001" — OHSAS 18001 était un référentiel BSI (britannique), pas une norme ISO. ISO 45001 est la première vraie norme ISO internationale sur la SST.',
      'ISO 45001 est VOLONTAIRE — elle ne remplace pas les obligations du Code du travail (DUERP, 9 principes généraux). Les deux coexistent : le SMSST ISO 45001 intègre les obligations légales dans son §6.1.3.',
      'ISO 45001 ≠ DUERP : le SMSST est un cadre de management (comment organiser la SST) ; le DUERP est le document légal français qui transcrit les résultats de l\'EvRP. ISO 45001 §6.1.2 couvre conceptuellement la même démarche, mais le DUERP reste une obligation réglementaire autonome.',
      'Confusion §5.4 (participation travailleurs) vs. §5.1 (leadership direction) : les deux sont dans le chapitre "Leadership" mais concernent des acteurs différents. Un QCM qui inverse les deux est un piège classique.',
      'Consultation ≠ participation au sens d\'ISO 45001 : OHSAS 18001 ne demandait que la consultation ; ISO 45001 exige la participation active à la prise de décision SST.',
      'HLS partagée : ISO 9001:2015, ISO 14001:2015 et ISO 45001:2018 ont tous les chapitres §4–§10. OHSAS 18001 n\'utilise PAS la HLS — c\'est son successeur ISO 45001 qui l\'utilise.'
    ],
    sources: [
      {
        authority: 'Wikipédia FR',
        ref: 'ISO 45001:2018 — Système de management de la santé et sécurité au travail',
        url: 'https://fr.wikipedia.org/wiki/ISO_45001'
      },
      {
        authority: 'Wikipédia FR',
        ref: 'BS OHSAS 18001 — référentiel BSI retiré en mars 2021',
        url: 'https://fr.wikipedia.org/wiki/BS_OHSAS_18001'
      },
      {
        authority: 'Wikipédia FR',
        ref: 'Roue de Deming (PDCA) — cycle Plan-Do-Check-Act',
        url: 'https://fr.wikipedia.org/wiki/PDCA'
      }
    ]
  },

  /* =========================================================
   * FICHE 6: tms
   * Plan 05-03, Wave 3
   * selectedIds: 8 items from tms pool (14 total in BANK)
   * URL verification: INRS + ameli.fr (curl 200, 2026-05-29)
   * ========================================================= */
  {
    slug: 'tms',
    title: 'TMS — Troubles Musculo-Squelettiques',
    tldr: 'Les troubles musculo-squelettiques (TMS) sont la première cause de maladie professionnelle reconnue en France, représentant environ 88 % des MP indemnisées. Ils touchent principalement les membres supérieurs (canal carpien, coiffe des rotateurs, épicondylite) et le rachis. Leur prévention est avant tout collective et organisationnelle — la formation individuelle aux gestes et postures ne suffit pas seule. La démarche INRS en 4 étapes (Mobiliser → Investiguer → Maîtriser → Évaluer) structure l\'action en entreprise.',
    definitions: [
      {
        term: 'TMS',
        value: 'Troubles Musculo-Squelettiques. Affections des muscles, tendons, nerfs, articulations et tissus mous, localisées principalement aux membres supérieurs (poignet, épaule, coude) et au rachis. Contractées progressivement par l\'exposition répétée à des facteurs de risque, ils relèvent des maladies professionnelles, pas des accidents du travail.'
      },
      {
        term: 'MP — Maladie Professionnelle',
        value: 'Affection contractée progressivement lors de l\'exercice d\'une activité professionnelle et listée dans un tableau de maladies professionnelles (Code de la Sécurité Sociale). Les TMS relèvent principalement des tableaux 57 (membres supérieurs) et 98 (lombalgies). La reconnaissance en MP ouvre droit à une indemnisation majorée par rapport à un AT.'
      },
      {
        term: 'Tableau 57',
        value: 'Tableau de maladies professionnelles du régime général le plus sollicité en France. Couvre les affections périarticulaires provoquées par certains gestes et postures de travail : syndrome du canal carpien, tendinites de la coiffe des rotateurs, épicondylites. Le syndrome du canal carpien est la TMS la plus fréquemment reconnue.'
      },
      {
        term: 'Tableau 98',
        value: 'Tableau de MP du régime général couvrant les affections chroniques du rachis lombaire provoquées par des vibrations de basses et moyennes fréquences transmises au corps entier. Distinct du tableau 57 : le tableau 98 concerne le dos, le 57 les membres supérieurs.'
      },
      {
        term: 'Facteurs biomécaniques',
        value: 'Première catégorie de facteurs de risque TMS selon l\'INRS : gestes répétitifs à cadence élevée, postures contraignantes (bras au-dessus des épaules, poignet en déviation), efforts excessifs, vibrations. Ils sont les plus visibles mais ne suffisent pas à expliquer à eux seuls le développement des TMS.'
      },
      {
        term: 'Facteurs psychosociaux (TMS)',
        value: 'Deuxième catégorie de facteurs de risque TMS : stress, manque d\'autonomie, pression temporelle, faible soutien social, monotonie. Un salarié stressé contracte davantage ses muscles — les facteurs psychosociaux potentialisent les facteurs biomécaniques. À distinguer des RPS (thème à part entière) : ici, on parle de leur rôle dans le développement des TMS.'
      },
      {
        term: 'PRAP',
        value: 'Prévention des Risques liés à l\'Activité Physique. Programme de formation certifiante INRS formant les salariés à analyser leurs propres gestes et postures pour réduire les TMS. Se décline en PRAP IBC (industrie, commerce, bureau) et PRAP 2S (sanitaire et social). Outil individuel complémentaire des mesures organisationnelles collectives.'
      }
    ],
    cadreLegal: '<p>Les TMS relèvent de l\'obligation générale de prévention de l\'employeur fondée sur <span class="fi-cite"><a href="https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-1 et L4121-2 Code du travail</code></a></span>. Tout employeur doit identifier et évaluer les risques TMS dans le DUERP (<code>Art. R4121-1</code>) et planifier des actions de prévention.</p><p>La reconnaissance en maladie professionnelle s\'effectue par les tableaux de MP du Code de la Sécurité Sociale, principalement : <strong>tableau 57</strong> (affections périarticulaires — membres supérieurs, régime général) et <strong>tableau 98</strong> (affections chroniques du rachis lombaire). Pour qu\'une TMS soit reconnue en MP, il faut que les conditions du tableau soient remplies : désignation de la maladie, délai de prise en charge, liste des travaux. Les TMS peuvent aussi être reconnues hors tableau via le système complémentaire (comité régional de reconnaissance des maladies professionnelles).</p><p>Le programme <span class="fi-cite"><a href="https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir" target="_blank" rel="noopener noreferrer">Assurance Maladie — TMS-Pros</a></span> accompagne les entreprises à forte sinistralité TMS. Il ne crée pas d\'obligation réglementaire supplémentaire mais structure une démarche de prévention adaptée.</p>',
    demarche: '<p>La démarche de prévention des TMS préconisée par l\'INRS suit <strong>4 étapes</strong> inspirées du cycle PDCA :</p><ul><li><strong>Mobiliser</strong> — constituer un groupe de travail pluridisciplinaire (encadrement, salariés, médecin du travail, préventeur) et obtenir l\'engagement de la direction. La prévention TMS ne réussit que si elle est collective.</li><li><strong>Investiguer</strong> — analyser les situations de travail via des observations, des questionnaires salariés (ex. questionnaire INRS), des relevés de sinistralité MP. Identifier les postes et activités les plus exposés aux 3 familles de facteurs (biomécaniques, psychosociaux, environnementaux).</li><li><strong>Maîtriser</strong> — concevoir et mettre en œuvre des solutions prioritairement techniques et organisationnelles : adapter les postes de travail (ergonomie), modifier l\'organisation (rotation des tâches, réduction des cadences, pauses), améliorer les outils et équipements. La formation individuelle aux gestes et postures (PRAP) ne vient qu\'en complément.</li><li><strong>Évaluer</strong> — mesurer l\'efficacité des actions (indicateurs sinistralité MP, absentéisme, résultats questionnaires), ajuster la démarche et relancer un nouveau cycle.</li></ul><p>L\'intégration des TMS dans le <span class="fi-cite"><a href="https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html" target="_blank" rel="noopener noreferrer">INRS — Démarche de prévention TMS</a></span> passe obligatoirement par le DUERP : les unités de travail exposées doivent être identifiées, les risques cotés, les actions planifiées dans le programme de prévention annuel (Papripact si ≥ 50 salariés).</p>',
    selectedIds: [
      'tms-flashcard-001',
      'tms-flashcard-002',
      'tms-flashcard-004',
      'tms-flashcard-005',
      'tms-flashcard-006',
      'tms-qcm-001',
      'tms-qcm-002',
      'tms-qcm-006'
    ],
    pieges: [
      'TMS ≠ accident du travail : les TMS sont quasi exclusivement des maladies professionnelles (MP), pas des AT. La différence est fondamentale pour l\'indemnisation et la reconnaissance. Un effort brutal au dos peut être un AT ; la même douleur apparue progressivement est une MP.',
      'La prévention TMS n\'est PAS uniquement la "formation gestes et postures" : la démarche INRS est collective et organisationnelle (réaménagement des postes, organisation du travail) — la formation individuelle (PRAP) n\'est qu\'un complément.',
      'Confusion biomécanique seul vs. multifactoriel : les TMS sont multifactoriels (biomécaniques + psychosociaux + environnementaux). Réduire la prévention aux seuls facteurs biomécaniques est insuffisant — c\'est un piège classique en QCM.',
      'Tableau 57 ≠ tableau 98 : le 57 couvre les membres supérieurs (canal carpien, épaule, coude) ; le 98 couvre les affections chroniques du rachis lombaire liées aux vibrations. Confondre les deux tableaux est un piège fréquent.',
      'TMS-Pros (programme Assurance Maladie, 4 étapes) ≠ PRAP (formation INRS, outil individuel) : deux dispositifs complémentaires mais distincts, souvent confondus dans les QCM.',
      'Le syndrome du canal carpien est la TMS la plus fréquemment RECONNUE en MP (tableau 57 B) ; mais les tendinites de la coiffe des rotateurs (épaule) génèrent davantage d\'arrêts de travail. Ces deux affirmations sont simultanément vraies.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Troubles musculo-squelettiques (TMS) — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'Assurance Maladie — ameli',
        ref: 'Les TMS : pourquoi et comment agir (programme TMS-Pros)',
        url: 'https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir'
      },
      {
        authority: 'INRS',
        ref: 'TMS — démarche de prévention (Mobiliser, Investiguer, Maîtriser, Évaluer)',
        url: 'https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 7: risque-routier
   * Plan 05-03, Wave 3
   * selectedIds: 8 items from risque-routier pool (12 total in BANK)
   * URL verification: INRS + service-public.fr (curl 200, 2026-05-29)
   * ========================================================= */
  {
    slug: 'risque-routier',
    title: 'Risque routier professionnel',
    tldr: 'Le risque routier professionnel est la première cause de mortalité au travail en France, représentant environ 30 % des accidents du travail mortels. Il couvre deux régimes distincts : le risque de mission (AT classique, salarié en déplacement professionnel) et le risque de trajet (domicile-travail, régime AT/MP spécifique). Sa prévention s\'articule autour de 3 axes INRS : organisation des déplacements, ressources (véhicules), compétences (formation). L\'inscription dans le DUERP est obligatoire dès lors que des salariés se déplacent dans le cadre de leur activité.',
    definitions: [
      {
        term: 'Accident de mission',
        value: 'Accident survenu pendant un déplacement commandé par l\'employeur dans le cadre de l\'activité professionnelle (visite client, déplacement inter-sites, formation externe). Qualifié d\'accident du travail au sens de l\'Art. L411-1 CSS — présomption d\'imputabilité totale. La propriété du véhicule (personnel ou de service) n\'entre pas en compte.'
      },
      {
        term: 'Accident de trajet',
        value: 'Accident survenu lors du trajet aller-retour entre le domicile et le lieu de travail, ou entre le domicile et le lieu de restauration habituel. Couvert par la législation AT/MP au titre de l\'Art. L411-2 CSS — mais régime distinct de l\'AT stricto sensu, avec des différences sur l\'indemnisation journalière et la présomption d\'imputabilité.'
      },
      {
        term: 'Axe Organisation (prévention routière)',
        value: 'Premier axe de la démarche INRS : planifier les déplacements, limiter les réunions tardives imposant une conduite de nuit ou en état de fatigue, favoriser les alternatives (visioconférence, transports en commun, covoiturage). Agit sur les causes organisationnelles de l\'exposition au risque routier.'
      },
      {
        term: 'Axe Ressources (prévention routière)',
        value: 'Deuxième axe INRS : politique véhicule (choix, entretien, équipements de sécurité), gestion des télécommunications au volant (interdiction téléphone tenu en main, restrictions kit mains-libres), GPS. Agit sur les équipements mis à disposition des conducteurs.'
      },
      {
        term: 'Axe Compétences (prévention routière)',
        value: 'Troisième axe INRS : formation à la conduite préventive (Bilan de Conduite, éco-conduite), contrôle des aptitudes (permis, visites médicales), sensibilisation aux facteurs de risque (alcool, téléphone, fatigue). Agit sur les comportements et aptitudes des conducteurs.'
      }
    ],
    cadreLegal: '<p>L\'obligation de prévention du risque routier s\'appuie sur l\'obligation générale de sécurité de l\'employeur (<span class="fi-cite"><a href="https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-1 et R4121-1 Code du travail</code></a></span>) : les déplacements professionnels sont des activités de travail exposant les salariés et doivent figurer dans le DUERP.</p><p>La distinction mission / trajet repose sur le Code de la Sécurité Sociale : <code>Art. L411-1 CSS</code> (accident du travail, couvre la mission) et <code>Art. L411-2 CSS</code> (accident de trajet, couverture spécifique). En cas d\'accident de mission avec véhicule personnel, l\'AT est qualifié même si le véhicule appartient au salarié — l\'appartenance du véhicule est sans incidence sur la qualification juridique.</p><p>Pour les entreprises avec des conducteurs professionnels ou des salariés faisant de fréquents déplacements, la <span class="fi-cite"><a href="https://www.inrs.fr/risques/routiers/demarche-prevention.html" target="_blank" rel="noopener noreferrer">INRS — Démarche de prévention du risque routier</a></span> recommande la mise en place d\'un plan de prévention routière, avec diagnostic de sinistralité, engagement de la direction et actions sur les 3 axes (organisation / ressources / compétences).</p>',
    demarche: '<p>La démarche INRS de prévention du risque routier professionnel suit <strong>5 étapes</strong> selon un cycle PDCA :</p><ul><li><strong>Obtenir l\'engagement de la direction</strong> — La direction formalise sa politique de sécurité routière et désigne un pilote (préventeur, RH ou responsable flotte).</li><li><strong>Établir un diagnostic</strong> — Recenser les déplacements (kilométrage annuel, fréquence, catégories de conducteurs), analyser la sinistralité (AT mission, accidents de trajet), interroger les conducteurs sur les contraintes ressenties.</li><li><strong>Définir un plan d\'action sur les 3 axes</strong> :<ul><li>Organisation : planification des déplacements, réunions à distance, politique alcool et fatigue.</li><li>Ressources : choix et entretien du parc véhicule, équipements de sécurité, politique téléphone.</li><li>Compétences : formation à la conduite préventive, sensibilisation, bilan de conduite.</li></ul></li><li><strong>Mettre en œuvre</strong> — Communiquer le plan, former les managers et conducteurs, équiper les véhicules.</li><li><strong>Évaluer les résultats</strong> — Suivre les indicateurs (sinistralité, coûts, sondages conducteurs), réviser le plan chaque année.</li></ul><p>L\'inscription du risque routier dans le <span class="fi-cite"><a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F171" target="_blank" rel="noopener noreferrer">service-public.fr — Accident du travail : démarches</a></span> passe par le DUERP : les unités de travail exposées (commerciaux itinérants, techniciens, livreurs) doivent faire l\'objet d\'une évaluation spécifique et d\'un plan d\'actions.</p>',
    selectedIds: [
      'risque-routier-flashcard-001',
      'risque-routier-flashcard-002',
      'risque-routier-flashcard-003',
      'risque-routier-flashcard-004',
      'risque-routier-flashcard-005',
      'risque-routier-qcm-001',
      'risque-routier-qcm-002',
      'risque-routier-qcm-004'
    ],
    pieges: [
      'Accident de mission ≠ accident de trajet : la mission est un déplacement commandé par l\'employeur dans le cadre du travail (AT, Art. L411-1 CSS) ; le trajet est l\'aller-retour domicile-travail quotidien (régime spécifique, Art. L411-2 CSS). La frontière est nette et exam-critique.',
      'Véhicule personnel en mission = AT : si un salarié utilise son véhicule personnel pour une mission professionnelle et a un accident, c\'est bien un AT de mission. La propriété du véhicule est sans incidence sur la qualification juridique.',
      'Le kit mains-libres n\'exonère pas la responsabilité : utiliser un kit mains-libres au volant n\'est pas une garantie d\'absence de responsabilité en cas d\'accident — la distraction cognitive reste présente et peut engager la responsabilité de l\'employeur s\'il n\'a pas interdit ces communications.',
      'Confusion organisation / ressources / compétences : chaque mesure concrète doit être rattachée à son axe. Planification des déplacements = organisation ; choix des véhicules = ressources ; formation à la conduite = compétences. QCM classique : "Quel axe couvre la limitation des réunions tardives ?" → organisation.',
      '30 % des AT mortels = stat exam clé : "1 mort au travail sur 3 est lié à la route". Ne pas confondre avec d\'autres statistiques de sinistralité (chutes de hauteur = 2e cause, pas 1ère).',
      'Responsabilité employeur hors locaux : le risque routier se produit hors de l\'entreprise, mais l\'employeur est pleinement responsable de sa prévention — les obligations de L4121-1 et R4121-1 s\'appliquent sans restriction géographique.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Risques routiers — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Risques routiers — démarche de prévention',
        url: 'https://www.inrs.fr/risques/routiers/demarche-prevention.html'
      },
      {
        authority: 'Service-public.fr',
        ref: 'Accident du travail : démarches à effectuer (AT et trajet)',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F171'
      }
    ]
  },

  /* =========================================================
   * FICHE 8: risque-chimique
   * Plan 05-03, Wave 3
   * selectedIds: 8 items from risque-chimique pool (18 total in BANK)
   * URL verification: INRS (curl 200, 2026-05-29)
   * ========================================================= */
  {
    slug: 'risque-chimique',
    title: 'Risque chimique — CLP / SGH / VLEP',
    tldr: 'Le risque chimique est la 2e cause de maladies professionnelles en France, après les TMS. Il concerne tout agent chimique dangereux (ACD) présent sur le lieu de travail — avec un régime renforcé pour les agents CMR (Cancérogènes, Mutagènes, Reprotoxiques), qui impose la substitution prioritaire. Le cadre réglementaire repose sur le règlement européen CLP (CE) 1272/2008 (classification et étiquetage via les pictogrammes SGH), les Fiches de Données de Sécurité (FDS, 16 rubriques REACH) et les Valeurs Limites d\'Exposition Professionnelle (VLEP — VME 8h / VLE 15 min).',
    definitions: [
      {
        term: 'ACD — Agent Chimique Dangereux',
        value: 'Tout agent chimique classifié comme dangereux selon le règlement CLP, ou qui peut présenter un risque pour la santé ou la sécurité des travailleurs en raison de ses propriétés physico-chimiques, chimiques ou toxicologiques. Catégorie large : inclut les ACD généraux et les CMR comme sous-ensemble renforcé.'
      },
      {
        term: 'CMR — Cancérogène, Mutagène, Reprotoxique',
        value: 'Sous-ensemble des ACD faisant l\'objet d\'une réglementation renforcée (Art. R4412-59 et s. CT). Classés en catégories CLP : 1A (avéré), 1B (présumé), 2 (suspecté). L\'employeur a une obligation de substitution prioritaire : remplacer le CMR par un produit moins dangereux si techniquement possible. Les EPI seuls ne suffisent pas pour les CMR.'
      },
      {
        term: 'CLP — Classification, Labelling, Packaging',
        value: 'Règlement européen (CE) 1272/2008 transposant en droit européen le SGH (Système Général Harmonisé des Nations Unies). Régit la classification, l\'étiquetage et l\'emballage des substances et mélanges chimiques. Obligatoire depuis le 1er juin 2015 pour tous les produits (substances depuis 2010, mélanges depuis 2015).'
      },
      {
        term: 'SGH — Système Général Harmonisé',
        value: 'Système de classification et d\'étiquetage des produits chimiques adopté par l\'ONU pour harmoniser les critères à l\'échelle mondiale. Définit 9 classes de pictogrammes (losanges rouges GHS01–GHS09), les mentions de danger (phrases H) et les conseils de prudence (phrases P). Le CLP est la déclinaison européenne du SGH.'
      },
      {
        term: 'FDS — Fiche de Données de Sécurité',
        value: 'Document remis par le fournisseur à tout utilisateur professionnel d\'un ACD. Obligatoire pour tout ACD classé CLP. Comporte 16 rubriques obligatoires définies par l\'annexe II du règlement REACH (CE) 1907/2006 (Art. R4411-73 CT). Elle est le principal outil d\'information sur les risques d\'un produit et la base de l\'évaluation du risque chimique.'
      },
      {
        term: 'VLEP — Valeur Limite d\'Exposition Professionnelle',
        value: 'Concentration maximale d\'un agent chimique dans l\'air en milieu de travail. Comprend la VME (valeur moyenne d\'exposition, sur 8 heures — protège contre les effets à long terme) et la VLE (valeur limite d\'exposition courte durée, sur 15 minutes — protège contre les effets aigus). Peuvent être réglementaires contraignantes (obligatoires) ou indicatives (valeurs guides).'
      },
      {
        term: 'Pictogramme GHS08',
        value: 'Pictogramme SGH/CLP représentant une silhouette humaine avec un point d\'exclamation (dans un losange rouge). Signale les dangers graves pour la santé à long terme : CMR (cancérogènes, mutagènes, reprotoxiques), sensibilisants respiratoires, toxicité spécifique pour certains organes. À distinguer de GHS07 (point d\'exclamation seul, irritant/nocif) et GHS06 (tête de mort, toxicité aiguë létale).'
      }
    ],
    cadreLegal: '<p>La réglementation française du risque chimique repose sur le Code du travail, chapitre risques chimiques (<span class="fi-cite"><a href="https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. R4412-1 et suivants Code du travail</code></a></span>) : identification et évaluation des risques, mesures de prévention (avec substitution prioritaire pour les CMR — <code>Art. R4412-66</code>), surveillance atmosphérique (VLEP — <code>Art. R4412-149</code>), surveillance médicale renforcée.</p><p>Le cadre européen est structuré par deux règlements majeurs : le <strong>règlement CLP (CE) 1272/2008</strong> (<span class="fi-cite"><a href="https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — Classification et étiquetage CLP/SGH</a></span>) pour la classification, l\'étiquetage et les pictogrammes SGH (remplace les directives DSD/DPD depuis le 1er juin 2015) ; et le <strong>règlement REACH (CE) 1907/2006</strong> qui régit les FDS (16 rubriques, Annexe II REACH, <code>Art. R4411-73 CT</code>).</p><p>Les VLEP réglementaires contraignantes sont directement opposables à l\'employeur : leur dépassement constitue une infraction. La liste figure dans l\'arrêté du 30 juin 2004 et ses mises à jour. Les VLEP indicatives servent de référence pour l\'évaluation mais ne créent pas d\'obligation absolue. La surveillance atmosphérique (<span class="fi-cite"><a href="https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — Mesure des expositions aux agents chimiques</a></span>) est obligatoire pour les agents ayant une VLEP réglementaire.</p>',
    demarche: '<p>La démarche INRS de prévention du risque chimique suit les <strong>9 principes généraux de prévention</strong> (<code>Art. L4121-2</code>) adaptés aux agents chimiques :</p><ul><li><strong>Repérer les agents chimiques</strong> — Inventorier tous les produits chimiques utilisés ou produits sur le site (procédés, nettoyage, maintenance), collecter et analyser les FDS, identifier les CMR.</li><li><strong>Évaluer les risques</strong> — Estimer l\'exposition (fréquence, durée, voies de pénétration — inhalation en priorité) et la dangerosité (classification CLP). Comparer aux VLEP pour les agents mesurables. Inscrire les résultats dans le DUERP.</li><li><strong>Substituer en priorité pour les CMR</strong> — Remplacer les CMR par des procédés ou produits moins dangereux si techniquement possible (<code>Art. R4412-66</code>). C\'est l\'obligation prioritaire — elle précède toutes les autres mesures pour cette catégorie.</li><li><strong>Mesures techniques collectives</strong> — Confinement, captage à la source, ventilation générale, automatisation des opérations dangereuses. Mesures collectives avant individuelles (principe 8 de L4121-2).</li><li><strong>Mesures organisationnelles</strong> — Limitation du nombre de travailleurs exposés, rotation des postes, réduction des durées d\'exposition, consignes de sécurité.</li><li><strong>EPI en dernier recours</strong> — Masques adaptés (P2/P3 selon les poussières, FFP selon les vapeurs), gants nitrile ou autres, lunettes. Les EPI ne réduisent pas le risque à la source — ils protègent seulement l\'opérateur et ne remplacent jamais les mesures collectives.</li></ul><p>La FDS (16 rubriques REACH) est le document de base pour toute démarche d\'évaluation du risque chimique. Elle doit être accessible aux travailleurs exposés et au médecin du travail. La <strong>FDS doit être rédigée en français</strong> pour les utilisateurs professionnels français.</p>',
    selectedIds: [
      'risque-chimique-flashcard-002',
      'risque-chimique-flashcard-003',
      'risque-chimique-flashcard-005',
      'risque-chimique-flashcard-006',
      'risque-chimique-flashcard-007',
      'risque-chimique-qcm-001',
      'risque-chimique-qcm-004',
      'risque-chimique-qcm-006'
    ],
    pieges: [
      'ACD ≠ CMR : les CMR sont un sous-ensemble des ACD, soumis à une réglementation renforcée (substitution prioritaire obligatoire, Art. R4412-66). Tous les ACD ne sont pas des CMR ; tous les CMR sont des ACD. Confusion fréquente en QCM.',
      'Le pictogramme GHS06 (tête de mort) ≠ toxicité chronique CMR : GHS06 signale la toxicité aiguë LÉTALE (mortel en cas d\'ingestion/inhalation/contact) ; les CMR sont signalés par GHS08 (silhouette humaine). Un QCM qui attribue GHS06 aux CMR est un piège.',
      'La substitution est la mesure PRIORITAIRE pour les CMR — pas les EPI : l\'Art. R4412-66 impose la substitution avant toute autre mesure. Les EPI seuls (masques, gants) ne constituent pas une réponse suffisante à un risque CMR si la substitution est techniquement possible.',
      'FDS ≠ CLP : la FDS est régie par le règlement REACH (annexe II, 16 rubriques) ; le CLP régit la classification et l\'étiquetage. Les informations de classification CLP figurent en rubrique 2 de la FDS, mais les deux règlements sont distincts.',
      'VME ≠ VLE : la VME est calculée sur 8 heures (effets à long terme) ; la VLE sur 15 minutes (effets aigus). Piège exam classique : confondre les durées de référence ou les noms.',
      'CLP = déclinaison UE du SGH de l\'ONU — SGH ≠ CLP : le SGH est le système onusien, le CLP est la norme européenne qui le met en œuvre. La date clé pour les mélanges est le 1er juin 2015 (fin de transition du régime DSD/DPD vers CLP).'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Risques chimiques — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Classification et étiquetage des produits chimiques (CLP/SGH)',
        url: 'https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Mesure des expositions aux agents chimiques (VLEP — VME/VLE)',
        url: 'https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 9: rps
   * Plan 05-04, Wave 4
   * selectedIds: 8 items from rps pool (14 total in BANK)
   * URL verification: INRS x3 (curl 200, 2026-05-29)
   * Légifrance L1152-1 + L1153-1: pre-verified by orchestrator (WebFetch 2026-05-29)
   * Accuracy anchors: harcèlement moral = L1152-1 (NOT L1153-1); burnout NOT in tableau MP
   * ========================================================= */
  {
    slug: 'rps',
    title: 'Risques Psychosociaux (RPS)',
    tldr: 'Les risques psychosociaux (RPS) regroupent le stress chronique, le harcèlement et les violences au travail — ils menacent la santé physique et mentale des travailleurs et engagent l\'obligation générale de sécurité de l\'employeur (Art. L4121-1). Leur évaluation est obligatoire au titre du DUERP. La prévention primaire collective — agir sur l\'organisation du travail — prime sur l\'accompagnement individuel.',
    definitions: [
      {
        term: 'RPS',
        value: 'Risques Psychosociaux. Catégorie de risques professionnels couvrant trois composantes : (1) stress (écart entre les exigences du travail et les ressources de la personne), (2) violences internes (harcèlement moral, harcèlement sexuel — entre membres de l\'organisation), (3) violences externes (incivilités, agressions par des tiers — clients, patients, usagers). Les RPS peuvent conduire à des troubles de la santé (anxiété, burnout, TMS, maladies cardiovasculaires).'
      },
      {
        term: 'Harcèlement moral — Art. L1152-1',
        value: 'Agissements répétés ayant pour objet ou pour effet une dégradation des conditions de travail susceptible de porter atteinte aux droits du salarié, à sa dignité, d\'altérer sa santé physique ou mentale ou de compromettre son avenir professionnel (Art. L1152-1 Code du travail). L\'intention de nuire n\'est pas requise — l\'effet suffit. Les agissements doivent être RÉPÉTÉS : un acte isolé ne constitue pas du harcèlement moral.'
      },
      {
        term: 'Harcèlement sexuel — Art. L1153-1',
        value: 'Propos ou comportements à connotation sexuelle ou sexiste répétés qui soit portent atteinte à la dignité du salarié en raison de leur caractère dégradant ou humiliant, soit créent à son encontre une situation intimidante, hostile ou offensante (Art. L1153-1 Code du travail). À ne pas confondre avec L1152-1 (harcèlement moral) — deux articles distincts pour deux infractions distinctes.'
      },
      {
        term: 'Burnout (épuisement professionnel)',
        value: 'Syndrome d\'épuisement professionnel consécutif à un stress chronique au travail, caractérisé par trois dimensions (modèle Maslach) : épuisement émotionnel, dépersonnalisation (détachement cynique), réduction du sentiment d\'accomplissement. En 2026, le burnout n\'est pas reconnu comme maladie professionnelle dans un tableau MP spécifique — il peut être reconnu en MP "hors tableau" via le Comité Régional de Reconnaissance des Maladies Professionnelles (CRRMP), mais c\'est une procédure rare et complexe.'
      },
      {
        term: 'Violence interne vs. violence externe',
        value: 'Violence interne : exercée par des membres de l\'organisation (harcèlement moral par un supérieur, conflit entre collègues). Violence externe : exercée par des personnes extérieures à l\'entreprise (client agressif, patient en urgence, usager mécontent). La distinction est fondamentale pour identifier les acteurs responsables et les leviers de prévention.'
      },
      {
        term: 'Prévention primaire RPS',
        value: 'Agir collectivement sur les causes organisationnelles des RPS : charge de travail, autonomie, organisation du temps, relations hiérarchiques, clarté des rôles. C\'est le niveau de prévention préconisé en priorité par l\'INRS — il s\'oppose à la prévention secondaire (renforcer la résistance individuelle) et tertiaire (accompagner les victimes). La prévention primaire est la seule à s\'attaquer aux causes racines.'
      },
      {
        term: 'CSE et prévention RPS',
        value: 'Le Comité Social et Économique (CSE) est compétent pour analyser les risques psychosociaux, formuler des avis sur le DUERP et proposer des mesures de prévention. La délégation du personnel au CSE peut déclencher un droit d\'alerte en cas de situation RPS sérieuse. L\'employeur reste juridiquement responsable de la prévention — la compétence du CSE ne le décharge pas.'
      },
      {
        term: 'Droit de retrait — Art. L4131-1',
        value: 'Droit de tout salarié de se retirer d\'une situation de travail dont il a un motif raisonnable de penser qu\'elle présente un danger grave et imminent pour sa vie ou sa santé (<code>Art. L4131-1</code> Code du travail). Applicable en cas de RPS sévères (menace grave, violences). Le salarié doit en avertir immédiatement l\'employeur ou le représentant du personnel. L\'exercice normal du droit de retrait ne peut pas être sanctionné.'
      }
    ],
    cadreLegal: '<p>L\'obligation de prévention des RPS repose sur l\'obligation générale de sécurité de l\'employeur : <span class="fi-cite"><a href="https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — <code>Art. L4121-1 Code du travail</code></a></span>. Ce texte impose à l\'employeur de prendre toutes les mesures nécessaires pour assurer la sécurité et protéger la santé physique <em>et mentale</em> des travailleurs — ce qui couvre explicitement les RPS depuis la loi du 17 janvier 2002.</p><p>Le harcèlement moral est défini et interdit par <span class="fi-cite"><a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900818" target="_blank" rel="noopener noreferrer">Légifrance — <code>Art. L1152-1 Code du travail</code></a></span>. Le harcèlement sexuel est défini et interdit par <span class="fi-cite"><a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043893894" target="_blank" rel="noopener noreferrer">Légifrance — <code>Art. L1153-1 Code du travail</code></a></span>. Ces deux infractions sont passibles de sanctions pénales (2 ans d\'emprisonnement et 30 000 € d\'amende).</p><p>L\'accord national interprofessionnel sur le stress au travail du 2 juillet 2008 (transposition de l\'accord-cadre européen du 8 octobre 2004) complète le cadre légal en définissant le stress professionnel et en fixant des obligations de négociation aux branches et entreprises. Les RPS doivent figurer dans le DUERP (<code>Art. R4121-1</code>) au titre de l\'évaluation des risques par unité de travail.</p>',
    demarche: '<p>La démarche INRS de prévention des RPS suit <strong>5 étapes</strong> inspirées du cycle PDCA :</p><ul><li><strong>Préparer</strong> — Constituer un groupe de travail pluridisciplinaire (DRH, médecin du travail, CSE, manager, salariés) ; obtenir l\'engagement de la direction ; formaliser le pilotage du projet.</li><li><strong>Analyser</strong> — Utiliser les outils INRS : <span class="fi-cite"><a href="https://www.inrs.fr/risques/psychosociaux/prevention.html" target="_blank" rel="noopener noreferrer">INRS — Démarche de prévention RPS</a></span> ; questionnaire RPS-DU (collectif, confidentiel) ; analyse de la sinistralité AT/MP liée aux RPS ; entretiens avec les unités de travail exposées.</li><li><strong>Traiter</strong> — Définir et mettre en œuvre des mesures de prévention primaire collectives (réorganisation des équipes, clarification des rôles, réduction des sur-charges, réunions de service régulières) ; compléter par des mesures secondaires (formation des managers) et tertiaires si nécessaire.</li><li><strong>Suivre</strong> — Piloter les indicateurs : absentéisme lié aux RPS, taux de rotation, déclarations AT/MP, résultats du questionnaire RPS-DU.</li><li><strong>Évaluer</strong> — Mesurer l\'impact des actions, actualiser le DUERP, présenter les résultats au CSE, lancer un nouveau cycle.</li></ul><p>Le rôle du médecin du travail est central : il dispose d\'un accès privilégié aux données de santé et peut déclencher une visite de l\'entreprise si des cas de RPS sont identifiés lors des consultations. Le signalement par un salarié peut transiter par le CSE, le médecin du travail ou directement l\'employeur — <span class="fi-cite"><a href="https://www.inrs.fr/risques/psychosociaux/accidents-travail-maladies-professionnelles.html" target="_blank" rel="noopener noreferrer">INRS — RPS, AT et maladies professionnelles</a></span>.</p>',
    selectedIds: [
      'rps-flashcard-001',
      'rps-flashcard-002',
      'rps-flashcard-003',
      'rps-flashcard-004',
      'rps-qcm-001',
      'rps-qcm-002',
      'rps-qcm-004',
      'rps-qcm-006'
    ],
    pieges: [
      'Harcèlement moral = L1152-1 (PAS L1153-1) : L1152-1 = harcèlement moral ; L1153-1 = harcèlement sexuel. Les deux articles se suivent et leur confusion est le piège le plus fréquent en examen — mémo : "moral" avant "sexuel" dans l\'ordre numérique (52 avant 53).',
      'Burnout PAS au tableau MP en 2026 : le burnout n\'est pas reconnu comme maladie professionnelle dans un tableau spécifique — il peut l\'être via le système complémentaire CRRMP, mais c\'est une procédure rare. Un QCM qui propose "burnout = MP tableau" est faux.',
      'Confusion stress (état) vs. RPS (catégorie de risques) : le stress est une réaction de l\'organisme, une composante RPS ; les RPS sont la catégorie de risques qui englobe stress + violences internes + violences externes.',
      'Prévention tertiaire ≠ prévention RPS : accompagner psychologiquement les victimes est de la prévention tertiaire (soigner les cas), pas de la prévention des RPS au sens de l\'INRS. La prévention primaire (agir sur l\'organisation) prime.',
      'CSE compétent, pas seul responsable : le CSE peut formuler des alertes et des avis sur les RPS, mais la responsabilité juridique reste celle de l\'employeur au titre de L4121-1. Un QCM qui place la "responsabilité RPS" sur le CSE est faux.',
      'Violences internes vs. violences externes : la frontière est l\'appartenance à l\'organisation. Un prestataire externe qui agresse un salarié = violence externe ; un supérieur qui harcèle = violence interne. La source (intra vs extra-organisationnelle) est le critère, pas la gravité.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Risques psychosociaux (RPS) — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'RPS — démarche de prévention',
        url: 'https://www.inrs.fr/risques/psychosociaux/prevention.html'
      },
      {
        authority: 'INRS',
        ref: 'RPS — accidents du travail et maladies professionnelles (burnout)',
        url: 'https://www.inrs.fr/risques/psychosociaux/accidents-travail-maladies-professionnelles.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 10: espaces-confines
   * Plan 05-04, Wave 4
   * selectedIds: 8 items from espaces-confines pool (12 total in BANK)
   * URL verification: INRS x3 (curl 200, 2026-05-29)
   * Légifrance refs (R4222-23, R4225-1): rendered as plain <code> text — not curl-verified
   * ========================================================= */
  {
    slug: 'espaces-confines',
    title: 'Espaces confinés',
    tldr: 'Un espace confiné est un volume fermé ou partiellement fermé, non conçu pour l\'occupation permanente, présentant des risques atmosphériques (anoxie, toxicité, ATEX). Tout travail en espace confiné impose une procédure stricte : analyse préalable, mesure atmosphérique multi-gaz, permis d\'entrer, surveillance permanente extérieure et plan de secours. La principale cause aggravante des accidents mortels est la tentative de sauvetage improvisée.',
    definitions: [
      {
        term: 'Espace confiné',
        value: 'Volume totalement ou partiellement fermé, non conçu pour une occupation permanente, accessible temporairement pour y effectuer des travaux. Exemples : fosses, cuves, silos, égouts, canalisations, réservoirs, vides sanitaires, puits. La difficulté d\'évacuation et la possibilité d\'atmosphère dangereuse sont les deux critères déterminants.'
      },
      {
        term: 'Anoxie',
        value: 'Déficience en oxygène dans l\'atmosphère. Seuil réglementaire INRS : O₂ < 19,5 % = atmosphère appauvrie (risque de perte de conscience rapide) ; < 16 % = danger grave et immédiat ; < 6 % = mort en minutes. La valeur normale d\'O₂ dans l\'air ambiant est 20,9 %. Au-delà de 23,5 % = atmosphère enrichie (suroxygénée), qui aggrave les risques d\'incendie.'
      },
      {
        term: 'ATEX — Atmosphères EXplosives',
        value: 'Zone ou atmosphère dans laquelle un mélange de gaz, vapeurs, brouillards ou poussières inflammables avec l\'air peut s\'enflammer et exploser. Une explosion est possible uniquement dans l\'intervalle de concentration défini par la LIE (limite inférieure d\'explosivité) et la LSE (limite supérieure d\'explosivité). En dessous de la LIE, le mélange est trop pauvre ; au-dessus de la LSE, trop riche.'
      },
      {
        term: 'Permis d\'entrer (work permit)',
        value: 'Document formel obligatoire avant toute pénétration dans un espace confiné. Il consigne : identification de l\'espace, résultats de l\'analyse atmosphérique préalable, mesures de prévention requises (EPI, consignation des énergies, ventilation), nombre d\'intervenants, durée, organisation des secours, nom du surveillant extérieur. Sans permis d\'entrer validé, aucun intervenant ne pénètre dans l\'espace.'
      },
      {
        term: 'Surveillance permanente extérieure',
        value: 'Exigence fondamentale : un surveillant qualifié maintient une présence en dehors de l\'espace confiné pendant toute la durée de l\'intervention. Il surveille les intervenants, les paramètres atmosphériques et peut déclencher les secours — mais il ne doit JAMAIS pénétrer dans l\'espace pour secourir une victime. Il appelle les pompiers spécialisés. La tentative de sauvetage non préparée est la principale cause de bilan aggravé (plusieurs victimes au lieu d\'une).'
      },
      {
        term: 'ARI — Appareil Respiratoire Isolant',
        value: 'EPI de protection respiratoire fournissant une atmosphère autonome (bouteilles d\'air comprimé). Indispensable en espace confiné présentant une atmosphère appauvrie en O₂ ou contaminée par des gaz toxiques. À distinguer formellement du masque à cartouche filtrante (qui filtre les contaminants mais ne fournit pas d\'oxygène et est inefficace en atmosphère sous-oxygénée).'
      },
      {
        term: 'Détection atmosphérique multi-gaz',
        value: 'Mesure obligatoire avant toute entrée en espace confiné. Le détecteur multi-gaz mesure simultanément : O₂ (appauvrissement et enrichissement), CO (monoxyde de carbone), H₂S (hydrogène sulfuré) et LEL (% de la LIE pour les gaz inflammables). La mesure doit être effectuée à différentes hauteurs (gaz plus lourds que l\'air s\'accumulent au fond, gaz plus légers au sommet).'
      }
    ],
    cadreLegal: '<p>La réglementation sur le travail en espace confiné repose sur le Code du travail, chapitre "locaux et espace de travail" : <span class="fi-cite"><a href="https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — espaces confinés</a></span>. Les dispositions relatives à la ventilation des locaux à pollution spécifique relèvent de <code>Art. R4222-23</code> du Code du travail. Les locaux de travail clos, leur aménagement et leur sécurité sont encadrés par <code>Art. R4225-1</code> et suivants.</p><p>La réglementation ATEX s\'appuie sur l\'arrêté du 8 juillet 2003 (transposant la directive 99/92/CE ATEX 137) : l\'employeur doit établir un document relatif à la protection contre les explosions (DRPCE) dans toute zone ATEX et classer les zones (0/1/2 pour les gaz, 20/21/22 pour les poussières). Les équipements utilisés dans ces zones doivent être certifiés ATEX.</p><p>Pour les opérations en espaces confinés impliquant plusieurs entreprises, le plan de prévention (<code>Art. R4512-6</code> et suivants) est obligatoire lorsque l\'opération dépasse 400 heures ou figure sur la liste des travaux dangereux. La <span class="fi-cite"><a href="https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html" target="_blank" rel="noopener noreferrer">INRS — Procédure de travail en espaces confinés</a></span> formalise les étapes obligatoires : analyse des risques → permis d\'entrer → surveillance → secours.</p>',
    demarche: '<p>La procédure d\'intervention en espace confiné suit <strong>6 étapes séquentielles obligatoires</strong> définies par l\'<span class="fi-cite"><a href="https://www.inrs.fr/risques/espaces-confines/prevenir-risques.html" target="_blank" rel="noopener noreferrer">INRS — Prévenir les risques en espaces confinés</a></span> :</p><ul><li><strong>Analyse préalable des dangers</strong> — Identifier la nature de l\'espace (anciens produits stockés, risques biologiques, configuration), les risques atmosphériques attendus, les risques mécaniques et les moyens d\'accès/évacuation.</li><li><strong>Mesure atmosphérique multi-gaz</strong> — Effectuer la mesure avant toute entrée (O₂, CO, H₂S, LEL) à différentes hauteurs. Si l\'atmosphère est non conforme, ventiler et re-mesurer avant d\'autoriser l\'entrée.</li><li><strong>Ventilation</strong> — Ventilation mécanique forcée avant et pendant l\'intervention si nécessaire. La ventilation naturelle (ouvrir les accès) est insuffisante pour les gaz lourds (CO₂, H₂S) qui persistent au fond.</li><li><strong>Délivrance du permis d\'entrer</strong> — Document signé par le responsable des travaux, précisant les mesures de prévention et les résultats atmosphériques. Condition sine qua non avant toute pénétration.</li><li><strong>Surveillance permanente extérieure</strong> — Le surveillant reste à l\'extérieur pendant toute la durée. Il surveille les paramètres, maintient la communication avec les intervenants et dispose du plan de secours pré-établi.</li><li><strong>Procédure d\'évacuation et de secours</strong> — Plan de secours préparé à l\'avance, numéros des pompiers spécialisés affichés, équipement de sauvetage disponible à l\'extérieur (treuil, ARI). En cas d\'accident, le surveillant appelle les secours — il ne pénètre pas.</li></ul>',
    selectedIds: [
      'espaces-confines-flashcard-001',
      'espaces-confines-flashcard-002',
      'espaces-confines-flashcard-003',
      'espaces-confines-flashcard-004',
      'espaces-confines-flashcard-005',
      'espaces-confines-qcm-001',
      'espaces-confines-qcm-002',
      'espaces-confines-qcm-003'
    ],
    pieges: [
      'Seuil O₂ : 19,5 % (pas 17 %, pas 21 %) : le seuil d\'appauvrissement INRS est 19,5 % (taux normal = 20,9 %) ; la suroxygénation commence à 23,5 %. Piège classique : écrire "21 %" (taux normal arrondi) ou "17 %" (seuil de danger grave, pas d\'appauvrissement).',
      'Espace clos ≠ espace confiné nécessairement : un local de travail fermé sans fenêtre est un espace clos, pas forcément un espace confiné. La "confinedness" résulte de l\'impossibilité d\'occupation permanente + risque atmosphérique + difficulté d\'évacuation — un bureau sous-sol ne répond pas à ces critères.',
      'Masque FFP3 ≠ ARI : un masque filtrant FFP3 protège contre les particules — il ne fournit pas d\'oxygène et est totalement inefficace en atmosphère sous-oxygénée (O₂ < 19,5 %). L\'ARI (appareil respiratoire isolant, bouteilles d\'air) est le seul EPI respiratoire adapté en cas d\'anoxie.',
      'Le surveillant extérieur NE PÉNÈTRE JAMAIS dans l\'espace pour secourir : tenter de secourir une victime sans équipement spécialisé est la principale cause de bilan aggravé (2e et 3e victimes). Le surveillant appelle les pompiers spécialisés et attend. C\'est contre-intuitif mais c\'est la règle absolue.',
      'Ventilation naturelle insuffisante pour les gaz lourds : ouvrir les trappes d\'accès ne suffit pas à évacuer les gaz plus lourds que l\'air (H₂S, CO₂, vapeurs de solvants) qui persistent au fond — seule la ventilation mécanique forcée est efficace. Un QCM qui propose "ouvrir les accès pour ventiler" comme mesure suffisante est un piège.',
      'ATEX : l\'explosion est possible ENTRE LIE et LSE : en dessous de la LIE, le mélange est trop pauvre pour s\'enflammer ; au-dessus de la LSE, trop riche. Un candidat qui dit "plus c\'est concentré, plus c\'est explosif" ignore la LSE — erreur classique.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'Espaces confinés — ce qu\'il faut retenir',
        url: 'https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Espaces confinés — procédure de travail (permis d\'entrer, surveillance)',
        url: 'https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html'
      },
      {
        authority: 'INRS',
        ref: 'Espaces confinés — prévenir les risques',
        url: 'https://www.inrs.fr/risques/espaces-confines/prevenir-risques.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 11: acronymes
   * Plan 05-04, Wave 4
   * Variable-density fiche: heavy Définitions (≥15 entries), light prose
   * selectedIds: 8 items from acronymes pool (26 total in BANK)
   * URL verification: INRS x2 + AIDA INERIS (all verified in prior waves — same URLs)
   * SPA URL: francecompetences.fr/recherche/rncp/41446/ — Batch F 2026 human-verified
   * ========================================================= */
  {
    slug: 'acronymes',
    title: 'Acronymes QHSE — lexique de référence',
    tldr: 'Lexique de référence pour la formation Bachelor QHSE : les acronymes les plus testés en exam, classés par bloc thématique. Mémoriser par regroupement (SST, chimique, management, représentation du personnel, formation) plutôt que par ordre alphabétique. Croiser avec la fiche thématique correspondante pour les définitions approfondies.',
    definitions: [
      {
        term: 'AT / MP',
        value: 'AT = Accident du Travail (événement soudain survenant par le fait ou à l\'occasion du travail). MP = Maladie Professionnelle (affection contractée progressivement, inscrite aux tableaux du Code de la Sécurité Sociale). La branche AT/MP de la Sécurité Sociale indemnise les deux. Taux de cotisation patronale variable selon secteur et sinistralité.'
      },
      {
        term: 'CSE',
        value: 'Comité Social et Économique. Instance unique de représentation du personnel, obligatoire dès 11 salariés, issue des ordonnances Macron n°2017-1386 du 22 septembre 2017. Absorbe les anciennes instances CE (comité d\'entreprise), CHSCT et DP (délégués du personnel). Compétent pour les questions économiques, sociales, de santé, sécurité et conditions de travail.'
      },
      {
        term: 'CHSCT',
        value: 'Comité d\'Hygiène, de Sécurité et des Conditions de Travail. Instance de représentation du personnel spécialisée en SST, créée en 1982. SUPPRIMÉE par les ordonnances Macron en 2017 (disparue au plus tard au 1er janvier 2020). Ses missions ont été transférées au CSE (et à la CSSCT dans les établissements ≥ 300 salariés). Citer le "CHSCT" dans une entreprise créée après 2017 est inexact.'
      },
      {
        term: 'CSSCT',
        value: 'Commission Santé, Sécurité et Conditions de Travail. Sous-commission obligatoire du CSE dans les établissements d\'au moins 300 salariés (et dans les établissements Seveso, ICPE AS, et établissements nucléaires quelle que soit la taille). Délégation du CSE pour les missions SST — le CSE garde la compétence et la délibération finales.'
      },
      {
        term: 'DUERP',
        value: 'Document Unique d\'Évaluation des Risques Professionnels. Document obligatoire dès le 1er salarié (<code>Art. R4121-1</code>). Transcrit les résultats de l\'EvRP par unité de travail. Conservation : 40 ans. Mise à jour annuelle si ≥ 11 salariés. Depuis la loi du 2 août 2021, la dénomination officielle est DUERP (et non plus "DUER" sans le P).'
      },
      {
        term: 'EvRP',
        value: 'Évaluation des Risques Professionnels. Démarche continue d\'identification, d\'analyse et de hiérarchisation des risques professionnels (<code>Art. L4121-3</code>). L\'EvRP est la démarche ; le DUERP est le document qui en formalise les résultats à un instant T. Ne pas confondre la démarche et son document.'
      },
      {
        term: 'PAPRIPACT',
        value: 'Programme Annuel de Prévention des Risques Professionnels et d\'Amélioration des Conditions de Travail. Obligatoire pour les entreprises ≥ 11 salariés depuis la loi du 2 août 2021. Annexé au DUERP, il liste les actions concrètes de l\'année, les ressources allouées et les délais de réalisation. Soumis pour avis au CSE.'
      },
      {
        term: 'EPI / EPC',
        value: 'EPI = Équipement de Protection Individuelle (casque, gants, masque, harnais — porté par le travailleur). EPC = Équipement de Protection Collective (garde-corps, aspiration à la source, écran, filet anti-chute — protège un groupe). Hiérarchie impérative (L4121-2) : EPC prime toujours sur EPI. L\'EPI est le dernier recours. Fourni gratuitement par l\'employeur (<code>Art. L4122-2</code>).'
      },
      {
        term: 'RPS / TMS',
        value: 'RPS = Risques PsychoSociaux (stress, harcèlement, violences — atteintes à la santé mentale et physique). TMS = Troubles Musculo-Squelettiques (pathologies des tendons, muscles, articulations — 1re cause de MP en France). Les deux sont liés : le stress chronique (RPS) potentialise les facteurs biomécaniques et augmente la prévalence des TMS.'
      },
      {
        term: 'CMR / ACD',
        value: 'CMR = Cancérogène, Mutagène, Reprotoxique (sous-ensemble des agents chimiques dangereux soumis à une réglementation renforcée — substitution prioritaire obligatoire). ACD = Agent Chimique Dangereux (catégorie large : tout agent classé CLP ou présentant un risque pour la santé). Tous les CMR sont des ACD, mais tous les ACD ne sont pas des CMR.'
      },
      {
        term: 'CLP / SGH',
        value: 'CLP = Classification, Labelling, Packaging — règlement européen (CE) 1272/2008 réglementant la classification et l\'étiquetage des produits chimiques (pictogrammes SGH, mentions H et P). SGH = Système Général Harmonisé des Nations Unies — cadre international dont le CLP est la déclinaison européenne obligatoire. En vigueur pour tous les produits depuis le 1er juin 2015.'
      },
      {
        term: 'VLEP / VME / VLE',
        value: 'VLEP = Valeur Limite d\'Exposition Professionnelle (terme chapeau). VME = Valeur Moyenne d\'Exposition (sur 8 heures — expositions chroniques). VLE = Valeur Limite d\'Exposition à court terme (sur 15 minutes — pics). Piège : la VME n\'est pas une "valeur maximale" — c\'est une moyenne journalière. VLE = pic ; VME = journalière.'
      },
      {
        term: 'SMQ / SME / SMS-SST',
        value: 'SMQ = Système de Management de la Qualité (référentiel ISO 9001). SME = Système de Management Environnemental (référentiel ISO 14001). SMS-SST = Système de Management de la Santé et Sécurité au Travail (référentiel ISO 45001). Les trois partagent la HLS (High Level Structure §4–§10) et peuvent être intégrés en SMI (Système de Management Intégré). SMS-SST ≠ DUERP : le DUERP est l\'obligation légale française ; le SMS-SST est le système de management volontaire.'
      },
      {
        term: 'ICPE / Seveso',
        value: 'ICPE = Installation Classée pour la Protection de l\'Environnement (<code>Art. L511-1</code> Code de l\'environnement). Contrôlée par la DREAL en région. Seveso = directive européenne sur les risques d\'accidents majeurs (directive 2012/18/UE "Seveso III"). Les sites Seveso sont un sous-ensemble des ICPE avec des risques accidentels majeurs. Seuil haut (Seveso haut) = CSSCT obligatoire quelle que soit la taille.'
      },
      {
        term: 'RNCP / BC01-BC04',
        value: 'RNCP = Répertoire National des Certifications Professionnelles. Le Bachelor QHSE CESI est enregistré sous la référence RNCP41446. La certification est découpée en 4 blocs de compétences : BC01 (Management QSE), BC02 (Prévention des risques), BC03 (Environnement et développement durable), BC04 (Management de la qualité). Ces codes sont spécifiques au RNCP41446 — ils ne sont pas universels. Source : <a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer">France compétences — RNCP41446</a>.'
      },
      {
        term: 'CFA / VAE / OPCO',
        value: 'CFA = Centre de Formation des Apprentis (organisme qui délivre la formation en alternance). VAE = Validation des Acquis de l\'Expérience (procédure permettant d\'obtenir une certification sur la base de l\'expérience professionnelle). OPCO = Opérateur de Compétences (organisme qui finance la formation professionnelle selon les branches). Dans le parcours Bachelor QHSE en alternance : le CFA organise la formation, l\'OPCO la cofinance, la VAE est une voie alternative d\'accès à RNCP41446.'
      },
      {
        term: 'FDS / REACH',
        value: 'FDS = Fiche de Données de Sécurité (document obligatoire en 16 rubriques pour tout ACD classé CLP). REACH = Registration, Evaluation, Authorisation and restriction of CHemicals — règlement européen (CE) 1907/2006 régissant l\'enregistrement et l\'autorisation des substances chimiques. L\'annexe II de REACH définit le format obligatoire des FDS. CLP et REACH sont complémentaires : REACH identifie les substances, CLP les classifie et les étiquette.'
      }
    ],
    cadreLegal: '<p>Cette fiche est un lexique thématique : chaque acronyme renvoie à son texte de référence. Références structurantes : <span class="fi-cite"><a href="https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — DUERP (<code>Art. R4121-1</code>)</a></span> pour les acronymes SST/DUERP ; <span class="fi-cite"><a href="https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html" target="_blank" rel="noopener noreferrer">INRS — Risques chimiques</a></span> pour CMR/FDS/CLP/VLEP ; <span class="fi-cite"><a href="https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee" target="_blank" rel="noopener noreferrer">AIDA INERIS — ICPE (<code>Art. L511-1</code>)</a></span> pour ICPE/Seveso.</p><p>Repères article-clés : <code>Art. R4121-1</code> → DUERP ; <code>Art. L4121-2</code> → 9 principes (EPC/EPI) ; <code>Art. L2311-1</code> → CSE (périmètre légal) ; <code>Art. L511-1</code> Code de l\'environnement → ICPE. Pour le RNCP41446 et les blocs de compétences, la référence officielle est France compétences (SPA — vérifiée Batch F 2026).</p>',
    demarche: '<p>Cette fiche s\'utilise comme un <strong>lexique de révision</strong>. Méthode recommandée :</p><ul><li><strong>Regrouper par bloc thématique</strong> et non par ordre alphabétique : bloc SST (AT/MP, DUERP, EvRP, PAPRIPACT, EPI/EPC, RPS, TMS) ; bloc chimique (ACD, CMR, CLP, SGH, VLEP, VME, VLE, FDS, REACH) ; bloc management (SMQ, SME, SMS-SST, SMI, PDCA, HLS) ; bloc représentation du personnel (CSE, CHSCT, CSSCT) ; bloc formation (RNCP, BC01-04, CFA, VAE, OPCO).</li><li><strong>Croiser avec la fiche thématique associée</strong> pour approfondir : l\'acronyme DUERP → fiche DUERP ; CMR/FDS → fiche Risque chimique ; CSE/CHSCT → fiches principes généraux ou DUERP ; RNCP/BC → fiche Métiers.</li><li><strong>Identifier les pièges par thème</strong> : les confusions les plus fréquentes sont listées dans la section Pièges ci-dessous — réviser par paire (CHSCT vs CSE, VME vs VLE, EPI vs EPC, L1152-1 vs L1153-1).</li></ul>',
    selectedIds: [
      'acronymes-flashcard-001',
      'acronymes-flashcard-006',
      'acronymes-flashcard-008',
      'acronymes-flashcard-009',
      'acronymes-flashcard-010',
      'acronymes-flashcard-013',
      'acronymes-qcm-001',
      'acronymes-qcm-004'
    ],
    pieges: [
      'CHSCT supprimé en 2017, disparu en 2020 : le CHSCT n\'existe plus depuis les ordonnances Macron. Toute question qui le présente comme une instance active dans une entreprise moderne est fausse — la réponse correcte est CSE (et CSSCT dans les établissements ≥ 300 salariés).',
      'BC01..BC04 sont spécifiques au RNCP41446 du Bachelor QHSE CESI — ils ne sont pas des codes universels. D\'autres certifications QHSE ont leurs propres blocs avec d\'autres numéros ; seul RNCP41446 est en jeu dans cette formation.',
      'SMS-SST ≠ DUERP : le SMS-SST (ISO 45001) est un système de management volontaire global ; le DUERP est l\'obligation légale française de transcription des résultats de l\'EvRP. Les deux sont complémentaires mais distincts — en QCM, un SMS-SST ne remplace pas le DUERP.',
      'EPI prime sur EPC : FAUX — c\'est l\'inverse. La hiérarchie L4121-2 place l\'EPC (protection collective) AVANT l\'EPI (protection individuelle). L\'EPI est le dernier recours. Un QCM qui propose "distribuer des EPI en priorité" comme première mesure de prévention est un piège.',
      'VME ≠ "Valeur Maximale en Entreprise" : la VME = Valeur Moyenne d\'Exposition sur 8 heures. Ce n\'est pas une valeur maximale instantanée — c\'est une moyenne journalière. La VLE couvre les pics (15 min). Cette confusion est très courante.',
      'CSSCT obligatoire ≠ seulement 300 salariés : la CSSCT est obligatoire dans les établissements ≥ 300 salariés, MAIS AUSSI dans tous les établissements Seveso, ICPE à autorisation spéciale et établissements nucléaires quelle que soit leur taille. Le seul seuil "300 salariés" est incomplet.'
    ],
    sources: [
      {
        authority: 'INRS',
        ref: 'DUERP — Document unique et évaluation des risques professionnels',
        url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'INRS',
        ref: 'Risques chimiques — ce qu\'il faut retenir (CMR, FDS, CLP, VLEP)',
        url: 'https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html'
      },
      {
        authority: 'France compétences',
        ref: 'RNCP41446 — Bachelor QHSE CESI (BC01–BC04)',
        url: 'https://www.francecompetences.fr/recherche/rncp/41446/'
      }
    ]
  },

  /* =========================================================
   * FICHE 12: metiers
   * Plan 05-04, Wave 4
   * selectedIds: 8 items from metiers pool (12 total in BANK)
   * URL verification: France Travail (curl 200, 2026-05-29)
   * SPA URL: francecompetences.fr/recherche/rncp/41446/ — Batch F 2026 human-verified
   * ========================================================= */
  {
    slug: 'metiers',
    title: 'Métiers QHSE — codes ROME et parcours alternance',
    tldr: 'Le Bachelor QHSE CESI (RNCP41446) ouvre sur trois codes ROME officiels : H1302 (management/ingénierie HSE), H1502 (management/ingénierie qualité) et M1402 (conseil en organisation). L\'alternance est la voie privilégiée — le CFA organise la formation, l\'OPCO la cofinance, l\'entreprise apporte le terrain. ROME ≠ RNCP : deux référentiels distincts, un pour les métiers, l\'autre pour les certifications.',
    definitions: [
      {
        term: 'ROME',
        value: 'Répertoire Opérationnel des Métiers et des Emplois. Référentiel élaboré par France Travail (ex Pôle Emploi) qui classe les métiers en familles professionnelles. Chaque code ROME comprend 5 caractères : 1 lettre (domaine) + 4 chiffres (famille métier). H = Industrie ; M = Support à l\'entreprise. Le ROME décrit les activités, compétences et environnements de travail de chaque famille de métiers.'
      },
      {
        term: 'ROME H1302',
        value: 'Management et ingénierie Hygiène Sécurité Environnement (HSE) industriels. Premier code ROME officiellement associé à RNCP41446 par France compétences. Couvre les postes de responsable/ingénieur HSE : pilotage du SMSST, mise en conformité réglementaire, gestion des risques industriels, animation de la culture sécurité, relations avec DREAL et inspection du travail. Niveau typiquement Bac+5 dans l\'offre d\'emploi.'
      },
      {
        term: 'ROME H1502',
        value: 'Management et ingénierie qualité industrielle. Deuxième code ROME officiel de RNCP41446. Couvre les postes de responsable qualité : pilotage du SMQ ISO 9001, audits fournisseurs, métrologie, certification produit/process, gestion des non-conformités. Distinct de H1302 (HSE) : ici la priorité est la conformité qualité, pas la sécurité au travail.'
      },
      {
        term: 'ROME M1402',
        value: 'Conseil en organisation et management d\'entreprise. Troisième code ROME officiel de RNCP41446. Couvre les fonctions transversales de conseil et de structuration des systèmes de management (SMI, RSE, processus). La lettre M (Support à l\'entreprise) souligne la dimension stratégique et transverse du profil QHSE. H1523 (Responsable QSE) est souvent cité dans les offres d\'emploi mais n\'apparaît pas dans la fiche RNCP41446 officielle.'
      },
      {
        term: 'ROME H1303',
        value: 'Intervention technique en Hygiène Sécurité Environnement. Code ROME du technicien HSE, niveau d\'entrée dans la filière (typiquement Bac+2). Couvre les missions terrain : rondes de sécurité, vérification EPI/EPC, animation des quarts d\'heure sécurité, tenue du registre des accidents. Niveau inférieur à H1302 (Bac+5) et H1523 (Bac+3).'
      },
      {
        term: 'RNCP41446',
        value: 'Numéro d\'enregistrement au Répertoire National des Certifications Professionnelles du Bachelor QHSE CESI. La fiche RNCP41446 publiée par France compétences liste les blocs de compétences (BC01-BC04), les codes ROME associés (H1302, H1502, M1402), les modalités d\'accès et les passerelles. C\'est la référence officielle de la certification — ne pas confondre avec le code CPF ou le code NSF.'
      },
      {
        term: 'Alternance — rôles CFA / OPCO / tuteur',
        value: 'En contrat d\'alternance (apprentissage ou professionnalisation) : le CFA (Centre de Formation des Apprentis) dispense la formation théorique et délivre la certification ; l\'OPCO (Opérateur de Compétences de la branche) finance tout ou partie des frais de formation et rémunère l\'apprenti ; le tuteur en entreprise encadre l\'alternant et valide les compétences terrain. Le tuteur n\'est pas le responsable hiérarchique — son rôle est pédagogique.'
      }
    ],
    cadreLegal: '<p>Le Bachelor QHSE CESI est enregistré au <span class="fi-cite"><a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer">France compétences — RNCP41446</a></span>. L\'enregistrement RNCP est la reconnaissance officielle de la certification par l\'État. Les codes ROME associés (H1302, H1502, M1402) sont issus du référentiel France Travail, accessible sur <span class="fi-cite"><a href="https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html" target="_blank" rel="noopener noreferrer">France Travail — le ROME et les fiches métiers</a></span>.</p><p>Le cadre juridique de la formation en alternance repose sur le Code du travail : <code>Art. L6313-1</code> et suivants (formation professionnelle continue) ; <code>Art. L6211-1</code> et suivants (contrat d\'apprentissage). L\'employeur qui accueille un alternant signe un contrat d\'apprentissage ou de professionnalisation, soumis à l\'OPCO compétent pour la branche.</p><p>Le ROME n\'est pas le RNCP : le ROME est un outil de description des métiers (emploi, activités, compétences) géré par France Travail ; le RNCP est un outil de description des certifications (niveau, blocs, modalités) géré par France compétences. Les deux référentiels se complètent mais dépendent d\'autorités différentes.</p>',
    demarche: '<p>Pour lire et utiliser la fiche <span class="fi-cite"><a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer">RNCP41446</a></span> dans le cadre de son parcours QHSE :</p><ul><li><strong>Identifier les blocs de compétences (BC01-BC04)</strong> — La fiche RNCP41446 décompose la certification en 4 blocs, chacun correspondant à un domaine de compétences du métier QSE. En alternance, les missions confiées par l\'entreprise doivent couvrir les activités de chaque bloc pour que la formation soit complète.</li><li><strong>Lire les codes ROME associés</strong> — H1302, H1502, M1402 donnent une description des activités et compétences attendues du niveau Bachelor QHSE. Ils servent aussi pour cibler les offres d\'emploi : un alternant peut se positionner sur des offres codées H1523 (QSE Bac+3) même si ce code n\'est pas dans la fiche RNCP41446 officielle.</li><li><strong>Identifier l\'OPCO de sa branche</strong> — Selon le secteur de l\'entreprise d\'accueil, l\'OPCO compétent diffère (ex : OCAPIAT pour l\'agriculture, ATLAS pour les services financiers). L\'OPCO valide le contrat et finance la formation ; sa contribution peut couvrir tout ou partie des frais.</li><li><strong>Rôle du tuteur entreprise</strong> — Le tuteur pédagogique assure le suivi des apprentissages terrain, évalue les compétences acquises et signe les documents de validation. Un mauvais choix de tuteur (sans compétences QHSE) est un facteur de risque pour la validation des blocs de compétences.</li></ul>',
    selectedIds: [
      'metiers-flashcard-001',
      'metiers-flashcard-002',
      'metiers-flashcard-003',
      'metiers-flashcard-004',
      'metiers-flashcard-006',
      'metiers-qcm-001',
      'metiers-qcm-002',
      'metiers-qcm-003'
    ],
    pieges: [
      'ROME ≠ RNCP : deux référentiels distincts, deux autorités différentes. ROME = métiers/emploi (France Travail). RNCP = certifications/diplômes (France compétences). Un QCM qui confond les deux référentiels est un piège classique.',
      'H1523 (Responsable QSE) ≠ dans la liste officielle RNCP41446 : H1523 apparaît dans de nombreuses offres d\'emploi pour un Bac+3 QSE, mais la fiche RNCP41446 de France compétences liste H1302, H1502 et M1402 — pas H1523. Les QCM basés sur la fiche RNCP officielle ne citent pas H1523.',
      'H1303 ≠ niveau Bachelor : H1303 (Intervention technique HSE) est le niveau technicien Bac+2. H1302 est le niveau manager/ingénieur Bac+5. Le Bachelor Bac+3 se positionne entre les deux — code H1523 dans les offres d\'emploi, M1402 dans la fiche RNCP officielle.',
      'La lettre H du code ROME ≠ Hygiène : H est le domaine professionnel "Industrie" dans la nomenclature ROME. Ce n\'est pas l\'initiale de "Hygiène". M (M1402) = Support à l\'entreprise. Ce faux ami est piégeant.',
      'CFA ≠ OPCO : le CFA forme et certifie ; l\'OPCO finance. Les deux sont partenaires mais distincts — confondre leurs rôles est une erreur fréquente dans les QCM sur la formation professionnelle.',
      'VAE : l\'alternance n\'est pas la seule voie pour obtenir RNCP41446 — la VAE (Validation des Acquis de l\'Expérience) permet d\'obtenir tout ou partie de la certification sans formation, sur la base de l\'expérience professionnelle. Un QCM qui présente l\'alternance comme la "seule voie" est inexact.'
    ],
    sources: [
      {
        authority: 'France compétences',
        ref: 'RNCP41446 — Bachelor QHSE CESI (codes ROME, BC01-BC04)',
        url: 'https://www.francecompetences.fr/recherche/rncp/41446/'
      },
      {
        authority: 'France Travail',
        ref: 'Le ROME et les fiches métiers (H1302, H1502, M1402, H1303)',
        url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html'
      },
      {
        authority: 'INRS',
        ref: 'DUERP et EvRP — référentiel de base (RNCP41446 BC02)',
        url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html'
      }
    ]
  },

  /* =========================================================
   * FICHE 13: calendrier
   * Plan 05-05, Wave 5
   * selectedIds: 8 items from calendrier pool (11 total in BANK)
   * URL verification: service-public.gouv.fr F2918 + F15478 (curl 200, 2026-05-30)
   * Accuracy anchor: 27/43/53/100% 1re année — live-refetch verified 2026-05-20 per STATE.md
   * ========================================================= */
  {
    slug: 'calendrier',
    title: 'Calendrier alternance',
    tldr: 'Le contrat d\'apprentissage dure de 6 mois à 3 ans, avec au moins 25 % du temps passé en CFA. La rémunération minimale d\'un apprenti en 1re année est exprimée en pourcentage du SMIC selon l\'âge : moins de 18 ans = 27 % du SMIC, 18-20 ans = 43 %, 21-25 ans = 53 %, 26 ans et plus = 100 %. Le contrat de professionnalisation suit un régime parallèle (tuteur, OPCO, rémunération distincte). Ces barèmes constituent un repère de calcul incontournable pour l\'alternant QHSE.',
    definitions: [
      {
        term: 'Contrat d\'apprentissage',
        value: 'Contrat de travail en alternance qui permet à l\'apprenti de suivre une formation qualifiante (RNCP) en CFA tout en exerçant une activité professionnelle en entreprise. Durée : 6 mois minimum à 3 ans maximum (ou 4 ans pour les travailleurs handicapés). La formation en CFA représente au minimum 25 % de la durée totale du contrat.'
      },
      {
        term: 'Contrat de professionnalisation',
        value: 'Contrat en alternance orienté vers l\'acquisition d\'une qualification professionnelle reconnue. Durée : 6 à 12 mois en général (extensible jusqu\'à 24 mois par accord de branche, 36 mois pour certains publics). Le tuteur en entreprise encadre l\'alternant ; la rémunération est calculée selon l\'âge et le niveau de qualification, en pourcentage du SMIC ou du salaire minimum conventionnel.'
      },
      {
        term: 'Rythme alternance',
        value: 'Répartition des semaines entre l\'entreprise et le CFA tout au long du contrat. Pour le Bachelor QHSE CESI, le rythme indicatif est généralement de 3 semaines en entreprise pour 1 semaine en CFA, mais peut varier selon les promotions et les années. À confirmer avec le CFA pour la promotion 2026.'
      },
      {
        term: 'SMIC (Salaire Minimum Interprofessionnel de Croissance)',
        value: 'Salaire minimum légal en France, réévalué au 1er janvier de chaque année et lors de révisions exceptionnelles. En 2026, le SMIC mensuel brut est de 1 823,03 €. La rémunération de l\'apprenti est calculée en pourcentage du SMIC — sauf si la convention collective de branche prévoit un minimum plus favorable, qui prime dans ce cas.'
      },
      {
        term: 'CFA (Centre de Formation des Apprentis)',
        value: 'Établissement qui dispense la partie théorique de la formation de l\'apprenti, délivre la certification et assure le suivi pédagogique. Le CFA est l\'interlocuteur principal de l\'apprenti pour tout ce qui concerne la formation, les examens et la validation des blocs de compétences (BC01-BC04 pour RNCP41446).'
      },
      {
        term: 'OPCO (Opérateur de Compétences)',
        value: 'Organisme de branche qui finance tout ou partie des frais de formation en alternance et prend en charge la rémunération de l\'apprenti. L\'OPCO compétent dépend du secteur d\'activité de l\'entreprise d\'accueil (ex : OCAPIAT pour l\'agriculture, ATLAS pour les services financiers, OPCO 2i pour l\'industrie).'
      },
      {
        term: 'Maître d\'apprentissage',
        value: 'Désignation spécifique au contrat d\'apprentissage (à distinguer du "tuteur" du contrat de professionnalisation). Le maître d\'apprentissage est le référent pédagogique en entreprise — il doit justifier d\'une expérience professionnelle de 2 ans minimum en lien avec la qualification préparée. Son rôle est d\'encadrer, de former et d\'évaluer les compétences terrain de l\'apprenti.'
      }
    ],
    cadreLegal: '<p>La rémunération minimale de l\'apprenti est fixée par les articles <code>D6222-26</code> et suivants du Code du travail. La fiche pratique de référence est publiée par <span class="fi-cite"><a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F2918" target="_blank" rel="noopener noreferrer">Service-Public.gouv.fr — Contrat d\'apprentissage (F2918)</a></span>. Le barème officiel 2026 pour la <strong>1re année</strong> est : moins de 18 ans = <strong>27 %</strong> du SMIC, 18-20 ans = <strong>43 %</strong>, 21-25 ans = <strong>53 %</strong>, 26 ans et plus = <strong>100 %</strong>. Pour les 2e et 3e années, consulter le tableau complet sur la fiche F2918.</p><p>Le contrat de professionnalisation est encadré par les articles <code>L6325-1</code> et suivants du Code du travail. La fiche pratique est disponible sur <span class="fi-cite"><a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F15478" target="_blank" rel="noopener noreferrer">Service-Public.gouv.fr — Contrat de professionnalisation (F15478)</a></span>. La rémunération d\'un salarié de moins de 21 ans est de 55 % du SMIC minimum ; pour les 21-25 ans, 70 % du SMIC minimum.</p><p>En cas de convention collective de branche plus favorable, celle-ci prime sur les minima légaux (<code>Art. L2253-1</code> — principe de faveur).</p>',
    demarche: '<p>Pour calculer sa rémunération minimale légale en contrat d\'apprentissage :</p><ul><li><strong>Identifier son âge à la date de signature du contrat</strong> — c\'est l\'âge au moment de la conclusion du contrat qui détermine le taux applicable pour toute la 1re année.</li><li><strong>Appliquer le pourcentage au SMIC en vigueur</strong> : moins de 18 ans = <strong>27 %</strong> × 1 823,03 € = 492,22 € bruts/mois ; 18-20 ans = <strong>43 %</strong> × 1 823,03 € = 783,90 € ; 21-25 ans = <strong>53 %</strong> × 1 823,03 € = 966,21 € ; 26 ans et plus = <strong>100 %</strong> × 1 823,03 € = 1 823,03 €.</li><li><strong>Vérifier la convention collective</strong> — si la branche prévoit un taux ou un montant supérieur, ce minimum de branche s\'applique à la place du minimum légal.</li><li><strong>Vérifier les années suivantes</strong> — les pourcentages augmentent en 2e et 3e année selon le tableau de la fiche F2918 sur Service-Public.gouv.fr.</li></ul><p>L\'OPCO de la branche peut être identifié via le site du Ministère du travail ou auprès du CFA. Il est recommandé de prendre contact avec l\'OPCO dès la signature du contrat pour vérifier la prise en charge des frais de formation.</p>',
    selectedIds: [
      'calendrier-flashcard-001',
      'calendrier-flashcard-002',
      'calendrier-flashcard-003',
      'calendrier-flashcard-004',
      'calendrier-flashcard-005',
      'calendrier-qcm-001',
      'calendrier-qcm-002',
      'calendrier-qcm-003'
    ],
    pieges: [
      'Confusion contrat d\'apprentissage / contrat de professionnalisation : ce sont deux régimes distincts. Dans l\'apprentissage, le référent en entreprise s\'appelle "maître d\'apprentissage" ; dans la professionnalisation, c\'est le "tuteur". Les QCM testent souvent cette distinction terminologique.',
      'L\'apprenti de 26 ans et plus reçoit 100 % du SMIC — soit le SMIC complet (1 823,03 € en 2026). Ce n\'est pas un bonus : c\'est le minimum légal. L\'employeur peut toujours verser plus, mais ne peut pas verser moins.',
      'Le barème en pourcentage du SMIC est le minimum légal : si la convention collective de branche prévoit un minimum plus élevé (en valeur absolue ou en pourcentage), c\'est ce minimum de branche qui s\'applique — le principe de faveur (Art. L2253-1) impose la règle la plus avantageuse pour le salarié.',
      'La tranche "21-25 ans = 53 %" est souvent confondue avec "21-25 ans = 50 %" ou "21-26 ans". Le barème légal est précisément : < 18 ans = 27 %, 18-20 ans = 43 %, 21-25 ans = 53 %, 26 ans + = 100 % (pour la 1re année).',
      'Le pourcentage est calculé sur le SMIC et non sur le salaire conventionnel de base du poste visé. Ce sont deux références différentes — sauf si la convention collective aligne les deux.',
      'La durée minimale du CFA (25 % du contrat) est une obligation légale — l\'entreprise ne peut pas réduire unilatéralement le temps en CFA pour des raisons opérationnelles, sauf accord exprès du CFA et de l\'OPCO.'
    ],
    sources: [
      {
        authority: 'Service-Public.gouv.fr',
        ref: 'Contrat d\'apprentissage — rémunération, durée, maître d\'apprentissage (F2918)',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2918'
      },
      {
        authority: 'Service-Public.gouv.fr',
        ref: 'Contrat de professionnalisation — rémunération, tuteur, OPCO (F15478)',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F15478'
      },
      {
        authority: 'Légifrance',
        ref: 'Art. D6222-26 — Rémunération minimale apprenti (barème % SMIC par âge/année)',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038033238'
      }
    ]
  },

  /* =========================================================
   * FICHE 14: icpe-seveso
   * Plan 05-05, Wave 5
   * selectedIds: 8 items from icpe-seveso pool (12 total in BANK)
   * URL verification: entreprendre.service-public.gouv.fr/F33414 + AIDA INERIS (curl 200, 2026-05-30)
   * Légifrance L511-1 : plain <code> text — curl returns 403 (anti-bot)
   * ========================================================= */
  {
    slug: 'icpe-seveso',
    title: 'ICPE / Seveso',
    tldr: 'Les ICPE (Installations Classées pour la Protection de l\'Environnement) sont soumises à l\'un des trois régimes réglementaires — Déclaration, Enregistrement ou Autorisation — selon la nomenclature publiée par rubrique d\'activité. Seveso est un sous-ensemble des ICPE : seules les installations dépassant certains seuils de substances dangereuses sont classées Seveso seuil bas (S) ou seuil haut (SH) au titre de la Directive 2012/18/UE. La DREAL instruit les dossiers et assure le contrôle ; l\'inspecteur ICPE est un agent de la DREAL.',
    definitions: [
      {
        term: 'ICPE (Installation Classée pour la Protection de l\'Environnement)',
        value: 'Toute installation exploitée ou détenue par toute personne physique ou morale, publique ou privée, susceptible de créer des risques ou de provoquer des pollutions ou nuisances (pour la commodité des riverains, la santé, la sécurité, la salubrité publiques, l\'agriculture, la nature et l\'environnement). Fondement légal : <code>Art. L511-1</code> du Code de l\'environnement.'
      },
      {
        term: 'Nomenclature ICPE (rubriques)',
        value: 'Liste réglementaire des activités soumises à la réglementation ICPE, organisée en rubriques numérotées. Chaque rubrique précise les seuils déclenchant le régime applicable (D, E ou A). Une même installation peut relever de plusieurs rubriques. La nomenclature est annexée au décret du Code de l\'environnement.'
      },
      {
        term: 'Déclaration (D) — régime ICPE',
        value: 'Régime le moins contraignant des 3. L\'exploitant déclare son installation à la préfecture avant l\'ouverture ; aucun accord préalable n\'est requis, mais le dossier doit être complet. L\'exploitant doit respecter les prescriptions générales fixées par arrêté ministériel.'
      },
      {
        term: 'Enregistrement (E) — régime ICPE',
        value: 'Régime intermédiaire. L\'installation est soumise à des prescriptions générales de référence (arrêtés de prescriptions générales) et à une instruction simplifiée. Un délai d\'instruction est prévu ; l\'autorité peut adapter les prescriptions générales, voire passer en régime d\'autorisation si les enjeux le justifient.'
      },
      {
        term: 'Autorisation (A) — régime ICPE',
        value: 'Régime le plus contraignant. L\'exploitant doit constituer un dossier de demande d\'autorisation environnementale comprenant une étude d\'impact, une étude de dangers et une consultation publique. L\'autorisation est délivrée par le préfet, après instruction par la DREAL, et précise toutes les prescriptions applicables.'
      },
      {
        term: 'Seveso seuil bas (S)',
        value: 'Classement attribué aux établissements dont les quantités de substances dangereuses dépassent le seuil bas défini à l\'annexe I de la Directive 2012/18/UE, sans atteindre le seuil haut. Implique des exigences minimales : politique de prévention des accidents majeurs (PPAM), système de gestion de la sécurité (SGS) simplifié.'
      },
      {
        term: 'Seveso seuil haut (SH)',
        value: 'Classement attribué aux établissements dont les quantités de substances dangereuses dépassent le seuil haut de l\'annexe I de la Directive 2012/18/UE. Implique toutes les exigences du seuil bas, plus : SGS complet, plan d\'opération interne (POI), information des riverains, PPRT (Plan de Prévention des Risques Technologiques) imposé par le préfet.'
      },
      {
        term: 'DREAL (Direction Régionale de l\'Environnement, de l\'Aménagement et du Logement)',
        value: 'Service déconcentré de l\'État compétent pour l\'instruction des dossiers ICPE, la délivrance des autorisations et le contrôle des installations. L\'inspecteur ICPE est un agent de la DREAL — il est distinct de l\'inspecteur du travail (qui dépend de la DREETS/DRSM).'
      },
      {
        term: 'POI (Plan d\'Opération Interne)',
        value: 'Plan de gestion des accidents majeurs propre à l\'établissement Seveso SH. Élaboré par l\'exploitant, il définit l\'organisation interne d\'intervention en cas d\'accident : chaîne de commandement, moyens d\'intervention, procédures d\'évacuation et de confinement. À distinguer du PPI (Plan Particulier d\'Intervention), externe, géré par la préfecture.'
      },
      {
        term: 'PPI (Plan Particulier d\'Intervention)',
        value: 'Plan externe d\'urgence établi par le préfet pour les établissements Seveso SH. Organise les secours extérieurs (pompiers, SAMU, forces de l\'ordre, communication publique) en cas d\'accident dépassant le périmètre du site. Il complète le POI de l\'exploitant.'
      }
    ],
    cadreLegal: '<p>La réglementation ICPE est fondée sur <span class="fi-cite"><a href="https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee" target="_blank" rel="noopener noreferrer">AIDA INERIS — Qu\'est-ce qu\'une installation classée ?</a></span> (<code>Art. L511-1</code> et suivants du Code de l\'environnement — Légifrance, non hyperlié). Les démarches administratives pour les entreprises sont détaillées dans <span class="fi-cite"><a href="https://entreprendre.service-public.gouv.fr/vosdroits/F33414" target="_blank" rel="noopener noreferrer">Service-Public Entreprendre — ICPE (F33414)</a></span>.</p><p>Le régime Seveso est issu de la <strong>Directive 2012/18/UE du 4 juillet 2012</strong> (Seveso 3), transposée en droit français. La base documentaire est disponible sur <span class="fi-cite"><a href="https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso" target="_blank" rel="noopener noreferrer">AIDA INERIS — Seveso</a></span>. Les établissements Seveso SH sont en outre soumis au PPRT (loi n°2003-699 du 30 juillet 2003 relative à la prévention des risques technologiques et naturels).</p><p>L\'inspecteur ICPE intervient au titre du <code>Art. L514-5</code> du Code de l\'environnement. Ses constats peuvent déboucher sur des mesures de mise en demeure, des sanctions administratives ou la fermeture de l\'installation.</p>',
    demarche: '<p>Pour déterminer le régime applicable à une activité industrielle :</p><ul><li><strong>Consulter la nomenclature ICPE</strong> — identifier toutes les rubriques applicables à l\'installation (une même installation peut relever de plusieurs rubriques). La nomenclature est disponible en ligne (Légifrance et AIDA INERIS).</li><li><strong>Identifier le régime le plus contraignant</strong> — si l\'installation relève de plusieurs rubriques, c\'est le régime le plus élevé (D &lt; E &lt; A) qui s\'applique pour l\'ensemble du dossier.</li><li><strong>Constituer et déposer le dossier</strong> — pour le régime D : déclaration en préfecture ; pour E : dossier simplifié à la DREAL ; pour A : dossier de demande d\'autorisation environnementale (étude d\'impact + étude de dangers + enquête publique), instruit par la DREAL.</li><li><strong>Vérifier le classement Seveso</strong> — calculer les quantités de substances dangereuses présentes sur le site et les comparer aux seuils de l\'annexe I de la Directive 2012/18/UE. L\'outil de calcul est disponible via AIDA INERIS.</li><li><strong>Si Seveso SH : préparer le POI</strong> — rédiger le Plan d\'Opération Interne, le tester régulièrement, et informer le préfet pour l\'élaboration du PPI.</li></ul>',
    selectedIds: [
      'icpe-seveso-flashcard-001',
      'icpe-seveso-flashcard-002',
      'icpe-seveso-flashcard-003',
      'icpe-seveso-flashcard-004',
      'icpe-seveso-flashcard-005',
      'icpe-seveso-flashcard-007',
      'icpe-seveso-qcm-001',
      'icpe-seveso-qcm-002'
    ],
    pieges: [
      'Seveso ≠ ICPE : Seveso est un sous-ensemble des ICPE — toutes les installations Seveso sont des ICPE, mais toutes les ICPE ne sont pas Seveso. Un site peut être soumis à autorisation ICPE sans être classé Seveso si les substances dangereuses présentes ne dépassent pas les seuils annexe I de la Directive 2012/18/UE.',
      'Confusion des 3 régimes ICPE (D / E / A) : l\'ordre croissant de contrainte est Déclaration < Enregistrement < Autorisation. L\'autorisation est le régime le plus contraignant (instruction complète + enquête publique) ; la déclaration est le plus simple (pas d\'accord préalable). Un QCM qui inverse l\'ordre est un piège classique.',
      'L\'inspecteur ICPE relève de la DREAL, pas de l\'Inspection du Travail (qui dépend de la DREETS). Ce sont deux corps d\'inspection distincts avec des périmètres de compétence différents — l\'un contrôle l\'environnement et les risques technologiques, l\'autre les conditions de travail et le droit du travail.',
      'POI ≠ PPI : le POI (Plan d\'Opération Interne) est élaboré et géré par l\'exploitant ; le PPI (Plan Particulier d\'Intervention) est établi par le préfet. Les deux sont complémentaires et obligatoires pour les établissements Seveso SH, mais leurs périmètres d\'action sont distincts.',
      'Seveso seuil bas ≠ absence d\'obligations : même le seuil bas impose une politique de prévention des accidents majeurs (PPAM) et un SGS simplifié. Le "bas" est relatif — par rapport au seuil haut, pas par rapport à une absence de contraintes.',
      'La nomenclature ICPE est annexée au Code de l\'environnement, pas au Code du travail. Une confusion fréquente liée à la proximité thématique avec la prévention des risques professionnels.'
    ],
    sources: [
      {
        authority: 'AIDA INERIS',
        ref: 'Qu\'est-ce qu\'une installation classée ? — principes réglementaires ICPE',
        url: 'https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee'
      },
      {
        authority: 'AIDA INERIS',
        ref: 'Seveso — Directive 2012/18/UE, seuils bas/haut, POI/PPI/PPRT',
        url: 'https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso'
      },
      {
        authority: 'Service-Public Entreprendre',
        ref: 'ICPE — démarches administratives entreprise (F33414)',
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F33414'
      }
    ]
  },

  /* =========================================================
   * FICHE 15: rncp
   * Plan 05-05, Wave 5
   * selectedIds: 8 items from rncp pool (13 total in BANK)
   * URL: francecompetences.fr SPA — verified Batch F 2026-05-20 (human-eyeball, per outils-data.js rncp items); curl/WebFetch cannot render JS content
   * Légifrance L6113-1 + L335-5 : plain <code> text — curl returns 403 (anti-bot)
   * ========================================================= */
  {
    slug: 'rncp',
    title: 'RNCP / Certification',
    tldr: 'RNCP41446 est la certification professionnelle "Responsable qualité sécurité environnement" de niveau 6 (Bac+3) enregistrée au RNCP par France compétences, avec échéance au 27 octobre 2030. Elle se compose de 4 blocs de compétences (BC01-BC04) : construire le SMQSE, améliorer le SMQSE, manager les risques QSE, accompagner la RSE. Certificateur : CESI Ecole d\'Ingénieurs. L\'enregistrement RNCP est la référence officielle pour les employeurs, les OPCO et les jurys de certification.',
    definitions: [
      {
        term: 'RNCP (Répertoire National des Certifications Professionnelles)',
        value: 'Répertoire officiel géré par France compétences qui recense toutes les certifications professionnelles enregistrées par l\'État. Chaque certification se voit attribuer un numéro RNCP unique (ex : RNCP41446), un niveau de qualification (1 à 8), des blocs de compétences et des codes ROME associés.'
      },
      {
        term: 'France compétences',
        value: 'Autorité nationale de financement et de régulation de la formation professionnelle et de l\'apprentissage. France compétences gère le RNCP et le RS (Répertoire Spécifique), fixe les niveaux de prise en charge des formations par les OPCO, et publie les fiches certifications officielles.'
      },
      {
        term: 'BC01 — Construire le système de management QSE',
        value: 'Premier bloc de compétences de RNCP41446. Couvre la conception et la mise en place d\'un système de management intégré Qualité-Sécurité-Environnement (QSE) dans un organisme : diagnostic initial, politique QSE, cartographie des processus, identification des parties intéressées.'
      },
      {
        term: 'BC02 — Améliorer le système de management QSE',
        value: 'Deuxième bloc de compétences de RNCP41446. Couvre l\'amélioration continue du SMQSE : audits internes, revues de direction, non-conformités et actions correctives, indicateurs de performance, démarche Kaizen et cycles PDCA.'
      },
      {
        term: 'BC03 — Manager les risques QSE',
        value: 'Troisième bloc de compétences de RNCP41446. Couvre l\'évaluation et la maîtrise des risques professionnels (EvRP/DUERP), environnementaux et qualité : identification des dangers, cotation des risques, plan d\'actions de prévention, veille réglementaire QSE.'
      },
      {
        term: 'BC04 — Accompagner l\'organisme dans ses démarches RSE et de développement durable',
        value: 'Quatrième bloc de compétences de RNCP41446. Couvre les démarches de Responsabilité Sociétale des Entreprises (RSE) : ISO 26000, reporting extra-financier, bilan carbone, économie circulaire, dialogue avec les parties prenantes.'
      },
      {
        term: 'Niveau de qualification (niveau 6 — CNC)',
        value: 'Le niveau 6 du Cadre National des Certifications correspond au niveau Bac+3 (Bachelor / Licence). Il est équivalent au niveau 6 du Cadre Européen des Certifications (EQF) — compatibilité oui, mais les deux cadres sont distincts : le CNC est géré par France compétences, l\'EQF par la Commission européenne. RNCP41446 est de niveau 6 CNC.'
      },
      {
        term: 'Bloc de compétences (modalité de capitalisation)',
        value: 'Sous-ensemble autonome et cohérent de compétences d\'une certification RNCP. Un candidat qui valide un bloc sans obtenir la certification complète peut capitaliser ce bloc (Art. L6113-1 Code du travail — reconnaissance partielle). Les blocs peuvent également être obtenus par VAE (Validation des Acquis de l\'Expérience).'
      }
    ],
    cadreLegal: '<p>La certification RNCP41446 "Responsable qualité sécurité environnement" est enregistrée au Répertoire National des Certifications Professionnelles par <span class="fi-cite"><a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer">France compétences — RNCP41446</a></span> (SPA — vérifié Batch F 2026-05-20, human-eyeball ; curl/WebFetch ne peut pas rendre le contenu JS). Certificateur : CESI Ecole d\'Ingénieurs (SIRET 77572257201109). Échéance d\'enregistrement : 27 octobre 2030.</p><p>Le cadre juridique des blocs de compétences est posé par <code>Art. L6113-1</code> du Code du travail (reconnaissance des certifications professionnelles et des blocs de compétences — Légifrance, non hyperlié, anti-bot). Les niveaux de qualification sont définis par <code>Art. L335-5</code> du Code de l\'éducation (Légifrance, non hyperlié, anti-bot).</p><p>La fiche RNCP41446 liste les blocs BC01-BC04, les codes ROME associés (H1302, H1502, M1402), les modalités d\'accès (formation initiale, alternance, VAE) et les passerelles vers d\'autres certifications. C\'est le document officiel à consulter pour toute question sur la certification.</p>',
    demarche: '<p>Pour lire et utiliser la fiche <span class="fi-cite"><a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer">RNCP41446 sur France compétences</a></span> :</p><ul><li><strong>Repérer les 4 blocs de compétences (BC01-BC04)</strong> — chaque bloc correspond à un domaine du métier QSE. La fiche décrit pour chaque bloc les compétences attendues, les modalités d\'évaluation et le poids dans la certification globale.</li><li><strong>Identifier les codes ROME associés (H1302, H1502, M1402)</strong> — ces codes ROME servent à cibler les offres d\'emploi et à justifier l\'adéquation de la certification avec les métiers visés. Ils sont différents du code ROME H1523 (Responsable QSE Bac+5) qui apparaît fréquemment dans les offres pour ce niveau.</li><li><strong>Vérifier l\'échéance d\'enregistrement (27 octobre 2030)</strong> — après cette date, la certification devra être renouvelée pour rester valide et finançable par les OPCO. Un renouvellement anticipé est courant si la certification évolue.</li><li><strong>Comprendre la capitalisation des blocs</strong> — si la certification complète n\'est pas obtenue, les blocs validés peuvent être capitalisés. La VAE permet également d\'accéder à RNCP41446 ou à ses blocs sur la base de l\'expérience professionnelle.</li></ul>',
    selectedIds: [
      'rncp-flashcard-001',
      'rncp-flashcard-002',
      'rncp-flashcard-003',
      'rncp-flashcard-004',
      'rncp-flashcard-005',
      'rncp-flashcard-006',
      'rncp-qcm-001',
      'rncp-qcm-003'
    ],
    pieges: [
      'RNCP41446 est CESI-spécifique — d\'autres organismes proposent des Bachelor QHSE avec leur propre numéro RNCP. Vérifier systématiquement le numéro RNCP ET le certificateur pour s\'assurer de la bonne fiche. "Bachelor QHSE" est une dénomination générique, pas un identifiant unique.',
      'Les BC01-BC04 de RNCP41446 ne sont pas universels — chaque fiche RNCP a ses propres blocs avec ses propres intitulés. Un QCM portant sur les blocs d\'un autre RNCP Bachelor QHSE aura des intitulés différents. Les blocs de RNCP41446 sont : BC01 Construire, BC02 Améliorer, BC03 Manager les risques, BC04 RSE.',
      'Niveau 6 RNCP ≠ niveau 6 EQF : les deux sont compatibles (correspondance établie) mais ce sont deux référentiels distincts — le CNC est géré par France compétences (France), l\'EQF par la Commission européenne (UE). Un QCM peut tester la distinction entre ces deux cadres.',
      'France compétences ≠ Pôle Emploi (France Travail) : France compétences gère les certifications (RNCP) et le financement de la formation ; France Travail (ex Pôle Emploi) gère le placement des demandeurs d\'emploi et le référentiel ROME des métiers. Deux autorités distinctes, deux outils distincts.',
      'RNCP ≠ diplôme d\'État : un titre RNCP est une certification professionnelle enregistrée par l\'État mais pas nécessairement un diplôme délivré par l\'Éducation nationale. Le Bachelor QHSE CESI (RNCP41446) est un titre certifié par CESI — c\'est un titre RNCP privé de niveau 6, pas un diplôme universitaire.',
      'L\'alternance n\'est pas la seule voie pour obtenir RNCP41446 — la VAE (Validation des Acquis de l\'Expérience) permet d\'obtenir tout ou partie de la certification sans formation initiale, sur la base de l\'expérience professionnelle acquise. Un QCM qui présente l\'alternance comme la "seule voie" est inexact.'
    ],
    sources: [
      {
        authority: 'France compétences',
        ref: 'RNCP41446 — Responsable QSE, BC01-BC04, niveau 6, échéance 27-10-2030 (SPA — vérifié Batch F 2026-05-20)',
        url: 'https://www.francecompetences.fr/recherche/rncp/41446/'
      },
      {
        authority: 'France Travail',
        ref: 'Référentiel ROME — H1302, H1502, M1402 (codes ROME associés à RNCP41446)',
        url: 'https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html'
      },
      {
        authority: 'Légifrance',
        ref: 'Art. L6113-1 — Blocs de compétences et certification professionnelle',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038951917'
      }
    ]
  }

];
}
