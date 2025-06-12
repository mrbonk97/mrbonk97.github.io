import "./globals.css";
import type { Metadata } from "next";
import { pretendard } from "@/lib/font";
import { Topnav } from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";

export const metadata: Metadata = {
  title: "行法",
  description: "저의 웹사이트입니다.",
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
