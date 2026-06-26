import Image from "next/image";
import { StackList } from "./list/stack-list";
import { FeatureList } from "./list/feature-list";
import Link from "next/link";
import { Project } from "@/types";

interface Props {
  data: Project;
}

export function ProjectTemplate({ data }: Props) {
  return (
    <main className="p-4 md:p-8 space-y-32 md:space-y-48">
      <header className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="w-full bg-secondary rounded-lg flex items-center justify-center">
          <Image
            src={data.banner}
            alt="banner"
            height={1536}
            width={2752}
            className="mx-auto w-full md:w-1/2 h-80 md:h-auto object-cover md:object-contain rounded-lg shadow-lg"
          />
        </div>
        <hgroup>
          <h2 className="text-lg md:text-2xl font-semibold text-muted-foreground text-balance break-keep">
            {data.subtitle}
          </h2>

          <h1 className="mt-0 md:mt-2 text-4xl md:text-6xl font-bold text-balance break-keep">
            {data.title}
          </h1>

          <dl className="mt-8 md:mt-16 space-y-4 md:space-y-8">
            {data.metadata.map((item) => (
              <div key={`metadata-${item.name}`}>
                <dt className="text-lg md:text-2xl font-semibold md:font-bold">
                  {item.name}
                </dt>
                <dd className="md:mt-2 md:text-lg md:text-balance md:whitespace-pre-line break-keep">
                  {item.content}
                </dd>
              </div>
            ))}
          </dl>
        </hgroup>
      </header>

      <section className="mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-bold">기술스택</h2>
        <ul className="mt-4 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {data.stacks.map((item) => (
            <StackList
              key={item.name}
              name={item.name}
              iconUrl={item.iconUrl}
            />
          ))}
        </ul>
      </section>

      <section className="md:bg-secondary rounded-lg">
        <div className="py-32 mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold">기여한 부분</h2>
          <ul className="mt-4 md:mt-8 grid md:grid-cols-2 gap-4 md:gap-8">
            {data.features.map((item) => (
              <FeatureList
                key={item.name}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-32">
        {data.content.map((item, idx) => (
          <div
            key={`content-${idx}`}
            className={`space-y-16
              [&_h2]:text-base [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:break-keep [&_h2]:text-muted-foreground [&_h2]:text-balance
              [&_h4]:mt-2 [&_h4]:text-4xl [&_h4]:md:text-6xl [&_h4]:font-bold [&_h4]:break-keep [&_h4]:text-balance [&_h4]:leading-snug
              [&_h3]:text-2xl [&_h3]:md:text-4xl [&_h3]:font-bold [&_h3]:break-keep [&_h3]:text-balance

              [&_h5]:text-2xl [&_h5]:font-bold [&_h5]:text-balance
              [&_p]:mt-4 [&_p]:text-lg [&_p]:md:break-keep
              [&_ul]:mt-4 [&_ul]:ml-8 [&_ul]:list-disc [&_ul]:space-y-4
              [&_li]:mt-4 [&_li]:ml-4 [&_li]:text-lg
              [&_img]:mt-4
              `}
          >
            {item}
          </div>
        ))}
      </section>

      {data.links.length > 0 && (
        <section className="mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold">프로젝트 링크</h2>
          <ul className="mt-4 md:mt-8 space-y-4">
            {data.links.map((item) => (
              <li key={`link-${item.name}`}>
                <Link
                  href={item.url}
                  target={item.isInside ? undefined : "_blank"}
                  rel={item.isInside ? undefined : "noreferrer"}
                  className="p-4 md:text-2xl font-semibold group flex items-center justify-between rounded-lg bg-primary text-primary-foreground"
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
