"use client";

import { Obeject3d } from "./object-3d";
import { Canvas } from "@react-three/fiber";

export function Canvas3d() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Obeject3d />
    </Canvas>
  );
}
