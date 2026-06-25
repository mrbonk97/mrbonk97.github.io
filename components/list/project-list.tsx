import Image from "next/image";
import { ProjectPreview } from "@/types";
import Link from "next/link";

interface Props {
  project: ProjectPreview;
}

export function ProjectList({ project }: Props) {
  return (
    <li>
      <Link href={`/projects/${project.id}`} className="block">
        <div className="overflow-hidden rounded">
          <Image
            src={project.banner}
            alt={project.title}
            height={1080}
            width={1080}
            className="w-full aspect-square object-cover hover:scale-105 duration-500 rounded"
          />
        </div>
        <h4 className="mt-1 md:mt-2 md:text-2xl font-medium md:font-semibold text-balance break-keep">
          {project.title}
        </h4>
      </Link>
    </li>
  );
}
