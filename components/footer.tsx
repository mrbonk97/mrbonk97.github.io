import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-muted-foreground">© mrbonk97</p>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-4 lg:gap-8">
            <li>
              <Link
                href="/projects"
                className="py-2 underline-offset-4 hover:underline"
              >
                프로젝트
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="py-2 underline-offset-4 hover:underline"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/about-me"
                className="py-2 underline-offset-4 hover:underline"
              >
                소개
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
