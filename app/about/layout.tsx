import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";

interface Props {
  children: React.ReactNode;
}

function AboutLayout({ children }: Props) {
  return (
    <>
      <Topnav page="/about" />
      {children}
      <Footer />
    </>
  );
}

export default AboutLayout;
