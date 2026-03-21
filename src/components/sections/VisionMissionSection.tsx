import type { VisionMissionSection as VMModel } from '@/types/content';

type Props = { section: VMModel };

export function VisionMissionSectionView({ section }: Props) {
  return (
    <section id="vision" className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition hover:border-teal-200/80 hover:shadow-md sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-700">{section.visionTitle}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{section.visionBody}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition hover:border-teal-200/80 hover:shadow-md sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-700">{section.missionTitle}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{section.missionBody}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
