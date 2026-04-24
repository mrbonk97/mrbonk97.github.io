"use client";

import Image from "next/image";
import { Project } from "@/types";
import { useState } from "react";
import { playWrite } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import { DEV_PROJECT, SECURITY_PROJECT } from "@/constants/project";
import { FlyingArticle } from "@/components/article/flying-article";

export default function ProjectPage() {
  const router = useRouter();
  const [page, setPage] = useState<Project | null>(null);

  const handleClick = (p: Project) => {
    setPage(p);
    setTimeout(() => router.push(`/project/${p.url}`), 800);
  };

  return (
    <>
      <main className="pt-20 p-4 mx-auto max-w-5xl">
        <header className="md:mt-8 p-4 grid grid-cols-2 items-center gap-4 rounded-lg bg-custom-2">
          <Image
            src={"/images/project-banner.png"}
            alt="flower"
            height={606}
            width={606}
            className="w-96 flower"
          />
          <h1
            className={`md:mb-8 md:mr-4 text-4xl md:text-8xl text-center font-bold text-custom-4 ${playWrite.className}`}
          >
            Project
          </h1>
        </header>

        <section className="mt-16 md:mt-32">
          <h2 className="pb-2 text-2xl md:text-4xl font-bold border-b">
            개발 프로젝트
          </h2>

          <ul className="mt-4 grid grid-cols-2 gap-4 md:gap-8">
            {DEV_PROJECT.map((item: Project) => (
              <li
                key={`project-${item.url}`}
                role="button"
                className="flex-row gap-4 group cursor-pointer"
                onClick={() => handleClick(item)}
              >
                <div className="overflow-hidden shrink-0 rounded-lg">
                  <Image
                    src={`/images/project/${item.url}/banner.png`}
                    alt={item.title}
                    width={1024}
                    height={1024}
                    className="shrink-0 block aspect-3/4 md:aspect-video rounded-lg object-cover duration-500 group-hover:scale-105"
                  />
                </div>

                <h4 className="mt-2 md:text-2xl text-center md:text-left font-semibold transition-colors duration-150 group-hover:text-custom-2 break-keep">
                  {item.title}
                </h4>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-32">
          <h2 className="pb-2 text-2xl md:text-4xl font-bold border-b">
            보안 프로젝트
          </h2>
          <ul className="mt-4 grid gap-4">
            {SECURITY_PROJECT.map((item) => (
              <li
                key={item.title}
                className="p-4 md:p-8 bg-secondary rounded-lg"
              >
                <h5 className="text-lg font-bold">{item.title}</h5>
                <p className="font-medium">{item.duration}</p>
                <p className="font-medium">{item.company}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FlyingArticle active={page !== null} project={page} />
    </>
  );
}
