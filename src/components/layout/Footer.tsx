import { Link } from 'react-router-dom';
import { Logo, navItems } from './Header';

export function Footer() {
  return (
    <footer className="navy-texture text-paper/70">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            누구는 돈을, 누구는 반지를 내놓았던 1907년 국채보상운동처럼. 대학생이 각자 형편대로 내어놓은 시간과 재능,
            헌혈을 학교의 공동 성취로 모읍니다.
          </p>
          <p className="mt-4 font-serif text-sm text-paper">각자 할 수 있는 만큼, 우리 학교의 이름으로.</p>
        </div>
        <div>
          <p className="mb-4 text-xs tracking-widest text-paper/50">MENU</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map(n => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs tracking-widest text-paper/50">ABOUT</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>2026 단디톤 해커톤 프로젝트</li>
            <li>
              <Link to="/partners" className="hover:text-paper">
                기관·기업 파트너
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-paper">
                운영자 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-paper/40">
          © 2026 단디보상운동 · 화면의 수치는 시연용 데이터입니다.
        </p>
      </div>
    </footer>
  );
}
