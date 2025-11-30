import { Metadata } from "next";
import { PROGRAMMING_PROJECT } from "@/constants";
import { DetailPage } from "@/components/detail-page";

export const metadata: Metadata = {
  title: "악성메일훈련 | 김현석",
};

function ProjectPage() {
  const project = PROGRAMMING_PROJECT.find((p) => p.id === "hana-apt")!;
  return <DetailPage project={project} />;
}

export default ProjectPage;
