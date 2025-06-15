"use client";
import Link from "next/link";
import { useRef } from "react";
import { PROJECTS } from "@/constant";
import { motion, useScroll, useTransform } from "motion/react";
import { ProjectCarousel } from "@/components/project-carouse";

const ProjectPage = () => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"], // [시작 위치, 끝 위치]
  });
  const r = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <main className="pt-20 p-5 mx-auto max-w-6xl text-custom-1" ref={container}>
      <header className="mt-10">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center">
          <motion.div initial={{ x: 0 }} animate={{ x: "-5%" }}>
            프로젝트를
          </motion.div>
          <motion.div className="mt-5 sm:mt-10" initial={{ x: 0 }} animate={{ x: "5%" }}>
            소개합니다
          </motion.div>
        </h1>
        <motion.svg
          style={{ rotate: r }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-20 mx-auto h-40 w-40 sm:h-48 sm:w-48 lg:h-60 lg:w-60"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { delay: 0.3, duration: 1 },
              opacity: { delay: 0.3, duration: 0 },
            }}
            d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
          />
        </motion.svg>
        <motion.h2
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-20 text-lg sm:text-xl lg:text-3xl font-bold text-center "
        >
          평상시에 취미로 진행했던 프로젝트들 입니다.
        </motion.h2>
      </header>

      <section className="mt-20">
        <ul className="space-y-5">
          {PROJECTS.map((item) => (
            <li key={item.id} className="p-5 rounded-xl bg-secondary">
              <h2 className="text-4xl font-bold">{item.title}</h2>
              <p className="font-medium opacity-80">{item.description}</p>
              <ProjectCarousel key={item.id} id={item.id} images={item.images} />
              <nav className="mt-10 flex justify-center font-medium gap-5">
                {item.links.map((link) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.url}
                    key={`item.id-${link.name}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ProjectPage;
