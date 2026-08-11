# Abdelrhman's Portfolio

A premium, editorial engineering portfolio designed to showcase production-oriented AI systems, backend infrastructure, and scalable frontend capabilities.

## Overview

Abdelrhman is an AI Engineer and Full-Stack AI Engineer focused on building real products that ship. The portfolio highlights end-to-end product ownership, from training and orchestrating models to configuring Docker infrastructure, real-time WebSockets, and building accessible Next.js interfaces.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Motion:** `motion/react` (Framer Motion)
- **3D Graphics:** Spline (Desktop only)
- **Typography:** Geist & Geist Mono

## Project Structure

- `app/`: Next.js App Router endpoints, global CSS, server layouts, metadata, and dynamic SEO configurations (`sitemap.ts`, `robots.ts`).
- `components/`: Modular, domain-driven UI components (hero, about, projects, skills, collaborators, contact). Features localized state and Framer Motion layouts.
- `public/`: Static assets, images, and the downloadable CV.

## Development

```bash
# Install dependencies
pnpm install

# Run the local development server
pnpm dev
```

## Quality Checks

```bash
# Run TypeScript typechecking
pnpm typecheck

# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Verify formatting
pnpm format:check
```

## Git Workflow

This repository follows a professional team-style Git workflow:

- **Feature Branches:** Create a branch for new features or fixes (`feat/...` or `fix/...`).
- **Conventional Commits:** Use standard prefixes like `feat:`, `fix:`, `refactor:`, `perf:`, `docs:`.
- **Pre-commit Hooks:** Commits are guarded by a lightweight hook that enforces typechecking and linting.
- **CI Checks:** GitHub Actions automatically runs the quality gate (`pnpm lint`, `pnpm typecheck`, `pnpm build`) on all PRs and pushes to `main`.
- **Protected Main:** The `main` branch is protected and always remains in a deployable state.

## Deployment

- **Source:** GitHub is the source of truth.
- **CI/CD:** GitHub Actions executes all quality and static checks.
- **Hosting:** Vercel automatically deploys the application when the CI checks pass on the `main` branch.

## Repository Principles

- **Authenticity:** No fabricated content or generic client testimonials. Every claim is supported by technical evidence.
- **Accessibility:** Semantic HTML, single H1 architecture, focus visibility, touch targets, and ARIA where necessary.
- **Performance:** Dynamic `prefers-reduced-motion` fallbacks, native scroll-snap offscreen rendering, and bypassed Spline WebGL execution on mobile devices.
- **Purposeful Motion:** Animations serve to structure information hierarchy, not decorate empty space. No particle backgrounds or unnecessary glowing effects.
