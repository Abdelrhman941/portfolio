'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { createContext, useContext, useEffect, useState } from 'react';

const NavContext = createContext(false);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isNavMode, setIsNavMode] = useState(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300;
    if (latest > threshold && !isNavMode) setIsNavMode(true);
    if (latest <= threshold && isNavMode) setIsNavMode(false);
  });

  // Ensure SSR doesn't mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return <NavContext.Provider value={mounted ? isNavMode : false}>{children}</NavContext.Provider>;
}

export const useNavMode = () => useContext(NavContext);
