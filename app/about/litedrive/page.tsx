import { Metadata } from "next";
import { PROGRAMMING_PROJECT } from "@/constants";
import { DetailPage } from "@/components/detail-page";

export const metadata: Metadata = {
  title: "Litedrive | 김현석",
};

function ProjectPage() {
  const project = PROGRAMMING_PROJECT.find((p) => p.id === "litedrive")!;

  return <DetailPage project={project} />;
}

export default ProjectPage;
