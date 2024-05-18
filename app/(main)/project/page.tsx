"use client";
import { projects } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const RightElement = ({ setIdx }: { setIdx: React.Dispatch<string> }) => {
  return (
    <section className="md:absolute md:right-0 w-full md:w-1/2 h-[300vh] flex flex-col">
      {projects.map((item, idx) => (
        <article
          key={idx}
          style={{ backgroundColor: item.bg, color: item.tc }}
          className={`h-screen flex2 flex-col gap-10`}
          onMouseEnter={() => setIdx(`${idx * 100}%`)}
        >
          <Image
            src={item.image}
            width={200}
            height={200}
            alt={item.title}
            className="md:hidden"
          />
          <div className="w-96 xl:w-[600px] flex flex-col items-center">
            <hgroup className="space-y-5">
              <h2 className="text-4xl md:text-6xl font-semibold text-center">
                {item.title}
              </h2>
              <h3 className="text-2xl md:text-3xl font-medium text-center">
                {item.duration}
              </h3>
              <h3 className="text-xl md:text-2xl font-medium text-center">
                규모: {item.size}
              </h3>
              <h3 className="text-lg md:text-xl font-medium text-center">
                업무: {item.work}
              </h3>
            </hgroup>
            <ul className="mt-5 flex gap-5 text-lg md:text-xl font-medium">
              {item.stack.map((item2, key2) => (
                <li key={key2}>{item2}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-20 text-4xl">
            {item.link.web && (
              <a href={item.link.web} rel="noopener noreferrer" target="_blank">
                <FaExternalLinkAlt />
              </a>
            )}
            {item.link.github && (
              <a
                href={item.link.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};

const ProjectsPage = () => {
  const transRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState("0%");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    ref.current!.style.bottom = idx;
  }, [idx]);

  useEffect(() => {
    transRef.current!.style.width = "0";
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div
          className="fixed w-screen h-screen bg-primary-400 duration-1000 z-50"
          ref={transRef}
        />
      )}
      <main className="h-full">
        <section className="hidden md:block fixed h-full w-[50vw]">
          <div
            className={`w-full flex flex-col h-[300%] duration-500 relative`}
            ref={ref}
          >
            {projects.map((item) => (
              <article
                className="w-full h-full flex items-center justify-center"
                key={item.title}
                style={{ backgroundColor: item.bg2 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={0}
                  className="w-80 h-auto"
                />
              </article>
            ))}
          </div>
        </section>
        <RightElement setIdx={setIdx} />
      </main>
    </>
  );
};

export default ProjectsPage;
