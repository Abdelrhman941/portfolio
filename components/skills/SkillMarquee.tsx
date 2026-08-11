'use client';

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
  // We duplicate the list to ensure seamless infinite looping.
  // 3 copies allow us to shift by -33.33% seamlessly.
  const duplicatedSkills = [...skills, ...skills, ...skills];

  // Base speed: 4 seconds per skill item.
  const duration = skills.length * 4;

  return (
    <div
      className={`relative flex overflow-hidden group select-none transition-all duration-700 w-full ${isMuted ? 'opacity-20 grayscale' : 'opacity-100'}`}
    >
      {/* Edge Gradients for masking */}
      <div className="absolute top-0 left-0 bottom-0 w-8 md:w-24 lg:w-48 bg-linear-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 md:w-24 lg:w-48 bg-linear-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div
        className="flex w-max"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: isFocused ? 'paused' : 'running',
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center justify-center px-4 md:px-8 py-2 md:py-3"
          >
            <span
              className={`font-mono text-xs md:text-sm tracking-widest whitespace-nowrap transition-colors duration-500 uppercase ${isFocused ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}
            >
              {skill}
            </span>
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0); }
        }

        @media (prefers-reduced-motion) {
          .flex.w-max {
              animation-play-state: paused !important;
              /* On mobile/reduced motion, we want to just allow normal scroll or static view */
          }
        }
      `,
        }}
      />
    </div>
  );
}
