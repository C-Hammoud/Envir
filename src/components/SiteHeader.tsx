import { Link } from 'react-router-dom';
import type { Meta } from '@/types/content';

type Props = {
  meta: Meta;
};

export function SiteHeader({ meta }: Props) {
  const links = meta.nav ?? [];
  const showAdminLink = !import.meta.env.PROD;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-shadow duration-300 hover:shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          {meta.logoText ?? meta.siteName}
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            {links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-teal-700 focus:outline-none focus-visible:text-teal-800 focus-visible:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {showAdminLink ? (
          <Link
            to="/admin"
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 md:text-sm"
          >
            Admin
          </Link>
        ) : null}
      </div>
    </header>
  );
}
