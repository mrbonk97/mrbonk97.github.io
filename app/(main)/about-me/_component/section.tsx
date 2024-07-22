import { motion } from "framer-motion";
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const AboutMeSection = ({ title, children }: SectionProps) => {
  return (
    <section className="w-full flex justify-center">
      <div className="px-10 max-w-[500px] md:max-w-[650px] w-full">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 0.3, ease: "easeInOut" },
          }}
          viewport={{ once: true }}
          className="sm:pl-5 mb-16 text-center sm:text-left text-3xl sm:text-4xl font-semibold text-secondary"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
};
