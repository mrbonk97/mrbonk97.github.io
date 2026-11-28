"use client";

import { usePageReveal } from "@/components/curtain-navigation";
import { DEV_PROJECTS } from "@/constants/dev-project";
import { ChevronRight } from "lucide-react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function ProjectHighlight() {
  const project = DEV_PROJECTS.find((p) => p.id == "oss")!;
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const waitForReveal = usePageReveal();

  useEffect(() => {
    if (reduceMotion) {
      controls.set("visible");
      return;
    }
    if (!inView) return;

    let cancelled = false;
    void waitForReveal().then(() => {
      if (!cancelled) void controls.start("visible");
    });

    return () => {
      cancelled = true;
    };
  }, [controls, inView, reduceMotion, waitForReveal]);

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : "hidden"}
      animate={controls}
    >
      <Link
        href={`/projects/${project.id}`}
        className="grid gap-4 rounded lg:grid-cols-5"
      >
        <motion.div
          custom={0}
          variants={panelVariants}
          className="lg:col-span-2 relative p-4 lg:p-8 flex min-h-64 flex-col justify-between overflow-hidden rounded text-white"
        >
          <Image
            src={project.imgUrl}
            alt=""
            fill
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <p className="relative px-4 py-2 w-fit rounded bg-custom-100 text-custom-400">
            {project.tag}
          </p>
          <h3 className="relative mt-8 px-4 py-2 max-w-sm rounded bg-custom-100 text-2xl font-medium text-custom-400">
            {project.title}
          </h3>
        </motion.div>

        <div className="grid min-w-0 grid-cols-2 gap-4 lg:col-span-3">
          <motion.div
            custom={1}
            variants={panelVariants}
            className="p-4 lg:p-8 flex items-center rounded bg-linear-to-br from-custom-400 to-custom-200"
          >
            <ol className="w-full space-y-2 text-sm">
              <li className="px-4 py-2 rounded bg-secondary">SBOM 분석</li>
              <li className="px-4 py-2 rounded bg-secondary">취약점 매칭</li>
              <li className="rounded bg-[#191918] px-4 py-2 text-white">
                조치 현황 관리
              </li>
            </ol>
          </motion.div>

          <motion.div
            custom={2}
            variants={panelVariants}
            className="relative overflow-hidden rounded bg-secondary"
          >
            <Image
              src="/surreal-orange.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 352px, (min-width: 1024px) 30vw, 50vw"
              draggable={false}
              className="p-4 lg:p-8 object-contain"
            />
          </motion.div>

          <motion.div
            custom={3}
            variants={panelVariants}
            className="col-span-2 p-4 lg:p-8 flex flex-col justify-center gap-4 rounded bg-primary text-primary-foreground"
          >
            <p>프로젝트 개요</p>
            <p>{project.summary}</p>
            <div className="flex items-center justify-between gap-4 text-sm font-medium">
              프로젝트 살펴보기
              <ChevronRight size={16} aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
