import {useEffect,useState} from 'react';
import {api} from '../../services/api';
type Population={id:number;name:string;student_count:number|null;reference_year:number|null;source_url:string|null};
export function SchoolPopulation(){
 const [schools,setSchools]=useState<Population[]>([]),[error,setError]=useState(''),[status,setStatus]=useState<{message?:string;last_success?:number;running:boolean}|null>(null);
 useEffect(()=>{api<Population[]>('/admin/school-populations?semester_id=1').then(setSchools).catch(e=>setError(e.message));api<{message?:string;last_success?:number;running:boolean}>('/admin/school-population-status').then(setStatus).catch(e=>setError(e.message));},[]);
 return <section className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold text-primary">학교 규모</h2><p className="mt-2 text-sm text-gray-600">AI가 공식 자료를 확인해 연 1회 갱신합니다. 확인되지 않은 학교는 리그 점수를 산정하지 않습니다.</p>{status&&<p className="mt-2 text-sm text-gray-600">{status.running?'확인 중':status.message||'아직 확인하지 않았습니다.'}</p>}{error&&<p role="alert">{error}</p>}<div className="mt-4 space-y-2">{schools.map(s=><div key={s.id} className="rounded border p-3"><b>{s.name}</b><span className="ml-3">{s.student_count?`${s.student_count.toLocaleString()}명 (${s.reference_year}년)`:'미산정'}</span>{s.source_url&&<a className="ml-3 underline" href={s.source_url} target="_blank" rel="noreferrer">출처</a>}</div>)}</div></section>;
}
