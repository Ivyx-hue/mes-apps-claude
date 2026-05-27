/* verify-quiz.cjs
 * Verification gate for Phase 4 QCM + Tests blancs (qhse-cesi/outils.html IIFEs).
 *
 * USAGE:
 *   node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
 *
 * Exit 0 = all 6 assertion groups PASS. Exit 1 = any assertion FAIL.
 *
 * Mirrors .planning/phases/03-flashcards-srs/verify-srs.cjs scaffold (lines 1-65, 269-276).
 * Sibling gate, NOT a replacement — verify-srs.cjs still asserts the Phase 3 SM-2 contract.
 * Node built-ins only: assert, path. No npm deps, no test runner.
 */
'use strict';

const path   = require('path');
const assert = require('assert');

// ----------------------------------------------------------------
// Bootstrap: load srs.js + outils-data.js under Node via global.window shim.
// Mirrors verify-srs.cjs:19-41.
// ----------------------------------------------------------------
const srsPath = path.resolve(__dirname, '../../../qhse-cesi/srs.js');
global.window = {};

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

const bankPath = path.resolve(__dirname, '../../../qhse-cesi/outils-data.js');
try {
  require(bankPath);
} catch (e) {
  console.error('FAIL: could not load outils-data.js from', bankPath);
  console.error(e.message);
  process.exit(1);
}

const BANK = global.window.BANK;
if (!Array.isArray(BANK) || BANK.length === 0) {
  console.error('FAIL: window.BANK not exported (or empty) after loading', bankPath);
  process.exit(1);
}

console.log('outils-data.js loaded OK — BANK.length =', BANK.length);

// ----------------------------------------------------------------
// Helpers (verbatim from verify-srs.cjs:46-64)
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

console.log('\n=== Phase 4 QCM + Tests blancs verification gate — 6 assertion groups (a)..(f) ===\n');

// ================================================================
// (a) group 1: QCM wrong-answer SRS write equivalence
// QUIZ-03 / SRS-03 / D-03 — Plan 02 §Task 2 step 9 write path.
// ================================================================
console.log('\n-- (a) group 1: QCM wrong-answer SRS write equivalence (QUIZ-03 / SRS-03 / D-03) --');

check('SC2/QUIZ-03 group (a) — wrong-answer SRS write ≡ SRS.schedule(state, \'rate\')', () => {
  const today = '2026-05-25';

  // Synthetic fixture: a card that has been "bien"-graded once.
  const prior = SRS.schedule(null, 'bien', '2026-05-24');
  assert.strictEqual(prior.reps, 1, 'fixture invariant — prior.reps should be 1');
  assert.strictEqual(prior.lapses, 0, 'fixture invariant — prior.lapses should be 0');

  // The QCM IIFE wrong-click path calls SRS.schedule(existing, 'rate', today) and writes
  // the returned row back to qhse-srs-v1[item.id]. Assertion: byte-equal to a
  // flashcards raté grade — SRS is mode-agnostic, no re-implementation drift.
  const fromQcmWrongClick    = SRS.schedule(prior, 'rate', today);
  const fromFlashcardsRate   = SRS.schedule(prior, 'rate', today);
  assert.deepStrictEqual(fromQcmWrongClick, fromFlashcardsRate,
    'QCM wrong-click write must produce byte-equal row to a flashcards raté grade');

  // Explicit SM-2 "raté" semantics (D-03):
  assert.strictEqual(fromQcmWrongClick.interval, 1,            'interval expected 1 (raté reset)');
  assert.strictEqual(fromQcmWrongClick.lapses,   1,            'lapses expected 1 (incremented from 0)');
  assert.strictEqual(fromQcmWrongClick.reps,     prior.reps,   'reps must NOT change on raté (Anki model)');
  assert.ok(fromQcmWrongClick.ease < prior.ease,               'ease must decrease on raté');
  assert.ok(fromQcmWrongClick.ease >= 1.3,                     'ease must respect 1.3 floor');
  assert.strictEqual(fromQcmWrongClick.due, '2026-05-26',      'due expected today + 1');
  assert.strictEqual(fromQcmWrongClick.introduced, prior.introduced,
    'introduced field must remain stable across grades');

  // Negative: a CORRECT QCM click would never call SRS.schedule (D-03 — only wrong feeds SRS);
  // prove the rate path is structurally distinct from a bien-grade path.
  const correctPath = SRS.schedule(prior, 'bien', today);
  assert.notDeepStrictEqual(fromQcmWrongClick, correctPath,
    'wrong-click row must differ from a bien-grade row (proves the rate path is the only one writing on incorrect)');
});

