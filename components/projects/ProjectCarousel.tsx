'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { projects } from './project-data';

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  const total = projects.length;

  const nextProject = useCallback(
    () => setCurrentIndex(prev => Math.min(prev + 1, total - 1)),
    [total],
  );
  const prevProject = useCallback(() => setCurrentIndex(prev => Math.max(prev - 1, 0)), []);

  useEffect(() => {
    if (!isInView) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, total, nextProject, prevProject]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.div
        ref={containerRef}
        className="relative w-full max-w-xl md:max-w-3xl aspect-[1/1.1] sm:aspect-16/14 md:aspect-[1.55/1] mx-auto mb-6 md:mb-8 touch-pan-y"
        style={{ perspective: '1600px' }}
        onPanEnd={(e, info) => {
          const threshold = 50;
          if (info.offset.x > threshold) prevProject();
          else if (info.offset.x < -threshold) nextProject();
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            currentIndex={currentIndex}
            shouldReduceMotion={shouldReduceMotion}
            onActivate={() => setCurrentIndex(index)}
          />
        ))}
      </motion.div>

      <div className="flex items-center gap-12 font-mono text-sm">
        <button
          onClick={prevProject}
          disabled={currentIndex === 0}
          aria-label="Previous project"
          className="uppercase tracking-widest text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-colors px-2 py-1"
        >
          &larr; Prev
        </button>

        <div className="text-zinc-400 tracking-widest">
          <span className="text-zinc-900 font-medium">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="mx-2">/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        <button
          onClick={nextProject}
          disabled={currentIndex === total - 1}
          aria-label="Next project"
          className="uppercase tracking-widest text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-colors px-2 py-1"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
