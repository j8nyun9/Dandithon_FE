import { useState } from 'react';
import { Camera } from 'lucide-react';
import records from '../../mocks/records.json';
import type { PracticeRecord, PracticeType } from '../../types';
import { LevelBadge, StatusBadge } from '../../components/common/Badges';

const tabs: { key: PracticeType; label: string; hint: string; placeholder: string }[] = [
  { key: 'time', label: '시간', hint: '봉사 시간 — 등록 행사 참여, 운영자 확인', placeholder: '예) 신천 플로깅 데이 1.5시간' },
  { key: 'talent', label: '재능', hint: '재능 나눔 — 멘토링·공연·디지털 도우미 등, 운영자 확인', placeholder: '예) 지역아동센터 수학 멘토링 2시간' },
  { key: 'blood', label: '헌혈', hint: '헌혈 — 헌혈증 사진으로 확인. 건강 상태가 괜찮을 때만 참여하세요', placeholder: '예) 교내 헌혈버스 전혈 헌혈' },
];

const ME = '김OO'; // TODO: 로그인 사용자로 교체

export function VerifyPage() {
  const [tab, setTab] = useState<PracticeType>('time');
  const mine = (records as PracticeRecord[]).filter(r => r.submitter === ME);
  const current = tabs.find(t => t.key === tab)!;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-serif text-2xl font-bold text-primary">무엇을 내어놓았나요?</h2>
        <div className="mt-6 grid grid-cols-3 rounded-lg bg-gray-100 p-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md py-2 text-sm font-semibold ${
                tab === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">{current.hint}</p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            참여한 활동
            <input
              className="rounded-md border border-gray-300 px-4 py-2 font-normal focus:border-primary focus:outline-none"
              placeholder={current.placeholder}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            한 줄 소감 (선택)
            <textarea
              rows={3}
              className="rounded-md border border-gray-300 px-4 py-2 font-normal focus:border-primary focus:outline-none"
            />
          </label>
          <button className="flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 py-6 text-sm text-gray-500 hover:bg-gray-50">
            <Camera size={18} /> 증빙 사진 첨부
          </button>
          <p className="text-xs text-gray-400">증빙 파일(헌혈증 포함)은 운영자 확인용이며 공개 피드와 외부에 노출되지 않습니다.</p>
          <button className="rounded-md bg-primary py-4 font-semibold text-paper hover:bg-primary-soft">제출하기</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-primary">내 참여 이력</h2>
        <ul className="flex flex-col gap-4">
          {mine.map(r => (
            <li key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{r.title}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {tabs.find(t => t.key === r.type)!.label} · {r.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <LevelBadge level={r.level} />
                  <StatusBadge status={r.status} />
                </div>
              </div>
              {r.status === 'rejected' && (
                <p className="mt-2 text-xs text-gray-500">사진이 잘 보이지 않았어요. 다시 올려 주시면 바로 확인할게요.</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
