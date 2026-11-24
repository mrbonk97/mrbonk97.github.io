"use client";

import { motion, useReducedMotion } from "motion/react";
import type { SecProject } from "@/types";

export function SecProjectList({ title, company, duration }: SecProject) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8"
    >
      <div className="min-w-0">
        <p className="text-xs lg:text-sm text-muted-foreground">{company}</p>
        <h3 className="mt-2 lg:text-lg font-medium leading-relaxed">
          {title}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">{duration}</p>
    </motion.li>
  );
}
