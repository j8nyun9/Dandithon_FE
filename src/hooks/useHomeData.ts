import { useEffect, useState } from 'react';
import { api, session } from '../services/api';

// Re-fetch on login/logout and ignore responses from obsolete requests.
export function useHomeData<T>(path: string | null) {
  const [token, setToken] = useState(() => session()?.token);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{data:T|null;error:string;loading:boolean}>({data:null,error:'',loading:!!path});
  useEffect(() => {
    const update = () => setToken(session()?.token);
    window.addEventListener('dandi-session', update);
    return () => window.removeEventListener('dandi-session', update);
  }, []);
  useEffect(() => {
    let active = true;
    setState({data:null,error:'',loading:!!path});
    if (path) api<T>(path).then(data => {
      if(active) setState({data,error:'',loading:false});
    }).catch(error => {
      if(active) setState({data:null,error:error instanceof Error?error.message:'정보를 불러오지 못했습니다.',loading:false});
    });
    return () => { active = false; };
  }, [path, token, attempt]);
  return {...state, retry: () => setAttempt(value => value + 1), loggedIn: !!token};
}
