import { Footer } from "@/components/nav/footer";
import { Topnav } from "@/components/nav/top-nav";
import SmoothScroll from "@/components/smooth-scroll";

interface Props {
  children: React.ReactNode;
}

function AboutLayout({ children }: Props) {
  return (
    <>
      <SmoothScroll>
        <Topnav page="/about" />
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}

export default AboutLayout;
