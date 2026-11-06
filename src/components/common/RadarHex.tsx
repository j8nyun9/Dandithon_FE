import type { Hexagon } from '../../types';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';

type Props = {
  values: Hexagon;
  compare?: Hexagon;
  /** 축 최대값 (참여율 %) */
  max?: number;
  tone?: 'light' | 'dark';
  labels?: boolean;
  className?: string;
};

/** 사회공헌 6유형 육각형 */
export function RadarHex({ values, compare, max = 70, tone = 'light', labels = true, className = '' }: Props) {
  const size = 300;
  const c = size / 2;
  const r = labels ? 92 : 130;
  const pt = (i: number, v: number) => {
    const a = ((Math.PI * 2) / 6) * i - Math.PI / 2;
    const d = (Math.min(v, max) / max) * r;
    return [c + Math.cos(a) * d, c + Math.sin(a) * d] as const;
  };
  const poly = (h: Hexagon) => CONTRIBUTION_TYPES.map((t, i) => pt(i, h[t.key]).join(',')).join(' ');
  const ring = (f: number) => CONTRIBUTION_TYPES.map((_, i) => pt(i, max * f).join(',')).join(' ');

  const dark = tone === 'dark';
  const grid = dark ? 'stroke-paper/20' : 'stroke-gray-200';
  const label = dark ? 'fill-paper/80' : 'fill-gray-600';

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label="사회공헌 유형별 참여 육각형">
      {[0.25, 0.5, 0.75, 1].map(f => (
        <polygon key={f} points={ring(f)} className={`fill-none ${grid}`} strokeWidth="1" />
      ))}
      {CONTRIBUTION_TYPES.map((_, i) => {
        const [x, y] = pt(i, max);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} className={grid} strokeWidth="1" />;
      })}
      {compare && (
        <polygon
          points={poly(compare)}
          className={dark ? 'fill-none stroke-paper/50' : 'fill-none stroke-gray-400'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      )}
      <polygon
        points={poly(values)}
        className={dark ? 'fill-accent/35 stroke-accent' : 'fill-primary/20 stroke-primary'}
        strokeWidth="2"
      />
      {CONTRIBUTION_TYPES.map((t, i) => {
        const [x, y] = pt(i, values[t.key]);
        return <circle key={t.key} cx={x} cy={y} r="3.5" className={dark ? 'fill-accent' : 'fill-primary'} />;
      })}
      {labels &&
        CONTRIBUTION_TYPES.map((t, i) => {
          const [x, y] = pt(i, max * 1.32);
          return (
            <text key={t.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={`${label} text-[11px]`}>
              <tspan x={x}>{t.label}</tspan>
              <tspan x={x} dy="14" className={`font-bold ${dark ? 'fill-paper' : 'fill-primary'}`}>
                {Math.round(values[t.key])}%
              </tspan>
            </text>
          );
        })}
    </svg>
  );
}
