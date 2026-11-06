import type { ApprovalStatus, ContributionType, VerifyLevel } from '../../types';
import { typeLabel } from '../../utils/contribution';

const statusStyle: Record<ApprovalStatus, { label: string; cls: string }> = {
  pending: { label: '승인 대기', cls: 'bg-gray-100 text-gray-600' },
  approved: { label: '승인', cls: 'bg-green-100 text-green-700' },
  rejected: { label: '반려', cls: 'bg-red-100 text-red-700' },
};

/** 인증 가능한 활동만 집계 — 자기 신고 등급 없음 */
const levelStyle: Record<VerifyLevel, { label: string; cls: string }> = {
  linked: { label: '1365·VMS 연동', cls: 'border-teal-400 text-teal-700' },
  operator: { label: '운영자 확인', cls: 'border-blue-300 text-blue-700' },
  official: { label: '공식 실적 확인', cls: 'border-primary text-primary' },
};

export function StatusBadge({ status }: { status: ApprovalStatus }) {
  const s = statusStyle[status];
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${s.cls}`}>{s.label}</span>;
}

export function LevelBadge({ level }: { level: VerifyLevel }) {
  const s = levelStyle[level];
  return <span className={`rounded-full border px-2 py-1 text-xs font-medium whitespace-nowrap ${s.cls}`}>{s.label}</span>;
}

export function TypeChips({ types }: { types: ContributionType[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {types.map(t => (
        <span key={t} className="rounded bg-paper px-1 text-xs whitespace-nowrap text-accent-deep">
          {typeLabel(t)}
        </span>
      ))}
      {types.length > 1 && <span className="text-[10px] text-gray-400">½씩</span>}
    </span>
  );
}

export function DemoBadge({ children = '시연용 데이터' }: { children?: string }) {
  return (
    <span className="rounded-sm border border-dashed border-gray-400 px-2 py-1 text-xs whitespace-nowrap text-gray-500">
      {children}
    </span>
  );
}
