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
    demarche: '<p>La démarche INRS de prévention du risque routier professionnel suit <strong>5 étapes</strong> selon un cycle PDCA :</p><ul><li><strong>Obtenir l\'engagement de la direction</strong> — La direction formalise sa politique de sécurité routière et désigne un pilote (préventeur, RH ou responsable flotte).</li><li><strong>Établir un diagnostic</strong> — Recenser les déplacements (kilométrage annuel, fréquence, catégories de conducteurs), analyser la sinistralité (AT mission, accidents de trajet), interroger les conducteurs sur les contraintes ressenties.</li><li><strong>Définir un plan d\'action sur les 3 axes</strong> :<ul><li>Organisation : planification des déplacements, réunions à distance, politique alcool et fatigue.</li><li>Ressources : choix et entretien du parc véhicule, équipements de sécurité, politique téléphone.</li><li>Compétences : formation à la conduite préventive, sensibilisation, bilan de conduite.</li></ul></li><li><strong>Mettre en œuvre</strong> — Communiquer le plan, former les managers et conducteurs, équiper les véhicules.</li><li><strong>Évaluer les résultats</strong> — Suivre les indicateurs (sinistralité, coûts, sondages conducteurs), réviser le plan chaque année.</li></ul><p>L\'inscription du risque routier dans le <span class="fi-cite"><a href="https://www.service-public.fr/particuliers/vosdroits/F171" target="_blank" rel="noopener noreferrer">service-public.fr — Accident du travail : démarches</a></span> passe par le DUERP : les unités de travail exposées (commerciaux itinérants, techniciens, livreurs) doivent faire l\'objet d\'une évaluation spécifique et d\'un plan d\'actions.</p>',
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
        url: 'https://www.service-public.fr/particuliers/vosdroits/F171'
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
  }

];
}
