import { Link } from 'react-router-dom';
import { session } from '../../services/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHomeData } from '../../hooks/useHomeData';
import { PageHeader, container } from '../../components/common/PageHeader';
import './RecordsPage.css';

type Ledger = {semester_id:number;semester_name:string;participants:{name:string;school_id:number;school_name:string;approved_count:number}[]};
const PAGE_SIZE = 40;
const DEFAULT_SCHOOLS = [
  {id:1,name:'경북대학교'},
  {id:2,name:'영남대학교'},
  {id:3,name:'계명대학교'},
  {id:4,name:'금오공과대학교'},
  {id:5,name:'대구대학교'},
];
export function RecordsPage() {
  const [loggedIn,setLoggedIn] = useState(() => !!session());
  useEffect(() => {const update=()=>setLoggedIn(!!session());window.addEventListener('dandi-session',update);return()=>window.removeEventListener('dandi-session',update);}, []);
  const {data,error,loading,retry} = useHomeData<Ledger>(loggedIn?'/ledger?semester_id=1':null);
  const [schoolId,setSchoolId] = useState<number|null>(null);
  const [query,setQuery] = useState('');
  const [page,setPage] = useState(1);
  const ledgerRef = useRef<HTMLElement>(null);
  const entries = data?.participants || [];
  const schools = useMemo(() => [...new Map([...DEFAULT_SCHOOLS.map(s => [s.id,s.name] as const),...entries.map(person => [person.school_id,person.school_name] as const)]).entries()].map(([id,name])=>({id,name,count:entries.filter(person=>person.school_id===id).length})),[data]);
  const visible = useMemo(() => entries.filter(person => (schoolId===null || person.school_id===schoolId) && (!query.trim() || `${person.name} ${person.school_name}`.normalize('NFC').includes(query.trim().normalize('NFC')))),[data,schoolId,query]);
  const totalPages = Math.max(1,Math.ceil(visible.length/PAGE_SIZE));
  const currentPage = Math.min(page,totalPages);
  const offset = (currentPage-1)*PAGE_SIZE;
  const pageEntries = visible.slice(offset,offset+PAGE_SIZE);
  const pageNumbers = Array.from(new Set([1,totalPages,...Array.from({length:5},(_,index)=>currentPage-2+index).filter(value=>value>=1&&value<=totalPages)])).sort((a,b)=>a-b);
  const reset = () => {setSchoolId(null);setQuery('');setPage(1);};
  function goToPage(next:number){setPage(next);ledgerRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}
  return <>
    <PageHeader eyebrow="DIGITAL LEDGER" title="디지털 의연록" desc="한 시즌 동안 봉사로 함께한 이들의 이름을, 소속 학교와 함께 기록합니다." />
    <div className={`${container} py-12`}>
      {!loggedIn ? <section className="ledger-paper paper-texture" aria-label="시즌 의연록 로그인 안내"><header className="ledger-heading"><p className="ledger-kicker">단디보상운동 · 시즌 참여 기록</p><h2>義捐錄</h2><p className="ledger-subtitle">함께한 이들의 이름을 기록함</p></header><div className="ledger-empty"><p>로그인 후 의연록을 확인할 수 있습니다.</p><Link to="/login" state={{from:'/records'}} className="mt-6 inline-block border border-ink px-6 py-2 text-sm text-ink underline-offset-4 hover:underline">로그인하기</Link></div><footer className="ledger-footer"><span>해당 시즌 승인 실적이 있는 참여자를 소속 학교별로 한 번씩 기재합니다.</span></footer></section> : error ? <div role="alert" className="rounded-xl bg-white p-8"><p>시즌 의연록을 불러오지 못했습니다.</p><p className="mt-2 text-sm text-gray-500">{error}</p><button onClick={retry} className="mt-3 underline">다시 불러오기</button></div> : loading || !data ? <p role="status">시즌 의연록을 불러오는 중입니다.</p> : <>
        <div className="ledger-tools">
          <div><p className="text-xs font-semibold tracking-widest text-accent-deep">{data.semester_name}</p><h2 className="mt-2 font-serif text-xl font-bold text-primary">함께한 {entries.length.toLocaleString()}명의 이름</h2><p className="mt-2 text-xs text-gray-500">학교와 이름으로 찾아보세요. 한 장에 최대 {PAGE_SIZE}명을 기록합니다.</p></div>
          <div className="ledger-search"><label htmlFor="ledger-search">이름 또는 학교 검색</label><div><input id="ledger-search" type="search" maxLength={100} value={query} onChange={event=>{setQuery(event.target.value);setPage(1);}}/>{query&&<button aria-label="검색어 지우기" onClick={()=>{setQuery('');setPage(1);}}>지우기</button>}</div></div>
        </div>
        <div className="ledger-school-filters" aria-label="학교별 의연록"><button aria-pressed={schoolId===null} onClick={()=>{setSchoolId(null);setPage(1);}}>전체 학교 <span>{entries.length.toLocaleString()}</span></button>{schools.map(s=><button key={s.id} aria-pressed={schoolId===s.id} onClick={()=>{setSchoolId(s.id);setPage(1);}}>{s.name} <span>{s.count.toLocaleString()}</span></button>)}</div>
        <section ref={ledgerRef} className="ledger-paper paper-texture" aria-label="시즌 전체 참여자 의연록">
          <header className="ledger-heading"><p className="ledger-kicker">단디보상운동 · {data.semester_name}</p><h2>義捐錄</h2><p className="ledger-subtitle">함께한 이들의 이름을 기록함</p></header>
          <div className="ledger-summary" role="status" aria-live="polite"><span>{schoolId===null?'전체 학교':schools.find(s=>s.id===schoolId)?.name}{query.trim()?` · “${query.trim()}” 검색`:''}</span><span>{visible.length.toLocaleString()}명 중 {visible.length?offset+1:0}–{Math.min(offset+PAGE_SIZE,visible.length)}명</span></div>
          {visible.length===0 ? <div className="ledger-empty"><p>{entries.length===0?'이 시즌에 기록된 봉사활동 참여자가 없습니다.':'조건에 맞는 이름이 없습니다.'}</p>{entries.length>0&&<button onClick={reset}>전체 명단 보기</button>}</div> : <div className="ledger-roster">{schools.filter(s=>pageEntries.some(person=>person.school_id===s.id)).map(s=><section key={s.id} className="ledger-school-group"><div className="ledger-group-heading"><h3>{s.name}</h3><span>이 장의 기록 {pageEntries.filter(person=>person.school_id===s.id).length}명</span></div><ul>{pageEntries.filter(person=>person.school_id===s.id).map((person,index)=><li key={`${s.id}-${index}`}><span>{person.name}</span></li>)}</ul></section>)}</div>}
          <footer className="ledger-footer"><span>해당 시즌 승인 실적이 있는 참여자를 소속 학교별로 한 번씩 기재합니다.</span><strong>第 {currentPage} 張</strong></footer>
        </section>
        {visible.length>0&&<nav className="ledger-pagination" aria-label="의연록 페이지"><button disabled={currentPage===1} onClick={()=>goToPage(currentPage-1)}>이전 장</button><div>{pageNumbers.map((value,index)=><span key={value}>{index>0&&value-pageNumbers[index-1]>1&&<span className="ledger-page-gap">…</span>}<button aria-label={`${value}페이지`} aria-current={value===currentPage?'page':undefined} onClick={()=>goToPage(value)}>{value}</button></span>)}</div><button disabled={currentPage===totalPages} onClick={()=>goToPage(currentPage+1)}>다음 장</button><p>{currentPage} / {totalPages}장</p></nav>}
      </>}
    </div>
  </>;
}



