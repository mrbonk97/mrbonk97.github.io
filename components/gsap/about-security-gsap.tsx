"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SECURITY_PROJECT } from "@/constants";
import { useSmoother } from "@/context/smooth-context";

export function AboutSecurityGsap() {
  const { smoother } = useSmoother();
  const liRefs = useRef<HTMLLIElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (!el) return;
    liRefs.current[idx] = el;
  };

  useGSAP(() => {
    if (!smoother) return;

    liRefs.current.forEach((li) => {
      gsap.fromTo(
        li,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: li,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });
  }, [smoother]);

  return (
    <section
      ref={wrapperRef}
      className="mt-96 p-4 grid grid-cols-1 md:grid-cols-6 gap-4"
    >
      <aside className="text-2xl font-semibold col-span-1 text-right">
        보안프로젝트
      </aside>
      <ul className="col-span-1 md:col-span-5 mx-auto max-w-4xl w-full space-y-4">
        {SECURITY_PROJECT.map((item, idx) => (
          <li
            key={`security-${item.title}`}
            ref={(el) => setRef(el, idx)}
            className="p-4 rounded-lg w-full bg-custom-3"
          >
            <div className="flex justify-between gap-4">
              <h4 className="text-lg sm:text-2xl font-bold">{item.title}</h4>
              <span>{(idx + 1).toString().padStart(2, "0")}</span>
            </div>
            <p className="mt-2 font-medium opacity-80">
              {item.company} · {item.duration}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
