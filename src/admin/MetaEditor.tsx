import { useEffect, useState } from 'react';
import type { Meta } from '@/types/content';

type Props = {
  meta: Meta;
  onChange: (next: Meta) => void;
};

function inputClass() {
  return 'mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20';
}

export function MetaEditor({ meta, onChange }: Props) {
  const [navRaw, setNavRaw] = useState(() => JSON.stringify(meta.nav ?? [], null, 2));
  const [navError, setNavError] = useState(false);

  useEffect(() => {
    setNavRaw(JSON.stringify(meta.nav ?? [], null, 2));
    setNavError(false);
  }, [meta.nav]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="m-sn" className="block text-xs font-medium text-slate-600">
          Site name
        </label>
        <input
          id="m-sn"
          className={inputClass()}
          value={meta.siteName}
          onChange={(e) => onChange({ ...meta, siteName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-t" className="block text-xs font-medium text-slate-600">
          Page title (browser tab)
        </label>
        <input
          id="m-t"
          className={inputClass()}
          value={meta.title}
          onChange={(e) => onChange({ ...meta, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-d" className="block text-xs font-medium text-slate-600">
          Meta description
        </label>
        <textarea
          id="m-d"
          rows={2}
          className={inputClass()}
          value={meta.description ?? ''}
          onChange={(e) => onChange({ ...meta, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-lg" className="block text-xs font-medium text-slate-600">
          Logo text
        </label>
        <input
          id="m-lg"
          className={inputClass()}
          value={meta.logoText ?? ''}
          onChange={(e) => onChange({ ...meta, logoText: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-nav" className="block text-xs font-medium text-slate-600">
          Nav links (JSON array of {`{ "label", "href" }`})
        </label>
        <textarea
          id="m-nav"
          rows={6}
          className={`${inputClass()} font-mono text-xs ${navError ? 'border-amber-400' : ''}`}
          value={navRaw}
          onChange={(e) => {
            const v = e.target.value;
            setNavRaw(v);
            try {
              const parsed = JSON.parse(v) as Meta['nav'];
              if (!Array.isArray(parsed)) throw new Error('not array');
              onChange({ ...meta, nav: parsed });
              setNavError(false);
            } catch {
              setNavError(true);
            }
          }}
        />
        {navError ? <p className="text-xs text-amber-700">Fix JSON to save nav to content.</p> : null}
      </div>
    </div>
  );
}
