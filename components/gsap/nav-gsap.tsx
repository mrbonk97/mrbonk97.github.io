"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function TopnavGsap() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    function waitForSmoother() {
      const smoother = ScrollSmoother.get();
      if (!smoother) {
        requestAnimationFrame(waitForSmoother);
        return;
      }

      // ⬇ 여기 smoother 사용하면 됨
      const content = smoother.content();
      console.log(content);

      gsap.fromTo(
        wrapperRef.current,
        { y: -64 },
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top -50",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    waitForSmoother();
  }, []);

  return (
    <nav
      ref={wrapperRef}
      className="z-50 fixed top-0 left-0 right-0 -translate-y-32 h-14 bg-rose-100"
    >
      <Link href={"/"}>行法</Link>
    </nav>
  );
}
