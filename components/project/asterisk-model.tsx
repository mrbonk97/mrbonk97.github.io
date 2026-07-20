import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function smootherStep(value: number) {
  const progress = THREE.MathUtils.clamp(value, 0, 1);

  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

export function Asteriskmodel() {
  const rootRef = useRef<THREE.Group | null>(null);
  const ySpinRef = useRef<THREE.Group | null>(null);
  const zRollRef = useRef<THREE.Group | null>(null);
  const elapsedRef = useRef(0);

  const { nodes } = useGLTF("/models/hero-asterisk.glb");

  const asteriskMesh = nodes.AsteriskShape as THREE.Mesh<
    THREE.BufferGeometry,
    THREE.Material
  >;

  useFrame((_, delta) => {
    const root = rootRef.current;
    const ySpin = ySpinRef.current;
    const zRoll = zRollRef.current;

    if (!root || !ySpin || !zRoll) return;

    const frameDelta = Math.min(delta, 0.05);

    elapsedRef.current += frameDelta;

    const elapsed = elapsedRef.current;

    /*
     * 등장 Y축 회전
     * 정확히 4바퀴에서 종료되므로 최종적으로 rotation.y는
     * 시각상 다시 0도가 된다.
     */
    const ySpinDuration = 2.2;
    const ySpinProgress = Math.min(elapsed / ySpinDuration, 1);
    const ySpinEased = 1 - Math.pow(1 - ySpinProgress, 4);

    const yTurns = 4;
    const finalYRotation = Math.PI * 2 * yTurns;

    ySpin.rotation.y = finalYRotation * ySpinEased;

    /*
     * Y축 회전이 60% 진행된 시점부터
     * 로컬 Z축 회전을 서서히 시작한다.
     */
    const overlapStart = ySpinDuration * 0.6;
    const overlapDuration = ySpinDuration - overlapStart;

    const zBlendProgress = (elapsed - overlapStart) / overlapDuration;
    const zBlend = smootherStep(zBlendProgress);

    const zRotationSpeed = 1;

    zRoll.rotation.z += zRotationSpeed * zBlend * frameDelta;

    /*
     * 크기 및 위치 등장 애니메이션
     */
    const entranceDuration = 1.2;
    const entranceProgress = Math.min(elapsed / entranceDuration, 1);
    const entranceEased = 1 - Math.pow(1 - entranceProgress, 4);

    const scale = THREE.MathUtils.lerp(0.16, 1, entranceEased);
    const positionY = THREE.MathUtils.lerp(-0.8, 0, entranceEased);

    root.scale.setScalar(scale);
    root.position.y = positionY;
  });

  return (
    <group
      ref={rootRef}
      scale={0.16}
      position={[0, -0.8, 0]}
      rotation={[
        THREE.MathUtils.degToRad(-32),
        THREE.MathUtils.degToRad(-32),
        0,
      ]}
      dispose={null}
    >
      <group ref={ySpinRef}>
        <group ref={zRollRef}>
          <mesh castShadow receiveShadow geometry={asteriskMesh.geometry}>
            <meshStandardMaterial color="#3f72af" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/hero-asterisk.glb");
