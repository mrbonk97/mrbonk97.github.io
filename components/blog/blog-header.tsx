"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";

export default function BlogHeader() {
  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);

  const fieldRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const velocityRef = useRef({
    x: 150,
    y: 110,
  });

  const boundsRef = useRef({
    maxX: 0,
    maxY: 0,
  });

  useEffect(() => {
    const field = fieldRef.current;
    const image = imageRef.current;

    if (!field || !image) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reduceMotionRef.current = motionPreference.matches;
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    const updateBounds = () => {
      const maxX = Math.max(0, field.clientWidth - image.offsetWidth);
      const maxY = Math.max(0, field.clientHeight - image.offsetHeight);

      boundsRef.current = {
        maxX,
        maxY,
      };

      x.set(Math.min(x.get(), maxX));
      y.set(Math.min(y.get(), maxY));
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);

    resizeObserver.observe(field);
    resizeObserver.observe(image);

    return () => {
      resizeObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, [x, y]);

  useAnimationFrame((_, delta) => {
    if (reduceMotionRef.current || document.hidden) return;

    const seconds = Math.min(delta / 1000, 0.05);
    const velocity = velocityRef.current;
    const { maxX, maxY } = boundsRef.current;

    let nextX = x.get() + velocity.x * seconds;
    let nextY = y.get() + velocity.y * seconds;

    let collided = false;

    if (nextX <= 0) {
      nextX = 0;
      velocity.x = Math.abs(velocity.x);
      collided = true;
    } else if (nextX >= maxX) {
      nextX = maxX;
      velocity.x = -Math.abs(velocity.x);
      collided = true;
    }

    if (nextY <= 0) {
      nextY = 0;
      velocity.y = Math.abs(velocity.y);
      collided = true;
    } else if (nextY >= maxY) {
      nextY = maxY;
      velocity.y = -Math.abs(velocity.y);
      collided = true;
    }

    if (collided) {
      rotate.set(rotate.get() + 12);
    }

    x.set(nextX);
    y.set(nextY);
  });

  return (
    <header
      ref={fieldRef}
      className="relative mt-4 p-8 h-64 overflow-hidden rounded bg-custom-200"
    >
      <h1 className="relative z-10 text-2xl md:text-4xl font-bold tracking-wider text-custom-400">
        블로그
      </h1>

      <motion.div
        ref={imageRef}
        style={{ x, y, rotate }}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 16,
        }}
        className="absolute top-0 left-0"
      >
        <Image
          src="/surreal-orange.png"
          alt="블로그 대표 이미지"
          width={640}
          height={640}
          sizes="128px"
          preload
          draggable={false}
          className="h-32 w-32 select-none object-contain drop-shadow-2xl"
        />
      </motion.div>
    </header>
  );
}
