/** 인증 가능한 사회공헌 활동만 집계 — 자기 신고는 받지 않음 */
export type VerifyLevel = 'linked' | 'operator' | 'official';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
/** 내어놓는 것(서사): 시간 · 재능 · 헌혈 */
export type Offer = '시간' | '재능' | '헌혈';
/** 사회공헌 유형(측정): 랭킹 육각형의 6개 축 */
export type ContributionType = 'volunteer' | 'mentoring' | 'community' | 'sharing' | 'scholarship' | 'blood';
export type Hexagon = Record<ContributionType, number>;

export type School = {
  id: string;
  name: string;
  rank: number;
  /** 중간결산 시점 순위 */
  midRank: number;
  dandiIndex: number;
  enrolled: number;
  /** 유형별 참여율(%) — 서버 계산. 두 유형에 걸친 활동은 0.5씩 반영 */
  hexagon: Hexagon;
};

export type Activity = {
  id: string;
  title: string;
  offer: Offer;
  /** 1~2개. 2개면 반반 반영 */
  types: ContributionType[];
  mode: string;
  date: string;
  place: string;
  minutes: number;
  difficulty: '쉬움' | '보통' | '도전';
  reason: string;
};

export type PracticeRecord = {
  id: string;
  types: ContributionType[];
  title: string;
  date: string;
  status: ApprovalStatus;
  level: VerifyLevel;
  source: '1365' | 'VMS' | '협력 기관';
  /** 운영자 화면용 — 공개 피드에는 노출하지 않음 */
  submitter?: string;
  school?: string;
};
