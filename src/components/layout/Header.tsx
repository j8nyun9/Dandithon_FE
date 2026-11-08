import { useEffect, useState } from 'react';
import { session, setSession } from '../../services/api';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export const navItems = [
  { to: '/', label: '홈' },
  { to: '/activities', label: '활동하기' },
  { to: '/league', label: '대학 리그' },
  { to: '/records', label: '의연록' },
  { to: '/about', label: '소개' },
  { to: '/my', label: '마이페이지' },
];

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2 whitespace-nowrap font-serif text-lg font-bold sm:text-xl ${light ? 'text-paper' : 'text-primary'}`}>
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 sm:size-6" aria-hidden="true">
        <g fill="currentColor">
          {[0, 60, 120, 180, 240, 300].map(r => (
            <ellipse key={r} cx="12" cy="6" rx="3" ry="5" transform={`rotate(${r} 12 12)`} opacity="0.9" />
          ))}
          <circle cx="12" cy="12" r="2.4" className="fill-accent" />
        </g>
      </svg>
      단디보상운동
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(session());
  useEffect(() => { const update = () => setCurrent(session()); window.addEventListener('dandi-session', update); return () => window.removeEventListener('dandi-session', update); }, []);

  return (
    <header className="navy-texture sticky top-0 z-30 border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Logo />

        <nav className="hidden h-full shrink-0 items-center gap-1 md:flex lg:gap-3 xl:gap-4">
          {navItems.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `relative flex h-full shrink-0 items-center whitespace-nowrap px-1.5 text-[13px] transition lg:px-2 lg:text-sm ${
                  isActive ? 'font-semibold text-paper' : 'text-paper/70 hover:text-paper'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && <span className="absolute inset-x-0 bottom-4 h-px bg-paper" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {current ? <button onClick={() => setSession(null)} className="shrink-0 whitespace-nowrap rounded-md bg-paper px-3 py-2 text-sm font-semibold text-primary">로그아웃<span className="hidden lg:inline"> ({current.name || current.role})</span></button> : <Link to="/login" className="shrink-0 whitespace-nowrap rounded-md bg-paper px-3 py-2 text-sm font-semibold text-primary">로그인</Link>}
          <button aria-label="메뉴" aria-expanded={open} className="shrink-0 p-2 text-paper md:hidden" onClick={() => setOpen(o => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-6 pb-4 md:hidden">
          {navItems.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block whitespace-nowrap border-b border-white/10 py-4 text-sm ${isActive ? 'font-semibold text-accent' : 'text-paper/80'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}




