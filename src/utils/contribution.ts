import type { ContributionType, Hexagon, School } from '../types';

export const CONTRIBUTION_TYPES: { key: ContributionType; label: string; award: string }[] = [
  { key: 'volunteer', label: '자원봉사', award: '자원봉사상' },
  { key: 'mentoring', label: '교육·멘토링', award: '멘토링상' },
  { key: 'community', label: '지역사회 기여', award: '지역사회상' },
  { key: 'sharing', label: '나눔', award: '나눔상' },
  { key: 'scholarship', label: '장학형 사회참여', award: '장학참여상' },
  { key: 'blood', label: '헌혈', award: '생명나눔상' },
];

export const typeLabel = (k: ContributionType) => CONTRIBUTION_TYPES.find(t => t.key === k)!.label;

/** "자원봉사 + 지역사회 기여 (½씩)" */
export const typesText = (types: ContributionType[]) =>
  types.length > 1 ? `${types.map(typeLabel).join(' + ')} (½씩)` : typeLabel(types[0]);

export const leagueAverage = (schools: School[]): Hexagon =>
  Object.fromEntries(
    CONTRIBUTION_TYPES.map(({ key }) => [key, schools.reduce((s, x) => s + x.hexagon[key], 0) / schools.length]),
  ) as Hexagon;

export const strongestType = (h: Hexagon) =>
  CONTRIBUTION_TYPES.reduce((best, t) => (h[t.key] > h[best.key] ? t : best));
