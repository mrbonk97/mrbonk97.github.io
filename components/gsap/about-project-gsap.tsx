"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { PROGRAMMING_PROJECT } from "@/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AboutProjectGsap() {
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const h4Ref = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const setWrapperRef = (el: HTMLDivElement | null, idx: number) => {
    if (!el) return;
    wrapperRefs.current[idx] = el;
  };

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (!el) return;
    cardRefs.current[idx] = el;
  };

  useGSAP(() => {
    gsap.to(h4Ref.current, {
      opacity: 1,
      y: 0,
      delay: 0.2,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    wrapperRefs.current.forEach((wrapper, idx) => {
      const card = cardRefs.current[idx];
      if (!card) return;

      let scale = 1;
      let rotation = 0;

      // 마지막 카드 제외 (idx === 마지막 카드 index)
      if (idx !== cardRefs.current.length - 1) {
        scale = 0.9 + 0.025 * idx;
        rotation = -10;
      }

      gsap.to(card, {
        scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top " + (60 + 10 * idx),
          end: "bottom 550",
          endTrigger: sectionRef.current,
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
          id: (idx + 1).toString(),
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="p-4 my-64 min-h-screen mx-auto max-w-6xl space-y-64"
    >
      <h4
        ref={h4Ref}
        className="translate-y-8 opacity-0 text-3xl lg:text-5xl font-bold leading-normal text-center mb-16"
      >
        지금까지 수행한 다양한 <br />
        프로젝트를 소개합니다.
      </h4>
      <div className="h-8" />
      {PROGRAMMING_PROJECT.map((item, idx) => (
        <div
          key={`project-p-${item.id}`}
          ref={(el) => setWrapperRef(el, idx)}
          onClick={() => {
            const card = cardRefs.current[idx];
            if (!card) return;

            // 클릭 애니메이션 (확대 or 축소)
            gsap.to(card, {
              scale: 0.9,
              y: -20,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => router.push(`/about/${item.id}`),
            });
          }}
          className="cursor-pointer"
        >
          <div
            ref={(el) => setCardRef(el, idx)}
            className={`p-8 h-[640px] w-full rounded-2xl grid grid-cols-1 sm:grid-cols-2
        ${idx % 2 === 0 ? "bg-custom-2 text-custom-4" : ""}
        ${idx % 2 === 1 ? "bg-custom-3 text-custom-1" : ""}
      `}
          >
            <div className="h-full flex items-center justify-center">
              {item.icon}
            </div>
            <hgroup>
              <h4 className="text-xl sm:text-3xl font-bold">{item.title}</h4>
              <p className="mt-4 font-medium">기간: {item.duration}</p>
              <p className="font-medium">업무: {item.role}</p>
              <p className="font-medium">스택: {item.stack}</p>
              <p className="mt-8 text-sm sm:text-base font-medium max-w-md">
                {item.description}
              </p>
              <ArrowRight className="mt-40 mx-auto duration-150" size={32} />
            </hgroup>
          </div>
        </div>
      ))}
    </section>
  );
}
