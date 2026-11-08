import { useEffect, useState } from 'react';
import { useHomeData } from '../../hooks/useHomeData';
import { type League, type UserContract } from '../../services/api';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';
import { PageHeader, container } from '../../components/common/PageHeader';
import { RadarHex } from '../../components/common/RadarHex';
import type { Hexagon } from '../../types';

type School = League['schools'][number] & { rank?: number | null; primary_category?: string | null };
type LeagueData = Omit<League, 'schools'> & { semester_name?: string; schools: School[] };
const number = (value: number) => value.toLocaleString('ko-KR', { maximumFractionDigits: 4 });
const validAxes = (school: School) => school.axes && CONTRIBUTION_TYPES.every(t => typeof school.axes[t.key] === 'number' && Number.isFinite(school.axes[t.key]) && school.axes[t.key] >= 0);

export function RankingPage() {
  const { data, error, retry, loggedIn } = useHomeData<LeagueData>('/league');
  const profile = useHomeData<UserContract>(loggedIn ? '/v1/me' : null);
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(true);
  const schools = Array.isArray(data?.schools) ? data.schools : [];
  const invalid = !!data && (!Array.isArray(data.schools) || schools.some(s => !validAxes(s) || (s.overall !== null && (typeof s.overall !== 'number' || !Number.isFinite(s.overall) || s.overall < 0))));
  useEffect(() => {
    if (!data || invalid) return;
    setSelected(previous => schools.some(s => s.school_id === previous) ? previous : schools.find(s => s.school_id === profile.data?.school_id)?.school_id ?? schools[0]?.school_id ?? null);
  }, [data, invalid]);
  useEffect(() => { if (profile.data?.school_id && schools.some(s => s.school_id === profile.data?.school_id)) setSelected(profile.data.school_id); }, [profile.data?.school_id]);
  const selectedSchool = schools.find(s => s.school_id === selected);
  const measured = schools.filter(s => s.overall !== null);
  const maxValue = invalid ? 0 : Math.max(0, ...measured.flatMap(s => CONTRIBUTION_TYPES.map(t => s.axes[t.key])));
  // Shared scale across all schools; keep real values and round the ceiling up.
  const magnitude = maxValue > 0 ? 10 ** Math.floor(Math.log10(maxValue)) : 1;
  const expandedMax = maxValue > 0 ? [1, 2, 5, 10].find(step => step * magnitude >= maxValue)! * magnitude : 1;
  const axisMax = zoomed ? expandedMax : Math.max(1, maxValue);
  const average = Object.fromEntries(CONTRIBUTION_TYPES.map(t => [t.key, measured.length ? measured.reduce((sum, s) => sum + s.axes[t.key], 0) / measured.length : 0])) as Hexagon;
  const problem = error || (invalid ? '서버의 리그 데이터 형식을 확인할 수 없습니다.' : '');
  return <>
    <PageHeader eyebrow="UNIVERSITY LEAGUE" title="대학 리그" desc="승인된 사회공헌 활동을 학기별 학교의 참여 성과로 보여줍니다." right={<div className="w-full rounded-xl border border-white/20 p-5 text-sm text-paper/80 md:w-96">26년도 2학기</div>} />
    <div className={`${container} py-16`}>
      {problem ? <div role="alert"><p>{error || '서버의 리그 데이터 형식을 확인할 수 없습니다.'}</p><button className="mt-3 underline" onClick={retry}>다시 불러오기</button></div> : !data ? <p role="status">리그 정보를 불러오는 중입니다.</p> : schools.length === 0 ? <p className="rounded-xl bg-white p-6">등록된 대학 리그 정보가 없습니다.</p> : <>
        <p className="mb-6 text-sm text-gray-500">{data.rules}</p>
        {profile.error && <p role="status" className="mb-4 text-sm text-gray-500">내 학교 정보를 가져오지 못했습니다. 공개 리그는 확인할 수 있습니다. <button className="underline" onClick={profile.retry}>내 정보 다시 조회</button></p>}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white"><table className="w-full min-w-[450px] text-sm"><thead className="bg-gray-50 text-left text-xs text-gray-500"><tr><th className="px-6 py-4">순위</th><th className="px-4 py-4">학교</th><th className="px-4 py-4">주요 분야</th><th className="px-6 py-4 text-right">1,000명당 완료</th></tr></thead><tbody>
            {schools.map(s => {
              const top = CONTRIBUTION_TYPES.reduce((a, b) => s.axes[b.key] > s.axes[a.key] ? b : a);
              // Prefer an explicit backend rank. Legacy responses use backend-sorted order.
              const rank = s.overall === null ? null : s.rank !== undefined ? s.rank : measured.indexOf(s) + 1;
              const category = s.primary_category !== undefined ? CONTRIBUTION_TYPES.find(t => t.key === s.primary_category)?.label : s.axes[top.key] > 0 ? top.label : null;
              return <tr key={s.school_id} onClick={() => setSelected(s.school_id)} className={`cursor-pointer border-t border-gray-100 ${selected === s.school_id ? 'bg-paper' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-serif text-xl font-black text-accent">{rank ?? '—'}</td>
                <td className="px-4 py-4"><button onClick={() => setSelected(s.school_id)} aria-pressed={selected === s.school_id} className="text-left font-semibold underline-offset-4 hover:underline">{s.school}</button>{s.school_id === profile.data?.school_id && <span className="ml-2 rounded bg-primary px-1 text-[10px] text-paper">우리 학교</span>}</td>
                <td className="px-4 py-4 text-xs text-accent-deep">{category ?? '실적 없음'}</td><td className="px-6 py-4 text-right text-lg font-bold text-primary">{s.overall === null ? '미산정' : number(s.overall)}</td>
              </tr>;
            })}
          </tbody></table></div>
          {selectedSchool && <section className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24" aria-label="선택 대학 상세">
            <p className="text-xs text-gray-500">분야별 1,000명당 완료 건수</p><h2 className="font-serif text-2xl font-bold text-primary">{selectedSchool.school}</h2>
            <p className="mt-2 text-xs text-gray-500">재학생 수 {selectedSchool.student_count === null ? '미등록' : `${number(selectedSchool.student_count)}명`}{selectedSchool.is_estimate ? ' · 시연용 추정치' : selectedSchool.reference_year ? ` · ${selectedSchool.reference_year}년 기준` : ''}</p>
            {selectedSchool.source_url?.startsWith('https://') && <a className="mt-2 inline-block text-xs underline" href={selectedSchool.source_url} target="_blank" rel="noreferrer">재학생 수 출처 확인</a>}
            <p className="mt-3 text-sm text-gray-600">승인 완료 활동 {number(selectedSchool.completed_count)}건</p>
            {selectedSchool.overall === null ? <p className="mt-6 text-sm text-gray-500">재학생 수가 확인되면 순위와 분야별 환산 수치를 표시합니다.</p> : <>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="그래프 눈금 선택">{[{label:'확대 보기',value:true},{label:'1 기준 보기',value:false}].map(option=><button key={option.label} aria-pressed={zoomed===option.value} onClick={()=>setZoomed(option.value)} className={`rounded border px-3 py-2 text-xs ${zoomed===option.value?'border-primary bg-primary text-paper':'border-gray-200 text-primary'}`}>{option.label}</button>)}</div>
              <p className="mt-3 text-xs text-accent-deep" role="status">{zoomed?'현재 실적을 확대해서 비교합니다.':'최대 눈금을 최소 1로 표시합니다.'} 최대 눈금 {number(axisMax)}건 / 재학생 1,000명</p>
              <div className="mt-4 text-right text-xs text-gray-500"><p className="text-accent">━ 선택 학교</p><p className="text-primary">━ 산정 가능한 학교 평균</p></div>
              <RadarHex values={selectedSchool.axes as Hexagon} compare={average} max={axisMax} valueDecimals={4} valueSuffix="" className="mx-auto mt-4 w-full max-w-sm" />
              <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">{CONTRIBUTION_TYPES.map(t => <li key={t.key} className="flex justify-between gap-2 rounded-md bg-gray-50 px-2 py-1"><span>{t.label}</span><span className="font-semibold text-primary">{number(selectedSchool.axes[t.key])}</span></li>)}</ul>
              <p className="mt-4 text-xs text-gray-400">학교 평균은 미산정 학교를 제외한 {measured.length}개교의 단순 평균입니다. 모든 학교에 같은 눈금을 적용하며 보기 전환은 실제 수치나 순위를 바꾸지 않습니다. 수치는 백분율이 아닌 재학생 1,000명당 분야별 승인 실적입니다.</p>
            </>}
          </section>}
        </div>
      </>}
    </div>
  </>;
}





