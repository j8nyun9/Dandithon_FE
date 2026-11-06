import type { ApprovalStatus, VerifyLevel } from '../../types';

const statusStyle: Record<ApprovalStatus, { label: string; cls: string }> = {
  pending: { label: '승인 대기', cls: 'bg-gray-100 text-gray-600' },
  approved: { label: '승인', cls: 'bg-green-100 text-green-700' },
  rejected: { label: '반려', cls: 'bg-red-100 text-red-700' },
};

const levelStyle: Record<VerifyLevel, { label: string; cls: string }> = {
  self: { label: '자기 신고', cls: 'border-gray-300 text-gray-600' },
  operator: { label: '운영자 확인', cls: 'border-blue-300 text-blue-700' },
  official: { label: '공식 실적 확인', cls: 'border-primary text-primary' },
};

export function StatusBadge({ status }: { status: ApprovalStatus }) {
  const s = statusStyle[status];
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${s.cls}`}>{s.label}</span>;
}

export function LevelBadge({ level }: { level: VerifyLevel }) {
  const s = levelStyle[level];
  return <span className={`rounded-full border px-2 py-1 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

export function DemoBadge({ children = '시연용 데이터' }: { children?: string }) {
  return (
    <span className="rounded-sm border border-dashed border-gray-400 px-2 py-1 text-xs text-gray-500">{children}</span>
  );
}
