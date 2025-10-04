"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECT_CATEGORY } from "@/asset/constants/project-category";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectCategoryNav() {
  const countRefs = useRef<HTMLElement[]>([]);

  const setCountRef = (el: HTMLElement | null, index: number) => {
    if (el) countRefs.current[index] = el;
  };

  useGSAP(() => {
    countRefs.current.forEach((el) => {
      const targetValue = Number(el.dataset.count || "0");
      const obj = { value: 0 };

      gsap.to(obj, {
        value: targetValue,
        duration: 1,
        ease: "power1.in",
        onUpdate: () => {
          el.textContent = Math.floor(obj.value).toLocaleString();
        },
      });
    });
  }, []);

  return (
    <section className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
      {PROJECT_CATEGORY.map((menu, i) => (
        <div
          key={`menu-${menu.title}`}
          className="p-4 text-sm lg:text-2xl font-bold rounded-lg bg-secondary"
        >
          <div>{menu.title}</div>
          <div
            ref={(el) => setCountRef(el, i)}
            className="text-6xl text-right count"
            data-count={menu.count}
          >
            0
          </div>
        </div>
      ))}
    </section>
  );
}
