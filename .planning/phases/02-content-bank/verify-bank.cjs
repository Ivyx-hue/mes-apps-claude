/* verify-bank.cjs
 * Reusable batch verifier for window.BANK (Phase 2 content bank).
 * Usage: node verify-bank.cjs theme1:count1 theme2:count2 ...
 * Example: node verify-bank.cjs duerp:18 principes-generaux:18
 * Exit 0 = all assertions pass. Exit 1 = first failure printed.
 */
'use strict';

const path = require('path');

// Load the bank from the repo root (3 levels up from .planning/phases/02-content-bank/)
const bankPath = path.resolve(__dirname, '../../../qhse-cesi/outils-data.js');
global.window = {};

try {
  require(bankPath);
} catch (e) {
  console.error('FAIL: could not load outils-data.js from', bankPath);
  console.error(e.message);
  process.exit(1);
}

if (!Array.isArray(window.BANK)) {
  console.error('FAIL: window.BANK is not an array after loading', bankPath);
  process.exit(1);
}

const BANK = window.BANK;
console.log('BANK.length =', BANK.length);

// ---- 1. Validate the 15 locked theme slugs ----
const VALID_THEMES = new Set([
  'duerp', 'principes-generaux', 'iso-9001', 'iso-14001', 'iso-45001',
  'tms', 'risque-routier', 'risque-chimique', 'rps', 'espaces-confines',
  'acronymes', 'metiers', 'calendrier', 'icpe-seveso', 'rncp'
]);

for (let i = 0; i < BANK.length; i++) {
  const item = BANK[i];
  const label = 'item[' + i + '] (id=' + item.id + ')';

  // ---- 2. Required non-empty fields ----
  const requiredStrings = ['id', 'type', 'question', 'answer', 'explanation'];
  for (const field of requiredStrings) {
    if (typeof item[field] !== 'string' || item[field].trim() === '') {
      console.error('FAIL: ' + label + ' has missing or empty field: ' + field);
      process.exit(1);
    }
  }

  // ---- 3. theme must be in the 15-slug closed set ----
  if (!VALID_THEMES.has(item.theme)) {
    console.error('FAIL: ' + label + ' has invalid theme: "' + item.theme + '". Must be one of: ' + Array.from(VALID_THEMES).join(', '));
    process.exit(1);
  }

  // ---- 4. type must be flashcard or qcm ----
  if (item.type !== 'flashcard' && item.type !== 'qcm') {
    console.error('FAIL: ' + label + ' has invalid type: "' + item.type + '". Must be "flashcard" or "qcm".');
    process.exit(1);
  }

  // ---- 5. difficulty must be 1, 2, or 3 ----
  if (item.difficulty !== 1 && item.difficulty !== 2 && item.difficulty !== 3) {
    console.error('FAIL: ' + label + ' has invalid difficulty: ' + item.difficulty + '. Must be 1, 2, or 3.');
    process.exit(1);
  }

  // ---- 6. QCM items: choices must be array, correct must be valid index ----
  if (item.type === 'qcm') {
    if (!Array.isArray(item.choices) || item.choices.length === 0) {
      console.error('FAIL: ' + label + ' (type=qcm) has missing or empty choices array.');
      process.exit(1);
    }
    if (typeof item.correct !== 'number' || !Number.isInteger(item.correct) ||
        item.correct < 0 || item.correct >= item.choices.length) {
      console.error('FAIL: ' + label + ' (type=qcm) has invalid correct: ' + item.correct + '. Must be 0 <= correct < choices.length (' + item.choices.length + ').');
      process.exit(1);
    }
  }

  // ---- 7. source object: authority, ref, url, verified must all be non-empty strings ----
  if (!item.source || typeof item.source !== 'object') {
    console.error('FAIL: ' + label + ' is missing source object.');
    process.exit(1);
  }
  const requiredSourceFields = ['authority', 'ref', 'url', 'verified'];
  for (const field of requiredSourceFields) {
    if (typeof item.source[field] !== 'string' || item.source[field].trim() === '') {
      console.error('FAIL: ' + label + ' has missing or empty source.' + field);
      process.exit(1);
    }
  }

  // ---- 8. source.url must NOT contain 'legifrance' (D-07: Légifrance only in explanation) ----
  if (item.source.url.toLowerCase().indexOf('legifrance') !== -1) {
    console.error('FAIL: ' + label + ' has legifrance in source.url (D-07 violation). Légifrance links must appear only in explanation prose, not in source.url.');
    process.exit(1);
  }
}

// ---- 9. Per-theme count assertions from CLI args ----
const args = process.argv.slice(2);
for (const arg of args) {
  const match = arg.match(/^([^:]+):(\d+)$/);
  if (!match) {
    console.error('FAIL: invalid argument format "' + arg + '". Expected format: theme:count (e.g. duerp:18)');
    process.exit(1);
  }
  const theme = match[1];
  const expectedCount = parseInt(match[2], 10);
  const actual = BANK.filter(function(i) { return i.theme === theme; }).length;
  if (actual < expectedCount) {
    console.error('FAIL: theme "' + theme + '" has ' + actual + ' items but expected at least ' + expectedCount + '.');
    process.exit(1);
  }
  console.log('PASS: theme "' + theme + '" has ' + actual + ' items (>= ' + expectedCount + ')');
}

console.log('ALL ASSERTIONS PASSED.');
process.exit(0);
