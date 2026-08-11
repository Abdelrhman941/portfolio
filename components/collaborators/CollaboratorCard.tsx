'use client';

import { useState } from 'react';
import { type CollaboratorQuote } from './collaborators-data';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export function resolveCollaboratorAvatarUrl(collab: CollaboratorQuote): string | undefined {
  if (collab.profileType === 'github' && collab.profileUrl) {
    const parts = collab.profileUrl.split('github.com/');
    if (parts.length > 1) {
      const username = parts[1].split('/')[0].replace('@', '');
      if (username) return `https://unavatar.io/github/${username}`;
    }
  }

  if (collab.profileType === 'linkedin' && collab.profileUrl) {
    const parts = collab.profileUrl.split('linkedin.com/in/');
    if (parts.length > 1) {
      const slug = parts[1].split('/')[0];
      if (slug) return `https://unavatar.io/linkedin/user:${slug}`;
    }
  }

  return collab.avatarUrl;
}

export function CollaboratorCard({ collab }: { collab: CollaboratorQuote }) {
  const [showAr, setShowAr] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasAr = !!collab.quoteAr;
  const currentQuote = showAr && hasAr ? collab.quoteAr : collab.quote;
  const currentDir = showAr && hasAr ? 'rtl' : 'ltr';

  const avatarToLoad = resolveCollaboratorAvatarUrl(collab);

  const identityContentJsx = (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0 flex items-center justify-center text-zinc-500 font-mono text-xs">
        {avatarToLoad && !imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarToLoad}
            alt={collab.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          getInitials(collab.name)
        )}
      </div>
      {/* Meta */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-900 transition-colors group-hover/link:text-zinc-600">
          {collab.name}
        </span>
        <span className="text-xs text-zinc-500 font-light mt-0.5">
          {collab.relationship} &middot; {collab.project}
        </span>
        {collab.profileUrl && collab.profileType && (
          <div className="mt-1.5 flex items-center gap-1.5 text-zinc-400 group-hover/link:text-zinc-600 transition-colors">
            {collab.profileType === 'linkedin' ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            )}
            <span className="text-[10px] uppercase tracking-wider font-mono">
              {collab.profileType === 'linkedin' ? 'LinkedIn' : 'GitHub'}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-75 md:w-105 p-6 md:p-8 rounded-xl border border-zinc-200/50 bg-white shadow-sm shrink-0 flex flex-col justify-between gap-8 h-full">
      <div className="flex flex-col gap-4">
        {/* Quote area */}
        <p
          className={`text-base text-zinc-600 leading-relaxed font-light ${
            currentDir === 'rtl' ? 'font-sans' : ''
          }`}
          dir={currentDir}
        >
          &quot;{currentQuote}&quot;
        </p>

        {/* Translation toggle */}
        {hasAr && (
          <button
            onClick={() => setShowAr(!showAr)}
            className="self-start text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm"
            aria-label={showAr ? 'Show English translation' : 'Show original Arabic'}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 3l4 4-4 4M3 17l4-4-4-4M7 21V3M21 21v-8" />
            </svg>
            {showAr ? 'EN' : 'AR'}
          </button>
        )}
      </div>

      {/* Identity */}
      {collab.profileUrl ? (
        <a
          href={collab.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-lg p-1 -m-1"
          aria-label={`View ${collab.name} on ${collab.profileType === 'linkedin' ? 'LinkedIn' : 'GitHub'}`}
          title={`View profile on ${collab.profileType === 'linkedin' ? 'LinkedIn' : 'GitHub'}`}
        >
          {identityContentJsx}
        </a>
      ) : (
        <div className="p-1 -m-1">{identityContentJsx}</div>
      )}
    </div>
  );
}
