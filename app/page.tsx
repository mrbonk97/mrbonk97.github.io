"use client";

import { useEffect, useRef } from "react";
import { HeaderGsap } from "@/components/gsap/header-gsap";
import { OverlayGsap } from "@/components/gsap/overlay-gsap";
import { HomeMatter } from "@/components/matter/home-matter";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.prefetch("/about");
  }, []);

  return (
    <main ref={mainRef} className="h-screen">
      <OverlayGsap />
      <HomeMatter mainRef={mainRef} />
      <HeaderGsap />
    </main>
  );
}
