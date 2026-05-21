---
status: partial
phase: 02-content-bank
source: [02-VERIFICATION.md]
started: "2026-05-21T00:30:00Z"
updated: "2026-05-21T00:30:00Z"
---

## Current Test

[awaiting human testing]

## Tests

### 1. Browser console — BANK evaluability and length
expected: Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`, open DevTools console (F12), type `BANK.length` → returns `226` (and `BANK.length >= 200` returns `true`). Confirms `window.BANK` is globally evaluable in the deployed browser runtime — no IIFE, no module scope.
result: [pending]

### 2. Browser console — theme filter usability
expected: In the same console, evaluate `BANK.filter(i => i.theme === 'duerp').length` and repeat for at least 5 other themes (e.g. `principes-generaux`, `iso-9001`, `tms`, `rps`, `acronymes`). Each returns a non-empty count (>= 1). Confirms `theme` is a usable filter key for Phase 3/4/5 mode renderers.
result: [pending]

## Summary

total: 2
passed: 0
issues: 0
pending: 2
skipped: 0
blocked: 0

## Gaps
