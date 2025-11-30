"use client";

import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MotionH4({ children, className }: Props) {
  return (
    <motion.h4
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.h4>
  );
}
