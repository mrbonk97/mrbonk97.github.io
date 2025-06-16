import { Metadata } from "next";
import ProjectPageContent from "./_content";

export const metadata: Metadata = {
  title: "行法 | 프로젝트",
  description: "그동안 진행한 사이드 프로젝트들을 소개합니다.",
  keywords: [
    "mrbonk97",
    "김현석",
    "개발자",
    "보안",
    "취약점",
    "프론트엔드",
    "프로젝트",
    "行法",
    "About Me",
    "블로그",
    "포트폴리오",
  ],
  openGraph: {
    title: "行法 | 프로젝트",
    description: "그동안 진행한 사이드 프로젝트들을 소개합니다.",
    url: "https://mrbonk97.github.io/project",
    siteName: "行法",
    images: [
      {
        url: "https://mrbonk97.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "사이드 프로젝트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "行法 | 프로젝트",
    description: "그동안 진행한 사이드 프로젝트들을 소개합니다.",
    images: ["https://mrbonk97.github.io/opengraph-image.png"],
  },
};

const ProjectPage = () => {
  return <ProjectPageContent />;
};

export default ProjectPage;
