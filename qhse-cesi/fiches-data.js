/* qhse-cesi/fiches-data.js
 * Fiches de révision content — Phase 5.
 * window.FICHES: array of exam-grade study sheets, one per BANK theme (15 total).
 * Schema: { slug, title, tldr, definitions[], cadreLegal, demarche, selectedIds[], pieges[], sources[] }
 *   - slug          : matches a window.BANK theme slug (duerp, iso-9001, …)
 *   - title         : French display title
 *   - tldr          : one-paragraph synthesis
 *   - definitions[] : { term, def } key-vocabulary list
 *   - cadreLegal    : whitelisted-HTML string (legal framework)
 *   - demarche      : whitelisted-HTML string (method / steps)
 *   - selectedIds[] : 5-10 BANK item ids surfaced as "Questions clés"
 *   - pieges[]      : common exam traps
 *   - sources[]     : { authority, ref, url, verified } citation list
 * Consumed by: P5 Fiches IIFE in outils.html (read-only; never writes SRS/scores — DEC-09).
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 *
 * Wave 1 (Plan 05-01) ships window.FICHES = [] (empty). Content is authored in
 * Plans 05-02..05-05; after 05-05 ships, window.FICHES.length === 15 (DEC-01).
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
  window.FICHES = [];
}
