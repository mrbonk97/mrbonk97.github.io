import { ProjectList } from "@/components/list/project-list";
import { SecurityList } from "@/components/list/security-list";
import { SECURITY_PROJECT } from "@/asset/constants/security-project";
import { PROGRAMMING_PROJECT } from "@/asset/constants/programming-project";
import { ProjectCategoryNav } from "@/components/nav/project-category-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "mrbonk97 | 프로젝트",
};

interface Props {
  searchParams: Promise<{ filter: string }>;
}

export const dynamic = "force-dynamic";
async function ProjectsPage({ searchParams }: Props) {
  const { filter } = await searchParams;

  return (
    <main className="p-4 pt-20 mx-auto max-w-7xl">
      <header className="overflow-hidden">
        <h1 className="sr-only">Project List</h1>
        <div className="font-black text-9xl whitespace-nowrap animate-marquee">
          PROJECT · PROJECT · PROJECT · PROJECT · PROJECT · PROJECT · PROJECT · PROJECT ·
        </div>
      </header>
      <ProjectCategoryNav filter={filter} />

      {(!filter || filter === "programming") && (
        <section className="mt-4">
          <h2 className="text-2xl font-bold opacity-70">프로그래밍</h2>
          <ul className="mt-2 space-y-4">
            {PROGRAMMING_PROJECT.map((project, idx) => (
              <ProjectList key={`project-${idx}`} project={project} />
            ))}
          </ul>
        </section>
      )}

      {(!filter || filter === "security") && (
        <section className="mt-4">
          <h2 className="text-2xl font-bold opacity-70">보안</h2>
          <ul className="mt-2 space-y-2">
            {SECURITY_PROJECT.map((project, idx) => (
              <SecurityList key={`security-${idx}`} title={project.title} date={project.date} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default ProjectsPage;
