import { NavLink, Outlet } from 'react-router-dom';
import { PageHeader, container } from '../../components/common/PageHeader';

const tabs = [
  { to: '/activities', label: 'AI 활동 추천' },
  { to: '/activities/verify', label: '참여 인증' },
];

export function ActivitiesLayout() {
  return (
    <>
      <PageHeader
        eyebrow="ACTIVITIES"
        title="활동하기"
        desc="내가 내어놓을 수 있는 시간과 재능, 헌혈을 찾고 참여를 인증하세요. 인증된 참여는 우리 학교의 단디 지수가 됩니다."
      />
      <div className="sticky top-16 z-20 border-b border-gray-200 bg-white">
        <nav className={`${container} flex gap-6`}>
          {tabs.map(t => (
            <NavLink
              key={t.to}
              to={t.to}
              end
              className={({ isActive }) =>
                `border-b-2 py-4 text-sm font-semibold ${
                  isActive ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-gray-700'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={`${container} py-16`}>
        <Outlet />
      </div>
    </>
  );
}
