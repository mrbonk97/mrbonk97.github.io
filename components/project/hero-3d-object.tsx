"use client";

import { Canvas } from "@react-three/fiber";
import { Asteriskmodel } from "./asterisk-model";
import { PresentationControls } from "@react-three/drei";

export function Hero3dObject() {
  return (
    <div className="mt-16 mx-auto h-48 md:h-80 w-fit">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.2;
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 5]} intensity={4} />
        <PresentationControls
          global
          speed={2}
          snap={false}
          polar={[-Math.PI / 2, Math.PI / 2]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <Asteriskmodel />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
