import league from '../../mocks/league.json';

/** 학기 단위 시즌: 개강 → 중간결산 → 기말 최종결산 */
export function SeasonTimeline({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { week, totalWeeks, midWeek, name } = league.season;
  const pct = (w: number) => `${(w / totalWeeks) * 100}%`;
  const dark = tone === 'dark';
  const muted = dark ? 'text-paper/60' : 'text-gray-500';
  const marks = [
    { w: 0, label: '개강', done: true },
    { w: midWeek, label: `중간결산 · ${midWeek}주`, done: week >= midWeek },
    { w: totalWeeks, label: `최종결산 · ${totalWeeks}주`, done: week >= totalWeeks },
  ];

  return (
    <div className="w-full">
      <div className={`mb-2 flex justify-between text-xs ${muted}`}>
        <span>{name}</span>
        <span className={dark ? 'font-semibold text-paper' : 'font-semibold text-primary'}>현재 {week}주차</span>
      </div>
      <div className={`relative h-2 rounded-full ${dark ? 'bg-white/15' : 'bg-gray-200'}`}>
        <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: pct(week) }} />
        {marks.map(m => (
          <span
            key={m.label}
            className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              m.done ? 'border-accent bg-accent' : dark ? 'border-paper/40 bg-primary' : 'border-gray-300 bg-white'
            }`}
            style={{ left: pct(m.w) }}
          />
        ))}
      </div>
      <div className={`relative mt-2 h-4 text-xs ${muted}`}>
        {marks.map((m, i) => (
          <span
            key={m.label}
            className={`absolute whitespace-nowrap ${i === 0 ? '' : i === marks.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
            style={{ left: pct(m.w) }}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
