import type { Section } from '@/types/content';

type Props = {
  section: Section;
  onChange: (next: Section) => void;
};

function label(id: string, text: string) {
  return (
    <label htmlFor={id} className="block text-xs font-medium text-slate-600">
      {text}
    </label>
  );
}

function inputClass() {
  return 'mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20';
}

export function SectionEditor({ section, onChange }: Props) {
  switch (section.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          {label('f-eyebrow', 'Eyebrow')}
          <input
            id="f-eyebrow"
            className={inputClass()}
            value={section.eyebrow ?? ''}
            onChange={(e) => onChange({ ...section, eyebrow: e.target.value })}
          />
          {label('f-headline', 'Headline')}
          <input
            id="f-headline"
            className={inputClass()}
            value={section.headline}
            onChange={(e) => onChange({ ...section, headline: e.target.value })}
          />
          {label('f-sub', 'Subheadline')}
          <textarea
            id="f-sub"
            rows={3}
            className={inputClass()}
            value={section.subheadline ?? ''}
            onChange={(e) => onChange({ ...section, subheadline: e.target.value })}
          />
          {label('f-met', 'Metrics (one per line: Label | Value)')}
          <textarea
            id="f-met"
            rows={3}
            className={inputClass()}
            value={(section.metrics ?? []).map((m) => `${m.label} | ${m.value}`).join('\n')}
            onChange={(e) => {
              const lines = e.target.value.split('\n').map((l) => l.trim());
              const metrics = lines
                .filter(Boolean)
                .map((line) => {
                  const [a, ...rest] = line.split('|');
                  const label = (a ?? '').trim();
                  const value = rest.join('|').trim();
                  return { label, value };
                })
                .filter((m) => m.label && m.value);
              onChange({ ...section, metrics });
            }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              {label('f-pcta', 'Primary CTA label')}
              <input
                id="f-pcta"
                className={inputClass()}
                value={section.primaryCta?.label ?? ''}
                onChange={(e) =>
                  onChange({
                    ...section,
                    primaryCta: { label: e.target.value, href: section.primaryCta?.href ?? '#' },
                  })
                }
              />
            </div>
            <div>
              {label('f-pctah', 'Primary CTA href')}
              <input
                id="f-pctah"
                className={inputClass()}
                value={section.primaryCta?.href ?? ''}
                onChange={(e) =>
                  onChange({
                    ...section,
                    primaryCta: { label: section.primaryCta?.label ?? '', href: e.target.value },
                  })
                }
              />
            </div>
            <div>
              {label('f-scta', 'Secondary CTA label')}
              <input
                id="f-scta"
                className={inputClass()}
                value={section.secondaryCta?.label ?? ''}
                onChange={(e) =>
                  onChange({
                    ...section,
                    secondaryCta: { label: e.target.value, href: section.secondaryCta?.href ?? '#' },
                  })
                }
              />
            </div>
            <div>
              {label('f-sctah', 'Secondary CTA href')}
              <input
                id="f-sctah"
                className={inputClass()}
                value={section.secondaryCta?.href ?? ''}
                onChange={(e) =>
                  onChange({
                    ...section,
                    secondaryCta: { label: section.secondaryCta?.label ?? '', href: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      );
    case 'visionMission':
      return (
        <div className="space-y-4">
          {label('vm-t', 'Section title')}
          <input
            id="vm-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('vm-vt', 'Vision title')}
          <input
            id="vm-vt"
            className={inputClass()}
            value={section.visionTitle}
            onChange={(e) => onChange({ ...section, visionTitle: e.target.value })}
          />
          {label('vm-vb', 'Vision body')}
          <textarea
            id="vm-vb"
            rows={4}
            className={inputClass()}
            value={section.visionBody}
            onChange={(e) => onChange({ ...section, visionBody: e.target.value })}
          />
          {label('vm-mt', 'Mission title')}
          <input
            id="vm-mt"
            className={inputClass()}
            value={section.missionTitle}
            onChange={(e) => onChange({ ...section, missionTitle: e.target.value })}
          />
          {label('vm-mb', 'Mission body')}
          <textarea
            id="vm-mb"
            rows={4}
            className={inputClass()}
            value={section.missionBody}
            onChange={(e) => onChange({ ...section, missionBody: e.target.value })}
          />
        </div>
      );
    case 'introductory':
      return (
        <div className="space-y-4">
          {label('in-t', 'Title')}
          <input
            id="in-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('in-l', 'Lead')}
          <textarea
            id="in-l"
            rows={3}
            className={inputClass()}
            value={section.lead}
            onChange={(e) => onChange({ ...section, lead: e.target.value })}
          />
          {label('in-p', 'Paragraphs (one per line)')}
          <textarea
            id="in-p"
            rows={5}
            className={inputClass()}
            value={section.paragraphs.join('\n')}
            onChange={(e) =>
              onChange({
                ...section,
                paragraphs: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
          />
          {label('in-h', 'Highlights (one per line)')}
          <textarea
            id="in-h"
            rows={4}
            className={inputClass()}
            value={(section.highlights ?? []).join('\n')}
            onChange={(e) =>
              onChange({
                ...section,
                highlights: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
          />
        </div>
      );
    case 'services':
      return (
        <div className="space-y-4">
          {label('sv-t', 'Title')}
          <input
            id="sv-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('sv-s', 'Subtitle')}
          <input
            id="sv-s"
            className={inputClass()}
            value={section.subtitle ?? ''}
            onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          />
          {section.items.map((item, i) => (
            <div key={i} className="rounded-md border border-slate-200 p-3">
              <p className="text-xs text-slate-600">Item {i + 1}</p>
              {label(`sv-i${i}-t`, 'Title')}
              <input
                id={`sv-i${i}-t`}
                className={inputClass()}
                value={item.title}
                onChange={(e) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], title: e.target.value };
                  onChange({ ...section, items });
                }}
              />
              {label(`sv-i${i}-d`, 'Description')}
              <textarea
                id={`sv-i${i}-d`}
                rows={2}
                className={inputClass()}
                value={item.description}
                onChange={(e) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], description: e.target.value };
                  onChange({ ...section, items });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-teal-400 hover:underline"
            onClick={() =>
              onChange({
                ...section,
                items: [...section.items, { title: 'New service', description: '' }],
              })
            }
          >
            + Add service
          </button>
        </div>
      );
    case 'about':
      return (
        <div className="space-y-4">
          {label('ab-t', 'Title')}
          <input
            id="ab-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('ab-b', 'Body paragraphs (one per line)')}
          <textarea
            id="ab-b"
            rows={5}
            className={inputClass()}
            value={section.body.join('\n')}
            onChange={(e) =>
              onChange({
                ...section,
                body: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
          />
          {label('ab-bl', 'Bullets (one per line)')}
          <textarea
            id="ab-bl"
            rows={4}
            className={inputClass()}
            value={(section.bullets ?? []).join('\n')}
            onChange={(e) =>
              onChange({
                ...section,
                bullets: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
          />
          {label('ab-cap', 'Caption (about panel)')}
          <input
            id="ab-cap"
            className={inputClass()}
            value={section.caption ?? ''}
            onChange={(e) => onChange({ ...section, caption: e.target.value })}
          />
        </div>
      );
    case 'projects':
      return (
        <div className="space-y-4">
          {label('pr-t', 'Title')}
          <input
            id="pr-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('pr-s', 'Subtitle')}
          <input
            id="pr-s"
            className={inputClass()}
            value={section.subtitle ?? ''}
            onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          />
          {section.items.map((item, i) => {
            const hasDetails = item.details !== undefined && item.details !== null;
            return (
              <div key={i} className="rounded-md border border-slate-200 p-3">
                <p className="text-xs text-slate-600">Project {i + 1}</p>
                <div className="mt-2">
                  {label(`pr-${i}-id`, 'Stable id (optional, for keys)')}
                  <input
                    id={`pr-${i}-id`}
                    className={inputClass()}
                    value={item.id ?? ''}
                    onChange={(e) => {
                      const items = [...section.items];
                      const v = e.target.value.trim();
                      items[i] = { ...items[i], id: v || undefined };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-name`, 'name')}
                  <input
                    id={`pr-${i}-name`}
                    className={inputClass()}
                    value={item.name}
                    onChange={(e) => {
                      const items = [...section.items];
                      items[i] = { ...items[i], name: e.target.value };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-sector`, 'sector')}
                  <input
                    id={`pr-${i}-sector`}
                    className={inputClass()}
                    value={item.sector ?? ''}
                    onChange={(e) => {
                      const items = [...section.items];
                      items[i] = { ...items[i], sector: e.target.value };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-location`, 'location')}
                  <input
                    id={`pr-${i}-location`}
                    className={inputClass()}
                    value={item.location ?? ''}
                    onChange={(e) => {
                      const items = [...section.items];
                      items[i] = { ...items[i], location: e.target.value };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-scope`, 'scope')}
                  <input
                    id={`pr-${i}-scope`}
                    className={inputClass()}
                    value={item.scope ?? ''}
                    onChange={(e) => {
                      const items = [...section.items];
                      items[i] = { ...items[i], scope: e.target.value };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-year`, 'year')}
                  <input
                    id={`pr-${i}-year`}
                    className={inputClass()}
                    value={item.year ?? ''}
                    onChange={(e) => {
                      const items = [...section.items];
                      items[i] = { ...items[i], year: e.target.value };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-2">
                  {label(`pr-${i}-img`, 'Card image (path from site root, e.g. /assets/projects/cover.jpg)')}
                  <input
                    id={`pr-${i}-img`}
                    className={inputClass()}
                    value={item.image ?? ''}
                    placeholder="/assets/projects/photo.jpg"
                    onChange={(e) => {
                      const items = [...section.items];
                      const v = e.target.value.trim();
                      items[i] = { ...items[i], image: v || undefined };
                      onChange({ ...section, items });
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    id={`pr-${i}-details`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 bg-white text-teal-600 focus:ring-teal-500/40"
                    checked={hasDetails}
                    onChange={(e) => {
                      const items = [...section.items];
                      if (e.target.checked) {
                        items[i] = {
                          ...items[i],
                          details: { description: '', images: [] },
                        };
                      } else {
                        const copy = { ...items[i] };
                        delete copy.details;
                        items[i] = copy;
                      }
                      onChange({ ...section, items });
                    }}
                  />
                  <label htmlFor={`pr-${i}-details`} className="text-sm text-slate-700">
                    Include details dialog (metadata + description + gallery)
                  </label>
                </div>
                {hasDetails ? (
                  <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                    {label(`pr-${i}-desc`, 'Details — description')}
                    <textarea
                      id={`pr-${i}-desc`}
                      rows={5}
                      className={inputClass()}
                      value={item.details?.description ?? ''}
                      onChange={(e) => {
                        const items = [...section.items];
                        items[i] = {
                          ...items[i],
                          details: {
                            ...items[i].details,
                            description: e.target.value,
                            images: items[i].details?.images ?? [],
                          },
                        };
                        onChange({ ...section, items });
                      }}
                    />
                    {label(`pr-${i}-gal`, 'Details — gallery image URLs (one per line, under /assets/projects/…)')}
                    <textarea
                      id={`pr-${i}-gal`}
                      rows={4}
                      className={`${inputClass()} font-mono text-xs`}
                      value={(item.details?.images ?? []).join('\n')}
                      placeholder={'/assets/projects/site-1.jpg\n/assets/projects/site-2.jpg'}
                      onChange={(e) => {
                        const items = [...section.items];
                        const images = e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        items[i] = {
                          ...items[i],
                          details: {
                            ...items[i].details,
                            description: items[i].details?.description ?? '',
                            images,
                          },
                        };
                        onChange({ ...section, items });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
          <button
            type="button"
            className="text-sm text-teal-400 hover:underline"
            onClick={() =>
              onChange({
                ...section,
                items: [
                  ...section.items,
                  {
                    name: 'New project',
                    image: '/assets/projects/placeholder-cover.svg',
                  },
                ],
              })
            }
          >
            + Add project
          </button>
        </div>
      );
    case 'contact':
      return (
        <div className="space-y-4">
          {label('ct-t', 'Title')}
          <input
            id="ct-t"
            className={inputClass()}
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {label('ct-s', 'Subtitle')}
          <input
            id="ct-s"
            className={inputClass()}
            value={section.subtitle ?? ''}
            onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          />
          {label('ct-e', 'Email')}
          <input
            id="ct-e"
            className={inputClass()}
            value={section.email ?? ''}
            onChange={(e) => onChange({ ...section, email: e.target.value })}
          />
          {label('ct-p', 'Phone')}
          <input
            id="ct-p"
            className={inputClass()}
            value={section.phone ?? ''}
            onChange={(e) => onChange({ ...section, phone: e.target.value })}
          />
          {label('ct-a', 'Address')}
          <input
            id="ct-a"
            className={inputClass()}
            value={section.address ?? ''}
            onChange={(e) => onChange({ ...section, address: e.target.value })}
          />
        </div>
      );
    case 'footer':
      return (
        <div className="space-y-4">
          {label('ft-tg', 'Tagline')}
          <input
            id="ft-tg"
            className={inputClass()}
            value={section.tagline ?? ''}
            onChange={(e) => onChange({ ...section, tagline: e.target.value })}
          />
          {label('ft-c', 'Copyright')}
          <input
            id="ft-c"
            className={inputClass()}
            value={section.copyright}
            onChange={(e) => onChange({ ...section, copyright: e.target.value })}
          />
        </div>
      );
    default: {
      const _x: never = section;
      return <p className="text-sm text-red-600">Unknown section {JSON.stringify(_x)}</p>;
    }
  }
}
