import { useState } from 'react';
import { Check, X } from 'lucide-react';
import records from '../../mocks/records.json';
import type { PracticeRecord } from '../../types';
import { Logo } from '../../components/layout/Header';
import { LevelBadge, StatusBadge } from '../../components/common/Badges';

const typeLabel = { time: '시간', talent: '재능', blood: '헌혈' };

/** 운영자 화면 — 별도 레이아웃. 실제 승인·점수 재계산은 서버에서 수행 */
export function AdminPage() {
  const [list, setList] = useState(records as PracticeRecord[]);
  const pending = list.filter(r => r.status === 'pending');
  // TODO: 서버 승인/반려 API 호출로 교체
  const decide = (id: string, status: 'approved' | 'rejected') =>
    setList(l => l.map(r => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="min-h-dvh bg-gray-100">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <Logo light={false} />
        <span className="rounded bg-primary px-2 py-1 text-xs text-paper">운영자</span>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
        <h1 className="text-xl font-bold text-primary">
          승인 대기 <span className="text-accent">{pending.length}</span>건
        </h1>
        {pending.length === 0 && <p className="text-sm text-gray-500">모든 인증을 처리했어요.</p>}
        {pending.map(r => (
          <div key={r.id} className="flex items-center gap-4 rounded-xl bg-white p-4">
            <div className="flex-1">
              <p className="text-xs text-gray-400">
                {r.school} · {r.submitter} · {typeLabel[r.type]} · {r.date}
              </p>
              <p className="font-semibold text-gray-800">{r.title}</p>
              <div className="mt-2 flex gap-2">
                <StatusBadge status={r.status} />
                <LevelBadge level={r.level} />
              </div>
            </div>
            <button
              onClick={() => decide(r.id, 'rejected')}
              className="flex items-center gap-1 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700"
            >
              <X size={16} />
              반려
            </button>
            <button
              onClick={() => decide(r.id, 'approved')}
              className="flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
            >
              <Check size={16} />
              승인
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
