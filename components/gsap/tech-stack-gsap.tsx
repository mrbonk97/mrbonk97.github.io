"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { playWrite } from "@/lib/fonts";

const stacks = ["Next.js", "Typescript", "React", "Burp Suite", "Frida"];

export function TechStackGsap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const [radius, setRadius] = useState(120); // 원 반지름

  const setRef = (el: HTMLDivElement | null, idx: number) => {
    if (!el) return;
    textRefs.current[idx] = el;
  };

  // 반응형 원 크기 계산
  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;

      const w = containerRef.current.offsetWidth;
      const r = w * 0.4; // 전체 너비의 35% 정도를 반지름으로
      setRadius(r);
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useGSAP(() => {
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    textRefs.current.forEach((item) => {
      gsap.to(item, {
        rotate: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative mt-40 mx-auto w-full max-w-[600px] aspect-square ${playWrite.className}`}
    >
      {/* 가운데 텍스트 */}
      <h4 className="absolute text-5xl md:text-6xl lg:text-8xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Stack
      </h4>

      <div ref={orbitRef} className="absolute inset-0">
        {stacks.map((text, idx) => {
          const angle = (360 / stacks.length) * idx;
          const rad = (angle * Math.PI) / 180;

          const cx = "50%";
          const cy = "50%";

          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={idx}
              ref={(el) => setRef(el, idx)}
              className="absolute text-xl md:text-3xl font-semibold"
              style={{
                left: `calc(${cx} + ${x}px)`,
                top: `calc(${cy} + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
