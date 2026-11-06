export type VerifyLevel = 'self' | 'operator' | 'official';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
/** 내어놓는 것: 시간(봉사) · 재능 · 헌혈 */
export type PracticeType = 'time' | 'talent' | 'blood';
export type Offer = '시간' | '재능' | '헌혈';

export type School = {
  id: string;
  name: string;
  rank: number;
  prevRank: number;
  dandiIndex: number;
  /** 서버가 계산한 항목별 점수 (30·25·30·15 만점) */
  breakdown: { participation: number; continuity: number; volunteer: number; project: number };
  enrolled: number;
};

export type Activity = {
  id: string;
  title: string;
  offer: Offer;
  category: string;
  mode: string;
  date: string;
  place: string;
  minutes: number;
  difficulty: '쉬움' | '보통' | '도전';
  reason: string;
};

export type PracticeRecord = {
  id: string;
  type: PracticeType;
  title: string;
  date: string;
  status: ApprovalStatus;
  level: VerifyLevel;
  /** 운영자 화면용 — 공개 피드에는 노출하지 않음 */
  submitter?: string;
  school?: string;
};
