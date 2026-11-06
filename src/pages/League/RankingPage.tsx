import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import league from '../../mocks/league.json';
import type { School } from '../../types';
import { DemoBadge } from '../../components/common/Badges';
import { PageHeader, container } from '../../components/common/PageHeader';
import { RadarHex } from '../../components/common/RadarHex';
import { SeasonTimeline } from '../../components/common/SeasonTimeline';
import { rankDelta } from '../../utils/format';
import { CONTRIBUTION_TYPES, leagueAverage, strongestType } from '../../utils/contribution';

const schools = league.schools as School[];
const avg = leagueAverage(schools);

export function Delta({ d, light = false }: { d: number; light?: boolean }) {
  if (d > 0)
    return (
      <span className="flex items-center gap-1 text-sm font-semibold text-accent">
        <TrendingUp size={16} />
        {d}
      </span>
    );
  if (d < 0)
    return (
      <span className={`flex items-center gap-1 text-sm ${light ? 'text-paper/50' : 'text-gray-400'}`}>
        <TrendingDown size={16} />
        {-d}
      </span>
    );
  return <Minus size={16} className={light ? 'text-paper/40' : 'text-gray-300'} />;
}

export function RankingPage() {
  const [selected, setSelected] = useState(league.mySchoolId);
  const sel = schools.find(s => s.id === selected)!;

  return (
    <>
      <PageHeader
        eyebrow="UNIVERSITY LEAGUE"
        title="대학 리그"
        desc="학기 단위로 겨루고, 학기 중간에 한 번 결산합니다. 얼마나 많이 했는지보다, 얼마나 많은 학생이 다양한 방식으로 함께했는지를 봅니다."
        right={
          <div className="w-full md:w-96">
            <SeasonTimeline tone="dark" />
          </div>
        }
      />

      <div className={`${container} py-16`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            인증 가능한 사회공헌 활동만 집계한 등록 시범 참가 집단의 성과입니다. 개인 순위는 집계하지 않습니다.
          </p>
          <DemoBadge />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* 순위 표 */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-6 py-4">순위</th>
                  <th className="px-4 py-4">학교</th>
                  <th className="px-4 py-4">중간결산 대비</th>
                  <th className="px-4 py-4">강점 유형</th>
                  <th className="px-6 py-4 text-right">단디 지수</th>
                </tr>
              </thead>
              <tbody>
                {schools.map(s => {
                  const mine = s.id === league.mySchoolId;
                  const active = s.id === selected;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelected(s.id)}
                      className={`cursor-pointer border-t border-gray-100 transition ${
                        active ? 'bg-paper' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className={`px-6 py-4 font-serif text-xl font-black ${s.rank <= 3 ? 'text-accent' : 'text-gray-300'}`}>
                        {s.rank}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {s.name}
                        {mine && <span className="ml-2 rounded bg-primary px-1 text-[10px] text-paper">우리 학교</span>}
                        <span className="block text-xs font-normal text-gray-400">참가자 {s.enrolled}명</span>
                      </td>
                      <td className="px-4 py-4">
                        <Delta d={rankDelta(s.rank, s.midRank)} />
                      </td>
                      <td className="px-4 py-4 text-xs text-accent-deep">{strongestType(s.hexagon).label}</td>
                      <td className="px-6 py-4 text-right text-lg font-bold text-primary">{s.dandiIndex.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 육각형 */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">사회공헌 유형별 참여율</p>
                <h2 className="font-serif text-2xl font-bold text-primary">{sel.name}</h2>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-4 bg-primary" /> {sel.name.replace('학교', '')}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-4 border-t border-dashed border-gray-400" /> 리그 평균
                </span>
              </div>
            </div>
            <RadarHex values={sel.hexagon} compare={avg} className="mx-auto mt-4 w-full max-w-sm" />
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {CONTRIBUTION_TYPES.map(t => {
                const diff = sel.hexagon[t.key] - avg[t.key];
                return (
                  <li key={t.key} className="flex justify-between rounded-md bg-gray-50 px-2 py-1">
                    <span className="text-gray-600">{t.label}</span>
                    <span className={diff >= 0 ? 'font-semibold text-primary' : 'text-gray-400'}>
                      {diff >= 0 ? '+' : ''}
                      {diff.toFixed(0)}%p
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              어느 하나로 정하기 어려운 활동은 두 유형에 반씩 반영합니다. 예) 연탄 나눔 = 나눔 ½ + 자원봉사 ½
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
