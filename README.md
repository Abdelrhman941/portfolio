# Abdelrhman's Portfolio

## Overview
A premium, editorial portfolio designed for an AI & Full-Stack Engineer. It focuses on clean typography, precise motion, and establishing product-engineering capabilities.

## Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (v4)
- **Motion:** `motion/react` (Framer Motion)
- **3D Graphics:** Spline
- **Typography:** Geist & Geist Mono

## Architecture
The application is structured into domain-specific components residing in `components/`. It avoids generic state management in favor of localized React state and `framer-motion` layout animations.

## Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

## Build
```bash
# Typecheck
pnpm tsc --noEmit

# Lint
pnpm eslint .

# Build for production
pnpm build
```

## Or use Makefile ⭐⭐
```bash
# Install dependencies
make install  

# Run development server
make run

# Build for production
make build
```

## Project Structure
- `app/`: Next.js App Router endpoints, global CSS, layout, metadata.
- `components/`: Modular component domains (about, contact, hero, projects, splash, etc).
- `public/`: Static assets, CV, images.
