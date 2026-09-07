import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DESKTOP_PARTICLES = 500;
const MOBILE_PARTICLES = 180;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches
      ? MOBILE_PARTICLES
      : DESKTOP_PARTICLES;

  const positions = useMemo(() => {
    const data = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      data[i3] = (Math.random() - 0.5) * 12;
      data[i3 + 1] = (Math.random() - 0.5) * 8;
      data[i3 + 2] = (Math.random() - 0.5) * 8;
    }

    return data;
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3} args={[positions,3]}        />
      </bufferGeometry>

      <pointsMaterial
        color="#67e8f9"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}