import { Metadata } from "next";
import { PROGRAMMING_PROJECT } from "@/constants";
import { DetailPage } from "@/components/detail-page";

export const metadata: Metadata = {
  title: "PMD | 김현석",
};

function ProjectPage() {
  const project = PROGRAMMING_PROJECT.find((p) => p.id === "repo-pmd")!;
  return <DetailPage project={project} />;
}

export default ProjectPage;