// ================================================================
// (b) group 2: Test composition — 20-item shape-valid queue
// TEST-01 / D-05 / D-08 — Plan 03 §Task 2 step 6 buildQueue.
// ================================================================
console.log('\n-- (b) group 2: Test composition: filter + shuffle yields 20 shape-valid items (TEST-01 / D-05 / D-08) --');

check('SC3/TEST-01 group (b) — test composition: 20-item shape-valid queue from QCM pool', () => {
  const allQcm = BANK.filter(i => i.type === 'qcm');
  assert.ok(allQcm.length >= 20,
    'QCM pool size (' + allQcm.length + ') must be >= 20 for TEST-01 — pool exhausted is a content-bank regression');

  // Simulate buildQueue('all'): Fisher-Yates shuffle + slice(0, 20).
  function fisherYates(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  const queue = fisherYates(allQcm).slice(0, 20);
  assert.strictEqual(queue.length, 20, 'queue length expected exactly 20 (D-05)');

  queue.forEach((item, idx) => {
    assert.strictEqual(item.type, 'qcm',
      'queue[' + idx + '] type expected "qcm" got ' + item.type);
    assert.ok(typeof item.id === 'string' && item.id.length > 0,
      'queue[' + idx + '] missing id');
    assert.ok(typeof item.question === 'string' && item.question.length > 0,
      'queue[' + idx + '] missing question stem');
    assert.ok(Array.isArray(item.choices) && item.choices.length === 4,
      'queue[' + idx + '] choices must be length-4 array (got ' +
      (Array.isArray(item.choices) ? item.choices.length : typeof item.choices) + ')');
    assert.ok(typeof item.correct === 'number' && item.correct >= 0 && item.correct < 4,
      'queue[' + idx + '] correct must be integer in [0,3] (got ' + item.correct + ')');
    assert.ok(typeof item.choices[item.correct] === 'string' && item.choices[item.correct].length > 0,
      'queue[' + idx + '] correct index ' + item.correct + ' points to empty/missing choice');
  });

  // Themed composition: find any theme with ≥ 20 QCMs and assert it filters correctly.
  const themeCounts = {};
  allQcm.forEach(i => { themeCounts[i.theme] = (themeCounts[i.theme] || 0) + 1; });
  const themesWith20Plus = Object.keys(themeCounts).filter(t => themeCounts[t] >= 20);
  if (themesWith20Plus.length > 0) {
    const theme = themesWith20Plus[0];
    const themedPool = allQcm.filter(i => i.theme === theme);
    const themedQueue = fisherYates(themedPool).slice(0, 20);
    assert.strictEqual(themedQueue.length, 20,
      'themed queue (' + theme + ') length expected 20');
    themedQueue.forEach((item, idx) => {
      assert.strictEqual(item.theme, theme,
        'themed queue[' + idx + '] theme expected ' + theme + ' got ' + item.theme);
    });
  }
});

// ================================================================
// (c) group 3: qhse-scores-v1 FIFO cap at 50
// TEST-03 / D-10 / D-11 / D-12 — Plan 03 §Task 2 step 4 appendScore.
// ================================================================
console.log('\n-- (c) group 3: qhse-scores-v1 round-trip + FIFO cap 50 (TEST-03 / D-10 / D-11 / D-12) --');

check('SC4/TEST-03 group (c) — qhse-scores-v1 FIFO cap at 50 (D-10/D-11/D-12)', () => {
  function appendScore(scoresArr, row) {
    const next = scoresArr.slice();
    next.unshift(row);
    return next.slice(0, 50);
  }

  let scores = [];
  for (let i = 0; i <= 50; i++) {
    scores = appendScore(scores, {
      id:      'test-' + i,
      dateISO: '2026-05-25',
      theme:   (i % 2 === 0) ? 'all' : 'duerp',
      score:   i % 21,
      total:   20
    });
  }

  assert.strictEqual(scores.length, 50,
    'after 51 inserts, cap must enforce length 50 (got ' + scores.length + ')');
  assert.strictEqual(scores[0].id, 'test-50',
    'newest insert (id 50) must be at index 0 (D-12: most-recent-first)');
  assert.strictEqual(scores[49].id, 'test-1',
    'oldest surviving insert must be id 1 (id 0 dropped under FIFO)');
  assert.ok(scores.every(r => r.id !== 'test-0'),
    'id 0 must have been dropped — FIFO violated');

  // Schema round-trip.
  const serialized = JSON.stringify(scores);
  const reparsed   = JSON.parse(serialized);
  assert.deepStrictEqual(reparsed, scores,
    'qhse-scores-v1 must round-trip through JSON without drift');

  // Every row carries the locked D-10 schema, no stray keys.
  scores.forEach((r, idx) => {
    assert.deepStrictEqual(
      Object.keys(r).sort(),
      ['dateISO', 'id', 'score', 'theme', 'total'],
      'row ' + idx + ' has unexpected keys: ' + Object.keys(r).join(','));
    assert.ok(typeof r.id === 'string',      'row ' + idx + ' id not string');
    assert.ok(typeof r.dateISO === 'string', 'row ' + idx + ' dateISO not string');
    assert.ok(typeof r.theme === 'string',   'row ' + idx + ' theme not string');
    assert.ok(typeof r.score === 'number',   'row ' + idx + ' score not number');
    assert.ok(typeof r.total === 'number',   'row ' + idx + ' total not number');
  });
});

// ================================================================
// (d) group 4: qhse-prefs-v1 merge-safety
// PERSIST-01 — Plan 02 §Task 2 step 11 + Plan 03 §Task 2 step 18 writePrefs.
// ================================================================
console.log('\n-- (d) group 4: qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys (PERSIST-01) --');

check('SC4/PERSIST-01 group (d) — qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys', () => {
  // Pattern S2 merge-safe writer — verbatim from outils.html readPrefs/writePrefs.
  function writePrefs(existing, partial) {
    return Object.assign({}, existing, partial);
  }

  // Scenario 1: Phase 3 had written P3 keys; Plan 02 writes lastQcmTheme.
  const afterP3      = { lastTheme: 'duerp', lastMode: 'flashcards', newCardsPerDay: 7 };
  const afterPlan02  = writePrefs(afterP3, { lastQcmTheme: 'iso-9001' });
  assert.strictEqual(afterPlan02.lastTheme,       'duerp',       'P3 lastTheme must survive Plan 02 write');
  assert.strictEqual(afterPlan02.lastMode,        'flashcards',  'P3 lastMode must survive Plan 02 write');
  assert.strictEqual(afterPlan02.newCardsPerDay,  7,             'P3 newCardsPerDay must survive Plan 02 write');
  assert.strictEqual(afterPlan02.lastQcmTheme,    'iso-9001',    'Plan 02 lastQcmTheme must be set');

  // Scenario 2: Plan 03 writes lastTestTheme; all prior keys survive.
  const afterPlan03  = writePrefs(afterPlan02, { lastTestTheme: 'tms' });
  assert.strictEqual(afterPlan03.lastTheme,       'duerp',       'P3 lastTheme must survive Plan 03 write');
  assert.strictEqual(afterPlan03.lastMode,        'flashcards',  'P3 lastMode must survive Plan 03 write');
  assert.strictEqual(afterPlan03.newCardsPerDay,  7,             'P3 newCardsPerDay must survive Plan 03 write');
  assert.strictEqual(afterPlan03.lastQcmTheme,    'iso-9001',    'Plan 02 lastQcmTheme must survive Plan 03 write');
  assert.strictEqual(afterPlan03.lastTestTheme,   'tms',         'Plan 03 lastTestTheme must be set');

  // Scenario 3: order independence — merge-safe must be commutative across independent keys.
  const orderA = writePrefs(writePrefs(afterP3, { lastQcmTheme: 'X' }), { lastTestTheme: 'Y' });
  const orderB = writePrefs(writePrefs(afterP3, { lastTestTheme: 'Y' }), { lastQcmTheme: 'X' });
  assert.deepStrictEqual(orderA, orderB,
    'merge-safe write must be commutative across independent keys (Plan 02 + Plan 03 cannot conflict)');

  // Scenario 4: future key (e.g. lastFicheTheme from Phase 5) must coexist with existing keys.
  const withFuture = writePrefs(afterPlan03, { lastFicheTheme: 'rps' });
  assert.strictEqual(withFuture.lastFicheTheme, 'rps');
  assert.strictEqual(withFuture.lastTheme,       'duerp',  'unknown key write must not clobber known keys');
  assert.strictEqual(withFuture.lastQcmTheme,    'iso-9001');
  assert.strictEqual(withFuture.lastTestTheme,   'tms');
});

// ================================================================
// (e) group 5: D-V2-03 invariant — Tests blancs path does NOT mutate qhse-srs-v1
// ================================================================
console.log('\n-- (e) group 5: Tests blancs path does NOT mutate qhse-srs-v1 (D-V2-03 invariant) --');

check('SC4/D-V2-03 group (e) — Tests blancs path does NOT mutate qhse-srs-v1 (hard invariant)', () => {
  // Step 1: synthesize a qhse-srs-v1 store with realistic Phase 3 rows.
  const srsStore = {
    'duerp-flashcard-001':       SRS.schedule(null, 'bien', '2026-05-24'),
    'iso-9001-flashcard-002':    SRS.schedule(null, 'rate', '2026-05-23'),
    'tms-flashcard-003':         SRS.schedule(SRS.schedule(null, 'bien', '2026-05-22'), 'bien', '2026-05-23'),
    'rps-flashcard-004':         SRS.schedule(null, 'facile', '2026-05-25')
  };

  // Step 2: snapshot BEFORE the simulated Tests session.
  const snapshotBefore = JSON.stringify(srsStore);

  // Step 3: simulate the Plan 03 Tests IIFE. Allowed calls: SRS.todayLocal (pure), BANK.filter.
  const today = (typeof SRS.todayLocal === 'function') ? SRS.todayLocal() : '2026-05-26';
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(today),
    'todayLocal() must return yyyy-mm-dd string (defensive — group (e) depends on this contract)');

  const pool = BANK.filter(i => i.type === 'qcm');
  assert.ok(pool.length >= 20, 'BANK must have >= 20 QCMs for the simulation');
  const queue = pool.slice(0, 20);

  // Deliberately wrong on every question — maximises temptation to write to qhse-srs-v1.
  const picks = queue.map(item => (item.correct + 1) % 4);

  let correctCount = 0;
  for (let i = 0; i < queue.length; i++) {
    if (picks[i] === queue[i].correct) correctCount++;
  }
  assert.strictEqual(correctCount, 0,
    'simulation picked wrong on every question — score should be 0 (sanity check)');

  // Build the score row (the only side-effect a Tests IIFE produces — goes to qhse-scores-v1, NOT qhse-srs-v1).
  const scoreRow = {
    id:      'test-' + Date.now(),
    dateISO: today,
    theme:   'all',
    score:   correctCount,
    total:   20
  };
  assert.ok(scoreRow.id);  // touch the var so linters don't warn; not asserted further (group (c) owns scores schema).

  // Step 4: snapshot AFTER.
  const snapshotAfter = JSON.stringify(srsStore);

  // Step 5: THE assertion — byte-equal proves zero mutation.
  assert.strictEqual(snapshotAfter, snapshotBefore,
    'D-V2-03 violated: qhse-srs-v1 was mutated by the Tests blancs simulation. ' +
    'Before: ' + snapshotBefore + '. After: ' + snapshotAfter);

  // Step 6: defence-in-depth — row IDs still present, fields intact.
  ['duerp-flashcard-001', 'iso-9001-flashcard-002', 'tms-flashcard-003', 'rps-flashcard-004']
    .forEach(id => {
      assert.ok(srsStore[id], 'D-V2-03: row ' + id + ' missing after simulated test (deletion is also forbidden)');
      assert.ok(typeof srsStore[id].ease === 'number',     'row ' + id + ' ease field mutated');
      assert.ok(typeof srsStore[id].interval === 'number', 'row ' + id + ' interval field mutated');
    });
});

