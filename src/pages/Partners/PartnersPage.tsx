import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {api,session} from '../../services/api';
import {PageHeader,container} from '../../components/common/PageHeader';
type Funnel={counts:Record<string,number|null>;note:string};
const names:Record<string,string>={view:'조회',click:'신청 링크 클릭',applied:'신청 확인',started:'활동 중',pending:'확인 대기',approved:'확인 완료'};
export function PartnersPage(){const [data,setData]=useState<Funnel|null>(null),[error,setError]=useState('');const current=session();useEffect(()=>{if(current&&current.role!=='student')api<Funnel>('/partner/funnel?organization_id=1').then(setData).catch(e=>setError(e.message));},[]);return <><PageHeader eyebrow="PARTNERS" title="기관 현황" desc="기관 담당자가 확인한 참여 현황을 보여줍니다."/><div className={`${container} py-12`}>{!current?<p><Link to="/login" className="underline">기관 계정으로 로그인</Link>해 주세요.</p>:current.role==='student'?<p>기관 담당자 또는 관리자 계정이 필요합니다.</p>:error?<p>{error}</p>:!data?<p>불러오는 중입니다.</p>:<><p className="text-sm text-gray-600">{data.note} 현재 상태별 인원이며 클릭은 실제 신청이 아닙니다.</p><div className="mt-5 grid gap-4 sm:grid-cols-3">{Object.entries(data.counts).map(([key,n])=><div className="rounded-xl border bg-white p-5" key={key}><p>{names[key]||key}</p><b className="mt-3 block text-2xl">{n===null?'비공개':`${n}명`}</b></div>)}</div></>}</div></>;}
