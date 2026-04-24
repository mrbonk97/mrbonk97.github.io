import { Project } from "@/types";
import { HeaderSection } from "../project/header-section";
import { TitleSection } from "../project/title-section";

// Page Transition용으로 만든 article

interface Props {
  project?: Project | null;
  active: boolean;
}

export function FlyingArticle({ project, active }: Props) {
  return (
    <article
      className={`z-40 border bg-background shadow-2xl rounded-2xl fixed inset-0 ${active ? "page-enter" : "hidden scale-80 translate-y-[120%]"}`}
    >
      <div className="p-4 bg-background pt-20 mx-auto max-w-5xl leading-relaxed whitespace-pre-line">
        <HeaderSection
          title={project?.title ?? ""}
          titleEng={project?.titleEng ?? ""}
          imgUrl={project?.imgUrl ?? "/image/placeholder.png"}
        />

        <section className="mt-16 md:mt-32">
          <TitleSection eyebrow="OVERVIEW" title="프로젝트 소개" />

          <p className={"mt-4 md:mt-8"}>{project?.summary}</p>
        </section>

        <section className="mt-32">
          <TitleSection eyebrow="TECH STACK" title="프로젝트에 사용한 기술" />
        </section>
      </div>
    </article>
  );
}
