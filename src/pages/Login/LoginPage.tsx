import {useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {post,setSession,type Session} from '../../services/api';
export function LoginPage(){
 const [email,setEmail]=useState('knu@demo.local'), [password,setPassword]=useState(''), [error,setError]=useState(''); const navigate=useNavigate(); const location=useLocation();
 async function submit(e:React.FormEvent){e.preventDefault();setError('');try{const value=await post<Session>('/auth/login',{email,password});setSession(value);const from=location.state?.from; const safe=typeof from==='string' && from.startsWith('/') && !from.startsWith('//') && !from.startsWith('/login') ? from : null; navigate(safe || (value.role==='student'?'/activities':'/admin'),{replace:true});}catch(e){setError(e instanceof Error?e.message:'로그인 실패');}}
 return <main className="mx-auto max-w-lg px-6 py-16"><h1 className="font-serif text-3xl font-bold text-primary">로그인</h1><form onSubmit={submit} className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-6"><label>이메일<input className="mt-1 w-full rounded border p-2" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>비밀번호<input className="mt-1 w-full rounded border p-2" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>{error&&<p role="alert" className="text-red-700">{error}</p>}<button className="rounded bg-primary p-3 text-white">로그인</button></form></main>;
}
