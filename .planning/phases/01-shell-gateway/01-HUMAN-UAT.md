---
status: partial
phase: 01-shell-gateway
source: [01-VERIFICATION.md]
started: 2026-05-17T15:20:00Z
updated: 2026-05-17T15:20:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Hub gateway visible and navigable
expected: On `https://mes-apps-claude.vercel.app/qhse-cesi/` the "Outils" nav item and `#outils` gateway section are visible (previously hidden); clicking navigates to a 4-mode description with a working `outils.html` link that opens in the same tab.
result: [pending]

### 2. outils.html identity on mobile + desktop
expected: `outils.html` shows the 4-tab shell (Flashcards · Fiches de révision · QCM · Tests blancs) with the same dark editorial identity (Fraunces + Inter + OKLCH) on desktop and mobile; tabs switch on click and arrow keys; no focus jump/scroll on first load; Back button not trapped.
result: [pending]

### 3. Hub reading content zero regression
expected: Hub `index.html` Accueil / Découverte / Biblio render byte-for-byte identical to live v1.0; CSS-only burger menu + scrollspy still work at mobile width (SHELL-04).
result: [pending]

### 4. Root QHSE Trainer unchanged
expected: Root QHSE Trainer (`https://mes-apps-claude.vercel.app/`) renders exactly as before — untouched.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
