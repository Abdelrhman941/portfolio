'use client';

import { motion } from 'motion/react';
import { collaboratorsData } from './collaborators-data';
import { InfiniteCards } from './InfiniteCards';

export function Collaborators() {
  return (
    <section className="relative w-full bg-zinc-50 py-24 md:py-40 text-zinc-900 z-10 overflow-hidden border-t border-zinc-200/50">
      <div className="mx-auto w-full max-w-5xl px-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6 block">
            Collaborators
          </span>
          <h2 className="font-(family-name:--font-display) text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter max-w-2xl mb-6">
            From people I&apos;ve built with.
          </h2>
          <p className="text-base md:text-lg text-zinc-500 font-light max-w-xl">
            Feedback from teammates and collaborators across the systems I&apos;ve worked on.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full flex flex-col relative"
      >
        <InfiniteCards items={collaboratorsData} speed="slow" />
      </motion.div>

      <div className="mx-auto w-full max-w-5xl px-6 mt-12 flex justify-end">
        <a 
          href="https://unavatar.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors font-mono"
        >
          Avatars by unavatar.io
        </a>
      </div>
    </section>
  );
}
