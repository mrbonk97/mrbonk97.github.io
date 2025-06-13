import Link from "next/link";
import { Logo } from "@/components/logo";
import { DarkModeButton } from "@/components/dark-mode/dark-mode-button";

export const Topnav = () => {
  return (
    <nav className="z-10 fixed top-0 p-5 px-[5%] h-20 w-full flex items-center justify-between border-b bg-background text-custom-1 border-custom-1">
      <Logo />

      <ul className="flex items-center gap-5 **:[a]:hover:underline underline-offset-2">
        <li>
          <Link href={"/blog"}>블로그</Link>
        </li>
        <li>
          <Link href={"/project"}>작품</Link>
        </li>
        <li>
          <Link href={"/about-me"}>소개</Link>
        </li>
      </ul>

      <DarkModeButton />
    </nav>
  );
};
