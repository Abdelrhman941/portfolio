import { Hero } from '@/components/hero/Hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-50">
      <Hero />
      <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl text-zinc-400">Placeholder for next section</h2>
        <p className="mt-4 text-zinc-500">The portfolio continues here...</p>
      </div>
    </main>
  );
}
