import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Topnav />
      {children}
      <Footer />
    </>
  );
}
