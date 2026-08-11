'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ContactActions } from './ContactActions';
import { contactData } from './contact-data';

export function Contact() {
  return (
    <section className="relative w-full bg-zinc-950 text-zinc-50 py-24 md:py-40 z-20 overflow-hidden border-t border-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-6 relative flex flex-col lg:flex-row gap-16 lg:gap-24 items-start lg:items-center">
        {/* Left: Copy & Actions */}
        <div className="flex-1 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Terminal decorative metadata */}
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
              OPEN_CONNECTION
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-(family-name:--font-display) text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter text-zinc-100 max-w-lg">
                Have an AI product worth building?
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-md">
                Tell me what you&apos;re building.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ContactActions />
          </motion.div>
        </div>

        {/* Right: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full lg:w-5/12 max-w-sm mx-auto lg:mx-0 relative aspect-3/4 md:aspect-4/5 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0"
        >
          <Image
            src={contactData.portrait}
            alt="Abdelrhman Ezzat"
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-700 z-10"
            style={{ objectPosition: '50% 18%' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle inner shadow for framing */}
          <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none z-20" />
        </motion.div>
      </div>
    </section>
  );
}
