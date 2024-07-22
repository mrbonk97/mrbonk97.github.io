"use client";

import { motion } from "framer-motion";
interface SeparatorProps {
  mt?: number;
  mb?: number;
  width?: string;
}
export const Separator = ({
  mt = 32,
  mb = 32,
  width = "80%",
}: SeparatorProps) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{
        width: "100%",
        opacity: 1,
        transition: { duration: 0.3, ease: "easeIn", delay: 0.2 },
      }}
      viewport={{ once: true }}
      className="w-full flex justify-center"
      style={{ marginTop: mt, marginBottom: mb }}
    >
      <div className="border-t-[1.5px]" style={{ width: width }} />
    </motion.div>
  );
};
