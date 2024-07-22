"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const TopNav = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!buttonRef.current) return;
      if (!navRef.current) return;
      if (navRef.current.contains(event.target)) return;
      if (buttonRef.current.contains(event.target)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, navRef]);

  return (
    <header className="fixed z-40 top-0 pt-5 pr-5 md:pt-10 md:pr-20 w-full flex justify-end">
      <nav
        ref={navRef}
        aria-pressed={isOpen}
        onClick={() => setIsOpen((cur) => !cur)}
        className="h-14 w-0 aria-pressed:w-64 duration-500 overflow-hidden bg-secondary text-tertiary"
      >
        <ul
          className={`h-full px-5 flex items-center font-semibold gap-10 w-80`}
        >
          <li
            className={`cursor-pointer shrink-0 hover:underline underline-offset-4
            ${pathname === "/project" && "underline"}`}
          >
            <Link href={"/project"}>프로젝트</Link>
          </li>
          <li
            className={`cursor-pointer shrink-0 hover:underline underline-offset-4
            ${pathname === "/about-me" && "underline"}`}
          >
            <Link href={"/about-me"}>소개</Link>
          </li>
          <li
            className={`cursor-pointer shrink-0 hover:underline underline-offset-4
            ${pathname === "/contact" && "underline"}`}
          >
            <Link href={"/contact"}> 연락</Link>
          </li>
        </ul>
      </nav>
      <button
        ref={buttonRef}
        className="relative p-3 h-14 w-14 flex flex-col justify-between overflow-hidden cursor-pointer bg-secondary"
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <div
          aria-pressed={isOpen}
          className="w-full h-1 rounded-full bg-white duration-500 aria-pressed:ml-12 aria-pressed:opacity-0"
        />
        <div className="relative w-full h-1">
          <div
            aria-pressed={isOpen}
            className="absolute w-full h-1 duration-500 bg-white rounded-full aria-pressed:rotate-45"
          />
          <div
            aria-pressed={isOpen}
            className="absolute w-full h-1 duration-500 bg-white rounded-full aria-pressed:-rotate-45"
          />
        </div>
        <div
          aria-pressed={isOpen}
          className="ml-2 w-6 h-1 rounded-full bg-white duration-500 aria-pressed:-ml-12 aria-pressed:opacity-0"
        />
      </button>
    </header>
  );
};
