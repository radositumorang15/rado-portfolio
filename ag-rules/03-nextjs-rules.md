---
trigger: always_on
description: Next.js 16 App Router rules - server/client boundaries, hydration, static export, Netlify.
---

# 03 — Next.js rules (see `docs/PRD.md §11.4` and `docs/DESIGN.md §10`)

## Rendering model
- `app/layout.tsx` and `app/classic/**` are **Server Components** (SSG). They must not use hooks or browser APIs.
- The OS (`OSRoot` and everything under `src/os/**`) is a **Client Component tree** (`"use client"` at the top of `OSRoot` and every file using hooks/events) and is loaded with `dynamic(() => import(...), { ssr: false })` with a fixed-size boot/splash fallback.
- Every app has `XView.tsx` (no hooks, no browser APIs; usable from the server) and `XApp.tsx` (`"use client"`, window/notch integration).
- Do not add `"use client"` to a file "just in case". Add it only when needed.

## Hydration (zero warnings allowed)
1. `window`, `document`, `localStorage`, `matchMedia`, `navigator`, `Date.now()`, `new Date()`, `Math.random()` are used ONLY inside `useEffect`/event handlers or in `ssr: false` components.
2. Theme and shell (`data-theme`, `data-shell`) are set by the inline `<head>` script in `app/layout.tsx` (see PRD §11.4f). `<html>` has `suppressHydrationWarning`.
3. Clock, durations ("12 mo"), greetings render after mount with a same-size placeholder (CLS = 0).
4. Browser-only libraries (three.js / react-three-fiber, `react-rnd`, `pdfjs-dist`) are loaded with `dynamic(..., { ssr: false })` and a fixed-size skeleton.
5. Hash routes (`#about`, `#projects/sigizi`) are read client-side only (`hashchange`). Real paths (`/classic`, `/classic/projects/[slug]`) use `generateStaticParams`.

## Static export (v1)
- `next.config.mjs`: `output: 'export'`, `images: { unoptimized: true }`. Do NOT add Route Handlers, Server Actions, middleware, or `getServerSideProps`.
- Contact form posts to Formspree (client-side `fetch`). Do not use Netlify Forms.
- If a feature needs a server (AI Assistant), STOP and ask; the user must approve lifting `output: 'export'`.

## Metadata & SEO
- Use the Metadata API (`export const metadata` / `generateMetadata`) per route. Add JSON-LD `Person`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, static `opengraph-image.png`.
- All CV content must exist in the initial HTML of `/classic`.

## Assets
- Fonts: `next/font` (`--font-inter`, `--font-roboto-flex`, `--font-cascadia`). No `<link>` to Google Fonts.
- Images: `next/image` with explicit dimensions or `fill` + sized container. Wallpaper uses `priority`.
- Environment variables: `NEXT_PUBLIC_*` only for values safe to expose. Never commit `.env*`.

## Netlify
- Do not edit `netlify.toml` / `_redirects` without approval. Propose changes: branch-specific build command `npm run build:next`, publish dir `out`, Node ≥ 20.9, no SPA fallback rule `/* /index.html 200`.
- Coexistence: legacy `npm run build` (Vite) stays intact until `RETIRE LEGACY`.

## Performance
- Initial JS ≤ 200 KB gzip; each app chunk ≤ 60 KB gzip (lazy via `dynamic`).
- Animate only `transform`, `opacity`, `clip-path`. Max 4 simultaneous `backdrop-filter` elements.
