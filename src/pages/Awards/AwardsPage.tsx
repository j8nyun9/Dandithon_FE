import { Award, Repeat, HandHeart, TrendingUp, Target, Share2 } from 'lucide-react';
import league from '../../mocks/league.json';
import type { School } from '../../types';
import { PageHeader, container } from '../../components/common/PageHeader';
import { BulletinCard } from '../../components/common/BulletinCard';
import { DemoBadge } from '../../components/common/Badges';

const schools = league.schools as School[];
const leader = (pick: (s: School) => number) => [...schools].sort((a, b) => pick(b) - pick(a))[0];

const awards = [
  { icon: Award, name: '단디 대상', desc: '단디 지수 최고 학교', winner: leader(s => s.dandiIndex) },
  { icon: Repeat, name: '꾸준상', desc: '서로 다른 3일 이상 지속 참여 비율 최고', winner: leader(s => s.breakdown.continuity) },
  { icon: HandHeart, name: '나눔상', desc: '시간·재능·헌혈 참여 비율 최고', winner: leader(s => s.breakdown.volunteer) },
  { icon: TrendingUp, name: '도약상', desc: '시즌 중 순위 상승 폭 최대', winner: leader(s => s.prevRank - s.rank) },
  { icon: Target, name: '연대상', desc: '공동 프로젝트(헌혈 릴레이) 기여 최고', winner: leader(s => s.breakdown.project) },
];

export function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AWARDS"
        title="시상"
        desc="1등만 빛나지 않도록, 여러 부문에서 학교의 성취를 인정합니다. 시즌 종료 시 최종 수상 학교가 확정됩니다."
      />
      <div className={`${container} py-16`}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-primary">부문별 현재 선두</h2>
          <DemoBadge />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {awards.map(({ icon: Icon, name, desc, winner }) => (
            <div key={name} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-paper">
                <Icon size={28} className="text-accent-deep" />
              </span>
              <p className="mt-4 font-serif text-xl font-bold text-primary">{name}</p>
              <p className="mt-1 flex-1 text-xs text-gray-500">{desc}</p>
              <p className="mt-4 border-t border-gray-100 pt-4 font-semibold text-gray-800">{winner.name}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="navy-texture">
        <div className={`${container} grid items-center gap-16 py-16 lg:grid-cols-[1fr_1.2fr]`}>
          <div className="text-paper">
            <p className="text-xs tracking-[0.35em] text-paper/60">DANDI EXTRA</p>
            <h2 className="mt-4 font-serif text-4xl font-bold">
              우리 학교 소식을
              <br />
              <span className="text-accent">호외</span>로 알리세요
            </h2>
            <p className="mt-4 leading-relaxed text-paper/75">
              순위가 오르거나 공동 목표를 달성하면 옛 신문 호외 형식의 공유 카드가 만들어집니다. 개인 정보 없이 학교의 성과만
              담깁니다.
            </p>
            <button className="mt-8 flex items-center gap-2 rounded-md bg-paper px-6 py-4 font-semibold text-primary hover:bg-white">
              <Share2 size={18} /> 호외 공유하기
            </button>
          </div>
          <BulletinCard />
        </div>
      </section>
    </>
  );
}
