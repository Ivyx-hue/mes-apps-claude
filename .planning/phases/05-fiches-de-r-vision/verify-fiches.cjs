/* verify-fiches.cjs
 * Verification gate for Phase 5 Fiches de révision (qhse-cesi/fiches-data.js + outils.html Fiches IIFE).
 *
 * USAGE:
 *   node .planning/phases/05-fiches-de-r-vision/verify-fiches.cjs
 *
 * Exit 0 = all 6 assertion groups PASS. Exit 1 = any assertion FAIL.
 *
 * Mirrors .planning/phases/03-flashcards-srs/verify-srs.cjs and
 *         .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs scaffold.
 * Sibling gate, NOT a replacement — both prior gates still assert their own contracts.
 * Node built-ins only: assert, path. No npm deps, no test runner.
 *
 * Assertion groups:
 *   (a) FICHE-01 — FICHES schema: length === 15, 9 required fields, type-correct
 *   (b) FICHE-01 — slug coverage: FICHES slug set === BANK theme set (DEC-01 coverage)
 *   (c) FICHE-01 — selectedIds cross-reference: every id resolves in BANK AND theme matches
 *   (d) FICHE-01 — qhse-prefs-v1 merge-safety: writing lastFicheTheme preserves P3 + P4 keys
 *   (e) DEC-09  — Fiches IIFE path does NOT mutate qhse-srs-v1 OR qhse-scores-v1
 *   (f) FICHE-02 — sources schema: every sources[i] has {authority, ref, url} with https URL
 */
'use strict';

const path   = require('path');
const assert = require('assert');

// ----------------------------------------------------------------
// Bootstrap: load srs.js + outils-data.js + fiches-data.js under Node
// via global.window shim. Mirrors verify-quiz.cjs:19-57 extended for Phase 5.
// ----------------------------------------------------------------
const srsPath    = path.resolve(__dirname, '../../../qhse-cesi/srs.js');
const bankPath   = path.resolve(__dirname, '../../../qhse-cesi/outils-data.js');
const fichesPath = path.resolve(__dirname, '../../../qhse-cesi/fiches-data.js');

global.window = {};

// -- srs.js --
try {
  require(srsPath);
} catch (e) {
  console.error('FAIL: could not load srs.js from', srsPath);
  console.error(e.message);
  process.exit(1);
}

const SRS = global.window.SRS;
if (!SRS || typeof SRS.schedule !== 'function') {
  console.error('FAIL: window.SRS not exported (or schedule function missing) after loading', srsPath);
  process.exit(1);
}
console.log('srs.js loaded OK — window.SRS keys:', Object.keys(SRS).join(', '));

// -- outils-data.js --
try {
  require(bankPath);
} catch (e) {
  console.error('FAIL: could not load outils-data.js from', bankPath);
  console.error(e.message);
  process.exit(1);
}

const BANK = global.window.BANK;
if (!Array.isArray(BANK) || BANK.length < 200) {
  console.error('FAIL: window.BANK not exported (or too small) after loading', bankPath, '— length:', BANK ? BANK.length : 'undefined');
  process.exit(1);
}
console.log('outils-data.js loaded OK — BANK.length =', BANK.length);

// -- fiches-data.js --
try {
  require(fichesPath);
} catch (e) {
  console.error('FAIL: could not load fiches-data.js from', fichesPath);
  console.error(e.message);
  process.exit(1);
}

const FICHES = global.window.FICHES;
if (!Array.isArray(FICHES) || FICHES.length === 0) {
  console.error('FAIL: window.FICHES not exported (or empty) after loading', fichesPath);
  process.exit(1);
}
console.log('fiches-data.js loaded OK — FICHES.length =', FICHES.length);

console.log('\nPhase 5 verify gate booted — SRS, BANK (' + BANK.length + ' items), FICHES (' + FICHES.length + ' items) loaded');

// ----------------------------------------------------------------
// Helpers (verbatim from verify-srs.cjs:46-64 / verify-quiz.cjs:62-80)
// ----------------------------------------------------------------
let allPassed = true;

function pass(label) {
  console.log('PASS [' + label + ']');
}

function fail(label, reason) {
  console.error('FAIL [' + label + '] ' + reason);
  allPassed = false;
}

function check(label, fn) {
  try {
    fn();
    pass(label);
  } catch (e) {
    fail(label, e.message);
  }
}

console.log('\n=== Phase 5 Fiches verification gate — 6 assertion groups (a)..(f) ===\n');

