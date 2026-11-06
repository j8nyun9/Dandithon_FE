import { ArrowRight, School, ShieldCheck, Sparkles, FileBarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader, container } from '../../components/common/PageHeader';

const steps = [
  { icon: Sparkles, title: '찾기', desc: '내어놓을 수 있는 것(시간·재능·헌혈)을 고르면 AI가 등록 행사를 추천합니다.' },
  { icon: ShieldCheck, title: '인증하기', desc: '자기 신고 · 운영자 확인 · 공식 실적 확인, 세 단계로 구분해 기록합니다.' },
  { icon: School, title: '함께 오르기', desc: '인증된 참여가 모여 우리 학교의 단디 지수와 리그 순위가 됩니다.' },
];

const principles = [
  '개인 랭킹은 만들지 않습니다. 비교는 학교 단위로만 합니다.',
  '많이 낸 사람을 앞세우지 않습니다. 한 시간도, 한 번의 헌혈도 같은 참여입니다.',
  '헌혈은 권할 뿐 강요하지 않습니다. 건강 상태에 따라 언제든 다른 방식으로 참여할 수 있습니다.',
  '소비·지출 데이터는 수집하지 않습니다.',
  'AI는 등록된 행사만 추천하며, 수치는 서버가 계산합니다.',
  '헌혈증을 포함한 개인 증빙과 개인 이력은 공개하거나 외부에 제공하지 않습니다.',
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="단디보상운동이란"
        desc="각자 형편대로 할 수 있는 만큼 내어놓았던 1907년 국채보상운동의 정신을 이어, 대학생의 시간·재능·헌혈을 학교 단위 공동 성취로 모으는 AI 기반 사회공헌 리그입니다."
      />

      <section className={`${container} grid gap-16 py-16 lg:grid-cols-2`}>
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-accent">SINCE 1907</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">누구는 돈을, 누구는 반지를</h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            1907년 대구에서 시작된 국채보상운동에는 형편이 서로 다른 많은 이들이 함께했습니다. 누구는 돈을, 누구는 끼던
            반지와 비녀를 내놓았습니다. 얼마를 냈느냐보다 각자 할 수 있는 만큼 내어놓았다는 사실이 이 운동의 힘이었고, 그
            기록은 유네스코 세계기록유산으로 남았습니다.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            단디보상운동은 이 원리를 오늘의 대학생에게 잇습니다. 지금 우리가 내어놓을 수 있는 것은 시간과 재능, 그리고
            헌혈입니다. ‘단디’는 ‘단단히, 제대로’라는 경상도 말로, 작은 참여도 단디 기록해 학교의 이름으로 쌓아 갑니다.
          </p>
        </div>
        <div className="paper-texture rounded-xl border border-paper-deep p-6">
          <h3 className="font-serif text-xl font-bold text-ink">우리가 지키는 원칙</h3>
          <ol className="mt-4 flex flex-col gap-4">
            {principles.map((p, i) => (
              <li key={p} className="flex gap-4 text-sm text-ink">
                <span className="font-serif text-lg font-black text-accent-deep">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className={`${container} py-16`}>
          <h2 className="text-center font-serif text-3xl font-bold text-primary">이렇게 참여해요</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="rounded-xl border border-gray-200 p-6">
                <p className="font-serif text-sm text-accent">STEP {i + 1}</p>
                <Icon size={28} className="mt-4 text-primary" />
                <p className="mt-4 text-lg font-bold text-primary">{title}</p>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} py-16`}>
        <div className="grid items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-[auto_1fr_auto] md:p-8">
          <FileBarChart size={40} className="text-accent-deep" />
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-accent">FOR PARTNERS</p>
            <h3 className="mt-1 text-xl font-bold text-primary">기업·기관 파트너를 위한 검증된 성과 리포트</h3>
            <p className="mt-2 text-sm text-gray-600">
              승인된 봉사 인원·시간, 재능 나눔 건수, 헌혈 참여 횟수, 공동 프로젝트 달성률을 인증 등급별로 집계해 제공합니다.
              개인 식별 정보와 개인별 이력은 제공하지 않습니다.
            </p>
          </div>
          <Link to="/league" className="flex items-center gap-2 font-semibold text-primary hover:text-accent">
            리그 보기 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
