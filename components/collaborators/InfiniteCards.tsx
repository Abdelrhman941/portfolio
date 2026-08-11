'use client';

import { CollaboratorCard } from './CollaboratorCard';
import { type CollaboratorQuote } from './collaborators-data';

export function InfiniteCards({
  items,
  speed = 'slow',
}: {
  items: CollaboratorQuote[];
  speed?: 'slow' | 'medium' | 'fast';
}) {
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
  const duplicatedItems = Array.from({ length: repeatCount }).flatMap(() => items);

  return (
    <div className="relative flex overflow-hidden group w-full py-8">
      {/* Edge Masks */}
      <div className="absolute top-0 left-0 bottom-0 w-8 md:w-32 bg-linear-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 md:w-32 bg-linear-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div
        className="flex w-max"
        style={{
          animation: `infinite-cards-marquee ${getDuration()}s linear infinite`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="px-4 h-full">
            <CollaboratorCard collab={item} />
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infinite-cards-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${100 / repeatCount}%); }
        }
        @media (prefers-reduced-motion) {
          .flex.w-max {
              animation-play-state: paused !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