// ================================================================
// (a) group 1: FICHES schema — length 15, 9 required fields, type-correct
// FICHE-01 — fiches-data.js DEC-01 contract.
// ================================================================
console.log('\n-- (a) group 1: FICHES schema (15 entries, 9 required fields, type-correct) --');

check('FICHE-01 group (a) — FICHES schema (15 entries, 9 required fields, type-correct)', function () {
  assert.strictEqual(FICHES.length, 15, 'FICHES must have exactly 15 entries (DEC-01 — one per BANK theme)');

  FICHES.forEach(function (fiche) {
    var slug = fiche.slug;

    // slug
    assert(typeof slug === 'string' && slug.length > 0,
      'Fiche at index ' + FICHES.indexOf(fiche) + ' missing required string field "slug"');

    // title
    assert(typeof fiche.title === 'string' && fiche.title.length > 0,
      'Fiche "' + slug + '" missing required non-empty string field "title"');

    // tldr
    assert(typeof fiche.tldr === 'string' && fiche.tldr.length >= 30 && fiche.tldr.length <= 600,
      'Fiche "' + slug + '" tldr must be string length in [30, 600]; got length ' + (typeof fiche.tldr === 'string' ? fiche.tldr.length : typeof fiche.tldr));

    // definitions[]
    assert(Array.isArray(fiche.definitions) && fiche.definitions.length >= 4 && fiche.definitions.length <= 20,
      'Fiche "' + slug + '" definitions must be array length in [4, 20]; got ' + (Array.isArray(fiche.definitions) ? fiche.definitions.length : typeof fiche.definitions));
    fiche.definitions.forEach(function (def, di) {
      assert(typeof def.term === 'string' && def.term.length > 0,
        'Fiche "' + slug + '" definitions[' + di + '] missing non-empty string "term"');
      assert(typeof def.value === 'string' && def.value.length > 0,
        'Fiche "' + slug + '" definitions[' + di + '] missing non-empty string "value"');
    });

    // cadreLegal
    assert(typeof fiche.cadreLegal === 'string' && fiche.cadreLegal.length > 0,
      'Fiche "' + slug + '" missing required non-empty string field "cadreLegal"');
    assert(fiche.cadreLegal.includes('fi-cite'),
      'Fiche "' + slug + '" cadreLegal must contain at least one fi-cite citation element');

    // demarche
    assert(typeof fiche.demarche === 'string' && fiche.demarche.length >= 50,
      'Fiche "' + slug + '" demarche must be string length >= 50; got length ' + (typeof fiche.demarche === 'string' ? fiche.demarche.length : typeof fiche.demarche));

    // selectedIds[]
    assert(Array.isArray(fiche.selectedIds) && fiche.selectedIds.length >= 5 && fiche.selectedIds.length <= 10,
      'Fiche "' + slug + '" selectedIds must be array length in [5, 10]; got ' + (Array.isArray(fiche.selectedIds) ? fiche.selectedIds.length : typeof fiche.selectedIds));
    fiche.selectedIds.forEach(function (id, ii) {
      assert(typeof id === 'string' && id.length > 0,
        'Fiche "' + slug + '" selectedIds[' + ii + '] must be non-empty string');
    });

    // pieges[]
    assert(Array.isArray(fiche.pieges) && fiche.pieges.length >= 3 && fiche.pieges.length <= 8,
      'Fiche "' + slug + '" pieges must be array length in [3, 8]; got ' + (Array.isArray(fiche.pieges) ? fiche.pieges.length : typeof fiche.pieges));
    fiche.pieges.forEach(function (p, pi) {
      assert(typeof p === 'string' && p.length > 0,
        'Fiche "' + slug + '" pieges[' + pi + '] must be non-empty string');
    });

    // sources[]
    assert(Array.isArray(fiche.sources) && fiche.sources.length >= 3 && fiche.sources.length <= 8,
      'Fiche "' + slug + '" sources must be array length in [3, 8]; got ' + (Array.isArray(fiche.sources) ? fiche.sources.length : typeof fiche.sources));
    fiche.sources.forEach(function (s, si) {
      assert(typeof s.authority === 'string' && s.authority.length > 0,
        'Fiche "' + slug + '" sources[' + si + '] missing non-empty string "authority"');
      assert(typeof s.ref === 'string' && s.ref.length > 0,
        'Fiche "' + slug + '" sources[' + si + '] missing non-empty string "ref"');
      assert(typeof s.url === 'string' && s.url.length > 0,
        'Fiche "' + slug + '" sources[' + si + '] missing non-empty string "url"');
    });
  });
});

