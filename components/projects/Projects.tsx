'use client';

import { ProjectCarousel } from './ProjectCarousel';

export function Projects() {
  return (
    <section className="relative w-full bg-zinc-50 pt-10 pb-24 md:pt-16 md:pb-24 text-zinc-900 z-10 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3 md:mb-4">
            Selected Work
          </span>
          <h2 className="font-(family-name:--font-display) text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-4">
            Systems I&apos;ve built.
          </h2>
          <p className="text-lg md:text-xl font-light text-zinc-500 max-w-xl mx-auto">
            From machine learning models to real-time AI products.
          </p>
        </div>

        {/* Interactive Showcase */}
        <ProjectCarousel />
      </div>
    </section>
  );
}
