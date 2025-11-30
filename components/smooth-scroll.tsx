"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface Props {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
