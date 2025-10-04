"use client";

import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECT_CATEGORY } from "@/asset/constants/project-category";

interface Props {
  filter: string | undefined;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectCategoryNav({ filter }: Props) {
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
    <nav className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
      {PROJECT_CATEGORY.map((menu, i) => (
        <Link
          href={menu.url}
          key={`menu-${menu.title}`}
          aria-current={
            (!filter && menu.url == "/projects") || (filter && menu.url.includes(filter))
              ? "page"
              : "false"
          }
          className="p-4 block text-sm lg:text-2xl font-bold rounded-lg bg-secondary aria-[current='page']:bg-primary aria-[current='page']:text-primary-foreground hover:bg-primary hover:text-primary-foreground duration-150"
        >
          <div>{menu.title}</div>
          <div
            ref={(el) => setCountRef(el, i)}
            className="text-6xl text-right count"
            data-count={menu.count}
          >
            0
          </div>
        </Link>
      ))}
    </nav>
  );
}
