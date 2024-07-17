"use client";
import { useEffect, useRef, useState } from "react";
import { CircleHello } from "./_component/circle-hello";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current!.style.width = "0";
    setTimeout(() => {
      setIsLoaded(true);
      // textRef1.current!.style.transition = "500ms";
      // textRef2.current!.style.transition = "500ms";
      // textRef3.current!.style.transition = "500ms";
    }, 1000);

    setTimeout(() => {
      setIsTextVisible(true);
    }, 700);
  }, []);

  if (!isLoaded) {
    return (
      <div
        className="fixed w-screen h-screen bg-primary-400 duration-1000 z-50"
        ref={ref}
      />
    );
  }

  return (
    <main className="w-full h-full lg:min-h-[750px] text-primary-400 text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-widest flex flex-col gap-20 items-center justify-center">
      <div className="relative group overflow-hidden">
        <h2
          className={`py-1 relative duration-500 group-hover:translate-y-28 ${
            !isTextVisible && "translate-y-28"
          }`}
          ref={textRef1}
        >
          안녕하세요
        </h2>
      </div>
      <CircleHello />
      <div className="relative group overflow-hidden">
        <h2
          className={`py-1 relative duration-700 group-hover:translate-y-28 ${
            !isTextVisible && "translate-y-28"
          }`}
          ref={textRef2}
        >
          저의 포트폴리오
        </h2>
      </div>
      <div className="relative group overflow-hidden">
        <h2
          className={`py-1 relative group-hover:translate-y-28 ${
            !isTextVisible && "translate-y-28"
          }`}
          ref={textRef3}
          style={{ transitionDuration: "750ms" }}
        >
          방문에 감사드립니다.
        </h2>
      </div>
    </main>
  );
}
