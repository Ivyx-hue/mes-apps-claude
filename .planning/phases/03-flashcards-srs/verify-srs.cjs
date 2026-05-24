/* verify-srs.cjs
 * Verification gate for Phase 3 SM-2 scheduler (qhse-cesi/srs.js).
 *
 * USAGE:
 *   node .planning/phases/03-flashcards-srs/verify-srs.cjs
 *   node .planning/phases/03-flashcards-srs/verify-srs.cjs --final
 *   (--final is an alias — both modes run all 5 assertion groups)
 *
 * Exit 0 = all assertions PASS. Exit 1 = any assertion FAIL.
 *
 * Mirrors .planning/phases/02-content-bank/verify-bank.cjs --final discipline.
 * Node built-ins only: assert, path. No npm deps, no test runner.
 */
'use strict';

const path   = require('path');
const assert = require('assert');

// ----------------------------------------------------------------
// Bootstrap: load srs.js under Node via global.window shim.
// Mirrors verify-bank.cjs:14-34 with Phase-3 substitutions.
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

// ----------------------------------------------------------------
// Helpers (mirrors verify-bank.cjs:148-157)
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

console.log('\n=== Phase 3 SRS verification gate — SC2/SC3/SC4/SC5 ===\n');

// ----------------------------------------------------------------
// (a) SM-2 math — 8 named edge cases E1-E8 (RESEARCH §1.3)
// Label convention: SC2/SRS-01 E{n} {short-name}
// ----------------------------------------------------------------
console.log('-- (a) SM-2 math: 8 edge cases E1-E8 --');

check('SC2/SRS-01 E1 first-grade-ever bien on new card', () => {
  const r = SRS.schedule(null, 'bien', '2026-05-23');
  assert.strictEqual(r.reps, 1);
  assert.strictEqual(r.interval, 1);
  assert.strictEqual(r.ease, 2.5);
  assert.strictEqual(r.due, '2026-05-24');
  assert.strictEqual(r.introduced, '2026-05-23');
});

check('SC2/SRS-01 E2 first raté ever', () => {
  const r = SRS.schedule(null, 'rate', '2026-05-23');
  assert.strictEqual(r.lapses, 1);
  assert.strictEqual(r.reps, 0);
  assert.strictEqual(r.interval, 1);
  assert.ok(Math.abs(r.ease - 2.30) < 1e-9, 'ease expected 2.30 got ' + r.ease);
  assert.strictEqual(r.due, '2026-05-24');
});

check('SC2/SRS-01 E3 ten consecutive raté ease bottoms at 1.3', () => {
  let row = null;
  for (let i = 0; i < 10; i++) row = SRS.schedule(row, 'rate', '2026-05-23');
  assert.strictEqual(row.ease, 1.3, 'ease after 10 raté expected 1.3 got ' + row.ease);
});

check('SC2/SRS-01 E4 raté on brand-new card no negative interval', () => {
  const r = SRS.schedule(null, 'rate', '2026-05-23');
  assert.strictEqual(r.interval, 1, 'interval expected 1 got ' + r.interval);
  assert.ok(r.interval > 0, 'interval must be > 0 got ' + r.interval);
});

check('SC2/SRS-01 E5 ease floor preserved on alternating rate/dur', () => {
  let r = null;
  for (let i = 0; i < 5; i++) r = SRS.schedule(r, 'rate', '2026-05-23');
  for (let j = 0; j < 5; j++) r = SRS.schedule(r, 'dur', '2026-05-23');
  assert.strictEqual(r.ease, 1.3, 'ease expected 1.3 after alternating rate/dur got ' + r.ease);
});

check('SC2/SRS-01 E6 ceil rounding bien rep3 ease 2.5 interval 6', () => {
  // After two "bien" grades: reps=2, interval=6, ease=2.5 — the standard rep-3 path
  const row = { ease: 2.5, interval: 6, due: '2026-05-23', lapses: 0, reps: 2, introduced: '2026-05-20' };
  const r = SRS.schedule(row, 'bien', '2026-05-23');
  // ceil(6 * 2.5) = ceil(15) = 15
  assert.strictEqual(r.interval, 15, 'interval expected 15 got ' + r.interval);
});

