"use client";

import { motion } from "motion/react";

export default function BorderExpand() {
  return (
    <div className="h-32 relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{
          scaleX: 1,
          transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
        }}
        className="absolute top-0 left-0 right-0 h-px bg-border origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{
          scaleX: 1,
          transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
        }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border origin-left"
      />
    </div>
  );
}
