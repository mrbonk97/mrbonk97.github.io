"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    url: "/project",
    text: "프로젝트",
  },
  {
    url: "/blog",
    text: "블로그",
  },
  {
    url: "/about",
    text: "소개",
  },
];

export function Topnav() {
  const pathname = usePathname();

  return (
    <nav className="z-50 fixed p-0 md:p-4 w-full max-w-5xl left-1/2 -translate-x-1/2">
      <div className="p-4 h-16 flex items-center justify-between md:rounded-lg shadow-lg bg-custom-2">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            height={24}
            width={48}
            alt="行法"
            draggable={false}
          />
        </Link>

        <ul className="flex gap-4">
          {MENU.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                aria-current={
                  pathname.startsWith(item.url) ? "page" : undefined
                }
                className="hover:underline underline-offset-2 duration-150 text-sm text-custom-3 aria-[current='page']:text-custom-4"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
