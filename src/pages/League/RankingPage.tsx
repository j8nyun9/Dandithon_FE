import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import league from '../../mocks/league.json';
import type { School } from '../../types';
import { DemoBadge } from '../../components/common/Badges';
import { PageHeader, container } from '../../components/common/PageHeader';
import { rankDelta } from '../../utils/format';

// 단디 지수 = 30×(P/N) + 25×(R/N) + 30×(V/N) + 15×min(K/T, 1) — 계산은 서버, 여기선 표시만
const items = [
  { key: 'participation', label: '참여율', max: 30 },
  { key: 'continuity', label: '지속 참여', max: 25 },
  { key: 'volunteer', label: '시간·재능·헌혈', max: 30 },
  { key: 'project', label: '공동 프로젝트', max: 15 },
] as const;

function Delta({ d }: { d: number }) {
  if (d > 0)
    return (
      <span className="flex items-center gap-1 text-sm font-semibold text-accent">
        <TrendingUp size={16} />
        {d}
      </span>
    );
  if (d < 0)
    return (
      <span className="flex items-center gap-1 text-sm text-gray-400">
        <TrendingDown size={16} />
        {-d}
      </span>
    );
  return <Minus size={16} className="text-gray-300" />;
}

export function RankingPage() {
  const schools = league.schools as School[];
  const podium = schools.slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="UNIVERSITY LEAGUE"
        title="대학 리그"
        desc="개인이 아닌 학교 단위로만 겨룹니다. 얼마나 많이 냈는지가 아니라, 얼마나 많은 학생이 함께했는지를 봅니다."
        right={
          <div className="text-right text-sm text-paper/70">
            <p>{league.season.name}</p>
            <p className="font-serif text-2xl text-paper">
              {league.season.week} / {league.season.totalWeeks}주차
            </p>
          </div>
        }
      />

      <div className={`${container} py-16`}>
        {/* 시상대 */}
        <div className="grid gap-6 md:grid-cols-3">
          {podium.map(s => (
            <div
              key={s.id}
              className={`rounded-xl p-6 ${s.rank === 1 ? 'navy-texture text-paper' : 'border border-gray-200 bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-serif text-5xl font-black ${s.rank === 1 ? 'text-accent' : 'text-gray-300'}`}>
                  {s.rank}
                </span>
                <Delta d={rankDelta(s.rank, s.prevRank)} />
              </div>
              <p className={`mt-4 text-xl font-bold ${s.rank === 1 ? '' : 'text-primary'}`}>{s.name}</p>
              <p className={`text-sm ${s.rank === 1 ? 'text-paper/60' : 'text-gray-400'}`}>참가자 {s.enrolled}명</p>
              <p className="mt-4 text-3xl font-bold">{s.dandiIndex.toFixed(1)}</p>
            </div>
          ))}
        </div>

        {/* 전체 표 */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">등록 시범 참가 집단의 참여 성과입니다. 개인 순위는 집계하지 않습니다.</p>
          <DemoBadge />
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-6 py-4">순위</th>
                <th className="px-4 py-4">학교</th>
                <th className="px-4 py-4">변동</th>
                {items.map(it => (
                  <th key={it.key} className="px-4 py-4">
                    {it.label} <span className="text-gray-300">/{it.max}</span>
                  </th>
                ))}
                <th className="px-6 py-4 text-right">단디 지수</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(s => {
                const mine = s.id === league.mySchoolId;
                return (
                  <tr key={s.id} className={`border-t border-gray-100 ${mine ? 'bg-paper/60' : ''}`}>
                    <td className={`px-6 py-4 font-serif text-xl font-black ${s.rank <= 3 ? 'text-accent' : 'text-gray-300'}`}>
                      {s.rank}
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-800">
                      {s.name}
                      {mine && <span className="ml-2 rounded bg-primary px-1 text-[10px] text-paper">우리 학교</span>}
                    </td>
                    <td className="px-4 py-4">
                      <Delta d={rankDelta(s.rank, s.prevRank)} />
                    </td>
                    {items.map(it => {
                      const v = s.breakdown[it.key];
                      return (
                        <td key={it.key} className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-100">
                              <div className="h-full rounded-full bg-primary-soft" style={{ width: `${(v / it.max) * 100}%` }} />
                            </div>
                            <span className="text-xs text-gray-500">{v.toFixed(1)}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-right text-lg font-bold text-primary">{s.dandiIndex.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          단디 지수 = 30×참여율 + 25×지속 참여율(서로 다른 3일 이상) + 30×시간·재능·헌혈 참여율 + 15×공동 프로젝트
          달성률(최대 1)
        </p>
      </div>
    </>
  );
}
