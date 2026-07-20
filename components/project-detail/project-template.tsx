import Link from "next/link";
import { Project } from "@/types";
import { StackList } from "./prokect-stack-list";
import { FeatureList } from "./project-feature-list";
import { ProjectTemplateHeader } from "./project-template-header";

interface Props {
  data: Project;
}

export function ProjectTemplate({ data }: Props) {
  return (
    <main className="p-4 md:p-8 pt-12 md:pt-16 mx-auto max-w-4xl space-y-48">
      <ProjectTemplateHeader
        title={data.title}
        banner={data.banner}
        metadata={data.metadata}
      />

      <section>
        <h2 className="text-2xl md:text-4xl font-semibold">기술스택</h2>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:gap-8">
          {data.stacks.map((item) => (
            <StackList
              key={item.name}
              name={item.name}
              iconUrl={item.iconUrl}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl md:text-4xl font-semibold">핵심 기능</h2>
        <ul className="mt-4 space-y-4 md:space-y-8">
          {data.features.map((item) => (
            <FeatureList
              key={`feature-${item.name}`}
              name={item.name}
              icon={item.icon}
              description={item.description}
            />
          ))}
        </ul>
      </section>

      {data.content.map((item) => item)}

      {data.links.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-4xl font-semibold">연관 링크</h2>
          <ul className="mt-4 space-y-4 md:space-y-8">
            {data.links.map((item) => (
              <li key={`link-${item.name}`}>
                <Link
                  href={item.url}
                  target={item.isInside ? undefined : "_blank"}
                  rel={item.isInside ? undefined : "noreferrer"}
                  className="block p-4 md:p-8 rounded bg-custom-2 text-custom-4 hover:bg-custom-2/80 duration-150"
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
