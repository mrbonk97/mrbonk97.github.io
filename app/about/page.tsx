import Link from "next/link";
import { Canvas3d } from "@/components/3d/canvas";
import { ArrowRight } from "lucide-react";
import { PROGRAMMING_PROJECT, SECURITY_PROJECT } from "@/constants";
import { MotionH1 } from "@/components/motion/motion-h1";
import { MotionP } from "@/components/motion/motion-p";
import { MotionDiv } from "@/components/motion/motion-div";
import { MotionH4 } from "@/components/motion/motion-h4";
import { MotionLi } from "@/components/motion/motion-li";

function AboutPage() {
  return (
    <main>
      <header className="pt-20 p-4 min-h-screen mx-auto max-w-4xl">
        <hgroup className="text-3xl md:text-6xl font-bold leading-normal text-rose-400">
          <MotionH1>
            안녕하세요 <br />
            정보보안 & 개발자입니다.
          </MotionH1>
        </hgroup>

        <MotionDiv className="mt-16 h-96">
          <Canvas3d />
        </MotionDiv>
        <MotionP className="mt-16 font-medium opacity-80 text-center break-keep">
          프론트엔드, 백엔드, 보안 등 IT 전반에 걸친 경험을 보유하고 있으며,
          <br className="hidden md:block" />
          현재는 금융 IT 분야에서 프론트엔드 개발과 보안 컨설팅 업무를 수행하고 있습니다.
        </MotionP>
      </header>

      <section className="border-t">
        <MotionH4 className="py-16 text-rose-400 text-center text-7xl md:text-9xl font-bold">PROJECT</MotionH4>
        <div className="grid grid-cols-6 border-t">
          <div className="hidden md:block col-span-1 p-4 border-r text-right">
            <span className="sticky top-24 font-medium text-rose-400">개발 프로젝트</span>
          </div>

          <ul className="col-span-6 md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mx-auto max-w-4xl w-full">
            {PROGRAMMING_PROJECT.map((item, idx) => {
              return (
                <MotionLi key={item.title} className="md:aspect-video group" delay={idx % 2 == 0 ? 0 : 0.25}>
                  <Link
                    href={`/about/${item.id}`}
                    className="p-8 pb-4 h-full w-full bg-secondary flex flex-col justify-between"
                  >
                    <hgroup>
                      <h4 className="text-xl font-semibold opacity-80">{item.title}</h4>
                      <p className="mt-2 font-medium opacity-80">기간: {item.duration}</p>
                      <p className="font-medium opacity-80">업무: {item.role}</p>
                      <p className="font-medium opacity-80">스택: {item.stack}</p>
                    </hgroup>

                    <ArrowRight className="ml-auto group-hover:translate-x-2 duration-300  text-rose-400" />
                  </Link>
                </MotionLi>
              );
            })}
          </ul>
        </div>

        <div className="h-36 border-y" />

        <div className="grid grid-cols-6">
          <div className="hidden md:block col-span-1 p-4 border-r text-right">
            <span className="sticky top-24 font-medium text-rose-400">보안 프로젝트</span>
          </div>

          <ul className="col-span-6 md:col-span-5 p-4 mx-auto max-w-4xl w-full space-y-4">
            {SECURITY_PROJECT.map((item, idx) => (
              <MotionLi key={item.title} className="py-4 px-8 bg-secondary">
                <div className="flex justify-between gap-4">
                  <h4 className="text-base md:text-xl font-semibold opacity-80">{item.title}</h4>
                  <div className="opacity-70 font-semibold">{(idx + 1).toString().padStart(2, "0")}</div>
                </div>
                <p className="text-sm md:text-base font-medium opacity-80">{item.duration}</p>
              </MotionLi>
            ))}
            <li className="h-40" />
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
