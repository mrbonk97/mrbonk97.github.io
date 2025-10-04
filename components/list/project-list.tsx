import { PROGRAMMING_PROJECT } from "@/asset/constants/programming-project";
import { ProjectCarousel } from "../project-carousel";
import Link from "next/link";

interface Props {
  project: (typeof PROGRAMMING_PROJECT)[1];
}
export function ProjectList({ project }: Props) {
  return (
    <li className="p-4 bg-secondary rounded-lg">
      <div className="text-sm font-medium opacity-70">{project.date}</div>
      <h4 className="mt-1 text-base md:text-lg font-medium break-keep">{project.title}</h4>
      <h5 className="text-sm">{project.description}</h5>
      {project.detail && <ProjectCarousel images={project.detail.images} />}
      {project.detail.links && (
        <nav className="mt-4 flex justify-center gap-2">
          {project.detail.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline-offset-2 hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </li>
  );
}
