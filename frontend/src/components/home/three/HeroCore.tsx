import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function HeroCore() {
  const groupRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.14;

    const targetX =
      state.pointer.y * 0.25;

    const targetY =
      state.pointer.x * 0.35;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) *
      0.01;

    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) *
      0.01;

    const targetScale = hovered
      ? 1.08
      : 1;

    const currentScale =
      groupRef.current.scale.x;

    const nextScale =
      currentScale +
      (targetScale - currentScale) *
        0.08;

    groupRef.current.scale.setScalar(
      nextScale,
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      {/* Main core */}
      <mesh>
        <icosahedronGeometry
          args={[1.45, 2]}
        />

        <meshStandardMaterial
          color="#0f766e"
          emissive="#052e2b"
          emissiveIntensity={
            hovered ? 2.4 : 1.5
          }
          metalness={0.85}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Wireframe */}
      <mesh scale={1.03}>
        <icosahedronGeometry
          args={[1.45, 2]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={
            hovered ? 0.55 : 0.28
          }
        />
      </mesh>

      {/* Inner energy sphere */}
      <mesh scale={0.38}>
        <sphereGeometry
          args={[1, 32, 32]}
        />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#22d3ee"
          emissiveIntensity={
            hovered ? 4 : 3
          }
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}