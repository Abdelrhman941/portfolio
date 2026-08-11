'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavMode } from './NavProvider';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#skills' },
];

export function Navbar() {
  const isNavMode = useNavMode();
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = ['projects', 'experience', 'skills', 'contact'].map(id =>
      document.getElementById(id)
    );

    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-4 md:pt-6 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={isNavMode ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full max-w-5xl flex items-center justify-between bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 rounded-2xl px-4 md:px-6 py-3 pointer-events-auto shadow-2xl shadow-black/50">
          {/* Brand - Morph Target */}
          <div className="shrink-0 w-48">
            {isNavMode && (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <motion.span
                  layoutId="abdelrhman-brand"
                  className="font-(family-name:--font-display) text-xl md:text-2xl font-bold tracking-tight text-zinc-100 block whitespace-nowrap"
                >
                  Abdelrhman
                </motion.span>
              </a>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors py-2"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-zinc-100"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0 w-48 justify-end">
            <a
              href="/Abdelrhman-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              CV
            </a>
            <a
              href="#contact"
              className="text-xs font-mono uppercase tracking-widest text-zinc-950 bg-zinc-100 hover:bg-zinc-300 transition-colors px-4 py-2 rounded-full font-medium whitespace-nowrap"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-px bg-zinc-100 block" />
            <span className="w-5 h-px bg-zinc-100 block" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-(family-name:--font-display) tracking-tight text-zinc-100 hover:text-zinc-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="w-12 h-px bg-zinc-800 my-4" />
              <a
                href="/Abdelrhman-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-widest text-zinc-950 bg-zinc-100 px-6 py-3 rounded-full mt-2"
              >
                Let&apos;s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
