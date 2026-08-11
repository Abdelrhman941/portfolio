'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { SkillCluster } from './SkillCluster';
import { skillsData } from './skills-data';

export function Skills() {
  const [focusedClusterId, setFocusedClusterId] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-white py-24 md:py-40 text-zinc-900 z-10 overflow-hidden border-t border-zinc-200/50">
      <div className="mx-auto w-full max-w-5xl px-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6 block">
            Tech Stack
          </span>
          <h2 className="font-(family-name:--font-display) text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter max-w-2xl mb-6">
            The stack behind the work.
          </h2>
          <p className="text-base md:text-lg text-zinc-500 font-light max-w-xl">
            Different tools, one goal: getting the whole system to work.
          </p>
        </motion.div>
      </div>

      <div className="w-full flex flex-col relative" onMouseLeave={() => setFocusedClusterId(null)}>
        <div className="w-full py-4 flex flex-col gap-1 md:gap-0">
          {skillsData.map(cluster => {
            const isFocused = focusedClusterId === cluster.id;
            const isMuted = focusedClusterId !== null && !isFocused;

            return (
              <SkillCluster
                key={cluster.id}
                cluster={cluster}
                isFocused={isFocused}
                isMuted={isMuted}
                onFocus={() => setFocusedClusterId(cluster.id)}
                onBlur={() => {
                  // Clear only if blurring the active item to prevent flicker.
                  if (focusedClusterId === cluster.id) {
                    setFocusedClusterId(null);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
