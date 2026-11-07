import { ArrowRight, BarChart3, Trophy, BookOpen, Leaf, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import league from '../../mocks/league.json';
import activities from '../../mocks/activities.json';
import type { Activity, School } from '../../types';
import { DemoBadge, TypeChips } from '../../components/common/Badges';
import { HeritageBuilding } from '../../components/common/HeritageBuilding';
import { container } from '../../components/common/PageHeader';
import { RadarHex } from '../../components/common/RadarHex';
import { SeasonTimeline } from '../../components/common/SeasonTimeline';
import { rankDelta } from '../../utils/format';
import { strongestType } from '../../utils/contribution';

const features = [
  { icon: BarChart3, title: '대학 리그', desc: '학기 단위 학교 간 선의 경쟁', to: '/league' },
  { icon: Trophy, title: '다양한 시상', desc: '중간·최종결산, 유형별 부문상', to: '/awards' },
  { icon: BookOpen, title: '디지털 의연록', desc: '내어놓은 것을 기록으로', to: '/records' },
  { icon: Leaf, title: 'AI 활동 추천', desc: '내 시간과 재능에 맞는 활동', to: '/activities' },
];

function Hero() {
  return (
    <section className="navy-texture relative overflow-hidden text-paper">
      <div className={`${container} grid items-center gap-6 pt-16 md:grid-cols-[1.3fr_1fr] md:pt-24`}>
        <div className="relative z-10 pb-16 md:pb-24">
          <p className="text-xs tracking-[0.35em] text-paper/70 md:text-sm">DAEGU 1907 — DANDI MOVEMENT</p>
          <h1 className="mt-6 font-serif text-4xl leading-tight font-bold md:text-4xl md:leading-tight lg:text-[46px] lg:whitespace-nowrap">
            1907년엔 반지를,
            <br />
            오늘은 <span className="text-accent">시간</span>을 내어놓습니다.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/80 md:text-lg">
            누구는 돈을, 누구는 반지를 내놓았던 국채보상운동처럼.
            <br />
            대학생은 시간과 재능, 헌혈로 각자 할 수 있는 만큼 함께합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/activities"
              className="flex items-center gap-2 rounded-md bg-paper px-6 py-4 font-semibold text-primary transition hover:bg-white"
            >
              지금 시작하기 <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="rounded-md border border-paper/40 px-6 py-4 font-semibold text-paper transition hover:bg-white/10"
            >
              서비스 소개
            </Link>
          </div>
        </div>

        {/* 우측 비주얼: 붉은 판 + 근대 건물 */}
        <div className="relative h-72 self-end md:h-[480px]">
          <div className="absolute top-0 right-0 h-56 w-56 bg-accent-deep md:h-96 md:w-80">
            <div className="absolute top-6 right-6 text-right font-serif text-xs leading-relaxed tracking-[0.25em] text-paper/90">
              DANDI
              <br />
              MOVEMENT
              <br />
              1907
              <span className="mt-2 ml-auto block h-px w-16 bg-paper/60" />
            </div>
          </div>
          <HeritageBuilding className="absolute right-0 bottom-0 w-full max-w-[390px] drop-shadow-[0_24px_24px_rgb(0_0_0/0.45)] md:right-auto md:left-4 md:max-w-none" />
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="paper-texture border-b border-paper-deep">
      <div className={`${container} grid grid-cols-2 md:grid-cols-4`}>
        {features.map(({ icon: Icon, title, desc, to }, i) => (
          <Link
            key={title}
            to={to}
            className={`group flex items-center gap-4 py-6 md:px-6 ${i > 0 ? 'md:border-l md:border-paper-deep' : ''}`}
          >
            <Icon size={28} strokeWidth={1.6} className="shrink-0 text-accent-deep" />
            <div>
              <p className="font-bold text-ink group-hover:text-accent-deep">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, to, cta }: { eyebrow: string; title: string; to?: string; cta?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.3em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-primary">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
          {cta} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function LeagueSection() {
  const schools = league.schools as School[];
  const my = schools.find(s => s.id === league.mySchoolId)!;
  const delta = rankDelta(my.rank, my.midRank);
  const top = schools.slice(0, 5);

  return (
    <section className={`${container} py-16`}>
      <SectionHead eyebrow="UNIVERSITY LEAGUE" title="이번 학기 대학 리그" to="/league" cta="전체 순위" />
      <div className="mb-6 rounded-xl border border-gray-200 bg-white px-6 pt-4 pb-2">
        <SeasonTimeline />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1.4fr]">
        <div className="navy-texture grid grid-cols-[1fr_auto] gap-4 rounded-xl p-6 text-paper">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-paper/60">우리 학교</p>
              <p className="mt-4 text-2xl font-bold">{my.name}</p>
              <p className="mt-2 font-serif text-7xl font-black">
                {my.rank}
                <span className="ml-2 text-2xl font-medium">위</span>
              </p>
              {delta > 0 && (
                <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-accent">
                  <TrendingUp size={16} /> 중간결산보다 {delta}계단 상승
                </p>
              )}
            </div>
            <div className="mt-6 border-t border-white/15 pt-4">
              <span className="text-sm text-paper/60">단디 지수</span>
              <p className="text-3xl font-bold">{my.dandiIndex.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex w-48 flex-col items-center justify-center">
            <RadarHex values={my.hexagon} tone="dark" labels={false} className="w-full" />
            <p className="mt-2 text-xs text-paper/60">강점: {strongestType(my.hexagon).label}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">인증된 활동 기준 · 등록 시범 참가 집단</p>
            <DemoBadge />
          </div>
          <ul className="flex flex-col gap-4">
            {top.map(s => (
              <li key={s.id} className="grid grid-cols-[32px_1fr_64px] items-center gap-4">
                <span className={`font-serif text-2xl font-black ${s.rank <= 3 ? 'text-accent' : 'text-gray-300'}`}>
                  {s.rank}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${s.id === my.id ? 'text-primary' : 'text-gray-700'}`}>
                    {s.name}
                    {s.id === my.id && <span className="ml-2 rounded bg-primary px-1 text-[10px] text-paper">우리 학교</span>}
                  </p>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${s.id === my.id ? 'bg-accent' : 'bg-primary-soft'}`}
                      style={{ width: `${s.dandiIndex}%` }}
                    />
                  </div>
                </div>
                <span className="text-right font-bold text-primary">{s.dandiIndex.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectSection() {
  const progress = Math.round((league.project.current / league.project.target) * 100);
  const c = league.contributions;
  const given: [string, string, string][] = [
    ['시간', `${c.hours.toLocaleString('ko-KR')}시간`, '봉사 활동 시간'],
    ['재능', `${c.talent.toLocaleString('ko-KR')}건`, '멘토링·공연·도우미'],
    ['헌혈', `${c.blood.toLocaleString('ko-KR')}회`, '헌혈증 확인 기준'],
  ];

  return (
    <section className="paper-texture border-y border-paper-deep">
      <div className={`${container} grid gap-6 py-16 lg:grid-cols-2`}>
        <div>
          <SectionHead eyebrow="COMMUNITY PROJECT" title="함께 이루는 공동 목표" />
          <p className="text-lg font-semibold text-ink">{league.project.title}</p>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-paper-deep">
            <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>
              {league.project.current} / {league.project.target}
              {league.project.unit}
            </span>
            <span className="font-bold text-accent-deep">{progress}% 달성</span>
          </div>
          <p className="mt-6 font-serif text-sm leading-relaxed text-ink/80">
            1907년, 누구는 돈을, 누구는 끼던 반지를 빼어 내놓았습니다. 얼마를 냈느냐보다 저마다 형편대로 함께했다는 것이
            그 운동의 힘이었습니다. 오늘 우리는 시간과 재능, 그리고 헌혈로 그 마음을 잇습니다.
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-primary">이번 시즌 함께 내어놓은 것</h3>
            <DemoBadge />
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            {given.map(([label, value, note]) => (
              <div key={label} className="rounded-xl border border-paper-deep bg-white/70 p-4">
                <dt className="font-serif text-sm font-bold text-accent-deep">{label}</dt>
                <dd className="mt-2 text-2xl font-bold text-primary">{value}</dd>
                <p className="mt-1 text-xs text-gray-400">{note}</p>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-gray-500">승인된 참여만 집계합니다. 한 시간도, 한 번의 헌혈도 똑같이 소중한 참여입니다.</p>
        </div>
      </div>
    </section>
  );
}

function ActivitySection() {
  const list = (activities as Activity[]).slice(0, 3);
  return (
    <section className={`${container} py-16`}>
      <SectionHead eyebrow="TODAY'S DANDI" title="오늘 할 수 있는 단디" to="/activities" cta="AI 맞춤 추천 받기" />
      <div className="grid gap-6 md:grid-cols-3">
        {list.map(a => (
          <article key={a.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <TypeChips types={a.types} />
            <h3 className="mt-2 text-lg font-bold text-primary">{a.title}</h3>
            <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock size={14} /> {a.date} · {a.minutes}분
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {a.place}
              </span>
            </div>
            <Link
              to="/activities"
              className="mt-6 rounded-md border border-primary py-2 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-paper"
            >
              자세히 보기
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className={`${container} pb-16`}>
      <div className="navy-texture relative overflow-hidden rounded-xl px-6 py-16 text-center text-paper md:px-16">
        <p className="text-xs tracking-[0.35em] text-paper/60">START TODAY</p>
        <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
          당신이 내어놓을 수 있는 것은 <span className="text-accent">무엇인가요?</span>
        </h2>
        <p className="mt-4 text-paper/75">
          한 학기에 한 번이어도 충분합니다. 여러 차시로 이어지는 활동도 한 번의 참여로 인정합니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-4 font-semibold text-white hover:bg-accent-deep"
          >
            내게 맞는 활동 찾기 <ArrowRight size={18} />
          </Link>
          <Link
            to="/activities/verify"
            className="inline-flex items-center gap-2 rounded-md border border-paper/40 px-6 py-4 font-semibold text-paper hover:bg-white/10"
          >
            참여 인증하기
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <LeagueSection />
      <ProjectSection />
      <ActivitySection />
      <CtaBanner />
    </>
  );
}
