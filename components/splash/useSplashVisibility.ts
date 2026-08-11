'use client';

import { useEffect, useState } from 'react';
import { STORAGE_KEY } from './constants';

/**
 * Decides whether the splash plays this session.
 * - New tab / new session -> show it.
 * - Refresh in the same tab -> stay hidden (sessionStorage).
 * - ?reset_splash=true -> force it back on, for local dev.
 */
export function useSplashVisibility() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // Ignore sessionStorage errors (e.g., cross-site tracking prevention)
    }

    const params = new URLSearchParams(window.location.search);
    const isDevReset = params.get('reset_splash') === 'true';

    if (isDevReset) {
      params.delete('reset_splash');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSplash(isDevReset || !alreadySeen);
  }, []);

  const markSplashSeen = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore errors
    }
  };

  return { showSplash, setShowSplash, markSplashSeen };
}
