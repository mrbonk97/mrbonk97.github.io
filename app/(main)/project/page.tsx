"use client";
import { PageTransition } from "@/components/page-transition";
import { PROJECTS } from "@/constants";
import { ProjectCard } from "./_components/project-card";
import { ProjectCard2 } from "./_components/project-card2";
import { useState } from "react";

const ProjectsPage = () => {
  const [curIdx, setIdx] = useState(0);
  return (
    <>
      <PageTransition />
      <main className="min-h-full h-full w-full flex justify-end text-foreground">
        <section
          className="hidden md:block fixed left-0 top-0 h-full w-1/2 duration-500"
          style={{ transform: `translateY(${curIdx * -100}%)` }}
        >
          <div className="h-full w-full">
            {PROJECTS.map((item) => (
              <ProjectCard
                key={item.title}
                bgColor={item.bg}
                imageUrl={item.image}
                imageName={item.title}
              />
            ))}
          </div>
        </section>
        <section className="min-h-full h-full w-full md:w-1/2">
          {PROJECTS.map((item, idx) => (
            <ProjectCard2
              key={item.title}
              imageUrl={item.image}
              imageName={item.title}
              bgColor={item.bg2}
              title={item.title}
              duration={item.duration}
              size={item.size}
              work={item.work}
              desc={item.desc}
              stack={item.stack}
              textColor={item.tc}
              links={item.links}
              cicd={item.cicd}
              onHover={() => setIdx(idx)}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default ProjectsPage;
