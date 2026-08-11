'use client';

import { motion, useReducedMotion } from 'motion/react';

export function About() {
  const shouldReduceMotion = useReducedMotion();

  // Restrained motion: text blocks subtly blur and slide in as they scroll into view.
  const revealVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const safeVariants = shouldReduceMotion ? {} : revealVariants;

  return (
    <section className="relative w-full bg-zinc-50 py-24 md:py-48 text-zinc-900 z-10">
      <div className="mx-auto w-full max-w-5xl px-6">

        {/* Section Marker */}
        <div className="mb-16 md:mb-32 flex">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
            01 &mdash; Context
          </span>
        </div>

        {/* Editorial 2-Column Layout */}
        <div className="flex flex-col md:flex-row md:items-start gap-16 md:gap-24">

          {/* Left Column (Sticky Statement & Future Portrait Space) */}
          <div className="w-full md:w-5/12 md:sticky md:top-48 flex flex-col gap-8">
            <h2 className="font-(family-name:--font-display) text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter">
              Engineering beyond the model.
            </h2>

            {/* Compositional space intentionally left for a future portrait.
                The structural line provides a quiet visual boundary. */}
            <div className="hidden md:block w-8 h-px bg-zinc-300 mt-4" aria-hidden="true" />

            {/* The negative space below acts as a balance to the right column,
                ready to accept an aspect-[3/4] portrait later without layout shifts. */}
          </div>

          {/* Right Column (Scrolling Narrative) */}
          <div className="w-full md:w-7/12 flex flex-col gap-12 md:gap-16 md:pt-4">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={safeVariants}
            >
              <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight">
                Most AI products fail between the notebook and production. I focus on the space in between.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={safeVariants}
              className="flex flex-col gap-8 text-base md:text-lg text-zinc-600 leading-relaxed"
            >
              <p>
                An API call to a model is just the beginning. I care about the engineering layer that turns raw AI capabilities into complete, maintainable products. My strength lies in end-to-end product ownership and the engineering systems surrounding AI&mdash;architecting secure backends, integrating specialized AI components into clean architectures, and delivering performant, user-centric frontends.
              </p>

              <p>
                I work iteratively: build, evaluate, refactor, improve. Whether I am configuring Docker infrastructure, optimizing UI performance, or designing WebSocket APIs, I rely on rigorous engineering judgment. I use AI coding aids pragmatically to move faster, but I personally research, evaluate, and own every architectural decision that ships to production.
              </p>

              <ul className="mt-2 flex flex-col gap-2 text-sm text-zinc-500 border-l border-zinc-200 pl-4 py-1">
                <li>AI-powered products & integrations</li>
                <li>Backend APIs & real-time systems</li>
                <li>Responsive, performant frontend experiences</li>
                <li>Dockerized, production-oriented infrastructure</li>
              </ul>
            </motion.div>

            {/* Supporting Restrained Metadata */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={safeVariants}
              className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Mindset</span>
                <span className="text-sm font-medium text-zinc-800">Product-first engineering</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Execution</span>
                <span className="text-sm font-medium text-zinc-800">End-to-end ownership</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
