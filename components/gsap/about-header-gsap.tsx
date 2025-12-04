"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useSmoother } from "@/context/smooth-context";
import { Canvas3d } from "../3d/canvas";

export function AboutHeaderGsap() {
  const { smoother } = useSmoother();
  const h1Ref = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!smoother) return; // smoother 준비 안 되면 끝

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: smoother.content(),
        start: "top 10%",
      },
    });

    tl.to(h1Ref.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.7,
      ease: "expo.out",
    });

    tl.to(
      threeRef.current,
      {
        y: 0,
        opacity: 1,
        delay: 0.1,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
    tl.to(
      pRef.current,
      {
        y: 0,
        opacity: 1,
        delay: 0.2,
        duration: 1,
        ease: "expo.out",
      },
      "<"
    );
  }, [smoother]); // ★ smoother 준비되면 애니 실행됨

  return (
    <header className="p-4 pt-20 min-h-screen mx-auto max-w-7xl">
      <hgroup>
        <h1
          ref={h1Ref}
          className="translate-y-8 opacity-0 text-3xl md:text-6xl font-bold leading-normal"
        >
          안녕하세요 <br />
          정보보안 & 개발자입니다.
        </h1>
      </hgroup>
      <div ref={threeRef} className="translate-y-8 opacity-0 h-[512px] w-full">
        <Canvas3d />
      </div>

      <p
        ref={pRef}
        className="translate-y-8 opacity-0 text-center mx-auto max-w-2xl break-keep"
      >
        프론트엔드, 백엔드, 보안 등 IT 전반에 걸친 경험을 보유하고 있으며,
        현재는 금융 IT 분야에서 프론트엔드 개발과 보안 컨설팅 업무를 수행하고
        있습니다.
      </p>
    </header>
  );
}
