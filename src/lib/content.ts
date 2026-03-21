import type { SiteContent } from '@/types/content';

export const DRAFT_STORAGE_KEY = 'envir-site-content-draft';
export const PREVIEW_FLAG_KEY = 'envir-preview-active';

export function getContentUrl(): string {
  const base = import.meta.env.BASE_URL;
  return `${base}content.json`;
}

export function loadDraft(): SiteContent | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

export async function loadPublished(): Promise<SiteContent> {
  const res = await fetch(getContentUrl(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load content (${res.status})`);
  return res.json() as Promise<SiteContent>;
}

export function shouldUseDraftPreview(): boolean {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('preview') === '1') return true;
  return sessionStorage.getItem(PREVIEW_FLAG_KEY) === '1';
}

export function setPreviewActive(active: boolean): void {
  if (active) sessionStorage.setItem(PREVIEW_FLAG_KEY, '1');
  else sessionStorage.removeItem(PREVIEW_FLAG_KEY);
}