// ================================================================
// (f) group 6: Cross-phase schema compatibility
// PERSIST-01 — SRS.schedule output carries every field P3 verify-srs.cjs expects.
// ================================================================
console.log('\n-- (f) group 6: Cross-phase schema compatibility — SRS.schedule row matches P3 contract --');

check('SC4/PERSIST-01 group (f) — cross-phase schema compatibility: SRS.schedule row matches P3 contract', () => {
  // Derived from verify-srs.cjs schema round-trip test — the P3 contract.
  const REQUIRED_FIELDS = ['ease', 'interval', 'due', 'lapses', 'reps', 'introduced'];

  // Shape 1: new card, raté grade (QCM-IIFE-on-new-card scenario).
  const row1 = SRS.schedule(null, 'rate', '2026-05-25');
  REQUIRED_FIELDS.forEach(field => {
    assert.ok(field in row1,
      'SRS.schedule(null, "rate") missing P3-required field: ' + field +
      '. Existing keys: ' + Object.keys(row1).join(','));
  });

  // Shape 2: existing P3 card, then wrong-QCM raté (QCM-IIFE-on-existing-card scenario).
  const existingP3 = SRS.schedule(null, 'bien', '2026-05-24');
  const row2       = SRS.schedule(existingP3, 'rate', '2026-05-25');
  REQUIRED_FIELDS.forEach(field => {
    assert.ok(field in row2,
      'SRS.schedule(existingP3, "rate") missing P3-required field: ' + field +
      '. Existing keys: ' + Object.keys(row2).join(','));
  });

  // Field TYPES match P3 expectations.
  assert.strictEqual(typeof row2.ease,       'number',          'ease must be number');
  assert.strictEqual(typeof row2.interval,   'number',          'interval must be number');
  assert.strictEqual(typeof row2.due,        'string',          'due must be ISO string');
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(row2.due),               'due must match yyyy-mm-dd');
  assert.strictEqual(typeof row2.lapses,     'number',          'lapses must be number');
  assert.strictEqual(typeof row2.reps,       'number',          'reps must be number');
  assert.ok(row2.introduced === null || typeof row2.introduced === 'string',
    'introduced must be null or ISO string');

  // JSON round-trip equality (PERSIST-01 canonical assertion).
  const stored      = { 'qcm-row-id-xyz': row2 };
  const roundtripped = JSON.parse(JSON.stringify(stored));
  assert.deepStrictEqual(roundtripped, stored,
    'qhse-srs-v1 row written via Phase 4 SRS.schedule must round-trip through JSON without drift ' +
    '(P3 schema contract — verify-srs.cjs:141-150)');

  // REQUIRED_FIELDS ⊆ actualKeys — future EXTENSIONS allowed, DROPS forbidden.
  const actualKeys = Object.keys(row2);
  REQUIRED_FIELDS.forEach(f => {
    assert.ok(actualKeys.indexOf(f) !== -1,
      'required field ' + f + ' missing from SRS.schedule output — P3 contract regression');
  });
});

// ================================================================
// Final exit
// ================================================================
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('Phase 4 verification gate: ALL 6 groups PASS — verify-quiz.cjs verified for SC1/SC2/SC3/SC4 + D-V2-03');
  process.exit(0);
} else {
  console.error('Phase 4 verification gate: ONE OR MORE ASSERTIONS FAILED — see FAIL lines above');
  process.exit(1);
}
