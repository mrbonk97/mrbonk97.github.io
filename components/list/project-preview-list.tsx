import Image from "next/image";
import { ProjectPreview } from "@/types";
import Link from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface Props {
  project: ProjectPreview;
}

export function ProjectPreviewList({ project }: Props) {
  return (
    <AccordionItem
      key={`dev-${project.id}`}
      value={project.id}
      className="py-4 md:p-8 hover:bg-secondary group"
    >
      <AccordionTrigger className="hover:no-underline duration-300">
        <span className="text-lg md:text-4xl font-bold">{project.title}</span>
      </AccordionTrigger>

      <AccordionContent className="mt-4 p-0 grid md:grid-cols-2 gap-8">
        <div className="p-4 md:p-8 min-h-48 md:min-h-96 flex items-center justify-center rounded-lg bg-secondary group-hover:bg-background duration-300">
          <Image
            src={project.banner}
            alt={project.title}
            height={1080}
            width={1080}
            className="w-1/2 aspect-square object-cover rounded-lg shadow-2xl"
          />
        </div>
        <hgroup>
          <p className="text-lg md:text-2xl md:max-w-lg font-medium leading-normal text-balance break-keep">
            {project.summary}
          </p>
          <ul className="flex gap-2">
            {project.tags.map((t) => (
              <li key={t} className="text-muted-foreground">
                #{t}
              </li>
            ))}
          </ul>

          <ul className="mt-8 ml-8 list-disc text-lg">
            {project.stacks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <Link
            href={`/projects/${project.id}`}
            className="inline-block mt-8 text-lg hover:tracking-wide duration-300"
          >
            프로젝트 살펴보기 →
          </Link>
        </hgroup>
      </AccordionContent>
    </AccordionItem>
  );
}
