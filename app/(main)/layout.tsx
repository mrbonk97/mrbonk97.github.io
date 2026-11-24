import { Footer } from "@/components/footer";
import { Topbar } from "@/components/topbar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-svh flex-col">
      <Topbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
