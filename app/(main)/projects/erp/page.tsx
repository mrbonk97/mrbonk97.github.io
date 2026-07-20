import { Metadata } from "next";
import { DATA } from "./data";
import { ProjectTemplate } from "@/components/project-detail/project-template";

export const metadata: Metadata = {
  title: "한수원 ERP 고도화 | 포트폴리오",
};

function ProjectIdPage() {
  return <ProjectTemplate data={DATA} />;
}

export default ProjectIdPage;
