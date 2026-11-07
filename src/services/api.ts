export type Role = 'student' | 'admin' | 'partner';
export type Session = { token: string; role: Role; user_id: number; school_id:number|null; expires_in: number };
export type Mission = { id:number; title:string; notice:string; eligibility:string; application_period:string; application_note:string; contribution_value:number; completion_policy:string; weights:Record<string,number>; source_url:string; is_demo:boolean; application_start:string|null; application_end:string|null };
export type Verification = { id:number; mission_id:number; user_id:number; status:string; title:string; source:string|null; external_record_id:string|null };
export type League = { semester_id:number; rules:string; schools:{school_id:number;school:string;overall:number;axes:Record<string,number>}[] };
export function session():Session|null { try { const value=JSON.parse(sessionStorage.getItem('dandi-session') || 'null') as Session|null; if(!value || typeof value.token!=='string') return null; const parts=value.token.split('.'); const expiry=Number(parts[1]); if(parts.length!==3 || !Number.isFinite(expiry) || expiry*1000<=Date.now()) return null; return value; } catch {return null;} }
export function setSession(value:Session|null) { if(value) sessionStorage.setItem('dandi-session',JSON.stringify(value)); else sessionStorage.removeItem('dandi-session'); window.dispatchEvent(new Event('dandi-session')); }
export async function api<T>(path:string,options:RequestInit={}):Promise<T> {
 const token=session()?.token; const response=await fetch('/api'+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...options.headers}});
 const body=await response.json(); if(response.status===401 && path!=='/auth/login') setSession(null); if(!response.ok) throw new Error(body.error?.message || `요청 오류 (${response.status})`); return body.data as T;
}
export const post = <T>(path:string,body:unknown={}) => api<T>(path,{method:'POST',body:JSON.stringify(body)});
export type Activity = { id:string;title:string;minutes:number;points:number };
export const getActivities=()=>api<Activity[]>('/activities');
