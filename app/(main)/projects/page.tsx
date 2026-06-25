import Image from "next/image";
import { ProjectList } from "@/components/list/project-list";
import { SecurityProjectList } from "@/components/list/security-project-list";
import { DEV_PROJECTS, SECURITY_PROJECTS } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 | 포트폴리오",
};

export default function ProjectPage() {
  return (
    <main className="p-4 md:p-8 mx-auto max-w-7xl">
      <header className="mt-12 md:mt-16 p-8 rounded-lg bg-custom-2 text-custom-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
          프로젝트
        </h1>
        <Image
          width={256}
          height={256}
          alt="flower"
          src={"/images/flower.png"}
          className="mx-auto flower"
        />
      </header>
      <section className="mt-16 md:mt-32">
        <h2 className="md:pb-2 text-lg md:text-2xl font-medium border-b">
          개발 프로젝트
        </h2>
        <ul className="mt-4 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 md:gap-8">
          {DEV_PROJECTS.map((item) => (
            <ProjectList key={item.id} project={item} />
          ))}
        </ul>
      </section>

      <section className="mt-16 md:mt-32">
        <h2 className="md:pb-2 text-lg md:text-2xl font-medium border-b">
          보안 프로젝트
        </h2>
        <ul className="mt-4 md:mt-8 space-y-4">
          {SECURITY_PROJECTS.map((item) => (
            <SecurityProjectList
              key={`security-${item.title}`}
              project={item}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
