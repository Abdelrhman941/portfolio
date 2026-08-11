'use client';

import { Suspense, lazy } from 'react';

// Lazy load the Spline component to avoid blocking the critical rendering path
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800/50" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
