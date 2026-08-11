# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** A mix of audiences evaluating Abdelrhman for different opportunities:

- **Hiring managers and recruiters** at tech companies — deciding whether to advance to interview
- **Senior engineers and technical leads** — evaluating as a peer or potential hire, reading for depth
- **Freelance clients and startups** — deciding whether to hire for a project, reading for trust and range

Visitors arrive with a clear intent: determine quickly whether this person can own and ship complete AI products. The portfolio must establish credibility within the first 30 seconds and reward deeper reading.

## Product Purpose

A personal portfolio for **Abdelrhman**, AI Engineer / Full-Stack AI Engineer.

The portfolio's job: make one thing undeniable — that Abdelrhman builds **production AI systems end-to-end, not prototypes**. Visitors must leave believing he can own the full stack (model, API, frontend) and ship things that matter.

Success = a visitor who arrived skeptical leaves with enough confidence to reach out or move him forward in a process.

## Positioning

Full-stack ownership of the AI product lifecycle. Not a researcher who can code, not a frontend dev who added an LLM call — someone who can take an AI product from idea to production and keep it running.

The differentiator no neighboring portfolio could copy: demonstrated end-to-end delivery across model layer, backend infrastructure, and polished user-facing product simultaneously.

## Operating Context

- Visited on desktop (primary) and mobile (secondary)
- Typically a tab opened from LinkedIn, GitHub, or a recruiter outreach
- Reader may spend 30s (skimming) or 5 minutes (deep read for case studies)
- No login, no interaction beyond navigation and contact
- Connection quality: varies — must load fast and work on slow connections

## Capabilities and Constraints

**Planned sections (confirmed):**

- Hero / intro
- About / bio
- Projects / case studies
- Work experience / timeline
- Skills / tech stack
- Contact / reach out

**Stack (existing codebase):**

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- motion (v13, formerly Framer Motion)
- pnpm monorepo

**Fonts loaded (layout.tsx):**

- Geist Sans (`--font-geist-sans`) — primary UI font
- Geist Mono (`--font-geist-mono`) — code/data contexts
- Caveat (`--font-caveat`) — handwritten accent, used sparingly

**Splash screen:** complete — session-based, `( text )` bracket animation, clip-path reveal.

**Currently undecided:**

- Specific projects to feature (content not yet provided)
- Final color palette / design tokens
- Whether dark/light split happens at a section boundary or on scroll

## Brand Commitments

- **Name:** Abdelrhman
- **Role:** AI Engineer / Full-Stack AI Engineer
- **Tone:** Intelligent, calm, direct. Confident without being loud.
- **Visual system:** Premium, editorial. Light and dark sections that transition naturally and cinematically — not locked to one theme. Typography-led with strong hierarchy. Modern, interactive, polished, fast.
- **Scroll philosophy:** Scroll is a storytelling system, not just navigation. Editorial pacing with subtle sticky/pinned moments, scroll-linked typography transformations, smooth light↔dark section transitions, occasional section-level reveals, and sticky project visuals with scrolling narrative. Responsive motion: desktop gets scroll-driven interactions, mobile adapts to simpler trigger-based reveals.
- **Motion constraints:** Restrained and purposeful. One authored moment per section, not scattered effects. All motion handles `prefers-reduced-motion`. Only transform/opacity/filter animated. No parallax excess, no scroll hijacking, no decorative motion without semantic purpose.
- **Experience feel:** minimal, editorial, technical, human, premium, calm, cinematic.
- **Anti-patterns (explicitly forbidden):** neon/cyberpunk, excessive particles/gradients, glassmorphism, holographic AI-brain/circuit-board visuals, fake terminal gimmicks, generic AI marketing copy, Awwwards-style motion soup, constant scroll hijacking, exaggerated page transitions, heavy WebGL without clear justification, animation on every element.

## Evidence on Hand

- Splash screen implementation (production-ready)
- No project case studies provided yet — must not be fabricated
- No testimonials, metrics, or press — must not be fabricated
- Real content will be provided section by section as the portfolio is built

## Product Principles

1. **Credibility before creativity.** Every design choice must earn trust first. Beauty is in service of belief, not a substitute for it.
2. **One claim, proven.** The portfolio makes a single bet — end-to-end AI product ownership — and everything confirms it. Nothing dilutes or contradicts it.
3. **Depth rewards the reader.** Skimmers get the headline in 30 seconds. Careful readers find substance: real work, real decisions, real outcomes.
4. **Cinematic pacing.** Transitions and reveals are intentional and smooth — the portfolio has a cadence. Fast to load, deliberate to read.
5. **No fabrication.** Content stays strictly within what is real and provided. Placeholder text is marked as such and replaced before shipping.

## Accessibility & Inclusion

- `prefers-reduced-motion` handled throughout — all animations have reduced-motion fallbacks (already implemented in splash)
- WCAG AA contrast minimum target for all text
- Keyboard navigation must work for all interactive elements
