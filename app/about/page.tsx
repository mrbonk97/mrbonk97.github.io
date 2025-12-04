import { AboutHeaderGsap } from "@/components/gsap/about-header-gsap";
import { AboutOutroGsap } from "@/components/gsap/about-outro-gsap";
import { AboutProjectGsap } from "@/components/gsap/about-project-gsap";
import { AboutSecurityGsap } from "@/components/gsap/about-security-gsap";
import { OverlayGsap } from "@/components/gsap/overlay-gsap";
import { TechStackGsap } from "@/components/gsap/tech-stack-gsap";

export default function AboutPage() {
  return (
    <>
      <OverlayGsap className="bg-custom-4" />
      <main>
        <AboutHeaderGsap />
        <AboutProjectGsap />
        <AboutSecurityGsap />
        <TechStackGsap />
        <AboutOutroGsap />
        <div className="h-96" />
      </main>
    </>
  );
}
