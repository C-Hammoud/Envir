import type { ServicesSection as ServicesModel } from '@/types/content';

type Props = { section: ServicesModel };

export function ServicesSectionView({ section }: Props) {
  return (
    <section id="services" className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
          {section.subtitle ? <p className="mt-4 text-slate-600">{section.subtitle}</p> : null}
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {section.items.map((item) => (
            <li
              key={item.title}
              className="group rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-xs font-bold text-teal-700 transition group-hover:bg-teal-100"
                  aria-hidden
                >
                  ◆
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
