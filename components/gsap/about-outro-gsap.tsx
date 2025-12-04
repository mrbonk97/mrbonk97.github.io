"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

export function AboutOutroGsap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const h3Ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(h3Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: h3Ref.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    gsap.to(imgRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
  }, []);

  return (
    <section ref={wrapperRef} className="p-4 mt-96">
      <h3
        ref={h3Ref}
        className="translate-y-8 opacity-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed text-center"
      >
        재밌어 보이면 일단 만들어보고.
        <br /> 실행을 성장으로 바꾸는 개발자입니다.
      </h3>
      <Image
        ref={imgRef}
        src={"/images/man.png"}
        alt="man"
        height={256}
        width={256}
        className="translate-y-8 opacity-0 mt-32 mx-auto"
      />
    </section>
  );
}
