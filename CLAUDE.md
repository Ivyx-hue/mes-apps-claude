# CLAUDE.md — Context for Claude Code

This file gives Claude Code full context on this project so every session starts instantly without re-explaining anything.

---

## Project Overview

Apps built with Claude, deployed automatically to Vercel. The goal is: Claude generates code → pushes to GitHub → Vercel deploys → user gets a live URL. Zero manual steps for the user.

## Owner

- GitHub username: `Ivyx-hue`
- Location: Lot-et-Garonne, France
- Background: QHSE Bachelor student at CESI Bordeaux (alternance), former electrician on nuclear sites (habilitations B1V, BR, H1V, SCN1, CSQ, RP1), accounting background (BTS CGO)

---

## Stack

| Service | URL / ID |
|---------|----------|
| GitHub repo | https://github.com/Ivyx-hue/mes-apps-claude |
| Vercel production | https://mes-apps-claude.vercel.app |
| Supabase project | https://gbriufihpknyyajoujdu.supabase.co |
| Supabase region | eu-west-3 (Paris) |

### Vercel env variables (already configured)
- `NEXT_PUBLIC_SUPABASE_URL` = https://gbriufihpknyyajoujdu.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = see Supabase dashboard → Settings → API Keys

---

## Deploy Pipeline

```
Claude generates code
        ↓
git clone https://<TOKEN>@github.com/Ivyx-hue/mes-apps-claude.git
        ↓
copy file(s) into repo
        ↓
git add . && git commit -m "🚀 Deploy: <app-name>"
        ↓
git push origin main
        ↓
Vercel auto-deploys (GitHub Actions workflow already configured)
        ↓
Live at https://mes-apps-claude.vercel.app (~60 seconds)
```

### GitHub Actions workflow
Already configured at `.github/workflows/deploy.yml`. Do not modify.

### GitHub Token
- Scope: `repo` + `workflow`
- Expiry: 90 days (ask user to regenerate if expired)
- The user provides the token at the start of each session
- Never log or expose the token in output

---

## Current Apps

### QHSE Trainer (`index.html`)
- Flashcards + QCM to prepare for Bachelor QHSE at CESI
- 5 modules: ISO norms, DUERP, TMS, Risque Routier, Acronymes
- Pure HTML/CSS/JS, no dependencies, localStorage for progress
- Live at: https://mes-apps-claude.vercel.app

---

## How to Deploy a New App

1. Generate the app as a single `index.html` (HTML + CSS + JS inline)
2. Clone the repo using the GitHub token provided by the user
3. Replace or add the file in the repo
4. Push to main
5. Announce the URL to the user

For multi-app support in the future: use subdirectories + Vercel rewrites.

---

## User Preferences

- Language: French in conversation, English in code/comments
- Style: direct, collaborative, no unnecessary explanations
- Interaction: user uses Wispr Flow (voice), so keep prompts concise
- Apps should work on mobile and desktop
- Dark mode preferred for UI

---

## Skills Installed

- `deploy-vercel` — auto-deploy skill (see above pipeline)

---

## Notes for Claude Code

- Always `git pull` before pushing to avoid conflicts
- Commit messages in format: `🚀 Deploy: <app-name>` or `✨ Feature: <description>`
- The user does NOT want to run any commands manually — Claude handles everything
- When token is missing, ask: "J'ai besoin de ton token GitHub (ghp_...) pour déployer."
