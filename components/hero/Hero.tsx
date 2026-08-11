'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { SPLASH, STORAGE_KEY } from '../splash/constants';
import { SplineScene } from '../ui/spline';

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

import { useNavMode } from '../navbar/NavProvider';

export function HeroContent({ isFirstLoad }: { isFirstLoad: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isNavMode = useNavMode();

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

  // Name scaling & translation (we keep these so it shrinks physically on scroll, then hands off to Navbar)
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const nameY = useTransform(scrollYProgress, [0, 1], ['0vh', '-38vh']);
  const nameTracking = useTransform(scrollYProgress, [0, 1], ['-0.04em', '-0.01em']);

  // Robot scroll choreography
  const robotScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const robotX = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const robotOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0]);

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
        {/* 3D Visual Companion */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute right-[-30%] md:right-0 top-[25%] md:top-1/2 md:-translate-y-1/2 z-0 flex items-center justify-end pointer-events-auto w-[130vw] md:w-[50vw] h-[60vh] md:h-[70vh] mix-blend-screen md:mix-blend-normal"
            style={{ scale: robotScale, x: robotX, opacity: robotOpacity }}
          >
            <motion.div
              className="w-full h-full max-w-200 opacity-25 md:opacity-100"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: delayBase + 0.6, duration: 1.5 }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Text Layer (Asymmetric Layout) */}
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-start justify-center px-6 text-left pointer-events-none h-full md:pt-[10vh] md:translate-x-[-4vw] lg:translate-x-[-6vw]">
          <div className="flex flex-col items-start w-full md:w-[60%] lg:w-[55%]">
            <motion.div
              className="mb-6 md:mb-8 flex flex-col items-start gap-3"
              style={shouldReduceMotion ? { opacity: 1 } : { opacity: supportOpacity, y: supportY }}
            >
              <motion.span
                className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] block"
                style={
                  shouldReduceMotion ? { color: textSecondaryLight } : { color: secondaryColor }
                }
                {...animProps(0.3)}
              >
                AI Engineer &middot; Full-Stack AI Systems
              </motion.span>
            </motion.div>

            <motion.div
              className="font-(family-name:--font-display) text-7xl sm:text-8xl lg:text-[10rem] font-bold leading-none tracking-tighter"
              style={
                shouldReduceMotion
                  ? { color: textLight }
                  : {
                      color: primaryColor,
                      scale: nameScale,
                      y: nameY,
                      letterSpacing: nameTracking,
                      transformOrigin: 'left center',
                    }
              }
            >
              {!isNavMode ? (
                <motion.span layoutId="abdelrhman-brand" className="block" {...animProps(0.15)}>
                  Abdelrhman
                </motion.span>
              ) : (
                <span className="block opacity-0">Abdelrhman</span>
              )}
            </motion.div>

            <motion.div
              className="mt-8 md:mt-12 flex max-w-2xl flex-col items-start gap-5 md:gap-6"
              style={shouldReduceMotion ? { opacity: 1 } : { opacity: supportOpacity, y: supportY }}
            >
              <motion.div className="flex flex-col items-start gap-5 md:gap-6" {...animProps(0.45)}>
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight"
                  style={shouldReduceMotion ? { color: textLight } : { color: primaryColor }}
                >
                  I build production AI systems end-to-end.
                </motion.h2>

                <div className="mt-2 pointer-events-auto">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-zinc-300 transition-colors bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md"
                  >
                    View selected work <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <motion.p
                  className="text-base sm:text-lg max-w-md"
                  style={
                    shouldReduceMotion ? { color: textSecondaryLight } : { color: secondaryColor }
                  }
                >
                  From model orchestration to scalable infrastructure and polished interfaces.
                  Systems that ship, scale, and deliver.
                </motion.p>

                <div className="mt-4 md:mt-6 flex flex-wrap justify-start gap-3 md:gap-4 text-xs md:text-sm font-medium max-w-md">
                  {['AI / RAG', 'Backend', 'Frontend', 'Infrastructure'].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 md:gap-4">
                      <motion.span
                        style={
                          shouldReduceMotion ? { color: textMutedLight } : { color: mutedColor }
                        }
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
