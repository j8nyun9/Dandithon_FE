import heritageBuilding from '../../assets/pavilion-cutout.png';
import './HomeHero.css';
import { useHomeData } from '../../hooks/useHomeData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {type UserContract,type League,type Mission} from '../../services/api';
import type {Hexagon} from '../../types';
import { container } from '../../components/common/PageHeader';
import { RadarHex } from '../../components/common/RadarHex';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';

const features = [
  { title: '대학 리그', desc: '학기 단위 학교 간 선의 경쟁', to: '/league' },
  { title: '디지털 의연록', desc: '내어놓은 것을 기록으로', to: '/records' },
  { title: 'AI 활동 추천', desc: '내 시간과 재능에 맞는 활동', to: '/activities' },
  { title: '마이페이지', desc: '내 정보와 봉사활동 이력', to: '/my' },
];

function Hero() {
  return (
    <section className="home-hero navy-texture relative overflow-hidden text-paper">
      <div className="home-hero-stage">
        <div className="home-hero-backdrop" aria-hidden="true">
          <div className="home-hero-red">
            <div className="absolute top-6 right-8 text-right font-serif text-[10px] leading-relaxed tracking-[0.25em] text-paper/90 lg:top-8 lg:right-12">
              DANDI<br />MOVEMENT<br />1907<span className="mt-2 ml-auto block h-px w-14 bg-paper/60" />
            </div>
          </div>
        </div>
        <div className="home-building-desktop" aria-hidden="true"><img src={heritageBuilding} alt="" width={1640} height={959} className="home-building-image" /></div>
        <div className={`${container} home-hero-content`}>
          <div className="home-hero-copy">
            <p className="text-xs tracking-[0.35em] text-paper/70 md:text-sm">DAEGU 1907 — DANDI MOVEMENT</p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.2] font-bold md:text-[38px] lg:text-[46px] xl:text-[52px]">
              작은 선행이 모여,<br />우리 학교의 <span className="text-accent">자부심</span>이 되다.
            </h1>
            <p className="mt-6 font-serif text-base leading-relaxed text-paper/80 md:text-lg">국채보상운동의 연대 정신을 이어,<br />대학생의 작은 실천이 더 큰 변화를 만듭니다.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/activities" className="flex items-center gap-2 rounded-md bg-paper px-6 py-4 font-semibold text-primary transition hover:bg-white">지금 시작하기 <ArrowRight size={18} /></Link>
              <Link to="/about" className="rounded-md border border-paper/40 px-6 py-4 font-semibold text-paper transition hover:bg-white/10">서비스 소개</Link>
            </div>
          </div>
        </div>
        <div className="home-building-mobile" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-3/4 bg-[#87372d]" />
          <img src={heritageBuilding} alt="" width={1640} height={959} className="home-building-image" />
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="paper-texture border-b border-paper-deep">
      <div className={`${container} grid grid-cols-2 md:grid-cols-4`}>
        {features.map(({ title, desc, to }, i) => (
          <Link
            key={title}
            to={to}
            className={`group flex items-center gap-4 py-6 md:px-6 ${i > 0 ? 'md:border-l md:border-paper-deep' : ''}`}
          >
            
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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
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
 const {data,error,retry,loggedIn}=useHomeData<League>('/league');
 const {data:current,error:profileError,retry:retryProfile}=useHomeData<UserContract>(loggedIn?'/v1/me':null);
 const schools=data?.schools||[]; const my=schools.find(s=>s.school_id===current?.school_id); const max=Math.max(1,...schools.map(s=>s.overall??0));
 const axisMax=Math.max(1,...schools.flatMap(s=>Object.values(s.axes)));
 const featured=loggedIn?my:(schools.find(s=>s.overall!==null)||schools[0]);
 return <section className={`${container} py-16`}><SectionHead eyebrow="UNIVERSITY LEAGUE" title="이번 학기 대학 리그" to="/league" cta="전체 순위"/><div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">{data ? `${data.semester_id}번 학기 · ${data.rules}` : '학기 및 산정 기준을 불러오는 중입니다.'}</div>{error?<div role="alert"><p>{error}</p><button onClick={retry} className="mt-2 underline">다시 시도</button></div>:!data?<p>리그를 불러오는 중입니다.</p>:<div className="grid gap-6 lg:grid-cols-[1.2fr_1.4fr]"><div className="navy-texture grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto] rounded-xl p-6 text-paper"><div><p className="text-sm text-paper/60">{loggedIn?'우리 학교':featured?.overall!==null&&featured?'현재 선두 대학':'대학 리그 현황'}</p>{featured?<><p className="mt-4 text-2xl font-bold">{featured.school}</p><p className="mt-2 font-serif text-6xl font-black">{featured.overall===null?<span className="text-2xl">미산정</span>:<>{schools.indexOf(featured)+1}<span className="ml-2 text-2xl">위</span></>}</p><p className="mt-6 border-t border-white/15 pt-4 text-sm text-paper/60">1,000명당 완료 건수</p><p className="text-3xl font-bold">{featured.overall??'재학생 수 확인 필요'}</p></>:<div className="mt-4">{profileError?<><p role="alert">내 학교 정보를 불러오지 못했습니다.</p><button className="underline" onClick={retryProfile}>다시 시도</button></>:<p>{loggedIn?(current?'소속 학교 정보가 없거나 해당 학기 리그에 등록되지 않았습니다.':'내 학교 정보를 불러오는 중입니다.'):'등록된 대학 리그 정보가 없습니다.'}</p>}</div>}</div>{featured&&featured.overall!==null&&<div className="mx-auto flex w-40 shrink-0 flex-col justify-center"><RadarHex values={featured.axes as Hexagon} max={axisMax} valueSuffix="" tone="dark" labels={false}/></div>}</div><div className="rounded-xl border border-gray-200 bg-white p-6"><p className="mb-4 text-sm text-gray-500">재학생 1,000명당 승인 완료 건수 · 막대는 최고 점수 대비 비율</p><ul className="flex flex-col gap-4">{schools.length===0&&<li className="text-sm text-gray-500">등록된 대학 리그 정보가 없습니다.</li>}{schools.map((s,i)=><li key={s.school_id} className="grid grid-cols-[32px_1fr_64px] items-center gap-4"><span className="font-serif text-2xl font-black text-accent">{s.overall===null?'—':i+1}</span><div><p className="text-sm font-semibold">{s.school}{s.school_id===my?.school_id?' · 우리 학교':''}</p><div className="mt-1 h-2 rounded-full bg-gray-100"><div className="h-full rounded-full bg-accent" style={{width:`${(s.overall??0)/max*100}%`}}/></div></div><span className="text-right font-bold text-primary">{s.overall??'미산정'}</span></li>)}</ul></div></div>}</section>;
}

function ProjectSection() {
 type CommunityProgress={semester_id:number;completed_count:number;target_count:number;total_contribution:number;active_categories:number};
 const {data:progress,error,retry}=useHomeData<CommunityProgress>('/community-progress');
 const participants=useHomeData<{participants:{school_id:number;name:string}[]}>(progress?`/ledger?semester_id=${progress.semester_id}`:null);
 const percent=progress&&progress.target_count>0?Math.max(0,Math.min(100,Math.round(progress.completed_count/progress.target_count*100))):0;
 const values=progress?[['승인 완료 활동',`${progress.completed_count}건`],['참여 분야',`${progress.active_categories}개`],['참여 학생',participants.error?'조회 실패':participants.data?`${participants.data.participants.length}명`:'조회 중']]:[];
 return <section className="paper-texture border-y border-paper-deep"><div className={`${container} grid gap-6 py-16 lg:grid-cols-2`}><div><SectionHead eyebrow="COMMUNITY PROJECT" title="함께 이루는 공동 목표"/><p className="text-lg font-semibold text-ink">이번 학기 활동 완료 {progress?`${progress.target_count}건`:''} 목표</p>{error?<div role="alert" className="mt-4 text-sm text-red-700"><p>{error}</p><button className="mt-2 underline" onClick={retry}>다시 시도</button></div>:!progress?<p className="mt-4 text-sm text-gray-500">참여 현황을 불러오는 중입니다.</p>:<><div className="mt-4 h-4 overflow-hidden rounded-full bg-paper-deep" role="progressbar" aria-label="활동 완료 목표 진행률" aria-valuemin={0} aria-valuemax={progress.target_count} aria-valuenow={Math.min(progress.completed_count,progress.target_count)}><div className="h-full rounded-full bg-accent" style={{width:`${percent}%`}}/></div><div className="mt-2 flex justify-between text-sm text-gray-600"><span>{progress.completed_count} / {progress.target_count}건</span><span className="font-bold text-accent-deep">{percent}% 달성</span></div></>}<p className="mt-6 font-serif text-sm leading-relaxed text-ink/80">1907년 각자의 형편대로 함께했던 마음처럼, 오늘 우리는 시간과 재능으로 함께합니다.</p></div><div className="flex flex-col justify-end"><h3 className="mb-4 font-bold text-primary">이번 시즌 함께한 실천</h3>{progress&&<div className="grid gap-4 sm:grid-cols-3">{values.map(([label,value])=><div key={label} className="rounded-xl border border-paper-deep bg-white/70 p-4"><p className="font-serif font-bold text-accent-deep">{label}</p><p className="mt-2 text-2xl font-bold text-primary">{value}</p></div>)}</div>}<div className="mt-4 space-y-0 text-xs leading-snug text-gray-500">{participants.error&&<p><button onClick={participants.retry} className="underline">참여 학생 수 다시 조회</button></p>}<p>승인 완료 활동과 참여 분야는 관리자가 확인한 실적을 기준으로 하며, 헌혈 관련 활동은 제외합니다.</p><p>참여 학생 수는 해당 시즌 의연록을 기준으로 합니다.</p></div></div></div></section>;
}

function ActivitySection() {
 const {data:list,error,loading,retry}=useHomeData<Mission[]>('/missions');
 return <section className={`${container} py-16`}><SectionHead eyebrow="TODAY'S DANDI" title="오늘 할 수 있는 단디" to="/activities" cta="AI 맞춤 추천 받기"/>{error?<div role="alert"><p>{error}</p><button onClick={retry} className="mt-2 underline">다시 시도</button></div>:loading||!list?<p role="status">활동을 불러오는 중입니다.</p>:list.length===0?<p className="rounded-xl bg-white p-6 text-gray-500">현재 모집 중인 미션이 없습니다.</p>:<div className="grid gap-6 md:grid-cols-3">{list.slice(0,3).map(m=><article key={m.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"><p className="text-xs text-accent-deep">{Object.keys(m.weights || {}).map(k=>CONTRIBUTION_TYPES.find(t=>t.key===k)?.label||k).join(' · ')}</p><h3 className="mt-2 text-lg font-bold text-primary">{m.title} {m.is_demo&&<span className="text-xs text-gray-500">실제 모집 아님</span>}</h3><p className="mt-4 text-sm text-gray-500">{m.application_start&&m.application_end?`${m.application_start} ~ ${m.application_end}`:m.application_period||'모집 기간 미정'}</p>{m.application_note&&<p className="mt-2 text-sm text-gray-500">{m.application_note}</p>}<Link to="/activities" className="mt-6 rounded-md border border-primary py-2 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-paper">자세히 보기</Link></article>)}</div>}</section>;
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
          작은 실천부터 시작해 보세요. 함께한 활동은 우리 학교의 기록으로 남습니다.
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


















