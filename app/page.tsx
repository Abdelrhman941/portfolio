import { About } from '@/components/about/About';
import { Hero } from '@/components/hero/Hero';

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
    </main>
  );
}
