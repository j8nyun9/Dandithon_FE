import type { ReactNode } from 'react';

/** 서브 페이지 상단 남색 띠 */
export function PageHeader({ eyebrow, title, desc, right }: { eyebrow: string; title: string; desc?: string; right?: ReactNode }) {
  return (
    <section className="navy-texture text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs tracking-[0.3em] text-paper/60">{eyebrow}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">{title}</h1>
          {desc && <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/75">{desc}</p>}
        </div>
        {right}
      </div>
    </section>
  );
}

export const container = 'mx-auto max-w-6xl px-6';

