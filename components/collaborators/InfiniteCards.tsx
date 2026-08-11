'use client';

import { useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { CollaboratorCard } from './CollaboratorCard';
import { type CollaboratorQuote } from './collaborators-data';

export function InfiniteCards({
  items,
  speed = 'slow',
}: {
  items: CollaboratorQuote[];
  speed?: 'slow' | 'medium' | 'fast';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // Determine duration based on array size and speed.
  // We want the animation to take roughly 30 seconds for 3 items on slow.
  const getDuration = () => {
    const base = items.length * 15;
    if (speed === 'fast') return base * 0.5;
    if (speed === 'medium') return base;
    return base * 1.5; // slow
  };

  // Duplicate items to create a seamless infinite loop.
  // We need enough items to fill a 4K screen at least twice.
  // 3 items = ~1200px. Repeating 6 times gives ~7200px, enough for any screen.
  const repeatCount = Math.max(3, Math.ceil(12 / items.length));

  // If reduced motion, we do not duplicate items to avoid endless scrolling of identical cards
  const duplicatedItems = shouldReduceMotion
    ? items
    : Array.from({ length: repeatCount }).flatMap(() => items);

  return (
    <div
      ref={containerRef}
      className={`relative flex ${shouldReduceMotion ? 'overflow-x-auto snap-x snap-mandatory hide-scrollbar' : 'overflow-hidden'} group w-full py-8`}
    >
      {/* Edge Masks */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-linear-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-linear-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Track */}
      <div
        className={`flex ${shouldReduceMotion ? 'w-full' : 'w-max'} animate-infinite-cards`}
        style={
          shouldReduceMotion
            ? {}
            : ({
                animation: `infinite-cards-marquee ${getDuration()}s linear infinite`,
                animationPlayState: !isInView ? 'paused' : 'running',
                '--marquee-offset': `-${100 / repeatCount}%`,
              } as React.CSSProperties)
        }
        onMouseEnter={e => {
          if (!shouldReduceMotion) e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={e => {
          if (!shouldReduceMotion && isInView) e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`px-4 h-full ${shouldReduceMotion ? 'snap-center shrink-0 w-[90vw] max-w-[400px]' : ''}`}
          >
            <CollaboratorCard collab={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
