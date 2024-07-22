"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface HoverTextProps {
  title: string;
  delay?: number;
}
export const HoverText = ({ title, delay = 0.7 }: HoverTextProps) => {
  const [d, setD] = useState(delay);

  setTimeout(() => {
    setD(0);
  }, 1000);

  const hoverMotion = {
    initial: {
      y: 112,
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
    },
    animate: {
      y: 0,
      ease: "easeOut",
      transition: {
        duration: 0.2,
        delay: d,
        ease: "linear",
      },
    },
    hover: {
      y: 112,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="overflow-hidden"
    >
      <motion.h2 variants={hoverMotion} className="py-1">
        {title}
      </motion.h2>
    </motion.div>
  );
};
