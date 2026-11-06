import league from '../../mocks/league.json';
import { HeritageBuilding } from './HeritageBuilding';

/** 단디 호외 — 옛 신문 스타일 공유 카드 */
export function BulletinCard() {
  const my = league.schools.find(s => s.id === league.mySchoolId)!;
  const progress = Math.round((league.project.current / league.project.target) * 100);
  const jump = my.prevRank - my.rank;

  return (
    <article className="paper-texture rounded-xl p-6 text-ink shadow-2xl">
      <div className="flex items-center justify-between border-b-4 border-double border-ink pb-1 text-[10px] tracking-widest">
        <span>第 {league.season.week} 號</span>
        <span>大邱 · 2026年 11月 6日</span>
        <span>시연용 호외</span>
      </div>
      <h3 className="py-2 text-center font-serif text-6xl font-black tracking-tight">단디 號外</h3>
      <p className="border-y border-ink py-1 text-center text-[10px] tracking-[0.3em]">DANDI MOVEMENT · SINCE 1907</p>

      <h4 className="mt-6 font-serif text-3xl leading-snug font-black">
        {my.name}, 리그 <span className="text-accent-deep">{my.rank}위</span>
        {jump > 0 ? `로 ${jump}계단 도약` : ' 수성'}
      </h4>
      <p className="mt-2 font-serif">“각자 내어놓은 시간이 모여 학교의 이름이 되다”</p>

      <div className="mt-6 grid grid-cols-[1fr_auto] gap-6 border-t border-ink pt-4">
        <p className="text-justify font-serif text-sm leading-relaxed">
          1907년 대구에서 누구는 돈을, 누구는 반지를 내놓았듯, 올가을 {my.name} 학생들은 저마다의 시간과 재능, 헌혈을
          내어놓았다. 공동 프로젝트 「{league.project.title}」는 목표의 {progress}%에 도달했으며, 단디 지수는 {my.dandiIndex.toFixed(1)}점을
          기록했다.
        </p>
        <div className="w-32 self-start bg-accent-deep p-2">
          <HeritageBuilding className="w-full" />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 border-y border-ink text-center font-serif">
        {[
          ['단디 지수', my.dandiIndex.toFixed(1)],
          ['공동 목표', `${progress}%`],
          ['리그 순위', `${my.rank}위`],
        ].map(([k, v], i) => (
          <div key={k} className={`py-2 ${i < 2 ? 'border-r border-ink' : ''}`}>
            <dt className="text-xs">{k}</dt>
            <dd className="text-2xl font-black">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-center text-[10px] text-gray-500">등록 시범 참가 집단의 참여 성과 · 시연용 데이터</p>
    </article>
  );
}
