"use client";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { hachiMaru, playWrite } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function HeaderGsap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 10%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(null, {
      duration: 0.8,
    });

    tl.to(h1Ref.current, {
      y: 0,
      duration: 1.4,
      ease: "expo.out",
    });

    tl.to(
      h2Ref.current,
      {
        y: 16,
        delay: 0.1,
        duration: 1.4,
        ease: "expo.out",
      },
      "<"
    );
  }, []);

  return (
    <header
      ref={wrapperRef}
      className="-z-10 absolute inset-0 text-7xl sm:text-9xl font-bold text-custom-4"
    >
      <div className="mt-32 h-24 sm:h-40 relative overflow-hidden">
        <h1
          ref={h1Ref}
          className={`text-center translate-y-28 sm:translate-y-44 ${hachiMaru.className}`}
        >
          行法
        </h1>
      </div>
      <div className="mt-8 h-32 sm:h-52 relative overflow-hidden">
        <h2
          ref={h2Ref}
          className={`text-center translate-y-36 sm:translate-y-56 ${playWrite.className}`}
        >
          Porfolio
        </h2>
      </div>
    </header>
  );
}
