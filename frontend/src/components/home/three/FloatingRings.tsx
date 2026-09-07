import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingRings() {
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);
  const ringThree = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringOne.current) {
      ringOne.current.rotation.x += delta * 0.15;
      ringOne.current.rotation.z += delta * 0.10;
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.y += delta * 0.12;
      ringTwo.current.rotation.z -= delta * 0.07;
    }

    if (ringThree.current) {
      ringThree.current.rotation.x -= delta * 0.10;
      ringThree.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh
        ref={ringOne}
        rotation={[0.8, 0.2, 0]}
        scale={1.9}
      >
        <torusGeometry args={[1.2, 0.018, 16, 128]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.65}
        />
      </mesh>

      <mesh
        ref={ringTwo}
        rotation={[1.3, 0.4, 0.5]}
        scale={2.25}
      >
        <torusGeometry args={[1.2, 0.012, 16, 128]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh
        ref={ringThree}
        rotation={[0.2, 1, 0.7]}
        scale={2.6}
      >
        <torusGeometry args={[1.2, 0.009, 16, 128]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}