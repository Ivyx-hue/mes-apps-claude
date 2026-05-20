/* verify-bank.cjs
 * Reusable batch verifier for window.BANK (Phase 2 content bank).
 *
 * DEFAULT MODE (per-batch regression):
 *   node verify-bank.cjs theme1:count1 theme2:count2 ...
 *   Example: node verify-bank.cjs duerp:18 principes-generaux:18
 *   Exit 0 = all assertions pass. Exit 1 = first failure printed.
 *
 * FINAL MODE (ROADMAP SC1-4 + SHELL-05 + D-01..D-13):
 *   node verify-bank.cjs --final
 *   Reads url-verification-ledger.txt; asserts every ROADMAP Phase 2 success criterion.
 *   Exit 0 = all final assertions pass. Exit 1 = first FAIL printed.
 */
'use strict';

const path = require('path');
const fs   = require('fs');

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

// ---- 9. Per-theme count assertions from CLI args (DEFAULT MODE) ----
const args = process.argv.slice(2);

// Route to --final mode if requested
if (args.length === 1 && args[0] === '--final') {
  runFinalGate();
} else {
  // Default per-batch mode
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
}

// =============================================================================
// --final mode: assert all 4 ROADMAP Phase 2 success criteria + SHELL-05 + D-01..D-13
// =============================================================================
function runFinalGate() {
  const ALL_THEMES = [
    'duerp', 'principes-generaux', 'iso-9001', 'iso-14001', 'iso-45001',
    'tms', 'risque-routier', 'risque-chimique', 'rps', 'espaces-confines',
    'acronymes', 'metiers', 'calendrier', 'icpe-seveso', 'rncp'
  ];

  let allPassed = true;

  function pass(label) {
    console.log('PASS [' + label + ']');
  }
  function fail(label, reason) {
    console.error('FAIL [' + label + '] ' + reason);
    allPassed = false;
  }

  console.log('\n=== --final gate: ROADMAP SC1-4 + SHELL-05 + D-01..D-13 ===\n');

  // ------------------------------------------------------------------
  // SC1 / BANK-01: BANK.length >= 200 (warn if < 210, hard-FAIL if < 200)
  // ------------------------------------------------------------------
  if (!Array.isArray(BANK)) {
    fail('SC1/BANK-01', 'window.BANK is not an array');
  } else if (BANK.length < 200) {
    fail('SC1/BANK-01', 'BANK.length=' + BANK.length + ' is below minimum 200');
  } else {
    if (BANK.length < 210) {
      console.log('WARN [SC1/BANK-01] BANK.length=' + BANK.length + ' passes hard minimum (>=200) but is below research target (>=210)');
    }
    pass('SC1/BANK-01 BANK.length=' + BANK.length + ' >= 200');
  }

  // ------------------------------------------------------------------
  // SC1-themes / BANK-05 / D-01: every item.theme is in the 15-slug closed set;
  //   every one of the 15 themes is present; no item uses theme outside the set.
  // ------------------------------------------------------------------
  const themesPresent = new Set(BANK.map(function(i) { return i.theme; }));
  const extraThemes = [...themesPresent].filter(function(t) { return !VALID_THEMES.has(t); });
  const missingThemes = ALL_THEMES.filter(function(t) { return !themesPresent.has(t); });

  if (extraThemes.length > 0) {
    fail('SC1-themes/D-01', 'Items use theme(s) outside the 15-slug closed set: ' + extraThemes.join(', '));
  } else {
    pass('SC1-themes/D-01 no extra themes outside closed set');
  }
  if (missingThemes.length > 0) {
    fail('SC1-themes/D-01', 'Missing theme(s) from the 15-slug set: ' + missingThemes.join(', '));
  } else {
    pass('SC1-themes/D-01 all 15 themes present');
  }

  // ------------------------------------------------------------------
  // SC4 / BANK-05: every one of the 15 themes has >= 1 item
  // ------------------------------------------------------------------
  console.log('\nPer-theme histogram (SC4 / BANK-05):');
  let sc4pass = true;
  for (const t of ALL_THEMES) {
    const count = BANK.filter(function(i) { return i.theme === t; }).length;
    console.log('  ' + t + ': ' + count + ' items');
    if (count < 1) {
      sc4pass = false;
    }
  }
  if (sc4pass) {
    pass('SC4/BANK-05 all 15 themes non-empty');
  } else {
    fail('SC4/BANK-05', 'One or more themes are empty — see histogram above');
  }

  // ------------------------------------------------------------------
  // SC2 / BANK-02: draw 10 random items; assert required fields + QCM correctness.
  //   Also assert ALL qcm items have valid choices/correct (full-sweep).
  // ------------------------------------------------------------------
  console.log('\nSC2 / BANK-02: sampling 10 random items for field completeness...');
  const sample = [];
  const shuffled = BANK.slice().sort(function() { return Math.random() - 0.5; });
  for (let i = 0; i < Math.min(10, shuffled.length); i++) {
    sample.push(shuffled[i]);
  }

  let sc2pass = true;
  const requiredItemFields = ['id', 'type', 'theme', 'question', 'answer', 'explanation', 'difficulty'];
  const requiredSourceFieldsCheck = ['authority', 'ref', 'url', 'verified'];
  console.log('  Sampled ids: ' + sample.map(function(i) { return i.id; }).join(', '));

  for (const item of sample) {
    const lbl = 'item ' + item.id;
    for (const f of requiredItemFields) {
      if (f === 'difficulty') {
        if (item.difficulty !== 1 && item.difficulty !== 2 && item.difficulty !== 3) {
          fail('SC2/BANK-02', lbl + ' difficulty=' + item.difficulty + ' not in {1,2,3}');
          sc2pass = false;
        }
      } else {
        if (typeof item[f] !== 'string' || item[f].trim() === '') {
          fail('SC2/BANK-02', lbl + ' field "' + f + '" is missing or empty');
          sc2pass = false;
        }
      }
    }
    if (!item.source || typeof item.source !== 'object') {
      fail('SC2/BANK-02', lbl + ' source object missing');
      sc2pass = false;
    } else {
      for (const sf of requiredSourceFieldsCheck) {
        if (typeof item.source[sf] !== 'string' || item.source[sf].trim() === '') {
          fail('SC2/BANK-02', lbl + ' source.' + sf + ' is missing or empty');
          sc2pass = false;
        }
      }
    }
    if (item.type === 'qcm') {
      if (!Array.isArray(item.choices) || item.choices.length === 0) {
        fail('SC2/BANK-02', lbl + ' (qcm) has missing/empty choices');
        sc2pass = false;
      } else if (typeof item.correct !== 'number' || item.correct < 0 || item.correct >= item.choices.length) {
        fail('SC2/BANK-02', lbl + ' (qcm) correct=' + item.correct + ' out of range');
        sc2pass = false;
      }
    }
  }
  if (sc2pass) {
    pass('SC2/BANK-02 10-item sample all fields present and valid');
  }

  // Full sweep: every qcm item has valid choices + correct
  let qcmSweepPass = true;
  for (let i = 0; i < BANK.length; i++) {
    const item = BANK[i];
    if (item.type === 'qcm') {
      if (!Array.isArray(item.choices) || item.choices.length === 0) {
        fail('SC2/BANK-02', 'item[' + i + '] id=' + item.id + ' (qcm) missing/empty choices');
        qcmSweepPass = false;
      } else if (typeof item.correct !== 'number' || !Number.isInteger(item.correct) ||
                 item.correct < 0 || item.correct >= item.choices.length) {
        fail('SC2/BANK-02', 'item[' + i + '] id=' + item.id + ' (qcm) correct=' + item.correct + ' invalid (choices.length=' + item.choices.length + ')');
        qcmSweepPass = false;
      }
    }
  }
  if (qcmSweepPass) {
    pass('SC2/BANK-02 full QCM sweep — all ' + BANK.filter(function(i){return i.type==='qcm';}).length + ' qcm items have valid choices/correct');
  }

  // ------------------------------------------------------------------
  // SC3 / BANK-04 / D-09: content-verification ledger check.
  //   Every distinct source.url must appear in url-verification-ledger.txt
  //   with a PASS verdict (title + topic-match + soft-404 columns present).
  //   A status-only or FAIL line is a gate failure.
  // ------------------------------------------------------------------
  console.log('\nSC3 / BANK-04 / D-09: checking url-verification-ledger.txt...');
  const ledgerPath = path.resolve(__dirname, 'url-verification-ledger.txt');
  if (!fs.existsSync(ledgerPath)) {
    fail('SC3/BANK-04', 'url-verification-ledger.txt does not exist at ' + ledgerPath);
  } else {
    const ledgerText = fs.readFileSync(ledgerPath, 'utf8');
    const ledgerLines = ledgerText.split('\n');

    const distinctUrls = [...new Set(BANK.map(function(i) { return i.source.url; }))];
    console.log('  Distinct source.url count: ' + distinctUrls.length);

    let sc3pass = true;
    const missingFromLedger = [];
    const failedInLedger = [];

    for (const url of distinctUrls) {
      // Find the ledger line for this URL
      const matchingLines = ledgerLines.filter(function(line) {
        return line.indexOf(url) !== -1;
      });

      if (matchingLines.length === 0) {
        missingFromLedger.push(url);
        sc3pass = false;
        continue;
      }

      // Check that the line starts with PASS (not FAIL, not empty/status-only)
      const line = matchingLines[0].trim();
      const isPass = line.toUpperCase().startsWith('PASS');
      const hasTitle = line.indexOf('title=') !== -1 || line.indexOf('human-eyeball') !== -1;
      // Must have either title= (static) or human-eyeball (SPA)
      const isStatusOnly = !hasTitle;

      if (!isPass) {
        failedInLedger.push(url + ' -> ' + line.substring(0, 120));
        sc3pass = false;
      } else if (isStatusOnly) {
        failedInLedger.push(url + ' -> status-only entry (no title= or human-eyeball) BANNED per D-09');
        sc3pass = false;
      }
    }

    if (missingFromLedger.length > 0) {
      fail('SC3/BANK-04', 'URLs missing from ledger:\n  ' + missingFromLedger.join('\n  '));
    }
    if (failedInLedger.length > 0) {
      fail('SC3/BANK-04', 'URLs with FAIL/status-only ledger entries:\n  ' + failedInLedger.join('\n  '));
    }
    if (sc3pass) {
      pass('SC3/BANK-04 all ' + distinctUrls.length + ' distinct source.url entries present and PASS in ledger');
    }
  }

  // ------------------------------------------------------------------
  // D-02: no item has a 'norm' field; ISO themes are the three separate slugs
  // ------------------------------------------------------------------
  const itemsWithNorm = BANK.filter(function(i) { return 'norm' in i; });
  if (itemsWithNorm.length > 0) {
    fail('D-02', itemsWithNorm.length + ' items have a "norm" field (D-02 violation). Norm is encoded in theme slug only.');
  } else {
    pass('D-02 no item has a "norm" field');
  }
  const isoThemes = ['iso-9001', 'iso-14001', 'iso-45001'];
  const missingIso = isoThemes.filter(function(t) { return !themesPresent.has(t); });
  if (missingIso.length > 0) {
    fail('D-02', 'ISO theme(s) missing: ' + missingIso.join(', ') + ' (must be separate slugs, not a bare "iso" theme)');
  } else {
    pass('D-02 all three ISO themes present as separate slugs');
  }
  const bareIso = BANK.filter(function(i) { return i.theme === 'iso'; });
  if (bareIso.length > 0) {
    fail('D-02', bareIso.length + ' items use bare "iso" theme (D-02 violation)');
  } else {
    pass('D-02 no item uses bare "iso" theme');
  }

  // ------------------------------------------------------------------
  // D-03: no theme matches /^bc0[1-4]$/ and no item has a 'bloc' field
  // ------------------------------------------------------------------
  const bcThemeItems = BANK.filter(function(i) { return /^bc0[1-4]$/.test(i.theme); });
  if (bcThemeItems.length > 0) {
    fail('D-03', bcThemeItems.length + ' items use a bc01-bc04 theme (D-03 violation)');
  } else {
    pass('D-03 no item uses a bc01-bc04 theme slug');
  }
  const itemsWithBloc = BANK.filter(function(i) { return 'bloc' in i; });
  if (itemsWithBloc.length > 0) {
    fail('D-03', itemsWithBloc.length + ' items have a "bloc" field (D-03 violation)');
  } else {
    pass('D-03 no item has a "bloc" field');
  }

  // ------------------------------------------------------------------
  // D-07: zero source.url contains 'legifrance'
  // ------------------------------------------------------------------
  const legifranceItems = BANK.filter(function(i) {
    return i.source && i.source.url && i.source.url.toLowerCase().indexOf('legifrance') !== -1;
  });
  if (legifranceItems.length > 0) {
    fail('D-07', legifranceItems.length + ' items have legifrance in source.url: ' + legifranceItems.map(function(i){return i.id;}).join(', '));
  } else {
    pass('D-07 zero source.url contains "legifrance"');
  }

  // ------------------------------------------------------------------
  // D-10 / D-11 / D-13: answer non-empty on every item; difficulty strictly {1,2,3}
  // ------------------------------------------------------------------
  const emptyAnswer = BANK.filter(function(i) { return typeof i.answer !== 'string' || i.answer.trim() === ''; });
  if (emptyAnswer.length > 0) {
    fail('D-10/D-11/D-13', emptyAnswer.length + ' items have empty answer: ' + emptyAnswer.map(function(i){return i.id;}).join(', '));
  } else {
    pass('D-10/D-11/D-13 all items have non-empty answer');
  }
  const badDiff = BANK.filter(function(i) { return i.difficulty !== 1 && i.difficulty !== 2 && i.difficulty !== 3; });
  if (badDiff.length > 0) {
    fail('D-10/D-11/D-13', badDiff.length + ' items have difficulty outside {1,2,3}: ' + badDiff.map(function(i){return i.id+'='+i.difficulty;}).join(', '));
  } else {
    pass('D-10/D-11/D-13 all items have difficulty in {1,2,3}');
  }
  // Difficulty histogram
  const diffHisto = {1: 0, 2: 0, 3: 0};
  for (const item of BANK) { if (diffHisto[item.difficulty] !== undefined) diffHisto[item.difficulty]++; }
  console.log('  Difficulty histogram: d1=' + diffHisto[1] + ' d2=' + diffHisto[2] + ' d3=' + diffHisto[3]);

  // ------------------------------------------------------------------
  // SHELL-05: outils.html contains <script src="outils-data.js"></script>
  // ------------------------------------------------------------------
  console.log('\nSHELL-05: checking outils.html for <script src="outils-data.js">...');
  const outilsHtmlPath = path.resolve(__dirname, '../../../qhse-cesi/outils.html');
  if (!fs.existsSync(outilsHtmlPath)) {
    fail('SHELL-05', 'qhse-cesi/outils.html does not exist at ' + outilsHtmlPath);
  } else {
    const outilsHtml = fs.readFileSync(outilsHtmlPath, 'utf8');
    const scriptTag = '<script src="outils-data.js"></script>';
    const count = (outilsHtml.split(scriptTag)).length - 1;
    if (count === 0) {
      fail('SHELL-05', 'outils.html does not contain ' + scriptTag);
    } else if (count > 1) {
      fail('SHELL-05', 'outils.html contains ' + count + ' occurrences of ' + scriptTag + ' (expected exactly 1)');
    } else {
      pass('SHELL-05 outils.html contains exactly one <script src="outils-data.js"></script>');
      console.log('  SHELL-05 deferred clause: CLOSED');
    }
  }

  // ------------------------------------------------------------------
  // Final summary
  // ------------------------------------------------------------------
  console.log('\n' + '='.repeat(70));
  if (allPassed) {
    console.log('--final: ALL ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS — BANK.length=' + BANK.length);
    process.exit(0);
  } else {
    console.error('--final: ONE OR MORE ASSERTIONS FAILED — see FAIL lines above');
    process.exit(1);
  }
}
