import { Metadata } from "next";
import { DetailPage } from "@/components/detail-page";
import { PROGRAMMING_PROJECT } from "@/constants";

export const metadata: Metadata = {
  title: "한수원 ERP 고도화 | 김현석",
};

function ProjectPage() {
  const project = PROGRAMMING_PROJECT.find((p) => p.id === "erp")!;
  return <DetailPage project={project} />;
}

export default ProjectPage;
