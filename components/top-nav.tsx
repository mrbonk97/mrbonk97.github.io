"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      <nav
        className={`bg-primary-400 fixed right-24 top-10 h-16 z-40 duration-500 overflow-hidden
        ${isOpen ? "w-96" : " w-0"}`}
      >
        <ul className="text-secondary-400 w-96 justify-evenly flex h-full items-center text-xl font-semibold">
          <li
            className={`nt text-center hover:underline underline-offset-8 duration-150
            ${pathname === "/project" && "underline"}`}
          >
            <Link href="/project">프로젝트</Link>
          </li>
          <li
            className={`nt text-center hover:underline underline-offset-8 duration-150
          ${pathname === "/about-me" && "underline"}`}
          >
            <Link href="/about-me">소개</Link>
          </li>
          <li
            className={`nt text-center hover:underline underline-offset-8 duration-150
           ${pathname === "/contact" && "underline"}`}
          >
            <Link href="/contact">연락</Link>
          </li>
        </ul>
      </nav>

      <button
        className="bg-primary-400 fixed right-10 top-10 h-16 w-16 p-4 overflow-hidden z-50"
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <div
          className={`bg-secondary-400 absolute top-4 h-1 w-8 rounded-full duration-500
            ${isOpen && "ml-10 opacity-0"}`}
        />
        <div
          className={`bg-secondary-400 absolute top-[30px] h-1 w-7 ml-1 rounded-full duration-500 
            ${isOpen && "-rotate-45"}`}
        />
        <div
          className={`bg-secondary-400 absolute top-[30px] h-1 w-7 ml-1 rounded-full duration-500 
            ${isOpen && "rotate-45"}`}
        />
        <div
          className={`bg-secondary-400 absolute h-1 w-6 bottom-4 rounded-full duration-500
            ${isOpen ? "-ml-10 opacity-0" : "ml-2"}`}
        />
      </button>
    </header>
  );
};
