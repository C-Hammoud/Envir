import type { HeroSection as HeroModel } from '@/types/content';

type Props = { section: HeroModel };

export function HeroSectionView({ section }: Props) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-white via-slate-50 to-slate-100/90"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(13,148,136,0.08)_1px,transparent_1px),linear-gradient(rgba(13,148,136,0.08)_1px,transparent_1px)] [background-size:64px_64px] hero-bg-motion opacity-60"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        {section.eyebrow ? (
          <p className="animate-fade-up hero-stagger-1 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            {section.eyebrow}
          </p>
        ) : null}
        <h1 className="animate-fade-up hero-stagger-2 font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          {section.headline}
        </h1>
        {section.subheadline ? (
          <p className="animate-fade-up hero-stagger-3 mt-6 max-w-2xl text-lg text-slate-600">{section.subheadline}</p>
        ) : null}
        <div className="animate-fade-up hero-stagger-4 mt-10 flex flex-wrap gap-4">
          {section.primaryCta ? (
            <a
              href={section.primaryCta.href}
              className="inline-flex items-center justify-center rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              {section.primaryCta.label}
            </a>
          ) : null}
          {section.secondaryCta ? (
            <a
              href={section.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-400 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              {section.secondaryCta.label}
            </a>
          ) : null}
        </div>
        {section.metrics && section.metrics.length > 0 ? (
          <dl className="animate-fade-up hero-stagger-5 mt-16 grid gap-6 border-t border-slate-200 pt-10 sm:grid-cols-3">
            {section.metrics.map((m) => (
              <div key={m.label} className="border-l-2 border-teal-500 pl-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">{m.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-slate-900">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
