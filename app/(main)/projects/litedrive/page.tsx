import { Metadata } from "next";
import { DATA } from "./data";
import { ProjectTemplate } from "@/components/project-template";

export const metadata: Metadata = {
  title: "파일 공유 서비스 | 포트폴리오",
};

function ProjectIdPage() {
  return <ProjectTemplate data={DATA} />;
}

export default ProjectIdPage;
