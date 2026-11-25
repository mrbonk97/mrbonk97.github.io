import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const pages = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "블로그" },
  { href: "/about-me", label: "소개" },
];

const projects = [
  { href: "/projects/oss", label: "오픈소스 취약점 관리" },
  { href: "/projects/1qcatch", label: "악성메일 모의훈련" },
  { href: "/projects/erp", label: "ERP 고도화" },
  { href: "/projects/kkirok", label: "끼록" },
  { href: "/projects/litedrive", label: "LiteDrive" },
];

export function Footer() {
  return (
    <footer className="mt-32 text-sm border-t bg-secondary">
      <div className="p-4 lg:p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <Logo />

          <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-2 gap-8">
            <nav aria-labelledby="footer-pages">
              <h3
                id="footer-pages"
                className="mb-4 font-medium text-muted-foreground"
              >
                둘러보기
              </h3>
              <ul>
                {pages.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="py-2 inline-block underline-offset-4 hover:text-custom-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-projects">
              <h3
                id="footer-projects"
                className="mb-4 font-medium text-muted-foreground"
              >
                프로젝트
              </h3>
              <ul>
                {projects.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="py-2 inline-block underline-offset-4 hover:text-custom-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t">
          <p className="text-muted-foreground">© mrbonk97</p>
          <a
            href="#"
            className="py-2 inline-flex items-center gap-2 text-muted-foreground underline-offset-4 hover:text-custom-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            맨 위로
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
