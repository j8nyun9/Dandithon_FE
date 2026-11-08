import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from './Header';

export function MobileNavigation() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
    let anchor = Math.max(0, window.scrollY);
    let frame = 0;
    const update = () => {
      frame = 0;
      // Clamp elastic overscroll so bouncing at the bottom cannot reverse direction.
      const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(limit, Math.max(0, window.scrollY));
      if (y <= 24) {
        setHidden(false);
        anchor = y;
      } else if (Math.abs(y - anchor) >= 12) {
        setHidden(y > anchor);
        anchor = y;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="모바일 하단 메뉴"
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-paper-deep bg-paper/95 pb-[env(safe-area-inset-bottom)] text-primary shadow-[0_-4px_18px_rgb(0_0_0/0.08)] backdrop-blur transition-transform duration-200 motion-reduce:transition-none md:hidden ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
    >
      <div className="grid h-16 grid-cols-6">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `flex min-w-0 items-center justify-center whitespace-nowrap border-t-2 text-[clamp(10px,2.6vw,12px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent ${isActive ? 'border-accent font-bold text-accent' : 'border-transparent text-primary/75'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
