import { DEV_PROJECTS } from "@/constants/dev-project";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TechStackLabel } from "./tech-stack";

export function ProjectHighlight() {
  const project = DEV_PROJECTS.find((p) => p.id == "oss")!;

  return (
    <article>
      <Link
        href={`/projects/${project.id}`}
        className="grid gap-4 rounded lg:grid-cols-5"
      >
        <div className="lg:col-span-2 relative p-4 lg:p-8 flex min-h-64 flex-col justify-between overflow-hidden rounded text-white">
          <Image
            src={project.imgUrl}
            alt=""
            fill
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <p className="relative px-4 py-2 w-fit rounded bg-custom-100 text-custom-400">
            {project.tag}
          </p>
          <h3 className="relative mt-8 px-4 py-2 max-w-sm rounded bg-custom-100 text-2xl font-medium text-custom-400">
            {project.title}
          </h3>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-4 lg:col-span-3">
          <div className="p-4 lg:p-8 flex items-center rounded bg-linear-to-br from-custom-400 to-custom-200">
            <ol className="w-full space-y-2 text-sm">
              <li className="px-4 py-2 rounded bg-secondary">SBOM 분석</li>
              <li className="px-4 py-2 rounded bg-secondary">취약점 매칭</li>
              <li className="rounded bg-[#191918] px-4 py-2 text-white">
                조치 현황 관리
              </li>
            </ol>
          </div>

          <div className="p-4 lg:p-8 flex flex-col items-center justify-center gap-4 rounded bg-secondary text-center">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.stack.map((s) => (
                <li key={s}>
                  <TechStackLabel name={s} compact />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 p-4 lg:p-8 flex flex-col justify-center gap-4 rounded bg-primary text-primary-foreground">
            <p>프로젝트 개요</p>
            <p>
              {project.summary}
            </p>
            <div className="flex items-center justify-between gap-4 text-sm font-medium">
              프로젝트 살펴보기
              <ChevronRight size={16} aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
