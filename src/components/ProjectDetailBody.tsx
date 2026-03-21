import { publicUrl } from '@/lib/publicUrl';
import type { ProjectItem } from '@/types/content';

type Props = {
  item: ProjectItem;
  titleId?: string;
};

export function ProjectDetailBody({ item, titleId }: Props) {
  const d = item.details;
  const description = d?.description?.trim() ?? '';
  const gallery = d?.images?.filter(Boolean) ?? [];

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
        <h1
          id={titleId}
          className="font-display text-xl font-semibold text-slate-900 sm:text-2xl"
        >
          {item.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{item.sector ?? 'Project'}</p>
      </div>
      <div className="space-y-6 px-5 py-6 sm:px-6">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {item.sector ? (
            <div>
              <dt className="text-slate-500">Sector</dt>
              <dd className="text-slate-800">{item.sector}</dd>
            </div>
          ) : null}
          {item.location ? (
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="text-slate-800">{item.location}</dd>
            </div>
          ) : null}
          {item.year ? (
            <div>
              <dt className="text-slate-500">Year</dt>
              <dd className="text-slate-800">{item.year}</dd>
            </div>
          ) : null}
          {item.scope ? (
            <div className="sm:col-span-2">
              <dt className="text-slate-500">Scope</dt>
              <dd className="text-slate-800">{item.scope}</dd>
            </div>
          ) : null}
        </dl>
        {description ? (
          <div className="space-y-3 text-slate-600">
            {description.split(/\n\n+/).map((block, i) => (
              <p key={i} className="leading-relaxed">
                {block.trim()}
              </p>
            ))}
          </div>
        ) : null}
        {gallery.length > 0 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gallery</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {gallery.map((src, i) => (
                <li key={`${src}-${i}`} className="overflow-hidden rounded-md border border-slate-200">
                  <img
                    src={publicUrl(src)}
                    alt={`${item.name} — ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
