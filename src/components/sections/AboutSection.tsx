import type { AboutSection as AboutModel } from '@/types/content';

type Props = { section: AboutModel };

export function AboutSectionView({ section }: Props) {
  return (
    <section id="about" className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-6 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-8 space-y-2">
                {section.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-teal-600" aria-hidden>
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-[linear-gradient(135deg,rgba(13,148,136,0.12),transparent)] p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-full flex-col justify-between">
                <div className="font-mono text-xs text-slate-500">
                  <div>GRID_REF: ABOUT_01</div>
                  <div className="mt-2">LAYER: SERVICES_COORD</div>
                </div>
                {section.caption ? (
                  <p className="font-display text-xl font-medium text-slate-900">{section.caption}</p>
                ) : (
                  <p className="font-display text-xl font-medium text-slate-900">Engineering consultancy</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
