import { useEffect, useState } from 'react';
import { getActivities, type Activity } from './services/api';
export function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState('활동을 불러오는 중이에요');
  useEffect(() => {getActivities().then(data => {setActivities(data);setStatus('백엔드 연결 완료');}).catch(() => setStatus('백엔드 실행 상태를 확인해 주세요'));}, []);
  return <main><small>단디보상운동</small><h1>작은 실천을<br/>함께 만드는 변화로</h1><p>{status}</p><h2>오늘의 실천</h2>{activities.map(activity => <article key={activity.id}><strong>{activity.title}</strong><p>{activity.minutes}분 · {activity.points}점</p></article>)}<footer>프론트엔드 · 백엔드 협업 시작 화면</footer></main>;
}
