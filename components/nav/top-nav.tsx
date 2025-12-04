"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export function Topnav() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isDetailPage = pathname.startsWith("/about/") && pathname !== "/about";

  useGSAP(() => {
    // /about/[slug] 일 때는 애니메이션 실행 X
    if (isDetailPage) {
      gsap.set(navRef.current, { y: 0 });
      return;
    }

    // 기본 애니메이션 (홈, /about 등)
    gsap.to(navRef.current, {
      y: 0,
      delay: 1.2,
      duration: 0.8,
      ease: "expo.inOut",
    });
  }, [isDetailPage]);

  return (
    <nav
      ref={navRef}
      className="-translate-y-16 z-50 fixed top-0 left-0 right-0 px-[5%] h-16 border-b flex items-center gap-8 bg-background/20 backdrop-blur"
    >
      <Link href="/" className="font-medium">
        行法
      </Link>
      <Link
        href="/about"
        className="block group relative overflow-hidden font-medium underline-offset-2"
      >
        <div className="duration-300 absolute -translate-y-8 group-hover:translate-y-0 underline underline-offset-2">
          소개
        </div>
        <div className="duration-300 group-hover:translate-y-8">소개</div>
      </Link>
    </nav>
  );
}
