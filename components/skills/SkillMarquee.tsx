import { useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

export function SkillMarquee({
  skills,
  direction,
  isFocused,
  isMuted,
}: {
  skills: string[];
  direction: 'left' | 'right';
  isFocused: boolean;
  isMuted: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const duplicatedSkills = shouldReduceMotion ? skills : [...skills, ...skills, ...skills];
  const duration = skills.length * 4;

  const isPaused = isFocused || !isInView || shouldReduceMotion;

  return (
    <div
      ref={containerRef}
      className={`relative flex ${shouldReduceMotion ? 'overflow-x-auto snap-x snap-mandatory hide-scrollbar' : 'overflow-hidden'} group select-none transition-all duration-700 w-full ${isMuted ? 'opacity-20 grayscale' : 'opacity-100'}`}
    >
      {/* Edge Gradients for masking */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-0 left-0 bottom-0 w-8 md:w-24 lg:w-48 bg-linear-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-8 md:w-24 lg:w-48 bg-linear-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Marquee Track */}
      <div
        className={`flex ${shouldReduceMotion ? 'w-full' : 'w-max'}`}
        style={
          shouldReduceMotion
            ? {}
            : {
                animation: `marquee-${direction} ${duration}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }
        }
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className={`flex items-center justify-center px-4 md:px-8 py-2 md:py-3 ${shouldReduceMotion ? 'snap-center shrink-0' : ''}`}
          >
            <span
              className={`font-mono text-xs md:text-sm tracking-widest whitespace-nowrap transition-colors duration-500 uppercase ${isFocused ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}
            >
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
