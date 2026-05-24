/* qhse-cesi/srs.js
 * SM-2 spaced-repetition scheduler — Phase 3.
 * window.SRS: { schedule, isDue, addDays, todayLocal, filterDue, countNew,
 *               DEFAULTS, GRADE }
 * Pure functions only — no DOM, no localStorage, no Date.now() inside math
 * (today is injected). Verifiable from Node via `global.window = {};
 * require('./srs.js')` — same dual-runtime contract as outils-data.js.
 *
 * Consumed by: outils.html Flashcards view IIFE (P3),
 *              QCM view IIFE (P4 SRS-03 write-half).
 * DO NOT import, require from a bundler, or wrap in ESM — loaded via
 * <script src="srs.js" defer> in outils.html.
 *
 * Idempotent double-load guard (mirrors outils-data.js WR-04):
 * if window.SRS already exists with a schedule function, keep the first version.
 */
if (window.SRS && window.SRS.schedule) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('srs.js loaded twice — keeping the first SRS');
  }
} else {
  window.SRS = (function () {
    'use strict';

    // ----------------------------------------------------------------
    // D-07 constants (Anki SM-2 defaults — CONTEXT.md locked)
    // ----------------------------------------------------------------
    var DEFAULTS = Object.freeze({
      EASE_INIT:          2.5,
      EASE_FLOOR:         1.3,
      FIRST_INTERVAL:     1,      // I(1) in days — first successful review
      SECOND_INTERVAL:    6,      // I(2) in days — second successful review
      RATE_RESET_INTERVAL: 1,     // lapse resets interval to 1 day
      RATE_EASE_DELTA:    -0.20,  // raté penalises ease
      DUR_INTERVAL_MULT:  1.2,    // dur interval multiplier
      DUR_EASE_DELTA:     -0.15,  // dur penalises ease (less than raté)
      BIEN_EASE_DELTA:    0,      // bien leaves ease unchanged
      FACILE_BONUS_MULT:  1.3,    // facile bonus multiplier on interval
      FACILE_EASE_DELTA:  0.15    // facile rewards ease
    });

    // Grade enum — use string keys to avoid magic numbers in calling code
    var GRADE = Object.freeze({
      RATE:   'rate',
      DUR:    'dur',
      BIEN:   'bien',
      FACILE: 'facile'
    });

    // Shorthand aliases for readability inside schedule()
    var EASE_INIT          = DEFAULTS.EASE_INIT;
    var EASE_FLOOR         = DEFAULTS.EASE_FLOOR;
    var FIRST_INTERVAL     = DEFAULTS.FIRST_INTERVAL;
    var SECOND_INTERVAL    = DEFAULTS.SECOND_INTERVAL;
    var RATE_RESET_INTERVAL = DEFAULTS.RATE_RESET_INTERVAL;
    var RATE_EASE_DELTA    = DEFAULTS.RATE_EASE_DELTA;
    var DUR_INTERVAL_MULT  = DEFAULTS.DUR_INTERVAL_MULT;
    var DUR_EASE_DELTA     = DEFAULTS.DUR_EASE_DELTA;
    var FACILE_BONUS_MULT  = DEFAULTS.FACILE_BONUS_MULT;
    var FACILE_EASE_DELTA  = DEFAULTS.FACILE_EASE_DELTA;

    // ----------------------------------------------------------------
    // addDays(yyyymmdd, n) → 'yyyy-mm-dd'
    // Parse as LOCAL day via (year, monthIndex, day) constructor —
    // NOT new Date(yyyymmdd) which parses as UTC midnight (RESEARCH §2.3).
    // Correctly handles DST, leap years, year boundaries.
    // ----------------------------------------------------------------
    function addDays(yyyymmdd, n) {
      var parts = yyyymmdd.split('-');
      var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      d.setDate(d.getDate() + n);
      var y  = d.getFullYear();
      var mo = String(d.getMonth() + 1).padStart(2, '0');
      var da = String(d.getDate()).padStart(2, '0');
      return y + '-' + mo + '-' + da;
    }

    // ----------------------------------------------------------------
    // isDue(row, today) → boolean
    // Lexicographic yyyy-mm-dd compare — no Date allocation needed.
    // Returns false if row is falsy or row.due is missing.
    // ----------------------------------------------------------------
    function isDue(row, today) {
      if (!row || !row.due) return false;
      return row.due <= today;
    }

    // ----------------------------------------------------------------
    // todayLocal() → 'yyyy-mm-dd'
    // Returns the user's local civil day via sv-SE locale (ISO 8601
    // output, local timezone — RESEARCH §2.2).
    // ----------------------------------------------------------------
    function todayLocal() {
      return new Date().toLocaleDateString('sv-SE');
    }

    // ----------------------------------------------------------------
    // schedule(row, grade, today) → NEW row object (input never mutated)
    //
    // row  = current per-card row from qhse-srs-v1 store, OR null (new card).
    // grade ∈ GRADE enum.
    // today = 'yyyy-mm-dd' injected by caller (never read from Date here).
    //
    // Edge cases handled (RESEARCH §1.3):
    //   E1: row=null → default new-card row applied
    //   E2: first raté (reps=0, lapses=0) → lapses=1, reps=0, interval=1
    //   E3: repeated raté → ease clamps at EASE_FLOOR (1.3)
    //   E4: raté when interval=0 (brand-new card graded raté) → interval=1
    //   E5: ease floor clamp via Math.max(EASE_FLOOR, ease + delta)
    //   E6: Math.ceil for all interval multiplications (canonical SM-2)
    //   E7: facile on new card → reps=1, interval=ceil(1*1.3)=2, ease=2.65
    //   E8: introduced field set only on the FIRST ever grade, stable thereafter
    //
    // D-07 (RESEARCH §1.4): reps unchanged on raté — lapses and reps are
    // independent counters, matching Anki's data model.
    // ----------------------------------------------------------------
    function schedule(row, grade, today) {
      // Default new-card row when no prior entry in store
      var r = row || {
        ease:       EASE_INIT,
        interval:   0,
        due:        today,
        lapses:     0,
        reps:       0,
        introduced: null
      };

      // isNew: card has never been graded (no successful rep, no lapse)
      var isNew = (r.reps === 0 && r.lapses === 0);

      var ease     = r.ease;
      var interval = r.interval;
      var lapses   = r.lapses;
      var reps     = r.reps;

      switch (grade) {
        case GRADE.RATE:
          // Lapse: ease penalised, interval reset to 1, reps unchanged
          lapses  += 1;
          ease     = Math.max(EASE_FLOOR, ease + RATE_EASE_DELTA);
          interval = RATE_RESET_INTERVAL;
          // reps NOT incremented — lapse is not a successful review
          break;

        case GRADE.DUR:
          // Hard: ease penalised lightly, interval advances slowly
          reps    += 1;
          ease     = Math.max(EASE_FLOOR, ease + DUR_EASE_DELTA);
          interval = (reps === 1) ? FIRST_INTERVAL
                   : (reps === 2) ? SECOND_INTERVAL
                   : Math.ceil(interval * DUR_INTERVAL_MULT);
          break;

        case GRADE.BIEN:
          // Standard advance: ease unchanged, normal interval progression
          reps    += 1;
          // ease unchanged (BIEN_EASE_DELTA = 0)
          interval = (reps === 1) ? FIRST_INTERVAL
                   : (reps === 2) ? SECOND_INTERVAL
                   : Math.ceil(interval * ease);
          break;

        case GRADE.FACILE:
          // Easy bonus: ease rewarded, interval boosted by 1.3×
          reps    += 1;
          ease     = ease + FACILE_EASE_DELTA;  // positive delta — no floor needed
          interval = (reps === 1) ? Math.ceil(FIRST_INTERVAL  * FACILE_BONUS_MULT)
                   : (reps === 2) ? Math.ceil(SECOND_INTERVAL * FACILE_BONUS_MULT)
                   : Math.ceil(interval * ease * FACILE_BONUS_MULT);
          break;

        default:
          throw new Error('schedule: unknown grade ' + grade);
      }

      return {
        ease:       ease,
        interval:   interval,
        due:        addDays(today, interval),
        lapses:     lapses,
        reps:       reps,
        // introduced: set on very first grade only (E8 stability invariant)
        introduced: r.introduced || (isNew ? today : null)
      };
    }

    // ----------------------------------------------------------------
    // filterDue(cards, store, today) → Card[]
    // Returns cards from `cards` whose store entry exists AND is due.
    // Pure — no mutation of inputs.
    // ----------------------------------------------------------------
    function filterDue(cards, store, today) {
      return cards.filter(function (c) {
        var row = store[c.id];
        return row && isDue(row, today);
      });
    }

    // ----------------------------------------------------------------
    // countNew(store, today) → number
    // Count store entries introduced on `today` (tracks daily new-card cap).
    // ----------------------------------------------------------------
    function countNew(store, today) {
      var count = 0;
      var keys = Object.keys(store);
      for (var i = 0; i < keys.length; i++) {
        if (store[keys[i]].introduced === today) count++;
      }
      return count;
    }

    // ----------------------------------------------------------------
    // Public API — frozen to prevent accidental mutation by consumers.
    // NOTE: zero side-effecting keys (/persist|save|write|store|set/i).
    // Persistence is the view IIFE's responsibility, not the scheduler's.
    // (RESEARCH §5.3 — structural free-revision purity guarantee)
    // ----------------------------------------------------------------
    return Object.freeze({
      schedule:   schedule,
      isDue:      isDue,
      addDays:    addDays,
      todayLocal: todayLocal,
      filterDue:  filterDue,
      countNew:   countNew,
      DEFAULTS:   DEFAULTS,
      GRADE:      GRADE
    });

  })();
}
