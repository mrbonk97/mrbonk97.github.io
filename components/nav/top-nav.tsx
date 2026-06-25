"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MobileMenuSheet } from "./mobile-menu-sheet";
import { ROUTES } from "@/constants";

export function Topnav() {
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsVisible(currentScrollY <= lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-50 top-0 left-0 right-0 px-4 md:px-8 h-12 md:h-16 flex justify-between items-center gap-8 border-b bg-background transition-transform duration-300 ease-out will-change-transform
        ${isVisible ? "translate-y-0" : "md:translate-y-0 -translate-y-full"}`}
    >
      <Logo />

      <nav className="hidden md:block text-sm md:text-base">
        <ul className="flex gap-4">
          {ROUTES.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className="hover:underline underline-offset-2"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block w-16" />
      <MobileMenuSheet />
    </header>
  );
}
