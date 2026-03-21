import { useState } from 'react';
import { ProjectDetailCard } from '@/components/ProjectDetailCard';
import { publicUrl } from '@/lib/publicUrl';
import type { ProjectItem, ProjectsSection as ProjectsModel } from '@/types/content';

type Props = { section: ProjectsModel };

function projectKey(p: ProjectItem, index: number): string {
  return p.id ?? `project-${index}-${p.name}`;
}

function ProjectCard({
  item,
  onOpenDetails,
}: {
  item: ProjectItem;
  onOpenDetails: (item: ProjectItem) => void;
}) {
  const hasDetails = item.details != null;

  const cover = item.image?.trim();

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
        {cover ? (
          <img
            src={publicUrl(cover)}
            alt=""
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(13,148,136,0.12),transparent)]"
            aria-hidden
          >
            <span className="font-mono text-xs text-slate-500">NO IMAGE</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/50 to-transparent px-4 pb-3 pt-10">
          <div className="text-xs font-medium uppercase tracking-wider text-teal-300">
            {item.sector ?? 'Project'}
          </div>
          <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <dl className="space-y-2 text-sm text-slate-600">
          {item.location ? (
            <div className="flex gap-2">
              <dt className="text-slate-500">Location</dt>
              <dd className="text-slate-800">{item.location}</dd>
            </div>
          ) : null}
          {item.scope ? (
            <div>
              <dt className="text-slate-500">Scope</dt>
              <dd className="mt-0.5 text-slate-700">{item.scope}</dd>
            </div>
          ) : null}
          {item.year ? (
            <div className="flex gap-2">
              <dt className="text-slate-500">Year</dt>
              <dd>{item.year}</dd>
            </div>
          ) : null}
        </dl>
        {hasDetails ? (
          <div className="mt-5">
            <button
              type="button"
              className="w-full rounded-md border border-teal-200 bg-teal-50 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
              onClick={() => onOpenDetails(item)}
            >
              View details
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectsSectionView({ section }: Props) {
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
          {section.subtitle ? <p className="mt-4 text-slate-600">{section.subtitle}</p> : null}
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((p, i) => (
            <ProjectCard key={projectKey(p, i)} item={p} onOpenDetails={setActive} />
          ))}
        </div>
      </div>
      {active ? <ProjectDetailCard item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