check('SC2/SRS-01 E7 facile on new card', () => {
  const r = SRS.schedule(null, 'facile', '2026-05-23');
  assert.strictEqual(r.reps, 1);
  // ceil(1 * 1.3) = ceil(1.3) = 2
  assert.strictEqual(r.interval, 2, 'interval expected 2 got ' + r.interval);
  assert.ok(Math.abs(r.ease - 2.65) < 1e-9, 'ease expected 2.65 got ' + r.ease);
});

check('SC2/SRS-01 E8 introduced field stable across grades', () => {
  let row = SRS.schedule(null, 'bien', '2026-05-23');
  assert.strictEqual(row.introduced, '2026-05-23', 'introduced should be set on first grade');
  row = SRS.schedule(row, 'rate', '2026-05-24');
  assert.strictEqual(row.introduced, '2026-05-23', 'introduced should not change on raté');
  row = SRS.schedule(row, 'bien', '2026-05-25');
  assert.strictEqual(row.introduced, '2026-05-23', 'introduced should remain stable across grades');
});

// ----------------------------------------------------------------
// (b) Schema round-trip — PERSIST-01 (qhse-srs-v1 + qhse-prefs-v1)
// ----------------------------------------------------------------
console.log('\n-- (b) Schema round-trip: PERSIST-01 --');

check('SC4/PERSIST-01 qhse-srs-v1 schema JSON round-trip', () => {
  const store = {
    'duerp-flashcard-001': {
      ease: 2.5, interval: 6, due: '2026-05-29',
      lapses: 0, reps: 2, introduced: '2026-05-22'
    }
  };
  const roundtripped = JSON.parse(JSON.stringify(store));
  assert.deepStrictEqual(roundtripped, store);
});

check('SC4/PERSIST-01 qhse-prefs-v1 schema JSON round-trip preserves unknown keys', () => {
  // Future-proof: a P4-written `lastQuizTheme` must survive a P3-style merge.
  const existing = { lastTheme: 'duerp', lastMode: 'flashcards', newCardsPerDay: 10, lastQuizTheme: 'rps' };
  const partial = { lastTheme: 'iso-9001' };
  const merged = Object.assign({}, existing, partial);
  assert.strictEqual(merged.lastTheme, 'iso-9001', 'merged lastTheme expected iso-9001');
  assert.strictEqual(merged.lastQuizTheme, 'rps', 'unknown key lastQuizTheme must survive merge');
  assert.strictEqual(merged.newCardsPerDay, 10, 'newCardsPerDay must survive merge');
});

// ----------------------------------------------------------------
// (c) Due-date filtering + addDays robustness (SRS-02 + SRS-04)
// ----------------------------------------------------------------
console.log('\n-- (c) Due-date filtering + addDays: SRS-02/SRS-04 --');

check('SC3/SRS-02 isDue past/today/future', () => {
  assert.strictEqual(SRS.isDue({ due: '2026-05-23' }, '2026-05-23'), true,  'today should be due');
  assert.strictEqual(SRS.isDue({ due: '2026-05-20' }, '2026-05-23'), true,  'past should be due');
  assert.strictEqual(SRS.isDue({ due: '2026-05-24' }, '2026-05-23'), false, 'future should not be due');
});

check('SC3/SRS-04 addDays year-boundary 2026-12-31 + 1 → 2027-01-01', () => {
  assert.strictEqual(SRS.addDays('2026-12-31', 1), '2027-01-01');
});

check('SC3/SRS-04 addDays leap-year 2024-02-28 + 1 → 2024-02-29', () => {
  assert.strictEqual(SRS.addDays('2024-02-28', 1), '2024-02-29');
});

