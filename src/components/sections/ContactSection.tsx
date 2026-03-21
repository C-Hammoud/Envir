import type { ContactSection as ContactModel } from '@/types/content';

type Props = { section: ContactModel };

export function ContactSectionView({ section }: Props) {
  const labels = section.formLabels;

  return (
    <section id="contact" className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
            {section.subtitle ? <p className="mt-4 text-slate-600">{section.subtitle}</p> : null}
            <dl className="mt-10 space-y-4 text-sm">
              {section.email ? (
                <div>
                  <dt className="text-slate-500">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${section.email}`}
                      className="text-teal-700 hover:text-teal-800 focus:outline-none focus-visible:underline"
                    >
                      {section.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {section.phone ? (
                <div>
                  <dt className="text-slate-500">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${section.phone.replace(/\s/g, '')}`}
                      className="text-slate-800 focus:outline-none focus-visible:underline"
                    >
                      {section.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {section.address ? (
                <div>
                  <dt className="text-slate-500">Address</dt>
                  <dd className="text-slate-700">{section.address}</dd>
                </div>
              ) : null}
            </dl>
          </div>
          <form
            className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            aria-label="Contact form"
          >
            <p className="text-xs text-slate-500">
              Static site — this form does not submit to a server. Use email or connect a form service later.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="c-name" className="text-sm text-slate-700">
                  {labels?.name ?? 'Name'}
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm text-slate-700">
                  {labels?.email ?? 'Email'}
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="text-sm text-slate-700">
                  {labels?.message ?? 'Message'}
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-teal-500 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                {labels?.submit ?? 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
