'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { SPLASH } from './constants';
import { SplashMessage } from './SplashMessage';
import { useSplashVisibility } from './useSplashVisibility';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const { showSplash, setShowSplash, markSplashSeen } = useSplashVisibility();
  const shouldReduceMotion = useReducedMotion();

  const handleAnimationComplete = () => {
    markSplashSeen();
    setShowSplash(false);
  };

  // Avoid a flash of the wrong state during the first client render by covering the screen
  // until hydration determines if the splash should play.
  // We do NOT return null here so that `children` is always rendered for bots/SEO.

  return (
    <>
      {/* SSR/Hydration fallback overlay */}
      {showSplash === null && <div className="fixed inset-0 z-[100] bg-zinc-950" />}

      <AnimatePresence>
        {showSplash === true && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -30,
              filter: shouldReduceMotion ? 'none' : 'blur(4px)',
            }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : SPLASH.exitTransitionS,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            <div className="relative flex flex-col items-center justify-center w-full max-w-md h-full px-6">
              <SplashContent
                onComplete={handleAnimationComplete}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio content — always rendered, revealed by the clip-path exit above */}
      {children}
    </>
  );
}

function SplashContent({
  onComplete,
  shouldReduceMotion,
}: {
  onComplete: () => void;
  shouldReduceMotion: boolean | null;
}) {
  useEffect(() => {
    const duration = shouldReduceMotion ? SPLASH.reducedMotionMs : SPLASH.totalMs;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <SplashMessage
        primaryText="Hey, welcome."
        secondaryText="Come on in."
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}
