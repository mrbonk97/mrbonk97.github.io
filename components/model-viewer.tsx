"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./model";

export function ModelViewer() {
  return (
    <header className="relative mt-16 h-96 rounded-lg overflow-hidden bg-custom-2">
      <h1 className="z-10 absolute left-8 top-8 text-6xl font-bold text-custom-4">
        블로그
      </h1>
      <Canvas className="h-full">
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </header>
  );
}
