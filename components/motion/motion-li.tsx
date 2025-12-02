"use client";

import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MotionLi({ children, className, delay }: Props) {
  const ff = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "tween", delay: delay },
    },
  } as const;

  return (
    <motion.li
      variants={delay ? ff : fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.li>
  );
}