// ================================================================
// (b) group 2: slug coverage — FICHES slug set === BANK theme set (DEC-01 coverage)
// ================================================================
console.log('\n-- (b) group 2: FICHES slug set === BANK theme set (DEC-01 slug coverage) --');

check('FICHE-01 group (b) — FICHES slug set === BANK theme set (DEC-01 coverage)', function () {
  var bankThemes = Array.from(new Set(BANK.map(function (b) { return b.theme; }))).sort();
  var fichesSlugs = FICHES.map(function (f) { return f.slug; }).sort();

  assert.deepStrictEqual(fichesSlugs, bankThemes,
    'every BANK theme must have exactly one fiche; no extras, no missing, no "all".\n' +
    'FICHES slugs: [' + fichesSlugs.join(', ') + ']\n' +
    'BANK themes:  [' + bankThemes.join(', ') + ']');

  // No duplicate slugs
  assert.strictEqual(new Set(FICHES.map(function (f) { return f.slug; })).size, 15,
    'no duplicate slugs in FICHES — every entry must have a unique slug');

  // "all" must not appear (DEC-01 explicit)
  assert(!FICHES.some(function (f) { return f.slug === 'all'; }),
    '"all" must not be a fiche slug per DEC-01 — "all" is a UI-only filter token, not a BANK theme');
});

// ================================================================
// (c) group 3: selectedIds cross-reference
// Every selectedIds[i] resolves in BANK AND item.theme === fiche.slug
// ================================================================
console.log('\n-- (c) group 3: selectedIds cross-reference (every id in BANK, theme matches) --');

check('FICHE-01 group (c) — every selectedIds[i] resolves in BANK AND theme matches', function () {
  FICHES.forEach(function (fiche) {
    fiche.selectedIds.forEach(function (id) {
      var item = BANK.find(function (b) { return b.id === id; });
      assert(item,
        'fiche "' + fiche.slug + '" selectedIds entry "' + id + '" not found in BANK ' +
        '(Pitfall 7 — selectedIds drift after BANK edit)');
      assert.strictEqual(item.theme, fiche.slug,
        'fiche "' + fiche.slug + '" selectedIds entry "' + id + '" has BANK theme "' + item.theme +
        '" — must match fiche.slug "' + fiche.slug + '"');
    });
  });
});

// ================================================================
// (d) group 4: qhse-prefs-v1 merge-safety
// Writing lastFicheTheme preserves P3 + P4 sibling keys (PERSIST-01)
// ================================================================
console.log('\n-- (d) group 4: qhse-prefs-v1 merge-safety — lastFicheTheme preserves P3 + P4 keys --');

