import {useEffect,useState} from 'react';
import {Navigate,Outlet,useLocation} from 'react-router-dom';
import {session,setSession} from '../../services/api';
export function RequireAuth(){
 const location=useLocation();
 const [current,setCurrent]=useState(session);
 useEffect(()=>{const refresh=()=>setCurrent(session());window.addEventListener('dandi-session',refresh);return()=>window.removeEventListener('dandi-session',refresh);},[]);
 useEffect(()=>{if(!current)return;const expiry=Number(current.token.split('.')[1])*1000;const timer=window.setTimeout(()=>setSession(null),Math.max(0,expiry-Date.now()));return()=>window.clearTimeout(timer);},[current]);
 if(!current)return <Navigate to="/login" replace state={{from:location.pathname+location.search+location.hash}}/>;
 return <Outlet/>;
}
