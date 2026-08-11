'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { SPLASH, STORAGE_KEY } from '../splash/constants';

export function Hero() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // Ignore
    }
    const isDevReset = window.location.search.includes('reset_splash');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFirstLoad(!alreadySeen || isDevReset);
  }, []);

  return <HeroContent isFirstLoad={isFirstLoad} />;
}

function HeroContent({ isFirstLoad }: { isFirstLoad: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Color system transitions (Dark to Light)
  const bgDark = '#09090b'; // zinc-950
  const bgLight = '#fafafa'; // zinc-50

  const textLight = '#f4f4f5'; // zinc-100
  const textDark = '#18181b'; // zinc-900

  const textSecondaryLight = '#a1a1aa'; // zinc-400
  const textSecondaryDark = '#71717a'; // zinc-500

  const textMutedLight = '#52525b'; // zinc-600
  const textMutedDark = '#a1a1aa'; // zinc-400

  // Map progress to styles
  const backgroundColor = useTransform(scrollYProgress, [0, 0.7], [bgDark, bgLight]);
  const primaryColor = useTransform(scrollYProgress, [0, 0.7], [textLight, textDark]);
  const secondaryColor = useTransform(
    scrollYProgress,
    [0, 0.7],
    [textSecondaryLight, textSecondaryDark]
  );
  const mutedColor = useTransform(scrollYProgress, [0, 0.7], [textMutedLight, textMutedDark]);

  // Name scaling & translation
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const nameY = useTransform(scrollYProgress, [0, 1], ['0vh', '-38vh']);
  const nameTracking = useTransform(scrollYProgress, [0, 1], ['-0.04em', '-0.01em']);

  // Fade out supporting text early in the scroll
  const supportOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const supportY = useTransform(scrollYProgress, [0, 0.4], ['0px', '-40px']);

  // Allow background color to transition even in reduced motion since it doesn't trigger motion sickness
  const safeBg = backgroundColor;

  const delayBase = isFirstLoad
    ? shouldReduceMotion
      ? SPLASH.reducedMotionMs / 1000
      : SPLASH.totalMs / 1000
    : 0.1;
  const animProps = (offset: number) => ({
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: delayBase + offset },
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${shouldReduceMotion ? 'h-[110vh]' : 'h-[150vh] md:h-[200vh]'}`}
    >
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: safeBg }}
      >
        <div className="relative flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="mb-6 md:mb-8 flex flex-col items-center gap-3"
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: supportOpacity, y: supportY }}
          >
            <motion.span
              className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] block"
              style={shouldReduceMotion ? { color: textSecondaryLight } : { color: secondaryColor }}
              {...animProps(0.3)}
            >
              AI Engineer &middot; Full-Stack AI Systems
            </motion.span>
          </motion.div>

          <motion.h1
            className="font-(family-name:--font-display) text-7xl sm:text-8xl lg:text-[10rem] font-bold leading-none tracking-tighter"
            style={
              shouldReduceMotion
                ? { color: textLight }
                : {
                    color: primaryColor,
                    scale: nameScale,
                    y: nameY,
                    letterSpacing: nameTracking,
                    transformOrigin: 'center center',
                  }
            }
          >
            <motion.span className="block" {...animProps(0.15)}>
              Abdelrhman
            </motion.span>
          </motion.h1>

          <motion.div
            className="mt-8 md:mt-12 flex max-w-2xl flex-col items-center gap-5 md:gap-6"
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: supportOpacity, y: supportY }}
          >
            <motion.div className="flex flex-col items-center gap-5 md:gap-6" {...animProps(0.45)}>
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight"
                style={shouldReduceMotion ? { color: textLight } : { color: primaryColor }}
              >
                I build production AI systems end-to-end.
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg"
                style={
                  shouldReduceMotion ? { color: textSecondaryLight } : { color: secondaryColor }
                }
              >
                From model orchestration to scalable infrastructure and polished interfaces. Systems
                that ship, scale, and deliver.
              </motion.p>

              <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-medium">
                {['AI / RAG', 'Backend', 'Frontend', 'Infrastructure'].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 md:gap-4">
                    <motion.span
                      style={shouldReduceMotion ? { color: textMutedLight } : { color: mutedColor }}
                    >
                      {item}
                    </motion.span>
                    {i < 3 && (
                      <motion.span
                        style={
                          shouldReduceMotion ? { color: textMutedLight } : { color: mutedColor }
                        }
                      >
                        &middot;
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll affordance */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2"
          style={shouldReduceMotion ? { opacity: 1 } : { opacity: supportOpacity }}
          {...animProps(0.8)}
        >
          <motion.div
            className="h-10 md:h-12 w-px"
            style={
              shouldReduceMotion
                ? { backgroundColor: textMutedLight }
                : { backgroundColor: mutedColor }
            }
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scaleY: [0, 1, 0],
                    originY: [0, 0, 1],
                    opacity: [0, 1, 0],
                  }
            }
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
