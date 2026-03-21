import type { IntroductorySection as IntroModel } from '@/types/content';

type Props = { section: IntroModel };

export function IntroductorySectionView({ section }: Props) {
  return (
    <section id="intro" className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
            <p className="mt-6 text-lg font-medium text-slate-800">{section.lead}</p>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>
          {section.highlights && section.highlights.length > 0 ? (
            <ul className="space-y-3 rounded-xl border border-dashed border-teal-300/60 bg-teal-50/50 p-6 shadow-sm">
              {section.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
