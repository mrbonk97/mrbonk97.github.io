"use client";

import { useMatterScene } from "@/hooks/use-matter-scene";
import { useRef } from "react";

interface Props {
  handleRoute: (url: string) => void;
}
export function HomeMatter({ handleRoute }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useMatterScene({ handleRoute, containerRef });

  return <div ref={containerRef} className="z-30 fixed inset-0" />;
}
