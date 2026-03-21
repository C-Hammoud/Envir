import { useEffect, useId, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProjectDetailBody } from '@/components/ProjectDetailBody';
import {
  loadDraft,
  loadPublished,
  shouldUseDraftPreview,
} from '@/lib/content';
import { findProjectByRouteId } from '@/lib/projectRoutes';
import type { SiteContent } from '@/types/content';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const titleId = useId();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let data: SiteContent;
        if (shouldUseDraftPreview()) {
          const draft = loadDraft();
          if (draft) {
            data = draft;
          } else {
            data = await loadPublished();
          }
        } else {
          data = await loadPublished();
        }
        if (!cancelled) setContent(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const resolved =
    content && projectId ? findProjectByRouteId(content, projectId) : null;

  useEffect(() => {
    if (!resolved?.item.name) return;
    document.title = `${resolved.item.name} · ${content?.meta.siteName ?? 'Project'}`;
  }, [resolved?.item.name, content?.meta.siteName]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <p className="text-red-600">{error}</p>
        <Link className="mt-4 text-teal-700 underline" to="/">
          Home
        </Link>
      </div>
    );
  }

  if (!content || !projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-4 py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            ← Back
          </button>
        </header>
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <p className="text-slate-700">Project not found.</p>
          <Link className="mt-4 inline-block text-teal-700 underline" to="/">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  const { item } = resolved;

  if (!item.details) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-4 py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            ← Back
          </button>
        </header>
        <p className="px-4 py-8 text-center text-slate-600">No details for this project.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[padding:max(0px)]:pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate({ pathname: '/', hash: 'projects' });
          }}
          className="rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back
        </button>
        <span className="text-sm text-slate-500">Project</span>
      </header>
      <main className="mx-auto max-w-3xl overflow-hidden rounded-b-xl bg-white shadow-sm sm:my-4 sm:rounded-xl sm:border sm:border-slate-200">
        <ProjectDetailBody item={item} titleId={titleId} />
      </main>
    </div>
  );
}
