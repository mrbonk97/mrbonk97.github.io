"use client";

import { useRef } from "react";
import { HeaderGsap } from "@/components/gsap/header-gsap";
import { OverlayGsap } from "@/components/gsap/overlay-gsap";
import { HomeMatter } from "@/components/matter/home-matter";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={mainRef} className="h-screen">
      <OverlayGsap />
      <HomeMatter mainRef={mainRef} />
      <HeaderGsap />
    </main>
  );
}
