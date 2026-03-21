# Site content JSON (`public/content.json`)

The live site loads **`/content.json`** at runtime (Vite copies [`public/content.json`](../public/content.json) to the build output). The TypeScript types live in [`src/types/content.ts`](../src/types/content.ts).

## Root shape

| Field | Type | Description |
|--------|------|-------------|
| `meta` | object | Site name, `<title>`, description, logo text, optional `nav` links |
| `sections` | array | Ordered page sections; each has `id`, `type`, and type-specific fields |

## Section `type` values

- `hero` — headline, CTAs, optional metrics strip
- `visionMission` — vision + mission copy (see *Vision and Mission* doc)
- `introductory` — MEP & fire introduction (see *Introductory section* docs)
- `services` — service cards (mechanical, electrical, plumbing, fire)
- `about` — about the consultancy (*About Us* doc)
- `projects` — portfolio **cards** with optional cover `image` and optional `details` dialog (*Our Projects* doc)

### `projects.items[]`

| Field | Type | Description |
|--------|------|-------------|
| `id` | string (optional) | Stable id for React keys / admin |
| `name`, `sector`, `location`, `scope`, `year` | strings | Shown on the card (and repeated in the details dialog when present) |
| `image` | string (optional) | Card cover — path from site root, e.g. `/assets/projects/cover.jpg` (files live under [`public/assets/projects/`](../public/assets/projects/)) |
| `details` | object (optional) | If present, card shows **View details** opening a dialog with all metadata, `description`, and optional `images[]` gallery (each entry is a URL path under `public/`, same pattern as `image`) |

Paragraph breaks in `details.description` can be separated with a blank line (`\n\n`).
- `contact` — contact details + static form labels
- `footer` — tagline, link columns, copyright

Source Word/PDF files in this folder are the **copy reference**; keep JSON aligned when you extract final text from those documents.

## Updating content

1. Edit [`public/content.json`](../public/content.json) in the repo, **or**
2. Use **`/admin`** in development: save draft, export `content.json`, replace `public/content.json`, commit, deploy.

The **Admin** link is hidden in production builds; open `/admin` directly on the deployed URL if needed (consider protecting that URL on the host).
