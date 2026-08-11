'use client';

import { motion } from 'motion/react';
import { SkillMarquee } from './SkillMarquee';
import { type SkillClusterData } from './skills-data';

export function SkillCluster({
  cluster,
  isFocused,
  isMuted,
  onFocus,
  onBlur,
}: {
  cluster: SkillClusterData;
  isFocused: boolean;
  isMuted: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div
      className="w-full flex flex-col relative py-2 md:py-4 cursor-default md:cursor-crosshair group"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onClick={isFocused ? onBlur : onFocus}
    >
      <div
        className={`transition-all duration-700 w-full max-w-5xl mx-auto px-6 mb-2 flex items-baseline gap-4 ${isMuted ? 'opacity-20 translate-x-2' : 'opacity-100 translate-x-0'}`}
      >
        <h3
          className={`font-mono text-sm md:text-base tracking-widest uppercase transition-colors duration-500 whitespace-nowrap ${isFocused ? 'text-zinc-900 font-bold' : 'text-zinc-500 font-semibold'}`}
        >
          {cluster.name}
        </h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused && cluster.evidence ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:block overflow-hidden pointer-events-none"
        >
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest whitespace-nowrap">
            {cluster.evidence}
          </span>
        </motion.div>
      </div>

      <div
        className={`w-full transition-colors duration-700 ${isFocused ? 'bg-zinc-100/50' : 'bg-zinc-50'}`}
      >
        <SkillMarquee
          skills={cluster.skills}
          direction={cluster.direction}
          isFocused={isFocused}
          isMuted={isMuted}
        />
      </div>

      {/* Mobile evidence below the marquee */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isFocused && cluster.evidence ? 'auto' : 0,
          opacity: isFocused && cluster.evidence ? 1 : 0,
        }}
        className="md:hidden overflow-hidden w-full max-w-5xl mx-auto px-6"
      >
        <div className="pt-2 pb-1">
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">
            {cluster.evidence}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
