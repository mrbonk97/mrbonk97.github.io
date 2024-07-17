import { motion } from "framer-motion";
interface InfoListProps {
  title: string;
  duration: string;
  info1: string;
  info2?: string;
}

export const InfoList = ({ title, duration, info1, info2 }: InfoListProps) => {
  return (
    <motion.li
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, delay: 0.2, ease: "easeInOut" },
      }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold">
          {title}
        </span>
        <span className="text-base sm:text-2xl md:text-3xl font-medium">
          {duration}
        </span>
      </div>
      <span
        className={`${
          info2 ? "mt-1" : "mt-5"
        } block text-base sm:text-lg xl:text-xl font-medium text-right`}
      >
        {info1}
      </span>
      {info2 && (
        <span className="mt-2 block text-base sm:text-lg xl:text-xl font-medium text-right">
          {info2}
        </span>
      )}
    </motion.li>
  );
};
