import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {api,post,session,setSession,type Verification} from '../../services/api';
import {Logo} from '../../components/layout/Header';
import {MissionForm} from './MissionForm';
import {MissionManagement} from './MissionManagement';
export function AdminPage(){
 const [records,setRecords]=useState<Verification[]>([]),[message,setMessage]=useState('');const current=session();
 async function refresh(){setRecords(await api<Verification[]>('/verifications'));}
 useEffect(()=>{if(current&&current.role!=='student')refresh().catch(e=>setMessage(e.message));},[]);
 async function decide(r:Verification,status:'approved'|'rejected'){try{await post(`/missions/${r.mission_id}/verification`,{user_id:r.user_id,status});setMessage(status==='approved'?'담당자 확인으로 승인했습니다.':'반려했습니다.');await refresh();}catch(e){setMessage(e instanceof Error?e.message:'처리 실패');}}
 return <div className="min-h-screen bg-gray-100"><header className="flex justify-between bg-white p-5"><Logo light={false}/><div><Link to="/" className="mr-4 underline">홈</Link>{current&&<button onClick={()=>{setSession(null);location.href='/login';}}>로그아웃</button>}</div></header><main className="mx-auto max-w-3xl space-y-4 p-6"><h1 className="text-2xl font-bold">운영자 실적 확인</h1>{!current?<p><Link className="underline" to="/login">관리자 또는 기관 계정 로그인</Link>이 필요합니다.</p>:current.role==='student'?<p>관리자 또는 기관 계정이 필요합니다.</p>:<><p className="text-sm text-gray-600">기관이 제공한 실적을 확인한 뒤 승인하세요. AI가 증빙을 검증하지 않습니다.</p>{message&&<p role="status">{message}</p>}{records.filter(r=>r.status==='pending').map(r=><article key={r.id} className="rounded-xl bg-white p-4"><b>{r.title}</b><p className="my-2 text-sm">참여자 ID {r.user_id} · 확인 대기</p><div className="flex gap-3"><button onClick={()=>decide(r,'rejected')} className="rounded border px-4 py-2">반려</button><button onClick={()=>decide(r,'approved')} className="rounded bg-primary px-4 py-2 text-white disabled:opacity-40">확인 후 승인</button></div></article>)}{!records.some(r=>r.status==='pending')&&<p>확인 대기 중인 요청이 없습니다.</p>}{current.role==='admin'&&<MissionForm />}<MissionManagement /></>}</main></div>;
}
