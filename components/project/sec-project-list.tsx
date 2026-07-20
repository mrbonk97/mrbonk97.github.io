"use client";

import { useIsDesktop } from "@/hooks/use-is-desktop";
import { SecurityProject } from "@/types";
import { motion } from "motion/react";

interface Props {
  index: number;
  project: SecurityProject;
}

export function SecProjectList({ index, project }: Props) {
  const isDesktop = useIsDesktop();
  const delay = isDesktop && index % 2 !== 0 ? 0.16 : 0;

  return (
    <motion.li
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
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="py-4 border-t last:border-b flex justify-between gap-8"
    >
      <hgroup>
        <h4 className="text-base md:text-lg font-semibold text-balance break-keep">
          {project.title}
        </h4>
        <p className="mt-1 text-sm md:text-base text-secondary-foreground">
          {project.duration}
        </p>
        <p className="mt-1 text-sm md:text-base text-secondary-foreground">
          {project.company}
        </p>
      </hgroup>

      <span>{(index + 1).toString().padStart(2, "0")}</span>
    </motion.li>
  );
}
