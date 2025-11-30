import Link from "next/link";

interface Props {
  page?: string;
}

export function Topnav({ page }: Props) {
  return (
    <nav className="z-50 fixed top-0 left-0 right-0 px-[5%] h-16 border-b flex items-center gap-2 bg-background/50 backdrop-blur text-rose-400">
      <Link href="/" className="font-medium">
        行法
      </Link>
      <Link
        href="/about"
        aria-current={page?.startsWith("/about") ? "page" : undefined}
        className={`ml-8 font-medium underline-offset-2 aria-[current='page']:underline`}
      >
        소개
      </Link>
    </nav>
  );
}
