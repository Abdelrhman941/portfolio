'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { Project } from './project-data';

type ProjectCardProps = {
  project: Project;
  index: number;
  currentIndex: number;
  shouldReduceMotion: boolean | null;
  onActivate: () => void;
};

export function ProjectCard({
  project,
  index,
  currentIndex,
  shouldReduceMotion,
  onActivate,
}: ProjectCardProps) {
  const distance = index - currentIndex;
  const isActive = distance === 0;

  // Reduced motion: Crossfade only.
  const reducedVariants = {
    active: { opacity: 1, x: 0, scale: 1, display: 'block', zIndex: 10 },
    inactive: { opacity: 0, x: 0, scale: 1, transitionEnd: { display: 'none' }, zIndex: 0 },
  };

  // Standard motion: Subtle 3D perspective.
  const standardVariants = {
    active: {
      opacity: 1,
      x: '0%',
      scale: 1,
      rotateY: 0,
      zIndex: 10,
      display: 'block',
      filter: 'blur(0px)',
    },
    prev: {
      opacity: 0.4,
      x: '-35%',
      scale: 0.9,
      rotateY: 8,
      zIndex: 5,
      display: 'block',
      filter: 'blur(2px)',
    },
    next: {
      opacity: 0.4,
      x: '35%',
      scale: 0.9,
      rotateY: -8,
      zIndex: 5,
      display: 'block',
      filter: 'blur(2px)',
    },
    hiddenLeft: {
      opacity: 0,
      x: '-60%',
      scale: 0.8,
      rotateY: 15,
      zIndex: 0,
      transitionEnd: { display: 'none' },
    },
    hiddenRight: {
      opacity: 0,
      x: '60%',
      scale: 0.8,
      rotateY: -15,
      zIndex: 0,
      transitionEnd: { display: 'none' },
    },
  };

  const getVariant = () => {
    if (shouldReduceMotion) return isActive ? 'active' : 'inactive';
    if (distance === 0) return 'active';
    if (distance === -1) return 'prev';
    if (distance === 1) return 'next';
    return distance < -1 ? 'hiddenLeft' : 'hiddenRight';
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full cursor-pointer touch-pan-y"
      initial={false}
      animate={getVariant()}
      variants={shouldReduceMotion ? reducedVariants : standardVariants}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      onClick={() => {
        if (!isActive) onActivate();
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex flex-col w-full h-full bg-white border border-zinc-200 shadow-sm overflow-hidden rounded-xl">
        {/* Image Area */}
        <div className="relative w-full aspect-16/10 bg-zinc-100 shrink-0 group overflow-hidden">
          {/* Placeholder Fallback underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300">
            <span className="font-mono text-6xl font-light opacity-50">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <Image
            src={project.image}
            alt={project.title}
            fill
            quality={95}
            priority={index === 0}
            className="object-contain relative z-0"
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          {/* Hover Action Layer (Only accessible when active) */}
          {isActive && (
            <div className="absolute inset-0 bg-zinc-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
              <ProjectAction label="GitHub" url={project.github} />
              <ProjectAction label="YouTube" url={project.youtube} />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col grow p-6 md:p-8 bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium text-zinc-900 tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                {project.category} &middot; {project.date}
              </p>
            </div>
            <span className="font-mono text-sm text-zinc-300">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] md:text-xs font-mono bg-zinc-100 text-zinc-600 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectAction({ label, url }: { label: string; url?: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isAvailable = Boolean(url);

  if (!isAvailable) {
    return (
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <button
          disabled
          aria-disabled="true"
          className="px-4 py-2 bg-zinc-100 text-zinc-400 text-sm font-medium rounded-full cursor-not-allowed border border-zinc-200/50 flex items-center gap-2 transition-colors"
        >
          {label} <span className="opacity-50">&mdash;</span>
        </button>

        {/* Minimal Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 5 }}
          transition={{ duration: 0.15 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[10px] uppercase font-mono tracking-wider px-3 py-1.5 rounded-sm pointer-events-none"
        >
          {label} not available
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45" />
        </motion.div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-sm shadow-black/10"
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  );
}
