# Progress Tracker — RadoOS Migration

## Milestones

- [x] Pre-flight Git Setup (tag `pre-next-migration`, branch `next-migration`)
- [x] Dependencies installation (`next`, `zustand`, `react-rnd`, `cmdk`, `@material/material-color-utilities`, `@tailwindcss/postcss`)
- [x] Next.js config & TypeScript configuration (`next.config.mjs`, `tsconfig.json`)
- [x] Design Tokens (`tokens.css`, `fluent.css`, `m3.css`, `dock.css`)
- [x] Content Data (`src/data/*.ts`) & i18n (`src/i18n/*`)
- [x] State Management (`src/store/windows.ts`, `prefs.ts`)
- [x] Rado Notch (`src/os/notch/*` adapted from `rust-floatdock`)
- [x] Windows 11 Shell (`src/os/shells/windows/*` with Dock from `rust-floatdock`)
- [x] Android 17 Shell (`src/os/shells/android/*` with Material 3 Expressive, Home, StatusBar, QuickShade)
- [x] Content Views & Apps (`src/apps/*` with `XView.tsx` + `XApp.tsx`)
- [x] OS Root & App Router entry (`app/layout.tsx`, `app/page.tsx`, `OSRoot.tsx`)
- [x] Classic View & SEO (`app/classic/page.tsx`, `app/classic/projects/[slug]/page.tsx`, `manifest.ts`, `sitemap.ts`, `robots.ts`)
- [x] Build & Verification (`typecheck` ✅, `build:next` ✅ with static export in `out/`)
