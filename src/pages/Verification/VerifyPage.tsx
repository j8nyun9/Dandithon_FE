import { useState } from 'react';
import { Camera, Link2, RefreshCw, ShieldCheck } from 'lucide-react';
import records from '../../mocks/records.json';
import activities from '../../mocks/activities.json';
import type { Activity, PracticeRecord } from '../../types';
import { LevelBadge, StatusBadge, TypeChips } from '../../components/common/Badges';

const ME = '김OO'; // TODO: 로그인 사용자로 교체

const portals = [
  { id: '1365', name: '1365 자원봉사포털', desc: '행정안전부 자원봉사 실적' },
  { id: 'VMS', name: 'VMS 사회복지자원봉사', desc: '사회복지 분야 봉사 실적' },
];

export function VerifyPage() {
  // TODO: 실제 연동은 개인 동의 후 서버가 기관 API 호출
  const [linked, setLinked] = useState<Record<string, boolean>>({ '1365': true, VMS: false });
  const [activityId, setActivityId] = useState('');
  const mine = (records as PracticeRecord[]).filter(r => r.submitter === ME);
  const picked = (activities as Activity[]).find(a => a.id === activityId);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        {/* 기관 연동 */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
            <Link2 size={22} className="text-accent" /> 봉사 실적 연동
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            동의하면 1365·VMS에 등록된 봉사 실적을 자동으로 가져와 바로 인증합니다. 동의는 언제든 해제할 수 있어요.
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {portals.map(p => (
              <li key={p.id} className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
                <div>
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">
                    {linked[p.id] ? '연동됨 · 오늘 09:12 동기화' : p.desc}
                  </p>
                </div>
                {linked[p.id] ? (
                  <div className="flex items-center gap-2">
                    <button aria-label="다시 불러오기" className="p-2 text-gray-400 hover:text-primary">
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => setLinked(l => ({ ...l, [p.id]: false }))}
                      className="rounded-md border border-gray-300 px-4 py-2 text-xs text-gray-600"
                    >
                      연동 해제
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setLinked(l => ({ ...l, [p.id]: true }))}
                    className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-paper"
                  >
                    동의하고 연동
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 협력 기관 활동 */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
            <ShieldCheck size={22} className="text-accent" /> 협력 기관 활동 인증
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            1365·VMS에 없는 활동은 등록된 협력 기관 활동만 인증할 수 있어요. 운영자가 확인합니다.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              참여한 활동
              <select
                value={activityId}
                onChange={e => setActivityId(e.target.value)}
                className="rounded-md border border-gray-300 px-4 py-2 font-normal focus:border-primary focus:outline-none"
              >
                <option value="">등록된 활동 중에서 선택</option>
                {(activities as Activity[]).map(a => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
            </label>
            {picked && (
              <p className="flex items-center gap-2 text-xs text-gray-500">
                반영 유형 <TypeChips types={picked.types} />
              </p>
            )}
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              참여 날짜
              <input
                type="date"
                className="rounded-md border border-gray-300 px-4 py-2 font-normal focus:border-primary focus:outline-none"
              />
            </label>
            <button className="flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 py-6 text-sm text-gray-500 hover:bg-gray-50">
              <Camera size={18} /> 증빙 첨부 (활동 확인서 · 헌혈증 등)
            </button>
            <p className="text-xs text-gray-400">증빙 파일은 운영자 확인용이며 공개 피드와 외부에 노출되지 않습니다.</p>
            <button className="rounded-md bg-primary py-4 font-semibold text-paper hover:bg-primary-soft">제출하기</button>
          </div>
        </section>
      </div>

      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-primary">내 참여 이력</h2>
        <ul className="flex flex-col gap-4">
          {mine.map(r => (
            <li key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{r.title}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {r.date} · {r.source}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <LevelBadge level={r.level} />
                <TypeChips types={r.types} />
              </div>
              {r.status === 'rejected' && (
                <p className="mt-2 text-xs text-gray-500">확인서가 잘 보이지 않았어요. 다시 올려 주시면 바로 확인할게요.</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
