import type { ContributionType, Hexagon, School } from '../types';

export const CONTRIBUTION_TYPES: { key: ContributionType; label: string; award: string; description: string }[] = [
  {key:'welfare',label:'복지·생활지원형',award:'복지·생활지원상',description:'취약계층 생활 지원, 주거환경 개선, 재난 피해 복구 및 구호'},
  {key:'education',label:'교육·상담형',award:'교육·상담상',description:'학습 지도, 멘토링, 정서적 지원'},
  {key:'healthcare',label:'보건·의료형',award:'보건·의료상',description:'의료 지원, 건강검진, 간병'},
  {key:'blood',label:'생명나눔형',award:'생명나눔상',description:'헌혈'},
  {key:'environment',label:'환경·생태형',award:'환경·생태상',description:'환경 정화, 재활용, 생태계 보호'},
  {key:'culture',label:'문화·지역사회형',award:'문화·지역사회상',description:'문화예술 활동, 지역 행사, 문화유산 보존'},
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
