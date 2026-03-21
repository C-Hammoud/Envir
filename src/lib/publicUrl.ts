/** Resolve a path served from `public/` for GitHub Pages subpath (`import.meta.env.BASE_URL`). */
export function publicUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  const withSlash = base.endsWith('/') ? base : `${base}/`;
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  return `${withSlash}${trimmed}`;
}
