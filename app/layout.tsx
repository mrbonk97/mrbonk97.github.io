import "./globals.css";
import type { Metadata } from "next";
import { notoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "김현석 포트폴리오",
  description:
    "정보보안과 프론트엔드 개발을 기반으로 사용자 중심의 웹 서비스를 만드는 김현석입니다.",

  keywords: [
    "김현석",
    "Hyunsuk Kim",
    "포트폴리오",
    "정보보안",
    "보안 엔지니어",
    "프론트엔드 개발자",
    "Next.js",
    "React",
    "Typescript",
    "웹 개발",
  ],

  authors: [{ name: "김현석" }],

  openGraph: {
    title: "김현석 포트폴리오",
    description:
      "정보보안과 프론트엔드 개발을 기반으로 사용자 중심의 웹 서비스를 만드는 김현석입니다.",
    url: "https://mrbonk97.github.io",
    siteName: "Hyunsuk Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "김현석 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "김현석 포트폴리오",
    description:
      "정보보안과 프론트엔드 개발을 기반으로 사용자 중심의 웹 서비스를 만드는 김현석입니다.",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://mrbonk97.github.io"),
};

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className={`${notoSans.className} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
