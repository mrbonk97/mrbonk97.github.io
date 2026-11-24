import { DevProjectList } from "@/components/projects/dev-project-list";
import { ProjectHighlight } from "@/components/projects/project-highlight";
import { SecProjectList } from "@/components/projects/sec-project-list";
import { DEV_PROJECTS } from "@/constants/dev-project";
import { SEC_PROJECTS } from "@/constants/sec-projects";
import { playWrite } from "@/lib/fonts";

export default function Page() {
  return (
    <main className="min-h-svh p-4 lg:p-8 pt-20 lg:pt-24 mx-auto max-w-7xl">
      <header className="mt-16">
        <div>
          <h1
            className={`py-4 text-6xl lg:text-8xl font-bold tracking-wide ${playWrite.className} text-center text-custom-200`}
          >
            Projects
          </h1>
          <p className="mt-8 lg:mt-16 text-sm lg:text-base text-center text-muted-foreground">
            서비스 개발과 보안 취약점 점검 프로젝트
          </p>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="mb-8 pb-4 text-2xl font-semibold border-b">
          대표 프로젝트
        </h2>
        <ProjectHighlight />
      </section>

      <section className="mt-32">
        <h2 className="pb-4 text-2xl font-semibold border-b">개발 프로젝트</h2>
        <ul className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8 lg:gap-8 lg:gap-y-16">
          {DEV_PROJECTS.map((item, index) => (
            <DevProjectList key={item.id} {...item} index={index} />
          ))}
        </ul>
      </section>

      <section className="mt-32">
        <h2 className="pb-4 text-2xl font-semibold border-b">보안 프로젝트</h2>
        <ul className="divide-y border-b">
          {SEC_PROJECTS.map((item) => (
            <SecProjectList key={item.title} {...item} />
          ))}
        </ul>
      </section>
    </main>
  );
}
