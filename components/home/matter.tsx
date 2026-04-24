"use client";

import { useRef } from "react";
import { useMatterScene } from "./useMatterScene";

interface Props {
  handleRoute: (url: string) => void;
}
export function HomeMatter({ handleRoute }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useMatterScene({ handleRoute, containerRef });

  return <div ref={containerRef} className="z-30 fixed inset-0" />;
}
