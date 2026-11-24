import Link from "next/link";
import { Logo } from "./logo";

export function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-32 h-16 px-[5%] flex items-center justify-between border-b bg-background/64 backdrop-blur-lg">
      <Logo />
      <nav className="flex gap-4 lg:gap-8">
        <Link href="/projects" className="py-4 hover:underline underline-offset-4">
          프로젝트
        </Link>
        <Link href="/blog" className="py-4 hover:underline underline-offset-4">
          블로그
        </Link>
        <Link href="/about-me" className="py-4 hover:underline underline-offset-4">
          소개
        </Link>
      </nav>
    </header>
  );
}
