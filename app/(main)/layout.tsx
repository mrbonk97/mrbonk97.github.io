import { Footer } from "@/components/nav/footer";
import { Topnav } from "@/components/nav/top-nav";

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Topnav />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
