"use client";

import { HomeMatter } from "@/components/home/matter";
import { Overlay } from "@/components/home/overlay";
import { Title } from "@/components/home/title";
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
    <main ref={mainRef} className="min-h-svh">
      <Overlay />
      <Title />
      <HomeMatter handleRoute={(url: string) => handleRoute(url)} />
    </main>
  );
}
