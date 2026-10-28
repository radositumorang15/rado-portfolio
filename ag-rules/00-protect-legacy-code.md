---
trigger: always_on
description: Never modify, move, rename, reformat, or delete existing code. Work additively.
---

# 00 — Protect legacy code (HIGHEST PRIORITY)

The current Vite + React site is live on Netlify. Treat everything that existed before the Next.js migration as **LEGACY and READ-ONLY**.

## Protected paths (do NOT edit, move, rename, reformat, or delete)
```
src/components/**        (about, blog, contacts, footer, home, lanyard, nav, projects, side, text)
src/assets/**
src/App.jsx   src/App.css   src/index.css   src/main.jsx
public/**                (you may ADD new files; never change or delete existing ones)
index.html
vite.config.js
.eslintrc.cjs   .gitattributes
package-lock.json
README.md
netlify.toml   _redirects   (if they exist)
```
`package.json` is protected EXCEPT for the additive changes allowed below.

## Allowed actions
- **Create new files and folders** (see `02-code-structure.md` for where).
- **Read** any legacy file for reference.
- **Copy** a legacy component into a new location and adapt the COPY. The original stays untouched.
- `package.json`: add new dependencies (only those listed in `docs/PRD.md §11.2`) and add NEW scripts `dev:next`, `build:next`, `start:next`, `typecheck`. Never change or remove existing scripts (`dev`, `build`, `preview`, `lint`).
- Create `tsconfig.json`, `next.config.mjs`, `eslint.config.mjs`, `next-env.d.ts` (new files) with `allowJs: true` so `.jsx` legacy files still resolve.

## Forbidden actions
- Editing, "fixing", "cleaning up", renaming, or moving any legacy file, even for typos, lint warnings, or unused imports.
- Running formatters or fixers across the repo (`prettier --write .`, `eslint --fix .`, `npm audit fix`, `npm update`, `npx @next/codemod` on legacy files).
- Converting legacy `.jsx` to `.tsx`.
- Deleting `node_modules`, lock files, or legacy folders.
- Replacing legacy `dev`/`build` scripts. Both toolchains coexist until cutover.

## If a task seems to require changing a protected file
STOP. Do not edit. Report in Indonesian:
1. Which file and why it seems necessary.
2. A proposed diff (as text, not applied).
3. A non-invasive alternative (wrapper file, copy, new route) if one exists.
Then wait for explicit approval.

## Retiring legacy code
Legacy code may be removed only after the user writes exactly: **`RETIRE LEGACY`**. Before that: confirm the git tag `pre-next-migration` exists, the Next.js build passes, and list every file you will delete. Delete nothing else.

## Before the first change
1. Confirm a clean git status; if not clean, ask the user to commit or stash.
2. Create the branch `next-migration` (if not on it) and the tag `pre-next-migration` on the last legacy commit.
3. Never work directly on `main`.
