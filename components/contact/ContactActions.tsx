'use client';

import { useState } from 'react';
import { contactData } from './contact-data';

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const actions = [
    {
      id: 'email',
      label: 'EMAIL',
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      actionText: copied ? 'Copied' : 'Copy',
      onClick: handleCopy,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: 'Abdelrhman Ezzat',
      href: contactData.linkedin,
      actionText: 'Connect',
      onClick: undefined,
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'Abdelrhman941',
      href: contactData.github,
      actionText: 'Follow',
      onClick: undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-3 md:gap-0 mt-8 md:mt-16 w-full max-w-sm group/stack md:relative md:h-60">
      {actions.map((action, i) => (
        <a
          key={action.id}
          href={action.href}
          target={action.id === 'email' ? undefined : '_blank'}
          rel={action.id === 'email' ? undefined : 'noopener noreferrer'}
          onClick={action.onClick}
          className="block w-full bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:absolute md:top-0 md:left-0 md:w-full group/card hover:bg-zinc-800/80 hover:border-zinc-700 hover:-translate-y-0.5"
          style={
            {
              // Custom properties for desktop stacking math
              '--index': i,
              '--total': actions.length,
              zIndex: actions.length - i,
            } as React.CSSProperties
          }
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase tracking-widest group-hover/card:text-zinc-400 transition-colors">
                {action.id === 'github' && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                )}
                {action.id === 'linkedin' && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {action.label}
              </span>
              <span className="text-zinc-200 text-sm font-medium">{action.value}</span>
            </div>
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 transition-colors group-hover/card:text-zinc-200">
              {action.actionText}
              {action.id !== 'email' && (
                <svg
                  className="w-3 h-3 opacity-50 group-hover/card:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </span>
          </div>
        </a>
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (min-width: 768px) {
          .group\\/stack > a {
            transform: translateY(calc(var(--index) * 12px)) scale(calc(1 - (var(--index) * 0.02)));
            opacity: calc(1 - (var(--index) * 0.1));
            transform-origin: top center;
          }

          .group\\/stack:hover > a, .group\\/stack:focus-within > a {
            transform: translateY(calc(var(--index) * 80px)) scale(1);
            opacity: 1;
          }

          .group\\/stack > a:hover, .group\\/stack > a:focus-visible {
            transform: translateY(calc(var(--index) * 80px - 2px)) !important;
            z-index: 10 !important;
            border-color: #3f3f46;
            background-color: #27272a;
          }

          @media (prefers-reduced-motion) {
            .group\\/stack > a {
              position: relative !important;
              transform: none !important;
              opacity: 1 !important;
              margin-bottom: 12px;
            }
            .group\\/stack > a:hover {
              transform: translateY(-2px) !important;
            }
            .group\\/stack {
              height: auto !important;
            }
          }
        }
      `,
        }}
      />
    </div>
  );
}
