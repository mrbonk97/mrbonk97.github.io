import "./globals.css";
import type { Metadata } from "next";
import { astaSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "mrbonk97",
  description: "mrbonk97 개발자 포트폴리오",
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
    "포트폴리오",
  ],
  openGraph: {
    title: "mrbonk97",
    description: "mrbonk97 개발자 포트폴리오.",
    url: "https://mrbonk97.github.io",
    siteName: "mrbonk97",
    images: [
      {
        url: "https://mrbonk97.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "mrbonk97 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "mrbonk97",
    description: "mrbonk97 개발자 포트폴리오",
    images: ["https://mrbonk97.github.io/opengraph-image.png"],
  },
};

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className={`${astaSans.className} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