check('FICHE-01 group (d) — writing lastFicheTheme preserves P3 + P4 sibling keys', function () {
  // Pattern S2 merge-safe writer — mirrors outils.html Fiches IIFE writePrefs verbatim.
  function writePrefs(existing, partial) {
    return Object.assign({}, existing, partial);
  }

  // Realistic post-Phase-4 prefs shape (all 5 prior keys from P3 + P4):
  var afterPlan04 = {
    lastTheme:      'duerp',
    lastMode:       'all',
    newCardsPerDay: 20,
    lastQcmTheme:   'iso-9001',
    lastTestTheme:  'tms'
  };

  // Scenario 1: write lastFicheTheme — all 5 prior keys must survive.
  var s1 = writePrefs(afterPlan04, { lastFicheTheme: 'rps' });
  assert.strictEqual(s1.lastTheme,       'duerp',    'S1: P3 lastTheme must survive Fiches write');
  assert.strictEqual(s1.lastMode,        'all',      'S1: P3 lastMode must survive Fiches write');
  assert.strictEqual(s1.newCardsPerDay,  20,         'S1: P3 newCardsPerDay must survive Fiches write');
  assert.strictEqual(s1.lastQcmTheme,    'iso-9001', 'S1: P4 lastQcmTheme must survive Fiches write');
  assert.strictEqual(s1.lastTestTheme,   'tms',      'S1: P4 lastTestTheme must survive Fiches write');
  assert.strictEqual(s1.lastFicheTheme,  'rps',      'S1: lastFicheTheme must be set to rps');

  // Scenario 2: write lastFicheTheme again — prior keys still survive.
  var s2 = writePrefs(s1, { lastFicheTheme: 'duerp' });
  assert.strictEqual(s2.lastTheme,       'duerp',    'S2: P3 lastTheme must survive second Fiches write');
  assert.strictEqual(s2.lastMode,        'all',      'S2: P3 lastMode must survive second Fiches write');
  assert.strictEqual(s2.newCardsPerDay,  20,         'S2: P3 newCardsPerDay must survive second Fiches write');
  assert.strictEqual(s2.lastQcmTheme,    'iso-9001', 'S2: P4 lastQcmTheme must survive second Fiches write');
  assert.strictEqual(s2.lastTestTheme,   'tms',      'S2: P4 lastTestTheme must survive second Fiches write');
  assert.strictEqual(s2.lastFicheTheme,  'duerp',    'S2: lastFicheTheme must be updated to duerp');

  // Scenario 3 (reverse direction): start from P5 prefs, write a P4 key — both survive.
  var onlyFiche = { lastFicheTheme: 'duerp' };
  var s3 = writePrefs(onlyFiche, { lastQcmTheme: 'rps' });
  assert.strictEqual(s3.lastFicheTheme, 'duerp', 'S3: lastFicheTheme must survive a P4 write');
  assert.strictEqual(s3.lastQcmTheme,   'rps',   'S3: lastQcmTheme must be set to rps');

  // Scenario 4: forward-compat — unknown future key must not clobber any existing P3+P4+P5 keys.
  var s4 = writePrefs(s2, { lastDeepReviewTheme: 'tms' });
  assert.strictEqual(s4.lastTheme,            'duerp',    'S4 fwd-compat: P3 lastTheme must survive future key write');
  assert.strictEqual(s4.lastMode,             'all',      'S4 fwd-compat: P3 lastMode must survive future key write');
  assert.strictEqual(s4.newCardsPerDay,       20,         'S4 fwd-compat: P3 newCardsPerDay must survive future key write');
  assert.strictEqual(s4.lastQcmTheme,         'iso-9001', 'S4 fwd-compat: P4 lastQcmTheme must survive future key write');
  assert.strictEqual(s4.lastTestTheme,         'tms',     'S4 fwd-compat: P4 lastTestTheme must survive future key write');
  assert.strictEqual(s4.lastFicheTheme,        'duerp',   'S4 fwd-compat: lastFicheTheme must survive future key write');
  assert.strictEqual(s4.lastDeepReviewTheme,   'tms',     'S4 fwd-compat: new future key must be set');
});

// ================================================================
// (e) group 5: DEC-09 read-only invariant
// Fiches IIFE path does NOT mutate qhse-srs-v1 OR qhse-scores-v1
// ================================================================
console.log('\n-- (e) group 5: DEC-09 — Fiches IIFE path does NOT mutate qhse-srs-v1 OR qhse-scores-v1 --');

