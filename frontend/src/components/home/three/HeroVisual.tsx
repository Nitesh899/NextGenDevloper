import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import HeroCore from "./HeroCore";
import FloatingRings from "./FloatingRings";
import ParticleField from "./ParticleField";


function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      const mobile =
        window.innerWidth <= 768;

      camera.position.set(
        0,
        0,
        mobile ? 8.8 : 7,
      );

      if (
        camera instanceof THREE.PerspectiveCamera
      ) {
        camera.fov = mobile
          ? 52
          : 45;

        camera.updateProjectionMatrix();
      }
    };

    updateCamera();

    window.addEventListener(
      "resize",
      updateCamera,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateCamera,
      );
    };
  }, [camera]);

  return null;
}

export default function HeroVisual() {
  return (
    <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[600px]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-56
          w-56
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/10
          blur-[90px]
          sm:h-72
          sm:w-72
          lg:h-96
          lg:w-96
        "
      />

      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ResponsiveCamera />
        {/* Lighting */}
        <ambientLight intensity={0.55} />

        <directionalLight
          position={[4, 4, 5]}
          intensity={1.7}
          color="#22d3ee"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={10}
          distance={10}
          color="#7c3aed"
        />

        <pointLight
          position={[4, 2, 2]}
          intensity={8}
          distance={10}
          color="#22c55e"
        />

        {/* Main 3D Core */}
        <HeroCore />

        {/* Decorative rings */}
        <FloatingRings />

        {/* Background particles */}
        <ParticleField />

      
        {/* Extra particles */}
        <Sparkles
          count={60}
          scale={[8, 6, 6]}
          size={1.4}
          speed={0.18}
          opacity={0.45}
          color="#67e8f9"
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.35}
        />

        {/* Post processing */}
        <EffectComposer>
          <Bloom
            intensity={1.25}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.65}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}