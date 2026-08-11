<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Abdelrhman's Engineering Contract

This document is the single, permanent engineering contract for this repository. All coding agents MUST adhere to these rules without exception.

## 1. Project Identity
- **Owner:** Personal portfolio for Abdelrhman
- **Role:** AI Engineer / Full-Stack AI Engineer
- **Positioning:** "production AI systems end-to-end" (Do NOT use generic AI marketing language).
- **Core Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion (motion/react), pnpm.

## 2. Design Principles
- **Mandatory:** Premium editorial, minimal, typography-led, technical but human, calm, restrained motion, purposeful interactions, fast and responsive, accessibility-first.
- **Anti-patterns (BANNED):** Neon/cyberpunk styles, excessive gradients, particle backgrounds, glassmorphism overload, holographic AI visuals, fake terminal gimmicks, generic AI slogans, scroll hijacking, unnecessary WebGL/3D, decorative animations.

## 3. Information Architecture
The homepage is **FROZEN**. The required sequence is:
1. Hero
2. About
3. Selected Work / Projects
4. Experience & Foundations
5. Skills / Stack Map
6. From people I've built with.
7. Contact

**Banned generic sections:** Services, Testimonials, Achievements, Blog, FAQ, Pricing.
*Note: The VirtAI deep-dive case study and custom cursor are future/optional scopes.*

## 4. Content Truthfulness
This rule is mandatory.
- **Never fabricate:** Clients, employers, job titles, dates, project outcomes, metrics, testimonials, credentials, awards, URLs, or technical experience.
- **Do not overstate:** Do not present him as a deep RAG researcher or ML research specialist without evidence. Do not present collaborator feedback as client testimonials.
- Use only verified information from repository data, the provided CV/certificate, or explicit user-provided facts. Use clearly marked placeholders if evidence is missing.

## 5. Writing / Copy Rules
- **Tone:** Human, direct, calm, specific, technically credible.
- **Banned phrases:** "Transforming raw data into...", "Building the future...", "Passionate about innovation...", "Leveraging cutting-edge AI...", "Turning ideas into reality...", "Empowering businesses...".
- Avoid defensive self-justification. Prefer concrete engineering language. Do not rewrite strong existing copy without a clear reason.

## 6. Component Architecture
- Use feature-based folders in `components/`: `about/`, `collaborators/`, `contact/`, `experience/`, `hero/`, `navbar/`, `projects/`, `skills/`, `splash/`, `ui/`.
- Keep data separate from presentation. Store reusable UI in `components/ui`.
- Feature logic goes inside the relevant feature folder.
- Do not create abstractions for theoretical reuse. Do not collapse files just to reduce file count. Do not introduce global state unless genuinely required.

## 7. Animation / Motion Rules
- **Library:** `motion/react` only. (Do NOT introduce `framer-motion` as a duplicate dependency or `GSAP`).
- Motion must be purposeful, restrained, compositor-friendly (transform/opacity), and accessible.
- **Reduced Motion:** Never allow animation to hide or block information. Reduced-motion users must still access all content. Marquees must stop moving and provide a static/scrollable fallback when reduced motion is requested.

## 8. Responsive Rules
- **Breakpoints:** 320px, 375px, 768px, 1024px, 1440px+, ultrawide.
- **Banned:** Horizontal page overflow, desktop-only interaction without mobile alternative, hover-only essential behavior.
- Touch targets should generally be >= 44px. Mobile should use simplified interactions.

## 9. Accessibility Rules
- Always preserve: Semantic HTML, exactly one meaningful `<h1>`, logical heading hierarchy, visible focus-visible states, keyboard navigation, accessible labels, `aria-expanded` and `aria-current` where appropriate, RTL support for Arabic content, WCAG AA contrast, and reduced-motion support.
- Prefer native HTML semantics over unnecessary ARIA.

## 10. Performance Rules
- Prioritize React Server Components by default with minimal client boundaries (`"use client"`).
- Optimize images, lazy load below-fold assets, and use `priority` only for genuine LCP assets.
- No unnecessary `useEffect`, no expensive per-frame React state updates. Pause offscreen continuous animations.
- **Spline:** Desktop-oriented. Avoid loading expensive 3D WebGL unnecessarily on mobile.

## 11. External Avatar / Profile Rules (Collaborators)
- `profileUrl` is the ultimate identity source. `profileType` describes the provider.
- Automatic avatar resolution is preferred where reliable.
- **Banned:** Scraping LinkedIn, using undocumented provider APIs, putting Markdown link syntax inside data fields.
- Always provide a fallback avatar or initials.

## 12. Git / GitHub Workflow
- **Pipeline:** feature branch → commit → push → pull request → CI → merge to main → deployment.
- `main` is protected production code.
- **Conventional Commits:** `feat:`, `fix:`, `refactor:`, `perf:`, `docs:`, `style:`, `test:`, `build:`, `ci:`, `chore:`.
- Do not create meaningless commits.

## 13. Repository Quality Tooling
- **Expected:** Pre-commit checks, GitHub Actions CI, lint, typecheck, production build, Dependabot, PR template, `.editorconfig`, `.env.example`.
- **Banned (DevOps Theater):** Heavy enterprise tooling (Husky, lint-staged, Commitlint, SonarQube, Snyk, etc.) that adds overhead to a portfolio project. Avoid duplicate formatters.

## 14. CI Responsibilities
- GitHub Actions CI serves as the quality gate: installs dependencies, lints, typechecks, builds.
- Vercel handles actual deployment. Do not duplicate Vercel deployment logic in GitHub Actions.

## 15. Environment / Secrets
- **Never commit:** API keys, tokens, credentials, production secrets.
- Use `.env.local` or hosting environment variables.
- Keep `.env.example` updated with placeholders (never real values).
- Do not hard-code production URLs when they belong in environment configuration (e.g. `NEXT_PUBLIC_SITE_URL`).

## 16. SEO / Metadata
- Maintain strictly: metadata, Open Graph, Twitter metadata, canonical URLs, sitemap, robots, and structured data when factually justified.
- **Never invent:** Domains, schema properties, achievements, or organizations.

## 17. Testing / Validation
- Before considering a task complete, you MUST successfully run:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
- For UI changes, also manually validate: responsive behavior, keyboard navigation, reduced motion, and horizontal overflow.
- Do not claim completion without actual validation.

## 18. Code Comments
- Explain only what is **non-obvious** (e.g., why a workaround was chosen, browser quirks, constraints).
- Avoid restating the code itself (e.g., `// Set opacity to 1`). Keep comments concise. Do not write essay-style comments inside source files.

## 19. Scope Control
- Agents must NOT: redesign unrelated sections, refactor unrelated files, add dependencies without need, create speculative abstractions, or casually modify the frozen information architecture.
- For narrow tasks, make the smallest clean change possible.

## 20. Final Response Contract
After completing a task, your response must report:
- Files changed.
- Important design/engineering decisions.
- Validation performed.
- Remaining manual checks.
- Any assumptions made.
- *Do not claim "production-ready" unless the stated validation checks actually passed.*
