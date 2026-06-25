import { SecurityProject } from "@/types";

interface Props {
  project: SecurityProject;
}
export function SecurityProjectList({ project }: Props) {
  return (
    <li className="p-4 md:p-8 bg-secondary rounded-lg">
      <h5 className="text-base md:text-2xl font-bold">{project.title}</h5>
      <p className="mt-0 md:mt-2 text-sm md:text-base font-medium">
        {project.duration}
      </p>
      <p className="text-sm md:text-base font-medium">{project.company}</p>
    </li>
  );
}
