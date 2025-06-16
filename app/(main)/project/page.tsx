import { Metadata } from "next";
import ProjectPageContent from "./_content";

export const metadata: Metadata = {
  title: "行法 | 프로젝트",
  description: "사이드 프로젝트들을 소개합니다.",
  keywords: [
    "mrbonk97",
    "개발자",
    "보안",
    "취약점",
    "프론트엔드",
    "Next.js",
    "行法",
    "블로그",
    "포트폴리오",
  ],
  openGraph: {
    title: "行法 | 프로젝트",
    description: "사이드 프로젝트들을 소개합니다.",
    url: "https://mrbonk97.github.io/project",
    siteName: "行法",
    images: [
      {
        url: "/opengraph-image",
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
    description: "사이드 프로젝트들을 소개합니다.",
    images: ["/opengraph-image"],
  },
};

const ProjectPage = () => {
  return <ProjectPageContent />;
};

export default ProjectPage;
