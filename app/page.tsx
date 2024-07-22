import { PageTransition } from "@/components/page-transition";
import { CircleHello } from "./_component/circle-hello";
import { HoverText } from "./_component/hover-text";

export default function Home() {
  return (
    <>
      <PageTransition />
      <main className="w-full h-full lg:min-h-[750px] text-primary-400 text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-widest flex flex-col gap-20 items-center justify-center">
        <HoverText title="안녕하세요" delay={0.7} />
        <CircleHello />
        <HoverText title="저의 포트폴리오" delay={0.75} />
        <HoverText title="방문에 감사드립니다." delay={0.8} />
      </main>
    </>
  );
}
