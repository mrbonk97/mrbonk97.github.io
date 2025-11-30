import { HomeMatter } from "@/components/matter/home-matter";

export default function Home() {
  return (
    <main className="h-full">
      <HomeMatter />
      <header className="p-4">
        <div className="mt-16 relative overflow-hidden">
          <h2 className="text-7xl md:text-8xl font-medium text-center animate-reveal text-rose-400">
            行法
          </h2>
        </div>
        <div className="mt-2 relative overflow-hidden">
          <h1 className="text-7xl md:text-8xl font-bold text-center animate-reveal2 text-rose-400">
            Porfolio
          </h1>
        </div>
      </header>
    </main>
  );
}
