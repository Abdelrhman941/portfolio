import { About } from '@/components/about/About';
import { Collaborators } from '@/components/collaborators/Collaborators';
import { Contact } from '@/components/contact/Contact';
import { Experience } from '@/components/experience/Experience';
import { Hero } from '@/components/hero/Hero';
import { Projects } from '@/components/projects/Projects';
import { Skills } from '@/components/skills/Skills';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      
      {/*
        Hero controls the dark-to-light transition via scroll.
        It fades its background to bg-zinc-50 at the end.
      */}
      <Hero />

      {/*
        About section natively uses bg-zinc-50, naturally accepting
        the user from the Hero's transition state.
      */}
      <About />

      {/*
        Projects section continues the light theme seamlessly.
      */}
      <Projects />

      {/*
        Experience section stays light but creates a subtle paper-like boundary
        with bg-white, reinforcing the editorial document feel.
      */}
      <Experience />

      <Skills />

      <Collaborators />
      <Contact />
    </main>
  );
}
