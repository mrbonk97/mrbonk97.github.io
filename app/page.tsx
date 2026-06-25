"use client";

import { HomeHeader } from "@/components/home-header";
import { HomeMatter } from "@/components/home-matter";
import { Overlay } from "@/components/overlay";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);

  const handleRoute = (url: string) => {
    if (!mainRef.current) return;
    mainRef.current.classList.add("page-leave");
    setTimeout(() => router.push(url), 1000);
  };

  return (
    <>
      <main ref={mainRef} className="min-h-svh">
        <Overlay />
        <HomeHeader />
        <HomeMatter handleRoute={(url: string) => handleRoute(url)} />
      </main>
    </>
  );
}
