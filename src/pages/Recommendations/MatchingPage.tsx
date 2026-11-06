import { useState } from 'react';
import { Sparkles, MapPin, Clock, Info } from 'lucide-react';
import activities from '../../mocks/activities.json';
import type { Activity } from '../../types';

const groups = [
  { key: 'offer', label: '내어놓을 수 있는 것', options: ['시간', '재능', '헌혈'] },
  { key: 'time', label: '사용 가능 시간', options: ['평일 오후', '주말 오전', '주말 오후', '1시간 이내'] },
  { key: 'field', label: '관심 분야', options: ['환경', '교육', '복지', '문화', '의료'] },
] as const;

const diffCls: Record<Activity['difficulty'], string> = {
  쉬움: 'bg-green-50 text-green-700',
  보통: 'bg-blue-50 text-blue-700',
  도전: 'bg-orange-50 text-accent-deep',
};

export function MatchingPage() {
  const [picked, setPicked] = useState<Record<string, string[]>>({ offer: ['시간', '재능'], time: ['주말 오전'], field: [] });
  const [shown, setShown] = useState(true);

  const toggle = (k: string, v: string) =>
    setPicked(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));

  // TODO: 서버 AI 추천 API 연결 — AI는 DB에 등록된 행사만 추천하고 문장만 생성
  const results = (activities as Activity[]).filter(
    a =>
      (!picked.offer.length || picked.offer.includes(a.offer)) &&
      (!picked.field.length || picked.field.includes(a.category)),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-40">
        <h2 className="flex items-center gap-2 font-bold text-primary">
          <Sparkles size={18} className="text-accent" /> AI 단디 매칭
        </h2>
        <p className="mt-1 text-xs text-gray-500">각자 형편대로, 할 수 있는 만큼. 등록된 행사 중에서 골라 드려요.</p>
        <div className="mt-6 flex flex-col gap-6">
          {groups.map(g => (
            <div key={g.key}>
              <p className="mb-2 text-sm font-semibold text-gray-700">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.options.map(o => {
                  const on = picked[g.key].includes(o);
                  return (
                    <button
                      key={o}
                      onClick={() => toggle(g.key, o)}
                      className={`rounded-full border px-4 py-1 text-sm transition ${
                        on ? 'border-primary bg-primary text-paper' : 'border-gray-300 text-gray-600 hover:border-primary'
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShown(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent py-4 font-semibold text-white hover:bg-accent-deep"
        >
          <Sparkles size={18} /> 추천 받기
        </button>
      </aside>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-primary">추천 활동 {shown ? results.length : 0}건</h2>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <Info size={14} /> 등록된 행사 중에서만 추천합니다.
          </p>
        </div>
        {shown && results.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-sm text-gray-500">
            조건에 맞는 등록 행사가 아직 없어요. 조건을 조금 넓혀 볼까요?
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {shown &&
            results.map(a => (
              <article key={a.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-accent-deep">
                      {a.offer} · {a.category} · {a.mode}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-primary">{a.title}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${diffCls[a.difficulty]}`}>
                    {a.difficulty}
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Clock size={14} /> {a.date} · {a.minutes}분
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} /> {a.place}
                  </span>
                </div>
                <p className="paper-texture mt-4 flex-1 rounded-lg p-4 text-sm text-ink">
                  <b className="mr-1 text-accent-deep">추천 이유</b>
                  {a.reason}
                </p>
                <button className="mt-4 rounded-md bg-primary py-2 text-sm font-semibold text-paper hover:bg-primary-soft">
                  참여 신청
                </button>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
