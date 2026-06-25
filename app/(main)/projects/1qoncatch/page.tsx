import { Metadata } from "next";
import { DATA } from "./data";
import { ProjectTemplate } from "@/components/project-template";

export const metadata: Metadata = {
  title: "악성메일 모의훈련 | 포트폴리오",
};

function ProjectIdPage() {
  return <ProjectTemplate data={DATA} />;
}

export default ProjectIdPage;
