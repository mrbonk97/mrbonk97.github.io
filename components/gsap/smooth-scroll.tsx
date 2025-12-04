"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useSmoother } from "@/context/smooth-context";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface Props {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setSmoother } = useSmoother();

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1,
        smoothTouch: 0.1,
        effects: true,
      });

      setSmoother(smoother);
      ScrollTrigger.refresh();

      // 첫 진입 시 무조건 상단으로
      smoother.scrollTo(0, true);
      window.scrollTo(0, 0);

      return () => {
        smoother.kill();
      };
    },
    { dependencies: [] }
  );

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
