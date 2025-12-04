import { SmoothScroll } from "@/components/gsap/smooth-scroll";
import { SmootherProvider } from "@/context/smooth-context";
import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";

interface Props {
  children: React.ReactNode;
}

function AboutLayout({ children }: Props) {
  return (
    <>
      <Topnav />
      <SmootherProvider>
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </SmootherProvider>
    </>
  );
}

export default AboutLayout;
