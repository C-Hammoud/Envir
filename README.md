# Envir Consultancy — JSON-driven landing

React (Vite) site for **Envir Consultancy**: content comes from [`public/content.json`](public/content.json). Styling uses Tailwind CSS v4 with an engineering-style layout (grid, blueprint accents, teal accent).

## Scripts

| Command | Description |
|--------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (http://localhost:5173) |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Preview the production build locally |

## Content workflow

- **Published content:** edit `public/content.json` and redeploy (or replace `content.json` on the host without rebuilding if your host allows).
- **Admin UI:** not linked from the main site — open **`/admin`** in the address bar (e.g. `https://yoursite.github.io/repo/admin` on GitHub Pages).
  - **Save draft** — stores JSON in `localStorage` for this browser.
  - **Export content.json** — downloads the file; replace `public/content.json` in Git and commit.
  - **Preview draft** — opens the home page with `?preview=1` and loads the draft from `localStorage`.

## GitHub Pages (project site)

1. In [`vite.config.ts`](vite.config.ts), set **`base`** to `/<your-repo>/` (trailing slash). This repo uses **`/Envir/`**; use **`'/'`** if the site is at `https://<user>.github.io/` with no repo path.
2. **`npm run build`** copies **`index.html` → `404.html`** so direct URLs like **`/admin`** work on GitHub Pages.
3. Publish **`dist/`** (e.g. `npm run deploy` / `gh-pages`).

## Docs

- [docs/CONTENT_SCHEMA.md](docs/CONTENT_SCHEMA.md) — JSON fields and section types (aligned with the `docs/*.doc` source materials).

## Tech

- React 19, React Router 7, TypeScript, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite`)
