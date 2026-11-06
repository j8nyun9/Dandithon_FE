import { Award, TrendingUp, HandHelping, GraduationCap, MapPinned, Gift, BookHeart, Droplet, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import league from '../../mocks/league.json';
import type { ContributionType, School } from '../../types';
import { PageHeader, container } from '../../components/common/PageHeader';
import { BulletinCard } from '../../components/common/BulletinCard';
import { DemoBadge } from '../../components/common/Badges';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';

const schools = league.schools as School[];
const leader = (pick: (s: School) => number) => [...schools].sort((a, b) => pick(b) - pick(a))[0];

const typeIcon: Record<ContributionType, LucideIcon> = {
  volunteer: HandHelping,
  mentoring: GraduationCap,
  community: MapPinned,
  sharing: Gift,
  scholarship: BookHeart,
  blood: Droplet,
};

const mainAwards = [
  { icon: Award, name: '단디 대상', desc: '단디 지수 최고 학교', winner: leader(s => s.dandiIndex) },
  { icon: TrendingUp, name: '도약상', desc: '중간결산 대비 순위 상승 폭 최대', winner: leader(s => s.midRank - s.rank) },
];

const typeAwards = CONTRIBUTION_TYPES.map(t => ({
  icon: typeIcon[t.key],
  name: t.award,
  desc: `${t.label} 참여율 최고`,
  winner: leader(s => s.hexagon[t.key]),
  value: `${leader(s => s.hexagon[t.key]).hexagon[t.key]}%`,
}));

export function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AWARDS"
        title="시상"
        desc="학기 중간결산과 기말 최종결산, 한 학기에 두 번 시상합니다. 1등만 빛나지 않도록 사회공헌 유형마다 따로 인정합니다."
      />
      <div className={`${container} py-16`}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-accent">MID-TERM</p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-primary">중간결산 현재 선두</h2>
          </div>
          <DemoBadge />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mainAwards.map(({ icon: Icon, name, desc, winner }) => (
            <div key={name} className="navy-texture flex items-center gap-6 rounded-xl p-6 text-paper">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent-deep">
                <Icon size={28} />
              </span>
              <div>
                <p className="font-serif text-2xl font-bold">{name}</p>
                <p className="text-xs text-paper/60">{desc}</p>
                <p className="mt-2 text-lg font-semibold text-accent">{winner.name}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-16 mb-4 font-bold text-primary">유형별 부문상</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {typeAwards.map(({ icon: Icon, name, desc, winner, value }) => (
            <div key={name} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper">
                <Icon size={22} className="text-accent-deep" />
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg font-bold text-primary">{name}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{winner.name}</p>
                <p className="text-xs text-gray-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="navy-texture">
        <div className={`${container} grid items-center gap-16 py-16 lg:grid-cols-[1fr_1.2fr]`}>
          <div className="text-paper">
            <p className="text-xs tracking-[0.35em] text-paper/60">DANDI EXTRA</p>
            <h2 className="mt-4 font-serif text-4xl font-bold">
              결산 소식을
              <br />
              <span className="text-accent">호외</span>로 알리세요
            </h2>
            <p className="mt-4 leading-relaxed text-paper/75">
              중간결산과 최종결산 때마다 옛 신문 호외 형식의 공유 카드가 만들어집니다. 개인 정보 없이 학교의 성과만 담깁니다.
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
