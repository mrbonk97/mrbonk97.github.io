"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

interface Props {
  id: string;
  title: string;
  summary: string;
  imgUrl: string;
  bgUrl?: string;
  index: number;
}

const columnQueries = ["(min-width: 64rem)"];

function subscribeToLayout(onChange: () => void) {
  const queries = columnQueries.map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => {
    queries.forEach((query) => query.removeEventListener("change", onChange));
  };
}

function getColumnCount() {
  return (
    2 + columnQueries.filter((query) => window.matchMedia(query).matches).length
  );
}

export function DevProjectList({ id, title, imgUrl, bgUrl, index }: Props) {
  const reduceMotion = useReducedMotion();
  const columns = useSyncExternalStore(
    subscribeToLayout,
    getColumnCount,
    () => 2,
  );

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : (index % columns) * 0.16,
        ease: "easeOut",
      }}
      className="group min-w-0"
    >
      <Link href={`/projects/${id}`} className="block">
        <div className="relative overflow-hidden rounded">
          {bgUrl && (
            <Image
              src={bgUrl}
              alt=""
              height={1024}
              width={1024}
              className="object-cover aspect-square rounded group-hover:scale-105 duration-500"
            />
          )}
          {imgUrl && (
            <Image
              src={imgUrl}
              alt=""
              height={512}
              width={512}
              className={
                bgUrl && imgUrl
                  ? "h-1/2 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg"
                  : "object-cover aspect-square rounded group-hover:scale-105 duration-500"
              }
            />
          )}
        </div>
        <h4 className="mt-4 text-center lg:text-lg font-semibold">
          {title}
        </h4>
      </Link>
    </motion.li>
  );
}
