import { Curtain } from "@/components/curtain";
import { Title } from "@/components/landing/title";
import { FallingShapes } from "@/components/landing/falling-shapes";

export default function Home() {
  return (
    <main className="min-h-svh">
      <Title />
      <Curtain />
      <FallingShapes />
    </main>
  );
}
