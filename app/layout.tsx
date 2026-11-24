import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";
import { CurtainNavigation } from "@/components/curtain-navigation";

export const metadata: Metadata = {
  title: "mrbonk97",
  description: "Portfolio of mrbonk97",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={cn(pretendard.variable, pretendard.className)}>
      <body>
        <CurtainNavigation>{children}</CurtainNavigation>
      </body>
    </html>
  );
}
