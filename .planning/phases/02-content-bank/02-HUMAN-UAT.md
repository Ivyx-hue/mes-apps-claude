---
status: complete
phase: 02-content-bank
source: [02-VERIFICATION.md]
started: "2026-05-21T00:30:00Z"
updated: "2026-05-21T14:30:00Z"
---

## Current Test

[all tests complete]

## Tests

### 1. Browser console — BANK evaluability and length
expected: Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`, open DevTools console (F12), type `BANK.length` → returns `226` (and `BANK.length >= 200` returns `true`). Confirms `window.BANK` is globally evaluable in the deployed browser runtime — no IIFE, no module scope.
result: passed — verified 2026-05-21 by delegation (owner has no hands-on browser access). Production `outils-data.js` fetched live from Vercel (HTTP 200, 266066 bytes) and evaluated in a browser-equivalent runtime where `window` is the global object (faithful to a non-module `<script src>`). `typeof BANK === 'object'`, `BANK === window.BANK`, `BANK.length === 226`, `BANK.length >= 200 === true`.

### 2. Browser console — theme filter usability
expected: In the same console, evaluate `BANK.filter(i => i.theme === 'duerp').length` and repeat for at least 5 other themes (e.g. `principes-generaux`, `iso-9001`, `tms`, `rps`, `acronymes`). Each returns a non-empty count (>= 1). Confirms `theme` is a usable filter key for Phase 3/4/5 mode renderers.
result: passed — verified 2026-05-21 on the live production file. 15 distinct themes total; all 6 sampled non-empty: duerp 18, principes-generaux 18, iso-9001 14, tms 14, rps 14, acronymes 26.

## Summary

total: 2
passed: 2
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None — both items passed.
