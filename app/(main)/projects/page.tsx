import { Metadata } from "next";
import { DevProjectCard } from "@/components/project/dev-project-card";
import { SecProjectList } from "@/components/project/sec-project-list";
import { DEV_PROJECTS, SECURITY_PROJECTS } from "./data";
import { Hero3dObject } from "@/components/project/hero-3d-object";

export const metadata: Metadata = {
  title: "프로젝트 | 포트폴리오",
};

export default function ProjectPage() {
  return (
    <main className="p-4 md:p-8 pt-12 md:pt-16 mx-auto max-w-7xl">
      <header className="mt-4">
        <h1 className="text-balance text-4xl md:text-6xl font-bold md:leading-tight">
          Programming &amp; Security
        </h1>

        <p className="mt-4 text-balance text-lg md:text-2xl font-medium md:leading-normal">
          프론트엔드부터 백엔드까지
          <br />
          웹 서비스를 구현하고
          <br />
          보안 취약점을 점검합니다.
        </p>

        <Hero3dObject />
      </header>

      <section className="mt-48 md:mt-64">
        <h2 className="text-2xl md:text-4xl font-semibold">개발 프로젝트</h2>
        <ul className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {DEV_PROJECTS.map((project, idx) => {
            return (
              <DevProjectCard key={project.id} idx={idx} project={project} />
            );
          })}
        </ul>
      </section>

      <section className="mt-48 md:mt-64">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-semibold">보안 프로젝트</h2>
          <span className="text-lg md:text-2xl text-custom-2 font-medium">
            {SECURITY_PROJECTS.length}건
          </span>
        </header>
        <ol className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SECURITY_PROJECTS.map((project, index) => (
            <SecProjectList
              key={`dev-${project.title}`}
              index={index}
              project={project}
            />
          ))}
        </ol>
      </section>
    </main>
  );
}
