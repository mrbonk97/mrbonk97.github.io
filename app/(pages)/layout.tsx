import { Footer } from "@/components/footer";
import { Topnav } from "@/components/topnav";

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <>
      <Topnav />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
