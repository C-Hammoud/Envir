import type { FooterSection as FooterModel } from '@/types/content';

type Props = { section: FooterModel };

export function FooterSectionView({ section }: Props) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 border-t border-slate-200 pt-10 md:flex-row md:justify-between">
          <div>
            {section.tagline ? <p className="text-sm text-slate-600">{section.tagline}</p> : null}
            <p className="mt-2 text-xs text-slate-500">{section.copyright}</p>
          </div>
          {section.columns && section.columns.length > 0 ? (
            <div className="flex flex-wrap gap-10">
              {section.columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{col.heading}</p>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l.label + l.href}>
                        <a
                          href={l.href}
                          className="text-sm text-slate-600 transition hover:text-teal-700 focus:outline-none focus-visible:underline"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
