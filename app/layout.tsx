import "./globals.css";
import type { Metadata } from "next";
import { pretendard } from "@/lib/font";
import { Topnav } from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";

export const metadata: Metadata = {
  title: "行法 | 보안 블로그",
  description: "보안과 웹 개발 중심의 블로그입니다.",
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
    title: "行法 | 보안 블로그",
    description: "보안과 웹 개발 중심의 블로그입니다.",
    url: "https://mrbonk97.github.io",
    siteName: "行法",
    images: [
      {
        url: "https://mrbonk97.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "行法 블로그",
      },
    ],
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "行法 | 보안 블로그",
    description: "보안과 웹 개발 중심의 블로그입니다.",
    images: ["https://mrbonk97.github.io/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Topnav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
