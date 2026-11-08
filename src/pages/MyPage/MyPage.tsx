import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useHomeData } from '../../hooks/useHomeData';
import type { UserContract, SchoolContract, ParticipationContract, Mission } from '../../services/api';
import { PageHeader, container } from '../../components/common/PageHeader';
import { CONTRIBUTION_TYPES } from '../../utils/contribution';
import './MyPage.css';

type HistoryDetail = {mission_id:number;title:string;status:string;weights:Record<string,number>;is_demo:boolean};
const labels:Record<ParticipationContract['status'],string>={applied:'신청 완료 표시',started:'참여 중',pending:'확인 대기',approved:'승인 완료',rejected:'반려',cancelled:'취소'};
function dateLabel(value:string|null) {
  if(!value)return '일자 미등록';
  const normalized=/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/.test(value)?value.replace(' ','T')+'Z':value;
  const date=new Date(normalized);
  return Number.isNaN(date.getTime())?'일자 확인 필요':new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric'}).format(date);
}
export function MyPage() {
  const profile=useHomeData<UserContract>('/v1/me');
  const schools=useHomeData<SchoolContract[]>('/v1/schools');
  const student=profile.data?.role==='student';
  const history=useHomeData<ParticipationContract[]>(student?'/v1/me/participations':null);
  const details=useHomeData<HistoryDetail[]>(student?'/me/verifications':null);
  const candidates=useHomeData<Mission[]>(student?'/me/verification-missions':null);
  const [filter,setFilter]=useState<'all'|ParticipationContract['status']>('all');
  const entries=[...(history.data||[])].sort((a,b)=>(Date.parse(b.updated_at)||0)-(Date.parse(a.updated_at)||0));
  const shown=entries.filter(entry=>filter==='all'||entry.status===filter);
  const school=schools.data?.find(value=>value.id===profile.data?.school_id);
  const error=history.error||details.error||candidates.error;
  const loading=history.loading||details.loading||candidates.loading;
  const retry=()=>{history.retry();details.retry();candidates.retry();};
  return <>
    <PageHeader eyebrow="MY DANDI" title="마이페이지" desc="각자의 형편대로 마음을 모았던 연대의 뜻을 이어, 내가 내어놓은 시간과 정성을 기록합니다." />
    <div className={`${container} my-page py-12`}>
      {profile.error?<div role="alert" className="rounded-xl bg-white p-6"><p>{profile.error}</p><button className="mt-3 underline" onClick={profile.retry}>내 정보 다시 조회</button></div>:!profile.data?<p role="status">내 정보를 불러오는 중입니다.</p>:<>
        <section className="my-profile paper-texture" aria-label="내 정보"><div className="my-profile-heading"><span>단디보상운동</span><span>나의 실천록 · 個人實踐錄</span></div><div className="my-profile-body">
          <div className="flex items-center gap-5"><div><p className="text-sm text-gray-500">{schools.loading?'학교 정보 조회 중':school?.name||'소속 학교 미등록'}</p><h2 className="my-profile-name">{profile.data.name||'이름 미등록'}</h2><p className="mt-2 break-all text-sm text-gray-500">{profile.data.email}</p>{schools.error&&<button className="mt-2 text-xs underline" onClick={schools.retry}>학교 정보 다시 조회</button>}</div></div>
          <Link to={student?'/activities':'/admin'} className="my-action-link">{student?'새로운 활동 찾기':'관리자 화면'}</Link></div><p className="my-profile-motto">작은 정성도 귀히 여겨, 함께한 마음을 기록하다.</p>
        </section>
        {!student?<p className="mt-8 rounded-xl bg-white p-6 text-gray-600">봉사활동 이력은 학생 계정에서 확인할 수 있습니다.</p>:error?<div role="alert" className="mt-8 rounded-xl bg-white p-6"><p>활동 이력을 불러오지 못했습니다.</p><p className="mt-2 text-sm text-gray-500">{error}</p><button className="mt-3 underline" onClick={retry}>다시 불러오기</button></div>:loading||!history.data?<p role="status" className="py-10">봉사활동 이력을 불러오는 중입니다.</p>:<>
          <section className="my-summary" aria-label="활동 요약">{[{label:'전체 참여 기록',count:entries.length},{label:'승인 완료',count:entries.filter(e=>e.status==='approved').length},{label:'확인 대기',count:entries.filter(e=>e.status==='pending').length}].map(({label,count})=><div key={label} className="my-summary-item"><div><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-2xl font-bold text-primary">{count}<span className="ml-1 text-sm font-normal">건</span></p></div></div>)}</section>
          <div className="my-history-heading"><h2 className="font-serif text-2xl font-bold text-primary">나의 실천 기록</h2><button className="text-sm underline" onClick={retry}>새로 불러오기</button></div>
          <div className="my-history-filters" aria-label="참여 상태별 보기">{(['all',...Object.keys(labels)] as ('all'|ParticipationContract['status'])[]).map(value=><button key={value} aria-pressed={filter===value} onClick={()=>setFilter(value)} className={`rounded-full border px-4 py-2 text-xs ${filter===value?'border-primary bg-primary text-paper':'border-gray-300 bg-white text-gray-600'}`}>{value==='all'?'전체':labels[value]} {entries.filter(e=>value==='all'||e.status===value).length}</button>)}</div>
          {shown.length===0?<div className="rounded-xl border border-paper-deep bg-white px-6 py-12 text-center"><p className="text-gray-500">{entries.length===0?'아직 참여한 봉사활동이 없습니다.':'선택한 상태의 활동 기록이 없습니다.'}</p><Link className="mt-4 inline-block text-sm underline" to="/activities">활동 둘러보기</Link></div>:<ul className="my-history-list paper-texture">{shown.map(entry=>{
            const detail=details.data?.find(item=>item.mission_id===entry.mission_id)||candidates.data?.find(item=>item.id===entry.mission_id);
            const fields=CONTRIBUTION_TYPES.filter(type=>(detail?.weights?.[type.key]||0)>0).map(type=>type.label).join(' · ');
            return <li key={entry.mission_id} className="my-history-entry"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs text-accent-deep">{fields||'분야 정보 미등록'}</p><h3 className="my-entry-title">{detail?.title||`활동 #${entry.mission_id}`}</h3>{detail?.is_demo&&<p className="mt-1 text-xs text-gray-500">시연용 기록</p>}</div><span className={`my-entry-status rounded-md px-3 py-1 text-xs ${entry.status==='approved'?'bg-primary text-paper':'bg-paper text-primary'}`}>{labels[entry.status]}</span></div><dl className="mt-5 grid gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:grid-cols-3"><div><dt>신청 표시일</dt><dd className="mt-1 text-primary">{dateLabel(entry.applied_at)}</dd></div><div><dt>확인 요청일</dt><dd className="mt-1 text-primary">{dateLabel(entry.submitted_at)}</dd></div><div><dt>승인일</dt><dd className="mt-1 text-primary">{dateLabel(entry.approved_at)}</dd></div></dl>{entry.review_note&&<p className="mt-4 text-sm text-gray-600">담당자 안내: {entry.review_note}</p>}{['applied','started','rejected','cancelled'].includes(entry.status)&&<Link to="/activities/verify" className="mt-4 inline-block text-sm underline">참여 인증 화면으로 이동</Link>}</li>;
          })}</ul>}
          <p className="my-history-footnote">신청 완료 표시는 본인의 기록이며, 실제 봉사 완료는 담당자 승인 후 인정됩니다.</p>
        </>}
      </>}
    </div>
  </>;
}





