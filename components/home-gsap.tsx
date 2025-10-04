"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Topnav2 } from "./nav/top-nav-2";

export function HomeGsap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = Math.max(vw, vh);
    tl.to(boxRef.current, { width: size * 1.5, duration: 1, delay: 0.2, ease: "power2.inOut" });

    // 텍스트 먼저 (x축으로 등장)
    tl.fromTo(
      textRef.current,
      { x: 200, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    // 헤더 등장 + 텍스트 y축 이동
    tl.fromTo(
      headerRef.current,
      { y: -60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      "-=0.0"
    ).to(
      textRef.current,
      { y: 60, duration: 0.5, ease: "power3.out" },
      "<" // 같은 타이밍에 실행
    );

    const updateBoxSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = Math.max(vw, vh);
      gsap.set(boxRef.current, { width: size * 1.5 });
    };

    window.addEventListener("resize", updateBoxSize);
    return () => window.removeEventListener("resize", updateBoxSize);
  });

  return (
    <>
      <div
        ref={boxRef}
        className="fixed z-10 top-1/2 left-1/2 w-20 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
      <Topnav2 ref={headerRef} />
      <h1
        ref={textRef}
        className="fixed z-30 top-4 left-4 invisible text-7xl md:text-8xl lg:text-9xl opacity-80 font-black pointer-events-none"
      >
        보안과 개발
      </h1>
    </>
  );
}
