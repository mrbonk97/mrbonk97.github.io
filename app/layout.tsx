import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "김현석",
  description: "김현석의 포트폴리오",
  openGraph: {
    title: "김현석의 포트폴리오",
    description: "김현석의 포트폴리오",
    images: "https://mrbonk97.github.io/images/meta-me.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
