import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceStationProps {
  position: [number, number, number];
}

export const SpaceStation = ({ position }: SpaceStationProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#8899aa" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#2244aa"
          emissive="#1133aa"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#2244aa"
          emissive="#1133aa"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};
