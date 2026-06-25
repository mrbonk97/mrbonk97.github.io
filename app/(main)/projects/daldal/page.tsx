import { Metadata } from "next";
import { DATA } from "./data";
import { ProjectTemplate } from "@/components/project-template";

export const metadata: Metadata = {
  title: "단거주의보 | 포트폴리오",
};

function ProjectIdPage() {
  return <ProjectTemplate data={DATA} />;
}

export default ProjectIdPage;
