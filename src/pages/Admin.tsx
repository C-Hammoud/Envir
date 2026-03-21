import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaEditor } from '@/admin/MetaEditor';
import { SectionEditor } from '@/admin/SectionEditor';
import { createEmptySection } from '@/admin/sectionTemplates';
import {
  DRAFT_STORAGE_KEY,
  getContentUrl,
  loadDraft,
  setPreviewActive,
} from '@/lib/content';
import type { Section, SectionType, SiteContent } from '@/types/content';
import { SECTION_TYPES } from '@/types/content';

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function Admin() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const draft = loadDraft();
        if (draft) {
          if (!cancelled) {
            setContent(draft);
            setSelectedId(draft.sections[0]?.id ?? null);
            setStatus('Loaded draft from browser storage.');
          }
          return;
        }
        const res = await fetch(getContentUrl(), { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as SiteContent;
        if (!cancelled) {
          setContent(data);
          setSelectedId(data.sections[0]?.id ?? null);
        }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'Load failed');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(() => {
    if (!content || !selectedId) return null;
    return content.sections.find((s) => s.id === selectedId) ?? null;
  }, [content, selectedId]);

  const updateSection = useCallback((next: Section) => {
    setContent((c) => {
      if (!c) return c;
      return {
        ...c,
        sections: c.sections.map((s) => (s.id === next.id ? next : s)),
      };
    });
  }, []);

  const saveDraft = useCallback(() => {
    if (!content) return;
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content));
      setStatus('Draft saved to this browser (localStorage).');
    } catch {
      setStatus('Could not save draft (storage full or blocked).');
    }
  }, [content]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setStatus('Draft cleared from browser.');
    window.location.reload();
  }, []);

  const exportFile = useCallback(() => {
    if (!content) return;
    downloadJson('content.json', content);
    setStatus('Downloaded content.json — replace public/content.json in the repo and commit.');
  }, [content]);

  const openPreview = useCallback(() => {
    if (!content) return;
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content));
    setPreviewActive(true);
    const u = new URL(import.meta.env.BASE_URL, window.location.origin);
    u.searchParams.set('preview', '1');
    window.open(u.toString(), '_blank', 'noopener,noreferrer');
  }, [content]);

  const reorder = (index: number, dir: -1 | 1) => {
    setContent((c) => {
      if (!c) return c;
      const next = [...c.sections];
      const j = index + dir;
      if (j < 0 || j >= next.length) return c;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...c, sections: next };
    });
  };

  const removeSection = (id: string) => {
    setContent((c) => {
      if (!c) return c;
      return { ...c, sections: c.sections.filter((s) => s.id !== id) };
    });
    setSelectedId((prev) => (prev === id ? null : prev));
  };

  useEffect(() => {
    if (!content?.sections.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !content.sections.some((s) => s.id === selectedId)) {
      setSelectedId(content.sections[0].id);
    }
  }, [content, selectedId]);

  const addSection = (type: SectionType) => {
    const s = createEmptySection(type);
    setContent((c) => {
      if (!c) return c;
      return { ...c, sections: [...c.sections, s] };
    });
    setSelectedId(s.id);
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-800">
        <p className="text-red-600">{loadError}</p>
        <Link className="mt-4 inline-block text-teal-700 underline" to="/">
          Back to site
        </Link>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-slate-900">Content admin</h1>
            <p className="text-sm text-slate-600">
              Edits stay in this browser until you export JSON and commit{' '}
              <code className="rounded bg-slate-100 px-1 text-slate-800">public/content.json</code>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
              onClick={saveDraft}
            >
              Save draft
            </button>
            <button
              type="button"
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              onClick={exportFile}
            >
              Export content.json
            </button>
            <button
              type="button"
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              onClick={openPreview}
            >
              Preview draft
            </button>
            <button
              type="button"
              className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 transition hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
              onClick={clearDraft}
            >
              Clear draft
            </button>
            <Link
              className="rounded-md px-3 py-2 text-sm text-slate-600 underline-offset-4 transition hover:text-teal-800 hover:underline"
              to="/"
            >
              View site
            </Link>
          </div>
        </div>
        {status ? (
          <p className="mx-auto mt-3 max-w-6xl text-sm text-slate-600" role="status">
            {status}
          </p>
        ) : null}
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Meta</h2>
            <div className="mt-4">
              <MetaEditor meta={content.meta} onChange={(meta) => setContent({ ...content, meta })} />
            </div>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Sections</h2>
            <ul className="mt-3 space-y-1">
              {content.sections.map((s, i) => (
                <li key={s.id}>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className={`flex-1 rounded px-2 py-1.5 text-left text-sm transition ${
                        selectedId === s.id
                          ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      onClick={() => setSelectedId(s.id)}
                    >
                      <span className="font-mono text-xs text-slate-500">{s.type}</span>
                      <span className="ml-2">{s.id}</span>
                    </button>
                    <button
                      type="button"
                      className="rounded px-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Move up"
                      onClick={() => reorder(i, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded px-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Move down"
                      onClick={() => reorder(i, 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded px-1 text-red-600/90 hover:bg-red-50 hover:text-red-700"
                      aria-label="Remove section"
                      onClick={() => removeSection(s.id)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <label className="text-xs text-slate-600">
                Add:
                <select
                  className="ml-2 rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm"
                  defaultValue=""
                  onChange={(e) => {
                    const v = e.target.value as SectionType;
                    if (v) addSection(v);
                    e.target.selectedIndex = 0;
                  }}
                >
                  <option value="" disabled>
                    Section type…
                  </option>
                  {SECTION_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {selected ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">{selected.type}</p>
                  <p className="font-mono text-sm text-slate-800">{selected.id}</p>
                </div>
                <label className="text-xs text-slate-600">
                  Section id
                  <input
                    className="ml-2 rounded border border-slate-200 bg-white px-2 py-1 font-mono text-sm text-slate-900 shadow-sm"
                    value={selected.id}
                    onChange={(e) => {
                      const id = e.target.value;
                      setContent((c) => {
                        if (!c) return c;
                        const sections = c.sections.map((s) =>
                          s.id === selected.id ? { ...s, id } : s,
                        );
                        return { ...c, sections };
                      });
                      setSelectedId(id);
                    }}
                  />
                </label>
              </div>
              <div className="mt-6">
                <SectionEditor section={selected} onChange={updateSection} />
              </div>
            </>
          ) : (
            <p className="text-slate-600">Select a section.</p>
          )}
        </section>
      </div>
    </div>
  );
}
