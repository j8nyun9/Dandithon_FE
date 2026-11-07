import {useEffect,useState} from 'react';
import {api} from '../../services/api';
type Population={id:number;name:string;student_count:number|null;reference_year:number|null;source_url:string|null;is_estimate:boolean};
export function SchoolPopulation(){
 const [schools,setSchools]=useState<Population[]>([]),[error,setError]=useState('');
 useEffect(()=>{api<Population[]>('/admin/school-populations?semester_id=1').then(setSchools).catch(e=>setError(e.message));},[]);
 return <section className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold text-primary">학교 규모</h2><p className="mt-2 text-sm text-gray-600">학교 규모는 리그 점수 산정에 사용됩니다.</p>{error&&<p role="alert">{error}</p>}<div className="mt-4 space-y-2">{schools.map(s=><div key={s.id} className="rounded border p-3"><b>{s.name}</b><span className="ml-3">{s.student_count?`${s.student_count.toLocaleString()}명${s.reference_year?` (${s.reference_year}년)`:''}`:'미산정'}</span>{s.source_url&&<a className="ml-3 underline" href={s.source_url} target="_blank" rel="noreferrer">출처</a>}</div>)}</div></section>;
}
