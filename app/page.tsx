import { About } from '@/components/about/About';
import { Collaborators } from '@/components/collaborators/Collaborators';
import { Contact } from '@/components/contact/Contact';
import { Experience } from '@/components/experience/Experience';
import { Hero } from '@/components/hero/Hero';
import { NavProvider } from '@/components/navbar/NavProvider';
import { Navbar } from '@/components/navbar/Navbar';
import { Projects } from '@/components/projects/Projects';
import { Skills } from '@/components/skills/Skills';

export default function Home() {
  return (
    <NavProvider>
      <main className="flex min-h-screen flex-col bg-zinc-950 relative selection:bg-zinc-200/50">
        <Navbar />

        <Hero />

        <About />

        <div id="projects" className="scroll-mt-24">
          <Projects />
        </div>

        <div id="experience" className="scroll-mt-24">
          <Experience />
        </div>

        <div id="skills" className="scroll-mt-24">
          <Skills />
        </div>

        <Collaborators />

        <div id="contact" className="scroll-mt-24">
          <Contact />
        </div>
      </main>
    </NavProvider>
  );
}
