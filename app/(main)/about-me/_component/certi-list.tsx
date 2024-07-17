import { motion } from "framer-motion";

interface CertiListProps {
  idx: number;
  title: string;
}

export const CertiList = ({ idx, title }: CertiListProps) => {
  return (
    <motion.li
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, delay: idx * 0.1, ease: "easeInOut" },
      }}
      viewport={{ once: true }}
      className="text-center text-5xl font-semibold"
    >
      {title}
    </motion.li>
  );
};
