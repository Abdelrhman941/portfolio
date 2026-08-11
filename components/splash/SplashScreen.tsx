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

  // Avoid a flash of the wrong state during the first client render.
  if (showSplash === null) return null;

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: shouldReduceMotion ? 0 : 1,
              clipPath: shouldReduceMotion ? undefined : 'inset(0 0 100% 0)',
            }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : SPLASH.exitTransitionS,
              ease: [0.77, 0, 0.175, 1],
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
