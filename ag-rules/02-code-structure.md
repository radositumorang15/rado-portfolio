---
trigger: always_on
description: Folder layout, naming, file size limits, imports, and TypeScript rules for all new code.
---

# 02 — Code structure & style (new code only)

## Where new code goes
```
app/                      Next.js routes only (layout, page, classic/**, manifest, sitemap, robots)
src/
  tokens/                 tokens.css, fluent.css, m3.css
  os/
    OSRoot.tsx            "use client" entry for the OS
    shells/windows/       WindowsShell, Dock, TrayPill, StartMenu, WidgetBoard, Window, Palette
    shells/android/       AndroidShell, Home, StatusBar, AppScaffold, QuickShade, Recents
    notch/                NotchHost, NotchSlot, notchStore
  apps/<app-name>/        XView.tsx (presentational) + XApp.tsx ("use client") + index.ts
  data/                   profile.ts, experience.ts, projects.ts, skills.ts, types.ts
  i18n/                   en.json, id.json, useT.ts
  store/                  windows.ts, prefs.ts
  hooks/                  useXxx.ts (shared hooks)
  lib/                    pure helpers (date, hash, cn, a11y)
docs/                     PRD.md, DESIGN.md, PROGRESS.md, OPEN_ITEMS.md, CHANGE_REQUESTS.md
```
- Do NOT put new code in `src/components/` (legacy). Do NOT create new top-level folders without approval.
- Each folder with 2+ public modules gets an `index.ts` barrel exporting only its public API.

## Naming
- Components: `PascalCase.tsx`, one component per file, named export (`export function Dock`). Default exports only where Next.js requires them (`page`, `layout`, `route`, `manifest`).
- Hooks: `useCamelCase.ts`. Stores: `camelCaseStore` or `store/<name>.ts`. Types/interfaces: `PascalCase`. Constants: `SCREAMING_SNAKE_CASE`.
- Folders: lowercase / kebab-case. CSS variables: `--rn-*` (semantic), `--fl-*` (Fluent), `--md-*` (Material).
- Event handlers `handleXxx`; boolean props/vars `isXxx`, `hasXxx`.

## Size & complexity limits
- Component file ≤ **200 lines**; function ≤ **40 lines**; props ≤ **8**. Split when exceeded.
- No duplicated markup between `XView` and `XApp`: `XApp` wraps `XView`.
- No magic numbers: sizes, durations, z-index, breakpoints come from tokens or `src/lib/constants.ts`.

## TypeScript
- `strict: true`. No `any`, no `@ts-ignore` (use `@ts-expect-error` with a reason only as a last resort).
- Export shared types from `src/data/types.ts` or next to the module. Validate external data at the boundary.
- New files are `.ts` / `.tsx`. Legacy `.jsx` stays as is.

## Imports
- Alias: `@/*` → `./src/*`. No deep relative paths (`../../../`).
- Order: react/next → third-party → `@/` modules → relative → styles. No circular imports.
- Do not import from `src/components/**` (legacy) in new code, except via an explicit, approved wrapper.

## Quality
- No `console.log` in committed code. No commented-out code. No TODO without an entry in `docs/OPEN_ITEMS.md`.
- Comments explain WHY, not WHAT. Public APIs (store actions, `notch.show`) get short JSDoc.
- Add a dependency only if listed in `docs/PRD.md §11.2`; otherwise ask first.
- Format only the files you create (project Prettier config); never reformat existing files.
