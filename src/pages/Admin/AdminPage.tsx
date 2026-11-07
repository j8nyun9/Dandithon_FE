import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {api,post,session,setSession,type Verification} from '../../services/api';
import {Logo} from '../../components/layout/Header';
import {MissionForm} from './MissionForm';
import {MissionManagement} from './MissionManagement';
import {SchoolPopulation} from './SchoolPopulation';
type Tab='verifications'|'missions'|'periods'|'schools';
export function AdminPage(){
 const [records,setRecords]=useState<Verification[]>([]),[message,setMessage]=useState(''),[busy,setBusy]=useState<number|null>(null),[tab,setTab]=useState<Tab>('verifications');const current=session();
 async function refresh(){setRecords(await api<Verification[]>('/verifications'));}
 useEffect(()=>{if(current&&current.role!=='student')refresh().catch(e=>setMessage(e.message));},[]);
 async function decide(r:Verification,status:'approved'|'rejected'|'cancelled'){
  if(status==='cancelled'&&!window.confirm(`참여자 ID ${r.user_id}의 ‘${r.title}’ 승인을 취소할까요? 리그와 공동 목표에서 제외되며 학생이 다시 확인을 요청할 수 있습니다.`))return;
  setBusy(r.id);try{await post(`/missions/${r.mission_id}/verification`,{user_id:r.user_id,status});setMessage(status==='approved'?'담당자 확인으로 승인했습니다.':status==='rejected'?'반려했습니다.':'승인을 취소했습니다. 리그와 공동 목표에서 제외됩니다.');await refresh();}catch(e){setMessage(e instanceof Error?e.message:'처리 실패');}finally{setBusy(null);}
 }
 const tabs:{id:Tab;label:string}[]=[{id:'verifications',label:'실적 확인'},{id:'missions',label:'활동 자동 수집'},{id:'periods',label:'기간 관리'},...(current?.role==='admin'?[{id:'schools' as const,label:'학교 규모'}]:[])];
 return <div className="min-h-screen bg-gray-100"><header className="flex justify-between bg-white p-5"><Logo light={false}/><div><Link to="/" className="mr-4 underline">홈</Link>{current&&<button onClick={()=>{setSession(null);location.href='/login';}}>로그아웃</button>}</div></header><main className="mx-auto max-w-3xl space-y-4 p-6"><h1 className="text-2xl font-bold">관리자</h1>{!current?<p><Link className="underline" to="/login">관리자 또는 기관 계정 로그인</Link>이 필요합니다.</p>:current.role==='student'?<p>관리자 또는 기관 계정이 필요합니다.</p>:<><nav aria-label="관리 메뉴" className="flex gap-2 overflow-x-auto border-b border-gray-200">{tabs.map(t=><button key={t.id} type="button" aria-current={tab===t.id?'page':undefined} onClick={()=>setTab(t.id)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${tab===t.id?'border-primary text-primary':'border-transparent text-gray-500'}`}>{t.label}</button>)}</nav>
 {tab==='verifications'&&<section className="space-y-4"><h2 className="text-xl font-bold text-primary">실적 확인</h2><p className="text-sm text-gray-600">기관이 제공한 실적을 확인한 뒤 승인하세요. AI가 증빙을 검증하지 않습니다.</p>{message&&<p role="status">{message}</p>}{records.filter(r=>r.status==='pending').map(r=><article key={r.id} className="rounded-xl bg-white p-4"><b>{r.title}</b><p className="my-2 text-sm">참여자 ID {r.user_id} · 확인 대기</p><div className="flex gap-3"><button disabled={busy!==null} onClick={()=>decide(r,'rejected')} className="rounded border px-4 py-2 disabled:opacity-40">반려</button><button disabled={busy!==null} onClick={()=>decide(r,'approved')} className="rounded bg-primary px-4 py-2 text-white disabled:opacity-40">확인 후 승인</button></div></article>)}{!records.some(r=>r.status==='pending')&&<p>확인 대기 중인 요청이 없습니다.</p>}<div className="rounded-xl border bg-white p-5"><h3 className="text-lg font-bold text-primary">승인된 실적</h3><p className="mt-2 text-sm text-gray-600">승인을 취소하면 해당 실적이 리그와 공동 목표에서 제외됩니다.</p><div className="mt-4 space-y-3">{records.filter(r=>r.status==='approved').map(r=><article key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"><div><b>{r.title}</b><p className="mt-1 text-sm text-gray-500">참여자 ID {r.user_id} · 확인 완료</p></div><button disabled={busy!==null} onClick={()=>decide(r,'cancelled')} className="rounded border border-red-300 px-4 py-2 text-sm text-red-700 disabled:opacity-40">승인 취소</button></article>)}{!records.some(r=>r.status==='approved')&&<p className="text-sm text-gray-500">승인된 실적이 없습니다.</p>}</div></div></section>}
 {tab==='missions'&&(current.role==='admin'?<MissionForm/>:<p>미션 등록은 관리자 계정에서 할 수 있습니다.</p>)}
 {tab==='periods'&&<MissionManagement/>}
 {tab==='schools'&&current.role==='admin'&&<SchoolPopulation/>}
 </>}</main></div>;
}
