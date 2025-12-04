"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
export function OverlayGsap({ className }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(divRef.current, {
      y: "0%",
      duration: 1,
      ease: "expo.inOut",
    });
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "fixed top-0 left-0 right-0 bottom-0 bg-custom-2 -translate-y-full -z-50",
        className
      )}
    />
  );
}
