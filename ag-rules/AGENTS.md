# AGENTS.md — rado-portfolio (RadoOS)

You are working in an EXISTING, LIVE React (Vite) portfolio that is being migrated to Next.js 16 and redesigned as "RadoOS" (Windows 11 shell on desktop, Android 17 shell on mobile).

## Sources of truth (read before every task)
1. `docs/PRD.md` — WHAT to build (features `SYS-xx`, `APP-xx`, `FR-xx`, content in §7, Next.js rules in §11.4).
2. `docs/DESIGN.md` — HOW it looks and behaves (tokens, Dock, Rado Notch, windows, Android shell).
3. `.agent/rules/*.md` — detailed rules. They are mandatory, not suggestions.

If the user's request conflicts with the PRD/DESIGN, STOP and ask. Never silently pick one.

## The five non-negotiables
1. **Do not modify existing (legacy) code.** All work is ADDITIVE. See `.agent/rules/00-protect-legacy-code.md`.
2. **Follow the PRD.** Only build what an ID in the PRD asks for. No extra features, no invented content. See `01-prd-compliance.md`.
3. **Keep the structure clean.** New code goes only in the folders defined in `02-code-structure.md`.
4. **Follow Next.js rules.** Client/server boundaries, hydration, no browser APIs during render. See `03-nextjs-rules.md`.
5. **Use design tokens.** No hard-coded colors, radii, or shadows. See `04-design-system.md`.

## Language
- Reply to the user in **Indonesian**.
- Code, identifiers, comments, commit messages, and file names are in **English**.
- Product copy follows `docs/PRD.md §17` (EN default + ID) via i18n files.

## When unsure
Ask ONE clear question, with a recommended default. Do not guess, do not "improve" things nobody asked about.

## Definition of done (every task)
- [ ] Only new files were created; no legacy file changed (or explicit approval was given).
- [ ] The PRD IDs addressed are named in the final report.
- [ ] `npm run build:next` and type-check pass (when the task touches Next.js code).
- [ ] No hydration warnings, no console errors.
- [ ] `docs/PROGRESS.md` updated.
- [ ] Final report written in Indonesian using the template in `05-workflow-and-safety.md`.
