import { useState } from 'react';
import ledger from '../../mocks/ledger.json';
import league from '../../mocks/league.json';
import type { ContributionType, VerifyLevel } from '../../types';
import { PageHeader, container } from '../../components/common/PageHeader';
import { DemoBadge, LevelBadge, TypeChips } from '../../components/common/Badges';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';

type Entry = Omit<(typeof ledger)[number], 'types' | 'level'> & { types: ContributionType[]; level: VerifyLevel };

/** 디지털 의연록 — 학교 단위 집계 기록. 개인 이름·증빙은 노출하지 않음 */
export function RecordsPage() {
  const [kind, setKind] = useState<ContributionType | 'all'>('all');
  const list = (ledger as Entry[]).filter(e => kind === 'all' || e.types.includes(kind));
  const chips: { key: ContributionType | 'all'; label: string }[] = [{ key: 'all', label: '전체' }, ...CONTRIBUTION_TYPES];

  return (
    <>
      <PageHeader
        eyebrow="DIGITAL LEDGER"
        title="디지털 의연록"
        desc="1907년 신문에 의연금 낸 이들의 이름이 실렸듯, 오늘 내어놓은 시간과 재능, 헌혈을 학교의 이름으로 기록합니다. 인증된 활동만, 개인 정보 없이 기록합니다."
      />
      <div className={`${container} py-16`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {chips.map(c => (
              <button
                key={c.key}
                onClick={() => setKind(c.key)}
                className={`rounded-full border px-4 py-1 text-sm ${
                  kind === c.key ? 'border-primary bg-primary text-paper' : 'border-gray-300 text-gray-600 hover:border-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <DemoBadge />
        </div>

        <div className="paper-texture rounded-xl border border-paper-deep p-6">
          <div className="border-b-4 border-double border-ink pb-2 text-center">
            <p className="font-serif text-3xl font-black text-ink">義捐錄</p>
            <p className="text-xs tracking-[0.3em] text-ink/60">{league.season.name} 기록</p>
          </div>
          {list.length === 0 && <p className="py-6 text-center text-sm text-gray-500">이 유형의 기록이 아직 없어요.</p>}
          <ul>
            {list.map(e => (
              <li
                key={e.id}
                className="grid grid-cols-[88px_1fr_auto] items-center gap-4 border-b border-paper-deep py-4 md:grid-cols-[100px_170px_1fr_auto_auto]"
              >
                <span className="text-xs text-gray-500">{e.date}</span>
                <span className="font-serif font-bold text-ink">{e.school}</span>
                <span className="col-span-2 flex flex-wrap items-center gap-2 text-sm text-gray-700 md:col-span-1">
                  {e.title}
                  <TypeChips types={e.types} />
                </span>
                <span className="font-serif text-lg font-bold whitespace-nowrap text-primary">
                  {e.amount}
                  <span className="ml-1 text-xs font-normal text-gray-500">{e.unit}</span>
                </span>
                <LevelBadge level={e.level} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
