"use client";

import { Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Obeject3d() {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // 회전
    ref.current.rotation.y += delta;

    // 위아래 부양 애니메이션
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 3) * 0.2;
  });

  return (
    <mesh ref={ref} scale={2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshLambertMaterial wireframe color={"#3f72af"} />
    </mesh>
  );
}
