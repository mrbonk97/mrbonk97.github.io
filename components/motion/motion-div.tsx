"use client";

import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export function MotionDiv({ children, className }: Props) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
