import { PROGRAMMING_PROJECT } from "@/constants";
import { DetailPage } from "@/components/detail-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ym picker | 김현석",
};

function ProjectPage() {
  const project = PROGRAMMING_PROJECT.find((p) => p.id === "ym-picker")!;

  return <DetailPage project={project} />;
}

export default ProjectPage;
