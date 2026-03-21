import type { ProjectItem, SiteContent } from '@/types/content';

/** URL-safe segment when `item.id` is missing */
export function slugifyProjectKey(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

/** Stable id for routing (prefer JSON `id`). */
export function getProjectRouteId(item: ProjectItem, index: number): string {
  if (item.id?.trim()) return item.id.trim();
  const slug = slugifyProjectKey(item.name);
  return slug || `project-${index}`;
}

export function findProjectByRouteId(
  content: SiteContent,
  routeId: string,
): { item: ProjectItem; sectionTitle: string } | null {
  const decoded = decodeURIComponent(routeId);
  for (const s of content.sections) {
    if (s.type !== 'projects') continue;
    for (let i = 0; i < s.items.length; i++) {
      const p = s.items[i];
      if (getProjectRouteId(p, i) === decoded) {
        return { item: p, sectionTitle: s.title };
      }
    }
  }
  return null;
}
