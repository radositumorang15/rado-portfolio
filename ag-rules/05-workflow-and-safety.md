---
trigger: always_on
description: How to work step by step, command safety, git hygiene, and the final report format.
---

# 05 — Workflow, safety, and reporting

## Work loop (every task)
1. **Plan first.** List the PRD IDs, the new files you will create, and confirm that no legacy file changes. Wait for the user's "OK" if the plan touches more than 5 files or any dependency.
2. **Implement in small steps.** One component/app per step. Keep each commit focused.
3. **Verify.** Run `npm run typecheck` and `npm run build:next` (when relevant). Fix issues in YOUR files only.
4. **Self-review.** Re-read the diff: any legacy file touched? any hard-coded color or text? any browser API in render?
5. **Report** (template below).

## Commands — allowed without asking
`ls`, `cat`, `git status`, `git diff`, `git log`, `git add <new files>`, `git commit`, `npm run typecheck`, `npm run build:next`, `npm run dev:next`, `npm run test`.

## Commands — ask first
`npm install <package>` (only PRD §11.2 packages), `git checkout -b`, `git tag`, `git merge`, any network call, any file deletion.

## Commands — NEVER run
`rm -rf` on anything outside `.next/` or `out/`, `git reset --hard`, `git clean -fd`, `git push --force`, `git rebase` on shared branches, `git checkout -- <legacy file>`, `npm audit fix --force`, `npm update`, `npx prettier --write .`, `npx eslint --fix .`, deleting `node_modules` or lock files, editing files outside the workspace.

## Git hygiene
- Branch: `next-migration`. Never commit to `main`.
- Conventional commits: `feat(os): add Dock`, `feat(notch): add NotchHost state machine`, `chore(next): add next.config`, `docs(progress): update FR status`.
- Stage only files you created. Never commit `.env*`, `.next/`, `out/`, `node_modules/`.
- One logical change per commit so any step can be reverted without touching legacy code.

## Final report template (Indonesian)
```
Ringkasan: <1–2 kalimat>
ID PRD yang dikerjakan: <SYS-xx, FR-xx, APP-xx>
Bagian DESIGN yang diikuti: <§x.x>
File baru: <daftar>
File lama yang diubah: TIDAK ADA  (atau: <daftar + persetujuan>)
Verifikasi: typecheck ✅/❌ · build:next ✅/❌ · hydration warning: tidak ada/ada
Item terbuka: <masuk ke docs/OPEN_ITEMS.md>
Langkah berikutnya yang disarankan: <1 langkah>
```
