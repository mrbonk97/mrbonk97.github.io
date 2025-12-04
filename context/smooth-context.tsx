"use client";

import { createContext, useContext, useState } from "react";
import type { ScrollSmoother } from "gsap/ScrollSmoother";

interface ISmootherContext {
  smoother: ScrollSmoother | null;
  setSmoother: (s: ScrollSmoother) => void;
}

const SmootherContext = createContext<ISmootherContext>({
  smoother: null,
  setSmoother: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function SmootherProvider({ children }: Props) {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  return (
    <SmootherContext.Provider value={{ smoother, setSmoother }}>
      {children}
    </SmootherContext.Provider>
  );
}

export function useSmoother() {
  return useContext(SmootherContext);
}
