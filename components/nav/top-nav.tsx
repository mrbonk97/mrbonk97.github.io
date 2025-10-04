import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";

interface Props {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
}

export function Topnav({ ref, className }: Props) {
  return (
    <nav
      ref={ref}
      className={cn(
        `fixed z-10 top-0 left-0 right-0 p-4 h-16 flex items-center justify-between gap-4 bg-background`,
        className
      )}
    >
      <Link href={"/"} className="opacity-80 hover:opacity-50 duration-150">
        <Image src={"/images/logo.svg"} alt="logo" height={128} width={128} className="w-14" />
      </Link>
      <ul className="flex gap-4 font-semibold">
        <li>
          <Link href={"/projects"} className="opacity-80 hover:opacity-50 duration-150">
            프로젝트
          </Link>
        </li>
        <li>
          <Link href={"/about-me"} className="opacity-80 hover:opacity-50 duration-150">
            소개
          </Link>
        </li>
      </ul>
      <div className="w-14 h-1" />
    </nav>
  );
}
