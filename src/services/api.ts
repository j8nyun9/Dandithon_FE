export type Activity = { id: string; title: string; minutes: number; points: number };
export async function getActivities(): Promise<Activity[]> {
  const response = await fetch('/api/activities');
  if (!response.ok) throw new Error(`API 오류: ${response.status}`);
  const body = await response.json();
  return body.data;
}
