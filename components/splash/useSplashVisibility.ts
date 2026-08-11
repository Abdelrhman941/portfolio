'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-intro-seen';

/**
 * Decides whether the splash plays this session.
 * - New tab / new session -> show it.
 * - Refresh in the same tab -> stay hidden (sessionStorage).
 * - ?reset_splash=true -> force it back on, for local dev.
 */
export function useSplashVisibility() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY) !== null;
    const params = new URLSearchParams(window.location.search);
    const isDevReset = params.get('reset_splash') === 'true';

    if (isDevReset) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSplash(isDevReset || !alreadySeen);
  }, []);

  const markSplashSeen = () => sessionStorage.setItem(STORAGE_KEY, 'true');

  return { showSplash, setShowSplash, markSplashSeen };
}