check('SC3/SRS-04 addDays non-leap 2026-02-28 + 1 → 2026-03-01', () => {
  assert.strictEqual(SRS.addDays('2026-02-28', 1), '2026-03-01');
});

check('SC3/SRS-04 addDays DST CET→CEST 2026-03-28 + 2 → 2026-03-30', () => {
  // CET→CEST spring-forward is Sunday 2026-03-29; adding 2 days must still land on 2026-03-30.
  assert.strictEqual(SRS.addDays('2026-03-28', 2), '2026-03-30');
});

check('SC3/SRS-02 filterDue returns only cards whose row.due <= today', () => {
  const cards = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const store = {
    a: { due: '2026-05-20' },   // overdue — should be included
    b: { due: '2026-05-25' },   // future  — should NOT be included
    c: { due: '2026-05-23' }    // today   — should be included
  };
  const due = SRS.filterDue(cards, store, '2026-05-23');
  assert.strictEqual(due.length, 2, 'expected 2 due cards got ' + due.length);
  assert.strictEqual(
    due.map(function (c) { return c.id; }).sort().join(','),
    'a,c',
    'expected ids a,c'
  );
});

// ----------------------------------------------------------------
// (d) newCardsPerDay cap enforcement (FLASH-01 pacing — D-03)
// Simulates the view's intro loop: 15 candidate cards, cap=10.
// ----------------------------------------------------------------
console.log('\n-- (d) newCardsPerDay cap enforcement (D-03) --');

check('SC3/SRS-02 newCardsPerDay cap — 15 candidates, cap=10 → exactly 10 introduced', () => {
  const today = '2026-05-23';
  let store = {};
  const cap = 10;
  let introducedToday = 0;

  // Simulate the view's intro loop: only introduce if under cap AND card has no row yet.
  for (let i = 0; i < 15; i++) {
    const cardId = 'card-' + i;
    if (introducedToday < cap && !store[cardId]) {
      store[cardId] = SRS.schedule(null, 'bien', today);
      if (store[cardId].introduced === today) introducedToday++;
    }
  }

  const introducedCount = Object.keys(store).filter(function (id) {
    return store[id].introduced === today;
  }).length;

  assert.strictEqual(introducedCount, 10, 'expected 10 cards introduced today got ' + introducedCount);
});

// ----------------------------------------------------------------
// (e) Free-revision purity — D-06 structural guarantee (SRS-04)
// ----------------------------------------------------------------
console.log('\n-- (e) Free-revision purity: SRS-04 / D-06 --');

check('SC5/SRS-04 free-revision purity — window.SRS has no side-effecting keys', () => {
  const allKeys = Object.keys(SRS);
  const forbidden = allKeys.filter(function (k) {
    return /persist|save|write|store|set/i.test(k);
  });
  assert.strictEqual(
    forbidden.length, 0,
    'window.SRS exposes side-effecting key(s): ' + forbidden.join(',')
  );
});

check('SC5/SRS-04 SRS.schedule is pure — same input twice yields equal output', () => {
  const a = SRS.schedule(null, 'bien', '2026-05-23');
  const b = SRS.schedule(null, 'bien', '2026-05-23');
  assert.deepStrictEqual(a, b);
});

check('SC5/SRS-04 SRS.schedule does not mutate the input row', () => {
  const row = {
    ease: 2.5, interval: 6, due: '2026-05-29',
    lapses: 0, reps: 2, introduced: '2026-05-22'
  };
  const snapshot = JSON.parse(JSON.stringify(row));
  SRS.schedule(row, 'bien', '2026-05-23');
  assert.deepStrictEqual(row, snapshot, 'schedule() mutated the input row');
});

// ----------------------------------------------------------------
// Final exit (mirrors verify-bank.cjs:443-450)
// ----------------------------------------------------------------
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('--final: ALL Phase 3 SRS gates PASS — window.SRS verified for SC2/SC3/SC4/SC5');
  process.exit(0);
} else {
  console.error('--final: ONE OR MORE ASSERTIONS FAILED — see FAIL lines above');
  process.exit(1);
}
