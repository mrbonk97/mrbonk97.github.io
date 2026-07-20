"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { ProjectPreview } from "@/types";

interface Props {
  idx: number;
  project: ProjectPreview;
}

export function DevProjectCard({ idx, project }: Props) {
  const isDesktop = useIsDesktop();
  const delay = isDesktop && idx % 2 !== 0 ? 0.16 : 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 48,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.64,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="p-8 rounded bg-secondary"
    >
      <header>
        <h4 className="text-2xl md:text-4xl font-bold">{project.title}</h4>

        <p className="mt-4 max-w-lg break-keep text-balance leading-snug text-secondary-foreground md:text-lg">
          {project.summary}
        </p>

        <ul className="mt-8 border-l-2 pl-4 text-secondary-foreground md:text-lg">
          {project.stacks.map((stack) => (
            <li key={stack.name}>{stack.name}</li>
          ))}

          {Array.from({
            length: Math.max(0, 4 - project.stacks.length),
          }).map((_, index) => (
            <li key={`empty-stack-${index}`} aria-hidden="true">
              ㅤ
            </li>
          ))}
        </ul>
      </header>

      <Link href={`/projects/${project.id}`} className="block mt-4 group">
        <div className="rounded overflow-hidden">
          <Image
            src={project.banner}
            alt={project.title}
            height={1080}
            width={1080}
            className="aspect-video rounded object-cover duration-500 group-hover:opacity-80"
          />
        </div>

        <div className="mt-4 p-4 rounded bg-custom-2 text-lg text-custom-3 duration-150 hover:bg-custom-2/80">
          상세 정보
        </div>
      </Link>
    </motion.article>
  );
}
