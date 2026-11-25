import type { DevProject } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type ProjectLink = { label: string; href: string };

function ProjectMetadata({
  project,
}: {
  project: Pick<DevProject, "duration" | "role" | "size">;
}) {
  return (
    <dl className="mt-8 p-4 lg:p-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 rounded bg-secondary">
      {[
        ["기간", project.duration],
        ["역할", project.role],
        ["인원", project.size],
      ].map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-custom-200">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectHeader({
  project,
  links = [],
}: {
  project: DevProject;
  links?: readonly ProjectLink[];
}) {
  return (
    <section className="pb-8 border-b">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded">
        <Image
          src={project.bgUrl ?? project.imgUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 736px, calc(100vw - 32px)"
          loading="eager"
          className="object-cover"
        />
        {project.bgUrl && (
          <Image
            src={project.imgUrl}
            alt={`${project.title} 로고`}
            width={128}
            height={128}
            className="relative h-32 w-32 rounded-2xl shadow-lg"
          />
        )}
      </div>
      <header className="mt-8">
        <h1 className="text-4xl font-semibold">{project.title}</h1>
        <p className="mt-4">{project.summary}</p>
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-custom-200 hover:underline underline-offset-4"
              >
                {label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(새 탭)</span>
              </a>
            ))}
          </div>
        )}
      </header>
      <ProjectMetadata project={project} />
    </section>
  );
}
