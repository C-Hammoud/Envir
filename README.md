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
- **Admin UI:** open [`/admin`](http://localhost:5173/admin) while developing.
  - **Save draft** — stores JSON in `localStorage` for this browser.
  - **Export content.json** — downloads the file; replace `public/content.json` in Git and commit.
  - **Preview draft** — opens the home page with `?preview=1` and loads the draft from `localStorage`.

The header **Admin** link is shown only in development (`import.meta.env.PROD === false`).

## GitHub Pages (project site)

If the site is served at `https://<user>.github.io/<repo>/`:

1. Set **`VITE_BASE=/<repo>/`** when building (e.g. in CI or a `.env` file — see [`.env.example`](.env.example)).
2. Build: `npm run build`.
3. Publish the contents of **`dist/`** (e.g. GitHub Actions `actions/upload-pages-artifact` or the **gh-pages** branch).

For a **user/org site** at `https://<user>.github.io/`, use the default base `/` (no `VITE_BASE`).

## Docs

- [docs/CONTENT_SCHEMA.md](docs/CONTENT_SCHEMA.md) — JSON fields and section types (aligned with the `docs/*.doc` source materials).

## Tech

- React 19, React Router 7, TypeScript, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite`)
