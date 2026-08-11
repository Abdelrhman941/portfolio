'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { SPLASH } from './constants';

type SplashMessageProps = {
  primaryText: string;
  secondaryText: string;
  shouldReduceMotion: boolean | null;
};

/**
 * Brackets ( ) slide in from left and right while the text materialises
 * between them. On crossfade the brackets stay put — only the inner
 * text swaps — so the frame feels anchored and continuous.
 *
 * Motion decisions (Jakub primary, Jhey secondary):
 * - Brackets: translateX + opacity, expo-out ease — fast arrive, soft stop
 * - Text: opacity + blur — "materialising" effect from the cookbook
 * - Exit text: subtler than enter (smaller y, quicker fade)
 * - Reduced-motion: everything renders statically, no translate/blur
 */
export function SplashMessage({
  primaryText,
  secondaryText,
  shouldReduceMotion,
}: SplashMessageProps) {
  const [activeText, setActiveText] = useState(primaryText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveText(secondaryText);
    }, SPLASH.secondaryInMs);
    return () => clearTimeout(timer);
  }, [secondaryText]);

  const isReduced = Boolean(shouldReduceMotion);

  return (
    <div className="flex items-center justify-center w-full px-6">
      <div
        className="flex items-center gap-3 md:gap-5"
        style={{ fontFamily: 'var(--font-caveat)' }}
      >
        {/* Left bracket */}
        <motion.span
          className="text-5xl md:text-7xl text-zinc-500 select-none leading-none"
          initial={{ opacity: 0, x: isReduced ? 0 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            isReduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          }
          aria-hidden="true"
        >
          (
        </motion.span>

        {/* Text — crossfades on switch, brackets stay anchored */}
        <div className="min-w-36 md:min-w-56 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeText}
              className="text-3xl md:text-5xl text-zinc-200 text-center whitespace-nowrap"
              initial={{
                opacity: 0,
                y: isReduced ? 0 : 10,
                filter: isReduced ? 'none' : 'blur(6px)',
              }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                y: isReduced ? 0 : -6,
                filter: isReduced ? 'none' : 'blur(3px)',
              }}
              transition={
                isReduced
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.25 }
              }
            >
              {activeText}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right bracket */}
        <motion.span
          className="text-5xl md:text-7xl text-zinc-500 select-none leading-none"
          initial={{ opacity: 0, x: isReduced ? 0 : 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            isReduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          }
          aria-hidden="true"
        >
          )
        </motion.span>
      </div>
    </div>
  );
}
