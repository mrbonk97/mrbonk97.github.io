import { Metadata } from "next";
import { PROJECT_PREVIEWS, SECURITY_PROJECTS } from "@/constants";
import { ProjectListCarousel } from "@/components/carousel/project-list-carousel";
import { Accordion } from "@/components/ui/accordion";
import { ProjectPreviewList } from "@/components/list/project-preview-list";

export const metadata: Metadata = {
  title: "프로젝트 | 포트폴리오",
};

export default function ProjectPage() {
  return (
    <main className="p-4 md:p-8 mt-8">
      <header className="pt-8">
        <h1 className="text-6xl md:text-8xl font-bold md:leading-tight text-balance">
          프로그래밍 & 취약점 점검
        </h1>
        <p className="mt-4 text-lg md:text-4xl font-bold md:leading-normal text-balance">
          회사 업무와 개인 프로젝트를 진행하며
          <br />
          프론트엔드와 백엔드를 함께 구현했고,
          <br />웹 서비스 취약점 점검 업무도 경험했습니다.
        </p>

        <ProjectListCarousel />
      </header>

      <section className="mt-48 md:mt-64 md:border-t">
        <h2 className="mt-2 md:mt-32 text-4xl md:text-6xl font-bold md:text-center">
          개발 프로젝트
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mt-8 md:mt-16 mx-auto max-w-7xl border-t"
        >
          {PROJECT_PREVIEWS.map((item) => (
            <ProjectPreviewList key={item.id} project={item} />
          ))}
        </Accordion>
      </section>

      <section className="mt-48 md:mt-64 md:border-t">
        <header className="mt-2 md:mt-32 mx-auto max-w-7xl flex items-end justify-between">
          <h2 className="text-4xl md:text-6xl font-bold">보안 프로젝트</h2>
          <span className="text-lg md:text-2xl text-custom-2 font-medium">
            {SECURITY_PROJECTS.length}건
          </span>
        </header>
        <ul className="mt-4 md:mt-32 mx-auto max-w-7xl space-y-4 md:space-y-8">
          {SECURITY_PROJECTS.map((item, idx) => (
            <li
              key={`sec-${item.title}`}
              className="py-4 border-t last:border-b flex justify-between"
            >
              <hgroup>
                <h4 className="text-base md:text-lg font-semibold text-balance break-keep">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm md:text-base">{item.duration}</p>
                <p className="mt-1 text-sm md:text-base">{item.company}</p>
              </hgroup>

              <span>{(idx + 1).toString().padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
