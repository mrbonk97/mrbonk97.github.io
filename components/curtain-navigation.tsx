"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Curtain } from "./curtain";

const CurtainNavigationContext = createContext<((href: string) => void) | null>(null);
const PageRevealContext = createContext<(() => Promise<void>) | null>(null);

type Navigation = {
  from: string;
  phase: "covering" | "waiting" | "revealing";
};

async function moveColumns(cover: HTMLDivElement, from: number, to: number) {
  const columns = Array.from(cover.children).filter(
    (column): column is HTMLElement =>
      column instanceof HTMLElement && getComputedStyle(column).display !== "none",
  );
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stagger = parseFloat(getComputedStyle(cover).getPropertyValue("--column-stagger"));
  const animations = columns.map((column, index) =>
    column.animate(
      [{ transform: `translateY(${from}%)` }, { transform: `translateY(${to}%)` }],
      {
        duration: reducedMotion ? 0 : 680,
        delay: reducedMotion ? 0 : index * stagger,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "both",
      },
    ),
  );

  await Promise.all(animations.map((animation) => animation.finished));
  // Set hidden mobile columns too, so a resize cannot leave a hole in the cover.
  for (const column of cover.children) {
    (column as HTMLElement).style.transform = `translateY(${to}%)`;
  }
  animations.forEach((animation) => animation.cancel());
}

export function CurtainNavigation({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [initiallyCovered] = useState(() => pathname === "/projects");
  const coverRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<Navigation | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRef = useRef<{ promise: Promise<void>; resolve: () => void } | null>(null);
  const waitForReveal = useCallback(async () => {
    // Child effects run first; let the initial curtain register its promise.
    await Promise.resolve();
    await revealRef.current?.promise;
  }, []);

  const reset = useCallback(() => {
    navigationRef.current = null;
    revealRef.current?.resolve();
    revealRef.current = null;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    const cover = coverRef.current;
    if (!cover) return;
    cover.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    cover.style.pointerEvents = "none";
    for (const column of cover.children) {
      (column as HTMLElement).style.setProperty("transform", "translateY(-100%)");
    }
  }, []);

  const navigate = useCallback((href: string) => {
    if (navigationRef.current) return;
    const cover = coverRef.current;
    if (!cover || href === pathname || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    const navigation: Navigation = { from: pathname, phase: "covering" };
    navigationRef.current = navigation;
    let resolveReveal!: () => void;
    const promise = new Promise<void>((resolve) => { resolveReveal = resolve; });
    revealRef.current = { promise, resolve: resolveReveal };
    cover.style.pointerEvents = "auto";
    router.prefetch(href);
    // A failed or interrupted route load must not leave the screen covered.
    timeoutRef.current = setTimeout(reset, 10000);
    void moveColumns(cover, -100, 0).then(() => {
      if (navigationRef.current !== navigation || navigation.phase !== "covering") return;
      navigation.phase = "waiting";
      router.push(href);
    }).catch(() => {
      if (navigationRef.current === navigation && navigation.phase !== "revealing") reset();
    });
  }, [pathname, reset, router]);

  useEffect(() => {
    const navigation = navigationRef.current;
    const cover = coverRef.current;
    if (!navigation || !cover || navigation.from === pathname || navigation.phase === "revealing") return;

    // Keep the cover in place until Next has committed the destination page.
    navigation.phase = "revealing";
    cover.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    void moveColumns(cover, 0, 100).finally(() => {
      if (navigationRef.current === navigation) reset();
    }).catch(() => {});
  }, [pathname, reset]);

  useEffect(() => {
    const cover = coverRef.current;
    if (!initiallyCovered || !cover) return reset;

    // Direct loads start covered in the server HTML, before hydration.
    const navigation: Navigation = { from: "", phase: "revealing" };
    navigationRef.current = navigation;
    let resolveReveal!: () => void;
    const promise = new Promise<void>((resolve) => { resolveReveal = resolve; });
    revealRef.current = { promise, resolve: resolveReveal };
    cover.style.pointerEvents = "auto";
    timeoutRef.current = setTimeout(reset, 10000);
    void moveColumns(cover, 0, 100).finally(() => {
      if (navigationRef.current === navigation) reset();
    }).catch(() => {});

    return reset;
  }, [initiallyCovered, reset]);

  return (
    <CurtainNavigationContext.Provider value={navigate}>
      <PageRevealContext.Provider value={waitForReveal}>
        {children}
      </PageRevealContext.Provider>
      <Curtain ref={coverRef} overlay initiallyCovered={initiallyCovered} />
    </CurtainNavigationContext.Provider>
  );
}

export function useCurtainNavigation() {
  const navigate = useContext(CurtainNavigationContext);
  if (!navigate) throw new Error("useCurtainNavigation requires CurtainNavigation");
  return navigate;
}

export function usePageReveal() {
  const waitForReveal = useContext(PageRevealContext);
  if (!waitForReveal) throw new Error("usePageReveal requires CurtainNavigation");
  return waitForReveal;
}
