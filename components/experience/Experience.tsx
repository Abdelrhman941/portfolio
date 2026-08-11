'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { CertificateArtifact } from './CertificateArtifact';
import { experienceData, type ExperienceItem } from './experience-data';
import type { Variants } from 'motion/react';

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const safeVariants = shouldReduceMotion ? {} : itemVariants;
  const safeContainer = shouldReduceMotion ? {} : containerVariants;

  return (
    <section className="relative w-full bg-white py-24 md:py-40 text-zinc-900 z-10 border-t border-zinc-200/50 overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-24 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={safeVariants}
          >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6 block">
              Experience &amp; Learning
            </span>
            <h2 className="font-(family-name:--font-display) text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter max-w-2xl">
              What I&apos;ve built &mdash; and what shaped how I build.
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={safeContainer}
        >
          {experienceData.map((item) => (
            <TimelineItem
              key={item.id}
              item={item}
              variants={safeVariants}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  variants,
  shouldReduceMotion,
}: {
  item: ExperienceItem;
  variants: Variants;
  shouldReduceMotion: boolean | null;
}) {
  // We only run this hook if we want motion, but hooks must be called unconditionally.
  // We'll use the hook anyway and just apply it conditionally to styles.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  // Smooth the scroll progress so the line feels fluid and professional
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // The dot lights up when the line reaches it (roughly at 10% of this item's height)
  const dotColor = useTransform(smoothProgress, [0, 0.1], ['#e4e4e7', '#18181b']); // zinc-200 to zinc-900

  return (
    <motion.div
      ref={ref}
      variants={variants}
      className="flex flex-col md:flex-row md:gap-8 lg:gap-16 group"
    >
      {/* Left Column: Year/Period */}
      <div className="hidden md:flex w-1/4 justify-end relative pt-2">
        <span className="font-mono text-sm uppercase tracking-widest text-zinc-400 font-medium md:sticky md:top-32 h-fit transition-colors group-hover:text-zinc-900">
          {item.period}
        </span>
      </div>

      {/* Mobile Year */}
      <div className="md:hidden mb-4 mt-12 first:mt-0">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium">
          {item.period}
        </span>
      </div>

      {/* Right Column: Timeline Content */}
      <div className="w-full md:w-3/4 relative md:pl-12 lg:pl-16 pb-16 md:pb-32 last:pb-0">
        {/* Background Line (Desktop only) */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-zinc-200" />

        {/* Animated Fill Line (Desktop only) */}
        {!shouldReduceMotion && (
          <motion.div
            className="hidden md:block absolute left-0 top-0 w-px bg-zinc-900 origin-top z-10"
            style={{ height }}
          />
        )}

        {/* Timeline Dot (Desktop only) */}
        <motion.div
          className="hidden md:block absolute -left-1.25 top-3.5 w-2.5 h-2.5 rounded-full ring-4 ring-white transition-colors duration-300 group-hover:bg-zinc-900 z-20"
          style={{ backgroundColor: shouldReduceMotion ? '#e4e4e7' : dotColor }}
        />

        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 mb-2">
          {item.role}
        </h3>
        <p className="text-sm md:text-base font-medium text-zinc-400 mb-6 md:mb-8 uppercase tracking-wide">
          {item.company}
        </p>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
          {item.description}
        </p>

        {/* Topics line */}
        <p className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest max-w-2xl leading-loose">
          {item.scope.join(' \u00b7 ')}
        </p>

        {/* Conditional DEPI Certificate Artifact */}
        {item.company.includes('DEPI') && (
          <div className="mt-12 w-full max-w-xl">
            <CertificateArtifact />
          </div>
        )}
      </div>
    </motion.div>
  );
}
