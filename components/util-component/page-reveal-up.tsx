"use client";

import { motion } from "motion/react";

interface Props {
  color: "blue" | "white";
}

export function PageRevealUp({ color }: Props) {
  return (
    <motion.div
      className={`fixed inset-0 -z-9999 ${color == "blue" ? "bg-custom-2" : "bg-background"}`}
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{
        delay: 0.2,
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.8,
      }}
    />
  );
}