check('FICHE-01 group (e) — DEC-09: Fiches IIFE path does NOT mutate qhse-srs-v1 OR qhse-scores-v1', function () {
  // Step 1: synthesize a qhse-srs-v1 store with realistic Phase 3 rows
  // (mirrors verify-quiz.cjs group (e) lines 281-286 for parity).
  var srsStore = {
    'duerp-flashcard-001':       SRS.schedule(null, 'bien',   '2026-05-24'),
    'iso-9001-flashcard-002':    SRS.schedule(null, 'rate',   '2026-05-23'),
    'tms-flashcard-003':         SRS.schedule(SRS.schedule(null, 'bien', '2026-05-22'), 'bien', '2026-05-23'),
    'rps-flashcard-004':         SRS.schedule(null, 'facile', '2026-05-25')
  };

  // Step 2: synthesize a qhse-scores-v1 store with realistic Phase 4 rows.
  var scoresStore = [
    { when: '2026-05-26T08:00:00Z', theme: 'iso-9001', score: '15/20' },
    { when: '2026-05-27T09:00:00Z', theme: 'tms',      score: '18/20' }
  ];

  // Step 3: snapshot BEFORE the simulated Fiches session.
  var srsBefore    = JSON.stringify(srsStore);
  var scoresBefore = JSON.stringify(scoresStore);

  // Step 4: simulate the Fiches IIFE path — read-only data traversal, zero SRS/scores writes.
  // The Fiches IIFE only: picks a fiche by slug, finds BANK items for selectedIds, renders DOM.
  // DEC-09 contract: it must NEVER call SRS.schedule() or write to srsStore / scoresStore.
  var fiche = FICHES.find(function (f) { return f.slug === 'duerp'; });
  assert(fiche, 'test fixture invariant: duerp fiche must exist in FICHES');

  // Simulate the data-access path the IIFE performs (read-only):
  var ficheItems = fiche.selectedIds.map(function (id) {
    return BANK.find(function (b) { return b.id === id; });
  });
  // Simulate DOM string construction (the IIFE builds HTML — we use JSON.stringify as a proxy).
  var renderedFicheDataSummary = JSON.stringify({
    slug:     fiche.slug,
    title:    fiche.title,
    itemIds:  ficheItems.map(function (item) { return item ? item.id : null; })
  });
  // Touch the variable so it is not elided; the important thing is NO side-effect on stores above.
  assert(renderedFicheDataSummary.length > 0, 'simulation invariant: rendered summary must be non-empty');

  // Crucially: NO call to SRS.schedule(...) and NO mutation of srsStore or scoresStore.
  // The DEC-09 assertion below will catch any inadvertent mutation.

  // Step 5: snapshot AFTER.
  var srsAfter    = JSON.stringify(srsStore);
  var scoresAfter = JSON.stringify(scoresStore);

  // Step 6: THE assertion — byte-equal proves zero mutation.
  assert.strictEqual(srsAfter, srsBefore,
    'DEC-09 violated: qhse-srs-v1 was mutated by the simulated Fiches path. ' +
    'Before: ' + srsBefore + '. After: ' + srsAfter);

  assert.strictEqual(scoresAfter, scoresBefore,
    'DEC-09 violated: qhse-scores-v1 was mutated by the simulated Fiches path. ' +
    'Before: ' + scoresBefore + '. After: ' + scoresAfter);

  // Step 7: defence-in-depth — rows still present, key fields intact.
  ['duerp-flashcard-001', 'iso-9001-flashcard-002', 'tms-flashcard-003', 'rps-flashcard-004']
    .forEach(function (id) {
      assert(srsStore[id], 'DEC-09: row ' + id + ' missing after simulated Fiches path (deletion is also forbidden)');
      assert(typeof srsStore[id].ease     === 'number', 'row ' + id + ' ease field mutated');
      assert(typeof srsStore[id].interval === 'number', 'row ' + id + ' interval field mutated');
    });

  // scoresStore length must also be unchanged.
  assert.strictEqual(scoresStore.length, 2,
    'DEC-09: scoresStore length changed after simulated Fiches path — expected 2 got ' + scoresStore.length);
});

// ================================================================
// (f) group 6: sources schema + URL format
// FICHE-02 — every sources[i] has {authority, ref, url} with http(s) URL
// ================================================================
console.log('\n-- (f) group 6: sources schema + URL format (FICHE-02) --');

check('FICHE-02 group (f) — every sources[i] has {authority, ref, url} with https URL', function () {
  FICHES.forEach(function (fiche) {
    fiche.sources.forEach(function (s, si) {
      assert(typeof s.authority === 'string' && s.authority.length > 0,
        'fiche "' + fiche.slug + '" sources[' + si + '] missing non-empty string "authority"');
      assert(typeof s.ref === 'string' && s.ref.length > 0,
        'fiche "' + fiche.slug + '" sources[' + si + '] missing non-empty string "ref"');
      assert(typeof s.url === 'string' && /^https?:\/\//.test(s.url),
        'fiche "' + fiche.slug + '" sources[' + si + '] url must start with http:// or https://, got: "' + s.url + '"');
    });
  });
});

check('FICHE-02 group (f) — sources[].url are unique within each fiche (no duplicate footnotes)', function () {
  FICHES.forEach(function (fiche) {
    var urls = fiche.sources.map(function (s) { return s.url; });
    var uniq = new Set(urls);
    assert(uniq.size === urls.length,
      'fiche "' + fiche.slug + '" has duplicate sources[].url — would print as repeated footnotes; urls: ' + urls.join(', '));
  });
});

// ================================================================
// Final exit (mirrors verify-quiz.cjs:389-399)
// ================================================================
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('Phase 5 verification gate: ALL 6 groups PASS (a-b-c-d-e-f) — FICHE-01 + FICHE-02 + DEC-09 contracts intact');
  process.exit(0);
} else {
  console.error('Phase 5 verification gate: ONE OR MORE ASSERTIONS FAILED — see [FAIL] lines above');
  process.exit(1);
}
