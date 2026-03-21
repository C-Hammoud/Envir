import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { SectionRenderer } from '@/components/SectionRenderer';
import { SiteHeader } from '@/components/SiteHeader';
import {
  loadDraft,
  loadPublished,
  shouldUseDraftPreview,
} from '@/lib/content';
import type { SiteContent } from '@/types/content';

export function Landing() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (shouldUseDraftPreview()) {
          const draft = loadDraft();
          if (draft) {
            if (!cancelled) {
              setContent(draft);
              setShowDraftBanner(true);
            }
            return;
          }
        }
        const data = await loadPublished();
        if (!cancelled) setContent(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load content');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!content) return;
    document.title = content.meta.title || content.meta.siteName;
    const desc = content.meta.description;
    if (desc) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
      }
      el.setAttribute('content', desc);
    }
  }, [content]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <p className="text-center text-red-600">{error}</p>
        <p className="max-w-md text-center text-sm text-slate-600">
          Ensure <code className="rounded bg-slate-200 px-1 text-slate-800">public/content.json</code> exists and the dev server is running.
        </p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="animate-pulse text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {showDraftBanner ? (
        <div
          className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900"
          role="status"
        >
          Previewing draft from browser storage — not the published JSON file.
        </div>
      ) : null}
      <SiteHeader meta={content.meta} />
      <main>
        {content.sections.map((s, i) => (
          <Reveal key={s.id} delayMs={Math.min(i * 45, 180)}>
            <SectionRenderer section={s} />
          </Reveal>
        ))}
      </main>
    </div>
  );
}
