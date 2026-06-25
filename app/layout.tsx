import "./globals.css";
import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "김현석 | 포트폴리오",
  description: "웹 개발과 웹 보안을 합니다",
  keywords: [
    "김현석",
    "Hyunsuk Kim",
    "포트폴리오",
    "정보보안",
    "보안 엔지니어",
    "개발자",
    "Next.js",
    "React",
    "Typescript",
    "웹 개발",
  ],

  authors: [{ name: "김현석" }],

  openGraph: {
    title: "김현석 포트폴리오",
    description: "웹 개발과 웹 보안을 합니다",
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
    description: "웹 개발과 웹 보안을 합니다",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://mrbonk97.github.io"),
};

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={`antialiased ${pretendard.className}`}>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
