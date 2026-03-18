import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const GlassSphere = ({ position, color, speed = 1, distort = 0.3, size = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      mesh.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const GlassTorus = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.12}
          factor={0.3}
          speed={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const GlassCone = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <coneGeometry args={[0.6, 1.2, 6]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.1}
          distort={0.2}
          speed={3}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

export const FloatingScene = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <pointLight position={[-5, -5, 5]} intensity={0.2} color="#34d399" />
        <pointLight position={[5, 5, -5]} intensity={0.2} color="#a78bfa" />

        <GlassSphere position={[-3.5, 2, -2]} color="#34d399" speed={1.2} distort={0.4} size={1.2} />
        <GlassSphere position={[4, -1.5, -3]} color="#a78bfa" speed={0.8} distort={0.3} size={0.9} />
        <GlassTorus position={[3, 2.5, -1]} color="#fbbf24" />
        <GlassCone position={[-3, -2, -2]} color="#34d399" />
        <GlassSphere position={[0, -3, -4]} color="#a78bfa" speed={1.5} distort={0.5} size={0.7} />
      </Canvas>
    </div>
  );
};
