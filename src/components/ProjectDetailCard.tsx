import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { ProjectDetailBody } from '@/components/ProjectDetailBody';
import type { ProjectItem } from '@/types/content';

type Props = {
  item: ProjectItem;
  onClose: () => void;
};

export function ProjectDetailCard({ item, onClose }: Props) {
  const titleId = useId();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px] transition-opacity animate-backdrop-in"
        aria-label="Close project details"
        onClick={onClose}
      />
      <div
        className="animate-card-modal relative z-[1] flex max-h-[min(92dvh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-slate-200/90 bg-white shadow-2xl sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="absolute right-2 top-2 z-10 rounded-lg p-2 text-xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 sm:right-3 sm:top-3"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [&>div:first-child]:pr-14">
          <ProjectDetailBody item={item} titleId={titleId} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
